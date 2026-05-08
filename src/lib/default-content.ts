import type { PageDoc, RedirectEntry, ServiceDoc, SiteSettings, TechnicianDoc } from '@/lib/types'

const defaultBookingUrl = '/booking'
const defaultGiftCardUrl = process.env.NEXT_PUBLIC_DEFAULT_GIFT_CARD_URL || '/gift-cards'

export const siteSettingsSeed: SiteSettings = {
  siteName: 'Oasis Spa',
  siteTagline: 'Odana Road | Madison, Wisconsin',
  siteDescription:
    'Welcome to Oasis Spa, your exclusive sanctuary for relaxation, rejuvenation, and revitalization in Madison, Wisconsin.',
  bookingUrl: defaultBookingUrl,
  giftCardUrl: defaultGiftCardUrl,
  primaryNav: [
    { label: 'About', href: '/aboutus' },
    { label: 'Services', href: '/services' },
    { label: 'Book', href: '/booking' },
    { label: 'Gift Cards', href: '/gift-cards' },
    { label: 'Contact Us', href: '/contact-us' },
  ],
  footerNav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/aboutus' },
    { label: 'Services', href: '/services' },
    { label: 'Book Appointment', href: '/booking' },
    { label: 'Nails', href: '/nails' },
    { label: 'Gift Cards', href: '/gift-cards' },
    { label: 'Contact Us', href: '/contact-us' },
  ],
  contact: {
    addressLine1: '6733 Odana Rd',
    addressLine2: 'Madison, WI 53719',
    phone: '(608) 888-7771',
    email: '',
    mapQuery: '6733 Odana Rd Madison WI 53719',
  },
  hours: [
    { day: 'Monday', hours: '9:30 AM - 9:00 PM' },
    { day: 'Tuesday', hours: '9:30 AM - 9:00 PM' },
    { day: 'Wednesday', hours: '9:30 AM - 9:00 PM' },
    { day: 'Thursday', hours: '9:30 AM - 9:00 PM' },
    { day: 'Friday', hours: '9:30 AM - 9:00 PM' },
    { day: 'Saturday', hours: '9:30 AM - 9:00 PM' },
    { day: 'Sunday', hours: '9:30 AM - 8:00 PM' },
  ],
  socials: [],
  heroFeatures: [
    {
      title: 'Madison retreat',
      copy: 'A warm, deep-green atmosphere designed for bodywork, reflexology, aromatherapy, and quiet recovery.',
    },
    {
      title: 'Service-led experience',
      copy: 'From couples massage to focused foot therapy, the menu is structured around calm, restorative treatments.',
    },
    {
      title: 'Booking stays simple',
      copy: 'Appointments and gift cards continue through Square while the public-facing brand site stays fully custom.',
    },
  ],
  stats: [
    { label: 'Massage and care services', value: '09' },
    { label: 'Gift cards available', value: 'Live' },
    { label: 'Location', value: 'Odana Rd' },
  ],
}

export const pagesSeed: PageDoc[] = [
  {
    slug: 'aboutus',
    title: 'A calm place to reset on Madison\'s west side',
    eyebrow: 'About Oasis Spa',
    summary:
      'Oasis Spa is built around a simple promise: professional bodywork should feel restorative from the moment you arrive, not rushed or clinical.',
    bodyContent:
      'Oasis Spa brings together massage, reflexology, aromatherapy, and nail care in a setting that feels polished without becoming overdesigned. The mood is soft, the palette is grounded, and the experience stays centered on how the guest feels before, during, and after the service.\n\nThe service menu is intentionally approachable. You can book a classic full-body massage, share a couples session, focus on foot reflexology, or layer in essential oils and combination treatments. Each option is presented clearly so guests can choose what fits the day they are having.\n\nThis rebuild keeps that same spirit. The goal is a site that feels calm and high-end on the surface while staying practical for the team behind the desk and the therapists on the floor.',
    highlights: ['Relaxing treatment rooms', 'Massage, reflexology, and aroma rituals', 'Easy online booking and gift cards'],
    ctaLabel: 'Explore services',
    ctaHref: '/services',
  },
  {
    slug: 'services',
    title: 'Massage & Reflexology Menu',
    eyebrow: 'Our Services',
    summary: 'Choose a treatment, see the details, and book without extra steps.',
    bodyContent:
      'The menu is organized around guest intent: full-body relaxation, focused relief, shared couples experiences, and combinations that balance soothing massage with more targeted bodywork.',
  },
  {
    slug: 'nails',
    title: 'Nail care with the same quiet, restorative energy',
    eyebrow: 'Nails',
    summary:
      'The nails page acts as a companion offering to the massage menu, positioning manicures and pedicures as part of the same calm, polished visit.',
    bodyContent:
      'Nail care at Oasis Spa should feel aligned with the rest of the brand: softened lighting, careful prep, and a finish that feels clean and composed rather than loud.\n\nThis page is intentionally flexible so the business can expand it into seasonal finishes, deluxe pedicure upgrades, or curated pairings without changing code.',
    highlights: ['Refined manicure care', 'Pedicure recovery rituals', 'Optional add-on treatments'],
  },
  {
    slug: 'contact-us',
    title: 'We\'d love to hear from you',
    eyebrow: 'Contact Us',
    summary:
      'Plan your visit, check the location, confirm current hours, or send a message directly to the team through the built-in inquiry form.',
    bodyContent:
      'The contact page is designed to feel welcoming and direct. Guests can find the location quickly, check the appointment structure, and send a question without running into unnecessary friction.\n\nFor launch, this rebuild keeps the form simple and stores submissions in Payload so the team can manage follow-up from one place.',
  },
  {
    slug: 'gift-cards',
    title: 'Gift relaxation, recovery, and a slower pace',
    eyebrow: 'Gift Cards',
    summary:
      'Gift cards stay connected to Square so purchase and redemption remain familiar while the landing experience matches the rest of the Oasis Spa brand.',
    bodyContent:
      'Gift cards work best when the experience feels as thoughtful as the service itself. This page gives the business room to explain the atmosphere, the kind of treatments guests can book, and why a wellness gift feels especially personal.\n\nWhen a live gift card URL is available, the primary action sends guests straight into the Square purchase flow. Until then, the page can gracefully fall back to a booking or contact path.',
    ctaLabel: 'Purchase gift card',
    ctaHref: '/gift-cards',
  },
]

