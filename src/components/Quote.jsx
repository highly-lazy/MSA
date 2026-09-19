import { CONTACT } from '../data/company'
import { QuoteForm } from './Forms'
import Reveal from './Reveal'
import Icon from './Icon'

export default function Quote() {
  return (
    <section className="section section--ink quote-section" id="quote" aria-labelledby="quote-title">
      <div className="quote-section__glow" aria-hidden="true" />
      <div className="container quote-section__grid">
        <div className="quote-section__copy" id="contact" data-nav="contact">
          <Reveal>
            <p className="eyebrow">For shippers &amp; brokers</p>
            <h2 id="quote-title" className="display display--xl">
              <span>Have freight</span>
              <span className="display__accent">to move?</span>
            </h2>
            <p className="lede">Let&rsquo;s get your load moving. Send us the lane and a real person will get back to you with pricing.</p>
            <div className="quote-section__ctas">
              <a href="#quote-form" className="btn btn--primary btn--lg">
                Request a quote <Icon name="arrow" size={18} />
              </a>
              <a href={`tel:${CONTACT.phoneHref}`} className="btn btn--ghost btn--lg">
                <Icon name="phone" size={18} /> Contact operations
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="contact-list">
              <li>
                <Icon name="phone" size={20} />
                <span><small>Dispatch</small><a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a></span>
              </li>
              <li>
                <Icon name="mail" size={20} />
                <span><small>Email</small><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></span>
              </li>
              <li>
                <Icon name="pin" size={20} />
                <span><small>Office</small><a href={CONTACT.mapDirectionsUrl} target="_blank" rel="noreferrer">{CONTACT.address}</a></span>
              </li>
              <li>
                <Icon name="shield" size={20} />
                <span><small>Authority</small>{CONTACT.dot} · {CONTACT.mc}</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal variant="left" delay={100}>
          <QuoteForm />
        </Reveal>
      </div>
    </section>
  )
}
