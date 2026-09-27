'use client'

import { FileText, ExternalLink, Star } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from './motion/Motion'
import CertificateBadge from './CertificateBadge'

type ExperienceItem = {
  title: string
  company: string
  period: string
  description: string
  responsibilities: string[]
  links?: { label: string; href: string }[]
  featured?: boolean
  type: string
}

const experiences: ExperienceItem[] = [
    {
      title: 'Electronics Engineer Intern',
      company: 'Yarsa Tech, Pokhara',
      period: 'Jan 2025 - July 2025',
      description: 'Designed and optimized power electronics and embedded firmware for production hardware and QA systems.',
      responsibilities: [
        'Designed and optimized buck converter circuits; improved layout across multiple iterations using KiCad',
        'Developed automated QC testing device for power backup products using MicroPython and custom firmware',
        'Built BLE-enabled QR/barcode scanner system; implemented complete firmware stack in C/C++'
      ],
      featured: true,
      type: 'internship'
    },
    {
      title: 'Electronics Design Intern',
      company: 'SEDS Nepal (Remote), Pokhara, Nepal',
      period: 'Sept 2025 - Jan 2026',
      description: 'Designed electronics modules for pseudo-satellite (HAPS) systems with a focus on modular, reproducible architecture.',
      responsibilities: [
        'Designed electronics modules for pseudo-satellite (HAPS) systems and validated subsystem interfaces',
        'Performed component selection, BOM budgeting, and design reviews across interdisciplinary satellite subsystems'
      ],
      links: [
        {
          label: 'Completion Letter',
          href: '/completion-letter-prashant.pdf'
        }
      ],
      type: 'internship'
    },
    {
      title: 'Executive Member',
      company: 'Robotics Club, Pashchimanchal Campus',
      period: 'March 2025 - Present',
      description: 'Leading functional teams and coordinating club technical activities while mentoring 50+ members in microcontroller programming and PCB design.',
      responsibilities: [
        'Lead functional teams and coordinate club technical activities',
        'Mentor 50+ members in microcontroller programming and PCB design',
        'Organize robotics competitions and technical workshops',
        'Coordinate with industry professionals for knowledge sharing sessions'
      ],
      type: 'leadership'
    },
    {
      title: 'General Member',
      company: 'Robotics Club Pashchimanchal Campus',
      period: 'March 2024 - March 2025',
      description: 'Developed advanced Micromouse robot using line maze-solving algorithms and coordinated 15-day "Rainy Session" workshop, training 100+ students in robotics.',
      responsibilities: [
        'Developed advanced Micromouse robot using line maze-solving algorithms',
        'Coordinated 15-day "Rainy Session" workshop, training 100+ students in robotics',
        'Mentored teams for Autonomous Boat Racing Competition, achieving 1st Runner-up position',
        'Participated in various robotics projects and competitions'
      ],
      type: 'leadership'
    },
    {
      title: 'Robotics Mentor',
      company: 'Karyashala & Engineer Without Borders',
      period: 'July 2024, 7 days',
      description: 'Guided students through 3D design, 3D printing, and ESP32-based projects as a volunteer mentor.',
      responsibilities: [
        'Mentored students in 3D design and 3D printing techniques',
        'Guided ESP32-based project development',
        'Provided hands-on training in embedded systems',
        'Supported students in robotics project implementation'
      ],
      type: 'volunteer'
    }
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
    <RevealItem as="article" className={`xp card ${exp.featured ? 'xp--featured' : ''}`}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="tag">{TYPE_LABEL[exp.type] ?? exp.type}</span>
        {exp.featured && (
          <span className="tag tag--accent">
            <Star size={10} aria-hidden="true" className="mr-1" />
            Featured
          </span>
        )}
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
            Internships in satellite and industrial electronics, alongside the club roles where I
            mentor and run competition teams.
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
