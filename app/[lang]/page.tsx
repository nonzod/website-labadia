import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { DetailStrip } from '@/components/public/DetailStrip'
import { DoorGrid } from '@/components/public/DoorGrid'
import { EventsPreview } from '@/components/public/EventsPreview'
import { HomeClosing } from '@/components/public/HomeClosing'
import { HomeHero } from '@/components/public/HomeHero'
import { HomeIntroStrip } from '@/components/public/HomeIntroStrip'
import { ReviewsSection } from '@/components/public/ReviewsSection'
import {
  getEditorialSettings,
  getHomepageEventsSectionCopy,
  getHomepageProofSection,
} from '@/lib/editorial-settings'
import { getHomepageEvents } from '@/lib/events'
import { isSupportedLocale } from '@/lib/i18n'
import { publicContent } from '@/lib/public-content'
import { getPublicHref } from '@/lib/public-pages'
import { generateMeta } from '@/lib/seo'

type LocalePageProps = {
  params: Promise<{
    lang: string
  }>
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { lang } = await params
  const locale = isSupportedLocale(lang) ? lang : 'it'
  const copy = publicContent[locale].home

  return generateMeta({
    title: copy.hero.eyebrow,
    description: copy.hero.body,
    lang: locale,
    path: '/',
    image: copy.hero.imageSrc,
    imageAlt: copy.hero.imageAlt,
  })
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
        ? homepageEvents.map((event, index) => ({
            body: event.summary,
            date: event.startDate
              ? formatHomepageEventDate(event.startDate, lang)
              : eventSectionCopy.items[index]?.date || copy.events.items[index]?.date || '',
            schedule: event.startDate
              ? formatHomepageEventTime(event.startDate, lang)
              : eventSectionCopy.items[index]?.schedule || copy.events.items[index]?.schedule || '',
            title: event.title,
            venue:
              event.venue ||
              eventSectionCopy.items[index]?.venue ||
              copy.events.items[index]?.venue ||
              '',
          }))
        : eventSectionCopy.items,
  }

  return (
    <main className="page-shell page-shell-home" id="main-content">
      <section className="content-stack" id="house-overview">
        <HomeHero hero={copy.hero} locale={lang} />

        <HomeIntroStrip body={copy.intro.body} eyebrow={copy.intro.eyebrow} title={copy.intro.title} />

        <DoorGrid
          doors={copy.doors}
          eyebrow={copy.doorsEyebrow}
          locale={lang}
          sectionLabel={copy.doorsSectionLabel}
          title={copy.doorsTitle}
        />
        <DetailStrip items={copy.detailItems} />
        <ReviewsSection meta={copy.reviewsMeta} section={proofSection} />
        <EventsPreview
          locale={lang}
          section={eventSection}
          useEmptyState={homepageEvents.length === 0}
        />

        <HomeClosing
          body={copy.cta.body}
          eyebrow={copy.cta.eyebrow}
          imageAlt={copy.cta.imageAlt}
          imageCaption={copy.cta.imageCaption}
          imageLabel={copy.cta.imageLabel}
          imageSrc={copy.cta.imageSrc}
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

const formatHomepageEventDate = (date: string, locale: string) =>
  new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-US', {
    day: 'numeric',
    month: locale === 'it' ? 'long' : 'short',
    year: 'numeric',
  }).format(new Date(date))

const formatHomepageEventTime = (date: string, locale: string) =>
  new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
