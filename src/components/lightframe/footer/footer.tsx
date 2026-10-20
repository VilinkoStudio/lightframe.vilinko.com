import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { LINKS, APP_META } from "~/constants";
import styles from "./footer.css?inline";

const FOOTER_LINKS = {
  product: [
    { text: "官方网站", href: LINKS.MAIN_SITE },
    { text: "壁纸库", href: LINKS.WALLPAPER },
    { text: "使用文档", href: LINKS.DOCS },
    { text: "服务支持", href: LINKS.SUPPORT },
  ],
  community: [
    { text: "QQ 频道", href: LINKS.QQPD },
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
        <div class="footer-top">
          <div class="footer-brand">
            <div class="brand-lockup">
              <img
                src="/images/logo.webp"
                alt=""
                width={34}
                height={34}
                class="brand-mark"
                loading="lazy"
                decoding="async"
              />
              <span class="brand-name">LightFrame</span>
            </div>
            <p class="brand-description">{APP_META.SUBTITLE}</p>
          </div>

          <nav class="footer-nav" aria-label="页脚导航">
            <div class="footer-col">
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

            <div class="footer-col">
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
          </nav>
        </div>

        <div class="footer-bottom">
          <p>© {currentYear} Vilinko Studio</p>
          <div class="footer-legal">
            <a href={LINKS.PRIVACY}>隐私政策</a>
            <a href={LINKS.TOS}>服务条款</a>
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
    </footer>
  );
});
