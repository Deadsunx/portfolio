import travelPreview from '../assets/previews/travel.jpg'
import hindsightPreview from '../assets/previews/hindsight.jpg'
import ephemerisPreview from '../assets/previews/ephemeris.jpg'
import netflixPreview from '../assets/previews/netflix.jpg'
import koraPreview from '../assets/previews/kora.jpg'
import strandPreview from '../assets/previews/strand.jpg'

/*
 * Single source of truth: the work rail on the home page and every
 * /work/:slug case study both read from here.
 *
 * Rule for this file: nothing gets written here that isn't true. No
 * invented metrics, no invented clients, no invented team sizes. Every
 * number below appears in the project's own repository or report.
 */

export const projects = [
  {
    slug: 'kora',
    title: 'Kora',
    status: 'Research',
    timeline: '2026',
    role: 'Solo — corpus, retrieval, evaluation, serving',
    tagline: 'A retrieval system for African business law — and the ablation study that refused to ship its own fine-tune.',
    summary:
      'Retrieval-augmented QA over the OHADA business law of 17 francophone African states. The deliverable is not a chatbot but an ablation table: which components actually earn their cost, in accuracy and in latency. Five of its six findings are negative.',
    preview: koraPreview,
    previewAlt: 'The Kora technical report, showing headline retrieval and citation metrics',
    links: {
      repo: 'https://github.com/Deadsunx/kora',
      live: 'https://deadsunx.github.io/kora/',
    },
    tags: ['Python', 'RAG', 'Evaluation'],
    accent: 'ochre',

    problem:
      'Almost every retrieval technique in use was built and evaluated in English, and the assumption is that it transfers. Legal French is a good place to check, because it breaks the assumption in specific ways: dense retrievers trained on English web text blur exactly the tokens that matter — article numbers, fixed terms of art, cross-references between texts. And a legal assistant that cannot cite its source, or will not say "I don\'t know", is worse than useless.',

    build: [
      {
        heading: 'The harness came first',
        body: 'The evaluation harness was built before any retrieval improvement — deliberately, and in that order. An improvement you cannot measure is a preference, not a result. What exists now is 3,056 articles parsed from source PDFs across 10 acts, 64 human-validated questions, 23 recorded runs and 252 tests, on a single 8 GiB laptop GPU.',
      },
      {
        heading: 'Every arrow is a switch',
        body: 'Parse → structure-aware chunking → hybrid retrieval → cross-encoder reranking → generation with citations and abstention. Each stage is a flag in a config file, so each stage can be turned off and measured against the others rather than argued about.',
      },
      {
        heading: 'Cite, or decline',
        body: 'Citation accuracy and abstention are first-class metrics, not afterthoughts. Across the gold set the base model fabricated no citations, presented no repealed article as current law, and left no answer uncited — and correctly declined 7 of the 8 questions the corpus cannot answer.',
      },
    ],

    diagram: 'rag',

    decisions: [
      {
        choice: 'Not shipping the QLoRA fine-tune',
        instead: 'shipping it, because every training metric said to',
        because:
          'The adapter hit 98.4% token accuracy at 0.027 loss. Abstention went to 8/8, latency fell 41%, answers got shorter. Citation recall fell 11.9 points and the answers stopped answering the question — it had learned to echo each article\'s opening sentence, because that is literally what the training targets were built from. Similarity to the cited article\'s opening went from 0.222 to 0.896. Every structural metric improved while quality collapsed, and a dashboard would have called it a successful fine-tune.',
      },
      {
        choice: 'Reading the model\'s actual replies',
        instead: 'trusting the evaluation numbers',
        because:
          'The agentic layer looked like a no-op: identical recall, 2.7× the latency. Reading the outputs explained it — the decomposer called 47 of 59 questions atomic, including 8 of the 9 multi-hop questions it exists to split. The verifier is its mirror image: it asked for more context on 55 of 59, improved none, and damaged one. The same habit caught table-of-contents contamination in the parser that both automated self-checks had passed.',
      },
      {
        choice: 'Reranking, and nothing else',
        instead: 'keeping the hybrid BM25 fusion and the wider candidate pool',
        because:
          'Reranking was the only component that earned its cost: +8.0 points of recall@5 for 205 ms. BM25 fusion was hypothesised in a config file before measurement, then refuted — its entire effect turned out to live in cross-act questions and nowhere else. A wider pool of 50 candidates was worse than 20 at the k that matters, because distractors got more chances to score into the top five than true positives had to be rescued.',
      },
    ],

    outcomes: [
      'recall@5 of 0.815 at 205 ms median — +8.0 points, +11% relative, over the frozen dense baseline.',
      'Zero fabricated citations and zero repealed articles cited as law across the gold set; 7 of 8 unanswerable questions correctly declined.',
      'Six findings, five of them negative — the fine-tune, both agent layers and BM25 fusion were each measured and left unshipped.',
      'The whole project written up as a public technical report, with every number linked to the run that produced it.',
    ],

    stack: [
      { name: 'multilingual-e5-base', why: 'Dense retrieval that survives legal French.' },
      { name: 'bge-reranker-v2-m3', why: 'Cross-encoder — the one component that earned its latency.' },
      { name: 'Qwen3-4B, 4-bit NF4', why: 'Generation inside 8 GiB of laptop VRAM.' },
      { name: 'QLoRA', why: 'The fine-tune that was measured, and then rejected.' },
      { name: 'FastAPI + SSE', why: 'Streaming service; generation serialised behind a lock.' },
      { name: 'Config-driven ablations', why: 'Every stage is a switch, so every stage is measurable.' },
    ],
  },

  {
    slug: 'hindsight',
    title: 'Hindsight',
    status: 'Live',
    timeline: '2026',
    role: 'Solo',
    tagline: 'A machine that guesses tomorrow in public, and keeps score.',
    summary:
      'Daily falsifiable forecasts from a walk-forward logistic regression, kept leak-proof by test and committed before the outcome exists. Scored against a coin flip and the base rate, and it says so when it loses.',
    preview: hindsightPreview,
    previewAlt: 'The Hindsight register, listing the day’s sealed predictions and their odds',
    links: {
      repo: 'https://github.com/Deadsunx/hindsight',
      live: 'https://hindsight-deadsunx.vercel.app',
    },
    tags: ['Python', 'scikit-learn', 'GitHub Actions'],
    accent: 'indigo',

    problem:
      'Every model reports an accuracy number, and almost none of them can be checked. The number comes from a test split the author chose, on a run the author kept. If the honest question is "does this thing actually predict anything", then the evaluation has to be one the author cannot quietly rerun.',

    build: [
      {
        heading: 'Predictions are sealed, not saved',
        body: 'Calls are committed to git before the outcome exists. The commit timestamp is the seal — a prediction cannot be revised after the fact without the revision being part of the public record.',
      },
      {
        heading: 'Walk-forward, and leak-proof by test',
        body: 'The model only ever trains on data that existed before the day it is predicting, and that property is enforced by a test rather than by care. Lookahead leakage is the failure mode that makes a forecasting model look brilliant and be worthless, so it is checked automatically rather than assumed.',
      },
      {
        heading: 'Scored against things that are hard to beat',
        body: 'A coin flip and the base rate run alongside the model permanently. A forecaster that cannot beat the base rate has not earned attention, and the site reports that comparison whether or not it flatters the model.',
      },
    ],

    diagram: 'ledger',

    decisions: [
      {
        choice: 'Git commits as the tamper-evident log',
        instead: 'a database with a created_at column',
        because:
          'A timestamp column is written by the same code that could rewrite it. Commit history is public, append-only in practice, and needs no infrastructure. The credibility of the whole project rests on that one property, so it was worth building around.',
      },
      {
        choice: 'Logistic regression',
        instead: 'a gradient-boosted or neural model',
        because:
          'The point of the project is an auditable track record. A model whose coefficients I can read tells me why a call was made, and on this amount of data a heavier model would mostly have given me more variance to explain.',
      },
      {
        choice: 'Enforcing the walk-forward split in a test',
        instead: 'being careful about it',
        because:
          'Lookahead leakage does not announce itself — it shows up as suspiciously good accuracy that quietly evaporates in production. Being careful is not a control. A test that fails when the training window crosses the prediction date is.',
      },
    ],

    outcomes: [
      'A public, timestamped record of every call made — including the wrong ones.',
      'Model, coin flip and base rate scored against each other continuously, not once at training time.',
      'Runs entirely on scheduled automation; no manual step can touch the record.',
    ],

    stack: [
      { name: 'Python', why: 'Prediction logic and scoring.' },
      { name: 'scikit-learn', why: 'Logistic regression — small, inspectable, enough.' },
      { name: 'GitHub Actions', why: 'The daily loop, and the thing that makes it unattended.' },
      { name: 'Git history', why: 'The seal. This is the actual trust mechanism.' },
      { name: 'Vercel', why: 'Static public register.' },
    ],
  },

  {
    slug: 'travel-assistant',
    title: 'Agentic AI Travel Assistant',
    status: 'Live',
    timeline: '2026',
    role: 'Solo — architecture, backend, frontend',
    tagline: 'Two planners, and the measurement that decides between them.',
    summary:
      'Travel planner built as a LangGraph state machine — a supervisor turns the budget into hard constraints, specialist desks pick flights, stays and places in parallel, and a critic can send the plan back. The deterministic pipeline it replaced is still in the repo as the control it is measured against.',
    preview: travelPreview,
    previewAlt: 'The deployed Travel Desk, showing the trip prompt and the live source panel',
    links: {
      repo: 'https://github.com/Deadsunx/Ai-travel-Agent',
      live: 'https://ai-travel-agent-delta-eight.vercel.app',
    },
    tags: ['Python', 'LangGraph', 'FastAPI'],
    accent: 'ochre',

    problem:
      'Ask a general-purpose chatbot to plan a trip and it produces something that reads perfectly and books nothing — flights that do not exist, prices from the training set, and a budget it quietly ignores. The harder problem sits underneath that one: once you add agency back to fix it, how do you show the agent is actually better rather than just more complicated?',

    build: [
      {
        heading: 'A graph, with named parts',
        body: 'The default planner is a LangGraph state machine. A supervisor turns the stated budget into hard constraints; three specialist desks — flights, stays, places — run in parallel and each explains its pick; a critic checks the assembled plan against those constraints and can send it back for one bounded revision round with a specific instruction. Explicit state, named nodes, and objections that live in rules rather than a prompt.',
      },
      {
        heading: 'The old planner is the control',
        body: 'The deterministic pipeline the graph replaced was not deleted. It stays selectable per request — the deployed app exposes the choice in its own header — so both planners answer the same query and the comparison is reproducible. Without it, "the multi-agent version is better" is an assertion instead of a measurement.',
      },
      {
        heading: 'Every source can fail safely',
        body: 'Flights, hotels, places and search each have a mock fallback. Three of the four are rate-limited free tiers, so a missing key or a 429 degrades to estimated data and labels it as estimated, rather than presenting a guess as a live price. It also means the whole stack — and the test suite — runs with no keys at all.',
      },
    ],

    diagram: 'graph',

    decisions: [
      {
        choice: 'A LangGraph state machine, benchmarked against the pipeline',
        instead: 'shipping the graph and deleting the thing it replaced',
        because:
          'The graph wins the golden-query comparison 15/16 against 13/16 — it fixes both duplicate-restaurant failures and keeps a plan inside its budget — and it costs about 17% more latency. Neither of those numbers exists if the pipeline is deleted. Keeping the baseline is what converts a preference into a result, including on the query where the graph does not win.',
      },
      {
        choice: 'Killing the original ReAct loop',
        instead: 'tuning its prompt until it behaved',
        because:
          'The first version let the model choose tools in a loop. It worked, and it was untestable: the same query took different paths on different runs, so a regression was indistinguishable from the model having a different idea that day. Moving to a deterministic pipeline first made the system cheap to test — which is what made the next step measurable rather than a matter of taste.',
      },
      {
        choice: 'The critic as unit-testable rules',
        instead: 'a "check this plan" prompt',
        because:
          'A critic whose objections live in a prompt can only be evaluated by reading its output and agreeing with it. Rules can be asserted against directly, so the revision loop is covered by the same offline test suite as everything else, and a change to what counts as a bad plan shows up as a failing test.',
      },
    ],

    outcomes: [
      'Graph planner beats the pipeline 15/16 to 13/16 on golden queries, at roughly 17% more latency — both planners still selectable per request.',
      '129 tests covering the critic rules, the revision loop, graph construction and state, telemetry, and planner parity. No network, no services, running in CI on every push.',
      'Eval harness scores end-to-end runs without an LLM judge, including adversarial cases: an impossible budget, a 14-day trip, and deliberately conflicting interests.',
      'Deployed and publicly reachable, running against a hosted model because the target cannot run a local one.',
    ],

    stack: [
      { name: 'LangGraph', why: 'The graph planner — explicit state and named nodes, not a loop.' },
      { name: 'FastAPI', why: 'Backend and the SSE stream the answer arrives on.' },
      { name: 'Python 3.11', why: 'Planners, tools, tests, and the eval harness.' },
      { name: 'Next.js 14', why: 'App Router frontend; the itinerary renders as it is written.' },
      { name: 'PostgreSQL + Redis', why: 'Itineraries and sessions; caching and rate limiting.' },
      { name: 'Docker Compose', why: 'One command brings the whole stack up, keys optional.' },
    ],
  },

  {
    slug: 'strand',
    title: 'Strand',
    status: 'Live',
    timeline: '2026',
    role: 'Solo — backend hardening, frontend, transfer core',
    tagline: 'Files that never touch a server.',
    summary:
      'Peer-to-peer file sharing over WebRTC — no cloud storage, no size limit, encrypted end to end by the browser’s own transport. A GPL-3.0 rebuild of DropSilk with a hardened backend and a from-scratch React frontend on a headless transfer core.',
    preview: strandPreview,
    previewAlt: 'The Strand interface, showing the peer-to-peer connection and flight code entry',
    links: {
      repo: 'https://github.com/Deadsunx/strand',
      live: 'https://strand-silk.vercel.app',
    },
    tags: ['TypeScript', 'WebRTC', 'Bun'],
    accent: 'indigo',

    problem:
      'Sending someone a large file normally means uploading it to a third party first, waiting, and trusting them with the contents. The transfer is the easy part; the hard part is that the obvious architecture — a server in the middle — is the one that costs money at scale and holds data it has no reason to hold.',

    build: [
      {
        heading: 'The server never sees the file',
        body: 'The backend does signalling only: it introduces two browsers to each other and then gets out of the way. Once the peer connection is established the bytes travel directly between devices, encrypted by WebRTC’s transport. Chat and screen sharing ride the same connection.',
      },
      {
        heading: 'A headless transfer core',
        body: 'The transfer logic lives in `src/core` with no React and no DOM — connection state, chunking, backpressure and the protocol are all framework-agnostic, with the React app sitting on top as one possible consumer. The part that is hard to get right is the part that is easiest to test.',
      },
      {
        heading: 'Honest about the network',
        body: 'Two devices on the same machine or LAN connect directly. Cross-network peers need a TURN relay, and that is documented rather than hidden — as is the cold-start delay on free hosting tiers, which the demo warns about before you hit it.',
      },
    ],

    diagram: 'p2p',

    decisions: [
      {
        choice: 'A headless core with React on top',
        instead: 'wiring WebRTC directly into components',
        because:
          'Connection state, chunking and backpressure have nothing to do with rendering, and burying them in components makes both harder to reason about. Separated, the transfer core can be tested without a browser and reused by a different frontend — and the React layer stays small enough to read.',
      },
      {
        choice: 'Staying wire-compatible with the original backend protocol',
        instead: 'designing a cleaner protocol of my own',
        because:
          'This is a rebuild of an existing GPL project. Keeping the protocol identical meant the new frontend could be developed against the known-good original backend, so any bug was unambiguously mine. A better protocol would have made every failure ambiguous during the one phase where I needed certainty.',
      },
      {
        choice: 'GPL-3.0 with the derivation stated up front',
        instead: 'relicensing quietly',
        because:
          'Strand is a derivative of DropSilk, which is GPL-3.0. That obliges the same licence and a clear record of what changed — and it belongs in the README\'s opening, not a footnote. Getting licensing right is part of the work, not paperwork attached to it.',
      },
    ],

    outcomes: [
      'Files transfer directly between devices — no upload step, no server-side storage, no size ceiling imposed by a host.',
      'Transfer core runs with no React and no DOM, so the protocol can be exercised outside a browser.',
      'Whole stack — frontend, signalling backend, Postgres — comes up with one Docker command.',
      'Live and usable now, with the free-tier cold start called out rather than papered over.',
    ],

    stack: [
      { name: 'WebRTC', why: 'The direct peer channel, and the encryption that comes with it.' },
      { name: 'React 19 + TypeScript', why: 'Frontend, strict mode, on top of a headless core.' },
      { name: 'Bun + Hono', why: 'Signalling backend — fast to start, small to reason about.' },
      { name: 'PostgreSQL (Kysely)', why: 'Flight state, typed end to end.' },
      { name: 'Cloudflare TURN', why: 'Relay for peers that cannot reach each other directly.' },
      { name: 'Docker Compose', why: 'The entire stack in one command.' },
    ],
  },

  {
    slug: 'ephemeris',
    title: 'Ephemeris',
    status: 'Live',
    timeline: '2026',
    role: 'Solo',
    tagline: 'A dataset that builds itself, whether my laptop is on or not.',
    summary:
      'A scheduled workflow archives four free sources every day — crypto prices, a quote, NASA’s picture of the day, and a car-news headline — accumulating a time series nobody has to remember to collect.',
    preview: ephemerisPreview,
    previewAlt: 'The Ephemeris daily record, showing the date, star field, and reading panels',
    links: {
      repo: 'https://github.com/Deadsunx/daily-ephemeris',
      live: 'https://daily-ephemeris.vercel.app',
    },
    tags: ['Python', 'GitHub Actions', 'APIs'],
    accent: 'indigo',

    problem:
      'Time-series data is the one kind you cannot collect retroactively. If you want a year of daily snapshots, the only way to have it next year is to have started this year — and any collection process that depends on someone remembering will have gaps in it.',

    build: [
      {
        heading: 'Four sources, one schedule',
        body: 'A single scheduled job pulls from four independent free APIs each day and writes the results into a dated record. Sources were chosen for being free and stable rather than interesting, because the archive only has value if it runs uninterrupted.',
      },
      {
        heading: 'Failure of one is not failure of all',
        body: 'Each source is fetched independently, so an API being down costs that day\'s entry for that source and nothing else. A partial day is still a usable day.',
      },
      {
        heading: 'The archive is the product',
        body: 'The site renders the accumulated record — but the record itself is plain files in the repository, readable by anything, dependent on no running service.',
      },
    ],

    diagram: 'ingest',

    decisions: [
      {
        choice: 'Scheduled CI as the runtime',
        instead: 'a server or a cron job on my machine',
        because:
          'A daily archive whose reliability depends on my laptop being open is a daily archive with holes in it. CI runs on someone else\'s always-on infrastructure, free at this scale, and its run history doubles as a log of what happened.',
      },
      {
        choice: 'Flat files in the repository',
        instead: 'a hosted database',
        because:
          'The value here is longevity, not query performance. Files in git survive services shutting down, cost nothing, and can be read by any tool in twenty years. A managed database would have been faster to query and much easier to lose.',
      },
      {
        choice: 'Only free, no-auth-heavy sources',
        instead: 'richer paid data',
        because:
          'A credential that expires is a silent failure that surfaces months later as a hole in the archive. Boring sources keep running.',
      },
    ],

    outcomes: [
      'A growing daily archive that accumulates without intervention.',
      'Independent source failures degrade one entry, never the run.',
      'Zero running cost and zero maintenance to date.',
    ],

    stack: [
      { name: 'Python', why: 'Fetching, parsing, and writing the daily record.' },
      { name: 'GitHub Actions', why: 'The always-on scheduler and the run log.' },
      { name: 'Public APIs', why: 'Four independent free sources.' },
      { name: 'Vercel', why: 'Renders the archive as a browsable record.' },
    ],
  },

  {
    slug: 'netflix-clustering',
    title: 'Netflix Content Clustering',
    status: 'Machine Learning',
    role: 'Solo',
    tagline: 'Grouping a catalogue nobody labelled.',
    summary:
      'End-to-end unsupervised pipeline that groups the Netflix catalogue by content similarity — TF-IDF over show metadata, TruncatedSVD, then K-Means, Agglomerative and DBSCAN compared against each other.',
    preview: netflixPreview,
    previewAlt: 'Ward hierarchical clustering dendrogram produced by the notebook',
    previewClass: 'plot-dark',
    links: { repo: 'https://github.com/Deadsunx/Netflix-project' },
    tags: ['Python', 'scikit-learn', 'NLP'],
    accent: 'ochre',

    problem:
      'A catalogue arrives with genre tags that were written for marketing, not for similarity — broad, overlapping, and inconsistently applied. The question is whether the text that describes each title carries enough signal to recover a better grouping without any labels at all.',

    build: [
      {
        heading: 'Text into vectors',
        body: 'Show metadata — description, cast, director, listed genres, country — is combined into a single document per title and vectorised with TF-IDF, so rare and distinguishing terms count for more than common ones.',
      },
      {
        heading: 'Reduce before clustering',
        body: 'TF-IDF output is high-dimensional and sparse, where distance stops being meaningful. TruncatedSVD runs first so the clustering algorithms operate in a space where proximity actually corresponds to similarity.',
      },
      {
        heading: 'Three algorithms, compared',
        body: 'K-Means, Agglomerative (Ward), and DBSCAN are run over the same reduced representation. They disagree, and the disagreement is the finding — each encodes a different assumption about what a cluster is.',
      },
    ],

    diagram: 'cluster',

    decisions: [
      {
        choice: 'Comparing three algorithms',
        instead: 'tuning one until it looked good',
        because:
          'Unsupervised results have no accuracy score to appeal to. Running methods with different assumptions — centroid, linkage, density — and reporting where they agree is a more honest form of evidence than picking the one whose plot looked cleanest.',
      },
      {
        choice: 'TF-IDF',
        instead: 'sentence embeddings from a language model',
        because:
          'TF-IDF is inspectable — I can read which terms drove a cluster and say why two titles landed together. For a project whose output is an explanation rather than a service, that traceability was worth more than the accuracy an embedding model would likely have added.',
      },
      {
        choice: 'Reduction before clustering',
        instead: 'clustering the raw sparse matrix',
        because:
          'In high-dimensional sparse space nearly all pairwise distances converge, which quietly makes distance-based clustering meaningless. Reducing first is what makes the output interpretable rather than noise with cluster labels on it.',
      },
    ],

    outcomes: [
      'A full unsupervised pipeline from raw catalogue metadata to labelled groups.',
      'Three clustering families compared on identical inputs rather than one tuned in isolation.',
      'Cluster membership explainable back to the terms that produced it.',
    ],

    stack: [
      { name: 'Python', why: 'The whole pipeline.' },
      { name: 'scikit-learn', why: 'TF-IDF, TruncatedSVD, and all three clustering algorithms.' },
      { name: 'pandas', why: 'Cleaning and reshaping the catalogue.' },
      { name: 'matplotlib', why: 'Dendrograms and cluster plots — the actual output.' },
    ],
  },
]

