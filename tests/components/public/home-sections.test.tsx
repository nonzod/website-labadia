import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getEditorialSettings, getHomepageProofSection, getHomepageEventsSectionCopy } =
  vi.hoisted(() => ({
    getEditorialSettings: vi.fn(),
    getHomepageProofSection: vi.fn(),
    getHomepageEventsSectionCopy: vi.fn(),
  }))

const { getHomepageEvents } = vi.hoisted(() => ({
  getHomepageEvents: vi.fn(),
}))

vi.mock('@/lib/editorial-settings', () => ({
  getEditorialSettings,
  getHomepageProofSection,
  getHomepageEventsSectionCopy,
}))

vi.mock('@/lib/events', () => ({
  getHomepageEvents,
}))

import { DoorGrid } from '@/components/public/DoorGrid'
import { EventsPreview } from '@/components/public/EventsPreview'
import HomePage from '@/app/[lang]/page'
import { publicContent } from '@/lib/public-content'

describe('homepage editorial sections', () => {
  beforeEach(() => {
    vi.resetModules()
    getEditorialSettings.mockReset()
    getHomepageProofSection.mockReset()
    getHomepageEventsSectionCopy.mockReset()
    getHomepageEvents.mockReset()
  })

  it('renders the two editorial doors in Italian with a localized section label', () => {
    render(
      <DoorGrid
        doors={publicContent.it.home.doors}
        eyebrow={publicContent.it.home.doorsEyebrow}
        locale="it"
        sectionLabel={publicContent.it.home.doorsSectionLabel}
        title={publicContent.it.home.doorsTitle}
      />,
    )

    expect(screen.getByRole('region', { name: /ingressi editoriali/i })).toBeInTheDocument()
    expect(screen.getByText('I')).toBeInTheDocument()
    expect(screen.getByText('II')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /scopri la dimora/i })).toHaveAttribute('href', '/it/dimora')
    expect(screen.getByRole('link', { name: /scopri le esperienze/i })).toHaveAttribute(
      'href',
      '/it/esperienze',
    )
  })

  it('renders the events preview in English from content-owned CTA routes', () => {
    render(<EventsPreview section={publicContent.en.home.events} locale="en" />)

    expect(screen.getByText(/events open to everyone/i)).toBeInTheDocument()
    expect(screen.getAllByText(/apse hall/i).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: /go to experiences/i })).toHaveAttribute(
      'href',
      '/en/esperienze',
    )
  })

  it('assembles the Italian homepage with section links from localized content', async () => {
    getEditorialSettings.mockResolvedValue({ id: 1 })
    getHomepageProofSection.mockResolvedValue(publicContent.it.home.proof)
    getHomepageEventsSectionCopy.mockResolvedValue(publicContent.it.home.events)
    getHomepageEvents.mockResolvedValue([])

    const { default: HomePage } = await import('@/app/[lang]/page')

    render(await HomePage({ params: Promise.resolve({ lang: 'it' }) }))

    const sectionOrder = Array.from(
      document.querySelectorAll<HTMLElement>('#house-overview [data-home-section]'),
    ).map((section) => section.dataset.homeSection)

    expect(screen.getByRole('heading', { level: 1, name: /una dimora di campagna/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /prenota ora/i })[0]).toHaveAttribute(
      'href',
      '/it/contatti',
    )
    expect(screen.getAllByRole('link', { name: /scopri la dimora/i })[0]).toHaveAttribute(
      'href',
      '/it/dimora',
    )
    expect(screen.getByRole('region', { name: /ingressi editoriali/i })).toBeInTheDocument()
    expect(screen.getByText(publicContent.it.home.hero.imageCaption)).toBeInTheDocument()
    expect(screen.queryByText(publicContent.it.home.mediaStories[0].imageCaption)).not.toBeInTheDocument()
    expect(screen.queryByText(publicContent.it.home.mediaStories[1].imageCaption)).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /chi torna, poi scrive/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/41/)).toBeInTheDocument()
    expect(screen.getAllByText(/salone con affreschi/i).length).toBeGreaterThan(0)
    expect(screen.getByText(publicContent.it.home.cta.imageCaption)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /vai alle esperienze/i })).toHaveAttribute(
      'href',
      '/it/esperienze',
    )
    expect(screen.getAllByRole('link', { name: /prenota ora/i })[0]).toHaveAttribute(
      'href',
      '/it/contatti',
    )
    expect(screen.getByRole('link', { name: /scopri il territorio/i })).toHaveAttribute(
      'href',
      '/it/territorio',
    )
    expect(screen.queryByText(/admin|cms|dashboard|payload/i)).not.toBeInTheDocument()
    expect(document.querySelector('.home-closing-image')).toHaveAttribute(
      'src',
      publicContent.it.home.cta.imageSrc,
    )
    expect(sectionOrder).toEqual([
      'hero',
      'intro',
      'doors',
      'details',
      'reviews',
      'events',
      'closing',
    ])
  })

  it('assembles the English homepage with section links from localized content', async () => {
    getEditorialSettings.mockResolvedValue({ id: 2 })
    getHomepageProofSection.mockResolvedValue(publicContent.en.home.proof)
    getHomepageEventsSectionCopy.mockResolvedValue(publicContent.en.home.events)
    getHomepageEvents.mockResolvedValue([])

    const { default: HomePage } = await import('@/app/[lang]/page')

    render(await HomePage({ params: Promise.resolve({ lang: 'en' }) }))

    expect(
      screen.getByRole('heading', { level: 1, name: /a countryside dimora to live slowly, together/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /book now/i })[0]).toHaveAttribute('href', '/en/contatti')
    expect(screen.getAllByRole('link', { name: /discover the house/i })[0]).toHaveAttribute(
      'href',
      '/en/dimora',
    )
    expect(screen.getByRole('region', { name: /editorial entry points/i })).toBeInTheDocument()
    expect(screen.queryByText(publicContent.en.home.mediaStories[0].imageCaption)).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /people return, and then they write back/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(publicContent.en.home.cta.imageCaption)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go to experiences/i })).toHaveAttribute(
      'href',
      '/en/esperienze',
    )
    expect(screen.getAllByRole('link', { name: /book now/i })[0]).toHaveAttribute('href', '/en/contatti')
    expect(screen.getByRole('link', { name: /discover the territory/i })).toHaveAttribute(
      'href',
      '/en/territorio',
    )
    expect(screen.queryByText(/admin|cms|dashboard|payload/i)).not.toBeInTheDocument()
  })
})
