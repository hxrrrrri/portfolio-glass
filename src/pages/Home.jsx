import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import heroImg from '../assets/hero.jpg'

const Arr = ({ size=16, style={} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, ...style }}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function Home() {
  const pageRef         = useRef(null)
  const tagRef          = useRef(null)
  const h1Ref           = useRef(null)
  const roleRef         = useRef(null)
  const bioRef          = useRef(null)
  const ctaRef          = useRef(null)
  const statsRef        = useRef(null)
  const photoColRef     = useRef(null)
  const photoWrapRef    = useRef(null)
  const photoRef        = useRef(null)
  const photoOverlayRef = useRef(null)
  const shineRef        = useRef(null)
  const badgeRef        = useRef(null)
  const marqueeRef      = useRef(null)
  const teaserRef       = useRef(null)
  const lineRef         = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Cinematic entrance timeline ──
      const tl = gsap.timeline({ delay: 0.06 })

      // Tag pill slides up
      tl.fromTo(tagRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out' }
      )
      // Headline — characters split feel, skew for drama
      .fromTo(h1Ref.current,
        { y: 90, opacity: 0, skewY: 3, filter: 'blur(8px)' },
        { y: 0, opacity: 1, skewY: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }, '-=0.45'
      )
      // Accent line draws
      .fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, '-=0.5'
      )
      // Role
      .fromTo(roleRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '-=0.4'
      )
      // Bio
      .fromTo(bioRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '-=0.35'
      )
      // CTAs
      .fromTo(ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
        { y: 20, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)' }, '-=0.3'
      )
      // Stats — cascade
      .fromTo(statsRef.current?.children ? Array.from(statsRef.current.children) : [],
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.10, ease: 'power3.out' }, '-=0.3'
      )

      // Photo — cinematic reveal from bottom
      if (photoColRef.current) {
        gsap.fromTo(photoColRef.current,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1, delay: 0.25, ease: 'power4.out' }
        )
      }
      if (photoWrapRef.current) {
        gsap.fromTo(photoWrapRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.5, delay: 0.35, ease: 'expo.out' }
        )
      }
      // Shine sweep after reveal
      if (shineRef.current) {
        gsap.fromTo(shineRef.current,
          { x: '-130%', opacity: 1 },
          { x: '130%', opacity: 0, duration: 1.1, delay: 1.85, ease: 'power2.inOut' }
        )
      }
      // Badge — spring pop with wobble
      if (badgeRef.current) {
        gsap.fromTo(badgeRef.current,
          { scale: 0, rotation: -20, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.8, delay: 1.3, ease: 'back.out(3)' }
        )
        gsap.to(badgeRef.current, { y: -5, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.1 })
      }
      // Marquee
      if (marqueeRef.current) {
        gsap.fromTo(marqueeRef.current, { opacity: 0 }, { opacity: 1, duration: 1.0, delay: 1.0 })
      }
      // Teaser cards — stagger cascade
      if (teaserRef.current) {
        gsap.fromTo(teaserRef.current.children,
          { y: 60, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.16, delay: 0.5, ease: 'power3.out' }
        )
      }
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const handlePhotoEnter = () => {
    gsap.to(photoOverlayRef.current, { opacity: 0, duration: 0.45, ease: 'power2.out' })
    gsap.to(photoWrapRef.current, { scale: 1.01, duration: 0.35, ease: 'power2.out' })
  }
  const handlePhotoLeave = () => {
    gsap.to(photoOverlayRef.current, { opacity: 1, duration: 0.55, ease: 'power2.inOut' })
    gsap.to(photoRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power2.out' })
    gsap.to(photoWrapRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' })
  }
  const handlePhotoMove = (e) => {
    if (!photoWrapRef.current || !photoRef.current) return
    const r = photoWrapRef.current.getBoundingClientRect()
    gsap.to(photoRef.current, {
      rotateX: ((e.clientY - r.top)  / r.height - 0.5) * 20,
      rotateY: (0.5 - (e.clientX - r.left) / r.width) * 20,
      duration: 0.20, ease: 'power1.out',
    })
  }

  const stats = [
    { label:'SIH',      value:'2×',  sub:'National Winner',     accent: true },
    { label:'Projects', value:'6+',  sub:'Shipped End-to-End' },
    { label:'Stack',    value:'15+', sub:'Technologies' },
    { label:'Base',     value:'KL',  sub:'Kerala, India' },
  ]

  const marqueeItems = ['AI · ML · Computer Vision', 'Next.js · React · TypeScript', 'FastAPI · PyTorch · YOLOv8', 'SIH 2023 · SIH 2024 Winner', 'Trivandrum · Kerala', 'Open to Work · 2026', 'Geospatial AI · Robotics · NLP']

  return (
    <div ref={pageRef} style={{ minHeight:'calc(100vh - 62px)', position:'relative', overflow:'hidden' }}>

      {/* ── HERO — full bleed ── */}
      <div style={{ padding:'var(--py) var(--px) 0', position:'relative', zIndex:1 }}>

        {/* Subtle grid bg */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize:'80px 80px', pointerEvents:'none', zIndex:0 }}/>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:'72px', alignItems:'start', position:'relative', zIndex:1 }}>

          {/* ─── LEFT ─── */}
          <div>
            {/* Tag pill */}
            <div ref={tagRef} style={{ marginBottom:'36px' }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'7px 18px', borderRadius:'999px', background:'rgba(255,255,255,0.045)', border:'1px solid rgba(255,255,255,0.09)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.06)' }}>
                <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--a1)', boxShadow:'0 0 8px var(--a1)', animation:'pulse 2s ease-in-out infinite', flexShrink:0 }}/>
                <span style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)' }}>Final Year · CSE (AI) · MBCET · 2026</span>
              </span>
            </div>

            {/* Headline */}
            <h1 ref={h1Ref} style={{ fontSize:'clamp(4.2rem, 10vw, 10rem)', fontWeight:900, lineHeight:0.86, letterSpacing:'-0.048em', marginBottom:'20px', whiteSpace:'nowrap', color:'rgba(255,255,255,0.97)' }}>
              Harisankar S<span style={{ WebkitTextFillColor:'var(--a1)' }}>.</span>
            </h1>

            {/* Accent line */}
            <div ref={lineRef} style={{ height:'2px', width:'80px', background:'linear-gradient(90deg, var(--a1), transparent)', marginBottom:'22px', borderRadius:'2px' }}/>

            {/* Role */}
            <div ref={roleRef} style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'28px' }}>
              <span style={{ fontSize:'12px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.36)' }}>AI/ML Engineer</span>
              <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:'rgba(255,255,255,0.20)', flexShrink:0 }}/>
              <span style={{ fontSize:'12px', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.36)' }}>Full-Stack Developer</span>
            </div>

            {/* Bio */}
            <p ref={bioRef} style={{ fontSize:'16px', lineHeight:1.8, color:'rgba(255,255,255,0.50)', maxWidth:'500px', marginBottom:'48px', fontWeight:400, letterSpacing:'0.01em' }}>
              Building intelligent systems at the intersection of computer vision, NLP, and modern web architecture. Two-time Smart India Hackathon winner.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} style={{ display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center', marginBottom:'64px' }}>
              <Link to="/projects" className="btn btn-primary">
                View Works <Arr size={14}/>
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Get in Touch
              </Link>
              <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="btn btn-ghost"
                style={{ color:'rgba(255,255,255,0.38)', fontSize:'11px', padding:'13px 20px' }}>
                github/hxrrrrri
              </a>
            </div>

            {/* Stats — segmented pill bar */}
            <div ref={statsRef} style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px' }}>
              {stats.map((s, i) => (
                <div key={s.label} className="g1 g-shine g-hi card-lift"
                  style={{
                    padding:'24px 22px',
                    borderRadius: i===0?'18px 3px 3px 18px' : i===stats.length-1?'3px 18px 18px 3px':'3px',
                    position:'relative', overflow:'hidden',
                  }}>
                  {/* Accent top line on first item */}
                  {s.accent && <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg, var(--a1), transparent)' }}/>}
                  <div style={{ fontSize:'7px', fontWeight:900, letterSpacing:'0.28em', textTransform:'uppercase', color:'var(--a1)', marginBottom:'10px' }}>{s.label}</div>
                  <div className="grad-text" style={{ fontSize:'34px', fontWeight:900, lineHeight:1, marginBottom:'6px', letterSpacing:'-0.04em' }}>{s.value}</div>
                  <div style={{ fontSize:'9px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.26)' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT — Photo ─── */}
          <div ref={photoColRef} style={{ position:'relative', paddingTop:'4px' }}>

            {/* Open to Work badge */}
            <div ref={badgeRef} style={{ position:'absolute', top:'-14px', right:'-14px', zIndex:20 }}>
              <div style={{ position:'relative', display:'inline-flex' }}>
                <div style={{ position:'absolute', inset:'-10px', borderRadius:'16px', background:'rgba(var(--a-r),var(--a-g),var(--a-b),0.32)', filter:'blur(18px)', zIndex:0 }}/>
                <div className="g-accent" style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:'9px', padding:'10px 18px', borderRadius:'13px', boxShadow:'0 8px 32px rgba(var(--a-r),var(--a-g),var(--a-b),0.50), inset 0 1.5px 0 rgba(255,255,255,0.28)' }}>
                  <span style={{ width:'7px', height:'7px', borderRadius:'50%', flexShrink:0, background:'#22ff88', boxShadow:'0 0 12px #22ff88', animation:'blink 1.1s ease-in-out infinite' }}/>
                  <span style={{ fontSize:'10px', fontWeight:900, textTransform:'uppercase', letterSpacing:'0.18em', color:'#fff', whiteSpace:'nowrap' }}>Open to Work</span>
                </div>
              </div>
            </div>

            {/* Photo card */}
            <div ref={photoWrapRef}
              onMouseEnter={handlePhotoEnter}
              onMouseLeave={handlePhotoLeave}
              onMouseMove={handlePhotoMove}
              className="g-hi3"
              style={{ borderRadius:'28px', overflow:'hidden', cursor:'crosshair', perspective:'1000px', border:'1px solid rgba(255,255,255,0.13)', transition:'transform 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
              <div ref={photoRef} style={{ transformStyle:'preserve-3d', position:'relative' }}>
                {/* Colour base */}
                <img src={heroImg} alt="Harisankar S"
                  style={{ display:'block', width:'100%', clipPath:'inset(0 0 12% 0)', marginBottom:'-12%' }}/>
                {/* B&W overlay */}
                <div ref={photoOverlayRef} style={{ position:'absolute', inset:0 }}>
                  <img src={heroImg} alt="" aria-hidden="true"
                    style={{ display:'block', width:'100%', clipPath:'inset(0 0 12% 0)', marginBottom:'-12%', filter:'grayscale(1) contrast(1.08) brightness(0.84)' }}/>
                </div>
                {/* Glass overlay gradient */}
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 30%, rgba(0,0,0,0.45) 100%)', pointerEvents:'none', transform:'translateZ(8px)' }}/>
                {/* Shine sweep */}
                <div ref={shineRef} style={{ position:'absolute', inset:0, background:'linear-gradient(112deg, transparent 25%, rgba(255,255,255,0.55) 50%, transparent 75%)', pointerEvents:'none', transform:'translateZ(12px)' }}/>
                {/* Label */}
                <div style={{ position:'absolute', bottom:'18px', left:'20px', transform:'translateZ(10px)' }}>
                  <span style={{ fontSize:'8px', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.20em', color:'rgba(255,255,255,0.45)' }}>Hover for colour →</span>
                </div>
              </div>
            </div>

            {/* Decorative glow under photo */}
            <div style={{ position:'absolute', bottom:'-20px', left:'10%', right:'10%', height:'60px', background:'radial-gradient(ellipse, rgba(255,77,45,0.15) 0%, transparent 70%)', filter:'blur(20px)', pointerEvents:'none', zIndex:-1 }}/>
          </div>
        </div>
      </div>

      {/* ── DUAL MARQUEE ── */}
      <div ref={marqueeRef} style={{ marginTop:'80px', position:'relative', zIndex:1 }}>
        {/* Top track — left to right */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.022)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', padding:'13px 0', overflow:'hidden' }}>
          <div className="marquee-track" style={{ display:'flex', whiteSpace:'nowrap' }}>
            {Array(6).fill(marqueeItems).flat().map((t,i) => (
              <span key={i} style={{ display:'inline-flex', alignItems:'center', fontSize:'9px', fontWeight:800, letterSpacing:'0.26em', textTransform:'uppercase', color:'rgba(255,255,255,0.15)', flexShrink:0, padding:'0 26px' }}>
                {t}
                <span style={{ width:'3px', height:'3px', borderRadius:'50%', background:'rgba(var(--a-r),var(--a-g),var(--a-b),0.50)', margin:'0 26px', flexShrink:0 }}/>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── TEASER CARDS ── */}
      <div ref={teaserRef} style={{ padding:'80px var(--px)', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'16px', position:'relative', zIndex:1 }}>

        {/* Projects */}
        <div className="g2 g-shine g-hi2 card-lift" style={{ padding:'48px', borderRadius:'28px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'280px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, right:0, width:'200px', height:'200px', background:'radial-gradient(circle at 70% 30%, rgba(var(--a-r),var(--a-g),var(--a-b),0.06), transparent 65%)', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:1 }}>
            <div className="text-label" style={{ marginBottom:'22px' }}>+002 / Featured</div>
            <h2 className="grad-text" style={{ fontSize:'34px', fontWeight:900, lineHeight:0.92, letterSpacing:'-0.035em', marginBottom:'18px' }}>Selected<br/>Works.</h2>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.38)', lineHeight:1.72 }}>Geospatial AI · NLP pipelines · Autonomous robotics · Full-stack platforms.</p>
          </div>
          <Link to="/projects" style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginTop:'32px', fontSize:'11px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--a1)', textDecoration:'none', position:'relative', zIndex:1 }}
            onMouseEnter={e=>e.currentTarget.style.gap='14px'}
            onMouseLeave={e=>e.currentTarget.style.gap='8px'}
            className="transition-all"
          >
            View All <Arr size={13}/>
          </Link>
        </div>

        {/* About */}
        <div className="g2 g-shine g-hi2 card-lift" style={{ padding:'48px', borderRadius:'28px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'280px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', bottom:0, left:0, width:'220px', height:'220px', background:'radial-gradient(circle at 20% 80%, rgba(80,40,255,0.06), transparent 65%)', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:1 }}>
            <div className="text-label" style={{ marginBottom:'22px' }}>+003 / Story</div>
            <h2 className="grad-text" style={{ fontSize:'34px', fontWeight:900, lineHeight:0.92, letterSpacing:'-0.035em', marginBottom:'18px' }}>Creative<br/>Problem Solver.</h2>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.38)', lineHeight:1.72 }}>Mechanical keyboards. Figma. Code. Shipping things that actually work.</p>
          </div>
          <Link to="/about" style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginTop:'32px', fontSize:'11px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--a1)', textDecoration:'none', position:'relative', zIndex:1 }}>
            Read More <Arr size={13}/>
          </Link>
        </div>

        {/* Contact — accent card */}
        <div className="g-accent g-hi2 card-lift" style={{ padding:'48px', borderRadius:'28px', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'280px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:'-30px', background:'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.10), transparent 60%)', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ fontSize:'9px', fontWeight:900, letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(255,255,255,0.60)', marginBottom:'22px' }}>+004 / Contact</div>
            <h2 style={{ fontSize:'34px', fontWeight:900, lineHeight:0.92, letterSpacing:'-0.035em', color:'#fff', marginBottom:'18px' }}>Let's Build<br/>Something.</h2>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.62)', lineHeight:1.72 }}>Open to roles, freelance, and interesting projects. I respond fast.</p>
          </div>
          <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginTop:'32px', fontSize:'11px', fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.95)', textDecoration:'none', position:'relative', zIndex:1 }}>
            Get in Touch <Arr size={13}/>
          </Link>
        </div>
      </div>

      <Footer/>
    </div>
  )
}
