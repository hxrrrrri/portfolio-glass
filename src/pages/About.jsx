import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import { skills, socials } from '../data/projects'
const Arr=({s=26})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

export default function About() {
  const cardRef=useRef(null); const conRef=useRef(null)
  useEffect(()=>{
    const tl=gsap.timeline({delay:0.06})
    tl.fromTo('.ab-hero',{y:60,opacity:0,filter:'blur(4px)'},{y:0,opacity:1,filter:'blur(0px)',duration:1.0,ease:'power4.out'})
      .fromTo('.ab-story',{y:50,opacity:0},{y:0,opacity:1,duration:0.8,ease:'power3.out'},'<0.4')
      .fromTo('.sk-block',{y:44,opacity:0,scale:0.97},{y:0,opacity:1,scale:1,duration:0.65,stagger:0.12,ease:'power3.out'},'<0.2')
      .fromTo('.ab-soc',{x:-28,opacity:0},{x:0,opacity:1,duration:0.55,stagger:0.09,ease:'power3.out'},'<0.15')
    return()=>tl.kill()
  },[])
  const onMove=(e)=>{
    const c=cardRef.current,ct=conRef.current;if(!c||!ct)return
    const r=ct.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top
    c.style.transform=`rotateX(${(y-r.height/2)/14}deg) rotateY(${(r.width/2-x)/14}deg) scale(1.015)`
  }
  const onLeave=()=>{if(cardRef.current)cardRef.current.style.transform='rotateX(0) rotateY(0) scale(1)'}

  return (
    <div style={{minHeight:'calc(100vh - 62px)',position:'relative',overflow:'hidden'}}>
      <div className="page">
        {/* Hero */}
        <div className="ab-hero" style={{display:'grid',gridTemplateColumns:'1fr 1.85fr',gap:'18px',marginBottom:'18px'}}>
          <div className="g1 g-hi2 g-shine" style={{padding:'56px',borderRadius:'28px',display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:'340px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',bottom:0,left:0,width:'280px',height:'280px',background:'radial-gradient(circle at 20% 80%,rgba(255,77,45,0.06),transparent 65%)',pointerEvents:'none'}}/>
            <div>
              <div className="text-label" style={{marginBottom:'22px'}}>X / Labs</div>
              <h1 className="grad-text" style={{fontSize:'clamp(4rem,8vw,8rem)',fontWeight:900,lineHeight:0.85,letterSpacing:'-0.055em'}}>Lab<span style={{WebkitTextFillColor:'var(--accent)'}}>.</span></h1>
            </div>
            <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.20)'}}>Trivandrum, Kerala · 2025</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{padding:'22px 32px',borderRadius:'20px',background:'linear-gradient(135deg,rgba(255,77,45,0.68),rgba(255,88,38,0.48))',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',border:'1px solid rgba(255,110,55,0.48)',boxShadow:'inset 0 1.5px 0 rgba(255,255,255,0.22),0 8px 32px rgba(255,77,45,0.28)'}}>
              <span style={{fontSize:'10px',fontWeight:800,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,0.90)'}}>B.Tech CSE (AI) · MBCET · 2026</span>
            </div>
            <div ref={conRef} onMouseMove={onMove} onMouseLeave={onLeave} style={{flex:1,perspective:'1100px'}}>
              <div ref={cardRef} className="g2 g-hi2" style={{padding:'44px',borderRadius:'24px',height:'100%',transition:'transform 0.18s ease-out, box-shadow 0.3s',transformStyle:'preserve-3d',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,right:0,width:'200px',height:'200px',background:'radial-gradient(circle at 80% 20%,rgba(255,77,45,0.07),transparent 65%)',pointerEvents:'none'}}/>
                <div style={{position:'relative',zIndex:1}}>
                  <div className="text-label" style={{marginBottom:'14px'}}>Harisankar S.</div>
                  <h2 style={{fontSize:'22px',fontWeight:900,lineHeight:1.1,color:'#fff',marginBottom:'16px'}}>AI/ML Engineer &<br/>Full-Stack Developer</h2>
                  <p style={{fontSize:'13px',color:'rgba(255,255,255,0.50)',lineHeight:1.78,marginBottom:'24px'}}>Two-time Smart India Hackathon winner. Interned at ICT Academy of Kerala. Passionate about geospatial AI, computer vision, and deploying models that solve real-world problems.</p>
                  <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                    {["SIH '23","SIH '24"].map(t=><span key={t} className="g-pill" style={{padding:'5px 14px',fontSize:'9px',fontWeight:800,letterSpacing:'0.10em',textTransform:'uppercase',color:'rgba(255,255,255,0.50)'}}>{t}</span>)}
                    <span style={{padding:'5px 14px',borderRadius:'999px',fontSize:'9px',fontWeight:800,letterSpacing:'0.10em',textTransform:'uppercase',background:'rgba(255,77,45,0.16)',border:'1px solid rgba(255,77,45,0.34)',color:'var(--accent)'}}>Open to Work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="ab-story g1 g-hi2" style={{padding:'56px',borderRadius:'28px',display:'grid',gridTemplateColumns:'340px 1fr',gap:'60px',marginBottom:'18px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,width:'300px',height:'300px',background:'radial-gradient(circle at 10% 10%,rgba(255,77,45,0.055),transparent 60%)',pointerEvents:'none'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <div className="text-label" style={{marginBottom:'20px'}}>+002 / Story</div>
            <h2 className="grad-text" style={{fontSize:'clamp(2.2rem,3.5vw,3.8rem)',fontWeight:900,lineHeight:0.93,letterSpacing:'-0.045em'}}>Creative<br/>Problem<br/>Solver.</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'20px',justifyContent:'center',position:'relative',zIndex:1}}>
            {['Final year CSE (AI) student at Mar Baselios College of Engineering and Technology, Trivandrum. I build full-stack AI platforms — from satellite imagery analysis to autonomous robotics.',
              'My work spans the full stack: React / Next.js frontends, FastAPI backends, PyTorch models trained on custom datasets, and end-to-end MLOps pipelines. I care about shipping things that actually work.',
              'Outside of code, I obsess over mechanical keyboards — currently rocking an R75 wireless board with a custom VIA config — and design posters and album covers in Figma.']
              .map((p,i)=><p key={i} style={{fontSize:'14px',color:'rgba(255,255,255,0.48)',lineHeight:1.82,borderLeft:i===0?'2px solid rgba(255,77,45,0.40)':'none',paddingLeft:i===0?'18px':'0'}}>{p}</p>)}
          </div>
        </div>

        {/* Skills */}
        <div style={{marginBottom:'18px'}}>
          <div className="text-label" style={{marginBottom:'16px',paddingLeft:'4px'}}>+003 / Capabilities</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}}>
            {[{label:'Frontend & Web',items:skills.frontend},{label:'Backend & Infra',items:skills.backend},{label:'AI / ML',items:skills.ai}]
              .map((b,bi)=>(
                <div key={b.label} className="sk-block g1 g-shine g-hi card-lift" style={{padding:'38px',borderRadius:'24px',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,right:0,width:'150px',height:'150px',background:`radial-gradient(circle at 80% 20%, ${bi===0?'rgba(255,77,45,0.06)':bi===1?'rgba(80,40,255,0.06)':'rgba(255,180,40,0.05)'}, transparent 65%)`,pointerEvents:'none'}}/>
                  <h3 className="text-label" style={{marginBottom:'24px',position:'relative',zIndex:1}}>{b.label}</h3>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'13px',position:'relative',zIndex:1}}>
                    {b.items.map(item=>(
                      <li key={item} style={{display:'flex',alignItems:'center',gap:'12px'}}>
                        <span style={{width:'4px',height:'4px',borderRadius:'50%',background:'var(--accent)',flexShrink:0,boxShadow:'0 0 6px var(--accent)'}}/>
                        <span style={{fontSize:'13px',fontWeight:500,color:'rgba(255,255,255,0.65)',letterSpacing:'0.01em'}}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        {/* Socials */}
        <div className="g1 g-hi2" style={{padding:'48px 56px',borderRadius:'28px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,right:0,width:'400px',height:'250px',background:'radial-gradient(ellipse at 80% 30%,rgba(255,77,45,0.05),transparent 65%)',pointerEvents:'none'}}/>
          <div className="text-label" style={{marginBottom:'28px',position:'relative',zIndex:1}}>+004 / Find Me Online</div>
          {[{label:'GitHub',href:socials.github},{label:'LinkedIn',href:socials.linkedin},{label:'Email',href:`mailto:${socials.email}`}].map(({label,href},i,a)=>(
            <a key={label} href={href} target={label!=='Email'?'_blank':undefined} rel="noopener noreferrer"
              className="ab-soc"
              style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'24px 0',borderBottom:i<a.length-1?'1px solid rgba(255,255,255,0.05)':'none',fontSize:'clamp(1.8rem,4vw,3.2rem)',fontWeight:900,lineHeight:1,letterSpacing:'-0.03em',color:'rgba(255,255,255,0.70)',textDecoration:'none',transition:'color 0.26s, letter-spacing 0.26s',position:'relative',zIndex:1}}
              onMouseEnter={e=>{e.currentTarget.style.color='var(--accent)';e.currentTarget.style.letterSpacing='-0.01em'}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.70)';e.currentTarget.style.letterSpacing='-0.03em'}}
            >{label}<Arr s={34}/></a>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}
