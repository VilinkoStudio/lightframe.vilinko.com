import { component$ } from "@builder.io/qwik";
import { LINKS, APP_META } from "~/constants";
import "./footer.css";

export default component$(() => {
  const currentYear = new Date().getFullYear(); // 自动更新年份，不再使用 APP_META

  return (
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>{APP_META.TITLE}</h3>
            <p>{APP_META.SUBTITLE}</p>
          </div>
          <div class="footer-section">
            <h4>相关链接</h4>
            <ul>
              <li>
                <a href={LINKS.MAIN_SITE} target="_blank" rel="noopener noreferrer">
                  主站
                </a>
              </li>
              <li>
                <a href={LINKS.WALLPAPER} target="_blank" rel="noopener noreferrer">
                  壁纸库
                </a>
              </li>
              <li>
                <a href={LINKS.DOCS} target="_blank" rel="noopener noreferrer">
                  文档
                </a>
              </li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>联系我们</h4>
            <ul>
              <li>
                <a href={LINKS.BILIBILI} target="_blank" rel="noopener noreferrer">
                  Bilibili
                </a>
              </li>
              <li>
                <a href={LINKS.GITHUB} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={LINKS.AFDIAN} target="_blank" rel="noopener noreferrer">
                  爱发电
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© {currentYear} Vilinko. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});
