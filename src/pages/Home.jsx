import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import TrustFeatures from '../components/TrustFeatures'
import ServicesPreview from '../components/ServicesPreview'
import RouteDivider from '../components/RouteDivider'
import WhyUs from '../components/WhyUs'
import StatesCoverage from '../components/StatesCoverage'
import CTABand from '../components/CTABand'
import Reveal from '../components/Reveal'
import { CONTACT, IMAGES } from '../constants'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <TrustFeatures />
      <ServicesPreview />
      <RouteDivider />
      <WhyUs />

      <section className="section section--panel">
        <div className="container split">
          <Reveal>
            <p className="eyebrow-line">About MSA Transportation</p>
            <h2>A carrier built on reliability, safety and straight talk</h2>
            <p>
              MSA Transportation Inc is a Warminster, PA-based truckload
              carrier specializing in dry van and refrigerated (reefer) trucking.
              We work with shippers and brokers who need capacity they can
              count on — clear communication, careful handling and freight
              that arrives when it&rsquo;s supposed to.
            </p>
            <p>
              Every load runs under our own authority, with our own
              equipment and our own drivers holding the wheel. No games, no
              surprises — just excellence, delivered.
            </p>

            <div className="about__creds">
              <div>
                <span className="about__creds-label">Motor Carrier</span>
                <strong>{CONTACT.mc}</strong>
              </div>
              <div>
                <span className="about__creds-label">DOT Number</span>
                <strong>{CONTACT.dot}</strong>
              </div>
            </div>

            <p style={{ marginTop: 28 }}>
              <Link to="/services" className="btn btn--ghost">Explore our services</Link>
            </p>
          </Reveal>

          <Reveal delay={120} className="split__media">
            <img src={IMAGES.services} alt="MSA Transportation tractor-trailer on the highway at golden hour" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <StatesCoverage />

      <CTABand />
    </>
  )
}
