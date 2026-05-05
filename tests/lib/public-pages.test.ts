import { describe, expect, it } from 'vitest'

import { getPublicHref, publicPageOrder, publicPathnames } from '@/lib/public-pages'

describe('public route model', () => {
  it('exposes the new editorial route keys', () => {
    expect(publicPageOrder).toEqual([
      'home',
      'dimora',
      'experiences',
      'territory',
      'stories',
      'blog',
      'contact',
    ])
  })

  it('builds localized hrefs for the new parent pages', () => {
    expect(getPublicHref('dimora', 'it')).toBe('/it/dimora')
    expect(getPublicHref('experiences', 'en')).toBe('/en/esperienze')
    expect(getPublicHref('territory', 'it')).toBe('/it/territorio')
    expect(getPublicHref('stories', 'en')).toBe('/en/racconti')
  })

  it('keeps existing paths stable for blog and contact', () => {
    expect(publicPathnames.blog).toBe('/blog')
    expect(publicPathnames.contact).toBe('/contatti')
  })
})
