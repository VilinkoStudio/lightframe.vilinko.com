import { component$, useStylesScoped$, $ } from "@qwik.dev/core";
import { introConfig } from "~/config";
import { Icon } from "~/components/common/Icon";
import type { IntroView } from "~/types";
import styles from "./intro.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const handleMouseMove = $((e: MouseEvent, currentTarget: HTMLElement) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  });

  return (
    <div class="intro">
      <div class="intro-grid">
        {introConfig.views.map((item) => (
          <IntroItem key={item.word} {...item} onMouseMove$={handleMouseMove} />
        ))}
      </div>
    </div>
  );
});

interface IntroItemProps extends IntroView {
  onMouseMove$?: any;
}

const IntroItem = component$<IntroItemProps>(
  ({ icon, word, intro, onMouseMove$ }) => (
    <div class="intro-item" onMouseMove$={onMouseMove$}>
      <div class="intro-icon">
        <Icon paths={icon} width={24} height={24} />
      </div>
      <h3>{word}</h3>
      <p>{intro}</p>
    </div>
  ),
);
