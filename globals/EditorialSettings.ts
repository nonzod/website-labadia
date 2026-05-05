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
      admin: {
        description: 'Contenuto visibile sul sito pubblico. Inserire solo testimonianze e fonti pronte per la pubblicazione.',
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          localized: true,
          required: true,
          label: 'Citazione',
          admin: {
            description: 'Testo mostrato live in homepage. Scrivere solo copy definitivo e pubblico.',
          },
        },
        {
          name: 'source',
          type: 'text',
          localized: true,
          required: true,
          label: 'Fonte',
          admin: {
            description: 'Fonte mostrata live accanto alla citazione. Usare solo nomi o riferimenti pubblicabili.',
          },
        },
      ],
    },
    {
      name: 'homepageEventsBody',
      type: 'textarea',
      localized: true,
      label: 'Testo sezione eventi homepage',
      admin: {
        description: 'Testo mostrato live nella sezione eventi della homepage. Inserire solo contenuti pronti per il pubblico.',
      },
    },
    {
      name: 'experiencesEventsEmptyState',
      type: 'textarea',
      localized: true,
      label: 'Empty state eventi pagina esperienze',
      admin: {
        description: 'Messaggio live mostrato quando non ci sono eventi nella pagina esperienze. Mantenere il testo pubblico e definitivo.',
      },
    },
  ],
}
