import type { QualityInfo } from "@/types/api"

/** 格式化时长（秒 → mm:ss） */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "--:--"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

/** 格式化请求耗时 */
export function formatLatency(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(1)}s`
}

/** 获取最高音质标签 */
export function getQualityLabel(quality?: QualityInfo): string {
  if (!quality) return ""
  if (quality.hires) return "Hi-Res"
  if (quality.lossless) return "Lossless"
  if (quality.high) return "HQ"
  if (quality.standard) return "SQ"
  return ""
}
