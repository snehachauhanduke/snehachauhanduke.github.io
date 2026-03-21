import React, { useState } from 'react'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import LoadingState from './components/LoadingState'
import api from './services/api'
import styles from './App.module.css'

export default function App() {
  const [view, setView] = useState('home') // 'home' | 'loading' | 'results' | 'error'
  const [result, setResult] = useState(null)
  const [request, setRequest] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (payload) => {
    setRequest(payload)
    setView('loading')
    setErrorMessage('')

    try {
      const response = await api.analyzeDenial(payload)
      setResult(response.data)
      setView('results')
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        'An unexpected error occurred. Please try again.'
      setErrorMessage(typeof detail === 'string' ? detail : JSON.stringify(detail))
      setView('error')
    }
  }

  const handleStartOver = () => {
    setView('home')
    setResult(null)
    setRequest(null)
    setErrorMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.app}>
      <Header />

      {view === 'home' && (
        <HomePage onSubmit={handleSubmit} isLoading={false} />
      )}

      {view === 'loading' && (
        <div className="container">
          <LoadingState />
        </div>
      )}

      {view === 'results' && result && (
        <ResultsPage
          result={result}
          request={request}
          onStartOver={handleStartOver}
        />
      )}

      {view === 'error' && (
        <div className="container">
          <div className={styles.errorBox}>
            <div className={styles.errorIcon} aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h2 className={styles.errorTitle}>Something went wrong</h2>
            <p className={styles.errorMessage}>{errorMessage}</p>
            <div className={styles.errorActions}>
              <button className="btn btn-primary" onClick={handleStartOver}>
                Try again
              </button>
              <p className={styles.errorHint}>
                If the problem persists, make sure the backend is running and your API key is configured.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
