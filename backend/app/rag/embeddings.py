"""
Embedding provider — local (sentence-transformers) or OpenAI.
"""
import logging
from functools import lru_cache

from app.utils.config import settings

logger = logging.getLogger(__name__)


@lru_cache(maxsize=1)
def get_embeddings():
    """Return the configured embedding function (cached singleton)."""
    provider = settings.embedding_provider.lower()

    if provider == "local":
        logger.info("Using local sentence-transformers embeddings")
        try:
            from langchain_community.embeddings import HuggingFaceEmbeddings
            return HuggingFaceEmbeddings(
                model_name="all-MiniLM-L6-v2",
                model_kwargs={"device": "cpu"},
                encode_kwargs={"normalize_embeddings": True},
            )
        except ImportError:
            raise RuntimeError(
                "sentence-transformers not installed. Run: pip install sentence-transformers"
            )

    elif provider == "openai":
        logger.info("Using OpenAI embeddings")
        from langchain_openai import OpenAIEmbeddings
        return OpenAIEmbeddings()

    else:
        raise ValueError(f"Unknown embedding provider: {provider}. Use 'local' or 'openai'.")
