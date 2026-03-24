"use client"

import { useEffect, useRef } from 'react'
import { PROFILE } from '@/lib/data'
import TypewriterText from './TypewriterText'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const node = heroRef.current
    if (!node) return

    let frame = null

    const updateProgress = () => {
      const progress = Math.max(0, Math.min(window.scrollY / window.innerHeight, 1))
      const value = progress.toFixed(3)
      node.style.setProperty('--hero-progress', value)
      document.documentElement.style.setProperty('--page-hero-progress', value)
      frame = null
    }

    const onScroll = () => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) window.cancelAnimationFrame(frame)
      document.documentElement.style.removeProperty('--page-hero-progress')
    }
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-waves" aria-hidden="true" />
      <div className="hero-waves hero-waves-alt" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-a" aria-hidden="true" />
      <div className="hero-ambient hero-ambient-b" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-avatar-wrap">
          <img src="/my-pic.jpeg" alt="Ahmad Rashad" className="hero-avatar" loading="eager" />
        </div>
        <h1 className="hero-title">{PROFILE.name}</h1>
        <p className="hero-tagline">
          <TypewriterText text={PROFILE.tagline} speed={80} as="span" />
        </p>
        <div className="hero-buttons">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-accent">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn">LinkedIn</a>
        </div>
      </div>
      <a href="#after-hero" className="hero-scroll" aria-label="Scroll to next section">
        Scroll down
        <span className="hero-scroll-dot" aria-hidden="true" />
      </a>
    </section>
  )
}
