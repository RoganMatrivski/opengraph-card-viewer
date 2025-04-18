// components/Pagination.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Search } from "lucide-react";

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
	/** Called whenever the user “navigates” to another page */
	onPageChange: (page: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
}: PaginationProps) {
	const [pageInput, setPageInput] = useState("");
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const [searchParams] = useSearchParams();

	const getPageNav = (pageNum: number) => {
		const allParams = Object.fromEntries(searchParams.entries());
		allParams.page = pageNum.toString();
		return `?${new URLSearchParams(allParams).toString()}`;
	};

	// Show a limited number of pages with ellipsis
	const getVisiblePages = () => {
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}
		if (currentPage <= 3) {
			return [1, 2, 3, 4, totalPages];
		}
		if (currentPage >= totalPages - 2) {
			return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
		}
		return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
	};

	const visiblePages = getVisiblePages();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const handleGoToPage = () => {
		const pageNumber = Number.parseInt(pageInput, 10);
		if (
			!Number.isNaN(pageNumber) &&
			pageNumber >= 1 &&
			pageNumber <= totalPages
		) {
			setIsPopoverOpen(false);
			setPageInput("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleGoToPage();
		}
	};

	return (
		<div className="flex items-center justify-center gap-2 py-6">
			{/* Prev */}
			<Link
				to={getPageNav(currentPage - 1)}
				className={`h-8 px-3 flex items-center justify-center rounded
          ${
						currentPage === 1
							? "pointer-events-none opacity-50"
							: "hover:bg-gray-100"
					}
        `}
			>
				Prev
			</Link>

			{/* Page numbers */}
			{visiblePages.map((page, i) => (
				<React.Fragment key={page}>
					{/* ellipsis */}
					{i > 0 && visiblePages[i - 1] !== page - 1 && (
						<span className="h-8 flex items-center px-2">…</span>
					)}

					<Link
						to={getPageNav(page)}
						className={`h-8 w-8 flex items-center justify-center rounded
              ${
								page === currentPage
									? "bg-primary text-primary-foreground"
									: "hover:bg-gray-100"
							}
            `}
					>
						{page}
					</Link>
				</React.Fragment>
			))}

			{/* Next */}
			<Link
				to={getPageNav(currentPage + 1)}
				className={`h-8 px-3 flex items-center justify-center rounded
          ${
						currentPage === totalPages
							? "pointer-events-none opacity-50"
							: "hover:bg-gray-100"
					}
        `}
			>
				Next
			</Link>

			{/* Go to… popover */}
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" size="sm" className="h-8 ms-2">
						Go to…
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-56 p-2">
					<div className="flex gap-2">
						<Input
							type="number"
							min={1}
							max={totalPages}
							placeholder={`1–${totalPages}`}
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
