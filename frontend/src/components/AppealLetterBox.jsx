import React, { useState } from 'react'
import styles from './AppealLetterBox.module.css'

export default function AppealLetterBox({ letter }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(letter)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = letter
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const previewLines = letter.split('\n').slice(0, 8).join('\n')
  const hasMore = letter.split('\n').length > 8

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={styles.titleIcon}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <h2 className={styles.title}>Draft Appeal Letter</h2>
        </div>

        <div className={styles.actions}>
          <button className="btn btn-ghost btn-sm" onClick={copyToClipboard}>
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy Letter
              </>
            )}
          </button>
        </div>
      </div>

      <div className={styles.warning}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>
          This is an AI-generated draft for planning purposes only.{' '}
          <strong>Your doctor or provider must review and sign before submission.</strong>
          {' '}Fill in all <code>[PLACEHOLDERS]</code> before sending.
        </span>
      </div>

      <div className={styles.letterContainer}>
        <pre className={styles.letterText}>
          {expanded || !hasMore ? letter : previewLines + '\n...'}
        </pre>

        {hasMore && (
          <button
            className={styles.expandBtn}
            onClick={() => setExpanded(e => !e)}
          >
            {expanded ? (
              <>Show less ↑</>
            ) : (
              <>Show full letter ↓</>
            )}
          </button>
        )}
      </div>

      <div className={styles.footer}>
        <button className="btn btn-primary btn-sm" onClick={copyToClipboard}>
          {copied ? '✓ Copied to clipboard' : 'Copy to clipboard'}
        </button>
        <span className={styles.footerNote}>
          Then paste into a Word doc to share with your provider
        </span>
      </div>
    </div>
  )
}
