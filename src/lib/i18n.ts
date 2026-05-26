import type { PageDoc, ServiceDoc, SiteSettings, TechnicianDoc } from '@/lib/types'

export const localeCookieName = 'spa-locale'
export const locales = ['en', 'zh'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function parseLocale(value: string | null | undefined): Locale {
  return value === 'zh' ? 'zh' : defaultLocale
}

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
}

const zhNavLabels: Record<string, string> = {
  '/': '首页',
  '/aboutus': '关于我们',
  '/services': '服务项目',
  '/contact-us': '联系我们',
  '/booking': '预约',
  '/gift-cards': '礼品卡',
}

const zhDayLabels: Record<string, string> = {
  Monday: '周一',
  Tuesday: '周二',
  Wednesday: '周三',
  Thursday: '周四',
  Friday: '周五',
  Saturday: '周六',
  Sunday: '周日',
}

const zhHourLabels: Record<string, string> = {
  '9:00 AM - 9:30 PM': '上午 9:00 - 晚上 9:30',
  'By appointment': '请先预约',
}

const zhSiteHeroFeatures: SiteSettings['heroFeatures'] = [
  {
    title: '本地门店氛围',
    copy: 'Madison 西区一家安静、简单、欢迎到店的按摩门店。',
  },
  {
    title: '三项核心按摩服务',
    copy: '网站目前重点展示 Body Massage、Thai Massage 和 Four Hands Massage。',
  },
  {
    title: '先电话联系',
    copy: '预约和礼品卡入口暂时不公开展示，建议直接电话联系门店。',
  },
]

const zhStats: SiteSettings['stats'] = [
  { label: '按摩服务', value: '03' },
  { label: '营业时间', value: '9AM-9:30PM' },
  { label: '电话', value: '608-628-3432' },
]

const zhPages: Record<string, Partial<PageDoc>> = {
  aboutus: {
    title: '一家简单安静的社区按摩门店',
    eyebrow: '关于 7 DAY SPA',
    summary: '7 DAY SPA 位于 Madison Lakewood Plaza Shopping Center (N Sherman Ave)，提供实用、清晰、容易理解的按摩服务。',
  },
  services: {
    title: '按摩服务与价格',
    eyebrow: '服务项目',
    summary: '查看当前服务项目、时长和店内价格。',
  },
  'contact-us': {
    title: '联系门店',
    eyebrow: '联系我们',
    summary: '查看地址、营业时间，并直接联系 7 DAY SPA。',
  },
  'gift-cards': {
    title: '礼品卡信息暂时请直接联系门店',
    eyebrow: '礼品卡',
    summary: '礼品卡购买入口目前未公开展示，如需了解请直接联系门店。',
  },
}

const zhServices: Record<string, Partial<ServiceDoc>> = {
  'body-massage': {
    title: 'Body Massage',
    summary: '适合想做深层组织或瑞典式放松按摩的客人。',
  },
  'thai-massage': {
    title: 'Thai Massage',
    summary: '以拉伸和按压为主的泰式按摩体验。',
  },
  'four-hands-massage': {
    title: 'Four Hands Massage',
    summary: '两位按摩师同时进行的同步按摩服务。',
  },
}

const zhTechnicians: Record<string, Partial<TechnicianDoc>> = {
  'any-available': {
    name: '任意可用按摩师',
    title: '根据时间安排合适人选',
  },
}

