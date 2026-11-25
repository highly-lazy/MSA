import Hero from '../components/Hero'
import QuickQuote from '../components/QuickQuote'
import TrustStrip from '../components/TrustStrip'
import Paths from '../components/Paths'
import Services from '../components/Services'
import Fleet from '../components/Fleet'
import WhyMsa from '../components/WhyMsa'
import Process from '../components/Process'
import Coverage from '../components/Coverage'
import MotionBand from '../components/MotionBand'
import FAQ from '../components/FAQ'
import Quote from '../components/Quote'

// Visitor journey: offer and rate → who are you → what we haul → why us → how and where → quote.
// Company, safety, broker and driver detail live on their own pages.
export default function Home() {
  return (
    <>
      <Hero />
      <QuickQuote />
      <TrustStrip />
      <Paths />
      <Services />
      <Fleet />
      <WhyMsa />
      <Process />
      <Coverage />
      <MotionBand />
      <FAQ />
      <Quote />
    </>
  )
}
