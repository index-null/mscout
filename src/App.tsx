import { SearchForm } from "@/components/SearchForm"
import { ResultsGrid } from "@/components/ResultsGrid"
import { useSearch } from "@/hooks/useSearch"
import { BrandLogo } from "@/components/BrandLogo"
import { PlatformMarquee } from "@/components/PlatformMarquee"
import { ActivityIcon } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export function App() {
  const { data, isLoading, error, search } = useSearch()

  const hasResults = !!data || isLoading

  return (
    <div className="flex min-h-svh flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <BrandLogo size="sm" showTagline />
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
            <ActivityIcon className="size-3" />
            <span>7 Platforms</span>
          </div>
        </div>
      </header>

      {/* Hero / Search */}
      <section
        className={`flex flex-col items-center justify-center px-6 transition-all duration-500 ease-out ${
          hasResults ? "pb-8 pt-10" : "flex-1"
        }`}
      >
        <AnimatePresence mode="wait">
          {!hasResults && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mb-8 flex flex-col items-center gap-6 text-center"
            >
              {/* Brand mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <BrandLogo size="lg" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col gap-2"
              >
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Track music across platforms.
                </h1>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  Search once, check availability on every major
                  <br className="hidden sm:block" /> music service instantly.
                </p>
              </motion.div>

              {/* Platform marquee */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <PlatformMarquee />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full max-w-2xl">
          <SearchForm onSearch={search} isLoading={isLoading} />
        </div>
      </section>

      {/* Error */}
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

      {/* Results */}
      {hasResults && (
        <section className="flex-1 px-6 pb-12">
          <div className="mx-auto max-w-6xl">
            <ResultsGrid data={data} isLoading={isLoading} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border/30 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-center">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
            mscout — Music Scout
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
