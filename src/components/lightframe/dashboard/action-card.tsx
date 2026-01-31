import {
  component$,
  useSignal,
  useVisibleTask$,
  useStyles$,
  $,
} from "@qwik.dev/core";
import { trackDownload } from "~/services/api";
import { DOWNLOAD, LINKS } from "~/constants";
import modalStyles from "./modal.css?inline";

const DownloadModal = component$<{ isVisible: any }>(({ isVisible }) => {
  useStyles$(modalStyles);
  const agreedToTerms = useSignal(false);

  const handleDownload = $((url: string) => {
    trackDownload();
    window.location.href = url;
  });

  const handleClose = $(() => {
    isVisible.value = false;
  });

  return (
    <div class="modal-overlay" onClick$={handleClose}>
      <div class="modal-content" onClick$={(e) => e.stopPropagation()}>
        <div class="modal-header">
          <h2>下载 LightFrame</h2>
          <button class="close-btn" onClick$={handleClose}>
            ×
          </button>
        </div>

        <div class="modal-body">
          <button
            class="download-link"
            disabled={!agreedToTerms.value}
            onClick$={() => handleDownload(DOWNLOAD.X64)}
          >
            LightFrame Windows x64 (推荐)
          </button>

          <button
            class="download-link"
            disabled={!agreedToTerms.value}
            onClick$={() => handleDownload(DOWNLOAD.X86)}
          >
            LightFrame Windows - x86
          </button>

          <div class="terms-container">
            <label class="terms-label">
              <input
                type="checkbox"
                checked={agreedToTerms.value}
                onChange$={() => {
                  agreedToTerms.value = !agreedToTerms.value;
                }}
              />
              在使用前您需要阅读并同意我们的
              <a
                href={LINKS.TOS}
                target="_blank"
                rel="noopener noreferrer"
                class="terms-link"
              >
                《服务条款》
              </a>
              和
              <a
                href={LINKS.PRIVACY}
                target="_blank"
                rel="noopener noreferrer"
                class="terms-link"
              >
                《隐私政策》
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
});

export default component$(() => {
  const month = useSignal("...");
  const dateStr = useSignal("...");
  const showModal = useSignal(false);

  useVisibleTask$(() => {
    const now = new Date();
    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
    const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });

    month.value = monthFormatter.format(now) + ".";
    dateStr.value = `${now.getDate()} ${dayFormatter.format(now)}.`;
  });

  return (
    <div class="dashboard-card action-card">
      <button class="click-btn" onClick$={() => (showModal.value = true)}>
        <span class="mc-text">DOWNLOAD</span>
      </button>
      <div class="date-row">
        <div class="date-box month-box">
          <span>{month.value}</span>
        </div>
        <div class="date-box day-box">
          <span>{dateStr.value}</span>
        </div>
      </div>
      {showModal.value && <DownloadModal isVisible={showModal} />}
    </div>
  );
});
