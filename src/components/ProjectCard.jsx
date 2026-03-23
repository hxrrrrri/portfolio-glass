import { useRef } from 'react'

const ArrowIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const ExternalIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

export default function ProjectCard({ project }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left; const y = e.clientY - rect.top
    const rx = (y / rect.height - 0.5) * 12
    const ry = (0.5 - x / rect.width) * 12
    const px = (x / rect.width) * 100; const py = (y / rect.height) * 100
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,77,45,0.18) 0%, transparent 65%)`
      glowRef.current.style.opacity = '1'
    }
  }
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)'
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }

  return (
    <div style={{ perspective: '1000px' }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div ref={cardRef} className="glass glass-shine glass-inset"
        style={{
          padding: '28px', borderRadius: '20px', height: '100%',
          display: 'flex', flexDirection: 'column',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
          position: 'relative', overflow: 'hidden',
          cursor: 'pointer',
        }}>

        {/* Mouse glow overlay */}
        <div ref={glowRef} style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1, opacity:0, transition:'opacity 0.15s', borderRadius:'20px' }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <span style={{
              padding: '4px 12px', borderRadius: '8px', fontSize: '9px', fontWeight: 800,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: 'rgba(255,77,45,0.15)', border: '1px solid rgba(255,77,45,0.3)', color: '#FF4D2D',
            }}>{project.category}</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em' }}>{project.number}</span>
          </div>

          {/* Ghost number */}
          <div style={{
            fontSize: '80px', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.05em',
            color: 'rgba(255,255,255,0.04)', marginBottom: '8px', userSelect: 'none',
          }}>{project.number}</div>

          {/* Title */}
          <h3 style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff', marginBottom: '12px' }}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="line-clamp-3" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, flex: 1, marginBottom: '20px' }}>
            {project.description}
          </p>

          {/* Tech pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="glass-pill" style={{ padding:'3px 10px', fontSize:'9px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>{t}</span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="glass-btn"
              style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'9px 16px', textDecoration:'none', fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.7)', borderRadius:'10px' }}
              onClick={e => e.stopPropagation()}>
              GitHub <ArrowIcon size={12} />
            </a>
            {project.vercelLink && (
              <a href={project.vercelLink} target="_blank" rel="noopener noreferrer"
                className="glass-btn-accent"
                style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'9px 16px', textDecoration:'none', fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'#fff', borderRadius:'10px' }}
                onClick={e => e.stopPropagation()}>
                Live <ExternalIcon size={11} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
