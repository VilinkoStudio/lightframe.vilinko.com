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
      <h1>Vilinko Studio 软件服务条款</h1>
      <p>初版发布日期：2025 年 8 月 6 日</p>
      <p>最近更新日期：2025 年 8 月 6 日</p>
      <p>
        感谢您使用 Vilinko Studio
        软件。使用我们的服务即表示您已同意本条款。我们始终在不断更改和改进我们的服务。我们可能会增加或删除功能，也可能暂停或彻底停止某项服务。您可以随时停止使用我们的服务，我们也可以随时对我们的服务增加新的限制。如果不同语言的
        Vilinko Studio 软件服务条款出现歧义，以简体中文版为准。
      </p>

      <h2>一、协议接受与范围</h2>
      <ul>
        <li>
          本协议是您（用户）与 Vilinko Studio（以下简称 "我们"）之间关于使用
          Vilinko Studio 提供的各类互联网信息技术工具及相关服务（以下简称
          "服务"）所订立的具有法律效力的协议。
        </li>
        <li>
          服务包括但不限于：用户登录系统、论坛服务、个性化定制功能、电脑桌面美化工具、文件解释器及其他由
          Vilinko Studio 开发并提供的软件服务。
        </li>
        <li>
          您在使用 Vilinko Studio
          任何服务前，应仔细阅读并理解本协议。一旦您使用或访问 Vilinko Studio
          的任何服务，即表示您已接受并同意本协议的全部条款和条件。
        </li>
      </ul>

      <h2>二、服务说明与使用规范</h2>
      <ul>
        <li>
          2.1 Vilinko Studio
          提供的服务可能包含免费服务和付费服务，具体以服务实际提供情况为准。
        </li>
        <li>
          2.2
          您应按照服务的既定功能和使用说明合理使用各项服务，不得利用服务进行任何违法违规活动。
        </li>
        <li>
          2.3
          您不得对服务进行反向工程、反向编译、反汇编或其他类似行为，除非法律法规另有明确规定。
        </li>
        <li>
          2.4 您不得未经授权使用、复制、传播、修改 Vilinko Studio
          提供的任何软件、代码、文本、图像、音频、视频等内容。
        </li>
      </ul>

      <h2>三、用户账号与安全</h2>
      <ul>
        <li>
          3.1
          使用部分服务可能需要注册账号，您应提供真实、准确、完整的注册信息，并及时更新。
        </li>
        <li>
          3.2
          您应对自己的账号和密码安全负责，不得向任何第三方泄露。因账号被盗用或密码泄露导致的损失，由您自行承担，除非该损失是由于
          Vilinko Studio 的故意或重大过失造成。
        </li>
        <li>
          3.3 如发现账号异常使用，您应立即通知我们，并采取必要的安全措施。
        </li>
        <li>
          3.4
          您同意，我们有权根据合理怀疑，在必要时暂停或终止涉嫌违规的账号使用。
        </li>
      </ul>

      <h2>四、知识产权条款</h2>
      <ul>
        <li>
          4.1 Vilinko Studio
          拥有其提供的所有软件、服务、网站内容（包括但不限于文字、图像、音频、视频、代码等）的全部知识产权，除非另有明确声明。
        </li>
        <li>
          4.2 部分 Vilinko Studio 软件及相关内容在 GitHub
          等平台开源，遵循相应的开源协议（如 MIT、GPL 等）。
        </li>
      </ul>

      <h2>五、隐私保护</h2>
      <p>
        5.1
        我们尊重并保护用户的隐私，收集和使用用户信息将遵循相关法律法规和《隐私政策》的规定。
      </p>

      <h2>六、免责声明</h2>
      <p>
        6.1 您理解并同意，服务按 "现状"
        提供，我们不保证服务无瑕疵、不间断或完全安全。
      </p>

      <h2>七、服务的变更、中断与终止</h2>
      <p>7.1 我们保留随时变更、暂停或终止部分或全部服务的权利。</p>

      <h2>八、法律适用与争议解决</h2>
      <p>
        8.1 本协议的订立、效力、解释、履行及争议解决均适用中华人民共和国法律。
      </p>
    </div>
  );
});

export const head: DocumentHead = {
  title: "服务条款 - Vilinko Studio",
};
