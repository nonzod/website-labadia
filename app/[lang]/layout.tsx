import type { ReactNode } from 'react'

import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

import { SiteFooter } from '@/components/public/SiteFooter'
import { SiteHeader } from '@/components/public/SiteHeader'
import { appLocales, isSupportedLocale } from '@/lib/i18n'
import { getPostLocaleSwitcherPathnames } from '@/lib/posts'
import { publicContent } from '@/lib/public-content'

type LocaleLayoutProps = Readonly<{
  children: ReactNode
  params: Promise<{
    lang: string
  }>
}>

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
  const localeSwitchPathnames = await getPostLocaleSwitcherPathnames(currentPathname)
  const skipToContentLabel = publicContent[lang].header.skipToContentLabel

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {skipToContentLabel}
      </a>
      <SiteHeader
        currentPathname={currentPathname}
        locale={lang}
        localeSwitchPathnames={localeSwitchPathnames}
      />
      {children}
      <SiteFooter locale={lang} />
    </div>
  )
}
