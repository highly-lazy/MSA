export const IMAGES = {
  // Freightliner Cascadia — hero banner (Wikimedia Commons, MotoJo321, CC BY-SA 4.0)
  hero: '/images/hero-cascadia.jpg',
  // Blue Kenworth tractor pulling a trailer at golden hour — services / coverage banner
  services: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?fm=jpg&q=80&w=2400&auto=format&fit=crop',
  // Tractor-trailer on a mountain highway — fleet / equipment feature
  fleet: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?fm=jpg&q=80&w=2200&auto=format&fit=crop',
  // Dry van trailer at dusk — equipment detail
  trailer: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?fm=jpg&q=80&w=2000&auto=format&fit=crop',
  // Driver in the cab of a truck — careers banner
  driver: 'https://images.unsplash.com/photo-1574757974346-45bae947d89a?fm=jpg&q=80&w=2200&auto=format&fit=crop',
  // Rows of trailers staged at a loading dock — operations
  dock: 'https://images.unsplash.com/photo-1720811559371-7b0ebd219127?fm=jpg&q=80&w=2000&auto=format&fit=crop',
  // Mechanic servicing an engine — fleet maintenance
  maintenance: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?fm=jpg&q=80&w=1600&auto=format&fit=crop',
}

// Public record: FMCSA / USDOT (USDOT 3498597, MC-1153963), filed May 2022.
// Fleet size confirmed directly by the company (40+ trucks/trailers).
// TODO: dispatch/recruiting emails below are placeholders — swap in the
// company's real business inboxes before publishing.
export const CONTACT = {
  phone: '(267) 251-7878',
  phoneHref: '+12672517878',
  email: 'dispatch@msatransportationinc.com',
  recruiting: 'careers@msatransportationinc.com',
  address: '341 Date St, Warminster, PA 18974',
  mc: 'MC-1153963',
  dot: 'USDOT 3498597',
  founded: '2020',
  mapEmbedSrc: 'https://www.google.com/maps?q=341+Date+St,+Warminster,+PA+18974&output=embed&hl=en',
  mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=341+Date+St,+Warminster,+PA+18974',
}

export const COMPANY_STATS = [
  { value: '2020', label: 'Operating since' },
  { value: '40+', label: 'Tractors & trailers' },
  { value: '48', label: 'States served' },
  { value: '100%', label: 'Licensed & insured' },
]

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
]
