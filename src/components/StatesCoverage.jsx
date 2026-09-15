import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

export default function StatesCoverage() {
  const wrapRef = useRef(null)
  const frameRef = useRef(null)
  const [marker, setMarker] = useState(null)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetch('/us-states-map.svg')
      .then((res) => res.text())
      .then((markup) => {
        if (cancelled || !wrapRef.current) return
        wrapRef.current.innerHTML = markup
        const svg = wrapRef.current.querySelector('svg')
        if (!svg) return
        svg.setAttribute('class', 'coverage-map__svg')
        svg.removeAttribute('height')
        svg.style.width = '100%'
        svg.style.height = 'auto'

        // Not-served territories get a muted style; everything else is a
        // served contiguous state and gets the interactive brand fill.
        const notServed = new Set(['ak', 'hi'])
        svg.querySelectorAll('g.state > path').forEach((path) => {
          const cls = path.getAttribute('class')
          path.classList.add(notServed.has(cls) ? 'coverage-map__state--muted' : 'coverage-map__state--served')
        })

        // Place a marker at the company HQ (Warminster, PA) using the
        // rendered path's own bounding box — no manual coordinate guessing.
        const pa = svg.querySelector('g.state > path.pa')
        if (pa) {
          const box = pa.getBBox()
          setMarker({
            x: ((box.x + box.width / 2) / 959) * 100,
            y: ((box.y + box.height / 2) / 593) * 100,
          })
        }
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const onMove = (e) => {
      const target = e.target.closest('.coverage-map__state--served')
      if (!target) {
        setTooltip((t) => (t ? null : t))
        return
      }
      const name = target.querySelector('title')?.textContent
      if (!name) return
      const rect = frame.getBoundingClientRect()
      setTooltip({
        name,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
    const onLeave = () => setTooltip(null)

    frame.addEventListener('mousemove', onMove)
    frame.addEventListener('mouseleave', onLeave)
    return () => {
      frame.removeEventListener('mousemove', onMove)
      frame.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section className="section states-coverage">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <p className="eyebrow-line" style={{ margin: '0 auto 14px' }}>Where we run</p>
          <h2>Coast to coast, border to border</h2>
          <p className="section__lede" style={{ margin: '0 auto' }}>
            MSA Transportation runs interstate freight across all 48
            contiguous states under our own MC &amp; USDOT authority —
            dispatched out of our Warminster, PA home base.
          </p>
        </Reveal>

        <Reveal className="coverage-map" delay={100}>
          <div className="coverage-map__frame" ref={frameRef}>
            <div ref={wrapRef} aria-label="Map of the 48 contiguous United States served by MSA Transportation" />
            {marker && (
              <div className="coverage-map__marker" style={{ left: `${marker.x}%`, top: `${marker.y}%` }}>
                <span className="coverage-map__pulse" />
                <span className="coverage-map__pin" />
                <span className="coverage-map__marker-label">MSA HQ &middot; Warminster, PA</span>
              </div>
            )}
            <div
              className={`coverage-map__tooltip${tooltip ? ' is-visible' : ''}`}
              style={tooltip ? { left: `${tooltip.x}px`, top: `${tooltip.y}px` } : undefined}
            >
              {tooltip?.name}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
