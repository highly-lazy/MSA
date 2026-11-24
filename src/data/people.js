// Departments. These describe what each function does at a professional
// carrier — remove any that MSA does not actually staff.
export const DEPARTMENTS = [
  {
    id: 'ops',
    name: 'Operations & Dispatch',
    icon: 'route',
    summary: 'Coordinates loads, routes, appointments, drivers and the daily rhythm of the operation.',
    points: ['Load planning & appointments', 'Route and driver coordination', 'Proactive status updates'],
  },
  {
    id: 'fleet',
    name: 'Fleet & Maintenance',
    icon: 'wrench',
    summary: 'Keeps trucks and trailers maintained, inspected and road-ready.',
    points: ['Preventive maintenance schedule', 'Equipment inspections', 'Repairs and roadside coordination'],
  },
  {
    id: 'safety',
    name: 'Safety & Compliance',
    icon: 'shield',
    summary: 'Focuses on DOT compliance, driver safety, inspections and operating standards.',
    points: ['DOT and FMCSA compliance', 'Driver qualification files', 'Hours-of-service oversight'],
  },
  {
    id: 'support',
    name: 'Driver Support',
    icon: 'headset',
    summary: 'Supports drivers with communication, scheduling, issues and day-to-day needs.',
    points: ['A direct line to the team', 'Scheduling and home-time planning', 'Help when something goes sideways'],
  },
  {
    id: 'billing',
    name: 'Accounting & Billing',
    icon: 'invoice',
    summary: 'Handles invoices, settlements, documentation and financial operations.',
    points: ['Invoicing and paperwork', 'Driver and owner-operator settlements', 'Proof-of-delivery documentation'],
  },
  {
    id: 'recruiting',
    name: 'Recruiting & HR',
    icon: 'users',
    summary: 'Finds qualified drivers and supports employees from application to orientation.',
    points: ['Driver applications', 'Onboarding and orientation', 'Employee support'],
  },
  {
    id: 'relations',
    name: 'Customer & Carrier Relations',
    icon: 'handshake',
    summary: 'Maintains relationships with brokers, shippers, customers and partners.',
    points: ['Quotes and rate conversations', 'Lane planning with shippers', 'Ongoing partner communication'],
  },
  {
    id: 'afterhours',
    name: 'After-Hours Support',
    icon: 'moon',
    summary: 'Provides operational communication outside regular business hours when it is needed.',
    points: ['Updates outside the 9-to-5', 'Driver support on nights and weekends', 'Escalation when a load needs attention'],
  },
]
