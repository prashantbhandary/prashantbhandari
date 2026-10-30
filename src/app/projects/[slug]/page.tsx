import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import MotionProvider from '@/components/motion/MotionProvider'
import { ScrollProgress } from '@/components/motion/Motion'
import ProjectArticle from '@/components/projects/ProjectArticle'
import { PROJECTS, getProject } from '@/content/projects'

const SITE = 'https://bhandari-prashant.com.np'

type Params = { params: Promise<{ slug: string }> }

// Static export: every write-up is rendered to HTML at build time
export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}

  const url = `${SITE}/projects/${project.slug}`
  return {
    title: project.title,
    description: project.summary,
    keywords: [...project.tools, project.kind, 'Prashant Bhandari'],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: project.title,
      description: project.summary,
      modifiedTime: `${project.date}-01`,
      authors: [SITE],
      images: [{ url: `${SITE}${project.cover.src}`, width: project.cover.width, height: project.cover.height, alt: project.cover.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      images: [`${SITE}${project.cover.src}`],
    },
  }
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug)
  if (!project) notFound()

  const url = `${SITE}/projects/${project.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: project.title,
        description: project.summary,
        image: `${SITE}${project.cover.src}`,
        datePublished: `${project.date}-01`,
        dateModified: `${project.date}-01`,
        url,
        mainEntityOfPage: url,
        keywords: project.tools.join(', '),
        about: project.kind,
        author: { '@id': `${SITE}/#person` },
        publisher: { '@id': `${SITE}/#person` },
        isPartOf: { '@id': `${SITE}/#website` },
        citation: project.reading.map((r) => r.href),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE}/projects` },
          { '@type': 'ListItem', position: 3, name: project.title, item: url },
        ],
      },
    ],
  }

  return (
    <MotionProvider>
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ProjectArticle slug={project.slug} />
      </main>
      <Footer />
      <Chatbot />
    </MotionProvider>
  )
}
