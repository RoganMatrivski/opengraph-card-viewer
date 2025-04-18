"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type UrlItem = {
	url: string;
	label: string;
};

interface UrlContextType {
	urls: UrlItem[];
	addUrl: (url: string, label: string) => void;
	removeUrl: (url: string) => void;
	hasUrl: (url: string) => boolean;
}

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export function UrlProvider({ children }: { children: ReactNode }) {
	const [urls, setUrls] = useState<UrlItem[]>([]);

	const addUrl = (url: string, label: string) => {
		if (!urls.some((item) => item.url === url)) {
			setUrls((prev) => [...prev, { url, label }]);
		}
	};

	const removeUrl = (url: string) => {
		setUrls((prev) => prev.filter((item) => item.url !== url));
	};

	const hasUrl = (url: string) => {
		return urls.some((item) => item.url === url);
	};

	return (
		<UrlContext.Provider value={{ urls, addUrl, removeUrl, hasUrl }}>
			{children}
		</UrlContext.Provider>
	);
}

export function useUrls() {
	const context = useContext(UrlContext);
	if (context === undefined) {
		throw new Error("useUrls must be used within a UrlProvider");
	}
	return context;
}
