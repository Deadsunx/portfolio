import { Heading } from './About.jsx'
import { CodeIcon, GradCapIcon } from '../icons.jsx'

const entries = [
  {
    org: 'Sharda University',
    role: 'B.Tech CSE (AI/ML)',
    period: '2024 — Present',
    Icon: GradCapIcon,
    points: [
      'Specialisation in Artificial Intelligence & Machine Learning.',
      'Built the Agentic AI Travel Assistant as a project-based-learning capstone.',
      'Core coursework: OOP, DBMS, Operating Systems.',
    ],
  },
  {
    org: 'Independent projects',
    role: 'Developer',
    period: '2025 — Present',
    Icon: CodeIcon,
    points: [
      'SiniTech — prototype dashboard for a school-management SaaS.',
      'Cyber threat classification — literature review and modelling.',
      'This portfolio — React, Tailwind v4, and a liquid-glass design system.',
    ],
  },
]

function EntryCard({ entry }) {
  return (
    <article className="glass rounded-3xl p-7">
      <div className="flex items-center gap-4">
        <span className="glass-deep flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-ochre">
          <entry.Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="display text-xl">{entry.org}</h2>
          <div className="mt-0.5 font-mono text-[13px] text-ochre">{entry.role}</div>
        </div>
      </div>
      <div className="mt-5 inline-block rounded-md bg-white/5 px-2.5 py-1 font-mono text-[12px] uppercase tracking-wider text-paper/60">
        {entry.period}
      </div>
      <ul className="mt-4 flex flex-col gap-2.5 text-[14px] leading-relaxed text-paper/70">
        {entry.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span
              className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ochre"
              aria-hidden="true"
            />
            {point}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Experience() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <Heading>Experience</Heading>
        <p className="mt-6 text-paper/60">My academic and project journey so far.</p>
      </div>

      <div className="relative">
        {/* Timeline spine: left on mobile, centred on desktop */}
        <div
          className="absolute bottom-6 top-6 left-6 w-px bg-white/15 md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />

        {entries.map((entry, index) => (
          <div
            key={entry.org}
            className="relative mb-10 last:mb-0 md:grid md:grid-cols-2 md:gap-24"
          >
            {/* Node on the spine */}
            <span
              className="glass-deep absolute left-0 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-ochre md:left-1/2 md:-translate-x-1/2"
              aria-hidden="true"
            >
              <entry.Icon className="h-5 w-5" />
            </span>

            <div
              className={
                index % 2 === 0
                  ? 'pl-20 md:col-start-2 md:pl-0'
                  : 'pl-20 md:col-start-1 md:row-start-1 md:pl-0'
              }
            >
              <EntryCard entry={entry} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
