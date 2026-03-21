import React, { useState, useEffect } from 'react'
import styles from './LoadingState.module.css'

const MESSAGES = [
  'Reading your denial details...',
  'Searching payer policy documents...',
  'Classifying the denial reason...',
  'Generating your plain-language summary...',
  'Drafting your appeal letter...',
  'Building your evidence checklist...',
  'Putting it all together...',
]

export default function LoadingState() {
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx(i => (i + 1) % MESSAGES.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.spinner} aria-hidden="true" />
      <h2 className={styles.heading}>Analyzing Your Denial</h2>
      <p className={styles.message}>{MESSAGES[msgIdx]}</p>
      <p className={styles.note}>
        This may take 20–40 seconds while the AI reviews your case.
      </p>
    </div>
  )
}
