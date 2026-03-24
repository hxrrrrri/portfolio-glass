import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const Arr = ({ s=13 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const Ext = ({ s=12 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

export default function ProjectCard({ project }) {
  const cardRef  = useRef(null)
  const glowRef  = useRef(null)
  const numRef   = useRef(null)
  const rafRef   = useRef(null)
  const activeRef = useRef(false)

  // ── Proximity-based ghost number reveal ──────────────────────────
  // Tracks mouse position relative to the number element.
  // Opacity scales from 0 (far) to 0.18 (close), with a smooth falloff.
  // Uses requestAnimationFrame only while mouse is over the card.
  useEffect(() => {
    const card = cardRef.current
    const num  = numRef.current
    if (!card || !num) return

    let mx = -9999, my = -9999

    const onCardMove = (e) => { mx = e.clientX; my = e.clientY }

    const tick = () => {
      if (!activeRef.current) return
      const r = num.getBoundingClientRect()
      const cx = r.left + r.width  / 2
      const cy = r.top  + r.height / 2
      // Distance from cursor to centre of the number
      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2)
      // Reveal radius: fully visible at 0px, invisible at 320px
      const maxDist = 320
      const t = Math.max(0, 1 - dist / maxDist)
      // Ease the falloff — power of 1.6 for a smooth luxury curve
      const opacity = Math.pow(t, 1.6) * 0.20
      num.style.color = `rgba(255,255,255,${opacity.toFixed(4)})`
      rafRef.current = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      activeRef.current = true
      // Also lift the card
      gsap.to(card, { y: -6, duration: 0.32, ease: 'power2.out' })
      rafRef.current = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      activeRef.current = false
      cancelAnimationFrame(rafRef.current)
      // Fade number back to invisible
      gsap.to(num, { duration: 0.55, ease: 'power2.inOut',
        onUpdate() {
          // Let the proximity loop handle color when re-entered
        }
      })
      num.style.color = 'rgba(255,255,255,0)'
      gsap.to(card, { y: 0, rotateX: 0, rotateY: 0, duration: 0.55, ease: 'power2.out' })
      if (glowRef.current) glowRef.current.style.opacity = '0'
    }

    const onMove = (e) => {
      onCardMove(e)
      const r = card.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      gsap.to(card, {
        rotateX: (y / r.height - 0.5) * 10,
        rotateY: (0.5 - x / r.width)  * 10,
        duration: 0.18, ease: 'power1.out',
      })
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(var(--a-r),var(--a-g),var(--a-b),0.16) 0%, transparent 65%)`
        glowRef.current.style.opacity = '1'
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
    <div style={{ perspective: '1100px', height: '100%' }}>
      <div
        ref={cardRef}
        className="g1 g-shine g-hi"
        style={{
          padding: '32px', borderRadius: '24px',
          display: 'flex', flexDirection: 'column', height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.3s, border-color 0.3s',
          position: 'relative', overflow: 'hidden', cursor: 'default',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Mouse glow overlay */}
        <div ref={glowRef} style={{ position:'absolute', inset:0, borderRadius:'24px', pointerEvents:'none', zIndex:1, opacity:0, transition:'opacity 0.12s' }}/>

        <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', height:'100%' }}>
          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'16px' }}>
            <span style={{ padding:'4px 12px', borderRadius:'8px', fontSize:'8px', fontWeight:900, letterSpacing:'0.15em', textTransform:'uppercase', background:'rgba(var(--a-r),var(--a-g),var(--a-b),0.12)', border:'1px solid rgba(var(--a-r),var(--a-g),var(--a-b),0.26)', color:'var(--a1)' }}>
              {project.category}
            </span>
            <span style={{ fontSize:'10px', fontWeight:700, color:'rgba(255,255,255,0.18)', letterSpacing:'0.08em' }}>
              {project.number}
            </span>
          </div>

          {/* Ghost number — proximity-revealed, starts fully transparent */}
          <div
            ref={numRef}
            style={{
              fontSize: '78px', fontWeight: 900, lineHeight: 0.82,
              letterSpacing: '-0.05em',
              color: 'rgba(255,255,255,0)',   // starts invisible — JS controls this
              marginBottom: '12px',            // space between number and title
              userSelect: 'none', pointerEvents: 'none',
              transition: 'none',              // no CSS transition — JS handles smoothness
            }}
          >
            {project.number}
          </div>

          {/* Title */}
          <h3 style={{ fontSize:'21px', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.025em', color:'#fff', marginBottom:'12px' }}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="line-clamp-3" style={{ fontSize:'12px', color:'rgba(255,255,255,0.44)', lineHeight:1.75, flex:1, marginBottom:'20px' }}>
            {project.description}
          </p>

          {/* Tech pills */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', marginBottom:'20px' }}>
            {project.tech.slice(0,3).map(t => (
              <span key={t} className="g-pill" style={{ padding:'3px 10px', fontSize:'8px', fontWeight:800, letterSpacing:'0.09em', textTransform:'uppercase', color:'rgba(255,255,255,0.40)' }}>
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:'flex', gap:'8px' }}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"
              style={{ padding:'9px 16px', borderRadius:'10px', fontSize:'10px', gap:'6px', flex:1, justifyContent:'center' }}
              onClick={e => e.stopPropagation()}>
              GitHub <Arr/>
            </a>
            {project.vercelLink && (
              <a href={project.vercelLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
                style={{ padding:'9px 16px', borderRadius:'10px', fontSize:'10px', gap:'6px', flex:1, justifyContent:'center' }}
                onClick={e => e.stopPropagation()}>
                Live <Ext/>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
