import Link from 'next/link'
import { Fragment } from 'react'
import { ArrowUpRight, FileDown } from 'lucide-react'
import { ME, doiUrl, type Publication } from '@/content/publications'

/** Author list in paper order, with the site owner in bold */
export function Authors({ authors, className }: { authors: string[]; className?: string }) {
  return (
    <p className={className}>
      {authors.map((name, i) => (
        <Fragment key={name}>
          {i > 0 && (i === authors.length - 1 ? ' and ' : ', ')}
          {name === ME ? <strong className="pub-me">{name}</strong> : name}
        </Fragment>
      ))}
    </p>
  )
}

/** One paper as a card: type and year, title, authors, then DOI and PDF */
export default function PublicationCard({ pub }: { pub: Publication }) {
  const href = `/publications/${pub.slug}`

  return (
    <article className="pj-card pub-card card card--hover">
      <div className="pj-card__body">
        <p className="pj-card__eyebrow">
          <span>{pub.type}</span>
          <time dateTime={pub.date}>{pub.year}</time>
        </p>

        <h3 className="pj-card__title">
          <Link href={href}>{pub.title}</Link>
        </h3>

        <Authors authors={pub.authors} className="pj-card__line" />

        <div className="pj-card__foot">
          <a href={pub.pdf} className="btn btn--sm btn--primary" type="application/pdf">
            <FileDown size={14} aria-hidden="true" />
            PDF
            <span className="sr-only"> of {pub.title}</span>
          </a>
          {pub.doi && (
            <a href={doiUrl(pub.doi)} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--outline">
              DOI
              <ArrowUpRight size={12} aria-hidden="true" style={{ opacity: 0.6 }} />
              <span className="sr-only"> {pub.doi}</span>
            </a>
          )}
          <Link href={href} className="btn btn--sm btn--ghost">
            Abstract
            <span className="sr-only"> of {pub.title}</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
