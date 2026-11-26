import { Fragment } from 'react'
import { ArrowUpRight, BookOpen, GraduationCap } from 'lucide-react'
import { ME, doiUrl, paperHref, type Publication } from '@/content/publications'

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

const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const

/**
 * One paper as a card. The paper itself isn't hosted here: the title and
 * main button open it on ResearchGate, or the Google Scholar profile when
 * it has no ResearchGate page yet, so reads and citations count there.
 */
export default function PublicationCard({ pub }: { pub: Publication }) {
  const href = paperHref(pub)
  const onRG = Boolean(pub.researchgate)

  return (
    <article className="pj-card pub-card card card--hover">
      <div className="pj-card__body">
        <p className="pj-card__eyebrow">
          <span>{pub.type}</span>
          <time dateTime={pub.date}>{pub.year}</time>
        </p>

        <h3 className="pj-card__title">
          <a href={href} {...EXTERNAL}>
            {pub.title}
          </a>
        </h3>

        <Authors authors={pub.authors} className="pj-card__line" />

        <div className="pj-card__foot">
          <a href={href} {...EXTERNAL} className="btn btn--sm btn--primary">
            {onRG ? <BookOpen size={14} aria-hidden="true" /> : <GraduationCap size={14} aria-hidden="true" />}
            {onRG ? 'Read on ResearchGate' : 'Google Scholar'}
            <ArrowUpRight size={12} aria-hidden="true" style={{ opacity: 0.6 }} />
          </a>
          {pub.doi && (
            <a href={doiUrl(pub.doi)} {...EXTERNAL} className="btn btn--sm btn--outline">
              DOI
              <ArrowUpRight size={12} aria-hidden="true" style={{ opacity: 0.6 }} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
