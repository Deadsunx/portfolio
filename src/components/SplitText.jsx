import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMotionBudget } from '../lib/env.js'
import { EASE } from './Reveal.jsx'

/*
 * Split converge — words arrive from alternating sides and settle into
 * the line. Used once, on the hero headline, so it stays an event.
 */
export function Converge({ text, className = '', delay = 0, as = 'h1' }) {
  const { reduced } = useMotionBudget()
  const words = text.split(' ')
  const Component = motion[as] ?? motion.h1

  if (reduced) return <Component className={className}>{text}</Component>

  return (
    <Component className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={{
              opacity: 0,
              x: i % 2 === 0 ? '-0.5em' : '0.5em',
              y: '0.55em',
              filter: 'blur(9px)',
            }}
            animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: EASE, delay: delay + i * 0.085 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Component>
  )
}

/*
 * Word-by-word scroll lighting — the line brightens as it crosses the
 * viewport, so reading it and scrolling it are the same gesture.
 */
export function LitText({ text, className = '', dim = 0.22 }) {
  const ref = useRef(null)
  const { reduced } = useMotionBudget()
  const words = text.split(' ')

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.35'],
  })

  if (reduced) return <p className={className}>{text}</p>

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <LitWord
          key={`${word}-${i}`}
          word={word}
          progress={scrollYProgress}
          index={i}
          total={words.length}
          dim={dim}
        />
      ))}
    </p>
  )
}

function LitWord({ word, progress, index, total, dim }) {
  /* Each word owns a slice of the scroll range, with overlap so the
     sweep reads as a wave rather than a set of switches. */
  const start = index / total
  const end = (index + 1.6) / total
  const opacity = useTransform(progress, [start, end], [dim, 1])

  return (
    <motion.span aria-hidden="true" style={{ opacity }} className="inline-block">
      {word}
      {index < total - 1 && <span>&nbsp;</span>}
    </motion.span>
  )
}
