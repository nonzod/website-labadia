import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getPayloadClient } = vi.hoisted(() => ({
  getPayloadClient: vi.fn(),
}))

vi.mock('@/lib/payload', () => ({
  getPayloadClient,
}))

import { getHomepageEvents, getUpcomingEvents } from '@/lib/events'

describe('event helpers', () => {
  beforeEach(() => {
    getPayloadClient.mockReset()
    vi.useRealTimers()
  })

  it('returns only featured published homepage events in start-date order', async () => {
    const find = vi.fn().mockResolvedValue({
      docs: [
        { id: 1, title: 'Cena', summary: 'Giardino', startDate: '2026-05-20T19:00:00.000Z' },
        {
          id: 2,
          title: 'Degustazione',
          summary: 'Vino',
          startDate: '2026-06-04T18:00:00.000Z',
        },
      ],
    })

    getPayloadClient.mockResolvedValue({ find })

    const events = await getHomepageEvents('it')

    expect(find).toHaveBeenCalledWith({
      collection: 'events',
      depth: 1,
      fallbackLocale: 'it',
      limit: 3,
      locale: 'it',
      sort: 'startDate',
      where: {
        and: [
          { status: { equals: 'published' } },
          { featuredOnHome: { equals: true } },
        ],
      },
    })
    expect(events.map((event) => event.title)).toEqual(['Cena', 'Degustazione'])
  })

  it('queries upcoming published events with locale fallback', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-05T09:30:00.000Z'))

    const find = vi.fn().mockResolvedValue({
      docs: [
        {
          id: 3,
          title: 'Pranzo lento',
          summary: 'Domenica',
          startDate: '2026-07-10T11:30:00.000Z',
        },
      ],
    })

    getPayloadClient.mockResolvedValue({ find })

    const events = await getUpcomingEvents('en')

    expect(find).toHaveBeenCalledTimes(1)
    expect(find).toHaveBeenCalledWith({
      collection: 'events',
      depth: 1,
      fallbackLocale: 'it',
      limit: 12,
      locale: 'en',
      sort: 'startDate',
      where: {
        and: [
          { status: { equals: 'published' } },
          { startDate: { greater_than_equal: '2026-05-05T09:30:00.000Z' } },
        ],
      },
    })
    expect(events).toEqual([
      {
        id: 3,
        title: 'Pranzo lento',
        summary: 'Domenica',
        startDate: '2026-07-10T11:30:00.000Z',
      },
    ])
  })
})
