import { useRef } from 'react'
import { gsap } from 'gsap'
const Arr=({s=13})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const Ext=({s=12})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>

export default function ProjectCard({ project }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const numRef  = useRef(null)

  const onEnter = () => {
    if (numRef.current) gsap.to(numRef.current, { opacity: 0.10, duration: 0.4, ease: 'power2.out' })
    gsap.to(cardRef.current, { y: -6, duration: 0.35, ease: 'power2.out' })
  }
  const onLeave = () => {
    if (numRef.current) gsap.to(numRef.current, { opacity: 0.035, duration: 0.4, ease: 'power2.inOut' })
    gsap.to(cardRef.current, { y: 0, rotateX: 0, rotateY: 0, duration: 0.55, ease: 'power2.out' })
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }
  const onMove = (e) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    gsap.to(cardRef.current, { rotateX:(y/r.height-0.5)*10, rotateY:(0.5-x/r.width)*10, duration:0.18, ease:'power1.out' })
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(255,77,45,0.14) 0%, transparent 65%)`
      glowRef.current.style.opacity = '1'
    }
  }

  return (
    <div style={{ perspective:'1100px', height:'100%' }} onMouseEnter={onEnter} onMouseLeave={onLeave} onMouseMove={onMove}>
      <div ref={cardRef} className="g1 g-shine g-hi"
        style={{ padding:'32px', borderRadius:'24px', display:'flex', flexDirection:'column', height:'100%', transformStyle:'preserve-3d', transition:'box-shadow 0.3s, border-color 0.3s', position:'relative', overflow:'hidden', cursor:'default',
          border:'1px solid rgba(255,255,255,0.07)' }}>
        <div ref={glowRef} style={{ position:'absolute', inset:0, borderRadius:'24px', pointerEvents:'none', zIndex:1, opacity:0, transition:'opacity 0.12s' }}/>
        <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', height:'100%' }}>
          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'20px' }}>
            <span style={{ padding:'4px 12px', borderRadius:'8px', fontSize:'8px', fontWeight:900, letterSpacing:'0.15em', textTransform:'uppercase', background:'rgba(255,77,45,0.12)', border:'1px solid rgba(255,77,45,0.26)', color:'var(--accent)' }}>{project.category}</span>
            <span style={{ fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.18)', letterSpacing:'0.08em' }}>{project.number}</span>
          </div>
          {/* Ghost number — revealed on hover */}
          <div ref={numRef} className="no-select" style={{ fontSize:'78px', fontWeight:900, lineHeight:0.82, letterSpacing:'-0.05em', color:'rgba(255,255,255,0.035)', marginBottom:'4px' }}>{project.number}</div>
          {/* Title */}
          <h3 style={{ fontSize:'21px', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.025em', color:'#fff', marginBottom:'12px' }}>{project.title}</h3>
          {/* Desc */}
          <p className="line-clamp-3" style={{ fontSize:'12px', color:'rgba(255,255,255,0.44)', lineHeight:1.75, flex:1, marginBottom:'20px' }}>{project.description}</p>
          {/* Tech */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', marginBottom:'20px' }}>
            {project.tech.slice(0,3).map(t=>(
              <span key={t} className="g-pill" style={{ padding:'3px 10px', fontSize:'8px', fontWeight:800, letterSpacing:'0.09em', textTransform:'uppercase', color:'rgba(255,255,255,0.40)' }}>{t}</span>
            ))}
          </div>
          {/* Actions */}
          <div style={{ display:'flex', gap:'8px' }}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"
              style={{ padding:'9px 16px', borderRadius:'10px', fontSize:'10px', gap:'6px', flex:1, justifyContent:'center' }} onClick={e=>e.stopPropagation()}>
              GitHub <Arr/>
            </a>
            {project.vercelLink && (
              <a href={project.vercelLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
                style={{ padding:'9px 16px', borderRadius:'10px', fontSize:'10px', gap:'6px', flex:1, justifyContent:'center' }} onClick={e=>e.stopPropagation()}>
                Live <Ext/>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
