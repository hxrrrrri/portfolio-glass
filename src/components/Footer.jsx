import { Link } from 'react-router-dom'
const links=[['/', 'Home'],['/projects','Works'],['/showcase','3D Lab'],['/about','About'],['/contact','Contact']]
export default function Footer() {
  return (
    <footer style={{ marginTop:'80px', borderTop:'1px solid rgba(255,255,255,0.045)', background:'rgba(0,0,0,0.25)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)', padding:'40px var(--px)' }}>
      <div className="footer-grid" style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:'20px' }}>
        <div>
          <div style={{ fontSize:'16px', fontWeight:900, letterSpacing:'-0.04em', background:'linear-gradient(135deg,#fff,rgba(255,255,255,0.5))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:'4px' }}>hxrrrrri.</div>
          <div style={{ fontSize:'10px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.18)' }}>Harisankar S. © 2025</div>
        </div>
        <nav style={{ display:'flex', flexWrap:'wrap', gap:'16px' }}>
          {links.map(([to, label]) => (
            <Link key={to} to={to} style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.24)', textDecoration:'none', transition:'color 0.22s' }}
              onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.70)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.24)'}>{label}</Link>
          ))}
        </nav>
        <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.12)', letterSpacing:'0.06em' }}>React · Vite · GSAP</div>
      </div>
    </footer>
  )
}
