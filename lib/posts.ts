import { cache } from 'react'

import config from '@payload-config'
import { getPayload } from 'payload'

import type { AppLocale } from '@/lib/i18n'
import type { Post } from '@/payload-types'

import { appLocales, getLocalizedPathname, isSupportedLocale } from '@/lib/i18n'
import { publicPathnames } from '@/lib/public-content'

const getPayloadClient = cache(async () => getPayload({ config }))

const isBlogPostPathname = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length !== 3) {
    return null
  }

  const [locale, section, slug] = segments

  if (!isSupportedLocale(locale) || section !== publicPathnames.blog.slice(1) || !slug) {
    return null
  }

  return { locale, slug }
}

export const getPostHref = (slug: string, locale: AppLocale): string => {
  return getLocalizedPathname(`${publicPathnames.blog}/${slug}`, locale)
}

export const getPublishedPosts = async (locale: AppLocale): Promise<Post[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    depth: 0,
    fallbackLocale: 'it',
    limit: 50,
    locale,
    sort: '-publishedAt',
    where: {
      status: {
        equals: 'published',
      },
    },
  })

  return result.docs
}

export const getPublishedPostBySlug = async (
  locale: AppLocale,
  slug: string,
): Promise<Post | null> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    depth: 0,
    fallbackLocale: 'it',
    limit: 1,
    locale,
    where: {
      and: [
        {
          status: {
            equals: 'published',
          },
        },
        {
          slug: {
            equals: slug,
          },
        },
      ],
    },
  })

  return result.docs[0] ?? null
}

const getPublishedPostById = async (locale: AppLocale, id: number): Promise<Post | null> => {
  const payload = await getPayloadClient()

  try {
    return await payload.findByID({
      collection: 'posts',
      depth: 0,
      fallbackLocale: 'it',
      id,
      locale,
    })
  } catch {
    return null
  }
}

export const getPostLocaleSwitcherPathnames = async (
  pathname: string,
): Promise<Partial<Record<AppLocale, string>> | null> => {
  const currentEntry = isBlogPostPathname(pathname)

  if (!currentEntry) {
    return null
  }

  const currentPost = await getPublishedPostBySlug(currentEntry.locale, currentEntry.slug)

  if (!currentPost) {
    return null
  }

  const pairs = await Promise.all(
    appLocales.map(async (targetLocale) => {
      if (targetLocale === currentEntry.locale) {
        return [targetLocale, pathname] as const
      }

      const localizedPost = await getPublishedPostById(targetLocale, currentPost.id)

      if (!localizedPost?.slug) {
        return [targetLocale, getLocalizedPathname(publicPathnames.blog, targetLocale)] as const
      }

      return [targetLocale, getPostHref(localizedPost.slug, targetLocale)] as const
    }),
  )

  return Object.fromEntries(pairs)
}
