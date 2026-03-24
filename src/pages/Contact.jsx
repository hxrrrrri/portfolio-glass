import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import { socials } from '../data/projects'
const Arr=({s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

export default function Contact() {
  const [form,setForm]=useState({name:'',email:'',message:''})
  const [sent,setSent]=useState(false)
  useEffect(()=>{
    const tl=gsap.timeline({delay:0.06})
    tl.fromTo('.ct-l',{x:-64,opacity:0,filter:'blur(4px)'},{x:0,opacity:1,filter:'blur(0px)',duration:1.0,ease:'power4.out'})
      .fromTo('.ct-r',{x:64,opacity:0,filter:'blur(4px)'},{x:0,opacity:1,filter:'blur(0px)',duration:1.0,ease:'power4.out'},'<0.08')
    return()=>tl.kill()
  },[])

  return (
    <div style={{minHeight:'calc(100vh - 62px)',position:'relative',overflow:'hidden'}}>
      <div className="page" style={{paddingBottom:0}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.9fr',gap:'18px'}}>
          {/* LEFT */}
          <div className="ct-l" style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            <div className="g2 g-hi2" style={{padding:'52px',borderRadius:'28px',flex:1,position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,left:0,width:'260px',height:'260px',background:'radial-gradient(circle at 20% 20%,rgba(var(--a-r),var(--a-g),var(--a-b),0.07),transparent 62%)',pointerEvents:'none'}}/>
              <div style={{position:'relative',zIndex:1}}>
                <div className="text-label" style={{marginBottom:'18px'}}>Contact / 001</div>
                <h1 className="grad-text" style={{fontSize:'clamp(4rem,7vw,7rem)',fontWeight:900,lineHeight:0.85,letterSpacing:'-0.055em',marginBottom:'28px'}}>Lab<span style={{WebkitTextFillColor:'var(--a1)'}}>.</span></h1>
                <p style={{fontSize:'14px',color:'rgba(255,255,255,0.44)',lineHeight:1.80,maxWidth:'280px',marginBottom:'48px'}}>Open to full-time roles, freelance collaborations, and interesting projects. I respond fast.</p>
                <div style={{fontSize:'8px',fontWeight:900,letterSpacing:'0.24em',textTransform:'uppercase',color:'rgba(255,255,255,0.22)',marginBottom:'14px'}}>Find me —</div>
                {[{label:'LinkedIn',href:socials.linkedin},{label:'GitHub',href:socials.github},{label:'Email',href:`mailto:${socials.email}`}].map(({label,href})=>(
                  <a key={label} href={href} target={label!=='Email'?'_blank':undefined} rel="noopener noreferrer"
                    style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'15px 0',borderBottom:'1px solid rgba(255,255,255,0.05)',fontSize:'18px',fontWeight:800,color:'rgba(255,255,255,0.58)',textDecoration:'none',transition:'color 0.22s, padding-left 0.22s'}}
                    onMouseEnter={e=>{e.currentTarget.style.color='var(--a1)';e.currentTarget.style.paddingLeft='8px'}}
                    onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.58)';e.currentTarget.style.paddingLeft='0'}}
                  >{label}<Arr s={18}/></a>
                ))}
              </div>
            </div>
            <div className="g1 g-hi" style={{padding:'28px 32px',borderRadius:'20px'}}>
              {[{l:'Email',v:socials.email},{l:'Based in',v:'Trivandrum, IN'},{l:'Status',v:'Open to Work · 2026'}].map(({l,v},i)=>(
                <div key={l} style={{paddingBottom:i<2?'16px':0,marginBottom:i<2?'16px':0,borderBottom:i<2?'1px solid rgba(255,255,255,0.05)':'none'}}>
                  <div className="text-label" style={{marginBottom:'5px',fontSize:'8px'}}>{l}</div>
                  <div style={{fontSize:'13px',fontWeight:600,color:'rgba(255,255,255,0.60)',letterSpacing:'0.01em'}}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="ct-r g3 g-hi2" style={{padding:'60px',borderRadius:'28px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,right:0,width:'350px',height:'350px',background:'radial-gradient(circle at 75% 20%,rgba(var(--a-r),var(--a-g),var(--a-b),0.06),transparent 62%)',pointerEvents:'none'}}/>
            {sent?(
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:'20px',minHeight:'460px',position:'relative',zIndex:1}}>
                <div className="grad-text-warm" style={{fontSize:'80px',fontWeight:900,letterSpacing:'-0.05em',lineHeight:1}}>Sent<span style={{WebkitTextFillColor:'var(--a1)'}}>.</span></div>
                <p style={{fontSize:'11px',fontWeight:700,color:'rgba(255,255,255,0.35)',letterSpacing:'0.18em',textTransform:'uppercase'}}>Thanks! I'll get back to you soon.</p>
              </div>
            ):(
              <div style={{position:'relative',zIndex:1}}>
                <div style={{marginBottom:'48px'}}>
                  <div className="text-label" style={{marginBottom:'14px'}}>Start a Project</div>
                  <h2 className="grad-text" style={{fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:900,lineHeight:1.0,letterSpacing:'-0.045em',paddingBottom:'0.12em',overflow:'visible',display:'inline-block',width:'100%'}}>Let's build<br/>something great.</h2>
                </div>
                <form onSubmit={e=>{e.preventDefault();setSent(true)}} style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                  {[{n:'01',l:'Full Name',t:'text',k:'name',p:'Your name'},{n:'02',l:'Email Address',t:'email',k:'email',p:'your@email.com'}].map(({n,l,t,k,p})=>(
                    <div key={k}>
                      <label style={{display:'block',fontSize:'8px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'rgba(255,255,255,0.30)',marginBottom:'10px'}}>{n} / {l}</label>
                      <input type={t} required placeholder={p} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className="g-input"/>
                    </div>
                  ))}
                  <div>
                    <label style={{display:'block',fontSize:'8px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'rgba(255,255,255,0.30)',marginBottom:'10px'}}>03 / Message</label>
                    <textarea rows={5} required placeholder="Tell me about your project or idea..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="g-input" style={{resize:'none'}}/>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{justifyContent:'center',fontSize:'12px',padding:'18px 32px',borderRadius:'14px',marginTop:'8px',width:'100%',fontFamily:'inherit'}}>
                    Send Message <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
