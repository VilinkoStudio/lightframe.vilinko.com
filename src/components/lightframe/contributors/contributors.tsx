import {
  component$,
  useResource$,
  Resource,
  useStylesScoped$,
} from "@qwik.dev/core";
import { contributions } from "~/config";
import { getSponsors, getRecentContributors } from "~/services/api";
import { useToggle } from "~/hooks/useToggle";
import { ToggleButton } from "~/components/common/ToggleButton";
import type { SponsorsData } from "~/types";
import styles from "./contributors.css?inline";

const LoadingState = () => <div class="loading">加载中...</div>;
const ErrorState = ({ message }: { message: string }) => (
  <span class="contributor-name empty">{message}</span>
);

const ContributorNames = ({
  names,
  highlight = false,
}: {
  names: string[];
  highlight?: boolean;
}) => (
  <>
    {names.map((name, index) => (
      <span
        key={index}
        class={`contributor-name ${highlight ? "highlight" : ""}`}
      >
        {name}
      </span>
    ))}
  </>
);

const SponsorsList = ({
  data,
  explain,
}: {
  data: SponsorsData;
  explain: string;
}) => (
  <div class="sponsor-list">
    <div class="sponsor-explain">
      {explain}（非默认名字按照字符顺序排列😃，最后一次更新：{data.lastUpdate}）
    </div>
    <ContributorNames names={data.names} />
  </div>
);

const ContributorList = ({ names }: { names: string[] }) => (
  <div class="contributor-list">
    <ContributorNames names={names} />
  </div>
);

export default component$(() => {
  useStylesScoped$(styles);

  const { value: isExpanded } = useToggle(false);

  const sponsorsResource = useResource$<SponsorsData>(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    return await getSponsors(controller);
  });

  const recentContributorsResource = useResource$<string[]>(async () => {
    return await getRecentContributors();
  });

  return (
    <div class="contributors">
      <div class="container">
        <h2 class="section-title">贡献者</h2>

        <div class="recent-contributors">
          <h3>最近</h3>
          <div class="recent-list">
            <Resource
              value={recentContributorsResource}
              onPending={LoadingState}
              onRejected={() => <ErrorState message="呜呜呜，还没有～" />}
              onResolved={(names) =>
                names.length === 1 && names[0] === "呜呜呜，还没有～" ? (
                  <ErrorState message="呜呜呜，还没有～" />
                ) : (
                  <ContributorNames names={names} highlight />
                )
              }
            />
          </div>
        </div>

        <div
          class={`contributors-container ${isExpanded.value ? "expanded" : ""}`}
        >
          <div class="contributors-grid">
            {contributions.map((group) => (
              <div key={group.title} class="contributor-group modern-card">
                <h3>{group.title}</h3>
                <p>{group.explain}</p>

                {group.title === "赞助者" ? (
                  <Resource
                    value={sponsorsResource}
                    onPending={LoadingState}
                    onRejected={() => <ErrorState message="加载失败" />}
                    onResolved={(data) => (
                      <SponsorsList data={data} explain={group.explain} />
                    )}
                  />
                ) : (
                  <ContributorList names={group.names} />
                )}

                {group.link.text && (
                  <div class="contribution-link">
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

        <ToggleButton
          isExpanded={isExpanded}
          expandedText="收起详情"
          collapsedText="查看全部贡献者"
          class="contributors-toggle"
        />
      </div>
    </div>
  );
});
