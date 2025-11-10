import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { headerConfig } from "~/config";
import "./header.css";

export default component$(() => {
  const isMenuOpen = useSignal(false);

  const toggleMenu = $(() => { isMenuOpen.value = !isMenuOpen.value; });

  return (
    <>
      <header class={`top ${isMenuOpen.value ? 'menu-open' : ''}`}>
        <div class="header-content">
          <span class="title">轻框 | LIGHTFRAME 2.0</span>
          <button
            class={`menu-toggle ${isMenuOpen.value ? 'active' : ''}`}
            onClick$={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen.value}
          >
            <span class="hamburger">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </span>
          </button>
        </div>
        <nav class={`menu ${isMenuOpen.value ? 'active' : ''}`} aria-hidden={!isMenuOpen.value}>
          {headerConfig.operators.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              class="item"
              target="_blank"
              rel="noopener noreferrer"
              onClick$={toggleMenu}
            >
              {item.text}
            </Link>
          ))}
        </nav>
      </header>

      <div class={`menu-overlay ${isMenuOpen.value ? 'active' : ''}`} onClick$={toggleMenu} />
    </>
  );
});