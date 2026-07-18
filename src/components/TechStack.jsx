import { motion, useReducedMotion } from 'framer-motion'

const groups = [
  { label: 'Languages', items: ['Python', 'Java', 'C++'] },
  { label: 'Web', items: ['React', 'Node.js', 'SQL'] },
  { label: 'AI & agents', items: ['LangChain', 'CrewAI'] },
  { label: 'Foundations', items: ['OOP', 'DBMS', 'Operating Systems'] },
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
      className="py-14"
    >
      <h2 className="font-mono text-[13px] uppercase tracking-[0.2em] text-paper/50">
        Toolbox
      </h2>
      <div className="mt-8 flex flex-col gap-6">
        {groups.map((group) => (
          <div
            key={group.label}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8"
          >
            <span className="w-[150px] shrink-0 font-mono text-[13px] text-ochre">
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="glass-deep rounded-full px-4 py-1.5 text-[14px] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
