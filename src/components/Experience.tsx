'use client'

import { FileText, ExternalLink } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from './motion/Motion'
import CertificateBadge from './CertificateBadge'

type ExperienceItem = {
  title: string
  company: string
  period: string
  description: string
  responsibilities: string[]
  links?: { label: string; href: string }[]
  type: string
}

const experiences: ExperienceItem[] = [
  {
    title: 'Electronics Design Intern',
    company: 'SEDS Nepal (remote)',
    period: 'Sept 2025 – Jan 2026',
    description: 'Electronics for a pseudo-satellite, built as modular subsystems.',
    responsibilities: [
      'Component selection, schematics, BOMs and design reviews, weighing reliability and power budget.',
      'Worked with teammates from other engineering disciplines on how each module fits the system.',
    ],
    links: [{ label: 'Completion letter', href: '/completion-letter-prashant.pdf' }],
    type: 'internship',
  },
  {
    title: 'Electronics Engineer Intern',
    company: 'Yarsa Tech, Pokhara',
    period: 'Jan 2025 – Jul 2025',
    description: 'Hardware and firmware for commercial products.',
    responsibilities: [
      'Revised buck-converter PCB layouts in KiCad to improve power regulation.',
      'Built an automated QC test rig, with C/C++ firmware, for power-backup products.',
      'Brought up a BLE QR/barcode scanner prototype.',
      'Wrote LVGL interfaces for embedded displays.',
    ],
    type: 'internship',
  },
  {
    title: 'Electronics & Software Lead',
    company: 'Robotics Club, Pashchimanchal Campus IOE',
    period: '2024 – 2026',
    description: 'Run electronics and software for the club and its competition teams.',
    responsibilities: [
      'Coached 350+ students in PCB design, firmware and robotics; set up an in-house PCB prototyping lab.',
      'Organised campus workshops, including a 15-day “Rainy Session” for 100+ students.',
    ],
    type: 'leadership',
  },
  {
    title: 'General Member',
    company: 'Robotics Club, Pashchimanchal Campus',
    period: 'Mar 2024 – Mar 2025',
    description: 'Built a line-maze Micromouse robot.',
    responsibilities: ['Mentored the Autonomous Boat Racing team to 1st runner-up.'],
    type: 'leadership',
  },
  {
    title: 'Robotics Mentor',
    company: 'Karyashala & Engineers Without Borders',
    period: 'Jul 2024 · 7 days',
    description: 'Volunteer mentor at a hands-on workshop.',
    responsibilities: ['Taught 3D design, 3D printing and ESP32 projects.'],
    type: 'volunteer',
  },
]

const TYPE_LABEL: Record<string, string> = {
  work: 'Work',
  internship: 'Internship',
  leadership: 'Leadership',
  education: 'Education',
  volunteer: 'Volunteer',
}

/** Certificates attached to specific roles */
const ROLE_CERTIFICATES: Record<
  string,
  { certificateImage: string; title: string; description: string }[]
> = {
  'Electronics Engineer Intern': [
    {
      certificateImage: '/images/YarsaTechCertificationOfExperience.jpg',
      title: 'Yarsa Tech Experience Certificate',
      description: 'Certificate of experience for Electronics Engineer Internship at Yarsa Tech',
    },
  ],
  'General Member': [
    {
      certificateImage: '/images/GeneralMemberCertification.png',
      title: 'General Member Certification',
      description: 'Official membership certification for Robotics Club',
    },
  ],
  'Robotics Mentor': [
    {
      certificateImage: '/images/KaryaShalaMentorCertification.jpg',
      title: 'Karyashala Mentor Certification',
      description: 'Certification for mentoring students in robotics projects',
    },
    {
      certificateImage: '/images/MentorShipCertification.jpg',
      title: 'Mentorship Certification',
      description: 'Recognition for outstanding mentorship in robotics',
    },
  ],
}

function ExperienceEntry({ exp }: { exp: ExperienceItem }) {
  const certificates = ROLE_CERTIFICATES[exp.title] ?? []

  return (
    <RevealItem as="article" className="xp card">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="tag">{TYPE_LABEL[exp.type] ?? exp.type}</span>
        {certificates.map((certificate) => (
          <CertificateBadge key={certificate.title} {...certificate} size="sm" />
        ))}
      </div>

      <div className="xp__top">
        <div>
          <h3 className="xp__role">{exp.title}</h3>
          <p className="xp__org">{exp.company}</p>
        </div>
        <p className="xp__period">{exp.period}</p>
      </div>

      <p className="xp__desc">{exp.description}</p>

      <ul className="xp__list">
        {exp.responsibilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {exp.links && (
        <div className="flex flex-wrap gap-2 mt-4">
          {exp.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--sm btn--outline"
            >
              <FileText size={13} aria-hidden="true" />
              {link.label}
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </RevealItem>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section section--alt" aria-labelledby="experience-heading">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="section-index">
            <span>03</span> Experience
          </p>
          <h2 id="experience-heading" className="section-title">
            Where I&apos;ve worked and led
          </h2>
          <p className="section-lead">
            Internships in product and satellite electronics, and the club roles where I teach
            and lead teams.
          </p>
        </Reveal>

        <RevealGroup className="timeline" stagger={0.08}>
          {experiences.map((exp) => (
            <ExperienceEntry key={`${exp.title}-${exp.company}`} exp={exp} />
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
