import type { EditorialPageHeroCopy } from '@/lib/public-content'

export function EditorialPageHero({
  body,
  eyebrow,
  imageAlt,
  imageSrc,
  title,
}: EditorialPageHeroCopy) {
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
