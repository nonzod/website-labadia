import type { GlobalConfig } from 'payload'

import { authenticatedAccess } from '@/lib/payload/access'

export const EditorialSettings: GlobalConfig = {
  slug: 'editorial-settings',
  access: {
    read: () => true,
    update: authenticatedAccess,
  },
  fields: [
    {
      name: 'homepageProofItems',
      type: 'array',
      label: 'Proof homepage',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          localized: true,
          required: true,
          label: 'Citazione',
        },
        {
          name: 'source',
          type: 'text',
          localized: true,
          required: true,
          label: 'Fonte',
        },
      ],
    },
    {
      name: 'homepageEventsBody',
      type: 'textarea',
      localized: true,
      label: 'Testo sezione eventi homepage',
    },
    {
      name: 'experiencesEventsEmptyState',
      type: 'textarea',
      localized: true,
      label: 'Empty state eventi pagina esperienze',
    },
  ],
}
