import { Link } from 'react-router-dom'
import { Shield, Lock, Activity, ArrowRight } from 'lucide-react'
import '../index.css'

export default function Home() {
  const projects = [
    {
      id: 'VaultGuard',
      name: 'VaultGuard',
      description: 'Premium Password Security Analyzer & Generator with cryptographic entropy checks.',
      icon: <Lock className="w-8 h-8 mb-4 text-blue-400" />,
      path: '/project/VaultGuard',
      tags: ['Cryptography', 'Python', 'React']
    },
    // Future projects will go here
  ]

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '1000px', paddingTop: '4rem' }}>
      <div className="text-center mb-5" style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Shield style={{ width: '64px', height: '64px', color: 'var(--accent-primary)' }} />
        </div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Cybersecurity Lab</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          A unified portfolio of interactive cybersecurity tools, cryptographic demonstrators, and security utilities.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {projects.map((project) => (
          <Link
            key={project.id}
            to={project.path}
            className="glass-panel"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {project.icon}
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              {project.name}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {project.tags.map(tag => (
                <span key={tag} className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--accent-primary)',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}>
              Launch Project <ArrowRight className="ml-2 w-4 h-4" style={{ marginLeft: '0.5rem' }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
