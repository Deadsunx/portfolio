import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMotionBudget } from '../lib/env.js'

/*
 * Depth contract — every visual element in the site passes through here
 * with an explicit level, so nothing ships unlayered.
 *
 *   0  far background   most travel, blurred     (aria-hidden)
 *   1  glow/atmosphere  heavy travel, soft       (aria-hidden)
 *   2  mid decoration   moderate travel
 *   3  main objects     slight travel
 *   4  text / UI        locked to the page
 *   5  foreground FX    travels against the page (aria-hidden)
 */
const TRAVEL = [140, 100, 60, 20, 0, -40]
/* Deep layers are oversized so their parallax travel never exposes an edge. */
const SCALE = [1.18, 1.1, 1.02, 1, 1, 1]

export default function Depth({
  level = 4,
  children,
  className = '',
  as = 'div',
  scrollRef,
  ...rest
}) {
  const localRef = useRef(null)
  const target = scrollRef ?? localRef
  const { parallax } = useMotionBudget()

  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  })

  const amplitude = TRAVEL[level] ?? 0
  const scale = SCALE[level] ?? 1
  const y = useTransform(scrollYProgress, [0, 1], [amplitude, -amplitude])

  const Component = motion[as] ?? motion.div
  const decorative = level === 0 || level === 1 || level === 5

  const style = {}
  if (scale !== 1) style.scale = scale
  if (parallax && amplitude !== 0) style.y = y

  return (
    <Component
      ref={localRef}
      data-depth={level}
      aria-hidden={decorative ? 'true' : undefined}
      style={Object.keys(style).length ? style : undefined}
      className={`depth-${level} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
}
