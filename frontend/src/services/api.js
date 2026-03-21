/**
 * API service — all backend calls centralized here.
 */
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 120_000, // 2 min — LLM calls can be slow
  headers: { 'Content-Type': 'application/json' },
})

export const api = {
  /** Check backend health */
  health: () => client.get('/health'),

  /** Get supported drugs and payers */
  getConfig: () => client.get('/config'),

  /** Get pre-built demo scenarios */
  getDemoScenarios: () => client.get('/demo-scenarios'),

  /** Submit denial for analysis */
  analyzeDenial: (payload) => client.post('/analyze-denial', payload),
}

export default api
