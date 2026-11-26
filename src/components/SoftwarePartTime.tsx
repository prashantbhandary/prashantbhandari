import { ArrowUpRight } from 'lucide-react'

/*
 * Part-time software work. Deliberately quieter than the numbered sections:
 * no index, smaller heading, compact padding — the site leads with hardware.
 */

type Product = { name: string; line: string; url?: string; status?: string }

const PRODUCTS: Product[] = [
  {
    name: 'ResumeJP',
    line: 'A Japanese resume (rirekisho) builder for job seekers in Japan.',
    url: 'https://resumejp.com',
  },
  {
    name: 'VisaTomo',
    line: 'Japan visa application forms made simple, in plain English.',
    url: 'https://visatomo.com',
  },
  {
    name: 'Sarathi Connect',
    line: 'An elder-care voice phone helper that connects elderly people with family living far away.',
    url: 'https://sarathiconnect.vercel.app/',
    status: 'In development',
  },
]

export default function SoftwarePartTime() {
  return (
    <section id="software" className="side-work" aria-labelledby="software-heading">
      <div className="shell">
        <div className="side-work__inner">
          <header className="side-work__head">
            <h2 id="software-heading" className="side-work__title">
              Software Engineering — Part-time
            </h2>
            <p className="side-work__role">
              Software Engineer (Part-time) · DigiStart, a bilingual software studio for life in Japan
            </p>
            <p className="side-work__lead">
              Alongside my main work in embedded systems and hardware, I build web products part-time
              at DigiStart.
            </p>
          </header>

          <ul className="side-work__list">
            {PRODUCTS.map((product) => (
              <li key={product.name} className="side-work__item">
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="side-work__name">
                  {product.name}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                {product.status && <span className="tag">{product.status}</span>}
                <span className="side-work__line">{product.line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
