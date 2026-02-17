import {
  component$,
  useStylesScoped$,
  useResource$,
  Resource,
} from "@qwik.dev/core";
import { useToggle } from "~/hooks/useToggle";
import { ToggleButton } from "~/components/common/ToggleButton";
import { fetchReleases } from "~/services/api";
import type { LogItem } from "~/types";
import styles from "./log.css?inline";

const GITMOJI_MAP: Record<string, string> = {
  feat: "✨",
  fix: "🐛",
  change: "🔧",
  perf: "⚡️",
};

function getGitmoji(type: string): string {
  return GITMOJI_MAP[type] || "📝";
}

const LoadingState = () => <div class="loading">加载中...</div>;
const ErrorState = () => <div class="error">加载失败</div>;

export default component$(() => {
  useStylesScoped$(styles);
  const { value: isExpanded } = useToggle(false);

  const logsResource = useResource$<LogItem[]>(async () => {
    return await fetchReleases();
  });

  return (
    <div class="log">
      <div class="container">
        <h2 class="section-title">更新日志</h2>
        <div class="log-content">
          <Resource
            value={logsResource}
            onPending={LoadingState}
            onRejected={ErrorState}
            onResolved={(logs) => (
              <>
                <div
                  class={`log-container ${isExpanded.value ? "expanded" : ""}`}
                >
                  {logs.map((log) => (
                    <div key={`${log.version}-${log.build}`} class="log-item">
                      <div class="log-header">
                        <div class="log-version">{log.version}</div>
                        <div class="log-date">{log.date}</div>
                      </div>
                      <ul>
                        {log.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <span class="gitmoji">{getGitmoji(item.type)}</span>
                            <span class="item-description">
                              {item.description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <ToggleButton
                  isExpanded={isExpanded}
                  expandedText="收起"
                  collapsedText="展开全部"
                  class="log-toggle"
                />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
});
