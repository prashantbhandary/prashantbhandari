'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Award } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './motion/Motion'

interface Certificate {
  id: string
  title: string
  description: string
  image: string
  /** Smaller file for the grid; the full image opens in the lightbox */
  thumb?: string
  /** Describes the photo itself; falls back to the title */
  alt?: string
  category: 'competition' | 'leadership' | 'exhibition' | 'mentorship' | 'workshop' | 'experience'
  date?: string
  organization?: string
}

const certificates: Certificate[] = [
  {
    id: 'rufest-2026-exhibitor',
    title: 'Certificate of Appreciation — Exhibitor, RUFEST',
    description:
      'Awarded to Dhruva Tech for its contribution as an exhibitor at RUFEST (Recycling and Upcycling Fest), 2nd Edition, Re-Think 2026, under the UNDP GCRU Project in Pokhara, supported by KOICA and Pokhara Metropolitan City.',
    image: '/images/certificates/rufest-2026-exhibitor-dhruva-tech.webp',
    thumb: '/images/certificates/rufest-2026-exhibitor-dhruva-tech-thumb.webp',
    alt: 'RUFEST Certificate of Appreciation presented to Dhruva Tech, held up in an event hall below an upcycled woven tray showing a mountain scene',
    category: 'exhibition',
    date: '2026',
    organization: 'UNDP GCRU Project · KOICA · Pokhara Metropolitan City',
  },
  {
    id: 'us-nepal-startup-weekend-2026',
    title: 'Certificate of Participation — U.S.–Nepal Startup Weekend Challenge',
    description:
      'Presented to Prashant Bhandari of Team Dhruva Tech for participating in the U.S.–Nepal Startup Weekend Challenge, 19–21 February 2026, supported by the U.S. Embassy Nepal and implemented by One to Watch.',
    image: '/images/certificates/us-nepal-startup-weekend-2026-dhruva-tech.webp',
    thumb: '/images/certificates/us-nepal-startup-weekend-2026-dhruva-tech-thumb.webp',
    alt: 'U.S.–Nepal Startup Weekend Challenge certificate of participation presented to Prashant Bhandari of Team Dhruva Tech',
    category: 'competition',
    date: 'February 2026',
    organization: 'U.S. Embassy Nepal · One to Watch',
  },
  {
    id: 'techfest-2025-safetronics',
    title: 'Certificate of Participation — Safetronics, Techfest',
    description:
      'Presented to Prashant Bhandari for participating in the Safetronics competition conducted by Techfest, IIT Bombay, 22–24 December 2025.',
    image: '/images/certificates/techfest-iit-bombay-2025-safetronics.webp',
    thumb: '/images/certificates/techfest-iit-bombay-2025-safetronics-thumb.webp',
    alt: 'Techfest IIT Bombay certificate of participation in Safetronics presented to Prashant Bhandari, December 2025',
    category: 'competition',
    date: 'December 2025',
    organization: 'Techfest, IIT Bombay',
  },
  {
    id: 'robotics-club-senior-member',
    title: 'Certificate of Leadership Excellence — Senior Member',
    description:
      'Presented for service as a Senior Member of the Robotics Club, Pashchimanchal Campus. Signed by Campus Chief Dr. Gopal Prasad Ghimire.',
    image: '/images/certificates/robotics-club-leadership-senior-member.webp',
    thumb: '/images/certificates/robotics-club-leadership-senior-member-thumb.webp',
    alt: 'Robotics Club, Pashchimanchal Campus Certificate of Leadership Excellence presented to Prashant Bhandari as Senior Member',
    category: 'leadership',
    organization: 'Robotics Club, Pashchimanchal Campus',
  },
  {
    id: 'robotics-club-executive-member',
    title: 'Certificate of Leadership Excellence — Executive Member',
    description:
      'Presented to an Executive Member of the 20th Committee of the Robotics Club, Pashchimanchal Campus, recognising the journey from General Member to Executive Member.',
    image: '/images/certificates/robotics-club-leadership-executive-member-20th-committee.webp',
    thumb: '/images/certificates/robotics-club-leadership-executive-member-20th-committee-thumb.webp',
    alt: 'Robotics Club, Pashchimanchal Campus Certificate of Leadership Excellence presented to Prashant Bhandari as Executive Member of the 20th Committee',
    category: 'leadership',
    organization: 'Robotics Club, Pashchimanchal Campus · 20th Committee',
  },
  {
    id: 'yarsa-tech-experience',
    title: 'Yarsa Tech Experience Certificate',
    description:
      'Certificate of experience for completing Electronics Engineer Internship at Yarsa Tech, Pokhara. Gained hands-on experience in electronics engineering, PCB design, and embedded systems development.',
    image: '/images/YarsaTechCertificationOfExperience.jpg',
    category: 'experience',
    date: 'January 2025 - July 2025',
    organization: 'Yarsa Tech, Pokhara',
  },
  {
    id: 'delta-robothon',
    title: 'Delta Robothon Runner-Up',
    description:
      'Second place achievement in Delta Robothon competition, showcasing advanced robotics skills and innovation.',
    image: '/images/DeltaRobothonRunnerUpCertification.jpg',
    category: 'competition',
    date: 'February 2025',
    organization: 'Delta Robothon',
  },
  {
    id: 'mesh-merize-iit',
    title: 'MeshMerize IIT Bombay',
    description:
      "Participation certificate from MeshMerize competition at IIT Bombay, one of India's premier technical institutes.",
    image: '/images/MeshMerizeIITBombay.png',
    category: 'competition',
    date: 'December 2024',
    organization: 'IIT Bombay',
  },
  {
    id: 'karyashala-mentor',
    title: 'Karyashala Mentor Certification',
    description:
      'Certification for mentoring students in robotics and engineering projects at Karyashala workshop.',
    image: '/images/KaryaShalaMentorCertification.jpg',
    category: 'mentorship',
    date: 'July 2024',
    organization: 'Karyashala & Engineer Without Borders',
  },
  {
    id: 'mentorship',
    title: 'Mentorship Certification',
    description:
      'Recognition for outstanding mentorship and guidance provided to junior students in robotics and embedded systems.',
    image: '/images/MentorShipCertification.jpg',
    category: 'mentorship',
    date: '2024',
    organization: 'Educational Institution',
  },
  {
    id: 'workshop-lab448',
    title: 'Workshop by Lab448',
    description:
      'Completion certificate for advanced workshop conducted by Lab448, focusing on cutting-edge technology and innovation.',
    image: '/images/WokshopBylab448.jpg',
    category: 'workshop',
    date: '2024',
    organization: 'Lab448',
  },
  {
    id: 'general-member',
    title: 'General Member Certification',
    description:
      'Official membership certification recognizing active participation and contribution to the robotics club activities.',
    image: '/images/GeneralMemberCertification.png',
    category: 'experience',
    date: 'March 2024 - March 2025',
    organization: 'Robotics Club',
  },
  {
    id: 'battle-for-speed',
    title: 'Battle For Speed 2023 Winner',
    description:
      'First place winner in the Battle For Speed 2023 robotics competition with Voyager Line Follower Bot. Built advanced line-following robot with ultrasonic obstacle detection, optimized for speed and stability using advanced sensor integration.',
    image: '/images/BattleForSpeed2023WinnerCertification.jpg',
    category: 'competition',
    date: 'March 2023',
    organization: 'Robotics Competition',
  },
]

