export default function WorkCard({
  title,
  subtitle,
  slug,
  href,
  gradient,
  accent,
  tags,
  className = '',
  isDisabled = false,
  ariaHidden = false,
}) {
  const targetHref = href || `#${slug}`
  const isExternal = Boolean(href)

  return (
    <a
      href={targetHref}
      className={`work-card ${className}`.trim()}
      style={{ '--card-accent': accent }}
      draggable={false}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      tabIndex={isDisabled ? -1 : undefined}
      aria-hidden={ariaHidden || undefined}
    >
      <div className="work-card-bg" style={{ background: gradient }} />
      <div className="work-card-noise" />
      <div className="work-card-content">
        <div className="work-card-tags">
          {tags?.map((tag, i) => (
            <span key={i} className="work-card-tag" style={{ borderColor: accent, color: accent }}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className="work-card-title">{title}</h3>
        <p className="work-card-subtitle">{subtitle}</p>
        <p className="work-card-tech">
          Tech stack: {tags?.length ? tags.join(' | ') : 'General software development'}
        </p>
        <span className="work-card-arrow" style={{ color: accent }}>→</span>
      </div>
    </a>
  )
}
