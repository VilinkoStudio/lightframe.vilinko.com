import { component$, useResource$, Resource, useSignal } from "@builder.io/qwik";
import { contributions } from "~/config";
import { getSponsors, getRecentContributors } from "~/services/api";
import { useToggle } from "~/hooks/useToggle";
import { ToggleButton } from "~/components/common/ToggleButton";
import type { SponsorsData } from "~/types";
import "./contributors.css";

export default component$(() => {
  const { value: isExpanded } = useToggle(false);

  // 赞助者资源
  const sponsorsResource = useResource$<SponsorsData>(({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    return getSponsors(controller);
  });

  // 最近贡献者资源
  const recentContributorsResource = useResource$<string[]>(() => {
    return getRecentContributors(5);
  });

    const buttonRef = useSignal<Element>();

  return (
    <div class="contributors">
      <div class="container">
        <h2 ref={buttonRef} class="section-title">贡献者</h2>

        {/* 最近贡献者 */}
        <div class="recent-contributors">
          <h3>最近贡献者</h3>
          <Resource
            value={recentContributorsResource}
            onPending={() => (
              <div class="recent-list">
                <div class="loading-recent">加载中...</div>
              </div>
            )}
            onRejected={() => (
              <div class="recent-list">
                <span class="contributor-name highlight empty">呜呜呜，还没有～</span>
              </div>
            )}
            onResolved={(names) => (
              <div class="recent-list">
                {names.length === 1 && names[0] === "呜呜呜，还没有～" ? (
                  <span class="contributor-name highlight empty">呜呜呜，还没有～</span>
                ) : (
                  names.map((name, index) => (
                    <span key={index} class="contributor-name highlight">{name}</span>
                  ))
                )}
              </div>
            )}
          />
        </div>

        {/* 详细贡献者信息 */}
        <div class={`contributors-container ${isExpanded.value ? 'expanded' : ''}`}>
          <div class="contributors-grid">
            {contributions.map((group) => (
              <div key={group.title} class="contributor-group">
                <h3>{group.title}</h3>
                <p>{group.explain}</p>
                {group.title === "赞助者" ? (
                  <Resource
                    value={sponsorsResource}
                    onPending={() => <div class="loading">加载中...</div>}
                    onRejected={() => (
                      <div class="sponsor-list">
                        <span class="contributor-name">加载失败</span>
                      </div>
                    )}
                    onResolved={(data) => (
                      <div class="sponsor-list">
                        <div class="sponsor-explain">
                          {group.explain}（非默认名字按照字符顺序排列😃，最后一次更新：{data.lastUpdate}）
                        </div>
                        {data.names.map((name, index) => (
                          <span key={index} class="contributor-name">{name}</span>
                        ))}
                      </div>
                    )}
                  />
                ) : (
                  <div class="contributor-list">
                    {group.names.map((name, index) => (
                      <span key={index} class="contributor-name">{name}</span>
                    ))}
                  </div>
                )}
                {group.link.text && (
                  <div class="contribution-link">
                    <a href={group.link.href} target="_blank" rel="noopener noreferrer">
                      {group.link.text}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 展开/收起按钮 */}
        <ToggleButton
          isExpanded={isExpanded}
          expandedText="收起详情"
          collapsedText="查看全部贡献者"
          class="contributors-toggle"
          buttonRef={buttonRef}
        />
      </div>
    </div>
  );
});
