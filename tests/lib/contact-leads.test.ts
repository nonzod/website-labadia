import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getPayloadClient, redirect } = vi.hoisted(() => ({
  getPayloadClient: vi.fn(),
  redirect: vi.fn(),
}))

vi.mock('@/lib/payload', () => ({
  getPayloadClient,
}))

vi.mock('next/navigation', () => ({
  redirect,
}))

const buildFormData = (entries: Record<string, string>) => {
  const formData = new FormData()

  Object.entries(entries).forEach(([key, value]) => {
    formData.set(key, value)
  })

  return formData
}

describe('contact lead submission helpers', () => {
  beforeEach(() => {
    getPayloadClient.mockReset()
    redirect.mockReset()
  })

  it('returns localized field errors and preserves trimmed values when validation fails', async () => {
    const { submitContactLeadAction } = await import('@/app/[lang]/contatti/actions')

    const result = await submitContactLeadAction(
      'it',
      { errors: {}, formError: null, values: {} },
      buildFormData({
        desiredPeriod: '   ',
        email: 'not-an-email',
        guestCount: '0',
        message: 'ciao',
        name: '  ',
        phone: '  +39 055 555  ',
      }),
    )

    expect(getPayloadClient).not.toHaveBeenCalled()
    expect(redirect).not.toHaveBeenCalled()
    expect(result).toEqual({
      errors: {
        desiredPeriod: 'Indica il periodo desiderato.',
        email: 'Inserisci un indirizzo email valido.',
        guestCount: 'Indica un numero di ospiti maggiore di zero.',
        message: 'Aggiungi qualche dettaglio in piu alla richiesta.',
        name: 'Inserisci il tuo nome.',
      },
      formError: 'Controlla i campi evidenziati e riprova.',
      values: {
        desiredPeriod: '',
        email: 'not-an-email',
        guestCount: '0',
        message: 'ciao',
        name: '',
        phone: '+39 055 555',
      },
    })
  })

  it('persists a valid lead with locale context and redirects to the confirmation page', async () => {
    const { submitContactLeadAction } = await import('@/app/[lang]/contatti/actions')
    const create = vi.fn().mockResolvedValue({
      createdAt: '2026-05-06T09:20:00.000Z',
      id: 41,
    })

    getPayloadClient.mockResolvedValue({ create })
    redirect.mockImplementation((href: string) => {
      throw new Error(`REDIRECT:${href}`)
    })

    await expect(
      submitContactLeadAction(
        'en',
        { errors: {}, formError: null, values: {} },
        buildFormData({
          desiredPeriod: 'Late September',
          email: 'guest@example.com',
          guestCount: '4',
          message: 'We are planning a family stay with slow days and local dinners.',
          name: 'Ada Lovelace',
          phone: '',
        }),
      ),
    ).rejects.toThrowError('REDIRECT:/en/contatti/conferma')

    expect(create).toHaveBeenCalledWith({
      collection: 'leads',
      data: {
        desiredPeriod: 'Late September',
        email: 'guest@example.com',
        guestCount: 4,
        lang: 'en',
        message: 'We are planning a family stay with slow days and local dinners.',
        name: 'Ada Lovelace',
        phone: null,
        sourcePage: '/en/contatti',
        status: 'new',
      },
    })
    expect(redirect).toHaveBeenCalledWith('/en/contatti/conferma')
  })
})
