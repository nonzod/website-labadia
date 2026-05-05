import Link from 'next/link'

import type { AppLocale } from '@/lib/i18n'

import { appLocales, switchLocalePathname } from '@/lib/i18n'
import { publicContent } from '@/lib/public-content'
import { getPublicHref } from '@/lib/public-pages'
import { siteConfig } from '@/lib/site'

type SiteHeaderProps = {
  currentPathname: string
  localeSwitchPathnames?: Partial<Record<AppLocale, string>> | null
  locale: AppLocale
}

export function SiteHeader({ currentPathname, locale, localeSwitchPathnames }: SiteHeaderProps) {
  const copy = publicContent[locale].header

  return (
    <header className="site-header">
      <Link className="brand-mark" href={getPublicHref('home', locale)}>
        <span className="brand-kicker">{copy.brandKicker}</span>
        <span className="brand-name">{siteConfig.projectName}</span>
      </Link>

      <nav className="site-nav" aria-label={copy.navigationLabel}>
        {copy.navigation.map((item) => (
          <Link className="site-nav-link" href={getPublicHref(item.href, locale)} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="site-actions">
        <Link className="header-cta" href={getPublicHref('contact', locale)}>
          {copy.primaryCtaLabel}
        </Link>

        <div className="locale-switcher" aria-label={copy.languageSwitcherLabel}>
          {appLocales.map((targetLocale) => {
            const href =
              localeSwitchPathnames?.[targetLocale] ??
              switchLocalePathname(currentPathname, targetLocale)
            const isActive = targetLocale === locale

            return (
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? 'locale-chip locale-chip-active' : 'locale-chip'}
                href={href}
                key={targetLocale}
              >
                {targetLocale.toUpperCase()}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
