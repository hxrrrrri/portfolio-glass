import { Link } from 'react-router-dom'
export default function Footer() {
  const links = [['/', 'Home'],['/projects','Works'],['/showcase','3D Lab'],['/about','About'],['/contact','Contact']]
  return (
    <footer style={{ borderTop:'1px solid rgba(255,255,255,0.05)', background:'rgba(0,0,0,0.28)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', padding:'44px var(--px)', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:'20px', marginTop:'80px' }}>
      <span style={{ fontSize:'11px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.18)' }}>Harisankar S. © 2025</span>
      <div style={{ display:'flex', gap:'28px' }}>
        {links.map(([to, label]) => (
          <Link key={to} to={to} style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', textDecoration:'none', transition:'color 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.65)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.25)'}>{label}</Link>
        ))}
      </div>
      <span style={{ fontSize:'10px', color:'rgba(255,255,255,0.12)', letterSpacing:'0.04em' }}>React · Vite · GSAP</span>
    </footer>
  )
}
