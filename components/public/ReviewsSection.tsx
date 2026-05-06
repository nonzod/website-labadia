import type { HomeProofSection } from '@/lib/public-content'

type ReviewsSectionProps = {
  meta: string[]
  section: HomeProofSection
}

export function ReviewsSection({ meta, section }: ReviewsSectionProps) {
  return (
    <section className="reviews-section" data-home-section="reviews">
      <div className="reviews-section-shell">
        <div className="reviews-section-heading">
          <div className="section-heading">
            <p className="section-eyebrow">{section.eyebrow}</p>
            <h2>{section.title}</h2>
            <p className="section-body">{section.body}</p>
          </div>

          <div className="reviews-meta" aria-label="Review platforms">
            {meta.map((item, index) => (
              <p className={index === meta.length - 1 ? 'reviews-meta-accent' : undefined} key={item}>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="reviews-grid">
          {section.items.map(({ quote, source }) => (
            <article className="review-card" key={`${quote}-${source}`}>
              <span className="review-mark" aria-hidden="true">
                "
              </span>
              <p className="review-quote">{quote}</p>
              <div className="review-footer">
                <p className="review-source">{source}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
