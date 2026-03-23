import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Showcase from './pages/Showcase.jsx'

function MouseEffects() {
  const dotRef  = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    let mx = -1000, my = -1000, raf

    const onMove = (e) => { mx = e.clientX; my = e.clientY }

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.setProperty('--mx', mx + 'px')
        dotRef.current.style.setProperty('--my', my + 'px')
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${mx - 130}px, ${my - 130}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      {/* Dot grid texture */}
      <div ref={dotRef} aria-hidden="true" style={{
        position:'fixed', inset:0, zIndex:9998, pointerEvents:'none',
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='1.2' fill='%23fff' fill-opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundSize:'20px 20px',
        WebkitMaskImage:'radial-gradient(circle 140px at var(--mx,-1000px) var(--my,-1000px), black 15%, transparent 100%)',
        maskImage:       'radial-gradient(circle 140px at var(--mx,-1000px) var(--my,-1000px), black 15%, transparent 100%)',
      }}/>

      {/* Orange luminance glow */}
      <div ref={glowRef} aria-hidden="true" style={{
        position:'fixed', top:0, left:0,
        width:'260px', height:'260px', borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,90,20,0.09) 0%, rgba(255,60,0,0.03) 55%, transparent 75%)',
        pointerEvents:'none', zIndex:9997, willChange:'transform',
      }}/>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Ambient background orbs */}
      <div className="orb orb-1" aria-hidden="true"/>
      <div className="orb orb-2" aria-hidden="true"/>
      <div className="orb orb-3" aria-hidden="true"/>

      <MouseEffects />

      <div style={{ position:'relative', zIndex:1, minHeight:'100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/about"    element={<About />} />
          <Route path="/contact"  element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
