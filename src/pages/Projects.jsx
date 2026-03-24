import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import ProjectCard from '../components/ProjectCard.jsx'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

const FILTERS=['All','AI / Full-Stack','AI / NLP','Machine Learning','Robotics / CV','Full-Stack','Web App']
const Arr=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
function useIsMobile(bp=768){const[m,setM]=useState(()=>typeof window!=='undefined'&&window.innerWidth<bp);useEffect(()=>{const c=()=>setM(window.innerWidth<bp);window.addEventListener('resize',c);return()=>window.removeEventListener('resize',c)},[bp]);return m}

export default function Projects() {
  const mob=useIsMobile()
  const [active,setActive]=useState('All')
  const gridRef=useRef(null)
  const filtered=active==='All'?projects:projects.filter(p=>p.category===active)

  useEffect(()=>{
    if(gridRef.current?.children) gsap.fromTo(gridRef.current.children,{y:40,scale:0.95,filter:'blur(4px)'},{y:0,scale:1,filter:'blur(0px)',duration:0.6,stagger:0.07,ease:'power3.out'})
  },[active])
  useEffect(()=>{
    gsap.fromTo('.projects-hero',{y:50,opacity:0,filter:'blur(4px)'},{y:0,opacity:1,filter:'blur(0px)',duration:0.9,ease:'power4.out',delay:0.06})
  },[])

  return (
    <div style={{minHeight:'calc(100vh - 62px)',position:'relative',overflow:'hidden'}}>
      <div className="page">
        {/* Header */}
        <div className="projects-hero" style={{marginBottom:mob?'32px':'48px'}}>
          <div className="text-label" style={{marginBottom:'14px'}}>+001 / Projects</div>
          <div style={{display:'flex',flexDirection:mob?'column':'row',justifyContent:'space-between',alignItems:mob?'flex-start':'flex-end',gap:'16px'}}>
            <h1 style={{fontSize:mob?'clamp(2.8rem,12vw,4.5rem)':'clamp(3.2rem,8vw,7rem)',fontWeight:900,lineHeight:0.88,letterSpacing:'-0.04em',color:'rgba(255,255,255,0.97)'}}>Selected<br/>Works.</h1>
            {!mob&&<p style={{fontSize:'14px',color:'rgba(255,255,255,0.36)',lineHeight:1.76,maxWidth:'300px',flexShrink:0,paddingBottom:'12px'}}>{projects.length} projects — AI, full-stack, computer vision, robotics. Built end-to-end.</p>}
          </div>
        </div>

        {/* Filter bar */}
        <div className="g1" style={{padding:'8px',borderRadius:'16px',display:'flex',flexWrap:'wrap',gap:'4px',marginBottom:'24px',border:'1px solid rgba(255,255,255,0.06)',backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)'}}>
          {!mob&&<span style={{fontSize:'7px',fontWeight:900,letterSpacing:'0.28em',textTransform:'uppercase',color:'rgba(255,255,255,0.20)',display:'flex',alignItems:'center',padding:'0 10px',marginRight:'4px'}}>Filter</span>}
          {FILTERS.map(f=>(
            <button key={f} onClick={()=>setActive(f)} style={{
              padding:mob?'7px 12px':'8px 14px',borderRadius:'9px',fontSize:mob?'9px':'10px',fontWeight:800,letterSpacing:'0.08em',textTransform:'uppercase',cursor:'pointer',fontFamily:'inherit',
              background:active===f?'linear-gradient(135deg,rgba(var(--a-r),var(--a-g),var(--a-b),0.72),rgba(var(--a-r),var(--a-g),var(--a-b),0.48))':'rgba(255,255,255,0.042)',
              color:active===f?'#fff':'rgba(255,255,255,0.36)',
              border:active===f?'1px solid rgba(var(--a-r),var(--a-g),var(--a-b),0.50)':'1px solid transparent',
              boxShadow:active===f?'inset 0 1px 0 rgba(255,255,255,0.20)':'none',
              transition:'all 0.20s cubic-bezier(0.16,1,0.3,1)',
            }}
              onMouseEnter={e=>{if(active!==f)e.currentTarget.style.background='rgba(255,255,255,0.08)'}}
              onMouseLeave={e=>{if(active!==f)e.currentTarget.style.background='rgba(255,255,255,0.042)'}}
            >{f}</button>
          ))}
        </div>

        {/* Grid — 3-col desktop, 1-col mobile */}
        <div ref={gridRef} style={{display:'grid',gridTemplateColumns:mob?'1fr':'repeat(3,1fr)',gap:mob?'12px':'14px',marginBottom:'56px',alignItems:'start'}}>
          {filtered.map(p=><div key={p.id} className="proj-card"><ProjectCard project={p}/></div>)}
        </div>

        {/* GitHub CTA */}
        <div className="g2 g-shine g-hi2" style={{padding:mob?'28px 24px':'48px',borderRadius:'24px',display:'flex',flexDirection:mob?'column':'row',justifyContent:'space-between',alignItems:mob?'flex-start':'center',gap:'20px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,right:0,width:'250px',height:'250px',background:'radial-gradient(circle at 70% 30%,rgba(var(--a-r),var(--a-g),var(--a-b),0.07),transparent 65%)',pointerEvents:'none'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <div className="text-label" style={{marginBottom:'12px'}}>+002 / More Work</div>
            <h2 style={{fontSize:mob?'clamp(1.8rem,7vw,2.5rem)':'clamp(1.8rem,3.5vw,3rem)',fontWeight:900,lineHeight:0.92,letterSpacing:'-0.04em',marginBottom:'10px',color:'rgba(255,255,255,0.97)'}}>See more<br/>on GitHub.</h2>
            <p style={{fontSize:'13px',color:'rgba(255,255,255,0.32)',lineHeight:1.65}}>All repositories at github.com/hxrrrrri.</p>
          </div>
          <a href="https://github.com/hxrrrrri" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{flexShrink:0,position:'relative',zIndex:1,alignSelf:mob?'flex-start':'auto'}}>
            hxrrrrri <Arr s={13}/>
          </a>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
