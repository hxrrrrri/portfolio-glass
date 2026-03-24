import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const GH = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>

// ─────────────────────────────────────────────────────────────────
// 10 ULTRA-LUXURY THEMES
// Each has TWO distinct complementary colours:
//   --a1/a-r/g/b  = PRIMARY accent   (buttons, labels, glows, highlights)
//   --a2/b-r/g/b  = SECONDARY accent (orb2, bg-layer2, grad-text tint, orb4)
// Both colours are deliberately different hues for maximum visual distinction.
// ─────────────────────────────────────────────────────────────────
const THEMES = [
  {
    id:'obsidian', name:'Obsidian', emoji:'🖤',
    dot1:'#FF4D2D', dot2:'#4040C8',
    desc:'Burnt ember · Midnight indigo',
    vars:{
      // Primary: deep burnt orange-red
      '--a1':'#FF4D2D','--a-r':'255','--a-g':'77','--a-b':'45',
      // Secondary: midnight indigo-blue
      '--a2':'#5555D8','--b-r':'85','--b-g':'85','--b-b':'216',
      '--bg-layer1':'rgba(255,77,45,0.16)','--bg-layer2':'rgba(40,40,180,0.18)',
      '--bg-layer3':'rgba(255,140,30,0.05)',
      '--bg-dark1':'#080710','--bg-dark2':'#0a0818','--bg-dark3':'#0c091c','--bg-dark4':'#07080e',
      '--orb1':'rgba(255,77,45,0.13)','--orb2':'rgba(40,40,200,0.16)','--orb3':'rgba(255,140,30,0.05)',
    },
  },
  {
    id:'arctic', name:'Arctic', emoji:'❄️',
    dot1:'#4FC3F7', dot2:'#7C3AED',
    desc:'Glacial cyan · Polar violet',
    vars:{
      '--a1':'#4FC3F7','--a-r':'79','--a-g':'195','--a-b':'247',
      '--a2':'#7C3AED','--b-r':'124','--b-g':'58','--b-b':'237',
      '--bg-layer1':'rgba(30,140,230,0.14)','--bg-layer2':'rgba(80,25,200,0.18)',
      '--bg-layer3':'rgba(150,210,255,0.04)',
      '--bg-dark1':'#05080f','--bg-dark2':'#070a18','--bg-dark3':'#08091c','--bg-dark4':'#04070d',
      '--orb1':'rgba(40,150,240,0.12)','--orb2':'rgba(90,30,210,0.15)','--orb3':'rgba(140,200,255,0.04)',
    },
  },
  {
    id:'emerald', name:'Emerald', emoji:'💚',
    dot1:'#00D18C', dot2:'#D4A017',
    desc:'Liquid malachite · Aged gold',
    vars:{
      '--a1':'#00D18C','--a-r':'0','--a-g':'209','--a-b':'140',
      '--a2':'#D4A017','--b-r':'212','--b-g':'160','--b-b':'23',
      '--bg-layer1':'rgba(0,180,115,0.14)','--bg-layer2':'rgba(150,100,10,0.18)',
      '--bg-layer3':'rgba(0,255,160,0.04)',
      '--bg-dark1':'#030e08','--bg-dark2':'#081208','--bg-dark3':'#061410','--bg-dark4':'#030c07',
      '--orb1':'rgba(0,195,120,0.12)','--orb2':'rgba(160,105,8,0.16)','--orb3':'rgba(0,240,150,0.04)',
    },
  },
  {
    id:'aurum', name:'Aurum', emoji:'✨',
    dot1:'#E8B84B', dot2:'#C05050',
    desc:'Liquid gold · Vermillion lacquer',
    vars:{
      '--a1':'#E8B84B','--a-r':'232','--a-g':'184','--a-b':'75',
      '--a2':'#C05050','--b-r':'192','--b-g':'80','--b-b':'80',
      '--bg-layer1':'rgba(200,155,25,0.16)','--bg-layer2':'rgba(160,50,50,0.16)',
      '--bg-layer3':'rgba(255,210,80,0.04)',
      '--bg-dark1':'#0d0c07','--bg-dark2':'#150e06','--bg-dark3':'#130f07','--bg-dark4':'#0b0a05',
      '--orb1':'rgba(210,160,30,0.12)','--orb2':'rgba(175,55,55,0.14)','--orb3':'rgba(255,205,55,0.04)',
    },
  },
  {
    id:'sakura', name:'Sakura', emoji:'🌸',
    dot1:'#FF6B9D', dot2:'#5BC8C8',
    desc:'Cherry blossom · Jade river',
    vars:{
      '--a1':'#FF6B9D','--a-r':'255','--a-g':'107','--a-b':'157',
      '--a2':'#5BC8C8','--b-r':'91','--b-g':'200','--b-b':'200',
      '--bg-layer1':'rgba(230,60,120,0.14)','--bg-layer2':'rgba(40,160,160,0.16)',
      '--bg-layer3':'rgba(255,180,210,0.04)',
      '--bg-dark1':'#0e0809','--bg-dark2':'#0c0f0f','--bg-dark3':'#0f0910','--bg-dark4':'#0b0709',
      '--orb1':'rgba(245,70,130,0.12)','--orb2':'rgba(45,175,175,0.14)','--orb3':'rgba(255,170,200,0.04)',
    },
  },
  {
    id:'amethyst', name:'Amethyst', emoji:'💜',
    dot1:'#A78BFA', dot2:'#F59E0B',
    desc:'Deep amethyst · Saffron ember',
    vars:{
      '--a1':'#A78BFA','--a-r':'167','--a-g':'139','--a-b':'250',
      '--a2':'#F59E0B','--b-r':'245','--b-g':'158','--b-b':'11',
      '--bg-layer1':'rgba(110,70,230,0.14)','--bg-layer2':'rgba(180,110,5,0.18)',
      '--bg-layer3':'rgba(200,180,255,0.04)',
      '--bg-dark1':'#08070f','--bg-dark2':'#0e0b06','--bg-dark3':'#0d0a1a','--bg-dark4':'#07060d',
      '--orb1':'rgba(120,75,240,0.12)','--orb2':'rgba(190,115,5,0.15)','--orb3':'rgba(185,155,255,0.05)',
    },
  },
  {
    id:'copper', name:'Copper', emoji:'🔶',
    dot1:'#E07B39', dot2:'#3B82C4',
    desc:'Oxidised copper · Cerulean steel',
    vars:{
      '--a1':'#E07B39','--a-r':'224','--a-g':'123','--a-b':'57',
      '--a2':'#3B82C4','--b-r':'59','--b-g':'130','--b-b':'196',
      '--bg-layer1':'rgba(190,95,30,0.16)','--bg-layer2':'rgba(35,100,175,0.18)',
      '--bg-layer3':'rgba(255,155,70,0.05)',
      '--bg-dark1':'#0e0904','--bg-dark2':'#05080e','--bg-dark3':'#100a05','--bg-dark4':'#0c0804',
      '--orb1':'rgba(200,100,32,0.12)','--orb2':'rgba(35,105,185,0.15)','--orb3':'rgba(255,145,55,0.05)',
    },
  },
  {
    id:'pearl', name:'Pearl', emoji:'🤍',
    dot1:'#D4D8E2', dot2:'#A8856A',
    desc:'Lunar pearl · Cognac warmth',
    vars:{
      '--a1':'#D4D8E2','--a-r':'212','--a-g':'216','--a-b':'226',
      '--a2':'#A8856A','--b-r':'168','--b-g':'133','--b-b':'106',
      '--bg-layer1':'rgba(180,185,210,0.10)','--bg-layer2':'rgba(130,95,65,0.16)',
      '--bg-layer3':'rgba(240,242,248,0.04)',
      '--bg-dark1':'#09090e','--bg-dark2':'#0d0a08','--bg-dark3':'#0c0c13','--bg-dark4':'#08090d',
      '--orb1':'rgba(170,175,205,0.09)','--orb2':'rgba(140,100,70,0.14)','--orb3':'rgba(225,228,238,0.05)',
    },
  },
  {
    id:'crimson', name:'Crimson', emoji:'♦️',
    dot1:'#E53E5C', dot2:'#00C896',
    desc:'Deep crimson · Viridian contrast',
    vars:{
      '--a1':'#E53E5C','--a-r':'229','--a-g':'62','--a-b':'92',
      '--a2':'#00C896','--b-r':'0','--b-g':'200','--b-b':'150',
      '--bg-layer1':'rgba(210,35,65,0.15)','--bg-layer2':'rgba(0,150,110,0.14)',
      '--bg-layer3':'rgba(255,100,120,0.04)',
      '--bg-dark1':'#0f0608','--bg-dark2':'#040d0a','--bg-dark3':'#100709','--bg-dark4':'#0c0507',
      '--orb1':'rgba(220,38,70,0.12)','--orb2':'rgba(0,165,115,0.13)','--orb3':'rgba(255,85,110,0.04)',
    },
  },
  {
    id:'ocean', name:'Ocean', emoji:'🌊',
    dot1:'#06B6D4', dot2:'#F97316',
    desc:'Abyssal teal · Bioluminescent orange',
    vars:{
      '--a1':'#06B6D4','--a-r':'6','--a-g':'182','--a-b':'212',
      '--a2':'#F97316','--b-r':'249','--b-g':'115','--b-b':'22',
      '--bg-layer1':'rgba(5,155,185,0.14)','--bg-layer2':'rgba(200,85,10,0.16)',
      '--bg-layer3':'rgba(100,230,245,0.04)',
      '--bg-dark1':'#040c10','--bg-dark2':'#100806','--bg-dark3':'#060e12','--bg-dark4':'#040b0d',
      '--orb1':'rgba(5,165,195,0.12)','--orb2':'rgba(210,90,10,0.14)','--orb3':'rgba(80,225,242,0.05)',
    },
  },
]

