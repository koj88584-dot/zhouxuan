import type { PageDoc, ServiceDoc, SiteSettings, TechnicianDoc } from '@/lib/types'

export const localeCookieName = 'oasis-locale'
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
  '/booking': '预约',
  '/gift-cards': '礼品卡',
  '/nails': '美甲',
  '/contact-us': '联系我们',
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
  'By appointment': '预约制',
}

const zhSiteHeroFeatures: SiteSettings['heroFeatures'] = [
  {
    title: '麦迪逊静修空间',
    copy: '以深绿、暖光和安静节奏打造按摩、足疗、芳疗与身体恢复体验。',
  },
  {
    title: '按需求选择服务',
    copy: '情侣按摩、足部反射疗法、精油护理和组合项目都能快速看懂并预约。',
  },
  {
    title: '预约更直接',
    copy: '客人可在站内提交服务、技师、日期和时间偏好，门店再确认最终时段。',
  },
]

const zhStats: SiteSettings['stats'] = [
  { label: '按摩与护理项目', value: '09' },
  { label: '礼品卡', value: '可用' },
  { label: '位置', value: 'Odana Rd' },
]

const zhPages: Record<string, Partial<PageDoc>> = {
  aboutus: {
    title: '麦迪逊西区一处温暖安静的放松空间',
    eyebrow: '关于 Oasis Spa',
    summary: '我们相信专业身体护理不该匆忙。从进门开始，体验就应该放松、清晰、安心。',
    bodyContent:
      'Oasis Spa 将按摩、足部反射疗法、芳香护理和美甲放在同一个温柔空间里。整体氛围安静、干净、有质感，但不会让人觉得有距离。\n\n服务菜单保持简单清楚。你可以选择全身按摩、情侣护理、足疗，也可以加入精油或组合项目。每个项目都围绕当天身体最需要的感受来安排。\n\n这次重建也延续同样的方向：前台客人看到的是高端、好用、少文字的页面；后台团队则能管理服务、技师、预约和咨询。',
    highlights: ['安静放松的护理空间', '按摩、足疗与芳香护理', '在线预约与礼品卡入口'],
    ctaLabel: '查看服务',
  },
  services: {
    title: '按摩与足疗服务',
    eyebrow: '服务项目',
    summary: '选择项目、查看重点，并直接提交预约请求。',
    bodyContent: '菜单按客人需求组织：全身放松、局部缓解、情侣体验，以及更完整的组合护理。',
  },
  nails: {
    title: '与按摩体验一致的安静美甲护理',
    eyebrow: '美甲',
    summary: '美甲页面作为按摩服务的补充，让手足护理也保持同样放松、干净、有质感的节奏。',
    bodyContent:
      'Oasis Spa 的美甲护理应与整体品牌保持一致：柔和灯光、细致准备、干净耐看的完成效果。\n\n页面结构保留弹性，后续可加入季节款、升级足部护理或护理组合，不需要再改代码。',
    highlights: ['精致手部护理', '恢复感足部护理', '可搭配升级护理'],
  },
  'contact-us': {
    title: '欢迎联系我们',
    eyebrow: '联系我们',
    summary: '查看地址、营业安排，或把预约和服务问题直接发给门店。',
    bodyContent:
      '联系页面要足够直接：客人可以快速找到位置、了解预约方式，并提交问题。\n\n表单会把咨询内容保存到 Payload，方便团队后续统一跟进。',
  },
  'gift-cards': {
    title: '把放松、恢复和慢节奏送给重要的人',
    eyebrow: '礼品卡',
    summary: '礼品卡入口保留熟悉的购买流程，同时页面视觉与 Oasis Spa 品牌保持一致。',
    bodyContent:
      '好的礼品卡体验应该像服务本身一样周到。这个页面简洁说明空间氛围、可预约项目，以及为什么一次放松护理是一份很贴心的礼物。\n\n当礼品卡链接准备好后，主按钮会直接进入购买流程；没有链接时，也能自然引导到预约或联系页面。',
    ctaLabel: '购买礼品卡',
  },
}

