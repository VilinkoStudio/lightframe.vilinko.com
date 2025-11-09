import React, { useState, useRef } from 'react';

import "./index.scss";
import { show } from '../Contributors/Contributors';
import { sponsor } from './data';

export default function Acknowledgement() {
  //前者是
  const [display, setDisplay] = useState(true);
  const [updated, setUpdated] = useState(false);
  sponsor.update().then((i) => { i == updated ? {} : setUpdated(i) });


  function Title() {
    return <div className="title">
      🎉 感谢每一个留下足迹的小伙伴!
    </div>;
  }

  function Closer() {
    return <div className="closer" onClick={() => setDisplay(false)}>&times;</div>
  }

  function Content() {
    const mask = useRef(null);


    return <div className="content">
      <div className="title">{sponsor.title}</div>
      <div>
        <div className="names" onScroll={(e) => {
          //滚动到底部的时候这遮罩要消失（虽然视觉不明显，但是还是尽量完善qwq）
          const { scrollTop, scrollHeight, clientHeight } = e.target;
          if (scrollTop + clientHeight >= scrollHeight - 10) {
            mask.current.style.display = "none";
          } else {
            mask.current.style.display = "block";
          }
        }}>{sponsor.names.map((item, index) => <span key={index}>@{item}</span>)}</div>
        <div className="mask" ref={mask}></div>
      </div>

      <div className="contributors" onClick={show}>鸣谢名单</div>
    </div>;

  }


  return display && updated ? (
    <div className="acknowledgement">
      <div className="header">
        <Title />
        <Closer />
      </div>
      <Content />
    </div>
  ) : <></>;
}
