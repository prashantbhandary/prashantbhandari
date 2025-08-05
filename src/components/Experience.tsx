'use client'

export default function Experience() {
  const experiences = [
    {
      title: 'Electronics Engineer Intern',
      company: 'YarsaTech',
      period: '2024 - Present',
      description: 'Working on embedded systems development and IoT solutions. Gaining hands-on experience in real-world electronics projects and product development.',
      responsibilities: [
        'Developed embedded system solutions using Arduino and ESP32',
        'Collaborated on IoT device development and testing',
        'Assisted in PCB design and circuit optimization',
        'Participated in product testing and quality assurance'
      ],
      type: 'work'
    },
    {
      title: 'Executive Member',
      company: 'Robotics Club WRC',
      period: '2023 - Present',
      description: 'Leading robotics initiatives and organizing technical events. Mentoring junior members and driving innovation in robotics projects.',
      responsibilities: [
        'Organized robotics competitions and technical workshops',
        'Mentored students in robotics and embedded systems',
        'Led project teams for various robotics competitions',
        'Coordinated with industry professionals for knowledge sharing'
      ],
      type: 'leadership'
    },
    {
      title: 'Robotics Club Member',
      company: 'Pashchimanchal Campus',
      period: '2022 - 2023',
      description: 'Active participation in robotics projects and competitions. Developed skills in robot design, programming, and team collaboration.',
      responsibilities: [
        'Participated in micromouse competition development',
        'Collaborated on line-following and obstacle-avoiding robots',
        'Learned advanced robotics concepts and applications',
        'Contributed to club\'s technical documentation'
      ],
      type: 'education'
    },
    {
      title: 'Electronics Engineering Student',
      company: 'Pashchimanchal Campus, Pokhara',
      period: '2021 - Present',
      description: 'Pursuing Bachelor\'s degree in Electronics Engineering with focus on embedded systems, robotics, and digital signal processing.',
      responsibilities: [
        'Completed coursework in circuit analysis and design',
        'Worked on various lab projects and assignments',
        'Participated in academic research projects',
        'Maintained excellent academic performance'
      ],
      type: 'education'
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
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-5">
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

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-center mb-12 last:mb-0">
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={`w-6 h-6 bg-gradient-to-r ${getGradient(exp.type)} rounded-full border-4 border-slate-900 shadow-lg`}></div>
              </div>

              {/* Content */}
              <div className={`w-full ${index % 2 === 0 ? 'pr-1/2 text-right' : 'pl-1/2 text-left'}`}>
                <div className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                  {/* Header */}
                  <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <div className={`w-12 h-12 bg-gradient-to-r ${getGradient(exp.type)} rounded-full flex items-center justify-center shadow-lg ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                      <i className={`${getIcon(exp.type)} text-white text-lg`}></i>
                    </div>
                    <div className={`${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-indigo-300 font-semibold">{exp.company}</p>
                      <p className="text-cyan-400 text-sm font-medium">{exp.period}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                  {/* Responsibilities */}
                  <ul className={`space-y-2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    {exp.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className={`text-gray-400 text-sm flex items-start gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <i className={`fas fa-chevron-right text-cyan-400 text-xs mt-1 ${index % 2 === 0 ? 'order-2' : 'order-1'}`}></i>
                        <span className={`${index % 2 === 0 ? 'order-1' : 'order-2'}`}>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              <i className="fas fa-rocket text-cyan-400 mr-3"></i>
              Looking Forward
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              I&apos;m always excited about new opportunities to learn, grow, and contribute to innovative 
              projects in electronics, robotics, and embedded systems development.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('contact')
                if (element) {
                  const headerHeight = 80
                  const elementPosition = element.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                }
              }}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
