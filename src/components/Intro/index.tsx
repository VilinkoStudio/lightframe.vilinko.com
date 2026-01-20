import React, { useEffect, useRef } from 'react'

import Card from 'antd/es/card/Card'
import { introConf } from '../config'

import './intro.scss'

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);

  // 添加resize事件监听
  useEffect(() => {
    const handleResize = () => {
      if (introRef.current) {
        const viewportWidth = window.innerWidth;
        const style = getComputedStyle(document.documentElement);
        const breakpointSm = parseInt(style.getPropertyValue('--breakpoint-sm'));
        const breakpointXl = parseInt(style.getPropertyValue('--breakpoint-xl'));

        // 调整布局
        if (viewportWidth <= breakpointSm) {
          introRef.current.style.gridTemplateColumns = '1fr';
        } else if (viewportWidth > breakpointSm && viewportWidth <= breakpointXl) {
          introRef.current.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
          introRef.current.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
      }
    };

    // 初始加载时执行一次
    handleResize();
    // 添加事件监听器
    window.addEventListener('resize', handleResize);
    // 组件卸载时移除事件监听器
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="intro" ref={introRef}>
      {introConf.views.map(item => {
        return <Item key={item.word} icon={item.icon} word={item.word} intro={item.intro} />
      })}
    </div>
  )
}

const Item: React.FC<{icon:string[], word:string, intro:string}>=({icon, word, intro})=>{
  var p=0;
  return (
    <Card hoverable className="introItem">
      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" viewBox="0 0 16 16" style={{transform: "translateY(8px)"}}>
        { icon.map(item => <path key={++p} d={item}></path> ) }
      </svg>
      <h3>{word}</h3>
      <span>{intro}</span>
    </Card>
  )
}
