import { useEffect, useMemo, useRef, useState } from 'react'
import { COVERAGE } from '../data/company'
import useInView from '../hooks/useInView'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Icon from './Icon'

const VB = { w: 959, h: 593 }

// Curve from HQ to a destination, bowed upward so lanes read as arcs.
function arc(a, b) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dist = Math.hypot(b.x - a.x, b.y - a.y)
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${mx.toFixed(1)} ${(my - dist * 0.22).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
}

export default function Coverage() {
  const [sectionRef, seen] = useInView({ threshold: 0.2 })
  const mapRef = useRef(null)
  const frameRef = useRef(null)
  const [hq, setHq] = useState(null)
  const [points, setPoints] = useState({})
  const [failed, setFailed] = useState(false)
  const [tooltip, setTooltip] = useState(null)
  const [activeLane, setActiveLane] = useState(0)
  const truckRef = useRef(null)

  // Load the state map lazily, once the section is near the viewport.
  useEffect(() => {
    if (!seen) return
    let cancelled = false
    fetch('/us-states-map.svg')
      .then((r) => r.text())
      .then((markup) => {
        if (cancelled || !mapRef.current) return
        mapRef.current.innerHTML = markup
        const svg = mapRef.current.querySelector('svg')
        svg.setAttribute('class', 'map__svg')
        svg.removeAttribute('height')
        svg.setAttribute('role', 'img')
        svg.setAttribute('aria-label', 'Map of the contiguous United States showing MSA Transportation lanes from Jamison, Pennsylvania')
        svg.querySelector(':scope > title')?.remove()

        const served = COVERAGE.served === 'all48' ? null : new Set(COVERAGE.served)
        svg.querySelectorAll('g.state > path').forEach((p) => {
          const code = p.getAttribute('class')
          const inMap = code !== 'ak' && code !== 'hi'
          const isServed = inMap && (!served || served.has(code))
          p.classList.add(isServed ? 'map__state--served' : 'map__state--off')
        })

        const center = (code, fx = 0.5, fy = 0.5) => {
          const p = svg.querySelector(`g.state > path.${code}`)
          if (!p) return null
          const b = p.getBBox()
          return { x: b.x + b.width * fx, y: b.y + b.height * fy }
        }
        setHq(center(COVERAGE.hq.code))
        const pts = {}
        COVERAGE.sampleLanes.forEach((l) => {
          pts[l.code] = center(l.code, l.fx, l.fy)
        })
        setPoints(pts)
      })
      .catch(() => !cancelled && setFailed(true))
    return () => {
      cancelled = true
    }
  }, [seen])

  const lanes = useMemo(
    () => (hq ? COVERAGE.sampleLanes.filter((l) => points[l.code]).map((l) => ({ ...l, d: arc(hq, points[l.code]) })) : []),
    [hq, points],
  )

  // Cycle the highlighted lane (and the truck that drives it).
  useEffect(() => {
    if (!lanes.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setActiveLane((i) => (i + 1) % lanes.length), 5200)
    return () => clearInterval(t)
  }, [lanes.length])

  // Drive the truck marker along the active lane's path.
  useEffect(() => {
    const truck = truckRef.current
    const lane = lanes[activeLane]
    const path = lane && document.getElementById(`lane-${lane.code}`)
    if (!truck || !path) return
    const len = path.getTotalLength()
    const place = (t) => {
      const p = path.getPointAtLength(len * t)
      const q = path.getPointAtLength(Math.min(len, len * t + 1))
      const deg = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI
      const flip = Math.abs(deg) > 90 ? -1 : 1
      truck.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${deg.toFixed(1)}) scale(1 ${flip})`)
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      place(1)
      return
    }
    let raf
    const start = performance.now()
    const D = 4600
    const tick = (now) => {
      const t = Math.min(1, (now - start) / D)
      place(t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [lanes, activeLane])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const onMove = (e) => {
      const target = e.target.closest?.('.map__state--served')
      const name = target?.querySelector('title')?.textContent
      if (!name) return setTooltip(null)
      const r = frame.getBoundingClientRect()
      setTooltip({ name, x: e.clientX - r.left, y: e.clientY - r.top })
    }
    const off = () => setTooltip(null)
    frame.addEventListener('pointermove', onMove)
    frame.addEventListener('pointerleave', off)
    return () => {
      frame.removeEventListener('pointermove', onMove)
      frame.removeEventListener('pointerleave', off)
    }
  }, [])

  return (
    <section ref={sectionRef} className="section section--deep coverage" id="coverage" aria-labelledby="coverage-title">
      <div className="container coverage__grid">
        <div className="coverage__copy">
          <SectionHead
            id="coverage-title"
            eyebrow="Service area"
            title={['Where we', 'move freight.']}
            lede="Dispatched from Jamison, Pennsylvania and running interstate truckload freight across the 48 contiguous states under our own MC and USDOT authority."
          />
          <Reveal delay={120}>
            <ul className="coverage__lanes" aria-label="Sample lanes from Jamison, PA">
              {(lanes.length ? lanes : COVERAGE.sampleLanes).map((l, i) => (
                <li key={l.code}>
                  <button type="button" className={activeLane === i ? 'is-active' : ''} onClick={() => setActiveLane(i)}>
                    <Icon name="route" size={16} />
                    {l.name}
                  </button>
                </li>
              ))}
            </ul>
            <p className="coverage__note">
              Sample lanes shown from our home base. Have a lane not listed? Ask — we will tell you straight if we can run it.
            </p>
          </Reveal>
        </div>

        <Reveal className="map" variant="scale" delay={100}>
          <div className="map__frame" ref={frameRef}>
            <div ref={mapRef} className="map__holder" />
            {failed && <p className="map__fallback">Map unavailable. We run interstate freight across the 48 contiguous states.</p>}
            {hq && (
              <svg className="map__routes" viewBox={`0 0 ${VB.w} ${VB.h}`} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
                {lanes.map((l, i) => (
                  <path key={l.code} id={`lane-${l.code}`} d={l.d} className={`map__route${i === activeLane ? ' is-active' : ''}`} />
                ))}
                {lanes.map((l, i) => (
                  <g key={l.code} transform={`translate(${points[l.code].x} ${points[l.code].y})`} className={`map__dest${i === activeLane ? ' is-active' : ''}`}>
                    <circle r="9" className="map__dest-ring" />
                    <circle r="3.6" className="map__dest-dot" />
                  </g>
                ))}
                <g transform={`translate(${hq.x} ${hq.y})`}>
                  <circle r="16" className="map__hq-pulse" />
                  <circle r="6.5" className="map__hq" />
                </g>
                <g ref={truckRef} className="map__truck">
                  <path d="M-11-5.5h13v11h-13zM3-3.5h6.5l3.5 3.5v5.5H3z" />
                </g>
              </svg>
            )}
            {hq && (
              <span className="map__hq-label" style={{ left: `${(hq.x / VB.w) * 100}%`, top: `${(hq.y / VB.h) * 100}%` }}>
                {COVERAGE.hq.label}
              </span>
            )}
            <div className={`map__tooltip${tooltip ? ' is-visible' : ''}`} style={tooltip ? { left: tooltip.x, top: tooltip.y } : undefined}>
              {tooltip?.name}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
