import { motion } from 'framer-motion'
import Depth from '../components/Depth.jsx'
import { Converge } from '../components/SplitText.jsx'
import { ArrowDownIcon, ArrowRightIcon, FileIcon } from '../icons.jsx'
import { useMotionBudget } from '../lib/env.js'
import { EASE } from '../components/Reveal.jsx'

export default function Hero() {
  const { reduced } = useMotionBudget()

  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, ease: EASE, delay },
        }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-24 pt-32 sm:px-10"
    >
      {/* depth 0 — far wash */}
      <Depth level={0} className="layer">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(39,53,127,0.35),transparent_65%)]" />
      </Depth>

      {/* depth 1 — atmosphere */}
      <Depth level={1} className="layer">
        <motion.div
          className="absolute left-[-10%] top-[8%] h-[42vw] w-[42vw] rounded-full bg-indigo/22 blur-[90px]"
          animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[4%] right-[-6%] h-[34vw] w-[34vw] rounded-full bg-ochre/12 blur-[100px]"
          animate={reduced ? undefined : { x: [0, -34, 0], y: [0, 26, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
      </Depth>

      {/* depth 4 — the claim */}
      <div className="relative z-10 mx-auto w-full max-w-[1180px]">
        <motion.div {...rise(0.1)} className="flex flex-wrap items-center gap-3">
          <span className="glass-flat flex items-center gap-2.5 rounded-full px-4 py-2">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-ochre"
              animate={reduced ? undefined : { opacity: [1, 0.25, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/70">
              Open to internships &amp; freelance
            </span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">
            Remote &amp; on-site
          </span>
        </motion.div>

        <Converge
          text="I build AI systems that behave."
          delay={0.25}
          className="display t-hero mt-7 max-w-[16ch]"
        />

        <motion.p
          {...rise(0.75)}
          className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-paper/70 sm:text-[19px]"
        >
          B.Tech CSE (AI/ML) at Sharda University. I work on agentic pipelines and applied
          machine learning — and I build the interface, the API, and the deploy around them,
          so the model is something people can actually reach.
        </motion.p>

        <motion.div {...rise(0.9)} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="group flex items-center gap-2.5 rounded-full bg-ochre px-6 py-3.5 font-mono text-[14px] font-medium text-night transition-opacity hover:opacity-90"
          >
            View the work
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="glass glass-hover flex items-center gap-2.5 rounded-full px-6 py-3.5 font-mono text-[14px]"
          >
            <FileIcon className="h-4 w-4" />
            Résumé
          </a>
        </motion.div>

        <motion.div {...rise(1.05)} className="mt-16 flex items-center gap-5">
          <div className="woven w-32" aria-hidden="true" />
          <motion.span
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/55"
            animate={reduced ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDownIcon className="h-3.5 w-3.5" />
            Scroll
          </motion.span>
        </motion.div>
      </div>
    </section>
  )
}
