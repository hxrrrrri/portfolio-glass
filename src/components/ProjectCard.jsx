import { useRef } from 'react'
const Arr=({size=13})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const Ext=({size=12})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>

export default function ProjectCard({project}) {
  const cardRef=useRef(null); const glowRef=useRef(null)

  const onMove=(e)=>{
    const c=cardRef.current; if(!c)return
    const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top
    c.style.transform=`rotateX(${(y/r.height-0.5)*10}deg) rotateY(${(0.5-x/r.width)*10}deg) translateZ(10px)`
    if(glowRef.current){
      glowRef.current.style.background=`radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(255,77,45,0.16) 0%, transparent 62%)`
      glowRef.current.style.opacity='1'
    }
  }
  const onLeave=()=>{
    if(cardRef.current) cardRef.current.style.transform='rotateX(0) rotateY(0) translateZ(0)'
    if(glowRef.current) glowRef.current.style.opacity='0'
  }

  return (
    <div style={{perspective:'1100px'}} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={cardRef} className="g1 g-shine g-hi"
        style={{padding:'32px',borderRadius:'24px',display:'flex',flexDirection:'column',transformStyle:'preserve-3d',transition:'transform 0.15s ease-out, box-shadow 0.3s',position:'relative',overflow:'hidden',cursor:'pointer',height:'100%'}}>
        <div ref={glowRef} style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:1,opacity:0,transition:'opacity 0.12s',borderRadius:'24px'}}/>
        <div style={{position:'relative',zIndex:2,display:'flex',flexDirection:'column',height:'100%'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'18px'}}>
            <span style={{padding:'4px 12px',borderRadius:'8px',fontSize:'8px',fontWeight:900,letterSpacing:'0.14em',textTransform:'uppercase',background:'rgba(255,77,45,0.13)',border:'1px solid rgba(255,77,45,0.28)',color:'var(--accent)'}}>{project.category}</span>
            <span style={{fontSize:'10px',fontWeight:700,color:'var(--t-dim)',letterSpacing:'0.08em'}}>{project.number}</span>
          </div>
          <div style={{fontSize:'72px',fontWeight:900,lineHeight:0.82,letterSpacing:'-0.05em',color:'rgba(255,255,255,0.035)',marginBottom:'6px',userSelect:'none',transition:'color 0.3s'}}
            className="ghost-num">{project.number}</div>
          <h3 style={{fontSize:'20px',fontWeight:900,lineHeight:1.1,letterSpacing:'-0.02em',color:'#fff',marginBottom:'12px'}}>{project.title}</h3>
          <p className="line-clamp-3" style={{fontSize:'12px',color:'var(--t-mid)',lineHeight:1.72,flex:1,marginBottom:'20px'}}>{project.description}</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'5px',marginBottom:'20px'}}>
            {project.tech.slice(0,3).map(t=><span key={t} className="g-pill" style={{padding:'3px 10px',fontSize:'8px',fontWeight:800,letterSpacing:'0.09em',textTransform:'uppercase',color:'rgba(255,255,255,0.42)'}}>{t}</span>)}
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary"
              style={{padding:'9px 16px',borderRadius:'10px',fontSize:'10px',gap:'6px',flex:1,justifyContent:'center'}} onClick={e=>e.stopPropagation()}>
              GitHub <Arr/>
            </a>
            {project.vercelLink&&(
              <a href={project.vercelLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
                style={{padding:'9px 16px',borderRadius:'10px',fontSize:'10px',gap:'6px',flex:1,justifyContent:'center'}} onClick={e=>e.stopPropagation()}>
                Live <Ext/>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
