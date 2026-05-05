import type { AppLocale } from '@/lib/i18n'
import type { HomeEventsSection, HomeProofSection } from '@/lib/public-content'
import type { EditorialSetting } from '@/payload-types'

import { getPayloadClient } from '@/lib/payload'
import { publicContent } from '@/lib/public-content'

const getEditorialSettings = async (locale: AppLocale): Promise<EditorialSetting> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'editorial-settings',
    depth: 0,
    fallbackLocale: 'it',
    locale,
  })
}

export const getHomepageProofSection = async (locale: AppLocale): Promise<HomeProofSection> => {
  const settings = await getEditorialSettings(locale)
  const fallback = publicContent[locale].home.proof
  const items =
    settings.homepageProofItems
      ?.filter((item) => Boolean(item?.quote) && Boolean(item?.source))
      .map((item) => ({
        quote: item.quote,
        source: item.source,
      })) ?? []

  return items.length > 0 ? { ...fallback, items } : fallback
}

export const getHomepageEventsSectionCopy = async (
  locale: AppLocale,
): Promise<HomeEventsSection> => {
  const settings = await getEditorialSettings(locale)
  const fallback = publicContent[locale].home.events

  return {
    ...fallback,
    body: settings.homepageEventsBody || fallback.body,
  }
}

export const getExperiencesEventsEmptyState = async (locale: AppLocale): Promise<string> => {
  const settings = await getEditorialSettings(locale)

  return settings.experiencesEventsEmptyState || publicContent[locale].home.events.body
}
