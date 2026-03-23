import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import { socials } from '../data/projects'

const Arr=({size=16})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

export default function Contact() {
  const [form,setForm]=useState({name:'',email:'',message:''})
  const [sent,setSent]=useState(false)

  useEffect(()=>{
    const tl=gsap.timeline({delay:0.05})
    tl.fromTo('.ct-l',{x:-60,opacity:0},{x:0,opacity:1,duration:0.9,ease:'power4.out'})
      .fromTo('.ct-r',{x:60,opacity:0},{x:0,opacity:1,duration:0.9,ease:'power4.out'},'<0.08')
    return ()=>tl.kill()
  },[])

  return (
    <div style={{minHeight:'calc(100vh - 62px)',position:'relative',overflow:'hidden'}}>
      <div className="page section" style={{paddingBottom:'0'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.8fr',gap:'20px'}}>

          {/* LEFT */}
          <div className="ct-l" style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div className="g2 g-hi" style={{padding:'48px',borderRadius:'28px',flex:1}}>
              <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'18px'}}>Contact / 001</div>
              <h1 className="grad-text" style={{fontSize:'clamp(4rem,8vw,7rem)',fontWeight:900,lineHeight:0.85,letterSpacing:'-0.05em',marginBottom:'28px'}}>Lab<span style={{WebkitTextFillColor:'var(--accent)'}}>.</span></h1>
              <p style={{fontSize:'14px',color:'var(--t-mid)',lineHeight:1.8,maxWidth:'300px',marginBottom:'44px'}}>Open to full-time roles, freelance collaborations, and interesting projects. Reach out — I respond fast.</p>
              <div style={{fontSize:'9px',fontWeight:800,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--t-dim)',marginBottom:'12px'}}>Find me —</div>
              {[{label:'LinkedIn',href:socials.linkedin},{label:'GitHub',href:socials.github},{label:'Email',href:`mailto:${socials.email}`}].map(({label,href})=>(
                <a key={label} href={href} target={label!=='Email'?'_blank':undefined} rel="noopener noreferrer"
                  style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'15px 0',borderBottom:'1px solid rgba(255,255,255,0.055)',fontSize:'18px',fontWeight:800,color:'rgba(255,255,255,0.6)',textDecoration:'none',transition:'color 0.2s'}}
                  onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.6)'}
                >{label}<Arr size={18}/></a>
              ))}
            </div>
            <div className="g1 g-hi" style={{padding:'28px 32px',borderRadius:'20px'}}>
              {[{l:'Email',v:socials.email},{l:'Based in',v:'Trivandrum, IN'},{l:'Status',v:'Open to Work'}].map(({l,v},i)=>(
                <div key={l} style={{paddingBottom:i<2?'16px':0,marginBottom:i<2?'16px':0,borderBottom:i<2?'1px solid rgba(255,255,255,0.055)':'none'}}>
                  <div style={{fontSize:'8px',fontWeight:900,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'4px'}}>{l}</div>
                  <div style={{fontSize:'13px',fontWeight:600,color:'rgba(255,255,255,0.65)'}}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="ct-r g3 g-hi" style={{padding:'56px',borderRadius:'28px'}}>
            {sent ? (
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:'16px',minHeight:'400px'}}>
                <div className="grad-text" style={{fontSize:'72px',fontWeight:900,letterSpacing:'-0.04em'}}>Sent<span style={{WebkitTextFillColor:'var(--accent)'}}>.</span></div>
                <p style={{fontSize:'12px',color:'var(--t-lo)',letterSpacing:'0.14em',textTransform:'uppercase'}}>Thanks! I'll get back to you soon.</p>
              </div>
            ):(
              <>
                <div style={{marginBottom:'48px'}}>
                  <div style={{fontSize:'9px',fontWeight:900,letterSpacing:'0.26em',textTransform:'uppercase',color:'var(--accent)',marginBottom:'14px'}}>Start a Project</div>
                  <h2 className="grad-text" style={{fontSize:'clamp(2rem,4vw,3.2rem)',fontWeight:900,lineHeight:0.95,letterSpacing:'-0.04em'}}>Let's build<br/>something great.</h2>
                </div>
                <form onSubmit={e=>{e.preventDefault();setSent(true)}} style={{display:'flex',flexDirection:'column',gap:'22px'}}>
                  {[{n:'01',l:'Full Name',t:'text',k:'name',p:'Your name'},{n:'02',l:'Email',t:'email',k:'email',p:'your@email.com'}].map(({n,l,t,k,p})=>(
                    <div key={k}>
                      <label style={{display:'block',fontSize:'8px',fontWeight:900,letterSpacing:'0.24em',textTransform:'uppercase',color:'var(--t-lo)',marginBottom:'10px'}}>{n} / {l}</label>
                      <input type={t} required placeholder={p} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className="g-input"/>
                    </div>
                  ))}
                  <div>
                    <label style={{display:'block',fontSize:'8px',fontWeight:900,letterSpacing:'0.24em',textTransform:'uppercase',color:'var(--t-lo)',marginBottom:'10px'}}>03 / Message</label>
                    <textarea rows={5} required placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="g-input" style={{resize:'none'}}/>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{justifyContent:'center',fontSize:'12px',padding:'17px 32px',borderRadius:'14px',marginTop:'8px',width:'100%'}}>
                    Send Message <Arr size={15}/>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
