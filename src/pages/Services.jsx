import PageHero from '../components/PageHero'
import QuoteForm from '../components/QuoteForm'
import CTABand from '../components/CTABand'
import FAQ from '../components/FAQ'
import Reveal from '../components/Reveal'
import { SERVICES, FLEET_SPECS, FAQ_SHIPPERS } from '../content'
import { IMAGES } from '../constants'

export default function Services() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="What we haul"
        title="Truckload freight, handled right"
        lede="Dry van and refrigerated (reefer) truckload service, run under our own MC & USDOT authority."
        image={IMAGES.services}
        alt="MSA Transportation tractor-trailer on the highway at golden hour"
      />

      <section className="section">
        <div className="container split split--reverse split--center">
          <div className="split__media">
            <img src={IMAGES.trailer} alt="MSA Transportation dry van trailer at dusk" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow-line">Our services</p>
            <h2>Four ways we move your freight</h2>
            <p className="section__lede">
              Every load gets the same standard: on-time pickup, careful
              handling and a dispatch team that answers the phone.
            </p>

            <div className="service-detail-list">
              {SERVICES.map((s) => (
                <div key={s.slug} className="service-detail">
                  <span className="service-detail__icon" style={{ '--accent': s.accent }}>{s.icon}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container split split--center">
          <div className="split__media">
            <img src={IMAGES.fleet} alt="MSA Transportation tractor pulling a trailer at golden hour" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow-line">Our equipment</p>
            <h2>A fleet built to keep freight moving</h2>
            <p>
              We invest in equipment because breakdowns cost our customers
              time and money. Across 40+ tractors, dry van and reefer
              trailers, everything is maintained on a strict schedule, so
              your freight moves without excuses.
            </p>

            <div className="fleet-specs">
              {FLEET_SPECS.map(([label, copy]) => (
                <div key={label}>
                  <h3>{label}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--panel">
        <div className="container split">
          <div>
            <p className="eyebrow-line">Get a rate</p>
            <h2>Request a quote</h2>
            <p className="section__lede">
              Give us the lane and the load — our dispatch team will get
              back to you with pricing, usually the same business day.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow-line">Questions shippers ask</p>
            <h2>Shipping FAQ</h2>
          </Reveal>
          <Reveal delay={100} style={{ maxWidth: 780 }}>
            <FAQ items={FAQ_SHIPPERS} />
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
