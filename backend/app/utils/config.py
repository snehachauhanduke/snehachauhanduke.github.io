"""
App configuration — loaded from .env file.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # LLM
    anthropic_api_key: str = "sk-ant-placeholder"
    llm_model: str = "claude-sonnet-4-6"
    llm_temperature: float = 0.3

    # Embeddings
    embedding_provider: str = "local"  # "local" or "openai"

    # ChromaDB
    chroma_db_path: str = "./chroma_db"

    # RAG
    policy_pdf_dir: str = "./data/policies"
    rag_top_k: int = 5
    rag_chunk_size: int = 800
    rag_chunk_overlap: int = 100

    # CORS
    cors_origins: str = "http://localhost:5173,http://localhost:3000"

    # Server
    port: int = 8000

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",")]


settings = Settings()
