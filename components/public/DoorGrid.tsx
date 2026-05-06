import Link from 'next/link'

import type { AppLocale } from '@/lib/i18n'
import type { HomeDoor } from '@/lib/public-content'

import { getPublicHref } from '@/lib/public-pages'

type DoorGridProps = {
  doors: HomeDoor[]
  eyebrow: string
  locale: AppLocale
  sectionLabel: string
  title: string
}

export function DoorGrid({ doors, eyebrow, locale, sectionLabel, title }: DoorGridProps) {
  return (
    <section
      className="door-grid door-grid-editorial"
      aria-label={sectionLabel}
      data-home-section="doors"
    >
      <div className="door-grid-heading">
        <div className="door-grid-rule" />
        <div className="door-grid-heading-copy">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className="door-grid-rule" />
      </div>

      {doors.map((door) => (
        <article className="door-card" key={door.title}>
          <figure className="door-card-figure">
            <img alt={door.imageAlt} className="door-card-image" src={door.imageSrc} />
            <span className="door-card-number" aria-hidden="true">
              {door.number}
            </span>
            <figcaption className="editorial-photo-caption">
              <span className="editorial-photo-label">{door.imageLabel}</span>
              <span className="editorial-photo-text">{door.imageCaption}</span>
            </figcaption>
          </figure>

          <div className="door-card-copy">
            <p className="section-eyebrow">{door.label}</p>
            <h2>{door.title}</h2>
            <p className="door-card-sublabel">{door.sublabel}</p>
            <p>{door.body}</p>

            <ul className="door-card-stats" aria-label={`${door.title} highlights`}>
              {door.stats.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <Link className="door-card-link" href={getPublicHref(door.href, locale)}>
              {door.ctaLabel}
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
