import { component$, type Signal } from "@qwik.dev/core";

export interface ClockWidgetProps {
  time: Signal<string>;
  dateLabel: Signal<string>;
}

export const ClockWidget = component$<ClockWidgetProps>(
  ({ time, dateLabel }) => {
    const [hours = "--", minutes = "--"] = time.value.split(":");

    return (
      <div class="widget widget-clock">
        <div class="clock-time">
          <span>{hours}</span>
          <span class="clock-colon">:</span>
          <span class="clock-minute" key={minutes} aria-live="off">
            {minutes}
          </span>
        </div>
        <div class="clock-date">{dateLabel.value}</div>
      </div>
    );
  },
);

export interface CalendarWidgetProps {
  today: Signal<Date>;
}

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];

export const CalendarWidget = component$<CalendarWidgetProps>(({ today }) => {
  const date = today.value;
  const year = date.getFullYear();
  const month = date.getMonth();
  // 周一开头的日历，0 表示周一
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: days }, (_, index) => index + 1),
  ];

  return (
    <div class="widget widget-calendar">
      <div class="calendar-head">
        <span class="calendar-month">{month + 1} 月</span>
        <span class="calendar-year">{year}</span>
      </div>
      <div class="calendar-grid">
        {WEEKDAYS.map((day) => (
          <span class="calendar-weekday" key={day}>
            {day}
          </span>
        ))}
        {cells.map((day, index) => (
          <span
            class={`calendar-day ${
              day === date.getDate() ? "is-today" : ""
            }`}
            key={index}
          >
            {day ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
});

export const NoteWidget = component$(() => (
  <div class="widget widget-note">
    <span class="note-label">便签</span>
    <ul class="note-list">
      <li class="is-done">
        <span class="note-check" aria-hidden="true">
          ✓
        </span>
        换一张壁纸
      </li>
      <li>
        <span class="note-check" aria-hidden="true" />
        时钟挪到左上
      </li>
    </ul>
  </div>
));
