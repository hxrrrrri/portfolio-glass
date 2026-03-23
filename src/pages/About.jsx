import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import { skills, socials } from '../data/projects'

const ArrowIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function About() {
  const cardRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.05 })
    tl.fromTo('.about-hero-left',  { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power4.out' })
      .fromTo('.about-hero-right', { x: 50,  opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power4.out' }, '<0.1')
      .fromTo('.about-story',      { y: 40,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.7,  ease: 'power3.out' }, '<0.2')
      .fromTo('.skill-block',      { y: 30,  opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power3.out' }, '<0.1')
      .fromTo('.about-social-link',{ x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' }, '<0.1')
    return () => tl.kill()
  }, [])

  const handleMouseMove = (e) => {
    const card = cardRef.current; const container = containerRef.current
    if (!card || !container) return
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left; const y = e.clientY - rect.top
    card.style.transform = `rotateX(${(y - rect.height/2) / 14}deg) rotateY(${(rect.width/2 - x) / 14}deg) scale(1.02)`
    card.style.setProperty('--mx', `${(x/rect.width)*100}%`)
    card.style.setProperty('--my', `${(y/rect.height)*100}%`)
  }
  const handleMouseLeave = () => { if (cardRef.current) cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)' }

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', position: 'relative' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 48px' }}>

        {/* Hero */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', marginBottom: '48px' }}>
          <div className="about-hero-left glass glass-inset" style={{ padding: '48px', borderRadius: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '20px' }}>X/Labs</div>
            <h1 style={{ fontSize: '80px', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', color: '#fff', marginBottom: '32px' }}>
              Lab<span style={{ color: '#FF4D2D' }}>.</span>
            </h1>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Trivandrum, Kerala</div>
          </div>

          <div className="about-hero-right" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Accent strip */}
            <div style={{
              padding: '24px 32px', borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(255,77,45,0.7), rgba(255,100,50,0.5))',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,100,60,0.4)',
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)' }}>
                B.Tech CSE (AI) · MBCET · 2026
              </span>
            </div>

            {/* Tilt card */}
            <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
              style={{ flex: 1, perspective: '1000px' }}>
              <div ref={cardRef} className="glass-strong glass-inset" style={{
                padding: '36px', borderRadius: '20px', height: '100%',
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d',
                background: `radial-gradient(circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(255,77,45,0.08), rgba(255,255,255,0.06) 70%)`,
              }}>
                <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '12px' }}>Harisankar S.</div>
                <h2 style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1.2, color: '#fff', marginBottom: '12px' }}>AI/ML Engineer &<br/>Full-Stack Developer</h2>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '20px' }}>
                  Two-time Smart India Hackathon winner. Interned at ICT Academy of Kerala. Passionate about geospatial AI and computer vision.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {["SIH '23","SIH '24"].map(t => (
                    <span key={t} className="glass-pill" style={{ padding:'4px 12px', fontSize:'10px', fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.7)' }}>{t}</span>
                  ))}
                  <span style={{ padding:'4px 12px', borderRadius:'999px', fontSize:'10px', fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', background:'rgba(255,77,45,0.2)', border:'1px solid rgba(255,77,45,0.4)', color:'#FF4D2D' }}>Open to Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="about-story glass glass-inset" style={{ padding: '48px', borderRadius: '24px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '16px' }}>+002 / Story</div>
            <h2 style={{ fontSize: '36px', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff' }}>Creative<br/>Problem<br/>Solver.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
            {[
              'Final year CSE (AI) student at Mar Baselios College of Engineering and Technology, Trivandrum. I build full-stack AI platforms — from satellite imagery analysis to autonomous robotics.',
              'My work spans the full stack: React / Next.js frontends, FastAPI backends, PyTorch models trained on custom datasets, and end-to-end MLOps pipelines. I care about shipping things that actually work.',
              'Outside of code, I obsess over mechanical keyboards — currently rocking an R75 wireless board with a custom VIA config — and design posters and album covers in Figma.',
            ].map((p, i) => (
              <p key={i} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{p}</p>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '16px', paddingLeft: '4px' }}>+003 / Capabilities</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { label: 'Frontend & Web',  items: skills.frontend },
              { label: 'Backend & Infra', items: skills.backend },
              { label: 'AI / ML',         items: skills.ai },
            ].map((block) => (
              <div key={block.label} className="skill-block glass glass-shine glass-inset" style={{ padding: '32px', borderRadius: '20px' }}>
                <h3 style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '20px' }}>{block.label}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {block.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FF4D2D', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="glass glass-inset" style={{ padding: '40px 48px', borderRadius: '24px' }}>
          <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '24px' }}>+004 / Find Me Online</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { label: 'GitHub',   href: socials.github },
              { label: 'LinkedIn', href: socials.linkedin },
              { label: 'Email',    href: `mailto:${socials.email}` },
            ].map(({ label, href }) => (
              <a key={label} href={href} target={label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer"
                className="about-social-link"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#FF4D2D'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
              >
                {label}
                <ArrowIcon size={28} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
