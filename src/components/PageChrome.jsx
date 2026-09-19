import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

// Thin reading-progress bar + back-to-top button. Both update via one rAF-throttled scroll listener.
export default function PageChrome() {
  const bar = useRef(null)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      setShowTop(window.scrollY > window.innerHeight * 1.5)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <div className="progress" aria-hidden="true">
        <span ref={bar} />
      </div>
      <button
        type="button"
        className={`to-top${showTop ? ' is-visible' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Icon name="arrow" size={20} className="to-top__icon" />
      </button>
    </>
  )
}
