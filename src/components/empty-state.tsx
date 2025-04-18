"use client";

import { Search, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
	title?: string;
	description?: string;
	action?: () => void;
	actionLabel?: string;
	icon?: "search" | "file";
}

export function EmptyState({
	title = "No results found",
	description = "Try adjusting your search or enter a new URL to fetch.",
	action,
	actionLabel = "Try again",
	icon = "search",
}: EmptyStateProps) {
	const Icon = icon === "search" ? Search : FileSearch;

	return (
		<div className="flex flex-col items-center justify-center py-12 text-center">
			<div className="rounded-full bg-muted p-6 mb-4">
				<Icon className="h-10 w-10 text-muted-foreground" />
			</div>
			<h2 className="text-2xl font-semibold mb-2">{title}</h2>
			<p className="text-muted-foreground max-w-md mb-6">{description}</p>
			{action && <Button onClick={action}>{actionLabel}</Button>}
		</div>
	);
}
