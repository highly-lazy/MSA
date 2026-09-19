// Operations content: services, fleet, safety, process, customer promises,
// driver recruiting and FAQ. Only services and equipment MSA actually runs
// (dry van, reefer, power only, dedicated lanes, interstate truckload) are listed.
// Placeholders are marked `null` or written as "[Add …]".

export const SERVICES = [
  {
    id: 'dry-van',
    title: 'Dry Van Freight',
    image: 'trailerDry',
    tagline: 'Clean, dry and secure from dock to dock.',
    copy: "Enclosed 53' air-ride trailers for palletized, boxed and general freight. Every trailer is inspected before it leaves our yard.",
    benefit: 'Freight arrives protected from weather and handling — fewer claims, fewer surprises.',
  },
  {
    id: 'reefer',
    title: 'Refrigerated (Reefer)',
    image: 'trailerReefer',
    tagline: 'Cold-chain freight, watched the whole way.',
    copy: "Temperature-controlled 53' trailers on Carrier units with continuous temperature monitoring, built for produce, dairy and other perishables.",
    benefit: 'Set-point discipline from pickup to delivery so perishable freight stays in range.',
  },
  {
    id: 'power-only',
    title: 'Power Only',
    image: 'tractorVolvo',
    tagline: 'Your trailer. Our tractor and driver.',
    copy: 'We haul power-only loads: you provide the loaded trailer, we provide the tractor and an experienced professional driver to get it where it needs to go.',
    benefit: 'Keep your trailers moving without waiting on a matched truck and trailer — more flexibility, fewer delays.',
  },
  {
    id: 'dedicated',
    title: 'Dedicated Lanes',
    art: 'lane',
    tagline: 'Same lane. Same standard. Every week.',
    copy: 'For shippers on a repeating schedule we assign drivers and equipment to your lane, so pickup and delivery windows stay predictable.',
    benefit: 'Consistent capacity and familiar drivers — no scrambling for a truck each week.',
  },
  {
    id: 'interstate',
    title: 'OTR / Interstate Truckload',
    art: 'road',
    tagline: 'Full truckload across state lines.',
    copy: 'Full truckload service under our own MC and USDOT authority, with dispatch that tracks every load from pickup to proof of delivery.',
    benefit: 'One accountable carrier and one phone number from booking through delivery.',
  },
]

// `image` keys resolve through IMAGES. `studio` = white-background product shot (light panel,
// multiply blend); otherwise the photo fills the card (`pos` = object-position focal point).
export const FLEET = [
  {
    id: 'tractors',
    name: 'Tractors',
    tag: 'Power',
    image: 'own042',
    small: 'own042Small',
    pos: '32% 58%',
    copy: 'Late-model day-cab and sleeper tractors, regularly serviced and inspected.',
    specs: ['Day-cab & sleeper configurations', 'Scheduled preventive maintenance', 'DOT-inspection ready'],
  },
  {
    id: 'dry',
    name: 'Dry Vans',
    tag: "53'",
    image: 'trailerDry',
    studio: true,
    copy: "High-cube 53' enclosed trailers for palletized, boxed and general freight.",
    specs: ["53' high-cube", 'Air-ride suspension', 'Inspected before every run'],
  },
  {
    id: 'reefer',
    name: 'Reefers',
    tag: "53'",
    image: 'trailerReefer',
    studio: true,
    copy: "53' temperature-controlled trailers for produce, dairy and perishables.",
    specs: ['Carrier refrigeration units', 'Continuous temperature monitoring', 'Set-point discipline'],
  },
  {
    id: 'power',
    name: 'Power Only',
    tag: 'PO',
    image: 'tractorVolvo',
    studio: true,
    copy: 'Tractor and driver ready to pull your trailer — power-only loads are part of what we run.',
    specs: ['Experienced professional drivers', 'Late-model, maintained tractors', 'Pickup-to-delivery communication'],
  },
]

// The company's own trucks (public/images/). Add more entries — the gallery grows automatically.
export const OWN_TRUCKS = [
  {
    id: '042',
    image: 'own042',
    small: 'own042Small',
    unit: 'Unit 042',
    title: 'Volvo VNL sleeper',
    caption: 'MSA-marked, with MC and USDOT on the door — ready for the next dispatch.',
    alt: 'MSA Transportation Unit 042, a white Volvo VNL sleeper tractor with the driver waving from the cab window',
  },
  {
    id: '035',
    image: 'own035',
    small: 'own035Small',
    unit: 'Unit 035',
    title: 'Freightliner Cascadia',
    caption: 'Staged at the yard and ready to roll, with trailers lined up behind.',
    alt: 'MSA Transportation Unit 035, a white Freightliner Cascadia tractor with a bull bar under a cloudy sky',
  },
]

