import Image from 'next/image'
import { GraduationCap, MapPin, Briefcase, Users, Linkedin, Github, Twitter, Instagram } from 'lucide-react'

export default function About() {
  const socialLinks = [
    { href: 'https://www.linkedin.com/in/prashantbdri', icon: Linkedin, color: 'from-blue-600 to-blue-700', label: 'LinkedIn profile' },
    { href: 'https://github.com/prashantbhandary', icon: Github, color: 'from-gray-700 to-gray-800', label: 'GitHub profile' },
    { href: 'https://twitter.com/santhprashant', icon: Twitter, color: 'from-gray-400 to-gray-600', label: 'Twitter profile' },
    { href: 'https://www.instagram.com/_prashant.08/', icon: Instagram, color: 'from-pink-500 to-purple-600', label: 'Instagram profile' }
  ]

  const infoCards = [
    {
      icon: GraduationCap,
      title: 'Education',
      info: 'B.E. Electronics, Communication & Information Engineering',
      subInfo: 'Pashchimanchal Campus, Pokhara (2023-Present)',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      icon: MapPin,
      title: 'Location',
      info: 'Pokhara, Nepal',
      subInfo: 'City of Lakes',
      gradient: 'from-green-400 to-blue-400'
    },
    {
      icon: Briefcase,
      title: 'Experience',
      info: 'Electronics Engineer Intern',
      subInfo: 'Yarsa Tech, Pokhara (Jan 2025 - July 2025)',
      gradient: 'from-yellow-400 to-orange-400'
    },
    {
      icon: Users,
      title: 'Leadership',
      info: 'Executive Member',
      subInfo: 'Robotics Club, Pashchimanchal Campus (March 2025 - Present)',
      gradient: 'from-cyan-400 to-blue-400'
    }
  ]

  return (
    <section id="about" className="py-24 relative" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 id="about-heading" className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto rounded-full" aria-hidden="true"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative w-[26rem] h-[32rem] rounded-2xl overflow-hidden border-4 border-indigo-500/20 shadow-2xl bg-gradient-to-br from-slate-800 to-slate-900 hover:shadow-indigo-500/20 transition-all duration-500">
              <Image
                src="/images/IMG_6446.jpeg"
                alt="Prashant Bhandari - Electronics Engineer in Pokhara, Nepal"
                width={416}
                height={512}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 filter grayscale-[20%] contrast-110 hover:grayscale-0 hover:contrast-120"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-yellow-400/10 rounded-2xl" aria-hidden="true"></div>
            </div>
          </div>

          {/* About Text */}
          <div className="flex-1">
            <div className="space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Hello! I&apos;m <span className="text-yellow-400 font-semibold">Prashant Bhandari</span>, 
                an Electronics Engineering student specializing in Robotics, PCB design, and Embedded systems 
                with a proven track record in competition-winning projects.
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {infoCards.map((card, index) => (
                <div
                  key={index}
                  className="flex items-start p-6 bg-slate-800/50 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent mr-4 mt-1`} aria-hidden="true">
                    <card.icon className="w-6 h-6 text-white" style={{ color: 'white' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{card.title}</h4>
                    <p className="text-gray-300">{card.info}</p>
                    <p className="text-sm text-gray-400">{card.subInfo}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-6 mt-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:shadow-lg relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900`}
                >
                  <social.icon className="w-5 h-5 relative z-10" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