export const servicesSeed: ServiceDoc[] = [
  {
    slug: 'body-massage',
    title: 'Body Massage',
    summary: 'Relax your body and mind with our professional full-body massage services.',
    bodyContent:
      'Body Massage is the anchor of the Oasis Spa menu. The treatment is designed for guests who want a dependable reset, with steady pacing, broad muscular release, and enough quiet in the session to help the whole system settle.\n\nIt works well as a first visit service because it can meet a wide range of needs, from general tension relief to a more intentional moment of recovery in the middle of a busy week.',
    duration: '60 / 90 / 120 minutes',
    benefits: ['Full-body relaxation', 'Flexible pressure preferences', 'A clear starting point for new guests'],
    ritualSteps: ['Arrival and intake', 'Grounding setup', 'Layered full-body work', 'Rest and re-entry'],
    icon: 'lotus',
    ctaLabel: 'Book Now',
    ctaType: 'booking',
    displayPriceMode: 'square',
    featured: true,
    binding: {
      squareAppointmentUrl: defaultBookingUrl,
      squareCategoryId: 'PNKY7MOHDBYI2LBOTQ24MWQK',
      active: true,
    },
  },
  {
    slug: 'couples-massage',
    title: 'Couples Massage',
    summary: 'Enjoy a serene and romantic experience with your partner.',
    bodyContent:
      'Couples Massage creates a shared experience without making either guest compromise on comfort. Pressure, pacing, and focus can still be tailored individually while the overall session stays calm, quiet, and connected.\n\nIt is well suited for anniversaries, special occasions, or simply spending restorative time together in a setting that feels more peaceful than performative.',
    duration: '60 / 90 minutes',
    benefits: ['Shared treatment room experience', 'Individualized therapist attention', 'Ideal for gifting and special plans'],
    ritualSteps: ['Welcome for two', 'Comfort check and preferences', 'Side-by-side treatment', 'Post-service unwind'],
    icon: 'moon',
    ctaLabel: 'Book Now',
    ctaType: 'booking',
    displayPriceMode: 'square',
    featured: true,
    binding: {
      squareAppointmentUrl: defaultBookingUrl,
      squareCategoryId: 'JYAIZZAXOEABJSNJNR5Z6WXK',
      active: true,
    },
  },
  {
    slug: 'foot-reflexology',
    title: 'Foot Reflexology',
    summary: 'Relieve tension with our expert foot reflexology techniques.',
    bodyContent:
      'Foot Reflexology focuses attention where many guests carry more strain than they realize. Through the feet and lower legs, the service encourages release, circulation, and a grounded sense of calm that can ripple through the whole body.\n\nIt is a strong choice for guests who spend long hours standing, walking, commuting, or simply want a shorter, highly focused treatment.',
    duration: '30 / 60 minutes',
    benefits: ['Targeted lower-body relief', 'Grounding and calming effect', 'Easy to combine with other treatments'],
    ritualSteps: ['Warm preparation', 'Focused reflex work', 'Lower-leg release', 'Cooling finish'],
    icon: 'leaf',
    ctaLabel: 'Book Now',
    ctaType: 'booking',
    displayPriceMode: 'square',
    featured: true,
    binding: {
      squareAppointmentUrl: defaultBookingUrl,
      squareCategoryId: '3ESCOUQJC5N57NCOY6SN2MWV',
      active: true,
    },
  },
  {
    slug: 'body-massage-and-foot-reflexology-combo',
    title: 'Body & Foot Combo Massage',
    summary: 'A customized combination of different massage techniques for ultimate relaxation.',
    bodyContent:
      'This combination treatment is designed for guests who want a fuller experience in one visit. Broad bodywork creates space through the back, shoulders, and limbs, while reflexology brings a more grounded finish through the feet and lower body.\n\nIt reads as one of the menu\'s most generous options and works especially well for gift card redemptions, longer visits, and guests who want to leave feeling fully reset.',
    duration: '90 / 120 minutes',
    benefits: ['Full-body release plus focused foot work', 'A strong premium option', 'Excellent for longer visits'],
    ritualSteps: ['Consultation and pacing', 'Massage sequence', 'Reflexology finish', 'Recovery pause'],
    icon: 'waves',
    ctaLabel: 'Book Now',
    ctaType: 'booking',
    displayPriceMode: 'square',
    featured: true,
    binding: {
      squareAppointmentUrl: defaultBookingUrl,
      squareCategoryId: 'LVZNJGCABGFQ4PC4OAJALX4E',
      active: true,
    },
  },
  {
    slug: 'aromatherapy-massage',
    title: 'Aromatherapy Massage',
    summary: 'Indulge your senses with our calming aromatherapy massages.',
    bodyContent:
      'Aromatherapy Massage adds scent and mood to the bodywork experience, helping the service feel even more transportive. The focus stays on relaxation, softening the edges of stress while the massage itself remains patient and restorative.\n\nIt is especially appealing for guests who want a more immersive spa moment rather than a treatment that feels purely clinical or corrective.',
    duration: '60 / 90 minutes',
    benefits: ['A softer, more immersive mood', 'Great for stress-heavy weeks', 'Combines aroma with restorative touch'],
    ritualSteps: ['Blend selection', 'Breath and settling', 'Slow massage flow', 'Quiet finish'],
    icon: 'sparkles',
    ctaLabel: 'Book Now',
    ctaType: 'booking',
    displayPriceMode: 'square',
    binding: {
      squareAppointmentUrl: defaultBookingUrl,
      squareCategoryId: 'N46WVFQK6MYHFKXKZJWX35K5',
      active: true,
    },
  },
  {
    slug: 'chair-massage',
    title: 'Chair Massage',
    summary: 'Quick and effective relief for your back and shoulders.',
    bodyContent:
      'Chair Massage is ideal when time is limited but tension is not. By targeting the back, shoulders, neck, and upper body, the treatment offers fast relief without requiring a full treatment room setup.\n\nIt is useful for guests fitting care into a short break and for anyone who wants focused relief with minimal transition time.',
    duration: '20 / 30 minutes',
    benefits: ['Short and efficient session', 'Focused upper-body relief', 'Easy to fit into a busy schedule'],
    ritualSteps: ['Posture setup', 'Back and shoulder focus', 'Neck detail work', 'Quick release finish'],
    icon: 'hand',
    ctaLabel: 'Book Now',
    ctaType: 'booking',
    displayPriceMode: 'square',
    binding: {
      squareAppointmentUrl: defaultBookingUrl,
      squareCategoryId: 'FNMO4NEWEUGBXU7YPSM2DXLL',
      active: true,
    },
  },
  {
    slug: 'foot-reflexology-and-tuina-combo',
    title: 'Foot Reflexology & Tui Na Combo',
    summary: 'A powerful blend of foot therapy and dry back massage.',
    bodyContent:
      'This combination balances grounding foot work with more directional back and upper-body techniques. It feels a little firmer and more focused than the purely soothing services on the menu, making it a favorite for repeat guests who want a bit more structure in the session.\n\nThe pairing gives the treatment its own personality within the menu while still staying aligned with the overall Oasis Spa tone.',
    duration: '90 minutes',
    benefits: ['Grounding foot focus plus structural back work', 'Distinctive signature combination', 'Great for guests who like a more focused treatment'],
    ritualSteps: ['Intake and body scan', 'Foot therapy sequence', 'Dry back massage', 'Cooling close'],
    icon: 'gem',
    ctaLabel: 'Book Now',
    ctaType: 'booking',
    displayPriceMode: 'square',
    binding: {
      squareAppointmentUrl: defaultBookingUrl,
      active: true,
    },
  },
  {
    slug: 'cupping-therapy',
    title: 'Cupping Therapy',
    summary: 'Promote healing and relaxation through the ancient practice of cupping therapy.',
    bodyContent:
      'Cupping Therapy gives the menu a more specialized treatment path for guests who want focused release beyond standard massage. The service is framed around informed, strategic use rather than hype, keeping the experience grounded and professional.\n\nIt can stand on its own or complement deeper bodywork depending on how the spa wants to position it over time.',
    duration: '30 / 45 minutes',
    benefits: ['Targeted tissue decompression', 'Distinctive addition to the menu', 'Useful with massage-focused care plans'],
    ritualSteps: ['Consultation', 'Targeted cup placement', 'Controlled release', 'Aftercare guidance'],
    icon: 'flower',
    ctaLabel: 'Book Now',
    ctaType: 'booking',
    displayPriceMode: 'square',
    binding: {
      squareAppointmentUrl: defaultBookingUrl,
      squareCategoryId: '5CHMGEU3FPPI7E7U64M4NPXV',
      active: true,
    },
  },
  {
    slug: 'essential-oils-massage',
    title: 'Essential Oils Massage',
    summary: 'Enhance your massage experience with the therapeutic benefits of essential oils.',
    bodyContent:
      'Essential Oils Massage keeps the treatment rooted in relaxation while emphasizing the sensory side of the visit. The oils support the atmosphere of the room and help the service feel even more restorative without making the experience complicated.\n\nIt is a natural fit for guests who already enjoy massage and want a slightly richer, more spa-forward version of that same reset.',
    duration: '60 / 90 minutes',
    benefits: ['Aroma-enhanced relaxation', 'Comforting and spa-forward', 'Pairs well with classic massage preferences'],
    ritualSteps: ['Oil selection', 'Settle and breathe', 'Steady massage flow', 'Warm finish'],
    icon: 'sparkles',
    ctaLabel: 'Book Now',
    ctaType: 'booking',
    displayPriceMode: 'square',
    binding: {
      squareAppointmentUrl: defaultBookingUrl,
      squareCategoryId: '5CHMGEU3FPPI7E7U64M4NPXV',
      active: true,
    },
  },
]

