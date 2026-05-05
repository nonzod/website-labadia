import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getPayloadClient } = vi.hoisted(() => ({
  getPayloadClient: vi.fn(),
}))

vi.mock('@/lib/payload', () => ({
  getPayloadClient,
}))

import { publicContent } from '@/lib/public-content'

describe('editorial settings helpers', () => {
  beforeEach(() => {
    getPayloadClient.mockReset()
    vi.resetModules()
  })

  it('falls back to static M1 proof when the global is empty', async () => {
    const { getHomepageProofSection } = await import('@/lib/editorial-settings')
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
    const { getHomepageProofSection } = await import('@/lib/editorial-settings')
    const findGlobal = vi.fn().mockResolvedValue({
      homepageProofItems: [
        { quote: 'Accoglienza rara.', source: 'Ospite, primavera' },
        { quote: '', source: 'Da ignorare' },
        { quote: '   ', source: '  ' },
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
    const { getHomepageEventsSectionCopy } = await import('@/lib/editorial-settings')
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
    const { getHomepageEventsSectionCopy } = await import('@/lib/editorial-settings')
    const findGlobal = vi.fn().mockResolvedValue({})

    getPayloadClient.mockResolvedValue({ findGlobal })

    const section = await getHomepageEventsSectionCopy('it')

    expect(section).toEqual(publicContent.it.home.events)
  })

  it('falls back to static homepage events copy when the CMS value is blank', async () => {
    const { getHomepageEventsSectionCopy } = await import('@/lib/editorial-settings')
    const findGlobal = vi.fn().mockResolvedValue({
      homepageEventsBody: '   ',
    })

    getPayloadClient.mockResolvedValue({ findGlobal })

    const section = await getHomepageEventsSectionCopy('it')

    expect(section).toEqual(publicContent.it.home.events)
  })

  it('uses the CMS experiences empty state when present', async () => {
    const { getExperiencesEventsEmptyState } = await import('@/lib/editorial-settings')
    const findGlobal = vi.fn().mockResolvedValue({
      experiencesEventsEmptyState: 'No public events are scheduled right now.',
    })

    getPayloadClient.mockResolvedValue({ findGlobal })

    await expect(getExperiencesEventsEmptyState('en')).resolves.toBe(
      'No public events are scheduled right now.',
    )
  })

  it('falls back to the static events body when the experiences empty state is missing', async () => {
    const { getExperiencesEventsEmptyState } = await import('@/lib/editorial-settings')
    const findGlobal = vi.fn().mockResolvedValue({})

    getPayloadClient.mockResolvedValue({ findGlobal })

    await expect(getExperiencesEventsEmptyState('it')).resolves.toBe(
      publicContent.it.home.events.body,
    )
  })

  it('falls back to the static events body when the experiences empty state is blank', async () => {
    const { getExperiencesEventsEmptyState } = await import('@/lib/editorial-settings')
    const findGlobal = vi.fn().mockResolvedValue({
      experiencesEventsEmptyState: '   ',
    })

    getPayloadClient.mockResolvedValue({ findGlobal })

    await expect(getExperiencesEventsEmptyState('it')).resolves.toBe(
      publicContent.it.home.events.body,
    )
  })

  it('reuses a single global read across helpers for the same locale', async () => {
    const { getEditorialSettings, getHomepageEventsSectionCopy, getHomepageProofSection } = await import(
      '@/lib/editorial-settings'
    )
    const findGlobal = vi.fn().mockResolvedValue({
      homepageProofItems: [{ quote: 'Accoglienza rara.', source: 'Ospite, primavera' }],
      homepageEventsBody: 'Updated event copy from the CMS.',
    })

    getPayloadClient.mockResolvedValue({ findGlobal })

    const settings = await getEditorialSettings('it')

    await getHomepageProofSection('it', settings)
    await getHomepageEventsSectionCopy('it', settings)

    expect(findGlobal).toHaveBeenCalledTimes(1)
  })
})
