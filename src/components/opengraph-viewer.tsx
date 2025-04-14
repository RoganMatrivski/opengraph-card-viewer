"use client"

import { useState } from "react"
import { Navbar } from "./navbar"
import { CardGrid } from "./card-grid"
import { Pagination } from "./pagination"
import type { OpenGraphCard } from "../types/opengraph"

// Sample data for demonstration
const initialCards: OpenGraphCard[] = [
  {
    id: "1",
    title: "Next.js by Vercel - The React Framework",
    url: "https://nextjs.org",
    type: "website",
    description:
      "The React Framework for the Web. Used by some of the world's largest companies, Next.js enables you to create full-stack web applications by extending the latest React features.",
    image: "",
  },
  {
    id: "2",
    title: "React – A JavaScript library for building user interfaces",
    url: "https://react.dev",
    type: "website",
    description:
      "React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.",
    image: "https://react.dev/images/og-home.png",
  },
  {
    id: "3",
    title: "Vercel: Build and deploy the best Web experiences with The Frontend Cloud",
    url: "https://vercel.com",
    type: "website",
    description:
      "Vercel's Frontend Cloud gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized Web.",
    image: "https://assets.vercel.com/image/upload/front/vercel/dps.png",
  },
  {
    id: "4",
    title: "Tailwind CSS - Rapidly build modern websites without ever leaving your HTML",
    url: "https://tailwindcss.com",
    type: "website",
    description:
      "A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.",
    image: "https://tailwindcss.com/api/og",
  },
  {
    id: "5",
    title: "GitHub: Let's build from here",
    url: "https://github.com",
    type: "website",
    description:
      "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories.",
    image: "https://github.githubassets.com/images/modules/site/social-cards/github-social.png",
  },
  {
    id: "6",
    title: "Stack Overflow - Where Developers Learn, Share, & Build Careers",
    url: "https://stackoverflow.com",
    type: "website",
    description:
      "Stack Overflow is the largest, most trusted online community for developers to learn, share their programming knowledge, and build their careers.",
    image: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png",
  },
  {
    id: "7",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    type: "website",
    description:
      "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
    image: "https://developer.mozilla.org/mdn-social-share.png",
  },
  {
    id: "8",
    title: "TypeScript: JavaScript with syntax for types",
    url: "https://www.typescriptlang.org",
    type: "website",
    description:
      "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    image: "https://www.typescriptlang.org/images/branding/og-image.png",
  },
  {
    id: "9",
    title: "Visual Studio Code - Code Editing. Redefined",
    url: "https://code.visualstudioasddsaadsasdasdsdaasdasd.com",
    type: "website",
    description:
      "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.",
    image: "https://code.visualstudio.com/opengraphimg/opengraph-home.png",
  },
]

export function OpenGraphViewer() {
  const [cards, setCards] = useState<OpenGraphCard[]>(initialCards)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchUrl, setSearchUrl] = useState("")
  const cardsPerPage = 4 * 5;

  // Get current cards
  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard)
  const totalPages = Math.ceil(cards.length / cardsPerPage)

  const handleSearch = async (url: string) => {
    // In a real application, this would fetch OpenGraph data from an API
    // For now, we'll just add a placeholder card
    if (url) {
      try {
        // Simulate fetching OpenGraph data
        // In a real app, you would make an API call here
        const newCard: OpenGraphCard = {
          id: `${cards.length + 1}`,
          title: `New page from ${url}`,
          url: url,
          type: "website",
          description: "This is a placeholder for a fetched OpenGraph card.",
          image: "https://via.placeholder.com/1200x600",
        }

        setCards([newCard, ...cards])
        setCurrentPage(1)
        setSearchUrl("")
      } catch (error) {
        console.error("Error fetching OpenGraph data:", error)
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        searchUrl={searchUrl}
        setSearchUrl={setSearchUrl}
        handleSearch={handleSearch}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <CardGrid cards={currentCards} />
      </main>

      <footer className="py-6 border-t">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </footer>
    </div>
  )
}
