import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-indigo-500/20 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 animate-float">
              <Image
                src="/images/PrashantBhandari.png"
                alt="Prashant Bhandari - Electronics Engineer in Pokhara, Nepal"
                width={320}
                height={320}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 filter grayscale-[20%] contrast-110 hover:grayscale-0 hover:contrast-120"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-yellow-400/10 rounded-full animate-spin-slow"></div>
            </div>
          </div>

          {/* About Text */}
          <div className="flex-1">
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Hello! I&apos;m <span className="text-yellow-400 font-semibold">Prashant Bhandari</span>, 
                an Electronics Engineering student from the beautiful city of Pokhara, Nepal. 
                I&apos;m passionate about robotics, embedded systems, and the endless possibilities 
                that technology brings to solve real-world problems.
              </p>
              
              <p className="text-lg leading-relaxed">
                Currently pursuing my degree in Electronics Engineering at Pashchimanchal Campus, 
                I specialize in embedded systems development, PCB design, and robotics. My journey 
                in technology has been driven by curiosity and a desire to create innovative solutions 
                that make a difference.
              </p>

              <p className="text-lg leading-relaxed">
                As an active member of the Robotics Club and an intern at YarsaTech, I&apos;ve had 
                the opportunity to work on exciting projects ranging from micromouse competitions 
                to complex embedded system designs. I believe in continuous learning and staying 
                updated with the latest technological advancements.
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start p-6 bg-slate-800/50 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1">
                <i className="fas fa-graduation-cap text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mr-4 mt-1"></i>
                <div>
                  <h4 className="font-semibold text-white mb-1">Education</h4>
                  <p className="text-gray-400">Electronics Engineering</p>
                  <p className="text-sm text-gray-500">Pashchimanchal Campus, Pokhara</p>
                </div>
              </div>

              <div className="flex items-start p-6 bg-slate-800/50 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1">
                <i className="fas fa-map-marker-alt text-2xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mr-4 mt-1"></i>
                <div>
                  <h4 className="font-semibold text-white mb-1">Location</h4>
                  <p className="text-gray-400">Pokhara, Nepal</p>
                  <p className="text-sm text-gray-500">City of Lakes</p>
                </div>
              </div>

              <div className="flex items-start p-6 bg-slate-800/50 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1">
                <i className="fas fa-briefcase text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mr-4 mt-1"></i>
                <div>
                  <h4 className="font-semibold text-white mb-1">Experience</h4>
                  <p className="text-gray-400">Electronics Engineer Intern</p>
                  <p className="text-sm text-gray-500">YarsaTech</p>
                </div>
              </div>

              <div className="flex items-start p-6 bg-slate-800/50 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1">
                <i className="fas fa-users text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mr-4 mt-1"></i>
                <div>
                  <h4 className="font-semibold text-white mb-1">Leadership</h4>
                  <p className="text-gray-400">Executive Member</p>
                  <p className="text-sm text-gray-500">Robotics Club WRC</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-6 mt-8">
              {[
                { href: 'https://www.linkedin.com/in/prashantbdri', icon: 'fab fa-linkedin', color: 'from-blue-600 to-blue-700' },
                { href: 'https://github.com/prashantbhandary', icon: 'fab fa-github', color: 'from-gray-700 to-gray-800' },
                { href: 'https://twitter.com/santhprashant', icon: 'fab fa-twitter', color: 'from-blue-400 to-blue-500' },
                { href: 'https://www.instagram.com/_prashant.08/', icon: 'fab fa-instagram', color: 'from-pink-500 to-purple-600' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:shadow-lg relative overflow-hidden group`}
                >
                  <i className={`${social.icon} text-lg relative z-10`}></i>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
