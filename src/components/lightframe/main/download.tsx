import { component$, $ } from "@builder.io/qwik";
import { useToggle } from "~/hooks/useToggle";
import { trackDownload } from "~/services/api";
import { DOWNLOAD, LINKS } from "~/constants";

export const Download = component$(() => {
  const { value: visible } = useToggle(false);
  const { value: agreedToTerms } = useToggle(false);

  const showModal = $(() => {
    trackDownload();
    visible.value = true;
    agreedToTerms.value = false;
  });

  const hideModal = $(() => {
    visible.value = false;
  });

  const handleDownload = $((url: string) => {
    trackDownload();
    window.location.href = url;
    trackDownload();
  });

  return (
    <>
      <button class="download-btn" onClick$={showModal}>
        下载
      </button>

      {visible.value && (
        <div class="modal-overlay" onClick$={hideModal}>
          <div class="modal-content" onClick$={(e) => e.stopPropagation()}>
            <div class="modal-header">
              <h2>下载 LightFrame</h2>
              <button class="close-btn" onClick$={hideModal}>×</button>
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
      )}
    </>
  );
});