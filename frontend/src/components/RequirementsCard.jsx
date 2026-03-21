import React from 'react'
import styles from './RequirementsCard.module.css'

export default function RequirementsCard({ requirements, drugName, payerName }) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={styles.titleIcon}>
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
          <h2 className={styles.title}>What Your Insurer May Require</h2>
        </div>
        <p className={styles.subtitle}>
          Based on <strong>{payerName}</strong>'s coverage guidelines for{' '}
          <strong>{drugName}</strong>
        </p>
      </div>

      <ul className={styles.list}>
        {requirements.map((req, i) => (
          <li key={i} className={styles.item}>
            <div className={styles.bullet}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span>{req}</span>
          </li>
        ))}
      </ul>

      <div className={styles.note}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
        </svg>
        <span>
          These requirements are based on typical payer guidelines and the policy documents available to this tool.
          Your specific case may have additional requirements — your oncology team can clarify.
        </span>
      </div>
    </div>
  )
}
