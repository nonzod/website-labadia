import { notFound } from 'next/navigation'

import { CtaBand } from '@/components/public/CtaBand'
import { DoorGrid } from '@/components/public/DoorGrid'
import { EventsPreview } from '@/components/public/EventsPreview'
import { HomeHero } from '@/components/public/HomeHero'
import { ProofSection } from '@/components/public/ProofSection'
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
      <section className="content-stack" id="house-overview">
        <HomeHero hero={copy.hero} locale={lang} />

        <SectionHeading
          body={copy.intro.body}
          eyebrow={copy.intro.eyebrow}
          title={copy.intro.title}
        />

        <DoorGrid doors={copy.doors} locale={lang} sectionLabel={copy.doorsSectionLabel} />
        <ProofSection section={copy.proof} />
        <EventsPreview locale={lang} section={copy.events} />

        <CtaBand
          body={copy.cta.body}
          eyebrow={copy.cta.eyebrow}
          primaryHref={getPublicHref('contact', lang)}
          primaryLabel={copy.cta.primaryLabel}
          secondaryHref={getPublicHref('territory', lang)}
          secondaryLabel={copy.cta.secondaryLabel}
          title={copy.cta.title}
        />
      </section>
    </main>
  )
}
