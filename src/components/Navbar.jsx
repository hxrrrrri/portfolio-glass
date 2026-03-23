import { Link, useLocation } from 'react-router-dom'
const GH = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
export default function Navbar() {
  const { pathname } = useLocation()
  const links = [['/', 'MR.K', true],  ['/projects','Projects'], ['/showcase','3D Lab'], ['/about','About'], ['/contact','Contact']]
  return (
    <header className="g-bar" style={{ position:'sticky', top:0, zIndex:50, height:'62px' }}>
      <div style={{ height:'100%', padding:'0 var(--px)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <Link to="/" style={{ fontWeight:900, fontSize:'17px', letterSpacing:'-0.04em', color:'rgba(255,255,255,0.95)', textDecoration:'none', marginRight:'28px', transition:'color 0.2s' }}
            onMouseEnter={e=>e.target.style.color='#FF4D2D'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.95)'}>MR.K</Link>
          {['/projects','/showcase','/about','/contact'].map(to => {
            const label = {'/projects':'Projects','/showcase':'3D Lab','/about':'About','/contact':'Contact'}[to]
            const active = pathname === to
            return (
              <Link key={to} to={to} style={{ padding:'7px 15px', borderRadius:'9px', fontSize:'12px', fontWeight:600, letterSpacing:'0.02em', textDecoration:'none',
                color: active ? '#fff' : 'rgba(255,255,255,0.42)',
                background: active ? 'rgba(255,255,255,0.09)' : 'transparent',
                border: active ? '1px solid rgba(255,255,255,0.11)' : '1px solid transparent',
                transition:'all 0.2s' }}
                onMouseEnter={e=>{ if(!active){e.currentTarget.style.color='rgba(255,255,255,0.8)';e.currentTarget.style.background='rgba(255,255,255,0.05)'}}}
                onMouseLeave={e=>{ if(!active){e.currentTarget.style.color='rgba(255,255,255,0.42)';e.currentTarget.style.background='transparent'}}}
              >{label}</Link>
            )
          })}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <span style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(255,255,255,0.22)' }}>B.Tech CSE AI '26</span>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer"
            style={{ width:'34px', height:'34px', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.10)', color:'rgba(255,255,255,0.6)', textDecoration:'none', transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)';e.currentTarget.style.color='#fff'}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.6)'}}
          ><GH /></a>
        </div>
      </div>
    </header>
  )
}
