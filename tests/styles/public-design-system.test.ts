import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const testFileDirectory = path.dirname(fileURLToPath(import.meta.url))
const globalsCss = readFileSync(path.resolve(testFileDirectory, '../../styles/globals.css'), 'utf8')

describe('public design system tokens', () => {
  it('defines the official public palette families and typography tokens', () => {
    for (const token of [
      '--cotto-100',
      '--cotto-500',
      '--cotto-700',
      '--glicine-100',
      '--glicine-500',
      '--narciso-100',
      '--narciso-500',
      '--venanzite-100',
      '--venanzite-700',
      '--venanzite-900',
      '--colline-100',
      '--colline-500',
      '--colline-700',
      '--font-display',
      '--font-body',
      '--font-ui',
    ]) {
      expect(globalsCss).toContain(`${token}:`)
    }
  })

  it('defines visible focus states for the main public interactive elements', () => {
    for (const selector of [
      '.site-nav-link:focus-visible',
      '.header-cta:focus-visible',
      '.locale-chip:focus-visible',
      '.primary-link:focus-visible',
      '.secondary-link:focus-visible',
      '.back-link:focus-visible',
    ]) {
      expect(globalsCss).toContain(selector)
    }
  })

  it('includes the homepage layout primitives required by T14b', () => {
    for (const selector of [
      '.site-header-home',
      '.home-hero-immersive',
      '.detail-strip',
      '.reviews-section',
      '.home-closing',
    ]) {
      expect(globalsCss).toContain(selector)
    }
  })

  it('keeps the homepage header overlaid on mobile instead of turning it into a static block', () => {
    expect(globalsCss).not.toContain('.site-header-home {\n    position: static;')
  })
})
