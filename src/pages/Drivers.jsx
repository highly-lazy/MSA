import { CONTACT, IMAGES, mailto } from '../data/company'
import FAQ from '../components/FAQ'
import PageHero from '../components/PageHero'
import Recruit from '../components/Recruit'
import Icon from '../components/Icon'

export default function Drivers() {
  return (
    <>
      <PageHero
        crumb="Drivers"
        title={['Ready to drive', 'with MSA?']}
        lede="Join a team that values experience, safety, communication and professional drivers. Company driver or owner operator, we keep the freight steady and the respect mutual."
        photo={IMAGES.cab042}
        photoAlt="MSA driver waving from the cab of Unit 042"
        photoPos="20% 40%"
      >
        <a href="#apply-form" className="btn btn--primary btn--lg">
          Apply now <Icon name="arrow" size={18} />
        </a>
        <a href={`tel:${CONTACT.phoneHref}`} className="btn btn--ghost btn--lg">
          <Icon name="phone" size={18} /> {CONTACT.phone}
        </a>
        <a href={mailto({ to: CONTACT.recruiting, subject: 'Driver inquiry' })} className="page-hero__mail">
          {CONTACT.recruiting}
        </a>
      </PageHero>
      <Recruit headless />
      <FAQ audience="drivers" />
    </>
  )
}
