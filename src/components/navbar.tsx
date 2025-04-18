import type React from "react";

import { useState } from "react";
import { Download, PanelRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "./pagination";

interface NavbarProps {
	onSearch: (query: string) => void;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	toggleSidebar: () => void;
	isSidebarOpen: boolean;
}

export function Navbar({
	onSearch,
	currentPage,
	totalPages,
	onPageChange,
	toggleSidebar,
	isSidebarOpen,
}: NavbarProps) {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(searchQuery);
	};

	return (
		<nav className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
			<div className="flex items-center gap-4 md:gap-6">
				<a href="/" className="flex items-center gap-2 font-semibold">
					<div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
						OG
					</div>
					<span>OpenGraph Viewer</span>
				</a>
				<form
					onSubmit={handleSubmit}
					className="flex w-full max-w-sm items-center gap-2"
				>
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
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={onPageChange}
					/>
				</div>

				<Button
					variant="outline"
					size="icon"
					onClick={toggleSidebar}
					className="ml-2"
					aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
				>
					<PanelRight
						className={`h-4 w-4 transition-transform ${isSidebarOpen ? "rotate-180" : ""}`}
					/>
				</Button>
			</div>
		</nav>
	);
}
