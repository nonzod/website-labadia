type SectionHeadingProps = {
  body: string
  eyebrow: string
  title: string
}

export function SectionHeading({ body, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-body">{body}</p>
    </div>
  )
}
