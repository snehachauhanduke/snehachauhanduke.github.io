import React, { useState } from 'react'
import styles from './EvidenceChecklist.module.css'

export default function EvidenceChecklist({ checklist }) {
  const [checked, setChecked] = useState({})

  const toggle = (i) => setChecked(c => ({ ...c, [i]: !c[i] }))
  const completedCount = Object.values(checked).filter(Boolean).length

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={styles.titleIcon}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <h2 className={styles.title}>Documents to Gather</h2>
        </div>
        <div className={styles.progress}>
          <span className={styles.progressText}>
            {completedCount} of {checklist.length} gathered
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(completedCount / checklist.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <p className={styles.intro}>
        Ask your care team to help you collect these documents before filing an appeal.
        Check each one off as you gather it.
      </p>

      <ul className={styles.list}>
        {checklist.map((item, i) => (
          <li
            key={i}
            className={`${styles.item} ${checked[i] ? styles.itemChecked : ''}`}
            onClick={() => toggle(i)}
          >
            <div className={`${styles.checkbox} ${checked[i] ? styles.checkboxChecked : ''}`}>
              {checked[i] && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
            <span className={styles.itemText}>{item}</span>
          </li>
        ))}
      </ul>

      {completedCount === checklist.length && checklist.length > 0 && (
        <div className={styles.allDone}>
          🎉 Great work! You've gathered all the suggested documents. Now share them with your oncologist to proceed with the appeal.
        </div>
      )}
    </div>
  )
}
