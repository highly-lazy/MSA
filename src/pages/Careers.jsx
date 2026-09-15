import PageHero from '../components/PageHero'
import ApplicationForm from '../components/ApplicationForm'
import FAQ from '../components/FAQ'
import Reveal from '../components/Reveal'
import { CAREER_TRACKS, DRIVER_REQUIREMENTS, FAQ_DRIVERS } from '../content'
import { IMAGES } from '../constants'

export default function Careers() {
  return (
    <>
      <PageHero
        crumb="Careers"
        eyebrow="Drive with MSA"
        title="We're hiring company drivers & owner operators"
        lede="Whether you run under our name or your own authority, we keep the freight consistent and the respect mutual."
        image={IMAGES.driver}
        alt="MSA Transportation driver in the cab of a company truck"
      />

      <section className="section section--textured">
        <div className="route-lines route-lines--dark" />
        <div className="container">
          <p className="eyebrow-line">Two ways to drive</p>
          <h2>Find the track that fits you</h2>

          <div className="careers__tracks">
            {CAREER_TRACKS.map((t) => (
              <div key={t.title} className="careers__track">
                <h3>{t.title}</h3>
                <ul>
                  {t.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--panel">
        <div className="container split split--center">
          <div>
            <p className="eyebrow-line">What it takes</p>
            <h2>Driver requirements</h2>
            <p className="section__lede">
              We keep the bar simple and the standards real — here&rsquo;s
              what we look for before you get behind the wheel for us.
            </p>
            <ul className="requirements-list">
              {DRIVER_REQUIREMENTS.map((r) => (
                <li key={r}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="split__media">
            <img src={IMAGES.maintenance} alt="Fleet maintenance keeping MSA Transportation trucks road-ready" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container split">
          <div>
            <p className="eyebrow-line">Ready to roll</p>
            <h2>Apply to drive</h2>
            <p className="section__lede">
              Fill out the form and our recruiting team will call you back —
              usually the same day.
            </p>
          </div>
          <ApplicationForm />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow-line">Questions drivers ask</p>
            <h2>Driver FAQ</h2>
          </Reveal>
          <Reveal delay={100} style={{ maxWidth: 780 }}>
            <FAQ items={FAQ_DRIVERS} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
