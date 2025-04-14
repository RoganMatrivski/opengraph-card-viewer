"use client";

import type React from "react";
import { useState } from "react";
import { Search, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Pagination } from "./pagination";
import { SidebarTrigger } from "./ui/sidebar";

interface NavbarProps {
  searchUrl: string;
  setSearchUrl: (url: string) => void;
  handleSearch: (url: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Navbar({
  searchUrl,
  setSearchUrl,
  handleSearch,
  currentPage,
  totalPages,
  onPageChange,
}: NavbarProps) {
  const [darkMode, setDarkMode] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchUrl);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <a href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
                <span className="text-primary-foreground font-bold text-xl">
                  OG
                </span>
              </div>
              <span className="hidden md:inline-block font-bold text-xl">
                OpenGraph Viewer
              </span>
            </a>

            <form
              onSubmit={handleSubmit}
              className="flex-1 flex items-center gap-2 max-w-md"
            >
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter URL to fetch OpenGraph data"
                  className="pl-8"
                  value={searchUrl}
                  onChange={(e) => setSearchUrl(e.target.value)}
                />
              </div>
              <Button type="submit" className="cursor-pointer">
                Submit
              </Button>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={toggleDarkMode}
              className="cursor-pointer p-2 rounded-full"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-700" />
              ) : (
                <Moon className="h-5 w-5 text-white" />
              )}
            </Button>

            <div className="hidden md:block">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                compact={true}
              />
            </div>

            <SidebarTrigger />
          </div>
        </div>
      </div>
    </header>
  );
}
