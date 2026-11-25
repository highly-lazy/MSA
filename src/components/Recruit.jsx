import { CONTACT, mailto } from '../data/company'
import { DRIVER_INFO, DRIVER_REQUIREMENTS } from '../data/operations'
import { ApplicationForm } from './Forms'
import Reveal from './Reveal'
import Icon from './Icon'

// Items still waiting on real details (`copy: null`) stay hidden; `todo` notes are never shown publicly.
const VISIBLE_INFO = DRIVER_INFO.filter((d) => d.copy)

export default function Recruit() {
  return (
    <section className="section section--brand recruit" id="drivers" data-nav="drivers" aria-labelledby="recruit-title">
      <div className="recruit__bg" aria-hidden="true" />
      <div className="container recruit__grid">
        <div className="recruit__copy">
          <Reveal>
            <p className="eyebrow">Now hiring</p>
            <h2 id="recruit-title" className="display display--xl">
              <span>Ready to drive</span>
              <span className="display__accent">with MSA?</span>
            </h2>
            <p className="lede">
              Join a team that values experience, safety, communication and professional drivers.
              Company driver or owner operator — we keep the freight steady and the respect mutual.
            </p>
            <a href="#apply-form" className="btn btn--primary btn--lg">
              Apply now <Icon name="arrow" size={18} />
            </a>
            <p className="recruit__contact">
              Rather talk first? Call <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a> or email{' '}
              <a href={mailto({ to: CONTACT.recruiting, subject: 'Driver inquiry' })}>{CONTACT.recruiting}</a>.
            </p>
          </Reveal>

          <Reveal delay={120} className="recruit__reqs">
            <h3>What it takes</h3>
            <ul>
              {DRIVER_REQUIREMENTS.map((r) => (
                <li key={r}>
                  <Icon name="check" size={18} strokeWidth={2.4} />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>

          <ul className="recruit__info">
            {VISIBLE_INFO.map((d, i) => (
              <Reveal as="li" key={d.title} delay={(i % 2) * 90}>
                <Icon name={d.icon} size={22} />
                <div>
                  <h4>{d.title}</h4>
                  <p>{d.copy}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="recruit__form" variant="left" delay={100} id="apply">
          <ApplicationForm />
        </Reveal>
      </div>
    </section>
  )
}
