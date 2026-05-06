import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/app/[lang]/contatti/actions', () => ({
  submitContactLeadAction: vi.fn(),
}))

import ContactPage from '@/app/[lang]/contatti/page'

describe('contact page', () => {
  it('renders the Italian inquiry form fields', async () => {
    render(await ContactPage({ params: Promise.resolve({ lang: 'it' }) }))

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /raccontaci il tuo soggiorno/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/telefono/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/periodo desiderato/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/numero di ospiti/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/messaggio/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /invia la richiesta/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the English inquiry form fields', async () => {
    render(await ContactPage({ params: Promise.resolve({ lang: 'en' }) }))

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /tell us about your stay/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/desired period/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/guest count/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /send request/i,
      }),
    ).toBeInTheDocument()
  })
})
