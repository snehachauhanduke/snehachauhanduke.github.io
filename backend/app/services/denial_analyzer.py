"""
Core denial analysis orchestrator.
Ties together: RAG retrieval → LLM classification → explanation → letter → checklist.
"""
import logging
from typing import Any

from app.models.schemas import (
    DenialAnalysisRequest,
    DenialAnalysisResponse,
    PolicySnippet,
)
from app.prompts.denial_classifier import DENIAL_CLASSIFIER_PROMPT, CATEGORY_LABELS
from app.prompts.plain_english import PLAIN_ENGLISH_PROMPT, APPROVAL_REQUIREMENTS_PROMPT
from app.prompts.appeal_letter import APPEAL_LETTER_PROMPT
from app.prompts.evidence_checklist import EVIDENCE_CHECKLIST_PROMPT
from app.rag.vector_store import retrieve_policy_chunks
from app.services.llm_service import call_llm, call_llm_json

logger = logging.getLogger(__name__)

DISCLAIMER = (
    "This tool is for informational and appeal-preparation support only. "
    "It does not guarantee insurance approval and is not medical or legal advice. "
    "Any appeal letter generated here should be reviewed, modified, and signed "
    "by a licensed healthcare provider before submission to your insurance company."
)


def _safe_str(val: Any, default: str = "Not provided") -> str:
    if val is None or str(val).strip() == "":
        return default
    return str(val).strip()


