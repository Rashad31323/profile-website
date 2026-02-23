import { PROFILE } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        {PROFILE.name} · {PROFILE.email} ·{' '}
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>GitHub</a>
        {' · '}
        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>LinkedIn</a>
      </p>
    </footer>
  )
}
