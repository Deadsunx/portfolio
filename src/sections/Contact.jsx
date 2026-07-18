import { useState } from 'react'
import { Heading } from './About.jsx'
import { CopyIcon, MailIcon } from '../icons.jsx'

const EMAIL = 'oumartambatirera@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy the address below:', EMAIL)
    }
  }

  return (
    <div className="flex flex-col gap-12">
      <div>
        <Heading>Get in touch</Heading>
        <p className="mt-6 text-paper/60">
          Have a project in mind, or just want to say hi?
        </p>
      </div>

      <div className="glass flex flex-col gap-8 rounded-3xl p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="glass-deep flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-ochre">
            <MailIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="display break-all text-xl md:text-2xl">{EMAIL}</div>
            <p className="mt-1.5 text-[14px] text-paper/60">
              I&apos;m open to internships, collaborations, and interesting AI/ML
              projects.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            type="button"
            onClick={copyEmail}
            className="glass-deep flex items-center gap-2.5 rounded-full px-5 py-3 font-mono text-[13px] transition-colors hover:text-ochre"
          >
            <CopyIcon className="h-4 w-4" />
            {copied ? 'Copied' : 'Copy email'}
          </button>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2.5 rounded-full bg-ochre px-5 py-3 font-mono text-[13px] font-medium text-night transition-opacity hover:opacity-85"
          >
            Send email →
          </a>
        </div>
      </div>
    </div>
  )
}
