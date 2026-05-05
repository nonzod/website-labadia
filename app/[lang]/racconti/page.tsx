import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import { EditorialPageHero } from '@/components/public/EditorialPageHero'
import { isSupportedLocale } from '@/lib/i18n'
import { publicContent } from '@/lib/public-content'
import { getPublicHref } from '@/lib/public-pages'
import { siteConfig } from '@/lib/site'

type LocalePageProps = {
  params: Promise<{
    lang: string
  }>
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { lang } = await params
  const locale = isSupportedLocale(lang) ? lang : 'it'
  const copy = publicContent[locale].stories

  return {
    description: copy.hero.body,
    title: `${copy.hero.eyebrow} | ${siteConfig.projectName}`,
  }
}

export default async function RaccontiPage({ params }: LocalePageProps) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) {
    notFound()
  }

  const copy = publicContent[lang].stories

  return (
    <main className="page-shell" id="main-content">
      <EditorialPageHero {...copy.hero} />

      <section className="cta-band">
        <div className="cta-band-copy">
          <p className="section-eyebrow">{copy.blogBridge.eyebrow}</p>
          <h2>{copy.blogBridge.title}</h2>
          <p>{copy.blogBridge.body}</p>
        </div>

        <Link className="primary-link" href={getPublicHref('blog', lang)}>
          {copy.blogBridge.primaryLabel}
        </Link>
      </section>
    </main>
  )
}
