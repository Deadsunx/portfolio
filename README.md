# Oumar Tirera — Portfolio

**Live site: [portfolio-two-amber-7tob6jqd7n.vercel.app](https://portfolio-two-amber-7tob6jqd7n.vercel.app)**

Personal portfolio of Oumar Tirera, B.Tech CSE (AI/ML) student at Sharda University.

The site is a single rounded app window with a fixed sidebar and four hash-routed views — About, Portfolio, Experience, Contact — rendered in a liquid-glass material (`backdrop-filter: blur + saturate`, lit rims) over a deep indigo evening with warm ochre light. A strip-woven dash motif, drawn from West African indigo cloth, signs the sidebar and underlines every section heading. Type is Archivo (expanded for display) with IBM Plex Mono for labels. Project covers are hand-drawn inline SVGs in the site palette.

## Stack

- **React 18** + **Vite 6**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** — restrained entrance motion, respects `prefers-reduced-motion`

## Local development

```bash
npm install
npm run dev     # dev server at http://localhost:5173
npm run build   # production build in dist/
```

## Deployment

Deployed on [Vercel](https://vercel.com) — every push to `main` triggers an automatic production deploy.
