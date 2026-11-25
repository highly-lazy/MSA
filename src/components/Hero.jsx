import { Link } from 'react-router-dom'
import { CONTACT, IMAGES, sectionLink } from '../data/company'
import Icon from './Icon'

const CHIPS = [
  { k: 'Authority', v: CONTACT.dot },
  { k: 'Motor Carrier', v: CONTACT.mc },
  { k: 'Operating since', v: CONTACT.founded },
  { k: 'Fleet', v: '40+ units' },
]

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__media">
        <img
          src={IMAGES.hero}
          srcSet={`${IMAGES.heroSmall} 760w, ${IMAGES.hero} 1300w`}
          sizes="(max-width: 979px) 100vw, 56vw"
          alt="MSA Transportation Unit 042, a white Volvo VNL with the company name, MC and USDOT numbers on the door"
          width="1300"
          height="1355"
          fetchPriority="high"
          decoding="async"
        />
        <p className="hero__tag">
          <strong>Unit 042</strong> On the road with MSA
        </p>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">Dry Van · Reefer · Power Only · Jamison, PA</p>

          <h1 id="hero-title" className="hero__title">
            <span className="hero__line"><span>Moving Freight.</span></span>
            <span className="hero__line hero__line--accent"><span>Building Trust.</span></span>
          </h1>

          <p className="hero__lede">
            Asset-based truckload carrier running dry van, reefer and power only across the
            48 states. Experienced drivers, maintained equipment and dispatchers who pick up.
          </p>

          <div className="hero__ctas">
            <Link to={sectionLink('quote')} className="btn btn--primary btn--lg">
              Get a Quote <Icon name="arrow" size={18} />
            </Link>
            <Link to={sectionLink('drivers')} className="btn btn--ghost btn--lg">
              Drive for MSA
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
      </div>
    </section>
  )
}
