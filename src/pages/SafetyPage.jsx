import { Link } from 'react-router-dom'
import { CONTACT, sectionLink } from '../data/company'
import InlineCta from '../components/InlineCta'
import PageHero from '../components/PageHero'
import Safety from '../components/Safety'
import Icon from '../components/Icon'

export default function SafetyPage() {
  return (
    <>
      <PageHero
        crumb="Safety"
        title={["Safety isn't a policy.", "It's our standard."]}
        lede="Safe freight is the result of a hundred small habits done the same way every day, starting with a walk-around before the wheels ever turn."
      >
        <a href={CONTACT.saferUrl} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
          See our FMCSA record <Icon name="external" size={18} />
        </a>
        <Link to={sectionLink('brokers')} className="btn btn--ghost btn--lg">Carrier setup</Link>
      </PageHero>
      <Safety headless />
      <InlineCta title="Freight ready to roll?" text="Send us the lane. We'll show you how we'd move it." />
    </>
  )
}
