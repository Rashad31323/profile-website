export default function WorkCard({ title, subtitle, slug, gradient, accent, tags }) {
  return (
    <a href={`#${slug}`} className="work-card">
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
        <span className="work-card-arrow" style={{ color: accent }}>→</span>
      </div>
    </a>
  )
}
