import type { AppLocale } from '@/lib/i18n'
import type { HomeEventsSection, HomeProofSection } from '@/lib/public-content'
import type { EditorialSetting } from '@/payload-types'

import { getPayloadClient } from '@/lib/payload'
import { publicContent } from '@/lib/public-content'

const getTrimmedString = (value: string | null | undefined): string | null => {
  const trimmedValue = value?.trim()

  return trimmedValue ? trimmedValue : null
}

const editorialSettingsByLocale = new Map<AppLocale, Promise<EditorialSetting>>()

const getEditorialSettings = (locale: AppLocale): Promise<EditorialSetting> => {
  const cachedSettings = editorialSettingsByLocale.get(locale)

  if (cachedSettings) {
    return cachedSettings
  }

  const settingsPromise = (async () => {
    const payload = await getPayloadClient()

    return payload.findGlobal({
      slug: 'editorial-settings',
      depth: 0,
      fallbackLocale: 'it',
      locale,
    })
  })()

  editorialSettingsByLocale.set(locale, settingsPromise)

  return settingsPromise
}

export const getHomepageProofSection = async (locale: AppLocale): Promise<HomeProofSection> => {
  const settings = await getEditorialSettings(locale)
  const fallback = publicContent[locale].home.proof
  const items =
    settings.homepageProofItems
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
): Promise<HomeEventsSection> => {
  const settings = await getEditorialSettings(locale)
  const fallback = publicContent[locale].home.events

  return {
    ...fallback,
    body: getTrimmedString(settings.homepageEventsBody) ?? fallback.body,
  }
}

export const getExperiencesEventsEmptyState = async (locale: AppLocale): Promise<string> => {
  const settings = await getEditorialSettings(locale)

  return getTrimmedString(settings.experiencesEventsEmptyState) ?? publicContent[locale].home.events.body
}
