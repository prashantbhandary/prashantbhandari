'use client'

import CertificateBadge from './CertificateBadge'

// ─── Types ────────────────────────────────────────────────────────────────────

type ExperienceType = 'work' | 'internship' | 'leadership' | 'education' | 'volunteer'

type ExperienceLink = {
  label: string
  href: string
}

type Experience = {
  title: string
  company: string
  period: string
  description: string
  responsibilities: string[]
  links?: ExperienceLink[]
  type: ExperienceType
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const experiences: Experience[] = [
  {
    title: 'Electronics Design Intern',
    company: 'SEDS Nepal (Remote), Pokhara, Nepal',
    period: 'Sept 2025 - Jan 2026',
    description:
      'Designed electronics modules for pseudo-satellite (HAPS) systems with a focus on modular, reproducible architecture.',
    responsibilities: [
      'Designed electronics modules for pseudo-satellite (HAPS) systems and validated subsystem interfaces',
      'Performed component selection, BOM budgeting, and design reviews across interdisciplinary satellite subsystems',
    ],
    links: [{ label: 'Completion Letter', href: '/completion-letter-prashant.pdf' }],
    type: 'internship',
  },
  {
    title: 'Electronics Engineer Intern',
    company: 'Yarsa Tech, Pokhara',
    period: 'Jan 2025 - July 2025',
    description:
      'Designed and optimized power electronics and embedded firmware for production hardware and QA systems.',
    responsibilities: [
      'Designed and optimized buck converter circuits; improved layout across multiple iterations using KiCad',
      'Developed automated QC testing device for power backup products using MicroPython and custom firmware',
      'Built BLE-enabled QR/barcode scanner system; implemented complete firmware stack in C/C++',
    ],
    type: 'internship',
  },
  {
    title: 'Executive Member',
    company: 'Robotics Club, Pashchimanchal Campus',
    period: 'March 2025 - Present',
    description:
      'Leading functional teams and coordinating club technical activities while mentoring 50+ members in microcontroller programming and PCB design.',
    responsibilities: [
      'Lead functional teams and coordinate club technical activities',
      'Mentor 50+ members in microcontroller programming and PCB design',
      'Organize robotics competitions and technical workshops',
      'Coordinate with industry professionals for knowledge sharing sessions',
    ],
    type: 'leadership',
  },
  {
    title: 'General Member',
    company: 'Robotics Club Pashchimanchal Campus',
    period: 'March 2024 - March 2025',
    description:
      'Developed advanced Micromouse robot using line maze-solving algorithms and coordinated 15-day "Rainy Session" workshop, training 100+ students in robotics.',
    responsibilities: [
      'Developed advanced Micromouse robot using line maze-solving algorithms',
      'Coordinated 15-day "Rainy Session" workshop, training 100+ students in robotics',
      'Mentored teams for Autonomous Boat Racing Competition, achieving 1st Runner-up position',
      'Participated in various robotics projects and competitions',
    ],
    type: 'leadership',
  },
  {
    title: 'Robotics Mentor',
    company: 'Karyashala & Engineer Without Borders',
    period: 'July 2024, 7 days',
    description:
      'Guided students through 3D design, 3D printing, and ESP32-based projects as a volunteer mentor.',
    responsibilities: [
      'Mentored students in 3D design and 3D printing techniques',
      'Guided ESP32-based project development',
      'Provided hands-on training in embedded systems',
      'Supported students in robotics project implementation',
    ],
    type: 'volunteer',
  },
]

// ─── Config maps ──────────────────────────────────────────────────────────────

const typeConfig: Record<
  ExperienceType,
  { icon: string; gradient: string; badge: string; label: string }
> = {
  work: {
    icon: 'fas fa-briefcase',
    gradient: 'from-blue-500 to-purple-600',
    badge: 'bg-blue-500/20 border-blue-400 text-blue-300',
    label: 'Work',
  },
  internship: {
    icon: 'fas fa-user-graduate',
    gradient: 'from-indigo-500 to-blue-600',
    badge: 'bg-indigo-500/20 border-indigo-400 text-indigo-300',
    label: 'Internship',
  },
  leadership: {
    icon: 'fas fa-users',
    gradient: 'from-green-500 to-teal-600',
    badge: 'bg-green-500/20 border-green-400 text-green-300',
    label: 'Leadership',
  },
  education: {
    icon: 'fas fa-graduation-cap',
    gradient: 'from-yellow-500 to-orange-600',
    badge: 'bg-yellow-500/20 border-yellow-400 text-yellow-300',
    label: 'Education',
  },
  volunteer: {
    icon: 'fas fa-heart',
    gradient: 'from-pink-500 to-red-600',
    badge: 'bg-pink-500/20 border-pink-400 text-pink-300',
    label: 'Volunteer',
  },
}

// ─── Certificate badge config (keyed by experience title) ────────────────────

const experienceBadges: Record<string, React.ReactNode> = {
  'Electronics Engineer Intern': (
    <CertificateBadge
      certificateImage="/images/YarsaTechCertificationOfExperience.jpg"
      title="Yarsa Tech Experience Certificate"
      description="Certificate of experience for Electronics Engineer Internship at Yarsa Tech"
    />
  ),
  'General Member': (
    <CertificateBadge
      certificateImage="/images/GeneralMemberCertification.png"
      title="General Member Certification"
      description="Official membership certification for Robotics Club"
    />
  ),
  'Robotics Mentor': (
    <div className="flex gap-2">
      <CertificateBadge
        certificateImage="/images/KaryaShalaMentorCertification.jpg"
        title="Karyashala Mentor Certification"
        description="Certification for mentoring students in robotics projects"
      />
      <CertificateBadge
        certificateImage="/images/MentorShipCertification.jpg"
        title="Mentorship Certification"
        description="Recognition for outstanding mentorship in robotics"
      />
    </div>
  ),
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypeIcon({ type, mobile = false }: { type: ExperienceType; mobile?: boolean }) {
  const { gradient, icon } = typeConfig[type]
  const size = mobile ? 'w-12 h-12 text-lg' : 'w-16 h-16 text-xl'
  return (
    <div
      className={`flex-shrink-0 ${size} bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center shadow-lg`}
    >
      <i className={`${icon} text-white`} />
    </div>
  )
}

function TypeBadge({ type, mobile = false }: { type: ExperienceType; mobile?: boolean }) {
  const { badge, label } = typeConfig[type]
  return (
    <div
      className={`rounded-full border-2 flex-shrink-0 inline-flex ${badge} ${
        mobile ? 'px-3 py-1.5' : 'px-4 py-2'
      }`}
    >
      <span
        className={`font-bold uppercase tracking-wide whitespace-nowrap ${
          mobile ? 'text-xs' : 'text-sm'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

function DocLink({ link }: { link: ExperienceLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 transition-all duration-300 text-xs"
    >
      <i className="fas fa-file-pdf" />
      {link.label}
    </a>
  )
}

function ResponsibilityItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
      <i className="fas fa-check-circle text-green-400 text-sm mt-1 flex-shrink-0" />
      <span className="text-gray-300 text-sm leading-relaxed">{text}</span>
    </div>
  )
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const badges = experienceBadges[exp.title]

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">

      {/* ── Mobile header ── */}
      <div className="block md:hidden mb-6">
        <div className="flex items-start gap-4 mb-4">
          <TypeIcon type={exp.type} mobile />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-2 flex flex-wrap items-center gap-2">
              {exp.title}
              {exp.links?.map((link) => <DocLink key={link.href} link={link} />)}
              {badges}
            </h3>
            <p className="text-indigo-300 font-semibold text-base mb-1">{exp.company}</p>
            <p className="text-cyan-400 font-medium text-sm">{exp.period}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <TypeBadge type={exp.type} mobile />
        </div>
      </div>

      {/* ── Desktop header ── */}
      <div className="hidden md:flex items-start gap-6 mb-6">
        <TypeIcon type={exp.type} />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            {exp.title}
            {exp.links?.map((link) => <DocLink key={link.href} link={link} />)}
            {badges}
          </h3>
          <p className="text-indigo-300 font-semibold text-lg mb-1">{exp.company}</p>
          <p className="text-cyan-400 font-medium">{exp.period}</p>
        </div>
        <TypeBadge type={exp.type} />
      </div>

      {/* Description */}
      <p className="text-gray-300 mb-6 leading-relaxed text-lg">{exp.description}</p>

      {/* Responsibilities */}
      <div>
        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
          <i className="fas fa-tasks text-cyan-400" />
          Key Responsibilities &amp; Achievements
        </h4>
        <div className="grid md:grid-cols-2 gap-3">
          {exp.responsibilities.map((item) => (
            <ResponsibilityItem key={item} text={item} />
          ))}
        </div>

        {/* Footer doc links (desktop style) */}
        {exp.links && (
          <div className="mt-5 flex flex-wrap gap-3">
            {exp.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 transition-all duration-300"
              >
                <i className="fas fa-file-pdf" />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Connector() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-px h-8 bg-gradient-to-b from-indigo-500 to-purple-500" />
    </div>
  )
}

function SectionHeader() {
  return (
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        Experience
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full mb-4" />
      <p className="text-gray-400 max-w-2xl mx-auto text-lg">
        My journey through academic learning, professional experience, and leadership roles in the
        field of electronics engineering and robotics.
      </p>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-5">
        <SectionHeader />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.title}>
              <ExperienceCard exp={exp} />
              {index < experiences.length - 1 && <Connector />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}