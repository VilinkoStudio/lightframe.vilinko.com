import {
  component$,
  useSignal,
  useStyles$,
  useVisibleTask$,
  type Signal,
} from "@qwik.dev/core";
import { DOWNLOAD, LINKS } from "~/constants";
import { trackDownload } from "~/services/api";
import modalStyles from "../modal.css?inline";

export interface DownloadModalProps {
  isVisible: Signal<boolean>;
}

interface VersionData {
  name: string;
  version: string;
  last_updated: string;
  changelog: string;
}

export const DownloadModal = component$<DownloadModalProps>(({ isVisible }) => {
  useStyles$(modalStyles);

  const versions = useSignal<VersionData[] | null>(null);
  const versionError = useSignal(false);
  const agreedToTerms = useSignal(false);
  const panelRef = useSignal<HTMLDivElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ cleanup }) => {
    const restoreFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    document.body.classList.add("is-locked");
    panelRef.value?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        isVisible.value = false;
        return;
      }
      if (event.key !== "Tab" || !panelRef.value) return;
      const focusable = Array.from(
        panelRef.value.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === panelRef.value) {
        event.preventDefault();
        last.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const controller = new AbortController();
    try {
      const response = await fetch("https://down1.vilinko.com/version.json", {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      // 接口返回的是逗号分隔的多个 JSON 对象，不是合法 JSON
      const text = (await response.text()).trim().replace(/,\s*$/, "");
      const parsed = JSON.parse(text.startsWith("[") ? text : `[${text}]`);
      versions.value = Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      console.error("Failed to fetch or parse version info", error);
      versionError.value = true;
      versions.value = [];
    }

    cleanup(() => {
      controller.abort();
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("is-locked");
      restoreFocus?.focus();
    });
  });

  const latest = versions.value?.find((item) => item.name === "LightFrame");

  const versionLine = () => {
    if (versionError.value) return "暂时取不到版本信息，仍可下载最新安装包";
    if (versions.value === null) return "正在获取版本信息…";
    if (!latest) return "下载最新安装包";
    return latest.version === "latest"
      ? `最新构建 · 更新于 ${latest.last_updated}`
      : `最新版本 ${latest.version} · 更新于 ${latest.last_updated}`;
  };

  return (
    <div
      class="modal-overlay"
      onClick$={(event, element) => {
        if (event.target === element) isVisible.value = false;
      }}
    >
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-modal-title"
        tabIndex={-1}
        ref={panelRef}
      >
        <div class="modal-head">
          <h2 id="download-modal-title">下载 LightFrame</h2>
          <button
            class="modal-close"
            type="button"
            aria-label="关闭"
            onClick$={() => {
              isVisible.value = false;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <p class="modal-version">{versionLine()}</p>
          <label class="terms">
            <input
              type="checkbox"
              checked={agreedToTerms.value}
              onChange$={() => {
                agreedToTerms.value = !agreedToTerms.value;
              }}
            />
            <span>
              下载前请阅读并同意
              <a href={LINKS.TOS} target="_blank" rel="noopener noreferrer">
                《服务条款》
              </a>
              与
              <a
                href={LINKS.PRIVACY}
                target="_blank"
                rel="noopener noreferrer"
              >
                《隐私政策》
              </a>
            </span>
          </label>

          <a
            class={`btn btn-primary btn-lg btn-block ${
              agreedToTerms.value ? "" : "is-locked"
            }`}
            href={agreedToTerms.value ? DOWNLOAD.X64 : undefined}
            aria-disabled={!agreedToTerms.value}
            onClick$={(event) => {
              if (!agreedToTerms.value) {
                event.preventDefault();
                return;
              }
              trackDownload();
            }}
          >
            Windows x64（推荐）
          </a>
          <a
            class={`btn btn-secondary btn-lg btn-block ${
              agreedToTerms.value ? "" : "is-locked"
            }`}
            href={agreedToTerms.value ? DOWNLOAD.X86 : undefined}
            aria-disabled={!agreedToTerms.value}
            onClick$={(event) => {
              if (!agreedToTerms.value) {
                event.preventDefault();
                return;
              }
              trackDownload();
            }}
          >
            Windows x86
          </a>

          <div class="modal-pending">
            <span class="modal-pending-name">LightFrame 2.0</span>
            <span class="modal-pending-meta">x64 · Arm64</span>
            <span class="modal-pending-tag">暂未开放</span>
          </div>

        </div>
      </div>
    </div>
  );
});
