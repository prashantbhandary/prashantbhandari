'use client'

import Image from 'next/image'
import {
  ArrowUpRight,
  Github,
  FileText,
  TrendingUp,
  Radio,
  BatteryCharging,
  Bot,
  Satellite,
  Sprout,
  HardHat,
  ScanLine,
  Route,
  type LucideIcon,
} from 'lucide-react'
import CertificateBadge from './CertificateBadge'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, RevealGroup, RevealItem } from './motion/Motion'

type Project = {
  title: string
  summary: string
  outcome: string
  techStack: string[]
  image: string
  demoEmbedUrl: string
  primaryLink: string
  secondaryLink: string
  gradient: string
  /** Drawn on the cover when there is no photograph for the project */
  icon: LucideIcon
}

const projects: Project[] = [
  {
    title: 'LoRaNet Communication Module',
    summary: 'Long-range LoRa communication module with custom PCB and embedded firmware.',
    outcome: 'Achieved ~7 km line-of-sight range with reliable packet transmission.',
    techStack: ['KiCad', 'ESP32', 'LoRa', 'C/C++'],
    image: '/file.svg',
    demoEmbedUrl: '',
    primaryLink: 'https://github.com/awakesid/LoraNet.git',
    secondaryLink: 'https://github.com/awakesid/LoraNet.git',
    gradient: 'from-indigo-500 to-purple-500',
    icon: Radio,
  },
  {
    title: 'DC-DC Buck Converter',
    summary: '12V-to-5V converter designed from schematic through PCB for embedded use.',
    outcome: 'Reached ~90% efficiency with reduced ripple suitable for industrial loads.',
    techStack: ['KiCad', 'Power Electronics', 'XL2013E1', 'PCB Layout'],
    image: '/file.svg',
    demoEmbedUrl: '',
    primaryLink: '/buck-converter-documentation.pdf',
    secondaryLink: 'https://github.com/prashantbhandary/',
    gradient: 'from-amber-500 to-orange-500',
    icon: BatteryCharging,
  },
  {
    title: 'Micromouse Robot (Maze-Solving)',
    summary: 'Arduino Nano micromouse using QTR sensors, PID control, and flood-fill maze-solving.',
    outcome: '95% maze accuracy with a 40% speed boost over previous iterations.',
    techStack: ['Arduino Nano', 'QTR Sensors', 'PID Control', 'Flood-Fill Algorithm', 'C++'],
    image: '/images/MicroMouse.jpg',
    demoEmbedUrl: '',
    primaryLink: 'https://github.com/prashantbhandary/MicroMouse-LineMaze.git',
    secondaryLink: 'https://github.com/prashantbhandary/MicroMouse-LineMaze.git',
    gradient: 'from-purple-500 to-pink-500',
    icon: Bot,
  },
  {
    title: 'Pocket CubeSat Module (1.5U)',
    summary: 'Stacked PCB CubeSat module integrating OBC, power management, sensors, and LoRa comms.',
    outcome: 'Compact 1.5U form factor with Li-Po solar charging integration.',
    techStack: ['Stacked PCB', 'LoRa', 'NodeMCU', 'Power Management'],
    image: '/file.svg',
    demoEmbedUrl: '',
    primaryLink: '/cubesat.pdf',
    secondaryLink: 'https://github.com/prashantbhandary/pocketCubeSat_Esp32_demo.git',
    gradient: 'from-sky-500 to-blue-500',
    icon: Satellite,
  },
  {
    title: 'Solar Greenhouse Automation',
    summary: 'Solar-powered automation for soil, temperature, and humidity monitoring.',
    outcome: 'Automated irrigation with BLE data transmission and OLED dashboard.',
    techStack: ['ESP32', 'BLE', 'MOSFET Control', 'OLED'],
    image: '/file.svg',
    demoEmbedUrl: '',
    primaryLink: '/minor_project_report.pdf',
    secondaryLink: 'https://github.com/prashantbhandary/GreenHouseMonitoring.git',
    gradient: 'from-emerald-500 to-teal-500',
    icon: Sprout,
  },
  {
    title: 'Smart Helmet Safety System',
    summary: 'Wearable safety system with pulse/SpO2 sensing and fall detection.',
    outcome: 'SOS alerts transmitted via BLE to a supervisor dashboard.',
    techStack: ['IoT', 'BLE', 'SpO2 Sensor', 'Fall Detection'],
    image: '/file.svg',
    demoEmbedUrl: '',
    primaryLink: '/safetron-mvp-safe-250345.pdf',
    secondaryLink: 'https://github.com/prashantbhandary/SmartHelmet_Esp32_BLE.git',
    gradient: 'from-rose-500 to-pink-500',
    icon: HardHat,
  },
  {
    title: 'BLE QR/Barcode Scanner',
    summary: 'ESP32 BLE QR/Barcode scanner with LVGL UI and robust firmware stack.',
    outcome: 'Improved scan reliability and operator feedback with BLE status dashboards.',
    techStack: ['ESP32', 'BLE', 'LVGL', 'C/C++', 'MicroPython'],
    image: '/file.svg',
    demoEmbedUrl: '',
    primaryLink: 'https://github.com/prashantbhandary/',
    secondaryLink: 'https://github.com/prashantbhandary/',
    gradient: 'from-blue-500 to-cyan-500',
    icon: ScanLine,
  },
  {
    title: 'Line-Following Robot',
    summary: 'High-speed line follower with ultrasonic obstacle detection and tuned control loops.',
    outcome: 'Optimized speed and stability with reliable obstacle avoidance.',
    techStack: ['Arduino', 'Ultrasonic Sensors', 'Line Sensors', 'Motor Control', 'PID Tuning'],
    image: '/images/VoyagerBot2023.jpg',
    demoEmbedUrl: '',
    primaryLink: '/documentation-project-voyager.pdf',
    secondaryLink: 'https://github.com/prashantbhandary/Project_Voyager',
    gradient: 'from-green-500 to-teal-500',
    icon: Route,
  },
]

