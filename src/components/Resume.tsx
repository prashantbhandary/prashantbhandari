'use client'

import Link from 'next/link'

export default function Resume() {
  const handleDownloadPDF = () => {
    const link = document.createElement('a')
    link.href = '/Resume.pdf'
    link.download = 'Prashant_Bhandari_Resume.pdf'
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-5">
        {/* Header with Back button and Download PDF */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            href="/"
            className="group flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
          >
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform duration-300"></i>
            Back to Portfolio
          </Link>
          
          <button
            onClick={handleDownloadPDF}
            className="group bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/30 flex items-center gap-2"
          >
            <i className="fas fa-download group-hover:scale-110 transition-transform duration-300"></i>
            Download PDF
          </button>
        </div>

        {/* Resume Content */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Prashant Bhandari</h1>
            <div className="flex justify-center items-center gap-4 text-lg">
              <span>📧 santhprashant@gmail.com</span>
              <span>📱 +977 9867756915</span>
            </div>
            <div className="flex justify-center items-center gap-4 mt-2">
              <a href="https://linkedin.com/in/prashantbdri" target="_blank" className="hover:text-yellow-300 transition-colors">
                <i className="fab fa-linkedin mr-1"></i> /prashantbdri
              </a>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Summary */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">SUMMARY</h2>
              <p className="text-gray-700 leading-relaxed">
                Electronics Engineering student with hands-on experience in Robotics, PCB designs, and Embedded systems. 
                Proven track record in leading projects, mentoring teams, and delivering competition-winning designs.
              </p>
            </section>

            {/* Technical Skills */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">TECHNICAL SKILLS</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• PCB Design:</h3>
                  <p className="text-gray-700 ml-4">KiCad, Proteus</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Embedded Systems:</h3>
                  <p className="text-gray-700 ml-4">Arduino, ESP32, ECU3000, Helios SDK, HCM111Z</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Programming Languages:</h3>
                  <p className="text-gray-700 ml-4">C, C++, Python, JavaScript, Micro Python</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• UI Development:</h3>
                  <p className="text-gray-700 ml-4">LVGL Graphics Library</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Machine Learning:</h3>
                  <p className="text-gray-700 ml-4">Linear Regression, Classification</p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">EDUCATION</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800">B.E. Electronics, Communication & Information Engineering</h3>
                  <p className="text-gray-700">Pashchimanchal Campus, Pokhara (Jan 2023 to Present), 3rd year currently</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">XII, Science Stream (NEB)</h3>
                  <p className="text-gray-700">Motherland Secondary School, 2023</p>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">EXPERIENCE</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Executive Member - Robotics Club, Pashchimanchal Campus (March 2025 – Present)</h3>
                  <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                    <li>Lead functional teams and coordinate club technical activities</li>
                    <li>Mentor 50+ members in microcontroller programming and PCB design</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Electronics Engineer Intern - Yarsa Tech, Pokhara (Jan 2025 – July 2025)</h3>
                  <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                    <li>Designed and optimized embedded systems, reducing output fluctuations</li>
                    <li>Developed QR/barcode scanner systems, improving quality assurance</li>
                    <li>Designed and programmed BLE-enabled QR/barcode scanner systems</li>
                    <li>Implemented embedded software for MicroPython and C for commercial products</li>
                    <li>Developed user interfaces with LVGL graphics library for embedded display systems</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">General Member - Robotics Club Pashchimanchal Campus (March 2024 – March 2025)</h3>
                  <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                    <li>Developed advanced Micromouse robot using line maze-solving algorithms</li>
                    <li>Coordinated 15-day &ldquo;Rainy Session&rdquo; workshop, training 100+ students in robotics</li>
                    <li>Mentored teams for Autonomous Boat Racing Competition, achieving 1st Runner-up position</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">PROJECTS</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Micromouse Line Maze-Solving Robot</h3>
                  <p className="text-gray-700 ml-4">Designed and programmed a maze-solving robot using Arduino Nano, QTR sensors, and PID control, achieving 95% accuracy in navigation and boosting speed and reliability by 40%.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Voyager Line Follower Bot</h3>
                  <p className="text-gray-700 ml-4">Built line-following robot with ultrasonic obstacle detection, optimized for speed and stability.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Autonomous Boat Project</h3>
                  <p className="text-gray-700 ml-4">Designed and raced an autonomous boat for competition. The team won 1st Runner-Up in competition.</p>
                </div>
              </div>
            </section>

            {/* Achievements */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">ACHIEVEMENTS</h2>
              <div className="grid md:grid-cols-2 gap-2">
                <div className="text-gray-700">• 1st LOCUS 2025 (Micromouse) - Jan 2025</div>
                <div className="text-gray-700">• 2nd Delta 3.0 (Micromouse) - Feb 2025</div>
                <div className="text-gray-700">• 3rd TechFest, IIT Bombay (Micromouse) - Dec 2024</div>
                <div className="text-gray-700">• 1st Runner-Up Autonomous Boat Racing Competition - Oct 2024</div>
                <div className="text-gray-700">• 1st Voyager, A line Follower Bot - June 2025</div>
              </div>
            </section>

            {/* Volunteer */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">VOLUNTEER</h2>
              <div>
                <h3 className="font-semibold text-gray-800">Robotics Mentor - Karyashala & Engineer Without Borders (July 2024, 7 days)</h3>
                <p className="text-gray-700 ml-4">Guided students through 3D design, 3D printing, and ESP32-based projects.</p>
              </div>
            </section>

            {/* Courses */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">COURSES</h2>
              <div className="space-y-2">
                <div className="text-gray-700">• Python Programming: A Concise Introduction - Wesleyan University</div>
                <div className="text-gray-700">• Supervised Machine Learning: Regression and Classification - Stanford Online</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}