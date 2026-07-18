import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import About from './sections/About.jsx'
import Portfolio from './sections/Portfolio.jsx'
import Experience from './sections/Experience.jsx'
import Contact from './sections/Contact.jsx'
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  FileIcon,
  MenuIcon,
  CloseIcon,
} from './icons.jsx'

const SECTIONS = [
  { id: 'about', label: 'About me', view: About },
  { id: 'portfolio', label: 'Portfolio', view: Portfolio },
  { id: 'experience', label: 'Experience', view: Experience },
  { id: 'contact', label: 'Contact me', view: Contact },
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Deadsunx', Icon: GitHubIcon },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/oumar-tirera-5a7a7b16b',
    Icon: LinkedInIcon,
  },
  { label: 'Email', href: 'mailto:oumartambatirera@gmail.com', Icon: MailIcon },
  {
    label: 'Résumé',
    href: 'https://drive.google.com/file/d/1IfjgUhibxvkNGU3nq41l4MgX1XfmOdSP/view?usp=sharing',
    Icon: FileIcon,
  },
]

function currentSection() {
  const hash = window.location.hash.replace('#', '')
  return SECTIONS.some((s) => s.id === hash) ? hash : 'about'
}

function Identity() {
  return (
    <div>
      <div className="display text-xl leading-tight">Oumar Tirera</div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ochre">
        AI/ML · Full-Stack
      </div>
      <div className="woven mt-4 w-28" aria-hidden="true" />
    </div>
  )
}

function NavList({ section }) {
  return (
    <nav className="flex flex-col gap-2" aria-label="Sections">
      {SECTIONS.map((item) => {
        const active = item.id === section
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active ? 'page' : undefined}
            className={
              active
                ? 'glass rounded-xl px-4 py-2.5 font-mono text-[14px] text-ochre'
                : 'rounded-xl px-4 py-2.5 font-mono text-[14px] text-paper/60 transition-colors hover:bg-white/5 hover:text-paper'
            }
          >
            {item.label}
          </a>
        )
      })}
    </nav>
  )
}

function SocialRow() {
  return (
    <div className="flex gap-3">
      {SOCIALS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          aria-label={label}
          className="glass-deep flex h-10 w-10 items-center justify-center rounded-xl text-paper/70 transition-colors hover:text-ochre"
        >
          <Icon className="h-4.5 w-4.5" />
        </a>
      ))}
    </div>
  )
}

export default function App() {
  const [section, setSection] = useState(currentSection)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onHash = () => {
      setSection(currentSection())
      setMenuOpen(false)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const View = SECTIONS.find((s) => s.id === section).view

  return (
    <div className="night-sky grain flex min-h-screen flex-col p-3 font-sans text-paper antialiased md:h-screen md:p-6 lg:p-8">
      <div className="glass-deep mx-auto flex min-h-0 w-full max-w-[1360px] flex-1 flex-col overflow-hidden rounded-[1.5rem] md:flex-row md:rounded-[2rem]">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:hidden">
          <div>
            <div className="display text-lg leading-tight">Oumar Tirera</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ochre">
              AI/ML · Full-Stack
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="glass flex h-10 w-10 items-center justify-center rounded-xl"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </header>

        {menuOpen && (
          <div className="border-b border-white/10 px-5 py-4 md:hidden">
            <NavList section={section} />
            <div className="mt-4">
              <SocialRow />
            </div>
          </div>
        )}

        {/* Sidebar */}
        <aside className="hidden w-[260px] shrink-0 flex-col justify-between border-r border-white/10 p-7 md:flex">
          <div className="flex flex-col gap-10">
            <Identity />
            <NavList section={section} />
          </div>
          <SocialRow />
        </aside>

        {/* Content */}
        <main className="scroll-area min-h-0 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={reduce ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="px-6 py-10 md:px-12 md:py-14"
            >
              <View />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
