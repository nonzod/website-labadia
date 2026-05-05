import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { CtaBand } from '@/components/public/CtaBand'
import { DoorGrid } from '@/components/public/DoorGrid'
import { EventsPreview } from '@/components/public/EventsPreview'
import { HomeHero } from '@/components/public/HomeHero'
import { ProofSection } from '@/components/public/ProofSection'
import { SectionHeading } from '@/components/public/SectionHeading'
import {
  getEditorialSettings,
  getHomepageEventsSectionCopy,
  getHomepageProofSection,
} from '@/lib/editorial-settings'
import { getHomepageEvents } from '@/lib/events'
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
  const copy = publicContent[locale].home

  return {
    description: copy.hero.body,
    title: `${copy.hero.eyebrow} | ${siteConfig.projectName}`,
  }
}

export default async function HomePage({ params }: LocalePageProps) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) {
    notFound()
  }

  const copy = publicContent[lang].home
  const [editorialSettings, homepageEvents] = await Promise.all([
    getEditorialSettings(lang),
    getHomepageEvents(lang),
  ])
  const [proofSection, eventSectionCopy] = await Promise.all([
    getHomepageProofSection(lang, editorialSettings),
    getHomepageEventsSectionCopy(lang, editorialSettings),
  ])
  const eventSection = {
    ...eventSectionCopy,
    items:
      homepageEvents.length > 0
        ? homepageEvents.map((event) => ({
            body: event.summary,
            title: event.title,
          }))
        : eventSectionCopy.items,
  }

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
        <ProofSection section={proofSection} />
        <EventsPreview
          locale={lang}
          section={eventSection}
          useEmptyState={homepageEvents.length === 0}
        />

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
