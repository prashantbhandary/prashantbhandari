'use client'

import { useEffect, useState } from 'react'

export default function CircuitElements() {
  const [elements, setElements] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    const generateElements = () => {
      const newElements = []
      for (let i = 0; i < 4; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 100 + 80,
          delay: Math.random() * 15
        })
      }
      setElements(newElements)
    }

    generateElements()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((element, index) => (
        <div
          key={element.id}
          className={`circuit-element circuit-${index + 1} absolute rounded-full filter blur-sm`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            animationDelay: `${element.delay}s`
          }}
        />
      ))}
    </div>
  )
}
