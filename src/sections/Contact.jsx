import { useState } from 'react'
import SectionHead from '../components/SectionHead.jsx'
import Depth from '../components/Depth.jsx'
import { ClipReveal } from '../components/Reveal.jsx'
import { CopyIcon, ArrowRightIcon } from '../icons.jsx'
import portrait from '../assets/portrait-face.jpg'

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
    <section id="contact" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <Depth level={1} className="layer">
        <div className="absolute bottom-[10%] left-1/2 h-[30vw] w-[46vw] -translate-x-1/2 rounded-full bg-indigo/18 blur-[120px]" />
      </Depth>

      <div className="relative mx-auto max-w-[1180px]">
        <SectionHead
          kicker="05 / Contact"
          title="Tell me what you're building."
          lead="Open to internships, freelance work, and collaborations — particularly anything where a model has to survive contact with real users."
        />

        {/* Curtain roll-up */}
        <ClipReveal from="top" className="mt-14">
          <div className="glass overflow-hidden rounded-[1.75rem]">
            <div className="flex flex-col gap-10 p-8 sm:p-10 lg:flex-row lg:items-center lg:gap-14">
              {/* One editorial appearance of the portrait, at the point of decision */}
              <div className="shrink-0">
                <img
                  src={portrait}
                  alt="Oumar Tirera"
                  loading="lazy"
                  className="h-[168px] w-[168px] rounded-[1.25rem] object-cover object-center sm:h-[200px] sm:w-[200px]"
                />
                <div className="woven mt-4 w-20" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/55">
                  Reach me directly
                </div>
                <a
                  href={`mailto:${EMAIL}`}
                  className="display mt-3 block break-all text-[clamp(1.15rem,3vw,1.9rem)] transition-colors hover:text-ochre"
                >
                  {EMAIL}
                </a>
                <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-paper/60">
                  I read everything. If you include what you&apos;re trying to build and what&apos;s
                  currently in the way, you&apos;ll get a more useful reply.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group flex items-center gap-2.5 rounded-full bg-ochre px-6 py-3.5 font-mono text-[14px] font-medium text-night transition-opacity hover:opacity-90"
                  >
                    Send an email
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="glass-deep flex items-center gap-2.5 rounded-full px-5 py-3.5 font-mono text-[13px] transition-colors hover:text-ochre"
                  >
                    <CopyIcon className="h-4 w-4" />
                    {copied ? 'Copied' : 'Copy address'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ClipReveal>
      </div>
    </section>
  )
}
