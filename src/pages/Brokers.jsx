import { CONTACT } from '../data/company'
import CarrierPacket from '../components/CarrierPacket'
import FAQ from '../components/FAQ'
import InlineCta from '../components/InlineCta'
import PageHero from '../components/PageHero'
import Partner from '../components/Partner'
import Icon from '../components/Icon'

export default function Brokers() {
  return (
    <>
      <PageHero
        crumb="Brokers"
        title={['Set us up.', 'Book the load.']}
        lede="Everything your onboarding team asks for, in one place. Copy the numbers, check our record with FMCSA, and request the rest by email."
      >
        <a href={`tel:${CONTACT.phoneHref}`} className="btn btn--primary btn--lg">
          <Icon name="phone" size={18} /> {CONTACT.phone}
        </a>
      </PageHero>
      <CarrierPacket headless />
      <Partner />
      <InlineCta title="Got a load to cover?" text="Send us the lane, equipment and pickup date." />
      <FAQ audience="shippers" />
    </>
  )
}
