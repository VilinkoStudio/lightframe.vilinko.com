import { component$, useStylesScoped$ } from "@qwik.dev/core";
import type { Signal } from "@qwik.dev/core";
import styles from "./toggle-button.css?inline";

export interface ToggleButtonProps {
  isExpanded: Signal<boolean>;
  expandedText?: string;
  collapsedText?: string;
  class?: string;
}

export const ToggleButton = component$<ToggleButtonProps>(
  ({
    isExpanded,
    expandedText = "收起",
    collapsedText = "展开全部",
    class: className = "",
  }) => {
    useStylesScoped$(styles);

    return (
      <div class={`toggle-container ${className}`}>
        <button
          class="toggle-btn"
          onClick$={() => {
            isExpanded.value = !isExpanded.value;
          }}
        >
          {isExpanded.value ? expandedText : collapsedText}
          <span class={`toggle-icon ${isExpanded.value ? "up" : "down"}`}>
            ▼
          </span>
        </button>
      </div>
    );
  },
);
