import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import MotionProvider from '@/components/motion/MotionProvider'
import { Reveal, RevealGroup, RevealItem, ScrollProgress } from '@/components/motion/Motion'
import PublicationCard from '@/components/publications/PublicationCard'
import ProfileLinks from '@/components/publications/ProfileLinks'
import { SORTED_PUBLICATIONS, paperHref } from '@/content/publications'

const SITE = 'https://bhandari-prashant.com.np'
const PAGE_URL = `${SITE}/publications`

const LEAD =
  'Technical reports and design notes from my embedded systems, PCB, robotics and signal-processing projects.'
const DESCRIPTION = `${LEAD} Read them on ResearchGate and Google Scholar.`

const SHARE_IMAGE = ['/opengraph-image']

export const metadata: Metadata = {
  title: 'Publications',
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: 'website', url: PAGE_URL, title: 'Publications | Prashant Bhandari', description: DESCRIPTION, images: SHARE_IMAGE },
  twitter: { images: SHARE_IMAGE, title: 'Publications | Prashant Bhandari', description: DESCRIPTION },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Publications',
  url: PAGE_URL,
  description: DESCRIPTION,
  author: { '@id': `${SITE}/#person` },
  hasPart: SORTED_PUBLICATIONS.map((p) => ({
    '@type': 'ScholarlyArticle',
    headline: p.title,
    url: paperHref(p),
  })),
}

export default function PublicationsPage() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="pj-index" aria-labelledby="publications-page-title">
          <div className="shell">
            <Reveal as="header" className="section-head">
              <p className="section-index">
                <span>{SORTED_PUBLICATIONS.length}</span> technical reports
              </p>
              <h1 id="publications-page-title" className="section-title">
                Publications
              </h1>
              <p className="section-lead">{LEAD}</p>
              <ProfileLinks />
            </Reveal>

            <RevealGroup className="pj-grid pub-grid" stagger={0.05}>
              {SORTED_PUBLICATIONS.map((pub) => (
                <RevealItem key={pub.slug} className="flex">
                  <PublicationCard pub={pub} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </MotionProvider>
  )
}
