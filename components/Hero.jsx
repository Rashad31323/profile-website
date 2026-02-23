import { PROFILE } from '@/lib/data'

export default function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title">{PROFILE.name}</h1>
      <p className="hero-tagline">{PROFILE.tagline}</p>
      <div className="hero-buttons">
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-accent">GitHub</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn">LinkedIn</a>
      </div>
    </section>
  )
}
