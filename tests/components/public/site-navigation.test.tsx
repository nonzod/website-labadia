import { act, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SiteHeader } from '@/components/public/SiteHeader'

describe('site header navigation', () => {
  it('exposes the editorial parent pages in Italian', () => {
    const { container } = render(<SiteHeader currentPathname="/it" locale="it" />)

    const brand = container.querySelector('.brand-mark')

    expect(brand?.firstElementChild).toHaveTextContent('La Badia')
    expect(brand?.lastElementChild).toHaveTextContent('San Venanzo · Umbria')
    expect(screen.getByRole('link', { name: 'La Dimora' })).toHaveAttribute('href', '/it/dimora')
    expect(screen.getByRole('link', { name: 'Esperienze' })).toHaveAttribute('href', '/it/esperienze')
    expect(screen.getByRole('link', { name: 'Territorio' })).toHaveAttribute('href', '/it/territorio')
    expect(screen.getByRole('link', { name: 'Racconti' })).toHaveAttribute('href', '/it/racconti')
    expect(screen.getByRole('link', { name: /prenota ora/i })).toHaveAttribute('href', '/it/contatti')
    expect(container.querySelector('.site-header')).toHaveClass('site-header-home')
  })

  it('keeps the homepage header fixed and marks it as scrolled after scrolling', () => {
    const { container } = render(<SiteHeader currentPathname="/it" locale="it" />)
    const header = container.querySelector('.site-header')

    expect(header).toHaveClass('site-header-home')
    expect(header).toHaveClass('site-header-fixed')
    expect(header).not.toHaveClass('site-header-scrolled')

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 96,
    })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(header).toHaveClass('site-header-scrolled')
  })
})
