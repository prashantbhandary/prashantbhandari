'use client'

import { Briefcase, GraduationCap, Users, Heart, CheckCircle, FileText, ExternalLink } from 'lucide-react'
import CertificateBadge from './CertificateBadge'

export default function Experience() {
  const experiences = [
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
      title: 'Electronics Engineer Intern',
      company: 'Yarsa Tech, Pokhara',
      period: 'Jan 2025 - July 2025',
      description: 'Designed and optimized power electronics and embedded firmware for production hardware and QA systems.',
      responsibilities: [
        'Designed and optimized buck converter circuits; improved layout across multiple iterations using KiCad',
        'Developed automated QC testing device for power backup products using MicroPython and custom firmware',
        'Built BLE-enabled QR/barcode scanner system; implemented complete firmware stack in C/C++'
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

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return Briefcase
      case 'internship':
        return GraduationCap
      case 'leadership':
        return Users
      case 'education':
        return GraduationCap
      case 'volunteer':
        return Heart
      default:
        return Briefcase
    }
  }

  const getGradient = (type: string) => {
    switch (type) {
      case 'work':
        return 'from-blue-500 to-purple-600'
      case 'internship':
        return 'from-indigo-500 to-blue-600'
      case 'leadership':
        return 'from-green-500 to-teal-600'
      case 'education':
        return 'from-yellow-500 to-orange-600'
      case 'volunteer':
        return 'from-pink-500 to-red-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'work':
        return 'bg-blue-500/20 border-blue-400 text-blue-300'
      case 'internship':
        return 'bg-indigo-500/20 border-indigo-400 text-indigo-300'
      case 'leadership':
        return 'bg-green-500/20 border-green-400 text-green-300'
      case 'education':
        return 'bg-yellow-500/20 border-yellow-400 text-yellow-300'
      case 'volunteer':
        return 'bg-pink-500/20 border-pink-400 text-pink-300'
      default:
        return 'bg-gray-500/20 border-gray-400 text-gray-300'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'work':
        return 'Work'
      case 'internship':
        return 'Internship'
      case 'leadership':
        return 'Leadership'
      case 'education':
        return 'Education'
      case 'volunteer':
        return 'Volunteer'
      default:
        return type
    }
  }

  return (
    <section id="experience" className="py-16 md:py-20 relative bg-slate-900/30" aria-labelledby="experience-heading">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12 reveal">
          <h2 id="experience-heading" className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full mb-4" aria-hidden="true"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            My journey through academic learning, professional experience, and leadership roles 
            in the field of electronics engineering and robotics.
          </p>
        </div>

        <div className="space-y-8 reveal-group">
          {experiences.map((exp, index) => {
            const IconComponent = getIcon(exp.type)
            return (
              <article key={index} className="relative">
                {/* Experience Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">
                  {/* Header */}
                  <div className="mb-6">
                    {/* Mobile Layout - Stacked */}
                    <div className="block md:hidden">
                      <div className="flex items-start gap-4 mb-4">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${getGradient(exp.type)} rounded-full flex items-center justify-center shadow-lg`} aria-hidden="true">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        
                        {/* Title and Company */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-white mb-2 flex flex-wrap items-center gap-2">
                            <span className="mr-2">{exp.title}</span>
                            {/* Certificate badges for specific experiences */}
                            {exp.links?.map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 transition-all duration-300 text-xs"
                              >
                                <FileText size={12} aria-hidden="true" />
                                {link.label}
                                <ExternalLink size={10} aria-hidden="true" />
                              </a>
                            ))}
                            {exp.title === 'Electronics Engineer Intern' && (
                              <CertificateBadge 
                                certificateImage="/images/YarsaTechCertificationOfExperience.jpg"
                                title="Yarsa Tech Experience Certificate"
                                description="Certificate of experience for Electronics Engineer Internship at Yarsa Tech"
                              />
                            )}
                            {exp.title === 'General Member' && (
                              <CertificateBadge 
                                certificateImage="/images/GeneralMemberCertification.png"
                                title="General Member Certification"
                                description="Official membership certification for Robotics Club"
                              />
                            )}
                            {exp.title === 'Robotics Mentor' && (
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
                            )}
                          </h3>
                          <p className="text-indigo-300 font-semibold text-base mb-1">{exp.company}</p>
                          <p className="text-cyan-400 font-medium text-sm">{exp.period}</p>
                        </div>
                      </div>
                      
                      {/* Type Badge - Below on mobile */}
                      <div className="flex justify-end">
                        <div className={`px-3 py-1.5 rounded-full border-2 inline-flex ${getTypeStyles(exp.type)}`}>
                          <span className="text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                            {getTypeLabel(exp.type)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop/Laptop Layout - Original horizontal layout */}
                    <div className="hidden md:flex items-start gap-6">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${getGradient(exp.type)} rounded-full flex items-center justify-center shadow-lg`} aria-hidden="true">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Title and Company */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                          {exp.title}
                          {/* Certificate badges for specific experiences */}
                          {exp.links?.map((link, linkIndex) => (
                            <a
                              key={linkIndex}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 transition-all duration-300 text-xs"
                            >
                              <FileText size={12} aria-hidden="true" />
                              {link.label}
                              <ExternalLink size={10} aria-hidden="true" />
                            </a>
                          ))}
                          {exp.title === 'Electronics Engineer Intern' && (
                            <CertificateBadge 
                              certificateImage="/images/YarsaTechCertificationOfExperience.jpg"
                              title="Yarsa Tech Experience Certificate"
                              description="Certificate of experience for Electronics Engineer Internship at Yarsa Tech"
                            />
                          )}
                          {exp.title === 'General Member' && (
                            <CertificateBadge 
                              certificateImage="/images/GeneralMemberCertification.png"
                              title="General Member Certification"
                              description="Official membership certification for Robotics Club"
                            />
                          )}
                          {exp.title === 'Robotics Mentor' && (
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
                          )}
                        </h3>
                        <p className="text-indigo-300 font-semibold text-lg mb-1">{exp.company}</p>
                        <p className="text-cyan-400 font-medium">{exp.period}</p>
                      </div>
                      
                      {/* Type Badge - Right side on desktop */}
                      <div className={`px-4 py-2 rounded-full border-2 flex-shrink-0 ${getTypeStyles(exp.type)}`}>
                        <span className="text-sm font-bold uppercase tracking-wide whitespace-nowrap">
                          {getTypeLabel(exp.type)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">{exp.description}</p>

                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                      Key Responsibilities & Achievements
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {exp.responsibilities.map((responsibility, respIndex) => (
                        <div key={respIndex} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span className="text-gray-300 text-sm leading-relaxed">{responsibility}</span>
                        </div>
                      ))}
                    </div>
                    {exp.links && (
                      <div className="mt-5 flex flex-wrap gap-3">
                        {exp.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 transition-all duration-300"
                          >
                            <FileText size={14} aria-hidden="true" />
                            {link.label}
                            <ExternalLink size={12} aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Connection Line (except for last item) */}
                {index < experiences.length - 1 && (
                  <div className="flex justify-center py-4" aria-hidden="true">
                    <div className="w-px h-8 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
