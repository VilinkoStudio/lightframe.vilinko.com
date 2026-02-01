import { component$, type Signal, useStyles$ } from "@qwik.dev/core";
import { DOWNLOAD, LINKS } from "~/constants";
import { trackDownload } from "~/services/api";
import modalStyles from "../modal.css?inline";

export interface DownloadModalProps {
  isVisible: Signal<boolean>;
  agreedToTerms: Signal<boolean>;
}

export const DownloadModal = component$<DownloadModalProps>(
  ({ isVisible, agreedToTerms }) => {
    useStyles$(modalStyles);

    return (
      <div
        class="modal-overlay"
        onClick$={(e, el) => e.target === el && (isVisible.value = false)}
      >
        <div class="modal-content">
          <div class="modal-header">
            <h2>下载 LightFrame</h2>
            <button
              class="close-btn"
              onClick$={() => (isVisible.value = false)}
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <a
              href={agreedToTerms.value ? DOWNLOAD.X64 : undefined}
              class={`download-link ${!agreedToTerms.value ? "disabled" : ""}`}
              onClick$={(e) => {
                if (!agreedToTerms.value) {
                  e.preventDefault();
                  return;
                }
                trackDownload();
              }}
            >
              Windows x64 (推荐)
            </a>
            <a
              href={agreedToTerms.value ? DOWNLOAD.X86 : undefined}
              class={`download-link ${!agreedToTerms.value ? "disabled" : ""}`}
              onClick$={(e) => {
                if (!agreedToTerms.value) {
                  e.preventDefault();
                  return;
                }
                trackDownload();
              }}
            >
              Windows x86
            </a>
            <div class="terms-container">
              <label class="terms-label">
                <input
                  type="checkbox"
                  checked={agreedToTerms.value}
                  onChange$={() => (agreedToTerms.value = !agreedToTerms.value)}
                />
                <span class="terms-text">
                  在使用前您需要阅读并同意我们的
                  <a href={LINKS.TOS} class="terms-link">
                    《服务条款》
                  </a>
                  和
                  <a href={LINKS.PRIVACY} class="terms-link">
                    《隐私政策》
                  </a>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
