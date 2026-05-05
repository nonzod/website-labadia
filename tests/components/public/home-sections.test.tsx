import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DoorGrid } from '@/components/public/DoorGrid'
import { EventsPreview } from '@/components/public/EventsPreview'
import { publicContent } from '@/lib/public-content'

describe('homepage editorial sections', () => {
  it('renders the two editorial doors', () => {
    render(<DoorGrid doors={publicContent.it.home.doors} locale="it" />)

    expect(screen.getByRole('link', { name: /la dimora/i })).toHaveAttribute('href', '/it/dimora')
    expect(screen.getByRole('link', { name: /vivi la badia/i })).toHaveAttribute(
      'href',
      '/it/esperienze',
    )
  })

  it('renders an event preview title and CTA', () => {
    render(<EventsPreview section={publicContent.it.home.events} locale="it" />)

    expect(screen.getByText(/eventi aperti a tutti/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /vai alle esperienze/i })).toHaveAttribute(
      'href',
      '/it/esperienze',
    )
  })
})