const zhServices: Record<string, Partial<ServiceDoc>> = {
  'body-massage': {
    title: '全身按摩',
    summary: '通过专业全身按摩放松身体与思绪。',
    bodyContent:
      '全身按摩是 Oasis Spa 的核心服务，适合想要稳定放松和全身恢复的客人。节奏舒缓，力度可沟通，帮助肩颈、背部和四肢慢慢松开。\n\n第一次来店也很适合从这个项目开始，因为它能覆盖大多数疲劳、紧张和恢复需求。',
    benefits: ['全身放松', '可沟通力度偏好', '适合第一次到店客人'],
    ritualSteps: ['到店沟通', '安静准备', '全身分区护理', '结束后慢慢回神'],
    ctaLabel: '立即预约',
  },
  'couples-massage': {
    title: '情侣按摩',
    summary: '与伴侣一起享受安静、有仪式感的放松体验。',
    bodyContent:
      '情侣按摩让两位客人在同一个节奏中放松，同时每个人的力度、重点部位和舒适度都可以分别沟通。\n\n适合纪念日、生日、礼品卡使用，或只是一起把忙碌生活暂停一会儿。',
    benefits: ['双人护理空间', '个人偏好可分别调整', '适合礼物和特别安排'],
    ritualSteps: ['双人欢迎', '舒适度确认', '并排护理', '结束后放松停留'],
    ctaLabel: '立即预约',
  },
  'foot-reflexology': {
    title: '足部反射疗法',
    summary: '通过专业足疗手法缓解紧张与疲劳。',
    bodyContent:
      '足部反射疗法聚焦脚部和小腿，适合久站、久走或想要短时间恢复的人。脚底压力释放后，身体也会更容易安静下来。\n\n它可以单独预约，也很适合和全身按摩组合。',
    benefits: ['足部与小腿重点缓解', '帮助身体放松沉静', '容易与其他护理搭配'],
    ritualSteps: ['温热准备', '足底反射区护理', '小腿放松', '清爽收尾'],
    ctaLabel: '立即预约',
  },
  'body-massage-and-foot-reflexology-combo': {
    title: '全身与足疗组合按摩',
    summary: '把全身放松和足部护理结合在一次更完整的体验里。',
    bodyContent:
      '组合按摩适合想一次完成更多恢复的人。全身护理帮助背部、肩颈和四肢松开，足疗让结束时更踏实、更轻松。\n\n它也是礼品卡、长时段护理和深度放松需求的优选。',
    benefits: ['全身放松加足部重点护理', '更完整的高级项目', '适合长时段恢复'],
    ritualSteps: ['需求沟通', '全身按摩流程', '足疗收尾', '恢复停留'],
    ctaLabel: '立即预约',
  },
  'aromatherapy-massage': {
    title: '芳香按摩',
    summary: '用舒缓香气加强按摩带来的放松感。',
    bodyContent:
      '芳香按摩把气味、呼吸和身体护理连接在一起，让整个过程更沉浸。它适合压力较大、想要更柔和 spa 感的客人。\n\n按摩本身仍然保持专业与稳定，香气只是让放松更容易发生。',
    benefits: ['更柔和沉浸的氛围', '适合压力较大的时期', '香气与按摩结合'],
    ritualSteps: ['选择香气', '呼吸与安定', '舒缓按摩', '安静结束'],
    ctaLabel: '立即预约',
  },
  'chair-massage': {
    title: '椅式按摩',
    summary: '快速有效地缓解背部、肩颈和上半身紧张。',
    bodyContent:
      '椅式按摩适合时间有限但肩颈很紧的人。它重点处理背部、肩颈和上半身，不需要完整护理房流程，也能快速释放压力。\n\n适合午休、短暂休息或临时想放松的客人。',
    benefits: ['短时高效', '重点缓解上半身', '容易放进忙碌日程'],
    ritualSteps: ['坐姿准备', '背肩重点护理', '颈部细节放松', '快速收尾'],
    ctaLabel: '立即预约',
  },
  'foot-reflexology-and-tuina-combo': {
    title: '足疗与推拿组合',
    summary: '足部护理与干式背部推拿结合，节奏更有力量。',
    bodyContent:
      '这个组合把足部放松和背部推拿结合起来，比纯放松项目更有结构感。适合喜欢明确力度和重点护理的回头客。\n\n它有自己的项目个性，同时仍然保持 Oasis Spa 的安静基调。',
    benefits: ['足部护理加背部重点', '有辨识度的组合项目', '适合偏好较强力度的客人'],
    ritualSteps: ['需求确认', '足部护理', '背部推拿', '清爽结束'],
    ctaLabel: '立即预约',
  },
  'cupping-therapy': {
    title: '拔罐护理',
    summary: '通过传统拔罐方式帮助局部释放与恢复。',
    bodyContent:
      '拔罐护理适合想要更针对性放松的人。项目会以专业、清楚的方式安排，不夸张承诺，只关注舒适和身体反馈。\n\n它可以单独预约，也可以作为深层按摩的补充。',
    benefits: ['局部组织释放', '丰富服务菜单', '可配合按摩护理计划'],
    ritualSteps: ['沟通确认', '目标区域放置', '控制释放', '护理后说明'],
    ctaLabel: '立即预约',
  },
  'essential-oils-massage': {
    title: '精油按摩',
    summary: '用精油提升按摩过程中的舒缓与恢复感。',
    bodyContent:
      '精油按摩保持放松为核心，同时强调气味和触感带来的 spa 氛围。它适合已经喜欢按摩、想要更丰富体验的客人。\n\n项目不复杂，但能让一次普通放松变得更有仪式感。',
    benefits: ['香气增强放松', '温柔且有 spa 感', '适合经典按摩升级'],
    ritualSteps: ['选择精油', '安静进入状态', '稳定按摩流程', '温和收尾'],
    ctaLabel: '立即预约',
  },
}

