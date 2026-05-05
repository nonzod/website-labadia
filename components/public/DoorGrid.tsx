import Link from 'next/link'

import type { AppLocale } from '@/lib/i18n'
import type { HomeDoor } from '@/lib/public-content'

import { getPublicHref } from '@/lib/public-pages'

type DoorGridProps = {
  doors: HomeDoor[]
  locale: AppLocale
  sectionLabel: string
}

export function DoorGrid({ doors, locale, sectionLabel }: DoorGridProps) {
  return (
    <section className="door-grid" aria-label={sectionLabel}>
      {doors.map((door) => (
        <article className="door-card" key={door.title}>
          <img alt={door.imageAlt} className="door-card-image" src={door.imageSrc} />

          <div className="door-card-copy">
            <p className="section-eyebrow">{door.label}</p>
            <h2>{door.title}</h2>
            <p>{door.body}</p>
            <Link className="primary-link" href={getPublicHref(door.href, locale)}>
              {door.title}
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
