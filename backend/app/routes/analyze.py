"""
Routes for the denial analysis API.
"""
import logging
from fastapi import APIRouter, HTTPException

from app.models.schemas import (
    DenialAnalysisRequest,
    DenialAnalysisResponse,
    SUPPORTED_DRUGS,
    SUPPORTED_PAYERS,
    DEMO_SCENARIOS,
)
from app.services.denial_analyzer import analyze_denial

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["analysis"])


@router.get("/health")
def health_check():
    return {"status": "ok", "service": "Patient PA Assistant"}


@router.get("/config")
def get_config():
    """Return supported drugs and payers for the frontend form."""
    return {
        "supported_drugs": SUPPORTED_DRUGS,
        "supported_payers": SUPPORTED_PAYERS,
    }


@router.get("/demo-scenarios")
def get_demo_scenarios():
    """Return pre-built demo scenarios for hackathon demo."""
    return [
        {
            "id": s.id,
            "label": s.label,
            "payload": s.payload.model_dump(),
        }
        for s in DEMO_SCENARIOS
    ]


@router.post("/analyze-denial", response_model=DenialAnalysisResponse)
def analyze_denial_route(req: DenialAnalysisRequest):
    """
    Main endpoint — analyze a prior auth denial and return:
    - denial category
    - plain-English explanation
    - approval requirements
    - retrieved policy snippets
    - appeal letter draft
    - evidence checklist
    - disclaimer
    """
    # Validate drug and payer
    if req.drug_name not in SUPPORTED_DRUGS:
        raise HTTPException(
            status_code=422,
            detail=f"Drug '{req.drug_name}' is not supported. Supported: {SUPPORTED_DRUGS}",
        )
    if req.payer_name not in SUPPORTED_PAYERS:
        raise HTTPException(
            status_code=422,
            detail=f"Payer '{req.payer_name}' is not supported. Supported: {SUPPORTED_PAYERS}",
        )
    if not req.denial_text.strip():
        raise HTTPException(status_code=422, detail="Denial text cannot be empty.")

    try:
        logger.info(
            "Analyzing denial — drug=%s payer=%s patient=%s",
            req.drug_name, req.payer_name, req.patient_name,
        )
        result = analyze_denial(req)
        return result
    except RuntimeError as e:
        # LLM/service errors
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.exception("Unexpected error in analyze_denial")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again.")
