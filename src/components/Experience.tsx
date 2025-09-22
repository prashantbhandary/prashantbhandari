'use client'

import CertificateBadge from './CertificateBadge'

export default function Experience() {
  const experiences = [
    {
      title: 'Electronics Engineer Intern',
      company: 'Yarsa Tech, Pokhara',
      period: 'Jan 2025 - July 2025',
      description: 'Designed and optimized embedded systems, reducing output fluctuations and improving quality assurance through rigorous testing protocols.',
      responsibilities: [
        'Developed embedded applications for ESP32, ESP8266, and STM32 microcontrollers',
        'Designed and programmed BLE-enabled QR/barcode scanner systems',
        'Implemented embedded software for MicroPython and C for commercial products',
        'Developed user interfaces with LVGL graphics library for embedded display systems'
      ],
      type: 'work'
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
      description: 'Developed advanced Micromouse robot using line maze-solving algorithms and coordinated 15-day "Funny Session" workshop, training 100+ students in robotics.',
      responsibilities: [
        'Developed advanced Micromouse robot using line maze-solving algorithms',
        'Coordinated 15-day "Funny Session" workshop, training 100+ students in robotics',
        'Mentored teams for Autonomous Boat Racing Competition, achieving 1st Runner-up position',
        'Participated in various robotics projects and competitions'
      ],
      type: 'education'
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
        return 'fas fa-briefcase'
      case 'leadership':
        return 'fas fa-users'
      case 'education':
        return 'fas fa-graduation-cap'
      case 'volunteer':
        return 'fas fa-heart'
      default:
        return 'fas fa-circle'
    }
  }

  const getGradient = (type: string) => {
    switch (type) {
      case 'work':
        return 'from-blue-500 to-purple-600'
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

  return (
    <section id="experience" className="py-24 relative bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            My journey through academic learning, professional experience, and leadership roles 
            in the field of electronics engineering and robotics.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              {/* Experience Card */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20">
                {/* Header */}
                <div className="flex items-start gap-6 mb-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${getGradient(exp.type)} rounded-full flex items-center justify-center shadow-lg`}>
                    <i className={`${getIcon(exp.type)} text-white text-xl`}></i>
                  </div>
                  
                  {/* Title and Company */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                      {exp.title}
                      {/* Certificate badges for specific experiences */}
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
                  
                  {/* Type Badge */}
                  <div className={`px-4 py-2 rounded-full border-2 ${
                    exp.type === 'work' ? 'bg-blue-500/20 border-blue-400 text-blue-300' :
                    exp.type === 'leadership' ? 'bg-green-500/20 border-green-400 text-green-300' :
                    exp.type === 'education' ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300' :
                    exp.type === 'volunteer' ? 'bg-pink-500/20 border-pink-400 text-pink-300' :
                    'bg-gray-500/20 border-gray-400 text-gray-300'
                  }`}>
                    <span className="text-sm font-bold uppercase tracking-wide">
                      {exp.type === 'work' ? 'Work' :
                       exp.type === 'leadership' ? 'Leadership' :
                       exp.type === 'education' ? 'Education' :
                       exp.type === 'volunteer' ? 'Volunteer' :
                       exp.type}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">{exp.description}</p>

                {/* Responsibilities */}
                <div>
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <i className="fas fa-tasks text-cyan-400"></i>
                    Key Responsibilities & Achievements
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {exp.responsibilities.map((responsibility, respIndex) => (
                      <div key={respIndex} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <i className="fas fa-check-circle text-green-400 text-sm mt-1 flex-shrink-0"></i>
                        <span className="text-gray-300 text-sm leading-relaxed">{responsibility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Connection Line (except for last item) */}
              {index < experiences.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="w-px h-8 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
