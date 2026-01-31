import { component$, useStyles$ } from "@qwik.dev/core";
import styles from "./dashboard.css?inline";
import MeetCard from "./meet-card";
import ClockCard from "./clock-card";
import StarCard from "./star-card";
import ActionCard from "./action-card";

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="dashboard-container">
      <MeetCard />
      <ClockCard />
      <StarCard />
      <ActionCard />
    </div>
  );
});
