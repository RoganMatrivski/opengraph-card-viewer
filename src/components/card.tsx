import { ExternalLink } from "lucide-react";
import { Card as CardUI, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import type { OpenGraphCard } from "../types/opengraph";

interface CardProps {
	card: OpenGraphCard;
}

export function Card({ card }: CardProps) {
	const { title, url, type, description, image } = card;
	const domain = new URL(url).hostname;

	return (
		<CardUI className="overflow-hidden flex flex-col h-full py-0 pb-6">
			<div className="relative h-48 w-full overflow-hidden group">
				{image ? (
					<img
						src={image}
						alt={title}
						className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:blur-sm"
					/>
				) : (
					<div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
						<span>No Image Available</span>
					</div>
				)}
				<div className="absolute inset-0 bg-transparent bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
					<div className="relative w-full h-full flex">
						<a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							className="w-1/2 h-full bg-black/30 hover:bg-black/50 text-white text-sm flex items-center justify-center"
						>
							Visit
						</a>
						<button
							onClick={() => alert("Action triggered!")}
							className="cursor-pointer w-1/2 h-full bg-black/30 hover:bg-black/50 text-white text-sm flex items-center justify-center"
							type="button"
						>
							Action
						</button>
					</div>
				</div>
			</div>

			<CardHeader className="flex flex-col space-y-1.5">
				<div className="flex items-start justify-between">
					<h3 className="font-semibold text-lg line-clamp-2" title={title}>
						{title}
					</h3>
					<Badge variant="outline" className="ml-2 shrink-0">
						{type}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="flex-grow">
				{description && (
					<p className="text-muted-foreground text-sm line-clamp-3 mb-4">
						{description}
					</p>
				)}
			</CardContent>

			<CardFooter className="flex justify-between items-center pt-2">
				<span className="text-xs text-muted-foreground truncate max-w-[70%]">
					{domain}
				</span>
			</CardFooter>
		</CardUI>
	);
}
