import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { headerConfig } from "~/config";
import "./header.css";

export default component$(() => {
  return (
    <div class="top">
      <span class="title">轻框 | LightFrame</span>
      <MainOperators />
    </div>
  );
});

const MainOperators = component$(() => {
  return (
    <div class="menu">
      {headerConfig.operators.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          class="item"
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.text}
        </Link>
      ))}
    </div>
  );
});
