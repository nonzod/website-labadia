import { ValidationError, type CollectionConfig } from 'payload'

import { authenticatedAccess, publishedContentReadAccess } from '@/lib/payload/access'

const toComparableDate = (value: unknown): number | null => {
  if (typeof value === 'string' || value instanceof Date) {
    const timestamp = new Date(value).getTime()

    return Number.isNaN(timestamp) ? null : timestamp
  }

  return null
}

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
      ({ data, originalDoc }) => {
        if (!data || typeof data !== 'object') {
          return data
        }

        const typedData = data as { endDate?: unknown; startDate?: unknown }
        const hasStartDate = Object.prototype.hasOwnProperty.call(typedData, 'startDate')
        const hasEndDate = Object.prototype.hasOwnProperty.call(typedData, 'endDate')
        const effectiveStartDate = hasStartDate ? typedData.startDate : originalDoc?.startDate
        const effectiveEndDate = hasEndDate ? typedData.endDate : originalDoc?.endDate
        const comparableStartDate = toComparableDate(effectiveStartDate)
        const comparableEndDate = toComparableDate(effectiveEndDate)

        if (
          comparableStartDate !== null &&
          comparableEndDate !== null &&
          comparableEndDate < comparableStartDate
        ) {
          throw new ValidationError({
            collection: 'events',
            errors: [
              {
                message: 'La data di fine non puo essere precedente alla data di inizio.',
                path: 'endDate',
              },
            ],
          })
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