export const techniciansSeed: TechnicianDoc[] = [
  {
    slug: 'any-available',
    name: 'Any available technician',
    title: 'Best match for your time',
    bio: 'Let the studio match your service, timing, and pressure preference with the right technician.',
    serviceSlugs: servicesSeed.map((service) => service.slug),
    specialties: ['Fastest scheduling', 'Flexible pressure', 'First visit friendly'],
    languages: ['English'],
    availabilityNote: 'Recommended when your preferred time matters most.',
    active: true,
    displayOrder: 0,
  },
  {
    slug: 'lina',
    name: 'Lina',
    title: 'Relaxation and aromatherapy focus',
    bio: 'A calm, steady style for guests who want a softer reset and a spa-forward session.',
    serviceSlugs: ['body-massage', 'couples-massage', 'aromatherapy-massage', 'essential-oils-massage'],
    specialties: ['Aromatherapy', 'Relaxation massage', 'Couples sessions'],
    languages: ['English', 'Mandarin'],
    availabilityNote: 'Best for relaxing full-body sessions.',
    active: true,
    displayOrder: 10,
  },
  {
    slug: 'kevin',
    name: 'Kevin',
    title: 'Focused bodywork and combo care',
    bio: 'A more structured approach for shoulder, back, and combo sessions where guests want targeted relief.',
    serviceSlugs: ['body-massage', 'chair-massage', 'body-massage-and-foot-reflexology-combo', 'cupping-therapy'],
    specialties: ['Back and shoulders', 'Combo massage', 'Cupping support'],
    languages: ['English'],
    availabilityNote: 'Best for focused tension relief.',
    active: true,
    displayOrder: 20,
  },
  {
    slug: 'mei',
    name: 'Mei',
    title: 'Foot reflexology and Tui Na',
    bio: 'Grounded foot work and dry back massage for guests who want lower-body relief and a firmer rhythm.',
    serviceSlugs: ['foot-reflexology', 'foot-reflexology-and-tuina-combo', 'body-massage-and-foot-reflexology-combo'],
    specialties: ['Foot reflexology', 'Tui Na combo', 'Lower-leg relief'],
    languages: ['English', 'Mandarin'],
    availabilityNote: 'Best for reflexology and Tui Na combinations.',
    active: true,
    displayOrder: 30,
  },
]

export const redirectsSeed: RedirectEntry[] = [
  { from: '/product/card-courtesy-fee/6', to: '/gift-cards', permanent: true },
  { from: '/product/card-courtesy-fee/7', to: '/gift-cards', permanent: true },
  { from: '/product/card-courtesy-fee/8', to: '/gift-cards', permanent: true },
  { from: '/product/card-courtesy-fee/9', to: '/gift-cards', permanent: true },
]
