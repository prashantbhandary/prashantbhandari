/*
 * Technical reports and design notes, shown at /publications and on the home page.
 *
 * Each entry gets a static page at /publications/<slug> carrying the Google
 * Scholar `citation_*` meta tags, and is listed in the sitemap along with its
 * PDF. PDFs live in public/papers/<slug>.pdf.
 *
 * To add a DOI or ResearchGate link later, edit only this file.
 * Abstracts are copied word for word from the first page of each PDF.
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
  /** Site-relative path to the PDF */
  pdf: string
  abstract: string
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
    pdf: '/papers/greenhouse-esp32-ble.pdf',
    abstract:
      'Small growers often lack mains power and cannot watch their plants all day. This report describes an off-grid greenhouse controller built around an ESP32 microcontroller. It reads air temperature, humidity and soil moisture, runs a water pump and a mist maker from simple threshold rules, and streams readings over Bluetooth Low Energy (BLE) to a phone or laptop. A solar panel charges the battery. We tested the system in a small mimic greenhouse growing cowpea and logged 1,891 samples at 5 s intervals on one day: about 1.6 h in MANUAL mode (actuators mostly off) and 1.9 h in AUTO mode. In AUTO mode, mean humidity was 71.9% against 58.1% in MANUAL, and the mister was on 11.5% of the time against 0.7%. Mean temperature was 27.3 °C in AUTO and 28.2 °C in MANUAL, but temperature still exceeded the 27 °C set point in 43.7% of AUTO samples, because the humidity ceiling switches the mister off before it can cool the air. The system drew about 0.64 W in steady state, solar charging reached 91 mA, and the BLE link held at about −53 dBm over 50–60 m line of sight. We report the limits of this single-day, non-simultaneous test and the changes needed for a fair comparison.',
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
    pdf: '/papers/line-maze-micromouse.pdf',
    abstract:
      'Line-maze micromouse contests ask a small robot to explore an unknown maze of black lines, find the goal, and then race the shortest route without stopping to re-plan. This report describes a robot built for these contests over four hardware revisions, from an Arduino Nano prototype on an L293D driver to custom KiCad PCBs with a TB6612FNG driver and an ESP32 variant. An 8-channel analog reflectance array gives a line position from 0 to 7000, and a proportional–derivative (PD) controller steers the two wheels. At each junction the robot chooses a turn by a left-hand (or, selectable, right-hand) wall rule and stores it; after every turn a rewriting rule removes dead ends from the stored path, so the path is already the shortest route found when the goal is reached. The second run simply replays it. The robot placed 1st at LOCUS 2025 (IOE Pulchowk Campus), 2nd at Delta 5.0 (IOE Purwanchal Campus) and 5th at Meshmerize, Techfest IIT Bombay. We describe the hardware, the sensing and control, the maze logic, and the improvements still needed.',
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
    pdf: '/papers/sentinel-smart-helmet.pdf',
    abstract:
      'Most workplace safety systems watch the environment but not the worker’s body, so heat stress, fatigue and falls can go unnoticed until help is late. This report describes the Sentinel Helmet, a clip-on module for a standard industrial helmet. An ESP32 running FreeRTOS reads pulse and SpO₂ (MAX3010x optical sensor), body and ambient temperature (MLX90614 infrared sensor) and acceleration (MPU-9250). An impact above 2.5 g sounds a buzzer and, unless the worker cancels within 3 s, sends an alert; a dedicated SOS button sends an alert at once. Vital signs are averaged over 60 s and sent as JSON over Bluetooth Low Energy (BLE) to a Python listener, which stores them, scores them with a small feed-forward neural network and pushes them to a supervisor dashboard. The risk model reached 97.8% test accuracy on a public two-class vital-signs dataset. The design reports a response latency under 5 s, an estimated 12–15 h battery life at 120–150 mA, a BLE range of about 100 m and a component cost of about US$46. We describe the hardware, firmware and software and state clearly which results are not yet validated, including clinical accuracy and fall-test statistics.',
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
    pdf: '/papers/ofdm-qpsk-numpy.pdf',
    abstract:
      'Orthogonal frequency-division multiplexing (OFDM) underlies Wi-Fi, LTE and 5G, but its core idea, sending many slow symbols in parallel with one inverse FFT, is often hidden inside communication toolboxes. This report builds the smallest complete OFDM link we could write: about 120 lines of Python that use only NumPy’s FFT. Text is converted to 8-bit ASCII, mapped to Gray-coded QPSK, grouped onto 8 subcarriers, sent through an additive white Gaussian noise (AWGN) channel and decoded back to text. We explain the power scaling that makes a small per-sample noise power (0.05) equal to a per-subcarrier SNR of only 3.98 dB. Monte Carlo runs of 4 × 10⁵ bits give bit error rates of 5.65%, 0.63% and 0.02% at 3.98, 7.96 and 10.97 dB, matching the theoretical QPSK values of 5.69%, 0.62% and 0.02%. Short text messages show how, without channel coding, a 3.8% bit error rate corrupts about a third of the characters.',
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
    pdf: '/papers/mspm0g3507-dev-board.pdf',
    abstract:
      'This note describes the design of a small, low-cost development board for Texas Instruments’ MSPM0G3507, an 80 MHz Arm Cortex-M0+ [3] microcontroller with 128 KB flash and 32 KB SRAM. The 53×28 mm two-layer board takes power and data from one USB-C connector, provides a USB-to-UART console with hardware flow control, ESD protection on the USB data lines, a 3-axis accelerometer wired to two wake-up interrupts, an 8 MHz crystal, and SWD programming through a header-less Tag-Connect footprint. The bill of materials has 13 lines, all sourced from LCSC, and fabrication and assembly files are ready. We explain the main design choices (USB-C sink resistors, LDO and decoupling, clocking, console wiring, sensor interrupts and debug access) and list the bring-up tests still to be done. The board has been designed but not yet built or tested; no measured results are reported.',
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
    pdf: '/papers/nepse-ml-stock-ranking.pdf',
    abstract:
      'We ask whether a gradient-boosted tree ensemble trained on 35 price- and volume-based features can rank stocks on the Nepal Stock Exchange (NEPSE), a small frontier market with thin liquidity and a daily price limit. The panel covers 369 listed companies and 513,599 stock-days from January 2011 to October 2026. Each test year from 2016 to 2026 is predicted by a model trained only on earlier data with a 40-day embargo, and trades fill at the next day’s open after commission, slippage and capital-gains tax. The ranking is strong out of sample: the mean daily Spearman information coefficient (IC) with 20-day forward returns is 0.093 (Newey–West t = 6.2), forward returns rise across all ten score deciles, and the top decile beats the bottom by 2.55% per 20 days. A 60-day momentum ranking reaches an IC of only 0.032. However, a top-3 long-only portfolio rebalanced every 10 trading days with a market-breadth filter earned 6.4% a year over 2016–2026, against 17.9% for equal-weighted buy-and-hold. Since 2021 it earned 9.0% versus 7.8% with a smaller worst fall, but the difference is not statistically significant. Trading costs and concentration explain most of the gap: rank statistics on their own overstate what an investor can earn on NEPSE. All results are reproducible from public data with the released code.',
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
    pdf: '/papers/maddpg-swarm-esp32.pdf',
    abstract:
      'Mobile robots that cooperate over radio must move and communicate at the same time, and each choice affects the other. This report describes an open-source simulator in which three robots learn, with multi-agent deep deterministic policy gradient (MADDPG), to choose both their velocity and their transmit power while heading for a shared goal over a stochastic 2.4 GHz channel with log-distance path loss, Rayleigh fading and co-channel interference. The channel is part of the environment, not an action. After 1,000 training episodes the learned policy was re-evaluated on 20 unseen seeds against a fixed-power and an SINR-threshold controller. It obtained a mean episode reward of 593 versus 270 and 294, a mean Shannon throughput of 65.5 versus 46.1 and 48.0 Mbit/s, while transmitting at 6.9 dBm versus 11.5 and 19.9 dBm, and it ended 9.3 m from the goal versus 24.6 m. It also caused 0.5 collisions per episode where the baselines caused none, and no controller reached the goal within the 200-step horizon. The trained actor was then run on a laptop to command the transmit power of a real ESP32 over Wi-Fi for 179 s. The pipeline worked end to end, but measured RSSI spanned −87 to −12 dBm against a simulated 5–95% range of −75 to −33 dBm, and outside that range the policy’s commands were not sensible. We report this sim-to-real gap and the design limits of the test as they are.',
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
    pdf: '/papers/pocketqube-electronics.pdf',
    abstract:
      'PocketQubes, satellites built from 5 cm cubic units, make space hardware small and cheap enough for student teams to study by building. This report describes the electronics design of an educational 1.5U PocketQube model developed in association with SEDS Nepal, where the author designed the electronics and PCBs and a separate team designed the mechanical structure. The electronics follow the four classic satellite subsystems: an on-board computer (OBC) built on a NodeMCU, sensing for attitude and environment (MPU-9250 inertial sensor, BMP280 and DHT temperature sensors), a 433 MHz LoRa link (RA-02, SX1278) for telemetry and commands, and an electrical power system with a LiPo battery, a CN3065 solar charger, a small solar panel and 3.3 V regulation. The structure, designed by the mechanical team, went through two phases: six 44×44 mm, 3 mm panels forming a 50 mm cube, then a frame of four 3 mm studs holding stacked PCBs, after the electronics outgrew the 1U panels. The structure is 3D-printed in PLA (about 50 g), and the full bill of materials costs about Rs. 4,962. Components were chosen with decision matrices. The model has been designed but not yet tested, so no measured results are reported.',
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
    pdf: '/papers/breathing-led-heart-555.pdf',
    abstract:
      'LED “breathing” effects are usually made with a microcontroller and PWM. This note describes a heart-shaped board on which 20 red LEDs brighten and dim smoothly with no microcontroller and no code. A TLC555 timer charges and discharges its timing capacitor between ⅓ and ⅔ of the supply, so the capacitor voltage is a slow up-and-down ramp. A BC547 transistor wired as an emitter follower copies that ramp, minus one base–emitter drop, onto the LED rail, so the LED current follows the ramp instead of switching on and off. One trimmer sets the breathing rate. The 54×47 mm two-layer board uses only through-hole parts so it can be hand-soldered. We explain the circuit and its timing, note a known asymmetry caused by base current, and list improvements. No measurements are reported.',
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
    pdf: '/papers/seven-segment-esp32.pdf',
    abstract:
      'Ready-made seven-segment modules come in a few fixed sizes. This note describes a larger 4-digit display built on a 116×41 mm two-layer PCB from 60 discrete 0805 LEDs: two LEDs per segment and one per decimal point, 15 per digit. Twelve ESP32 GPIOs drive it by time multiplexing: eight shared segment lines, each through a 220 Ω resistor, and four digit selects that switch each digit’s common cathode through a BC847 NPN transistor. Each digit is lit for 2.2 ms, giving a full refresh every 8.8 ms (about 114 Hz per digit). We give the circuit, the current budget, the firmware structure (framebuffer, scrolling text, clock) and an automated release pipeline that exports fabrication files from each tagged version. The current and refresh figures in this note are calculated design values, not measurements.',
  },
]

/** Newest first; ties keep table order */
export const SORTED_PUBLICATIONS = [...PUBLICATIONS].sort((a, b) => b.date.localeCompare(a.date))

export const getPublication = (slug: string) => PUBLICATIONS.find((p) => p.slug === slug)

/** "Hom Nath Tiwari" → "Tiwari, Hom Nath", the form Google Scholar expects */
export function scholarName(name: string) {
  const parts = name.trim().split(/\s+/)
  const last = parts.pop()!
  return parts.length ? `${last}, ${parts.join(' ')}` : last
}

export function formatPubMonth(date: string, month: 'short' | 'long' = 'long') {
  const [year, m] = date.split('-').map(Number)
  return new Date(Date.UTC(year, m - 1, 1)).toLocaleDateString('en-US', { month, year: 'numeric', timeZone: 'UTC' })
}

export const doiUrl = (doi: string) => `https://doi.org/${doi}`
