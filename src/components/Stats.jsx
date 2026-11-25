import { STATS } from '../data/company'
import useInView from '../hooks/useInView'
import useCountUp from '../hooks/useCountUp'

// Only verified figures are shown; a stat with `value: null` stays hidden until it is filled in.
const VISIBLE_STATS = STATS.filter((s) => s.value != null)

function Stat({ stat, index }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const n = useCountUp(stat.value, inView)
  return (
    <div ref={ref} className={`stat${inView ? ' is-in' : ''}`} style={{ '--d': `${index * 90}ms` }}>
      <strong className="stat__value">{`${n}${stat.suffix}`}</strong>
      <span className="stat__label">{stat.label}</span>
      <span className="stat__note">{stat.note}</span>
    </div>
  )
}

export default function Stats() {
  return (
    <div className="stats" role="list" style={{ '--n': VISIBLE_STATS.length }}>
      {VISIBLE_STATS.map((s, i) => (
        <div role="listitem" key={s.id} className="stats__cell">
          <Stat stat={s} index={i} />
        </div>
      ))}
    </div>
  )
}
