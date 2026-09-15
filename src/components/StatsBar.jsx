import { useEffect, useRef, useState } from 'react'
import { COMPANY_STATS } from '../constants'

function AnimatedStat({ value, label }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    const match = value.match(/^(\d+)(.*)$/)
    if (!el || !match || typeof IntersectionObserver === 'undefined') return

    const rect = el.getBoundingClientRect()
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0
    if (alreadyVisible) return

    const target = parseInt(match[1], 10)
    const suffix = match[2]
    setDisplay('0' + suffix)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 900
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(target * eased) + suffix)
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="stats-bar__item" ref={ref}>
      <span className="stats-bar__value">{display}</span>
      <span className="stats-bar__label">{label}</span>
    </div>
  )
}

export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="container stats-bar__grid">
        {COMPANY_STATS.map((s) => (
          <AnimatedStat key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </div>
  )
}
