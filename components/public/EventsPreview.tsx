import Link from 'next/link'

import type { AppLocale } from '@/lib/i18n'
import type { HomeEventsSection } from '@/lib/public-content'

import { getPublicHref } from '@/lib/public-pages'

type EventsPreviewProps = {
  locale: AppLocale
  section: HomeEventsSection
}

export function EventsPreview({ locale, section }: EventsPreviewProps) {
  return (
    <section className="events-preview">
      <div className="section-heading">
        <p className="section-eyebrow">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        <p className="section-body">{section.body}</p>
      </div>

      <div className="detail-grid">
        {section.items.map((item) => (
          <article className="detail-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <Link className="secondary-link" href={getPublicHref('experiences', locale)}>
        {section.primaryLabel}
      </Link>
    </section>
  )
}
