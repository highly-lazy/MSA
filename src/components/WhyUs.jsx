import { WHY_POINTS } from '../content'
import { IMAGES } from '../constants'

export default function WhyUs() {
  return (
    <section className="section why-us">
      <div className="why-us__media">
        <img src={IMAGES.dock} alt="" loading="lazy" aria-hidden="true" />
        <div className="why-us__scrim" />
      </div>
      <div className="container why-us__grid">
        <div className="why-us__intro">
          <p className="eyebrow-line eyebrow-line--light">Why shippers choose MSA</p>
          <h2>Excellence isn&rsquo;t a slogan here. It&rsquo;s the standard.</h2>
          <p>
            MSA Transportation Inc was built on a simple idea: freight
            partners deserve a carrier that shows up, communicates, and
            delivers without excuses. That&rsquo;s what &ldquo;Delivering
            Excellence. Driving Trust.&rdquo; means to us.
          </p>
        </div>

        <ul className="why-us__list">
          {WHY_POINTS.map((p) => (
            <li key={p.title}>
              <span className="why-us__mark" aria-hidden="true" />
              <div>
                <h3>{p.title}</h3>
                <p>{p.copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
