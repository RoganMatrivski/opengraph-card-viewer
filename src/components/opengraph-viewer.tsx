"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/navbar";
import { OpenGraphCard } from "@/components/card";
import { Pagination } from "@/components/pagination";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { UrlProvider } from "@/context/url-context";
import { EmptyState } from "@/components/empty-state";
import type { IOpenGraphCard } from "@/types/opengraph";
import { useSearchParams } from "react-router";

export function OpenGraphViewer() {
	const [allData, setAllData] = useState<IOpenGraphCard[]>([]);
	// const [currentData, setCurrentData] = useState<IOpenGraphCard[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [sidebarWidth, setSidebarWidth] = useState(256); // Default width of 256px (16rem)

	// ─── Sync currentPage with URL ───────────────────────────────
	const [searchParams, setSearchParams] = useSearchParams();
	const qParam = searchParams.get("q") || ""; // the fetch URL
	const page = Number.parseInt(searchParams.get("page") ?? "1", 10) || 1;
	const [lastQuery, setLastQuery] = useState(""); // to avoid refetching same qParam

	console.log(`Page changed to ${page}`);

	const itemsPerPage = 16;
	const totalPages = Math.ceil(allData.length / itemsPerPage);

	// useEffect(() => {
	//   const start = (page - 1) * itemsPerPage;
	//   setCurrentData(allData.slice(start, start + itemsPerPage));
	// }, [allData, page]);

	const handlePageChange = (newPage: number) => {
		searchParams.set("page", newPage.toString());
		setSearchParams(searchParams);
	};

	useEffect(() => {
		if (!qParam || qParam === lastQuery) return;

		setIsLoading(true);
		fetch(qParam)
			.then((res) => {
				if (!res.ok) throw new Error();
				return res.json();
			})
			.then((data: IOpenGraphCard[]) => {
				setAllData(data);
				setLastQuery(qParam);

				// if there was no `page` in the URL, make sure it defaults to 1
				if (!searchParams.has("page")) {
					searchParams.set("page", "1");
					setSearchParams(searchParams, { replace: true });
				}
			})
			.catch(() => {
				setAllData([]);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [qParam, lastQuery, setSearchParams, searchParams, ]);

	// 4️⃣ Derived slice of data for the current page
	const currentData = useMemo(() => {
		const start = (page - 1) * itemsPerPage;
		return allData.slice(start, start + itemsPerPage);
	}, [allData, page]);

	// ─── Fetch & reset to page 1 in URL ───────────────────────────
	const handleSearch = (url: string) => {
		// Reset to page 1 and include the new q in the URL
		setSearchParams({ q: url, page: "1" });
		// the useEffect above will pick up qParam change and do the fetch
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<UrlProvider>
			<div className="flex min-h-screen flex-col">
				<Navbar
					onSearch={handleSearch}
					currentPage={page}
					totalPages={totalPages}
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
									currentPage={page}
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
				<Toaster position="bottom-right" richColors />
			</div>
		</UrlProvider>
	);
}
