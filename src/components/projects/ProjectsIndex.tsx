'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { CATEGORIES, SORTED_PROJECTS, formatMonth, type Category, type Project } from '@/content/projects'
import { Reveal } from '../motion/Motion'

type Filter = 'all' | Category

const EASE = [0.22, 0.61, 0.36, 1] as const

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <Link href={`/projects/${project.slug}`} className="pj-card card card--hover">
        <div className={`pj-card__cover${project.cover.fit === 'contain' ? ' pj-card__cover--contain' : ''}`}>
          <Image
            src={project.cover.src}
            alt=""
            fill
            sizes="(max-width: 780px) 100vw, 50vw"
            loading="lazy"
          />
        </div>

        <div className="pj-card__body">
          <p className="pj-card__eyebrow">
            <span>{project.kind}</span>
            <time dateTime={project.date}>{formatMonth(project.date)}</time>
          </p>
          <h3 className="pj-card__title">{project.title}</h3>
          <p className="pj-card__summary">{project.summary}</p>

          <div className="pj-card__foot">
            <ul className="tag-row" aria-label="Tools">
              {project.tools.slice(0, 3).map((tool) => (
                <li key={tool} className="tag">
                  {tool}
                </li>
              ))}
            </ul>
            <span className="pj-card__cta">
              Read write-up
              <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.li>
  )
}

export default function ProjectsIndex() {
  const [filter, setFilter] = useState<Filter>('all')

  const counts = Object.fromEntries(
    CATEGORIES.map((c) => [c.id, SORTED_PROJECTS.filter((p) => p.category === c.id).length])
  ) as Record<Category, number>

  const groups = CATEGORIES.filter((c) => filter === 'all' || c.id === filter)

  return (
    <section className="pj-index" aria-labelledby="projects-page-title">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="section-index">
            <span>{String(SORTED_PROJECTS.length).padStart(2, '0')}</span> Write-ups
          </p>
          <h1 id="projects-page-title" className="section-title">
            Project write-ups
          </h1>
          <p className="section-lead">
            Long-form notes on things I’ve designed, built and tested: what each project is, how it works,
            how the files are laid out, and what the results were.
          </p>
        </Reveal>

        <div className="filter-row" role="group" aria-label="Filter projects by category">
          <button
            type="button"
            className="filter-chip"
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All <span className="pj-count">{SORTED_PROJECTS.length}</span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className="filter-chip"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {c.label} <span className="pj-count">{counts[c.id]}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map((group) => (
            <motion.div
              key={group.id}
              layout
              className="pj-group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <div className="pj-group__head">
                <h2 className="pj-group__title">{group.label}</h2>
                <p className="pj-group__blurb">{group.blurb}</p>
              </div>
              <ul className="pj-grid">
                <AnimatePresence initial={false}>
                  {SORTED_PROJECTS.filter((p) => p.category === group.id).map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </AnimatePresence>
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
