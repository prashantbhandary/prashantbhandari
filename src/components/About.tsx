import {
  GraduationCap,
  MapPin,
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
    icon: Briefcase,
    label: 'Industry experience',
    value: 'Electronics Engineer Intern',
    meta: 'Yarsa Tech, Pokhara (Jan 2025 – July 2025)',
    feature: true,
    wide: true,
  },
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'B.E. Electronics, Communication & Information Engineering',
    meta: 'Pashchimanchal Campus, Pokhara (2023 – Present)',
    wide: true,
  },
  {
    icon: Users,
    label: 'Leadership',
    value: 'Electronics & Software Lead',
    meta: 'Robotics Club, Pashchimanchal Campus IOE, Tribhuvan University (2024 – 2026)',
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: 'Pokhara, Nepal',
    meta: 'City of Lakes',
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
            I&apos;m Prashant Bhandari — an Electronics Engineering student specializing in
            robotics, PCB design and embedded systems, with a track record in competition-winning
            projects.
          </p>
        </Reveal>

        <RevealGroup className="bento">
          {facts.map((fact) => (
            <RevealItem
              key={fact.label}
              className={`bento__item card ${fact.feature ? 'bento__item--feature' : ''} ${
                fact.wide ? 'bento__item--wide' : ''
              }`}
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
