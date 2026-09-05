import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHead from '../components/SectionHead.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { projects, alsoBuilt } from '../data/projects.js'
import { ArrowRightIcon, GitHubIcon, ExternalLinkIcon } from '../icons.jsx'
import { useMotionBudget } from '../lib/env.js'

function Card({ project, index, fluid = false }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className={`group glass-flat glass-hover flex flex-col overflow-hidden rounded-[1.6rem] ${
        fluid ? 'w-full' : 'w-[82vw] max-w-[520px] shrink-0 sm:w-[62vw] lg:w-[440px]'
      }`}
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden border-b border-white/10 bg-white/[0.03]">
        <img
          src={project.preview}
          alt={project.previewAlt}
          loading="lazy"
          className={`h-full w-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.045] ${
            project.previewClass ?? ''
          }`}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent"
          aria-hidden="true"
        />
        {/* Solid dark chip, not glass: previews range from near-black to
            cream, and a translucent badge vanishes on the light ones. */}
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-night/80 px-3 py-1 font-mono text-[11px] text-paper backdrop-blur-sm">
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px flex-1 bg-white/12" aria-hidden="true" />
          {project.timeline && <span>{project.timeline}</span>}
        </div>

        <h3 className="display t-card mt-4">{project.title}</h3>
        <p className="mt-3 text-[14.5px] leading-relaxed text-paper/65">{project.tagline}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-7">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12px]">
            {project.tags.map((tag, i) => (
              <span key={tag} className="flex items-center gap-2">
                <span className="text-ochre/85">{tag}</span>
                {i < project.tags.length - 1 && (
                  <span className="text-paper/20" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 text-paper/60 transition-all duration-300 group-hover:border-ochre/50 group-hover:text-ochre">
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function EndCard({ fluid = false }) {
  return (
    <a
      href="https://github.com/Deadsunx"
      target="_blank"
      rel="noreferrer"
      className={`group glass-flat glass-hover flex flex-col items-center justify-center gap-4 rounded-[1.6rem] p-10 text-center ${
        fluid ? 'w-full' : 'w-[82vw] max-w-[520px] shrink-0 sm:w-[62vw] lg:w-[340px]'
      }`}
    >
      <span className="glass flex h-14 w-14 items-center justify-center rounded-2xl text-paper/70 transition-colors group-hover:text-ochre">
        <GitHubIcon className="h-6 w-6" />
      </span>
      <div className="display text-[18px]">Everything else</div>
      <p className="max-w-[24ch] text-[14px] leading-relaxed text-paper/55">
        Source for all of the above, plus the experiments that never got a page.
      </p>
      <span className="mt-2 flex items-center gap-2 font-mono text-[13px] text-ochre">
        github.com/Deadsunx
        <ExternalLinkIcon className="h-3.5 w-3.5" />
      </span>
    </a>
  )
}

/* Pinned horizontal rail: the section holds while the work travels across. */
function Rail() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(track.scrollWidth - window.innerWidth, 0))
    }
    measure()
    window.addEventListener('resize', measure, { passive: true })
    const id = window.setTimeout(measure, 400) // after images settle
    return () => {
      window.removeEventListener('resize', measure)
      window.clearTimeout(id)
    }
  }, [])

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  /* Spend more vertical scroll than horizontal travel, so the rail moves
     deliberately instead of flicking past in one flick of the wheel. */
  const PACE = 1.6

  return (
    <div
      ref={sectionRef}
      style={{ height: `calc(100vh + ${Math.round(distance * PACE)}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-6 px-6 sm:px-10">
          {projects.map((project, i) => (
            <Card key={project.slug} project={project} index={i} />
          ))}
          <EndCard />
        </motion.div>

        {/* Horizontal progress — without it there is no signal that the
            page is advancing sideways while the scroll goes down. */}
        <div className="mt-12 flex items-center gap-6 px-6 sm:px-10">
          <span className="label shrink-0 text-paper/55">Keep scrolling</span>
          <div className="h-px flex-1 bg-white/12" aria-hidden="true">
            <motion.div
              className="h-full origin-left bg-ochre"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
          <span className="label shrink-0 text-paper/55">{projects.length} projects</span>
        </div>
      </div>
    </div>
  )
}

/* Touch devices get the work as a stack — no horizontal scroll, no pin. */
function Stack() {
  return (
    <div className="flex flex-col items-center gap-6 px-6 sm:px-10">
      {projects.map((project, i) => (
        <Reveal key={project.slug} className="w-full max-w-[520px]">
          <Card project={project} index={i} fluid />
        </Reveal>
      ))}
      <Reveal className="w-full max-w-[520px]">
        <EndCard fluid />
      </Reveal>
    </div>
  )
}

export default function Work() {
  const { reduced, coarse } = useMotionBudget()
  const pinned = !reduced && !coarse

  return (
    <section id="work" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
        <SectionHead
          kicker="03 / Selected work"
          title="Six built, documented, and running."
          lead="Each one has a page with the problem, the architecture, and the tradeoffs I actually made — including the ones that went the wrong way first."
        />
      </div>

      <div className="mt-16">{pinned ? <Rail /> : <Stack />}</div>

      <div className="mx-auto mt-20 max-w-[1180px] px-6 sm:px-10">
        <Reveal>
          <div className="hairline" aria-hidden="true" />
        </Reveal>
        <Reveal delay={0.06}>
          <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/55">
            Also built
          </h3>
        </Reveal>
        <div className="mt-6 flex flex-col gap-4">
          {alsoBuilt.map((item, i) => (
            <Reveal key={item.title} delay={0.1 + i * 0.06}>
              <div className="flex flex-col gap-2 border-t border-white/8 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                <div className="display-tight w-[220px] shrink-0 text-[16px]">{item.title}</div>
                <p className="flex-1 text-[14.5px] leading-relaxed text-paper/55">{item.note}</p>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="font-mono text-[12px] text-paper/55">
                    {item.tags.join(' · ')}
                  </span>
                  {(item.live || item.repo) && (
                    <span className="flex items-center gap-2">
                      {item.live && (
                        <a
                          href={item.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${item.title} live site`}
                          className="text-paper/55 transition-colors hover:text-ochre"
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                        </a>
                      )}
                      {item.repo && (
                        <a
                          href={item.repo}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${item.title} on GitHub`}
                          className="text-paper/55 transition-colors hover:text-ochre"
                        >
                          <GitHubIcon className="h-4 w-4" />
                        </a>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
