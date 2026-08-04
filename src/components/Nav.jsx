import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, FileIcon, MailIcon } from '../icons.jsx'
import { useMotionBudget } from '../lib/env.js'

const ANCHORS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/* Highlights whichever section currently owns the viewport. */
function useActiveSection(enabled) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!enabled) return undefined
    const sections = ANCHORS.map(({ id }) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [enabled])

  return active
}

export default function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const active = useActiveSection(isHome)
  const { reduced } = useMotionBudget()

  return (
    <motion.header
      initial={reduced ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5"
    >
      <nav
        aria-label="Primary"
        className="glass flex w-full max-w-[1180px] items-center gap-3 rounded-2xl px-3 py-2.5 sm:gap-5 sm:px-4"
      >
        {isHome ? (
          <Link to="/" className="group flex shrink-0 items-center gap-2.5 rounded-xl px-1 py-1">
            <span className="display text-[15px] leading-none">Oumar Tirera</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-ochre sm:inline">
              AI/ML
            </span>
          </Link>
        ) : (
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 rounded-xl px-1 py-1 font-mono text-[13px] text-paper/70 transition-colors hover:text-ochre"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="hidden sm:inline">All work</span>
            <span className="sm:hidden">Back</span>
          </Link>
        )}

        {isHome && (
          <div className="ml-auto hidden items-center gap-1 md:flex">
            {ANCHORS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`relative rounded-xl px-3.5 py-2 font-mono text-[13px] transition-colors ${
                  active === id ? 'text-ochre' : 'text-paper/60 hover:text-paper'
                }`}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2.5 -bottom-0.5 h-px bg-ochre"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </a>
            ))}
          </div>
        )}

        {/* Persistent CTA — never leaves the viewport */}
        <div className={`flex shrink-0 items-center gap-2 ${isHome ? 'ml-auto md:ml-2' : 'ml-auto'}`}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="glass-deep flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-[13px] text-paper/80 transition-colors hover:text-ochre"
          >
            <FileIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Résumé</span>
          </a>
          <a
            href="mailto:oumartambatirera@gmail.com"
            className="flex items-center gap-2 rounded-xl bg-ochre px-3 py-2 font-mono text-[13px] font-medium text-night transition-opacity hover:opacity-85"
          >
            <MailIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
