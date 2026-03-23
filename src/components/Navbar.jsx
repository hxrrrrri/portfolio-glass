import { Link, useLocation } from 'react-router-dom'
const GH = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>

export default function Navbar() {
  const { pathname } = useLocation()
  const links = [
    { to:'/projects', label:'Projects' },
    { to:'/showcase', label:'3D Lab' },
    { to:'/about',    label:'About' },
    { to:'/contact',  label:'Contact' },
  ]

  return (
    <header className="g-bar" style={{ position:'sticky', top:0, zIndex:200, height:'62px' }}>
      <div style={{ height:'100%', padding:'0 var(--px)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{
          fontWeight:900, fontSize:'18px', letterSpacing:'-0.05em',
          background:'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.65) 100%)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          textDecoration:'none', marginRight:'36px', transition:'opacity 0.2s',
        }}
          onMouseEnter={e=>e.currentTarget.style.opacity='0.7'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}
        >hxrrrrri.</Link>

        {/* Nav */}
        <nav style={{ display:'flex', gap:'2px', flex:1 }}>
          {links.map(({ to, label }) => {
            const active = pathname === to
            return (
              <Link key={to} to={to} style={{
                padding:'7px 16px', borderRadius:'10px',
                fontSize:'12px', fontWeight:active?700:500, letterSpacing:'0.02em',
                textDecoration:'none', position:'relative',
                color: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.40)',
                background: active ? 'rgba(255,255,255,0.085)' : 'transparent',
                border: active ? '1px solid rgba(255,255,255,0.10)' : '1px solid transparent',
                boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.10)' : 'none',
                transition:'all 0.22s cubic-bezier(0.16,1,0.3,1)',
              }}
                onMouseEnter={e=>{ if(!active){ e.currentTarget.style.color='rgba(255,255,255,0.80)'; e.currentTarget.style.background='rgba(255,255,255,0.05)' }}}
                onMouseLeave={e=>{ if(!active){ e.currentTarget.style.color='rgba(255,255,255,0.40)'; e.currentTarget.style.background='transparent' }}}
              >
                {label}
                {active && <span style={{ position:'absolute', bottom:'-1px', left:'50%', transform:'translateX(-50%)', width:'4px', height:'4px', borderRadius:'50%', background:'var(--accent)', boxShadow:'0 0 8px var(--accent)' }}/>}
              </Link>
            )
          })}
        </nav>

        {/* Right */}
        <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
          <span style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.20)' }}>
            B.Tech CSE AI '26
          </span>
          {/* Status dot */}
          <span style={{ display:'flex', alignItems:'center', gap:'7px', padding:'5px 12px', borderRadius:'999px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22ff88', boxShadow:'0 0 8px #22ff88', animation:'blink 2s ease-in-out infinite' }}/>
            <span style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)' }}>Open</span>
          </span>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="btn-icon btn-ghost"
            style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'36px', height:'36px', padding:0, borderRadius:'11px', color:'rgba(255,255,255,0.55)', textDecoration:'none' }}
            onMouseEnter={e=>{ e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(255,255,255,0.12)' }}
            onMouseLeave={e=>{ e.currentTarget.style.color='rgba(255,255,255,0.55)'; e.currentTarget.style.background='rgba(255,255,255,0.085)' }}
          ><GH/></a>
        </div>
      </div>
    </header>
  )
}
