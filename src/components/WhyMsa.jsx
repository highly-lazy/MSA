import { Link } from 'react-router-dom'
import { IMAGES, sectionLink } from '../data/company'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Stats from './Stats'
import Icon from './Icon'

const LINKS = [
  { id: 'about', icon: 'route', title: 'Who we are', copy: 'A truckload carrier based in Jamison, PA and operating since 2020.' },
  { id: 'safety', icon: 'shield', title: 'How we keep it safe', copy: 'Inspections, maintenance, driver qualification and Hours of Service.' },
  { id: 'brokers', icon: 'doc', title: 'Set us up as a carrier', copy: 'MC, USDOT and FMCSA record in one place, with setup documents by email.' },
]

// Home page summary of the inner pages: verified numbers plus a way into each one.
export default function WhyMsa() {
  return (
    <section className="section section--light why" data-nav="" aria-labelledby="why-title">
      <div className="container why__grid">
        <Reveal className="why__photo" variant="scale">
          <img
            src={IMAGES.own035}
            srcSet={`${IMAGES.own035Small} 480w, ${IMAGES.own035} 806w`}
            sizes="(max-width: 900px) 92vw, 520px"
            alt="MSA Transportation Unit 035, a white Freightliner Cascadia staged with its trailer"
            width="813"
            height="971"
            loading="lazy"
            decoding="async"
          />
          <p className="hero__tag"><strong>Unit 035</strong> Freightliner Cascadia</p>
        </Reveal>
        <div>
          <SectionHead
            id="why-title"
            tone="light"
            eyebrow="Why MSA"
            title={['Our trucks.', 'Our name on the door.']}
            lede="The carrier you book is the carrier that shows up. One dispatch team, one phone number, pickup to proof of delivery."
          />
          <ul className="why__links">
            {LINKS.map((l, i) => (
              <Reveal as="li" key={l.id} delay={i * 80}>
                <Link to={sectionLink(l.id)}>
                  <span className="why__icon"><Icon name={l.icon} size={22} /></span>
                  <span>
                    <strong>{l.title}</strong>
                    <small>{l.copy}</small>
                  </span>
                  <Icon name="arrow" size={18} />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
      <div className="container">
        <Stats />
      </div>
    </section>
  )
}
