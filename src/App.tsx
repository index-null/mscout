import { SearchForm } from "@/components/SearchForm"
import { ResultsGrid } from "@/components/ResultsGrid"
import { useSearch } from "@/hooks/useSearch"
import { Music2Icon, ActivityIcon } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export function App() {
  const { data, isLoading, error, search } = useSearch()

  const hasResults = !!data || isLoading

  return (
    <div className="flex min-h-svh flex-col">
      {/* Header — 紧凑型顶部栏 */}
      <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-foreground">
              <Music2Icon className="size-4 text-background" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                Music Status
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Multi-Platform Checker
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            <ActivityIcon className="size-3" />
            <span>7 Platforms</span>
          </div>
        </div>
      </header>

      {/* Hero / 搜索区 */}
      <section
        className={`flex flex-col items-center justify-center px-6 transition-all duration-500 ease-out ${
          hasResults ? "pb-8 pt-10" : "flex-1"
        }`}
      >
        <AnimatePresence mode="wait">
          {!hasResults && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-10 flex flex-col items-center gap-3 text-center"
            >
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                音乐上架状态查询
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                输入歌曲名称与歌手，一键查询七大平台上架状态。
                <br />
                支持 QQ 音乐、网易云、Apple Music 等主流平台。
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full max-w-2xl">
          <SearchForm onSearch={search} isLoading={isLoading} />
        </div>
      </section>

      {/* 错误提示 */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden px-6"
          >
            <div className="mx-auto max-w-2xl rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 结果区域 */}
      {hasResults && (
        <section className="flex-1 px-6 pb-12">
          <div className="mx-auto max-w-6xl">
            <ResultsGrid data={data} isLoading={isLoading} />
          </div>
        </section>
      )}

      {/* 底部留白 */}
      <footer className="border-t border-border/30 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-center">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
            Music Online Status Checker
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
