import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

const ArrowIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const ChevronIcon = ({ dir = 'right', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'right' ? <polyline points="9 18 15 12 9 6"/> : <polyline points="15 18 9 12 15 6"/>}
  </svg>
)

function Project3DCard({ project, isActive, onActivate, floatOffset }) {
  const cardRef = useRef(null)
  const wrapRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    if (!wrapRef.current) return
    const t = gsap.to(wrapRef.current, {
      y: `${(floatOffset % 2 === 0 ? -1 : 1) * (6 + (floatOffset % 3) * 2)}px`,
      duration: 2.8 + floatOffset * 0.37,
      ease: 'sine.inOut', yoyo: true, repeat: -1, delay: floatOffset * 0.22,
    })
    return () => t.kill()
  }, [floatOffset])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left; const y = e.clientY - rect.top
    const rx = (y / rect.height - 0.5) * 12
    const ry = (0.5 - x / rect.width) * 12
    cardRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(16px)`
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x/rect.width)*100}% ${(y/rect.height)*100}%, rgba(255,77,45,0.2) 0%, transparent 60%)`
      glowRef.current.style.opacity = '1'
    }
  }
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)'
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }

  return (
    <div ref={wrapRef} style={{ willChange: 'transform' }}>
      <div style={{ perspective: '1000px' }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onActivate}>
        <div ref={cardRef} className="glass glass-shine"
          style={{
            padding: '24px', borderRadius: '20px', cursor: 'pointer',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.15s ease-out, box-shadow 0.3s',
            position: 'relative', overflow: 'hidden',
            border: isActive ? '1px solid rgba(255,77,45,0.5)' : '1px solid rgba(255,255,255,0.08)',
            boxShadow: isActive ? '0 0 40px rgba(255,77,45,0.2), inset 0 1px 0 rgba(255,255,255,0.15)' : 'inset 0 1px 0 rgba(255,255,255,0.08)',
          }}>
          {/* Glow */}
          <div ref={glowRef} style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1, opacity:0, transition:'opacity 0.1s', borderRadius:'20px' }} />
          {isActive && <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg, transparent, #FF4D2D, transparent)', zIndex:2 }} />}

          <div style={{ position: 'relative', zIndex: 3 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
              <span style={{ padding:'3px 10px', borderRadius:'6px', fontSize:'9px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', background:'rgba(255,77,45,0.15)', border:'1px solid rgba(255,77,45,0.3)', color:'#FF4D2D' }}>{project.category}</span>
              <span style={{ fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.18)' }}>{project.number}</span>
            </div>
            <div style={{ fontSize:'60px', fontWeight:900, lineHeight:0.85, color:'rgba(255,255,255,0.04)', marginBottom:'6px', userSelect:'none' }}>{project.number}</div>
            <h3 style={{ fontSize:'18px', fontWeight:800, lineHeight:1.1, color:'#fff', marginBottom:'8px' }}>{project.title}</h3>
            <p className="line-clamp-3" style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', lineHeight:1.65 }}>{project.description}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'4px', marginTop:'12px' }}>
              {project.tech.slice(0,3).map(t => (
                <span key={t} className="glass-pill" style={{ padding:'2px 8px', fontSize:'8px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getHighlights(project) {
  const map = {
    1:['Multi-tile satellite boundary detection via YOLOv8','7 live environmental data APIs integrated','Interactive 3D floor plan viewer via React Three Fiber','Deployed: Next.js on Vercel + FastAPI on Railway'],
    2:['Semantic search across multiple languages','Vector embeddings with FAISS indexing','Context-aware document Q&A with LangChain','FastAPI backend with streaming responses'],
    3:['XGBoost pipeline on physiological sensor data','SHAP explainability for model interpretability','Streamlit dashboard for real-time inference','Trained on Kaggle wearable stress dataset'],
    4:['Custom-trained YOLOv8 wildlife detection model','Real-time object tracking at 30+ FPS','Autonomous navigation with obstacle avoidance','Alert system for ranger notifications'],
    5:['Full MERN stack with JWT authentication','Role-based access control (admin / attendee)','Real-time event updates via WebSockets','Built during ICT Academy internship'],
    6:['Category-wise KTU activity point calculation','PDF export with jsPDF','Responsive form UI with live score tracking','Used by 100+ students at MBCET'],
  }
  return map[project.id] || ['End-to-end implementation','Production deployed','Open source on GitHub']
}

export default function Showcase() {
  const [activeId, setActiveId] = useState(1)
  const activeProject = projects.find(p => p.id === activeId)
  const panelRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.05 })
    tl.fromTo('.showcase-hero', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' })
      .fromTo('.proj-card',     { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '<0.2')
    return () => tl.kill()
  }, [])

  useEffect(() => {
    if (panelRef.current) gsap.fromTo(panelRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' })
  }, [activeId])

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', position: 'relative' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 48px' }}>

        {/* Hero */}
        <div className="showcase-hero" style={{ marginBottom: '48px' }}>
          <div style={{ fontSize:'10px', fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', color:'#FF4D2D', marginBottom:'16px' }}>+001 / 3D Showcase</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <h1 style={{ fontSize:'clamp(3rem,7vw,6rem)', fontWeight:900, lineHeight:0.9, letterSpacing:'-0.04em', color:'#fff' }}>Interactive<br/>Project Lab.</h1>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.4)', maxWidth:'280px', lineHeight:1.7 }}>Click a card to explore in detail. Hover for 3D perspective.</p>
          </div>
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px', alignItems: 'start' }}>

          {/* Cards grid */}
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
              <span style={{ fontSize:'11px', fontWeight:700, letterSpacing:'0.12em', color:'rgba(255,255,255,0.2)' }}>
                {String(activeId).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}
              </span>
              <div style={{ display:'flex', gap:'6px' }}>
                {[['left', () => setActiveId(id => id === 1 ? projects.length : id - 1)], ['right', () => setActiveId(id => id === projects.length ? 1 : id + 1)]].map(([dir, fn]) => (
                  <button key={dir} onClick={fn} className="glass-btn"
                    style={{ width:'36px', height:'36px', display:'flex', alignItems:'center', justifyContent:'center', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.7)', borderRadius:'10px', padding:0 }}>
                    <ChevronIcon dir={dir} size={16} />
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'12px' }}>
              {projects.map((project, i) => (
                <div key={project.id} className="proj-card">
                  <Project3DCard project={project} isActive={activeId === project.id} onActivate={() => setActiveId(project.id)} floatOffset={i} />
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          {activeProject && (
            <div ref={panelRef} className="glass-strong glass-inset" style={{ borderRadius:'24px', overflow:'hidden', position:'sticky', top:'80px' }}>
              {/* Header */}
              <div style={{ padding:'32px', background:'linear-gradient(135deg, rgba(255,77,45,0.12), rgba(255,255,255,0.03))', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize:'9px', fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', color:'#FF4D2D', marginBottom:'10px' }}>{activeProject.category}</div>
                <h2 style={{ fontSize:'26px', fontWeight:900, lineHeight:1.1, color:'#fff', marginBottom:'12px' }}>{activeProject.title}</h2>
                <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)', lineHeight:1.7 }}>{activeProject.description}</p>
              </div>

              <div style={{ padding:'28px' }}>
                {/* Stack */}
                <div style={{ marginBottom:'24px' }}>
                  <div style={{ fontSize:'9px', fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', color:'#FF4D2D', marginBottom:'12px' }}>Stack</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                    {activeProject.tech.map(t => (
                      <span key={t} className="glass-pill" style={{ padding:'5px 12px', fontSize:'10px', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)' }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div style={{ marginBottom:'28px' }}>
                  <div style={{ fontSize:'9px', fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', color:'#FF4D2D', marginBottom:'12px' }}>Highlights</div>
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'8px' }}>
                    {getHighlights(activeProject).map((h, i) => (
                      <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
                        <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#FF4D2D', flexShrink:0, marginTop:'6px' }} />
                        <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div style={{ display:'flex', gap:'8px' }}>
                  <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="glass-btn"
                    style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'12px 20px', textDecoration:'none', fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.7)', borderRadius:'10px', flex:1, justifyContent:'center' }}>
                    GitHub <ArrowIcon size={14} />
                  </a>
                  {activeProject.vercelLink && (
                    <a href={activeProject.vercelLink} target="_blank" rel="noopener noreferrer" className="glass-btn-accent"
                      style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'12px 20px', textDecoration:'none', fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'#fff', borderRadius:'10px', flex:1, justifyContent:'center' }}>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GitHub CTA */}
        <div className="glass glass-inset" style={{ padding:'48px', borderRadius:'24px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'32px', marginTop:'48px' }}>
          <div>
            <div style={{ fontSize:'10px', fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', color:'#FF4D2D', marginBottom:'12px' }}>+002 / GitHub</div>
            <h2 style={{ fontSize:'32px', fontWeight:900, letterSpacing:'-0.03em', color:'#fff', marginBottom:'8px' }}>Explore more on GitHub.</h2>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.35)' }}>All repos at github.com/hxrrrrri</p>
          </div>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="glass-btn"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 28px', textDecoration:'none', fontSize:'13px', fontWeight:700, color:'rgba(255,255,255,0.8)', flexShrink:0, borderRadius:'12px' }}>
            hxrrrrri <ArrowIcon size={16} />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
