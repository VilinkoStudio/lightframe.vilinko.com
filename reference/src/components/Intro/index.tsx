import React from 'react'

import Card from 'antd/es/card/Card'
import { introConf } from '../config'

import './intro.scss'

export default function Intro() {
  return (
    <div className="intro">
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
