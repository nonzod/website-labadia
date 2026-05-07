import type { MetadataRoute } from 'next'
import { appLocales } from '@/lib/i18n'
import { publicPathnames, publicPageOrder } from '@/lib/public-pages'
import { getPublishedPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8066'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = []

  for (const locale of appLocales) {
    for (const key of publicPageOrder) {
      const path = publicPathnames[key]
      const fullPath = path === '/' ? `/${locale}` : `/${locale}${path}`

      routes.push({
        url: `${siteUrl}${fullPath}`,
        lastModified: new Date(),
        changeFrequency: key === 'home' ? 'weekly' : 'monthly',
        priority: key === 'home' ? 1.0 : 0.7,
      })
    }
  }

  // Add blog post URLs
  for (const locale of appLocales) {
    const posts = await getPublishedPosts(locale)

    for (const post of posts) {
      if (!post.slug) continue

      routes.push({
        url: `${siteUrl}/${locale}${publicPathnames.blog}/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return routes
}