import { component$ } from "@builder.io/qwik";
import "./acknowledgement.css";

export default component$(() => {
  return (
    <div class="acknowledgement">
      <div class="container">
        <h2 class="section-title">致谢</h2>
        <div class="acknowledgement-content">
          <p>
            感谢所有为 LightFrame 项目做出贡献的人们，无论是通过代码、测试、反馈还是其他方式。
            没有你们的支持，这个项目不可能实现。
          </p>
          <div class="acknowledgement-grid">
            <div class="acknowledgement-item modern-card">
              <h3>技术支持</h3>
              <p>感谢所有提供技术支持和建议的开发者们。</p>
            </div>
            <div class="acknowledgement-item modern-card">
              <h3>用户反馈</h3>
              <p>感谢所有提供宝贵反馈和建议的用户们。</p>
            </div>
            <div class="acknowledgement-item modern-card">
              <h3>社区贡献</h3>
              <p>感谢所有参与社区讨论和分享经验的用户们。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});