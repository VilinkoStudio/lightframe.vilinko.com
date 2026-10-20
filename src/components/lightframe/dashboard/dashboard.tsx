import { component$, useSignal, useVisibleTask$, useStyles$ } from "@qwik.dev/core";
import { LINKS } from "~/constants";
import styles from "./dashboard.css?inline";
import { CalendarWidget, ClockWidget, NoteWidget } from "./components/Widgets";
import { ShapeWidget } from "./components/ShapeWidget";
import { DownloadModal } from "./components/DownloadModal";

const WEEKDAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export default component$(() => {
  useStyles$(styles);

  const time = useSignal("--:--");
  const dateLabel = useSignal("");
  const today = useSignal(new Date());
  const showModal = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    let timer = 0;

    const update = () => {
      const now = new Date();
      const nextTime = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes(),
      ).padStart(2, "0")}`;
      if (time.value !== nextTime) time.value = nextTime;

      const nextDate = `${now.getMonth() + 1} 月 ${now.getDate()} 日 ${
        WEEKDAYS[now.getDay()]
      }`;
      if (dateLabel.value !== nextDate) dateLabel.value = nextDate;

      // 日历只在跨天时重绘
      if (today.value.toDateString() !== now.toDateString()) today.value = now;

      // 对齐到下一分钟，避免无意义的定时刷新
      timer = window.setTimeout(
        update,
        60000 - (now.getSeconds() * 1000 + now.getMilliseconds()),
      );
    };

    update();
    cleanup(() => clearTimeout(timer));
  });

  return (
    <section class="hero" id="download">
      <div class="container hero-inner">
        <div class="hero-copy">
          <h1 class="hero-title enter">
            以轻量的方式，
            <br />
            定义自己的桌面
          </h1>
          <p class="hero-lede enter enter-delay-1">
            时钟、日历、便签和形状组件都能放到桌面上，位置与外观随你安排。完全免费，即开即用。
          </p>
          <div class="hero-actions enter enter-delay-2">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick$={() => {
                showModal.value = true;
              }}
            >
              下载 LightFrame
            </button>
            <a
              class="btn btn-secondary btn-lg"
              href={LINKS.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 源码
            </a>
          </div>
          <p class="hero-facts enter enter-delay-3">
            Windows 7 及以上 · x64 / x86 · 完全免费
          </p>
        </div>

        <div class="desktop enter enter-delay-2">
          <div class="desktop-wallpaper" />
          <div class="desktop-grid">
            <ClockWidget time={time} dateLabel={dateLabel} />
            <CalendarWidget today={today} />
            <NoteWidget />
            <ShapeWidget />
          </div>
        </div>
      </div>

      {showModal.value && <DownloadModal isVisible={showModal} />}
    </section>
  );
});
