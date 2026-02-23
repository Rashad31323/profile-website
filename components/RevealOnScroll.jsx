'use client'

import { useEffect, useRef, useState } from 'react'

export default function RevealOnScroll({ children, direction = 'up', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const dirClass =
    direction === 'left'
      ? 'reveal-left'
      : direction === 'right'
      ? 'reveal-right'
      : direction === 'down'
      ? 'reveal-down'
      : 'reveal-up'

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined

  return (
    <div
      ref={ref}
      className={`reveal ${dirClass} ${visible ? 'reveal-visible' : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}

