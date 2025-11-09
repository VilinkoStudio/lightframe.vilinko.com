import React from 'react';

import { show } from "../Contributors/Contributors"

import './footer.scss'

export default function Footer(){
  return (
    <div className="footer">
      <div className="about">在一般情况下,运行内存不超过10MB && 相关内容请在应用内查看提示.</div>
      <div style={{fontSize: "13px"}}>
        *将本作品用于非正当用途而造成的后果,责任与本作品无关.
      </div>
      <div className="copyright">
        <a href="https://beian.miit.gov.cn/" target="_blank" style={{color: "white", textDecoration: "none"}}>粤ICP备2025454076号</a><br></br>
        Copyright © 2018&nbsp;-&nbsp;{new Date().getFullYear()} 
        &nbsp;Vilinko&nbsp;Studio. All Rights Reserved.
      </div>
      <div className="btn-container">
          <div className="fooBtn" type="primary" onClick={show}>鸣谢名单</div>
        <a className="fooBtn" href="https://github.com/VilinkoStudio/lightframe.vilinko.com" target="_blank" >
          改进本页面
        </a>
        <br/>
      </div>
    </div>
  )
}
