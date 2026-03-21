import React, { useState, useEffect } from 'react'
import api from '../services/api'
import styles from './IntakeForm.module.css'

const INITIAL_STATE = {
  patient_name: '',
  patient_age: '',
  drug_name: '',
  payer_name: '',
  diagnosis: '',
  denial_text: '',
  biomarker_info: '',
  prior_therapies: '',
  doctor_notes: '',
}

export default function IntakeForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState(INITIAL_STATE)
  const [config, setConfig] = useState({ supported_drugs: [], supported_payers: [] })
  const [scenarios, setScenarios] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.getConfig().then(r => setConfig(r.data)).catch(() => {})
    api.getDemoScenarios().then(r => setScenarios(r.data)).catch(() => {})
  }, [])

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }))
  }

  const loadScenario = (e) => {
    const scenario = scenarios.find(s => s.id === e.target.value)
    if (scenario) setForm({ ...INITIAL_STATE, ...scenario.payload })
    e.target.value = ''
  }

  const validate = () => {
    const errs = {}
    if (!form.patient_name.trim()) errs.patient_name = 'Please enter the patient name'
    if (!form.patient_age || isNaN(form.patient_age)) errs.patient_age = 'Please enter a valid age'
    if (!form.drug_name) errs.drug_name = 'Please select a medication'
    if (!form.payer_name) errs.payer_name = 'Please select a payer'
    if (!form.diagnosis.trim()) errs.diagnosis = 'Please describe the diagnosis'
    if (!form.denial_text.trim()) errs.denial_text = 'Please enter the denial reason or text'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit({ ...form, patient_age: parseInt(form.patient_age, 10) })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Demo scenario bar */}
      {scenarios.length > 0 && (
        <div className={styles.demoBar}>
          <span className={styles.demoLabel}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Try a demo scenario:
          </span>
          <select className={styles.demoSelect} onChange={loadScenario} defaultValue="">
            <option value="" disabled>Select a scenario...</option>
            {scenarios.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      )}

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Patient Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="patient_name">Patient Name</label>
            <input
              id="patient_name"
              className={`form-input ${errors.patient_name ? styles.inputError : ''}`}
              type="text"
              placeholder="e.g. Alex Johnson"
              value={form.patient_name}
              onChange={set('patient_name')}
            />
            {errors.patient_name && <span className={styles.error}>{errors.patient_name}</span>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="patient_age">Patient Age</label>
            <input
              id="patient_age"
              className={`form-input ${errors.patient_age ? styles.inputError : ''}`}
              type="number"
              placeholder="e.g. 62"
              min="0" max="120"
              value={form.patient_age}
              onChange={set('patient_age')}
            />
            {errors.patient_age && <span className={styles.error}>{errors.patient_age}</span>}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Medication & Insurance</h3>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="drug_name">Denied Medication</label>
            <select
              id="drug_name"
              className={`form-select ${errors.drug_name ? styles.inputError : ''}`}
              value={form.drug_name}
              onChange={set('drug_name')}
            >
              <option value="">Select medication...</option>
              {config.supported_drugs.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.drug_name && <span className={styles.error}>{errors.drug_name}</span>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="payer_name">Insurance Company</label>
            <select
              id="payer_name"
              className={`form-select ${errors.payer_name ? styles.inputError : ''}`}
              value={form.payer_name}
              onChange={set('payer_name')}
            >
              <option value="">Select insurance...</option>
              {config.supported_payers.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.payer_name && <span className={styles.error}>{errors.payer_name}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="diagnosis">Cancer Diagnosis</label>
          <input
            id="diagnosis"
            className={`form-input ${errors.diagnosis ? styles.inputError : ''}`}
            type="text"
            placeholder="e.g. Non-small cell lung cancer (NSCLC), Stage III"
            value={form.diagnosis}
            onChange={set('diagnosis')}
          />
          {errors.diagnosis && <span className={styles.error}>{errors.diagnosis}</span>}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Denial Information</h3>
        <div className="form-group">
          <label className="form-label" htmlFor="denial_text">
            Denial Reason or Letter Text
          </label>
          <textarea
            id="denial_text"
            className={`form-textarea ${errors.denial_text ? styles.inputError : ''}`}
            rows={5}
            placeholder="Paste the denial reason from your insurance letter, or describe why you were told the medication was denied..."
            value={form.denial_text}
            onChange={set('denial_text')}
          />
          {errors.denial_text && <span className={styles.error}>{errors.denial_text}</span>}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Additional Information
          <span className={styles.optional}> (optional — helps us give better guidance)</span>
        </h3>
        <div className="form-group">
          <label className="form-label" htmlFor="biomarker_info">
            Biomarker or Lab Test Information
            <span className="optional"> optional</span>
          </label>
          <input
            id="biomarker_info"
            className="form-input"
            type="text"
            placeholder="e.g. PD-L1 test pending, EGFR mutation confirmed, no test done"
            value={form.biomarker_info}
            onChange={set('biomarker_info')}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="prior_therapies">
            Prior Cancer Treatments Tried
            <span className="optional"> optional</span>
          </label>
          <input
            id="prior_therapies"
            className="form-input"
            type="text"
            placeholder="e.g. Chemotherapy with carboplatin (stopped due to toxicity)"
            value={form.prior_therapies}
            onChange={set('prior_therapies')}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="doctor_notes">
            Notes from Your Doctor or Care Team
            <span className="optional"> optional</span>
          </label>
          <textarea
            id="doctor_notes"
            className="form-textarea"
            rows={3}
            placeholder="Any relevant notes or context your doctor has shared..."
            value={form.doctor_notes}
            onChange={set('doctor_notes')}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
        {isLoading ? (
          <>
            <div className={styles.btnSpinner} />
            Analyzing your denial...
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Analyze My Denial
          </>
        )}
      </button>

      <p className={styles.disclaimer}>
        This tool is for educational and appeal-preparation purposes only. Not medical or legal advice.
      </p>
    </form>
  )
}
