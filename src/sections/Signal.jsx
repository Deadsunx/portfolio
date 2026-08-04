import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { Reveal } from '../components/Reveal.jsx'
import { useMotionBudget } from '../lib/env.js'

/* Only facts that can be checked against the repositories. */
const FACTS = [
  { value: 6, label: 'projects built' },
  { value: 4, label: 'public repositories' },
  { value: 2, label: 'systems running unattended, daily' },
]

function Counter({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const { reduced } = useMotionBudget()
  const [value, setValue] = useState(reduced ? to : 0)

  useEffect(() => {
    if (!inView || reduced) return undefined
    const controls = animate(0, to, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, reduced])

  return (
    <span ref={ref} className="display tabular-nums">
      {value}
    </span>
  )
}

export default function Signal() {
  return (
    <section className="relative px-6 py-10 sm:px-10" aria-label="At a glance">
      <div className="mx-auto max-w-[1180px]">
        <div className="hairline" aria-hidden="true" />
        <div className="grid gap-8 py-12 sm:grid-cols-3 sm:gap-6">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 0.08} className="flex items-baseline gap-4">
              <div className="text-ochre" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)' }}>
                <Counter to={fact.value} />
              </div>
              <div className="max-w-[16ch] font-mono text-[12px] leading-relaxed text-paper/55">
                {fact.label}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="hairline" aria-hidden="true" />
      </div>
    </section>
  )
}
