export const appLocales = ['it', 'en'] as const

export type AppLocale = (typeof appLocales)[number]

export const defaultLocale: AppLocale = 'it'
export const fallbackLocale: AppLocale = defaultLocale

const appLocaleSet = new Set<string>(appLocales)

export const isSupportedLocale = (value: string | null | undefined): value is AppLocale => {
  if (!value) {
    return false
  }

  return appLocaleSet.has(value)
}

export const resolveLocale = (value: string | null | undefined): AppLocale => {
  if (isSupportedLocale(value)) {
    return value
  }

  return fallbackLocale
}

export const getLocaleFromPathname = (pathname: string): AppLocale | null => {
  const [, maybeLocale] = pathname.split('/')

  if (isSupportedLocale(maybeLocale)) {
    return maybeLocale
  }

  return null
}

export const stripLocaleFromPathname = (pathname: string): string => {
  const locale = getLocaleFromPathname(pathname)

  if (!locale) {
    return pathname
  }

  const withoutLocale = pathname.slice(`/${locale}`.length)

  return withoutLocale || '/'
}

export const getLocalizedPathname = (pathname: string, locale: AppLocale): string => {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  const pathWithoutLocale = stripLocaleFromPathname(normalizedPath)

  if (pathWithoutLocale === '/') {
    return `/${locale}`
  }

  return `/${locale}${pathWithoutLocale}`
}

export const switchLocalePathname = (pathname: string, locale: AppLocale): string => {
  return getLocalizedPathname(pathname, locale)
}
