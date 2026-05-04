import type { CollectionConfig } from 'payload'

import { adminOnlyCollectionAccess } from '@/lib/payload/access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: adminOnlyCollectionAccess,
  admin: {
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    useAsTitle: 'alt',
  },
  labels: {
    plural: 'Media',
    singular: 'Media',
  },
  upload: {
    mimeTypes: ['image/*'],
    staticDir: 'media',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: true,
      label: 'Alt text',
    },
    {
      name: 'caption',
      type: 'textarea',
      localized: true,
      label: 'Caption',
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Credit',
    },
  ],
}
