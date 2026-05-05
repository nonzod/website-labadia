import type { CollectionConfig } from 'payload'

import { authenticatedAccess, publishedContentReadAccess } from '@/lib/payload/access'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: authenticatedAccess,
    delete: authenticatedAccess,
    read: publishedContentReadAccess,
    update: authenticatedAccess,
  },
  admin: {
    defaultColumns: ['title', 'startDate', 'status', 'featuredOnHome', 'updatedAt'],
    useAsTitle: 'title',
  },
  defaultSort: 'startDate',
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data || typeof data !== 'object') {
          return data
        }

        const { startDate, endDate } = data as { endDate?: unknown; startDate?: unknown }

        if (
          typeof startDate === 'string' &&
          typeof endDate === 'string' &&
          new Date(endDate).getTime() < new Date(startDate).getTime()
        ) {
          throw new Error('La data di fine non puo essere precedente alla data di inizio.')
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      label: 'Titolo',
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      required: true,
      label: 'Sommario',
    },
    {
      name: 'venue',
      type: 'text',
      localized: true,
      label: 'Luogo',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Inizio',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Fine',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine',
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      defaultValue: false,
      label: 'Mostra in homepage',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      label: 'Stato',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
