'use client'

import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={className} aria-hidden="true">
      <Spline scene={scene} />
    </div>
  )
}
