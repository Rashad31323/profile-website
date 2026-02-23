'use client'

import { useState, useEffect } from 'react'

const GITHUB_API = 'https://api.github.com/users/ahmadrashad1/repos?per_page=100&sort=updated'

export default function GitHubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(GITHUB_API)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch repos')
        return res.json()
      })
      .then((data) => {
        setRepos(Array.isArray(data) ? data : [])
        setError(null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="repo-grid" style={{ opacity: 0.7 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="repo-card" style={{ minHeight: 80 }} aria-hidden="true">
            <div style={{ height: 16, background: 'var(--border)', borderRadius: 4, width: '60%', marginBottom: 8 }} />
            <div style={{ height: 12, background: 'var(--border)', borderRadius: 4, width: '90%' }} />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
        Could not load repositories. View them on{' '}
        <a href="https://github.com/ahmadrashad1?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{ display: 'inline-flex', marginTop: '0.5rem' }}>
          GitHub →
        </a>
      </p>
    )
  }

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repo-card"
        >
          <h4>{repo.name}</h4>
          <p>{repo.description || 'No description'}</p>
          <span className="repo-meta">
            {repo.language && <span>{repo.language}</span>}
            {repo.language && repo.stargazers_count >= 0 && ' · '}
            ★ {repo.stargazers_count}
          </span>
        </a>
      ))}
    </div>
  )
}
