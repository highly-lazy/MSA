import { Link } from 'react-router-dom'
import { IMAGES, sectionLink } from '../data/company'
import Departments from '../components/Departments'
import OwnTrucks from '../components/OwnTrucks'
import PageHero from '../components/PageHero'
import Story from '../components/Story'
import Icon from '../components/Icon'

export default function About() {
  return (
    <>
      <PageHero
        crumb="About"
        title={['A carrier you can', 'get on the phone.']}
        lede="MSA Transportation Inc runs truckload freight from Jamison, Pennsylvania, on its own equipment and under its own authority."
        photo={IMAGES.own035}
        photoAlt="MSA Transportation Unit 035, a white Freightliner Cascadia"
        photoPos="50% 70%"
      >
        <Link to={sectionLink('quote')} className="btn btn--primary btn--lg">
          Get a quote <Icon name="arrow" size={18} />
        </Link>
        <Link to={sectionLink('trucks')} className="btn btn--ghost btn--lg">See our trucks</Link>
      </PageHero>
      <Story />
      <OwnTrucks />
      <Departments />
    </>
  )
}
