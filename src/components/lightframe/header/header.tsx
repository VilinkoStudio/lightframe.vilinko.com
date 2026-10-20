import { component$, useSignal, $, useStyles$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { headerConfig } from "~/config";
import { Icon } from "~/components/common/Icon";
import styles from "./header.css?inline";

export default component$(() => {
  useStyles$(styles);

  const isMenuOpen = useSignal(false);

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
    if (typeof document !== "undefined") {
      document.body.classList.toggle("is-locked", isMenuOpen.value);
    }
  });

  const closeMenu = $(() => {
    isMenuOpen.value = false;
    if (typeof document !== "undefined") {
      document.body.classList.remove("is-locked");
    }
  });

  return (
    <>
      <header class="header">
        <div class="header-container">
          <Link href="/" class="logo" aria-label="LightFrame 首页">
            <img
              src="/images/logo.webp"
              alt=""
              width={26}
              height={26}
              class="logo-mark"
            />
            <span class="logo-name">LightFrame</span>
          </Link>

          <nav class="nav-desktop">
            {headerConfig.operators.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                class="nav-link"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {item.text}
              </Link>
            ))}
            <a class="header-cta" href="#download">
              下载
            </a>
          </nav>

          <button
            class="mobile-menu-btn"
            onClick$={toggleMenu}
            aria-label={isMenuOpen.value ? "关闭导航" : "打开导航"}
            aria-expanded={isMenuOpen.value}
          >
            <Icon
              paths={
                isMenuOpen.value
                  ? [
                      "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z",
                    ]
                  : [
                      "M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z",
                    ]
              }
              width={22}
              height={22}
            />
          </button>
        </div>
      </header>

      <div
        class={`mobile-menu-overlay ${isMenuOpen.value ? "open" : ""}`}
        onClick$={closeMenu}
      />

      <nav class={`mobile-menu ${isMenuOpen.value ? "open" : ""}`}>
        {headerConfig.operators.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            class="mobile-nav-link"
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={
              item.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            onClick$={closeMenu}
          >
            {item.text}
          </Link>
        ))}
        <a class="mobile-nav-link mobile-nav-cta" href="#download" onClick$={closeMenu}>
          下载
        </a>
      </nav>
    </>
  );
});
