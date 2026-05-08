import type { CollectionConfig } from 'payload'
import {
  adminGroups,
  bookingStatusOptions,
  collectionLabels,
  fieldLabels,
} from '@/collections/admin-labels'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: collectionLabels.bookings,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'serviceTitle', 'technicianName', 'preferredDate', 'preferredTime', 'status'],
    group: adminGroups.spaOperations,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      label: fieldLabels.status,
      required: true,
      defaultValue: 'new',
      options: bookingStatusOptions,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'serviceSlug',
          type: 'text',
          label: fieldLabels.serviceSlug,
          required: true,
        },
        {
          name: 'serviceTitle',
          type: 'text',
          label: fieldLabels.serviceTitle,
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'technicianSlug',
          type: 'text',
          label: fieldLabels.technicianSlug,
          defaultValue: 'any',
        },
        {
          name: 'technicianName',
          type: 'text',
          label: fieldLabels.technicianName,
          defaultValue: 'Any available technician',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'preferredDate',
          type: 'date',
          label: fieldLabels.preferredDate,
          required: true,
        },
        {
          name: 'preferredTime',
          type: 'text',
          label: fieldLabels.preferredTime,
          required: true,
        },
        {
          name: 'durationPreference',
          type: 'text',
          label: fieldLabels.durationPreference,
          required: true,
        },
      ],
    },
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
          name: 'phone',
          type: 'text',
          label: fieldLabels.phone,
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          label: fieldLabels.email,
          required: true,
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: fieldLabels.notes,
    },
    {
      name: 'source',
      type: 'text',
      label: fieldLabels.source,
      defaultValue: 'website-booking',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: fieldLabels.internalNotes,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
