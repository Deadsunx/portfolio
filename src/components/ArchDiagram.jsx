import { motion } from 'framer-motion'
import { useMotionBudget } from '../lib/env.js'

/*
 * Scroll-drawn architecture diagrams. Hand-authored per project rather
 * than generated, because the shape of the system is the point.
 */
const DIAGRAMS = {
  pipeline: {
    caption: 'Fixed stages. Each one has a defined input and output, so a failure has an address.',
    nodes: [
      { label: 'Request', sub: 'natural language' },
      { label: 'Resolve', sub: 'dates · cities' },
      { label: 'Search', sub: 'flights · hotels' },
      { label: 'Compose', sub: 'model, streamed' },
      { label: 'Itinerary', sub: 'sourced', accent: true },
    ],
  },
  ledger: {
    caption: 'The commit happens before the outcome exists. That ordering is the whole project.',
    nodes: [
      { label: 'Predict', sub: 'rule + model' },
      { label: 'Seal', sub: 'git commit', accent: true },
      { label: 'Wait', sub: 'reality happens' },
      { label: 'Resolve', sub: 'against outcome' },
      { label: 'Score', sub: 'public record' },
    ],
  },
  ingest: {
    caption: 'Four independent fetches. One failing costs one entry, never the run.',
    nodes: [
      { label: 'Four APIs', sub: 'free · no auth' },
      { label: 'Scheduled job', sub: 'CI, daily', accent: true },
      { label: 'Dated record', sub: 'flat files in git' },
      { label: 'Rendered', sub: 'browsable archive' },
    ],
  },
  cluster: {
    caption: 'Reduction happens before clustering — otherwise distance stops meaning anything.',
    nodes: [
      { label: 'Metadata', sub: 'cast · genre · text' },
      { label: 'TF-IDF', sub: 'sparse vectors' },
      { label: 'Reduce', sub: 'dense space' },
      { label: 'Cluster', sub: 'K-Means · Ward · DBSCAN', accent: true },
      { label: 'Compare', sub: 'where they agree' },
    ],
  },
}

const NODE_W = 160
const NODE_H = 88
const GAP = 44

export default function ArchDiagram({ kind }) {
  const diagram = DIAGRAMS[kind]
  const { reduced } = useMotionBudget()
  if (!diagram) return null

  const { nodes, caption } = diagram
  const width = nodes.length * NODE_W + (nodes.length - 1) * GAP
  const height = NODE_H + 24
  const y = 12

  return (
    <figure className="my-2">
      <div className="scroll-area -mx-1 overflow-x-auto px-1 pb-3">
        <motion.svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={`Architecture: ${nodes.map((n) => n.label).join(' then ')}. ${caption}`}
          className="h-auto min-w-[680px] max-w-full"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '-15% 0px' }}
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.14 } } }}
        >
          {nodes.map((node, i) => {
            const x = i * (NODE_W + GAP)
            return (
              <motion.g
                key={node.label}
                variants={
                  reduced
                    ? {}
                    : {
                        hidden: { opacity: 0, y: 14 },
                        shown: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                        },
                      }
                }
              >
                <rect
                  x={x}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="14"
                  fill={node.accent ? 'rgba(217,164,65,0.10)' : 'rgba(255,255,255,0.035)'}
                  stroke={node.accent ? 'rgba(217,164,65,0.45)' : 'rgba(255,255,255,0.14)'}
                  strokeWidth="1"
                />
                <text
                  x={x + NODE_W / 2}
                  y={y + 36}
                  textAnchor="middle"
                  fill={node.accent ? '#d9a441' : '#f2f1ec'}
                  fontSize="15"
                  fontWeight="600"
                  fontFamily="Archivo, system-ui, sans-serif"
                >
                  {node.label}
                </text>
                <text
                  x={x + NODE_W / 2}
                  y={y + 58}
                  textAnchor="middle"
                  fill="rgba(242,241,236,0.62)"
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  {node.sub}
                </text>

                {i < nodes.length - 1 && (
                  <motion.path
                    d={`M ${x + NODE_W + 6} ${y + NODE_H / 2} H ${x + NODE_W + GAP - 12}`}
                    stroke="rgba(143,155,239,0.6)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    markerEnd="url(#arrow)"
                    variants={
                      reduced
                        ? {}
                        : {
                            hidden: { pathLength: 0, opacity: 0 },
                            shown: {
                              pathLength: 1,
                              opacity: 1,
                              transition: { duration: 0.4, ease: 'easeOut' },
                            },
                          }
                    }
                  />
                )}
              </motion.g>
            )
          })}

          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="rgba(143,155,239,0.8)" />
            </marker>
          </defs>
        </motion.svg>
      </div>
      <figcaption className="mt-2 font-mono text-[12px] leading-relaxed text-paper/55">
        {caption}
      </figcaption>
    </figure>
  )
}
