import { motion, useReducedMotion } from 'framer-motion'

const projects = [
  {
    title: 'Agentic AI Travel Assistant',
    description:
      'Web-based travel assistant built on agentic AI workflows — a deterministic tool pipeline that searches real flights and hotels, then streams a day-by-day itinerary.',
    tags: 'Python · LangChain · CrewAI',
    href: 'https://github.com/Deadsunx/Ai-travel-Agent',
    note: 'Code on GitHub →',
  },
  {
    title: 'SiniTech Dashboard',
    description:
      'Prototype business dashboard for a school management SaaS platform — enrolment, fees, and staff views in one place.',
    tags: 'React · Full-Stack',
  },
  {
    title: 'Cyber Threat Classification',
    description:
      'Academic literature review and classification modelling for cyber threats, comparing feature sets across published detection approaches.',
    tags: 'ML · Research',
  },
]

function Card({ project }) {
  const reduce = useReducedMotion()
  const inner = (
    <>
      <div>
        <h3 className="display text-[clamp(1.5rem,3vw,2.1rem)]">{project.title}</h3>
        <p className="mt-4 leading-relaxed text-paper/70">{project.description}</p>
      </div>
      <div className="mt-8 flex items-baseline justify-between gap-4 font-mono text-[13px]">
        <span className="text-paper/50">{project.tags}</span>
        {project.note && <span className="text-ochre">{project.note}</span>}
      </div>
    </>
  )

  const cardClass = 'glass flex h-full flex-col justify-between rounded-[1.75rem] p-8'
  const hover = reduce ? {} : { scale: 1.02, y: -3 }

  return project.href ? (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      whileHover={hover}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cardClass}
    >
      {inner}
    </motion.a>
  ) : (
    <motion.div
      whileHover={hover}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cardClass}
    >
      {inner}
    </motion.div>
  )
}

export default function Projects() {
  const reduce = useReducedMotion()
  return (
    <motion.section
      id="projects"
      initial={reduce ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="scroll-mt-24 py-14"
    >
      <div className="flex items-baseline justify-between pb-8">
        <h2 className="display text-[clamp(2rem,5vw,3.2rem)]">Selected work</h2>
        <span className="hidden font-mono text-[13px] text-paper/50 sm:block">
          3 projects · 2025–26
        </span>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <Card project={projects[0]} />
        </div>
        <Card project={projects[1]} />
        <Card project={projects[2]} />
      </div>
    </motion.section>
  )
}
