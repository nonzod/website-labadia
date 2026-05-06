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
        {section.items.map((item, index) => {
          const { prominentDate, secondaryDate } = splitEventDate(item.date)

          return (
            <article
              className={`event-agenda-card event-agenda-card-tone-${(index % 3) + 1}`}
              key={`${item.title}-${item.date}`}
            >
              <div aria-hidden="true" className="event-agenda-poster" />

              <div className="event-agenda-content">
                <div className="event-agenda-meta">
                  <div className="event-agenda-date">
                    <p className="event-agenda-day">{prominentDate}</p>

                    <div className="event-agenda-date-meta">
                      <p>{secondaryDate}</p>
                      <p>{item.schedule}</p>
                    </div>
                  </div>
                </div>

                <h3>{item.title}</h3>
                <p className="event-agenda-summary">{item.body}</p>

                <div className="event-agenda-footer">
                  <span>{item.venue}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function splitEventDate(date: string) {
  const normalizedDate = date.replace(/\s+/g, ' ').trim()
  const leadingDayMatch = normalizedDate.match(/^(\d{1,2})\s+(.+)$/)

  if (leadingDayMatch) {
    return {
      prominentDate: leadingDayMatch[1],
      secondaryDate: leadingDayMatch[2],
    }
  }

  const trailingDayMatch = normalizedDate.match(/^([A-Za-z]{3,})\s+(\d{1,2}),?\s*(.+)?$/)

  if (trailingDayMatch) {
    const remainder = [trailingDayMatch[1], trailingDayMatch[3]].filter(Boolean).join(' ')

    return {
      prominentDate: trailingDayMatch[2],
      secondaryDate: remainder,
    }
  }

  return {
    prominentDate: normalizedDate,
    secondaryDate: '',
  }
}
