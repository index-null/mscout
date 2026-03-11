import { SearchForm } from "@/components/SearchForm"
import { ResultsGrid } from "@/components/ResultsGrid"
import { useSearch } from "@/hooks/useSearch"
import { MusicIcon } from "lucide-react"

export function App() {
  const { data, isLoading, error, search } = useSearch()

  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2">
          <MusicIcon className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">
            Music Online Status Checker
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          输入歌曲名和歌手，一键查询多平台上架状态
        </p>
      </header>

      {/* Search Form */}
      <section className="mx-auto w-full max-w-2xl">
        <SearchForm onSearch={search} isLoading={isLoading} />
      </section>

      {/* Error Message */}
      {error && (
        <div className="mx-auto w-full max-w-2xl rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Results */}
      <section>
        <ResultsGrid data={data} isLoading={isLoading} />
      </section>

      {/* Empty State */}
      {!data && !isLoading && !error && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
          <MusicIcon className="size-12 text-muted-foreground/30" />
          <p className="text-muted-foreground">
            输入歌曲信息开始搜索
          </p>
        </div>
      )}
    </div>
  )
}

export default App
