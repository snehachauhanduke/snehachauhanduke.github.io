"""
PDF ingestion script.

Usage:
    cd backend
    python -m app.rag.ingest

Scans backend/data/policies/ for PDFs.
File naming convention for metadata extraction:
    <payer>_<drug>_policy.pdf
    e.g.  UnitedHealthcare_Keytruda_policy.pdf
          Aetna_Tagrisso_policy.pdf

Falls back to filename-based metadata if naming convention not matched.
"""
import logging
import os
import re
import sys
from pathlib import Path

import fitz  # PyMuPDF
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

# Add parent to path for direct execution
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from app.rag.embeddings import get_embeddings
from app.utils.config import settings

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

# Known drug/payer name variants for metadata normalization
KNOWN_DRUGS = {
    "keytruda": "keytruda",
    "pembrolizumab": "keytruda",
    "opdivo": "opdivo",
    "nivolumab": "opdivo",
    "darzalex": "darzalex",
    "daratumumab": "darzalex",
    "ibrance": "ibrance",
    "palbociclib": "ibrance",
    "tagrisso": "tagrisso",
    "osimertinib": "tagrisso",
}

KNOWN_PAYERS = {
    "unitedhealthcare": "unitedhealthcare",
    "united": "unitedhealthcare",
    "uhc": "unitedhealthcare",
    "aetna": "aetna",
}


def extract_text_from_pdf(pdf_path: Path) -> str:
    """Extract all text from a PDF using PyMuPDF."""
    text_parts = []
    with fitz.open(str(pdf_path)) as doc:
        for page in doc:
            text_parts.append(page.get_text())
    return "\n".join(text_parts)


def extract_metadata_from_filename(filename: str) -> dict:
    """
    Try to extract drug and payer from filename.
    Format: <Payer>_<Drug>_policy.pdf or <Payer>_<Drug>.pdf
    """
    stem = Path(filename).stem.lower().replace("-", "_")
    parts = stem.split("_")

    drug = None
    payer = None

    for part in parts:
        if part in KNOWN_PAYERS:
            payer = KNOWN_PAYERS[part]
        if part in KNOWN_DRUGS:
            drug = KNOWN_DRUGS[part]

    return {
        "drug": drug or "unknown",
        "payer": payer or "unknown",
        "therapeutic_area": "oncology",
        "source_file": filename,
    }


def ingest_pdfs(policy_dir: str | None = None) -> int:
    """
    Scan policy directory, parse PDFs, chunk, embed, and store in ChromaDB.
    Returns number of chunks stored.
    """
    pdf_dir = Path(policy_dir or settings.policy_pdf_dir)
    if not pdf_dir.exists():
        logger.error("Policy directory not found: %s", pdf_dir)
        return 0

    pdf_files = list(pdf_dir.glob("*.pdf"))
    if not pdf_files:
        logger.warning("No PDF files found in %s", pdf_dir)
        logger.info("Place payer policy PDFs in %s to enable RAG retrieval.", pdf_dir)
        return 0

    logger.info("Found %d PDF file(s) to ingest", len(pdf_files))

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.rag_chunk_size,
        chunk_overlap=settings.rag_chunk_overlap,
        separators=["\n\n", "\n", ". ", " ", ""],
    )

    all_docs: list[Document] = []
    for pdf_path in pdf_files:
        logger.info("Processing: %s", pdf_path.name)
        try:
            text = extract_text_from_pdf(pdf_path)
            if not text.strip():
                logger.warning("No text extracted from %s — skipping", pdf_path.name)
                continue

            metadata = extract_metadata_from_filename(pdf_path.name)
            chunks = splitter.create_documents(
                texts=[text],
                metadatas=[metadata],
            )
            logger.info("  → %d chunks from %s", len(chunks), pdf_path.name)
            all_docs.extend(chunks)

        except Exception as e:
            logger.error("Failed to process %s: %s", pdf_path.name, e)

    if not all_docs:
        logger.warning("No documents to ingest.")
        return 0

    logger.info("Storing %d chunks in ChromaDB at %s", len(all_docs), settings.chroma_db_path)

    from langchain_chroma import Chroma
    embeddings = get_embeddings()

    # Clear existing and rebuild
    store = Chroma(
        collection_name="payer_policies",
        embedding_function=embeddings,
        persist_directory=settings.chroma_db_path,
    )

    # Add in batches to avoid memory issues
    batch_size = 50
    for i in range(0, len(all_docs), batch_size):
        batch = all_docs[i:i + batch_size]
        store.add_documents(batch)
        logger.info("  Stored batch %d/%d", i // batch_size + 1, (len(all_docs) - 1) // batch_size + 1)

    logger.info("Ingestion complete — %d chunks stored.", len(all_docs))
    return len(all_docs)


if __name__ == "__main__":
    count = ingest_pdfs()
    sys.exit(0 if count >= 0 else 1)
