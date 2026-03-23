import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import ProjectCard from '../components/ProjectCard.jsx'
import Footer from '../components/Footer'
import { projects } from '../data/projects'
const FILTERS=['All','AI / Full-Stack','AI / NLP','Machine Learning','Robotics / CV','Full-Stack','Web App']
const Arr=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

export default function Projects() {
  const [active,setActive]=useState('All')
  const gridRef=useRef(null)
  const filtered=active==='All'?projects:projects.filter(p=>p.category===active)
  useEffect(()=>{
    if(gridRef.current?.children) gsap.fromTo(gridRef.current.children,{y:48,opacity:0,scale:0.96},{y:0,opacity:1,scale:1,duration:0.65,stagger:0.08,ease:'power3.out'})
  },[active])
  useEffect(()=>{
    gsap.fromTo('.projects-hero',{y:64,opacity:0,filter:'blur(4px)'},{y:0,opacity:1,filter:'blur(0px)',duration:1.0,ease:'power4.out',delay:0.06})
  },[])
  return (
    <div style={{minHeight:'calc(100vh - 62px)',position:'relative',overflow:'hidden'}}>
      <div className="page">
        <div className="projects-hero" style={{marginBottom:'56px'}}>
          <div className="text-label" style={{marginBottom:'18px'}}>+001 / Projects</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:'32px'}}>
            <h1 className="grad-text" style={{fontSize:'clamp(3.5rem,9vw,8.5rem)',fontWeight:900,lineHeight:0.87,letterSpacing:'-0.046em'}}>Selected<br/>Works.</h1>
            <p style={{fontSize:'14px',color:'rgba(255,255,255,0.36)',lineHeight:1.78,maxWidth:'320px',flexShrink:0,paddingBottom:'16px'}}>{projects.length} projects — AI, full-stack, computer vision, robotics. Each built end-to-end, from research to deployment.</p>
          </div>
        </div>
        {/* Filter bar */}
        <div className="g1" style={{padding:'10px',borderRadius:'18px',display:'flex',flexWrap:'wrap',gap:'5px',marginBottom:'32px',border:'1px solid rgba(255,255,255,0.06)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)'}}>
          <span style={{fontSize:'7px',fontWeight:900,letterSpacing:'0.28em',textTransform:'uppercase',color:'rgba(255,255,255,0.20)',display:'flex',alignItems:'center',padding:'0 12px',marginRight:'6px'}}>Filter</span>
          {FILTERS.map(f=>(
            <button key={f} onClick={()=>setActive(f)} style={{padding:'8px 16px',borderRadius:'10px',fontSize:'10px',fontWeight:800,letterSpacing:'0.09em',textTransform:'uppercase',cursor:'pointer',fontFamily:'inherit',
              background:active===f?'linear-gradient(135deg,rgba(255,77,45,0.70),rgba(255,90,40,0.52))':'rgba(255,255,255,0.042)',
              color:active===f?'#fff':'rgba(255,255,255,0.36)',
              border:active===f?'1px solid rgba(255,100,55,0.48)':'1px solid transparent',
              boxShadow:active===f?'inset 0 1px 0 rgba(255,255,255,0.20)':'none',
              transition:'all 0.22s cubic-bezier(0.16,1,0.3,1)',
            }}
              onMouseEnter={e=>{if(active!==f)e.currentTarget.style.background='rgba(255,255,255,0.08)'}}
              onMouseLeave={e=>{if(active!==f)e.currentTarget.style.background='rgba(255,255,255,0.042)'}}
            >{f}</button>
          ))}
        </div>
        {/* Grid */}
        <div ref={gridRef} style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'72px',alignItems:'start'}}>
          {filtered.map(p=><div key={p.id} className="proj-card"><ProjectCard project={p}/></div>)}
        </div>
        {/* GitHub CTA */}
        <div className="g2 g-shine g-hi2" style={{padding:'56px',borderRadius:'28px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'32px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,right:0,width:'300px',height:'300px',background:'radial-gradient(circle at 70% 30%,rgba(255,77,45,0.07),transparent 65%)',pointerEvents:'none'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <div className="text-label" style={{marginBottom:'14px'}}>+002 / More Work</div>
            <h2 className="grad-text" style={{fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:900,lineHeight:0.92,letterSpacing:'-0.04em',marginBottom:'14px'}}>See more<br/>on GitHub.</h2>
            <p style={{fontSize:'13px',color:'rgba(255,255,255,0.32)',maxWidth:'380px',lineHeight:1.7}}>All repositories and open source work at github.com/hxrrrrri.</p>
          </div>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{flexShrink:0,position:'relative',zIndex:1}}>
            hxrrrrri <Arr s={14}/>
          </a>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
