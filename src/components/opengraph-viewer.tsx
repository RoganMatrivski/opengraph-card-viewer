"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { OpenGraphCard } from "@/components/card";
import { Pagination } from "@/components/pagination";
import { Sidebar } from "@/components/sidebar";
import { UrlProvider } from "@/context/url-context";
import { EmptyState } from "@/components/empty-state";
import type { IOpenGraphCard } from "@/types/opengraph";

export function OpenGraphViewer() {
	// const [searchQuery, setSearchQuery] = useState("")
	const [currentData, setCurrentData] = useState<IOpenGraphCard[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [sidebarWidth, setSidebarWidth] = useState(256); // Default width of 256px (16rem)
	const [isLoading, setIsLoading] = useState(false);

	const itemsPerPage = 8;
	const totalPages = Math.ceil(currentData.length / itemsPerPage);

	// const currentData = allSampleData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

	const handleSearch = (query: string) => {
		setIsLoading(true);

		fetch(query)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setCurrentData(
					data.slice(
						(currentPage - 1) * itemsPerPage,
						currentPage * itemsPerPage,
					),
				);
			})
			.catch((error) => {
				console.error("There was a problem with the fetch operation:", error);
				setCurrentData([]); // Clear data on error
			})
			.finally(() => setIsLoading(false));
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<UrlProvider>
			<div className="flex min-h-screen flex-col">
				<Navbar
					onSearch={handleSearch}
					currentPage={currentPage}
					totalPages={Math.max(1, totalPages)}
					onPageChange={handlePageChange}
					toggleSidebar={toggleSidebar}
					isSidebarOpen={isSidebarOpen}
				/>
				<div className="flex flex-1 relative">
					{/* Overlay to close sidebar when clicked */}
					{isSidebarOpen && (
						<button
							className="fixed inset-0 bg-black/20 z-10"
							onClick={() => setIsSidebarOpen(false)}
							onKeyDown={(e) => {
								if (e.key === "b" || e.key === "B") {
									setIsSidebarOpen(false);
								}
							}}
							aria-label="Close sidebar"
							type="button"
						/>
					)}

					<main
						className="flex-1 p-4 md:p-6 transition-all duration-300 relative z-0"
						style={{ marginRight: isSidebarOpen ? `${sidebarWidth}px` : 0 }}
					>
						{isLoading ? (
							<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
								{Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div
									  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										className="h-80 rounded-lg bg-muted animate-pulse"
									/>
								))}
							</div>
						) : currentData.length === 0 ? (
							<EmptyState
								title="No results found"
								description="Try adjusting your search or enter a new URL to fetch OpenGraph data."
								action={() => handleSearch("")}
								actionLabel="Clear search"
								icon="search"
							/>
						) : (
							<>
								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									{currentData.map((item, index) => (
										<OpenGraphCard key={`${item.url}-${index}`} data={item} />
									))}
								</div>
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={handlePageChange}
								/>
							</>
						)}
					</main>
					<div
						className={`fixed right-0 top-16 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out z-20 ${
							isSidebarOpen ? "translate-x-0" : "translate-x-full"
						}`}
					>
						<Sidebar width={sidebarWidth} onWidthChange={setSidebarWidth} />
					</div>
				</div>
			</div>
		</UrlProvider>
	);
}
