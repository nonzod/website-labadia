import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CtaBand } from '@/components/public/CtaBand'
import { SectionHeading } from '@/components/public/SectionHeading'
import { isSupportedLocale, type AppLocale } from '@/lib/i18n'
import { getPostHref, getPublishedPosts } from '@/lib/posts'
import { getPublicHref, publicContent } from '@/lib/public-content'
import { siteConfig } from '@/lib/site'

type BlogPageProps = {
  params: Promise<{
    lang: string
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

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params
  const locale = isSupportedLocale(lang) ? lang : 'it'
  const copy = publicContent[locale].blog

  return {
    description: copy.hero.body,
    title: `${copy.hero.eyebrow} | ${siteConfig.projectName}`,
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) {
    notFound()
  }

  const copy = publicContent[lang].blog
  const posts = await getPublishedPosts(lang)

  return (
    <main className="page-shell" id="main-content">
      <section className="hero-grid">
        <div className="hero-card">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p className="lead">{copy.hero.body}</p>

          <div className="cta-row">
            <Link className="primary-link" href={getPublicHref('contact', lang)}>
              {copy.hero.primaryLabel}
            </Link>
            <a className="secondary-link" href="#blog-archive">
              {copy.hero.secondaryLabel}
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label={copy.list.eyebrow}>
          <p className="section-eyebrow">{copy.list.eyebrow}</p>
          <h2>{posts.length}</h2>
          <p>{copy.list.body}</p>
        </aside>
      </section>

      <section className="content-stack" id="blog-archive">
        <SectionHeading body={copy.list.body} eyebrow={copy.list.eyebrow} title={copy.list.title} />

        {posts.length > 0 ? (
          <div className="blog-grid">
            {posts.map((post) => {
              const formattedDate = formatPostDate(post.publishedAt, lang)

              return (
                <article className="blog-card" key={post.id}>
                  <div className="post-meta">
                    <span>{copy.metadataLabel}</span>
                    {formattedDate ? <strong>{formattedDate}</strong> : null}
                  </div>

                  <Link className="post-title-link" href={getPostHref(post.slug, lang)}>
                    <h2>{post.title}</h2>
                  </Link>

                  <p>{post.excerpt}</p>

                  <Link className="secondary-link" href={getPostHref(post.slug, lang)}>
                    {copy.readMoreLabel}
                  </Link>
                </article>
              )
            })}
          </div>
        ) : (
          <section className="empty-state">
            <h2>{copy.emptyTitle}</h2>
            <p>{copy.emptyBody}</p>
          </section>
        )}

        <CtaBand
          body={copy.hero.body}
          eyebrow={copy.list.eyebrow}
          primaryHref={getPublicHref('contact', lang)}
          primaryLabel={copy.hero.primaryLabel}
          secondaryHref={getPublicHref('home', lang)}
          secondaryLabel={siteConfig.projectName}
          title={copy.list.title}
        />
      </section>
    </main>
  )
}
