# Portfolio Redesign — Plan

**Status:** proposal only. Nothing has been built or changed. Waiting for your go.
**Written:** 2026-08-04
**Repo:** `C:\Users\oumar\Documents\Personal\Portofolio` → `Deadsunx/portfolio` → Vercel

---

## 0. Bottom line first

The current site is an **app shell**: one rounded window, fixed sidebar, four hash-routed panes, inner scroll. That structure is the single biggest thing standing between you and a cinematic site — a fixed frame with an internal scroll pane physically cannot do pinned sections, parallax depth, or scroll-scrubbed storytelling. The frame eats the stage.

So the redesign is an architecture change, not a reskin:

| | Now | After |
|---|---|---|
| Structure | App window + sidebar + inner scroll | Full-page cinematic scroll + minimal floating nav |
| Routing | Hash panes (`#about`) | Real routes — `/` and `/work/:slug` |
| Projects | 6 cards, no detail | 6 cards → 6 dedicated case-study pages |
| Motion | Fade between panes | Depth parallax, pinned scrubs, reveals, shared-element morph |
| Identity | "AI/ML · Full-Stack" tagline | AI/ML engineer who ships the whole system (~60/40) |

**Kept from the current site** (your ask): the Experience timeline, the About content, the liquid-glass material, the palette (`#070910` / paper / indigo / ochre), the woven strip motif, Archivo + IBM Plex Mono.

**The picture:** keep it, but demote it. Reasoning in §5.

---

## 1. Asset audit

Required by the design skill before any code. Every image inspected.

| Asset | Size | Format | Background | Verdict |
|---|---|---|---|---|
| `src/assets/portrait.jpeg` | 1080×972 | JPEG, no alpha | Real scene | **Keep background.** It sits inside a framed card, so the background is part of the photo. Only needs a cutout if it becomes a floating hero figure — which I am not recommending. Note it's near-square, so the current `aspect-[4/5]` crop is already cutting it; a small avatar crop is safer. |
| `previews/travel.jpg` | 1000×625 | JPEG | UI screenshot | **Keep.** The background *is* the content. |
| `previews/hindsight.jpg` | 1000×625 | JPEG | UI screenshot | **Keep.** |
| `previews/ephemeris.jpg` | 1000×625 | JPEG | UI screenshot | **Keep.** |
| `previews/netflix.jpg` | 1000×494 | JPEG | White matplotlib canvas | **Keep**, but the current `.plot-dark` CSS invert is a hack — it flips the whole image including text antialiasing. Better: regenerate the dendrogram from the notebook with a dark matplotlib style so the real colours survive. ~10 min of work. |

**Compositional hierarchy** (skill rule — assets must not all be the same size):
- **Hero object** = the generated point-field canvas, 100vw, depth-3. Not a photo.
- **Work previews** = 40–55vw on the home rail, depth-2.
- **Portrait** = ~5vw avatar in About, ~20vw editorial in Contact. Deliberately small. Depth-4.
- **Grain + vignette** = full bleed, depth-5.

**Assets that don't exist yet and are needed:**
1. SiniTech Dashboard — no repo, no deploy, no screenshot. Its case-study page will be thin.
2. Cyber Threat Classification — same.
3. `favicon.svg` / `apple-touch-icon` — `index.html` currently has none.
4. `og-image.png` (1200×630) — none. This is what LinkedIn and WhatsApp render when someone shares your link. Right now they render a blank card. For a site whose whole job is recruiter reach, this is the highest-value 30 minutes in the plan.

---

## 2. Three design directions

### A — "Latent Space" ← recommended

A dark observatory. The AI/ML identity is carried by a **living embedding field**: a canvas of ~90 points that drift, connect to nearest neighbours, and *reorganise as you scroll* — scattered noise in the hero, pulling into distinct clusters at the ML section, collapsing into a single traced path at the work rail, dissolving at contact.

