# Patient PA Assistant

A patient-facing web app that helps cancer patients and caregivers understand and respond to prior authorization (PA) denials for oncology medications.

**Hackathon MVP — Oncology Focus**

---

## What It Does

1. **Enter denial details** — patient info, drug, payer, and the denial text
2. **Classify the denial** — AI identifies the likely reason (missing biomarker, step therapy, etc.)
3. **Plain-English explanation** — what your insurer needs, in simple language
4. **Approval requirements** — pulled from real payer policy documents via RAG
5. **Draft appeal letter** — ready to take to your doctor to review and sign
6. **Evidence checklist** — exactly what documents to gather from your care team
7. **Policy evidence** — which policy excerpts were used to inform the analysis

---

## Project Structure

```
patient-pa-assistant/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app entry point
│   │   ├── routes/
│   │   │   └── analyze.py          # API endpoints
│   │   ├── services/
│   │   │   ├── denial_analyzer.py  # Core pipeline orchestrator
│   │   │   └── llm_service.py      # All LLM calls (pluggable)
│   │   ├── rag/
│   │   │   ├── embeddings.py       # Embedding provider (local/OpenAI)
│   │   │   ├── vector_store.py     # ChromaDB retrieval
│   │   │   └── ingest.py           # PDF ingestion script
│   │   ├── models/
│   │   │   └── schemas.py          # Pydantic schemas + demo scenarios
│   │   ├── prompts/
│   │   │   ├── denial_classifier.py
│   │   │   ├── plain_english.py
│   │   │   ├── appeal_letter.py
│   │   │   └── evidence_checklist.py
│   │   └── utils/
│   │       └── config.py           # Settings (loaded from .env)
│   ├── data/
│   │   └── policies/               # ← Place payer PDF policies here
│   ├── chroma_db/                  # Auto-created by ingestion script
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── IntakeForm.jsx      # Main patient input form
│   │   │   ├── ResultSummaryCard.jsx
│   │   │   ├── RequirementsCard.jsx
│   │   │   ├── EvidenceChecklist.jsx
│   │   │   ├── AppealLetterBox.jsx
│   │   │   ├── PolicyEvidencePanel.jsx
│   │   │   ├── DisclaimerFooter.jsx
│   │   │   └── LoadingState.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── ResultsPage.jsx
│   │   ├── services/
│   │   │   └── api.js              # API calls centralized here
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Local Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- An Anthropic API key (get one at console.anthropic.com)

---

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate       # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

#### Add Payer Policy PDFs (for RAG)

Place your payer policy PDF files in `backend/data/policies/`.

**Naming convention** (for automatic metadata extraction):

```
UnitedHealthcare_Keytruda_policy.pdf
UnitedHealthcare_Darzalex_policy.pdf
Aetna_Tagrisso_policy.pdf
Aetna_Keytruda_policy.pdf
```

Format: `<Payer>_<Drug>_<anything>.pdf`

#### Run Ingestion Script

```bash
cd backend
python -m app.rag.ingest
```

This will:
- Parse all PDFs in `data/policies/`
- Chunk and embed them
- Store in local ChromaDB (`chroma_db/`)

> **Note:** If no PDFs are found, the app still works — it uses the LLM's general knowledge instead of retrieved policy text. Add PDFs to unlock RAG-powered, policy-grounded responses.

#### Start the Backend

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

API will be available at: `http://localhost:8000`

Interactive docs: `http://localhost:8000/docs`

---

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

The Vite dev server automatically proxies `/api` requests to `http://localhost:8000`.

---

## Demo Scenarios

The app includes three pre-built demo scenarios you can load with one click:

| Scenario | Drug | Payer | Diagnosis | Denial Type |
|---|---|---|---|---|
| 1 | Keytruda | UnitedHealthcare | NSCLC stage III | Missing PD-L1 biomarker |
| 2 | Tagrisso | Aetna | EGFR-mutated NSCLC | Missing molecular test |
| 3 | Darzalex | UnitedHealthcare | Multiple Myeloma | Step therapy not met |

Click **"Try a demo scenario"** in the form to auto-fill any of these.

---

## API Reference

### `GET /api/health`

Health check.

### `GET /api/config`

Returns supported drugs and payers.

### `GET /api/demo-scenarios`

Returns pre-built demo payloads.

### `POST /api/analyze-denial`

Main analysis endpoint.

**Request body:**

```json
{
  "patient_name": "Alex Johnson",
  "patient_age": 62,
  "drug_name": "Keytruda (pembrolizumab)",
  "payer_name": "UnitedHealthcare",
  "diagnosis": "Non-small cell lung cancer (NSCLC), stage III",
  "denial_text": "Authorization for pembrolizumab denied. PD-L1 test documentation not provided.",
  "biomarker_info": "PD-L1 testing not yet completed",
  "prior_therapies": "None",
  "doctor_notes": null
}
```

**Response:**

```json
{
  "denial_category": "biomarker_missing",
  "denial_category_label": "Missing Biomarker / Lab Documentation",
  "plain_english_summary": "...",
  "approval_requirements": ["...", "..."],
  "retrieved_policy_snippets": [
    {
      "text": "...",
      "source": "UnitedHealthcare_Keytruda_policy.pdf",
      "drug": "keytruda",
      "payer": "unitedhealthcare",
      "score": 0.312
    }
  ],
  "appeal_letter": "Re: Appeal for Prior Authorization...",
  "evidence_checklist": ["...", "..."],
  "disclaimer": "..."
}
```

---

## Supported Drugs & Payers

**Drugs:**
- Keytruda (pembrolizumab)
- Opdivo (nivolumab)
- Darzalex (daratumumab)
- Ibrance (palbociclib)
- Tagrisso (osimertinib)

**Payers:**
- UnitedHealthcare
- Aetna

To add more drugs/payers:
1. Add them to `SUPPORTED_DRUGS` / `SUPPORTED_PAYERS` in `backend/app/models/schemas.py`
2. Add corresponding PDF policies to `backend/data/policies/`
3. Re-run `python -m app.rag.ingest`

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | — | **Required.** Your Anthropic API key |
| `LLM_MODEL` | `claude-sonnet-4-6` | Claude model to use |
| `LLM_TEMPERATURE` | `0.3` | Generation temperature |
| `EMBEDDING_PROVIDER` | `local` | `local` (sentence-transformers) or `openai` |
| `CHROMA_DB_PATH` | `./chroma_db` | ChromaDB storage path |
| `POLICY_PDF_DIR` | `./data/policies` | Policy PDF directory |
| `RAG_TOP_K` | `5` | Number of chunks to retrieve |
| `RAG_CHUNK_SIZE` | `800` | Chunk size in characters |
| `RAG_CHUNK_OVERLAP` | `100` | Overlap between chunks |
| `CORS_ORIGINS` | `http://localhost:5173` | Allowed CORS origins |

---

## Architecture

```
Patient Input
     │
     ▼
FastAPI /analyze-denial
     │
     ├─► ChromaDB RAG retrieval (drug + payer filtered)
     │         └─► Policy chunks
     │
     ├─► LLM: Classify denial category
     │
     ├─► LLM: Generate plain-English summary
     │         (uses policy chunks as context)
     │
     ├─► LLM: Extract approval requirements
     │
     ├─► LLM: Draft appeal letter
     │
     └─► LLM: Build evidence checklist
              │
              ▼
         JSON Response → React Frontend
```

---

## Disclaimer

This tool is for informational and appeal-preparation support only. It does not guarantee insurance approval and is not medical or legal advice. Any appeal letter generated should be reviewed, modified, and signed by a licensed healthcare provider before submission to an insurance company.
