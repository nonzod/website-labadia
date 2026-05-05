import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DoorGrid } from '@/components/public/DoorGrid'
import { EventsPreview } from '@/components/public/EventsPreview'
import HomePage from '@/app/[lang]/page'
import { publicContent } from '@/lib/public-content'

describe('homepage editorial sections', () => {
  it('renders the two editorial doors in Italian with a localized section label', () => {
    render(
      <DoorGrid
        doors={publicContent.it.home.doors}
        locale="it"
        sectionLabel={publicContent.it.home.doorsSectionLabel}
      />,
    )

    expect(screen.getByRole('region', { name: /ingressi editoriali/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /la dimora/i })).toHaveAttribute('href', '/it/dimora')
    expect(screen.getByRole('link', { name: /vivi la badia/i })).toHaveAttribute(
      'href',
      '/it/esperienze',
    )
  })

  it('renders the events preview in English from content-owned CTA routes', () => {
    render(<EventsPreview section={publicContent.en.home.events} locale="en" />)

    expect(screen.getByText(/events open to everyone/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go to experiences/i })).toHaveAttribute(
      'href',
      '/en/esperienze',
    )
  })

  it('assembles the Italian homepage with section links from localized content', async () => {
    render(await HomePage({ params: Promise.resolve({ lang: 'it' }) }))

    expect(screen.getByRole('heading', { level: 1, name: /una dimora di campagna/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /richiedi il tuo soggiorno/i })).toHaveAttribute(
      'href',
      '/it/contatti',
    )
    expect(screen.getByRole('link', { name: /scopri la dimora/i })).toHaveAttribute(
      'href',
      '/it/dimora',
    )
    expect(screen.getByRole('region', { name: /ingressi editoriali/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /vai alle esperienze/i })).toHaveAttribute(
      'href',
      '/it/esperienze',
    )
  })

  it('assembles the English homepage with section links from localized content', async () => {
    render(await HomePage({ params: Promise.resolve({ lang: 'en' }) }))

    expect(
      screen.getByRole('heading', { level: 1, name: /a countryside dimora to live slowly, together/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /request your stay/i })).toHaveAttribute(
      'href',
      '/en/contatti',
    )
    expect(screen.getByRole('link', { name: /discover the house/i })).toHaveAttribute(
      'href',
      '/en/dimora',
    )
    expect(screen.getByRole('region', { name: /editorial entry points/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go to experiences/i })).toHaveAttribute(
      'href',
      '/en/esperienze',
    )
  })
})
