import type { AppLocale } from '@/lib/i18n'

import { getLocalizedPathname } from '@/lib/i18n'

export const publicPathnames = {
  blog: '/blog',
  contact: '/contatti',
  contactConfirmation: '/contatti/conferma',
  dimora: '/dimora',
  experiences: '/esperienze',
  home: '/',
  stories: '/racconti',
  territory: '/territorio',
} as const

export type PublicRouteKey = keyof typeof publicPathnames

export const publicPageOrder: PublicRouteKey[] = [
  'home',
  'dimora',
  'experiences',
  'territory',
  'stories',
  'blog',
  'contact',
]

export const getPublicHref = (route: PublicRouteKey, locale: AppLocale): string => {
  return getLocalizedPathname(publicPathnames[route], locale)
}
