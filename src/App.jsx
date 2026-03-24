import { useEffect, useRef, useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Showcase from './pages/Showcase.jsx'


function applyTheme(theme) {
  const root = document.documentElement
  Object.entries(theme.vars).forEach(([k, v]) => {
    if (k === '--body-bg') {
      document.body.style.background = v + ', linear-gradient(168deg, #07070f 0%, #0a0814 100%)'
    } else {
      root.style.setProperty(k, v)
    }
  })
}


// ─────────────────────────────────────────────────────────────────
// Custom Cursor
// ─────────────────────────────────────────────────────────────────
function LuxuryCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const textRef = useRef(null)
  const pos     = useRef({ x:-200, y:-200 })
  const ring    = useRef({ x:-200, y:-200 })

  useEffect(() => {
    document.body.style.cursor = 'none'
    let raf
    const lerp = (a,b,t) => a + (b-a)*t

    const onMove = (e) => {
      pos.current = { x:e.clientX, y:e.clientY }
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${e.clientX-4}px,${e.clientY-4}px)`
      if (glowRef.current) glowRef.current.style.transform = `translate(${e.clientX-130}px,${e.clientY-130}px)`
      if (textRef.current) {
        textRef.current.style.setProperty('--mx', e.clientX+'px')
        textRef.current.style.setProperty('--my', e.clientY+'px')
      }
    }
    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x-20}px,${ring.current.y-20}px)`
      raf = requestAnimationFrame(tick)
    }
    const onOver  = (e) => {
      if (e.target.closest('a,button,[role=button],input,textarea')) {
        if (ringRef.current) { ringRef.current.style.transform += ' scale(1.8)'; ringRef.current.style.borderColor='rgba(255,77,45,0.9)' }
        if (dotRef.current)  dotRef.current.style.background='#FF4D2D'
      }
    }
    const onOut = () => {
      if (ringRef.current) ringRef.current.style.borderColor='rgba(255,255,255,0.5)'
      if (dotRef.current)  dotRef.current.style.background='#fff'
    }

    window.addEventListener('mousemove', onMove, { passive:true })
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseout',   onOut)
    raf = requestAnimationFrame(tick)
    return () => {
      document.body.style.cursor=''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  aria-hidden="true" style={{ position:'fixed',top:0,left:0,zIndex:99999,pointerEvents:'none',width:'8px',height:'8px',borderRadius:'50%',background:'#fff',boxShadow:'0 0 8px rgba(255,255,255,0.6)',transition:'background 0.2s',willChange:'transform' }}/>
      <div ref={ringRef} aria-hidden="true" style={{ position:'fixed',top:0,left:0,zIndex:99998,pointerEvents:'none',width:'40px',height:'40px',borderRadius:'50%',border:'1.5px solid rgba(255,255,255,0.5)',transition:'border-color 0.2s',willChange:'transform' }}/>
      <div ref={glowRef} aria-hidden="true" style={{ position:'fixed',top:0,left:0,zIndex:9997,pointerEvents:'none',width:'260px',height:'260px',borderRadius:'50%',background:'radial-gradient(circle,rgba(255,95,30,0.08) 0%,rgba(255,60,10,0.03) 50%,transparent 72%)',willChange:'transform' }}/>
      <div ref={textRef} aria-hidden="true" style={{ position:'fixed',inset:0,zIndex:9996,pointerEvents:'none',backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Ccircle cx='11' cy='11' r='1.0' fill='%23fff' fill-opacity='0.09'/%3E%3C/svg%3E")`,backgroundSize:'22px 22px',WebkitMaskImage:'radial-gradient(circle 150px at var(--mx,-2000px) var(--my,-2000px),black 10%,transparent 100%)',maskImage:'radial-gradient(circle 150px at var(--mx,-2000px) var(--my,-2000px),black 10%,transparent 100%)' }}/>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────
// Page Transition
// ─────────────────────────────────────────────────────────────────
function PageTransition({ children }) {
  const location = useLocation()
  const wrapRef  = useRef(null)
  useEffect(() => {
    if (!wrapRef.current) return
    wrapRef.current.style.opacity = '0'
    wrapRef.current.style.transform = 'translateY(18px)'
    const t = setTimeout(() => {
      if (wrapRef.current) {
        wrapRef.current.style.transition = 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)'
        wrapRef.current.style.opacity = '1'
        wrapRef.current.style.transform = 'translateY(0)'
      }
    }, 20)
    return () => clearTimeout(t)
  }, [location.pathname])
  return <div ref={wrapRef}>{children}</div>
}

// ─────────────────────────────────────────────────────────────────
// App root
// ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <div className="orb orb-1" aria-hidden="true" style={{ background:'var(--orb1,rgba(255,77,45,0.12))' }}/>
      <div className="orb orb-2" aria-hidden="true" style={{ background:'var(--orb2,rgba(10,18,75,0.20))' }}/>
      <div className="orb orb-3" aria-hidden="true"/>
      <div className="orb orb-4" aria-hidden="true"/>

      {!("ontouchstart" in window) && <LuxuryCursor/>}

      <div style={{ position:'relative', zIndex:1, minHeight:'100vh' }}>
        <Navbar/>
        <PageTransition>
          <Routes>
            <Route path="/"         element={<Home/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/showcase" element={<Showcase/>}/>
            <Route path="/about"    element={<About/>}/>
            <Route path="/contact"  element={<Contact/>}/>
          </Routes>
        </PageTransition>
      </div>
    </BrowserRouter>
  )
}
