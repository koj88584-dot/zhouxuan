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
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: fieldLabels.title,
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      label: fieldLabels.bio,
      required: true,
    },
    {
      name: 'serviceSlugs',
      type: 'array',
      label: fieldLabels.serviceSlugs,
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
    },
    {
      type: 'row',
      fields: [
        {
          name: 'active',
          type: 'checkbox',
          label: fieldLabels.active,
          defaultValue: true,
        },
        {
          name: 'displayOrder',
          type: 'number',
          label: fieldLabels.displayOrder,
          defaultValue: 100,
        },
      ],
    },
  ],
}
