import Hero from './components/Hero.jsx'
import TechStack from './components/TechStack.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <div className="night-sky grain min-h-screen font-sans text-paper antialiased">
      <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
        <nav className="glass flex items-center gap-6 rounded-full px-6 py-3 font-mono text-[13px]">
          <a href="#top" className="font-medium tracking-wide hover:text-ochre">
            Oumar Tirera
          </a>
          <span className="h-4 w-px bg-paper/20" aria-hidden="true" />
          <a href="#projects" className="text-paper/70 hover:text-paper">
            Projects
          </a>
          <a href="#contact" className="text-paper/70 hover:text-paper">
            Contact
          </a>
          <a
            href="https://github.com/Deadsunx"
            target="_blank"
            rel="noreferrer"
            className="text-paper/70 hover:text-paper"
          >
            GitHub
          </a>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-[1060px] px-6">
        <Hero />
        <TechStack />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
