import { Link } from 'react-router-dom'
import { CONTACT, IMAGES, STATS } from '../data/company'
import useInView from '../hooks/useInView'
import useCountUp from '../hooks/useCountUp'
import Reveal from './Reveal'
import Icon from './Icon'

function Stat({ stat, index }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const n = useCountUp(stat.value, inView)
  const placeholder = stat.value == null
  return (
    <div
      ref={ref}
      className={`stat${placeholder ? ' is-placeholder' : ''}${inView ? ' is-in' : ''}`}
      style={{ '--d': `${index * 90}ms` }}
    >
      <strong className="stat__value" aria-label={placeholder ? `${stat.label}: figure to be added` : undefined}>
        {placeholder ? `XX${stat.suffix}` : `${n}${stat.suffix}`}
      </strong>
      <span className="stat__label">{stat.label}</span>
      <span className="stat__note">{stat.note}</span>
    </div>
  )
}

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
              src={IMAGES.own042}
              srcSet={`${IMAGES.own042Small} 480w, ${IMAGES.own042} 806w`}
              sizes="(max-width: 900px) 92vw, 560px"
              alt="MSA Transportation Unit 042 with the driver waving from the cab"
              width="806"
              height="1027"
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
        <div className="stats" role="list">
          {STATS.map((s, i) => (
            <div role="listitem" key={s.id} className="stats__cell">
              <Stat stat={s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
