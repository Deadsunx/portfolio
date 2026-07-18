export default function Contact() {
  return (
    <footer id="contact" className="scroll-mt-24 pb-16 pt-14">
      <div className="glass-deep overflow-hidden rounded-[2rem]">
        <div className="woven" aria-hidden="true" />
        <div className="px-8 py-14 sm:px-12">
          <h2 className="display text-[clamp(2rem,5.5vw,3.6rem)]">
            Let&apos;s build something.
          </h2>
          <p className="mt-5 max-w-[520px] leading-relaxed text-paper/70">
            I&apos;m open to internships, collaborations, and interesting AI/ML
            projects. The fastest way to reach me is email.
          </p>
          <a
            href="mailto:oumartambatirera@gmail.com"
            className="mt-8 inline-block border-b-2 border-ochre pb-1 font-mono text-[15px] hover:border-paper"
          >
            oumartambatirera@gmail.com
          </a>

          <div className="mt-14 flex flex-col gap-3 border-t border-paper/15 pt-6 font-mono text-[13px] text-paper/60 sm:flex-row sm:justify-between">
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
