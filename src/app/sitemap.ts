import type { MetadataRoute } from 'next'
import { PROJECTS } from '@/content/projects'

const SITE = 'https://bhandari-prashant.com.np'

// Static export: written to out/sitemap.xml at build time
export const dynamic = 'force-static'

/** Built from the project list, so a new write-up is listed as soon as it's added */
export default function sitemap(): MetadataRoute.Sitemap {
  const newest = PROJECTS.map((p) => p.date).sort().at(-1)!
  const month = (date: string) => new Date(`${date}-01T00:00:00Z`)

  return [
    { url: SITE, lastModified: month(newest), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE}/projects`, lastModified: month(newest), changeFrequency: 'monthly', priority: 0.9 },
    ...PROJECTS.map((p) => ({
      url: `${SITE}/projects/${p.slug}`,
      lastModified: month(p.date),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
    { url: `${SITE}/resume`, lastModified: month(newest), changeFrequency: 'yearly', priority: 0.6 },
  ]
}
