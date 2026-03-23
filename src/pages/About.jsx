import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import { skills, socials } from '../data/projects'

const Arr = ({size=22})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

export default function About() {
  const cardRef = useRef(null); const conRef = useRef(null)

  useEffect(()=>{
    const tl = gsap.timeline({delay:0.05})
    tl.fromTo('.ab-l',{x:-60,opacity:0},{x:0,opacity:1,duration:0.9,ease:'power4.out'})
      .fromTo('.ab-r',{x:60,opacity:0},{x:0,opacity:1,duration:0.9,ease:'power4.out'},'<0.08')
      .fromTo('.ab-story',{y:50,opacity:0},{y:0,opacity:1,duration:0.75,ease:'power3.out'},'<0.2')
      .fromTo('.sk-block',{y:40,opacity:0},{y:0,opacity:1,duration:0.6,stagger:0.1,ease:'power3.out'},'<0.15')
      .fromTo('.ab-soc',{x:-24,opacity:0},{x:0,opacity:1,duration:0.5,stagger:0.08,ease:'power2.out'},'<0.1')
    return ()=>tl.kill()
  },[])

  const onMove=(e)=>{
    const c=cardRef.current,ct=conRef.current; if(!c||!ct)return
    const r=ct.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top
    c.style.transform=`rotateX(${(y-r.height/2)/14}deg) rotateY(${(r.width/2-x)/14}deg) scale(1.02)`
  }
  const onLeave=()=>{ if(cardRef.current)cardRef.current.style.transform='rotateX(0) rotateY(0) scale(1)' }

  return (
    <div style={{minHeight:'calc(100vh - 62px)',position:'relative',overflow:'hidden'}}>
      <div className="page section">

        {/* ── Hero ── */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.8fr',gap:'20px',marginBottom:'20px'}}>
          <div className="ab-l g1 g-hi g-shine" style={{padding:'52px',borderRadius:'28px',display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:'320px'}}>
            <div>
              <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'22px'}}>X / Labs</div>
              <h1 className="grad-text" style={{fontSize:'clamp(4.5rem,9vw,8rem)',fontWeight:900,lineHeight:0.85,letterSpacing:'-0.05em'}}>Lab<span style={{WebkitTextFillColor:'var(--accent)'}}>.</span></h1>
            </div>
            <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--t-dim)'}}>Trivandrum, Kerala · 2025</div>
          </div>

          <div className="ab-r" style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{padding:'22px 32px',borderRadius:'20px',background:'linear-gradient(135deg,rgba(255,77,45,0.65),rgba(255,90,40,0.45))',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',border:'1px solid rgba(255,110,55,0.45)',boxShadow:'inset 0 1px 0 rgba(255,255,255,0.18)'}}>
              <span style={{fontSize:'10px',fontWeight:800,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,0.88)'}}>B.Tech CSE (AI) · MBCET · 2026</span>
            </div>
            <div ref={conRef} onMouseMove={onMove} onMouseLeave={onLeave} style={{flex:1,perspective:'1000px'}}>
              <div ref={cardRef} className="g2 g-hi" style={{padding:'40px',borderRadius:'24px',height:'100%',transition:'transform 0.15s ease-out',transformStyle:'preserve-3d'}}>
                <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'14px'}}>Harisankar S.</div>
                <h2 style={{fontSize:'24px',fontWeight:900,lineHeight:1.1,color:'#fff',marginBottom:'16px'}}>AI/ML Engineer &<br/>Full-Stack Developer</h2>
                <p style={{fontSize:'13px',color:'var(--t-mid)',lineHeight:1.75,marginBottom:'22px'}}>Two-time Smart India Hackathon winner. Interned at ICT Academy of Kerala building MERN applications. Passionate about geospatial AI, computer vision, and deploying models that solve real-world problems.</p>
                <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                  {["SIH '23","SIH '24"].map(t=><span key={t} className="g-pill" style={{padding:'5px 14px',fontSize:'10px',fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--t-mid)'}}>{t}</span>)}
                  <span style={{padding:'5px 14px',borderRadius:'999px',fontSize:'10px',fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase',background:'rgba(255,77,45,0.18)',border:'1px solid rgba(255,77,45,0.38)',color:'var(--accent)'}}>Open to Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Story ── */}
        <div className="ab-story g1 g-hi" style={{padding:'52px',borderRadius:'28px',display:'grid',gridTemplateColumns:'1fr 2fr',gap:'56px',marginBottom:'20px'}}>
          <div>
            <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'18px'}}>+002 / Story</div>
            <h2 className="grad-text" style={{fontSize:'clamp(2.2rem,4vw,3.5rem)',fontWeight:900,lineHeight:0.95,letterSpacing:'-0.04em'}}>Creative<br/>Problem<br/>Solver.</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'18px',justifyContent:'center'}}>
            {['Final year CSE (AI) student at Mar Baselios College of Engineering and Technology, Trivandrum. I build full-stack AI platforms — from satellite imagery analysis to autonomous robotics.',
              'My work spans the full stack: React / Next.js frontends, FastAPI backends, PyTorch models trained on custom datasets, and end-to-end MLOps pipelines. I care about shipping things that actually work.',
              'Outside of code, I obsess over mechanical keyboards — currently rocking an R75 wireless board with a custom VIA config — and design posters and album covers in Figma.']
              .map((p,i)=><p key={i} style={{fontSize:'14px',color:'var(--t-mid)',lineHeight:1.8}}>{p}</p>)}
          </div>
        </div>

        {/* ── Skills ── */}
        <div style={{marginBottom:'20px'}}>
          <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'16px',paddingLeft:'4px'}}>+003 / Capabilities</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
            {[{label:'Frontend & Web',items:skills.frontend},{label:'Backend & Infra',items:skills.backend},{label:'AI / ML',items:skills.ai}]
              .map(b=>(
                <div key={b.label} className="sk-block g2 g-shine g-hi card-hover" style={{padding:'36px',borderRadius:'24px'}}>
                  <h3 style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'22px'}}>{b.label}</h3>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'13px'}}>
                    {b.items.map(item=>(
                      <li key={item} style={{display:'flex',alignItems:'center',gap:'12px'}}>
                        <span style={{width:'4px',height:'4px',borderRadius:'50%',background:'var(--accent)',flexShrink:0,boxShadow:'0 0 5px var(--accent)'}}/>
                        <span style={{fontSize:'13px',fontWeight:500,color:'rgba(255,255,255,0.68)'}}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>

        {/* ── Socials ── */}
        <div className="g1 g-hi" style={{padding:'44px 52px',borderRadius:'28px'}}>
          <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'28px'}}>+004 / Find Me Online</div>
          {[{label:'GitHub',href:socials.github},{label:'LinkedIn',href:socials.linkedin},{label:'Email',href:`mailto:${socials.email}`}].map(({label,href})=>(
            <a key={label} href={href} target={label!=='Email'?'_blank':undefined} rel="noopener noreferrer"
              className="ab-soc"
              style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'22px 0',borderBottom:'1px solid rgba(255,255,255,0.055)',fontSize:'clamp(1.6rem,4vw,3rem)',fontWeight:900,letterSpacing:'-0.02em',color:'rgba(255,255,255,0.75)',textDecoration:'none',transition:'color 0.22s'}}
              onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.75)'}
            >{label}<Arr size={32}/></a>
          ))}
        </div>

      </div>
      <Footer/>
    </div>
  )
}
