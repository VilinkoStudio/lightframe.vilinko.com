import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { introConfig } from "~/config";
import { Icon } from "~/components/common/Icon";
import styles from "./intro.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <section class="intro section">
      <div class="container">
        <div class="section-head">
          <div class="section-head-text">
            <h2>为什么是 LightFrame</h2>
            <p>把喜欢的桌面留下来，而不是每天面对一个将就的桌面。</p>
          </div>
        </div>

        <div class="intro-grid">
          {introConfig.views.map((item) => (
            <div class="intro-item" key={item.word}>
              <div class="intro-icon">
                <Icon paths={item.icon} width={20} height={20} />
              </div>
              <h3>{item.word}</h3>
              <p>{item.intro}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
