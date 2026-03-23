import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import Footer from '../components/Footer'
import { socials } from '../data/projects'

const ArrowIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.05 })
    tl.fromTo('.contact-left',  { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power4.out' })
      .fromTo('.contact-right', { x: 60,  opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }, '<0.1')
    return () => tl.kill()
  }, [])

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', position: 'relative' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 48px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '24px' }}>

          {/* Left info */}
          <div className="contact-left" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass glass-inset" style={{ padding: '40px', borderRadius: '24px', flex: 1 }}>
              <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '16px' }}>Contact / 001</div>
              <h1 style={{ fontSize: '72px', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', color: '#fff', marginBottom: '24px' }}>
                Lab<span style={{ color: '#FF4D2D' }}>.</span>
              </h1>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '280px', marginBottom: '40px' }}>
                Open to full-time roles, freelance collaborations, and interesting projects. Reach out — I respond fast.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '8px' }}>Find me —</div>
                {[
                  { label: 'LinkedIn', href: socials.linkedin },
                  { label: 'GitHub',   href: socials.github },
                  { label: 'Email',    href: `mailto:${socials.email}` },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target={label !== 'Email' ? '_blank' : undefined} rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                      fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.65)',
                      textDecoration: 'none', transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color='#FF4D2D'}
                    onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.65)'}
                  >
                    {label} <ArrowIcon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="glass glass-inset" style={{ padding: '28px', borderRadius: '20px' }}>
              {[
                { label: 'Email',   value: socials.email },
                { label: 'Based in',value: 'Trivandrum, IN' },
                { label: 'Status',  value: 'Open to Work' },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-right glass-strong glass-inset" style={{ padding: '48px', borderRadius: '24px' }}>
            {sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px' }}>
                <div style={{ fontSize: '64px', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>Sent<span style={{ color: '#FF4D2D' }}>.</span></div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Thanks! I'll get back to you soon.</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF4D2D', marginBottom: '12px' }}>Start a Project</div>
                  <h2 style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>Let's build<br/>something great.</h2>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {[
                    { num:'01', label:'Full Name',  type:'text',  key:'name',  placeholder:'Your name' },
                    { num:'02', label:'Email',       type:'email', key:'email', placeholder:'your@email.com' },
                  ].map(({ num, label, type, key, placeholder }) => (
                    <div key={key}>
                      <label style={{ display:'block', fontSize:'9px', fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', marginBottom:'8px' }}>{num} / {label}</label>
                      <input type={type} required placeholder={placeholder} value={form[key]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                        className="glass-input"
                        style={{ width:'100%', padding:'14px 18px', fontSize:'15px', fontWeight:500 }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display:'block', fontSize:'9px', fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', marginBottom:'8px' }}>03 / Message</label>
                    <textarea rows={4} required placeholder="Tell me about your project..." value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="glass-input"
                      style={{ width:'100%', padding:'14px 18px', fontSize:'15px', fontWeight:500, resize:'none' }} />
                  </div>
                  <button type="submit" className="glass-btn-accent"
                    style={{ padding:'16px 32px', fontSize:'13px', fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', border:'none', cursor:'pointer', width:'100%' }}>
                    Send Message <ArrowIcon size={16} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
