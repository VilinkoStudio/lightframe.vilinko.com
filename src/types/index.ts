/**
 * 统一类型定义
 */

// 导航链接类型
export interface NavigationLink {
  text: string;
  href: string;
}

// 头部配置类型
export interface HeaderConfig {
  operators: NavigationLink[];
}

// SVG 图标类型
export type SvgIcon = string[];

// 介绍视图项类型
export interface IntroView {
  icon: SvgIcon;
  word: string;
  intro: string;
}

// 介绍配置类型
export interface IntroConfig {
  views: IntroView[];
}

// 贡献组类型
export interface ContributionGroup {
  title: string;
  explain: string;
  link: NavigationLink;
  names: string[];
}

// 更新日志项类型
export interface LogItem {
  version: string;
  date: string;
  title: string;
  items: string[];
}

// API 响应基础类型
export interface ApiResponse<T = any> {
  code: number;
  message?: string;
  data?: T;
}

// 赞助者数据类型
export interface SponsorsData {
  names: string[];
  lastUpdate: string;
}

// 贡献者 API 响应类型
export interface ContributorsApiData {
  sponsors: string[];
  date: string;
}

// 最近贡献者 API 响应类型
export interface RecentContributorsApiData {
  contributors: string[];
}