'use client'

import Link from 'next/link'
import { ArrowLeft, Download, Mail, Phone, Github, Linkedin, Globe, Printer } from 'lucide-react'

const SKILLS: [string, string][] = [
  ['PCB Design', 'KiCad, Proteus, Schematic Capture, PCB Layout, Buck/Boost Converter Design, DRC/ERC'],
  ['Embedded Systems', 'STM32 Bare-Metal C, NuttX RTOS, FreeRTOS, ESP32, Arduino, ECU2000, HCM111Z, BLE, LoRa, UART/SPI/I2C'],
  ['Programming', 'C/C++, Python, MicroPython, JavaScript'],
  ['Hardware', 'IoT Systems, Power Electronics, QC Test Fixtures, Robotics, CubeSat Subsystems'],
  ['Tools', 'Fusion 360, 3D CAD, Git, OLED Dashboards, Sensor Integration, OTA, JLCPCB/Gerber Workflows'],
]

const EXPERIENCE = [
  {
    role: 'Electronics Design Intern',
    org: 'SEDS Nepal (Remote), Pokhara, Nepal',
    period: 'Sept 2025 – Jan 2026',
    points: [
      'Designed electronics modules for pseudo-satellite (HAPS) systems, ensuring modular and reproducible architecture',
      'Performed component selection, BOM budgeting, and design reviews across interdisciplinary satellite subsystems',
    ],
  },
  {
    role: 'Electronics Engineer Intern',
    org: 'YarsaTech, Pokhara, Nepal',
    period: 'Jan 2025 – Jul 2025',
    points: [
      'Designed and optimized buck converter circuits; improved layout across multiple iterations using KiCad',
      'Developed automated QC testing device for power backup products using MicroPython and custom firmware',
      'Built BLE-enabled QR/barcode scanner system; implemented complete firmware stack in C/C++',
    ],
  },
]

const PROJECTS = [
  {
    name: 'Micromouse Autonomous Maze-Solving Robot',
    detail:
      'Designed custom PCB reducing board size by 40%; achieved 95% navigation accuracy with PID motion control. Awards: 1st Place LOCUS 2025, 2nd Place Delta 5.0, 5th Place Techfest IIT Bombay.',
    href: 'https://github.com/prashantbhandary/MicroMouse-LineMaze.git',
  },
  {
    name: 'Solar Greenhouse Automation System',
    detail:
      'Built solar-powered system monitoring soil, temperature, and humidity; automated irrigation via MOSFET control with BLE data transmission and real-time OLED dashboard.',
    href: '/minor_project_report.pdf',
  },
  {
    name: 'Pocket CubeSat Module (1.5U PocketQube)',
    detail:
      'Designed stacked PCB architecture integrating OBC, power management, sensors, and LoRa comms in a 1.5U form factor with Li-Po solar charging.',
    href: '/cubesat.pdf',
  },
  {
    name: 'Smart Helmet Safety System',
    detail:
      'Developed wearable prototype with pulse/SpO2 sensing, fall detection, and SOS alerts transmitted via BLE to a supervisor dashboard.',
    href: '/safetron-mvp-safe-250345.pdf',
  },
  {
    name: 'Line-Following Robot (Project Voyager)',
    detail:
      'High-speed line follower with ultrasonic obstacle detection and tuned control loops; optimized for speed and stability. 1st Place, Battle For Speed 2023.',
    href: '/documentation-project-voyager.pdf',
  },
  {
    name: 'DC-DC Buck Converter',
    detail:
      'Designed 12V-to-5V converter from schematic through PCB; iterated layout to achieve ~90% efficiency and reduced ripple suitable for embedded and industrial use.',
    href: '/buck-converter-documentation.pdf',
  },
  {
    name: 'LoRaNet Communication Module',
    detail:
      'Designed full schematic and multi-layer PCB for a long-range wireless system achieving ~7 km LoS range, with embedded firmware for reliable packet transmission.',
    href: 'https://github.com/awakesid/LoraNet.git',
  },
]

const ACHIEVEMENTS = [
  'Top 25 Nationwide — U.S.-Nepal Startup Weekend Challenge (Safety Modules), 2026',
  'International Finalist — Techfest IIT Bombay (Safety Modules), 2025',
  '1st Place — LOCUS 2025 Micromouse, IOE Pulchowk Campus',
  '1st Runner-Up — Autonomous Boat Racing, Robotics Club WRC 2024',
  '1st Place — Line Follower Competition, Robotics Club WRC 2023',
]

