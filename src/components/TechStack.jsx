import { motion, useReducedMotion } from 'framer-motion'

const groups = [
  { label: 'Languages', items: 'Python · Java · C++' },
  { label: 'Web', items: 'React · Node.js · SQL' },
  { label: 'AI & agents', items: 'LangChain · CrewAI' },
  { label: 'Foundations', items: 'OOP · DBMS · Operating Systems' },
]

export default function TechStack() {
  const reduce = useReducedMotion()
  return (
    <motion.section
      initial={reduce ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      aria-label="Toolbox"
      className="border-t border-ink/15 py-16"
    >
      <h2 className="font-mono text-[13px] uppercase tracking-[0.2em] text-graphite">
        Toolbox
      </h2>
      <dl className="mt-8 max-w-[720px]">
        {groups.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-1 gap-1 border-b border-dotted border-indigo/30 py-4 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-6"
          >
            <dt className="font-mono text-[13px] text-indigo">{group.label}</dt>
            <dd className="text-[17px] font-medium">{group.items}</dd>
          </div>
        ))}
      </dl>
    </motion.section>
  )
}
