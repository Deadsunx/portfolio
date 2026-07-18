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

function Row({ project }) {
  const inner = (
    <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[1fr_260px] md:gap-10">
      <div>
        <h3 className="display text-[clamp(1.6rem,3.5vw,2.4rem)]">{project.title}</h3>
        <p className="mt-4 max-w-[560px] leading-relaxed text-ink/75 transition-colors group-hover:text-paper/85">
          {project.description}
        </p>
      </div>
      <div className="flex flex-row items-start justify-between gap-2 font-mono text-[13px] md:flex-col md:text-right">
        <span className="text-graphite transition-colors group-hover:text-paper/70 md:self-end">
          {project.tags}
        </span>
        {project.note && (
          <span className="text-indigo transition-colors group-hover:text-ochre md:self-end">
            {project.note}
          </span>
        )}
      </div>
    </div>
  )

  const rowClass =
    'group block border-t border-ink/15 px-4 -mx-4 transition-colors duration-200 hover:bg-indigo hover:text-paper'

  return project.href ? (
    <a href={project.href} target="_blank" rel="noreferrer" className={rowClass}>
      {inner}
    </a>
  ) : (
    <div className={rowClass}>{inner}</div>
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
      className="scroll-mt-16 pb-24"
    >
      <div className="flex items-baseline justify-between pb-8">
        <h2 className="display text-[clamp(2rem,5vw,3.2rem)]">Selected work</h2>
        <span className="hidden font-mono text-[13px] text-graphite sm:block">
          3 projects · 2025–26
        </span>
      </div>
      {projects.map((project) => (
        <Row key={project.title} project={project} />
      ))}
    </motion.section>
  )
}
