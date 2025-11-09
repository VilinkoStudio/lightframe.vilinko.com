import { component$ } from "@builder.io/qwik";
import { introConfig } from "~/config";
import { Icon } from "~/components/common/Icon";
import type { IntroView } from "~/types";
import "./intro.css";

export default component$(() => {
  return (
    <div class="intro">
      <div class="container">
        <div class="intro-grid">
          {introConfig.views.map((item) => (
            <IntroItem key={item.word} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
});

export const IntroItem = component$<IntroView>(({ icon, word, intro }) => {
  return (
    <div class="intro-item">
      <div class="intro-icon">
        <Icon paths={icon} width={42} height={42} />
      </div>
      <h3>{word}</h3>
      <p>{intro}</p>
    </div>
  );
});
