import type { CollectionConfig } from 'payload'

import { authenticatedAccess, publishedPostsReadAccess } from '@/lib/payload/access'

const locales = ['it', 'en'] as const

type LocaleCode = (typeof locales)[number]
type LocalizedText = Partial<Record<LocaleCode, string | null | undefined>>

const normalizeLocalizedText = (value: unknown): LocalizedText => {
  if (!value || typeof value !== 'object') {
    return {}
  }

  return value as LocalizedText
}

const formatSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: authenticatedAccess,
    delete: authenticatedAccess,
    read: publishedPostsReadAccess,
    update: authenticatedAccess,
  },
  admin: {
    defaultColumns: ['title', 'status', 'publishedAt', 'updatedAt'],
    useAsTitle: 'title',
  },
  defaultSort: '-publishedAt',
  labels: {
    plural: 'Articoli',
    singular: 'Articolo',
  },
  hooks: {
    beforeValidate: [
      ({ data, originalDoc, req }) => {
        if (!data || typeof data !== 'object') {
          return data
        }

        const nextData = data as Record<string, unknown>

        if (typeof nextData.title === 'string' || typeof nextData.slug === 'string') {
          const source =
            (typeof nextData.slug === 'string' && nextData.slug) ||
            (typeof nextData.title === 'string' && nextData.title) ||
            (typeof originalDoc?.slug === 'string' && originalDoc.slug) ||
            ''

          if (source.trim()) {
            nextData.slug = formatSlug(source)
          }

          return nextData
        }

        const title = normalizeLocalizedText(nextData.title)
        const currentSlug = normalizeLocalizedText(nextData.slug)
        const previousSlug =
          typeof originalDoc?.slug === 'string' && req.locale
            ? { [req.locale]: originalDoc.slug }
            : normalizeLocalizedText(originalDoc?.slug)

        const slug = locales.reduce<LocalizedText>((result, locale) => {
          const source =
            currentSlug[locale] ??
            title[locale] ??
            previousSlug[locale]

          if (typeof source !== 'string' || !source.trim()) {
            return result
          }

          result[locale] = formatSlug(source)

          return result
        }, {})

        if (Object.keys(slug).length > 0) {
          nextData.slug = slug
        }

        return nextData
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
      name: 'slug',
      type: 'text',
      localized: true,
      required: true,
      index: true,
      label: 'Slug',
      admin: {
        description: 'Generato dal titolo se lasciato vuoto.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      required: true,
      label: 'Excerpt',
    },
    {
      name: 'content',
      type: 'textarea',
      localized: true,
      required: true,
      label: 'Contenuto',
    },
    {
      name: 'seoTitle',
      type: 'text',
      localized: true,
      label: 'SEO title',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      localized: true,
      label: 'SEO description',
      admin: {
        description: 'Mantieni il testo compatto per snippet e social preview.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover image',
    },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      label: 'Data pubblicazione',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
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
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
