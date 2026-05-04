import { useState, useEffect } from 'react'

export default function VaultGuard() {
  const [activeTab, setActiveTab] = useState('check') // 'check', 'generate', 'breach'
  
  // States for Strength Check
  const [checkPassword, setCheckPassword] = useState('')
  const [checkResult, setCheckResult] = useState(null)
  const [isLoadingCheck, setIsLoadingCheck] = useState(false)

  // States for Generate
  const [genLength, setGenLength] = useState(16)
  const [genSymbols, setGenSymbols] = useState(true)
  const [genAmbiguous, setGenAmbiguous] = useState(true)
  const [genResult, setGenResult] = useState(null)
  const [isLoadingGen, setIsLoadingGen] = useState(false)

  // States for Breach
  const [breachPassword, setBreachPassword] = useState('')
  const [breachResult, setBreachResult] = useState(null)
  const [isLoadingBreach, setIsLoadingBreach] = useState(false)

  // --- API Calls ---

  const handleCheckStrength = async (e) => {
    e.preventDefault()
    if (!checkPassword) return
    setIsLoadingCheck(true)
    try {
      const res = await fetch('/api/check-strength', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: checkPassword })
      })
      const data = await res.json()
      setCheckResult(data)
    } catch (err) {
      console.error(err)
    }
    setIsLoadingCheck(false)
  }

  const handleGenerate = async (e) => {
    e.preventDefault()
    setIsLoadingGen(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          length: parseInt(genLength),
          include_symbols: genSymbols,
          exclude_ambiguous: genAmbiguous
        })
      })
      const data = await res.json()
      setGenResult(data)
    } catch (err) {
      console.error(err)
    }
    setIsLoadingGen(false)
  }

  const handleCheckBreach = async (e) => {
    e.preventDefault()
    if (!breachPassword) return
    setIsLoadingBreach(true)
    try {
      const res = await fetch('/api/check-breach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: breachPassword })
      })
      const data = await res.json()
      setBreachResult(data)
    } catch (err) {
      console.error(err)
    }
    setIsLoadingBreach(false)
  }

  // --- Helpers ---
  const getBadgeClass = (strength) => {
    if (['Very Strong', 'Strong'].includes(strength)) return 'badge-success'
    if (['Medium'].includes(strength)) return 'badge-warning'
    return 'badge-danger'
  }

  const getProgressColor = (score) => {
    if (score >= 80) return 'var(--success)'
    if (score >= 40) return 'var(--warning)'
    return 'var(--danger)'
  }

  return (
    <>
      <main className="container animate-fade-in">
        <div className="text-center mb-4">
          <h1>Premium Password Security</h1>
          <p>Analyze, generate, and verify your credentials with cryptography.</p>
        </div>

        <div className="glass-panel">
          <div className="tabs">
            <div className={`tab ${activeTab === 'check' ? 'active' : ''}`} onClick={() => setActiveTab('check')}>
              Strength
            </div>
            <div className={`tab ${activeTab === 'generate' ? 'active' : ''}`} onClick={() => setActiveTab('generate')}>
              Generator
            </div>
            <div className={`tab ${activeTab === 'breach' ? 'active' : ''}`} onClick={() => setActiveTab('breach')}>
              Breach Check
            </div>
          </div>

          {/* TAB 1: STRENGTH CHECK */}
          {activeTab === 'check' && (
            <div className="animate-fade-in">
              <form onSubmit={handleCheckStrength}>
                <div className="input-group">
                  <label className="input-label">Password to Analyze</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Enter password..."
                    value={checkPassword}
                    onChange={e => setCheckPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={isLoadingCheck}>
                  {isLoadingCheck ? 'Analyzing...' : 'Analyze Strength'}
                </button>
              </form>

              {checkResult && (
                <div className="result-box animate-fade-in">
                  <div className="flex justify-between items-center mb-2">
                    <h3 style={{ marginBottom: 0 }}>Analysis Result</h3>
                    <span className={`badge ${getBadgeClass(checkResult.strength)}`}>
                      {checkResult.strength}
                    </span>
                  </div>
                  
                  <div className="progress-bg">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${checkResult.score}%`, 
                        backgroundColor: getProgressColor(checkResult.score) 
                      }}
                    />
                  </div>
                  <div className="flex justify-between" style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                    <span>Score: {checkResult.score}/100</span>
                    <span>Entropy: {checkResult.entropy.toFixed(1)} bits</span>
                  </div>

                  {checkResult.feedback && checkResult.feedback.length > 0 && (
                    <div className="mt-4">
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Recommendations:</h4>
                      <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                        {checkResult.feedback.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GENERATOR */}
          {activeTab === 'generate' && (
            <div className="animate-fade-in">
              <form onSubmit={handleGenerate}>
                <div className="input-group">
                  <label className="input-label">Length: {genLength}</label>
                  <input 
                    type="range" 
                    min="8" max="64" 
                    value={genLength}
                    onChange={e => setGenLength(e.target.value)}
                    style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                  />
                </div>

                <label className="checkbox-group">
                  <input 
                    type="checkbox" 
                    checked={genSymbols}
                    onChange={e => setGenSymbols(e.target.checked)}
                  />
                  <span>Include Symbols (@#$%!)</span>
                </label>

                <label className="checkbox-group mb-4">
                  <input 
                    type="checkbox" 
                    checked={genAmbiguous}
                    onChange={e => setGenAmbiguous(e.target.checked)}
                  />
                  <span>Exclude Ambiguous Characters (0, O, 1, I, l)</span>
                </label>

                <button type="submit" className="btn btn-primary w-full" disabled={isLoadingGen}>
                  {isLoadingGen ? 'Generating...' : 'Generate Password'}
                </button>
              </form>

              {genResult && (
                <div className="result-box animate-fade-in text-center">
                  <h4 className="mb-2">Your Secure Password</h4>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--bg-primary)',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '1.5rem',
                    wordBreak: 'break-all',
                    border: '1px solid var(--border-color)',
                    marginBottom: '1rem'
                  }}>
                    {genResult.password}
                  </div>
                  <div className="flex justify-between items-center" style={{ maxWidth: '300px', margin: '0 auto' }}>
                    <span className={`badge ${getBadgeClass(genResult.analysis.strength)}`}>
                      {genResult.analysis.strength}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Entropy: {genResult.analysis.entropy.toFixed(1)} bits
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BREACH CHECK */}
          {activeTab === 'breach' && (
            <div className="animate-fade-in">
              <form onSubmit={handleCheckBreach}>
                <div className="input-group">
                  <label className="input-label">Check against HaveIBeenPwned API (k-anonymity)</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Enter password..."
                    value={breachPassword}
                    onChange={e => setBreachPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={isLoadingBreach}>
                  {isLoadingBreach ? 'Checking...' : 'Check For Breaches'}
                </button>
              </form>

              {breachResult && (
                <div className="result-box animate-fade-in text-center mt-4">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {breachResult.is_breached ? '🚨' : '✅'}
                  </div>
                  <h3 style={{ color: breachResult.is_breached ? 'var(--danger)' : 'var(--success)' }}>
                    {breachResult.message}
                  </h3>
                  {breachResult.is_breached && (
                    <p style={{ marginTop: '0.5rem', fontWeight: 500 }}>
                      Seen {breachResult.breach_count.toLocaleString()} times in known data breaches.
                    </p>
                  )}
                  {!breachResult.is_breached && (
                    <p style={{ marginTop: '0.5rem' }}>
                      This password hasn't been found in any known database breaches.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </>
  )
}
