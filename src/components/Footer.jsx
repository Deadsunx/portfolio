import { Link } from 'react-router-dom'
import { GitHubIcon, LinkedInIcon, MailIcon, FileIcon } from '../icons.jsx'

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Deadsunx', Icon: GitHubIcon },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/oumar-tirera-5a7a7b16b',
    Icon: LinkedInIcon,
  },
  { label: 'Email', href: 'mailto:oumartambatirera@gmail.com', Icon: MailIcon },
  { label: 'Résumé', href: '/resume.pdf', Icon: FileIcon },
]

export function SocialRow({ className = '' }) {
  return (
    <div className={`flex gap-2.5 ${className}`}>
      {SOCIALS.map(({ label, href, Icon }) => {
        const external = !href.startsWith('mailto:')
        return (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            aria-label={label}
            className="glass-flat glass-hover flex h-11 w-11 items-center justify-center rounded-xl text-paper/70 hover:text-ochre"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        )
      })}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link to="/" className="display text-[15px]">
            Oumar Tirera
          </Link>
          <p className="mt-1.5 font-mono text-[12px] text-paper/55">
            Built with React, Tailwind, and a hand-written canvas. Greater Noida, India.
          </p>
        </div>
        <SocialRow />
      </div>
    </footer>
  )
}