// Safety: walk-around hotspots drawn over the unit 035 photo (x/y in % of the image).
export const SAFETY_HOTSPOTS = [
  { id: 'lights', x: 51, y: 59, label: 'Lights & lamps', copy: 'Checked before the wheels turn.' },
  { id: 'mirrors', x: 67, y: 24, label: 'Mirrors & visibility', copy: 'Every angle clear at the start of the day.' },
  { id: 'guard', x: 32, y: 74, label: 'Bumper & front guard', copy: 'Front hardware checked for damage and security.' },
  { id: 'tires', x: 62, y: 72, label: 'Tires & wheels', copy: 'Condition and pressure inspected each trip.' },
  { id: 'coupling', x: 82, y: 33, label: 'Coupling & load security', copy: 'Connections and freight secured before departure.' },
]

export const SAFETY_INDICATORS = [
  'Experienced drivers',
  'Regular equipment inspections',
  'Preventive maintenance',
  'Compliance-focused operations',
  'Real-time communication',
]

export const SAFETY_PILLARS = [
  { icon: 'clipboard', title: 'Pre-trip inspections' },
  { icon: 'wrench', title: 'Preventive maintenance' },
  { icon: 'badge', title: 'Driver qualification' },
  { icon: 'clock', title: 'Hours of Service compliance' },
  { icon: 'eye', title: 'Equipment inspections' },
  { icon: 'lock', title: 'Load security' },
  { icon: 'radio', title: 'Communication' },
  { icon: 'users', title: 'Driver training' },
  { icon: 'shield', title: 'DOT compliance' },
  { icon: 'gauge', title: 'Fleet monitoring' },
]

// Copy is about approach, not claims: no specific weather policies are promised.
export const SEASONS = [
  { id: 'spring', name: 'Spring', title: 'Fresh starts, wet roads', copy: 'Rain and shifting conditions call for disciplined pre-trips and steady contact with dispatch.' },
  { id: 'summer', name: 'Summer', title: 'Long days, long lanes', copy: 'Heavy schedules and hot equipment — inspections and driver focus stay exactly the same.' },
  { id: 'autumn', name: 'Autumn', title: 'Leaves down, guard up', copy: 'Shorter days and slick shoulders. We plan the run around them, not the other way around.' },
  { id: 'winter', name: 'Winter', title: 'Snow does not move the standard', copy: 'Weather-aware planning and constant communication — safety before schedule.' },
]

export const PROCESS = [
  { step: '01', title: 'Book', copy: 'You submit a shipment request with your lane, freight and dates.' },
  { step: '02', title: 'Plan', copy: 'Our operations team coordinates equipment, driver and appointments.' },
  { step: '03', title: 'Pick up', copy: 'The driver arrives on time and loads the freight safely.' },
  { step: '04', title: 'Track', copy: 'Dispatch monitors the shipment and keeps you updated.' },
  { step: '05', title: 'Deliver', copy: 'Freight arrives safely and on schedule.' },
  { step: '06', title: 'Confirm', copy: 'Delivery is completed and documented with proof of delivery.' },
]

export const PARTNER_PROMISES = [
  { icon: 'radio', title: 'Communication', copy: 'A real person answers, and updates come to you before you have to ask.' },
  { icon: 'clock', title: 'On-time pickup', copy: 'Routes planned around your pickup windows, not the other way around.' },
  { icon: 'pin', title: 'On-time delivery', copy: 'Appointments coordinated and kept so receivers are not left waiting.' },
  { icon: 'eye', title: 'Load visibility', copy: 'Dispatch tracks every load from pickup to proof of delivery.' },
  { icon: 'doc', title: 'Documentation', copy: 'Clean paperwork and proof of delivery, ready when you need it.' },
  { icon: 'users', title: 'Professional drivers', copy: 'Experienced drivers who treat your freight like their own.' },
  { icon: 'shield', title: 'Safety', copy: 'Inspected equipment, compliance-focused operations, full coverage.' },
  { icon: 'truck', title: 'Reliable equipment', copy: 'Late-model tractors and trailers on a strict maintenance schedule.' },
]

