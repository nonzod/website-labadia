import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { EditorialFactList } from '@/components/public/EditorialFactList'
import { EditorialPageHero } from '@/components/public/EditorialPageHero'
import { SectionHeading } from '@/components/public/SectionHeading'
import { getEditorialSettings, getExperiencesEventsEmptyState } from '@/lib/editorial-settings'
import { getUpcomingEvents } from '@/lib/events'
import { isSupportedLocale } from '@/lib/i18n'
import { publicContent } from '@/lib/public-content'
import { siteConfig } from '@/lib/site'

type LocalePageProps = {
  params: Promise<{
    lang: string
  }>
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { lang } = await params
  const locale = isSupportedLocale(lang) ? lang : 'it'
  const copy = publicContent[locale].experiences

  return {
    description: copy.hero.body,
    title: `${copy.hero.eyebrow} | ${siteConfig.projectName}`,
  }
}

export default async function EsperienzePage({ params }: LocalePageProps) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) {
    notFound()
  }

  const copy = publicContent[lang].experiences
  const [editorialSettings, upcomingEvents] = await Promise.all([
    getEditorialSettings(lang),
    getUpcomingEvents(lang),
  ])
  const emptyState = await getExperiencesEventsEmptyState(lang, editorialSettings)

  return (
    <main className="page-shell" id="main-content">
      <EditorialPageHero {...copy.hero} />
      <EditorialFactList items={copy.facts} title={copy.factsTitle} />

      <section className="content-stack">
        <SectionHeading
          body={upcomingEvents.length > 0 ? copy.eventsSection.body : emptyState}
          eyebrow={copy.eventsSection.eyebrow}
          title={copy.eventsSection.title}
        />

        {upcomingEvents.length > 0 ? (
          <div className="detail-grid">
            {upcomingEvents.map((event) => (
              <article className="detail-card" key={event.id}>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  )
}
