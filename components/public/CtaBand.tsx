import Link from 'next/link'

type CtaBandProps = {
  body: string
  eyebrow: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
  title: string
}

export function CtaBand({
  body,
  eyebrow,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  title,
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="cta-band-copy">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>

      <div className="cta-row">
        <Link className="primary-link" href={primaryHref}>
          {primaryLabel}
        </Link>
        <Link className="secondary-link" href={secondaryHref}>
          {secondaryLabel}
        </Link>
      </div>
    </section>
  )
}
