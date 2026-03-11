import { useRef, useState, useEffect, useCallback } from "react"
import type { PlatformSearchResult } from "@/types/api"
import { getPlatformDisplay } from "@/lib/platforms"
import { formatDuration, formatLatency, getQualityLabel } from "@/lib/format"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  MusicIcon,
  DiscIcon,
  TimerIcon,
  ChevronDownIcon,
} from "lucide-react"

interface PlatformCardProps {
  platformId: string
  result: PlatformSearchResult
}

function StatusIndicator({ status }: { status: PlatformSearchResult["status"] }) {
  switch (status) {
    case "success":
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground/20" />
                <span className="relative inline-flex size-2 rounded-full bg-foreground" />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-foreground/70">
                Online
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>查询成功</TooltipContent>
        </Tooltip>
      )
    case "error":
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              <XCircleIcon className="size-3 text-muted-foreground/60" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                Error
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>查询失败</TooltipContent>
        </Tooltip>
      )
    case "timeout":
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              <ClockIcon className="size-3 text-muted-foreground/60" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                Timeout
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>请求超时</TooltipContent>
        </Tooltip>
      )
  }
}

export function PlatformCard({ platformId, result }: PlatformCardProps) {
  const display = getPlatformDisplay(platformId)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showTopFade, setShowTopFade] = useState(false)
  const [showBottomFade, setShowBottomFade] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const hasScroll = scrollHeight > clientHeight + 2
    setShowTopFade(scrollTop > 4)
    setShowBottomFade(hasScroll && scrollTop < scrollHeight - clientHeight - 4)
  }, [])

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    // 使用 ResizeObserver 监听内容变化
    const observer = new ResizeObserver(checkScroll)
    observer.observe(el)
    return () => observer.disconnect()
  }, [checkScroll, result])

  const hasSongs = result.status === "success" && result.data && result.data.length > 0

  return (
    <Card className="flex h-[340px] flex-col overflow-hidden border-border/50 transition-colors duration-200 hover:border-border">
      {/* Card Header — 固定 */}
      <CardHeader className="shrink-0 pb-0">
        <div className="flex items-center gap-3">
          {display.logo ? (
            <img
              src={display.logo}
              alt={display.name}
              className="size-8 rounded-md object-contain"
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded-md bg-secondary">
              <MusicIcon className="size-4 text-muted-foreground" />
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col">
            <CardTitle className="text-sm font-semibold">{display.name}</CardTitle>
            <span className="text-[11px] tabular-nums text-muted-foreground">
              {formatLatency(result.duration)}
            </span>
          </div>
          <StatusIndicator status={result.status} />
        </div>
      </CardHeader>

      {/* Divider */}
      <div className="px-6 py-3">
        <Separator className="opacity-50" />
      </div>

      {/* Card Content — 可滚动区域 */}
      <CardContent className="relative flex min-h-0 flex-1 flex-col pt-0">
        {hasSongs ? (
          <>
            {/* 顶部渐变遮罩 */}
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-card to-transparent transition-opacity duration-300 ${
                showTopFade ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* 可滚动内容 */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="scrollbar-none flex-1 overflow-y-auto pr-1"
            >
              <div className="flex flex-col gap-3">
                {result.data!.map((song, idx) => (
                  <div key={`${song.id}-${idx}`}>
                    {idx > 0 && <Separator className="mb-3 opacity-30" />}
                    <div className="flex flex-col gap-1.5">
                      {/* 歌名 + 音质 */}
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-secondary text-[10px] font-medium tabular-nums text-muted-foreground">
                          {idx + 1}
                        </span>
                        <span className="flex-1 text-sm font-medium leading-snug">
                          {song.name}
                        </span>
                        {getQualityLabel(song.quality) && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="outline"
                                className="shrink-0 border-border/50 px-1.5 py-0 text-[10px] font-normal"
                              >
                                {getQualityLabel(song.quality)}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>最高可用音质</TooltipContent>
                          </Tooltip>
                        )}
                      </div>

                      {/* 歌手 / 专辑 / 时长 */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-7 text-[11px] text-muted-foreground">
                        <span>{song.artists.join(" / ")}</span>
                        {song.album && (
                          <span className="flex items-center gap-1">
                            <DiscIcon className="size-2.5" />
                            <span className="max-w-[120px] truncate">{song.album}</span>
                          </span>
                        )}
                        {song.duration > 0 && (
                          <span className="flex items-center gap-1 tabular-nums">
                            <TimerIcon className="size-2.5" />
                            {formatDuration(song.duration)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 底部渐变遮罩 + 箭头引导 */}
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end pb-1 transition-opacity duration-300 ${
                showBottomFade ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
              <ChevronDownIcon className="relative z-10 size-4 animate-bounce text-muted-foreground/50" />
            </div>
          </>
        ) : result.status === "success" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <CheckCircle2Icon className="size-5 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">未找到匹配结果</p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <XCircleIcon className="size-5 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">
              {result.error ?? "请求失败"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
