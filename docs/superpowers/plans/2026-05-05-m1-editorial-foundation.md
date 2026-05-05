# M1 Editorial Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first implementation slice of `M1` by turning the current public shell into an editorial foundation with release-ready asset inventory, a new homepage structure, four parent pages, and aligned navigation.

**Architecture:** Keep the existing App Router and bilingual copy-first approach, but split route metadata from narrative copy so the public surface can grow without turning `lib/public-content.ts` into a monolith. Introduce a small test harness, then build the new homepage and parent pages from reusable public components and a named editorial token system in `styles/globals.css`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Payload CMS 3, Vitest, Testing Library, global CSS via `styles/globals.css`

---

## Scope Check

The approved spec covers `M1`, `M2`, and `M3`. This plan intentionally covers only the first implementation slice of `M1`:

- release-ready asset and content inventory
- public route model for `La Dimora`, `Esperienze`, `Territorio`, `Racconti`
- editorial homepage with two doors, proof, and event preview
- parent pages and aligned navigation

`M2` and `M3` should get separate plans after this slice ships.

## File Map

- Create: `docs/content/m1-editorial-asset-inventory.md`
  - source of truth for currently available launch assets and missing photography
- Create: `docs/content/m1-page-content-matrix.md`
  - page-by-page matrix for `home`, `dimora`, `esperienze`, `territorio`, `racconti`
- Create: `lib/public-pages.ts`
  - public route keys, localized href helpers, and navigation/page descriptors
- Modify: `lib/public-content.ts`
  - bilingual copy and structured content for homepage, parent pages, proof, and events preview
- Create: `components/public/HomeHero.tsx`
  - image-led homepage hero
- Create: `components/public/DoorGrid.tsx`
  - two-door entry section linking to parent pages
- Create: `components/public/ProofSection.tsx`
  - reusable guest proof/review band
- Create: `components/public/EventsPreview.tsx`
  - editorial event preview section
- Create: `components/public/EditorialPageHero.tsx`
  - shared hero for `dimora`, `esperienze`, `territorio`, `racconti`
- Create: `components/public/EditorialFactList.tsx`
  - shared fact/feature grid for parent pages
- Modify: `components/public/SiteHeader.tsx`
  - primary navigation aligned with the new page architecture
- Modify: `components/public/SiteFooter.tsx`
  - footer navigation aligned with the new page architecture
- Modify: `app/[lang]/page.tsx`
  - assemble new homepage sections
- Create: `app/[lang]/dimora/page.tsx`
- Create: `app/[lang]/esperienze/page.tsx`
- Create: `app/[lang]/territorio/page.tsx`
- Create: `app/[lang]/racconti/page.tsx`
  - parent pages for the editorial structure
- Modify: `app/layout.tsx`
  - update site-wide metadata baseline
- Modify: `styles/globals.css`
  - named editorial tokens and layouts for the new public sections
- Create: `public/images/editorial/hero-ulivi-tramonto.jpg`
- Create: `public/images/editorial/hero-notte.jpg`
- Create: `public/images/editorial/vista-colline.jpg`
- Create: `public/images/editorial/vista-colline-notte.jpg`
  - staged launch assets copied from `analisi/La Badia/photos/`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `tests/lib/public-pages.test.ts`
- Create: `tests/components/public/home-sections.test.tsx`
- Create: `tests/components/public/site-navigation.test.tsx`
  - test harness and public-surface regression coverage

### Route Model Decision

Keep one shared slug set under both locales for this slice:

- `/it`, `/en`
- `/it/dimora`, `/en/dimora`
- `/it/esperienze`, `/en/esperienze`
- `/it/territorio`, `/en/territorio`
- `/it/racconti`, `/en/racconti`
- existing `/blog` and `/contatti` remain unchanged

This avoids expanding routing complexity while preserving bilingual copy in-page.

### Task 1: Inventory Release Assets And Content Inputs

**Files:**
- Create: `docs/content/m1-editorial-asset-inventory.md`
- Create: `docs/content/m1-page-content-matrix.md`