export const uiCopy = {
  en: {
    common: {
      bookAppointment: 'Book Appointment',
      bookNow: 'Book Now',
      callNow: 'Call now',
      loading: 'Loading...',
      languageLabel: 'Language',
      english: 'English',
      chinese: 'Chinese',
    },
    header: {
      openNavigation: 'Open navigation',
      closeNavigation: 'Close navigation',
    },
    footer: {
      visit: 'Visit',
      navigate: 'Navigate',
      contactFallback: 'Contact details can be updated in Payload.',
    },
    home: {
      eyebrow: '7 DAY SPA | Madison, WI',
      title: 'Massage care in a calm local studio',
      summary: 'Body Massage, Thai Massage, and Four Hands Massage at Lakewood Plaza on N Sherman Ave in Madison.',
      viewServices: 'View Services',
      heroPills: ['Body Massage', 'Thai Massage', 'Four Hands Massage'],
      visitLabel: 'Visit',
      callLabel: 'Call',
      callCopy: 'Direct studio contact',
      menuLabel: 'Menu',
      menuCopy: 'Simple service menu with current pricing',
      aboutEyebrow: 'About 7 DAY SPA',
      aboutTitle: 'A straightforward massage studio with a warm neighborhood feel.',
      learnMore: 'Learn more about the studio',
      servicesEyebrow: 'Our Services',
      servicesTitle: 'Current massage services and pricing',
      viewFullMenu: 'View full menu',
      atmosphere: 'Inside the studio',
      galleryTitles: ['Reception', 'Waiting Area', 'Treatment Hallway', 'Treatment Room', 'Quiet Room', 'Bodywork Space'],
      contactUs: 'Contact Us',
      callTitle: 'Call the studio directly',
      callSummary: 'For appointments, gift card questions, or service help, the fastest path is still a direct phone call.',
    },
    services: {
      mostBooked: 'Current menu',
      mostBookedItems: ['Body Massage', 'Thai Massage', 'Four Hands Massage'],
      emptyFallback: 'No services are currently available. Please check back soon or contact us.',
    },
    serviceCard: {
      signature: 'Service',
      details: 'Details',
      squarePricing: 'Studio pricing',
    },
    bookingPage: {
      eyebrow: 'Book Appointment',
      title: 'Appointments are currently handled directly by phone',
      summary: 'Please call the studio for the most current appointment availability.',
      loading: 'Loading booking options...',
    },
    bookingForm: {
      chooseService: 'Choose service',
      technician: 'Therapist',
      timeRequest: 'Time request',
      date: 'Date',
      time: 'Time',
      duration: 'Duration',
      bestFit: 'Best fit',
      yourDetails: 'Your details',
      fullName: 'Full name',
      phone: 'Phone',
      email: 'Email',
      notes: 'Notes',
      notesPlaceholder: 'Pressure preference or anything the studio should know.',
      sending: 'Sending request',
      submit: 'Request appointment',
      checkForm: 'Please check the form.',
      success: 'Request received. The spa will confirm your appointment.',
      submitted: 'Request submitted.',
      timeSlots: ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM', '7:30 PM', '9:00 PM'],
    },
    serviceDetail: {
      eyebrow: 'Service Detail',
      backToMenu: 'Back to menu',
      benefits: 'Benefits',
      rhythm: 'Session rhythm',
    },
    about: {
      viewServiceMenu: 'View service menu',
      atmosphereCues: 'What guests can expect',
    },
    contact: {
      visitStudio: 'Visit the studio',
      locationHours: 'Location & hours',
      fallback: 'Direct contact details can be updated in Payload later.',
      panelEyebrow: 'Direct and simple',
      panelTitle: 'Reach the studio directly.',
      panelSummary: 'Call for availability, pricing questions, or gift card inquiries.',
      bestFor: 'Best for:',
      bestForItems: ['Current appointment availability', 'Service and pricing questions', 'Gift card questions'],
      sendMessage: 'Send us a message',
      formTitle: 'Need something before you visit?',
      formSummary: 'Use the form for general questions and follow-up requests.',
      mapTitle: 'Studio map',
    },
    contactForm: {
      fullName: 'Full name',
      email: 'Email',
      phone: 'Phone',
      service: 'Service',
      generalInquiry: 'General inquiry',
      message: 'Message',
      sending: 'Sending...',
      submit: 'Send message',
      error: 'Something went wrong. Please try again.',
      success: 'Thanks. Your message is in.',
      setup: 'Your message needs delivery setup before it can be received.',
    },
    giftCards: {
      purchase: 'Call about gift cards',
      ask: 'Contact us',
      why: 'Current gift card note',
      points: ['Gift card sales are not being promoted on the public site right now.', 'Please call the studio directly for current availability.', 'This flow can be re-enabled later.'],
      imageAlt: '7 DAY SPA interior',
    },
    notFound: {
      eyebrow: 'Page not found',
      title: 'This page is not available right now.',
      summary: 'The site is being refreshed. Please return home or contact the studio directly.',
      action: 'Return home',
    },
  },
  zh: {
    common: {
      bookAppointment: '预约',
      bookNow: '立即查看',
      callNow: '电话联系',
      loading: '加载中...',
      languageLabel: '语言',
      english: 'English',
      chinese: '中文',
    },
    header: {
      openNavigation: '打开导航',
      closeNavigation: '关闭导航',
    },
    footer: {
      visit: '到店信息',
      navigate: '网站导航',
      contactFallback: '联系方式可稍后在后台更新。',
    },
    home: {
      eyebrow: '7 DAY SPA | Madison, WI',
      title: '一家安静本地的按摩门店',
      summary: '位于 Lakewood Plaza (N Sherman Ave)，提供 Body Massage、Thai Massage 和 Four Hands Massage。',
      viewServices: '查看服务',
      heroPills: ['Body Massage', 'Thai Massage', 'Four Hands Massage'],
      visitLabel: '地址',
      callLabel: '电话',
      callCopy: '直接联系门店',
      menuLabel: '服务',
      menuCopy: '清晰展示当前服务和价格',
      aboutEyebrow: '关于 7 DAY SPA',
      aboutTitle: '简单、真实、安静的社区按摩空间。',
      learnMore: '了解门店',
      servicesEyebrow: '服务项目',
      servicesTitle: '当前按摩服务与价格',
      viewFullMenu: '查看完整服务',
      atmosphere: '门店环境',
      galleryTitles: ['接待区', '等候区', '走廊', '护理房', '安静房间', '按摩空间'],
      contactUs: '联系我们',
      callTitle: '直接电话联系门店',
      callSummary: '预约、礼品卡和服务问题，目前最直接的方式仍然是电话联系。',
    },
    services: {
      mostBooked: '当前服务',
      mostBookedItems: ['Body Massage', 'Thai Massage', 'Four Hands Massage'],
      emptyFallback: '当前暂无可展示服务，请稍后再看或直接联系门店。',
    },
    serviceCard: {
      signature: '服务',
      details: '详情',
      squarePricing: '店内价格',
    },
    bookingPage: {
      eyebrow: '预约',
      title: '预约目前请直接电话联系门店',
      summary: '网站暂不公开在线预约流程，请直接致电门店确认时间。',
      loading: '加载中...',
    },
    bookingForm: {
      chooseService: '选择服务',
      technician: '按摩师',
      timeRequest: '时间偏好',
      date: '日期',
      time: '时间',
      duration: '时长',
      bestFit: '门店安排',
      yourDetails: '你的信息',
      fullName: '姓名',
      phone: '电话',
      email: '邮箱',
      notes: '备注',
      notesPlaceholder: '例如力度偏好或其他说明。',
      sending: '提交中',
      submit: '提交预约',
      checkForm: '请检查表单内容。',
      success: '已收到预约请求。',
      submitted: '已提交。',
      timeSlots: ['上午 9:00', '上午 10:30', '中午 12:00', '下午 1:30', '下午 3:00', '下午 4:30', '下午 6:00', '晚上 7:30', '晚上 9:00'],
    },
    serviceDetail: {
      eyebrow: '服务详情',
      backToMenu: '返回服务列表',
      benefits: '适合人群',
      rhythm: '服务流程',
    },
    about: {
      viewServiceMenu: '查看服务项目',
      atmosphereCues: '到店感受',
    },
    contact: {
      visitStudio: '到店信息',
      locationHours: '地址与营业时间',
      fallback: '联系方式稍后可在后台继续完善。',
      panelEyebrow: '直接联系',
      panelTitle: '门店欢迎你来电咨询。',
      panelSummary: '适合询问预约、价格、服务选择和礼品卡问题。',
      bestFor: '适合咨询：',
      bestForItems: ['当前可预约时间', '服务与价格问题', '礼品卡咨询'],
      sendMessage: '发送留言',
      formTitle: '来店前有问题？',
      formSummary: '也可以先留言，我们会再联系你。',
      mapTitle: '门店地图',
    },
    contactForm: {
      fullName: '姓名',
      email: '邮箱',
      phone: '电话',
      service: '服务',
      generalInquiry: '一般咨询',
      message: '留言内容',
      sending: '发送中...',
      submit: '发送',
      error: '发送失败，请稍后再试。',
      success: '已收到你的留言。',
      setup: '消息已提交，但通知配置还未完全设置。',
    },
    giftCards: {
      purchase: '电话咨询礼品卡',
      ask: '联系我们',
      why: '当前礼品卡说明',
      points: ['网站目前不公开展示礼品卡购买流程。', '如需了解礼品卡，请直接联系门店。', '后续仍可再重新开启这个功能。'],
      imageAlt: '7 DAY SPA 门店环境',
    },
    notFound: {
      eyebrow: '页面未找到',
      title: '这个页面当前不可用。',
      summary: '网站正在更新中，请返回首页或直接联系门店。',
      action: '返回首页',
    },
  },
} as const

