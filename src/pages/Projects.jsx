import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import ProjectCard from '../components/ProjectCard.jsx'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

const FILTERS = ['All', 'AI / Full-Stack', 'AI / NLP', 'Machine Learning', 'Robotics / CV', 'Full-Stack', 'Web App']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const gridRef = useRef(null)

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)

  useEffect(() => {
    if (gridRef.current?.children) {
      gsap.fromTo(gridRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      )
    }
  }, [activeFilter])

  useEffect(() => {
    gsap.fromTo('.projects-hero', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', delay: 0.05 })
  }, [])

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', position: 'relative' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 48px' }}>

        {/* Hero */}
        <div className="projects-hero" style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '16px' }}>+001 / Projects</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px' }}>
            <h1 style={{ fontSize: 'clamp(3rem,8vw,7rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', color: '#fff' }}>
              Selected<br/>Works.
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '320px', flexShrink: 0 }}>
              {projects.length} projects spanning AI, full-stack development, computer vision, and robotics.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="glass" style={{ padding: '12px', borderRadius: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '32px' }}>
          <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', padding: '0 8px', marginRight: '4px' }}>Filter —</span>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', border: 'none',
                background: activeFilter === f ? 'linear-gradient(135deg,rgba(255,77,45,0.7),rgba(255,100,50,0.5))' : 'rgba(255,255,255,0.05)',
                color: activeFilter === f ? '#fff' : 'rgba(255,255,255,0.4)',
                border: activeFilter === f ? '1px solid rgba(255,100,60,0.5)' : '1px solid transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (activeFilter !== f) e.currentTarget.style.background='rgba(255,255,255,0.08)' }}
              onMouseLeave={e => { if (activeFilter !== f) e.currentTarget.style.background='rgba(255,255,255,0.05)' }}
            >{f}</button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '64px' }}>
          {filtered.map(project => (
            <div key={project.id} className="proj-card">
              <ProjectCard project={project} index={project.id} />
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="glass glass-inset" style={{ padding: '48px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '32px' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '12px' }}>+002 / More</div>
            <h2 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff', marginBottom: '12px' }}>See more on GitHub.</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', maxWidth: '400px', lineHeight: 1.6 }}>All repositories, contributions, and experiments at github.com/hxrrrrri.</p>
          </div>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="glass-btn"
            style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 28px', textDecoration:'none', fontSize:'13px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.8)', flexShrink:0 }}>
            hxrrrrri
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}
