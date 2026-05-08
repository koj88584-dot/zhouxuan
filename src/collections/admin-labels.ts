import type { CollectionConfig } from 'payload'

export const adminGroups = {
  admin: {
    en: 'Admin',
    zh: '后台管理',
  },
  siteContent: {
    en: 'Site Content',
    zh: '网站内容',
  },
  spaOperations: {
    en: 'Spa Operations',
    zh: '门店运营',
  },
} satisfies Record<string, Record<string, string>>

export const collectionLabels = {
  bookings: {
    singular: {
      en: 'Booking',
      zh: '预约',
    },
    plural: {
      en: 'Bookings',
      zh: '预约',
    },
  },
  inquiries: {
    singular: {
      en: 'Inquiry',
      zh: '咨询',
    },
    plural: {
      en: 'Inquiries',
      zh: '咨询',
    },
  },
  media: {
    singular: {
      en: 'Media',
      zh: '媒体',
    },
    plural: {
      en: 'Media',
      zh: '媒体',
    },
  },
  pages: {
    singular: {
      en: 'Page',
      zh: '页面',
    },
    plural: {
      en: 'Pages',
      zh: '页面',
    },
  },
  redirects: {
    singular: {
      en: 'Redirect',
      zh: '跳转规则',
    },
    plural: {
      en: 'Redirects',
      zh: '跳转规则',
    },
  },
  services: {
    singular: {
      en: 'Service',
      zh: '服务项目',
    },
    plural: {
      en: 'Services',
      zh: '服务项目',
    },
  },
  technicians: {
    singular: {
      en: 'Technician',
      zh: '技师',
    },
    plural: {
      en: 'Technicians',
      zh: '技师',
    },
  },
  users: {
    singular: {
      en: 'User',
      zh: '管理员',
    },
    plural: {
      en: 'Users',
      zh: '管理员',
    },
  },
} satisfies Record<string, NonNullable<CollectionConfig['labels']>>

export const globalLabels = {
  siteSettings: {
    en: 'Site Settings',
    zh: '网站设置',
  },
} satisfies Record<string, Record<string, string>>

export const fieldLabels = {
  active: { en: 'Active', zh: '启用' },
  addressLine1: { en: 'Address line 1', zh: '地址第一行' },
  addressLine2: { en: 'Address line 2', zh: '地址第二行' },
  alt: { en: 'Alt text', zh: '图片替代文字' },
  availabilityNote: { en: 'Availability note', zh: '可预约说明' },
  benefits: { en: 'Benefits', zh: '服务亮点' },
  binding: { en: 'Square binding', zh: 'Square 绑定' },
  bio: { en: 'Bio', zh: '简介' },
  bodyContent: { en: 'Body content', zh: '正文内容' },
  bookingUrl: { en: 'Booking URL', zh: '预约链接' },
  caption: { en: 'Caption', zh: '图片说明' },
  contact: { en: 'Contact', zh: '联系方式' },
  copy: { en: 'Copy', zh: '说明' },
  ctaHref: { en: 'CTA link', zh: '按钮链接' },
  ctaLabel: { en: 'CTA label', zh: '按钮文字' },
  ctaType: { en: 'CTA type', zh: '按钮类型' },
  day: { en: 'Day', zh: '星期' },
  displayOrder: { en: 'Display order', zh: '排序' },
  displayPriceMode: { en: 'Price display mode', zh: '价格显示方式' },
  duration: { en: 'Duration', zh: '时长' },
  durationPreference: { en: 'Duration preference', zh: '时长偏好' },
  email: { en: 'Email', zh: '邮箱' },
  eyebrow: { en: 'Eyebrow', zh: '短标题' },
  featured: { en: 'Featured', zh: '推荐服务' },
  footerNav: { en: 'Footer navigation', zh: '页脚导航' },
  from: { en: 'From', zh: '来源路径' },
  giftCardUrl: { en: 'Gift card URL', zh: '礼品卡链接' },
  heroFeatures: { en: 'Hero feature cards', zh: '首页卖点卡片' },
  heroImage: { en: 'Hero image', zh: '主图' },
  highlights: { en: 'Highlights', zh: '重点' },
  hours: { en: 'Hours', zh: '营业时间' },
  href: { en: 'Link', zh: '链接' },
  icon: { en: 'Icon', zh: '图标' },
  internalNotes: { en: 'Internal notes', zh: '内部备注' },
  label: { en: 'Label', zh: '显示文字' },
  languages: { en: 'Languages', zh: '语言' },
  lastSyncedAt: { en: 'Last synced at', zh: '上次同步时间' },
  mapQuery: { en: 'Map query', zh: '地图搜索词' },
  message: { en: 'Message', zh: '留言' },
  name: { en: 'Name', zh: '姓名' },
  notes: { en: 'Guest notes', zh: '客人备注' },
  permanent: { en: 'Permanent redirect', zh: '永久跳转' },
  phone: { en: 'Phone', zh: '电话' },
  preferredDate: { en: 'Preferred date', zh: '偏好日期' },
  preferredTime: { en: 'Preferred time', zh: '偏好时间' },
  priceLabel: { en: 'Price label', zh: '价格文字' },
  primaryNav: { en: 'Primary navigation', zh: '主导航' },
  ritualSteps: { en: 'Session steps', zh: '护理流程' },
  role: { en: 'Role', zh: '角色' },
  serviceSlug: { en: 'Service slug', zh: '服务标识' },
  serviceSlugs: { en: 'Service slugs this technician can perform', zh: '该技师可服务项目标识' },
  serviceTitle: { en: 'Service title', zh: '服务名称' },
  siteDescription: { en: 'Site description', zh: '网站简介' },
  siteName: { en: 'Site name', zh: '网站名称' },
  siteTagline: { en: 'Site tagline', zh: '网站副标题' },
  slug: { en: 'Slug', zh: '页面标识' },
  socials: { en: 'Social links', zh: '社交链接' },
  source: { en: 'Source', zh: '来源' },
  specialties: { en: 'Specialties', zh: '专长' },
  squareAppointmentUrl: { en: 'Square appointment URL', zh: 'Square 预约链接' },
  squareCategoryId: { en: 'Square category ID', zh: 'Square 分类 ID' },
  squareItemId: { en: 'Square item ID', zh: 'Square 项目 ID' },
  stats: { en: 'Stats', zh: '数据卡片' },
  status: { en: 'Status', zh: '状态' },
  summary: { en: 'Summary', zh: '摘要' },
  technicianName: { en: 'Technician name', zh: '技师姓名' },
  technicianSlug: { en: 'Technician slug', zh: '技师标识' },
  title: { en: 'Title', zh: '标题' },
  to: { en: 'To', zh: '目标路径' },
  value: { en: 'Value', zh: '内容' },
} satisfies Record<string, Record<string, string>>