const zhTechnicians: Record<string, Partial<TechnicianDoc>> = {
  'any-available': {
    name: '任意可预约技师',
    title: '优先匹配合适时段',
    bio: '由门店根据服务、时间和力度偏好安排合适技师。',
    specialties: ['最快排期', '力度灵活', '适合首次到店'],
    languages: ['英语'],
    availabilityNote: '如果你更在意时间，建议选择此项。',
  },
  lina: {
    title: '放松按摩与芳香护理',
    bio: '节奏安静稳定，适合想要温柔恢复和 spa 感体验的客人。',
    specialties: ['芳香护理', '放松按摩', '情侣护理'],
    languages: ['英语', '中文'],
    availabilityNote: '适合全身放松类项目。',
  },
  kevin: {
    title: '重点身体护理与组合项目',
    bio: '更有结构感的护理方式，适合肩背紧张和组合按摩需求。',
    specialties: ['背部与肩颈', '组合按摩', '拔罐辅助'],
    languages: ['英语'],
    availabilityNote: '适合局部紧张缓解。',
  },
  mei: {
    title: '足疗与推拿',
    bio: '擅长足部护理和干式背部推拿，适合下肢疲劳和偏好更明确节奏的客人。',
    specialties: ['足部反射疗法', '推拿组合', '小腿放松'],
    languages: ['英语', '中文'],
    availabilityNote: '适合足疗与推拿组合。',
  },
}

