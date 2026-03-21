import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect width="28" height="28" rx="8" fill="#0e7490"/>
                <path d="M14 7v14M7 14h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className={styles.brandName}>Patient PA Assistant</div>
              <div className={styles.brandTagline}>Oncology Prior Auth Support</div>
            </div>
          </div>
          <div className={styles.badge}>
            <span className="badge badge-teal">Beta · Not Medical Advice</span>
          </div>
        </div>
      </div>
    </header>
  )
}
