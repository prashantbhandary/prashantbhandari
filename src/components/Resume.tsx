'use client'

import Link from 'next/link'
import { ArrowLeft, Download, Mail, Phone, Github, Linkedin, Globe, Printer } from 'lucide-react'

const SKILLS: [string, string][] = [
  ['PCB Design', 'KiCad, Proteus, Schematic Capture, PCB Layout'],
  ['Embedded Systems', 'ESP32, STM32 Bare-Metal C, RTOS, Arduino, BLE, UART/SPI/I2C'],
  ['Programming', 'C/C++, Python, MicroPython, JavaScript'],
  ['Hardware', 'IoT Systems, Power Electronics, QC Testing, Robotics, CubeSat Subsystems'],
]

const EXPERIENCE = [
  {
    role: 'Electronics Design Intern',
    org: 'SEDS Nepal (Remote) · Pokhara, Nepal',
    period: 'Sept 2025 – Jan 2026',
    points: [
      'Designed and explored electronics for pseudo-satellite focusing on practical and modular subsystem architectures.',
      'Worked through component selection, schematic development, BOM preparation, and design reviews while considering reliability, power requirements, and system-level integration.',
      'Collaborated with team members from different engineering areas to understand how individual electronics modules can fit.',
    ],
  },
  {
    role: 'Electronics Engineer Intern',
    org: 'Yarsa Tech (On-site) · Pokhara, Nepal',
    period: 'Jan 2025 – Jul 2025',
    points: [
      'Designed, tested, and iterated buck converter circuits, improving PCB layouts and power regulation through multiple KiCad design revisions.',
      'Built an automated quality-control testing device for power backup products, developing custom C/C++ firmware to automate product testing and verification.',
      'Worked a BLE-enabled QR/barcode scanning system, integrating the scanner hardware with custom embedded firmware for a complete working prototype.',
      'Worked with embedded displays and user interfaces using LVGL, gaining practical experience in developing firmware and hardware for commercial products.',
    ],
  },
]

const PROJECTS = [
  {
    name: 'Micromouse Autonomous Line-Maze-Solving Robot',
    tech: 'Custom PCB, PID',
    points: [
      "Designed and fabricated a custom PCB, reducing the robot's board size by 40%; implemented PID motion control and a LSRB solving algorithm on an Arduino Nano Micro Controller.",
      '1st Place LOCUS 2025 (IOE Pulchowk), 2nd Place Delta 5.0 (IOE Purwanchal), 5th Place Techfest IIT Bombay.',
    ],
    href: 'https://github.com/prashantbhandary/MicroMouse-LineMaze.git',
  },
  {
    name: 'Smart Helmet Safety System',
    tech: 'IoT, BLE, SpO2, Fall Detection',
    points: [
      'Rapid-prototyped a wearable safety system integrating pulse/SpO2 sensing, fall detection, and SOS alerts, with sensor data transmitted via BLE to a supervisor monitoring dashboard.',
    ],
    href: '/safetron-mvp-safe-250345.pdf',
  },
  {
    name: 'DC–DC Buck Converter',
    tech: 'KiCad, XL2013E1, Power Electronics',
    points: [
      'Designed a 12V-to-5V buck converter from schematic to PCB, iterating the layout to achieve ~90% efficiency and reduced output ripple.',
    ],
    href: '/buck-converter-documentation.pdf',
  },
  {
    name: 'Solar Greenhouse Automation System',
    tech: 'ESP32, BLE, MOSFET, OLED',
    points: [
      'Built a solar-powered greenhouse monitoring and control system using ESP32 to monitor soil moisture, temperature, and humidity, with automated irrigation, BLE connectivity, and an OLED dashboard.',
    ],
    href: '/minor_project_report.pdf',
  },
  {
    name: 'Pocket CubeSat Module (1.5U PocketQube)',
    tech: 'Stacked PCB, LoRa, NodeMCU',
    points: [
      'Developed a compact stacked-PCB architecture integrating onboard computing, power management, sensors, and LoRa communication in a 1.5U form factor with Li-Po solar charging.',
    ],
    href: '/cubesat.pdf',
  },
  {
    name: 'LoRaNet Communication Module',
    tech: 'KiCad, ESP32, LoRa, C/C++',
    points: [
      'Designed the wireless communication system for long range when the cellular or other communication fails, achieving ~3 km line-of-sight range.',
      'Developed ESP32 firmware for reliable packet transmission and communication with LoRa transceivers.',
    ],
    href: 'https://github.com/awakesid/LoraNet.git',
  },
]

const ACHIEVEMENTS = [
  'Top 25 Nationwide — U.S.-Nepal Startup Weekend Challenge (Safety Modules), 2026',
  'International Finalist — Techfest IIT Bombay, representing Nepal (Safety Modules), 2025',
  '1st Place — LOCUS 2025 Micromouse, IOE Pulchowk Campus',
  '2nd Place — Delta Robothon (Micromouse), 2025',
  '5th Place — Meshmerize Event (Micromouse), Techfest IIT Bombay, representing Nepal, 2024',
  '1st Runner-Up — Autonomous Boat Racing, Robotics Club WRC 2024',
  'Winner — Battle For Speed / Line Follower Competition, Robotics Club 2023',
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
          <a href="/resume_prashant.pdf" download="Prashant-Bhandari-Resume.pdf" className="btn btn--primary btn--sm">
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
            hardware from schematic through production across satellite (CubeSat), industrial, and consumer IoT
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
            <p className="cv-org">Pashchimanchal Campus IOE, Tribhuvan University · Pokhara, Nepal</p>
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
              <p className="cv-org">{project.tech}</p>
              <ul className="cv-list">
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </Block>

        <Block title="Leadership">
          <div className="cv-entry">
            <div className="cv-entry__head">
              <h3>Electronics &amp; Software Lead</h3>
              <span className="cv-period">2024 – 2026</span>
            </div>
            <p className="cv-org">Robotics Club, Pashchimanchal Campus IOE, Tribhuvan University</p>
            <ul className="cv-list">
              <li>Coached 350+ students in PCB design, firmware development, and robotics; launched an in-house PCB prototyping lab.</li>
              <li>Led competitive robotics projects; organized workshops and technical training programs campus-wide, including a 15-day &quot;Rainy Session&quot; training 100+ students.</li>
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
