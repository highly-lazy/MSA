import { useState } from 'react'
import { IMAGES } from '../data/company'
import { SAFETY_HOTSPOTS, SAFETY_INDICATORS, SAFETY_PILLARS } from '../data/operations'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Icon from './Icon'

export default function Safety() {
  const [active, setActive] = useState(SAFETY_HOTSPOTS[0].id)
  const current = SAFETY_HOTSPOTS.find((h) => h.id === active)

  return (
    <section className="section section--ink safety" id="safety" data-nav="safety" aria-labelledby="safety-title">
      <div className="container">
        <SectionHead
          id="safety-title"
          eyebrow="Safety & compliance"
          title={["Safety Isn't a Policy.", "It's Our Standard."]}
          lede="Safe freight is the result of a hundred small habits done the same way every day — starting with a walk-around before the wheels ever turn."
        />

        <div className="safety__grid">
          <Reveal className="safety__scan" variant="scale">
            <div className="safety__photo">
              <img
                src={IMAGES.safetyTruck}
                sizes="(max-width: 1000px) 94vw, 720px"
                alt="MSA tractor with hotspots marking the walk-around inspection points"
                width="1023"
                height="637"
                loading="lazy"
                decoding="async"
              />
              <span className="safety__sweep" aria-hidden="true" />
              {SAFETY_HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  className={`hotspot${active === h.id ? ' is-active' : ''}`}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  onClick={() => setActive(h.id)}
                  onMouseEnter={() => setActive(h.id)}
                  onFocus={() => setActive(h.id)}
                  aria-label={h.label}
                  aria-pressed={active === h.id}
                >
                  <span className="hotspot__pulse" />
                  <span className="hotspot__dot" />
                </button>
              ))}
            </div>
            <div className="safety__readout" aria-live="polite">
              <small>Walk-around checkpoint</small>
              <strong key={current.id}>{current.label}</strong>
              <span key={current.id + 'c'}>{current.copy}</span>
            </div>
          </Reveal>

          <div className="safety__side">
            <ul className="safety__checks">
              {SAFETY_INDICATORS.map((t, i) => (
                <Reveal as="li" key={t} delay={i * 110} variant="right">
                  <span className="check">
                    <Icon name="check" size={18} strokeWidth={2.4} />
                  </span>
                  {t}
                </Reveal>
              ))}
            </ul>
            <Reveal className="safety__quote" delay={200}>
              Every driver, every trailer, every trip — the same disciplined checklist.
            </Reveal>
          </div>
        </div>

        <ul className="pillars">
          {SAFETY_PILLARS.map((p, i) => (
            <Reveal as="li" key={p.title} className="pillar" delay={(i % 5) * 70}>
              <Icon name={p.icon} size={26} />
              <span>{p.title}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
