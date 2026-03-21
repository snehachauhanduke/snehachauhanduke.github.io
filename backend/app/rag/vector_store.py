"""
ChromaDB vector store — load existing or create empty.
"""
import logging
from functools import lru_cache

import chromadb
from langchain_chroma import Chroma

from app.rag.embeddings import get_embeddings
from app.utils.config import settings

logger = logging.getLogger(__name__)

COLLECTION_NAME = "payer_policies"


@lru_cache(maxsize=1)
def get_vector_store() -> Chroma:
    """Return the Chroma vector store (cached singleton)."""
    embeddings = get_embeddings()
    store = Chroma(
        collection_name=COLLECTION_NAME,
        embedding_function=embeddings,
        persist_directory=settings.chroma_db_path,
    )
    try:
        count = store._collection.count()
        logger.info("ChromaDB loaded — %d documents in collection", count)
        if count == 0:
            logger.warning(
                "ChromaDB is empty. Run the ingestion script: "
                "python -m app.rag.ingest"
            )
    except Exception as e:
        logger.warning("Could not check ChromaDB count: %s", e)
    return store


def retrieve_policy_chunks(
    query: str,
    drug_name: str | None = None,
    payer_name: str | None = None,
    top_k: int | None = None,
) -> list[dict]:
    """
    Retrieve relevant policy chunks from ChromaDB.
    Filters by drug and payer metadata when provided.
    Returns a list of dicts with text, source, drug, payer, score.
    """
    store = get_vector_store()
    k = top_k or settings.rag_top_k

    # Build metadata filter
    where_filter: dict | None = None
    if drug_name and payer_name:
        where_filter = {
            "$and": [
                {"drug": {"$eq": _normalize_drug(drug_name)}},
                {"payer": {"$eq": _normalize_payer(payer_name)}},
            ]
        }
    elif drug_name:
        where_filter = {"drug": {"$eq": _normalize_drug(drug_name)}}
    elif payer_name:
        where_filter = {"payer": {"$eq": _normalize_payer(payer_name)}}

    try:
        if where_filter:
            results = store.similarity_search_with_score(query, k=k, filter=where_filter)
        else:
            results = store.similarity_search_with_score(query, k=k)
    except Exception as e:
        logger.warning("Filtered retrieval failed (%s), falling back to unfiltered", e)
        try:
            results = store.similarity_search_with_score(query, k=k)
        except Exception as e2:
            logger.error("Retrieval completely failed: %s", e2)
            return []

    chunks = []
    for doc, score in results:
        chunks.append({
            "text": doc.page_content,
            "source": doc.metadata.get("source_file", "Unknown"),
            "drug": doc.metadata.get("drug", ""),
            "payer": doc.metadata.get("payer", ""),
            "score": round(float(score), 4),
        })

    return chunks


def _normalize_drug(drug_name: str) -> str:
    """Extract simple drug name for metadata matching."""
    return drug_name.split("(")[0].strip().lower()


def _normalize_payer(payer_name: str) -> str:
    return payer_name.strip().lower()
