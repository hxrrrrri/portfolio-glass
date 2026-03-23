import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import ProjectCard from '../components/ProjectCard.jsx'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

const FILTERS = ['All','AI / Full-Stack','AI / NLP','Machine Learning','Robotics / CV','Full-Stack','Web App']
const Arr=({size=16})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

export default function Projects() {
  const [active,setActive]=useState('All')
  const gridRef=useRef(null)
  const filtered=active==='All'?projects:projects.filter(p=>p.category===active)

  useEffect(()=>{
    if(gridRef.current?.children)
      gsap.fromTo(gridRef.current.children,{y:44,opacity:0},{y:0,opacity:1,duration:0.65,stagger:0.08,ease:'power3.out'})
  },[active])
  useEffect(()=>{
    gsap.fromTo('.projects-hero',{y:60,opacity:0},{y:0,opacity:1,duration:0.95,ease:'power4.out',delay:0.06})
  },[])

  return (
    <div style={{minHeight:'calc(100vh - 62px)',position:'relative',overflow:'hidden'}}>
      <div className="page section">

        {/* Hero */}
        <div className="projects-hero" style={{marginBottom:'52px'}}>
          <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'18px'}}>+001 / Projects</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:'32px'}}>
            <h1 className="grad-text" style={{fontSize:'clamp(3.5rem,9vw,8rem)',fontWeight:900,lineHeight:0.88,letterSpacing:'-0.045em'}}>Selected<br/>Works.</h1>
            <p style={{fontSize:'14px',color:'var(--t-mid)',lineHeight:1.75,maxWidth:'340px',flexShrink:0,paddingBottom:'12px'}}>{projects.length} projects — AI, full-stack, computer vision, and robotics. Each built end-to-end.</p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="g1" style={{padding:'10px',borderRadius:'16px',display:'flex',flexWrap:'wrap',gap:'5px',marginBottom:'32px',border:'1px solid rgba(255,255,255,0.07)'}}>
          <span style={{fontSize:'8px',fontWeight:900,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--t-dim)',display:'flex',alignItems:'center',padding:'0 10px',marginRight:'4px'}}>Filter —</span>
          {FILTERS.map(f=>(
            <button key={f} onClick={()=>setActive(f)} style={{
              padding:'8px 16px',borderRadius:'9px',fontSize:'10px',fontWeight:800,letterSpacing:'0.08em',textTransform:'uppercase',cursor:'pointer',border:'none',
              background:active===f?'linear-gradient(135deg,rgba(255,77,45,0.7),rgba(255,90,40,0.5))':'rgba(255,255,255,0.045)',
              color:active===f?'#fff':'rgba(255,255,255,0.38)',
              borderTop:active===f?'1px solid rgba(255,110,55,0.5)':'1px solid transparent',
              transition:'all 0.2s',
            }}
              onMouseEnter={e=>{if(active!==f)e.currentTarget.style.background='rgba(255,255,255,0.08)'}}
              onMouseLeave={e=>{if(active!==f)e.currentTarget.style.background='rgba(255,255,255,0.045)'}}
            >{f}</button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef} style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'64px',alignItems:'start'}}>
          {filtered.map(p=><div key={p.id} className="proj-card"><ProjectCard project={p}/></div>)}
        </div>

        {/* GitHub CTA */}
        <div className="g1 g-hi g-shine" style={{padding:'52px',borderRadius:'28px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'32px'}}>
          <div>
            <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'14px'}}>+002 / More</div>
            <h2 className="grad-text" style={{fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:900,lineHeight:0.95,letterSpacing:'-0.04em',marginBottom:'12px'}}>See more<br/>on GitHub.</h2>
            <p style={{fontSize:'13px',color:'var(--t-lo)',maxWidth:'380px',lineHeight:1.7}}>All repositories, contributions, and experiments at github.com/hxrrrrri.</p>
          </div>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="btn btn-secondary"
            style={{flexShrink:0,fontSize:'12px',padding:'15px 28px',borderRadius:'14px'}}>
            hxrrrrri <Arr/>
          </a>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
