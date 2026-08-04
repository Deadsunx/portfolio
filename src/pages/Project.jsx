import { useEffect, useRef } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects, bySlug } from '../data/projects.js'
import ArchDiagram from '../components/ArchDiagram.jsx'
import { Reveal, Stagger, staggerItem } from '../components/Reveal.jsx'
import { ArrowRightIcon, ExternalLinkIcon, GitHubIcon } from '../icons.jsx'
import { useMotionBudget } from '../lib/env.js'

function Links({ links, title, size = 'md' }) {
  const pad = size === 'lg' ? 'px-6 py-3.5 text-[14px]' : 'px-5 py-3 text-[13px]'
  return (
    <div className="flex flex-wrap gap-3">
      {links.live && (
        <a
          href={links.live}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center gap-2.5 rounded-full bg-ochre font-mono font-medium text-night transition-opacity hover:opacity-90 ${pad}`}
        >
          <ExternalLinkIcon className="h-4 w-4" />
          Visit it live
        </a>
      )}
      {links.repo && (
        <a
          href={links.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${title} source on GitHub`}
          className={`glass glass-hover flex items-center gap-2.5 rounded-full font-mono ${pad}`}
        >
          <GitHubIcon className="h-4 w-4" />
          Read the source
        </a>
      )}
    </div>
  )
}

/* Cinematic header — the screenshot scales out as you scroll past it. */
function Header({ project }) {
  const ref = useRef(null)
  const { reduced } = useMotionBudget()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15])

  return (
    <header ref={ref} className="relative min-h-[68svh] overflow-hidden px-6 pb-14 pt-36 sm:px-10">
      {/* depth 0 — the work itself, behind the words */}
      <motion.div
        aria-hidden="true"
        data-depth="0"
        className="absolute inset-0"
        style={reduced ? undefined : { scale, opacity }}
      >
        {/* Blurred hard — the screenshot is texture here, not content.
            Unblurred it competes with the title and reads as a double image. */}
        <img
          src={project.preview}
          alt=""
          className={`h-full w-full object-cover object-top opacity-[0.28] blur-[3px] ${
            project.previewClass ?? ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/70 to-night" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[46svh] max-w-[1180px] flex-col justify-end">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="glass-deep rounded-full px-3.5 py-1.5 text-paper/75">
              {project.status}
            </span>
            {project.timeline && (
              <>
                <span className="text-paper/40">{project.timeline}</span>
                <span className="text-paper/20" aria-hidden="true">
                  ·
                </span>
              </>
            )}
            <span className="text-paper/40">{project.role}</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="display mt-6 max-w-[15ch] text-[clamp(2.2rem,6.5vw,4.6rem)]">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="woven mt-6 w-40" aria-hidden="true" />
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-7 max-w-[46ch] text-[18px] leading-relaxed text-paper/75">
            {project.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9">
            <Links links={project.links} title={project.title} size="lg" />
          </div>
        </Reveal>
      </div>
    </header>
  )
}

function Block({ kicker, title, children }) {
  return (
    <section className="border-t border-white/8 py-16 sm:py-20">
      <Reveal>
        <span className="label text-ochre">{kicker}</span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="display-tight mt-4 text-[clamp(1.5rem,3vw,2.1rem)]">{title}</h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function Project() {
  const { slug } = useParams()
  const project = bySlug(slug)

  useEffect(() => {
    if (!project) return
    document.title = `${project.title} — Oumar Tirera`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', project.summary)
  }, [project])

  if (!project) return <Navigate to="/404" replace />

  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article>
      <Header project={project} />

      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <div className="mx-auto max-w-[820px]">
          <Block kicker="The problem" title="What was actually broken.">
            <Reveal>
              <p className="text-[17px] leading-relaxed text-paper/75">{project.problem}</p>
            </Reveal>
          </Block>

          <Block kicker="The build" title="How it works.">
            <div className="flex flex-col gap-9">
              {project.build.map((part, i) => (
                <Reveal key={part.heading} delay={i * 0.06}>
                  <h3 className="display-tight text-[17px] text-ochre">{part.heading}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-paper/70">{part.body}</p>
                </Reveal>
              ))}
            </div>

            <div className="glass-flat mt-12 rounded-[1.5rem] p-6 sm:p-8">
              <ArchDiagram kind={project.diagram} />
            </div>
          </Block>

          <Block kicker="Decisions" title="What I chose, and what I gave up.">
            <Stagger className="flex flex-col gap-4" gap={0.1}>
              {project.decisions.map((decision) => (
                <motion.div
                  key={decision.choice}
                  variants={staggerItem}
                  className="glass-flat rounded-2xl p-6 sm:p-7"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/35">
                      Chose
                    </span>
                    <span className="display-tight text-[17px]">{decision.choice}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/35">
                      Over
                    </span>
                    <span className="text-[15px] text-paper/55">{decision.instead}</span>
                  </div>
                  <p className="mt-4 border-t border-white/8 pt-4 text-[15.5px] leading-relaxed text-paper/70">
                    {decision.because}
                  </p>
                </motion.div>
              ))}
            </Stagger>
          </Block>

          <Block kicker="Where it stands" title="What it does now.">
            <ul className="flex flex-col gap-4">
              {project.outcomes.map((outcome, i) => (
                <Reveal key={outcome} delay={i * 0.06} as="li">
                  <div className="flex gap-4 text-[16px] leading-relaxed text-paper/75">
                    <span
                      className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-ochre"
                      aria-hidden="true"
                    />
                    <span>{outcome}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Block>

          <Block kicker="Stack" title="What it's built from, and why.">
            <Stagger className="grid gap-3 sm:grid-cols-2" gap={0.06}>
              {project.stack.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={staggerItem}
                  className="glass-flat rounded-2xl px-5 py-5"
                >
                  <div className="font-mono text-[13.5px] text-ochre">{tech.name}</div>
                  <div className="mt-2 text-[14px] leading-relaxed text-paper/60">{tech.why}</div>
                </motion.div>
              ))}
            </Stagger>
          </Block>

          <section className="border-t border-white/8 py-14">
            <Reveal>
              <Links links={project.links} title={project.title} size="lg" />
            </Reveal>
          </section>
        </div>
      </div>

      {/* Next project */}
      <div className="mx-auto max-w-[1180px] px-6 pb-24 sm:px-10">
        <Reveal>
          <Link
            to={`/work/${next.slug}`}
            className="group glass-flat glass-hover flex flex-col gap-6 overflow-hidden rounded-[1.75rem] p-8 sm:flex-row sm:items-center sm:gap-10 sm:p-10"
          >
            <img
              src={next.preview}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className={`h-32 w-full shrink-0 rounded-2xl object-cover object-top sm:w-56 ${
                next.previewClass ?? ''
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
                Next project
              </div>
              <div className="display t-card mt-2.5">{next.title}</div>
              <p className="mt-2 text-[14.5px] leading-relaxed text-paper/60">{next.tagline}</p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/12 text-paper/60 transition-all duration-300 group-hover:border-ochre/50 group-hover:text-ochre">
              <ArrowRightIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
