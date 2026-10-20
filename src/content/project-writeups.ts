/*
 * Write-ups for the competition robot, the IoT builds and the smaller PCB
 * designs. Same shape as the entries in projects.ts, kept in their own file
 * so neither file gets unwieldy. Every number here comes from the project's
 * own repo: code constants, KiCad netlists, or the logged data.
 */

import type { Project } from './projects'

const GITHUB = 'https://github.com/prashantbhandary'
const doi = (id: string) => `https://doi.org/${id}`

export const MORE_WRITEUPS: Project[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'micromouse',
    title: 'Micromouse Line-Maze Robot',
    summary:
      'A line-maze robot that explores with a left-hand rule, shortens its route as it goes, then races the shortest path. Built over four hardware revisions.',
    line: 'Maze-solving robot on a custom PCB, with PID motion control.',
    category: 'robotics',
    kind: 'Robotics · Firmware · PCB',
    date: '2025-09',
    status: 'Competition-proven',
    tools: ['Arduino Nano', 'QTR-8A', 'TB6612FNG', 'ESP32', 'KiCad'],
    highlight: '1st LOCUS 2025 · 2nd Delta 5.0 · 5th Techfest IIT Bombay',
    cover: {
      src: '/images/MicroMouse.jpg',
      alt: 'The micromouse robot held in a hand: a stacked PCB with an Arduino Nano, buck converter and ribbon cable to the sensor array',
      width: 708,
      height: 748,
    },
    facts: [
      { value: '1st', label: 'LOCUS 2025, IOE Pulchowk' },
      { value: '2nd', label: 'Delta 5.0, IOE Purwanchal' },
      { value: '5th', label: 'Techfest, IIT Bombay' },
      { value: '4', label: 'Hardware revisions' },
    ],
    links: [{ label: 'Source', href: `${GITHUB}/MicroMouse-LineMaze`, kind: 'source' }],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            type: 'p',
            text: 'A line maze is a grid of black lines with dead ends, loops and one goal. The robot gets a dry run to explore and a final run that is timed. It has to find the goal, remember how it got there, and drive the shortest route without stopping to think.',
          },
          {
            type: 'p',
            text: 'This is the robot and firmware I competed with. It went through four revisions, from a breadboard-style Nano prototype to a custom PCB, and placed 1st at LOCUS 2025, 2nd at Delta 5.0 and 5th at Techfest, IIT Bombay.',
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
              { label: 'QTR-8A', note: '8 IR sensors' },
              { label: 'Arduino Nano', note: 'PD + maze logic' },
              { label: 'TB6612FNG', note: 'dual H-bridge' },
              { label: 'Motors' },
            ],
          },
          {
            type: 'steps',
            items: [
              {
                title: 'Sensing the line',
                text: 'Eight analog IR sensors read the floor. After a calibration sweep, the QTR library turns them into one line position from 0 to 7000, where 3500 means the line is centred.',
              },
              {
                title: 'Following it',
                text: 'A PD controller steers: `error = 3500 − position`, and the correction `kp·error + kd·(error − lastError)` is added to one wheel and taken from the other. On the v2 board the tuned values were kp = 0.151 and kd = 0.8 at full base speed.',
              },
              {
                title: 'Spotting a junction',
                text: 'When an outer sensor (0 or 7) sees black, there is a branch to that side. The robot nudges forward and checks the middle six sensors: any black means a straight path exists, all black means it has reached the goal.',
              },
              {
                title: 'Choosing a turn',
                text: 'Left first, then Straight, then Right, then Back (LSRB): the left-hand rule. Every turn is appended to a `path[]` array.',
              },
              {
                title: 'Shortening the route',
                text: 'After every turn, `simplify_path()` looks for a dead end sandwiched between two turns (`xBx`). It adds up their angles and replaces all three with one turn, so the stored path is always the shortest route found so far.',
              },
              {
                title: 'The fast run',
                text: 'At the goal the robot stops and waits for a button press. On the second run it replays `path[]`, taking the stored turn at each junction without exploring.',
              },
            ],
          },
          {
            type: 'code',
            lang: 'cpp',
            caption: 'Dead-end removal: three turns become one by summing their angles.',
            code: `// only when the second-to-last turn was a U-turn ('B')
for (m = 1; m <= 3; m++) {
  switch (path[path_length - m]) {
    case 'R': total_angle += 90;  break;
    case 'L': total_angle += 270; break;
    case 'B': total_angle += 180; break;
  }
}
switch (total_angle % 360) {          // e.g. L B L = 720° → 0° → 'S'
  case 0:   path[path_length - 3] = 'S'; break;
  case 90:  path[path_length - 3] = 'R'; break;
  case 180: path[path_length - 3] = 'B'; break;
  case 270: path[path_length - 3] = 'L'; break;
}
path_length -= 2;`,
          },
        ],
      },
      {
        id: 'hardware',
        title: 'Hardware revisions',
        blocks: [
          {
            type: 'table',
            columns: ['Version', 'Controller', 'Motor driver', 'What changed'],
            rows: [
              ['v1', 'Arduino Nano', 'L293D', 'First prototype with a QTR-8A array'],
              ['v2', 'Arduino Nano', 'TB6612FNG', 'Custom PCB, better motor control and PID tuning'],
              ['v3.0 / v3.1', 'Arduino Nano', 'TB6612FNG', 'Refined layout; the competition robot'],
              ['ESP32 v1', 'ESP32 DevKit', 'On custom PCB', 'More processing headroom and wireless'],
            ],
          },
          {
            type: 'gallery',
            figures: [
              {
                src: '/images/projects/micromouse/nano-top.webp',
                alt: 'Top view of the Nano-based micromouse with buck converter, Arduino Nano, battery and three buttons',
                caption: 'Nano version from above: buck converter, Nano, three mode buttons and the battery.',
                width: 1080,
                height: 1216,
              },
              {
                src: '/images/projects/micromouse/esp32-on-track.webp',
                alt: 'The ESP32 version of the robot sitting on a black-and-white line maze',
                caption: 'The ESP32 revision on a practice maze.',
                width: 981,
                height: 1920,
              },
              {
                src: '/images/projects/micromouse/pcb-nano-v2.webp',
                alt: '3D render of the v2 Nano carrier PCB',
                caption: 'v2 carrier board (KiCad render).',
                width: 1515,
                height: 1064,
              },
              {
                src: '/images/projects/micromouse/pcb-esp32.webp',
                alt: '3D render of the ESP32 micromouse PCB',
                caption: 'ESP32 board (KiCad render).',
                width: 1519,
                height: 1064,
              },
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
            listing: `MicroMouse-LineMaze/
  ArduinoNano/
    micro_mouse_v1-files/        # prototype code + design
    micro_mouse_v2-files/
      BlackLineMazeFinal_v2-Code/  # competition maze solver
      WhiteLineMazeFinal_v2-Code/  # same, for white lines
      LineFollowerPid_v2-Code/     # PID line follower only
      micro_mouse_v2-pcb/          # KiCad project
    micro_mouse_v3_files/        # v3.0 and v3.1 PCBs
    arduno_nano_v1_TestingCode/  # sensor and motor tests
  Esp32/
    micromouseEsp32_v1_PCB/      # KiCad project + iBOM
    LineFolloweEsp32_v1_code/    # PlatformIO firmware
    testing_esp32_v1_code/       # bring-up sketches
  IMG/                           # photos and run videos`,
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
              'Use wheel encoders so the fast run can straighten long corridors and brake before turns.',
              'Move from left-hand-rule exploration to flood fill, which also solves mazes with loops around the goal.',
              'Log sensor data over the ESP32’s Wi-Fi to tune the PD gains from real runs instead of by feel.',
            ],
          },
        ],
      },
    ],
    reading: [
      { title: 'Maze Solving Algorithms for Micro Mouse', source: 'S. Mishra, P. Bande · IEEE SITIS', year: 2008, kind: 'Paper', href: doi('10.1109/SITIS.2008.104') },
      { title: '3pi Robot User’s Guide — Example Project #2: Maze Solving', source: 'Pololu', kind: 'Guide', href: 'https://www.pololu.com/docs/0J21/8' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'greenhouse',
    title: 'Solar Greenhouse Automation',
    summary:
      'A solar-powered ESP32 controller that logs a greenhouse every 5 seconds and runs a mister and a pump, with a logged comparison of automatic and manual control.',
    line: 'Solar-powered ESP32 that logs the soil and air and runs irrigation.',
    category: 'embedded',
    kind: 'Embedded · IoT · Experiment',
    date: '2026-05',
    status: 'Tested · 1,891 samples',
    tools: ['ESP32', 'DHT11', 'BLE', 'SSD1306', 'Python'],
    cover: {
      src: '/images/projects/greenhouse/cover.webp',
      alt: '3D render of the greenhouse controller PCB with an ESP32 module, OLED display and MOSFETs',
      width: 1200,
      height: 918,
    },
    facts: [
      { value: '1,891', label: 'Logged samples' },
      { value: '58 → 72 %', label: 'Mean humidity, manual → auto' },
      { value: '11.5 %', label: 'Mister on-time in auto' },
      { value: '5 s', label: 'Log interval' },
    ],
    links: [
      { label: 'Firmware', href: `${GITHUB}/GreenHouseMonitoring`, kind: 'source' },
      { label: 'PCB', href: `${GITHUB}/SolarBasedRealTimeGreenHouseAutomation`, kind: 'source' },
      { label: 'Report (PDF)', href: '/minor_project_report.pdf', kind: 'doc' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            type: 'p',
            text: 'Small greenhouses are usually watered and misted by hand, on a schedule rather than when the plants need it. This controller measures the air and soil, switches a mister and a water pump itself, and runs from a solar-charged battery so it needs no mains supply.',
          },
          {
            type: 'p',
            text: 'Beyond building it, I ran it in two modes, automatic and manual, logged every 5 seconds, and compared the results. The analysis scripts and figures are in the repo.',
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
              { label: 'DHT11 + soil probe', note: 'GPIO 5, ADC 33' },
              { label: 'ESP32', note: 'rules + logging' },
              { label: 'Relays', note: 'mister 26, pump 32' },
              { label: 'BLE', note: 'phone + logger' },
            ],
            caption: 'Sensors in, actuators out, data over BLE. The OLED shows readings, mode and thresholds.',
          },
          {
            type: 'table',
            caption: 'Control rules in automatic mode',
            columns: ['Actuator', 'Turns on when', 'Turns off when'],
            rows: [
              ['Mister', 'Temperature > 27 °C, or humidity < 50 %', 'Humidity > 70 %'],
              ['Pump', 'Soil reading > 2416 (dry)', 'Soil reading ≤ 2416'],
            ],
          },
          {
            type: 'steps',
            items: [
              {
                title: 'Measuring',
                text: 'A DHT11 gives air temperature and humidity (averaged over 5 reads). A resistive probe gives soil moisture as a 12-bit ADC value, where higher means drier. The battery voltage is sampled through a divider.',
              },
              {
                title: 'Deciding',
                text: 'In AUTO mode the rules above run on every reading. In MANUAL mode the phone sets the mister and pump directly.',
              },
              {
                title: 'Reporting',
                text: 'A BLE service sends `temp,humidity,soil,battery` every 5 seconds and accepts new thresholds and mode changes. A Python logger on a laptop records everything to CSV.',
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
            type: 'p',
            text: 'Two sessions on 9 May 2026: about 1.6 hours in MANUAL mode with the actuators mostly off, then about 1.9 hours in AUTO mode. I recomputed these numbers from the raw logs.',
          },
          {
            type: 'table',
            caption: 'AUTO vs MANUAL, mean ± standard deviation',
            columns: ['Measure', 'AUTO (835 samples)', 'MANUAL (1,056 samples)'],
            rows: [
              ['Temperature', '27.3 ± 0.8 °C', '28.2 ± 0.5 °C'],
              ['Humidity', '71.9 ± 3.5 %', '58.1 ± 3.8 %'],
              ['Soil reading (ADC)', '880 ± 31', '854 ± 72'],
              ['Battery', '6.47 ± 0.35 V', '7.19 ± 0.13 V'],
              ['Mister on', '11.5 % of the time', '0.7 % of the time'],
            ],
          },
          {
            type: 'figure',
            figure: {
              src: '/images/projects/greenhouse/time-series.webp',
              alt: 'Four time-series plots of temperature and humidity in AUTO and MANUAL modes with threshold lines',
              caption: 'Temperature and humidity over each session. In AUTO the mister pulls temperature back under 27 °C and holds humidity around the 70 % ceiling. Straight segments are gaps in logging.',
              width: 1600,
              height: 1143,
              fit: 'contain',
            },
          },
          {
            type: 'figure',
            figure: {
              src: '/images/projects/greenhouse/mode-comparison.webp',
              alt: 'Histograms comparing temperature, humidity, soil moisture and battery voltage between AUTO and MANUAL modes',
              caption: 'Distributions per mode. The humidity peaks barely overlap; the battery runs lower in AUTO because the mister draws power.',
              width: 1600,
              height: 1331,
              fit: 'contain',
            },
          },
          {
            type: 'callout',
            tone: 'note',
            title: 'Limits of this comparison',
            text: 'The two sessions ran at different times of the same day, so outside temperature and sunlight differed, and the soil never got dry enough to trigger the pump. A fair test needs both modes run side by side, over several days.',
          },
        ],
      },
      {
        id: 'files',
        title: 'Folder structure',
        blocks: [
          {
            type: 'tree',
            listing: `GreenHouseMonitoring/
  src/main.cpp                   # sensing, rules, BLE, OLED
  test/                          # DHT, pump, mister, battery tests
  greenhouse_ble_logger.py       # BLE → CSV on a laptop
  greenhouse_auto_log.csv        # AUTO session
  greenhouse_manual_log.csv      # MANUAL session
  analyze_greenhouse_data.py     # statistics + figures
  figures2/                      # plots and LaTeX tables
  platformio.ini`,
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
              'Run both modes in parallel in two identical enclosures for a fair comparison.',
              'Replace the DHT11 with an SHT-series sensor for better humidity accuracy.',
              'Calibrate the soil probe against gravimetric moisture so the threshold means a real water content.',
            ],
          },
        ],
      },
    ],
    reading: [
      { title: 'Connected Greenhouse for Experimental Validation of IoT Control and Monitoring System', source: 'EPJ Web of Conferences', year: 2025, kind: 'Paper', href: doi('10.1051/epjconf/202533004001') },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'loranet',
    title: 'LoRaNet',
    summary:
      'Text messages, AI questions and email over a 433 MHz LoRa link when there is no mobile data. A team project; I built the mobile app.',
    line: 'Reach home internet over LoRa when cellular is down.',
    category: 'embedded',
    kind: 'RF · Embedded · Mobile app',
    date: '2026-03',
    status: 'Prototype tested',
    tools: ['ESP32', 'LoRa 433 MHz', 'BLE', 'Flutter', 'Gemini API'],
    highlight: '~3 km line-of-sight range',
    cover: {
      src: '/images/projects/loranet/app.webp',
      alt: 'Three phone screens of the LoRaNet app: Messages, GPT Chat and Mail tabs, each waiting to connect to the ESP32',
      width: 989,
      height: 675,
    },
    facts: [
      { value: '433 MHz', label: 'LoRa band' },
      { value: '255 B', label: 'Largest packet' },
      { value: '200 B', label: 'Chunk size used' },
      { value: '3', label: 'Features: chat, AI, mail' },
    ],
    links: [
      { label: 'Firmware', href: 'https://github.com/awakesid/LoraNet', kind: 'source' },
      { label: 'App', href: `${GITHUB}/lora_net_app`, kind: 'source' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            type: 'p',
            text: 'When the mobile network is down, a phone can still reach a small radio. LoRaNet puts one LoRa device in the field (paired to a phone over Bluetooth) and another at home on Wi-Fi. Text goes over LoRa to the home device, which does the internet part and sends the answer back.',
          },
          {
            type: 'callout',
            tone: 'note',
            title: 'Team project',
            text: 'The ESP32 firmware was written by my teammates. My part was the Flutter mobile app, which talks to the field device over BLE and builds the packets described below.',
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
              { label: 'Phone app', note: 'Flutter' },
              { label: 'LoRa_out', note: 'BLE UART' },
              { label: 'LoRa 433 MHz' },
              { label: 'LoRa_home', note: 'ESP32 + Wi-Fi' },
              { label: 'Internet', note: 'Gemini, email' },
            ],
          },
          {
            type: 'steps',
            items: [
              {
                title: 'Three features',
                text: 'A text walkie-talkie between two phones (no Wi-Fi needed), questions to an AI model answered from home, and email sent from home on your behalf.',
              },
              {
                title: 'Packets have a header',
                text: 'While testing, another team’s LoRa project on the same settings kept injecting its own JSON. So every packet starts with an ID: `RITU` for chat and AI, `MAIL` for email, with a feature ID after it. Anything else is discarded.',
              },
              {
                title: 'Long text is chunked',
                text: 'LoRa’s length register is 8 bits, so one packet carries at most 255 bytes (about 51 at spreading factor 12). Long answers are split into 200-byte chunks, each prefixed `RITU`, and closed with a `RITUEND` packet. The receiver joins them in order.',
              },
              {
                title: 'The app does the encoding',
                text: 'The field device just relays whatever the app sends. The app adds the header and feature IDs, and sends an email’s recipient, subject and body as three separate tagged packets for the home device to reassemble.',
              },
            ],
          },
          {
            type: 'gallery',
            figures: [
              {
                src: '/images/projects/loranet/app.webp',
                alt: 'Messages, GPT Chat and Mail screens of the LoRaNet app',
                caption: 'The app’s three tabs, one per feature.',
                width: 989,
                height: 675,
                fit: 'contain',
              },
              {
                src: '/images/projects/loranet/flow.webp',
                alt: 'Flowchart of the AI feature across the mobile app, the field device and the home device',
                caption: 'The AI feature end to end: prompt out, chunked answer back (from the project README).',
                width: 812,
                height: 573,
                fit: 'contain',
              },
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
            listing: `LoraNet/                       # firmware (team)
  src/lora_home.cpp            # home gateway: LoRa ↔ Wi-Fi, AI, mail
  test/lora_out.cpp            # field device: BLE ↔ LoRa
  platformio.ini               # LoRa, ArduinoJson, ESP-Mail-Client
lora_net_app/                  # mobile app (mine)
  lib/                         # Flutter UI and BLE logic
  android/ ios/                # platform projects`,
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
              'Acknowledge each chunk and resend lost ones; today a dropped chunk corrupts the message.',
              'Encrypt payloads, since anyone on 433 MHz with the same settings can read them.',
              'Measure range and packet loss against spreading factor in a proper field test.',
            ],
          },
        ],
      },
    ],
    reading: [
      { title: 'A Study of LoRa: Long Range & Low Power Networks for the Internet of Things', source: 'A. Augustin et al. · Sensors', year: 2016, kind: 'Paper', href: doi('10.3390/s16091466') },
      { title: 'Long-Range Communications in Unlicensed Bands: The Rising Stars in the IoT and Smart City Scenarios', source: 'M. Centenaro et al. · IEEE Wireless Communications', year: 2016, kind: 'Paper', href: doi('10.1109/MWC.2016.7721743') },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'relay-module',
    title: '4-Channel Relay Module',
    summary:
      'A four-channel 5 V relay board. Each channel is a BC547 driver, a flyback diode and a status LED, with screw terminals for the switched side.',
    line: 'Four 5 V relays with transistor drivers, flyback diodes and status LEDs.',
    category: 'pcb',
    kind: 'PCB design · Power switching',
    date: '2025-10',
    status: 'Design complete',
    tools: ['KiCad', 'SRD-05VDC-SL-C', 'BC547B', 'THT'],
    cover: {
      src: '/images/projects/relay-module/cover.webp',
      alt: '3D render of a green relay board with four blue relays and green screw terminals',
      width: 1072,
      height: 670,
    },
    facts: [
      { value: '4', label: 'Relay channels' },
      { value: '60 × 75 mm', label: 'Board outline' },
      { value: '2-layer', label: 'Through-hole only' },
      { value: 'NO + NC', label: 'Both contacts on terminals' },
    ],
    links: [{ label: 'Source', href: `${GITHUB}/4-RelayModulePCBDesign`, kind: 'source' }],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            type: 'p',
            text: 'A microcontroller pin can’t drive a relay coil: the coil needs about 70 mA and kicks back a voltage spike when switched off. This board puts the driver, the protection and an indicator next to each relay, so four loads can be switched from four logic pins.',
          },
        ],
      },
      {
        id: 'how-it-works',
        title: 'How it works',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: 'Input',
                text: 'A 6-pin header brings in VCC, GND and the four control lines (IN1–IN4).',
              },
              {
                title: 'Driver',
                text: 'Each control line drives a BC547B through a 1 kΩ base resistor; the transistor sinks the relay coil to ground. From a 3.3 V pin that is about 2.6 mA of base current, plenty to saturate the transistor for a ~70 mA coil.',
              },
              {
                title: 'Protection',
                text: 'A 1N4007 sits across each coil. When the transistor turns off, the coil current circulates through the diode instead of spiking the collector voltage.',
              },
              {
                title: 'Indication and outputs',
                text: 'A status LED per channel shows when the coil is energised, plus one power LED. Each relay’s COM, NO and NC contacts go to a 3-way screw terminal.',
              },
            ],
          },
          {
            type: 'figure',
            figure: {
              src: '/images/projects/relay-module/schematic.webp',
              alt: 'KiCad schematic of four identical relay channels plus the input header and power LED',
              caption: 'Four identical channels, plus headers and the power LED.',
              width: 1600,
              height: 1095,
              fit: 'contain',
            },
          },
          {
            type: 'figure',
            figure: {
              src: '/images/projects/relay-module/layout.webp',
              alt: 'PCB layout plot of the relay module: screw terminals on the left, relays in the middle, drivers and the input header on the right',
              caption: 'Layout (plotted from the KiCad file): terminals down the left, each relay’s driver, diode and LED beside it, the input header on the right.',
              width: 969,
              height: 1200,
              fit: 'contain',
            },
          },
        ],
      },
      {
        id: 'hardware',
        title: 'Bill of materials',
        blocks: [
          {
            type: 'table',
            columns: ['Part', 'Qty', 'Value'],
            rows: [
              ['Relay', '4', 'SRD-05VDC-SL-C (5 V coil)'],
              ['NPN transistor', '4', 'BC547B (TO-92)'],
              ['Flyback diode', '4', '1N4007'],
              ['Resistor', '9', '1 kΩ (bases and LEDs)'],
              ['LED', '5', '3 mm, four status + one power'],
              ['Screw terminal', '4', '3-way, 5 mm pitch'],
              ['Pin header', '1', '1×6, 2.54 mm'],
            ],
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
              'Add optocouplers on the inputs, so the controller’s ground is isolated from the relay supply.',
              'Widen the contact traces and add slots between the mains side and the logic side for higher-voltage loads.',
            ],
          },
        ],
      },
    ],
    reading: [
      { title: 'AN319: Relay Drive Protection', source: 'STMicroelectronics', kind: 'App note', href: 'https://www.st.com/resource/en/application_note/an319-relay-drive-protection-stmicroelectronics.pdf' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'mosfet-driver',
    title: 'Quad-MOSFET Motor Driver',
    summary:
      'A 14.5 × 17.8 mm board that switches four DC motors from logic pins, one SOT-23 N-MOSFET per motor.',
    line: 'Four-channel MOSFET board for one-direction DC motors.',
    category: 'pcb',
    kind: 'PCB design · Motor drive',
    date: '2025-10',
    status: 'Design complete',
    tools: ['KiCad', 'N-MOSFET', 'SOT-23', '0805'],
    cover: {
      src: '/images/projects/mosfet-driver/cover.webp',
      alt: '3D render of a small green board with four MOSFETs and four diodes',
      width: 1008,
      height: 630,
    },
    facts: [
      { value: '4', label: 'Motor channels' },
      { value: '14.5 × 17.8 mm', label: 'Board outline' },
      { value: '1-layer', label: 'Copper' },
      { value: '5 V', label: 'Motor supply' },
    ],
    links: [{ label: 'Source', href: `${GITHUB}/Unidirectional-Quad-MOSFET-Motor-Driver`, kind: 'source' }],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            type: 'p',
            text: 'Fans, pumps and propellers only ever turn one way, so a full H-bridge is overkill. This thumbnail-sized board switches four of them with one transistor each, and PWM on the enable pins sets their speed.',
          },
        ],
      },
      {
        id: 'how-it-works',
        title: 'How it works',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: 'Low-side switch',
                text: 'Each motor sits between +5 V and the drain of an N-MOSFET whose source is on ground. Pulling the gate high completes the circuit.',
              },
              {
                title: 'Gate network',
                text: 'The enable pin drives the gate through 100 Ω, which limits the charging current and damps ringing. A 10 kΩ pull-down holds the gate low, so motors stay off while the microcontroller boots.',
              },
              {
                title: 'Back-EMF',
                text: 'A diode across each motor (cathode to +5 V) carries the motor’s current when the MOSFET switches off, so the drain isn’t hit by an inductive spike.',
              },
            ],
          },
          {
            type: 'figure',
            figure: {
              src: '/images/projects/mosfet-driver/schematic.webp',
              alt: 'Schematic of four identical low-side MOSFET channels with gate resistors, pull-downs and flyback diodes',
              caption: 'Four identical channels.',
              width: 1215,
              height: 579,
              fit: 'contain',
            },
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
              'Pick a specific logic-level MOSFET (fully on at 3.3 V gate drive) and size it for the motors’ stall current.',
              'Swap the 1N4007s for Schottky diodes, which recover faster at PWM frequencies.',
            ],
          },
        ],
      },
    ],
    reading: [
      { title: 'Fundamentals of MOSFET and IGBT Gate Driver Circuits', source: 'L. Balogh · Texas Instruments SLUA618', year: 2018, kind: 'App note', href: 'https://www.ti.com/lit/ml/slua618a/slua618a.pdf' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'power-monitor',
    title: 'ESP32 Power Monitor',
    summary:
      'An ESP32 board that measures a load’s current and power with an INA219 and a 10 mΩ shunt, with single-cell Li-ion protection on board.',
    line: 'Measures load current and power with an INA219 and reports over Wi-Fi.',
    category: 'pcb',
    kind: 'PCB design · Measurement',
    date: '2026-06',
    status: 'Schematic stage',
    inProgress: true,
    tools: ['KiCad', 'ESP32-WROOM-32E', 'INA219', 'DW01A'],
    cover: {
      src: '/images/projects/power-monitor/cover.webp',
      alt: 'Schematic excerpt showing the INA219 current sensor with its shunt resistor and the ESP32 module',
      width: 1191,
      height: 744,
    },
    facts: [
      { value: '10 mΩ', label: 'Shunt resistor' },
      { value: '1 mA', label: 'Current step (10 µV / 10 mΩ)' },
      { value: '0–26 V', label: 'Bus voltage range' },
      { value: 'I²C', label: 'Sensor to ESP32' },
    ],
    links: [{ label: 'Source', href: `${GITHUB}/power-monitor`, kind: 'source' }],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            type: 'p',
            text: 'To know how long a battery-powered build will last, you need its real current draw over time, not a multimeter snapshot. This board sits between a supply and a load, measures both, and lets an ESP32 log them or send them over Wi-Fi.',
          },
          {
            type: 'p',
            text: 'The schematic is complete; layout is next.',
          },
        ],
      },
      {
        id: 'how-it-works',
        title: 'How it works',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: 'Current sensing',
                text: 'The load current flows through a 10 mΩ shunt between two barrel jacks. The INA219 reads the tiny voltage across it (10 µV resolution, so about 1 mA) and the bus voltage, and works out power itself.',
              },
              {
                title: 'Talking to the ESP32',
                text: 'The INA219 is on I²C with 10 kΩ pull-ups. Its A0 and A1 pins are grounded, which gives it address 0x40.',
              },
              {
                title: 'Battery protection',
                text: 'A DW01A with an FS8205A dual MOSFET guards a single Li-ion cell against over-charge, over-discharge and over-current.',
              },
            ],
          },
          {
            type: 'figure',
            figure: {
              src: '/images/projects/power-monitor/schematic.webp',
              alt: 'Full schematic: current sensor section, ESP32 module, barrel jacks, and the DW01A battery protection section',
              caption: 'The full schematic: sensing (top left), ESP32 (right), battery protection (bottom).',
              width: 1191,
              height: 1174,
              fit: 'contain',
            },
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
              'Lay out the board with a Kelvin connection to the shunt, so trace resistance doesn’t skew the reading.',
              'Write firmware that logs at a fixed rate and streams to a dashboard.',
              'Calibrate against a bench meter across the current range.',
            ],
          },
        ],
      },
    ],
    reading: [
      { title: 'INA219 Zero-Drift, Bidirectional Current/Power Monitor (datasheet)', source: 'Texas Instruments', kind: 'Datasheet', href: 'https://www.ti.com/lit/ds/symlink/ina219.pdf' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'cubesat',
    title: 'Pocket CubeSat (1.5U)',
    summary:
      'An educational 1.5U PocketQube: stacked PCBs around a NodeMCU, sized up from 1U so the microcontroller fits.',
    line: 'Stacked-PCB PocketQube with LoRa radio and solar charging.',
    category: 'embedded',
    kind: 'Space systems · PCB · Mechanical',
    date: '2026-01',
    status: 'Educational prototype',
    tools: ['KiCad', 'NodeMCU', 'LoRa'],
    cover: {
      src: '/images/projects/cubesat/cover.webp',
      alt: '3D render of the PocketQube stack PCB with header rows and mounting holes',
      width: 1450,
      height: 906,
    },
    facts: [
      { value: '5 cm', label: '1U PocketQube edge' },
      { value: '1.5U', label: 'Chosen size' },
      { value: '44 × 44 mm', label: 'Side panel' },
      { value: '3 mm', label: 'Panel thickness' },
    ],
    links: [
      { label: 'OBC board', href: `${GITHUB}/pocketCubeSat_Esp32_demo`, kind: 'source' },
      { label: 'Stack board', href: `${GITHUB}/PCubeSat`, kind: 'source' },
      { label: 'Report (PDF)', href: '/cubesat.pdf', kind: 'doc' },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        blocks: [
          {
            type: 'p',
            text: 'A CubeSat unit is a 10 cm cube; a PocketQube unit is 5 cm. At that size, power, layout and heat all get harder. This project was a teaching build: design the structure and electronics of a PocketQube and learn where the limits are.',
          },
        ],
      },
      {
        id: 'how-it-works',
        title: 'Design',
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: 'Why 1.5U',
                text: 'The microcontroller board, with its peripherals and mounting clearances, would not fit inside a 1U (5 cm) cube. Stretching one axis to 1.5U kept it compact while leaving room to assemble and reach the boards.',
              },
              {
                title: 'Structure, phase I',
                text: 'Six identical 44 × 44 mm side panels, 3 mm thick, bolted into a rigid 50 mm cube. Light, but closed in.',
              },
              {
                title: 'Structure, phase II',
                text: 'The electronics outgrew the panels, so the side walls were dropped for a stud-based frame that holds stacked PCBs, as flight PocketQubes do.',
              },
              {
                title: 'Electronics',
                text: 'Two KiCad boards: an on-board computer built around a NodeMCU, and a stack board with header rows that carries signals between layers.',
              },
            ],
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
              'Add a power board with solar input and a battery fuel gauge, following the PQ9 electrical interface.',
              'Replace the NodeMCU module with a bare microcontroller to get back to 1U.',
            ],
          },
        ],
      },
    ],
    reading: [
      { title: 'The PocketQube Standard', source: 'Alba Orbital, TU Delft, GAUSS', year: 2018, kind: 'Standard', href: 'https://www.albaorbital.com/pocketqube-standard' },
      { title: 'Delfi-PQ: The First PocketQube of Delft University of Technology', source: 'S. Radu et al. · International Astronautical Congress', year: 2018, kind: 'Paper', href: 'https://pure.tudelft.nl/ws/files/47563560/IAC_18_B4_6B_5_x43866.pdf' },
    ],
  },
]
