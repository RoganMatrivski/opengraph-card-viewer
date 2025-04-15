import type React from "react"

import { useState } from "react"
import { Download, ChevronLeft, ChevronRight, PanelRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface NavbarProps {
  onSearch: (query: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  toggleSidebar: () => void
  isSidebarOpen: boolean
}

export function Navbar({ onSearch, currentPage, totalPages, onPageChange, toggleSidebar, isSidebarOpen }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [pageInput, setPageInput] = useState("")
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleGoToPage = () => {
    const pageNumber = Number.parseInt(pageInput)
    if (!Number.isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber)
      setIsPopoverOpen(false)
      setPageInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGoToPage()
    }
  }

  // Show a limited number of pages with ellipsis
  const getVisiblePages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5]
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
  }

  const visiblePages = getVisiblePages()

  return (
    <nav className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4 md:gap-6">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            OG
          </div>
          <span>OpenGraph Viewer</span>
        </a>
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center gap-2">
          <Input
            type="text"
            placeholder="Enter URL to fetch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Load
          </Button>
        </form>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          {visiblePages.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="h-8 w-8"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>

          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Go to...
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2">
              <div className="flex gap-2">
                <Input
                  type="number"
                  min={1}
                  max={totalPages}
                  placeholder={`1-${totalPages}`}
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-8"
                />
                <Button size="sm" className="h-8 px-2" onClick={handleGoToPage}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Enter a page number between 1 and {totalPages}</p>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="ml-2"
          aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        >
          <PanelRight className={`h-4 w-4 transition-transform ${isSidebarOpen ? "rotate-180" : ""}`} />
        </Button>
      </div>
    </nav>
  )
}
