"""
Central LLM service — all model calls go through here.
Swap out the client/model by changing .env — nothing else needs to change.
"""
import json
import re
import logging
from typing import Any

import anthropic

from app.utils.config import settings

logger = logging.getLogger(__name__)

# Singleton Anthropic client
_client: anthropic.Anthropic | None = None


def get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        _client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
    return _client


def call_llm(prompt: str, max_tokens: int = 2048) -> str:
    """
    Send a prompt to the LLM and return the text response.
    All LLM calls go through this single function.
    """
    client = get_client()
    try:
        message = client.messages.create(
            model=settings.llm_model,
            max_tokens=max_tokens,
            temperature=settings.llm_temperature,
            messages=[{"role": "user", "content": prompt}],
        )
        return message.content[0].text
    except anthropic.APIConnectionError as e:
        logger.error("LLM connection error: %s", e)
        raise RuntimeError("Unable to reach AI service. Please try again.") from e
    except anthropic.AuthenticationError as e:
        logger.error("LLM auth error — check ANTHROPIC_API_KEY")
        raise RuntimeError("AI service authentication failed. Check your API key.") from e
    except Exception as e:
        logger.error("LLM call failed: %s", e)
        raise RuntimeError(f"AI service error: {str(e)}") from e


def call_llm_json(prompt: str, max_tokens: int = 1024) -> Any:
    """
    Call LLM and parse JSON from the response.
    Handles models that sometimes wrap JSON in markdown code fences.
    """
    raw = call_llm(prompt, max_tokens=max_tokens)

    # Strip markdown code fences if present
    cleaned = re.sub(r"```(?:json)?\s*", "", raw).strip().rstrip("```").strip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        # Try to extract JSON object/array from the text
        json_match = re.search(r"(\{.*\}|\[.*\])", cleaned, re.DOTALL)
        if json_match:
            return json.loads(json_match.group(1))
        logger.error("Failed to parse JSON from LLM response: %s", raw[:300])
        raise ValueError(f"LLM returned non-JSON response: {raw[:200]}")
