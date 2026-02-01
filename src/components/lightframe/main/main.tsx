import { component$, $, type Signal } from "@qwik.dev/core";
import { useToggle } from "~/hooks/useToggle";
import { trackDownload } from "~/services/api";
import { LINKS, APP_META, DOWNLOAD } from "~/constants";
import { DownloadIcon, HeartIcon } from "~/components/common/icons";
import "./main.css";
import { Link } from "@qwik.dev/router";

const DownloadModal = ({ isVisible }: { isVisible: Signal<boolean> }) => {
  // eslint-disable-next-line qwik/use-method-usage
  const { value: agreedToTerms } = useToggle(false);

  const handleClose = $(() => {
    isVisible.value = false;
  });

  return (
    <div
      class="modal-overlay"
      onClick$={(e, el) => e.target === el && handleClose()}
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2>下载 LightFrame</h2>
          <button class="close-btn" onClick$={handleClose}>
            ×
          </button>
        </div>

        <div class="modal-body">
          <a
            href={DOWNLOAD.X64}
            class={`download-link ${!agreedToTerms.value ? "disabled" : ""}`}
            onClick$={() => agreedToTerms.value && trackDownload()}
          >
            Windows x64 (推荐)
          </a>

          <a
            href={DOWNLOAD.X86}
            class={`download-link ${!agreedToTerms.value ? "disabled" : ""}`}
            onClick$={() => agreedToTerms.value && trackDownload()}
          >
            Windows x86
          </a>

          <div class="terms-container">
            <label class="terms-label">
              <input
                type="checkbox"
                checked={agreedToTerms.value}
                onChange$={() => {
                  agreedToTerms.value = !agreedToTerms.value;
                }}
              />
              <span class="terms-text">
                在使用前您需要阅读并同意我们的
                <a href="/terms" class="terms-link">
                  《服务条款》
                </a>
                和
                <a href="/privacy" class="terms-link">
                  《隐私政策》
                </a>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default component$(() => {
  return (
    <div class="groundPlace">
      <div class="container">
        <div class="body-content">
          <h1 class="body-title text-center">{APP_META.SUBTITLE}</h1>
          <div class="body-button-container">
            <DownloadButton />
            <Link
              href={LINKS.AFDIAN}
              class="btn interactive-lift"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HeartIcon />
              <span class="btn-text">支持一下</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

const DownloadButton = component$(() => {
  const { value: visible } = useToggle(false);

  return (
    <>
      <button
        class="btn"
        onClick$={() => {
          visible.value = true;
        }}
      >
        <DownloadIcon />
        <span class="btn-text">下载</span>
      </button>
      {visible.value && <DownloadModal isVisible={visible} />}
    </>
  );
});
