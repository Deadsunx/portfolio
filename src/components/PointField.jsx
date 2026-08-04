import { useEffect, useRef } from 'react'
import { useMotionBudget } from '../lib/env.js'

/*
 * The embedding field.
 *
 * A point cloud that reorganises as the page scrolls — the same thing the
 * Netflix clustering project does, running as the site's background:
 *
 *   scatter  →  cluster  →  manifold  →  disperse
 *
 * Plain 2D canvas. No WebGL, no dependency. The whole engine is one rAF
 * loop that reads scroll position and lerps every point toward the target
 * for the current state.
 */

const CLUSTERS = [
  [0.2, 0.3],
  [0.74, 0.26],
  [0.32, 0.74],
  [0.8, 0.68],
]

/* Smooth the blend between states so transitions have no seam. */
const smooth = (t) => t * t * (3 - 2 * t)
const lerp = (a, b, t) => a + (b - a) * t

function makePoints(count) {
  const points = []
  for (let i = 0; i < count; i += 1) {
    const cluster = i % CLUSTERS.length
    const angle = Math.random() * Math.PI * 2
    const radius = Math.sqrt(Math.random()) * 0.1
    points.push({
      /* scatter */
      sx: Math.random(),
      sy: Math.random(),
      /* cluster */
      cx: CLUSTERS[cluster][0] + Math.cos(angle) * radius,
      cy: CLUSTERS[cluster][1] + Math.sin(angle) * radius * 0.85,
      /* manifold — a single traced curve across the frame */
      t: i / count,
      /* render + drift */
      x: 0,
      y: 0,
      seeded: false,
      phase: Math.random() * Math.PI * 2,
      speed: 0.25 + Math.random() * 0.4,
      size: Math.random() < 0.09 ? 2.1 : 1.15,
      accent: Math.random() < 0.09,
    })
  }
  return points
}

function targetFor(point, state) {
  /* state runs 0 → 3 across the document; blend the two it sits between */
  const lower = Math.min(Math.floor(state), 2)
  const frac = smooth(Math.min(Math.max(state - lower, 0), 1))

  const a = anchor(point, lower)
  const b = anchor(point, lower + 1)
  return [lerp(a[0], b[0], frac), lerp(a[1], b[1], frac)]
}

function anchor(point, state) {
  switch (state) {
    case 0: // scatter — undifferentiated noise
      return [point.sx, point.sy]
    case 1: // cluster — structure emerges
      return [point.cx, point.cy]
    case 2: // manifold — collapsed onto one curve
      return [0.06 + point.t * 0.88, 0.5 + Math.sin(point.t * Math.PI * 2.2) * 0.24]
    default: // disperse — pushed out of frame
      return [point.sx * 1.7 - 0.35, point.sy * 1.5 - 0.25]
  }
}

export default function PointField() {
  const canvasRef = useRef(null)
  const { reduced, coarse } = useMotionBudget()

  useEffect(() => {
    /* Reduced motion never mounts the engine at all. */
    if (reduced) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    const count = coarse ? 34 : 92
    const linkDistance = coarse ? 0.16 : 0.135
    const points = makePoints(count)

    let width = 0
    let height = 0
    let dpr = 1
    let frame = 0
    let running = true
    let start = performance.now()

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    /* Alpha buckets so the link mesh strokes in a handful of paths
       instead of one stroke() call per line. */
    const buckets = [0.06, 0.12, 0.2, 0.3]

    const draw = (now) => {
      if (!running) return
      const time = (now - start) / 1000

      const doc = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(window.scrollY / doc, 0), 1)
      const state = progress * 3

      /* Fade the whole field out as it disperses. */
      const fade = progress > 0.82 ? 1 - (progress - 0.82) / 0.18 : 1

      ctx.clearRect(0, 0, width, height)

      const scale = Math.min(width, height)
      const link = linkDistance * scale

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i]
        const [tx, ty] = targetFor(p, state)

        /* Organic wobble so a settled cluster never looks frozen. */
        const wobbleX = Math.sin(time * p.speed + p.phase) * 0.012
        const wobbleY = Math.cos(time * p.speed * 0.8 + p.phase) * 0.012

        const gx = (tx + wobbleX) * width
        const gy = (ty + wobbleY) * height

        if (!p.seeded) {
          p.x = gx
          p.y = gy
          p.seeded = true
        } else {
          /* Lerp toward the target — this is what makes scrolling feel
             like the cloud is thinking rather than snapping. */
          p.x += (gx - p.x) * 0.055
          p.y += (gy - p.y) * 0.055
        }
      }

      /* Links */
      for (let b = 0; b < buckets.length; b += 1) {
        ctx.beginPath()
        let drew = false
        const lo = b / buckets.length
        const hi = (b + 1) / buckets.length

        for (let i = 0; i < points.length; i += 1) {
          for (let j = i + 1; j < points.length; j += 1) {
            const dx = points[i].x - points[j].x
            const dy = points[i].y - points[j].y
            const dist = Math.hypot(dx, dy)
            if (dist >= link) continue
            const strength = 1 - dist / link
            if (strength < lo || strength >= hi) continue
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            drew = true
          }
        }

        if (drew) {
          ctx.strokeStyle = `rgba(143, 155, 239, ${buckets[b] * fade})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      /* Points — two fills, one per colour, instead of one per point. */
      for (const accent of [false, true]) {
        ctx.beginPath()
        for (let i = 0; i < points.length; i += 1) {
          const p = points[i]
          if (p.accent !== accent) continue
          ctx.moveTo(p.x + p.size, p.y)
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        }
        ctx.fillStyle = accent
          ? `rgba(217, 164, 65, ${0.85 * fade})`
          : `rgba(190, 200, 255, ${0.5 * fade})`
        ctx.fill()
      }

      frame = requestAnimationFrame(draw)
    }

    frame = requestAnimationFrame(draw)

    /* Stop burning frames when the field scrolls out of view. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true
          start = performance.now()
          frame = requestAnimationFrame(draw)
        } else if (!entry.isIntersecting) {
          running = false
          cancelAnimationFrame(frame)
        }
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(frame)
      } else if (!running) {
        running = true
        start = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, coarse])

  /* Reduced motion gets the atmosphere without the engine. */
  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-depth="3"
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 1 }}
    />
  )
}
