import { component$, useStylesScoped$ } from "@qwik.dev/core";
import { useToggle } from "~/hooks/useToggle";
import { ToggleButton } from "~/components/common/ToggleButton";
import { logs } from "~/data/logs";
import styles from "./log.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const { value: isExpanded } = useToggle(false);

  return (
    <div class="log">
      <div class="container">
        <h2 class="section-title">更新日志</h2>
        <div class="log-content">
          <div class={`log-container ${isExpanded.value ? "expanded" : ""}`}>
            {logs.map((log, index) => (
              <div key={`${log.version}-${index}`} class="log-item">
                <div class="log-header">
                  <div class="log-version">{log.version}</div>
                  <div class="log-date">{log.date}</div>
                </div>
                <h3>{log.title}</h3>
                <ul>
                  {log.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
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
        </div>
      </div>
    </div>
  );
});
