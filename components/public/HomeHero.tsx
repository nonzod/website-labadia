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
    <section className="home-hero">
      <img alt={hero.imageAlt} className="home-hero-image" src={hero.imageSrc} />

      <div className="home-hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className="lead">{hero.body}</p>

        <div className="cta-row">
          <Link className="primary-link" href={getPublicHref(hero.primaryHref, locale)}>
            {hero.primaryLabel}
          </Link>
          <Link className="secondary-link" href={getPublicHref(hero.secondaryHref, locale)}>
            {hero.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
