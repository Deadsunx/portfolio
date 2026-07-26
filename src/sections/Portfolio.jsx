import { Heading } from './About.jsx'
import { GitHubIcon, ExternalLinkIcon } from '../icons.jsx'

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

/* Hindsight: calls plotted against the diagonal, settled ones scored */
function HindsightCover() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
      <line
        x1="40"
        y1="140"
        x2="360"
        y2="20"
        stroke="#f2f1ec"
        strokeOpacity="0.25"
        strokeWidth="2"
        strokeDasharray="6 7"
      />
      {[
        [80, 118, '#d9a441'],
        [130, 108, '#4553b8'],
        [178, 76, '#d9a441'],
        [225, 82, '#4553b8'],
        [272, 52, '#d9a441'],
        [320, 44, '#4553b8'],
      ].map(([x, y, fill], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill={fill} />
      ))}
      <path
        d="M60 150v-14M110 150v-22M160 150v-10M210 150v-30M260 150v-18M310 150v-26"
        stroke="#4553b8"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* Ephemeris: four daily sources stacked as an archive of dated rows */
function EphemerisCover() {
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
      <circle cx="322" cy="52" r="26" fill="none" stroke="#d9a441" strokeWidth="2.5" />
      <path d="M322 26a26 26 0 0 0 0 52Z" fill="#d9a441" opacity="0.55" />
      {[0, 1, 2, 3].map((row) => (
        <g key={row}>
          <rect
            x="40"
            y={34 + row * 26}
            width="14"
            height="14"
            rx="3"
            fill={row % 2 ? '#4553b8' : '#d9a441'}
          />
          <rect
            x="64"
            y={38 + row * 26}
            width={[150, 116, 178, 92][row]}
            height="6"
            rx="3"
            fill="#f2f1ec"
            opacity={0.34 - row * 0.05}
          />
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <circle key={i} cx={44 + i * 12} cy="146" r="2.5" fill="#f2f1ec" opacity="0.3" />
      ))}
    </svg>
  )
}

/* Netflix clustering: three separated groups of points */
function ClusterCover() {
  const clusters = [
    { cx: 108, cy: 62, fill: '#d9a441' },
    { cx: 212, cy: 104, fill: '#4553b8' },
    { cx: 300, cy: 56, fill: '#f2f1ec' },
  ]
  const offsets = [
    [0, 0],
    [-22, 12],
    [20, -14],
    [14, 20],
    [-16, -18],
    [30, 8],
  ]
  return (
    <svg viewBox="0 0 400 160" className="h-full w-full" aria-hidden="true">
      {clusters.map((cluster, ci) => (
        <g key={ci} opacity={cluster.fill === '#f2f1ec' ? 0.55 : 0.95}>
          <circle
            cx={cluster.cx}
            cy={cluster.cy}
            r="44"
            fill="none"
            stroke={cluster.fill}
            strokeOpacity="0.28"
            strokeWidth="1.5"
            strokeDasharray="5 6"
          />
          {offsets.map(([dx, dy], pi) => (
            <circle
              key={pi}
              cx={cluster.cx + dx}
              cy={cluster.cy + dy}
              r="5"
              fill={cluster.fill}
            />
          ))}
        </g>
      ))}
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
    repo: 'https://github.com/Deadsunx/Ai-travel-Agent',
    Cover: TravelCover,
  },
  {
    title: 'Hindsight',
    badge: 'Live',
    description:
      'A machine that guesses tomorrow in public and keeps score. Six falsifiable calls a day — one hand-written rule, one logistic regression — committed to git before the outcome exists, so the record is tamper-evident.',
    tags: ['Python', 'scikit-learn', 'GitHub Actions'],
    repo: 'https://github.com/Deadsunx/pas-vraiment-secret',
    live: 'https://pas-vraiment-secret.vercel.app',
    Cover: HindsightCover,
  },
  {
    title: 'Ephemeris',
    badge: 'Live',
    description:
      'A growing dataset that builds itself. A scheduled workflow archives four free sources every day — crypto prices, a quote, NASA’s picture of the day, and a car-news headline — running on GitHub’s servers whether my laptop is on or not.',
    tags: ['Python', 'GitHub Actions', 'APIs'],
    repo: 'https://github.com/Deadsunx/un-peu-trop-secret',
    live: 'https://un-peu-trop-secret.vercel.app',
    Cover: EphemerisCover,
  },
  {
    title: 'Netflix Content Clustering',
    badge: 'Machine Learning',
    description:
      'End-to-end unsupervised pipeline that groups the Netflix catalogue by content similarity — TF-IDF over show metadata, dimensionality reduction, then K-Means, hierarchical, and DBSCAN clustering compared.',
    tags: ['Python', 'scikit-learn', 'NLP'],
    repo: 'https://github.com/Deadsunx/Netflix-project',
    Cover: ClusterCover,
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
          Selected projects across AI, automation, web, and research.
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
                <div className="flex shrink-0 gap-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live site`}
                      className="glass-deep flex h-10 w-10 items-center justify-center rounded-xl text-paper/70 transition-colors hover:text-ochre"
                    >
                      <ExternalLinkIcon className="h-4.5 w-4.5" />
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="glass-deep flex h-10 w-10 items-center justify-center rounded-xl text-paper/70 transition-colors hover:text-ochre"
                    >
                      <GitHubIcon className="h-4.5 w-4.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}

        <a
          href="https://github.com/Deadsunx"
          target="_blank"
          rel="noreferrer"
          className="glass-deep flex min-h-[120px] items-center justify-center gap-3 rounded-3xl font-mono text-[14px] text-paper/60 transition-colors hover:text-ochre xl:col-span-2"
        >
          <GitHubIcon className="h-4.5 w-4.5" />
          More on GitHub →
        </a>
      </div>
    </div>
  )
}
