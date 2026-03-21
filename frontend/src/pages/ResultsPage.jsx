import React from 'react'
import ResultSummaryCard from '../components/ResultSummaryCard'
import RequirementsCard from '../components/RequirementsCard'
import EvidenceChecklist from '../components/EvidenceChecklist'
import AppealLetterBox from '../components/AppealLetterBox'
import PolicyEvidencePanel from '../components/PolicyEvidencePanel'
import DisclaimerFooter from '../components/DisclaimerFooter'
import styles from './ResultsPage.module.css'

export default function ResultsPage({ result, request, onStartOver }) {
  return (
    <div>
      <main className={styles.main}>
        <div className="container">
          {/* Back + context bar */}
          <div className={styles.topBar}>
            <button className="btn btn-ghost btn-sm" onClick={onStartOver}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Start over
            </button>
            <div className={styles.contextBadges}>
              <span className="badge badge-blue">{request.drug_name}</span>
              <span className="badge badge-gray">{request.payer_name}</span>
              <span className="badge badge-teal">{request.patient_name}</span>
            </div>
          </div>

          <div className={styles.pageHeader}>
            <h1 className={styles.heading}>Your Denial Analysis</h1>
            <p className={styles.subheading}>
              Here's what we found based on your denial information and{' '}
              {request.payer_name}'s coverage guidelines.
            </p>
          </div>

          {/* Section 1: Summary */}
          <section className={styles.section}>
            <ResultSummaryCard result={result} />
          </section>

          {/* Section 2: Requirements */}
          <section className={styles.section}>
            <RequirementsCard
              requirements={result.approval_requirements}
              drugName={request.drug_name}
              payerName={request.payer_name}
            />
          </section>

          {/* Section 3: Evidence checklist */}
          <section className={styles.section}>
            <EvidenceChecklist checklist={result.evidence_checklist} />
          </section>

          {/* Section 4: Appeal letter */}
          <section className={styles.section}>
            <AppealLetterBox letter={result.appeal_letter} />
          </section>

          {/* Section 5: Policy evidence (collapsed by default) */}
          <section className={styles.section}>
            <PolicyEvidencePanel snippets={result.retrieved_policy_snippets} />
          </section>

          {/* Start over button */}
          <div className={styles.startOver}>
            <button className="btn btn-secondary" onClick={onStartOver}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
              </svg>
              Analyze another denial
            </button>
          </div>
        </div>
      </main>

      <DisclaimerFooter text={result.disclaimer} />
    </div>
  )
}
