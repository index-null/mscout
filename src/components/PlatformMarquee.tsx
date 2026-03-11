import { PLATFORM_MAP } from "@/lib/platforms"

/** 获取有 logo 的平台列表 */
const platforms = Object.values(PLATFORM_MAP).filter((p) => p.logo)

export function PlatformMarquee() {
  // 复制两份实现无缝循环
  const items = [...platforms, ...platforms]

  return (
    <div className="relative w-full max-w-lg overflow-hidden py-4">
      {/* 左侧渐隐遮罩 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      {/* 右侧渐隐遮罩 */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      {/* 滚动轨道 */}
      <div className="marquee-track flex w-max items-center gap-10">
        {items.map((platform, idx) => (
          <div
            key={`${platform.id}-${idx}`}
            className="flex shrink-0 items-center gap-2.5 opacity-40 transition-opacity duration-300 hover:opacity-80"
          >
            <img
              src={platform.logo}
              alt={platform.name}
              className="size-6 object-contain grayscale"
              loading="lazy"
            />
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
              {platform.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