export const uiCopy = {
  en: {
    common: {
      bookAppointment: 'Book Appointment',
      bookNow: 'Book Now',
      loading: 'Loading...',
      languageLabel: 'Language',
      english: 'English',
      chinese: '中文',
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
      eyebrow: 'Oasis Spa | Madison, WI',
      title: 'Relax, Rejuvenate, Refresh',
      summary: 'Massage, reflexology, nails, and gift cards on Odana Road.',
      viewServices: 'View Services',
      heroPills: ['Body Massage', 'Foot Reflexology', 'Couples Massage', 'Nails'],
      visitLabel: 'Visit',
      giftLabel: 'Gift',
      giftCopy: 'Spa cards ready online',
      menuLabel: 'Menu',
      menuCopy: 'Massage, feet, aroma, nails',
      aboutEyebrow: 'About Oasis Spa',
      aboutTitle: 'A polished spa experience that still feels warm and approachable.',
      learnMore: 'Learn more about the spa',
      servicesEyebrow: 'Our Services',
      servicesTitle: 'Signature sessions with direct booking paths',
      viewFullMenu: 'View full menu',
      companionCare: 'Companion care',
      nails: 'Nails',
      nailsSummary: 'Manicure and nail services in the same calm, spa-first atmosphere.',
      details: 'Details',
      atmosphere: 'Atmosphere',
      galleryTitles: ['Treatment Rooms', 'Quiet Details', 'Arrival Atmosphere'],
      giftCards: 'Gift Cards',
      giftTitle: 'Gift the spa experience.',
      giftSummary: 'Simple purchase flow, calmer presentation.',
      contactUs: 'Contact Us',
    },
    services: {
      mostBooked: 'Most booked',
      mostBookedItems: ['Body Massage', 'Couples Massage', 'Foot Reflexology', 'Combo Massage'],
    },
    serviceCard: {
      signature: 'Signature service',
      details: 'Details',
      squarePricing: 'Square-synced pricing',
    },
    bookingPage: {
      eyebrow: 'Book Appointment',
      title: 'Plan your spa visit',
      summary: 'Choose a service, technician preference, and time. The team will confirm the appointment.',
      loading: 'Loading booking options...',
    },
    bookingForm: {
      chooseService: 'Choose service',
      technician: 'Technician',
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
      notesPlaceholder: 'Pressure preference, couple booking details, or anything the team should know.',
      sending: 'Sending request',
      submit: 'Request appointment',
      checkForm: 'Please check the form.',
      success: 'Request received. The spa will confirm your appointment.',
      submitted: 'Request submitted.',
      timeSlots: ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM', '7:00 PM'],
    },
    serviceDetail: {
      eyebrow: 'Service Detail',
      backToMenu: 'Back to menu',
      benefits: 'Benefits',
      rhythm: 'Session rhythm',
    },
    about: {
      viewServiceMenu: 'View service menu',
      atmosphereCues: 'Atmosphere cues',
    },
    contact: {
      visitStudio: 'Visit the studio',
      locationHours: 'Location & hours',
      fallback: 'Update direct contact details in Payload when ready.',
      panelEyebrow: 'Relax, Refresh, Reconnect',
      panelTitle: 'Contact us today.',
      panelSummary: 'Ask about bookings, service fit, or gift cards.',
      bestFor: 'Best for:',
      bestForItems: ['Booking questions', 'Service pairing help', 'Group, couples, and gift card inquiries'],
      sendMessage: 'Send us a message',
      formTitle: "Have questions? Let's make your visit feel easy.",
      formSummary: 'Tell the team what you need and how to reach you.',
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
      purchase: 'Purchase gift card',
      ask: 'Ask a question',
      why: 'Why it works',
      points: ['Easy to send', 'Great for massage and reflexology', 'Backed by the Square gift card flow'],
      imageAlt: 'Gift card atmosphere at Oasis Spa',
    },
    nails: {
      book: 'Book nail care',
      imageAlt: 'Nail care service at Oasis Spa',
      treatments: [
        {
          name: 'Refined manicure',
          copy: 'Detailed shaping, cuticle care, and a finish that stays aligned with the spa atmosphere.',
        },
        {
          name: 'Pedicure recovery',
          copy: 'Warm prep, restorative foot attention, and a more relaxed pace than a standard salon visit.',
        },
        {
          name: 'Quiet add-ons',
          copy: 'Hydration, longer massage steps, and seasonal touches that elevate the appointment.',
        },
      ],
    },
    notFound: {
      eyebrow: 'Page not found',
      title: 'This path is not part of the current spa map.',
      summary: 'If this came from an older Square or product link, the redirect rules may need another mapping entry.',
      action: 'Return home',
    },
  },
  zh: {
    common: {
      bookAppointment: '预约护理',
      bookNow: '立即预约',
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
      navigate: '导航',
      contactFallback: '联系方式可在 Payload 后台更新。',
    },
    home: {
      eyebrow: 'Oasis Spa | Madison, WI',
      title: '放松，恢复，重新出发',
      summary: 'Odana Road 上的按摩、足疗、美甲与礼品卡服务。',
      viewServices: '查看服务',
      heroPills: ['全身按摩', '足部反射疗法', '情侣按摩', '美甲'],
      visitLabel: '地址',
      giftLabel: '礼品',
      giftCopy: '线上购买 spa 礼品卡',
      menuLabel: '菜单',
      menuCopy: '按摩、足疗、芳疗、美甲',
      aboutEyebrow: '关于 Oasis Spa',
      aboutTitle: '有质感，但依然温暖好进入的 spa 体验。',
      learnMore: '了解门店',
      servicesEyebrow: '服务项目',
      servicesTitle: '可直接预约的招牌护理',
      viewFullMenu: '查看完整菜单',
      companionCare: '配套护理',
      nails: '美甲',
      nailsSummary: '在同样安静、spa 感的氛围中完成手部与美甲护理。',
      details: '详情',
      atmosphere: '空间氛围',
      galleryTitles: ['护理房间', '安静细节', '到店氛围'],
      giftCards: '礼品卡',
      giftTitle: '把 spa 体验送出去。',
      giftSummary: '购买路径简单，页面表达更安静。',
      contactUs: '联系我们',
    },
    services: {
      mostBooked: '热门预约',
      mostBookedItems: ['全身按摩', '情侣按摩', '足部反射疗法', '组合按摩'],
    },
    serviceCard: {
      signature: '招牌服务',
      details: '详情',
      squarePricing: '价格同步中',
    },
    bookingPage: {
      eyebrow: '预约护理',
      title: '安排你的 spa 到店时间',
      summary: '选择服务、技师偏好、日期和时间，门店会再确认最终预约。',
      loading: '正在加载预约选项...',
    },
    bookingForm: {
      chooseService: '选择服务',
      technician: '选择技师',
      timeRequest: '时间偏好',
      date: '日期',
      time: '时间',
      duration: '时长',
      bestFit: '门店推荐',
      yourDetails: '你的信息',
      fullName: '姓名',
      phone: '电话',
      email: '邮箱',
      notes: '备注',
      notesPlaceholder: '例如力度偏好、情侣预约说明，或需要门店提前知道的信息。',
      sending: '正在提交',
      submit: '提交预约请求',
      checkForm: '请检查表单信息。',
      success: '预约请求已收到，门店会联系你确认。',
      submitted: '预约请求已提交。',
      timeSlots: ['上午 10:00', '上午 11:30', '下午 1:00', '下午 2:30', '下午 4:00', '下午 5:30', '晚上 7:00'],
    },
    serviceDetail: {
      eyebrow: '服务详情',
      backToMenu: '返回菜单',
      benefits: '适合你如果',
      rhythm: '护理流程',
    },
    about: {
      viewServiceMenu: '查看服务菜单',
      atmosphereCues: '空间感受',
    },
    contact: {
      visitStudio: '到店信息',
      locationHours: '地址与时间',
      fallback: '准备好后可在 Payload 后台更新电话和邮箱。',
      panelEyebrow: '放松，恢复，再连接',
      panelTitle: '今天就联系我们。',
      panelSummary: '可以询问预约、服务选择或礼品卡问题。',
      bestFor: '适合咨询：',
      bestForItems: ['预约问题', '服务搭配建议', '团体、情侣与礼品卡咨询'],
      sendMessage: '发送消息',
      formTitle: '有问题？让到店变得更轻松。',
      formSummary: '告诉门店你的需求和联系方式。',
      mapTitle: '门店地图',
    },
    contactForm: {
      fullName: '姓名',
      email: '邮箱',
      phone: '电话',
      service: '服务',
      generalInquiry: '一般咨询',
      message: '留言',
      sending: '发送中...',
      submit: '发送消息',
      error: '提交失败，请稍后再试。',
      success: '谢谢，消息已收到。',
      setup: '消息已提交，但还需要配置通知后才能送达。',
    },
    giftCards: {
      purchase: '购买礼品卡',
      ask: '咨询问题',
      why: '为什么适合送礼',
      points: ['发送简单', '适合按摩与足疗', '连接 Square 礼品卡流程'],
      imageAlt: 'Oasis Spa 礼品卡氛围',
    },
    nails: {
      book: '预约美甲',
      imageAlt: 'Oasis Spa 美甲护理服务',
      treatments: [
        {
          name: '精致手部护理',
          copy: '修形、甲缘护理和干净耐看的完成效果，与 spa 氛围保持一致。',
        },
        {
          name: '足部恢复护理',
          copy: '温热准备、足部放松和更慢的护理节奏，比普通沙龙更轻松。',
        },
        {
          name: '安静升级项',
          copy: '保湿、延长按摩步骤和季节性细节，让预约更完整。',
        },
      ],
    },
    notFound: {
      eyebrow: '页面未找到',
      title: '这个路径不在当前 spa 网站地图中。',
      summary: '如果这是旧的 Square 或商品链接，可能需要新增一条跳转规则。',
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
    siteTagline: 'Odana Road | 威斯康星麦迪逊',
    siteDescription: '欢迎来到 Oasis Spa。这里是麦迪逊一处安静、专业、适合放松与恢复的 spa 空间。',
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
