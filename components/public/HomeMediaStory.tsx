import type { HomeMediaStoryCopy } from '@/lib/public-content'

type HomeMediaStoryProps = {
  reversed?: boolean
  story: HomeMediaStoryCopy
}

export function HomeMediaStory({ reversed = false, story }: HomeMediaStoryProps) {
  return (
    <section
      className={reversed ? 'home-media-story home-media-story-reversed' : 'home-media-story'}
      data-home-section={story.id}
    >
      <div className="home-media-story-shell">
        <figure className="home-media-story-figure">
          <img alt={story.imageAlt} className="home-media-story-image" src={story.imageSrc} />
          <figcaption className="editorial-photo-caption">
            <span className="editorial-photo-label">{story.imageLabel}</span>
            <span className="editorial-photo-text">{story.imageCaption}</span>
          </figcaption>
        </figure>

        <div className="home-media-story-copy">
          <p className="section-eyebrow">{story.eyebrow}</p>
          <h2>{story.title}</h2>
          <p>{story.body}</p>
        </div>
      </div>
    </section>
  )
}
