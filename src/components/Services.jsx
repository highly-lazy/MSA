import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMAGES } from '../data/company'
import { SERVICES } from '../data/operations'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Art from './Art'
import Icon from './Icon'
import useDragScroll from '../hooks/useDragScroll'

export default function Services() {
  const [active, setActive] = useState(0)
  const tabs = useRef(null)
  useDragScroll(tabs)
  const s = SERVICES[active]

  return (
    <section className="section section--light services" id="services" data-nav="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHead
          id="services-title"
          tone="light"
          eyebrow="What we haul"
          title={['Freight, handled', 'like it matters.']}
          lede="Five ways to move with MSA. Pick the one that fits your freight — or tell us about your lane and we will build around it."
        />

        <Reveal className="showcase" variant="scale">
          <div className="showcase__tabs" ref={tabs} role="tablist" aria-label="Services">
            {SERVICES.map((item, i) => (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-controls={`panel-${item.id}`}
                className={`showcase__tab${active === i ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="showcase__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="showcase__name">{item.title}</span>
                <Icon name="arrow" size={18} />
              </button>
            ))}
          </div>

          <div
            key={s.id}
            id={`panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${s.id}`}
            className="showcase__panel"
          >
            <div className="showcase__art">
              {s.image ? (
                <div className="showcase__photo">
                  <img src={IMAGES[s.image]} alt={`${s.title} — MSA Transportation equipment`} width="700" height="480" loading="lazy" decoding="async" />
                </div>
              ) : (
                <Art type={s.art} />
              )}
              <span className="showcase__ghost" aria-hidden="true">{String(active + 1).padStart(2, '0')}</span>
            </div>
            <div className="showcase__body">
              <p className="showcase__tag">{s.tagline}</p>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
              <p className="showcase__benefit">
                <Icon name="check" size={18} strokeWidth={2.4} />
                {s.benefit}
              </p>
              <Link to={{ pathname: '/', hash: '#quote' }} className="btn btn--primary">
                Get a quote
                <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
