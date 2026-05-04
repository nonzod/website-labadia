import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { headers } from 'next/headers'

import '@/styles/globals.css'
import { defaultLocale, resolveLocale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'La Badia',
  description: 'Baseline applicativa Next.js + Payload per il progetto La Badia con routing bilingue IT/EN.',
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
