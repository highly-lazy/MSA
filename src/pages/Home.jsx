import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import Story from '../components/Story'
import OwnTrucks from '../components/OwnTrucks'
import Safety from '../components/Safety'
import Services from '../components/Services'
import Fleet from '../components/Fleet'
import Process from '../components/Process'
import InlineCta from '../components/InlineCta'
import Departments from '../components/Departments'
import People from '../components/People'
import Coverage from '../components/Coverage'
import Partner from '../components/Partner'
import Recruit from '../components/Recruit'
import FAQ from '../components/FAQ'
import Quote from '../components/Quote'
import QuickQuote from '../components/QuickQuote'
import MotionBand from '../components/MotionBand'
import Seasons from '../components/Seasons'

// Visitor journey: WOW → TRUST → EXPERIENCE → PEOPLE → SAFETY → SERVICES → PROCESS → PROOF → CTA
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <QuickQuote />
      <Story />
      <MotionBand />
      <OwnTrucks />
      <Safety />
      <Services />
      <Fleet />
      <Process />
      <InlineCta title="Freight ready to roll?" text="Send us the lane. We'll show you how we'd move it." />
      <Departments />
      <People />
      <Coverage />
      <Seasons />
      <Partner />
      <Recruit />
      <FAQ />
      <Quote />
    </>
  )
}
