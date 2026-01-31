import { component$, Slot } from "@qwik.dev/core";
import { routeLoader$ } from "@qwik.dev/router";

import Header from "../components/lightframe/header/header";
import Footer from "../components/lightframe/footer/footer";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
