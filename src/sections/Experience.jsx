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

export default function Experience() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <Heading>Experience</Heading>
        <p className="mt-6 text-paper/60">My academic and project journey so far.</p>
      </div>

      <div className="relative flex max-w-[680px] flex-col gap-10 pl-16">
        <div
          className="absolute bottom-4 left-[27px] top-4 w-px bg-white/15"
          aria-hidden="true"
        />
        {entries.map((entry) => (
          <div key={entry.org} className="relative">
            <span className="glass-deep absolute -left-16 top-1 flex h-[54px] w-[54px] items-center justify-center rounded-2xl text-ochre">
              <entry.Icon className="h-5 w-5" />
            </span>
            <article className="glass rounded-3xl p-7">
              <h2 className="display text-xl">{entry.org}</h2>
              <div className="mt-1 font-mono text-[13px] text-ochre">{entry.role}</div>
              <div className="mt-3 inline-block rounded-md bg-white/5 px-2.5 py-1 font-mono text-[12px] uppercase tracking-wider text-paper/60">
                {entry.period}
              </div>
              <ul className="mt-5 flex flex-col gap-2.5 text-[14px] leading-relaxed text-paper/70">
                {entry.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ochre" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </div>
  )
}
