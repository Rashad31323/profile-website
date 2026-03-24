'use client'

import { useState, useEffect } from 'react'

export default function TypewriterText({ text, speed = 80, as: Tag = 'span', className = '' }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (displayed.length >= text.length) {
      setDone(true)
      return
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [displayed, text, speed])

  return (
    <Tag className={className}>
      {displayed}
      {!done && <span className="typewriter-cursor" aria-hidden="true">|</span>}
    </Tag>
  )
}
