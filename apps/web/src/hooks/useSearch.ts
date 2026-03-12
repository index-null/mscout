import { useCallback, useRef, useState } from "react"
import type { AggregatedSearchResponse } from "@/types/api"
import { searchSongs } from "@/lib/api"

export function useSearch() {
  const [data, setData] = useState<AggregatedSearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const search = useCallback(async (song: string, artist: string) => {
    // 取消上一次请求
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setIsLoading(true)
    setError(null)

    try {
      const result = await searchSongs(song, artist, controller.signal)
      setData(result)
    } catch (err) {
      if ((err as Error).name === "AbortError") return
      setError((err as Error).message ?? "Search failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, error, search }
}