const MICROMOUSE_TITLE = 'Micromouse Robot (Maze-Solving)'

/** Projects still using the generic file icon get a drawn cover instead */
const PLACEHOLDER_IMAGE = '/file.svg'

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
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'CreativeWork',
      name: project.title,
      description: `${project.summary} ${project.outcome}`,
      url: 'https://bhandari-prashant.com.np/#projects',
      sameAs: project.secondaryLink,
      identifier: project.primaryLink,
    },
  })),
}


// ─── Sub-components ──────────────────────────────────────────────────────────

function CoverArt({ project }: { project: Project }) {
  if (project.demoEmbedUrl) {
    return (
      <iframe
        src={project.demoEmbedUrl}
        title={`${project.title} demo`}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  // No photo yet: draw a cover from the project's own colour and glyph rather
  // than stretching the generic file icon across the frame.
  if (project.image === PLACEHOLDER_IMAGE) {
    const Glyph = project.icon
    return (
      <div className={`cover-art bg-gradient-to-br ${project.gradient}`} aria-hidden="true">
        <span className="cover-art__dots" />
        <span className="cover-art__glyph">
          <Glyph className="w-7 h-7" strokeWidth={1.5} />
        </span>
      </div>
    )
  }

  return (
    <Image
      src={project.image}
      alt={`${project.title} project`}
      fill
      sizes="(max-width: 780px) 100vw, 33vw"
      className="object-cover"
      loading="lazy"
    />
  )
}

function FeaturedCard({ project }: { project: Project }) {
  const isMicromouse = project.title === MICROMOUSE_TITLE
  const hasSource = project.secondaryLink.includes('github.com')
  const primaryIsDoc = project.primaryLink.endsWith('.pdf')

  return (
    <RevealItem as="article" className="work-card card card--hover">
      <div className="work-card__cover">
        <CoverArt project={project} />
      </div>

      <div className="work-card__body">
        <h3 className="work-card__title">
          <span>{project.title}</span>
          {isMicromouse && (
            <span className="inline-flex gap-1">
              {micromouseBadges.map((badge) => (
                <CertificateBadge key={badge.title} {...badge} size="sm" />
              ))}
            </span>
          )}
        </h3>

        <p className="work-card__summary">{project.summary}</p>

        <p className="work-card__result">
          <TrendingUp className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{project.outcome}</span>
        </p>

        <ul className="tag-row" aria-label={`${project.title} stack`}>
          {project.techStack.slice(0, 4).map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>

        <div className="work-card__foot">
          <a
            href={project.primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--sm btn--outline"
          >
            {primaryIsDoc ? (
              <FileText size={14} aria-hidden="true" />
            ) : (
              <ArrowUpRight size={14} aria-hidden="true" />
            )}
            {primaryIsDoc ? 'Documentation' : 'View project'}
            <span className="sr-only"> — {project.title}</span>
          </a>
          {hasSource && (
            <a
              href={project.secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--sm btn--ghost"
            >
              <Github size={14} aria-hidden="true" />
              Source
              <span className="sr-only"> code for {project.title}</span>
            </a>
          )}
        </div>
      </div>
    </RevealItem>
  )
}

function WorkRow({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion()

  return (
    <motion.a
      className="work-row"
      href={project.primaryLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1], delay: (index % 5) * 0.05 }}
      whileHover={reduce ? undefined : { x: 6 }}
    >
      <span className="work-row__num" aria-hidden="true">
        {String(index).padStart(2, '0')}
      </span>

      <span>
        <span className="work-row__title">{project.title}</span>
        <span className="work-row__meta block">{project.summary}</span>
      </span>

      <span className="work-row__tags" aria-hidden="true">
        {project.techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </span>

      <span className="work-row__arrow" aria-hidden="true">
        <ArrowUpRight size={16} />
      </span>
    </motion.a>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Projects() {
  const featured = projects.slice(0, 3)
  const rest = projects.slice(3)

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
          <p className="section-lead">
            Hardware and firmware taken from schematic to working build — embedded systems,
            robotics, IoT and PCB design, each listed with the result it delivered.
          </p>
        </Reveal>

        <RevealGroup className="work-grid" stagger={0.08}>
          {featured.map((project) => (
            <FeaturedCard key={project.title} project={project} />
          ))}
        </RevealGroup>

        <Reveal>
          <p className="eyebrow mb-3">More projects</p>
          <div className="work-list">
            {rest.map((project, i) => (
              <WorkRow key={project.title} project={project} index={i + featured.length + 1} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
