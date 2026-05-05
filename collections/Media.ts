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
    {
      name: 'usageArea',
      type: 'select',
      required: true,
      label: 'Area di utilizzo',
      defaultValue: 'shared',
      options: [
        {
          label: 'Shared',
          value: 'shared',
        },
        {
          label: 'Home',
          value: 'home',
        },
        {
          label: 'Dimora',
          value: 'dimora',
        },
        {
          label: 'Esperienze',
          value: 'experiences',
        },
        {
          label: 'Territorio',
          value: 'territory',
        },
        {
          label: 'Racconti / Blog',
          value: 'stories',
        },
      ],
    },
    {
      name: 'readiness',
      type: 'select',
      required: true,
      label: 'Prontezza editoriale',
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Ready IT',
          value: 'ready-it',
        },
        {
          label: 'Ready IT/EN',
          value: 'ready-it-en',
        },
      ],
    },
    {
      name: 'ownerNotes',
      type: 'textarea',
      label: 'Note operative',
    },
  ],
}
