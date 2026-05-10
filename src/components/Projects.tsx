'use client'

import Image from 'next/image'
import CertificateBadge from './CertificateBadge'

export default function Projects() {
  const projects = [
    {
      title: 'Micromouse Robot (Maze-Solving)',
      summary: 'Arduino Nano micromouse using QTR sensors, PID control, and flood-fill maze-solving.',
      outcome: '95% maze accuracy with a 40% speed boost over previous iterations.',
      techStack: ['Arduino Nano', 'QTR Sensors', 'PID Control', 'Flood-Fill Algorithm', 'C++'],
      image: '/images/MicroMouse.jpg',
      demoEmbedUrl: '',
      primaryLink: 'https://github.com/prashantbhandary/',
      secondaryLink: 'https://github.com/prashantbhandary/',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'BLE QR/Barcode Scanner',
      summary: 'ESP32 BLE QR/Barcode scanner with LVGL UI and robust firmware stack.',
      outcome: 'Improved scan reliability and operator feedback with BLE status dashboards.',
      techStack: ['ESP32', 'BLE', 'LVGL', 'C/C++', 'MicroPython'],
      image: '/images/file.svg',
      demoEmbedUrl: '',
      primaryLink: 'https://github.com/prashantbhandary/',
      secondaryLink: 'https://github.com/prashantbhandary/',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Line-Following Robot',
      summary: 'High-speed line follower with ultrasonic obstacle detection and tuned control loops.',
      outcome: 'Optimized speed and stability with reliable obstacle avoidance.',
      techStack: ['Arduino', 'Ultrasonic Sensors', 'Line Sensors', 'Motor Control', 'PID Tuning'],
      image: '/images/VoyagerBot2023.jpg',
      demoEmbedUrl: '',
      primaryLink: 'https://github.com/prashantbhandary/',
      secondaryLink: 'https://github.com/prashantbhandary/',
      gradient: 'from-green-500 to-teal-500'
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
              <div className={`h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                {project.demoEmbedUrl ? (
                  <iframe
                    src={project.demoEmbedUrl}
                    title={`${project.title} demo`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={420}
                    height={240}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300 flex items-center gap-3">
                  {project.title}
                  {project.title === 'Micromouse Robot (Maze-Solving)' && (
                    <div className="flex gap-1">
                      <CertificateBadge 
                        certificateImage="/images/BattleForSpeed2023WinnerCertification.jpg"
                        title="Battle For Speed 2023 Winner"
                        description="First place winner in Battle For Speed robotics competition"
                        size="sm"
                      />
                      <CertificateBadge 
                        certificateImage="/images/DeltaRobothonRunnerUpCertification.jpg"
                        title="Delta Robothon Runner-Up"
                        description="Second place in Delta Robothon competition"
                        size="sm"
                      />
                      <CertificateBadge 
                        certificateImage="/images/MeshMerizeIITBombay.png"
                        title="MeshMerize IIT Bombay"
                        description="Participation in MeshMerize competition at IIT Bombay"
                        size="sm"
                      />
                    </div>
                  )}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-3 leading-relaxed">
                  {project.summary}
                </p>

                <p className="text-cyan-300 text-sm font-medium mb-4">
                  {project.outcome}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, techIndex) => (
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
                  <a 
                    href={project.primaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-1 hover:shadow-lg text-sm text-center"
                  >
                    <i className="fas fa-link mr-2"></i>
                    Project Link
                  </a>
                  <a 
                    href={project.secondaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-indigo-500/50 text-indigo-300 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-400 text-sm text-center"
                  >
                    <i className="fab fa-github mr-2"></i>
                    Source Code
                  </a>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
