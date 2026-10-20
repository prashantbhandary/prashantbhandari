import Image from 'next/image'
import { Fragment, type ReactNode } from 'react'
import { Info, FlaskConical } from 'lucide-react'
import type { Block, Figure } from '@/content/projects'

/**
 * Renders the article body for a project write-up. Every block type in
 * content/projects.ts has a case here; nothing in this file holds content.
 */

/** `code` and **bold** inside a plain string — the only inline markup used */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="pj-inline-code">{part.slice(1, -1)}</code>
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

export function FigureView({ figure, priority = false }: { figure: Figure; priority?: boolean }) {
  return (
    <figure className="pj-figure">
      {/* Opening the full-size file is the zoom: schematics need it */}
      <a
        href={figure.src}
        target="_blank"
        rel="noopener noreferrer"
        className={`pj-figure__frame${figure.fit === 'contain' ? ' pj-figure__frame--contain' : ''}`}
        aria-label={`${figure.alt} (opens full size)`}
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          sizes="(max-width: 860px) 100vw, 46rem"
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
      </a>
      {figure.caption && <figcaption className="pj-caption">{figure.caption}</figcaption>}
    </figure>
  )
}

type Rail = 'pipe' | 'blank' | 'tee' | 'elbow'
type TreeRow = { rails: Rail[]; name: string; note: string; dir: boolean }

/** Turn the indented listing into rows, each with its rail cells (│ ├ └) */
function parseTree(listing: string): TreeRow[] {
  const lines = listing
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => {
      const depth = Math.floor((line.length - line.trimStart().length) / 2)
      const [name, ...note] = line.trim().split(/\s+#\s?/)
      return { depth, name, note: note.join(' # ') }
    })

  const isLast = lines.map((line, i) => {
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[j].depth < line.depth) return true
      if (lines[j].depth === line.depth) return false
    }
    return true
  })

  const openAncestors: boolean[] = []
  return lines.map((line, i) => {
    const rails: Rail[] = []
    for (let d = 1; d < line.depth; d++) rails.push(openAncestors[d] ? 'pipe' : 'blank')
    if (line.depth > 0) rails.push(isLast[i] ? 'elbow' : 'tee')
    openAncestors[line.depth] = !isLast[i]
    return { rails, name: line.name, note: line.note, dir: line.name.endsWith('/') }
  })
}

/** Each rail cell is 4ch wide, so notes line up in one column */
function Tree({ listing }: { listing: string }) {
  const rows = parseTree(listing)
  const width = Math.max(...rows.map((r) => r.rails.length * 4 + r.name.length)) + 3

  return (
    <div className="pj-tree" tabIndex={0} role="region" aria-label="Folder structure">
      {rows.map((row, i) => (
        <div key={i} className="pj-tree__row">
          {row.rails.map((rail, r) => (
            <span key={r} className={`pj-tree__cell pj-tree__cell--${rail}`} aria-hidden="true" />
          ))}
          <span className={row.dir ? 'pj-tree__dir' : 'pj-tree__file'}>{row.name}</span>
          {row.note && (
            <span className="pj-tree__note">
              {' '.repeat(Math.max(1, width - row.rails.length * 4 - row.name.length))}
              {'# '}
              {row.note}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="pj-caption">{children}</p>
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="pj-p">
          <Rich text={block.text} />
        </p>
      )

    case 'list': {
      const List = block.ordered ? 'ol' : 'ul'
      return (
        <List className={`pj-list${block.ordered ? ' pj-list--ordered' : ''}`}>
          {block.items.map((item) => (
            <li key={item}>
              <Rich text={item} />
            </li>
          ))}
        </List>
      )
    }

    case 'steps':
      return (
        <ol className="pj-steps">
          {block.items.map((step, i) => (
            <li key={step.title} className="pj-step">
              <span className="pj-step__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="pj-step__title">{step.title}</h3>
                <p className="pj-step__text">
                  <Rich text={step.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      )

    case 'flow':
      return (
        <figure className="pj-block">
          <ol className="pj-flow" aria-label="Signal flow">
            {block.stages.map((stage, i) => (
              <li key={`${stage.label}-${i}`} className="pj-flow__stage">
                <span className="pj-flow__label">{stage.label}</span>
                {stage.note && <span className="pj-flow__note">{stage.note}</span>}
              </li>
            ))}
          </ol>
          {block.caption && <figcaption className="pj-caption">{block.caption}</figcaption>}
        </figure>
      )

    case 'tree':
      return (
        <div className="pj-block">
          <Tree listing={block.listing} />
          {block.caption && <Caption>{block.caption}</Caption>}
        </div>
      )

    case 'table':
      return (
        <figure className="pj-block">
          <div className="pj-table-wrap" tabIndex={0} role="region" aria-label={block.caption ?? 'Table'}>
            <table className="pj-table">
              {block.caption && <caption className="sr-only">{block.caption}</caption>}
              <thead>
                <tr>
                  {block.columns.map((col) => (
                    <th key={col} scope="col">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="pj-caption" aria-hidden="true">{block.caption}</figcaption>}
        </figure>
      )

    case 'figure':
      return <FigureView figure={block.figure} />

    case 'gallery':
      return (
        <div className="pj-gallery">
          {block.figures.map((figure) => (
            <FigureView key={figure.src} figure={figure} />
          ))}
        </div>
      )

    case 'code':
      return (
        <figure className="pj-block">
          <div className="pj-code">
            <span className="pj-code__lang">{block.lang}</span>
            <pre tabIndex={0}>
              <code>{block.code}</code>
            </pre>
          </div>
          {block.caption && <figcaption className="pj-caption">{block.caption}</figcaption>}
        </figure>
      )

    case 'callout': {
      const Icon = block.tone === 'result' ? FlaskConical : Info
      return (
        <aside className={`pj-callout pj-callout--${block.tone}`}>
          <Icon className="pj-callout__icon" size={18} aria-hidden="true" />
          <div>
            <p className="pj-callout__title">{block.title}</p>
            <p className="pj-callout__text">
              <Rich text={block.text} />
            </p>
          </div>
        </aside>
      )
    }

    case 'stats':
      return (
        <div className="stat-strip pj-block">
          {block.items.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )
  }
}