- [ ] **Step 1: Create the asset inventory doc**

```md
# M1 Editorial Asset Inventory

## Available now

| Asset | Source | Proposed usage | Status |
| --- | --- | --- | --- |
| `hero-ulivi-tramonto.jpg` | `analisi/La Badia/photos/hero-ulivi-tramonto.jpg` | homepage hero / dimora hero fallback | ready |
| `hero-notte.jpg` | `analisi/La Badia/photos/hero-notte.jpg` | future night variant / territory mood block | ready |
| `vista-colline.jpg` | `analisi/La Badia/photos/vista-colline.jpg` | territory page hero / homepage secondary media | ready |
| `vista-colline-notte.jpg` | `analisi/La Badia/photos/vista-colline-notte.jpg` | future atmospheric support image | ready |

## Missing for later M1 extension

| Need | Target page/section | Why it matters | Status |
| --- | --- | --- | --- |
| Interior salon photography | `dimora`, homepage proof/media | support the fresco narrative with a real image | missing |
| Room photography | `dimora` | distinguish stay offer from generic copy | missing |
| Garden detail photography | homepage closing, `dimora` | support the garden story with close-range material | missing |
| Event/social photography | `esperienze` | make open events credible | missing |
```

- [ ] **Step 2: Create the page content matrix**

```md
# M1 Page Content Matrix

| Page | Goal | Required blocks | Available now | Missing now |
| --- | --- | --- | --- | --- |
| `home` | editorial entry hub | hero, doors, proof, events preview, closing CTA | copy baseline, two landscape images | structured reviews, event specifics |
| `dimora` | clarify stay offer | hero, factual stay grid, house narrative, practical CTA | factual copy from `lib/public-content.ts` | interior photography |
| `esperienze` | explain open and hosted experiences | hero, experience modes, event preview, private occasions | concept copy from `analisi/remixed-c8b29026.html` | calendar details, event photography |
| `territorio` | connect stay with place | hero, routes, local anchors, practical rhythm | landscape imagery, territory copy baseline | richer route details |
| `racconti` | bridge narrative pages and blog | hero, editorial framing, selected stories, blog CTA | blog exists, copy baseline | curated story selection |
```

- [ ] **Step 3: Verify the docs have no placeholder markers**

Run: `rg -n "TBD|TODO|\\?\\s*$" docs/content/m1-editorial-asset-inventory.md docs/content/m1-page-content-matrix.md`

Expected: no output

- [ ] **Step 4: Commit**

```bash
git add docs/content/m1-editorial-asset-inventory.md docs/content/m1-page-content-matrix.md
git commit -m "docs: add M1 editorial asset and content inventory"
```

### Task 2: Add Test Harness And Public Route Model

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `tests/lib/public-pages.test.ts`
- Create: `lib/public-pages.ts`
- Modify: `lib/public-content.ts`

- [ ] **Step 1: Add the test runner scaffold**

```json
{
  "scripts": {
    "build": "next build --webpack",
    "dev": "next dev",
    "generate:types": "npm run payload -- generate:types",
    "payload": "cross-env PAYLOAD_CONFIG_PATH=payload.config.ts payload",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "6.8.0",
    "@testing-library/react": "16.3.0",
    "@types/node": "24.7.2",
    "@types/react": "19.2.2",
    "@types/react-dom": "19.2.2",
    "cross-env": "10.0.0",
    "jsdom": "26.1.0",
    "sass": "1.93.2",
    "typescript": "5.9.3",
    "vitest": "2.1.8"
  }
}
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
})
```

```ts
// tests/setup.ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 2: Install the new dev dependencies**

Run: `npm install`

Expected: `added ... packages` and `package-lock.json` updated

- [ ] **Step 3: Write the failing route-model test**

```ts
// tests/lib/public-pages.test.ts
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
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm exec vitest run tests/lib/public-pages.test.ts`

Expected: FAIL because `@/lib/public-pages` does not exist yet

- [ ] **Step 5: Implement the route model and move route helpers out of `lib/public-content.ts`**

```ts
// lib/public-pages.ts
import type { AppLocale } from '@/lib/i18n'