const CONTACTS = [
  { icon: Mail, label: 'santhprashant@gmail.com', href: 'mailto:santhprashant@gmail.com' },
  { icon: Phone, label: '+977 9867756915', href: 'tel:+9779867756915' },
  { icon: Linkedin, label: 'in/prashantbdri', href: 'https://www.linkedin.com/in/prashantbdri/' },
  { icon: Github, label: 'prashantbhandary', href: 'https://github.com/prashantbhandary' },
  { icon: Globe, label: 'bhandari-prashant.com.np', href: 'https://bhandari-prashant.com.np' },
]

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-block">
      <h2 className="cv-block__title">{title}</h2>
      {children}
    </section>
  )
}

export default function Resume() {
  return (
    <div className="cv-page">
      {/* Toolbar — not part of the document */}
      <div className="cv-toolbar" role="toolbar" aria-label="Résumé actions">
        <Link href="/" className="btn btn--ghost btn--sm">
          <ArrowLeft size={15} aria-hidden="true" />
          Back to portfolio
        </Link>

        <div className="flex gap-2">
          <button type="button" className="btn btn--outline btn--sm" onClick={() => window.print()}>
            <Printer size={15} aria-hidden="true" />
            Print
          </button>
          <a href="/resume_prashant_v3.pdf" download="Prashant-Bhandari-Resume.pdf" className="btn btn--primary btn--sm">
            <Download size={15} aria-hidden="true" />
            Download PDF
          </a>
        </div>
      </div>

      {/* The document */}
      <article className="cv">
        <header className="cv-head">
          <div>
            <h1 className="cv-name">Prashant Bhandari</h1>
            <p className="cv-role">Electronics Engineer · PCB Design · Embedded Firmware</p>
          </div>

          <ul className="cv-contacts">
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  <c.icon size={13} aria-hidden="true" />
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <Block title="Summary">
          <p className="cv-text">
            Electronics Engineering student specializing in PCB design, embedded firmware development, and
            IoT/robotics systems. Proven track record with ESP32, KiCad, C/C++, and MicroPython; shipped
            hardware from schematic through production across satellite, industrial, and consumer IoT
            domains. International competition finalist with hands-on leadership of 350+ students in
            embedded systems.
          </p>
        </Block>

        <Block title="Technical skills">
          <dl className="cv-skills">
            {SKILLS.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Education">
          <div className="cv-entry">
            <div className="cv-entry__head">
              <h3>B.E. Electronics, Communication &amp; Information Engineering</h3>
              <span className="cv-period">2023 – Present · 4th year</span>
            </div>
            <p className="cv-org">Pashchimanchal Campus, Tribhuvan University</p>
          </div>
        </Block>

        <Block title="Experience">
          {EXPERIENCE.map((job) => (
            <div key={job.role + job.org} className="cv-entry">
              <div className="cv-entry__head">
                <h3>{job.role}</h3>
                <span className="cv-period">{job.period}</span>
              </div>
              <p className="cv-org">{job.org}</p>
              <ul className="cv-list">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </Block>

        <Block title="Projects">
          {PROJECTS.map((project) => (
            <div key={project.name} className="cv-entry">
              <div className="cv-entry__head">
                <h3>{project.name}</h3>
                {project.href && (
                  <a className="cv-link" href={project.href} target="_blank" rel="noopener noreferrer">
                    Documentation
                    <span className="sr-only"> for {project.name}</span>
                  </a>
                )}
              </div>
              <p className="cv-text">{project.detail}</p>
            </div>
          ))}
        </Block>

        <Block title="Leadership">
          <div className="cv-entry">
            <div className="cv-entry__head">
              <h3>Electronics &amp; Software Lead — Robotics Club, Pashchimanchal Campus</h3>
              <span className="cv-period">2024 – 2026</span>
            </div>
            <ul className="cv-list">
              <li>Mentored 350+ students in embedded systems and PCB design; initiated in-house PCB prototyping lab</li>
              <li>Led competition robotics projects; organized workshops and technical training programs</li>
            </ul>
          </div>
        </Block>

        <Block title="Achievements">
          <ul className="cv-list cv-list--two">
            {ACHIEVEMENTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Block>
      </article>
    </div>
  )
}
