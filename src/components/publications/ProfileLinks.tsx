import { ArrowUpRight, BookOpen, GraduationCap } from 'lucide-react'
import { RESEARCHGATE_URL, SCHOLAR_URL } from '@/content/publications'

/** Google Scholar and ResearchGate profile buttons */
export default function ProfileLinks({ className = 'pj-links' }: { className?: string }) {
  return (
    <div className={className}>
      <a href={SCHOLAR_URL} target="_blank" rel="noopener noreferrer me" className="btn btn--sm btn--primary">
        <GraduationCap size={14} aria-hidden="true" />
        Google Scholar
        <ArrowUpRight size={12} aria-hidden="true" style={{ opacity: 0.6 }} />
      </a>
      <a href={RESEARCHGATE_URL} target="_blank" rel="noopener noreferrer me" className="btn btn--sm btn--outline">
        <BookOpen size={14} aria-hidden="true" />
        ResearchGate
        <ArrowUpRight size={12} aria-hidden="true" style={{ opacity: 0.6 }} />
      </a>
    </div>
  )
}
