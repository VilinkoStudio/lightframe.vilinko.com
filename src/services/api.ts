/**
 * 统一的 API 服务层
 * 提供统一的错误处理、日志记录和请求封装
 */

import type {
  ApiResponse,
  SponsorsData,
  ContributorsApiData,
  RecentContributorsApiData,
} from "~/types";
import { API, MESSAGES } from "~/constants";

/**
 * 通用的 fetch 封装
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit & { controller?: AbortController },
): Promise<T> {
  const { controller, ...fetchOptions } = options || {};
  const url = `${API.BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller?.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API request failed:", url, error);
    throw error;
  }
}

/**
 * 获取赞助者数据
 */
export async function getSponsors(
  controller?: AbortController,
): Promise<SponsorsData> {
  const data = await fetchApi<ApiResponse<ContributorsApiData>>(
    API.ENDPOINTS.SPONSORS,
    { controller },
  );

  if (data?.code !== 200 || !data.data) {
    throw new Error("无法获取赞助者名单_错误的响应");
  }

  // 处理赞助者名单
  const defaultNames: string[] = [];
  const namedSponsors = data.data.sponsors
    .sort()
    .filter((name: string) => {
      if (name.startsWith("爱发电用户_")) {
        defaultNames.push(`@${name}`);
        return false;
      }
      return true;
    })
    .map((name: string) => `@${name}`);

  namedSponsors.reverse();
  namedSponsors.push(...defaultNames);

  return {
    names: namedSponsors,
    lastUpdate: data.data.date,
  };
}

/**
 * 获取最近贡献者列表
 */
export async function getRecentContributors(
  limit: number = 999,
): Promise<string[]> {
  try {
    const data = await fetchApi<ApiResponse<RecentContributorsApiData>>(
      API.ENDPOINTS.CONTRIBUTORS_RECENT,
    );

    if (data?.code === 200 && data.data?.contributors) {
      return data.data.contributors.slice(0, limit);
    }
  } catch (error) {
    console.error("获取最近贡献者列表失败:", error);
  }

  return [MESSAGES.NO_DATA];
}

/**
 * 增加计数器
 */
export async function incrementCounter(id: number = 1): Promise<void> {
  // 只在生产环境域名下进行统计
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "lightframe.vilinko.com"
  ) {
    try {
      await fetch(`${API.BASE_URL}${API.ENDPOINTS.COUNTER_ADD}?id=${id}`);
    } catch {
      // 统计失败静默处理，不影响主要功能
    }
  }
}

export async function trackDownload(): Promise<void> {
  await incrementCounter(1);
}
