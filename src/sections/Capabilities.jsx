import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHead from '../components/SectionHead.jsx'
import Depth from '../components/Depth.jsx'
import { capabilities } from '../data/experience.js'
import { ClusterIcon, FlowIcon, ShipIcon } from '../icons.jsx'
import { useMotionBudget } from '../lib/env.js'

const ICONS = { cluster: ClusterIcon, flow: FlowIcon, ship: ShipIcon }

/*
 * Cascading stack — each card pins a little lower than the one before and
 * the card underneath recedes as the next arrives, so the three read as a
 * deck being dealt rather than a list.
 */
function StackCard({ item, index, total }) {
  const ref = useRef(null)
  const { reduced, coarse } = useMotionBudget()
  const Icon = ICONS[item.icon]

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.22', 'end 0.15'],
  })

  const isLast = index === total - 1
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.93])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.45])

  const stack = !reduced && !coarse

  return (
    <div
      ref={ref}
      className={stack ? 'sticky' : ''}
      style={stack ? { top: `${7 + index * 1.75}rem` } : undefined}
    >
      <motion.article
        style={stack ? { scale, opacity, transformOrigin: 'center top' } : undefined}
        className="glass-flat glass-hover overflow-hidden rounded-[1.75rem] p-8 sm:p-10"
      >
        <div className="flex flex-col gap-7 md:flex-row md:items-start md:gap-10">
          <div className="flex items-center gap-5 md:w-[240px] md:shrink-0 md:flex-col md:items-start">
            <span className="glass flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-ochre">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/55">
                {item.kicker}
              </div>
              <h3 className="display t-card mt-1.5">{item.title}</h3>
            </div>
          </div>

          <div className="flex-1">
            <p className="max-w-[46ch] text-[16px] leading-relaxed text-paper/70">{item.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[12px] text-paper/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative px-6 py-28 sm:px-10 sm:py-32">
      <Depth level={1} className="layer">
        <div className="absolute left-[6%] top-[30%] h-[24vw] w-[24vw] rounded-full bg-ochre/8 blur-[110px]" />
      </Depth>

      <div className="relative mx-auto max-w-[1180px]">
        <SectionHead
          kicker="02 / What I do"
          title="Three layers, one job."
          lead="Two of these are the AI. The third is what decides whether the AI ever reaches anyone — which is why it gets equal billing."
        />

        <div className="mt-16 flex flex-col gap-6 pb-6">
          {capabilities.map((item, i) => (
            <StackCard key={item.title} item={item} index={i} total={capabilities.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
