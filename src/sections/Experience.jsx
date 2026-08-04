import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHead from '../components/SectionHead.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { experience } from '../data/experience.js'
import { CodeIcon, GradCapIcon } from '../icons.jsx'
import { useMotionBudget } from '../lib/env.js'

const ICONS = { grad: GradCapIcon, code: CodeIcon }

function EntryCard({ entry }) {
  return (
    <article className="glass-flat glass-hover rounded-[1.5rem] p-7 sm:p-8">
      <div className="display-tight text-[19px]">{entry.org}</div>
      <div className="mt-1.5 font-mono text-[13px] text-ochre">{entry.role}</div>
      <div className="mt-5 inline-block rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/55">
        {entry.period}
      </div>
      <ul className="mt-5 flex flex-col gap-3 text-[14.5px] leading-relaxed text-paper/70">
        {entry.points.map((point) => (
          <li key={point} className="flex gap-3.5">
            <span
              className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ochre"
              aria-hidden="true"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { reduced } = useMotionBudget()

  /* The spine draws itself as the section passes. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.6'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <section id="experience" className="relative px-6 py-28 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-[1180px]">
        <SectionHead
          kicker="04 / Experience"
          title="Where this has come from."
          lead="A degree in progress, and a habit of building things outside it."
        />

        <div ref={ref} className="relative mt-16">
          {/* Spine — left on mobile, centred on desktop */}
          <div
            className="absolute bottom-6 left-6 top-6 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-ochre/70 via-indigo-lift/50 to-transparent"
              style={reduced ? { transform: 'scaleY(1)' } : { scaleY }}
            />
          </div>

          {experience.map((entry, index) => {
            const Icon = ICONS[entry.icon]
            return (
              <div
                key={entry.org}
                className="relative mb-12 last:mb-0 md:grid md:grid-cols-2 md:gap-20"
              >
                <span
                  className="glass absolute left-0 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full text-ochre md:left-1/2 md:-translate-x-1/2"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>

                <Reveal
                  className={
                    index % 2 === 0
                      ? 'pl-20 md:col-start-2 md:pl-0'
                      : 'pl-20 md:col-start-1 md:row-start-1 md:pl-0'
                  }
                >
                  <EntryCard entry={entry} />
                </Reveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
