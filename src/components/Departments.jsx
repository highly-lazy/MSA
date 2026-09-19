import { useState } from 'react'
import { DEPARTMENTS } from '../data/people'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Icon from './Icon'

// Interactive accordion: horizontal strips that expand on desktop, stacked rows on mobile.
// Hover, focus or tap opens a department.
export default function Departments() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section section--dark depts" id="team" data-nav="team" aria-labelledby="depts-title">
      <div className="container">
        <SectionHead
          id="depts-title"
          eyebrow="The team behind every load"
          title={['Not just a truck', 'and a driver.']}
          lede="A professional carrier is a whole operation. These are the teams that keep freight moving, drivers supported and customers informed."
        />

        <Reveal className="depts__rail" variant="scale">
          {DEPARTMENTS.map((d, i) => {
            const isOpen = open === i
            return (
              <div
                key={d.id}
                className={`dept${isOpen ? ' is-open' : ''}`}
                onMouseEnter={() => window.matchMedia('(hover: hover) and (min-width: 901px)').matches && setOpen(i)}
              >
                <button
                  type="button"
                  className="dept__head"
                  aria-expanded={isOpen}
                  aria-controls={`dept-${d.id}`}
                  id={`dept-h-${d.id}`}
                  onClick={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                >
                  <span className="dept__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="dept__icon"><Icon name={d.icon} size={24} /></span>
                  <span className="dept__name">{d.name}</span>
                  <span className="dept__plus" aria-hidden="true"><Icon name="plus" size={18} /></span>
                </button>
                <div className="dept__panel" id={`dept-${d.id}`} role="region" aria-labelledby={`dept-h-${d.id}`}>
                  <div className="dept__inner">
                    <h3>{d.name}</h3>
                    <p>{d.summary}</p>
                    <ul>
                      {d.points.map((p) => (
                        <li key={p}>
                          <Icon name="check" size={16} strokeWidth={2.4} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
