import type { CollectionConfig } from 'payload'
import {
  adminGroups,
  collectionLabels,
  fieldLabels,
  inquiryStatusOptions,
} from '@/collections/admin-labels'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: collectionLabels.inquiries,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'serviceSlug', 'status', 'createdAt'],
    group: adminGroups.spaOperations,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: fieldLabels.name,
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: fieldLabels.email,
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: fieldLabels.phone,
    },
    {
      name: 'serviceSlug',
      type: 'text',
      label: fieldLabels.serviceSlug,
    },
    {
      name: 'message',
      type: 'textarea',
      label: fieldLabels.message,
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: fieldLabels.status,
      defaultValue: 'new',
      options: inquiryStatusOptions,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
