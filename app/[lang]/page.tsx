import Link from 'next/link'
import { notFound } from 'next/navigation'

import { isSupportedLocale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site'

const foundations = {
  en: [
    'App Router with an explicit locale segment',
    'Shared locale utilities for fallback and language switching',
    'Payload CMS ready for localized fields in a single document',
    'Public frontend and admin kept separate within the same runtime',
  ],
  it: [
    'App Router con segmento lingua esplicito',
    'Utility condivise per fallback e cambio lingua',
    'Payload CMS predisposto a campi localizzati nello stesso documento',
    'Frontend pubblico e admin separati nello stesso runtime',
  ],
} as const

const pageCopy = {
  en: {
    ctaPrimary: 'Open admin',
    ctaSecondary: 'Payload documentation',
    eyebrow: 'La Badia',
    fallback: 'Primary locale: Italian. Explicit fallback for localized content: Italian when English is missing.',
    heading: 'Bilingual routing is now the baseline for the public website.',
    lead: 'The application now exposes locale-aware URLs, shared resolution helpers and a CMS configuration aligned with a single-record IT/EN content model.',
    statusLabel: 'Available foundations',
  },
  it: {
    ctaPrimary: 'Apri admin',
    ctaSecondary: 'Documentazione Payload',
    eyebrow: 'La Badia',
    fallback: 'Lingua primaria: italiano. Fallback esplicito per i contenuti localizzati: italiano quando manca la versione inglese.',
    heading: 'Il routing bilingue e ora la baseline del sito pubblico.',
    lead: 'L applicazione espone URL locale-aware, utility condivise di risoluzione e una configurazione CMS allineata a un modello contenuti IT/EN su record unico.',
    statusLabel: 'Fondamenta disponibili',
  },
} as const

type LocalePageProps = {
  params: Promise<{
    lang: string
  }>
}

export default async function HomePage({ params }: LocalePageProps) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) {
    notFound()
  }

  const copy = pageCopy[lang]

  return (
    <main className="landing-shell">
      <section className="hero-card">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.heading}</h1>
        <p className="lead">{copy.lead}</p>

        <div className="cta-row">
          <Link className="primary-link" href={siteConfig.adminPath}>
            {copy.ctaPrimary}
          </Link>
          <a
            className="secondary-link"
            href="https://payloadcms.com/docs/getting-started/installation"
            rel="noreferrer"
            target="_blank"
          >
            {copy.ctaSecondary}
          </a>
        </div>

        <p className="locale-note">{copy.fallback}</p>
      </section>

      <section className="status-grid" aria-label={copy.statusLabel}>
        {foundations[lang].map((item) => (
          <article className="status-card" key={item}>
            <span className="status-dot" aria-hidden="true" />
            <p>{item}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
