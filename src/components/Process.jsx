import { PROCESS } from '../data/operations'
import useInView from '../hooks/useInView'
import SectionHead from './SectionHead'
import Icon from './Icon'

export default function Process() {
  const [ref, inView] = useInView({ threshold: 0.25 })

  return (
    <section className="section section--paper process" id="process" aria-labelledby="process-title">
      <div className="container">
        <SectionHead
          id="process-title"
          tone="light"
          eyebrow="How it works"
          title={['How we move', 'your freight.']}
          lede="Six steps from request to confirmation — and a real person at every one of them."
        />

        <div ref={ref} className={`timeline${inView ? ' is-in' : ''}`}>
          <div className="timeline__rail" aria-hidden="true">
            <span className="timeline__fill" />
            <span className="timeline__truck"><Icon name="truck" size={22} /></span>
          </div>
          <ol className="timeline__steps">
            {PROCESS.map((p, i) => (
              <li key={p.step} style={{ '--i': i }}>
                <span className="timeline__node" aria-hidden="true">{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
