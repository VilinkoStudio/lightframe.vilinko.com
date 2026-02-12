import {
  component$,
  type Signal,
  useStyles$,
  useResource$,
  Resource,
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

    const versionResource = useResource$<VersionData[]>(async () => {
      try {
        const response = await fetch("https://down1.vilinko.com/version.json");
        const text = await response.text();
        // Try parsing as normal JSON first
        try {
          const data = JSON.parse(text);
          return Array.isArray(data) ? data : [data];
        } catch {
          // If it fails, try wrapping in array (for comma-separated objects)
          try {
            return JSON.parse(`[${text}]`);
          } catch (e2) {
            console.error("Failed to parse version info", e2);
            return [];
          }
        }
      } catch (e) {
        console.error("Failed to fetch version info", e);
        return [];
      }
    });

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
            <Resource
              value={versionResource}
              onPending={() => (
                <div class="version-info">正在获取版本信息...</div>
              )}
              onRejected={() => (
                <div class="version-info">获取版本信息失败</div>
              )}
              onResolved={(versions) => {
                const latest = versions.find((v) => v.name === "LightFrame");
                if (!latest) return null;
                return (
                  <div class="version-info">
                    最新版本: {latest.version} (更新于 {latest.last_updated})
                  </div>
                );
              }}
            />
            <a
              href={agreedToTerms.value ? DOWNLOAD.X64 : undefined}
              class="link-wrapper"
              onClick$={() => trackDownload()}
            >
              <button class="download-link" disabled={!agreedToTerms.value}>
                Windows x64 (推荐)
              </button>
            </a>
            <a
              href={agreedToTerms.value ? DOWNLOAD.X86 : undefined}
              class="link-wrapper"
              onClick$={() => trackDownload()}
            >
              <button class="download-link" disabled={!agreedToTerms.value}>
                Windows x86
              </button>
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
