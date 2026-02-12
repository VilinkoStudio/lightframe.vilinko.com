/**
 * 可复用的 SVG Icon 组件
 * 用于渲染 SVG 图标
 */

import { component$, useStylesScoped$ } from "@qwik.dev/core";
import type { SvgIcon } from "~/types";
import styles from "./icon.css?inline";

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
    width = 42,
    height = 42,
    fill = "currentColor",
    class: className = "",
  }) => {
    useStylesScoped$(styles);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={fill}
        viewBox="0 0 16 16"
        class={className}
      >
        {paths.map((pathData, index) => (
          <path key={index} d={pathData} />
        ))}
      </svg>
    );
  },
);
