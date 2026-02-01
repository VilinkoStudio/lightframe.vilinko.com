import {
  component$,
  useSignal,
  useVisibleTask$,
  useStyles$,
} from "@qwik.dev/core";
import styles from "./dashboard.css?inline";
import { DownloadModal } from "./components/DownloadModal";
import { ActionCard } from "./components/ActionCard";
import { MeetCard, ClockCard } from "./components/InfoCards";
import { StarCard } from "./components/StarCard";

export default component$(() => {
  useStyles$(styles);

  const time = useSignal("00:00");
  const month = useSignal("...");
  const dateStr = useSignal("...");
  const showModal = useSignal(false);
  const agreedToTerms = useSignal(false);
  const starCardRef = useSignal<HTMLDivElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const updateTime = () => {
      const now = new Date();
      time.value = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      const monthFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
      });
      const dayFormatter = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
      });
      month.value = monthFormatter.format(now) + ".";
      dateStr.value = `${now.getDate()} ${dayFormatter.format(now)}.`;
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    cleanup(() => {
      clearInterval(interval);
    });
  });

  return (
    <div class="dashboard-container">
      <StarCard starCardRef={starCardRef} />
      <MeetCard />
      <ClockCard time={time} />
      <ActionCard month={month} dateStr={dateStr} showModal={showModal} />
      {showModal.value && (
        <DownloadModal isVisible={showModal} agreedToTerms={agreedToTerms} />
      )}
    </div>
  );
});
