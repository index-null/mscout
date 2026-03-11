import { useCallback, useRef } from "react"
import { SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  onSearch: (song: string, artist: string) => void
  isLoading: boolean
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const songRef = useRef<HTMLInputElement>(null)
  const artistRef = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const song = songRef.current?.value.trim() ?? ""
      const artist = artistRef.current?.value.trim() ?? ""
      if (!song) {
        songRef.current?.focus()
        return
      }
      onSearch(song, artist)
    },
    [onSearch]
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        ref={songRef}
        type="text"
        placeholder="歌曲名（必填）"
        required
        disabled={isLoading}
        className="flex-1"
        autoComplete="off"
      />
      <Input
        ref={artistRef}
        type="text"
        placeholder="歌手（可选）"
        disabled={isLoading}
        className="flex-1"
        autoComplete="off"
      />
      <Button type="submit" disabled={isLoading} size="lg">
        {isLoading ? (
          <>
            <span className="animate-spin">
              <SearchIcon data-icon="inline-start" />
            </span>
            搜索中...
          </>
        ) : (
          <>
            <SearchIcon data-icon="inline-start" />
            搜索
          </>
        )}
      </Button>
    </form>
  )
}
