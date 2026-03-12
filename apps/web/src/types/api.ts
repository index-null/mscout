/**
 * API 响应类型定义
 *
 * 与后端 server/src/platforms/types.ts 中的同名类型保持结构一致。
 * 前端独立维护，部署时不依赖后端目录。
 *
 * 同步策略：后端类型极少变动（接口已稳定），如需同步可运行：
 *   diff ../server/src/platforms/types.ts src/types/api.ts
 */

/** 搜索查询参数 */
export interface SearchQuery {
  song: string
  artist: string
}

/** 音质信息 */
export interface QualityInfo {
  standard?: boolean
  high?: boolean
  lossless?: boolean
  hires?: boolean
}

/** 标准化歌曲信息 */
export interface SongInfo {
  id: string | number
  name: string
  artists: string[]
  album: string
  /** 时长（秒） */
  duration: number
  cover?: string
  previewUrl?: string
  quality?: QualityInfo
  extra?: Record<string, unknown>
}

/** 平台 ID */
export type PlatformId = string

/** 单个平台的搜索结果 */
export interface PlatformSearchResult {
  platform: PlatformId
  status: "success" | "error" | "timeout"
  /** 请求耗时（ms） */
  duration: number
  data?: SongInfo[]
  error?: string
}

/** 聚合搜索响应 — POST /api/search */
export interface AggregatedSearchResponse {
  query: SearchQuery
  timestamp: number
  results: Record<PlatformId, PlatformSearchResult>
}

/** 平台信息 — GET /api/platforms */
export interface PlatformInfoResponse {
  platforms: Array<{ id: PlatformId; name: string; enabled: boolean }>
}
