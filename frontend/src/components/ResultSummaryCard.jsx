import React from 'react'
import styles from './ResultSummaryCard.module.css'

const CATEGORY_CONFIG = {
  biomarker_missing: {
    icon: '🔬',
    color: 'blue',
    badge: 'badge-blue',
  },
  step_therapy_not_met: {
    icon: '📋',
    color: 'orange',
    badge: 'badge-orange',
  },
  medical_necessity_insufficient: {
    icon: '📄',
    color: 'yellow',
    badge: 'badge-yellow',
  },
  coverage_criteria_mismatch: {
    icon: '⚠️',
    color: 'orange',
    badge: 'badge-orange',
  },
  unknown_ambiguous: {
    icon: '❓',
    color: 'gray',
    badge: 'badge-gray',
  },
}

export default function ResultSummaryCard({ result }) {
  const config = CATEGORY_CONFIG[result.denial_category] || CATEGORY_CONFIG.unknown_ambiguous

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.header}>
        <div className={styles.iconWrap}>
          <span className={styles.icon} role="img" aria-label="denial category icon">
            {config.icon}
          </span>
        </div>
        <div>
          <p className={styles.eyebrow}>Likely Reason for Denial</p>
          <span className={`badge ${config.badge}`}>
            {result.denial_category_label}
          </span>
        </div>
      </div>

      <hr className="divider" />

      <div className={styles.summary}>
        {result.plain_english_summary.split('\n').filter(Boolean).map((para, i) => (
          <p key={i} className={styles.para}>{para}</p>
        ))}
      </div>

      <div className={styles.nextStep}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.62 5a2 2 0 0 1 1.72-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 18z"/>
        </svg>
        <span>
          <strong>Your next step:</strong> Share this analysis with your oncologist or care team.
          They can help gather the right documents and submit the appeal on your behalf.
        </span>
      </div>
    </div>
  )
}
