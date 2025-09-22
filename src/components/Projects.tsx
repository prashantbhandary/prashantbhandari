'use client'

export default function Projects() {
  const projects = [
    {
      title: 'Micromouse Line Maze-Solving Robot',
      description: 'Designed and programmed a maze-solving robot using Arduino Nano, QTR sensors, and PID control, achieving 95% accuracy in speed and 40% boost in speed and reliability.',
      tech: ['Arduino Nano', 'QTR Sensors', 'PID Control', 'C++', 'Motor Control'],
      icon: 'fas fa-robot',
      gradient: 'from-purple-500 to-pink-500',
      features: [
        'Flood-fill algorithm implementation for maze solving',
        '95% accuracy in navigation and speed optimization',
        'PID control system for precise movement',
        '40% improvement in speed and reliability over previous designs'
      ]
    },
    {
      title: 'Voyager Line Follower Bot',
      description: 'Built line-following robot with ultrasonic obstacle detection, optimized for speed and stability using advanced sensor integration and control algorithms.',
      tech: ['Arduino', 'Ultrasonic Sensors', 'Line Detection', 'Obstacle Avoidance', 'Motor Control'],
      icon: 'fas fa-route',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Advanced line detection and following capabilities',
        'Ultrasonic obstacle detection and avoidance',
        'Optimized for speed and stability',
        'Real-time sensor data processing'
      ]
    },
    {
      title: 'Autonomous Boat Project',
      description: 'Designed and raced an autonomous boat for competition. The team achieved 1st Runner-Up position in the competition through innovative design and programming.',
      tech: ['Microcontroller', 'Autonomous Navigation', 'Competition Design', 'Team Leadership'],
      icon: 'fas fa-ship',
      gradient: 'from-green-500 to-teal-500',
      features: [
        'Autonomous navigation system implementation',
        'Competition-grade design and optimization',
        'Team leadership and project coordination',
        'Achieved 1st Runner-Up position in racing competition'
      ]
    }
  ]

  return (
    <section id="projects" className="py-24 relative bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A showcase of my technical projects spanning embedded systems, robotics, IoT development, 
            and PCB design. Each project demonstrates practical application of engineering principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20 relative"
            >
              {/* Project Image/Icon */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <i className={`${project.icon} text-6xl text-white/90 group-hover:scale-110 transition-transform duration-300`}></i>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Features */}
                <ul className="space-y-1 mb-6">
                  {project.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-gray-400 text-sm flex items-start gap-2">
                      <i className="fas fa-check text-cyan-400 text-xs mt-1 flex-shrink-0"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-full text-xs font-medium border border-yellow-500/30 hover:border-yellow-400/50 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-1 hover:shadow-lg text-sm">
                    <i className="fas fa-eye mr-2"></i>
                    View Details
                  </button>
                  <button className="flex-1 border border-indigo-500/50 text-indigo-300 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-400 text-sm">
                    <i className="fab fa-github mr-2"></i>
                    Source Code
                  </button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* View More Projects */}
        <div className="mt-16 text-center">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              <i className="fas fa-code-branch text-cyan-400 mr-3"></i>
              More Projects Coming Soon
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              I&apos;m constantly working on new projects and experiments. Check out my GitHub 
              for the latest updates and contributions to open-source projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/prashantbhandary"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-700/30"
              >
                <i className="fab fa-github mr-2"></i>
                View GitHub
              </a>
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
                className="border border-cyan-400 text-cyan-400 py-3 px-8 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:text-white"
              >
                <i className="fas fa-handshake mr-2"></i>
                Collaborate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
