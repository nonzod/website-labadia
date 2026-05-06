import Link from 'next/link'

import type { AppLocale } from '@/lib/i18n'
import type { HomeEventsSection } from '@/lib/public-content'

import { getPublicHref } from '@/lib/public-pages'

type EventsPreviewProps = {
  locale: AppLocale
  section: HomeEventsSection
  useEmptyState?: boolean
}

export function EventsPreview({ locale, section, useEmptyState = false }: EventsPreviewProps) {
  return (
    <section className="events-preview" data-home-section="events">
      <div className="events-preview-heading">
        <div className="section-heading">
          <p className="section-eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
          <p className="section-body">{useEmptyState ? section.emptyStateBody : section.body}</p>
        </div>

        <Link className="secondary-link" href={getPublicHref(section.primaryHref, locale)}>
          {section.primaryLabel}
        </Link>
      </div>

      <div className="events-preview-grid">
        {section.items.map((item) => (
          <article className="event-agenda-card" key={`${item.title}-${item.date}`}>
            <div className="event-agenda-meta">
              <p>{item.date}</p>
              <p>{item.schedule}</p>
            </div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <div className="event-agenda-footer">
              <span>{item.venue}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
