import type { ServerProps } from 'payload'
import Link from 'next/link'
import type { Booking } from '@/payload-types'

type DashboardLanguage = 'en' | 'zh'

const dashboardCopy = {
  en: {
    title: 'Today at a glance',
    eyebrow: 'Spa operations',
    intro: 'Review requests, keep services current, and keep the front desk moving.',
    newBookings: 'New bookings',
    newInquiries: 'New inquiries',
    activeServices: 'Active services',
    activeTechnicians: 'Active technicians',
    recentBookings: 'Recent booking requests',
    emptyBookings: 'No booking requests yet.',
    loadError: 'Dashboard summary is temporarily unavailable.',
    reviewBookings: 'Review bookings',
    reviewInquiries: 'Review inquiries',
    editServices: 'Edit services',
    manageTechnicians: 'Manage technicians',
    siteSettings: 'Site settings',
    anyTechnician: 'Any technician',
  },
  zh: {
    title: '今日运营概览',
    eyebrow: '门店运营',
    intro: '快速处理预约、咨询、服务项目和技师信息，让前台工作更顺。',
    newBookings: '新预约',
    newInquiries: '新咨询',
    activeServices: '启用服务',
    activeTechnicians: '启用技师',
    recentBookings: '最近预约请求',
    emptyBookings: '暂时还没有预约请求。',
    loadError: '暂时无法加载后台概览。',
    reviewBookings: '查看预约',
    reviewInquiries: '查看咨询',
    editServices: '编辑服务',
    manageTechnicians: '管理技师',
    siteSettings: '网站设置',
    anyTechnician: '任意技师',
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

  const stats = [
    {
      href: '/admin/collections/bookings?where[status][equals]=new',
      label: text.newBookings,
      value: dashboardData.newBookings,
    },
    {
      href: '/admin/collections/inquiries?where[status][equals]=new',
      label: text.newInquiries,
      value: dashboardData.newInquiries,
    },
    {
      href: '/admin/collections/services',
      label: text.activeServices,
      value: dashboardData.activeServices,
    },
    {
      href: '/admin/collections/technicians',
      label: text.activeTechnicians,
      value: dashboardData.activeTechnicians,
    },
  ]

  return (
    <section className="admin-dashboard-overview">
      <div className="admin-dashboard-overview__hero">
        <div>
          <p className="admin-dashboard-overview__eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
        </div>
        <div className="admin-dashboard-overview__actions">
          <Link href="/admin/collections/bookings?where[status][equals]=new">
            {text.reviewBookings}
          </Link>
          <Link href="/admin/collections/inquiries?where[status][equals]=new">
            {text.reviewInquiries}
          </Link>
          <Link href="/admin/globals/site-settings">{text.siteSettings}</Link>
        </div>
      </div>

      <div className="admin-dashboard-overview__stats">
        {stats.map((stat) => (
          <Link className="admin-dashboard-overview__stat" href={stat.href} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </Link>
        ))}
      </div>

      <div className="admin-dashboard-overview__panel">
        <div className="admin-dashboard-overview__panel-header">
          <h3>{text.recentBookings}</h3>
          <div>
            <Link href="/admin/collections/services">{text.editServices}</Link>
            <Link href="/admin/collections/technicians">{text.manageTechnicians}</Link>
          </div>
        </div>
        {dashboardData.recentBookings.length > 0 ? (
          <ul className="admin-dashboard-overview__booking-list">
            {dashboardData.recentBookings.map((booking) => (
              <li key={booking.id}>
                <span>
                  <strong>{booking.name}</strong>
                  <small>
                    {booking.serviceTitle} · {booking.technicianName || text.anyTechnician}
                  </small>
                </span>
                <time dateTime={booking.createdAt}>{formatDate(booking.createdAt, language)}</time>
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