function applyTheme(theme) {
  const r = document.documentElement
  Object.entries(theme.vars).forEach(([k,v]) => r.style.setProperty(k,v))
}

function ThemePicker() {
  const [open,   setOpen]   = useState(false)
  const [active, setActive] = useState('obsidian')
  const panelRef = useRef(null)
  const cur = THEMES.find(t => t.id === active)

  useEffect(() => { applyTheme(THEMES[0]) }, [])

  useEffect(() => {
    const p = panelRef.current; if (!p) return
    p.style.transition = 'opacity 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.28s cubic-bezier(0.16,1,0.3,1)'
    if (open) {
      p.style.opacity = '1'; p.style.transform = 'translateY(0) scale(1)'; p.style.pointerEvents = 'auto'
    } else {
      p.style.opacity = '0'; p.style.transform = 'translateY(-10px) scale(0.96)'; p.style.pointerEvents = 'none'
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const h = (e) => { if (!e.target.closest('[data-theme-picker]')) setOpen(false) }
    setTimeout(() => document.addEventListener('click', h), 0)
    return () => document.removeEventListener('click', h)
  }, [open])

  const pick = (t) => { setActive(t.id); applyTheme(t); setOpen(false) }

  return (
    <div data-theme-picker style={{ position:'relative' }}>
      {/* Trigger pill */}
      <button onClick={() => setOpen(o => !o)} title="Change theme"
        style={{
          display:'flex', alignItems:'center', gap:'7px',
          padding:'5px 11px 5px 6px', borderRadius:'999px',
          background: open ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)',
          border:`1px solid rgba(255,255,255,0.10)`,
          boxShadow:'inset 0 1px 0 rgba(255,255,255,0.08)',
          cursor:'pointer', fontFamily:'inherit',
          transition:'all 0.2s cubic-bezier(0.16,1,0.3,1)',
        }}
        onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.10)'}
        onMouseLeave={e => { if(!open) e.currentTarget.style.background='rgba(255,255,255,0.05)' }}
      >
        {/* Dual-colour preview dot */}
        <span style={{
          width:'18px', height:'18px', borderRadius:'50%', flexShrink:0,
          background:`radial-gradient(circle at 38% 35%, ${cur.dot1} 0%, ${cur.dot2} 55%, rgba(0,0,0,0.5) 100%)`,
          border:'1.5px solid rgba(255,255,255,0.22)',
          boxShadow:`0 0 10px ${cur.dot1}55, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}/>
        <span style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.10em', textTransform:'uppercase', color:'rgba(255,255,255,0.50)' }}>
          {cur.name}
        </span>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition:'transform 0.22s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Dropdown */}
      <div ref={panelRef} style={{
        position:'absolute', top:'calc(100% + 10px)', right:0,
        width:'296px', opacity:0, transform:'translateY(-10px) scale(0.96)', pointerEvents:'none',
        background:'rgba(7,7,16,0.95)',
        backdropFilter:'blur(48px) saturate(2.2)', WebkitBackdropFilter:'blur(48px) saturate(2.2)',
        border:'1px solid rgba(255,255,255,0.10)',
        borderRadius:'22px',
        boxShadow:'0 28px 90px rgba(0,0,0,0.80), inset 0 1px 0 rgba(255,255,255,0.10)',
        zIndex:500, overflow:'hidden',
      }}>
        {/* Header */}
        <div style={{ padding:'16px 18px 12px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize:'7px', fontWeight:900, letterSpacing:'0.32em', textTransform:'uppercase', color:'rgba(255,255,255,0.28)', marginBottom:'3px' }}>
            Colour Theme
          </div>
          <div style={{ fontSize:'12px', fontWeight:600, color:'rgba(255,255,255,0.70)' }}>
            10 luxury palettes · two colours each
          </div>
        </div>

        {/* 2-col grid */}
        <div style={{ padding:'10px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px' }}>
          {THEMES.map(theme => {
            const isActive = active === theme.id
            return (
              <button key={theme.id} onClick={() => pick(theme)} style={{
                display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'7px',
                padding:'11px 12px', borderRadius:'13px',
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
                boxShadow: isActive ? 'inset 0 1px 0 rgba(255,255,255,0.10)' : 'none',
                cursor:'pointer', fontFamily:'inherit', textAlign:'left',
                transition:'all 0.18s cubic-bezier(0.16,1,0.3,1)',
                position:'relative', overflow:'hidden',
              }}
                onMouseEnter={e => { if(!isActive) e.currentTarget.style.background='rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { if(!isActive) e.currentTarget.style.background='transparent' }}
              >
                {/* Active top accent line using both colours */}
                {isActive && (
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg, ${theme.dot1}, ${theme.dot2})` }}/>
                )}

                {/* Dual dot preview */}
                <div style={{ display:'flex', alignItems:'center', gap:'7px', width:'100%' }}>
                  {/* Dual-colour circle */}
                  <span style={{
                    width:'24px', height:'24px', borderRadius:'50%', flexShrink:0,
                    background:`radial-gradient(circle at 38% 35%, ${theme.dot1} 0%, ${theme.dot2} 55%, rgba(0,0,0,0.45) 100%)`,
                    border:`1.5px solid rgba(255,255,255,${isActive?'0.22':'0.08'})`,
                    boxShadow: isActive ? `0 0 12px ${theme.dot1}55, inset 0 1px 0 rgba(255,255,255,0.20)` : 'none',
                    transition:'all 0.2s',
                  }}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'11px', fontWeight:700, color: isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)', lineHeight:1.2, whiteSpace:'nowrap' }}>
                      {theme.name}
                    </div>
                  </div>
                  {isActive && (
                    <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:theme.dot1, boxShadow:`0 0 6px ${theme.dot1}`, flexShrink:0 }}/>
                  )}
                </div>

                {/* Description with both colours shown */}
                <div style={{ paddingLeft:'31px', width:'100%' }}>
                  <div style={{ fontSize:'8px', color:'rgba(255,255,255,0.22)', letterSpacing:'0.02em', lineHeight:1.4 }}>
                    {theme.desc}
                  </div>
                  {/* Mini two-colour swatch strip */}
                  <div style={{ display:'flex', gap:'3px', marginTop:'5px' }}>
                    <span style={{ height:'3px', flex:1, borderRadius:'2px', background:theme.dot1 }}/>
                    <span style={{ height:'3px', flex:1, borderRadius:'2px', background:theme.dot2 }}/>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div style={{ padding:'8px 18px 14px', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ fontSize:'8px', color:'rgba(255,255,255,0.16)', letterSpacing:'0.06em', textAlign:'center' }}>
            Primary + secondary · buttons · gradients · orbs · backgrounds
          </div>
        </div>
      </div>
    </div>
  )
}

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
        <Link to="/" style={{ fontWeight:900, fontSize:'18px', letterSpacing:'-0.05em', background:'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.65) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', textDecoration:'none', marginRight:'32px', transition:'opacity 0.2s' }}
          onMouseEnter={e=>e.currentTarget.style.opacity='0.7'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}
        >hxrrrrri.</Link>

        <nav style={{ display:'flex', gap:'2px', flex:1 }}>
          {links.map(({ to, label }) => {
            const active = pathname === to
            return (
              <Link key={to} to={to} style={{ padding:'7px 16px', borderRadius:'10px', fontSize:'12px', fontWeight:active?700:500, letterSpacing:'0.02em', textDecoration:'none', position:'relative', color:active?'rgba(255,255,255,0.95)':'rgba(255,255,255,0.40)', background:active?'rgba(255,255,255,0.085)':'transparent', border:active?'1px solid rgba(255,255,255,0.10)':'1px solid transparent', boxShadow:active?'inset 0 1px 0 rgba(255,255,255,0.10)':'none', transition:'all 0.22s cubic-bezier(0.16,1,0.3,1)' }}
                onMouseEnter={e=>{ if(!active){e.currentTarget.style.color='rgba(255,255,255,0.80)';e.currentTarget.style.background='rgba(255,255,255,0.05)'}}}
                onMouseLeave={e=>{ if(!active){e.currentTarget.style.color='rgba(255,255,255,0.40)';e.currentTarget.style.background='transparent'}}}
              >
                {label}
                {active && <span className="nav-dot"/>}
              </Link>
            )
          })}
        </nav>

        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <ThemePicker/>
          <span style={{ display:'flex', alignItems:'center', gap:'7px', padding:'5px 12px', borderRadius:'999px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#22ff88', boxShadow:'0 0 8px #22ff88', animation:'blink 2s ease-in-out infinite' }}/>
            <span style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)' }}>Open</span>
          </span>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'36px', height:'36px', borderRadius:'11px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.10)', color:'rgba(255,255,255,0.55)', textDecoration:'none', transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)';e.currentTarget.style.color='#fff'}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.55)'}}
          ><GH/></a>
        </div>
      </div>
    </header>
  )
}
