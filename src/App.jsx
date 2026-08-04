import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PointField from './components/PointField.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Project from './pages/Project.jsx'
import NotFound from './pages/NotFound.jsx'
import { useMotionBudget } from './lib/env.js'

/*
 * Route changes start at the top. A URL that arrives with a hash has to be
 * scrolled by hand — on a first load the target section does not exist yet
 * when the browser would normally jump to it.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      let attempts = 0
      const settle = () => {
        const el = document.getElementById(id)
        if (el) {
          /* 'instant', not 'auto' — 'auto' defers to CSS scroll-behavior,
             which is smooth, and a deep link would animate the whole page. */
          el.scrollIntoView({ behavior: 'instant', block: 'start' })
        } else if (attempts < 10) {
          attempts += 1
          requestAnimationFrame(settle)
        }
      }
      requestAnimationFrame(settle)
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default function App() {
  const location = useLocation()
  const { reduced } = useMotionBudget()

  return (
    <div className="night-sky grain vignette relative min-h-screen font-sans text-paper antialiased">
      {/* depth 3 — the embedding field, fixed behind the whole document */}
      <PointField />

      <a
        href="#main"
        className="sr-only rounded-lg bg-ochre px-4 py-2 font-mono text-[13px] text-night focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]"
      >
        Skip to content
      </a>

      <ScrollToTop />
      <Nav />

      {/* depth 4 — everything readable sits above the field */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <main id="main" className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/work/:slug" element={<Project />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  )
}
