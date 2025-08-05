import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Achievements from '@/components/Achievements'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CircuitElements from '@/components/CircuitElements'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <CircuitElements />
    </>
  )
}
