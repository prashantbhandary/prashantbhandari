import type { Metadata } from 'next'
import Resume from '@/components/Resume'

const DESCRIPTION =
  'Résumé of Prashant Bhandari: electronics design internships at SEDS Nepal and Yarsa Tech, Robotics Club electronics lead, micromouse competition wins, and PCB, firmware and robotics skills.'

// A page that sets its own Open Graph fields drops the default image, so name it again
const SHARE_IMAGE = ['/opengraph-image']

export const metadata: Metadata = {
  title: 'Résumé',
  description: DESCRIPTION,
  alternates: { canonical: '/resume' },
  openGraph: { type: 'profile', url: '/resume', title: 'Résumé | Prashant Bhandari', description: DESCRIPTION, images: SHARE_IMAGE },
  twitter: { images: SHARE_IMAGE, title: 'Résumé | Prashant Bhandari', description: DESCRIPTION },
}

export default function ResumePage() {
  return <Resume />
}
