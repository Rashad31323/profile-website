import { WORK } from '@/lib/data'
import WorkCard from './WorkCard'

export default function WorkSection() {
  return (
    <section id="work" className="work-section">
      <h2 className="section-head">Work</h2>
      <div className="work-grid">
        {WORK.map((item) => (
          <WorkCard key={item.slug} {...item} />
        ))}
      </div>
    </section>
  )
}
