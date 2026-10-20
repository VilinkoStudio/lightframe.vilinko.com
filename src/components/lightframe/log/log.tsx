import {
  component$,
  useStylesScoped$,
  useResource$,
  Resource,
} from "@qwik.dev/core";
import { useToggle } from "~/hooks/useToggle";
import { ToggleButton } from "~/components/common/ToggleButton";
import { fetchReleases } from "~/services/api";
import { LINKS } from "~/constants";
import type { LogItem } from "~/types";
import styles from "./log.css?inline";

const LOG_TYPES: Record<string, string> = {
  feat: "新增",
  fix: "修复",
  change: "调整",
  perf: "性能",
};

const VISIBLE_RELEASES = 3;

const URL_SPLIT = /(https?:\/\/[^\s)）]+)/;

/** 说明里偶尔带裸链接，换成短链接文字，避免长 URL 打断行内节奏 */
const LogDescription = ({ text }: { text: string }) => {
  const parts = text.split(URL_SPLIT);
  return (
    <>
      {parts.map((part, index) =>
        URL_SPLIT.test(part) ? (
          <a
            key={index}
            class="log-link"
            href={part}
            target="_blank"
            rel="noopener noreferrer"
          >
            讨论帖
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
};

const LogEntry = ({ log }: { log: LogItem }) => (
  <article class="log-item">
    <div class="log-meta">
      <div class="log-version">{log.version}</div>
      <div class="log-date">{log.date}</div>
    </div>
    <ul class="log-changes">
      {log.items.map((item, index) => (
        <li key={index}>
          <span class={`log-tag log-tag-${item.type}`}>
            {LOG_TYPES[item.type] ?? "更新"}
          </span>
          <span class="log-description">
            <LogDescription text={item.description} />
          </span>
        </li>
      ))}
    </ul>
  </article>
);

export default component$(() => {
  useStylesScoped$(styles);
  const { value: isExpanded } = useToggle(false);

  const logsResource = useResource$<LogItem[]>(async () => {
    return await fetchReleases();
  });

  return (
    <section class="log section section-divided">
      <div class="container">
        <div class="section-head">
          <div class="section-head-text">
            <h2>更新日志</h2>
            <p>每个版本改了什么，都记在这里。</p>
          </div>
          <a
            class="section-head-action"
            href={`${LINKS.GITHUB}/releases`}
            target="_blank"
            rel="noopener noreferrer"
          >
            全部版本
          </a>
        </div>

        <Resource
          value={logsResource}
          onPending={() => (
            <div class="log-state">
              <span class="spinner" />
              正在读取更新日志
            </div>
          )}
          onRejected={() => <div class="log-state">更新日志读取失败</div>}
          onResolved={(logs) =>
            logs.length === 0 ? (
              <div class="log-state">暂时没有更新记录</div>
            ) : (
              <>
                <div class="log-list">
                  {logs.slice(0, VISIBLE_RELEASES).map((log) => (
                    <LogEntry key={`${log.version}-${log.build}`} log={log} />
                  ))}
                </div>

                {logs.length > VISIBLE_RELEASES && (
                  <div class={`log-more ${isExpanded.value ? "expanded" : ""}`}>
                    <div class="log-more-inner">
                      <div class="log-list">
                        {logs.slice(VISIBLE_RELEASES).map((log) => (
                          <LogEntry
                            key={`${log.version}-${log.build}`}
                            log={log}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {logs.length > VISIBLE_RELEASES && (
                  <ToggleButton
                    isExpanded={isExpanded}
                    expandedText="收起"
                    collapsedText={`展开其余 ${logs.length - VISIBLE_RELEASES} 个版本`}
                    align="start"
                  />
                )}
              </>
            )
          }
        />
      </div>
    </section>
  );
});
