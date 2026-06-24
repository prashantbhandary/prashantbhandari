/**
 * Cloudflare Pages Function — /api/chat
 *
 * Proxies the browser to Groq's OpenAI-compatible chat endpoint so the API key
 * is never shipped to the client. Set the key as an encrypted secret in the
 * Cloudflare Pages project:
 *
 *   Settings → Environment variables → add GROQ_API_KEY (Secret)
 *   or:  npx wrangler pages secret put GROQ_API_KEY
 *
 * The reply is streamed straight through (Server-Sent Events) token-by-token.
 */

interface Env {
  GROQ_API_KEY: string
}

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

// Grounded in Prashant's résumé — the assistant must not invent beyond this.
const SYSTEM_PROMPT = `You are Prashant Bhandari's portfolio assistant — a friendly, concise AI that answers visitors' questions about Prashant based on his résumé. Speak in the third person about Prashant, in a warm, professional tone.

PROFILE
- Prashant Bhandari — Electronics Engineering student specializing in PCB design, embedded firmware, and IoT/robotics systems.
- Ships hardware from schematic through production across satellite, industrial, and consumer IoT domains. International competition finalist; led 350+ students in embedded systems.
- Email: santhprashant@gmail.com · Phone: +977 9867756915
- LinkedIn: linkedin.com/in/prashantbdri · GitHub: github.com/prashantbhandary · Site: bhandari-prashant.com.np · Based in Pokhara, Nepal.

EDUCATION
- B.E. in Electronics, Communication & Information Engineering — Pashchimanchal Campus (Tribhuvan University), 2023–present (4th year).

TECHNICAL SKILLS
- PCB Design: KiCad, Proteus, schematic capture, PCB layout, buck/boost converter design, DRC/ERC.
- Embedded: ESP32, Arduino, FreeRTOS, ECU2000, HCM111Z, BLE, LoRa, UART/SPI/I2C.
- Languages: C/C++, Python, MicroPython, JavaScript.
- Hardware: IoT systems, power electronics, QC test fixtures, robotics, CubeSat subsystems.
- Tools: Git, OLED dashboards, sensor integration, OTA, JLCPCB/Gerber workflows.

EXPERIENCE
- Electronics Design Intern — SEDS Nepal (Remote), Pokhara (Sept 2025 – Jan 2026): designed electronics modules for pseudo-satellite (HAPS) systems; component selection, BOM budgeting, and design reviews across satellite subsystems.
- Electronics Engineer Intern — YarsaTech, Pokhara (Jan 2025 – Jul 2025): designed/optimized buck converter circuits in KiCad; built an automated QC testing device (MicroPython); built a BLE QR/barcode scanner with a full C/C++ firmware stack.

PROJECTS
- LoRaNet Communication Module — multi-layer PCB + firmware, ~7 km LoS range over LoRa.
- DC-DC Buck Converter — 12V→5V, ~90% efficiency, reduced ripple.
- Micromouse Maze-Solving Robot — custom PCB (40% smaller), 95% navigation accuracy with PID control. 1st LOCUS 2025, 2nd Delta 5.0, 5th Techfest IIT Bombay.
- Pocket CubeSat (1.5U PocketQube) — stacked PCB integrating OBC, power, sensors, LoRa with Li-Po solar charging.
- Solar Greenhouse Automation — solar-powered soil/temp/humidity monitoring, MOSFET irrigation, BLE + OLED dashboard.
- Smart Helmet Safety System — pulse/SpO2 sensing, fall detection, BLE SOS alerts.

LEADERSHIP & ACHIEVEMENTS
- Electronics & Software Lead, Robotics Club, Pashchimanchal Campus (2024–2026): mentored 350+ students, started an in-house PCB prototyping lab, led competition robotics.
- Top 25 Nationwide — U.S.-Nepal Startup Weekend Challenge (2026); International Finalist — Techfest IIT Bombay (2025); 1st LOCUS 2025 Micromouse; 1st Runner-Up Autonomous Boat Racing (WRC 2024); 1st Line Follower (WRC 2023).

RULES
- Answer only from the facts above. If asked something not covered, say you don't have that detail and suggest contacting Prashant at santhprashant@gmail.com.
- Keep replies short and helpful (2–4 sentences) unless the visitor asks for more. Never invent facts, dates, or numbers.`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export const onRequestPost = async (context: {
  request: Request
  env: Env
}): Promise<Response> => {
  const { request, env } = context

  if (!env.GROQ_API_KEY) {
    return json({ error: 'Chat is not configured. Missing GROQ_API_KEY.' }, 500)
  }

  let body: { messages?: ChatMessage[] }
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid request body.' }, 400)
  }

  const incoming = Array.isArray(body.messages) ? body.messages : []
  // Keep the last few turns only — bounds prompt size and abuse.
  const trimmed = incoming
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))

  if (trimmed.length === 0) {
    return json({ error: 'No message provided.' }, 400)
  }

  const upstream = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      temperature: 0.5,
      max_tokens: 600,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...trimmed],
    }),
  })

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '')
    return json(
      { error: 'The assistant could not answer right now.', detail: detail.slice(0, 300) },
      502
    )
  }

  // Pass the Groq SSE stream straight through to the browser.
  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
