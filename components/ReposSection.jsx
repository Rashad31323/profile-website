import { PROFILE } from '@/lib/data'
import GitHubRepos from './GitHubRepos'

export default function ReposSection() {
  return (
    <section id="repos" className="repos-section">
      <h2 className="section-head">GitHub repositories</h2>
      <p className="repos-intro">
        All public repos from{' '}
        <a href={PROFILE.githubRepos} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
          github.com/ahmadrashad1
        </a>
      </p>
      <GitHubRepos />
    </section>
  )
}
