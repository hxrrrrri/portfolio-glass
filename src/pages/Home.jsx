import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import heroImg from '../assets/hero.jpg'

const ArrowIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function Home() {
  const heroRef         = useRef(null)
  const headingRef      = useRef(null)
  const subRef          = useRef(null)
  const ctaRef          = useRef(null)
  const photoRef        = useRef(null)
  const photoWrapRef    = useRef(null)
  const photoOverlayRef = useRef(null)
  const glassShineRef   = useRef(null)
  const badgeRef        = useRef(null)
  const statsRef        = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo(headingRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out' })
        .fromTo(subRef.current,     { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .fromTo(ctaRef.current,     { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .fromTo(statsRef.current,   { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')

      if (photoWrapRef.current) {
        gsap.fromTo(photoWrapRef.current,
          { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.05 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.3, delay: 0.2, ease: 'power4.out' }
        )
      }
      if (glassShineRef.current) {
        gsap.fromTo(glassShineRef.current,
          { x: '-130%', opacity: 1 },
          { x: '130%',  opacity: 0, duration: 1.1, delay: 1.4, ease: 'power2.inOut' }
        )
      }
      if (badgeRef.current) {
        gsap.fromTo(badgeRef.current,
          { scale: 0, rotation: -15, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.7, delay: 1.0, ease: 'back.out(2.5)' }
        )
        gsap.to(badgeRef.current, { scale: 1.05, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.8 })
      }
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const handlePhotoEnter = () => {
    if (photoOverlayRef.current) gsap.to(photoOverlayRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
  }
  const handlePhotoLeave = () => {
    if (photoOverlayRef.current) gsap.to(photoOverlayRef.current, { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
    if (photoRef.current)        gsap.to(photoRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' })
  }
  const handlePhotoMove = (e) => {
    const wrap = photoWrapRef.current
    if (!wrap || !photoRef.current) return
    const rect = wrap.getBoundingClientRect()
    const rx = ((e.clientY - rect.top)  / rect.height - 0.5) * 16
    const ry = (0.5 - (e.clientX - rect.left) / rect.width) * 16
    gsap.to(photoRef.current, { rotateX: rx, rotateY: ry, duration: 0.2, ease: 'power1.out' })
  }

  const stats = [
    { label: 'Achievements', value: '2×', sub: 'SIH Winner' },
    { label: 'Projects',     value: '6+', sub: 'Built & Shipped' },
    { label: 'Stack',        value: '15+',sub: 'Technologies' },
  ]

  return (
    <div ref={heroRef} className="relative" style={{ minHeight: 'calc(100vh - 60px)', overflow: 'hidden' }}>

      {/* Section glow */}
      <div style={{ position:'absolute', top:'-200px', left:'50%', transform:'translateX(-50%)', width:'800px', height:'400px', background:'radial-gradient(ellipse, rgba(255,77,45,0.08) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 48px', position: 'relative', zIndex: 1 }}>

        {/* ── Main hero row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '60px', alignItems: 'start' }}>

          {/* LEFT — name + bio + buttons */}
          <div>
            <div ref={headingRef}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '24px' }}>
                Final Year · CSE (AI) · MBCET
              </div>
              <h1 style={{
                fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: '#fff',
                whiteSpace: 'nowrap',
                marginBottom: '20px',
              }}>
                Harisankar S<span style={{ color: '#FF4D2D' }}>.</span>
              </h1>
              <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '40px' }}>
                AI/ML Engineer · Full-Stack Developer
              </div>
            </div>

            <div ref={subRef} style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', maxWidth: '480px', fontWeight: 400 }}>
                Building intelligent systems at the intersection of computer vision, NLP, and modern web architecture. Two-time SIH winner.
              </p>
            </div>

            <div ref={ctaRef} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/projects" className="glass-btn-accent"
                style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 28px', textDecoration:'none', fontSize:'13px', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' }}>
                View Works <ArrowIcon size={16} />
              </Link>
              <Link to="/contact" className="glass-btn"
                style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 28px', textDecoration:'none', fontSize:'13px', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(255,255,255,0.85)' }}>
                Get in Touch
              </Link>
              <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="glass-btn"
                style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'14px 20px', textDecoration:'none', fontSize:'12px', fontWeight:600, color:'rgba(255,255,255,0.55)', letterSpacing:'0.04em' }}>
                github/hxrrrrri
              </a>
            </div>

            {/* Stats row */}
            <div ref={statsRef} style={{ display: 'flex', gap: '2px', marginTop: '56px' }}>
              {stats.map((s, i) => (
                <div key={s.label} className="glass glass-shine" style={{
                  padding: '20px 28px',
                  borderRadius: i === 0 ? '16px 4px 4px 16px' : i === stats.length-1 ? '4px 16px 16px 4px' : '4px',
                  flex: 1,
                }}>
                  <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '6px' }}>{s.label}</div>
                  <div style={{ fontSize: '36px', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
                  <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — photo + badge */}
          <div style={{ position: 'relative', width: '320px', flexShrink: 0 }}>

            {/* Open to Work badge */}
            <div ref={badgeRef} style={{
              position: 'absolute', top: '-16px', right: '-16px',
              zIndex: 20, transformOrigin: 'center',
            }}>
              <div style={{ position: 'relative', display: 'inline-flex' }}>
                <div style={{
                  position: 'absolute', inset: '-6px', borderRadius: '12px',
                  background: 'rgba(255,77,45,0.4)', filter: 'blur(12px)', zIndex: 0,
                }} />
                <div style={{
                  position: 'relative', zIndex: 1,
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 14px',
                  background: 'linear-gradient(135deg, rgba(255,77,45,0.9), rgba(255,100,50,0.75))',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,120,60,0.6)',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px rgba(255,77,45,0.4)',
                }}>
                  <span style={{
                    width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
                    background: '#22ff88', boxShadow: '0 0 8px #22ff88',
                    animation: 'blink 1.1s ease-in-out infinite',
                  }} />
                  <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#fff', whiteSpace: 'nowrap' }}>
                    Open to Work
                  </span>
                </div>
              </div>
            </div>

            {/* Photo card */}
            <div
              ref={photoWrapRef}
              onMouseEnter={handlePhotoEnter}
              onMouseLeave={handlePhotoLeave}
              onMouseMove={handlePhotoMove}
              className="glass-inset-strong"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                cursor: 'crosshair',
                perspective: '900px',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <div ref={photoRef} style={{ transformStyle: 'preserve-3d', position: 'relative' }}>
                {/* Colour base */}
                <img src={heroImg} alt="Harisankar S"
                  style={{ display:'block', width:'100%', clipPath:'inset(0 0 12% 0)', marginBottom:'-12%' }} />

                {/* B&W overlay */}
                <div ref={photoOverlayRef} style={{ position:'absolute', inset:0 }}>
                  <img src={heroImg} alt="" aria-hidden="true"
                    style={{ display:'block', width:'100%', clipPath:'inset(0 0 12% 0)', marginBottom:'-12%', filter:'grayscale(1) contrast(1.1) brightness(0.88)' }} />
                </div>

                {/* Glass overlay on photo */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(0,0,0,0.35) 100%)',
                  pointerEvents: 'none', transform: 'translateZ(8px)',
                }} />

                {/* Shine */}
                <div ref={glassShineRef} style={{
                  position:'absolute', inset:0,
                  background:'linear-gradient(108deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                  pointerEvents:'none', transform:'translateZ(12px)',
                }} />

                {/* Label */}
                <div style={{ position:'absolute', bottom:'14px', left:'16px', transform:'translateZ(8px)' }}>
                  <span style={{ fontSize:'9px', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.15em', color:'rgba(255,255,255,0.6)' }}>
                    Hover →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Marquee strip ── */}
        <div style={{
          marginTop: '64px', marginLeft: '-48px', marginRight: '-48px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.03)',
          padding: '14px 0', overflow: 'hidden',
        }}>
          <div className="marquee-track" style={{ display:'flex', gap:'48px', whiteSpace:'nowrap' }}>
            {Array(4).fill(['AI · ML · Computer Vision', 'Next.js · React · TypeScript', 'FastAPI · PyTorch · YOLOv8', 'SIH 2023 Winner · SIH 2024 Winner', 'Trivandrum · Kerala · India']).flat().map((t,i) => (
              <span key={i} style={{ fontSize:'11px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.22)', flexShrink:0 }}>
                {t} <span style={{ margin:'0 16px', color:'rgba(255,77,45,0.5)' }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Featured teaser ── */}
        <div style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="glass glass-shine glass-inset" style={{ padding: '40px', borderRadius: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '16px' }}>+002 / Featured</div>
            <h2 style={{ fontSize: '36px', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', marginBottom: '16px' }}>Selected<br/>Works.</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '28px' }}>
              Geospatial AI · NLP pipelines · Autonomous robotics · Full-stack platforms — each built end-to-end.
            </p>
            <Link to="/projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#FF4D2D', textDecoration: 'none',
              borderBottom: '1px solid rgba(255,77,45,0.4)', paddingBottom: '4px',
              transition: 'border-color 0.2s',
            }}>
              View All Projects <ArrowIcon size={14} />
            </Link>
          </div>

          <div className="glass glass-shine glass-inset" style={{ padding: '40px', borderRadius: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '16px' }}>+003 / About</div>
            <h2 style={{ fontSize: '36px', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', marginBottom: '16px' }}>Creative<br/>Problem Solver.</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '28px' }}>
              Mechanical keyboard enthusiast. Figma designer. Passionate about shipping things that actually work.
            </p>
            <Link to="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#FF4D2D', textDecoration: 'none',
              borderBottom: '1px solid rgba(255,77,45,0.4)', paddingBottom: '4px',
            }}>
              Read More <ArrowIcon size={14} />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
