import { PROFILE } from '@/lib/data'

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <p className="contact-tagline">lets build together</p>
      <h2 className="section-head">Contact Me</h2>
      <p className="contact-text">
        Have an idea, product, or research project in mind? Reach out and we can make it real.
      </p>
      <div className="contact-actions">
        <a href={`mailto:${PROFILE.email}`} className="btn btn-accent">
          Email Me
        </a>
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
          LinkedIn
        </a>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn">
          GitHub
        </a>
      </div>
    </section>
  )
}
