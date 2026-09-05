/* Dates confirmed by Oumar, 2026-08-04. */
export const experience = [
  {
    org: 'Sharda University',
    role: 'B.Tech CSE — Artificial Intelligence & Machine Learning',
    period: '2024 — 2028',
    icon: 'grad',
    points: [
      'Specialisation in Artificial Intelligence & Machine Learning.',
      'Built the Agentic AI Travel Assistant as a project-based-learning capstone.',
      'Core coursework: object-oriented programming, DBMS, operating systems.',
    ],
  },
  {
    org: 'Personal projects',
    role: 'Designing, building, and shipping my own systems',
    period: '2025 — Present',
    icon: 'code',
    points: [
      'Kora — a retrieval system for OHADA business law, and the ablation study that judged it.',
      'Hindsight — a public prediction engine that scores its own calls daily.',
      'Strand — peer-to-peer file transfer over WebRTC, with no server in the middle.',
      'Ephemeris — a self-building archive running on scheduled automation.',
      'Netflix content clustering — an unsupervised NLP pipeline over the catalogue.',
      'This site — React, Tailwind v4, and a hand-built depth and motion system.',
    ],
  },
]

export const capabilities = [
  {
    icon: 'cluster',
    kicker: '01',
    title: 'Applied ML',
    body: 'Turning unlabelled data into something structured enough to act on — feature engineering, clustering, and evaluation that survives someone checking it.',
    stack: ['Python', 'scikit-learn', 'RAG', 'Evaluation'],
  },
  {
    icon: 'flow',
    kicker: '02',
    title: 'Agentic systems',
    body: 'Graph-structured LLM systems with explicit state and named nodes — and a baseline kept alongside them, so "the agent is better" is a number rather than an opinion.',
    stack: ['LangGraph', 'LangChain', 'Tool design', 'Evaluation'],
  },
  {
    icon: 'ship',
    kicker: '03',
    title: 'Shipping it',
    body: 'The part that decides whether any of the above gets used: the interface, the API, the automation, the deploy. A model nobody can reach is a notebook.',
    stack: ['React', 'Node.js', 'SQL', 'GitHub Actions'],
  },
]
