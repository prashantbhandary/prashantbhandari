/*
 * Everything shown in the Work section and at /projects.
 *
 *  - PROJECTS: long-form write-ups, each with its own page at /projects/<slug>.
 *    `sections` become the article body and its table of contents.
 *  - OTHER_WORK: projects listed as cards only, linking out to GitHub.
 *  - WORK: both merged into one card list, which every listing reads.
 *
 * Every project must have a GitHub link. Images go in
 * public/images/projects/<id>/. New write-ups also go in public/sitemap.xml.
 *
 * Paragraph text understands `code` and **bold**. A `tree` block is written
 * as an indented listing (2 spaces per level) with optional `# notes`.
 */

import type { LucideIcon } from 'lucide-react'
import { Bot, CircuitBoard, Cpu, FlaskConical, HardHat } from 'lucide-react'
import { MORE_WRITEUPS } from './project-writeups'

export type Category = 'robotics' | 'pcb' | 'embedded' | 'research'

export type Figure = {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
  /** Plots and schematics sit on white; renders fill the frame */
  fit?: 'cover' | 'contain'
}

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'flow'; stages: { label: string; note?: string }[]; caption?: string }
  | { type: 'tree'; listing: string; caption?: string }
  | { type: 'table'; columns: string[]; rows: string[][]; caption?: string }
  | { type: 'figure'; figure: Figure }
  | { type: 'gallery'; figures: Figure[] }
  | { type: 'code'; lang: string; code: string; caption?: string }
  | { type: 'callout'; tone: 'note' | 'result'; title: string; text: string }
  | { type: 'stats'; items: { value: string; label: string }[] }

export type Section = { id: string; title: string; blocks: Block[] }

/** A paper, app note or datasheet the project builds on — every project has some */
export type Reading = {
  title: string
  /** Authors or publisher, then venue */
  source: string
  year?: number
  kind: 'Paper' | 'App note' | 'Datasheet' | 'Standard' | 'Guide'
  href: string
}

const doi = (id: string) => `https://doi.org/${id}`

export type ProjectLink = {
  label: string
  href: string
  kind: 'source' | 'doc' | 'bom'
}

export type Project = {
  slug: string
  title: string
  /** One sentence for the article lead and meta description */
  summary: string
  /** Under ~12 words, for cards */
  line: string
  category: Category
  /** What kind of work, shown as the card's eyebrow */
  kind: string
  /** ISO year-month of the most recent work; projects sort newest first */
  date: string
  status: string
  /** Shows `status` as a badge on the card instead of "Write-up" */
  inProgress?: boolean
  /** A result worth one line on the card: an award, a measured number */
  highlight?: string
  tools: string[]
  cover: Figure
  /** Three or four numbers that describe the project at a glance */
  facts: { value: string; label: string }[]
  links: ProjectLink[]
  sections: Section[]
  reading: Reading[]
}

/** Listing order, and the drawn cover used when a project has no image */
export const CATEGORIES: { id: Category; label: string; icon: LucideIcon; tint: [string, string] }[] = [
  { id: 'robotics', label: 'Robotics', icon: Bot, tint: ['#7c3aed', '#c026d3'] },
  { id: 'pcb', label: 'PCB design', icon: CircuitBoard, tint: ['#047857', '#0d9488'] },
  { id: 'embedded', label: 'Embedded & IoT', icon: Cpu, tint: ['#1d4ed8', '#0891b2'] },
  { id: 'research', label: 'Research', icon: FlaskConical, tint: ['#b45309', '#e11d48'] },
]

const GITHUB = 'https://github.com/prashantbhandary'

