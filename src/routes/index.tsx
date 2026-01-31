import { component$ } from "@qwik.dev/core";
import type { DocumentHead } from "@qwik.dev/router";
import { APP_META } from "~/constants";

import Dashboard from "../components/lightframe/dashboard/dashboard";
import Intro from "../components/lightframe/intro/intro";
import Log from "../components/lightframe/log/log";
import Contributors from "../components/lightframe/contributors/contributors";
import Acknowledgement from "../components/lightframe/acknowledgement/acknowledgement";

export default component$(() => {
  return (
    <>
      <Dashboard />
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
