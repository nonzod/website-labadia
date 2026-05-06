import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import { submitContactLeadAction } from '@/app/[lang]/contatti/actions'
import { ContactInquiryForm } from '@/components/public/ContactInquiryForm'
import { SectionHeading } from '@/components/public/SectionHeading'
import { isSupportedLocale } from '@/lib/i18n'
import { publicContent } from '@/lib/public-content'
import { getPublicHref } from '@/lib/public-pages'
import { siteConfig } from '@/lib/site'

type ContactPageProps = {
  params: Promise<{
    lang: string
  }>
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { lang } = await params
  const locale = isSupportedLocale(lang) ? lang : 'it'
  const copy = publicContent[locale].contact

  return {
    description: copy.hero.body,
    title: `${copy.hero.eyebrow} | ${siteConfig.projectName}`,
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) {
    notFound()
  }

  const copy = publicContent[lang].contact

  return (
    <main className="page-shell" id="main-content">
      <section className="contact-hero">
        <div className="hero-card">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p className="lead">{copy.hero.body}</p>

          <div className="cta-row">
            <Link className="primary-link" href={getPublicHref('home', lang)}>
              {copy.hero.primaryLabel}
            </Link>
            <a className="secondary-link" href="#contact-areas">
              {copy.hero.secondaryLabel}
            </a>
          </div>
        </div>

        <ContactInquiryForm action={submitContactLeadAction.bind(null, lang)} copy={copy.form} />
      </section>

      <section className="content-stack" id="contact-areas">
        <SectionHeading
          body={copy.hero.body}
          eyebrow={copy.cardsLabel}
          title={copy.process.title}
        />

        <div className="detail-grid" aria-label={copy.cardsLabel}>
          {copy.cards.map((card) => (
            <article className="detail-card" key={card.title}>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </article>
          ))}
        </div>

        <section className="process-panel">
          <p className="section-eyebrow">{copy.process.eyebrow}</p>
          <ul className="process-list">
            {copy.process.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  )
}