const ACHIEVEMENTS = [
  'Top 25 Nationwide – U.S.–Nepal Startup Weekend Challenge (Safety Modules), 2026',
  'Certificate of Appreciation (Exhibitor) – RUFEST 2026, UNDP GCRU Project / KOICA, awarded to Dhruva Tech',
  'International Finalist – Techfest IIT Bombay, representing Nepal (Safety Modules), 2025',
  '1st Place – LOCUS 2025 Micromouse, IOE Pulchowk Campus',
  '2nd Place – Delta Robothon (Micromouse), 2025',
  '5th Place – Meshmerize (Micromouse), Techfest IIT Bombay, representing Nepal, 2024',
  '1st Runner-Up – Autonomous Boat Racing, Robotics Club WRC 2024',
  'Winner – Battle For Speed / Line Follower Competition, Robotics Club 2023',
  'Certificate of Leadership Excellence – Robotics Club, Pashchimanchal Campus',
]

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'competition', label: 'Competitions' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'exhibition', label: 'Exhibitions' },
  { id: 'mentorship', label: 'Mentorship' },
  { id: 'workshop', label: 'Workshops' },
  { id: 'experience', label: 'Experience' },
]

export function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: Certificate | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!certificate) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [certificate, onClose])

  if (!certificate) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      style={{ background: 'rgba(11,11,15,0.55)', backdropFilter: 'blur(6px)' }}
      role="dialog"
      aria-modal="true"
      aria-label={certificate.title}
      onClick={onClose}
    >
      <div
        className="card w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-5 border-b" style={{ borderColor: 'var(--line)' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem' }}>{certificate.title}</h3>
            {certificate.organization && (
              <p className="mono" style={{ color: 'var(--ink-3)', marginTop: 4 }}>
                {certificate.organization}
                {certificate.date ? ` · ${certificate.date}` : ''}
              </p>
            )}
          </div>
          <button type="button" className="nav-toggle" onClick={onClose} aria-label="Close certificate">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div
            className="relative w-full rounded-[var(--r-sm)] overflow-hidden"
            style={{ background: 'var(--surface-sunk)', minHeight: '60vh' }}
          >
            <Image
              src={certificate.image}
              alt={certificate.alt ?? certificate.title}
              fill
              sizes="(max-width: 960px) 100vw, 56rem"
              className="object-contain p-3"
            />
          </div>
          {certificate.description && (
            <p style={{ marginTop: '1rem', fontSize: '0.9375rem', color: 'var(--ink-3)' }}>
              {certificate.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CertificatesShowcase() {
  const [selected, setSelected] = useState<Certificate | null>(null)
  const [filter, setFilter] = useState('all')

  const visible = filter === 'all' ? certificates : certificates.filter((c) => c.category === filter)

  return (
    <>
      <section id="certificates" className="section" aria-labelledby="certificates-heading">
        <div className="shell">
          <Reveal as="header" className="section-head">
            <p className="section-index">
              <span>04</span> Recognition
            </p>
            <h2 id="certificates-heading" className="section-title">
              Certificates &amp; awards
            </h2>
            <p className="section-lead">
              Competition results and certificates. Tap a card to open the original.
            </p>
          </Reveal>

          <Reveal className="card p-6 mb-10" delay={0.05}>
            <h3 className="eyebrow" id="achievements">
              Achievements
            </h3>
            <ul className="xp__list xp__list--cols" aria-labelledby="achievements">
              {ACHIEVEMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="filter-row" role="group" aria-label="Filter certificates">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="filter-chip"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="cert-grid">
            <AnimatePresence>
              {visible.map((certificate) => (
                <motion.button
                  key={certificate.id}
                  type="button"
                  className="cert card--hover"
                  onClick={() => setSelected(certificate)}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                  whileHover={{ y: -3 }}
                >
                <span className="cert__thumb">
                  <Image
                    src={certificate.thumb ?? certificate.image}
                    alt={certificate.alt ?? certificate.title}
                    fill
                    sizes="(max-width: 780px) 50vw, 15rem"
                    className="object-cover"
                    loading="lazy"
                  />
                </span>
                <span className="cert__body">
                  <span className="cert__title">{certificate.title}</span>
                  <span className="cert__meta">
                    {certificate.organization}
                    {certificate.date ? ` · ${certificate.date}` : ''}
                  </span>
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length === 0 && (
            <p className="flex items-center gap-2 mono" style={{ color: 'var(--ink-4)' }}>
              <Award size={14} aria-hidden="true" />
              Nothing in this category yet.
            </p>
          )}
        </div>
      </section>

      <CertificateModal certificate={selected} onClose={() => setSelected(null)} />
    </>
  )
}
