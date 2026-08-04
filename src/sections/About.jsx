import Depth from '../components/Depth.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { Reveal, Stagger, staggerItem } from '../components/Reveal.jsx'
import { motion } from 'framer-motion'
import { PinIcon } from '../icons.jsx'
import portrait from '../assets/portrait-face.jpg'

const expectations = [
  { title: 'Agentic by default', body: 'I design tool pipelines, not just prompts.' },
  { title: 'Deterministic where it matters', body: 'Reproducible, evaluated, checkable.' },
  { title: 'Plain about tradeoffs', body: 'I can tell you what I gave up and why.' },
]

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <Depth level={1} className="layer">
        <div className="absolute right-[8%] top-[18%] h-[26vw] w-[26vw] rounded-full bg-indigo-deep/25 blur-[110px]" />
      </Depth>

      <div className="relative mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[230px_1fr] lg:gap-20">
        {/* Sticky identity — present the whole time you're read about,
            at a fraction of the screen cost of a portrait card. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="flex items-center gap-4 lg:flex-col lg:items-start">
              <div className="glass shrink-0 rounded-full p-1.5">
                <img
                  src={portrait}
                  alt="Oumar Tirera"
                  width="88"
                  height="88"
                  loading="lazy"
                  className="h-[76px] w-[76px] rounded-full object-cover object-center sm:h-[88px] sm:w-[88px]"
                />
              </div>
              <div className="lg:mt-5">
                <div className="display text-[17px]">Oumar Tirera</div>
                <div className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/45">
                  <PinIcon className="h-3.5 w-3.5" />
                  Greater Noida
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="woven mt-6 hidden w-24 lg:block" aria-hidden="true" />
          </Reveal>
        </div>

        <div>
          <SectionHead kicker="01 / About" title="The short version." />

          <div className="mt-10 flex max-w-[58ch] flex-col gap-6 text-[17px] leading-relaxed text-paper/75">
            <Reveal delay={0.05}>
              <p>
                I&apos;m a B.Tech Computer Science student at Sharda University, specialising in
                Artificial Intelligence and Machine Learning, based in Greater Noida, India.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Most of what I build sits at the same seam: a model or a pipeline that has to
                produce something a person will actually rely on. That constraint is what
                interests me. It is the difference between a notebook that reports a good
                number and a system that behaves the same way on a Tuesday when nobody is
                watching.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                So I tend to work across the whole thing — the data, the model, the pipeline
                around it, and the interface someone touches. Not because I want to be a
                generalist, but because in every project so far the interesting failures have
                been at the joins.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Right now I&apos;m deep in LLM tool pipelines and evaluation — how you get a
                probabilistic component to behave predictably enough to build on.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-3" gap={0.1}>
            {expectations.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="glass-flat rounded-2xl px-5 py-5"
              >
                <div className="text-[15px] font-semibold leading-snug">{item.title}</div>
                <div className="mt-2 text-[13.5px] leading-relaxed text-paper/55">{item.body}</div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
