import { motion } from 'framer-motion'

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  )
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  )
}

const socials = [
  { label: 'GitHub', href: 'https://github.com/Deadsunx', Icon: GitHubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/oumar-tirera-5a7a7b16b', Icon: LinkedInIcon },
  { label: 'Email', href: 'mailto:oumartambatirera@gmail.com', Icon: MailIcon },
]

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="scroll-mt-24"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 px-8 py-12 text-center shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Get In Touch</h2>
        <p className="max-w-md text-slate-400">
          I&apos;m open to internships, collaborations, and interesting AI/ML
          projects. Let&apos;s build something together.
        </p>
        <div className="mt-2 flex gap-4">
          {socials.map(({ label, href, Icon }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 backdrop-blur-xl transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </div>
      </div>

      <p className="mt-16 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Oumar Tirera. Built with React, Tailwind CSS
        &amp; Framer Motion.
      </p>
    </motion.section>
  )
}
