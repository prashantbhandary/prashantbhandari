import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { FileText, Github, PlayCircle, TrendingUp } from 'lucide-react'
import { CATEGORIES, type Card, type CardLink } from '@/content/projects'
import ReadingList from './ReadingList'

const MORE_ICON: Record<CardLink['kind'], typeof Github> = { github: Github, pdf: FileText, demo: PlayCircle }

export const cardHref = (card: Card) => (card.writeup ? `/projects/${card.writeup}` : card.github)

/** Photo/render when there is one, otherwise a cover drawn in the category's colours */
export function CardCover({ card, sizes }: { card: Card; sizes: string }) {
  if (card.image) {
    return (
      <Image
        src={card.image.src}
        alt=""
        fill
        sizes={sizes}
        loading="lazy"
        className={card.image.fit === 'contain' ? 'pj-cover-img--contain' : 'pj-cover-img'}
      />
    )
  }

  const category = CATEGORIES.find((c) => c.id === card.category)!
  const Glyph = card.icon ?? category.icon
  return (
    <div
      className="cover-art"
      style={{ background: `linear-gradient(135deg, ${category.tint[0]}, ${category.tint[1]})` }}
    >
      <span className="cover-art__dots" />
      <span className="cover-art__glyph">
        <Glyph className="w-7 h-7" strokeWidth={1.5} />
      </span>
    </div>
  )
}

/**
 * One project, as a card: cover, one line, tags, and the links. Write-ups
 * open their article; everything else opens its GitHub repo. GitHub is
 * always one of the buttons.
 */
export default function ProjectCard({ card, badges }: { card: Card; badges?: ReactNode }) {
  const href = cardHref(card)
  const external = !card.writeup
  const category = CATEGORIES.find((c) => c.id === card.category)!

  return (
    <article className="pj-card card card--hover">
      {/* Second way into the same link as the title, kept out of the tab order */}
      <Link
        href={href}
        className="pj-card__cover"
        tabIndex={-1}
        aria-hidden="true"
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        <CardCover card={card} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 360px" />
        {(card.writeup || card.status) && (
          <span className={`pj-card__badge${card.status ? ' pj-card__badge--wip' : ''}`}>
            {card.status ?? 'Write-up'}
          </span>
        )}
      </Link>

      <div className="pj-card__body">
        <p className="pj-card__eyebrow">
          <span>{category.label}</span>
          <time dateTime={card.date}>{card.date.slice(0, 4)}</time>
        </p>

        <h3 className="pj-card__title">
          <Link href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
            {card.title}
          </Link>
          {badges}
        </h3>

        <p className="pj-card__line">{card.line}</p>

        {card.highlight && (
          <p className="pj-card__highlight">
            <TrendingUp size={13} aria-hidden="true" />
            {card.highlight}
          </p>
        )}

        <ul className="tag-row" aria-label="Tools">
          {card.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        <details className="pj-card__reading">
          <summary>
            Further reading <span className="pj-count">{card.reading.length}</span>
          </summary>
          <ReadingList items={card.reading} compact />
        </details>

        <div className="pj-card__foot">
          {card.writeup && (
            <Link href={href} className="btn btn--sm btn--primary">
              Read write-up
              <span className="sr-only"> on {card.title}</span>
            </Link>
          )}
          <a href={card.github} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--outline">
            <Github size={14} aria-hidden="true" />
            GitHub
            <span className="sr-only"> repository for {card.title}</span>
          </a>
          {card.more?.map((link) => {
            const Icon = MORE_ICON[link.kind]
            return (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--ghost">
                <Icon size={14} aria-hidden="true" />
                {link.label}
                <span className="sr-only"> for {card.title}</span>
              </a>
            )
          })}
        </div>
      </div>
    </article>
  )
}
