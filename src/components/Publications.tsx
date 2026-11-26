import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PublicationCard from './publications/PublicationCard'
import ProfileLinks from './publications/ProfileLinks'
import { Reveal, RevealGroup, RevealItem } from './motion/Motion'
import { SORTED_PUBLICATIONS } from '@/content/publications'

/** Home-page section: the four newest papers, then a link to the full list */
export default function Publications() {
  const latest = SORTED_PUBLICATIONS.slice(0, 4)

  return (
    <section id="publications" className="section" aria-labelledby="publications-heading">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="section-index">
            <span>04</span> Publications
          </p>
          <h2 id="publications-heading" className="section-title">
            Reports and design notes
          </h2>
          <p className="section-lead">
            Technical reports and design notes from my embedded systems, PCB, robotics and signal-processing projects.
          </p>
          <ProfileLinks />
        </Reveal>

        <RevealGroup className="pj-grid pub-grid pj-grid--home" stagger={0.06}>
          {latest.map((pub) => (
            <RevealItem key={pub.slug} className="flex">
              <PublicationCard pub={pub} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <Link href="/publications" className="btn btn--outline">
            View all {SORTED_PUBLICATIONS.length} publications
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