// TODO: no real testimonials yet. These render with a visible "Placeholder"
// ribbon. Replace with real quotes, names and companies, then set
// `placeholder: false` to remove the ribbon.
export const TESTIMONIALS = [
  { quote: 'Add a real quote from a broker partner about communication and reliability.', name: 'Contact Name', role: 'Freight Broker Partner', placeholder: true },
  { quote: 'Add a real quote from a shipper about on-time pickup and delivery.', name: 'Contact Name', role: 'Shipper', placeholder: true },
  { quote: 'Add a real quote from a dedicated-lane customer.', name: 'Contact Name', role: 'Dedicated Lane Customer', placeholder: true },
]

// Driver recruiting. Verified items come from the company's existing
// requirements; `null` detail = still needs real information.
export const DRIVER_REQUIREMENTS = [
  'Valid Class A CDL',
  'At least 1 year of verifiable OTR or regional experience',
  'Clean driving record and current medical card',
  'Able to pass a DOT drug screen and background check',
]

export const DRIVER_INFO = [
  { icon: 'truck', title: 'Equipment', copy: 'Late-model day-cab and sleeper tractors, regularly serviced.' },
  { icon: 'box', title: 'Freight', copy: 'Dry van, reefer and power-only loads — palletized and boxed general freight plus temperature-controlled, mostly no-touch.' },
  { icon: 'badge', title: 'Two ways to drive', copy: 'Company driver on MSA equipment, or owner operator under MSA dispatch.' },
  { icon: 'invoice', title: 'Pay structure', copy: 'Owner operators: competitive percentage or mileage pay.', todo: 'Company driver pay: [add details]' },
  { icon: 'calendar', title: 'Home time', copy: null, todo: '[Add home-time policy]' },
  { icon: 'star', title: 'Benefits', copy: null, todo: '[Add benefits package]' },
  { icon: 'headset', title: 'Support', copy: 'A direct line to dispatch — real people who know your load and your route.' },
]

export const FAQ = {
  shippers: [
    { q: 'How do I request a quote?', a: 'Use the quote form on this page with your pickup and delivery locations, freight type and target date. Dispatch will follow up with pricing, usually the same business day.' },
    { q: 'What kind of freight do you haul?', a: 'Dry van and refrigerated (reefer) truckload freight — palletized or boxed general commodities as well as temperature-controlled loads like produce and dairy. We also take power-only loads: you supply the trailer, we supply the tractor and driver.' },
    { q: 'Do you offer dedicated lanes?', a: 'Yes. If you move freight on a repeating schedule, we can assign a driver and equipment to your lane so pickup and delivery times stay consistent week after week.' },
    { q: 'What areas do you serve?', a: 'We run interstate freight across the 48 contiguous states under our own MC and USDOT authority, dispatched from our Jamison, PA home base.' },
    { q: 'How can I track my shipment?', a: 'Dispatch tracks every load from pickup to proof of delivery and proactively updates you. Call or email your dispatcher any time for a live status.' },
    { q: 'Are you licensed and insured?', a: 'Yes — we operate under our own authority (MC-1153963 / USDOT 3498597) with full cargo and liability coverage on every load.' },
  ],
  drivers: [
    { q: 'What do I need to apply?', a: 'A valid Class A CDL, at least 1 year of verifiable OTR or regional experience, a clean driving record, a current medical card, and the ability to pass a DOT drug screen and background check.' },
    { q: "Company driver or owner operator — what's the difference?", a: 'Company drivers run MSA equipment. Owner operators run their own truck under MSA dispatch for competitive percentage or mileage pay, with fuel and maintenance support.' },
    { q: 'How much home time will I get?', a: 'We build routes around a schedule that respects your home time — tell us what you need during your application call and dispatch will work with it.' },
    { q: 'What will I be hauling?', a: 'A mix of dry van, reefer and power-only loads — palletized and boxed general commodities plus temperature-controlled freight, mostly no-touch.' },
    { q: 'How soon can I start?', a: 'Most applicants hear back from recruiting the same day. Once your paperwork, background check and orientation are complete, you are ready to roll.' },
    { q: "Who do I call once I'm on the road?", a: 'You get a direct line to dispatch — no call centers, no runaround.' },
  ],
}