import { getLocalizedPathname } from '@/lib/i18n'

export const publicPathnames = {
  blog: '/blog',
  contact: '/contatti',
  dimora: '/dimora',
  experiences: '/esperienze',
  home: '/',
  stories: '/racconti',
  territory: '/territorio',
} as const

export type PublicRouteKey = keyof typeof publicPathnames

export const publicPageOrder: PublicRouteKey[] = [
  'home',
  'dimora',
  'experiences',
  'territory',
  'stories',
  'blog',
  'contact',
]

export const getPublicHref = (route: PublicRouteKey, locale: AppLocale): string => {
  return getLocalizedPathname(publicPathnames[route], locale)
}
```

```ts
// lib/public-content.ts
import type { AppLocale } from '@/lib/i18n'

import type { PublicRouteKey } from '@/lib/public-pages'

export type FooterLink = {
  href: PublicRouteKey
  label: string
}

export type ParentPageCopy = {
  eyebrow: string
  title: string
  body: string
  primaryLabel: string
  secondaryLabel: string
}

export type HomeDoor = {
  body: string
  href: PublicRouteKey
  imageAlt: string
  imageSrc: string
  label: string
  title: string
}
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm exec vitest run tests/lib/public-pages.test.ts`

Expected: PASS with `3 passed`

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts tests/setup.ts tests/lib/public-pages.test.ts lib/public-pages.ts lib/public-content.ts
git commit -m "test: add public route model coverage"
```

### Task 3: Build The Editorial Homepage

**Files:**
- Create: `components/public/HomeHero.tsx`
- Create: `components/public/DoorGrid.tsx`
- Create: `components/public/ProofSection.tsx`
- Create: `components/public/EventsPreview.tsx`
- Modify: `app/[lang]/page.tsx`
- Modify: `lib/public-content.ts`
- Modify: `styles/globals.css`
- Create: `public/images/editorial/hero-ulivi-tramonto.jpg`
- Create: `public/images/editorial/hero-notte.jpg`
- Create: `public/images/editorial/vista-colline.jpg`
- Create: `public/images/editorial/vista-colline-notte.jpg`
- Create: `tests/components/public/home-sections.test.tsx`

- [ ] **Step 1: Stage the launch-ready images**

```bash
mkdir -p public/images/editorial
cp "analisi/La Badia/photos/hero-ulivi-tramonto.jpg" public/images/editorial/hero-ulivi-tramonto.jpg
cp "analisi/La Badia/photos/hero-notte.jpg" public/images/editorial/hero-notte.jpg
cp "analisi/La Badia/photos/vista-colline.jpg" public/images/editorial/vista-colline.jpg
cp "analisi/La Badia/photos/vista-colline-notte.jpg" public/images/editorial/vista-colline-notte.jpg
```

- [ ] **Step 2: Write the failing homepage section test**

```tsx
// tests/components/public/home-sections.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DoorGrid } from '@/components/public/DoorGrid'
import { EventsPreview } from '@/components/public/EventsPreview'
import { publicContent } from '@/lib/public-content'

describe('homepage editorial sections', () => {
  it('renders the two editorial doors', () => {
    render(<DoorGrid doors={publicContent.it.home.doors} locale="it" />)

    expect(screen.getByRole('link', { name: /la dimora/i })).toHaveAttribute('href', '/it/dimora')
    expect(screen.getByRole('link', { name: /vivi la badia/i })).toHaveAttribute('href', '/it/esperienze')
  })

  it('renders an event preview title and CTA', () => {
    render(<EventsPreview section={publicContent.it.home.events} locale="it" />)

    expect(screen.getByText(/eventi aperti a tutti/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /vai alle esperienze/i })).toHaveAttribute('href', '/it/esperienze')
  })
})
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm exec vitest run tests/components/public/home-sections.test.tsx`

Expected: FAIL because the homepage components do not exist yet

- [ ] **Step 4: Implement the structured homepage copy and new section components**

