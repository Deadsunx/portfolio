import { Reveal } from './Reveal.jsx'

export default function SectionHead({ kicker, title, lead, className = '' }) {
  return (
    <div className={className}>
      <Reveal>
        <span className="label text-ochre">{kicker}</span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="display t-section mt-4 max-w-[18ch]">{title}</h2>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="woven mt-6 w-40" aria-hidden="true" />
      </Reveal>
      {lead && (
        <Reveal delay={0.18}>
          <p className="mt-7 max-w-[52ch] text-[16px] leading-relaxed text-paper/60">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
