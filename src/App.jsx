import { motion } from 'framer-motion'
import Hero from './components/Hero.jsx'
import TechStack from './components/TechStack.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'

function GlowOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-pink-500/30 blur-[120px]" />
      <div className="absolute top-1/3 -right-52 h-[36rem] w-[36rem] rounded-full bg-cyan-400/25 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-violet-600/30 blur-[120px]" />
      <div className="absolute top-2/3 right-1/3 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-midnight font-sans text-slate-100 antialiased">
      <GlowOrbs />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mx-auto flex max-w-6xl flex-col gap-24 px-5 pb-24 sm:px-8 md:gap-32"
      >
        <Hero />
        <TechStack />
        <Projects />
        <Contact />
      </motion.main>
    </div>
  )
}
