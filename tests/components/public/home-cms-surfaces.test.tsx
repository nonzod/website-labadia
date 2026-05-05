import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { publicContent } from '@/lib/public-content'

const {
  getEditorialSettings,
  getHomepageProofSection,
  getHomepageEventsSectionCopy,
  getExperiencesEventsEmptyState,
} = vi.hoisted(() => ({
  getEditorialSettings: vi.fn(),
  getHomepageProofSection: vi.fn(),
  getHomepageEventsSectionCopy: vi.fn(),
  getExperiencesEventsEmptyState: vi.fn(),
}))

const { getHomepageEvents, getUpcomingEvents } = vi.hoisted(() => ({
  getHomepageEvents: vi.fn(),
  getUpcomingEvents: vi.fn(),
}))

vi.mock('@/lib/editorial-settings', () => ({
  getEditorialSettings,
  getHomepageProofSection,
  getHomepageEventsSectionCopy,
  getExperiencesEventsEmptyState,
}))

vi.mock('@/lib/events', () => ({
  getHomepageEvents,
  getUpcomingEvents,
}))

describe('CMS-backed public editorial surfaces', () => {
  beforeEach(() => {
    vi.resetModules()
    getEditorialSettings.mockReset()
    getHomepageProofSection.mockReset()
    getHomepageEventsSectionCopy.mockReset()
    getExperiencesEventsEmptyState.mockReset()
    getHomepageEvents.mockReset()
    getUpcomingEvents.mockReset()
  })

  it('renders homepage proof and featured events from CMS-backed helpers with one settings read', async () => {
    const settings = { id: 42 }

    getEditorialSettings.mockResolvedValue(settings)
    getHomepageProofSection.mockResolvedValue({
      body: 'Proof body from CMS.',
      eyebrow: 'Why guests trust it',
      items: [{ quote: 'A memorable stay.', source: 'Guest note' }],
      title: 'Proof shaped by the CMS',
    })
    getHomepageEventsSectionCopy.mockResolvedValue({
      body: 'Fresh event intro from the CMS.',
      emptyStateBody: 'No featured events right now.',
      eyebrow: 'Open moments',
      items: [],
      primaryHref: 'experiences',
      primaryLabel: 'Go to experiences',
      title: 'Events open to everyone will arrive here.',
    })
    getHomepageEvents.mockResolvedValue([
      { id: 1, summary: 'Dinner under the pergola.', title: 'Long-table dinner' },
      { id: 2, summary: 'An intimate reading by candlelight.', title: 'Editorial evening' },
    ])

    const { default: HomePage } = await import('@/app/[lang]/page')

    render(await HomePage({ params: Promise.resolve({ lang: 'en' }) }))

    expect(getEditorialSettings).toHaveBeenCalledWith('en')
    expect(getHomepageProofSection).toHaveBeenCalledWith('en', settings)
    expect(getHomepageEventsSectionCopy).toHaveBeenCalledWith('en', settings)
    expect(getHomepageEvents).toHaveBeenCalledWith('en')
    expect(getEditorialSettings).toHaveBeenCalledTimes(1)

    expect(screen.getByText('Proof shaped by the CMS')).toBeInTheDocument()
    expect(screen.getByText('A memorable stay.')).toBeInTheDocument()
    expect(screen.getByText('Fresh event intro from the CMS.')).toBeInTheDocument()
    expect(screen.getByText('Long-table dinner')).toBeInTheDocument()
    expect(screen.getByText('Dinner under the pergola.')).toBeInTheDocument()
    expect(screen.getByText('Editorial evening')).toBeInTheDocument()
  })

  it('renders the experiences page with editorial empty-state copy when no upcoming events exist', async () => {
    const settings = { id: 7 }

    getEditorialSettings.mockResolvedValue(settings)
    getExperiencesEventsEmptyState.mockResolvedValue(
      'No public events are scheduled right now. Check back for the next gathering.',
    )
    getUpcomingEvents.mockResolvedValue([])

    const { default: EsperienzePage } = await import('@/app/[lang]/esperienze/page')

    render(await EsperienzePage({ params: Promise.resolve({ lang: 'en' }) }))

    expect(getEditorialSettings).toHaveBeenCalledWith('en')
    expect(getExperiencesEventsEmptyState).toHaveBeenCalledWith('en', settings)
    expect(getUpcomingEvents).toHaveBeenCalledWith('en')
    expect(getEditorialSettings).toHaveBeenCalledTimes(1)

    expect(screen.getByText(/events, dinners, and hosted moments with a quieter rhythm/i)).toBeInTheDocument()
    expect(screen.getByText('No public events are scheduled right now. Check back for the next gathering.')).toBeInTheDocument()
  })

  it('renders the homepage empty-state branch when no featured events are available', async () => {
    const settings = { id: 9 }

    getEditorialSettings.mockResolvedValue(settings)
    getHomepageProofSection.mockResolvedValue(publicContent.en.home.proof)
    getHomepageEventsSectionCopy.mockResolvedValue(publicContent.en.home.events)
    getHomepageEvents.mockResolvedValue([])

    const { default: HomePage } = await import('@/app/[lang]/page')

    render(await HomePage({ params: Promise.resolve({ lang: 'en' }) }))

    expect(getEditorialSettings).toHaveBeenCalledWith('en')
    expect(getHomepageEvents).toHaveBeenCalledWith('en')
    expect(screen.getByText(publicContent.en.home.events.emptyStateBody)).toBeInTheDocument()
    expect(screen.getByText(publicContent.en.home.events.items[0].title)).toBeInTheDocument()
  })
})