const CORE_WRITEUPS: Project[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'mspm0-board',
    title: 'MSPM0G3507 Development Board',
    summary:
      'A compact USB-C development board for TI’s Arm Cortex-M0+ MSPM0G3507, with on-board USB-UART, a 3-axis accelerometer and Tag-Connect SWD.',
    line: 'USB-C Cortex-M0+ board with USB-serial, accelerometer and SWD pads.',
    category: 'pcb',
    kind: 'PCB design · MCU board',
    date: '2026-10',
    status: 'Fab files ready',
    tools: ['KiCad 10', 'MSPM0G3507', 'CH340E', 'LIS2DH', 'USB-C'],
    cover: {
      src: '/images/projects/mspm0-board/render-angle.webp',
      alt: 'Angled 3D render of the green MSPM0 development board with a USB-C connector, LQFP-48 microcontroller and four mounting holes',
      width: 1143,
      height: 757,
    },
    facts: [
      { value: '53 × 28 mm', label: 'Board outline' },
      { value: '2-layer', label: '1.6 mm FR-4' },
      { value: '13', label: 'BOM lines, all LCSC-sourced' },
      { value: '80 MHz', label: 'Cortex-M0+ core' },
    ],
    links: [
      { label: 'Source', href: `${GITHUB}/mspmo-baord`, kind: 'source' },
      { label: 'Schematic (PDF)', href: '/images/projects/mspm0-board/schematic.pdf', kind: 'doc' },
      { label: 'Interactive BOM', href: '/images/projects/mspm0-board/ibom.html', kind: 'bom' },
    ],
    reading: [
      { title: 'MSPM0G350x Mixed-Signal Microcontrollers (datasheet)', source: 'Texas Instruments', kind: 'Datasheet', href: 'https://www.ti.com/lit/ds/symlink/mspm0g3507.pdf' },
      { title: 'A Primer on USB Type-C and USB Power Delivery Applications and Requirements', source: 'N. Enos, B. Gosselin · Texas Instruments', kind: 'App note', href: 'https://www.ti.com/lit/wp/slyy109/slyy109.pdf' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            type: 'p',
            text: 'TI’s MSPM0 family is a low-cost Arm Cortex-M0+ line with unusually good analog peripherals for its price. The official LaunchPad is large and carries a full debugger, so I designed a small board that brings out just what a project needs: power and a serial console from one USB-C cable, a motion sensor to have something to read on day one, and a programming pad that takes no board space.',
          },
          {
            type: 'p',
            text: 'The board is two layers, 53 × 28 mm, with four M3 mounting holes and fiducials so it can go straight through a pick-and-place line. Every part in the BOM carries an LCSC number, so the fabrication files are ready for assembled ordering.',
          },
        ],
      },
      {
        id: 'how-it-works',
        title: 'How it works',
        blocks: [
          {
            type: 'flow',
            stages: [
              { label: 'USB-C', note: 'VBUS 5 V + D±' },
              { label: 'USBLC6-2SC6', note: 'ESD clamp' },
              { label: 'CH340E', note: 'USB → UART0' },
              { label: 'MSPM0G3507', note: '3.3 V, 80 MHz' },
              { label: 'LIS2DH', note: 'I²C0 + INT1/2' },
            ],
            caption: 'Signal path from the cable to the sensor. Power branches off VBUS through the SPX3819 LDO.',
          },
          {
            type: 'steps',
            items: [
              {
                title: 'Power',
                text: 'Two 5.1 kΩ pull-downs on CC1/CC2 identify the board as a USB-C sink, so any USB-C charger or port supplies 5 V. VBUS passes a 0 Ω link (a spot for a fuse later) into an SPX3819 LDO that makes the 3.3 V rail, decoupled with 10 µF bulk and 470 nF at each supply pin.',
              },
              {
                title: 'USB-serial console',
                text: 'A CH340E bridges USB to the MCU’s UART0 on PA0/PA1. RTS and CTS are routed too (PA8/PA9), so hardware flow control or an auto-reset scheme are possible without rework. A USBLC6-2SC6 clamps ESD on D+ and D− before they reach the bridge.',
              },
              {
                title: 'Clocking',
                text: 'An 8 MHz crystal on HFXIN/HFXOUT gives an accurate high-speed reference for UART baud rates and timers. The ROSC pin gets its 100 kΩ resistor (R6), which the MSPM0’s internal oscillator uses for its frequency-correction loop when the crystal isn’t in use.',
              },
              {
                title: 'Sensor',
                text: 'A LIS2DH 3-axis accelerometer sits on I²C0 (PA10/PA11) with 5.1 kΩ pull-ups. Both interrupt pins go to PB8 and PB9, so the MCU can sleep until motion, a tap or free-fall wakes it.',
              },
              {
                title: 'Programming',
                text: 'SWD, NRST and power come out on a Tag-Connect TC2030 footprint: six plated pads and three locating holes, with no header to solder. NRST has an RC network (5.1 kΩ / 470 nF) for a clean power-on reset.',
              },
            ],
          },
          {
            type: 'table',
            caption: 'MCU pin assignments',
            columns: ['Signal', 'MSPM0 pin', 'Goes to'],
            rows: [
              ['UART0 TX / RX', 'PA0 / PA1', 'CH340E RXD / TXD'],
              ['UART0 RTS / CTS', 'PA8 / PA9', 'CH340E CTS / RTS'],
              ['I²C0 SDA / SCL', 'PA10 / PA11', 'LIS2DH'],
              ['INT1 / INT2', 'PB8 / PB9', 'LIS2DH interrupts'],
              ['SWDIO / SWCLK', 'PA19 / PA20', 'TC2030 pads'],
              ['HFXIN / HFXOUT', 'PA5 / PA6', '8 MHz crystal'],
              ['ROSC', 'PA2', '100 kΩ to ground'],
            ],
          },
        ],
      },
      {
        id: 'hardware',
        title: 'Board & parts',
        blocks: [
          {
            type: 'gallery',
            figures: [
              {
                src: '/images/projects/mspm0-board/render-top.webp',
                alt: 'Top view render of the MSPM0 board showing component placement',
                caption: 'Top side: USB-C and protection on the left, LDO and CH340E in the middle, MCU and TC2030 pads on the right.',
                width: 1129,
                height: 633,
              },
              {
                src: '/images/projects/mspm0-board/render-bottom.webp',
                alt: 'Bottom view render of the MSPM0 board, mostly ground pour',
                caption: 'Bottom side is kept as an unbroken ground pour.',
                width: 1125,
                height: 668,
              },
            ],
          },
          {
            type: 'table',
            caption: 'Bill of materials',
            columns: ['Ref', 'Part', 'Role'],
            rows: [
              ['U3', 'MSPM0G3507SPTR (LQFP-48)', 'Cortex-M0+, 128 KB flash, 32 KB SRAM'],
              ['U4', 'CH340E (MSOP-10)', 'USB to UART bridge'],
              ['U5', 'LIS2DHTR (LGA-14)', '3-axis accelerometer'],
              ['U1', 'SPX3819M5-L-3-3', '3.3 V LDO regulator'],
              ['D1', 'USBLC6-2SC6', 'USB data-line ESD protection'],
              ['J1', 'GCT USB4105 USB-C', 'Power + data'],
              ['X1', '8 MHz, 3225', 'High-speed crystal'],
              ['C1–C14', '10 µF, 470 nF, 15 pF', 'Bulk, decoupling, crystal load'],
              ['R1–R8', '0 Ω, 5.1 kΩ, 100 kΩ', 'Links, CC/I²C/reset pull-ups, ROSC'],
            ],
          },
        ],
      },
      {
        id: 'files',
        title: 'Folder structure',
        blocks: [
          {
            type: 'tree',
            listing: `mspmo-baord/
  mspmo-baord.kicad_pro      # open this in KiCad
  mspmo-baord.kicad_sch      # schematic
  mspmo-baord.kicad_pcb      # 2-layer layout
  MSPM0.kicad_sym            # custom symbol for the MCU
  sym-lib-table              # points KiCad at the custom symbol
  bom/
    ibom.html                # interactive BOM, open in a browser
  fab/
    mfr/                     # Gerbers + drill files for the board house
    mspmo-baord.csv          # BOM with LCSC part numbers
    posfile/                 # pick-and-place coordinates
  mfr.zip                    # the mfr/ folder zipped for upload`,
          },
        ],
      },
      {
        id: 'next',
        title: 'What’s next',
        blocks: [
          {
            type: 'list',
            items: [
              'Order assembled boards and bring up a blinky + UART echo with TI’s MSPM0 SDK.',
              'Write a small LIS2DH driver that uses INT1 to wake the MCU from STOP mode.',
              'Replace the 0 Ω VBUS link with a resettable fuse once current draw is measured.',
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            title: 'Built for ElectroPhobia',
            text: 'The silkscreen carries the ElectroPhobia mark, the electronics learning community I founded. The board doubles as a starter MCU platform for its workshops.',
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'ofdm-simulation',
    title: 'OFDM + QPSK Link Simulation',
    summary:
      'A text message sent end to end through an 8-subcarrier OFDM link over a noisy channel in Python, with bit-error-rate results checked against theory.',
    line: 'Text sent through an 8-subcarrier OFDM link, BER checked against theory.',
    category: 'research',
    kind: 'Simulation · Digital communication',
    date: '2026-09',
    status: 'Complete',
    tools: ['Python', 'NumPy', 'Matplotlib'],
    cover: {
      src: '/images/projects/ofdm-simulation/rx-fft.webp',
      alt: 'Stem plots comparing transmitted and received subcarrier values for the first OFDM symbol, real and imaginary parts',
      width: 1100,
      height: 450,
      fit: 'contain',
    },
    facts: [
      { value: '8', label: 'Subcarriers per symbol' },
      { value: 'QPSK', label: '2 bits per subcarrier' },
      { value: '≈ 4 dB', label: 'SNR per subcarrier' },
      { value: '5.65 %', label: 'BER over 400k bits' },
    ],
    links: [{ label: 'Source', href: `${GITHUB}/ofdm-sumulations`, kind: 'source' }],
    reading: [
      { title: 'Synthesis of Band-Limited Orthogonal Signals for Multichannel Data Transmission', source: 'R. W. Chang · Bell System Technical Journal', year: 1966, kind: 'Paper', href: doi('10.1002/j.1538-7305.1966.tb02435.x') },
      { title: 'Data Transmission by Frequency-Division Multiplexing Using the Discrete Fourier Transform', source: 'S. Weinstein, P. Ebert · IEEE Trans. Communication Technology', year: 1971, kind: 'Paper', href: doi('10.1109/TCOM.1971.1090705') },
      { title: 'The History of Orthogonal Frequency-Division Multiplexing', source: 'S. Weinstein · IEEE Communications Magazine', year: 2009, kind: 'Paper', href: doi('10.1109/MCOM.2009.5307460') },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            type: 'p',
            text: 'OFDM (orthogonal frequency-division multiplexing) is how Wi-Fi, LTE and 5G carry data: instead of one fast carrier, the bits ride on many slow subcarriers packed tightly enough to overlap without interfering. I wanted to see every stage of that with real numbers, so this simulation sends a typed message through the whole chain and reads it back out the other side.',
          },
          {
            type: 'p',
            text: 'The whole link is one short Python file (`ofdm.py`, about 120 lines) built only on NumPy’s FFT. No communications toolbox, so every step is visible.',
          },
        ],
      },
      {
        id: 'how-it-works',
        title: 'How it works',
        blocks: [
          {
            type: 'flow',
            stages: [
              { label: 'Text', note: 'ASCII' },
              { label: 'Bits', note: '8 per char' },
              { label: 'QPSK', note: '2 bits → 1 symbol' },
              { label: 'IFFT', note: 'N = 8' },
              { label: 'AWGN', note: 'noise 0.05' },
              { label: 'FFT', note: 'N = 8' },
              { label: 'Demap', note: 'nearest point' },
              { label: 'Text' },
            ],
            caption: 'Transmitter → channel → receiver.',
          },
          {
            type: 'steps',
            items: [
              {
                title: 'Text to bits',
                text: 'Each character becomes its 8-bit ASCII code, so `Hello,` is 56 bits.',
              },
              {
                title: 'Bits to QPSK symbols',
                text: 'Bits are taken in pairs and mapped to one of four points on the complex plane, (±1 ± j)/√2. The mapping is Gray-coded: neighbouring points differ by one bit, so the most likely error costs only one bit.',
              },
              {
                title: 'Symbols to OFDM blocks',
                text: 'Symbols are grouped eight at a time, one per subcarrier, with zero-padding to fill the last block. An inverse FFT turns each block of eight frequency-domain values into eight time-domain samples: that is one OFDM symbol.',
              },
              {
                title: 'Channel',
                text: 'Complex Gaussian noise with total power 0.05 is added to every time-domain sample (additive white Gaussian noise, AWGN).',
              },
              {
                title: 'Receiver',
                text: 'An FFT on each block of eight samples recovers the subcarrier values. Each one is snapped to the nearest of the four QPSK points, turned back into two bits, and every eight bits become a character again.',
              },
            ],
          },
          {
            type: 'code',
            lang: 'python',
            caption: 'The core of the link: modulate, add noise, demodulate.',
            code: `X_blocks = qpsk_symbols.reshape(num_blocks, N)   # one row per OFDM symbol
x = np.fft.ifft(X_blocks, axis=1).flatten()       # frequency → time

noise = np.sqrt(noise_power / 2) * (
    np.random.randn(len(x)) + 1j * np.random.randn(len(x)))
received = x + noise                               # AWGN channel

Y = np.fft.fft(received.reshape(num_blocks, N), axis=1).flatten()
recovered_pairs = [demap(y) for y in Y]            # nearest QPSK point`,
          },
          {
            type: 'gallery',
            figures: [
              {
                src: '/images/projects/ofdm-simulation/tx-ifft.webp',
                alt: 'Stem plot of eight time-domain samples of the first OFDM symbol after the IFFT',
                caption: 'Transmit side: the first OFDM symbol after the IFFT. Eight samples that carry all eight subcarriers at once.',
                width: 640,
                height: 480,
                fit: 'contain',
              },
              {
                src: '/images/projects/ofdm-simulation/rx-fft.webp',
                alt: 'Real and imaginary parts of transmitted versus received subcarriers for the first OFDM symbol',
                caption: 'Receive side: the same symbol after the FFT. Blue is sent, red is received; the gap between them is the noise.',
                width: 1100,
                height: 450,
                fit: 'contain',
              },
            ],
          },
        ],
      },
      {
        id: 'results',
        title: 'Results',
        blocks: [
          {
            type: 'table',
            caption: 'Single runs at noise power 0.05',
            columns: ['Message', 'Bits', 'OFDM symbols', 'Bit errors', 'BER', 'Received'],
            rows: [
              ['Hello,', '56', '4', '1', '1.79 %', 'Helli,'],
              ['Hello, World!', '104', '7', '3', '2.88 %', 'Hgìlo,World!'],
              ['Hello, World!', '104', '7', '4', '3.85 %', 'Xelno, Wozld#'],
              ['Hello, okk prashantt???? done donee', '288', '18', '11', '3.82 %', 'Heldo, mkk 0rashanvt???; dole"donat'],
            ],
          },
          {
            type: 'figure',
            figure: {
              src: '/images/projects/ofdm-simulation/run-long.webp',
              alt: 'Terminal output of the long-message run showing original and recovered bits and text',
              caption: 'The 36-character run. A 3.8 % bit error rate is enough to corrupt about a third of the characters.',
              width: 1600,
              height: 531,
              fit: 'contain',
            },
          },
          {
            type: 'p',
            text: 'A single error in any of a character’s eight bits changes the whole character, so a modest BER still garbles text quickly. There is no error-correcting code in the link, so nothing gets fixed.',
          },
        ],
      },
      {
        id: 'going-further',
        title: 'Checking against theory',
        blocks: [
          {
            type: 'p',
            text: 'Four short runs are too few bits to trust a BER, so I re-ran the identical chain on 400,000 random bits and compared it with the textbook QPSK error rate.',
          },
          {
            type: 'table',
            caption: 'Monte-Carlo BER, 400,000 bits per point',
            columns: ['Noise power', 'SNR per subcarrier', 'Theory', 'Simulated'],
            rows: [
              ['0.05', '3.98 dB', '5.69 %', '5.65 %'],
              ['0.02', '7.96 dB', '0.62 %', '0.63 %'],
              ['0.01', '10.97 dB', '0.02 %', '0.02 %'],
            ],
          },
          {
            type: 'callout',
            tone: 'result',
            title: 'Why the noise is worse than it looks',
            text: 'NumPy’s `ifft` divides by N, so each time-domain sample carries only 1/8 of a symbol’s power, while the receiver’s FFT adds up the noise from all eight samples. A noise power of 0.05 per sample becomes 0.4 per subcarrier, against a symbol power of 1: about 4 dB SNR. That predicts a 5.7 % BER, and the long run lands on it. The short runs’ 1.8–3.8 % were small samples that happened to come out lucky.',
          },
        ],
      },
      {
        id: 'files',
        title: 'Folder structure',
        blocks: [
          {
            type: 'tree',
            listing: `ofdm-sumulations/
  ofdm.py                    # the whole link: text → OFDM → AWGN → text
  ReadMe.md                  # experiment notes and results
  IMAGES/
    tx_ifft_first_symbol.png   # TX time-domain plot
    rx_fft_first_symbol.png    # RX subcarriers vs TX
  testresults/
    hello.png                # short-message run
    long_message.png         # long-message run
  venv/                      # local Python env (not committed)`,
          },
        ],
      },
      {
        id: 'next',
        title: 'What’s next',
        blocks: [
          {
            type: 'list',
            items: [
              'Add a cyclic prefix and a multipath channel, to show why OFDM needs one.',
              'Insert pilot subcarriers and do one-tap equalisation per subcarrier.',
              'Add a simple channel code (Hamming(7,4)) and plot coded vs uncoded BER curves.',
              'Sweep Eb/N0 and plot the BER curve against the theoretical QPSK line.',
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'seven-segment-led',
    title: '4-Digit 7-Segment LED Display',
    summary:
      'A large 4-digit display built from 60 discrete SMD LEDs, multiplexed by an ESP32, with a GitHub Actions pipeline that publishes manufacturing files on every release tag.',
    line: 'Four digits built from 60 SMD LEDs, multiplexed by an ESP32.',
    category: 'pcb',
    kind: 'PCB design · Firmware · CI',
    date: '2026-06',
    status: 'Design + firmware',
    tools: ['KiCad', 'ESP32', 'PlatformIO', 'GitHub Actions', 'KiForge'],
    cover: {
      src: '/images/projects/seven-segment-led/render-3d.webp',
      alt: '3D render of a long green PCB with four 7-segment digits made from individual LEDs',
      width: 1600,
      height: 850,
    },
    facts: [
      { value: '60', label: '0805 LEDs' },
      { value: '116 × 41 mm', label: 'Board outline' },
      { value: '~114 Hz', label: 'Refresh per digit' },
      { value: '12', label: 'GPIOs to drive it' },
    ],
    links: [
      { label: 'Source', href: `${GITHUB}/7-segment-led`, kind: 'source' },
      { label: 'Schematic (PDF)', href: '/images/projects/seven-segment-led/schematic.pdf', kind: 'doc' },
      { label: 'Interactive BOM', href: '/images/projects/seven-segment-led/ibom.html', kind: 'bom' },
    ],
    reading: [
      { title: 'IEEE 1789-2015: Recommended Practices for Modulating Current in High-Brightness LEDs for Mitigating Health Risks to Viewers', source: 'IEEE Standards Association', year: 2015, kind: 'Standard', href: doi('10.1109/IEEESTD.2015.7118618') },
      { title: 'ESP32 Series Datasheet (strapping pins)', source: 'Espressif Systems', kind: 'Datasheet', href: 'https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            type: 'p',
            text: 'Off-the-shelf 7-segment modules top out at about an inch tall. For a display readable across a room I built the segments out of discrete LEDs instead: two 0805 LEDs per segment plus one for the decimal point, giving four digits from 60 LEDs on a 116 × 41 mm board.',
          },
          {
            type: 'p',
            text: 'The project covers the board, the ESP32 firmware that turns it into a clock and text scroller, and a release pipeline: pushing a version tag makes GitHub build every manufacturing file automatically.',
          },
        ],
      },
      {
        id: 'how-it-works',
        title: 'How it works',
        blocks: [
          {
            type: 'p',
            text: 'Driving 60 LEDs individually would take 60 pins. Multiplexing gets it down to 12: the eight segment lines (A–G plus the decimal point) are shared by all four digits, and only one digit is switched on at a time. Cycle through them fast enough and your eye sees all four lit.',
          },
          {
            type: 'figure',
            figure: {
              src: '/images/projects/seven-segment-led/schematic.webp',
              alt: 'KiCad schematic: four columns of paired LEDs per segment, four BC847 digit drivers, and the connector pinout',
              caption: 'Each segment is two LEDs in parallel. Each digit’s cathodes share a ground (GND_A–D) that a BC847 switches.',
              width: 1600,
              height: 1168,
              fit: 'contain',
            },
          },
          {
            type: 'steps',
            items: [
              {
                title: 'Segment lines',
                text: 'Each ESP32 segment pin drives its segment’s anodes through a 220 Ω resistor. The board has no supply rail of its own: the GPIOs source the LED current directly, so the connectors only need a shared ground.',
              },
              {
                title: 'Digit switches',
                text: 'Each digit’s cathodes go to the collector of a BC847 NPN transistor, driven from a GPIO through 1 kΩ. Pulling a digit pin HIGH sinks that digit to ground and lights whatever segments are on.',
              },
              {
                title: 'Current budget',
                text: 'Assuming a ~2 V forward voltage for red LEDs, each segment draws roughly (3.3 − 2.0) / 220 ≈ 6 mA while lit, split between its two LEDs. A full “8.” is about 48 mA through one transistor, well within the BC847’s 100 mA rating, and 1 kΩ of base drive (~2.6 mA) keeps it saturated.',
              },
            ],
          },
          {
            type: 'table',
            caption: 'ESP32 pin map',
            columns: ['Function', 'GPIOs'],
            rows: [
              ['Segments A–G', '23, 22, 21, 19, 18, 5, 4'],
              ['Decimal point', '15'],
              ['Digits 0–3', '13, 12, 14, 27'],
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            title: 'A strapping-pin detail',
            text: 'GPIO 12 is an ESP32 boot strapping pin, and it must be low at reset for 3.3 V flash. Here it drives a BC847 base through 1 kΩ, which holds it low, so the board boots normally.',
          },
        ],
      },
      {
        id: 'firmware',
        title: 'Firmware',
        blocks: [
          {
            type: 'p',
            text: 'The firmware (PlatformIO, Arduino framework) keeps a four-byte framebuffer, one segment bitmask per digit. The main loop keeps calling `refreshDisplay()`, which lights one digit for 2.2 ms and moves on. A full pass takes 8.8 ms, so each digit refreshes at about 114 Hz, well above visible flicker.',
          },
          {
            type: 'code',
            lang: 'cpp',
            caption: 'firmware/src/main.cpp: one digit per call',
            code: `void refreshDisplay() {
  static uint8_t current = 0;
  allDigitsOff();                        // avoid ghosting between digits
  writeSegments(frame[current]);
  digitalWrite(DIG_PINS[current], HIGH); // BC847 on → digit lit
  delayMicroseconds(2200);               // ~110 Hz refresh
  current = (current + 1) % NUM_DIGITS;
}`,
          },
          {
            type: 'list',
            items: [
              '**Font:** `charToSeg()` maps digits and most letters to segment bitmasks, enough to spell words on seven segments.',
              '**Scroller:** `scrollText()` slides a padded string through the four-digit window one step at a time.',
              '**Clock:** `showClock()` renders HH:MM from a start time set at compile time, blinking the decimal point between hours and minutes as a colon.',
            ],
          },
        ],
      },
      {
        id: 'pipeline',
        title: 'Release pipeline',
        blocks: [
          {
            type: 'p',
            text: 'Exporting Gerbers by hand is easy to get subtly wrong. Instead, pushing a tag like `v0.2.0` runs a GitHub Actions workflow that uses KiForge to export every manufacturing output from the KiCad files and attaches them to a GitHub Release. The same workflow is mirrored for a self-hosted Gitea.',
          },
          {
            type: 'flow',
            stages: [
              { label: 'git tag v*' },
              { label: 'GitHub Actions' },
              { label: 'KiForge', note: 'KiCad export' },
              { label: 'Release', note: 'files attached' },
            ],
          },
          {
            type: 'list',
            items: [
              'Gerbers + drill files (zipped)',
              'BOM and pick-and-place (CPL) in JLCPCB format',
              'Schematic PDF and interactive HTML BOM',
              'STEP model, front/back SVG plots and 3D renders',
            ],
          },
          {
            type: 'gallery',
            figures: [
              {
                src: '/images/projects/seven-segment-led/render-front.webp',
                alt: 'KiForge front render of the 7-segment board',
                caption: 'Front render, generated by the pipeline.',
                width: 918,
                height: 379,
                fit: 'contain',
              },
              {
                src: '/images/projects/seven-segment-led/layout.webp',
                alt: 'PCB layout view showing copper traces between the LED segments',
                caption: 'Layout: segment buses run along the board, digit drivers sit below each digit.',
                width: 1600,
                height: 810,
                fit: 'contain',
              },
            ],
          },
        ],
      },
      {
        id: 'hardware',
        title: 'Bill of materials',
        blocks: [
          {
            type: 'table',
            columns: ['Part', 'Qty', 'Value / MPN', 'Package'],
            rows: [
              ['LED', '60', 'LS R976-NR-1', '0805'],
              ['NPN transistor', '4', 'BC847', 'SOT-23'],
              ['Resistor (segments)', '8', '220 Ω · RS-05K2200FT', '0805'],
              ['Resistor (bases)', '4', '1 kΩ · KTR10EZPF1001', '0805'],
              ['Pin headers', '3', '1×10, 1×4, 1×2 · 2.54 mm', 'THT'],
            ],
          },
        ],
      },
      {
        id: 'files',
        title: 'Folder structure',
        blocks: [
          {
            type: 'tree',
            listing: `7-segment-led/
  7-segment-led.kicad_pro    # KiCad project
  7-segment-led.kicad_sch    # schematic
  7-segment-led.kicad_pcb    # 2-layer layout
  firmware/                  # PlatformIO project (ESP32, Arduino)
    platformio.ini
    src/main.cpp             # multiplex driver, font, scroller, clock
    testfiles/               # earlier timer experiments
  .github/workflows/
    release.yml              # tag → KiForge export → GitHub Release
  .gitea/workflows/
    release.yml              # same pipeline for Gitea
  kiforge/                   # last pipeline output (Gerbers, BOM, STEP…)
  bom/ibom.html              # interactive BOM
  images/                    # schematic, layout and 3D screenshots`,
          },
        ],
      },
      {
        id: 'next',
        title: 'What’s next',
        blocks: [
          {
            type: 'list',
            items: [
              'Move multiplexing into a hardware timer interrupt so the loop is free for other work.',
              'Sync the clock over Wi-Fi with NTP instead of a compile-time start time.',
              'Add PWM brightness control on the digit lines for night dimming.',
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'heart-pcb',
    title: 'Heart-Shaped “Breathing” LED PCB',
    summary:
      'A heart-shaped board where a 555 timer and one transistor make 20 LEDs fade in and out like breathing, with no microcontroller and no code.',
    line: 'A 555 timer and one transistor make 20 LEDs fade like breathing.',
    category: 'pcb',
    kind: 'PCB design · Analog',
    date: '2026-02',
    status: 'Gerbers for NextPCB',
    tools: ['KiCad', 'TLC555', 'BC547', 'THT'],
    cover: {
      src: '/images/projects/heart-pcb/render-angle.webp',
      alt: '3D render of a heart-shaped PCB ringed with 20 red LEDs around a 555 timer, transistor and capacitor',
      width: 1285,
      height: 1055,
    },
    facts: [
      { value: '20', label: 'Red 4 mm LEDs' },
      { value: '54 × 47 mm', label: 'Heart outline' },
      { value: '0', label: 'Lines of code' },
      { value: '1 knob', label: 'Sets the breathing rate' },
    ],
    links: [
      { label: 'Source', href: `${GITHUB}/HeartShaped_PCB_FAB`, kind: 'source' },
      { label: 'Schematic (PDF)', href: '/images/projects/heart-pcb/schematic.pdf', kind: 'doc' },
    ],
    reading: [
      { title: 'TLC555 LinCMOS Timer (datasheet)', source: 'Texas Instruments', kind: 'Datasheet', href: 'https://www.ti.com/lit/ds/symlink/tlc555.pdf' },
      { title: 'IEEE 1789-2015: Modulating Current in High-Brightness LEDs', source: 'IEEE Standards Association', year: 2015, kind: 'Standard', href: doi('10.1109/IEEESTD.2015.7118618') },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            type: 'p',
            text: 'A small gift board: twenty red LEDs trace the outline of a heart and slowly brighten and dim. Everything is through-hole so it can be hand-soldered in one sitting, and it runs from a 5 V USB supply on a two-pin header.',
          },
          {
            type: 'p',
            text: 'The interesting part is that it **fades** rather than blinks, using one 555 timer and one transistor. No microcontroller and no PWM.',
          },
        ],
      },
      {
        id: 'how-it-works',
        title: 'How it works',
        blocks: [
          {
            type: 'figure',
            figure: {
              src: '/images/projects/heart-pcb/render-top.webp',
              alt: 'Top-down render of the heart PCB with LEDs around the edge and the timer circuit in the centre',
              caption: 'Timer, transistor, capacitor and the rate potentiometer sit in the middle; the LEDs ring the edge.',
              width: 1376,
              height: 1313,
              fit: 'contain',
            },
          },
          {
            type: 'steps',
            items: [
              {
                title: 'A 555 that charges its own capacitor',
                text: 'Instead of the usual discharge-pin astable, the 555’s output charges and discharges capacitor C1 through R1 and the potentiometer RV1. TRIG and THRES both watch C1: when it climbs to ⅔ VCC the output goes low and C1 starts draining, and at ⅓ VCC the output goes high again. C1’s voltage ramps smoothly up and down between those two levels forever.',
              },
              {
                title: 'A transistor that follows the ramp',
                text: 'The BC547’s base is tied straight to C1, with its collector on VCC: an emitter follower. Its emitter tracks C1’s voltage minus about 0.65 V, and feeds the LED rail through R2. Since the LED current follows a ramp instead of a square wave, the heart breathes.',
              },
              {
                title: 'Turning the knob',
                text: 'Each half of the cycle lasts about 0.693 × (R1 + RV1) × C1, so RV1 sets the breathing speed. R1 keeps a minimum resistance in the loop so the knob can’t short the 555 output into the capacitor.',
              },
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            title: 'Design trade-off',
            text: 'The transistor’s base current comes out of the timing capacitor, which speeds up the falling half and slows the rising half, so the breath is slightly lopsided. That is barely visible here; a Darlington or a MOSFET follower would remove it.',
          },
        ],
      },
      {
        id: 'hardware',
        title: 'Board & parts',
        blocks: [
          {
            type: 'table',
            columns: ['Ref', 'Part', 'Role'],
            rows: [
              ['U2', 'TLC555 (DIP-8)', 'Timer: generates the triangle-like ramp'],
              ['Q1', 'BC547 (TO-92)', 'Emitter follower driving the LED rail'],
              ['RV1', 'Piher PT-10 trimmer', 'Breathing-rate adjustment'],
              ['C1', 'Electrolytic, 6.3 mm radial', 'Timing capacitor'],
              ['R1, R2', 'Axial resistors', 'Timing minimum, LED current limit'],
              ['D1–D20', 'Red LED, 4 mm', 'The heart outline, all in parallel'],
              ['J1', '1×2 header, 2.54 mm', '5 V input'],
            ],
          },
          {
            type: 'p',
            text: 'The board outline is drawn as curves on the Edge.Cuts layer and measures about 54 × 47 mm. It is routed on both copper layers, and production Gerbers were exported for NextPCB.',
          },
        ],
      },
      {
        id: 'files',
        title: 'Folder structure',
        blocks: [
          {
            type: 'tree',
            listing: `HeartShaped_PCB_FAB/
  heart_next_pcb.kicad_pro   # KiCad project
  heart_next_pcb.kicad_sch   # 555 + follower + 20 LEDs
  heart_next_pcb.kicad_pcb   # heart outline and layout
  production1/               # Gerbers + drill files sent to the fab
  production-nextpcb.zip     # the same, zipped for NextPCB upload`,
          },
        ],
      },
      {
        id: 'next',
        title: 'What’s next',
        blocks: [
          {
            type: 'list',
            items: [
              'Add a 10 nF capacitor on the 555’s CONT pin to steady the thresholds against supply noise.',
              'Swap to SMD LEDs on a USB-C powered revision for a slimmer board.',
            ],
          },
        ],
      },
    ],
  },
]

// ─── Cards ───────────────────────────────────────────────────────────────────

export type CardLink = { label: string; href: string; kind: 'github' | 'pdf' | 'demo' }

export type Card = {
  id: string
  title: string
  line: string
  category: Category
  date: string
  tags: string[]
  /** Required: the real work */
  github: string
  /** Second repo, report PDF, video… */
  more?: CardLink[]
  /** Set when the project has a write-up page */
  writeup?: string
  image?: { src: string; fit?: 'cover' | 'contain' }
  icon?: LucideIcon
  /** Only for unfinished work */
  status?: string
  /** A result worth one line: an award, a measured number */
  highlight?: string
  reading: Reading[]
}

const OTHER_WORK: Card[] = [
  {
    id: 'line-follower',
    title: 'Project Voyager Line Follower',
    line: 'Line-following robot with ultrasonic obstacle detection.',
    category: 'robotics',
    date: '2023-08',
    tags: ['Arduino', 'PID', 'Ultrasonic'],
    github: `${GITHUB}/Project_Voyager`,
    more: [{ label: 'Report', href: '/documentation-project-voyager.pdf', kind: 'pdf' }],
    image: { src: '/images/VoyagerBot2023.jpg' },
    reading: [
      { title: 'A Fuzzy Rule-Based Control System for Fast Line-Following Robots', source: 'G. Eleftheriou et al. · IEEE DCOSS', year: 2020, kind: 'Paper', href: doi('10.1109/DCOSS49796.2020.00068') },
      { title: '3pi Robot User’s Guide — Advanced Line Following with PID Control', source: 'Pololu', kind: 'Guide', href: 'https://www.pololu.com/docs/0J21/7.c' },
    ],
  },
  {
    id: 'smart-helmet',
    title: 'Smart Safety Helmet',
    line: 'Tracks pulse, SpO₂ and impacts; alerts a supervisor over BLE.',
    category: 'embedded',
    date: '2026-01',
    tags: ['ESP32', 'BLE', 'MAX30105'],
    github: `${GITHUB}/SmartHelmet_Esp32_BLE`,
    more: [{ label: 'Pitch', href: '/safetron-mvp-safe-250345.pdf', kind: 'pdf' }],
    icon: HardHat,
    reading: [
      { title: 'A Survey on Fall Detection: Principles and Approaches', source: 'M. Mubashir, L. Shao, L. Seed · Neurocomputing', year: 2013, kind: 'Paper', href: doi('10.1016/j.neucom.2011.09.037') },
      { title: 'Pulse Oximetry', source: 'A. Jubran · Critical Care', year: 2015, kind: 'Paper', href: doi('10.1186/s13054-015-0984-8') },
    ],
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird on ESP32',
    line: 'The game on a 128×64 OLED, with a button and a buzzer.',
    category: 'embedded',
    date: '2026-03',
    tags: ['ESP32', 'SSD1306', 'PlatformIO'],
    github: `${GITHUB}/FlappyBird`,
    more: [{ label: 'Video', href: 'https://www.instagram.com/reel/DV0zjzuk2FA/', kind: 'demo' }],
    image: { src: '/images/projects/flappy-bird/cover.webp' },
    reading: [
      { title: 'SSD1306 128×64 OLED Driver (datasheet)', source: 'Solomon Systech', kind: 'Datasheet', href: 'https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf' },
      { title: 'Fix Your Timestep!', source: 'G. Fiedler · Gaffer On Games', kind: 'Guide', href: 'https://gafferongames.com/post/fix_your_timestep/' },
    ],
  },
]

export const PROJECTS: Project[] = [...CORE_WRITEUPS, ...MORE_WRITEUPS]

function writeupCard(p: Project): Card {
  // cards keep the repos; schematics, BOMs and reports live in the write-up itself
  const [repo, ...rest] = p.links.filter((l) => l.kind === 'source')
  return {
    id: p.slug,
    title: p.title,
    line: p.line,
    category: p.category,
    date: p.date,
    tags: p.tools.slice(0, 3),
    github: repo.href,
    more: rest.map((l) => ({ label: l.label, href: l.href, kind: 'github' as const })),
    writeup: p.slug,
    highlight: p.highlight,
    status: p.inProgress ? p.status : undefined,
    image: { src: p.cover.src, fit: p.cover.fit },
    reading: p.reading,
  }
}

const byCategoryThenNewest = (a: { category: Category; date: string }, b: { category: Category; date: string }) => {
  const order = (c: Category) => CATEGORIES.findIndex((x) => x.id === c)
  return order(a.category) - order(b.category) || b.date.localeCompare(a.date)
}

/** Every project, write-ups included: category order, newest first within each */
export const WORK: Card[] = [...PROJECTS.map(writeupCard), ...OTHER_WORK].sort(byCategoryThenNewest)

/** Write-ups only, same order — drives the article prev/next links */
export const SORTED_PROJECTS = [...PROJECTS].sort(byCategoryThenNewest)

export function getCard(id: string) {
  return WORK.find((c) => c.id === id)
}

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug)
}

export function formatMonth(date: string) {
  const [year, month] = date.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
