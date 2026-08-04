import { useEffect } from 'react'
import Hero from '../sections/Hero.jsx'
import Signal from '../sections/Signal.jsx'
import About from '../sections/About.jsx'
import Capabilities from '../sections/Capabilities.jsx'
import Statement from '../sections/Statement.jsx'
import Work from '../sections/Work.jsx'
import Experience from '../sections/Experience.jsx'
import Contact from '../sections/Contact.jsx'

export default function Home() {
  useEffect(() => {
    document.title = 'Oumar Tirera — AI/ML Engineer'
  }, [])

  return (
    <>
      <Hero />
      <Signal />
      <About />
      <Capabilities />
      <Statement />
      <Work />
      <Experience />
      <Contact />
    </>
  )
}
