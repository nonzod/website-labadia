import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import { isSupportedLocale } from '@/lib/i18n'
import { publicContent } from '@/lib/public-content'
import { getPublicHref } from '@/lib/public-pages'
import { siteConfig } from '@/lib/site'

type ContactConfirmationPageProps = {
  params: Promise<{
    lang: string
  }>
}

export async function generateMetadata({
  params,
}: ContactConfirmationPageProps): Promise<Metadata> {
  const { lang } = await params
  const locale = isSupportedLocale(lang) ? lang : 'it'
  const copy = publicContent[locale].contact.confirmation

  return {
    description: copy.body,
    title: `${copy.eyebrow} | ${siteConfig.projectName}`,
  }
}

export default async function ContactConfirmationPage({ params }: ContactConfirmationPageProps) {
  const { lang } = await params

  if (!isSupportedLocale(lang)) {
    notFound()
  }

  const copy = publicContent[lang].contact.confirmation

  return (
    <main className="page-shell" id="main-content">
      <section className="contact-confirmation">
        <div className="hero-card confirmation-card">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="lead">{copy.body}</p>

          <div className="cta-row">
            <Link className="primary-link" href={getPublicHref('home', lang)}>
              {copy.primaryLabel}
            </Link>
            <Link className="secondary-link" href={getPublicHref('contact', lang)}>
              {copy.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