/*
 * Real, public, and linked — but without the depth to carry a page of their
 * own. Listed as text rather than padded into case studies.
 */
export const alsoBuilt = [
  {
    title: 'MarkItDown Studio',
    note: 'Windows desktop app and web app that converts PDFs, Office files, HTML, images and URLs to clean Markdown. The server binds to loopback inside the same process, so nothing leaves the machine.',
    tags: ['Python', 'FastAPI', 'Desktop'],
    repo: 'https://github.com/Deadsunx/markitdown-studio',
  },
  {
    title: 'FORGEWEB',
    note: 'Bilingual one-page studio site, backed by an unusually complete test suite — WCAG 2.1 AA contrast and focus audits, dead-code detection, serverless form validation, and Open Graph checks.',
    tags: ['React', 'Vite', 'a11y'],
    repo: 'https://github.com/Deadsunx/forgeweb',
    live: 'https://forgeweb-hazel.vercel.app',
  },
  {
    title: 'Daily News',
    note: 'A static news site that publishes a fresh edition every morning from scheduled JSON drops. No server, no database, no framework — a tiny Node build script and two deploy targets.',
    tags: ['Node', 'Static', 'Automation'],
    repo: 'https://github.com/Deadsunx/daily-news',
    live: 'https://daily-news-steel.vercel.app',
  },
  {
    title: 'SiniTech Dashboard',
    note: 'Prototype business dashboard for a school-management platform — enrolment, fees, and staff views in one place.',
    tags: ['React', 'Full-stack'],
  },
  {
    title: 'Cyber Threat Classification',
    note: 'Academic literature review and classification modelling, comparing feature sets across published detection approaches.',
    tags: ['ML', 'Research'],
  },
]

export const bySlug = (slug) => projects.find((p) => p.slug === slug)
