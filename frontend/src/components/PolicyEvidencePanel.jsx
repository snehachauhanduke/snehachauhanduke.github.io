import React, { useState } from 'react'
import styles from './PolicyEvidencePanel.module.css'

export default function PolicyEvidencePanel({ snippets }) {
  const [open, setOpen] = useState(false)

  if (!snippets || snippets.length === 0) {
    return (
      <div className={`card ${styles.card}`}>
        <div className={styles.header}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={styles.titleIcon}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          <h2 className={styles.title}>Policy Evidence</h2>
        </div>
        <p className={styles.empty}>
          No policy documents were found for this drug and payer combination.
          General guidelines were used to generate the analysis. Add policy PDFs
          to <code>backend/data/policies/</code> and re-run ingestion to enable
          RAG-based retrieval.
        </p>
      </div>
    )
  }

  return (
    <div className={`card ${styles.card}`}>
      <button className={styles.toggleHeader} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <div className={styles.headerLeft}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={styles.titleIcon}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          <h2 className={styles.title}>Policy Evidence Used</h2>
          <span className="badge badge-gray">{snippets.length} source{snippets.length !== 1 ? 's' : ''}</span>
        </div>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className={styles.snippets}>
          <p className={styles.intro}>
            These excerpts were retrieved from payer policy documents and used to inform the analysis above.
          </p>
          {snippets.map((s, i) => (
            <div key={i} className={styles.snippet}>
              <div className={styles.snippetMeta}>
                <span className="badge badge-teal">{s.payer || 'Policy'}</span>
                {s.drug && <span className="badge badge-blue">{s.drug}</span>}
                <span className={styles.source}>{s.source}</span>
                {s.score != null && (
                  <span className={styles.score}>relevance: {(1 - s.score).toFixed(2)}</span>
                )}
              </div>
              <p className={styles.snippetText}>{s.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
