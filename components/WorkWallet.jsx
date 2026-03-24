"use client"

import { useEffect, useRef, useState } from 'react'
import WorkCard from './WorkCard'

export default function WorkWallet({ cards }) {
  const [active, setActive] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const total = cards.length
  const nextIndex = (active + 1) % total
  const nextCard = cards[nextIndex]
  const dragStartX = useRef(null)
  const dragged = useRef(false)
  const suppressClickRef = useRef(false)
  const autoplayRef = useRef(null)
  const wheelLockRef = useRef(false)

  const goNext = () => setActive((prev) => (prev + 1) % total)
  const goPrev = () => setActive((prev) => (prev - 1 + total) % total)

  useEffect(() => {
    if (total <= 1 || isDragging || isHovered) return

    autoplayRef.current = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total)
    }, 2500)

    return () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
    }
  }, [total, isDragging, isHovered])

  const resetDrag = () => {
    dragStartX.current = null
    dragged.current = false
    setIsDragging(false)
  }

  const onPointerDown = (event) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return

    dragStartX.current = event.clientX
    dragged.current = false
    setIsDragging(true)
  }

  const onPointerMove = (event) => {
    if (dragStartX.current === null) return

    const delta = event.clientX - dragStartX.current
    if (Math.abs(delta) > 8) dragged.current = true
  }

  const onPointerUp = (event) => {
    if (dragStartX.current === null) return

    const delta = event.clientX - dragStartX.current

    if (Math.abs(delta) > 45) {
      suppressClickRef.current = true
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 280)
      if (delta < 0) goNext()
      if (delta > 0) goPrev()
    }

    resetDrag()
  }

  const onPointerCancel = () => {
    resetDrag()
  }

  const onClickCapture = (event) => {
    if (!suppressClickRef.current) return

    event.preventDefault()
    event.stopPropagation()
    suppressClickRef.current = false
  }

  const onWheel = (event) => {
    if (wheelLockRef.current) return

    const absX = Math.abs(event.deltaX)
    const absY = Math.abs(event.deltaY)
    const dominantX = absX > absY * 1.15
    const dominantY = absY > absX * 1.15

    if (!dominantX && !dominantY) return

    const delta = dominantX ? event.deltaX : event.deltaY
    if (Math.abs(delta) < 18) return

    event.preventDefault()
    wheelLockRef.current = true

    if (delta > 0) goNext()
    if (delta < 0) goPrev()

    window.setTimeout(() => {
      wheelLockRef.current = false
    }, 360)
  }

  if (total === 0) return null

  return (
    <div className="wallet-wrap">
      <div className="wallet-head">
        <p className="wallet-caption">Recent first</p>
        <p className="wallet-counter">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
      </div>

      <div
        className={`wallet-stage ${isDragging ? 'wallet-stage-dragging' : ''}`.trim()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
        onWheel={onWheel}
      >
        <div className="wallet-peek-layer" aria-hidden="true">
          <WorkCard
            {...nextCard}
            key={`peek-${nextCard.slug}-${active}`}
            className="wallet-card wallet-card-peek"
            isDisabled
            ariaHidden
          />
        </div>
        <div className="wallet-track" style={{ transform: `translate3d(${-active * 100}%, 0, 0)` }}>
          {cards.map((card, index) => (
            <div key={card.slug} className="wallet-slide" aria-hidden={active !== index || undefined}>
              <WorkCard
                {...card}
                className="wallet-card"
                isDisabled={active !== index}
                ariaHidden={active !== index}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="wallet-controls">
        <button type="button" className="wallet-btn" onClick={goPrev} aria-label="Show previous project">
          Previous
        </button>
        <button type="button" className="wallet-btn wallet-btn-accent" onClick={goNext} aria-label="Show next project">
          Next
        </button>
      </div>
    </div>
  )
}
