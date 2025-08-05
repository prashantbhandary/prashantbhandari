import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prashant Bhandari | Electronics Engineer & Robotics Expert | Nepal",
  description: "Prashant Bhandari - Electronics Engineer & Robotics Specialist from Pokhara, Nepal. Expertise in embedded systems, PCB design, and robotics competitions. Currently pursuing Electronics, Communication and Information Engineering at Pashchimanchal Campus.",
  keywords: "Prashant Bhandari, electronics engineer, robotics engineer, Nepal, Pokhara, embedded systems, PCB design, Arduino, ESP32, robotics club, YarsaTech, micromouse, robotics club wrc, executive member, electronics engineer intern, general member, robotics mentor, PCB Designer, Embedded Systems Developer, Web Developer, Robotics Enthusiast, Pashchimanchal Campus, LOCUS 2025, Delta 5.0, Techfest IIT Bombay, autonomous boat, line follower, KiCad, Proteus, microcontrollers, Raspberry Pi, C, C++, Python, JavaScript, HTML5, CSS3, TailwindCSS, Hugo, machine learning, linear regression, classification, Git, GitHub, VS Code",
  authors: [{ name: "Prashant Bhandari", url: "https://bhandari-prashant.com.np" }],
  creator: "Prashant Bhandari",
  publisher: "Prashant Bhandari",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bhandari-prashant.com.np",
    siteName: "Prashant Bhandari - Portfolio",
    title: "Prashant Bhandari | Electronics Engineer & Robotics Expert",
    description: "Electronics Engineering Student & Robotics Enthusiast from Pokhara, Nepal. Expertise in embedded systems, PCB design, and robotics competitions.",
    images: [
      {
        url: "https://bhandari-prashant.com.np/images/PrashantBhandari.png",
        width: 1200,
        height: 630,
        alt: "Prashant Bhandari - Electronics Engineer & Robotics Expert",
        type: "image/png",
      },
      {
        url: "https://bhandari-prashant.com.np/images/mm.jpg",
        width: 800,
        height: 600,
        alt: "Micromouse Robot Project by Prashant Bhandari",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@santhprashant",
    creator: "@santhprashant",
    title: "Prashant Bhandari | Electronics Engineer & Robotics Expert",
    description: "Electronics Engineering Student & Robotics Enthusiast from Pokhara, Nepal. Expertise in embedded systems, PCB design, and robotics competitions.",
    images: ["https://bhandari-prashant.com.np/images/PrashantBhandari.png"],
  },
  alternates: {
    canonical: "https://bhandari-prashant.com.np",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Prashant Bhandari",
              "@id": "https://bhandari-prashant.com.np/#person",
              "url": "https://bhandari-prashant.com.np",
              "image": {
                "@type": "ImageObject",
                "url": "https://bhandari-prashant.com.np/images/PrashantBhandari.png",
                "width": 400,
                "height": 400
              },
              "description": "Electronics Engineering Student & Robotics Enthusiast from Pokhara, Nepal. Expertise in embedded systems, PCB design, and robotics competitions.",
              "jobTitle": ["Electronics Engineer", "Robotics Engineer", "Embedded Systems Developer"],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Electronics Engineer",
                "occupationLocation": {
                  "@type": "City",
                  "name": "Pokhara"
                }
              },
              "knowsAbout": ["Electronics Engineering", "Robotics", "Embedded Systems", "PCB Design", "Arduino", "ESP32", "Raspberry Pi", "C/C++", "Python", "JavaScript", "Microcontrollers"],
              "sameAs": [
                "https://www.linkedin.com/in/prashantbdri",
                "https://github.com/prashantbhandary",
                "https://twitter.com/santhprashant",
                "https://www.instagram.com/_prashant.08/"
              ],
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "YarsaTech",
                  "url": "https://yarsatech.com",
                  "location": {
                    "@type": "Place",
                    "name": "Pokhara, Nepal"
                  }
                }
              ],
              "memberOf": {
                "@type": "Organization",
                "name": "Robotics Club Pashchimanchal Campus",
                "description": "Executive Member leading robotics initiatives and mentoring projects"
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Pashchimanchal Campus, Pokhara",
                "description": "Electronics, Communication and Information Engineering (2023-Present)"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pokhara",
                "addressRegion": "Gandaki Province",
                "addressCountry": "NP"
              },
              "email": "info@bhandari-prashant.com.np",
              "telephone": "+977-9867756915",
              "award": [
                "1st Position - LOCUS 2025 Micromouse Competition",
                "2nd Position - Delta 5.0 Micromouse Competition", 
                "5th Position - Techfest IIT Bombay Micromouse Competition",
                "1st Runner-Up - Autonomous Boat Racing Competition"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://bhandari-prashant.com.np/#website",
              "url": "https://bhandari-prashant.com.np",
              "name": "Prashant Bhandari - Electronics Engineer & Robotics Expert",
              "description": "Portfolio website of Prashant Bhandari showcasing expertise in electronics engineering, robotics, and embedded systems.",
              "publisher": {
                "@type": "Person",
                "name": "Prashant Bhandari"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://bhandari-prashant.com.np/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Prashant Bhandari Portfolio",
              "url": "https://bhandari-prashant.com.np",
              "logo": "https://bhandari-prashant.com.np/images/PrashantBhandari.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+977-9867756915",
                "contactType": "Customer Service",
                "email": "info@bhandari-prashant.com.np"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-dark text-light overflow-x-hidden relative`}>
        <a 
          href="#main-content" 
          className="absolute left-[-999px] top-auto w-1 h-1 overflow-hidden z-[1000] bg-white text-black py-2 px-4 focus:left-2 focus:top-2 focus:w-auto focus:h-auto focus:overflow-visible focus:z-[10000] focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          Skip to main content
        </a>
        <div className="circuit-background" />
        {children}
      </body>
    </html>
  );
}
