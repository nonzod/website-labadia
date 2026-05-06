type HomeIntroStripProps = {
  body: string
  eyebrow: string
  title: string
}

export function HomeIntroStrip({ body, eyebrow, title }: HomeIntroStripProps) {
  return (
    <section className="home-intro-strip" data-home-section="intro">
      <div className="home-intro-strip-shell">
        <div className="home-intro-strip-grid">
          <p className="section-eyebrow">{eyebrow}</p>

          <div className="home-intro-strip-copy">
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
