import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { headers } from 'next/headers'

import '@/styles/globals.css'
import { defaultLocale, resolveLocale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8066'

export const metadata: Metadata = {
  title: siteConfig.projectName,
  metadataBase: new URL(siteUrl),
  description: 'Dimora rurale a San Venanzo tra soggiorno, paesaggio, racconti ed esperienze.',
  openGraph: {
    title: siteConfig.projectName,
    description: 'Dimora rurale a San Venanzo tra soggiorno, paesaggio, racconti ed esperienze.',
    locale: 'it_IT',
    siteName: siteConfig.projectName,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.projectName,
    description: 'Dimora rurale a San Venanzo tra soggiorno, paesaggio, racconti ed esperienze.',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const requestHeaders = await headers()
  const activeLocale = resolveLocale(requestHeaders.get('x-badia-locale') ?? defaultLocale)

  return (
    <html lang={activeLocale}>
      <body>{children}</body>
    </html>
  )
}
