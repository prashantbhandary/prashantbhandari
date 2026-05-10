export default function Skills() {
  const skillCategories = [
    {
      title: 'Microcontrollers',
      icon: 'fas fa-code',
      gradient: 'from-blue-500 to-purple-600',
      skills: ['Arduino', 'ESP32', 'ESP8266', 'STM32']
    },
    {
      title: 'Programming',
      icon: 'fas fa-bolt',
      gradient: 'from-green-500 to-teal-600',
      skills: ['C', 'C++', 'MicroPython', 'Embedded C']
    },
    {
      title: 'Tools',
      icon: 'fas fa-draw-polygon',
      gradient: 'from-purple-500 to-pink-600',
      skills: ['KiCad', 'Proteus', 'LVGL', 'Autodesk']
    },
    {
      title: 'Other',
      icon: 'fas fa-paint-brush',
      gradient: 'from-yellow-500 to-orange-600',
      skills: ['3D Printing', 'IoT', 'Robotics']
    }
  ]

  return (
    <section id="skills" className="py-24 relative bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A comprehensive set of technical skills acquired through academic learning, 
            hands-on projects, and professional experience in electronics and software development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.gradient}`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <i className={`${category.icon} text-2xl text-white`}></i>
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
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30 hover:border-indigo-400/50 hover:bg-indigo-500/20 transition-all duration-300 hover:-translate-y-1 cursor-default relative overflow-hidden group/skill"
                  >
                    <span className="relative z-10">{skill}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover/skill:translate-x-full transition-transform duration-700" />
                  </span>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
