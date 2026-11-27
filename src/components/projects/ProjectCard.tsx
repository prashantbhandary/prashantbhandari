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
        alt={card.title}
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
 * One project, as a card: cover, one line, tags, and the links. The whole
 * card opens the write-up (or the GitHub repo when there is none) through
 * the title link. On /projects GitHub is always one of the buttons.
 */
export default function ProjectCard({
  card,
  badges,
  reading = true,
  links = true,
}: {
  card: Card
  badges?: ReactNode
  /** The home page leaves this off to keep its outbound link count down; /projects shows it */
  reading?: boolean
  /** GitHub and extra buttons. The home page leaves these off (repos are one click away on the write-up) */
  links?: boolean
}) {
  const href = cardHref(card)
  const external = !card.writeup
  const category = CATEGORIES.find((c) => c.id === card.category)!

  return (
    <article className="pj-card card card--hover">
      {/* Not a link: the title's link stretches over the whole card, so the
          card is clickable without a second anchor (or the badge as anchor text) */}
      <div className="pj-card__cover">
        <CardCover card={card} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 360px" />
        {(card.writeup || card.status) && (
          <span className={`pj-card__badge${card.status ? ' pj-card__badge--wip' : ''}`}>
            {card.status ?? 'Write-up'}
          </span>
        )}
      </div>

      <div className="pj-card__body">
        <p className="pj-card__eyebrow">
          <span>{category.label}</span>
          <time dateTime={card.date}>{card.date.slice(0, 4)}</time>
        </p>

        <h3 className="pj-card__title">
          <Link
            href={href}
            className="pj-card__link"
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
          >
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

        {reading && (
          <details className="pj-card__reading">
            <summary>
              Further reading <span className="pj-count">{card.reading.length}</span>
            </summary>
            <ReadingList items={card.reading} compact />
          </details>
        )}

        {links && (
        <div className="pj-card__foot">
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
        )}
      </div>
    </article>
  )
}
