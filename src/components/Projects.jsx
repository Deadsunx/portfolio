import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Agentic AI Travel Assistant',
    description:
      'Web-based travel assistant utilizing agentic AI workflows to plan trips, search flights and hotels, and build day-by-day itineraries.',
    tags: ['Python', 'LangChain', 'CrewAI'],
    span: 'md:col-span-2 md:row-span-2',
    accent: 'from-pink-500/20 to-fuchsia-500/5',
  },
  {
    title: 'SiniTech Dashboard',
    description:
      'Prototype business dashboard for a school management SaaS platform.',
    tags: ['React', 'Full-Stack'],
    span: 'md:col-span-1 md:row-span-1',
    accent: 'from-cyan-400/20 to-sky-500/5',
  },
  {
    title: 'Cyber Threat Classification',
    description:
      'Academic literature review and classification modeling for cyber threats.',
    tags: ['ML', 'Research'],
    span: 'md:col-span-1 md:row-span-1',
    accent: 'from-violet-500/20 to-indigo-500/5',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-10 text-center"
      >
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Projects</h2>
        <p className="mt-3 text-slate-400">
          A selection of things I&apos;ve been building.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={card}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl ${project.span}`}
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-300 group-hover:opacity-100 ${project.accent}`}
            />
            <div className="relative">
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {project.description}
              </p>
            </div>
            <div className="relative mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-xl"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
