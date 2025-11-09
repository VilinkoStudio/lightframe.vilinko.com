/**
 * 可复用的 Toggle Hook
 * 用于管理展开/收起等布尔状态
 * 注意：在 Qwik 中，事件处理程序必须是 QRL，所以这个 Hook 返回的是 Signal
 */

import { useSignal } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

export interface UseToggleReturn {
  value: Signal<boolean>;
}

/**
 * Toggle Hook
 * @param initialValue 初始值，默认为 false
 * @returns 包含状态的对象
 * 
 * 使用示例：
 * const { value } = useToggle(false);
 * <button onClick$={() => value.value = !value.value}>切换</button>
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const value = useSignal(initialValue);
  
  return {
    value,
  };
}