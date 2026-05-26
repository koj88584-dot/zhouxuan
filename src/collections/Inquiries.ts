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
    description: {
      en: 'Guest inquiries submitted through the contact form.',
      zh: '通过联系表单提交的客人咨询。',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: fieldLabels.name,
      required: true,
      admin: {
        description: {
          en: 'Guest\'s full name.',
          zh: '客人的全名。',
        },
      },
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
      admin: {
        description: {
          en: 'Optional contact number.',
          zh: '可选的联系电话。',
        },
      },
    },
    {
      name: 'serviceSlug',
      type: 'text',
      label: fieldLabels.serviceSlug,
      admin: {
        description: {
          en: 'Which service this inquiry relates to (if specified).',
          zh: '此咨询相关的服务项目（如果有指定）。',
        },
      },
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
        description: {
          en: 'Track your response progress.',
          zh: '跟踪回复进度。',
        },
      },
    },
  ],
}
