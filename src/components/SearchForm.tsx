import { useCallback, useRef } from "react"
import { SearchIcon, Loader2Icon } from "lucide-react"
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <Input
          ref={songRef}
          type="text"
          placeholder="歌曲名"
          required
          disabled={isLoading}
          className="h-11 bg-secondary/50 pl-4 text-sm placeholder:text-muted-foreground/60 focus-visible:bg-secondary/80"
          autoComplete="off"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-muted-foreground/40">
          必填
        </span>
      </div>
      <div className="flex-1">
        <Input
          ref={artistRef}
          type="text"
          placeholder="歌手"
          disabled={isLoading}
          className="h-11 bg-secondary/50 pl-4 text-sm placeholder:text-muted-foreground/60 focus-visible:bg-secondary/80"
          autoComplete="off"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        size="lg"
        className="h-11 min-w-[100px] cursor-pointer gap-2 px-6 text-sm font-medium transition-all duration-200"
      >
        {isLoading ? (
          <>
            <Loader2Icon className="size-4 animate-spin" />
            <span>查询中</span>
          </>
        ) : (
          <>
            <SearchIcon className="size-4" />
            <span>查询</span>
          </>
        )}
      </Button>
    </form>
  )
}
