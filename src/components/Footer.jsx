import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(0,0,0,0.3)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      padding: '40px 48px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '24px',
    }}>
      <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
        Harisankar S. © 2025
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        {[['/', 'Home'], ['/projects','Works'], ['/showcase','3D Lab'], ['/about','About'], ['/contact','Contact']].map(([to, label]) => (
          <Link key={to} to={to} style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.3)'}
          >{label}</Link>
        ))}
      </div>
      <div style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.04em' }}>
        Built with React · Vite · GSAP
      </div>
    </footer>
  )
}
