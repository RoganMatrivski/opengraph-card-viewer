"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  compact?: boolean
}

export function Pagination({ currentPage, totalPages, onPageChange, compact = false }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Show limited page numbers with ellipsis for better UX
  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return pages
    }

    if (currentPage <= 4) {
      return [...pages.slice(0, 5), "...", totalPages]
    }

    if (currentPage >= totalPages - 3) {
      return [1, "...", ...pages.slice(totalPages - 5)]
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={compact ? "h-7 w-7" : "h-8 w-8"}
      >
        <ChevronLeft className={compact ? "h-3 w-3" : "h-4 w-4"} />
        <span className="sr-only">Previous page</span>
      </Button>

      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className={compact ? "px-2 py-1 text-xs" : "px-3 py-2"}>
              ...
            </span>
          ) : (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              onClick={() => onPageChange(page as number)}
              className={compact ? "h-7 w-7 text-xs" : "h-8 w-8"}
            >
              {page}
            </Button>
          ),
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={compact ? "h-7 w-7" : "h-8 w-8"}
      >
        <ChevronRight className={compact ? "h-3 w-3" : "h-4 w-4"} />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}
