"""
Prompt template: classify the denial reason into a structured category.
"""

DENIAL_CLASSIFIER_PROMPT = """\
You are a healthcare prior authorization specialist. Your job is to analyze a \
patient's insurance denial and classify it into exactly ONE category.

DENIAL CATEGORIES:
- biomarker_missing: The denial is due to missing biomarker, genetic test, \
  lab result, or molecular/pathology documentation (e.g., PD-L1, EGFR, HER2, \
  BRCA, tumor proportion score).
- step_therapy_not_met: The denial is due to not having tried required prior \
  therapies or drugs in a specific order (step therapy / fail-first policy).
- medical_necessity_insufficient: The denial cites inadequate medical necessity \
  documentation, clinical notes, performance status, or insufficient clinical \
  justification.
- coverage_criteria_mismatch: The denial is due to the patient not meeting \
  specific coverage criteria such as stage, line of therapy, approved indication, \
  or FDA-approved use.
- unknown_ambiguous: The denial reason is unclear, the text is ambiguous, or \
  it does not fit the categories above.

PATIENT INFORMATION:
- Drug: {drug_name}
- Payer: {payer_name}
- Diagnosis: {diagnosis}
- Biomarker/Lab Info: {biomarker_info}
- Prior Therapies Tried: {prior_therapies}

DENIAL TEXT:
{denial_text}

Respond with ONLY a JSON object in this exact format (no extra text):
{{
  "category": "<one of the five category keys above>",
  "confidence": "<high|medium|low>",
  "reasoning": "<1-2 sentence explanation of why you chose this category>"
}}
"""


CATEGORY_LABELS = {
    "biomarker_missing": "Missing Biomarker / Lab Documentation",
    "step_therapy_not_met": "Step Therapy / Prior Treatment Not Documented",
    "medical_necessity_insufficient": "Insufficient Medical Necessity Documentation",
    "coverage_criteria_mismatch": "Coverage Criteria Not Met",
    "unknown_ambiguous": "Unclear or Ambiguous Denial Reason",
}
