import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

const Arr  = ({ s=15 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const Chev = ({ dir='r', s=15 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{dir==='r' ? <polyline points="9 18 15 12 9 6"/> : <polyline points="15 18 9 12 15 6"/>}</svg>

// ─────────────────────────────────────────────────────────────────
// Ghost number uses PROXIMITY — mouse distance to the number element.
// The closer the cursor, the more the number is revealed.
// Uses rAF loop only while mouse is inside the card.
// ─────────────────────────────────────────────────────────────────
function Card3D({ project, isActive, onActivate, fi }) {
  const wRef   = useRef(null)
  const cRef   = useRef(null)
  const gRef   = useRef(null)
  const nRef   = useRef(null)
  const rafRef = useRef(null)
  const activeRef = useRef(false)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  // Independent float
  useEffect(() => {
    if (!wRef.current) return
    const amp = 5 + (fi % 3) * 2.5
    const dir = fi % 2 === 0 ? -1 : 1
    const t = gsap.to(wRef.current, {
      y: `${dir * amp}px`,
      duration: 2.6 + fi * 0.4,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: fi * 0.25,
    })
    return () => t.kill()
  }, [fi])

  // Proximity reveal loop
  useEffect(() => {
    const card = cRef.current
    const num  = nRef.current
    if (!card || !num) return

    const tick = () => {
      if (!activeRef.current) return
      const r = num.getBoundingClientRect()
      const cx = r.left + r.width  / 2
      const cy = r.top  + r.height / 2
      const dist = Math.sqrt((mouseRef.current.x - cx) ** 2 + (mouseRef.current.y - cy) ** 2)
      const maxDist = 280
      const t = Math.max(0, 1 - dist / maxDist)
      const opacity = Math.pow(t, 1.5) * 0.18
      num.style.color = `rgba(255,255,255,${opacity.toFixed(4)})`
      rafRef.current = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      activeRef.current = true
      gsap.to(card, { scale: 1.025, duration: 0.32, ease: 'power2.out' })
      rafRef.current = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      activeRef.current = false
      cancelAnimationFrame(rafRef.current)
      num.style.color = 'rgba(255,255,255,0)'
      gsap.to(card, { rotateX:0, rotateY:0, scale:1, duration:0.55, ease:'power2.out' })
      if (gRef.current) gRef.current.style.opacity = '0'
    }
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      const r = card.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      gsap.to(card, { rotateX:(y/r.height-0.5)*12, rotateY:(0.5-x/r.width)*12, duration:0.18, ease:'power1.out' })
      if (gRef.current) {
        gRef.current.style.background = `radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(var(--a-r),var(--a-g),var(--a-b),0.18) 0%, transparent 60%)`
        gRef.current.style.opacity = '1'
      }
    }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    card.addEventListener('mousemove',  onMove)
    return () => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
      card.removeEventListener('mousemove',  onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={wRef} style={{ willChange:'transform' }} onClick={onActivate}>
      <div style={{ perspective:'1100px' }}>
        <div
          ref={cRef}
          className="g1 g-shine"
          style={{
            padding:'28px', borderRadius:'24px', cursor:'pointer',
            transformStyle:'preserve-3d',
            transition:'box-shadow 0.3s, border-color 0.3s',
            position:'relative', overflow:'hidden',
            border: isActive ? '1px solid rgba(var(--a-r),var(--a-g),var(--a-b),0.42)' : '1px solid rgba(255,255,255,0.065)',
            boxShadow: isActive
              ? '0 0 52px rgba(var(--a-r),var(--a-g),var(--a-b),0.16), inset 0 1.5px 0 rgba(255,255,255,0.16)'
              : 'inset 0 1px 0 rgba(255,255,255,0.065)',
          }}
        >
          {isActive && (
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,var(--a1) 30%,var(--a2) 70%,transparent)', zIndex:2 }}/>
          )}
          <div ref={gRef} style={{ position:'absolute', inset:0, borderRadius:'24px', pointerEvents:'none', zIndex:1, opacity:0, transition:'opacity 0.12s' }}/>

          <div style={{ position:'relative', zIndex:3 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
              <span style={{ padding:'3px 11px', borderRadius:'7px', fontSize:'8px', fontWeight:900, letterSpacing:'0.14em', textTransform:'uppercase', background:'rgba(var(--a-r),var(--a-g),var(--a-b),0.12)', border:'1px solid rgba(var(--a-r),var(--a-g),var(--a-b),0.26)', color:'var(--a1)' }}>
                {project.category}
              </span>
              <span style={{ fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.16)' }}>{project.number}</span>
            </div>

            {/* Ghost number — starts invisible, proximity-revealed via rAF */}
            <div
              ref={nRef}
              style={{
                fontSize:'62px', fontWeight:900, lineHeight:0.82,
                letterSpacing:'-0.05em',
                color:'rgba(255,255,255,0)',  // fully transparent — JS drives this
                marginBottom:'10px',           // gap between number and title
                userSelect:'none', pointerEvents:'none',
                transition:'none',
              }}
            >
              {project.number}
            </div>

            <h3 style={{ fontSize:'18px', fontWeight:900, lineHeight:1.08, color:'#fff', marginBottom:'8px', letterSpacing:'-0.02em' }}>
              {project.title}
            </h3>
            <p className="line-clamp-3" style={{ fontSize:'11px', color:'rgba(255,255,255,0.40)', lineHeight:1.70 }}>
              {project.description}
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'4px', marginTop:'12px' }}>
              {project.tech.slice(0,3).map(t => (
                <span key={t} className="g-pill" style={{ padding:'2px 9px', fontSize:'7px', fontWeight:800, letterSpacing:'0.09em', textTransform:'uppercase', color:'rgba(255,255,255,0.36)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HL = {
  1:['Multi-tile satellite boundary detection via YOLOv8','7 live environmental data APIs integrated','Interactive 3D floor plan via React Three Fiber','Deployed: Next.js on Vercel + FastAPI on Railway'],
  2:['Semantic search across multiple languages','Vector embeddings with FAISS indexing','Context-aware document Q&A with LangChain','FastAPI backend with streaming responses'],
  3:['XGBoost pipeline on physiological sensor data','SHAP explainability for model interpretability','Streamlit dashboard for real-time inference','Trained on Kaggle wearable stress dataset'],
  4:['Custom-trained YOLOv8 wildlife detection model','Real-time object tracking at 30+ FPS','Autonomous navigation with obstacle avoidance','Alert system for ranger notifications'],
  5:['Full MERN stack with JWT authentication','Role-based access control (admin / attendee)','Real-time event updates via WebSockets','Built during ICT Academy internship'],
  6:['Category-wise KTU activity point calculation','PDF export with jsPDF','Live score tracking UI','Used by 100+ students at MBCET'],
}

export default function Showcase() {
  const [aId, setAId] = useState(1)
  const ap     = projects.find(p => p.id === aId)
  const panRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.06 })
    tl.fromTo('.showcase-hero',
      { y:64, opacity:0, filter:'blur(4px)' },
      { y:0, opacity:1, filter:'blur(0px)', duration:1.0, ease:'power4.out' }
    )
    .fromTo('.proj-card',
      { y:50, scale:0.94, filter:'blur(6px)' },
      { y:0, scale:1, filter:'blur(0px)', duration:0.72, stagger:0.09, ease:'power3.out' },
      '<0.25'
    )
    return () => tl.kill()
  }, [])

  useEffect(() => {
    if (panRef.current) {
      gsap.fromTo(panRef.current,
        { opacity:0, x:32, scale:0.98 },
        { opacity:1, x:0, scale:1, duration:0.55, ease:'power3.out' }
      )
    }
  }, [aId])

  return (
    <div style={{ minHeight:'calc(100vh - 62px)', position:'relative', overflow:'hidden' }}>
      <div className="page">
        <div className="showcase-hero" style={{ marginBottom:'48px' }}>
          <div className="text-label" style={{ marginBottom:'18px' }}>+001 / 3D Showcase</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'48px' }}>
            <h1 style={{ fontSize:'clamp(3rem,8vw,8rem)', fontWeight:900, lineHeight:1, letterSpacing:'-0.035em', paddingBottom:'0.08em', display:'inline-block', color:'rgba(255,255,255,0.97)' }}>
              Interactive<br/>Project Lab.
            </h1>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.36)', maxWidth:'280px', lineHeight:1.78, paddingBottom:'16px' }}>
              Move your cursor close to a project number to reveal it. Click any card to explore.
            </p>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:'18px', alignItems:'start' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'18px' }}>
              <span style={{ fontSize:'10px', fontWeight:800, letterSpacing:'0.18em', color:'rgba(255,255,255,0.20)' }}>
                {String(aId).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}
              </span>
              <div style={{ display:'flex', gap:'6px' }}>
                {[['l',()=>setAId(id=>id===1?projects.length:id-1)],['r',()=>setAId(id=>id===projects.length?1:id+1)]].map(([d,fn])=>(
                  <button key={d} onClick={fn} className="btn btn-ghost btn-icon"
                    style={{ width:'36px', height:'36px', padding:0, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'10px', fontFamily:'inherit' }}>
                    <Chev dir={d} s={14}/>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'12px' }}>
              {projects.map((p,i) => (
                <div key={p.id} className="proj-card">
                  <Card3D project={p} isActive={aId===p.id} onActivate={()=>setAId(p.id)} fi={i}/>
                </div>
              ))}
            </div>
          </div>

          {ap && (
            <div ref={panRef} className="g2 g-hi2" style={{ borderRadius:'28px', overflow:'hidden', position:'sticky', top:'80px' }}>
              <div style={{ padding:'36px', background:'linear-gradient(140deg,rgba(var(--a-r),var(--a-g),var(--a-b),0.10),rgba(255,255,255,0.025))', borderBottom:'1px solid rgba(255,255,255,0.055)', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, right:0, width:'200px', height:'200px', background:'radial-gradient(circle at 80% 20%,rgba(var(--a-r),var(--a-g),var(--a-b),0.08),transparent 60%)', pointerEvents:'none' }}/>
                <div className="text-label" style={{ marginBottom:'12px', position:'relative', zIndex:1 }}>{ap.category}</div>
                <h2 style={{ fontSize:'26px', fontWeight:900, lineHeight:1.08, color:'#fff', marginBottom:'14px', letterSpacing:'-0.025em', position:'relative', zIndex:1 }}>{ap.title}</h2>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.44)', lineHeight:1.74, position:'relative', zIndex:1 }}>{ap.description}</p>
              </div>
              <div style={{ padding:'28px' }}>
                <div style={{ marginBottom:'24px' }}>
                  <div className="text-label" style={{ marginBottom:'12px', fontSize:'7px' }}>Stack</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                    {ap.tech.map(t => (
                      <span key={t} className="g-pill" style={{ padding:'5px 12px', fontSize:'9px', fontWeight:800, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.55)' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom:'28px' }}>
                  <div className="text-label" style={{ marginBottom:'12px', fontSize:'7px' }}>Highlights</div>
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'9px' }}>
                    {(HL[ap.id]||[]).map((h,i) => (
                      <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
                        <span style={{ width:'4px', height:'4px', borderRadius:'50%', background:'var(--a1)', flexShrink:0, marginTop:'7px', boxShadow:'0 0 6px var(--a1)' }}/>
                        <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.50)', lineHeight:1.68 }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ display:'flex', gap:'8px' }}>
                  <a href={ap.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"
                    style={{ flex:1, justifyContent:'center', padding:'11px 16px', borderRadius:'11px', fontSize:'10px' }}>
                    GitHub <Arr/>
                  </a>
                  {ap.vercelLink && (
                    <a href={ap.vercelLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
                      style={{ flex:1, justifyContent:'center', padding:'11px 16px', borderRadius:'11px', fontSize:'10px' }}>
                      Live <Arr/>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="divider"/>

        <div className="g1 g-hi2 g-shine" style={{ padding:'56px', borderRadius:'28px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'32px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', right:0, top:0, width:'280px', height:'280px', background:'radial-gradient(circle at 80% 30%,rgba(var(--a-r),var(--a-g),var(--a-b),0.06),transparent 62%)', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:1 }}>
            <div className="text-label" style={{ marginBottom:'14px' }}>+002 / GitHub</div>
            <h2 style={{ fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:900, lineHeight:0.92, letterSpacing:'-0.04em', marginBottom:'12px', color:'rgba(255,255,255,0.97)' }}>
              Explore more<br/>on GitHub.
            </h2>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.30)' }}>All repositories at github.com/hxrrrrri</p>
          </div>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="btn btn-ghost"
            style={{ flexShrink:0, position:'relative', zIndex:1 }}>
            hxrrrrri <Arr/>
          </a>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
