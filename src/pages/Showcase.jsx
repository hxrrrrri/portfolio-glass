import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

const Arr=({s=15})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const Chev=({dir='r',s=15})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{dir==='r'?<polyline points="9 18 15 12 9 6"/>:<polyline points="15 18 9 12 15 6"/>}</svg>
function useIsMobile(bp=768){const[m,setM]=useState(()=>typeof window!=='undefined'&&window.innerWidth<bp);useEffect(()=>{const c=()=>setM(window.innerWidth<bp);window.addEventListener('resize',c);return()=>window.removeEventListener('resize',c)},[bp]);return m}

function Card3D({project,isActive,onActivate,fi,mob}){
  const wRef=useRef(null),cRef=useRef(null),gRef=useRef(null),nRef=useRef(null)
  const rafRef=useRef(null),activeRef=useRef(false),mouseRef=useRef({x:-9999,y:-9999})

  useEffect(()=>{
    if(!wRef.current||mob)return
    const amp=5+(fi%3)*2.5,dir=fi%2===0?-1:1
    const t=gsap.to(wRef.current,{y:`${dir*amp}px`,duration:2.6+fi*0.4,ease:'sine.inOut',yoyo:true,repeat:-1,delay:fi*0.25})
    return()=>t.kill()
  },[fi,mob])

  useEffect(()=>{
    const card=cRef.current,num=nRef.current
    if(!card||!num)return
    const tick=()=>{
      if(!activeRef.current)return
      const r=num.getBoundingClientRect()
      const cx=r.left+r.width/2,cy=r.top+r.height/2
      const dist=Math.sqrt((mouseRef.current.x-cx)**2+(mouseRef.current.y-cy)**2)
      const t=Math.max(0,1-dist/280)
      num.style.color=`rgba(255,255,255,${(Math.pow(t,1.5)*0.18).toFixed(4)})`
      rafRef.current=requestAnimationFrame(tick)
    }
    const onEnter=()=>{activeRef.current=true;if(!mob)gsap.to(card,{scale:1.025,duration:0.3,ease:'power2.out'});rafRef.current=requestAnimationFrame(tick)}
    const onLeave=()=>{activeRef.current=false;cancelAnimationFrame(rafRef.current);num.style.color='rgba(255,255,255,0)';gsap.to(card,{rotateX:0,rotateY:0,scale:1,duration:0.5,ease:'power2.out'});if(gRef.current)gRef.current.style.opacity='0'}
    const onMove=(e)=>{
      mouseRef.current={x:e.clientX,y:e.clientY}
      if(!mob){const r=card.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;gsap.to(card,{rotateX:(y/r.height-0.5)*10,rotateY:(0.5-x/r.width)*10,duration:0.18,ease:'power1.out'});if(gRef.current){gRef.current.style.background=`radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%,rgba(var(--a-r),var(--a-g),var(--a-b),0.16) 0%,transparent 60%)`;gRef.current.style.opacity='1'}}
    }
    card.addEventListener('mouseenter',onEnter);card.addEventListener('mouseleave',onLeave);card.addEventListener('mousemove',onMove)
    return()=>{card.removeEventListener('mouseenter',onEnter);card.removeEventListener('mouseleave',onLeave);card.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafRef.current)}
  },[mob])

  return (
    <div ref={wRef} style={{willChange:'transform'}} onClick={onActivate}>
      <div style={{perspective:mob?'none':'1100px'}}>
        <div ref={cRef} className="g1 g-shine" style={{padding:mob?'20px':'26px',borderRadius:'20px',cursor:'pointer',transformStyle:'preserve-3d',transition:'box-shadow 0.3s,border-color 0.3s',position:'relative',overflow:'hidden',border:isActive?'1px solid rgba(var(--a-r),var(--a-g),var(--a-b),0.42)':'1px solid rgba(255,255,255,0.065)',boxShadow:isActive?'0 0 40px rgba(var(--a-r),var(--a-g),var(--a-b),0.14),inset 0 1.5px 0 rgba(255,255,255,0.14)':'inset 0 1px 0 rgba(255,255,255,0.065)'}}>
          {isActive&&<div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:'linear-gradient(90deg,transparent,var(--a1) 30%,var(--a2) 70%,transparent)',zIndex:2}}/>}
          <div ref={gRef} style={{position:'absolute',inset:0,borderRadius:'20px',pointerEvents:'none',zIndex:1,opacity:0,transition:'opacity 0.12s'}}/>
          <div style={{position:'relative',zIndex:3}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
              <span style={{padding:'3px 10px',borderRadius:'7px',fontSize:'7px',fontWeight:900,letterSpacing:'0.14em',textTransform:'uppercase',background:'rgba(var(--a-r),var(--a-g),var(--a-b),0.12)',border:'1px solid rgba(var(--a-r),var(--a-g),var(--a-b),0.26)',color:'var(--a1)'}}>{project.category}</span>
              <span style={{fontSize:'9px',fontWeight:700,color:'rgba(255,255,255,0.16)'}}>{project.number}</span>
            </div>
            <div ref={nRef} style={{fontSize:mob?'42px':'56px',fontWeight:900,lineHeight:0.82,letterSpacing:'-0.05em',color:'rgba(255,255,255,0)',marginBottom:'8px',userSelect:'none',pointerEvents:'none',transition:'none'}}>{project.number}</div>
            <h3 style={{fontSize:mob?'14px':'17px',fontWeight:900,lineHeight:1.1,color:'#fff',marginBottom:'6px',letterSpacing:'-0.02em'}}>{project.title}</h3>
            <p className="line-clamp-2" style={{fontSize:'11px',color:'rgba(255,255,255,0.40)',lineHeight:1.65}}>{project.description}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'4px',marginTop:'10px'}}>
              {project.tech.slice(0,mob?2:3).map(t=><span key={t} className="g-pill" style={{padding:'2px 8px',fontSize:'7px',fontWeight:800,letterSpacing:'0.09em',textTransform:'uppercase',color:'rgba(255,255,255,0.36)'}}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HL={
  1:['Multi-tile satellite boundary detection via YOLOv8','7 live environmental APIs integrated','Interactive 3D floor plan viewer via React Three Fiber','Deployed: Next.js on Vercel + FastAPI on Railway'],
  2:['Semantic search across multiple languages','Vector embeddings with FAISS indexing','Context-aware document Q&A with LangChain','FastAPI backend with streaming responses'],
  3:['XGBoost pipeline on physiological sensor data','SHAP explainability for model interpretability','Streamlit dashboard for real-time inference','Trained on Kaggle wearable stress dataset'],
  4:['Custom-trained YOLOv8 wildlife detection model','Real-time object tracking at 30+ FPS','Autonomous navigation with obstacle avoidance','Alert system for ranger notifications'],
  5:['Full MERN stack with JWT authentication','Role-based access control (admin / attendee)','Real-time event updates via WebSockets','Built during ICT Academy internship'],
  6:['Category-wise KTU activity point calculation','PDF export with jsPDF','Live score tracking UI','Used by 100+ students at MBCET'],
}

export default function Showcase(){
  const mob=useIsMobile()
  const [aId,setAId]=useState(1)
  const ap=projects.find(p=>p.id===aId)
  const panRef=useRef(null)

  useEffect(()=>{
    const tl=gsap.timeline({delay:0.06})
    tl.fromTo('.showcase-hero',{y:50,opacity:0,filter:'blur(4px)'},{y:0,opacity:1,filter:'blur(0px)',duration:0.9,ease:'power4.out'})
      .fromTo('.proj-card',{y:40,scale:0.95,filter:'blur(5px)'},{y:0,scale:1,filter:'blur(0px)',duration:0.65,stagger:0.08,ease:'power3.out'},'<0.2')
    return()=>tl.kill()
  },[])

  useEffect(()=>{
    if(panRef.current) gsap.fromTo(panRef.current,{opacity:0,y:mob?20:0,x:mob?0:24,scale:0.98},{opacity:1,y:0,x:0,scale:1,duration:0.5,ease:'power3.out'})
  },[aId,mob])

  return (
    <div style={{minHeight:'calc(100vh - 62px)',position:'relative',overflow:'hidden'}}>
      <div className="page">
        {/* Hero */}
        <div className="showcase-hero" style={{marginBottom:mob?'24px':'40px'}}>
          <div className="text-label" style={{marginBottom:'14px'}}>+001 / 3D Showcase</div>
          <div style={{display:'flex',flexDirection:mob?'column':'row',justifyContent:'space-between',alignItems:mob?'flex-start':'flex-end',gap:'12px'}}>
            <h1 style={{fontSize:mob?'clamp(2.4rem,10vw,3.8rem)':'clamp(2.8rem,7vw,7rem)',fontWeight:900,lineHeight:1,letterSpacing:'-0.035em',paddingBottom:'0.06em',display:'inline-block',color:'rgba(255,255,255,0.97)'}}>Interactive<br/>Project Lab.</h1>
            {!mob&&<p style={{fontSize:'13px',color:'rgba(255,255,255,0.36)',maxWidth:'260px',lineHeight:1.76,paddingBottom:'12px'}}>Move cursor near the project number to reveal it. Click to explore.</p>}
          </div>
        </div>

        {/* Layout — side-by-side desktop, stacked mobile */}
        <div style={{display:'grid',gridTemplateColumns:mob?'1fr':'1fr 380px',gap:'16px',alignItems:'start'}}>
          {/* Cards */}
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
              <span style={{fontSize:'10px',fontWeight:800,letterSpacing:'0.18em',color:'rgba(255,255,255,0.20)'}}>{String(aId).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span>
              <div style={{display:'flex',gap:'6px'}}>
                {[['l',()=>setAId(id=>id===1?projects.length:id-1)],['r',()=>setAId(id=>id===projects.length?1:id+1)]].map(([d,fn])=>(
                  <button key={d} onClick={fn} className="btn btn-ghost btn-icon" style={{width:'34px',height:'34px',padding:0,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'10px',fontFamily:'inherit'}}>
                    <Chev dir={d} s={13}/>
                  </button>
                ))}
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'10px'}}>
              {projects.map((p,i)=>(
                <div key={p.id} className="proj-card">
                  <Card3D project={p} isActive={aId===p.id} onActivate={()=>setAId(p.id)} fi={i} mob={mob}/>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          {ap&&(
            <div ref={panRef} className="g2 g-hi2" style={{borderRadius:'24px',overflow:'hidden',position:mob?'static':'sticky',top:'80px',marginTop:mob?'16px':'0'}}>
              <div style={{padding:mob?'24px':'32px',background:'linear-gradient(140deg,rgba(var(--a-r),var(--a-g),var(--a-b),0.10),rgba(255,255,255,0.025))',borderBottom:'1px solid rgba(255,255,255,0.055)',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:0,right:0,width:'160px',height:'160px',background:'radial-gradient(circle at 80% 20%,rgba(var(--a-r),var(--a-g),var(--a-b),0.08),transparent 60%)',pointerEvents:'none'}}/>
                <div className="text-label" style={{marginBottom:'10px',position:'relative',zIndex:1}}>{ap.category}</div>
                <h2 style={{fontSize:mob?'20px':'24px',fontWeight:900,lineHeight:1.08,color:'#fff',marginBottom:'10px',letterSpacing:'-0.025em',position:'relative',zIndex:1}}>{ap.title}</h2>
                <p style={{fontSize:'12px',color:'rgba(255,255,255,0.44)',lineHeight:1.72,position:'relative',zIndex:1}}>{ap.description}</p>
              </div>
              <div style={{padding:mob?'20px':'24px'}}>
                <div style={{marginBottom:'20px'}}>
                  <div className="text-label" style={{marginBottom:'10px',fontSize:'7px'}}>Stack</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'5px'}}>
                    {ap.tech.map(t=><span key={t} className="g-pill" style={{padding:'4px 10px',fontSize:'8px',fontWeight:800,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.55)'}}>{t}</span>)}
                  </div>
                </div>
                <div style={{marginBottom:'22px'}}>
                  <div className="text-label" style={{marginBottom:'10px',fontSize:'7px'}}>Highlights</div>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'8px'}}>
                    {(HL[ap.id]||[]).map((h,i)=>(
                      <li key={i} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                        <span style={{width:'4px',height:'4px',borderRadius:'50%',background:'var(--a1)',flexShrink:0,marginTop:'6px',boxShadow:'0 0 6px var(--a1)'}}/>
                        <span style={{fontSize:'12px',color:'rgba(255,255,255,0.50)',lineHeight:1.65}}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{display:'flex',gap:'8px'}}>
                  <a href={ap.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{flex:1,justifyContent:'center',padding:'10px 14px',borderRadius:'11px',fontSize:'10px'}}>GitHub <Arr/></a>
                  {ap.vercelLink&&<a href={ap.vercelLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{flex:1,justifyContent:'center',padding:'10px 14px',borderRadius:'11px',fontSize:'10px'}}>Live <Arr/></a>}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="divider"/>

        <div className="g1 g-hi2 g-shine" style={{padding:mob?'28px 24px':'48px',borderRadius:'24px',display:'flex',flexDirection:mob?'column':'row',justifyContent:'space-between',alignItems:mob?'flex-start':'center',gap:'20px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',right:0,top:0,width:'240px',height:'240px',background:'radial-gradient(circle at 80% 30%,rgba(var(--a-r),var(--a-g),var(--a-b),0.06),transparent 62%)',pointerEvents:'none'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <div className="text-label" style={{marginBottom:'12px'}}>+002 / GitHub</div>
            <h2 style={{fontSize:mob?'clamp(1.8rem,7vw,2.5rem)':'clamp(1.8rem,3.5vw,3rem)',fontWeight:900,lineHeight:0.92,letterSpacing:'-0.04em',marginBottom:'10px',color:'rgba(255,255,255,0.97)'}}>Explore more<br/>on GitHub.</h2>
            <p style={{fontSize:'13px',color:'rgba(255,255,255,0.30)'}}>All repositories at github.com/hxrrrrri</p>
          </div>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{flexShrink:0,position:'relative',zIndex:1,alignSelf:mob?'flex-start':'auto'}}>hxrrrrri <Arr/></a>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