def analyze_denial(req: DenialAnalysisRequest) -> DenialAnalysisResponse:
    """
    Full pipeline:
    1. Retrieve relevant policy chunks (RAG)
    2. Classify denial category
    3. Generate plain-English summary
    4. Extract approval requirements
    5. Draft appeal letter
    6. Build evidence checklist
    """

    # ── 1. RAG retrieval ─────────────────────────────────────────────────────
    logger.info("Retrieving policy chunks for %s / %s", req.drug_name, req.payer_name)
    chunks = retrieve_policy_chunks(
        query=f"{req.drug_name} {req.diagnosis} {req.denial_text[:300]}",
        drug_name=req.drug_name,
        payer_name=req.payer_name,
    )

    policy_context = (
        "\n\n---\n\n".join(c["text"] for c in chunks)
        if chunks
        else f"No policy documents found for {req.drug_name} / {req.payer_name}. "
             "Using general oncology prior authorization guidelines."
    )

    policy_snippets = [PolicySnippet(**c) for c in chunks]

    # ── 2. Classify denial ───────────────────────────────────────────────────
    logger.info("Classifying denial")
    classifier_prompt = DENIAL_CLASSIFIER_PROMPT.format(
        drug_name=req.drug_name,
        payer_name=req.payer_name,
        diagnosis=req.diagnosis,
        biomarker_info=_safe_str(req.biomarker_info),
        prior_therapies=_safe_str(req.prior_therapies),
        denial_text=req.denial_text,
    )
    try:
        classification = call_llm_json(classifier_prompt)
        denial_category = classification.get("category", "unknown_ambiguous")
    except Exception as e:
        logger.warning("Classification failed: %s — falling back", e)
        denial_category = "unknown_ambiguous"

    denial_category_label = CATEGORY_LABELS.get(denial_category, "Unclear Denial Reason")

    # ── 3. Plain-English summary ─────────────────────────────────────────────
    logger.info("Generating plain-English summary")
    summary_prompt = PLAIN_ENGLISH_PROMPT.format(
        patient_name=req.patient_name,
        patient_age=req.patient_age,
        drug_name=req.drug_name,
        payer_name=req.payer_name,
        diagnosis=req.diagnosis,
        denial_category_label=denial_category_label,
        denial_text=req.denial_text,
        policy_context=policy_context[:2000],  # cap context length
        biomarker_info=_safe_str(req.biomarker_info),
        prior_therapies=_safe_str(req.prior_therapies),
    )
    plain_english_summary = call_llm(summary_prompt, max_tokens=600)

    # ── 4. Approval requirements ─────────────────────────────────────────────
    logger.info("Extracting approval requirements")
    req_prompt = APPROVAL_REQUIREMENTS_PROMPT.format(
        drug_name=req.drug_name,
        payer_name=req.payer_name,
        diagnosis=req.diagnosis,
        denial_category_label=denial_category_label,
        policy_context=policy_context[:2000],
    )
    try:
        approval_requirements = call_llm_json(req_prompt, max_tokens=512)
        if not isinstance(approval_requirements, list):
            approval_requirements = list(approval_requirements.values()) if isinstance(approval_requirements, dict) else []
    except Exception as e:
        logger.warning("Requirements extraction failed: %s", e)
        approval_requirements = _fallback_requirements(req.drug_name, denial_category)

    # ── 5. Appeal letter ──────────────────────────────────────────────────────
    logger.info("Drafting appeal letter")
    letter_prompt = APPEAL_LETTER_PROMPT.format(
        patient_name=req.patient_name,
        patient_age=req.patient_age,
        drug_name=req.drug_name,
        payer_name=req.payer_name,
        diagnosis=req.diagnosis,
        denial_category_label=denial_category_label,
        denial_text=req.denial_text,
        biomarker_info=_safe_str(req.biomarker_info),
        prior_therapies=_safe_str(req.prior_therapies),
        doctor_notes=_safe_str(req.doctor_notes),
        policy_context=policy_context[:2000],
    )
    appeal_letter = call_llm(letter_prompt, max_tokens=1500)

    # ── 6. Evidence checklist ─────────────────────────────────────────────────
    logger.info("Building evidence checklist")
    checklist_prompt = EVIDENCE_CHECKLIST_PROMPT.format(
        denial_category_label=denial_category_label,
        drug_name=req.drug_name,
        payer_name=req.payer_name,
        diagnosis=req.diagnosis,
        biomarker_info=_safe_str(req.biomarker_info),
        prior_therapies=_safe_str(req.prior_therapies),
    )
    try:
        evidence_checklist = call_llm_json(checklist_prompt, max_tokens=512)
        if not isinstance(evidence_checklist, list):
            evidence_checklist = _fallback_checklist(denial_category)
    except Exception as e:
        logger.warning("Checklist generation failed: %s", e)
        evidence_checklist = _fallback_checklist(denial_category)

    return DenialAnalysisResponse(
        denial_category=denial_category,
        denial_category_label=denial_category_label,
        plain_english_summary=plain_english_summary.strip(),
        approval_requirements=approval_requirements,
        retrieved_policy_snippets=policy_snippets,
        appeal_letter=appeal_letter.strip(),
        evidence_checklist=evidence_checklist,
        disclaimer=DISCLAIMER,
    )


def _fallback_requirements(drug_name: str, category: str) -> list[str]:
    """Static fallback requirements when LLM call fails."""
    base = [
        f"Your doctor must submit a letter of medical necessity for {drug_name}",
        "Documentation confirming your diagnosis and cancer stage is required",
        "Recent clinical notes from your oncologist must be included",
    ]
    if category == "biomarker_missing":
        base.insert(0, "Laboratory test results showing relevant biomarker status must be submitted")
    elif category == "step_therapy_not_met":
        base.insert(0, "Documentation of all prior cancer treatments, including dates and outcomes, must be provided")
    return base


def _fallback_checklist(category: str) -> list[str]:
    """Static fallback checklist when LLM call fails."""
    return [
        "Ask your oncologist for a letter of medical necessity",
        "Request copies of all relevant lab and pathology reports",
        "Gather documentation of any previous cancer treatments you have tried",
        "Request your complete medical records from your cancer care team",
        "Ask your doctor for recent progress notes and clinical assessments",
        "Collect any imaging reports (CT, PET, MRI) related to your diagnosis",
    ]
