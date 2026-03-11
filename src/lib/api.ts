import type {
  AggregatedSearchResponse,
  PlatformInfoResponse,
} from "@/types/api"

const API_BASE = "/api"

/** 搜索歌曲 — POST /api/search */
export async function searchSongs(
  song: string,
  artist: string,
  signal?: AbortSignal
): Promise<AggregatedSearchResponse> {
  const res = await fetch(`${API_BASE}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ song, artist }),
    signal,
  })

  if (!res.ok) {
    throw new Error(`搜索失败: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

/** 获取平台列表 — GET /api/platforms */
export async function getPlatforms(): Promise<PlatformInfoResponse> {
  const res = await fetch(`${API_BASE}/platforms`)

  if (!res.ok) {
    throw new Error(`获取平台列表失败: ${res.status} ${res.statusText}`)
  }

  return res.json()
}
