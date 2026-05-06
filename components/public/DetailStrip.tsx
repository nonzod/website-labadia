import type { HomeDetailItem } from '@/lib/public-content'

type DetailStripProps = {
  items: HomeDetailItem[]
}

export function DetailStrip({ items }: DetailStripProps) {
  return (
    <section className="detail-strip" data-home-section="details">
      <div className="detail-strip-shell">
        <div className="detail-strip-grid">
          {items.map((item) => (
            <article className="detail-strip-item" key={`${item.value}-${item.label}`}>
              <p className="detail-strip-value">
                {item.value}
                <span>{item.unit}</span>
              </p>
              <p className="detail-strip-label">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
