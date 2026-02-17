import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { LINKS, APP_META } from "~/constants";
import styles from "./footer.css?inline";

const FOOTER_LINKS = {
  product: [
    { text: "官方网站", href: LINKS.MAIN_SITE },
    { text: "壁纸库", href: LINKS.WALLPAPER },
    { text: "使用文档", href: LINKS.DOCS },
  ],
  community: [
    { text: "Bilibili", href: LINKS.BILIBILI },
    { text: "GitHub", href: LINKS.GITHUB },
    { text: "爱发电", href: LINKS.AFDIAN },
  ],
};

export default component$(() => {
  useStylesScoped$(styles);

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
                loading="lazy"
                decoding="async"
              />
              <span class="brand-name">{APP_META.TITLE}</span>
            </div>
            <p class="brand-description">{APP_META.SUBTITLE}</p>
          </div>

          <div class="footer-right">
            <div class="footer-section">
              <h3>产品</h3>
              <ul>
                {FOOTER_LINKS.product.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div class="footer-section">
              <h3>社区</h3>
              <ul>
                {FOOTER_LINKS.community.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
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
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                粤ICP备2025454076号
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
