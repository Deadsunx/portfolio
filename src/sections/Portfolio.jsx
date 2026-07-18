import { Heading } from './About.jsx'
import { GitHubIcon } from '../icons.jsx'

/* Geometric cover art per project, drawn in the site palette */
function TravelCover() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
      <path
        d="M20 130 Q120 20 200 80 T380 40"
        fill="none"
        stroke="#d9a441"
        strokeWidth="2.5"
        strokeDasharray="10 8"
      />
      <circle cx="20" cy="130" r="6" fill="#4553b8" />
      <circle cx="200" cy="80" r="6" fill="#4553b8" />
      <circle cx="380" cy="40" r="6" fill="#d9a441" />
      <path d="m192 60 24-8-14 20-3-8-7-4Z" fill="#f2f1ec" opacity="0.9" />
    </svg>
  )
}

function DashboardCover() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={40 + i * 56}
          y={130 - [46, 78, 60, 100, 84, 116][i]}
          width="32"
          height={[46, 78, 60, 100, 84, 116][i]}
          rx="6"
          fill={i % 2 ? '#4553b8' : '#d9a441'}
          opacity={i % 2 ? 0.85 : 0.9}
        />
      ))}
      <line x1="24" y1="130" x2="376" y2="130" stroke="#f2f1ec" strokeOpacity="0.35" strokeWidth="2" />
    </svg>
  )
}

function ThreatCover() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
      <path
        d="M200 18 260 40v38c0 32-26 54-60 66-34-12-60-34-60-66V40l60-22Z"
        fill="none"
        stroke="#4553b8"
        strokeWidth="2.5"
      />
      <path d="M178 80l16 16 30-34" fill="none" stroke="#d9a441" strokeWidth="3" strokeLinecap="round" />
      {[[60, 40], [340, 36], [70, 120], [330, 118]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#f2f1ec" opacity="0.4" />
      ))}
    </svg>
  )
}

const projects = [
  {
    title: 'Agentic AI Travel Assistant',
    badge: 'PBL Project',
    description:
      'Web-based travel assistant built on agentic AI workflows — a deterministic tool pipeline that searches real flights and hotels, then streams a day-by-day itinerary.',
    tags: ['Python', 'LangChain', 'CrewAI'],
    href: 'https://github.com/Deadsunx/Ai-travel-Agent',
    Cover: TravelCover,
  },
  {
    title: 'SiniTech Dashboard',
    badge: 'Prototype',
    description:
      'Prototype business dashboard for a school management SaaS platform — enrolment, fees, and staff views in one place.',
    tags: ['React', 'Full-Stack'],
    Cover: DashboardCover,
  },
  {
    title: 'Cyber Threat Classification',
    badge: 'Research',
    description:
      'Academic literature review and classification modelling for cyber threats, comparing feature sets across published detection approaches.',
    tags: ['ML', 'Research'],
    Cover: ThreatCover,
  },
]

export default function Portfolio() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <Heading>Portfolio</Heading>
        <p className="mt-6 text-paper/60">
          Selected projects across AI, web, and research.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="glass flex flex-col overflow-hidden rounded-3xl">
            <div className="h-40 shrink-0 border-b border-white/10 bg-white/[0.03]">
              <project.Cover />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-start justify-between gap-4">
                <h2 className="display text-xl">{project.title}</h2>
                <span className="glass-deep shrink-0 rounded-full px-3 py-1 font-mono text-[11px] text-paper/60">
                  {project.badge}
                </span>
              </div>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-paper/70">
                {project.description}
              </p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[12px] text-ochre">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    className="glass-deep flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-paper/70 transition-colors hover:text-ochre"
                  >
                    <GitHubIcon className="h-4.5 w-4.5" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}

        <a
          href="https://github.com/Deadsunx"
          target="_blank"
          rel="noreferrer"
          className="glass-deep flex min-h-[120px] items-center justify-center gap-3 rounded-3xl font-mono text-[14px] text-paper/60 transition-colors hover:text-ochre"
        >
          <GitHubIcon className="h-4.5 w-4.5" />
          More on GitHub →
        </a>
      </div>
    </div>
  )
}
