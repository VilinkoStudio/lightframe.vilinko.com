/**
 * 可复用的 ToggleButton 组件
 * 用于展开/收起功能
 */

import { component$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

export interface ToggleButtonProps {
  isExpanded: Signal<boolean>;
  expandedText?: string;
  collapsedText?: string;
  class?: string;
  buttonRef: Signal<Element | undefined>;
}

export const ToggleButton = component$<ToggleButtonProps>(({
  isExpanded,
  expandedText = "收起",
  collapsedText = "展开全部",
  class: className = "",
  buttonRef,
}) => {

  return (
    <div class={`toggle-container ${className}`}>
      <button
        class="toggle-btn"
        onClick$={() => {
          const wasExpanded = isExpanded.value;
          isExpanded.value = !isExpanded.value;

          // 如果是从展开状态收起，滚动到按钮位置
          if (wasExpanded && buttonRef.value) {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  buttonRef.value?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                });
              });
          }
        }}
      >
        {isExpanded.value ? expandedText : collapsedText}
        <span class={`toggle-icon ${isExpanded.value ? 'up' : 'down'}`}>
          ▼
        </span>
      </button>
    </div>
  );
});
