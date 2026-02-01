import { component$ } from "@qwik.dev/core";
import { LINKS, APP_META } from "~/constants";
import "./footer.css";

export default component$(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="brand-logo">
              <img
                src="/images/logo.webp"
                alt="LightFrame Logo"
                width={32}
                height={32}
                class="brand-logo-img"
              />
              <span class="brand-name">{APP_META.TITLE}</span>
            </div>
            <p class="brand-description">{APP_META.SUBTITLE}</p>
          </div>

          <div class="footer-right">
            <div class="footer-section">
              <h3>产品</h3>
              <ul>
                <li>
                  <a
                    href={LINKS.MAIN_SITE}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    官方网站
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.WALLPAPER}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    壁纸库
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.DOCS}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    使用文档
                  </a>
                </li>
              </ul>
            </div>

            <div class="footer-section">
              <h3>社区</h3>
              <ul>
                <li>
                  <a
                    href={LINKS.BILIBILI}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bilibili
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={LINKS.AFDIAN}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    爱发电
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p>
              &copy; {currentYear} {APP_META.TITLE}. All rights reserved.
            </p>
            <div class="footer-bottom-links">
              <a href="/privacy">隐私政策</a>
              <a href="/terms">服务条款</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
