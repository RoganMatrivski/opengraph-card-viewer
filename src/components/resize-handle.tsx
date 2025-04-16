"use client"

import { useState, useEffect, type KeyboardEvent } from "react"
import { GripVertical } from "lucide-react"

interface ResizeHandleProps {
  onResize: (newWidth: number) => void
  minWidth?: number
  maxWidth?: number
}

export function ResizeHandle({ onResize, minWidth = 200, maxWidth = 600 }: ResizeHandleProps) {
  const [isDragging, setIsDragging] = useState(false)

  // Step size for keyboard resizing (in pixels)
  const RESIZE_STEP = 10

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

  // Handle keyboard interactions for accessibility
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let newWidth = 0

    // Get the current width from the parent element's style
    const currentWidth = Number.parseInt(
      (e.currentTarget.parentElement?.style.width || `${minWidth}px`).replace("px", ""),
    )

    switch (e.key) {
      case "ArrowRight":
        // Decrease width (make sidebar smaller)
        newWidth = Math.max(minWidth, currentWidth - RESIZE_STEP)
        onResize(newWidth)
        e.preventDefault()
        break
      case "ArrowLeft":
        // Increase width (make sidebar larger)
        newWidth = Math.min(maxWidth, currentWidth + RESIZE_STEP)
        onResize(newWidth)
        e.preventDefault()
        break
      case "End":
        // Set to minimum width
        onResize(minWidth)
        e.preventDefault()
        break
      case "Home":
        // Set to maximum width
        onResize(maxWidth)
        e.preventDefault()
        break
    }
  }

  return (
    <div
      className={`absolute left-0 top-0 h-full w-1 cursor-col-resize flex items-center justify-center hover:bg-primary/20 ${
        isDragging ? "bg-primary/30" : ""
      }`}
      onMouseDown={() => setIsDragging(true)}
      onKeyDown={handleKeyDown}
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize sidebar"
      aria-valuemin={minWidth}
      aria-valuemax={maxWidth}
      tabIndex={0}
      aria-controls="sidebar"
    >
      <div className="h-8 w-1 flex items-center justify-center">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  )
}
