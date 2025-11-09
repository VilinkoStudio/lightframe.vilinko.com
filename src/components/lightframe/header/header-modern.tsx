import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { headerConfig } from "~/config";

export default component$(() => {
  const isMenuOpen = useSignal(false);

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  const closeMenu = $(() => {
    isMenuOpen.value = false;
  });

  return (
    <header class="navbar-modern">
      <Link href="/" class="navbar-brand" onClick$={closeMenu}>
        轻框 | LIGHTFRAME 2.0
      </Link>

      <nav class={`navbar-nav ${isMenuOpen.value ? 'active' : ''}`}>
        {headerConfig.operators.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            class="navbar-item"
            target="_blank"
            rel="noopener noreferrer"
            onClick$={closeMenu}
          >
            {item.text}
          </Link>
        ))}
      </nav>

      <button
        class="navbar-toggle"
        onClick$={toggleMenu}
        aria-label="切换菜单"
        aria-expanded={isMenuOpen.value ? "true" : "false"}
      >
        {isMenuOpen.value ? '✕' : '☰'}
      </button>
    </header>
  );
});
