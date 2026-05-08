import type { CollectionConfig } from 'payload'
import { adminGroups, collectionLabels, fieldLabels } from '@/collections/admin-labels'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  labels: collectionLabels.redirects,
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'permanent'],
    group: adminGroups.siteContent,
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      label: fieldLabels.from,
      required: true,
      unique: true,
    },
    {
      name: 'to',
      type: 'text',
      label: fieldLabels.to,
      required: true,
    },
    {
      name: 'permanent',
      type: 'checkbox',
      label: fieldLabels.permanent,
      defaultValue: true,
    },
  ],
}
