import Link from 'next/link'
import type { ServerProps } from 'payload'
import type { Booking } from '@/payload-types'

type DashboardLanguage = 'en' | 'zh'

const dashboardCopy = {
  en: {
    title: 'Calm control for today’s spa floor',
    eyebrow: 'Spa operations',
    intro:
      'Track fresh requests, review messages, and keep service details polished from one boutique workspace.',
    highlightLabel: 'Needs attention',
    highlightValue: 'Front desk pulse',
    newBookings: 'New bookings',
    newBookingsHint: 'Fresh appointment requests waiting to be reviewed.',
    newInquiries: 'New inquiries',
    newInquiriesHint: 'Guest messages and consultation requests that need a reply.',
    activeServices: 'Active services',
    activeServicesHint: 'Published offerings currently visible to guests.',
    activeTechnicians: 'Active technicians',
    activeTechniciansHint: 'Team members available for assignment.',
    recentBookings: 'Recent booking requests',
    recentBookingsIntro: 'A quick task list for the latest guest activity.',
    emptyBookings: 'No booking requests yet.',
    loadError: 'Dashboard summary is temporarily unavailable.',
    reviewBookings: 'Review bookings',
    reviewInquiries: 'Review inquiries',
    editServices: 'Edit services',
    manageTechnicians: 'Manage technicians',
    siteSettings: 'Site settings',
    anyTechnician: 'Any technician',
    quickActions: 'Quick actions',
    quickActionsIntro: 'Jump straight into the parts of the admin you touch most often.',
    settingsNote: 'Fine-tune global content and operational details.',
    totalOpenLabel: 'Open items',
  },
  zh: {
    title: '优雅掌握今日门店节奏',
    eyebrow: '门店运营',
    intro: '在一个柔和而高效的后台里处理预约、回复咨询，并保持服务内容始终精致完整。',
    highlightLabel: '优先处理',
    highlightValue: '前台动态',
    newBookings: '新预约',
    newBookingsHint: '等待确认或跟进的预约申请。',
    newInquiries: '新咨询',
    newInquiriesHint: '需要回复的客人消息与咨询请求。',
    activeServices: '启用服务',
    activeServicesHint: '当前对外展示的服务项目数量。',
    activeTechnicians: '启用技师',
    activeTechniciansHint: '可安排接单的技师人数。',
    recentBookings: '最新预约请求',
    recentBookingsIntro: '用更轻松的方式查看刚刚进入后台的客人需求。',
    emptyBookings: '暂时还没有新的预约请求。',
    loadError: '暂时无法加载后台概览。',
    reviewBookings: '查看预约',
    reviewInquiries: '查看咨询',
    editServices: '编辑服务',
    manageTechnicians: '管理技师',
    siteSettings: '网站设置',
    anyTechnician: '任意技师',
    quickActions: '快捷入口',
    quickActionsIntro: '快速进入日常最常使用的后台模块。',
    settingsNote: '统一调整站点内容与运营信息。',
    totalOpenLabel: '待处理事项',
  },
} satisfies Record<DashboardLanguage, Record<string, string>>

const formatDate = (value: string, language: DashboardLanguage) =>
  new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))

const getDashboardData = async (payload: ServerProps['payload']) => {
  try {
    const [newBookings, newInquiries, activeServices, activeTechnicians, recentBookings] =
      await Promise.all([
        payload.find({
          collection: 'bookings',
          depth: 0,
          limit: 0,
          where: {
            status: {
              equals: 'new',
            },
          },
        }),
        payload.find({
          collection: 'inquiries',
          depth: 0,
          limit: 0,
          where: {
            status: {
              equals: 'new',
            },
          },
        }),
        payload.find({
          collection: 'services',
          depth: 0,
          limit: 0,
          where: {
            'binding.active': {
              equals: true,
            },
          },
        }),
        payload.find({
          collection: 'technicians',
          depth: 0,
          limit: 0,
          where: {
            active: {
              equals: true,
            },
          },
        }),
        payload.find({
          collection: 'bookings',
          depth: 0,
          limit: 5,
          sort: '-createdAt',
        }),
      ])

    return {
      activeServices: activeServices.totalDocs,
      activeTechnicians: activeTechnicians.totalDocs,
      newBookings: newBookings.totalDocs,
      newInquiries: newInquiries.totalDocs,
      recentBookings: recentBookings.docs as Booking[],
    }
  } catch {
    return null
  }
}

