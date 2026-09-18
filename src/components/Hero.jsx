import { Link } from 'react-router-dom'
import HeroQuoteCard from './HeroQuoteCard'
import { IMAGES } from '../constants'

function RevealWords({ text, startDelay = 0 }) {
  const words = text.split(' ')
  return words.map((word, i) => (
    <span className="hero-word" key={`${word}-${i}`}>
      <span className="hero-word__inner" style={{ animationDelay: `${startDelay + i * 70}ms` }}>
        {word}
        {i < words.length - 1 ? ' ' : ''}
      </span>
    </span>
  ))
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <img
          src={IMAGES.hero}
          alt="MSA Transportation Freightliner Cascadia hauling freight on a US highway"
          loading="eager"
        />
        <div className="hero__scrim" />
        <div className="route-lines" />
      </div>

      <div className="hero__content container">
        <div className="hero__grid">
          <div className="hero__copy">
            <p className="eyebrow-line eyebrow-line--light hero__in" style={{ animationDelay: '0ms' }}>
              MSA Transportation Inc · Interstate Carrier
            </p>
            <h1>
              <span className="hero__title-line"><RevealWords text="Delivering excellence." startDelay={120} /></span>
              <br />
              <span className="hero__title-line"><RevealWords text="Driving trust." startDelay={360} /></span>
            </h1>
            <p className="hero__lede hero__in" style={{ animationDelay: '560ms' }}>
              Dry van and refrigerated truckload service, run under our own
              authority since 2020. From pallets to full truckloads, MSA
              Transportation moves it on time — with drivers who treat your load
              like their own.
            </p>
            <div className="hero__actions hero__in" style={{ animationDelay: '640ms' }}>
              <Link to="/services" className="btn btn--primary btn--arrow">Get a Quote <span className="btn__arrow">&rarr;</span></Link>
              <Link to="/careers" className="btn btn--outline btn--arrow">Join Our Team <span className="btn__arrow">&rarr;</span></Link>
            </div>
          </div>

          <div className="hero__quote-wrap hero__in" style={{ animationDelay: '460ms' }}>
            <HeroQuoteCard />
          </div>
        </div>
      </div>
    </section>
  )
}
