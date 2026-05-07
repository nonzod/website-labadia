'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { ThemeToggle } from '@/components/theme/ThemeToggle'
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
  const isHomepage = currentPathname === `/${locale}` || currentPathname === `/${locale}/`
  const homeLocationLabel = siteConfig.locationLabel.replace(', ', ' · ')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (!isHomepage) {
      return
    }

    const syncScrollState = () => {
      setIsScrolled(window.scrollY > 24)
    }

    syncScrollState()
    window.addEventListener('scroll', syncScrollState, { passive: true })

    return () => window.removeEventListener('scroll', syncScrollState)
  }, [isHomepage])

  const headerClassName = [
    'site-header',
    isHomepage ? 'site-header-home site-header-fixed' : null,
    isHomepage && isScrolled ? 'site-header-scrolled' : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClassName}>
      <Link className="brand-mark" href={getPublicHref('home', locale)}>
        <span className="brand-name">{siteConfig.projectName}</span>
        <span className={isHomepage ? 'brand-locality' : 'brand-kicker'}>
          {isHomepage ? homeLocationLabel : copy.brandKicker}
        </span>
      </Link>

      <nav className="site-nav" aria-label={copy.navigationLabel}>
        {copy.navigation.map((item) => (
          <Link className="site-nav-link" href={getPublicHref(item.href, locale)} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="site-actions">
        <ThemeToggle />
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
