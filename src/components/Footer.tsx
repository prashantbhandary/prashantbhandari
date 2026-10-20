import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './motion/Motion'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <Reveal className="footer-top">
          <div>
            <p className="eyebrow mb-3">Stay curious. Keep building.</p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--ink)',
              }}
            >
              Prashant Bhandari
            </p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9375rem', color: 'var(--ink-3)' }}>
              Electronics Engineering Student · Robotics Enthusiast · Embedded Systems Developer
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <p className="eyebrow">Founder of</p>
            <a
              href="https://electrophobia.tech"
              target="_blank"
              rel="noopener"
              className="footer-sister card card--hover"
            >
              <span className="footer-sister__name">
                ElectroPhobia
                <ArrowUpRight size={14} aria-hidden="true" style={{ color: 'var(--ink-4)' }} />
              </span>
              <span className="footer-sister__text">
                Electronics mentorship, workshops and a hands-on circuits lab.
              </span>
            </a>
          </div>

          <div className="flex flex-col items-start gap-2">
            <p className="eyebrow">Proudly sponsored by</p>
            <a
              href="https://www.nextpcb.com/"
              target="_blank"
              rel="noopener"
              aria-label="NextPCB — PCB manufacturing & PCBA assembly services"
              className="card card--hover inline-flex items-center px-4 py-2.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/nextpcb.svg" alt="NextPCB" width={150} height={41} className="h-6 w-auto" />
            </a>
            <p style={{ fontSize: '0.8125rem', color: 'var(--ink-3)' }}>
              Thanks to{' '}
              <a
                href="https://www.nextpcb.com/"
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--ink)', fontWeight: 500 }}
              >
                NextPCB
              </a>{' '}
              for the PCB &amp; PCBA services.
            </p>
          </div>
        </Reveal>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Prashant Bhandari. All rights reserved.</p>
          <Link href="/projects" style={{ color: 'var(--ink-3)' }}>
            Project write-ups
          </Link>
          <a
            href="https://github.com/prashantbhandary"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1"
            style={{ color: 'var(--ink-3)' }}
          >
            github.com/prashantbhandary
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
