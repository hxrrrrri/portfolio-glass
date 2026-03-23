import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import heroImg from '../assets/hero.jpg'

const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function Home() {
  const heroRef         = useRef(null)
  const tagRef          = useRef(null)
  const h1Ref           = useRef(null)
  const roleRef         = useRef(null)
  const bioRef          = useRef(null)
  const ctaRef          = useRef(null)
  const statsRef        = useRef(null)
  const photoWrapRef    = useRef(null)
  const photoRef        = useRef(null)
  const photoOverlayRef = useRef(null)
  const shineRef        = useRef(null)
  const badgeRef        = useRef(null)
  const marqueeRef      = useRef(null)
  const teaserRef       = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered luxury entrance
      const tl = gsap.timeline({ delay: 0.08 })

      tl.fromTo(tagRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo(h1Ref.current,
        { y: 80, opacity: 0, skewY: 2 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'power4.out' }, '-=0.4'
      )
      .fromTo(roleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.7'
      )
      .fromTo(bioRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.5'
      )
      .fromTo(ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '-=0.45'
      )
      .fromTo(statsRef.current?.children ? Array.from(statsRef.current.children) : [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.09, ease: 'power3.out' }, '-=0.35'
      )

      // Photo — dramatic curtain reveal
      if (photoWrapRef.current) {
        gsap.fromTo(photoWrapRef.current,
          { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.06 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.4, delay: 0.3, ease: 'expo.out' }
        )
      }
      // Glass shine sweep after reveal
      if (shineRef.current) {
        gsap.fromTo(shineRef.current,
          { x: '-140%', opacity: 1 },
          { x: '140%', opacity: 0, duration: 1.1, delay: 1.7, ease: 'power2.inOut' }
        )
      }
      // Badge — spring pop
      if (badgeRef.current) {
        gsap.fromTo(badgeRef.current,
          { scale: 0, rotation: -18, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.75, delay: 1.2, ease: 'back.out(2.8)' }
        )
        // Continuous float
        gsap.to(badgeRef.current, { y: -4, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.0 })
      }
      // Marquee fade in
      if (marqueeRef.current) {
        gsap.fromTo(marqueeRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 0.9 }
        )
      }
      // Teaser cards
      if (teaserRef.current) {
        gsap.fromTo(teaserRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.14, delay: 0.6, ease: 'power3.out' }
        )
      }
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const handlePhotoEnter = () => gsap.to(photoOverlayRef.current, { opacity: 0, duration: 0.42, ease: 'power2.out' })
  const handlePhotoLeave = () => {
    gsap.to(photoOverlayRef.current, { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
    gsap.to(photoRef.current, { rotateX: 0, rotateY: 0, duration: 0.65, ease: 'power2.out' })
  }
  const handlePhotoMove = (e) => {
    if (!photoWrapRef.current || !photoRef.current) return
    const r = photoWrapRef.current.getBoundingClientRect()
    gsap.to(photoRef.current, {
      rotateX: ((e.clientY - r.top)  / r.height - 0.5) * 18,
      rotateY: (0.5 - (e.clientX - r.left) / r.width) * 18,
      duration: 0.18, ease: 'power1.out',
    })
  }

  const stats = [
    { label:'Achievements', value:'2×',  sub:'SIH Winner' },
    { label:'Projects',     value:'6+',  sub:'Built & Shipped' },
    { label:'Stack',        value:'15+', sub:'Technologies' },
    { label:'Internship',   value:'ICT', sub:'Academy, Kerala' },
  ]

  const marqueeItems = ['AI · ML · Computer Vision', 'Next.js · React · TypeScript', 'FastAPI · PyTorch · YOLOv8', 'SIH 2023 · SIH 2024 Winner', 'Trivandrum · Kerala · India', 'Open to Work · 2026']

  return (
    <div ref={heroRef} style={{ minHeight:'calc(100vh - 62px)', position:'relative', overflow:'hidden' }}>

      {/* ── HERO — full bleed, padding only from body ── */}
      <div style={{ padding:'72px 64px 0', position:'relative', zIndex:1 }}>

        {/* Two-column layout: left text, right photo — full width */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:'80px', alignItems:'start' }}>

          {/* LEFT */}
          <div>
            <div ref={tagRef} style={{ marginBottom:'32px' }}>
              <span style={{
                display:'inline-flex', alignItems:'center', gap:'10px',
                padding:'6px 16px', borderRadius:'999px',
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.10)',
                fontSize:'11px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)',
              }}>
                <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#FF4D2D', boxShadow:'0 0 6px #FF4D2D', flexShrink:0 }} />
                Final Year · CSE (AI) · MBCET · 2026
              </span>
            </div>

            <h1 ref={h1Ref} style={{
              fontSize:'clamp(4rem, 9.5vw, 9rem)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.045em',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.45) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              whiteSpace: 'nowrap',
            }}>
              Harisankar S<span style={{ WebkitTextFillColor:'#FF4D2D' }}>.</span>
            </h1>

            <div ref={roleRef} style={{ marginBottom:'28px', display:'flex', alignItems:'center', gap:'16px' }}>
              <div style={{ width:'32px', height:'1px', background:'rgba(255,255,255,0.25)' }} />
              <span style={{ fontSize:'13px', fontWeight:600, letterSpacing:'0.20em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)' }}>
                AI/ML Engineer · Full-Stack Developer
              </span>
            </div>

            <p ref={bioRef} style={{ fontSize:'16px', lineHeight:1.75, color:'rgba(255,255,255,0.52)', maxWidth:'520px', marginBottom:'44px', fontWeight:400 }}>
              Building intelligent systems at the intersection of computer vision, NLP, and modern web architecture. Two-time Smart India Hackathon winner.
            </p>

            <div ref={ctaRef} style={{ display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'center', marginBottom:'60px' }}>
              <Link to="/projects" className="btn btn-primary" style={{ borderRadius:'14px' }}>
                View Works <Arrow size={15} />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
              <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ color:'rgba(255,255,255,0.45)', fontSize:'12px', padding:'15px 22px' }}>
                github/hxrrrrri
              </a>
            </div>

            {/* Stats bar — full width of left column */}
            <div ref={statsRef} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px' }}>
              {stats.map((s, i) => (
                <div key={s.label} className="g1 g-shine g-hi"
                  style={{
                    padding:'22px 20px',
                    borderRadius: i===0?'16px 4px 4px 16px' : i===stats.length-1?'4px 16px 16px 4px':'4px',
                  }}>
                  <div style={{ fontSize:'8px', fontWeight:900, letterSpacing:'0.22em', textTransform:'uppercase', color:'#FF4D2D', marginBottom:'8px' }}>{s.label}</div>
                  <div style={{ fontSize:'32px', fontWeight:900, color:'#fff', lineHeight:1, marginBottom:'5px',
                    background:'linear-gradient(135deg,#fff,rgba(255,255,255,0.65))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize:'9px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.30)' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div style={{ position:'relative', paddingTop:'8px' }}>
            {/* Open to Work badge */}
            <div ref={badgeRef} style={{ position:'absolute', top:'-10px', right:'-10px', zIndex:20, transformOrigin:'center' }}>
              <div style={{ position:'relative', display:'inline-flex' }}>
                <div style={{ position:'absolute', inset:'-8px', borderRadius:'14px', background:'rgba(255,77,45,0.38)', filter:'blur(16px)', zIndex:0 }} />
                <div className="g-accent" style={{
                  position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:'9px',
                  padding:'9px 16px', borderRadius:'12px',
                  boxShadow:'0 6px 28px rgba(255,77,45,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
                }}>
                  <span style={{ width:'7px', height:'7px', borderRadius:'50%', flexShrink:0, background:'#22ff88', boxShadow:'0 0 10px #22ff88', animation:'blink 1.1s ease-in-out infinite' }} />
                  <span style={{ fontSize:'10px', fontWeight:900, textTransform:'uppercase', letterSpacing:'0.16em', color:'#fff', whiteSpace:'nowrap' }}>Open to Work</span>
                </div>
              </div>
            </div>

            {/* Photo card */}
            <div ref={photoWrapRef}
              onMouseEnter={handlePhotoEnter}
              onMouseLeave={handlePhotoLeave}
              onMouseMove={handlePhotoMove}
              className="g-hi-strong"
              style={{
                borderRadius:'28px', overflow:'hidden', cursor:'crosshair',
                perspective:'1000px',
                border:'1px solid rgba(255,255,255,0.14)',
              }}>
              <div ref={photoRef} style={{ transformStyle:'preserve-3d', position:'relative' }}>
                <img src={heroImg} alt="Harisankar S"
                  style={{ display:'block', width:'100%', clipPath:'inset(0 0 12% 0)', marginBottom:'-12%' }} />
                <div ref={photoOverlayRef} style={{ position:'absolute', inset:0 }}>
                  <img src={heroImg} alt="" aria-hidden="true"
                    style={{ display:'block', width:'100%', clipPath:'inset(0 0 12% 0)', marginBottom:'-12%', filter:'grayscale(1) contrast(1.1) brightness(0.86)' }} />
                </div>
                {/* Gradient overlay */}
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, transparent 35%, rgba(0,0,0,0.40) 100%)', pointerEvents:'none', transform:'translateZ(6px)' }} />
                {/* Shine */}
                <div ref={shineRef} style={{ position:'absolute', inset:0, background:'linear-gradient(110deg, transparent 28%, rgba(255,255,255,0.52) 50%, transparent 72%)', pointerEvents:'none', transform:'translateZ(10px)' }} />
                <div style={{ position:'absolute', bottom:'16px', left:'18px', transform:'translateZ(8px)' }}>
                  <span style={{ fontSize:'8px', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.18em', color:'rgba(255,255,255,0.5)' }}>Hover for colour →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE — edge to edge ── */}
      <div ref={marqueeRef} style={{
        marginTop:'72px',
        borderTop:'1px solid rgba(255,255,255,0.055)',
        borderBottom:'1px solid rgba(255,255,255,0.055)',
        background:'rgba(255,255,255,0.025)',
        backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
        padding:'16px 0', overflow:'hidden',
      }}>
        <div className="marquee-track" style={{ display:'flex', gap:'0', whiteSpace:'nowrap' }}>
          {Array(5).fill(marqueeItems).flat().map((t,i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', fontSize:'10px', fontWeight:800, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.18)', flexShrink:0, padding:'0 28px' }}>
              {t}
              <span style={{ width:'4px', height:'4px', borderRadius:'50%', background:'rgba(255,77,45,0.55)', margin:'0 28px', flexShrink:0 }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── TEASER CARDS — full bleed ── */}
      <div ref={teaserRef} style={{ padding:'80px 64px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', position:'relative', zIndex:1 }}>
        {/* Featured Work */}
        <div className="g2 g-shine g-hi" style={{ padding:'44px', borderRadius:'24px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'260px' }}>
          <div>
            <div style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.24em', textTransform:'uppercase', color:'#FF4D2D', marginBottom:'20px' }}>+002 / Featured</div>
            <h2 style={{ fontSize:'32px', fontWeight:900, lineHeight:0.95, letterSpacing:'-0.03em', color:'#fff', marginBottom:'16px' }}>Selected<br/>Works.</h2>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.40)', lineHeight:1.7 }}>Geospatial AI · NLP · Robotics · Full-stack — built end-to-end.</p>
          </div>
          <Link to="/projects" style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginTop:'28px', fontSize:'11px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'#FF4D2D', textDecoration:'none', borderBottom:'1px solid rgba(255,77,45,0.35)', paddingBottom:'4px', width:'fit-content' }}>
            View All <Arrow size={13} />
          </Link>
        </div>

        {/* About */}
        <div className="g2 g-shine g-hi" style={{ padding:'44px', borderRadius:'24px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'260px' }}>
          <div>
            <div style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.24em', textTransform:'uppercase', color:'#FF4D2D', marginBottom:'20px' }}>+003 / Story</div>
            <h2 style={{ fontSize:'32px', fontWeight:900, lineHeight:0.95, letterSpacing:'-0.03em', color:'#fff', marginBottom:'16px' }}>Creative<br/>Problem Solver.</h2>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.40)', lineHeight:1.7 }}>Keyboards. Figma. Code. Shipping things that actually work.</p>
          </div>
          <Link to="/about" style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginTop:'28px', fontSize:'11px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'#FF4D2D', textDecoration:'none', borderBottom:'1px solid rgba(255,77,45,0.35)', paddingBottom:'4px', width:'fit-content' }}>
            Read More <Arrow size={13} />
          </Link>
        </div>

        {/* Contact CTA */}
        <div className="g-accent g-hi" style={{ padding:'44px', borderRadius:'24px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'260px', position:'relative', overflow:'hidden' }}>
          {/* glow behind */}
          <div style={{ position:'absolute', inset:'-40px', background:'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08), transparent 65%)', pointerEvents:'none' }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(255,255,255,0.65)', marginBottom:'20px' }}>+004 / Contact</div>
            <h2 style={{ fontSize:'32px', fontWeight:900, lineHeight:0.95, letterSpacing:'-0.03em', color:'#fff', marginBottom:'16px' }}>Let's Build<br/>Something.</h2>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.65)', lineHeight:1.7 }}>Open to roles, freelance, and interesting projects.</p>
          </div>
          <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginTop:'28px', fontSize:'11px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'#fff', textDecoration:'none', borderBottom:'1px solid rgba(255,255,255,0.4)', paddingBottom:'4px', width:'fit-content', position:'relative', zIndex:1 }}>
            Get in Touch <Arrow size={13} />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
