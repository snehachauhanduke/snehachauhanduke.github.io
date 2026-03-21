"""
Prompt template: generate a structured appeal letter draft.
"""

APPEAL_LETTER_PROMPT = """\
You are a healthcare prior authorization appeal specialist. Write a professional \
appeal letter that a patient can bring to their doctor or provider to review, \
customize, and submit to the insurance company.

The letter should:
- Be professional and formal in tone
- Reference medical necessity and clinical evidence
- Address the specific denial reason
- Be written from the treating physician's perspective (provider-to-insurer)
- Include [PLACEHOLDER] markers where the provider must fill in specifics
- Include today's date as [DATE]
- Be thorough but not verbose (1-2 pages equivalent)
- Close with a direct request for reconsideration and urgent approval

PATIENT INFORMATION:
- Patient Name: {patient_name}
- Patient Age: {patient_age}
- Diagnosis: {diagnosis}
- Drug: {drug_name}
- Insurance: {payer_name}
- Denial Category: {denial_category_label}

DENIAL TEXT:
{denial_text}

BIOMARKER/LAB INFO (if available): {biomarker_info}
PRIOR THERAPIES (if available): {prior_therapies}
DOCTOR NOTES (if available): {doctor_notes}

RELEVANT POLICY CONTEXT:
{policy_context}

IMPORTANT:
- Start the letter with: "Re: Appeal for Prior Authorization — {drug_name} — Patient: {patient_name}"
- Include a clear subject line
- Use [PROVIDER NAME, MD], [PROVIDER NPI], [PRACTICE NAME], [PHONE], [DATE] placeholders
- Use [POLICY/GROUP NUMBER] and [MEMBER ID] placeholders for insurance details
- At the end, add a note: "IMPORTANT: This draft was prepared with AI assistance for appeal planning. Please review, modify, and sign before submission."

Write the complete letter text now.
"""
