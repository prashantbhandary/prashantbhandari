import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, FileDown } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import MotionProvider from '@/components/motion/MotionProvider'
import { Reveal, ScrollProgress } from '@/components/motion/Motion'
import { Authors } from '@/components/publications/PublicationCard'
import {
  PUBLICATIONS,
  SORTED_PUBLICATIONS,
  doiUrl,
  formatPubMonth,
  getPublication,
  scholarName,
} from '@/content/publications'

const SITE = 'https://bhandari-prashant.com.np'

type Params = { params: Promise<{ slug: string }> }

// Static export: every paper page is rendered to HTML at build time
export const dynamicParams = false

export function generateStaticParams() {
  return PUBLICATIONS.map((p) => ({ slug: p.slug }))
}

/** First ~155 characters of the abstract, cut at a word boundary */
function snippet(text: string, max = 155) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const pub = getPublication((await params).slug)
  if (!pub) return {}

  const url = `${SITE}/publications/${pub.slug}`
  const description = snippet(pub.abstract)

  // Google Scholar reads these from <head>: https://scholar.google.com/intl/en/scholar/inclusion.html#indexing
  const citation: Record<string, string | string[]> = {
    citation_title: pub.title,
    citation_author: pub.authors.map(scholarName),
    citation_publication_date: pub.date.replace('-', '/'),
    citation_technical_report_institution: pub.institution,
    citation_pdf_url: `${SITE}${pub.pdf}`,
    citation_abstract_html_url: url,
    citation_language: 'en',
  }
  if (pub.doi) citation.citation_doi = pub.doi

  return {
    title: pub.title,
    description,
    authors: pub.authors.map((name) => ({ name })),
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: pub.title,
      description,
      publishedTime: `${pub.date}-01`,
      images: ['/opengraph-image'],
    },
    twitter: { card: 'summary_large_image', title: pub.title, description, images: ['/opengraph-image'] },
    other: citation,
  }
}

export default async function PublicationPage({ params }: Params) {
  const pub = getPublication((await params).slug)
  if (!pub) notFound()

  const url = `${SITE}/publications/${pub.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ScholarlyArticle',
        '@id': `${url}#article`,
        headline: pub.title,
        name: pub.title,
        abstract: pub.abstract,
        description: snippet(pub.abstract),
        datePublished: pub.date,
        inLanguage: 'en',
        genre: pub.type,
        url,
        mainEntityOfPage: url,
        author: pub.authors.map((name) =>
          name === 'Prashant Bhandari' ? { '@id': `${SITE}/#person` } : { '@type': 'Person', name }
        ),
        sourceOrganization: { '@type': 'Organization', name: pub.institution },
        encoding: { '@type': 'MediaObject', contentUrl: `${SITE}${pub.pdf}`, encodingFormat: 'application/pdf' },
        isAccessibleForFree: true,
        ...(pub.doi && {
          identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: pub.doi },
          sameAs: [doiUrl(pub.doi), ...(pub.researchgate ? [pub.researchgate] : [])],
        }),
        isPartOf: { '@id': `${SITE}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Publications', item: `${SITE}/publications` },
          { '@type': 'ListItem', position: 3, name: pub.title, item: url },
        ],
      },
    ],
  }

  const index = SORTED_PUBLICATIONS.findIndex((p) => p.slug === pub.slug)
  const newer = SORTED_PUBLICATIONS[index - 1]
  const older = SORTED_PUBLICATIONS[index + 1]

  return (
    <MotionProvider>
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article className="pj-article">
          <div className="shell">
            <Reveal as="header" className="pj-head">
              <nav aria-label="Breadcrumb" className="pj-crumbs">
                <Link href="/publications" className="pj-back">
                  <ArrowLeft size={14} aria-hidden="true" />
                  All publications
                </Link>
              </nav>

              <p className="eyebrow mt-6">
                {pub.type} · <time dateTime={pub.date}>{formatPubMonth(pub.date)}</time>
              </p>
              <h1 className="pj-title pub-title">{pub.title}</h1>
              <Authors authors={pub.authors} className="pub-authors" />
              <p className="pub-inst">
                {pub.institution}
                {pub.note && (
                  <>
                    <br />
                    {pub.note}
                  </>
                )}
              </p>

              <div className="pj-links">
                <a href={pub.pdf} className="btn btn--primary" type="application/pdf">
                  <FileDown size={16} aria-hidden="true" />
                  Download PDF
                </a>
                {pub.doi && (
                  <a href={doiUrl(pub.doi)} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                    DOI: {pub.doi}
                    <ArrowUpRight size={12} aria-hidden="true" style={{ opacity: 0.6 }} />
                  </a>
                )}
                {pub.researchgate && (
                  <a href={pub.researchgate} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                    ResearchGate
                    <ArrowUpRight size={12} aria-hidden="true" style={{ opacity: 0.6 }} />
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal className="pub-abstract">
              <h2 className="pj-h2">Abstract</h2>
              <p className="pj-p">{pub.abstract}</p>
            </Reveal>

            <nav className="pj-pager" aria-label="More publications">
              {newer ? (
                <Link href={`/publications/${newer.slug}`} className="pj-pager__link card card--hover">
                  <span className="eyebrow">
                    <ArrowLeft size={12} aria-hidden="true" /> Newer
                  </span>
                  <span className="pj-pager__title">{newer.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {older && (
                <Link href={`/publications/${older.slug}`} className="pj-pager__link pj-pager__link--next card card--hover">
                  <span className="eyebrow">
                    Older <ArrowRight size={12} aria-hidden="true" />
                  </span>
                  <span className="pj-pager__title">{older.title}</span>
                </Link>
              )}
            </nav>
          </div>
        </article>
      </main>
      <Footer />
      <Chatbot />
    </MotionProvider>
  )
}
