import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import MotionProvider from '@/components/motion/MotionProvider'
import { ScrollProgress } from '@/components/motion/Motion'
import ProjectsIndex from '@/components/projects/ProjectsIndex'
import { SORTED_PROJECTS } from '@/content/projects'

const PAGE_URL = 'https://bhandari-prashant.com.np/projects'

export const metadata: Metadata = {
  title: 'Projects | Prashant Bhandari',
  description:
    'Write-ups of PCB designs, embedded firmware and communication-systems simulations by Prashant Bhandari: how each project works, its files, and its results.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Projects | Prashant Bhandari',
    description: 'PCB design, embedded systems and signal-processing project write-ups.',
    images: [{ url: `https://bhandari-prashant.com.np${SORTED_PROJECTS[0].cover.src}` }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projects',
  url: PAGE_URL,
  hasPart: SORTED_PROJECTS.map((p) => ({
    '@type': 'TechArticle',
    headline: p.title,
    url: `${PAGE_URL}/${p.slug}`,
  })),
}

export default function ProjectsPage() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ProjectsIndex />
      </main>
      <Footer />
      <Chatbot />
    </MotionProvider>
  )
}
