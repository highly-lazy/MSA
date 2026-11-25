import { Link } from 'react-router-dom'
import { sectionLink } from '../data/company'
import { AUDIENCES } from '../data/operations'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Icon from './Icon'

// Sends each kind of visitor to the part of the site built for them.
export default function Paths() {
  return (
    <section className="section section--paper paths" aria-labelledby="paths-title">
      <div className="container">
        <SectionHead id="paths-title" tone="light" eyebrow="Start here" title={['One carrier.', 'Three ways in.']} />
        <ul className="paths__grid">
          {AUDIENCES.map((a, i) => (
            <Reveal as="li" key={a.id} className={`path path--${a.id}`} delay={i * 100}>
              <span className="path__icon"><Icon name={a.icon} size={26} /></span>
              <p className="path__kicker">{a.kicker}</p>
              <h3>{a.title}</h3>
              <p className="path__copy">{a.copy}</p>
              <ul className="path__points">
                {a.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" size={17} strokeWidth={2.4} />
                    {p}
                  </li>
                ))}
              </ul>
              <Link to={sectionLink(a.cta.section)} className="path__cta">
                {a.cta.label} <Icon name="arrow" size={18} />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
