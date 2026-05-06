import Link from 'next/link'

import type { AppLocale } from '@/lib/i18n'
import type { HomeHeroCopy } from '@/lib/public-content'

import { getPublicHref } from '@/lib/public-pages'

type HomeHeroProps = {
  hero: HomeHeroCopy
  locale: AppLocale
}

export function HomeHero({ hero, locale }: HomeHeroProps) {
  return (
    <section className="home-hero home-hero-immersive" data-home-section="hero">
      <img alt={hero.imageAlt} className="home-hero-image" src={hero.imageSrc} />
      <div className="home-hero-overlay" />

      <div className="home-hero-shell">
        <div className="home-hero-meta" aria-hidden="true">
          <span>{hero.metaStart}</span>
          <span>{hero.metaEnd}</span>
        </div>

        <div className="home-hero-copy">
          <div className="home-hero-main">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>{hero.title}</h1>
          </div>

          <div className="home-hero-side">
            <p className="lead">{hero.body}</p>
          </div>
        </div>

        <div className="home-hero-actions">
          <div className="cta-row">
            <Link className="primary-link" href={getPublicHref(hero.primaryHref, locale)}>
              {hero.primaryLabel}
            </Link>
            <Link className="secondary-link" href={getPublicHref(hero.secondaryHref, locale)}>
              {hero.secondaryLabel}
            </Link>
          </div>

          <p className="editorial-photo-note">
            <span className="editorial-photo-label">{hero.imageLabel}</span>
            <span className="editorial-photo-text">{hero.imageCaption}</span>
          </p>
        </div>

        <div className="home-hero-scroll" aria-hidden="true">
          <span>{hero.scrollLabel}</span>
          <span className="home-hero-scroll-line" />
        </div>
      </div>
    </section>
  )
}
