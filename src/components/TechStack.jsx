import { motion } from 'framer-motion'

const skills = [
  'Python',
  'Java',
  'C++',
  'React',
  'Node.js',
  'SQL',
  'LangChain',
  'CrewAI',
  'OOP',
  'DBMS',
  'Operating Systems',
]

function Pill({ label }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl">
      {label}
    </span>
  )
}

export default function TechStack() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-label="Tech stack"
    >
      <h2 className="mb-8 text-center font-display text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
        Tech Stack
      </h2>

      {/* Marquee on md+, wrap on mobile */}
      <div className="relative hidden overflow-hidden md:block [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-4 pr-4">
          {[...skills, ...skills].map((skill, i) => (
            <Pill key={`${skill}-${i}`} label={skill} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:hidden">
        {skills.map((skill) => (
          <Pill key={skill} label={skill} />
        ))}
      </div>
    </motion.section>
  )
}
