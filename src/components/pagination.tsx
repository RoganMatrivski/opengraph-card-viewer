"use client";

import React from "react";

import { useState } from "react";
import {
	Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	const [pageInput, setPageInput] = useState("");
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	// Show a limited number of pages with ellipsis
	const getVisiblePages = () => {
		if (totalPages <= 5)
			return Array.from({ length: totalPages }, (_, i) => i + 1);

		if (currentPage <= 3) {
			return [1, 2, 3, 4, totalPages];
		}

		if (currentPage >= totalPages - 2) {
			return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
		}

		return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
	};

	const handleGoToPage = () => {
		const pageNumber = Number.parseInt(pageInput);
		if (!Number.isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
			onPageChange(pageNumber);
			setIsPopoverOpen(false);
			setPageInput("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleGoToPage();
		}
	};

	const visiblePages = getVisiblePages();

	return (
		<div className="flex items-center justify-center gap-2 py-6">
    <Button
      variant="outline"
      size="sm"
				onClick={() => onPageChange(Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}
      className="h-8 px-3"
    >
      Prev
    </Button>

			{visiblePages.map((page, index) => (
				<React.Fragment key={page}>
					{index > 0 && visiblePages[index - 1] !== page - 1 && (
						<span className="h-8 w-8 flex items-center justify-center">
							...
						</span>
					)}
					<Button
						variant={currentPage === page ? "default" : "outline"}
						size="sm"
						onClick={() => onPageChange(page)}
						className="h-8 w-8"
					>
						{page}
					</Button>
				</React.Fragment>
			))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="h-8 px-3"
      >
        Next
      </Button>

			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" size="sm" className="h-8 ms-2">
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
					<p className="text-xs text-muted-foreground mt-2">
						Enter a page number between 1 and {totalPages}
					</p>
				</PopoverContent>
			</Popover>
		</div>
	);
}
