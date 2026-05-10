'use client'

import Link from 'next/link'

export default function Resume() {
  const handleDownloadPDF = () => {
    const link = document.createElement('a')
    link.href = '/resume_prashant.pdf'
    link.download = 'resume_prashant.pdf'
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
              <span>+977 9867756915</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
              <a href="https://www.linkedin.com/in/prashantbdri/" target="_blank" className="hover:text-yellow-300 transition-colors">
                <i className="fab fa-linkedin mr-1"></i> LinkedIn
              </a>
              <a href="https://github.com/prashantbhanadry" target="_blank" className="hover:text-yellow-300 transition-colors">
                <i className="fab fa-github mr-1"></i> GitHub
              </a>
              <a href="https://bhandari-prashant.com.np" target="_blank" className="hover:text-yellow-300 transition-colors">
                <i className="fas fa-globe mr-1"></i> Portfolio
              </a>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Summary */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">SUMMARY</h2>
              <p className="text-gray-700 leading-relaxed">
                Electronics Engineering student specializing in PCB design, embedded firmware development, and IoT/robotics systems.
                Proven track record with ESP32, KiCad, C/C++, and MicroPython; shipped hardware from schematic through production
                across satellite, industrial, and consumer IoT domains. International competition finalist with hands-on leadership
                of 350+ students in embedded systems.
              </p>
            </section>

            {/* Technical Skills */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">TECHNICAL SKILLS</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• PCB Design:</h3>
                  <p className="text-gray-700 ml-4">KiCad, Proteus, Schematic Capture, PCB Layout, Buck/Boost Converter Design, DRC/ERC</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Embedded Systems:</h3>
                  <p className="text-gray-700 ml-4">ESP32, Arduino, FreeRTOS, ECU2000, HCM111Z, BLE, LoRa, UART/SPI/I2C</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Programming Languages:</h3>
                  <p className="text-gray-700 ml-4">C/C++, Python, MicroPython, JavaScript</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Hardware:</h3>
                  <p className="text-gray-700 ml-4">IoT Systems, Power Electronics, QC Test Fixtures, Robotics, CubeSat Subsystems</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Tools:</h3>
                  <p className="text-gray-700 ml-4">Git, OLED Dashboards, Sensor Integration, OTA, JLCPCB/Gerber Workflows</p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">EDUCATION</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-800">Pashchimanchal Campus (Tribhuvan University)</h3>
                  <p className="text-gray-700">B.E. in Electronics, Communication &amp; Information Engineering (2023 - Present, 4th Year)</p>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">EXPERIENCE</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Electronics Design Intern - SEDS Nepal (Remote), Pokhara, Nepal (Sept 2025 - Jan 2026)</h3>
                  <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                    <li>Designed electronics modules for pseudo-satellite (HAPS) systems, ensuring modular and reproducible architecture</li>
                    <li>Performed component selection, BOM budgeting, and design reviews across interdisciplinary satellite subsystems</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Electronics Engineer Intern - YarsaTech, Pokhara, Nepal (Jan 2025 - Jul 2025)</h3>
                  <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                    <li>Designed and optimized buck converter circuits; improved layout across multiple iterations using KiCad</li>
                    <li>Developed automated QC testing device for power backup products using MicroPython and custom firmware</li>
                    <li>Built BLE-enabled QR/barcode scanner system; implemented complete firmware stack in C/C++</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">PROJECTS</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">LoRaNet Communication Module</h3>
                  <p className="text-gray-700 ml-4">Designed full schematic and multi-layer PCB for a long-range wireless system achieving ~7 km LoS range. Implemented embedded firmware for reliable packet transmission over LoRa transceivers.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">DC-DC Buck Converter</h3>
                  <p className="text-gray-700 ml-4">Designed 12V-to-5V converter from schematic through PCB; iterated layout to achieve ~90% efficiency and reduced ripple suitable for embedded and industrial use.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Micromouse Autonomous Maze-Solving Robot</h3>
                  <p className="text-gray-700 ml-4">Designed custom PCB reducing board size by 40%; achieved 95% navigation accuracy with PID motion control. Awards: 1st Place LOCUS 2025, 2nd Place Delta 5.0, 5th Place Techfest IIT Bombay.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Pocket CubeSat Module (1.5U PocketQube)</h3>
                  <p className="text-gray-700 ml-4">Designed stacked PCB architecture integrating OBC, power management, sensors, and LoRa comms in a 1.5U form factor with Li-Po solar charging.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Solar Greenhouse Automation System</h3>
                  <p className="text-gray-700 ml-4">Built solar-powered system monitoring soil, temperature, and humidity; automated irrigation via MOSFET control with BLE data transmission and real-time OLED dashboard.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Smart Helmet Safety System</h3>
                  <p className="text-gray-700 ml-4">Developed wearable prototype with pulse/SpO2 sensing, fall detection, and SOS alerts transmitted via BLE to a supervisor dashboard.</p>
                </div>
              </div>
            </section>

            {/* Achievements */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">LEADERSHIP</h2>
              <div>
                <h3 className="font-semibold text-gray-800">Electronics &amp; Software Lead - Robotics Club, Pashchimanchal Campus (2024 - 2026)</h3>
                <ul className="list-disc list-inside text-gray-700 ml-4 space-y-1">
                  <li>Mentored 350+ students in embedded systems and PCB design; initiated in-house PCB prototyping lab</li>
                  <li>Led competition robotics projects; organized workshops and technical training programs</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">ACHIEVEMENTS</h2>
              <div className="grid md:grid-cols-2 gap-2">
                <div className="text-gray-700">• Top 25 Nationwide - U.S.-Nepal Startup Weekend Challenge (Safety Modules), 2026</div>
                <div className="text-gray-700">• International Finalist - Techfest IIT Bombay (Safety Modules), 2025</div>
                <div className="text-gray-700">• 1st Place - LOCUS 2025 Micromouse, IOE Pulchowk Campus</div>
                <div className="text-gray-700">• 1st Runner-Up - Autonomous Boat Racing, Robotics Club WRC 2024</div>
                <div className="text-gray-700">• 1st Place - Line Follower Competition, Robotics Club WRC 2023</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}