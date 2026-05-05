import type { AppLocale } from '@/lib/i18n'
import type { Event } from '@/payload-types'

import { getPayloadClient } from '@/lib/payload'

export const getHomepageEvents = async (locale: AppLocale): Promise<Event[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'events',
    depth: 1,
    fallbackLocale: 'it',
    limit: 3,
    locale,
    sort: 'startDate',
    where: {
      and: [
        {
          status: {
            equals: 'published',
          },
        },
        {
          featuredOnHome: {
            equals: true,
          },
        },
      ],
    },
  })

  return result.docs
}

export const getUpcomingEvents = async (locale: AppLocale): Promise<Event[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'events',
    depth: 1,
    fallbackLocale: 'it',
    limit: 12,
    locale,
    sort: 'startDate',
    where: {
      and: [
        {
          status: {
            equals: 'published',
          },
        },
        {
          startDate: {
            greater_than_equal: new Date().toISOString(),
          },
        },
      ],
    },
  })

  return result.docs
}
