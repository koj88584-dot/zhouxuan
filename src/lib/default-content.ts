import type { PageDoc, RedirectEntry, ServiceDoc, SiteSettings, TechnicianDoc } from '@/lib/types'

const hiddenBookingUrl = '/contact-us'
const hiddenGiftCardUrl = '/contact-us'

export const siteSettingsSeed: SiteSettings = {
  siteName: '7 DAY SPA',
  siteTagline: 'Massage & Wellness',
  siteDescription:
    "7 DAY SPA is a neighborhood massage studio on Odana Road in Madison offering Body Massage, Thai Massage, and Four Hands Massage in a calm, welcoming setting.",
  bookingUrl: hiddenBookingUrl,
  giftCardUrl: hiddenGiftCardUrl,
  primaryNav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/aboutus' },
    { label: 'Services', href: '/services' },
    { label: 'Contact Us', href: '/contact-us' },
  ],
  footerNav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/aboutus' },
    { label: 'Services', href: '/services' },
    { label: 'Contact Us', href: '/contact-us' },
  ],
  contact: {
    addressLine1: '6733 Odana Rd',
    addressLine2: 'Madison, WI 53719',
    phone: '608-628-3432',
    email: '',
    mapQuery: '6733 Odana Rd Madison WI 53719',
  },
  hours: [
    { day: 'Monday', hours: '9:00 AM - 9:30 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 9:30 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 9:30 PM' },
    { day: 'Thursday', hours: '9:00 AM - 9:30 PM' },
    { day: 'Friday', hours: '9:00 AM - 9:30 PM' },
    { day: 'Saturday', hours: '9:00 AM - 9:30 PM' },
    { day: 'Sunday', hours: '9:00 AM - 9:30 PM' },
  ],
  socials: [],
  heroFeatures: [
    {
      title: 'Local and welcoming',
      copy: 'A simple massage studio on Madison’s west side with a warm reception area and quiet treatment rooms.',
    },
    {
      title: 'Focused massage menu',
      copy: 'Body Massage, Thai Massage, and Four Hands Massage with clear pricing and no extra noise.',
    },
    {
      title: 'Call to schedule',
      copy: 'Appointments and gift card questions can be handled directly with the studio while the website refresh is in progress.',
    },
  ],
  stats: [
    { label: 'Massage services', value: '03' },
    { label: 'Open daily', value: '9AM-9:30PM' },
    { label: 'Phone', value: '608-628-3432' },
  ],
}

export const pagesSeed: PageDoc[] = [
  {
    slug: 'aboutus',
    title: 'A simple neighborhood massage studio with a calm atmosphere',
    eyebrow: 'About 7 DAY SPA',
    summary:
      '7 DAY SPA is a local Madison massage studio focused on straightforward bodywork, a quiet environment, and flexible service lengths.',
    bodyContent:
      '7 DAY SPA serves guests looking for dependable massage care without a complicated booking experience. The studio offers Body Massage, Thai Massage, and Four Hands Massage in a relaxed, low-pressure setting on Odana Road.\n\nInside, the space is simple and welcoming: a small reception area, a quiet hallway, and private treatment rooms prepared for individual appointments. The experience is centered on comfort, affordability, and practical bodywork rather than a luxury hotel style presentation.\n\nThis site refresh keeps that same spirit. It presents the real studio, the real service menu, and the real pricing in a cleaner and more trustworthy format so guests can quickly understand what is offered before calling or visiting.',
    highlights: ['Odana Road location in Madison', 'Body Massage, Thai Massage, and Four Hands Massage', 'Open daily from 9:00 AM to 9:30 PM'],
    ctaLabel: 'View services',
    ctaHref: '/services',
  },
  {
    slug: 'services',
    title: 'Massage Services and Pricing',
    eyebrow: 'Our Services',
    summary: 'See the current massage menu, service lengths, and studio pricing.',
    bodyContent:
      'The current service menu is built around three core offerings: Body Massage, Thai Massage, and Four Hands Massage. Each service has a clear time-based price so guests can choose what fits their schedule and comfort level.',
  },
  {
    slug: 'contact-us',
    title: 'Visit, call, or send a message to the studio',
    eyebrow: 'Contact Us',
    summary:
      'Use the website to find the studio, check business hours, and reach 7 DAY SPA directly for appointments or service questions.',
    bodyContent:
      'The contact page is meant to be simple and practical. Guests can find the studio location, see the current hours, and reach out directly for help with service selection or appointment questions.\n\nWhile the site is being refreshed, the easiest next step for most guests is to call the studio directly. The form remains available for general questions and follow-up requests.',
  },
  {
    slug: 'gift-cards',
    title: 'Gift card information is currently handled directly by the studio',
    eyebrow: 'Gift Cards',
    summary:
      'The online gift card flow is temporarily hidden while the site is being updated. Please contact 7 DAY SPA directly for current gift card availability.',
    bodyContent:
      'Gift card purchasing is not being promoted on the public site right now. Guests who want to ask about gift cards can contact the studio directly by phone.\n\nThis page stays in the content model so the gift card experience can be brought back later without rebuilding the full site structure.',
    ctaLabel: 'Contact the studio',
    ctaHref: '/contact-us',
  },
]

