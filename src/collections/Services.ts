import type { CollectionConfig } from 'payload'
import {
  adminGroups,
  collectionLabels,
  ctaTypeOptions,
  displayPriceOptions,
  fieldLabels,
  serviceIconOptions,
} from '@/collections/admin-labels'
import { formatSlug } from '@/collections/slug-field'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: collectionLabels.services,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'displayPriceMode', 'updatedAt'],
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
          name: 'title',
          type: 'text',
          label: fieldLabels.title,
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          label: fieldLabels.slug,
          unique: true,
          required: true,
          hooks: {
            beforeValidate: [formatSlug('title')],
          },
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      label: fieldLabels.summary,
      required: true,
    },
    {
      name: 'heroImage',
      type: 'relationship',
      label: fieldLabels.heroImage,
      relationTo: 'media',
    },
    {
      name: 'bodyContent',
      type: 'textarea',
      label: fieldLabels.bodyContent,
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'duration',
          type: 'text',
          label: fieldLabels.duration,
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          label: fieldLabels.icon,
          required: true,
          options: serviceIconOptions,
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: fieldLabels.featured,
          defaultValue: false,
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      label: fieldLabels.benefits,
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
      name: 'ritualSteps',
      type: 'array',
      label: fieldLabels.ritualSteps,
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
      type: 'row',
      fields: [
        {
          name: 'ctaLabel',
          type: 'text',
          label: fieldLabels.ctaLabel,
          required: true,
        },
        {
          name: 'ctaType',
          type: 'select',
          label: fieldLabels.ctaType,
          required: true,
          defaultValue: 'booking',
          options: ctaTypeOptions,
        },
        {
          name: 'displayPriceMode',
          type: 'select',
          label: fieldLabels.displayPriceMode,
          required: true,
          defaultValue: 'square',
          options: displayPriceOptions,
        },
      ],
    },
    {
      name: 'priceLabel',
      type: 'text',
      label: fieldLabels.priceLabel,
    },
    {
      name: 'binding',
      type: 'group',
      label: fieldLabels.binding,
      fields: [
        {
          name: 'squareAppointmentUrl',
          type: 'text',
          label: fieldLabels.squareAppointmentUrl,
          required: true,
        },
        {
          name: 'squareCategoryId',
          type: 'text',
          label: fieldLabels.squareCategoryId,
        },
        {
          name: 'squareItemId',
          type: 'text',
          label: fieldLabels.squareItemId,
        },
        {
          name: 'giftCardUrl',
          type: 'text',
          label: fieldLabels.giftCardUrl,
        },
        {
          name: 'active',
          type: 'checkbox',
          label: fieldLabels.active,
          defaultValue: true,
        },
      ],
    },
    {
      name: 'lastSyncedAt',
      type: 'date',
      label: fieldLabels.lastSyncedAt,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
