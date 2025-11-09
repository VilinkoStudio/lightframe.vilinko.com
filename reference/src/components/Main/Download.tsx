import { Modal, Button, Checkbox } from 'antd'
import React, { useState } from 'react'

import './download.scss'

function Download() {
  const [visible, setVisible] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const showModal = () => {
    // 添加错误处理，防止API调用失败导致应用崩溃
    try {
      fetch('https://api.vilinko.com/counter/add?id=1').catch(err => console.log('统计请求失败:', err));
    } catch (e) {
      console.log('统计调用错误:', e);
    }
    setVisible(true);
    setAgreedToTerms(false); // 重置复选框状态
    // document.body.style.overflow = "auto";
  };

const downloadLink = (url, text) => (
  <Button 
    onClick={() => {
      // 添加错误处理，防止API调用失败导致应用崩溃
      try {
        fetch('https://api.vilinko.com/counter/add?id=1').catch(err => console.log('统计请求失败:', err));
      } catch (e) {
        console.log('统计调用错误:', e);
      }

      // 执行下载链接
      window.location.href = url;
      try {
        fetch('https://api.vilinko.com/counter/add?id=1').catch(err => console.log('统计请求失败:', err));
      } catch (e) {
        console.log('统计调用错误:', e);
      }
    }}
    disabled={!agreedToTerms}
  >
    {text}
  </Button>
);

  return (
    <>
      <Button className="download-btn" type="text" onClick={showModal}>
        下载
      </Button>
      <Modal
        title="下载"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[]}
      >
        {downloadLink('/Update/LightFrame.zip', 'LightFrame Windows x64 (推荐)')}
        {downloadLink('/Update/Compatible/x86/LightFrame.zip', 'LightFrame Windows - x86')}
        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#999', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Checkbox 
            checked={agreedToTerms} 
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            style={{ marginRight: '8px', transform: 'scale(0.9)' }}
            checkedColor="rgb(146,168,255)"
          />
          <span style={{ fontSize: '12px', color: '#999' }}>
            在使用前您需要阅读并同意我们的
            <a href="https://docs.vilinko.com/agreement/tos.html" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(146,168,255)', margin: '0 4px' }}>《服务条款》</a>
            和
            <a href="https://docs.vilinko.com/agreement/privacy.html" target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(146,168,255)', margin: '0 4px' }}>《隐私政策》</a>
          </span>
        </div>
      </Modal>
    </>
  );
}

export default Download;
