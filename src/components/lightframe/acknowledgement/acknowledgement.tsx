import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { Icon } from "~/components/common/Icon";
import styles from "./acknowledgement.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="acknowledgement">
      <div class="container">
        <h2 class="section-title">致谢</h2>
        <div class="acknowledgement-content">
          <p class="acknowledgement-intro">
            感谢所有为 LightFrame
            项目做出贡献的人们，无论是通过代码、测试、反馈还是其他方式。
            没有你们的支持，这个项目不可能实现。
          </p>
          <div class="acknowledgement-grid">
            <div class="acknowledgement-item">
              <div class="item-icon">
                <Icon
                  paths={[
                    "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z",
                  ]}
                  width={28}
                  height={28}
                />
              </div>
              <h3>技术支持</h3>
              <p>感谢所有提供技术支持和建议的开发者们。</p>
            </div>
            <div class="acknowledgement-item">
              <div class="item-icon">
                <Icon
                  paths={[
                    "M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5zM7 2.5V6L5 4V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z",
                  ]}
                  width={28}
                  height={28}
                />
              </div>
              <h3>用户反馈</h3>
              <p>感谢所有提供宝贵反馈和建议的用户们。</p>
            </div>
            <div class="acknowledgement-item">
              <div class="item-icon">
                <Icon
                  paths={[
                    "M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
                  ]}
                  width={28}
                  height={28}
                />
              </div>
              <h3>社区贡献</h3>
              <p>感谢所有参与社区讨论和分享经验的用户们。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
