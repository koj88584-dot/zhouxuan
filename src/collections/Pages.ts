import type { CollectionConfig } from 'payload'
import { adminGroups, collectionLabels, fieldLabels } from '@/collections/admin-labels'
import { formatSlug } from '@/collections/slug-field'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: collectionLabels.pages,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: adminGroups.siteContent,
  },
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
    {
      name: 'eyebrow',
      type: 'text',
      label: fieldLabels.eyebrow,
      required: true,
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
      admin: {
        description: 'Use paragraph breaks to separate sections.',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      label: fieldLabels.highlights,
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
        },
        {
          name: 'ctaHref',
          type: 'text',
          label: fieldLabels.ctaHref,
        },
      ],
    },
  ],
}
