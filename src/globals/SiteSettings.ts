import type { GlobalConfig } from 'payload'
import { adminGroups, fieldLabels, globalLabels } from '@/collections/admin-labels'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: globalLabels.siteSettings,
  admin: {
    group: adminGroups.siteContent,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: fieldLabels.siteName,
      required: true,
    },
    {
      name: 'siteTagline',
      type: 'text',
      label: fieldLabels.siteTagline,
      required: true,
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      label: fieldLabels.siteDescription,
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'bookingUrl',
          type: 'text',
          label: fieldLabels.bookingUrl,
          required: true,
        },
        {
          name: 'giftCardUrl',
          type: 'text',
          label: fieldLabels.giftCardUrl,
          required: true,
        },
      ],
    },
    {
      name: 'primaryNav',
      type: 'array',
      label: fieldLabels.primaryNav,
      fields: [
        { name: 'label', type: 'text', label: fieldLabels.label, required: true },
        { name: 'href', type: 'text', label: fieldLabels.href, required: true },
      ],
    },
    {
      name: 'footerNav',
      type: 'array',
      label: fieldLabels.footerNav,
      fields: [
        { name: 'label', type: 'text', label: fieldLabels.label, required: true },
        { name: 'href', type: 'text', label: fieldLabels.href, required: true },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: fieldLabels.contact,
      fields: [
        { name: 'addressLine1', type: 'text', label: fieldLabels.addressLine1, required: true },
        { name: 'addressLine2', type: 'text', label: fieldLabels.addressLine2, required: true },
        { name: 'phone', type: 'text', label: fieldLabels.phone, required: true },
        { name: 'email', type: 'email', label: fieldLabels.email, required: true },
        { name: 'mapQuery', type: 'text', label: fieldLabels.mapQuery, required: true },
      ],
    },
    {
      name: 'hours',
      type: 'array',
      label: fieldLabels.hours,
      fields: [
        { name: 'day', type: 'text', label: fieldLabels.day, required: true },
        { name: 'hours', type: 'text', label: fieldLabels.hours, required: true },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      label: fieldLabels.socials,
      fields: [
        { name: 'label', type: 'text', label: fieldLabels.label, required: true },
        { name: 'href', type: 'text', label: fieldLabels.href, required: true },
      ],
    },
    {
      name: 'heroFeatures',
      type: 'array',
      label: fieldLabels.heroFeatures,
      fields: [
        { name: 'title', type: 'text', label: fieldLabels.title, required: true },
        { name: 'copy', type: 'textarea', label: fieldLabels.copy, required: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: fieldLabels.stats,
      fields: [
        { name: 'label', type: 'text', label: fieldLabels.label, required: true },
        { name: 'value', type: 'text', label: fieldLabels.value, required: true },
      ],
    },
  ],
}
