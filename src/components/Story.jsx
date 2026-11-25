import { Link } from 'react-router-dom'
import { CONTACT, IMAGES } from '../data/company'
import Stats from './Stats'
import Reveal from './Reveal'
import Icon from './Icon'

export default function Story() {
  return (
    <section className="section section--light story" id="about" data-nav="about" aria-labelledby="story-title">
      <div className="container story__grid">
        <div className="story__copy">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 id="story-title" className="display">
              <span>More Than Miles.</span>
              <span className="display__accent">It&rsquo;s About Every Load.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede">
              MSA Transportation Inc is a Jamison, Pennsylvania truckload carrier that
              started running freight in {CONTACT.founded} with a simple idea: treat every
              shipment like it belongs to someone who is counting on it — because it does.
            </p>
            <p>
              Every load moves under our own authority, on our own equipment, with our own
              drivers behind the wheel and a dispatch team that picks up the phone. No games,
              no runaround — clear communication, careful handling and freight that arrives
              when it is supposed to.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <ul className="story__values">
              {[
                ['shield', 'Safety before schedule'],
                ['radio', 'Communication that closes the loop'],
                ['badge', 'Experienced people, not anonymous trucks'],
              ].map(([icon, text]) => (
                <li key={text}>
                  <Icon name={icon} size={20} />
                  {text}
                </li>
              ))}
            </ul>
            <div className="story__cta">
              <Link to={{ pathname: '/', hash: '#quote' }} className="btn btn--dark">
                Work with MSA <Icon name="arrow" size={18} />
              </Link>
              <span className="story__auth">{CONTACT.dot} · {CONTACT.mc}</span>
            </div>
          </Reveal>
        </div>

        <Reveal className="story__visual" variant="scale" delay={120}>
          <div className="story__frame">
            <img
              src={IMAGES.cab042}
              alt="MSA Transportation Unit 042 with the driver waving from the cab"
              width="1000"
              height="1052"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="story__badge">
            <strong>{CONTACT.founded}</strong>
            <span>Year we hit<br />the road</span>
          </div>
          <div className="story__plate" aria-hidden="true">
            <Icon name="route" size={18} /> Jamison, PA
          </div>
        </Reveal>
      </div>

      <div className="container">
        <Stats />
      </div>
    </section>
  )
}
