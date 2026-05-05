import type { HomeProofSection } from '@/lib/public-content'

type ProofSectionProps = {
  section: HomeProofSection
}

export function ProofSection({ section }: ProofSectionProps) {
  return (
    <section className="proof-section">
      <div className="section-heading">
        <p className="section-eyebrow">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        <p className="section-body">{section.body}</p>
      </div>

      <div className="detail-grid">
        {section.items.map(({ quote, source }) => (
          <article className="detail-card" key={`${quote}-${source}`}>
            <p>{quote}</p>
            <p className="section-eyebrow">{source}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