```tsx
// components/public/DoorGrid.tsx
import Link from 'next/link'

import type { AppLocale } from '@/lib/i18n'
import type { HomeDoor } from '@/lib/public-content'

import { getPublicHref } from '@/lib/public-pages'

type DoorGridProps = {
  doors: HomeDoor[]
  locale: AppLocale
}

export function DoorGrid({ doors, locale }: DoorGridProps) {
  return (
    <section className="door-grid" aria-label="Editorial entry points">
      {doors.map((door) => (
        <article className="door-card" key={door.title}>
          <img alt={door.imageAlt} className="door-card-image" src={door.imageSrc} />
          <div className="door-card-copy">
            <p className="section-eyebrow">{door.label}</p>
            <h2>{door.title}</h2>
            <p>{door.body}</p>
            <Link className="primary-link" href={getPublicHref(door.href, locale)}>
              {door.title}
            </Link>
          </div>
        </article>
      ))}
    </section>
  )
}
```

```tsx
// components/public/HomeHero.tsx
import Link from 'next/link'

import type { AppLocale } from '@/lib/i18n'
import type { HomeHeroCopy } from '@/lib/public-content'

import { getPublicHref } from '@/lib/public-pages'

type HomeHeroProps = {
  hero: HomeHeroCopy
  locale: AppLocale
}

export function HomeHero({ hero, locale }: HomeHeroProps) {
  return (
    <section className="home-hero">
      <img alt={hero.imageAlt} className="home-hero-image" src={hero.imageSrc} />
      <div className="home-hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className="lead">{hero.body}</p>
        <div className="cta-row">
          <Link className="primary-link" href={getPublicHref('contact', locale)}>
            {hero.primaryLabel}
          </Link>
          <Link className="secondary-link" href={getPublicHref('dimora', locale)}>
            {hero.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
```

```tsx
// components/public/ProofSection.tsx
import type { HomeProofSection } from '@/lib/public-content'

type ProofSectionProps = {
  section: HomeProofSection
}

export function ProofSection({ section }: ProofSectionProps) {
  return (
    <section className="proof-section">
      <div className="section-heading">
        <p className="section-eyebrow">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        <p className="section-body">{section.body}</p>
      </div>

      <div className="detail-grid">
        {section.items.map((item) => (
          <article className="detail-card" key={item.quote}>
            <p>{item.quote}</p>
            <p className="section-eyebrow">{item.source}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
```

```tsx
// components/public/EventsPreview.tsx
import Link from 'next/link'

import type { AppLocale } from '@/lib/i18n'
import type { HomeEventsSection } from '@/lib/public-content'

import { getPublicHref } from '@/lib/public-pages'

type EventsPreviewProps = {
  locale: AppLocale
  section: HomeEventsSection
}

export function EventsPreview({ locale, section }: EventsPreviewProps) {
  return (
    <section className="events-preview">
      <div className="section-heading">
        <p className="section-eyebrow">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        <p className="section-body">{section.body}</p>
      </div>

      <div className="detail-grid">
        {section.items.map((item) => (
          <article className="detail-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <Link className="secondary-link" href={getPublicHref('experiences', locale)}>
        {section.primaryLabel}
      </Link>
    </section>
  )
}
```

```tsx
// lib/public-content.ts
export type HomeHeroCopy = {
  body: string
  eyebrow: string
  imageAlt: string
  imageSrc: string
  primaryLabel: string
  secondaryLabel: string
  title: string
}

export type HomeProofSection = {
  body: string
  eyebrow: string
  items: Array<{ quote: string; source: string }>
  title: string
}

export type HomeEventsSection = {
  body: string
  eyebrow: string
  items: Array<{ body: string; title: string }>
  primaryLabel: string
  title: string
}
```

