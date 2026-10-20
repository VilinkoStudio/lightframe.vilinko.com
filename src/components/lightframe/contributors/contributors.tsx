import {
  component$,
  useResource$,
  Resource,
  useStylesScoped$,
} from "@qwik.dev/core";
import { contributions } from "~/config";
import { getSponsors, getRecentContributors } from "~/services/api";
import { LINKS } from "~/constants";
import type { SponsorsData } from "~/types";
import { useToggle } from "~/hooks/useToggle";
import { ToggleButton } from "~/components/common/ToggleButton";
import styles from "./contributors.css?inline";

const SPONSOR_PREVIEW = 36;

const NameList = ({ names }: { names: string[] }) => (
  <ul class="name-list">
    {names.map((name) => (
      <li key={name}>{name}</li>
    ))}
  </ul>
);

const SponsorChips = ({ names }: { names: string[] }) => (
  <ul class="name-list name-list-inline">
    {names.map((name) => (
      <li key={name}>{name}</li>
    ))}
  </ul>
);

export default component$(() => {
  useStylesScoped$(styles);
  const { value: sponsorsExpanded } = useToggle(false);

  const sponsorsResource = useResource$<SponsorsData>(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    return await getSponsors(controller);
  });

  const recentContributorsResource = useResource$<string[]>(async () => {
    const names = await getRecentContributors();
    return names.filter((name) => name && !name.includes("还没有"));
  });

  return (
    <section class="contributors section section-divided">
      <div class="container">
        <div class="section-head">
          <div class="section-head-text">
            <h2>贡献者</h2>
            <p>代码、测试、反馈和支持，都算数。</p>
          </div>
          <a
            class="section-head-action"
            href={LINKS.GITHUB}
            target="_blank"
            rel="noopener noreferrer"
          >
            项目仓库
          </a>
        </div>

        <div class="recent">
          <span class="recent-label">最近加入</span>
          <div class="recent-names">
            <Resource
              value={recentContributorsResource}
              onPending={() => <span class="recent-empty">读取中…</span>}
              onRejected={() => (
                <span class="recent-empty">本月暂无新增贡献者</span>
              )}
              onResolved={(names) =>
                names.length === 0 ? (
                  <span class="recent-empty">本月暂无新增贡献者</span>
                ) : (
                  <ul class="name-list name-list-inline">
                    {names.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                )
              }
            />
          </div>
        </div>

        <div class="contributor-groups">
          {contributions.map((group) => (
            <div class="contributor-group" key={group.title}>
              <h3>{group.title}</h3>
              <p class="group-explain">{group.explain}</p>

              {group.source === "sponsors" ? (
                <Resource
                  value={sponsorsResource}
                  onPending={() => <span class="recent-empty">读取中…</span>}
                  onRejected={() => (
                    <span class="recent-empty">赞助者名单读取失败</span>
                  )}
                  onResolved={(data) => (
                    <>
                      <SponsorChips
                        names={
                          sponsorsExpanded.value
                            ? data.names
                            : data.names.slice(0, SPONSOR_PREVIEW)
                        }
                      />
                      {data.names.length > SPONSOR_PREVIEW && (
                        <ToggleButton
                          isExpanded={sponsorsExpanded}
                          expandedText="收起赞助者"
                          collapsedText={`全部 ${data.names.length} 位赞助者`}
                        />
                      )}
                      <p class="group-note">名单更新于 {data.lastUpdate}</p>
                    </>
                  )}
                />
              ) : (
                <NameList names={group.names} />
              )}

              {group.link.text && (
                <div class="group-link">
                  <a
                    href={group.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {group.link.text}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
