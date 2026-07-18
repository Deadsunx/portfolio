import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay) => ({
    initial: reduce ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: 'easeOut' },
  })

  return (
    <section className="pt-36 pb-24 md:pt-44">
      <motion.p {...rise(0)} className="font-mono text-[13px] text-paper/60">
        B.Tech CSE (AI/ML) · Sharda University · Greater Noida, India
      </motion.p>

      <motion.h1
        {...rise(0.08)}
        className="display mt-6 text-[clamp(3rem,10vw,7.5rem)] uppercase"
      >
        Oumar
        <br />
        Tirera
      </motion.h1>

      <motion.div {...rise(0.16)} className="woven mt-8 max-w-[560px]" aria-hidden="true" />

      <motion.p
        {...rise(0.24)}
        className="mt-10 max-w-[560px] text-lg leading-relaxed text-paper/80"
      >
        I build agentic AI systems and the full-stack applications around them —
        from LLM tool pipelines to dashboards people actually use. Currently
        studying computer science with a specialisation in AI/ML.
      </motion.p>

      <motion.div {...rise(0.32)} className="mt-10 flex flex-wrap gap-4">
        <motion.a
          href="#projects"
          whileHover={reduce ? {} : { scale: 1.04 }}
          whileTap={reduce ? {} : { scale: 0.97 }}
          className="glass rounded-full px-7 py-3.5 font-mono text-[14px] font-medium"
        >
          View projects ↓
        </motion.a>
        <motion.a
          href="#contact"
          whileHover={reduce ? {} : { scale: 1.04 }}
          whileTap={reduce ? {} : { scale: 0.97 }}
          className="glass-deep rounded-full px-7 py-3.5 font-mono text-[14px] text-paper/80 hover:text-paper"
        >
          Get in touch →
        </motion.a>
      </motion.div>
    </section>
  )
}
