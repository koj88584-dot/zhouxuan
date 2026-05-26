import type { CollectionConfig } from 'payload'
import { adminGroups, collectionLabels, fieldLabels } from '@/collections/admin-labels'
import { formatSlug } from '@/collections/slug-field'

export const Technicians: CollectionConfig = {
  slug: 'technicians',
  labels: collectionLabels.technicians,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'active', 'displayOrder', 'updatedAt'],
    group: adminGroups.spaOperations,
    description: {
      en: 'Manage technician profiles that appear on the booking page.',
      zh: '管理在预约页面显示的技师资料。',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: fieldLabels.name,
          required: true,
          admin: {
            description: {
              en: 'Full display name shown to guests.',
              zh: '向客人显示的全名。',
            },
          },
        },
        {
          name: 'slug',
          type: 'text',
          label: fieldLabels.slug,
          unique: true,
          required: true,
          hooks: {
            beforeValidate: [formatSlug('name')],
          },
          admin: {
            description: {
              en: 'Auto-generated URL identifier.',
              zh: '自动生成的 URL 标识符。',
            },
          },
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: fieldLabels.title,
      required: true,
      admin: {
        description: {
          en: 'Professional title, e.g. "Senior Massage Therapist".',
          zh: '职称，例如"高级按摩师"。',
        },
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: fieldLabels.bio,
      required: true,
      admin: {
        description: {
          en: 'A brief introduction paragraph about this technician.',
          zh: '关于该技师的简要介绍。',
        },
      },
    },
    {
      name: 'serviceSlugs',
      type: 'array',
      label: fieldLabels.serviceSlugs,
      admin: {
        description: {
          en: 'Leave empty if this technician can perform all services.',
          zh: '留空表示该技师可以执行所有服务项目。',
        },
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          label: fieldLabels.value,
          required: true,
        },
      ],
    },
    {
      name: 'specialties',
      type: 'array',
      label: fieldLabels.specialties,
      admin: {
        description: {
          en: 'Highlight areas of expertise.',
          zh: '技师的特长领域。',
        },
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          label: fieldLabels.value,
          required: true,
        },
      ],
    },
    {
      name: 'languages',
      type: 'array',
      label: fieldLabels.languages,
      admin: {
        description: {
          en: 'Languages spoken by this technician.',
          zh: '该技师所说的语言。',
        },
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          label: fieldLabels.value,
          required: true,
        },
      ],
    },
    {
      name: 'availabilityNote',
      type: 'text',
      label: fieldLabels.availabilityNote,
      defaultValue: 'Availability confirmed after request.',
      admin: {
        description: {
          en: 'Note shown to guests about availability.',
          zh: '向客人显示的预约说明。',
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'active',
          type: 'checkbox',
          label: fieldLabels.active,
          defaultValue: true,
          admin: {
            description: {
              en: 'Inactive technicians are hidden from booking.',
              zh: '未启用的技师不会出现在预约页面。',
            },
          },
        },
        {
          name: 'displayOrder',
          type: 'number',
          label: fieldLabels.displayOrder,
          defaultValue: 100,
          admin: {
            description: {
              en: 'Lower numbers appear first.',
              zh: '数字越小排序越靠前。',
            },
          },
        },
      ],
    },
  ],
}
