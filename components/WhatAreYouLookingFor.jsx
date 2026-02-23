import { PROFILE } from '@/lib/data'

export default function WhatAreYouLookingFor() {
  return (
    <section id="looking" className="looking-section">
      <h2 className="section-head">What are you looking for?</h2>

      <div className="block">
        <h3 className="block-title">About me</h3>
        <p className="block-text">{PROFILE.about}</p>
      </div>

      <div className="block">
        <h3 className="block-title">My expertise</h3>
        <ul className="block-list">
          {PROFILE.expertise.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="block">
        <h3 className="block-title">GitHub</h3>
        <p className="block-text">
          All my code and projects live on GitHub. Browse repositories, clone, or contribute.
        </p>
        <a
          href={PROFILE.githubRepos}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent"
          style={{ marginTop: '0.75rem' }}
        >
          View all repositories →
        </a>
      </div>
    </section>
  )
}
