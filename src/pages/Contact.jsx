import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import { CONTACT, IMAGES } from '../constants'

export default function Contact() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get in touch"
        title="Let's move your freight"
        lede="Reach out for a rate quote, to set up a dedicated lane, or to talk driver openings. We answer the phone."
        image={IMAGES.dock}
        alt="Trailers staged at the MSA Transportation loading dock"
      />

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow-line">Company info</p>
            <h2>Reach dispatch directly</h2>
            <p>
              Whether it&rsquo;s a rate quote, a dedicated lane, or a driver
              application, a real person picks up.
            </p>

            <ul className="contact__details">
              <li>
                <span>Phone</span>
                <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
              </li>
              <li>
                <span>Dispatch email</span>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <span>Address</span>
                <span>{CONTACT.address}</span>
              </li>
              <li>
                <span>Authority</span>
                <span>{CONTACT.mc} · {CONTACT.dot}</span>
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  )
}