export const servicesSeed: ServiceDoc[] = [
  {
    slug: 'body-massage',
    title: 'Body Massage',
    summary: 'Deep Tissue and Swedish style body massage with flexible session lengths.',
    bodyContent:
      'Body Massage is the studio’s most flexible service, suitable for guests who want a lighter Swedish-style session or a firmer Deep Tissue approach. It works well for general tension, back and shoulder tightness, and regular maintenance.',
    duration: '30 / 60 / 90 min',
    benefits: ['Deep Tissue or Swedish style pressure', 'Good for general tension relief', 'Straightforward pricing', 'Suitable for repeat appointments'],
    ritualSteps: ['Brief consultation', 'Targeted bodywork based on pressure preference', 'Full session focused on relaxation and tension relief', 'Simple finish and recovery'],
    icon: 'hand',
    ctaLabel: 'Call to schedule',
    ctaType: 'internal',
    displayPriceMode: 'custom',
    priceLabel: '30 min $50 | 60 min $70 | 90 min $110',
    featured: true,
    binding: {
      squareAppointmentUrl: hiddenBookingUrl,
      active: true,
    },
  },
  {
    slug: 'thai-massage',
    title: 'Thai Massage',
    summary: 'Traditional stretching and pressure-based bodywork for mobility and release.',
    bodyContent:
      'Thai Massage combines assisted stretching with firmer body pressure to help release tightness and improve range of motion. It is a good fit for guests who want more movement and structure than a standard table massage.',
    duration: '30 / 60 min',
    benefits: ['Traditional Thai-style stretching', 'Firm pressure and movement work', 'Good for hips, legs, and back tightness', 'Short or medium session options'],
    ritualSteps: ['Intake and comfort check', 'Stretching-based warm-up', 'Focused pressure and mobility work', 'Closing release'],
    icon: 'lotus',
    ctaLabel: 'Call to schedule',
    ctaType: 'internal',
    displayPriceMode: 'custom',
    priceLabel: '30 min $60 | 60 min $90',
    featured: true,
    binding: {
      squareAppointmentUrl: hiddenBookingUrl,
      active: true,
    },
  },
  {
    slug: 'four-hands-massage',
    title: 'Four Hands Massage',
    summary: 'Two therapists working together in one synchronized session.',
    bodyContent:
      'Four Hands Massage is the premium massage experience on the menu, with two therapists working at the same time. It is designed for guests who want a fuller, more immersive bodywork session and a stronger sense of complete relaxation.',
    duration: '30 / 60 / 90 min',
    benefits: ['Two therapists at once', 'More immersive full-body experience', 'Available in three session lengths', 'Best fit for guests wanting the most complete service'],
    ritualSteps: ['Joint setup and consultation', 'Synchronized bodywork', 'Full-session coordinated treatment', 'Cool-down and transition out'],
    icon: 'sparkles',
    ctaLabel: 'Call to schedule',
    ctaType: 'internal',
    displayPriceMode: 'custom',
    priceLabel: '30 min $100 | 60 min $140 | 90 min $200',
    featured: true,
    binding: {
      squareAppointmentUrl: hiddenBookingUrl,
      active: true,
    },
  },
]

export const techniciansSeed: TechnicianDoc[] = [
  {
    slug: 'any-available',
    name: 'Any available therapist',
    title: 'Best match for your requested time',
    bio: 'Let the studio assign the therapist who best matches your preferred service and appointment time.',
    serviceSlugs: ['body-massage', 'thai-massage', 'four-hands-massage'],
    specialties: ['Flexible scheduling', 'Good for first-time guests', 'Fastest path to availability'],
    languages: ['English'],
    availabilityNote: 'Recommended when your preferred time matters most.',
    active: true,
    displayOrder: 0,
  },
  {
    slug: 'kevin',
    name: 'Kevin',
    title: 'Available for selected massage services',
    bio: 'Kevin is currently shown as an available therapist for massage services offered by the studio.',
    serviceSlugs: ['body-massage', 'thai-massage'],
    specialties: ['Body Massage', 'Thai Massage'],
    languages: ['English'],
    availabilityNote: 'Availability is confirmed directly by the studio.',
    active: true,
    displayOrder: 10,
  },
]

export const redirectsSeed: RedirectEntry[] = [
  { from: '/booking', to: '/contact-us', permanent: true },
  { from: '/gift-cards', to: '/contact-us', permanent: true },
  { from: '/product/card-courtesy-fee/6', to: '/contact-us', permanent: true },
  { from: '/product/card-courtesy-fee/7', to: '/contact-us', permanent: true },
  { from: '/product/card-courtesy-fee/8', to: '/contact-us', permanent: true },
  { from: '/product/card-courtesy-fee/9', to: '/contact-us', permanent: true },
]
