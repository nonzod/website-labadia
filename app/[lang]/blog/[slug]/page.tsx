import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CtaBand } from '@/components/public/CtaBand'
import { isSupportedLocale, type AppLocale } from '@/lib/i18n'
import { getPublishedPostBySlug } from '@/lib/posts'
import { publicContent } from '@/lib/public-content'
import { getPublicHref } from '@/lib/public-pages'
import { generateMeta } from '@/lib/seo'

type BlogPostPageProps = {
  params: Promise<{
    lang: string
    slug: string
  }>
}

const formatPostDate = (value: string | null | undefined, locale: AppLocale): string | null => {
  if (!value) {
    return null
  }

  return new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

const getPostParagraphs = (content: string): string[] => {
  return content
    .split(/\n\s*\n/g)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = isSupportedLocale(lang) ? lang : 'it'
  const post = await getPublishedPostBySlug(locale, slug)

  if (!post) {
    return generateMeta({
      title: publicContent[locale].blog.hero.eyebrow,
      description: publicContent[locale].blog.hero.body,
      lang: locale,
      path: '/blog',
    })
  }

  return generateMeta({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    lang: locale,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params

  if (!isSupportedLocale(lang)) {
    notFound()
  }

  const post = await getPublishedPostBySlug(lang, slug)

  if (!post) {
    notFound()
  }

  const copy = publicContent[lang].blog
  const formattedDate = formatPostDate(post.publishedAt, lang)
  const paragraphs = getPostParagraphs(post.content)

  return (
    <main className="page-shell" id="main-content">
      <div className="post-layout">
        <Link className="back-link" href={getPublicHref('blog', lang)}>
          {copy.backToBlogLabel}
        </Link>

        <article className="post-hero">
          <div className="post-meta">
            <span>{copy.metadataLabel}</span>
            {formattedDate ? <strong>{formattedDate}</strong> : null}
          </div>

          <h1>{post.title}</h1>
          <p className="lead">{post.excerpt}</p>
        </article>

        <section className="post-body" aria-label={copy.postAnchorLabel}>
          <div className="prose-flow">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <CtaBand
          body={post.excerpt}
          eyebrow={copy.hero.eyebrow}
          primaryHref={getPublicHref('contact', lang)}
          primaryLabel={copy.hero.primaryLabel}
          secondaryHref={getPublicHref('blog', lang)}
          secondaryLabel={copy.backToBlogLabel}
          title={copy.list.title}
        />
      </div>
    </main>
  )
}
