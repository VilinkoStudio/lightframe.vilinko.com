import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { APP_META } from "~/constants";

import Main from "../components/lightframe/main/main";
import Intro from "../components/lightframe/intro/intro";
import Log from "../components/lightframe/log/log";
import Contributors from "../components/lightframe/contributors/contributors";
import Acknowledgement from "../components/lightframe/acknowledgement/acknowledgement";

export default component$(() => {
  return (
    <>
      <Main />
      <Intro />
      <Log />
      <Contributors />
      <Acknowledgement />
    </>
  );
});

export const head: DocumentHead = {
  title: `${APP_META.TITLE} - ${APP_META.SUBTITLE}`,
  meta: [
    {
      name: "description",
      content: APP_META.DESCRIPTION,
    },
  ],
};
