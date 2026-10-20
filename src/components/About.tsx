import {
  GraduationCap,
  Briefcase,
  Users,
  Linkedin,
  Github,
  Twitter,
  Instagram,
} from 'lucide-react'
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
