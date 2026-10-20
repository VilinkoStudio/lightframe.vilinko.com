import { component$, useStylesScoped$ } from "@qwik.dev/core";
import type { Signal } from "@qwik.dev/core";
import styles from "./toggle-button.css?inline";

export interface ToggleButtonProps {
  isExpanded: Signal<boolean>;
  expandedText?: string;
  collapsedText?: string;
  class?: string;
  align?: "start" | "center";
}

export const ToggleButton = component$<ToggleButtonProps>(
  ({
    isExpanded,
    expandedText = "收起",
    collapsedText = "展开全部",
    class: className = "",
    align = "center",
  }) => {
    useStylesScoped$(styles);

    return (
      <div
        class={`toggle-container ${
          align === "start" ? "align-start" : ""
        } ${className}`}
      >
        <button
          class="toggle-btn"
          onClick$={() => {
            isExpanded.value = !isExpanded.value;
          }}
        >
          {isExpanded.value ? expandedText : collapsedText}
          <span class={`toggle-icon ${isExpanded.value ? "up" : "down"}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    );
  },
);
