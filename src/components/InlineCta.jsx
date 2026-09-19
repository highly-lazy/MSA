import { Link } from 'react-router-dom'
import { CONTACT } from '../data/company'
import Reveal from './Reveal'
import Icon from './Icon'

// A compact conversion band placed between story sections.
export default function InlineCta({ title, text, tone = 'brand' }) {
  return (
    <section className={`cta-band cta-band--${tone}`} aria-label="Get started">
      <div className="container">
        <Reveal className="cta-band__inner" variant="scale">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-band__actions">
            <Link to={{ pathname: '/', hash: '#quote' }} className="btn btn--dark btn--lg">
              Get a quote <Icon name="arrow" size={18} />
            </Link>
            <a href={`tel:${CONTACT.phoneHref}`} className="btn btn--outline-dark btn--lg">
              <Icon name="phone" size={18} /> {CONTACT.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
