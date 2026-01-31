import { component$, $, type Signal } from "@qwik.dev/core";
import { useToggle } from "~/hooks/useToggle";
import { trackDownload } from "~/services/api";
import { LINKS, APP_META, DOWNLOAD } from "~/constants";
import "./main.css";
import { Link } from "@qwik.dev/router";

const DownloadIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2V14M12 14L17 9M12 14L7 9"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20 16V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V16"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

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
