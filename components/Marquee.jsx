import { MARQUEE_TAGS } from '@/lib/data'

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee">
        {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
    </div>
  )
}
