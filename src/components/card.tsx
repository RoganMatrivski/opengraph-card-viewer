import { PlusCircle, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUrls } from "@/context/url-context"

interface OpenGraphData {
  title: string
  url: string
  type: string
  description?: string
  image?: string
}

export function OpenGraphCard({ data }: { data: OpenGraphData }) {
  const { addUrl, hasUrl } = useUrls()
  const isAdded = hasUrl(data.url)

  const handleAddToSidebar = () => {
    addUrl(data.url, data.title)
  }

  return (
    <Card className="overflow-hidden flex flex-col">
      {data.image && (
        <div className="aspect-video w-full overflow-hidden">
          <img src={data.image || "/placeholder.svg"} alt={data.title} className="h-full w-full object-cover" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{data.title}</CardTitle>
        <div className="text-xs text-muted-foreground">Type: {data.type}</div>
      </CardHeader>
      <CardContent className="flex-grow">
        {data.description && <p className="text-sm text-muted-foreground line-clamp-3">{data.description}</p>}
        <div className="mt-2 text-xs text-muted-foreground truncate">
          <a href={data.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {data.url}
          </a>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-2">
        <Button
          variant={isAdded ? "secondary" : "outline"}
          size="sm"
          className="w-full"
          onClick={handleAddToSidebar}
          disabled={isAdded}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added
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
  )
}

