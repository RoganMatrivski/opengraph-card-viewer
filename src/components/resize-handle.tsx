"use client"

import { useState, useEffect } from "react"
import { GripVertical } from "lucide-react"

interface ResizeHandleProps {
  onResize: (newWidth: number) => void
  minWidth?: number
  maxWidth?: number
}

export function ResizeHandle({ onResize, minWidth = 200, maxWidth = 600 }: ResizeHandleProps) {
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      // Calculate the new width based on the distance from the right edge of the screen
      const newWidth = Math.max(minWidth, Math.min(maxWidth, window.innerWidth - e.clientX))

      onResize(newWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, onResize, minWidth, maxWidth])

  return (
    <div
      className={`absolute left-0 top-0 h-full w-1 cursor-col-resize flex items-center justify-center hover:bg-primary/20 ${
        isDragging ? "bg-primary/30" : ""
      }`}
      onMouseDown={() => setIsDragging(true)}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize sidebar"
    >
      <div className="h-8 w-1 flex items-center justify-center">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  )
}
