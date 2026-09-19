import { useCallback, useEffect, useRef, useState } from 'react'
import { IMAGES } from '../data/company'
import { SEASONS } from '../data/operations'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import useDragScroll from '../hooks/useDragScroll'

// Falling particles per season. Deterministic (no Math.random) so renders are stable.
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  delay: ((i * 53) % 70) / 10,
  dur: 6 + ((i * 29) % 50) / 10,
  size: 6 + ((i * 17) % 9),
  sway: 14 + ((i * 13) % 26),
}))

function Weather({ kind }) {
  if (kind === 'summer') {
    return (
      <div className="wx wx--summer" aria-hidden="true">
        <span className="wx__sun" />
        <span className="wx__rays" />
      </div>
    )
  }
  return (
    <div className={`wx wx--${kind}`} aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <i
          key={i}
          style={{ '--x': `${p.x}%`, '--dl': `${p.delay}s`, '--du': `${p.dur}s`, '--sz': `${p.size}px`, '--sw': `${p.sway}px` }}
        />
      ))}
    </div>
  )
}

// One panorama, four seasons. Desktop: a seamless 4-panel strip where the active season
// lights up and animates (auto-cycles until the visitor interacts). Phones: a swipe carousel.
export default function Seasons() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const rail = useRef(null)
  useDragScroll(rail)

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      // On phones the rail is a swipe carousel: the scroll position is the source of truth.
      const el = rail.current
      if (el && el.scrollWidth > el.clientWidth + 4) return
      setActive((i) => (i + 1) % SEASONS.length)
    }, 4800)
    return () => clearInterval(t)
  }, [auto])

  const pick = useCallback((i) => {
    setAuto(false)
    setActive(i)
  }, [])

  // Phone carousel: derive the active season from the scroll position.
  const onScroll = () => {
    const el = rail.current
    if (!el || el.scrollWidth <= el.clientWidth + 4) return
    const card = el.children[0]
    const step = card.offsetWidth + 12
    const i = Math.max(0, Math.min(SEASONS.length - 1, Math.round(el.scrollLeft / step)))
    if (i !== active) {
      setAuto(false)
      setActive(i)
    }
  }

  const goTo = (i) => {
    pick(i)
    const el = rail.current
    if (el && el.scrollWidth > el.clientWidth + 4) {
      el.scrollTo({ left: i * (el.children[0].offsetWidth + 12), behavior: 'smooth' })
    }
  }

  return (
    <section className="section section--ink seasons" id="seasons" aria-labelledby="seasons-title">
      <div className="container">
        <SectionHead
          id="seasons-title"
          eyebrow="Year-round reliability"
          title={['Every season.', 'Every lane.']}
          lede="Freight does not wait for good weather, and neither do our standards. Same inspections, same communication, same care — spring through winter."
        />

        <Reveal
          className="seasons__stage"
          variant="scale"
          onMouseEnter={() => setAuto(false)}
        >
          <div className="seasons__rail" ref={rail} onScroll={onScroll} role="list">
            {SEASONS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="listitem"
                className={`season${active === i ? ' is-active' : ''}`}
                style={{ '--i': i, backgroundImage: `url(${IMAGES.seasons})` }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
                aria-pressed={active === i}
                aria-label={`${s.name}: ${s.title}`}
              >
                <Weather kind={s.id} />
                <span className="season__shade" aria-hidden="true" />
                <span className="season__cap">
                  <small>{String(i + 1).padStart(2, '0')} · {s.name}</small>
                  <strong>{s.title}</strong>
                  <span>{s.copy}</span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="seasons__dots" role="tablist" aria-label="Choose a season">
          {SEASONS.map((s, i) => (
            <button key={s.id} type="button" role="tab" aria-selected={active === i} className={active === i ? 'is-active' : ''} onClick={() => goTo(i)}>
              {s.name}
            </button>
          ))}
        </div>
        <p className="seasons__note">Illustrative imagery.</p>
      </div>
    </section>
  )
}
