import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

const Arr=({size=16})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const Chev=({dir='right',size=16})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{dir==='right'?<polyline points="9 18 15 12 9 6"/>:<polyline points="15 18 9 12 15 6"/>}</svg>

function Card3D({project,isActive,onActivate,fi}) {
  const wRef=useRef(null),cRef=useRef(null),gRef=useRef(null)
  useEffect(()=>{
    if(!wRef.current)return
    const t=gsap.to(wRef.current,{y:`${(fi%2===0?-1:1)*(6+(fi%3)*2)}px`,duration:2.8+fi*0.37,ease:'sine.inOut',yoyo:true,repeat:-1,delay:fi*0.22})
    return()=>t.kill()
  },[fi])
  const onMove=(e)=>{
    if(!cRef.current)return
    const r=cRef.current.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top
    cRef.current.style.transform=`rotateX(${(y/r.height-0.5)*12}deg) rotateY(${(0.5-x/r.width)*12}deg) translateZ(14px)`
    if(gRef.current){gRef.current.style.background=`radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(255,77,45,0.18) 0%, transparent 58%)`;gRef.current.style.opacity='1'}
  }
  const onLeave=()=>{
    if(cRef.current)cRef.current.style.transform='rotateX(0) rotateY(0) translateZ(0)'
    if(gRef.current)gRef.current.style.opacity='0'
  }
  return (
    <div ref={wRef} style={{willChange:'transform'}}>
      <div style={{perspective:'1100px'}} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onActivate}>
        <div ref={cRef} className="g1 g-shine" style={{padding:'26px',borderRadius:'22px',cursor:'pointer',transformStyle:'preserve-3d',transition:'transform 0.15s ease-out, box-shadow 0.3s',position:'relative',overflow:'hidden',
          border:isActive?'1px solid rgba(255,77,45,0.45)':'1px solid rgba(255,255,255,0.07)',
          boxShadow:isActive?'0 0 50px rgba(255,77,45,0.18), inset 0 1.5px 0 rgba(255,255,255,0.14)':'inset 0 1px 0 rgba(255,255,255,0.07)'}}>
          <div ref={gRef} style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:1,opacity:0,transition:'opacity 0.1s',borderRadius:'22px'}}/>
          {isActive&&<div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:'linear-gradient(90deg, transparent, var(--accent), transparent)',zIndex:2}}/>}
          <div style={{position:'relative',zIndex:3}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'14px'}}>
              <span style={{padding:'3px 10px',borderRadius:'7px',fontSize:'8px',fontWeight:900,letterSpacing:'0.13em',textTransform:'uppercase',background:'rgba(255,77,45,0.13)',border:'1px solid rgba(255,77,45,0.28)',color:'var(--accent)'}}>{project.category}</span>
              <span style={{fontSize:'10px',fontWeight:700,color:'var(--t-dim)'}}>{project.number}</span>
            </div>
            <div style={{fontSize:'58px',fontWeight:900,lineHeight:0.85,color:'rgba(255,255,255,0.035)',marginBottom:'5px',userSelect:'none'}}>{project.number}</div>
            <h3 style={{fontSize:'17px',fontWeight:900,lineHeight:1.1,color:'#fff',marginBottom:'8px'}}>{project.title}</h3>
            <p className="line-clamp-3" style={{fontSize:'11px',color:'var(--t-mid)',lineHeight:1.68}}>{project.description}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'4px',marginTop:'12px'}}>
              {project.tech.slice(0,3).map(t=><span key={t} className="g-pill" style={{padding:'2px 8px',fontSize:'7px',fontWeight:800,letterSpacing:'0.09em',textTransform:'uppercase',color:'rgba(255,255,255,0.38)'}}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const highlights={
  1:['Multi-tile satellite boundary detection via YOLOv8','7 live environmental data APIs integrated','Interactive 3D floor plan viewer via React Three Fiber','Deployed: Next.js on Vercel + FastAPI on Railway'],
  2:['Semantic search across multiple languages','Vector embeddings with FAISS indexing','Context-aware document Q&A with LangChain','FastAPI backend with streaming responses'],
  3:['XGBoost pipeline on physiological sensor data','SHAP explainability for model interpretability','Streamlit dashboard for real-time inference','Trained on Kaggle wearable stress dataset'],
  4:['Custom-trained YOLOv8 wildlife detection model','Real-time object tracking at 30+ FPS','Autonomous navigation with obstacle avoidance','Alert system for ranger notifications'],
  5:['Full MERN stack with JWT authentication','Role-based access control (admin / attendee)','Real-time event updates via WebSockets','Built during ICT Academy internship'],
  6:['Category-wise KTU activity point calculation','PDF export with jsPDF','Responsive form UI with live score tracking','Used by 100+ students at MBCET'],
}

export default function Showcase() {
  const [activeId,setActiveId]=useState(1)
  const ap=projects.find(p=>p.id===activeId)
  const panRef=useRef(null)

  useEffect(()=>{
    const tl=gsap.timeline({delay:0.05})
    tl.fromTo('.showcase-hero',{y:60,opacity:0},{y:0,opacity:1,duration:0.95,ease:'power4.out'})
      .fromTo('.proj-card',{y:44,opacity:0},{y:0,opacity:1,duration:0.65,stagger:0.1,ease:'power3.out'},'<0.2')
    return()=>tl.kill()
  },[])
  useEffect(()=>{
    if(panRef.current)gsap.fromTo(panRef.current,{opacity:0,x:28},{opacity:1,x:0,duration:0.5,ease:'power3.out'})
  },[activeId])

  return (
    <div style={{minHeight:'calc(100vh - 62px)',position:'relative',overflow:'hidden'}}>
      <div className="page section">

        {/* Hero */}
        <div className="showcase-hero" style={{marginBottom:'48px'}}>
          <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'18px'}}>+001 / 3D Showcase</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
            <h1 className="grad-text" style={{fontSize:'clamp(3rem,8vw,7rem)',fontWeight:900,lineHeight:0.88,letterSpacing:'-0.045em'}}>Interactive<br/>Project Lab.</h1>
            <p style={{fontSize:'13px',color:'var(--t-mid)',maxWidth:'280px',lineHeight:1.75}}>Click a card to explore in detail. Hover for 3D perspective.</p>
          </div>
        </div>

        {/* Layout */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 420px',gap:'20px',alignItems:'start'}}>

          {/* Cards */}
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'18px'}}>
              <span style={{fontSize:'10px',fontWeight:800,letterSpacing:'0.16em',color:'var(--t-dim)'}}>{String(activeId).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span>
              <div style={{display:'flex',gap:'6px'}}>
                {[['left',()=>setActiveId(id=>id===1?projects.length:id-1)],['right',()=>setActiveId(id=>id===projects.length?1:id+1)]].map(([d,fn])=>(
                  <button key={d} onClick={fn} className="btn btn-secondary" style={{width:'36px',height:'36px',padding:0,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'10px',flexShrink:0}}>
                    <Chev dir={d} size={15}/>
                  </button>
                ))}
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px'}}>
              {projects.map((p,i)=><div key={p.id} className="proj-card"><Card3D project={p} isActive={activeId===p.id} onActivate={()=>setActiveId(p.id)} fi={i}/></div>)}
            </div>
          </div>

          {/* Detail panel */}
          {ap&&(
            <div ref={panRef} className="g2 g-hi" style={{borderRadius:'28px',overflow:'hidden',position:'sticky',top:'80px'}}>
              <div style={{padding:'32px',background:'linear-gradient(135deg,rgba(255,77,45,0.11),rgba(255,255,255,0.025))',borderBottom:'1px solid rgba(255,255,255,0.055)'}}>
                <div style={{fontSize:'8px',fontWeight:900,letterSpacing:'0.24em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'12px'}}>{ap.category}</div>
                <h2 style={{fontSize:'24px',fontWeight:900,lineHeight:1.1,color:'#fff',marginBottom:'14px'}}>{ap.title}</h2>
                <p style={{fontSize:'12px',color:'var(--t-mid)',lineHeight:1.72}}>{ap.description}</p>
              </div>
              <div style={{padding:'28px'}}>
                <div style={{marginBottom:'24px'}}>
                  <div style={{fontSize:'8px',fontWeight:900,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'12px'}}>Stack</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
                    {ap.tech.map(t=><span key={t} className="g-pill" style={{padding:'5px 12px',fontSize:'9px',fontWeight:800,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.55)'}}>{t}</span>)}
                  </div>
                </div>
                <div style={{marginBottom:'28px'}}>
                  <div style={{fontSize:'8px',fontWeight:900,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'12px'}}>Highlights</div>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'9px'}}>
                    {(highlights[ap.id]||[]).map((h,i)=>(
                      <li key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                        <span style={{width:'4px',height:'4px',borderRadius:'50%',background:'var(--accent)',flexShrink:0,marginTop:'7px',boxShadow:'0 0 5px var(--accent)'}}/>
                        <span style={{fontSize:'12px',color:'var(--t-mid)',lineHeight:1.65}}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{display:'flex',gap:'8px'}}>
                  <a href={ap.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{flex:1,justifyContent:'center',padding:'11px 16px',borderRadius:'11px',fontSize:'10px'}}>
                    GitHub <Arr size={13}/>
                  </a>
                  {ap.vercelLink&&(
                    <a href={ap.vercelLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{flex:1,justifyContent:'center',padding:'11px 16px',borderRadius:'11px',fontSize:'10px'}}>
                      Live Demo <Arr size={13}/>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="divider"/>

        <div className="g1 g-hi g-shine" style={{padding:'52px',borderRadius:'28px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'32px'}}>
          <div>
            <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'14px'}}>+002 / GitHub</div>
            <h2 className="grad-text" style={{fontSize:'clamp(2rem,4vw,3rem)',fontWeight:900,lineHeight:0.95,letterSpacing:'-0.04em',marginBottom:'10px'}}>Explore more<br/>on GitHub.</h2>
            <p style={{fontSize:'13px',color:'var(--t-lo)'}}>All repos at github.com/hxrrrrri</p>
          </div>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{flexShrink:0,fontSize:'12px',padding:'15px 28px',borderRadius:'14px'}}>
            hxrrrrri <Arr/>
          </a>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
