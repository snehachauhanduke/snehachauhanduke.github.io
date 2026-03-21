import React from 'react'
import IntakeForm from '../components/IntakeForm'
import styles from './HomePage.module.css'

export default function HomePage({ onSubmit, isLoading }) {
  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className={styles.headline}>
              Understand Your{' '}
              <span className={styles.highlight}>Insurance Denial</span>
            </h1>
            <p className={styles.subtext}>
              If your cancer medication was denied by your insurance company,
              you are not alone — and you have options. Enter your denial details
              below and we'll help you understand what happened, what your insurer
              needs, and how to appeal.
            </p>
            <div className={styles.pills}>
              <div className={styles.pill}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Plain-language explanation
              </div>
              <div className={styles.pill}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Draft appeal letter
              </div>
              <div className={styles.pill}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Document checklist
              </div>
              <div className={styles.pill}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Payer policy evidence
              </div>
            </div>
          </div>
        </div>

        <div className={`card ${styles.formCard}`}>
          <IntakeForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>
    </main>
  )
}
