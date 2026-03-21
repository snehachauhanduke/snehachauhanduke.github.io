"""
Pydantic schemas for request / response models.
"""
from typing import Optional, List
from pydantic import BaseModel, Field


# ── Supported drugs & payers ──────────────────────────────────────────────────

SUPPORTED_DRUGS = [
    "Keytruda (pembrolizumab)",
    "Opdivo (nivolumab)",
    "Darzalex (daratumumab)",
    "Ibrance (palbociclib)",
    "Tagrisso (osimertinib)",
]

SUPPORTED_PAYERS = [
    "UnitedHealthcare",
    "Aetna",
]

DENIAL_CATEGORIES = [
    "biomarker_missing",
    "step_therapy_not_met",
    "medical_necessity_insufficient",
    "coverage_criteria_mismatch",
    "unknown_ambiguous",
]


# ── Request ───────────────────────────────────────────────────────────────────

class DenialAnalysisRequest(BaseModel):
    patient_name: str = Field(..., min_length=1, max_length=100)
    patient_age: int = Field(..., ge=0, le=120)
    drug_name: str = Field(..., description="One of the supported drug names")
    payer_name: str = Field(..., description="One of the supported payers")
    diagnosis: str = Field(..., min_length=2, max_length=300)
    denial_text: str = Field(..., min_length=10, max_length=5000)

    # Optional enrichment fields
    biomarker_info: Optional[str] = Field(None, max_length=1000)
    prior_therapies: Optional[str] = Field(None, max_length=1000)
    doctor_notes: Optional[str] = Field(None, max_length=2000)


# ── Response ──────────────────────────────────────────────────────────────────

class PolicySnippet(BaseModel):
    text: str
    source: str
    drug: Optional[str] = None
    payer: Optional[str] = None
    score: Optional[float] = None


class DenialAnalysisResponse(BaseModel):
    denial_category: str
    denial_category_label: str
    plain_english_summary: str
    approval_requirements: List[str]
    retrieved_policy_snippets: List[PolicySnippet]
    appeal_letter: str
    evidence_checklist: List[str]
    disclaimer: str


# ── Demo scenarios ────────────────────────────────────────────────────────────

class DemoScenario(BaseModel):
    id: str
    label: str
    payload: DenialAnalysisRequest


DEMO_SCENARIOS = [
    DemoScenario(
        id="keytruda_uhc_nsclc",
        label="Keytruda – UHC – NSCLC (missing PD-L1)",
        payload=DenialAnalysisRequest(
            patient_name="Alex Johnson",
            patient_age=62,
            drug_name="Keytruda (pembrolizumab)",
            payer_name="UnitedHealthcare",
            diagnosis="Non-small cell lung cancer (NSCLC), stage III",
            denial_text=(
                "Authorization for pembrolizumab (Keytruda) has been denied. "
                "The request does not include documentation of PD-L1 tumor "
                "proportion score (TPS) testing. Per plan policy, PD-L1 "
                "expression must be documented prior to approval for first-line "
                "immunotherapy in NSCLC."
            ),
            biomarker_info="PD-L1 testing not yet completed per denial letter",
            prior_therapies="No prior systemic therapy",
        ),
    ),
    DemoScenario(
        id="tagrisso_aetna_egfr",
        label="Tagrisso – Aetna – EGFR NSCLC (missing molecular test)",
        payload=DenialAnalysisRequest(
            patient_name="Maria Santos",
            patient_age=55,
            drug_name="Tagrisso (osimertinib)",
            payer_name="Aetna",
            diagnosis="EGFR-mutated non-small cell lung cancer (NSCLC)",
            denial_text=(
                "Prior authorization request for osimertinib (Tagrisso) is denied. "
                "Medical records submitted do not include results of EGFR mutation "
                "testing via an FDA-approved assay. Documentation of EGFR exon 19 "
                "deletion or exon 21 L858R substitution mutation is required per "
                "Aetna's Clinical Policy Bulletin."
            ),
            biomarker_info="EGFR mutation suspected but molecular test report not attached",
            prior_therapies="None",
        ),
    ),
    DemoScenario(
        id="darzalex_uhc_mm",
        label="Darzalex – UHC – Multiple Myeloma (step therapy)",
        payload=DenialAnalysisRequest(
            patient_name="Robert Chen",
            patient_age=70,
            drug_name="Darzalex (daratumumab)",
            payer_name="UnitedHealthcare",
            diagnosis="Relapsed/refractory multiple myeloma",
            denial_text=(
                "Authorization for daratumumab (Darzalex) is denied. Per UnitedHealthcare "
                "oncology coverage guidelines, daratumumab requires documentation of failure "
                "of at least two prior lines of therapy including a proteasome inhibitor "
                "and an immunomodulatory agent. Submitted records do not clearly document "
                "prior therapy failure meeting these criteria."
            ),
            prior_therapies="Bortezomib-based regimen x1 cycle — discontinued due to neuropathy",
        ),
    ),
]
