import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getPayloadClient } = vi.hoisted(() => ({
  getPayloadClient: vi.fn(),
}))

vi.mock('@/lib/payload', () => ({
  getPayloadClient,
}))

import {
  getExperiencesEventsEmptyState,
  getHomepageEventsSectionCopy,
  getHomepageProofSection,
} from '@/lib/editorial-settings'
import { publicContent } from '@/lib/public-content'

describe('editorial settings helpers', () => {
  beforeEach(() => {
    getPayloadClient.mockReset()
  })

  it('falls back to static M1 proof when the global is empty', async () => {
    const findGlobal = vi.fn().mockResolvedValue({ homepageProofItems: [] })

    getPayloadClient.mockResolvedValue({ findGlobal })

    const section = await getHomepageProofSection('it')

    expect(findGlobal).toHaveBeenCalledWith({
      slug: 'editorial-settings',
      depth: 0,
      fallbackLocale: 'it',
      locale: 'it',
    })
    expect(section).toEqual(publicContent.it.home.proof)
  })

  it('replaces proof items with valid CMS-managed entries', async () => {
    const findGlobal = vi.fn().mockResolvedValue({
      homepageProofItems: [
        { quote: 'Accoglienza rara.', source: 'Ospite, primavera' },
        { quote: '', source: 'Da ignorare' },
      ],
    })

    getPayloadClient.mockResolvedValue({ findGlobal })

    const section = await getHomepageProofSection('en')

    expect(section).toEqual({
      ...publicContent.en.home.proof,
      items: [{ quote: 'Accoglienza rara.', source: 'Ospite, primavera' }],
    })
  })

  it('uses the CMS homepage events body when present', async () => {
    const findGlobal = vi.fn().mockResolvedValue({
      homepageEventsBody: 'Updated event copy from the CMS.',
    })

    getPayloadClient.mockResolvedValue({ findGlobal })

    const section = await getHomepageEventsSectionCopy('en')

    expect(section).toEqual({
      ...publicContent.en.home.events,
      body: 'Updated event copy from the CMS.',
    })
  })

  it('falls back to static homepage events copy when the CMS value is missing', async () => {
    const findGlobal = vi.fn().mockResolvedValue({})

    getPayloadClient.mockResolvedValue({ findGlobal })

    const section = await getHomepageEventsSectionCopy('it')

    expect(section).toEqual(publicContent.it.home.events)
  })

  it('uses the CMS experiences empty state when present', async () => {
    const findGlobal = vi.fn().mockResolvedValue({
      experiencesEventsEmptyState: 'No public events are scheduled right now.',
    })

    getPayloadClient.mockResolvedValue({ findGlobal })

    await expect(getExperiencesEventsEmptyState('en')).resolves.toBe(
      'No public events are scheduled right now.',
    )
  })

  it('falls back to the static events body when the experiences empty state is missing', async () => {
    const findGlobal = vi.fn().mockResolvedValue({})

    getPayloadClient.mockResolvedValue({ findGlobal })

    await expect(getExperiencesEventsEmptyState('it')).resolves.toBe(
      publicContent.it.home.events.body,
    )
  })
})
