/*
 * File: Achievements.tsx
 * Created Date: Tuesday August 5th 2025
 * Author: Prashant Bhandari
 * Last Modified: Tu/08/2025 05:57:58
 * Modified By: Prashant Bhandari
 */

export default function Achievements() {
  const achievements = [
    {
      title: '1st LOCUS 2025 (Micromouse)',
      description: 'First place in LOCUS 2025 Micromouse competition - Jan 2025',
      icon: 'fas fa-trophy',
      gradient: 'from-yellow-500 to-amber-500'
    },
    {
      title: '2nd Delta 3.0 (Micromouse)',
      description: 'Second place in Delta 3.0 Micromouse competition - Feb 2025',
      icon: 'fas fa-medal',
      gradient: 'from-silver to-gray-600'
    },
    {
      title: '3rd TechFest IIT Bombay (Micromouse)',
      description: 'Third place in TechFest IIT Bombay Micromouse - Dec 2024',
      icon: 'fas fa-award',
      gradient: 'from-amber-600 to-yellow-700'
    },
    {
      title: '1st Runner-Up Autonomous Boat Racing',
      description: 'First Runner-Up in Autonomous Boat Racing Competition - Oct 2024',
      icon: 'fas fa-ship',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      title: '1st Voyager A line Follower Bot',
      description: 'First place in Voyager A line Follower Bot competition - June 2025',
      icon: 'fas fa-robot',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Python Programming Certification',
      description: 'Completed Python Programming: A Concise Introduction - Wesleyan University',
      icon: 'fas fa-certificate',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Machine Learning Certification',
      description: 'Supervised Machine Learning: Regression and Classification - Stanford Online',
      icon: 'fas fa-brain',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      title: 'Robotics Mentor',
      description: 'Volunteer mentor at Karyashala & Engineer Without Borders - 7 days training program',
      icon: 'fas fa-chalkboard-teacher',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ]

  return (
    <section id="achievements" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20"
            >
              <div className={`w-20 h-20 bg-gradient-to-r ${achievement.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`${achievement.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{achievement.title}</h3>
              <p className="text-gray-400">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
