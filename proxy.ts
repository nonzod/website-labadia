import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { defaultLocale, getLocaleFromPathname, getLocalizedPathname } from '@/lib/i18n'

const EXCLUDED_PREFIXES = ['/admin', '/api', '/_next']
const PUBLIC_FILE_REGEX = /\.[^/]+$/

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (EXCLUDED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.next()
  }

  if (PUBLIC_FILE_REGEX.test(pathname)) {
    return NextResponse.next()
  }

  const locale = getLocaleFromPathname(pathname)

  if (!locale) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = getLocalizedPathname(pathname, defaultLocale)

    return NextResponse.redirect(redirectUrl)
  }

  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('x-badia-locale', locale)
  requestHeaders.set('x-badia-pathname', pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