Why it wins:
- It is literally what your Netflix clustering project does. The background isn't decoration, it's a thesis.
- Pure 2D canvas — no WebGL, no 3D models, no heavy dependency. ~4KB of code.
- It reads as "engineer" not "creative agency". A recruiter sees restraint.
- The woven strip motif stays as the human counterweight, so it never becomes generic AI-grid wallpaper.

Risk: point fields are common enough that execution is everything. The scroll-linked *reorganisation* is what makes it not-generic; a static particle background would be.

### B — "The Pipeline"

The whole page is one scrubbed data pipeline: raw input at the top → tokenised → embedded → model → output. Each section is a stage, and a single artifact travels between sections (the skill's inter-section floating product pattern).

Higher concept ceiling, higher risk: it's a strong metaphor that has to be sustained for the entire page or it reads as half-finished. Also the most build time.

### C — "Terminal Cinema"

Monospace, near-black, boot-sequence typography. Text-driven, very fast, very "systems engineer".

Fastest to build, most credible to a hardcore engineering audience, weakest to clients and to non-technical recruiters — and it would mean dropping the glass you explicitly asked to keep.

**Recommendation: A, with C's typographic discipline.** Cinematic surface, engineer's restraint. B's travelling-artifact trick gets borrowed for one transition only (work rail → project page).

---

## 3. The recruiter constraint

This is the part that overrides everything aesthetic. A recruiter gives a portfolio 20–40 seconds on a laptop, often on hotel wifi, often on a phone. So:

1. **No loading gate.** No "enter" screen, no 3-second intro animation. Hero content is readable at first paint.
2. **The claim is above the fold, in text.** Name, what you do, proof, and two buttons — Résumé and Email — before any scroll.
3. **No scroll-jacking.** Pinned sections and scrubs, yes. Hijacked scroll velocity, no. It breaks trackpads and it makes people leave.
4. **Persistent CTA.** A small floating "Résumé · Email" pill that never leaves the viewport.
5. **Mobile gets the story, not the effects.** `pointer: coarse` → parallax off, particle count cut ~60%, pins become normal stacked sections.
6. **Everything survives `prefers-reduced-motion`.** Reveals become instant, the canvas becomes a static gradient. Zero content is animation-gated.
7. **Honesty.** You're a student. No invented metrics, no fake clients, no "led a team of". Independent projects are labelled independent projects. Where a real number exists (prediction counts, dataset rows, catalogue size) we use it; where it doesn't, we describe the system instead of inflating it.

Cinematic and fast are not in tension here — they're in tension only if the cinema is *load-bearing*. It won't be.

---

## 4. Home page — section by section

Every section gets ≥3 depth layers, per the skill's depth model (0 far bg → 5 foreground FX).

### 4.1 Hero
- **Depth 0** — `night-sky` gradient wash, blurred.
- **Depth 1** — two slow indigo/ochre glow blobs, 20s drift.
- **Depth 3** — the point field, scattered state.
- **Depth 4** — the type:
  - Eyebrow (mono, ochre): `AI/ML ENGINEER · GREATER NOIDA`
  - Headline, split-converge animation, words entering from alternating sides:
    **"I build AI systems that behave."**
  - Sub, word-by-word scroll lighting: *Agentic pipelines, applied ML, and the full stack around them — deterministic where it matters, delightful where people touch it.*
  - Two buttons: **View work** (ochre solid) · **Résumé** (glass).
- **Depth 5** — grain + vignette.
- Scroll cue: the woven strip drawing itself downward.

### 4.2 Signal strip
A thin pinned band that scrubs three honest facts as you pass: `6 shipped projects` · `4 live deployments` · `B.Tech CSE (AI/ML) — Sharda University`. Numbers count up on entry. No fake metrics.

### 4.3 About
Two columns. **Left: sticky** — small circular portrait (~88px), name, location, the woven rule. **Right: scrolls** — the four About paragraphs from the current site, kept nearly verbatim, each fading up with a masked line reveal. The sticky column means your face is present the whole time you're being read about, at a fraction of the screen cost.

### 4.4 Capabilities — the 60/40 split
Three cascading cards (skill pattern: card stack, each scaling and settling as the next arrives):

1. **Applied ML** — clustering, feature engineering, evaluation. `Python · scikit-learn · NLP · pandas`
2. **Agentic systems** — tool pipelines, deterministic orchestration, LLM integration. `LangChain · CrewAI · prompt/tool design`
3. **Shipping it** — the app, the API, the automation, the deploy. `React · Node.js · SQL · GitHub Actions · Vercel`

This is where "AI/ML but not 100%" lives structurally: two AI cards, one engineering card, and the engineering card is framed as *what makes the AI usable* — which is a strength, not a dilution.

### 4.5 Selected work
Horizontal scroll rail, pinned — the section holds while six project cards travel across. Each card: real screenshot, title, one-line claim, stack chips, status badge.

Clicking a card triggers a **shared-element morph** (Framer Motion `layoutId`): the card's image expands to become the hero image of the project page. That's the one cinematic flourish borrowed from direction B, and it's the moment that makes the site feel expensive.

Mobile: rail degrades to a vertical stack. No horizontal scroll on touch.

### 4.6 Experience — kept
Your alternating centre-spine timeline survives intact. Upgrades only:
- The spine **draws itself** as you scroll (scaleY, transform-only).
- Nodes pop when the spine reaches them.
- Cards enter from their own side (offset diagonal).
- ⚠️ **Dates need your confirmation.** Sharda 2024–Present and Independent 2025–Present were assumed in an earlier session and never verified.

### 4.7 Contact
Curtain roll-up reveal. The email card from the current site (copy button included, it works well), the editorial portrait appearance, socials, résumé. Ochre CTA.

---

## 5. Does a recruiter need your picture?

**Yes — keep it. Change its job.**

For you specifically: you're an international student who will be applying across borders and pitching clients cold. A face converts a URL into a person, and for interview follow-ups it makes you memorable in a stack of forty tabs. There's no ATS involved here — this is your own site — so the usual "no photo on a resume" advice doesn't transfer.

But the current treatment is wrong for the job. A 320px portrait card occupying a third of the About viewport is a *personal blog* convention. A recruiter opening that sees a headshot where they expected to see work. What they want, in order: what you build → proof you built it → how to reach you. The face is a trust accent, not a headline.

**Proposal:** ~88px sticky avatar in About, one editorial appearance near Contact, **never in the hero**. Present on every screen they read, occupying almost none of it.

If you'd rather keep it prominent, say so and I'll scale it back up — but I'd be arguing against it.

---

## 6. Project pages

Six routes. This is the biggest new surface, and for clients it's the part that actually sells.

`/work/travel-assistant` · `/work/hindsight` · `/work/ephemeris` · `/work/netflix-clustering` · `/work/sinitech` · `/work/cyber-threat`

### Page template

1. **Cinematic header** — full-bleed screenshot at depth-0 with a scroll-driven scale-out, title over it. This is the element the home card morphs into.
2. **At a glance bar** — Role · Timeline · Status · Stack · Live/Repo buttons. Sticky on desktop so the links are always one click away.
3. **The problem** — 2–3 sentences. What was broken or missing.
4. **What I built** — the system, with an **animated inline SVG architecture diagram** that draws itself on scroll. For the travel agent that's the deterministic tool pipeline; for Ephemeris it's the scheduled ingest → store → render loop. Diagrams are the single highest-signal thing on an engineering portfolio and none of your projects have one yet.
5. **Decisions and tradeoffs** — 2–4 short entries, "I chose X over Y because Z." This is the section experienced engineers actually read, and it's where a student portfolio can outperform its author's years of experience.
6. **What it does now** — real behaviour, real numbers where they exist.
7. **Stack** — grid where each item carries *why it was chosen*, not just a logo.
8. **Gallery** — real screenshots (you have four).
9. **Next project →**

### Per-project readiness

| Project | Screenshot | Live | Repo | Case study depth |
|---|---|---|---|---|
| Agentic AI Travel Assistant | ✅ | — | ✅ | **Full** — flagship, deepest treatment |
| Hindsight | ✅ | ✅ | ✅ | **Full** |
| Ephemeris | ✅ | ✅ | ✅ | **Full** |
| Netflix Clustering | ✅ (regenerate dark) | — | ✅ | **Full** — notebook has real results to pull |
| SiniTech Dashboard | ❌ | ❌ | ❌ | **Thin** — needs a decision |
| Cyber Threat Classification | ❌ | ❌ | ❌ | **Thin** — needs a decision |

**Decision needed on the last two.** Options: (a) you send screenshots / a repo and they get full pages; (b) they stay as non-clickable "Also built" entries in a text list under the rail — honest, and better than a page that's clearly padding; (c) drop them. My recommendation is **(b) unless you have assets**, because four strong case studies beat six where two are empty.

---

## 7. Technical decisions

**Stack stays:** React 18 + Vite 6 + Tailwind v4 (`@theme`, no config file) + Framer Motion 11.

**Routing — one new dependency:** `react-router-dom`, with clean URLs (`/work/hindsight`) plus a `vercel.json` SPA rewrite. Rationale: hash URLs (`/#/work/hindsight`) look amateur when pasted into LinkedIn or an application form, and a shareable per-project URL is a genuinely useful thing to hand a client. Cost: ~12KB gzip.

**No GSAP.** The skill's reference implementations use GSAP ScrollTrigger, but everything this design needs is already covered: pinning is native CSS `position: sticky`, scrubbing is Framer Motion's `useScroll` + `useTransform`, reveals are `whileInView`, and the card→page morph is `layoutId` (which does natively what the skill calls a Flip morph). Adding GSAP would mean +70KB for capability we already have. If a specific effect later proves impossible, we revisit.

**Point field:** hand-written 2D canvas, ~4KB.
- 90 points desktop / 35 on `pointer: coarse`
- `IntersectionObserver` pauses the rAF loop when off-screen
- `prefers-reduced-motion` → canvas never mounts, static gradient instead
- Scroll position drives cluster targets via lerp, so it's smooth without a scroll listener per frame

**Glass, rebalanced.** `.glass` / `.glass-deep` are kept exactly as-is but stop being the page frame and become the material for foreground panels — cards, the nav pill, the CTA. Glass over a moving depth field is what liquid glass is actually *for*; glass over a static background is just a border. Caveat: `backdrop-filter` over an animating canvas is the one real performance risk in this plan (§10).

**Performance budget:**
- LCP < 2.0s on simulated 4G
- JS < 190KB gzip total
- Animate only `transform` / `opacity` / `filter` / `clip-path` — never layout properties
- `will-change` applied on enter, removed on exit
- `content-visibility: auto` on below-fold sections
- Images lazy-loaded, capped at 1000px, ~50KB each (already true)

**Accessibility:**
- Full `prefers-reduced-motion` block — content never gated behind animation
- Every decorative layer `aria-hidden="true"`
- Skip-to-content link
- `:focus-visible` rings (already present, kept)
- Contrast audit on ochre-on-glass at small sizes — mono 11–13px ochre on translucent white is the one combination I expect to fail AA and need darkening or upsizing

**SEO / share — currently missing entirely:**
- OG + Twitter card tags and a 1200×630 image
- Favicon
- `sitemap.xml`, `robots.txt`
- JSON-LD `Person` schema (helps you surface in searches for your own name — worth more to a job seeker than it sounds)
- Per-project `<title>` and description

---

## 8. File structure

```
src/
  main.jsx                 # + BrowserRouter
  App.jsx                  # routes only
  index.css                # tokens, glass, woven, motion primitives
  data/
    projects.js            # single source of truth: cards + case studies
    experience.js
  components/
    Nav.jsx                # floating pill + persistent CTA
    Footer.jsx
    PointField.jsx         # canvas engine
    Depth.jsx              # <Depth level={0..5}> parallax wrapper
    Reveal.jsx             # whileInView primitive
    SplitText.jsx          # converge / word-lighting
    WovenRule.jsx
    ArchDiagram.jsx        # animated SVG diagrams
  pages/
    Home.jsx
    Project.jsx            # /work/:slug
    NotFound.jsx
  sections/
    Hero.jsx  Signal.jsx  About.jsx  Capabilities.jsx
    Work.jsx  Experience.jsx  Contact.jsx
  assets/
    portrait.jpeg
    previews/*.jpg
public/
  resume.pdf  og-image.png  favicon.svg  robots.txt  sitemap.xml
vercel.json                # SPA rewrite
```

`Depth.jsx` enforces the skill's depth contract in one place — every visual element passes through it with an explicit level, so nothing ships unlayered.

---

## 9. Build phases

Each phase ends in a working, viewable site. You can stop or redirect at any checkpoint.

| Phase | Work | Check |
|---|---|---|
| **0** | Branch `redesign`. Current site stays live on `main` untouched. | — |
| **1** | Foundation: router, depth system, motion primitives, point field, `projects.js` | Blank page, field animating, routes resolving |
| **2** | Hero + Signal strip | **You review the opening 5 seconds — the highest-stakes checkpoint** |
| **3** | About (new photo treatment) + Capabilities | You confirm the photo call |
| **4** | Work rail + card→page morph | The signature moment |
| **5** | Project pages ×4 full, ×2 per your decision | Content review — I'll draft, you correct anything inaccurate |
| **6** | Experience (migrated) + Contact | Date confirmation |
| **7** | Mobile pass, reduced-motion pass, contrast audit, Lighthouse | Perf + a11y numbers reported |
| **8** | OG image, favicon, meta, sitemap, JSON-LD | Share preview verified |
| **9** | Merge to `main`, Vercel deploys, verify live | Done |

Realistically phases 1–4 are the bulk. I'd expect to check in with you after 2 and after 4.

---

## 10. Risks

1. **`backdrop-filter` over an animating canvas.** The genuine perf risk. Compositing a blur every frame against moving pixels is expensive on integrated graphics. Mitigation: glass panels sit over *blurred, slow* depth layers, not directly over the point field; if frame time suffers, the field gets a static blurred snapshot behind glass regions. I'll measure in phase 2 rather than assume.
2. **Cinematic reading as slow.** Mitigated by the §3 rules, but it's a taste judgement — phase 2 exists specifically so you can veto early.
3. **Two thin projects.** Needs your decision (§6).
4. **Unverified content.** Experience dates were assumed, never confirmed. Anything I write for case studies will be drawn from your repos and READMEs, and you should read it before it ships.
5. **Scope.** This is a rebuild, not an edit. `main` stays live throughout so there's never a broken public site.

---

## 11. Questions for you

Non-blocking — I'll proceed on the defaults in brackets if you don't have a preference.

1. **Direction** — A "Latent Space", B "Pipeline", or C "Terminal"? [A]
2. **Photo** — demote to small avatar + one editorial appearance? [yes]
3. **SiniTech / Cyber Threat** — assets, text-only mention, or drop? [text-only mention]
4. **Experience dates** — Sharda 2024–Present, Independent 2025–Present. Correct?
5. **Audience weight** — recruiters, clients, or both equally? Changes CTA wording and whether an "available for work" state appears. [both]
6. **Any real numbers** you want featured (Hindsight prediction count, Ephemeris days archived, Netflix catalogue size)? These are the most persuasive things on the whole site and I'd rather use yours than approximate.
7. **Résumé** — the current `public/resume.pdf` is **4.0 MB**, which is heavy for a link recruiters click on mobile. Compress it? [yes]

---

## 12. What I will not do

- Invent metrics, clients, employment, or outcomes.
- Claim seniority or team leadership you don't have.
- Gate content behind animation.
- Touch `main` before you've seen the result.
- Add 3D/WebGL. The "3D" you asked about is delivered as layered 2.5D depth, which on a portfolio looks better, loads faster, and doesn't break on a recruiter's four-year-old ThinkPad.

---

**Say the word and I start at phase 0.**
