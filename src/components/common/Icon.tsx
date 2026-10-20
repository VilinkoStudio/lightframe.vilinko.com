/**
 * 可复用的 SVG Icon 组件
 * 用于渲染 SVG 图标
 */

import { component$ } from "@qwik.dev/core";
import type { SvgIcon } from "~/types";

export interface IconProps {
  paths: SvgIcon;
  width?: number;
  height?: number;
  fill?: string;
  class?: string;
}

export const Icon = component$<IconProps>(
  ({
    paths,
    width = 20,
    height = 20,
    fill = "currentColor",
    class: className = "",
  }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 16 16"
      class={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((pathData, index) => (
        <path key={index} d={pathData} />
      ))}
    </svg>
  ),
);
