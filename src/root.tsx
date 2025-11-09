import { component$ } from "@builder.io/qwik";
import { isDev } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <title>轻框 | LightFrame - 以轻量的方式定义自己喜欢的桌面</title>
        <meta name="description" content="LightFrame - 以轻量的方式定义自己喜欢的桌面。轻量、灵感、沉浸、免费的桌面应用。" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <link rel="icon" href="/favicon.ico" />
        <RouterHead />
      </head>
      <body lang="zh-CN">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
