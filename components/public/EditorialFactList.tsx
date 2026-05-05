import type { EditorialFactItem } from '@/lib/public-content'

type EditorialFactListProps = {
  items: EditorialFactItem[]
  title: string
}

export function EditorialFactList({ items, title }: EditorialFactListProps) {
  return (
    <section aria-labelledby="editorial-facts-title" className="editorial-fact-list">
      <div className="section-heading">
        <p className="section-eyebrow">La Badia</p>
        <h2 id="editorial-facts-title">{title}</h2>
      </div>

      <div className="feature-grid">
        {items.map((item) => (
          <article className="feature-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
