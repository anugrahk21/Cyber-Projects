import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import VaultGuard from './pages/VaultGuard'
import { Shield } from 'lucide-react'
import './index.css'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <Router>
      <header className="app-header">
        <Link to="/" style={{ textDecoration: 'none' }} className="brand">
          <Shield style={{ width: '28px', height: '28px', color: 'var(--accent-primary)' }} />
          <span>Cyber Lab</span>
        </Link>
        <button className="btn btn-secondary" onClick={toggleTheme} style={{ padding: '0.5rem 1rem' }}>
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/VaultGuard" element={<VaultGuard />} />
      </Routes>
    </Router>
  )
}

export default App
