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
import Coverage from '../components/Coverage'
import Partner from '../components/Partner'
import Recruit from '../components/Recruit'
import FAQ from '../components/FAQ'
import Quote from '../components/Quote'
import QuickQuote from '../components/QuickQuote'
import Paths from '../components/Paths'
import CarrierPacket from '../components/CarrierPacket'
import MotionBand from '../components/MotionBand'

// Visitor journey: offer and rate → who are you → what we haul → how it works → why trust us → set up, apply, quote
export default function Home() {
  return (
    <>
      <Hero />
      <QuickQuote />
      <TrustStrip />
      <Paths />
      <Services />
      <Fleet />
      <Process />
      <InlineCta title="Freight ready to roll?" text="Send us the lane. We'll show you how we'd move it." />
      <Departments />
      <Coverage />
      <Story />
      <OwnTrucks />
      <Safety />
      <Partner />
      <CarrierPacket />
      <MotionBand />
      <Recruit />
      <FAQ />
      <Quote />
    </>
  )
}
