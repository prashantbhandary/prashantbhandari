import { ArrowUpRight, Github, Globe } from 'lucide-react'
import { LIVE_SITES, hostOf } from '@/content/live-sites'

/** Home page: one quiet line of links */
export function LiveSitesLine() {
  return (
    <p className="live-line">
      <Globe size={14} aria-hidden="true" />
      <span>Also live on the web:</span>
      {LIVE_SITES.map((site) => (
        <a key={site.id} href={site.url} target="_blank" rel="noopener noreferrer">
          {site.name}
        </a>
      ))}
    </p>
  )
}

/** Bottom of /projects: every live site, each opening in a new tab */
export default function LiveSites() {
  return (
    <section id="live" className="live-sites" aria-labelledby="live-heading">
      <h2 id="live-heading" className="pj-group__title">
        Live on the web
        <span className="pj-count">{LIVE_SITES.length}</span>
      </h2>
      <ul className="work-list mt-4">
        {LIVE_SITES.map((site) => (
          <li key={site.id} className="work-row live-row">
            <span className="work-row__num" aria-hidden="true">
              <Globe size={14} />
            </span>

            <span className="min-w-0">
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="work-row__title live-row__link">
                {site.name}
              </a>
              <span className="work-row__meta block">
                {site.line} <span className="live-row__host">{hostOf(site.url)}</span>
              </span>
            </span>

            <span className="work-row__tags" aria-hidden="true">
              {site.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </span>

            <span className="live-row__actions">
              {site.github && (
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-row__arrow"
                  aria-label={`${site.name} source on GitHub`}
                >
                  <Github size={15} />
                </a>
              )}
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="work-row__arrow"
                aria-label={`Open ${site.name}`}
              >
                <ArrowUpRight size={16} />
              </a>
            </span>
          </li>
        ))}
  </ul>
</section>
  )
}
