'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CATEGORIES, WORK, type Category } from '@/content/projects'
import ProjectCard from './ProjectCard'
import { Reveal } from '../motion/Motion'

type Filter = 'all' | Category

const EASE = [0.22, 0.61, 0.36, 1] as const

export default function ProjectsIndex() {
  const [filter, setFilter] = useState<Filter>('all')

  const groups = CATEGORIES.map((c) => ({ ...c, cards: WORK.filter((w) => w.category === c.id) })).filter(
    (g) => g.cards.length && (filter === 'all' || g.id === filter)
  )

  return (
    <section className="pj-index" aria-labelledby="projects-page-title">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="section-index">
            <span>{WORK.length}</span> builds across {CATEGORIES.length} areas
          </p>
          <h1 id="projects-page-title" className="section-title">
            Projects
          </h1>
          <p className="section-lead">Boards, firmware and experiments, each linked to its source on GitHub.</p>
        </Reveal>

        <div className="filter-row" role="group" aria-label="Filter projects by category">
          <button type="button" className="filter-chip" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
            All <span className="pj-count">{WORK.length}</span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className="filter-chip"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {c.label} <span className="pj-count">{WORK.filter((w) => w.category === c.id).length}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map((group) => (
            <motion.section
              key={group.id}
              layout
              className="pj-group"
              aria-labelledby={`group-${group.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <h2 id={`group-${group.id}`} className="pj-group__title">
                {group.label}
                <span className="pj-count">{group.cards.length}</span>
              </h2>
              <ul className="pj-grid">
                {group.cards.map((card) => (
                  <li key={card.id}>
                    <ProjectCard card={card} />
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
