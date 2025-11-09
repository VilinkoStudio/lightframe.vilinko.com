// TODO 设计一个新的 Contributors 组件
// 现在是用旧的解决方案，代码在 index.html 下方

import React, { useState, useEffect } from "react";


import { contributions } from "../config";

import "./contributors.scss";

// 获取赞助者数据的函数
export const getSponsorsData = async (signal?: AbortSignal): Promise<{names: string[], lastUpdate: string}> => {
  console.log('FETCH', 'https://api.vilinko.com/sponsors/all');
  const response = await fetch('https://api.vilinko.com/sponsors/all', {
    signal,
  });
  console.log('FETCH resolved');
  const data = await response.text();
  const res = JSON.parse(data);
  
  if (res != undefined && res.code == 200) {
    const t: string[] = [];     //用于存放默认名字的数组
    const r: string[] = res.data.sponsors
      .sort()
      .filter((item: string) => {
        if (item.startsWith("爱发电用户_")) {
          t.push("@" + item);
          return false;
        }
        return true;
      })
      .map((item: string) => "@" + item);

    r.reverse();
    r.push(...t);
    
    return {
      names: r,
      lastUpdate: res.data.date
    };
  }
  console.log(data);
  throw "无法获取赞助者名单_错误的响应";
};

function Return({ onClick }) {
  const icon = (
    <svg
      width="32"
      height="32"
      t="1660364149036"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1325"
    >
      <path
        d="M393.390114 512.023536l347.948667-336.348468c20.50808-19.85828 20.50808-51.997258 0-71.792093-20.507056-19.826558-53.778834-19.826558-74.28589 0L281.990954 476.135164c-20.476357 19.826558-20.476357 51.981908 0 71.746044l385.061936 372.236839c10.285251 9.91379 23.728424 14.869662 37.173644 14.869662 13.446243 0 26.889417-4.956895 37.112246-14.901385 20.50808-19.826558 20.50808-51.919487 0-71.746044L393.390114 512.023536"
        p-id="1326"
        fill="#141414"
      ></path>
    </svg>
  );

  return (
    <div className="return">
      <div onClick={onClick}>{icon}</div>
    </div>
  );
}
function Content() {
  return contributions.map((content, index) => {
    const isSponsors = content.title === "赞助者";
    
    if (isSponsors) {
      return <SponsorContent content={content} />;
    }
    
    return (
      /* 解决 React 的 key 警告问题 */
      <React.Fragment key={index}>
        <div className="content">
          <div className="sidebar">
            <div className="explain">{content.explain}</div>
            <span onClick={() => window.open(content.link.href)}>
              <strong>{content.link.text}</strong>
            </span>
          </div>
          <div className="body">
            <div className="title">{content.title}</div>
            <div className="text">
              {content.names.map((item, idx) => <div key={`name-${idx}`}>{item}</div>)}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  });
}

interface SponsorContentProps {
  content: any;
}

function SponsorContent({ content }: SponsorContentProps) {
  const [sponsorsData, setSponsorsData] = useState<{names: string[], lastUpdate: string} | null>(null);
  const [sponsorsLoaded, setSponsorsLoaded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    
    const loadSponsors = async () => {
      try {
        const data = await getSponsorsData(controller.signal);
        setSponsorsData(data);
        setSponsorsLoaded(true);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('加载赞助者数据失败:', error);
          setSponsorsData({names: ["加载失败"], lastUpdate: ""});
          setSponsorsLoaded(true);
        }
      }
    };
    
    loadSponsors();
    
    return () => {
      controller.abort();
    };
  }, []);

  const names = sponsorsLoaded ? (sponsorsData?.names || []) : content.names;

  return (
    <React.Fragment>
      {sponsorsLoaded ? (
        <div className="content">
          <div className="sidebar">
            <div className="explain">
              {content.explain}{sponsorsData?.lastUpdate ? `（非默认名字按照字符顺序排列😃，最后一次更新：${sponsorsData.lastUpdate}）` : ""}
            </div>
            <span onClick={() => window.open(content.link.href)}>
              <strong>{content.link.text}</strong>
            </span>
          </div>
          <div className="body">
            <div className="title">{content.title}</div>
            <div className="text">
              {names.map((item, idx) => <div key={idx}>{item}</div>)}
            </div>
          </div>
        </div>
      ) : (
        <div className="content">
          <div className="sidebar">
            <div className="explain">{content.explain}</div>
            <span onClick={() => window.open(content.link.href)}>
              <strong>{content.link.text}</strong>
            </span>
          </div>
          <div className="body">
            <div className="title">{content.title}</div>
            <div className="text">
              <div>加载中...</div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}


const hide = () => {
  // setModalVisible(false);
  const overlay = document.querySelector(".overlay") as HTMLElement;
  overlay.style.transform = "translateX(-100%)";
  document.body.style.overflow = "auto"; // scrollbar
};
export const show = () => {
  // setModalVisible(true);
  const overlay = document.querySelector(".overlay") as HTMLElement;
  overlay.style.transform = "translateX(0)";
  document.body.style.overflow = "hidden"; // scrollbar
};

const Contributors = () => {
  // const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <div
        style={{
          transform: "translateX(-100%)",
        }}
        className="overlay"
      >
        <Return onClick={hide} />
        <Content />
      </div>
    </>
  );
};

export default Contributors;
