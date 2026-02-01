import { component$, type Signal } from "@qwik.dev/core";

export const MeetCard = component$(() => (
  <div class="dashboard-card meet-card">
    <div class="meet-line"></div>
    <div class="meet-text">
      Meet.
      <br />
      Inspire.
      <br />
      Create.
    </div>
  </div>
));

export interface ClockCardProps {
  time: Signal<string>;
}

export const ClockCard = component$<ClockCardProps>(({ time }) => (
  <div class="dashboard-card clock-card">
    <div class="clock-text">{time.value}</div>
  </div>
));
