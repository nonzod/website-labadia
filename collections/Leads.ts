import type { CollectionConfig } from 'payload'

import { adminOnlyCollectionAccess } from '@/lib/payload/access'

export const Leads: CollectionConfig = {
  slug: 'leads',
  access: adminOnlyCollectionAccess,
  admin: {
    defaultColumns: ['name', 'email', 'status', 'lang', 'createdAt'],
    useAsTitle: 'name',
  },
  defaultSort: '-createdAt',
  labels: {
    plural: 'Richieste',
    singular: 'Richiesta',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefono',
    },
    {
      name: 'desiredPeriod',
      type: 'text',
      required: true,
      label: 'Periodo desiderato',
    },
    {
      name: 'guestCount',
      type: 'number',
      min: 1,
      required: true,
      label: 'Numero ospiti',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Messaggio',
    },
    {
      name: 'lang',
      type: 'select',
      defaultValue: 'it',
      required: true,
      label: 'Lingua',
      options: [
        {
          label: 'Italiano',
          value: 'it',
        },
        {
          label: 'English',
          value: 'en',
        },
      ],
    },
    {
      name: 'sourcePage',
      type: 'text',
      required: true,
      label: 'Pagina origine',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      required: true,
      label: 'Stato',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'Read',
          value: 'read',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Note interne',
    },
  ],
}
