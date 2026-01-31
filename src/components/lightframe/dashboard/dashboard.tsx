import { component$, useStyles$ } from "@qwik.dev/core";
import styles from "./dashboard.css?inline";
import MeetCard from "./meet-card";
import ClockCard from "./clock-card";
import ActionCard from "./action-card";

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="dashboard-container">
      <MeetCard />
      <ClockCard />
      <ActionCard />
    </div>
  );
});
