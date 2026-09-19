import { useCallback, useEffect, useRef, useState } from 'react'
import { IMAGES } from '../data/company'
import { FLEET } from '../data/operations'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Icon from './Icon'

const AUTOPLAY_MS = 5200

function FleetVisual({ item }) {
  return (
    <img
      className="fleet__photo"
      src={item.small ? IMAGES[item.small] : IMAGES[item.image]}
      srcSet={item.small ? `${IMAGES[item.small]} 480w, ${IMAGES[item.image]} 806w` : undefined}
      sizes={item.small ? '(max-width: 640px) 86vw, 420px' : undefined}
      alt={`${item.name} — MSA Transportation equipment`}
      style={item.pos ? { objectPosition: item.pos } : undefined}
      width="800"
      height="520"
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  )
}

// Real slider: native swipe on touch, click-and-drag with a mouse, arrows and dots that wrap around,
// keyboard arrows, and a gentle autoplay that pauses on hover/focus/touch and off-screen.
export default function Fleet() {
  const rail = useRef(null)
  const drag = useRef(null)
  const [pos, setPos] = useState({ index: 0, max: 0 })
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [dragging, setDragging] = useState(false)

  const stepPx = () => {
    const el = rail.current
    const card = el?.querySelector('.fleet__card')
    if (!card) return 0
    const gap = parseFloat(getComputedStyle(el.firstElementChild).columnGap) || 20
    return card.offsetWidth + gap
  }

  const measure = useCallback(() => {
    const el = rail.current
    const s = stepPx()
    if (!el || !s) return
    const max = Math.max(0, Math.round((el.scrollWidth - el.clientWidth) / s))
    const index = Math.min(max, Math.max(0, Math.round(el.scrollLeft / s)))
    setPos((p) => (p.index === index && p.max === max ? p : { index, max }))
  }, [])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (rail.current) ro.observe(rail.current)
    return () => ro.disconnect()
  }, [measure])

  const goTo = useCallback(
    (i) => {
      const el = rail.current
      if (!el) return
      const target = i >= pos.max ? el.scrollWidth - el.clientWidth : i * stepPx()
      el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
    },
    [pos.max],
  )
  const next = useCallback(() => goTo(pos.index >= pos.max ? 0 : pos.index + 1), [goTo, pos])
  const prev = useCallback(() => goTo(pos.index <= 0 ? pos.max : pos.index - 1), [goTo, pos])

  // autoplay: only while on screen, never for reduced-motion, paused by interaction
  useEffect(() => {
    const el = rail.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (paused || !visible || pos.max === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, visible, pos.max, next])

  // mouse drag (touch uses native scrolling)
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = { x: e.clientX, left: rail.current.scrollLeft, moved: false }
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) < 6) return
    if (!d.moved) {
      d.moved = true
      setDragging(true)
    }
    rail.current.scrollLeft = d.left - dx
  }
  const endDrag = () => {
    if (!drag.current) return
    drag.current = null
    setDragging(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  return (
    <section
      className="section section--dark fleet"
      id="fleet"
      data-nav="fleet"
      aria-labelledby="fleet-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="container fleet__head">
        <SectionHead
          id="fleet-title"
          eyebrow="Our fleet"
          title={['Modern equipment.', 'Professional operation.']}
          lede="Breakdowns cost customers time and money — so 40+ tractors and trailers run on a strict maintenance schedule."
        />
        <div className="fleet__controls" aria-label="Fleet slider controls">
          <button type="button" onClick={prev} aria-label="Previous equipment">
            <Icon name="arrowLeft" size={20} />
          </button>
          <button type="button" onClick={next} aria-label="Next equipment">
            <Icon name="arrow" size={20} />
          </button>
        </div>
      </div>

      <div className="container">
        <div
          className={`fleet__rail${dragging ? ' is-dragging' : ''}`}
          ref={rail}
          onScroll={measure}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Fleet equipment"
        >
          <ul className="fleet__track">
            {FLEET.map((item, i) => (
              <Reveal as="li" key={item.id} className="fleet__card" delay={i * 90} threshold={0.01}>
                <div className={`fleet__media${item.studio ? ' fleet__media--studio' : ''}`}>
                  <span className="fleet__tag">{item.tag}</span>
                  <FleetVisual item={item} />
                </div>
                <div className="fleet__body">
                  <span className="fleet__idx">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{item.name}</h3>
                  <p>{item.copy}</p>
                  <ul className="fleet__specs">
                    {item.specs.map((s) => (
                      <li key={s}>
                        <Icon name="check" size={16} strokeWidth={2.4} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {pos.max > 0 && (
          <div className="fleet__dots" role="group" aria-label="Choose a slide">
            {Array.from({ length: pos.max + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                className={pos.index === i ? 'is-active' : ''}
                aria-label={`Show slide ${i + 1} of ${pos.max + 1}`}
                aria-current={pos.index === i}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
