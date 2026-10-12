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
      period: 'Jan 2025 - Jul 2025',
      description: 'Designed, tested, and iterated electronics and embedded systems for commercial products.',
      responsibilities: [
        'Designed, tested, and iterated buck converter circuits, improving PCB layouts and power regulation through multiple KiCad design revisions.',
        'Built an automated quality-control testing device for power backup products, developing custom C/C++ firmware to automate product testing and verification.',
        'Worked on a BLE-enabled QR/barcode scanning system, integrating the scanner hardware with custom embedded firmware for a complete working prototype.',
        'Worked with embedded displays and user interfaces using LVGL, gaining practical experience developing firmware and hardware for commercial products.'
      ],
      featured: true,
      type: 'internship'
    },
    {
      title: 'Electronics Design Intern',
      company: 'SEDS Nepal (Remote), Pokhara, Nepal',
      period: 'Sept 2025 - Jan 2026',
      description: 'Designed and explored electronics for a pseudo-satellite, focusing on practical and modular subsystem architectures.',
      responsibilities: [
        'Designed and explored electronics for a pseudo-satellite, focusing on practical and modular subsystem architectures.',
        'Worked through component selection, schematic development, BOM preparation, and design reviews while considering reliability, power requirements, and system-level integration.',
        'Collaborated with team members from different engineering areas to understand how individual electronics modules fit together.'
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
      title: 'Electronics & Software Lead',
      company: 'Robotics Club, Pashchimanchal Campus IOE, Tribhuvan University',
      period: '2024 - 2026',
      description: 'Coached 350+ students in PCB design, firmware development, and robotics; launched an in-house PCB prototyping lab.',
      responsibilities: [
        'Coached 350+ students in PCB design, firmware development, and robotics; launched an in-house PCB prototyping lab.',
        'Led competitive robotics projects; organized workshops and technical training programs campus-wide, including a 15-day "Rainy Session" training 100+ students.'
      ],
      type: 'leadership'
    },
    {
      title: 'General Member',
      company: 'Robotics Club Pashchimanchal Campus',
      period: 'March 2024 - March 2025',
      description: 'Developed an advanced Micromouse robot using line-maze-solving algorithms.',
      responsibilities: [
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
