'use client'

import { useState } from 'react'
import Image from 'next/image'

interface CertificateBadgeProps {
  certificateImage: string
  title: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function CertificateBadge({ 
  certificateImage, 
  title, 
  description,
  size = 'sm' 
}: CertificateBadgeProps) {
  const [showModal, setShowModal] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`${sizeClasses[size]} rounded-lg overflow-hidden border-2 border-yellow-400/50 hover:border-yellow-400 transition-all duration-300 hover:scale-110 group relative flex-shrink-0`}
        title={`View ${title} certificate`}
      >
        <Image
          src={certificateImage}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <i className="fas fa-eye text-white text-xs"></i>
        </div>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-3xl w-full max-h-[90vh] bg-slate-900 rounded-2xl border border-indigo-500/30 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

            {/* Certificate Image */}
            <div className="p-4">
              <div className="relative w-full h-[60vh] bg-slate-800 rounded-lg overflow-hidden">
                <Image
                  src={certificateImage}
                  alt={title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {description && (
                <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}