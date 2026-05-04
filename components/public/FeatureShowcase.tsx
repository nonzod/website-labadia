type FeatureShowcaseProps = {
  body: string
  eyebrow: string
  items: string[]
  mediaBody: string
  mediaKicker: string
  mediaTitle: string
  reversed?: boolean
  title: string
}

export function FeatureShowcase({
  body,
  eyebrow,
  items,
  mediaBody,
  mediaKicker,
  mediaTitle,
  reversed = false,
  title,
}: FeatureShowcaseProps) {
  return (
    <section className={reversed ? 'feature-showcase feature-showcase-reversed' : 'feature-showcase'}>
      <div className="feature-copy">
        <p className="section-eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{body}</p>
        <ul className="feature-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="feature-media" aria-hidden="true">
        <span className="feature-media-kicker">{mediaKicker}</span>
        <strong>{mediaTitle}</strong>
        <p>{mediaBody}</p>
      </div>
    </section>
  )
}
