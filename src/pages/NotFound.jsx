import { Link } from 'react-router-dom'
import { CONTACT, sectionLink } from '../data/company'
import PageHero from '../components/PageHero'
import Icon from '../components/Icon'

export default function NotFound() {
  return (
    <PageHero
      crumb="Page not found"
      title={['Wrong exit.', 'Let’s get you back.']}
      lede="That page doesn't exist or has moved. Head home, or call dispatch and we'll point you the right way."
    >
      <Link to="/" className="btn btn--primary btn--lg">Back to home</Link>
      <Link to={sectionLink('quote')} className="btn btn--ghost btn--lg">Get a quote</Link>
      <a href={`tel:${CONTACT.phoneHref}`} className="btn btn--ghost btn--lg">
        <Icon name="phone" size={18} /> {CONTACT.phone}
      </a>
    </PageHero>
  )
}
