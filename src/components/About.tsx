import {
  GraduationCap,
  Briefcase,
  Users,
  Linkedin,
  Github,
  Twitter,
  Instagram,
} from 'lucide-react'
import Link from 'next/link'
import { Reveal, RevealGroup, RevealItem } from './motion/Motion'

const socialLinks = [
  { href: 'https://www.linkedin.com/in/prashantbdri', icon: Linkedin, label: 'LinkedIn profile' },
  { href: 'https://github.com/prashantbhandary', icon: Github, label: 'GitHub profile' },
  { href: 'https://twitter.com/santhprashant', icon: Twitter, label: 'Twitter profile' },
  { href: 'https://www.instagram.com/_prashant.08/', icon: Instagram, label: 'Instagram profile' },
]

const facts = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'B.E. Electronics, Communication & Information Engineering',
    meta: 'Pashchimanchal Campus, IOE · 2023 – present',
    feature: true,
  },
  {
    icon: Briefcase,
    label: 'Internships',
    value: 'Yarsa Tech · SEDS Nepal',
    meta: 'Product electronics, satellite subsystems · 2025 – 2026',
  },
  {
    icon: Users,
    label: 'Leadership',
    value: 'Electronics & Software Lead',
    meta: 'Robotics Club, Pashchimanchal Campus · 2024 – 2026',
  },
]

/** What I want to research next, each backed by work already on the site */
const interests = [
  {
    title: 'Embedded systems for small satellites',
    text: 'Fitting computing, power and radio into a 5 cm PocketQube, and the electronics design reviews behind a pseudo-satellite at SEDS Nepal.',
    evidence: [
      { label: 'Pocket CubeSat', href: '/projects/cubesat' },
      { label: 'MSPM0 board', href: '/projects/mspm0-board' },
    ],
  },
  {
    title: 'Sensing and control for mobile robots',
    text: 'Line sensing, PD control and maze planning on small robots that have to work at competition speed.',
    evidence: [
      { label: 'Micromouse', href: '/projects/micromouse' },
      { label: 'Motor driver', href: '/projects/mosfet-driver' },
    ],
  },
  {
    title: 'Low-power wireless sensing',
    text: 'Battery-powered devices that measure, decide and report from the field, and measuring how well they actually work.',
    evidence: [
      { label: 'Greenhouse experiment', href: '/projects/greenhouse' },
      { label: 'LoRaNet', href: '/projects/loranet' },
      { label: 'OFDM simulation', href: '/projects/ofdm-simulation' },
    ],
  },
]

export default function About() {
  return (
    <section id="about" className="section section--alt" aria-labelledby="about-heading">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="section-index">
            <span>01</span> About
          </p>
          <h2 id="about-heading" className="section-title">
            Electronics engineer, hardware first
          </h2>
          <p className="section-lead">
            I study electronics engineering in Pokhara and spend most of my time building robots
            and circuit boards. At the campus Robotics Club I lead electronics and teach PCB design.
          </p>
        </Reveal>

        <RevealGroup className="bento">
          {facts.map((fact) => (
            <RevealItem
              key={fact.label}
              className={`bento__item card ${fact.feature ? 'bento__item--feature' : ''}`}
            >
              <fact.icon
                size={18}
                aria-hidden="true"
                style={{ color: fact.feature ? 'var(--accent)' : 'var(--ink-4)' }}
              />
              <p className="bento__label">{fact.label}</p>
              <p className="bento__value">{fact.value}</p>
              <p className="bento__meta">{fact.meta}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal as="header" className="mt-12 mb-4">
          <h3 className="eyebrow">Research interests</h3>
        </Reveal>
        <RevealGroup className="interest-grid">
          {interests.map((interest) => (
            <RevealItem key={interest.title} as="article" className="interest card">
              <h4 className="interest__title">{interest.title}</h4>
              <p className="interest__text">{interest.text}</p>
              <ul className="interest__evidence" aria-label={`Work on ${interest.title.toLowerCase()}`}>
                {interest.evidence.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="social-row mt-6" delay={0.05}>
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="social-btn"
            >
              <social.icon size={18} aria-hidden="true" />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
