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
      'Designed and explored electronics for a pseudo-satellite, focusing on practical and modular subsystem architectures.',
      'Worked through component selection, schematic development, BOM preparation, and design reviews while considering reliability, power requirements, and system-level integration.',
      'Collaborated with team members from different engineering areas to understand how individual electronics modules fit together.',
    ],
  },
  {
    role: 'Electronics Engineer Intern',
    org: 'Yarsa Tech (On-site), Pokhara, Nepal',
    period: 'Jan 2025 – Jul 2025',
    points: [
      'Designed, tested, and iterated buck converter circuits, improving PCB layouts and power regulation through multiple KiCad design revisions.',
      'Built an automated quality-control testing device for power backup products, developing custom C/C++ firmware to automate product testing and verification.',
      'Worked on a BLE-enabled QR/barcode scanning system, integrating the scanner hardware with custom embedded firmware for a complete working prototype.',
      'Worked with embedded displays and user interfaces using LVGL, gaining practical experience developing firmware and hardware for commercial products.',
    ],
  },
]

const PROJECTS = [
  {
    name: 'Micromouse Autonomous Maze-Solving Robot',
    detail:
      'Custom PCB, PID control, and LSRB line-maze-solving algorithm on an Arduino Nano. Custom PCB reduced board size by 40%. 1st Place LOCUS 2025 (IOE Pulchowk), 2nd Place Delta 5.0 (IOE Purwanchal), 5th Place Techfest IIT Bombay.',
    href: 'https://github.com/prashantbhandary/MicroMouse-LineMaze.git',
  },
  {
    name: 'Solar Greenhouse Automation System',
    detail:
      'Built a solar-powered greenhouse monitoring and control system using ESP32 to monitor soil moisture, temperature, and humidity, with automated irrigation, BLE connectivity, and an OLED dashboard.',
    href: '/minor_project_report.pdf',
  },
  {
    name: 'Pocket CubeSat Module (1.5U PocketQube)',
    detail:
      '1.5U PocketQube with stacked-PCB architecture: onboard computing, power management, sensors, LoRa, and Li-Po solar charging.',
    href: '/cubesat.pdf',
  },
  {
    name: 'Smart Helmet Safety System',
    detail:
      'Rapid-prototyped wearable safety system integrating pulse/SpO2 sensing, fall detection, and SOS alerts, with sensor data sent over BLE to a supervisor monitoring dashboard.',
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
      'Designed a 12V-to-5V buck converter from schematic to PCB. Iterated the layout to reach ~90% efficiency and reduced output ripple.',
    href: '/buck-converter-documentation.pdf',
  },
  {
    name: 'LoRaNet Communication Module',
    detail:
      'Wireless communication module for long-range links when cellular or other communication fails, achieving ~3 km line-of-sight range; ESP32 firmware for reliable packet transmission with LoRa transceivers.',
    href: 'https://github.com/awakesid/LoraNet.git',
  },
]

const ACHIEVEMENTS = [
  'Top 25 Nationwide — U.S.-Nepal Startup Weekend Challenge (Safety Modules), 2026',
  'International Finalist — Techfest IIT Bombay, representing Nepal (Safety Modules), 2025',
  '1st Place — LOCUS 2025 Micromouse, IOE Pulchowk Campus',
  '2nd Place — Delta Robothon (Micromouse), 2025',
  '5th Place — Meshmerize (Micromouse), Techfest IIT Bombay, representing Nepal, 2024',
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
              <h3>Electronics &amp; Software Lead — Robotics Club, Pashchimanchal Campus IOE, Tribhuvan University</h3>
              <span className="cv-period">2024 – 2026</span>
            </div>
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
