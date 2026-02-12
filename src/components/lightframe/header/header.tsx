import { component$, useSignal, $, useStylesScoped$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { headerConfig } from "~/config";
import { Icon } from "~/components/common/Icon";
import styles from "./header.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const isMenuOpen = useSignal(false);

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
    if (typeof document !== "undefined") {
      document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
    }
  });

  const closeMenu = $(() => {
    isMenuOpen.value = false;
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  });

  return (
    <>
      <header class="header">
        <div class="header-container">
          <Link href="/" class="logo" aria-label="LightFrame Home">
            <span>LightFrame</span>
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
          </nav>

          <button
            class="mobile-menu-btn"
            onClick$={toggleMenu}
            aria-label="Toggle menu"
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
              width={24}
              height={24}
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
              item.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            onClick$={closeMenu}
          >
            {item.text}
          </Link>
        ))}
      </nav>
    </>
  );
});
