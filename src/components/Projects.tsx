'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import CertificateBadge from './CertificateBadge'
import ProjectCard, { cardHref } from './projects/ProjectCard'
import { Reveal, RevealGroup, RevealItem } from './motion/Motion'
import { WORK, getCard, type Card } from '@/content/projects'

/** Shown as cards on the home page; one per area of work */
const FEATURED = ['micromouse', 'greenhouse', 'ofdm-simulation']
/** Shown as rows underneath; the rest are on /projects */
const LISTED = ['mspm0-board', 'cubesat', 'loranet', 'heart-pcb', 'seven-segment-led']

const micromouseBadges = [
  {
    certificateImage: '/images/BattleForSpeed2023WinnerCertification.jpg',
    title: 'Battle For Speed 2023 Winner',
    description: 'First place winner in Battle For Speed robotics competition',
  },
  {
    certificateImage: '/images/DeltaRobothonRunnerUpCertification.jpg',
    title: 'Delta Robothon Runner-Up',
    description: 'Second place in Delta Robothon competition',
  },
  {
    certificateImage: '/images/MeshMerizeIITBombay.png',
    title: 'MeshMerize IIT Bombay',
    description: 'Participation in MeshMerize competition at IIT Bombay',
  },
]

const projectsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Prashant Bhandari Projects',
  itemListElement: WORK.map((card, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'CreativeWork',
      name: card.title,
      description: card.line,
      url: card.writeup ? `https://bhandari-prashant.com.np/projects/${card.writeup}` : card.github,
      sameAs: card.github,
    },
  })),
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function WorkRow({ card, index }: { card: Card; index: number }) {
  const external = !card.writeup

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1], delay: (index % 5) * 0.05 }}
    >
      <Link
        className="work-row"
        href={cardHref(card)}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        <span className="work-row__num" aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>

        <span>
          <span className="work-row__title">{card.title}</span>
          <span className="work-row__meta block">{card.line}</span>
        </span>

        <span className="work-row__tags" aria-hidden="true">
          {card.writeup && <span className="tag tag--accent">Write-up</span>}
          {card.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </span>

        <span className="work-row__arrow" aria-hidden="true">
          <ArrowUpRight size={16} />
        </span>
      </Link>
    </motion.div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Projects() {
  const featured = FEATURED.map((id) => getCard(id)!)
  const listed = LISTED.map((id) => getCard(id)!)

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />

      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="section-index">
            <span>04</span> Selected work
          </p>
          <h2 id="projects-heading" className="section-title">
            Things I&apos;ve designed and built
          </h2>
          <p className="section-lead">Robots, boards, firmware and experiments. Each links to its code.</p>
        </Reveal>

        <RevealGroup className="pj-grid pj-grid--home" stagger={0.08}>
          {featured.map((card) => (
            <RevealItem key={card.id} className="flex">
              <ProjectCard
                card={card}
                badges={
                  card.id === 'micromouse' && (
                    <span className="inline-flex gap-1">
                      {micromouseBadges.map((badge) => (
                        <CertificateBadge key={badge.title} {...badge} size="sm" />
                      ))}
                    </span>
                  )
                }
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <div className="work-list">
            {listed.map((card, i) => (
              <WorkRow key={card.id} card={card} index={i + featured.length + 1} />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <Link href="/projects" className="btn btn--outline">
            See all {WORK.length} projects
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
