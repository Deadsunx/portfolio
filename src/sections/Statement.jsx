import { LitText } from '../components/SplitText.jsx'
import Depth from '../components/Depth.jsx'

/* One line, lit word by word as it crosses the viewport — reading it and
   scrolling it are the same gesture. Used once, so it stays an event. */
export default function Statement() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-40" aria-label="Statement">
      <Depth level={1} className="layer">
        <div className="absolute inset-x-0 top-1/2 h-[30vh] -translate-y-1/2 bg-[radial-gradient(60%_100%_at_50%_50%,rgba(69,83,184,0.22),transparent_70%)]" />
      </Depth>

      <div className="relative mx-auto max-w-[1000px] text-center">
        <LitText
          text="A model nobody can reach is a notebook. Most of my work is the distance between those two things."
          className="display-tight text-[clamp(1.6rem,4.2vw,3rem)] leading-[1.25] text-paper"
        />
      </div>
    </section>
  )
}
