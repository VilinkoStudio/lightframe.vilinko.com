import React from "react";

import { Button } from "antd"
import { HeartFilled } from "@ant-design/icons"

import Download from "./Download"

import './main.scss'

export default function Main() {

  return (
    <div className="groundPlace">
      <Body />
    </div>
  )
}


const Body = () => {
  return (
    <div className="body-container">
      <div className="body-content">
        <span className="body-title">
          以轻量的方式定义自己喜欢的桌面
        </span>
        <br />
        <div className="body-button-container">
          <Download />
          <Button
            type="text"
            className="body-button support-btn"
            onClick={() => window.open("https://afdian.com/@EnderMo")}
          >
            <HeartFilled style={{ color: "rgb(233,233,233)" }} />
            支持一下
          </Button>
        </div>
      </div>
    </div>
  )
};