export default async function AdminDashboardOverview({ i18n, payload }: ServerProps) {
  const language: DashboardLanguage = i18n.language?.startsWith('zh') ? 'zh' : 'en'
  const text = dashboardCopy[language]
  const dashboardData = await getDashboardData(payload)

  if (!dashboardData) {
    return (
      <section className="admin-dashboard-overview admin-dashboard-overview--error">
        <p className="admin-dashboard-overview__eyebrow">{text.eyebrow}</p>
        <h2>{text.title}</h2>
        <p>{text.loadError}</p>
      </section>
    )
  }

  const openItems = dashboardData.newBookings + dashboardData.newInquiries

  const primaryStats = [
    {
      href: '/admin/collections/bookings?where[status][equals]=new',
      label: text.newBookings,
      note: text.newBookingsHint,
      value: dashboardData.newBookings,
      tone: 'primary',
    },
    {
      href: '/admin/collections/inquiries?where[status][equals]=new',
      label: text.newInquiries,
      note: text.newInquiriesHint,
      value: dashboardData.newInquiries,
      tone: 'primary',
    },
  ]

  const supportStats = [
    {
      href: '/admin/collections/services',
      label: text.activeServices,
      note: text.activeServicesHint,
      value: dashboardData.activeServices,
    },
    {
      href: '/admin/collections/technicians',
      label: text.activeTechnicians,
      note: text.activeTechniciansHint,
      value: dashboardData.activeTechnicians,
    },
  ]

  const quickActions = [
    {
      href: '/admin/collections/services',
      label: text.editServices,
      note: text.activeServicesHint,
    },
    {
      href: '/admin/collections/technicians',
      label: text.manageTechnicians,
      note: text.activeTechniciansHint,
    },
    {
      href: '/admin/globals/site-settings',
      label: text.siteSettings,
      note: text.settingsNote,
    },
  ]

  return (
    <section className="admin-dashboard-overview">
      <div className="admin-dashboard-overview__hero">
        <div className="admin-dashboard-overview__story">
          <p className="admin-dashboard-overview__eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
          <div className="admin-dashboard-overview__actions">
            <Link href="/admin/collections/bookings?where[status][equals]=new">
              {text.reviewBookings}
            </Link>
            <Link href="/admin/collections/inquiries?where[status][equals]=new">
              {text.reviewInquiries}
            </Link>
          </div>
        </div>

        <div className="admin-dashboard-overview__focus-card">
          <div className="admin-dashboard-overview__focus-label">
            <span>{text.highlightLabel}</span>
            <strong>{text.highlightValue}</strong>
          </div>
          <div className="admin-dashboard-overview__focus-value">
            <span>{text.totalOpenLabel}</span>
            <strong>{openItems}</strong>
          </div>
          <div className="admin-dashboard-overview__focus-grid">
            {primaryStats.map((stat) => (
              <Link
                className="admin-dashboard-overview__focus-chip"
                href={stat.href}
                key={stat.label}
              >
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-dashboard-overview__body">
        <div className="admin-dashboard-overview__metrics">
          <div className="admin-dashboard-overview__stats admin-dashboard-overview__stats--primary">
            {primaryStats.map((stat) => (
              <Link
                className="admin-dashboard-overview__stat admin-dashboard-overview__stat--primary"
                href={stat.href}
                key={stat.label}
              >
                <span className="admin-dashboard-overview__stat-label">{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.note}</small>
              </Link>
            ))}
          </div>

          <div className="admin-dashboard-overview__stats admin-dashboard-overview__stats--support">
            {supportStats.map((stat) => (
              <Link className="admin-dashboard-overview__stat" href={stat.href} key={stat.label}>
                <span className="admin-dashboard-overview__stat-label">{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.note}</small>
              </Link>
            ))}
          </div>
        </div>

        <div className="admin-dashboard-overview__panel admin-dashboard-overview__panel--actions">
          <div className="admin-dashboard-overview__panel-header admin-dashboard-overview__panel-header--stacked">
            <div>
              <p className="admin-dashboard-overview__eyebrow admin-dashboard-overview__eyebrow--soft">
                {text.quickActions}
              </p>
              <h3>{text.quickActions}</h3>
            </div>
            <p className="admin-dashboard-overview__panel-copy">{text.quickActionsIntro}</p>
          </div>

          <div className="admin-dashboard-overview__action-grid">
            {quickActions.map((action) => (
              <Link className="admin-dashboard-overview__action-card" href={action.href} key={action.label}>
                <strong>{action.label}</strong>
                <span>{action.note}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-dashboard-overview__panel">
        <div className="admin-dashboard-overview__panel-header">
          <div>
            <p className="admin-dashboard-overview__eyebrow admin-dashboard-overview__eyebrow--soft">
              {text.recentBookings}
            </p>
            <h3>{text.recentBookings}</h3>
          </div>
          <p className="admin-dashboard-overview__panel-copy">{text.recentBookingsIntro}</p>
        </div>

        {dashboardData.recentBookings.length > 0 ? (
          <ul className="admin-dashboard-overview__booking-list">
            {dashboardData.recentBookings.map((booking) => (
              <li key={booking.id}>
                <div className="admin-dashboard-overview__booking-copy">
                  <span className="admin-dashboard-overview__booking-name">{booking.name}</span>
                  <small>
                    {booking.serviceTitle} · {booking.technicianName || text.anyTechnician}
                  </small>
                </div>
                <div className="admin-dashboard-overview__booking-meta">
                  <time dateTime={booking.createdAt}>{formatDate(booking.createdAt, language)}</time>
                  <Link href="/admin/collections/bookings?where[status][equals]=new">
                    {text.reviewBookings}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="admin-dashboard-overview__empty">{text.emptyBookings}</p>
        )}
      </div>
    </section>
  )
}
