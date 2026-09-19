import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HelpWidget from './components/HelpWidget'
import MobileBar from './components/MobileBar'
import PageChrome from './components/PageChrome'
import Home from './pages/Home'
import Legal from './pages/Legal'

// Scroll to the #section on hash navigation, otherwise to the top of the page.
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has mounted after a route change.
      const raf = requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key])
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
          <Route path="/privacy" element={<Legal doc="privacy" />} />
          <Route path="/terms" element={<Legal doc="terms" />} />
          {/* The previous multi-page site's URLs now land on the matching section. */}
          <Route path="/services" element={<Navigate to={{ pathname: '/', hash: '#services' }} replace />} />
          <Route path="/careers" element={<Navigate to={{ pathname: '/', hash: '#drivers' }} replace />} />
          <Route path="/contact" element={<Navigate to={{ pathname: '/', hash: '#contact' }} replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <HelpWidget />
      <MobileBar />
    </>
  )
}
