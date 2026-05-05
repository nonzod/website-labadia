import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CtaBand } from '@/components/public/CtaBand'
import { FeatureShowcase } from '@/components/public/FeatureShowcase'
import { SectionHeading } from '@/components/public/SectionHeading'
import { isSupportedLocale } from '@/lib/i18n'
import { publicContent } from '@/lib/public-content'
import { getPublicHref } from '@/lib/public-pages'

type LocalePageProps = {
  params: Promise<{
    lang: string
  }>
}

export default async function HomePage({ params }: LocalePageProps) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) {
    notFound()
  }

  const copy = publicContent[lang].home

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
            <a className="secondary-link" href="#house-overview">
              {copy.hero.secondaryLabel}
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label={copy.highlightsLabel}>
          <p className="section-eyebrow">{copy.highlightsLabel}</p>
          <ul className="hero-highlights">
            {copy.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="content-stack" id="house-overview">
        <SectionHeading
          body={copy.intro.body}
          eyebrow={copy.intro.eyebrow}
          title={copy.intro.title}
        />

        {copy.features.map((feature, index) => (
          <FeatureShowcase
            body={feature.body}
            eyebrow={feature.eyebrow}
            id={index === 0 ? 'stay-overview' : 'territory-overview'}
            items={feature.items}
            key={feature.title}
            mediaBody={feature.mediaBody}
            mediaKicker={feature.mediaKicker}
            mediaTitle={feature.mediaTitle}
            reversed={index % 2 === 1}
            title={feature.title}
          />
        ))}

        <CtaBand
          body={copy.cta.body}
          eyebrow={copy.cta.eyebrow}
          primaryHref={getPublicHref('contact', lang)}
          primaryLabel={copy.cta.primaryLabel}
          secondaryHref="#territory-overview"
          secondaryLabel={copy.cta.secondaryLabel}
          title={copy.cta.title}
        />
      </section>
    </main>
  )
}
