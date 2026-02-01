import { component$, type Signal } from "@qwik.dev/core";

export interface ActionCardProps {
  month: Signal<string>;
  dateStr: Signal<string>;
  showModal: Signal<boolean>;
}

export const ActionCard = component$<ActionCardProps>(
  ({ month, dateStr, showModal }) => (
    <div class="dashboard-card action-card">
      <button class="click-btn" onClick$={() => (showModal.value = true)}>
        <span class="mc-text">下载</span>
      </button>
      <div class="date-row">
        <div class="date-box month-box">
          <span>{month.value}</span>
        </div>
        <div class="date-box day-box">
          <span>{dateStr.value}</span>
        </div>
      </div>
    </div>
  ),
);
