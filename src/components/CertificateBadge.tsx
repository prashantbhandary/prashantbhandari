'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Eye, X } from 'lucide-react'

interface CertificateBadgeProps {
  certificateImage: string
  title: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
}

export default function CertificateBadge({
  certificateImage,
  title,
  description,
  size = 'sm',
}: CertificateBadgeProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${SIZES[size]} relative shrink-0 overflow-hidden rounded-[var(--r-xs)] group`}
        style={{ border: '1px solid var(--line-strong)' }}
        aria-label={`View the ${title} certificate`}
        title={title}
      >
        <Image src={certificateImage} alt="" fill className="object-cover" />
        <span
          className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'rgba(11,11,15,0.45)', color: '#fff' }}
          aria-hidden="true"
        >
          <Eye size={12} />
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          style={{ background: 'rgba(11,11,15,0.55)', backdropFilter: 'blur(6px)' }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
        >
          <div
            className="card w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between gap-4 p-4"
              style={{ borderBottom: '1px solid var(--line)' }}
            >
              <h3 style={{ fontSize: '1.0625rem' }}>{title}</h3>
              <button
                type="button"
                className="nav-toggle"
                onClick={() => setOpen(false)}
                aria-label="Close certificate"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div
                className="relative w-full rounded-[var(--r-sm)] overflow-hidden"
                style={{ background: 'var(--surface-sunk)', height: '60vh' }}
              >
                <Image src={certificateImage} alt={title} fill className="object-contain p-2" priority />
              </div>
              {description && (
                <p style={{ marginTop: '0.875rem', fontSize: '0.875rem', color: 'var(--ink-3)' }}>
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
