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
    title: `${project.title} | Prashant Bhandari`,
    description: project.summary,
    keywords: [...project.tools, project.kind, 'Prashant Bhandari'],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: project.title,
      description: project.summary,
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: project.summary,
    image: `${SITE}${project.cover.src}`,
    dateModified: `${project.date}-01`,
    url: `${SITE}/projects/${project.slug}`,
    keywords: project.tools.join(', '),
    author: { '@type': 'Person', name: 'Prashant Bhandari', url: SITE },
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
