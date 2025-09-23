'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Certificate {
  id: string
  title: string
  description: string
  image: string
  category: 'competition' | 'mentorship' | 'workshop' | 'experience'
  date?: string
  organization?: string
}

interface CertificateModalProps {
  certificate: Certificate | null
  isOpen: boolean
  onClose: () => void
}

export function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  if (!isOpen || !certificate) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-5xl w-full max-h-[95vh] bg-slate-900 rounded-2xl border border-indigo-500/30 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 flex-shrink-0">
          <div>
            <h3 className="text-2xl font-bold text-white">{certificate.title}</h3>
            {certificate.organization && (
              <p className="text-indigo-300">{certificate.organization}</p>
            )}
            {certificate.date && (
              <p className="text-cyan-400 text-sm">{certificate.date}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Certificate Image */}
          <div className="relative w-full min-h-[70vh] bg-slate-800 rounded-lg overflow-hidden mb-6">
            <Image
              src={certificate.image}
              alt={certificate.title}
              fill
              className="object-contain p-4"
              priority
            />
          </div>
          
          {/* Description */}
          {certificate.description && (
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="text-gray-300 leading-relaxed">{certificate.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CertificatesShowcase() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const certificates: Certificate[] = [
    {
      id: 'yarsa-tech-experience',
      title: 'Yarsa Tech Experience Certificate',
      description: 'Certificate of experience for completing Electronics Engineer Internship at Yarsa Tech, Pokhara. Gained hands-on experience in electronics engineering, PCB design, and embedded systems development.',
      image: '/images/YarsaTechCertificationOfExperience.jpg',
      category: 'experience',
      date: 'January 2025 - July 2025',
      organization: 'Yarsa Tech, Pokhara'
    },
    {
      id: 'delta-robothon',
      title: 'Delta Robothon Runner-Up',
      description: 'Second place achievement in Delta Robothon competition, showcasing advanced robotics skills and innovation.',
      image: '/images/DeltaRobothonRunnerUpCertification.jpg',
      category: 'competition',
      date: 'February 2025',
      organization: 'Delta Robothon'
    },
    {
      id: 'mesh-merize-iit',
      title: 'MeshMerize IIT Bombay',
      description: 'Participation certificate from MeshMerize competition at IIT Bombay, one of India\'s premier technical institutes.',
      image: '/images/MeshMerizeIITBombay.png',
      category: 'competition',
      date: 'December 2024',
      organization: 'IIT Bombay'
    },
    {
      id: 'karyashala-mentor',
      title: 'Karyashala Mentor Certification',
      description: 'Certification for mentoring students in robotics and engineering projects at Karyashala workshop.',
      image: '/images/KaryaShalaMentorCertification.jpg',
      category: 'mentorship',
      date: 'July 2024',
      organization: 'Karyashala & Engineer Without Borders'
    },
    {
      id: 'mentorship',
      title: 'Mentorship Certification',
      description: 'Recognition for outstanding mentorship and guidance provided to junior students in robotics and embedded systems.',
      image: '/images/MentorShipCertification.jpg',
      category: 'mentorship',
      date: '2024',
      organization: 'Educational Institution'
    },
    {
      id: 'workshop-lab448',
      title: 'Workshop by Lab448',
      description: 'Completion certificate for advanced workshop conducted by Lab448, focusing on cutting-edge technology and innovation.',
      image: '/images/WokshopBylab448.jpg',
      category: 'workshop',
      date: '2024',
      organization: 'Lab448'
    },
    {
      id: 'general-member',
      title: 'General Member Certification',
      description: 'Official membership certification recognizing active participation and contribution to the robotics club activities.',
      image: '/images/GeneralMemberCertification.png',
      category: 'experience',
      date: 'March 2024 - March 2025',
      organization: 'Robotics Club'
    },
    {
      id: 'battle-for-speed',
      title: 'Battle For Speed 2023 Winner',
      description: 'First place winner in the Battle For Speed 2023 robotics competition with Voyager Line Follower Bot. Built advanced line-following robot with ultrasonic obstacle detection, optimized for speed and stability using advanced sensor integration.',
      image: '/images/BattleForSpeed2023WinnerCertification.jpg',
      category: 'competition',
      date: 'March 2023',
      organization: 'Robotics Competition'
    }
  ]

  const openModal = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedCertificate(null)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'competition': return 'fas fa-trophy'
      case 'mentorship': return 'fas fa-chalkboard-teacher'
      case 'workshop': return 'fas fa-tools'
      case 'experience': return 'fas fa-briefcase'
      default: return 'fas fa-certificate'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'competition': return 'from-yellow-500 to-orange-500'
      case 'mentorship': return 'from-green-500 to-teal-500'
      case 'workshop': return 'from-pink-500 to-red-500'
      case 'experience': return 'from-purple-500 to-violet-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const categories = ['competition', 'mentorship', 'workshop', 'experience']
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredCertificates = activeCategory === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === activeCategory)

  return (
    <>
      <section id="certificates" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Certificates & Awards
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Recognition and certifications earned through competitions, mentorship, workshops, and active participation 
              in various technical and leadership activities.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
                  : 'bg-slate-800/50 text-gray-400 hover:text-white border border-slate-600'
              }`}
            >
              All Certificates
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category
                    ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg`
                    : 'bg-slate-800/50 text-gray-400 hover:text-white border border-slate-600'
                }`}
              >
                <i className={getCategoryIcon(category)}></i>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((certificate) => (
              <div
                key={certificate.id}
                onClick={() => openModal(certificate)}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20 cursor-pointer"
              >
                {/* Certificate Preview */}
                <div className="relative h-48 bg-slate-700/50 overflow-hidden">
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(certificate.category)} text-white text-xs font-semibold flex items-center gap-1`}>
                    <i className={getCategoryIcon(certificate.category)}></i>
                    {certificate.category}
                  </div>

                  {/* View Icon */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="fas fa-eye text-white"></i>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {certificate.title}
                  </h3>
                  {certificate.organization && (
                    <p className="text-indigo-300 text-sm mb-2">{certificate.organization}</p>
                  )}
                  {certificate.date && (
                    <p className="text-cyan-400 text-sm mb-3">{certificate.date}</p>
                  )}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {certificate.description}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-medium">
                    <span>Click to view certificate</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCertificates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No certificates found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </>
  )
}