export function getUiCopy(locale: Locale) {
  return uiCopy[locale]
}

export function localizeSiteSettings(settings: SiteSettings, locale: Locale): SiteSettings {
  if (locale === 'en') return settings

  return {
    ...settings,
    siteTagline: '按摩与养生',
    siteDescription: '7 DAY SPA 是 Madison N Sherman Ave 上一家安静、简单、实用的按摩门店。',
    primaryNav: settings.primaryNav.map((item) => ({ ...item, label: zhNavLabels[item.href] || item.label })),
    footerNav: settings.footerNav.map((item) => ({ ...item, label: zhNavLabels[item.href] || item.label })),
    hours: settings.hours.map((item) => ({
      day: zhDayLabels[item.day] || item.day,
      hours: zhHourLabels[item.hours] || item.hours,
    })),
    heroFeatures: zhSiteHeroFeatures,
    stats: zhStats,
  }
}

export function localizePage(page: PageDoc, locale: Locale): PageDoc {
  if (locale === 'en') return page
  return { ...page, ...(zhPages[page.slug] || {}) }
}

export function localizeService(service: ServiceDoc, locale: Locale): ServiceDoc {
  if (locale === 'en') return service
  return { ...service, ...(zhServices[service.slug] || {}) }
}

export function localizeTechnician(technician: TechnicianDoc, locale: Locale): TechnicianDoc {
  if (locale === 'en') return technician
  return { ...technician, ...(zhTechnicians[technician.slug] || {}) }
}
