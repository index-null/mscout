import type { AggregatedSearchResponse } from "@/types/api"
import { PlatformCard } from "@/components/PlatformCard"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"

interface ResultsGridProps {
  data: AggregatedSearchResponse | null
  isLoading: boolean
}

function ShimmerBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-shimmer rounded bg-gradient-to-r from-secondary via-secondary/40 to-secondary ${className}`}
    />
  )
}

function SkeletonCard() {
  return (
    <Card className="flex h-[340px] flex-col border-border/50">
      <CardHeader className="shrink-0 pb-0">
        <div className="flex items-center gap-3">
          <ShimmerBlock className="size-8 rounded-md" />
          <div className="flex flex-1 flex-col gap-2">
            <ShimmerBlock className="h-3.5 w-20" />
            <ShimmerBlock className="h-2.5 w-12" />
          </div>
          <ShimmerBlock className="h-4 w-14 rounded-full" />
        </div>
      </CardHeader>
      <div className="px-6 py-3">
        <ShimmerBlock className="h-px w-full" />
      </div>
      <CardContent className="flex flex-1 flex-col gap-4 pt-0">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <ShimmerBlock className="size-5 rounded" />
              <ShimmerBlock className="h-3.5 flex-1" />
            </div>
            <div className="flex items-center gap-3 pl-7">
              <ShimmerBlock className="h-2.5 w-16" />
              <ShimmerBlock className="h-2.5 w-20" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

export function ResultsGrid({ data, isLoading }: ResultsGridProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {/* 搜索中摘要 */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground/60">
            Searching across platforms
          </span>
          <div className="h-px flex-1 bg-border/50" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
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

  const successCount = entries.filter(([, r]) => r.status === "success").length

  return (
    <div className="flex flex-col gap-6">
      {/* 搜索摘要 */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border/50" />
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground/60">
          <span>
            &ldquo;{data.query.song}
            {data.query.artist ? ` — ${data.query.artist}` : ""}&rdquo;
          </span>
          <span className="text-border">|</span>
          <span>
            {successCount}/{entries.length} platforms
          </span>
        </div>
        <div className="h-px flex-1 bg-border/50" />
      </div>

      {/* 结果网格 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {sorted.map(([platformId, result]) => (
          <motion.div key={platformId} variants={itemVariants}>
            <PlatformCard platformId={platformId} result={result} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
