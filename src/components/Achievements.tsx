/*
 * File: Achievements.tsx
 * Created Date: Tuesday August 5th 2025
 * Author: Prashant Bhandari
 * Last Modified: Tu/08/2025 05:57:58
 * Modified By: Prashant Bhandari
 */

export default function Achievements() {
    const achievements = [
      'Top 25 Nationwide – U.S.–Nepal Startup Weekend Challenge (Safety Modules), 2026',
      'International Finalist – Techfest IIT Bombay, representing Nepal (Safety Modules), 2025',
      '1st Place – LOCUS 2025 Micromouse, IOE Pulchowk Campus',
      '2nd Place – Delta Robothon (Micromouse), 2025',
      '5th Place – Meshmerize (Micromouse), Techfest IIT Bombay, representing Nepal, 2024',
      '1st Runner-Up – Autonomous Boat Racing, Robotics Club WRC 2024',
      'Winner – Battle For Speed / Line Follower Competition, Robotics Club 2023',
    ]

  return (
    <section id="achievements" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Achievements
          </h2>
          <div className="section-rule"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement) => (
            <div
                key={achievement}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20"
            >
                <p className="text-gray-400">{achievement}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
