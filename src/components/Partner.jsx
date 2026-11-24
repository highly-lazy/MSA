import { PARTNER_PROMISES, TESTIMONIALS } from '../data/operations'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Icon from './Icon'

// Placeholder testimonials are never shown publicly; the block appears once a real one is added.
const REAL_TESTIMONIALS = TESTIMONIALS.filter((t) => !t.placeholder)

export default function Partner() {
  return (
    <section className="section section--paper partner" id="partner" aria-labelledby="partner-title">
      <div className="container">
        <SectionHead
          id="partner-title"
          tone="light"
          eyebrow="For shippers & brokers"
          title={['A transportation partner', 'you can count on.']}
          lede="What you should expect from a carrier — and what you get from MSA on every load."
        />

        <ul className="promises">
          {PARTNER_PROMISES.map((p, i) => (
            <Reveal as="li" key={p.title} className="promise" delay={(i % 4) * 90}>
              <span className="promise__icon"><Icon name={p.icon} size={24} /></span>
              <h3>{p.title}</h3>
              <p>{p.copy}</p>
            </Reveal>
          ))}
        </ul>

        {REAL_TESTIMONIALS.length > 0 && (
        <div className="proof">
          <Reveal className="proof__head">
            <p className="eyebrow">In their words</p>
          </Reveal>
          <ul className="proof__grid">
            {REAL_TESTIMONIALS.map((t, i) => (
              <Reveal as="li" key={i} className="quote" delay={i * 110}>
                <span className="quote__mark" aria-hidden="true">&ldquo;</span>
                <blockquote>{t.quote}</blockquote>
                <footer>
                  <span className="quote__avatar" aria-hidden="true"><Icon name="user" size={20} /></span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </span>
                </footer>
              </Reveal>
            ))}
          </ul>
        </div>
        )}
      </div>
    </section>
  )
}
