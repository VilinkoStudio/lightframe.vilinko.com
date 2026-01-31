import { component$, useSignal, useVisibleTask$ } from "@qwik.dev/core";

export default component$(() => {
  const time = useSignal("00:00");

  useVisibleTask$(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      time.value = `${hours}:${minutes}`;
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div class="dashboard-card clock-card">
      <div class="clock-text">{time.value}</div>
    </div>
  );
});
