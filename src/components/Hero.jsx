import { motion } from 'framer-motion'

const glassButton =
  'rounded-2xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-colors duration-300'

export default function Hero() {
  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6"
      >
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-300 backdrop-blur-xl">
          B.Tech CSE (AI/ML) · Sharda University
        </span>

        <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl md:text-7xl">
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Oumar Tirera.
          </span>
        </h1>

        <p className="max-w-xl text-base text-slate-400 sm:text-lg">
          B.Tech CSE (AI/ML) Student crafting intelligent systems and full-stack
          applications.
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`${glassButton} text-white hover:bg-white/10`}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`${glassButton} text-slate-300 hover:bg-white/10 hover:text-white`}
          >
            Contact Me
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
