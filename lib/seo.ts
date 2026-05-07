import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site'

export type GenerateMetaOptions = {
  title: string
  description: string
  lang: string
  path: string
  image?: string | null
  imageAlt?: string
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8066'

export function generateMeta(options: GenerateMetaOptions): Metadata {
  const { title, description, lang, path, image, imageAlt } = options

  const localeSuffix =
    lang === 'it' ? siteConfig.projectName : `${siteConfig.projectName} · Country house`

  const fullTitle = `${title} | ${localeSuffix}`
  const canonical = `${siteUrl}/${lang}${path}`

  const metadata: Metadata = {
    title: fullTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      locale: lang === 'it' ? 'it_IT' : 'en_US',
      siteName: siteConfig.projectName,
      url: canonical,
      ...(image
        ? {
            images: [
              {
                url: image,
                alt: imageAlt || description,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  }

  return metadata
}