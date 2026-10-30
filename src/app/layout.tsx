/*
 * File: layout.tsx
 * Created Date: Tuesday August 5th 2025
 * Author: Prashant Bhandari
 * Last Modified: Su/08/2025 05:21:00
 * Modified By: Prashant Bhandari
 * Copyright (c) 2026 Prashant Bhandari
 */

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts are bundled (Latin subset, variable weight) so the build never has to
// reach Google Fonts — a failed fetch there used to fail the whole deploy.

// Body copy
const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

// Headlines — a grotesk with enough character to not read as a template
const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  weight: "300 700",
  display: "swap",
  variable: "--font-space-grotesk",
});

// Metadata, tags, periods — the engineering register of the page
const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const SITE = "https://bhandari-prashant.com.np";
const DESCRIPTION =
  "Electronics engineer in Pokhara, Nepal. I design PCBs and firmware for robots, IoT devices and satellite subsystems. Seeking a robotics PhD for Fall 2027.";

// Each page sets its own title, description and canonical; these are the defaults.
// The share image comes from app/opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Prashant Bhandari — Electronics Engineer, PCB Design & Robotics",
    template: "%s | Prashant Bhandari",
  },
  description: DESCRIPTION,
  keywords: [
    "Prashant Bhandari",
    "electronics engineer Nepal",
    "PCB design",
    "KiCad",
    "embedded systems",
    "firmware",
    "robotics",
    "micromouse",
    "CubeSat",
    "PocketQube",
    "LoRa",
    "OFDM",
    "Pokhara",
    "robotics PhD applicant",
  ],
  authors: [{ name: "Prashant Bhandari", url: SITE }],
  creator: "Prashant Bhandari",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Prashant Bhandari",
    title: "Prashant Bhandari — Electronics Engineer, PCB Design & Robotics",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: "@santhprashant",
    creator: "@santhprashant",
    title: "Prashant Bhandari — Electronics Engineer, PCB Design & Robotics",
    description: DESCRIPTION,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "apple-mobile-web-app-title": "Prashant Bhandari",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#0a0a16",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#06b6d4",
    "color-scheme": "dark",
  },
};

// One graph for the whole site: who the person is, and that this site is theirs
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: "Prashant Bhandari",
      url: SITE,
      image: { "@type": "ImageObject", url: `${SITE}/images/PrashantBhandari.png`, width: 550, height: 550 },
      description:
        "Electronics engineering student in Pokhara, Nepal who designs PCBs and firmware for robots, IoT devices and satellite subsystems. Seeking a robotics PhD position for Fall 2027.",
      jobTitle: "Electronics Engineer",
      knowsAbout: [
        "PCB design",
        "Embedded systems",
        "Firmware",
        "Robotics",
        "Mobile robot control",
        "Small satellite electronics",
        "Low-power wireless sensing",
        "LoRa",
        "OFDM",
        "KiCad",
        "STM32",
        "ESP32",
        "FreeRTOS",
        "C/C++",
        "Python",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Pashchimanchal Campus, Institute of Engineering",
        address: { "@type": "PostalAddress", addressLocality: "Pokhara", addressCountry: "NP" },
      },
      memberOf: {
        "@type": "Organization",
        name: "Robotics Club, Pashchimanchal Campus",
        url: "https://www.robotics.wrc.edu.np",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pokhara",
        addressRegion: "Gandaki Province",
        addressCountry: "NP",
      },
      email: "mailto:info@bhandari-prashant.com.np",
      award: [
        "1st Position, LOCUS 2025 Micromouse Competition",
        "2nd Position, Delta 5.0 Micromouse Competition",
        "5th Position, Techfest IIT Bombay Micromouse Competition",
        "1st Runner-Up, Autonomous Boat Racing Competition",
      ],
      sameAs: [
        "https://www.linkedin.com/in/prashantbdri",
        "https://github.com/prashantbhandary",
        "https://twitter.com/santhprashant",
        "https://www.instagram.com/_prashant.08/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Prashant Bhandari",
      description: DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="google-adsense-account" content="ca-pub-7919679791683906" />
        {/*
          Framer Motion pre-renders its scroll reveals with inline
          `opacity:0`, so without JS the page would render blank. This puts
          every hidden block back on screen when scripts don't run.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="relative overflow-x-hidden">
        <a href="#main-content" className="sr-only sr-only-focusable">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
