export default function Contact() {
  return (
    <footer id="contact" className="scroll-mt-16">
      <div className="woven" aria-hidden="true" />
      <div className="bg-indigo text-paper">
        <div className="mx-auto max-w-[1060px] px-6 py-20">
          <h2 className="display text-[clamp(2.2rem,6vw,4rem)]">
            Let&apos;s build something.
          </h2>
          <p className="mt-5 max-w-[520px] leading-relaxed text-paper/75">
            I&apos;m open to internships, collaborations, and interesting AI/ML
            projects. The fastest way to reach me is email.
          </p>
          <a
            href="mailto:oumartambatirera@gmail.com"
            className="mt-8 inline-block border-b-2 border-ochre pb-1 font-mono text-[15px] hover:border-paper"
          >
            oumartambatirera@gmail.com
          </a>

          <div className="mt-16 flex flex-col gap-3 border-t border-paper/25 pt-6 font-mono text-[13px] text-paper/70 sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Oumar Tirera</span>
            <div className="flex gap-6">
              <a
                href="https://github.com/Deadsunx"
                target="_blank"
                rel="noreferrer"
                className="hover:text-paper"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/oumar-tirera-5a7a7b16b"
                target="_blank"
                rel="noreferrer"
                className="hover:text-paper"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