```tsx
// app/[lang]/page.tsx
      <section className="content-stack" id="house-overview">
        <HomeHero hero={copy.hero} locale={lang} />
        <SectionHeading body={copy.intro.body} eyebrow={copy.intro.eyebrow} title={copy.intro.title} />
        <DoorGrid doors={copy.doors} locale={lang} />
        <ProofSection section={copy.proof} />
        <EventsPreview locale={lang} section={copy.events} />
        <CtaBand
          body={copy.cta.body}
          eyebrow={copy.cta.eyebrow}
          primaryHref={getPublicHref('contact', lang)}
          primaryLabel={copy.cta.primaryLabel}
          secondaryHref={getPublicHref('territory', lang)}
          secondaryLabel={copy.cta.secondaryLabel}
          title={copy.cta.title}
        />
      </section>
```

- [ ] **Step 5: Replace the generic beige tokens with named editorial tokens**

```css
:root {
  --cotto-base: #c4674a;
  --cotto-deep: #8f3e26;
  --venanzite-base: #6e7b72;
  --venanzite-deep: #3a433e;
  --colline-base: #7a9458;
  --narciso-base: #f0c84e;
  --glicine-base: #9d8ec9;
  --page-cream: #f6f0e6;
  --page-paper: #faf5eb;
  --text-primary: #2a2e2b;
  --text-secondary: #5d5a52;
}

.door-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
}

.door-card {
  overflow: hidden;
  border: 1px solid rgba(58, 67, 62, 0.12);
  border-radius: 28px;
  background: rgba(250, 245, 235, 0.94);
  box-shadow: 0 24px 60px rgba(39, 31, 24, 0.12);
}

.door-card-image {
  display: block;
  width: 100%;
  height: 20rem;
  object-fit: cover;
}
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm exec vitest run tests/components/public/home-sections.test.tsx tests/lib/public-pages.test.ts`

Expected: PASS with `5 passed`

- [ ] **Step 7: Commit**

```bash
git add public/images/editorial components/public/HomeHero.tsx components/public/DoorGrid.tsx components/public/ProofSection.tsx components/public/EventsPreview.tsx app/[lang]/page.tsx lib/public-content.ts styles/globals.css tests/components/public/home-sections.test.tsx
git commit -m "feat: build editorial homepage foundation"
```

### Task 4: Add Parent Pages And Align Navigation

**Files:**
- Create: `components/public/EditorialPageHero.tsx`
- Create: `components/public/EditorialFactList.tsx`
- Create: `app/[lang]/dimora/page.tsx`
- Create: `app/[lang]/esperienze/page.tsx`
- Create: `app/[lang]/territorio/page.tsx`
- Create: `app/[lang]/racconti/page.tsx`
- Modify: `components/public/SiteHeader.tsx`
- Modify: `components/public/SiteFooter.tsx`
- Modify: `app/layout.tsx`
- Modify: `lib/public-content.ts`
- Create: `tests/components/public/site-navigation.test.tsx`

- [ ] **Step 1: Write the failing navigation test**

```tsx
// tests/components/public/site-navigation.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SiteHeader } from '@/components/public/SiteHeader'

describe('site header navigation', () => {
  it('exposes the editorial parent pages in Italian', () => {
    render(<SiteHeader currentPathname="/it" locale="it" />)

    expect(screen.getByRole('link', { name: 'La Dimora' })).toHaveAttribute('href', '/it/dimora')
    expect(screen.getByRole('link', { name: 'Esperienze' })).toHaveAttribute('href', '/it/esperienze')
    expect(screen.getByRole('link', { name: 'Territorio' })).toHaveAttribute('href', '/it/territorio')
    expect(screen.getByRole('link', { name: 'Racconti' })).toHaveAttribute('href', '/it/racconti')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm exec vitest run tests/components/public/site-navigation.test.tsx`

Expected: FAIL because the current header only exposes `Home`, `Blog`, and `Contatti`

- [ ] **Step 3: Implement the shared page hero and the four parent pages**

```tsx
// components/public/EditorialPageHero.tsx
type EditorialPageHeroProps = {
  body: string
  eyebrow: string
  imageAlt: string
  imageSrc: string
  title: string
}

export function EditorialPageHero({
  body,
  eyebrow,
  imageAlt,
  imageSrc,
  title,
}: EditorialPageHeroProps) {
  return (
    <section className="editorial-page-hero">
      <img alt={imageAlt} className="editorial-page-hero-image" src={imageSrc} />
      <div className="editorial-page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{body}</p>
      </div>
    </section>
  )
}
```

