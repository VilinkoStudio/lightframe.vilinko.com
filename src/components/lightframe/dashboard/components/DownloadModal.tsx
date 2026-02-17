import {
  component$,
  type Signal,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@qwik.dev/core";
import { DOWNLOAD, LINKS } from "~/constants";
import { trackDownload } from "~/services/api";
import modalStyles from "../modal.css?inline";

export interface DownloadModalProps {
  isVisible: Signal<boolean>;
  agreedToTerms: Signal<boolean>;
}

interface VersionData {
  name: string;
  version: string;
  last_updated: string;
  changelog: string;
}

export const DownloadModal = component$<DownloadModalProps>(
  ({ isVisible, agreedToTerms }) => {
    useStyles$(modalStyles);

    const versions = useSignal<VersionData[] | null>(null);
    const versionError = useSignal(false);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
      try {
        const response = await fetch("https://down1.vilinko.com/version.json");
        const text = await response.text();
        versions.value = JSON.parse(text);
      } catch (e) {
        console.error("Failed to fetch or parse version info", e);
        versionError.value = true;
        versions.value = [];
      }
    });

    return (
      <div
        class="modal-overlay"
        onClick$={(e, el) => {
          if (e.target === el) {
            isVisible.value = false;
          }
        }}
      >
        <div class="modal-content">
          <div class="modal-header">
            <h2>下载 LightFrame</h2>
            <button
              class="close-btn"
              type="button"
              onClick$={() => {
                isVisible.value = false;
              }}
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            {versionError.value ? (
              <div class="version-info">获取版本信息失败</div>
            ) : versions.value === null ? (
              <div class="version-info">正在获取版本信息...</div>
            ) : (
              (() => {
                const latest = versions.value.find(
                  (version) => version.name === "LightFrame",
                );
                if (!latest) return null;
                return (
                  <div class="version-info">
                    最新版本: {latest.version} (更新于 {latest.last_updated})
                  </div>
                );
              })()
            )}
            <a
              href={agreedToTerms.value ? DOWNLOAD.X64 : undefined}
              class="link-wrapper"
              onClick$={() => trackDownload()}
            >
              <button
                class="download-link"
                disabled={!agreedToTerms.value}
                type="button"
              >
                Windows x64 (推荐)
              </button>
            </a>
            <a
              href={agreedToTerms.value ? DOWNLOAD.X86 : undefined}
              class="link-wrapper"
              onClick$={() => trackDownload()}
            >
              <button
                class="download-link"
                disabled={!agreedToTerms.value}
                type="button"
              >
                Windows x86
              </button>
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
