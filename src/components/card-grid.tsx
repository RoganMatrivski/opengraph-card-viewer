// import { Card } from "./card"
import type { IOpenGraphCard } from "../types/opengraph"

interface CardGridProps {
  cards: IOpenGraphCard[]
}

export function CardGrid({ cards }: CardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-bold text-center">No cards to display</h2>
        <p className="text-muted-foreground text-center mt-2">Enter a URL in the search box to fetch OpenGraph data</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))} */}
    </div>
  )
}
