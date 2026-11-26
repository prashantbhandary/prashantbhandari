/*
 * Technical reports and design notes, shown at /publications and on the home page.
 *
 * The papers are not hosted here: each one links out to its ResearchGate
 * page (or the Google Scholar profile when it has none), so reads and
 * citations are counted there. To add a ResearchGate link or DOI later,
 * edit only this file.
 */

export const SCHOLAR_URL = 'https://scholar.google.com/citations?user=hDOs2vwAAAAJ'
export const RESEARCHGATE_URL = 'https://www.researchgate.net/profile/Prashant-Bhandari-8'

/** The site owner, shown in bold in author lists */
export const ME = 'Prashant Bhandari'

export type Publication = {
  slug: string
  /** Exact title as printed on the paper */
  title: string
  /** "First Last", in paper order */
  authors: string[]
  /** YYYY-MM */
  date: string
  year: number
  type: 'Technical Report'
  institution: string
  /** Bare DOI, e.g. 10.13140/RG.2.2.30919.12966 */
  doi?: string
  researchgate?: string
  /** Extra acknowledgement shown under the institution */
  note?: string
}

const IOE = 'IOE Pashchimanchal Campus, Tribhuvan University'

export const PUBLICATIONS: Publication[] = [
  {
    slug: 'greenhouse-esp32-ble',
    title:
      'Solar-Powered Real-Time Greenhouse Automation with ESP32 and Bluetooth Low Energy: Design and a Field Comparison of Automatic and Manual Control',
    authors: ['Icchya Bhattarai', 'Nandita Tiwari', 'Prashant Bhandari', 'Sujal Shrestha', 'Hom Nath Tiwari'],
    date: '2026-05',
    year: 2026,
    type: 'Technical Report',
    institution: IOE,
    doi: '10.13140/RG.2.2.30919.12966',
    researchgate: 'https://www.researchgate.net/publication/418396578',
  },
  {
    slug: 'line-maze-micromouse',
    title:
      'Design of a Line-Maze Micromouse with PD Line Following and In-Run Path Simplification: Four Hardware Revisions and Competition Results',
    authors: ['Prashant Bhandari', 'Aabiskar Regmi', 'Sanjog Sapkota', 'Siddartha Gupta'],
    date: '2025-09',
    year: 2025,
    type: 'Technical Report',
    institution: IOE,
    note: 'Robotics Club, IOE Pashchimanchal Campus',
    doi: '10.13140/RG.2.2.27563.68649',
    researchgate: 'https://www.researchgate.net/publication/418397168',
  },
  {
    slug: 'sentinel-smart-helmet',
    title:
      'Sentinel Helmet: A Low-Cost BLE Smart Safety Helmet for Worker Vital-Sign Monitoring, Impact Detection and Risk Prediction',
    authors: ['Aabiskar Regmi', 'Prashant Bhandari', 'Rajan Lamichhane', 'Ritushwar Neupane'],
    date: '2025-12',
    year: 2025,
    type: 'Technical Report',
    institution: IOE,
    doi: '10.13140/RG.2.2.34274.57284',
    researchgate: 'https://www.researchgate.net/publication/418396787',
  },
  {
    slug: 'ofdm-qpsk-numpy',
    title:
      'An End-to-End OFDM–QPSK Text Link in Plain NumPy: Implementation and Bit-Error-Rate Validation Against Theory',
    authors: ['Prashant Bhandari'],
    date: '2026-09',
    year: 2026,
    type: 'Technical Report',
    institution: IOE,
    doi: '10.13140/RG.2.2.19175.07844',
    researchgate: 'https://www.researchgate.net/publication/418396869',
  },
  {
    slug: 'mspm0g3507-dev-board',
    title:
      'A Compact USB-C Development Board for the TI MSPM0G3507 Cortex-M0+ Microcontroller: Design Note',
    authors: ['Prashant Bhandari'],
    date: '2026-10',
    year: 2026,
    type: 'Technical Report',
    institution: IOE,
    doi: '10.13140/RG.2.2.15819.63526',
    researchgate: 'https://www.researchgate.net/publication/418396481',
  },
  {
    slug: 'nepse-ml-stock-ranking',
    title:
      'Machine-Learning Stock Ranking on the Nepal Stock Exchange: A Walk-Forward Evaluation with Realistic Trading Costs',
    authors: ['Prashant Bhandari'],
    date: '2026-10',
    year: 2026,
    type: 'Technical Report',
    institution: IOE,
  },
  {
    slug: 'maddpg-swarm-esp32',
    title:
      'Communication-Aware Multi-Robot Control with MADDPG: Joint Transmit-Power and Velocity Learning over a Fading Channel, with a First ESP32 Hardware Test',
    authors: ['Prashant Bhandari'],
    date: '2026-05',
    year: 2026,
    type: 'Technical Report',
    institution: IOE,
  },
  {
    slug: 'pocketqube-electronics',
    title:
      'Electronics Design of a Low-Cost 1.5U PocketQube Educational Satellite Model with LoRa Telemetry and Stacked PCBs',
    authors: ['Prashant Bhandari'],
    date: '2026-01',
    year: 2026,
    type: 'Technical Report',
    institution: `SEDS Nepal and ${IOE}`,
  },
  {
    slug: 'breathing-led-heart-555',
    title:
      'A Code-Free "Breathing" LED Heart: 555 Triangle-Ramp Generation with an Emitter-Follower LED Driver: Design Note',
    authors: ['Prashant Bhandari'],
    date: '2026-02',
    year: 2026,
    type: 'Technical Report',
    institution: IOE,
  },
  {
    slug: 'seven-segment-esp32',
    title:
      'A Large 4-Digit Seven-Segment Display from 60 Discrete SMD LEDs, Multiplexed by an ESP32: Design Note',
    authors: ['Prashant Bhandari'],
    date: '2026-06',
    year: 2026,
    type: 'Technical Report',
    institution: IOE,
  },
]

/** Newest first; ties keep table order */
export const SORTED_PUBLICATIONS = [...PUBLICATIONS].sort((a, b) => b.date.localeCompare(a.date))

export const doiUrl = (doi: string) => `https://doi.org/${doi}`

/** Where a paper's card sends readers: its ResearchGate page, else the Scholar profile */
export const paperHref = (pub: Publication) => pub.researchgate ?? SCHOLAR_URL
