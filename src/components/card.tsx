import { PlusCircle, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useUrls } from "@/context/url-context";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";

interface OpenGraphData {
	title: string;
	url: string;
	type: string;
	description?: string;
	image?: string;
}

export function OpenGraphCard({ data }: { data: OpenGraphData }) {
	const { addUrl, hasUrl, removeUrl } = useUrls();
	const isAdded = hasUrl(data.url);
	const hostUrl = new URL(data.url).host;
	const [isLoading, setIsLoading] = useState(true);

	const handleToggleExport = () => {
		if (isAdded) {
			removeUrl(data.url);
		} else {
			addUrl(data.url, data.title);
			toast("URL Added", {
				description: `"${data.title}" has been added to your export list.`,
				action: {
					label: "Undo",
					onClick: () => removeUrl(data.url),
				},
			});
		}
	};

	return (
		<Card className="overflow-hidden flex flex-col">
			<a
				href={data.url}
				target="_blank"
				rel="noopener noreferrer"
				className="hover:underline"
			>
				{data.image ? (
					<div className="aspect-video w-full overflow-hidden relative">
						{isLoading && (
							<Skeleton className="absolute inset-0 h-full w-full rounded-none flex items-center justify-center">
								<Spinner />
							</Skeleton>
						)}
						<img
							src={data.image || "/placeholder.svg"}
							alt={data.title}
							className={`h-full w-full object-cover ${isLoading ? "invisible" : "visible"}`}
							onLoad={() => setIsLoading(false)}
						/>
					</div>
				) : (
					<div className="aspect-video w-full bg-muted flex items-center justify-center">
						<span className="text text font-medium px-4 text-center line-clamp-2">
							{data.title || hostUrl}
						</span>
					</div>
				)}
			</a>
			<CardHeader>
				<CardTitle className="line-clamp-2">{data.title}</CardTitle>
				<div className="text-xs text-muted-foreground">{hostUrl}</div>
			</CardHeader>
			<CardContent className="flex-grow">
				{data.description && (
					<p className="text-sm text-muted-foreground line-clamp-3">
						{data.description}
					</p>
				)}
				<div className="mt-2 text-xs text-muted-foreground break-words">
					<a
						href={data.url}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline"
					>
						{data.url}
					</a>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-2 pt-2">
				<Button
					variant={isAdded ? "destructive" : "outline"}
					size="sm"
					className="w-full"
					onClick={handleToggleExport}
				>
					{isAdded ? (
						<>
							<Trash2 className="h-4 w-4 mr-2" />
							Remove from Export
						</>
					) : (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add to Export
						</>
					)}
				</Button>
				<a
					href={data.url}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/90 w-full"
				>
					<ExternalLink className="h-4 w-4 mr-2" />
					Visit
				</a>
			</CardFooter>
		</Card>
	);
}
