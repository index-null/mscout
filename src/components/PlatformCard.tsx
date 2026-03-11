import type { PlatformSearchResult } from "@/types/api"
import { getPlatformDisplay } from "@/lib/platforms"
import { formatDuration, formatLatency, getQualityLabel } from "@/lib/format"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  MusicIcon,
  DiscIcon,
  TimerIcon,
} from "lucide-react"

interface PlatformCardProps {
  platformId: string
  result: PlatformSearchResult
}

function StatusBadge({ status }: { status: PlatformSearchResult["status"] }) {
  switch (status) {
    case "success":
      return (
        <Badge variant="secondary">
          <CheckCircle2Icon data-icon="inline-start" />
          成功
        </Badge>
      )
    case "error":
      return (
        <Badge variant="destructive">
          <XCircleIcon data-icon="inline-start" />
          失败
        </Badge>
      )
    case "timeout":
      return (
        <Badge variant="outline">
          <ClockIcon data-icon="inline-start" />
          超时
        </Badge>
      )
  }
}

export function PlatformCard({ platformId, result }: PlatformCardProps) {
  const display = getPlatformDisplay(platformId)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          {display.logo ? (
            <img
              src={display.logo}
              alt={display.name}
              className="size-8 rounded-md object-contain"
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded-md bg-muted">
              <MusicIcon className="size-4 text-muted-foreground" />
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <CardTitle className="text-sm">{display.name}</CardTitle>
            <CardDescription className="text-xs">
              耗时 {formatLatency(result.duration)}
            </CardDescription>
          </div>
          <StatusBadge status={result.status} />
        </div>
      </CardHeader>

      <CardContent>
        {result.status === "success" && result.data && result.data.length > 0 ? (
          <div className="flex flex-col gap-2">
            {result.data.map((song, idx) => (
              <div key={`${song.id}-${idx}`}>
                {idx > 0 && <Separator className="mb-2" />}
                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-2">
                    <MusicIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                    <span className="text-sm font-medium leading-tight">
                      {song.name}
                    </span>
                    {getQualityLabel(song.quality) && (
                      <Badge variant="outline" className="ml-auto shrink-0 text-xs">
                        {getQualityLabel(song.quality)}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-5.5 text-xs text-muted-foreground">
                    <span>{song.artists.join(" / ")}</span>
                    {song.album && (
                      <span className="flex items-center gap-1">
                        <DiscIcon className="size-3" />
                        <span className="truncate">{song.album}</span>
                      </span>
                    )}
                    {song.duration > 0 && (
                      <span className="flex items-center gap-1">
                        <TimerIcon className="size-3" />
                        {formatDuration(song.duration)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : result.status === "success" && (!result.data || result.data.length === 0) ? (
          <p className="text-sm text-muted-foreground">未找到匹配结果</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {result.error ?? "请求失败"}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
