import Link from 'next/link'

import type { AppLocale } from '@/lib/i18n'

import { getPublicHref, publicContent } from '@/lib/public-content'

type SiteFooterProps = {
  locale: AppLocale
}

export function SiteFooter({ locale }: SiteFooterProps) {
  const copy = publicContent[locale].footer

  return (
    <footer className="site-footer">
      <div>
        <p className="section-eyebrow">La Badia</p>
        <h2>{copy.title}</h2>
      </div>

      <div className="site-footer-meta">
        <p>{copy.note}</p>

        <nav className="site-footer-nav" aria-label={copy.navigationLabel}>
          {copy.links.map((item) => (
            <Link href={getPublicHref(item.href, locale)} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
