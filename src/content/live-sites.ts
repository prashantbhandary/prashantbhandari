/*
 * Web apps and sites that are live somewhere. Kept apart from the projects:
 * they're shown quietly (one line on the home page, a short list at the
 * bottom of /projects) so the site still leads with the hardware and research.
 */

const GITHUB = 'https://github.com/prashantbhandary'

export type LiveSite = {
  id: string
  name: string
  /** Under ~12 words */
  line: string
  url: string
  github?: string
  tags: string[]
}

export const LIVE_SITES: LiveSite[] = [
  {
    id: 'nepse-quant-desk',
    name: 'NEPSE Quant Desk',
    line: 'ML stock ranking for the Nepal Stock Exchange, with an honest walk-forward backtest.',
    url: 'https://prashantbhandary.github.io/nepse-quant-desk/',
    github: `${GITHUB}/nepse-quant-desk`,
    tags: ['Python', 'scikit-learn', 'Flask'],
  },
]

export const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, '')
