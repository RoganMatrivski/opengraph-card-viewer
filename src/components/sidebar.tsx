import { X, ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUrls } from "@/context/url-context";
import { ResizeHandle } from "./resize-handle";

interface SidebarProps {
	width: number;
	onWidthChange: (width: number) => void;
}

export function Sidebar({ width, onWidthChange }: SidebarProps) {
	const { urls, removeUrl } = useUrls();

	return (
		<div
			id="sidebar"
			className="border-l bg-muted/40 p-4 overflow-auto h-[calc(100vh-4rem)] relative"
			style={{ width: `${width}px` }}
		>
			<ResizeHandle onResize={onWidthChange} />

			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold">Export List</h2>
				<Button
					variant="outline"
					size="sm"
					disabled={urls.length === 0}
					onClick={() => {
						const urlList = urls.map((item) => item.url).join("\n");
						navigator.clipboard
							.writeText(urlList)
							.then(() => alert("URLs copied to clipboard!"))
							.catch((err) => console.error("Failed to copy: ", err));
					}}
				>
					Copy All
				</Button>
			</div>

			{urls.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-8 text-center">
					<div className="rounded-full bg-muted p-4 mb-3">
						<ListPlus className="h-6 w-6 text-muted-foreground" />
					</div>
					<h3 className="text-sm font-medium mb-1">No URLs added</h3>
					<p className="text-xs text-muted-foreground max-w-[200px]">
						Click "Add to Export" on any card to add URLs to your export list
					</p>
				</div>
			) : (
				<ul className="space-y-2">
					{urls.map((item) => (
						<li
							key={item.url}
							className="flex items-center justify-between gap-2 rounded-md border bg-background p-2"
						>
							<span className="text-sm truncate" title={item.label}>
								{item.label}
							</span>
							<Button
								variant="ghost"
								size="icon"
								className="h-6 w-6 shrink-0"
								onClick={() => removeUrl(item.url)}
							>
								<X className="h-4 w-4" />
								<span className="sr-only">Remove</span>
							</Button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
