import WorkWallet from './WorkWallet'

const USERNAME = 'ahmadrashad1'
const STARRED_API = `https://api.github.com/users/${USERNAME}/starred?per_page=100`

const CARD_THEMES = [
  {
    gradient: 'linear-gradient(135deg, #0f766e 0%, #134e4a 50%, #0a0a0a 100%)',
    accent: '#14b8a6',
  },
  {
    gradient: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #0a0a0a 100%)',
    accent: '#3b82f6',
  },
  {
    gradient: 'linear-gradient(135deg, #b45309 0%, #92400e 50%, #0a0a0a 100%)',
    accent: '#f59e0b',
  },
  {
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #0a0a0a 100%)',
    accent: '#a78bfa',
  },
  {
    gradient: 'linear-gradient(135deg, #be185d 0%, #9d174d 50%, #0a0a0a 100%)',
    accent: '#ec4899',
  },
  {
    gradient: 'linear-gradient(135deg, #374151 0%, #1f2937 50%, #0a0a0a 100%)',
    accent: '#9ca3af',
  },
]

const TECH_HINTS = [
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Spring Boot',
  'MySQL',
  'MongoDB',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'Firebase',
  'Redis',
  'Tailwind',
  'WebSockets',
  'GraphQL',
  'REST API',
  'RAG',
  'LLM',
]

const PROJECT_TECH_OVERRIDES = {
  safayipak: ['MongoDB', 'Express', 'React', 'Node'],
  sportsync: ['Spring Boot', 'React', 'MySQL', 'Agile'],
  'vehicle-tracking-system': ['React', 'Spring Boot', 'Docker', 'WebSockets'],
  'text-to-icon-generator': ['Diffusion', 'LoRA', 'DreamBooth', 'Python'],
  'multimodal-rag': ['Transformers', 'RAG', 'Vision', 'LLM'],
  'academic-research': ['ML', 'C++', 'Research', 'Algorithms'],
  'devops-automation': ['TypeScript', 'Docker', 'CI/CD', 'GitHub Actions'],
  'sda-project': ['Java', 'OOP', 'Algorithms', 'Data Structures'],
}

function normalizeKey(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function formatRepoSubtitle(repo) {
  const parts = []

  if (repo.language) parts.push(repo.language)
  if (repo.stargazers_count > 0) parts.push(`Stars ${repo.stargazers_count}`)
  if (repo.forks_count > 0) parts.push(`Forks ${repo.forks_count}`)

  if (parts.length > 0) return parts.join(' | ')
  return repo.description || 'Open-source project'
}

function toTags(repo) {
  const repoKey = normalizeKey(repo?.name)
  const override = PROJECT_TECH_OVERRIDES[repoKey]
  if (override?.length) return override

  const topicTags = Array.isArray(repo.topics) ? repo.topics : []
  const normalizedTopics = topicTags
    .filter(Boolean)
    .map((tag) => String(tag).replace(/[-_]/g, ' ').trim())

  const text = `${repo?.name || ''} ${repo?.description || ''} ${normalizedTopics.join(' ')}`.toLowerCase()
  const inferred = TECH_HINTS.filter((tech) => text.includes(tech.toLowerCase()))

  const combined = [repo.language, ...normalizedTopics, ...inferred]
    .filter(Boolean)
    .map((tag) => String(tag).trim())

  const unique = [...new Set(combined)]
  const tags = unique.slice(0, 5)

  return tags.length > 0 ? tags : ['Open Source', 'Repository', 'GitHub']
}

async function getOwnStarredRepos() {
  try {
    const response = await fetch(STARRED_API, {
      next: { revalidate: 3600 },
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })

    if (!response.ok) return []

    const data = await response.json()
    if (!Array.isArray(data)) return []

    return data
      .filter((repo) => repo?.owner?.login?.toLowerCase() === USERNAME)
      .sort((a, b) => {
        const aUpdated = Date.parse(a?.updated_at || a?.pushed_at || 0)
        const bUpdated = Date.parse(b?.updated_at || b?.pushed_at || 0)
        return bUpdated - aUpdated
      })
  } catch {
    return []
  }
}

export default async function WorkSection() {
  const repos = await getOwnStarredRepos()
  const cards = repos.map((repo, index) => ({
    title: repo.name,
    subtitle: formatRepoSubtitle(repo),
    slug: repo.name.toLowerCase(),
    href: repo.html_url,
    tags: toTags(repo),
    ...CARD_THEMES[index % CARD_THEMES.length],
  }))

  return (
    <section id="work" className="work-section">
      <h2 className="section-head">Work</h2>
      <WorkWallet cards={cards} />
      {cards.length === 0 && (
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          No starred repositories owned by {USERNAME} were found yet.
        </p>
      )}
    </section>
  )
}
