import { ArrowUpRight } from 'lucide-react'
import type { Reading } from '@/content/projects'

/** Papers, app notes and datasheets behind a project, in the order written */
export default function ReadingList({ items, compact = false }: { items: Reading[]; compact?: boolean }) {
  return (
    <ol className={`pj-reading${compact ? ' pj-reading--compact' : ''}`}>
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="pj-reading__link">
            <span className="pj-reading__kind">{item.kind}</span>
            <span className="pj-reading__title">
              {item.title}
              <ArrowUpRight size={12} aria-hidden="true" className="pj-reading__out" />
            </span>
            <span className="pj-reading__source">
              {item.source}
              {item.year && ` · ${item.year}`}
            </span>
          </a>
        </li>
      ))}
    </ol>
  )
}
