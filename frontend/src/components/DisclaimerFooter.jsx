import React from 'react'
import styles from './DisclaimerFooter.module.css'

export default function DisclaimerFooter({ text }) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.iconWrap} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
          </div>
          <div>
            <p className={styles.label}>Important Disclaimer</p>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
