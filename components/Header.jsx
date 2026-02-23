import Link from 'next/link'
import { PROFILE } from '@/lib/data'

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="header-logo">Ahmad Rashad</Link>
      <nav className="header-nav">
        <a href="#work">Work</a>
        <a href="#looking">About</a>
        <a href="#repos">Repos</a>
      </nav>
    </header>
  )
}
