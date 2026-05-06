import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ContactConfirmationPage from '@/app/[lang]/contatti/conferma/page'

describe('contact confirmation page', () => {
  it('renders the Italian confirmation message', async () => {
    render(await ContactConfirmationPage({ params: Promise.resolve({ lang: 'it' }) }))

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /richiesta ricevuta/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/ti risponderemo appena possibile/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /torna alla home/i })).toHaveAttribute('href', '/it')
  })

  it('renders the English confirmation message', async () => {
    render(await ContactConfirmationPage({ params: Promise.resolve({ lang: 'en' }) }))

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /request received/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/we will reply as soon as we can/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to the home page/i })).toHaveAttribute(
      'href',
      '/en',
    )
  })
})
