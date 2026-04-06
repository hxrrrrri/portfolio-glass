import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import heroImg from '../assets/hero.jpg'

const Arr = ({ size=16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

function useIsMobile(bp=768){
  const [m,setM]=useState(()=>typeof window!=='undefined'&&window.innerWidth<bp)
  useEffect(()=>{const c=()=>setM(window.innerWidth<bp);window.addEventListener('resize',c);return()=>window.removeEventListener('resize',c)},[bp])
  return m
}

export default function Home() {
  const mob = useIsMobile()
  const pageRef=useRef(null),tagRef=useRef(null),h1Ref=useRef(null),roleRef=useRef(null)
  const bioRef=useRef(null),ctaRef=useRef(null),statsRef=useRef(null),photoColRef=useRef(null)
  const photoWrapRef=useRef(null),photoRef=useRef(null),photoOverlayRef=useRef(null)
  const shineRef=useRef(null),badgeRef=useRef(null),marqueeRef=useRef(null),teaserRef=useRef(null),lineRef=useRef(null)

  useEffect(()=>{
    const ctx=gsap.context(()=>{
      const tl=gsap.timeline({delay:0.06})
      tl.fromTo(tagRef.current,{y:28,opacity:0},{y:0,opacity:1,duration:0.75,ease:'power3.out'})
        .fromTo(h1Ref.current,{y:60,opacity:0,skewY:2,filter:'blur(6px)'},{y:0,opacity:1,skewY:0,filter:'blur(0px)',duration:1.1,ease:'power4.out'},'-=0.4')
        .fromTo(lineRef.current,{scaleX:0,transformOrigin:'left'},{scaleX:1,duration:0.5,ease:'power3.inOut'},'-=0.5')
        .fromTo(roleRef.current,{x:-16,opacity:0},{x:0,opacity:1,duration:0.5,ease:'power3.out'},'-=0.35')
        .fromTo(bioRef.current,{y:14,opacity:0},{y:0,opacity:1,duration:0.5,ease:'power3.out'},'-=0.3')
        .fromTo(ctaRef.current?.children?Array.from(ctaRef.current.children):[],{y:18,opacity:0,scale:0.96},{y:0,opacity:1,scale:1,duration:0.45,stagger:0.08,ease:'back.out(1.4)'},'-=0.25')
        .fromTo(statsRef.current?.children?Array.from(statsRef.current.children):[],{y:28,opacity:0},{y:0,opacity:1,duration:0.5,stagger:0.09,ease:'power3.out'},'-=0.25')
      if(!mob){
        if(photoColRef.current) gsap.fromTo(photoColRef.current,{x:50,opacity:0},{x:0,opacity:1,duration:1.0,delay:0.2,ease:'power4.out'})
        if(photoWrapRef.current) gsap.fromTo(photoWrapRef.current,{clipPath:'inset(100% 0% 0% 0%)',scale:1.06},{clipPath:'inset(0% 0% 0% 0%)',scale:1,duration:1.4,delay:0.3,ease:'expo.out'})
        if(shineRef.current) gsap.fromTo(shineRef.current,{x:'-130%',opacity:1},{x:'130%',opacity:0,duration:1.0,delay:1.8,ease:'power2.inOut'})
        if(badgeRef.current){
          gsap.fromTo(badgeRef.current,{scale:0,rotation:-18,opacity:0},{scale:1,rotation:0,opacity:1,duration:0.75,delay:1.2,ease:'back.out(2.8)'})
          gsap.to(badgeRef.current,{y:-4,duration:1.6,ease:'sine.inOut',yoyo:true,repeat:-1,delay:2.0})
        }
      }
      if(marqueeRef.current) gsap.fromTo(marqueeRef.current,{opacity:0},{opacity:1,duration:0.8,delay:0.9})
      if(teaserRef.current) gsap.fromTo(teaserRef.current.children,{y:50,opacity:0,scale:0.97},{y:0,opacity:1,scale:1,duration:0.75,stagger:0.14,delay:0.5,ease:'power3.out'})
    },pageRef)
    return()=>ctx.revert()
  },[mob])

  const handlePhotoEnter=()=>{gsap.to(photoOverlayRef.current,{opacity:0,duration:0.4,ease:'power2.out'});gsap.to(photoWrapRef.current,{scale:1.01,duration:0.3,ease:'power2.out'})}
  const handlePhotoLeave=()=>{gsap.to(photoOverlayRef.current,{opacity:1,duration:0.5,ease:'power2.inOut'});gsap.to(photoRef.current,{rotateX:0,rotateY:0,duration:0.65,ease:'power2.out'});gsap.to(photoWrapRef.current,{scale:1,duration:0.35,ease:'power2.out'})}
  const handlePhotoMove=(e)=>{if(!photoWrapRef.current||!photoRef.current)return;const r=photoWrapRef.current.getBoundingClientRect();gsap.to(photoRef.current,{rotateX:((e.clientY-r.top)/r.height-0.5)*18,rotateY:(0.5-(e.clientX-r.left)/r.width)*18,duration:0.18,ease:'power1.out'})}

  const stats=[
    {label:'SIH',value:'2×',sub:'National Winner',accent:true},
    {label:'Projects',value:'8+',sub:'Shipped End-to-End'},
    {label:'Stack',value:'15+',sub:'Technologies'},
    {label:'Base',value:'KL',sub:'Kerala, India'},
  ]
  const marqueeItems=['AI · ML · Computer Vision','Next.js · React · TypeScript','FastAPI · PyTorch · YOLOv8','SIH 2023 · SIH 2024 Winner','Trivandrum · Kerala','Open to Work · 2026','Geospatial AI · Robotics · NLP']

  return (
    <div ref={pageRef} style={{minHeight:'calc(100vh - 62px)',position:'relative',overflow:'hidden'}}>
      <div style={{padding:mob?'28px 18px 0':'var(--py) var(--px) 0',position:'relative',zIndex:1}}>
        {!mob&&<div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',backgroundSize:'80px 80px',pointerEvents:'none',zIndex:0}}/>}

        {/* Hero grid — 2-col desktop, 1-col mobile */}
        <div style={{display:'grid',gridTemplateColumns:mob?'1fr':'1fr 380px',gap:mob?'0':'64px',alignItems:'start',position:'relative',zIndex:1}}>
          {/* LEFT */}
          <div>
            {/* Tag */}
            <div ref={tagRef} style={{marginBottom:'28px'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 14px',borderRadius:'999px',background:'rgba(255,255,255,0.045)',border:'1px solid rgba(255,255,255,0.09)'}}>
                <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--a1)',boxShadow:'0 0 8px var(--a1)',animation:'pulse 2s ease-in-out infinite',flexShrink:0}}/>
                <span style={{fontSize:mob?'9px':'10px',fontWeight:700,letterSpacing:'0.20em',textTransform:'uppercase',color:'rgba(255,255,255,0.38)'}}>Final Year · CSE (AI) · MBCET · 2026</span>
              </span>
            </div>
            {/* Name */}
            <h1 ref={h1Ref} style={{fontSize:mob?'clamp(3rem,14vw,5rem)':'clamp(4.2rem,9vw,9rem)',fontWeight:900,lineHeight:0.88,letterSpacing:'-0.045em',marginBottom:'18px',color:'rgba(255,255,255,0.97)',whiteSpace:mob?'normal':'nowrap'}}>
              Harisankar S<span style={{WebkitTextFillColor:'var(--a1)'}}>.</span>
            </h1>
            {/* Accent line */}
            <div ref={lineRef} style={{height:'2px',width:'64px',background:'linear-gradient(90deg,var(--a1),transparent)',marginBottom:'18px',borderRadius:'2px'}}/>
            {/* Role */}
            <div ref={roleRef} style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
              <span style={{fontSize:'11px',fontWeight:700,letterSpacing:'0.20em',textTransform:'uppercase',color:'rgba(255,255,255,0.36)'}}>AI/ML Engineer</span>
              <span style={{width:'3px',height:'3px',borderRadius:'50%',background:'rgba(255,255,255,0.20)',flexShrink:0}}/>
              <span style={{fontSize:'11px',fontWeight:700,letterSpacing:'0.20em',textTransform:'uppercase',color:'rgba(255,255,255,0.36)'}}>Full-Stack Developer</span>
            </div>
            {/* Bio */}
            <p ref={bioRef} style={{fontSize:mob?'15px':'16px',lineHeight:1.78,color:'rgba(255,255,255,0.50)',maxWidth:'500px',marginBottom:'36px',fontWeight:400}}>
              Building intelligent systems at the intersection of computer vision, NLP, and modern web architecture. Two-time Smart India Hackathon winner.
            </p>
            {/* CTAs */}
            <div ref={ctaRef} style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center',marginBottom:mob?'36px':'56px'}}>
              <Link to="/projects" className="btn btn-primary" style={mob?{padding:'13px 22px',fontSize:'11px'}:{}}>View Works <Arr size={13}/></Link>
              <Link to="/contact" className="btn btn-ghost" style={mob?{padding:'13px 22px',fontSize:'11px'}:{}}>Get in Touch</Link>
              {!mob&&<a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{color:'rgba(255,255,255,0.38)',fontSize:'11px',padding:'13px 20px'}}>github/hxrrrrri</a>}
            </div>
            {/* Stats */}
            <div ref={statsRef} style={{display:'grid',gridTemplateColumns:mob?'repeat(2,1fr)':'repeat(4,1fr)',gap:'2px',marginBottom:mob?'32px':'0'}}>
              {stats.map((s,i)=>{
                const br=mob?(i===0?'16px 3px 3px 16px':i===1?'3px 16px 16px 3px':i===2?'3px 3px 3px 3px':'3px 3px 3px 3px'):(i===0?'18px 3px 3px 18px':i===stats.length-1?'3px 18px 18px 3px':'3px')
                return (
                  <div key={s.label} className="g1 g-hi" style={{padding:mob?'18px 16px':'22px 20px',borderRadius:br,position:'relative',overflow:'hidden'}}>
                    {s.accent&&<div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:'linear-gradient(90deg,var(--a1),transparent)'}}/>}
                    <div style={{fontSize:'7px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'var(--a1)',marginBottom:'8px'}}>{s.label}</div>
                    <div className="grad-text" style={{fontSize:mob?'26px':'32px',fontWeight:900,lineHeight:1,marginBottom:'4px',letterSpacing:'-0.04em'}}>{s.value}</div>
                    <div style={{fontSize:'8px',fontWeight:600,letterSpacing:'0.10em',textTransform:'uppercase',color:'rgba(255,255,255,0.26)'}}>{s.sub}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT — Photo (hidden on mobile, shown below) */}
          {!mob&&(
            <div ref={photoColRef} style={{position:'relative',paddingTop:'4px'}}>
              <div ref={badgeRef} style={{position:'absolute',top:'-14px',right:'-14px',zIndex:20}}>
                <div style={{position:'relative',display:'inline-flex'}}>
                  <div style={{position:'absolute',inset:'-10px',borderRadius:'16px',background:'rgba(var(--a-r),var(--a-g),var(--a-b),0.32)',filter:'blur(18px)',zIndex:0}}/>
                  <div className="g-accent" style={{position:'relative',zIndex:1,display:'flex',alignItems:'center',gap:'9px',padding:'10px 18px',borderRadius:'13px',boxShadow:'0 8px 32px rgba(var(--a-r),var(--a-g),var(--a-b),0.50),inset 0 1.5px 0 rgba(255,255,255,0.28)'}}>
                    <span style={{width:'7px',height:'7px',borderRadius:'50%',flexShrink:0,background:'#22ff88',boxShadow:'0 0 12px #22ff88',animation:'blink 1.1s ease-in-out infinite'}}/>
                    <span style={{fontSize:'10px',fontWeight:900,textTransform:'uppercase',letterSpacing:'0.18em',color:'#fff',whiteSpace:'nowrap'}}>Open to Work</span>
                  </div>
                </div>
              </div>
              <div ref={photoWrapRef} onMouseEnter={handlePhotoEnter} onMouseLeave={handlePhotoLeave} onMouseMove={handlePhotoMove} className="g-hi3"
                style={{borderRadius:'28px',overflow:'hidden',cursor:'crosshair',perspective:'1000px',border:'1px solid rgba(255,255,255,0.13)',transition:'transform 0.35s cubic-bezier(0.16,1,0.3,1)'}}>
                <div ref={photoRef} style={{transformStyle:'preserve-3d',position:'relative'}}>
                  <img src={heroImg} alt="Harisankar S" style={{display:'block',width:'100%',clipPath:'inset(0 0 12% 0)',marginBottom:'-12%'}}/>
                  <div ref={photoOverlayRef} style={{position:'absolute',inset:0}}>
                    <img src={heroImg} alt="" aria-hidden="true" style={{display:'block',width:'100%',clipPath:'inset(0 0 12% 0)',marginBottom:'-12%',filter:'grayscale(1) contrast(1.08) brightness(0.84)'}}/>
                  </div>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(255,255,255,0.04) 0%,transparent 30%,rgba(0,0,0,0.45) 100%)',pointerEvents:'none',transform:'translateZ(8px)'}}/>
                  <div ref={shineRef} style={{position:'absolute',inset:0,background:'linear-gradient(112deg,transparent 25%,rgba(255,255,255,0.55) 50%,transparent 75%)',pointerEvents:'none',transform:'translateZ(12px)'}}/>
                  <div style={{position:'absolute',bottom:'18px',left:'20px',transform:'translateZ(10px)'}}>
                    <span style={{fontSize:'8px',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.20em',color:'rgba(255,255,255,0.45)'}}>Hover for colour →</span>
                  </div>
                </div>
              </div>
              <div style={{position:'absolute',bottom:'-20px',left:'10%',right:'10%',height:'60px',background:'radial-gradient(ellipse,rgba(var(--a-r),var(--a-g),var(--a-b),0.15) 0%,transparent 70%)',filter:'blur(20px)',pointerEvents:'none',zIndex:-1}}/>
            </div>
          )}
        </div>

        {/* Mobile photo — full width below text */}
        {mob&&(
          <div style={{marginTop:'32px',borderRadius:'20px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.10)',position:'relative'}}>
            <img src={heroImg} alt="Harisankar S" style={{display:'block',width:'100%',clipPath:'inset(0 0 12% 0)',marginBottom:'-12%'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.5) 100%)',pointerEvents:'none'}}/>
            <div style={{position:'absolute',bottom:'16px',left:'16px',display:'flex',alignItems:'center',gap:'8px',padding:'7px 14px',borderRadius:'10px',background:'rgba(0,0,0,0.5)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.10)'}}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#22ff88',boxShadow:'0 0 8px #22ff88',animation:'blink 1.1s ease-in-out infinite',flexShrink:0}}/>
              <span style={{fontSize:'9px',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.16em',color:'rgba(255,255,255,0.80)'}}>Open to Work</span>
            </div>
          </div>
        )}
      </div>

      {/* Marquee */}
      <div ref={marqueeRef} style={{marginTop:mob?'32px':'72px',position:'relative',zIndex:1}}>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.05)',borderBottom:'1px solid rgba(255,255,255,0.05)',background:'rgba(255,255,255,0.022)',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',padding:'12px 0',overflow:'hidden'}}>
          <div className="marquee-track" style={{display:'flex',whiteSpace:'nowrap'}}>
            {Array(6).fill(marqueeItems).flat().map((t,i)=>(
              <span key={i} style={{display:'inline-flex',alignItems:'center',fontSize:'9px',fontWeight:800,letterSpacing:'0.24em',textTransform:'uppercase',color:'rgba(255,255,255,0.15)',flexShrink:0,padding:'0 22px'}}>
                {t}<span style={{width:'3px',height:'3px',borderRadius:'50%',background:'rgba(var(--a-r),var(--a-g),var(--a-b),0.50)',margin:'0 22px',flexShrink:0}}/>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Teaser cards */}
      <div ref={teaserRef} style={{padding:mob?'28px 18px':'72px var(--px)',display:'grid',gridTemplateColumns:mob?'1fr':'1fr 1fr 1fr',gap:'12px',position:'relative',zIndex:1}}>
        {[
          {num:'+002 / Featured',h:'Selected\nWorks.',p:'Geospatial AI · NLP pipelines · Autonomous robotics · Full-stack.',to:'/projects',cta:'View All',accent:false},
          {num:'+003 / Story',h:'Creative\nProblem Solver.',p:'Mechanical keyboards. Figma. Code. Shipping things that actually work.',to:'/about',cta:'Read More',accent:false},
          {num:'+004 / Contact',h:"Let's Build\nSomething.",p:'Open to roles, freelance, and interesting projects. I respond fast.',to:'/contact',cta:'Get in Touch',accent:true},
        ].map(({num,h,p,to,cta,accent})=>(
          <div key={num} className={accent?'g-accent g-hi2':'g2 g-shine g-hi2'} style={{padding:mob?'28px 24px':'44px',borderRadius:'24px',display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:mob?'200px':'260px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'relative',zIndex:1}}>
              <div className="text-label" style={{marginBottom:'16px',color:accent?'rgba(255,255,255,0.65)':undefined}}>{num}</div>
              <h2 style={{fontSize:mob?'24px':'30px',fontWeight:900,lineHeight:0.95,letterSpacing:'-0.03em',color:'#fff',marginBottom:'12px',whiteSpace:'pre-line'}}>{h}</h2>
              {!mob&&<p style={{fontSize:'13px',color:accent?'rgba(255,255,255,0.62)':'rgba(255,255,255,0.38)',lineHeight:1.70}}>{p}</p>}
            </div>
            <Link to={to} style={{display:'inline-flex',alignItems:'center',gap:'8px',marginTop:'20px',fontSize:'11px',fontWeight:800,letterSpacing:'0.12em',textTransform:'uppercase',color:accent?'rgba(255,255,255,0.95)':'var(--a1)',textDecoration:'none',position:'relative',zIndex:1}}>
              {cta} <Arr size={12}/>
            </Link>
          </div>
        ))}
      </div>

      <Footer/>
    </div>
  )
}
