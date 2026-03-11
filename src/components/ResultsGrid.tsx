import type { AggregatedSearchResponse } from "@/types/api"
import { PlatformCard } from "@/components/PlatformCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ResultsGridProps {
  data: AggregatedSearchResponse | null
  isLoading: boolean
}

function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-md" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-14" />
          </div>
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ResultsGrid({ data, isLoading }: ResultsGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (!data) return null

  const entries = Object.entries(data.results)

  // 按状态排序：success > error > timeout
  const sorted = entries.sort(([, a], [, b]) => {
    const order = { success: 0, error: 1, timeout: 2 }
    return order[a.status] - order[b.status]
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>
          搜索 &quot;{data.query.song}
          {data.query.artist ? ` - ${data.query.artist}` : ""}&quot; 的结果
        </span>
        <span>·</span>
        <span>{entries.length} 个平台</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map(([platformId, result]) => (
          <PlatformCard
            key={platformId}
            platformId={platformId}
            result={result}
          />
        ))}
      </div>
    </div>
  )
}
