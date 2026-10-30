import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

// Rendered once at build time into a static PNG
export const dynamic = 'force-static'
export const alt = 'Prashant Bhandari — Electronics engineer: PCB design, firmware and robotics'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** The link preview for every page that doesn't set its own image */
export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), 'public/images/PrashantBhandari.png'))
  const photoSrc = `data:image/png;base64,${photo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#fafafa',
          color: '#0b0b0f',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 680 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: '#4f46e5', textTransform: 'uppercase' }}>
            Electronics engineer · Pokhara, Nepal
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, marginTop: 20, lineHeight: 1.05 }}>
            Prashant Bhandari
          </div>
          <div style={{ fontSize: 32, color: '#4a4a55', marginTop: 24, lineHeight: 1.35 }}>
            PCBs and firmware for robots, IoT devices and satellite subsystems.
          </div>
          <div style={{ display: 'flex', marginTop: 40, fontSize: 24, color: '#0b0b0f' }}>
            <div
              style={{
                display: 'flex',
                padding: '10px 20px',
                borderRadius: 999,
                background: '#eef0ff',
                color: '#4338ca',
              }}
            >
              Seeking a robotics PhD · Fall 2027
            </div>
          </div>
        </div>
        <img
          src={photoSrc}
          alt=""
          width={340}
          height={340}
          style={{ borderRadius: 999, border: '8px solid #ffffff', boxShadow: '0 20px 60px rgba(11,11,15,0.15)' }}
        />
      </div>
    ),
    size,
  )
}