export const bookingStatusOptions = [
  { label: { en: 'New request', zh: '新预约' }, value: 'new' },
  { label: { en: 'Confirmed', zh: '已确认' }, value: 'confirmed' },
  { label: { en: 'Completed', zh: '已完成' }, value: 'completed' },
  { label: { en: 'Cancelled', zh: '已取消' }, value: 'cancelled' },
  { label: { en: 'No show', zh: '未到店' }, value: 'no-show' },
]

export const inquiryStatusOptions = [
  { label: { en: 'New', zh: '新咨询' }, value: 'new' },
  { label: { en: 'Replied', zh: '已回复' }, value: 'replied' },
  { label: { en: 'Archived', zh: '已归档' }, value: 'archived' },
]

export const ctaTypeOptions = [
  { label: { en: 'Booking', zh: '预约' }, value: 'booking' },
  { label: { en: 'Gift card', zh: '礼品卡' }, value: 'gift-card' },
  { label: { en: 'Internal link', zh: '站内链接' }, value: 'internal' },
]

export const displayPriceOptions = [
  { label: { en: 'Custom label', zh: '自定义文字' }, value: 'custom' },
  { label: { en: 'Square synced', zh: 'Square 同步' }, value: 'square' },
  { label: { en: 'Hidden', zh: '隐藏' }, value: 'hidden' },
]

export const serviceIconOptions = [
  { label: { en: 'Lotus', zh: '莲花' }, value: 'lotus' },
  { label: { en: 'Sparkles', zh: '光芒' }, value: 'sparkles' },
  { label: { en: 'Hand', zh: '手法' }, value: 'hand' },
  { label: { en: 'Leaf', zh: '草本' }, value: 'leaf' },
  { label: { en: 'Moon', zh: '月亮' }, value: 'moon' },
  { label: { en: 'Waves', zh: '水波' }, value: 'waves' },
  { label: { en: 'Gem', zh: '宝石' }, value: 'gem' },
  { label: { en: 'Flower', zh: '花朵' }, value: 'flower' },
]

export const userRoleOptions = [
  { label: { en: 'Admin', zh: '管理员' }, value: 'admin' },
  { label: { en: 'Editor', zh: '编辑' }, value: 'editor' },
]
