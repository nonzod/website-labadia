import type { AppLocale } from '@/lib/i18n'
import type { HomeEventsSection, HomeProofSection } from '@/lib/public-content'
import type { EditorialSetting } from '@/payload-types'

import { getPayloadClient } from '@/lib/payload'
import { publicContent } from '@/lib/public-content'

const getTrimmedString = (value: string | null | undefined): string | null => {
  const trimmedValue = value?.trim()

  return trimmedValue ? trimmedValue : null
}

export const getEditorialSettings = async (locale: AppLocale): Promise<EditorialSetting> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'editorial-settings',
    depth: 0,
    fallbackLocale: 'it',
    locale,
  })
}

export const getHomepageProofSection = async (
  locale: AppLocale,
  settings?: EditorialSetting,
): Promise<HomeProofSection> => {
  const resolvedSettings = settings ?? (await getEditorialSettings(locale))
  const fallback = publicContent[locale].home.proof
  const items =
    resolvedSettings.homepageProofItems
      ?.map((item) => ({
        quote: getTrimmedString(item?.quote),
        source: getTrimmedString(item?.source),
      }))
      .filter((item): item is { quote: string; source: string } => Boolean(item.quote && item.source))
      .map((item) => ({
        quote: item.quote,
        source: item.source,
      })) ?? []

  return items.length > 0 ? { ...fallback, items } : fallback
}

export const getHomepageEventsSectionCopy = async (
  locale: AppLocale,
  settings?: EditorialSetting,
): Promise<HomeEventsSection> => {
  const resolvedSettings = settings ?? (await getEditorialSettings(locale))
  const fallback = publicContent[locale].home.events

  return {
    ...fallback,
    body: getTrimmedString(resolvedSettings.homepageEventsBody) ?? fallback.body,
  }
}

export const getExperiencesEventsEmptyState = async (
  locale: AppLocale,
  settings?: EditorialSetting,
): Promise<string> => {
  const resolvedSettings = settings ?? (await getEditorialSettings(locale))

  return (
    getTrimmedString(resolvedSettings.experiencesEventsEmptyState) ??
    publicContent[locale].home.events.emptyStateBody
  )
}
