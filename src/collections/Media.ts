import type { CollectionConfig } from 'payload'
import { adminGroups, collectionLabels, fieldLabels } from '@/collections/admin-labels'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: collectionLabels.media,
  admin: {
    group: adminGroups.siteContent,
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'card',
        width: 960,
        height: 720,
        fit: 'cover',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: fieldLabels.alt,
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      label: fieldLabels.caption,
    },
  ],
}
