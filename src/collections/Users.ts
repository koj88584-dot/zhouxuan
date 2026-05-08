import type { CollectionConfig } from 'payload'
import { adminGroups, collectionLabels, fieldLabels, userRoleOptions } from '@/collections/admin-labels'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: collectionLabels.users,
  admin: {
    useAsTitle: 'email',
    group: adminGroups.admin,
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: fieldLabels.name,
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: fieldLabels.role,
      defaultValue: 'editor',
      options: userRoleOptions,
      required: true,
    },
  ],
}
