import { Cpu, Zap, Code, Cog, Wrench } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from './motion/Motion'

const skillCategories = [
  {
    title: 'PCB Design',
    icon: Cpu,
    skills: ['KiCad', 'Proteus', 'Schematic Capture', 'PCB Layout', 'Buck/Boost Converter Design', 'DRC/ERC'],
  },
  {
    title: 'Embedded Systems',
    icon: Zap,
    skills: ['ESP32', 'Arduino', 'FreeRTOS', 'ECU2000', 'HCM111Z', 'BLE', 'LoRa', 'UART/SPI/I2C'],
  },
  {
    title: 'Programming',
    icon: Code,
    skills: ['C/C++', 'Python', 'MicroPython', 'JavaScript'],
  },
  {
    title: 'Hardware',
    icon: Cog,
    skills: ['IoT Systems', 'Power Electronics', 'QC Test Fixtures', 'Robotics', 'CubeSat Subsystems'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['Git', 'OLED Dashboards', 'Sensor Integration', 'OTA', 'JLCPCB/Gerber Workflows'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="section-index">
            <span>02</span> Capabilities
          </p>
          <h2 id="skills-heading" className="section-title">
            Technical skills
          </h2>
          <p className="section-lead">
            The tools and platforms I reach for when taking a board from schematic to bring-up.
          </p>
        </Reveal>

        <RevealGroup className="skill-grid">
          {skillCategories.map((category) => (
            <RevealItem as="article" key={category.title} className="skill-card card card--hover">
              <div className="skill-card__head">
                <span className="skill-card__icon" aria-hidden="true">
                  <category.icon size={16} />
                </span>
                <h3 className="skill-card__title">{category.title}</h3>
              </div>

              <ul className="tag-row" aria-label={`${category.title} skills`}>
                {category.skills.map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
