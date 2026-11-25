import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { sectionLink, sectionPage } from './data/company'
import usePageMeta from './hooks/usePageMeta'
import Header from './components/Header'
import Footer from './components/Footer'
import HelpWidget from './components/HelpWidget'
import MobileBar from './components/MobileBar'
import PageChrome from './components/PageChrome'
import About from './pages/About'
import Brokers from './pages/Brokers'
import Drivers from './pages/Drivers'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SafetyPage from './pages/SafetyPage'
import Legal from './pages/Legal'

// Scroll to the #section on hash navigation, otherwise to the top of the page.
// Back/forward keeps the browser's own scroll position.
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const type = useNavigationType()
  const navigate = useNavigate()
  const lastPath = useRef(null)
  usePageMeta(pathname)

  useEffect(() => {
    const samePage = lastPath.current === pathname
    lastPath.current = pathname
    const id = hash.slice(1)
    // Old one-page links such as /#drivers: forward to the page that section moved to.
    if (id && pathname === '/' && sectionPage(id) !== '/') {
      navigate(sectionLink(id), { replace: true })
      return
    }
    if (id) {
      // Wait a frame so the target section has mounted after a route change.
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: samePage ? 'smooth' : 'instant', block: 'start' })
      })
      return () => cancelAnimationFrame(raf)
    }
    if (type !== 'POP') window.scrollTo({ top: 0, behavior: samePage ? 'smooth' : 'instant' })
  }, [pathname, hash, key, type, navigate])
  return null
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollManager />
      <PageChrome />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/brokers" element={<Brokers />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/privacy" element={<Legal doc="privacy" />} />
          <Route path="/terms" element={<Legal doc="terms" />} />
          {/* The previous multi-page site's URLs land on the matching page or section. */}
          <Route path="/services" element={<Navigate to={{ pathname: '/', hash: '#services' }} replace />} />
          <Route path="/careers" element={<Navigate to="/drivers" replace />} />
          <Route path="/contact" element={<Navigate to={{ pathname: '/', hash: '#contact' }} replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <HelpWidget />
      <MobileBar />
    </>
  )
}
