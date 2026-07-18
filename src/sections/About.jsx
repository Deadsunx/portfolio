import { CodeIcon } from '../icons.jsx'

function Heading({ children }) {
  return (
    <div>
      <h1 className="display text-4xl md:text-5xl">{children}</h1>
      <div className="woven mt-5 w-40" aria-hidden="true" />
    </div>
  )
}

const arsenal = [
  { name: 'Python', tone: 'text-ochre' },
  { name: 'Java', tone: 'text-paper' },
  { name: 'C++', tone: 'text-indigo-300' },
  { name: 'React', tone: 'text-indigo-300' },
  { name: 'Node.js', tone: 'text-paper' },
  { name: 'SQL', tone: 'text-ochre' },
  { name: 'LangChain', tone: 'text-ochre' },
  { name: 'CrewAI', tone: 'text-indigo-300' },
  { name: 'OOP', tone: 'text-paper' },
  { name: 'DBMS', tone: 'text-ochre' },
  { name: 'Operating Systems', tone: 'text-indigo-300' },
]

const expectations = [
  {
    title: 'Agentic by default',
    body: 'I design tool pipelines, not just prompts.',
  },
  {
    title: 'Deterministic where it matters',
    body: 'Tested, evaluated, reproducible.',
  },
  {
    title: 'Clear communication',
    body: 'Deep tech or plain English — whichever you prefer.',
  },
]

export { Heading }

export default function About() {
  return (
    <div className="flex flex-col gap-12">
      <Heading>About me</Heading>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="flex max-w-[560px] flex-col gap-5 text-[16px] leading-relaxed text-paper/80">
          <p>
            I&apos;m <strong className="font-semibold text-paper">Oumar Tirera</strong>, a
            B.Tech CSE (AI/ML) student at Sharda University, based in Greater
            Noida, India.
          </p>
          <p>
            I specialise in building{' '}
            <span className="font-mono text-[15px] text-ochre">agentic</span> and{' '}
            <span className="font-mono text-[15px] text-ochre">reliable</span>{' '}
            <span className="font-mono text-[15px] text-indigo-300">AI systems.</span>
          </p>
          <p>
            From travel-planning agents to school-management dashboards, my
            philosophy stays the same: make it deterministic where it matters,
            and delightful where people touch it.
          </p>
          <p>
            I&apos;m committed to continuous learning — currently deep in LLM tool
            pipelines and evaluation harnesses, and always up for a hackathon.
          </p>
        </div>

        <div className="glass flex aspect-[4/5] max-w-[300px] flex-col items-center justify-center gap-6 rounded-3xl">
          <span className="display text-7xl text-paper/90">OT</span>
          <div className="woven w-32" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
            Est. 2024 · Greater Noida
          </span>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="glass rounded-3xl p-7" aria-label="Technical arsenal">
          <div className="flex items-center gap-4">
            <span className="glass-deep flex h-11 w-11 items-center justify-center rounded-xl text-ochre">
              <CodeIcon className="h-5 w-5" />
            </span>
            <h2 className="display text-xl">Technical arsenal</h2>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {arsenal.map((tech) => (
              <span
                key={tech.name}
                className={`glass-deep rounded-full px-4 py-1.5 font-mono text-[13px] ${tech.tone}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </section>

        <section className="glass rounded-3xl p-7" aria-label="What to expect">
          <div className="flex items-center gap-4">
            <span className="glass-deep flex h-11 w-11 items-center justify-center rounded-xl text-ochre">
              <span className="display text-lg">✳</span>
            </span>
            <h2 className="display text-xl">What to expect</h2>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            {expectations.map((item) => (
              <div key={item.title} className="glass-deep rounded-2xl px-5 py-4">
                <div className="font-semibold">{item.title}</div>
                <div className="mt-0.5 text-[14px] text-paper/60">{item.body}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
