import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import MotionProvider from '@/components/motion/MotionProvider'
import { ScrollProgress } from '@/components/motion/Motion'
import ProjectsIndex from '@/components/projects/ProjectsIndex'
import { SORTED_PROJECTS } from '@/content/projects'

const PAGE_URL = 'https://bhandari-prashant.com.np/projects'

const DESCRIPTION =
  'Robots, PCBs, firmware and signal-processing experiments by Prashant Bhandari, with write-ups covering how each one works, its design files and measured results.'

// A page that sets its own Open Graph fields drops the default image, so name it again
const SHARE_IMAGE = ['/opengraph-image']

export const metadata: Metadata = {
  title: 'Projects',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: 'website', url: PAGE_URL, title: 'Projects | Prashant Bhandari', description: DESCRIPTION, images: SHARE_IMAGE },
  twitter: { images: SHARE_IMAGE, title: 'Projects | Prashant Bhandari', description: DESCRIPTION },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projects',
  url: PAGE_URL,
  description: DESCRIPTION,
  author: { '@id': 'https://bhandari-prashant.com.np/#person' },
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
