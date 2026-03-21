"""
Patient PA Assistant — FastAPI application entry point.
"""
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.utils.config import settings
from app.routes.analyze import router as analyze_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Patient PA Assistant API",
    description=(
        "Helps patients understand and respond to oncology drug prior authorization denials. "
        "Not medical or legal advice."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)


@app.on_event("startup")
async def startup_event():
    logger.info("Patient PA Assistant API starting up...")
    logger.info("LLM model: %s", settings.llm_model)
    logger.info("ChromaDB path: %s", settings.chroma_db_path)
    logger.info("Policy PDF dir: %s", settings.policy_pdf_dir)
