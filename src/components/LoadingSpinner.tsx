'use client'

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full animate-spin border-t-cyan-400"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <i className="fas fa-microchip text-cyan-400 text-2xl animate-pulse"></i>
        </div>
      </div>
    </div>
  )
}