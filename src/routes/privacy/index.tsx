import { component$, useStyles$ } from "@qwik.dev/core";
import type { DocumentHead } from "@qwik.dev/router";

export default component$(() => {
  useStyles$(`
    .agreement-page {
      padding: 140px 20px 80px;
      max-width: 800px;
      margin: 0 auto;
      color: var(--lf-text-color);
      line-height: 1.8;
    }
    .agreement-page h1 {
      margin-bottom: 40px;
      text-align: center;
    }
    .agreement-page h2 {
      margin: 30px 0 15px;
      font-size: 1.5rem;
    }
    .agreement-page h3 {
      margin: 20px 0 10px;
      font-size: 1.2rem;
    }
    .agreement-page p {
      margin-bottom: 15px;
    }
    .agreement-page ul {
      margin-bottom: 20px;
      padding-left: 20px;
    }
    .agreement-page li {
      margin-bottom: 10px;
    }
  `);

  return (
    <div class="agreement-page">
      <h1>Vilinko Studio 隐私政策</h1>
      <p>初版发布日期：2025 年 8 月 6 日</p>
      <p>最近更新日期：2025 年 8 月 6 日</p>

      <h2>一、引言</h2>
      <p>
        欢迎使用 Vilinko
        Studio（以下简称“我们”）提供的互联网信息技术工具及相关服务。本隐私政策旨在向您说明我们如何收集、使用、存储、保护及披露您的个人信息。
      </p>

      <h2>二、适用范围</h2>
      <p>
        本政策适用于我们提供的所有服务，包括但不限于用户登录系统、论坛服务、个性化定制功能、电脑桌面美化工具、文件解释器等。
      </p>

      <h2>三、我们收集的信息</h2>
      <h3>（一）您主动提供的信息</h3>
      <ul>
        <li>注册信息：手机号码、电子邮箱地址、用户名、密码等。</li>
        <li>服务使用中提交的信息：帖子、评论、上传的图片、设置参数等。</li>
      </ul>
      <h3>（二）我们在您使用服务过程中收集的信息</h3>
      <ul>
        <li>设备信息：设备型号、操作系统、设备标识符等。</li>
        <li>网络信息：IP 地址、网络类型等。</li>
        <li>日志信息：访问时间、操作记录、崩溃日志等。</li>
      </ul>

      <h2>四、我们如何使用信息</h2>
      <ul>
        <li>向您提供并维护服务。</li>
        <li>优化服务体验及排查故障。</li>
        <li>保障服务安全及防范欺诈。</li>
        <li>发送服务相关的通知。</li>
      </ul>

      <h2>五、信息的存储与保护</h2>
      <p>
        您的个人信息存储在中华人民共和国境内的服务器。我们采用加密技术及访问控制机制保护您的信息安全。
      </p>

      <h2>六、您的权利</h2>
      <p>您享有访问、更正、删除个人信息以及注销账号的权利。</p>

      <h2>七、未成年人保护</h2>
      <p>
        我们高度重视未成年人的个人信息保护。未成年人应在监护人的指导下使用我们的服务。
      </p>

      <h2>八、联系我们</h2>
      <p>邮箱：privacy@vilinko.com</p>
    </div>
  );
});

export const head: DocumentHead = {
  title: "隐私政策 - Vilinko Studio",
};
