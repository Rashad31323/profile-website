import { MARQUEE_TAGS } from '@/lib/data'

export default function Marquee({ id, className = '' }) {
  return (
    <div id={id} className={`marquee-wrap ${className}`.trim()}>
      <div className="marquee">
        {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
    </div>
  )
}
