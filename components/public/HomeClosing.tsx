import Link from 'next/link'

type HomeClosingProps = {
  body: string
  eyebrow: string
  imageAlt: string
  imageCaption: string
  imageLabel: string
  imageSrc: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
  title: string
}

export function HomeClosing({
  body,
  eyebrow,
  imageAlt,
  imageCaption,
  imageLabel,
  imageSrc,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  title,
}: HomeClosingProps) {
  return (
    <section className="home-closing" data-home-section="closing">
      <img alt={imageAlt} className="home-closing-image" src={imageSrc} />
      <div className="home-closing-overlay" />

      <div className="home-closing-shell">
        <div className="home-closing-copy">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{body}</p>

          <div className="cta-row">
            <Link className="primary-link" href={primaryHref}>
              {primaryLabel}
            </Link>
            <Link className="secondary-link" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          </div>

          <p className="editorial-photo-note">
            <span className="editorial-photo-label">{imageLabel}</span>
            <span className="editorial-photo-text">{imageCaption}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
