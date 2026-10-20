'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText, Github, ListTree } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatMonth, getProject, SORTED_PROJECTS, CATEGORIES, type ProjectLink } from '@/content/projects'
import { BlockView, FigureView } from './Blocks'
import ReadingList from './ReadingList'
import { Reveal } from '../motion/Motion'

const LINK_ICON: Record<ProjectLink['kind'], typeof Github> = {
  source: Github,
  doc: FileText,
  bom: ListTree,
}

/** Tracks which section heading is in the reading zone, for the contents rail */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function ProjectArticle({ slug }: { slug: string }) {
  const project = getProject(slug)!
  // stable across renders so the observer isn't rebuilt every time `active` changes
  const sectionIds = useMemo(() => [...project.sections.map((s) => s.id), 'reading'], [project])
  const active = useActiveSection(sectionIds)

  const index = SORTED_PROJECTS.findIndex((p) => p.slug === slug)
  const prev = SORTED_PROJECTS[index - 1]
  const next = SORTED_PROJECTS[index + 1]
  const category = CATEGORIES.find((c) => c.id === project.category)!

  return (
    <article className="pj-article">
      <div className="shell">
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="pj-head">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <nav aria-label="Breadcrumb" className="pj-crumbs">
              <Link href="/projects" className="pj-back">
                <ArrowLeft size={14} aria-hidden="true" />
                All projects
              </Link>
              <span aria-hidden="true">/</span>
              <span>{category.label}</span>
            </nav>

            <p className="eyebrow mt-6">
              {project.kind} · <time dateTime={project.date}>{formatMonth(project.date)}</time>
            </p>
            <h1 className="pj-title">{project.title}</h1>
            <p className="pj-lead">{project.summary}</p>

            <div className="pj-meta">
              <span className="pin">
                <span className="dot-live" aria-hidden="true" />
                {project.status}
              </span>
              <ul className="tag-row" aria-label="Tools used">
                {project.tools.map((tool) => (
                  <li key={tool} className="tag">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pj-links">
              {project.links.map((link, i) => {
                const Icon = LINK_ICON[link.kind]
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn--sm ${i === 0 ? 'btn--primary' : 'btn--outline'}`}
                  >
                    <Icon size={14} aria-hidden="true" />
                    {link.label}
                    <ArrowUpRight size={12} aria-hidden="true" style={{ opacity: 0.6 }} />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </header>

        <Reveal className="pj-cover">
          <FigureView figure={project.cover} priority />
        </Reveal>

        <Reveal className="stat-strip pj-facts">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </Reveal>

        {/* ── Body: contents rail + article ───────────────────── */}
        <div className="pj-layout">
          <aside className="pj-toc" aria-label="On this page">
            <p className="eyebrow mb-3">On this page</p>
            <ol>
              {[...project.sections, { id: 'reading', title: 'Further reading' }].map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="pj-toc__link"
                    aria-current={active === section.id ? 'location' : undefined}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="pj-body">
            {/* Phones get the contents as a collapsible list instead of the rail */}
            <details className="pj-toc-mobile">
              <summary>On this page</summary>
              <ol>
                {[...project.sections, { id: 'reading', title: 'Further reading' }].map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </details>

            {project.sections.map((section) => (
              <section key={section.id} id={section.id} className="pj-section" aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`} className="pj-h2">
                  {section.title}
                </h2>
                {section.blocks.map((block, i) => (
                  <BlockView key={i} block={block} />
                ))}
              </section>
            ))}

            <section id="reading" className="pj-section" aria-labelledby="reading-title">
              <h2 id="reading-title" className="pj-h2">
                Further reading
              </h2>
              <p className="pj-p">The papers, app notes and datasheets this project builds on.</p>
              <ReadingList items={project.reading} />
            </section>
          </div>
        </div>

        {/* ── Prev / next ─────────────────────────────────────── */}
        <nav className="pj-pager" aria-label="More projects">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="pj-pager__link card card--hover">
              <span className="eyebrow">
                <ArrowLeft size={12} aria-hidden="true" /> Previous
              </span>
              <span className="pj-pager__title">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="pj-pager__link pj-pager__link--next card card--hover">
              <span className="eyebrow">
                Next <ArrowRight size={12} aria-hidden="true" />
              </span>
              <span className="pj-pager__title">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  )
}
