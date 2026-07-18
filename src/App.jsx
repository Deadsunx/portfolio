import Hero from './components/Hero.jsx'
import TechStack from './components/TechStack.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <header className="mx-auto flex max-w-[1060px] items-baseline justify-between px-6 pt-8 font-mono text-[13px]">
        <span className="font-medium tracking-wide">Oumar Tirera</span>
        <nav className="flex gap-6 text-graphite">
          <a href="#projects" className="hover:text-indigo">
            Projects
          </a>
          <a href="#contact" className="hover:text-indigo">
            Contact
          </a>
          <a
            href="https://github.com/Deadsunx"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo"
          >
            GitHub
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-[1060px] px-6">
        <Hero />
        <TechStack />
        <Projects />
      </main>

      <Contact />
    </div>
  )
}
