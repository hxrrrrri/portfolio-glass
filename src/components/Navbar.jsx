import { Link, useLocation } from 'react-router-dom'

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

export default function Navbar() {
  const { pathname } = useLocation()

  const navLinks = [
    { to: '/projects', label: 'Projects' },
    { to: '/showcase', label: '3D Lab' },
    { to: '/about',    label: 'About' },
    { to: '/contact',  label: 'Contact' },
  ]

  return (
    <header className="glass-bar sticky top-0 z-50">
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 32px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontWeight: 800,
          fontSize: '18px',
          letterSpacing: '-0.04em',
          color: 'rgba(255,255,255,0.95)',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.target.style.color = '#FF4D2D'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.95)'}
        >
          hxrrrrri.
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '4px' }}>
          {navLinks.map(({ to, label }) => {
            const active = pathname === to
            return (
              <Link key={to} to={to} style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.01em',
                textDecoration: 'none',
                color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
                border: active ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color='rgba(255,255,255,0.85)'; e.currentTarget.style.background='rgba(255,255,255,0.06)' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color='rgba(255,255,255,0.5)'; e.currentTarget.style.background='transparent' } }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            B.Tech CSE AI '26
          </span>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer"
            style={{
              width: '34px', height: '34px', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)',
              transition: 'all 0.2s', textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.14)'; e.currentTarget.style.color='#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.color='rgba(255,255,255,0.7)' }}
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </header>
  )
}
