import { Cpu, Zap, Code, Cog, Wrench } from 'lucide-react'

export default function Skills() {
  const skillCategories = [
    {
      title: 'PCB Design',
      icon: Cpu,
      gradient: 'from-blue-500 to-purple-600',
      skills: ['KiCad', 'Proteus', 'Schematic Capture', 'PCB Layout', 'Buck/Boost Converter Design', 'DRC/ERC']
    },
    {
      title: 'Embedded Systems',
      icon: Zap,
      gradient: 'from-green-500 to-teal-600',
      skills: ['ESP32', 'Arduino', 'FreeRTOS', 'ECU2000', 'HCM111Z', 'BLE', 'LoRa', 'UART/SPI/I2C']
    },
    {
      title: 'Programming',
      icon: Code,
      gradient: 'from-purple-500 to-pink-600',
      skills: ['C/C++', 'Python', 'MicroPython', 'JavaScript']
    },
    {
      title: 'Hardware',
      icon: Cog,
      gradient: 'from-yellow-500 to-orange-600',
      skills: ['IoT Systems', 'Power Electronics', 'QC Test Fixtures', 'Robotics', 'CubeSat Subsystems']
    },
    {
      title: 'Tools',
      icon: Wrench,
      gradient: 'from-indigo-500 to-blue-600',
      skills: ['Git', 'OLED Dashboards', 'Sensor Integration', 'OTA', 'JLCPCB/Gerber Workflows']
    }
  ]

  return (
    <section id="skills" className="py-16 md:py-20 relative section-3d" aria-labelledby="skills-heading">
      <div className="accent-orbs" aria-hidden="true">
        <div className="accent-orb orb-2" />
        <div className="accent-orb orb-3" />
      </div>
      <div className="max-w-6xl mx-auto px-5 relative z-10">
        <div className="text-center mb-12 reveal">
          <h2 id="skills-heading" className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full mb-4" aria-hidden="true"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            A comprehensive set of technical skills acquired through academic learning, 
            hands-on projects, and professional experience in electronics and software development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-group">
          {skillCategories.map((category, index) => (
            <article
              key={index}
              className="group rounded-2xl p-8 relative overflow-hidden depth-card edge-glow lift shine-line"
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.gradient}`} aria-hidden="true"></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`} aria-hidden="true">
                <category.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-6 group-hover:text-indigo-300 transition-colors duration-300">
                {category.title}
              </h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-4 py-2 text-indigo-200 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-1 cursor-default relative overflow-hidden group/skill chip-3d"
                  >
                    <span className="relative z-10">{skill}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover/skill:translate-x-full transition-transform duration-700" aria-hidden="true" />
                  </span>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
