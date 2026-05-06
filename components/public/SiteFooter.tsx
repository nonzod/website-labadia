import Link from 'next/link'

import type { AppLocale } from '@/lib/i18n'

import { publicContent } from '@/lib/public-content'
import { getPublicHref } from '@/lib/public-pages'

type SiteFooterProps = {
  isHomepage?: boolean
  locale: AppLocale
}

export function SiteFooter({ isHomepage = false, locale }: SiteFooterProps) {
  const copy = publicContent[locale].footer

  return (
    <footer className={isHomepage ? 'site-footer site-footer-home' : 'site-footer'}>
      <div className="site-footer-shell">
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
      </div>
    </footer>
  )
}
