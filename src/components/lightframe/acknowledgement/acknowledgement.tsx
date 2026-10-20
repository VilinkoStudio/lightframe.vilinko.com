import { component$, useStylesScoped$ } from "@qwik.dev/core";
import styles from "./acknowledgement.css?inline";

const THANKS = [
  {
    title: "技术支持",
    text: "提供技术支持与建议的开发者。",
  },
  {
    title: "用户反馈",
    text: "提交反馈和建议的每一位用户。",
  },
  {
    title: "社区贡献",
    text: "参与讨论、分享经验的社区成员。",
  },
];

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <section class="acknowledgement section section-divided">
      <div class="container">
        <div class="section-head">
          <div class="section-head-text">
            <h2>致谢</h2>
            <p>
              LightFrame 从代码、测试、反馈一路走到现在，每一步都有别人的功劳。
            </p>
          </div>
        </div>

        <div class="thanks">
          {THANKS.map((item) => (
            <div class="thanks-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
