import { motion } from 'framer-motion'
import { useMotionBudget } from '../lib/env.js'

const EASE = [0.22, 1, 0.36, 1]

/* Masked line reveal — content rises out from behind its own edge. */
export function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const { reduced } = useMotionBudget()
  const Component = motion[as] ?? motion.div

  if (reduced) return <Component className={className}>{children}</Component>

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </Component>
  )
}

/* Clip-path birth — the element is born from its top edge downward. */
export function ClipReveal({ children, delay = 0, from = 'top', className = '' }) {
  const { reduced } = useMotionBudget()

  const closed = {
    top: 'inset(0 0 100% 0)',
    bottom: 'inset(100% 0 0 0)',
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
  }[from]

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ clipPath: closed }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.95, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* Children enter in sequence. */
export function Stagger({ children, className = '', gap = 0.08, delay = 0 }) {
  const { reduced } = useMotionBudget()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export { EASE }
