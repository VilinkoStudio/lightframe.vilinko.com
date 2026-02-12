/**
 * 应用常量配置
 * 集中管理所有常量值
 */

// API 相关常量
export const API = {
  BASE_URL: "https://api.vilinko.com",
  ENDPOINTS: {
    SPONSORS: "/sponsors/all",
    CONTRIBUTORS_RECENT: "/sponsors/monthly",
    COUNTER_ADD: "/counter/add",
  },
  TIMEOUT: 10000, // 请求超时时间（毫秒）
} as const;

// 下载链接
export const DOWNLOAD = {
  X64: "https://down1.vilinko.com/download/lightframe.zip",
  X86: "https://down1.vilinko.com/download/lightframe_x86.zip",
} as const;

// 外部链接
export const LINKS = {
  MAIN_SITE: "https://www.vilinko.com",
  WALLPAPER: "https://lfs.vilinko.com",
  DOCS: "https://docs.vilinko.com",
  BILIBILI: "https://space.bilibili.com/373454723",
  GITHUB: "https://github.com/EnderMo/LightFrame",
  AFDIAN: "https://afdian.com/@EnderMo",
  TOS: "https://docs.vilinko.com/agreement/tos.html",
  PRIVACY: "https://docs.vilinko.com/agreement/privacy.html",
} as const;

// UI 相关常量
export const UI = {
  RECENT_CONTRIBUTORS_LIMIT: 5,
  DEFAULT_ICON_SIZE: 42,
} as const;

// 消息文本
export const MESSAGES = {
  LOADING: "加载中...",
  LOAD_FAILED: "加载失败",
  NO_DATA: "呜呜呜，还没有～",
  FETCH_ERROR: "无法获取数据",
} as const;

// 应用元数据
export const APP_META = {
  TITLE: "轻框 | LightFrame 2.0",
  SUBTITLE: "以轻量的方式定义自己喜欢的桌面",
  DESCRIPTION:
    "LightFrame - 以轻量的方式定义自己喜欢的桌面。轻量、灵感、沉浸、免费的桌面应用。",
  COPYRIGHT: "© 2025 Vilinko. All rights reserved.",
} as const;
