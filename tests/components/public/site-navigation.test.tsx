import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SiteHeader } from '@/components/public/SiteHeader'

describe('site header navigation', () => {
  it('exposes the editorial parent pages in Italian', () => {
    const { container } = render(<SiteHeader currentPathname="/it" locale="it" />)

    expect(screen.getByRole('link', { name: 'La Dimora' })).toHaveAttribute('href', '/it/dimora')
    expect(screen.getByRole('link', { name: 'Esperienze' })).toHaveAttribute('href', '/it/esperienze')
    expect(screen.getByRole('link', { name: 'Territorio' })).toHaveAttribute('href', '/it/territorio')
    expect(screen.getByRole('link', { name: 'Racconti' })).toHaveAttribute('href', '/it/racconti')
    expect(screen.getByRole('link', { name: /prenota ora/i })).toHaveAttribute('href', '/it/contatti')
    expect(container.querySelector('.site-header')).toHaveClass('site-header-home')
  })
})
