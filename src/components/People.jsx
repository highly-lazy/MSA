import { LEADERS } from '../data/people'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Icon from './Icon'

// Leadership & operations faces. Placeholder portraits until real photos are added.
export default function People() {
  return (
    <section className="section section--light people" id="people" aria-labelledby="people-title">
      <div className="container">
        <SectionHead
          id="people-title"
          tone="light"
          eyebrow="Real people"
          title={['Faces you will', 'actually talk to.']}
          lede="When you call MSA, someone who knows the operation answers. Meet the people who run it."
        />
        <ul className="people__grid">
          {LEADERS.map((p, i) => (
            <Reveal as="li" key={p.role} className={`person${i === 0 ? ' person--lead' : ''}`} delay={i * 100}>
              <div className="person__photo">
                {p.photo ? (
                  <img src={p.photo} alt={`${p.name}, ${p.role}`} loading="lazy" width="480" height="560" />
                ) : (
                  <span className="person__placeholder" aria-hidden="true"><Icon name="user" size={96} strokeWidth={1} /></span>
                )}
                <span className="person__role">{p.role}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.blurb}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
