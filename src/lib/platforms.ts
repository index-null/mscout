import qqLogo from "@/assets/logo/qq-music.svg"
import kugouLogo from "@/assets/logo/kugou.svg"
import miguLogo from "@/assets/logo/migu.svg"
import appleLogo from "@/assets/logo/apple-music.svg"
import neteaseLogo from "@/assets/logo/netease.svg"
import jooxLogo from "@/assets/logo/joox.svg"

/** 平台 UI 显示配置（前端独有） */
export interface PlatformDisplayConfig {
  id: string
  name: string
  logo: string
  color: string
}

/**
 * 平台显示配置映射
 * color 仅用于状态标识，不用于大面积着色
 */
export const PLATFORM_MAP: Record<string, PlatformDisplayConfig> = {
  qq: {
    id: "qq",
    name: "QQ 音乐",
    logo: qqLogo,
    color: "hsl(145, 63%, 42%)",
  },
  kugou: {
    id: "kugou",
    name: "酷狗音乐",
    logo: kugouLogo,
    color: "hsl(210, 80%, 50%)",
  },
  migu: {
    id: "migu",
    name: "咪咕音乐",
    logo: miguLogo,
    color: "hsl(340, 75%, 55%)",
  },
  itunes: {
    id: "itunes",
    name: "Apple Music",
    logo: appleLogo,
    color: "hsl(350, 80%, 55%)",
  },
  netease: {
    id: "netease",
    name: "网易云音乐",
    logo: neteaseLogo,
    color: "hsl(0, 70%, 50%)",
  },
  gdstudio: {
    id: "gdstudio",
    name: "GDStudio",
    logo: "",
    color: "hsl(260, 60%, 55%)",
  },
  joox: {
    id: "joox",
    name: "JOOX",
    logo: jooxLogo,
    color: "hsl(145, 70%, 40%)",
  },
}

/** 根据平台 ID 获取显示配置，未知平台返回默认值 */
export function getPlatformDisplay(platformId: string): PlatformDisplayConfig {
  return (
    PLATFORM_MAP[platformId] ?? {
      id: platformId,
      name: platformId.toUpperCase(),
      logo: "",
      color: "hsl(0, 0%, 50%)",
    }
  )
}
