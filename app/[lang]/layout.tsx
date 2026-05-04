import type { ReactNode } from 'react'

import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

import {
  appLocales,
  getLocalizedPathname,
  isSupportedLocale,
  resolveLocale,
  switchLocalePathname,
} from '@/lib/i18n'
import { siteConfig } from '@/lib/site'

type LocaleLayoutProps = Readonly<{
  children: ReactNode
  params: Promise<{
    lang: string
  }>
}>

const navigationLabels = {
  en: {
    admin: 'Admin',
    home: 'Home',
    languageSwitcher: 'Language switcher',
  },
  it: {
    admin: 'Admin',
    home: 'Home',
    languageSwitcher: 'Cambio lingua',
  },
} as const

export function generateStaticParams() {
  return appLocales.map((lang) => ({ lang }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) {
    notFound()
  }

  const requestHeaders = await headers()
  const currentPathname = requestHeaders.get('x-badia-pathname') ?? `/${lang}`
  const activeLocale = resolveLocale(requestHeaders.get('x-badia-locale') ?? lang)
  const labels = navigationLabels[activeLocale]

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand-mark" href={getLocalizedPathname('/', activeLocale)}>
          <span className="brand-kicker">La Badia</span>
          <span>{siteConfig.projectName}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <Link href={getLocalizedPathname('/', activeLocale)}>{labels.home}</Link>
          <Link href={siteConfig.adminPath}>{labels.admin}</Link>
        </nav>

        <div className="locale-switcher" aria-label={labels.languageSwitcher}>
          {appLocales.map((locale) => {
            const href = switchLocalePathname(currentPathname, locale)
            const isActive = locale === activeLocale

            return (
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? 'locale-chip locale-chip-active' : 'locale-chip'}
                href={href}
                key={locale}
              >
                {locale.toUpperCase()}
              </Link>
            )
          })}
        </div>
      </header>

      {children}
    </div>
  )
}
