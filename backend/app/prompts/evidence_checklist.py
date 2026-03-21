"""
Prompt template: generate an evidence/document checklist for the patient.
"""

EVIDENCE_CHECKLIST_PROMPT = """\
You are a patient advocate helping someone prepare documents for an insurance \
appeal for a denied cancer medication.

Based on the information below, generate a practical checklist of documents \
the patient should ask their doctor/care team to gather and submit.

Write each checklist item as a clear, actionable instruction starting with \
"Ask your doctor for..." or "Gather your..." or "Request a copy of..."

DENIAL CATEGORY: {denial_category_label}
DRUG: {drug_name}
PAYER: {payer_name}
DIAGNOSIS: {diagnosis}
BIOMARKER INFO: {biomarker_info}
PRIOR THERAPIES: {prior_therapies}

Generate 6-10 specific, relevant checklist items. Prioritize items most likely \
to resolve the specific denial category. Be specific — name exact document types.

Respond ONLY with a JSON array of strings, like:
["Item 1", "Item 2", "Item 3"]

Examples of good items:
- "Ask your oncologist for a letter of medical necessity explaining why {drug_name} is the right treatment for your specific diagnosis"
- "Request a copy of your PD-L1 tumor proportion score (TPS) test results from your pathology lab"
- "Gather documentation of all previous cancer treatments you have tried, including dates and reasons for stopping"
"""
