import travelPreview from '../assets/previews/travel.jpg'
import hindsightPreview from '../assets/previews/hindsight.jpg'
import ephemerisPreview from '../assets/previews/ephemeris.jpg'
import netflixPreview from '../assets/previews/netflix.jpg'

/*
 * Single source of truth: the work rail on the home page and every
 * /work/:slug case study both read from here.
 *
 * Rule for this file: nothing gets written here that isn't true. No
 * invented metrics, no invented clients, no invented team sizes.
 */

export const projects = [
  {
    slug: 'hindsight',
    title: 'Hindsight',
    status: 'Live',
    timeline: '2026',
    role: 'Solo',
    tagline: 'A machine that guesses tomorrow in public, and keeps score.',
    summary:
      'Six falsifiable predictions a day — one hand-written rule, one logistic regression — committed before the outcome exists, so the record cannot be edited after the fact. Scored against a coin flip and the base rate, and it says so when it loses.',
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
        body: 'Six calls are generated each day and committed to git before the outcome exists. The commit timestamp is the seal — a prediction cannot be revised after the fact without the revision being part of the public record.',
      },
      {
        heading: 'Two predictors, side by side',
        body: 'One hand-written rule and one logistic regression make the same calls on the same days. The rule is the baseline that the model has to beat, which is the comparison most published accuracy numbers leave out.',
      },
      {
        heading: 'Scoring is automatic',
        body: 'A scheduled workflow resolves yesterday\'s calls against reality and updates the running record. No step in the loop requires me to be at a computer, which is also what stops me from tidying the results.',
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
          'The point of the project is an auditable track record. A model I can read the coefficients of tells me why a call was made, and on this amount of data a heavier model would mostly have given me more variance to explain.',
      },
      {
        choice: 'A hand-written rule running alongside',
        instead: 'reporting the model alone',
        because:
          'A model that cannot beat five lines of if-statements has not earned its place. Running both publicly means that comparison is permanent rather than something I check once and forget.',
      },
    ],

    outcomes: [
      'A public, timestamped record of every call made — including the wrong ones.',
      'Model and baseline scored against each other continuously, not once at training time.',
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
    status: 'Capstone',
    timeline: '2026',
    role: 'Solo — architecture, backend, frontend',
    tagline: 'Two planners, and the measurement that decides between them.',
    summary:
      'Travel planner built as a LangGraph state machine — a supervisor turns the budget into hard constraints, specialist desks pick flights, stays and places in parallel, and a critic can send the plan back. The deterministic pipeline it replaced is still in the repo as the control it is measured against.',
    preview: travelPreview,
    previewAlt: 'The Travel Desk interface, showing the trip prompt and the live source panel',
    links: { repo: 'https://github.com/Deadsunx/Ai-travel-Agent' },
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
        body: 'The deterministic pipeline the graph replaced was not deleted. It stays selectable per request, so both planners answer the same query and the comparison is reproducible. Without it, "the multi-agent version is better" is an assertion instead of a measurement.',
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
      'Runs with no API keys at all — every external source degrades to a labelled fallback instead of failing.',
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
      'End-to-end unsupervised pipeline that groups the Netflix catalogue by content similarity — TF-IDF over show metadata, dimensionality reduction, then K-Means, hierarchical and DBSCAN compared against each other.',
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
        body: 'TF-IDF output is high-dimensional and sparse, where distance stops being meaningful. Dimensionality reduction runs first so the clustering algorithms operate in a space where proximity actually corresponds to similarity.',
      },
      {
        heading: 'Three algorithms, compared',
        body: 'K-Means, hierarchical (Ward), and DBSCAN are run over the same reduced representation. They disagree, and the disagreement is the finding — each encodes a different assumption about what a cluster is.',
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
      { name: 'scikit-learn', why: 'TF-IDF, reduction, and all three clustering algorithms.' },
      { name: 'pandas', why: 'Cleaning and reshaping the catalogue.' },
      { name: 'matplotlib', why: 'Dendrograms and cluster plots — the actual output.' },
    ],
  },
]

/*
 * Built, but with nothing public to show. Listed honestly as text rather
 * than given a case-study page that would obviously be padding.
 */
export const alsoBuilt = [
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