```tsx
// app/[lang]/dimora/page.tsx
import { notFound } from 'next/navigation'

import { EditorialFactList } from '@/components/public/EditorialFactList'
import { EditorialPageHero } from '@/components/public/EditorialPageHero'
import { isSupportedLocale } from '@/lib/i18n'
import { publicContent } from '@/lib/public-content'

export default async function DimoraPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) notFound()

  const copy = publicContent[lang].dimora

  return (
    <main className="page-shell" id="main-content">
      <EditorialPageHero {...copy.hero} />
      <EditorialFactList items={copy.facts} title={copy.factsTitle} />
    </main>
  )
}
```

```tsx
// app/[lang]/racconti/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { EditorialPageHero } from '@/components/public/EditorialPageHero'
import { isSupportedLocale } from '@/lib/i18n'
import { publicContent } from '@/lib/public-content'
import { getPublicHref } from '@/lib/public-pages'

export default async function RaccontiPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) notFound()

  const copy = publicContent[lang].stories

  return (
    <main className="page-shell" id="main-content">
      <EditorialPageHero {...copy.hero} />
      <section className="cta-band">
        <div className="cta-band-copy">
          <p className="section-eyebrow">{copy.blogBridge.eyebrow}</p>
          <h2>{copy.blogBridge.title}</h2>
          <p>{copy.blogBridge.body}</p>
        </div>
        <Link className="primary-link" href={getPublicHref('blog', lang)}>
          {copy.blogBridge.primaryLabel}
        </Link>
      </section>
    </main>
  )
}
```

- [ ] **Step 4: Update header, footer, and root metadata**

```tsx
// components/public/SiteHeader.tsx
      <nav className="site-nav" aria-label={copy.navigationLabel}>
        {copy.navigation.map((item) => (
          <Link className="site-nav-link" href={getPublicHref(item.href, locale)} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>
```

```ts
// app/layout.tsx
export const metadata: Metadata = {
  title: 'La Badia',
  description: 'Dimora rurale a San Venanzo tra soggiorno, paesaggio, racconti ed esperienze.',
}
```

- [ ] **Step 5: Run the tests and a production build**

Run: `npm exec vitest run tests/components/public/site-navigation.test.tsx tests/components/public/home-sections.test.tsx tests/lib/public-pages.test.ts`

Expected: PASS with all tests green

Run: `npm run build`

Expected: Next.js production build succeeds without route or type errors

- [ ] **Step 6: Commit**

```bash
git add components/public/EditorialPageHero.tsx components/public/EditorialFactList.tsx components/public/SiteHeader.tsx components/public/SiteFooter.tsx app/[lang]/dimora/page.tsx app/[lang]/esperienze/page.tsx app/[lang]/territorio/page.tsx app/[lang]/racconti/page.tsx app/layout.tsx lib/public-content.ts tests/components/public/site-navigation.test.tsx
git commit -m "feat: add editorial parent pages and navigation"
```

## Self-Review

### Spec coverage

- `M1` content and asset inventory: covered by Task 1
- route architecture for parent pages: covered by Task 2 and Task 4
- editorial homepage with two doors, proof, and events preview: covered by Task 3
- navigation and public structure alignment: covered by Task 4
- named editorial token system: covered by Task 3

### Placeholder scan

No `TBD`, `TODO`, or undefined “later” steps remain in the task bodies.

### Type consistency

The plan uses one consistent route vocabulary:

- `dimora`
- `experiences`
- `territory`
- `stories`
- `blog`
- `contact`

The corresponding localized slugs remain:

- `/dimora`
- `/esperienze`
- `/territorio`
- `/racconti`
- `/blog`
- `/contatti`

## Handoff

This plan is intentionally limited to the first implementation slice of `M1`. After this ships, write a follow-up plan for:

- richer asset coverage for interior/event photography
- structured events management in CMS
- M2 operational workflow
