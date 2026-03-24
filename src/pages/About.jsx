import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import { skills, socials } from '../data/projects'

const Arr=({s=26})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
function useIsMobile(bp=768){const[m,setM]=useState(()=>typeof window!=='undefined'&&window.innerWidth<bp);useEffect(()=>{const c=()=>setM(window.innerWidth<bp);window.addEventListener('resize',c);return()=>window.removeEventListener('resize',c)},[bp]);return m}

export default function About() {
  const mob=useIsMobile()
  const cardRef=useRef(null),conRef=useRef(null)

  useEffect(()=>{
    const tl=gsap.timeline({delay:0.06})
    tl.fromTo('.ab-hero',{y:50,opacity:0,filter:'blur(4px)'},{y:0,opacity:1,filter:'blur(0px)',duration:0.9,ease:'power4.out'})
      .fromTo('.ab-story',{y:40,opacity:0},{y:0,opacity:1,duration:0.75,ease:'power3.out'},'<0.35')
      .fromTo('.sk-block',{y:36,opacity:0,scale:0.97},{y:0,opacity:1,scale:1,duration:0.6,stagger:0.1,ease:'power3.out'},'<0.2')
      .fromTo('.ab-soc',{x:-20,opacity:0},{x:0,opacity:1,duration:0.5,stagger:0.08,ease:'power3.out'},'<0.1')
    return()=>tl.kill()
  },[])

  const onMove=(e)=>{if(mob)return;const c=cardRef.current,ct=conRef.current;if(!c||!ct)return;const r=ct.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.transform=`rotateX(${(y-r.height/2)/14}deg) rotateY(${(r.width/2-x)/14}deg) scale(1.015)`}
  const onLeave=()=>{if(cardRef.current)cardRef.current.style.transform='rotateX(0) rotateY(0) scale(1)'}

  return (
    <div style={{minHeight:'calc(100vh - 62px)',position:'relative',overflow:'hidden'}}>
      <div className="page">

        {/* Hero — 2-col desktop, 1-col mobile */}
        <div className="ab-hero" style={{display:'grid',gridTemplateColumns:mob?'1fr':'1fr 1.85fr',gap:'14px',marginBottom:'14px'}}>
          <div className="g1 g-hi2 g-shine" style={{padding:mob?'32px 24px':'52px',borderRadius:'24px',display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:mob?'auto':'320px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',bottom:0,left:0,width:'220px',height:'220px',background:'radial-gradient(circle at 20% 80%,rgba(var(--a-r),var(--a-g),var(--a-b),0.06),transparent 65%)',pointerEvents:'none'}}/>
            <div>
              <div className="text-label" style={{marginBottom:'18px'}}>X / Labs</div>
              <h1 className="grad-text" style={{fontSize:mob?'clamp(3rem,12vw,4.5rem)':'clamp(4rem,7vw,7rem)',fontWeight:900,lineHeight:0.88,letterSpacing:'-0.05em'}}>Lab<span style={{WebkitTextFillColor:'var(--a1)'}}>.</span></h1>
            </div>
            <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.16em',textTransform:'uppercase',color:'rgba(255,255,255,0.20)',marginTop:'20px'}}>Trivandrum, Kerala · 2025</div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <div className="about-accent-bar" style={{padding:mob?'16px 20px':'20px 28px',borderRadius:'16px'}}>
              <span style={{fontSize:mob?'10px':'10px',fontWeight:800,letterSpacing:'0.20em',textTransform:'uppercase',color:'rgba(255,255,255,0.90)'}}>B.Tech CSE (AI) · MBCET · 2026</span>
            </div>
            <div ref={conRef} onMouseMove={onMove} onMouseLeave={onLeave} style={{flex:1,perspective:'1100px'}}>
              <div ref={cardRef} className="g2 g-hi2" style={{padding:mob?'24px':'40px',borderRadius:'22px',height:'100%',transition:'transform 0.18s ease-out,box-shadow 0.3s',transformStyle:'preserve-3d',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,right:0,width:'180px',height:'180px',background:'radial-gradient(circle at 80% 20%,rgba(var(--a-r),var(--a-g),var(--a-b),0.07),transparent 65%)',pointerEvents:'none'}}/>
                <div style={{position:'relative',zIndex:1}}>
                  <div className="text-label" style={{marginBottom:'12px'}}>Harisankar S.</div>
                  <h2 style={{fontSize:mob?'18px':'21px',fontWeight:900,lineHeight:1.1,color:'#fff',marginBottom:'14px'}}>AI/ML Engineer &<br/>Full-Stack Developer</h2>
                  <p style={{fontSize:'13px',color:'rgba(255,255,255,0.50)',lineHeight:1.76,marginBottom:'20px'}}>Two-time Smart India Hackathon winner. Interned at ICT Academy of Kerala. Passionate about geospatial AI, computer vision, and deploying models that solve real-world problems.</p>
                  <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                    {["SIH '23","SIH '24"].map(t=><span key={t} className="g-pill" style={{padding:'5px 12px',fontSize:'9px',fontWeight:800,letterSpacing:'0.10em',textTransform:'uppercase',color:'rgba(255,255,255,0.50)'}}>{t}</span>)}
                    <span style={{padding:'5px 12px',borderRadius:'999px',fontSize:'9px',fontWeight:800,letterSpacing:'0.10em',textTransform:'uppercase',background:'rgba(var(--a-r),var(--a-g),var(--a-b),0.16)',border:'1px solid rgba(var(--a-r),var(--a-g),var(--a-b),0.34)',color:'var(--a1)'}}>Open to Work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story — 2-col desktop, 1-col mobile */}
        <div className="ab-story g1 g-hi2" style={{padding:mob?'28px 24px':'52px',borderRadius:'24px',display:'grid',gridTemplateColumns:mob?'1fr':'300px 1fr',gap:mob?'24px':'52px',marginBottom:'14px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,width:'250px',height:'250px',background:'radial-gradient(circle at 10% 10%,rgba(var(--a-r),var(--a-g),var(--a-b),0.055),transparent 60%)',pointerEvents:'none'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <div className="text-label" style={{marginBottom:'16px'}}>+002 / Story</div>
            <h2 style={{fontSize:mob?'clamp(2rem,8vw,3rem)':'clamp(2rem,3.2vw,3.5rem)',fontWeight:900,lineHeight:0.93,letterSpacing:'-0.04em',color:'rgba(255,255,255,0.97)'}}>Creative<br/>Problem<br/>Solver.</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'18px',justifyContent:'center',position:'relative',zIndex:1}}>
            {['Final year CSE (AI) student at Mar Baselios College of Engineering and Technology, Trivandrum. I build full-stack AI platforms — from satellite imagery analysis to autonomous robotics.',
              'My work spans the full stack: React / Next.js frontends, FastAPI backends, PyTorch models trained on custom datasets, and end-to-end MLOps pipelines. I care about shipping things that actually work.',
              'Outside of code, I obsess over mechanical keyboards and design posters and album covers in Figma.']
              .map((p,i)=><p key={i} style={{fontSize:'13px',color:'rgba(255,255,255,0.48)',lineHeight:1.80,borderLeft:i===0?'2px solid rgba(var(--a-r),var(--a-g),var(--a-b),0.40)':'none',paddingLeft:i===0?'16px':'0'}}>{p}</p>)}
          </div>
        </div>

        {/* Skills — 3-col desktop, 1-col mobile */}
        <div style={{marginBottom:'14px'}}>
          <div className="text-label" style={{marginBottom:'14px',paddingLeft:'4px'}}>+003 / Capabilities</div>
          <div style={{display:'grid',gridTemplateColumns:mob?'1fr':'repeat(3,1fr)',gap:'12px'}}>
            {[{label:'Frontend & Web',items:skills.frontend},{label:'Backend & Infra',items:skills.backend},{label:'AI / ML',items:skills.ai}]
              .map((b,bi)=>(
                <div key={b.label} className="sk-block g1 g-shine g-hi" style={{padding:mob?'24px':'34px',borderRadius:'22px',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,right:0,width:'130px',height:'130px',background:`radial-gradient(circle at 80% 20%,${bi===0?'rgba(var(--a-r),var(--a-g),var(--a-b),0.06)':bi===1?'rgba(var(--b-r),var(--b-g),var(--b-b),0.06)':'rgba(255,180,40,0.05)'},transparent 65%)`,pointerEvents:'none'}}/>
                  <h3 className="text-label" style={{marginBottom:'20px',position:'relative',zIndex:1}}>{b.label}</h3>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'11px',position:'relative',zIndex:1}}>
                    {b.items.map(item=>(
                      <li key={item} style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <span style={{width:'4px',height:'4px',borderRadius:'50%',background:'var(--a1)',flexShrink:0,boxShadow:'0 0 6px var(--a1)'}}/>
                        <span style={{fontSize:'13px',fontWeight:500,color:'rgba(255,255,255,0.65)'}}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        {/* Socials */}
        <div className="g1 g-hi2" style={{padding:mob?'24px':'44px 52px',borderRadius:'24px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,right:0,width:'350px',height:'220px',background:'radial-gradient(ellipse at 80% 30%,rgba(var(--a-r),var(--a-g),var(--a-b),0.05),transparent 65%)',pointerEvents:'none'}}/>
          <div className="text-label" style={{marginBottom:'24px',position:'relative',zIndex:1}}>+004 / Find Me Online</div>
          {[{label:'GitHub',href:socials.github},{label:'LinkedIn',href:socials.linkedin},{label:'Email',href:`mailto:${socials.email}`}].map(({label,href},i,a)=>(
            <a key={label} href={href} target={label!=='Email'?'_blank':undefined} rel="noopener noreferrer"
              className="ab-soc"
              style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:mob?'18px 0':'22px 0',borderBottom:i<a.length-1?'1px solid rgba(255,255,255,0.05)':'none',fontSize:mob?'clamp(1.5rem,7vw,2.2rem)':'clamp(1.6rem,3.5vw,2.8rem)',fontWeight:900,lineHeight:1,letterSpacing:'-0.03em',color:'rgba(255,255,255,0.70)',textDecoration:'none',transition:'color 0.26s',position:'relative',zIndex:1}}
              onMouseEnter={e=>{e.currentTarget.style.color='var(--a1)'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.70)'}}
            >{label}<Arr s={mob?22:30}/></a>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}
