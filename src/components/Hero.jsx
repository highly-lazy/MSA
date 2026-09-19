import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT, IMAGES } from '../data/company'
import Icon from './Icon'

const hashLink = (id) => ({ pathname: '/', hash: `#${id}` })

const CHIPS = [
  { k: 'Authority', v: CONTACT.dot },
  { k: 'Motor Carrier', v: CONTACT.mc },
  { k: 'Operating since', v: CONTACT.founded },
  { k: 'Fleet', v: '40+ units' },
]

export default function Hero() {
  const ref = useRef(null)

  // Parallax: scroll drives --sy, pointer drives --px/--py. Only CSS variables
  // change, so layout is never touched and it stays cheap on mobile.
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const set = (k, v) => el.style.setProperty(k, v)
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight)
        set('--sy', (y / window.innerHeight).toFixed(3))
      })
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      set('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
      set('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    const fine = window.matchMedia('(pointer: fine)').matches
    if (fine) el.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      el.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <section className={`hero${IMAGES.heroBg ? ' has-photo' : ''}`} id="top" ref={ref} aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        {IMAGES.heroBg && <img className="hero__photo" src={IMAGES.heroBg} alt="" fetchPriority="high" decoding="async" />}
        <div className="hero__glow" />
        <div className="hero__grid-lines" />
        <div className="hero__skyline" />
        <div className="hero__road">
          <span className="hero__road-dashes" />
        </div>
        <div className="hero__streaks">
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} style={{ '--i': i }} />
          ))}
        </div>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__live" />
            Dry Van · Reefer · Power Only · Jamison, PA
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="hero__line"><span>Moving Freight.</span></span>
            <span className="hero__line hero__line--accent"><span>Building Trust.</span></span>
          </h1>

          <p className="hero__lede">
            Professional transportation solutions powered by experienced drivers, modern
            equipment, and a team committed to delivering every load safely and on time.
          </p>

          <div className="hero__ctas">
            <Link to={hashLink('quote')} className="btn btn--primary btn--lg">
              Get a Quote <Icon name="arrow" size={18} />
            </Link>
            <Link to={hashLink('team')} className="btn btn--ghost btn--lg">
              Meet Our Team
            </Link>
          </div>

          <ul className="hero__chips" aria-label="Company credentials">
            {CHIPS.map((c) => (
              <li key={c.k}>
                <small>{c.k}</small>
                <strong>{c.v}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__stage" aria-hidden="true">
          <div className="hero__halo" />
          <div className="hero__truck">
            <img
              src={IMAGES.truckCutout}
              alt=""
              width="805"
              height="528"
              fetchPriority="high"
              decoding="async"
            />
            <span className="hero__beam" />
          </div>
          <span className="hero__ground" />

          <div className="hero__card hero__card--a">
            <Icon name="shield" size={20} />
            <span><small>Licensed &amp; insured</small>Own MC &amp; USDOT authority</span>
          </div>
          <div className="hero__card hero__card--b">
            <Icon name="radio" size={20} />
            <span><small>Every load tracked</small>Pickup to proof of delivery</span>
          </div>
        </div>
      </div>

      <a href="#trust" className="hero__scroll" aria-label="Scroll to next section">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  )
}
