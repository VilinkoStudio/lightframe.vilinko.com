/**
 * 现代布局使用示例
 * 展示如何使用新的响应式系统替代传统的 max-width 媒体查询
 */

import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="modern-layout-demo">
      {/* 流体容器示例 */}
      <section class="py-lg">
        <div class="fluid-container">
          <h2 class="text-2xl text-center my-md">流体容器示例</h2>
          <div class="responsive-grid">
            <div class="modern-card">
              <h3 class="text-lg">卡片 1</h3>
              <p class="text-sm">这个卡片会根据容器宽度自动调整布局</p>
            </div>
            <div class="modern-card">
              <h3 class="text-lg">卡片 2</h3>
              <p class="text-sm">无需使用 @media 查询</p>
            </div>
            <div class="modern-card">
              <h3 class="text-lg">卡片 3</h3>
              <p class="text-sm">自动响应容器大小变化</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flexbox 响应式布局示例 */}
      <section class="py-lg">
        <div class="fluid-container">
          <h2 class="text-2xl text-center my-md">Flexbox 响应式布局</h2>
          <div class="responsive-flex flex-center">
            <button class="btn btn-primary">按钮 1</button>
            <button class="btn btn-secondary">按钮 2</button>
            <button class="btn">按钮 3</button>
            <button class="btn btn-sm">小按钮</button>
            <button class="btn btn-lg">大按钮</button>
          </div>
        </div>
      </section>

      {/* 容器查询示例 */}
      <section class="py-lg">
        <div class="fluid-container">
          <h2 class="text-2xl text-center my-md">容器查询示例</h2>
          <div class="container-query" style="max-width: 600px; margin: 0 auto;">
            <div class="grid-auto-fit gap-md">
              <div class="modern-card">
                <h3 class="text-lg">容器响应</h3>
                <p class="text-sm">这些卡片会根据父容器宽度重新排列</p>
                <p class="text-xs">
                  当容器宽度小于 480px 时会变成单列布局
                </p>
              </div>
              <div class="modern-card">
                <h3 class="text-lg">自适应间距</h3>
                <p class="text-sm">所有间距都使用 clamp() 函数</p>
                <p class="text-xs">确保在各种屏幕尺寸下都有良好的视觉效果</p>
              </div>
              <div class="modern-card">
                <h3 class="text-lg">现代字体</h3>
                <p class="text-sm">字体大小使用流体单位</p>
                <p class="text-xs">从 12px 到 48px 平滑过渡</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 实际使用示例：重构前的 main 组件替代方案 */}
      <section class="py-lg">
        <div class="fluid-container">
          <h2 class="text-2xl text-center my-md">现代主页布局示例</h2>
          
          {/* 替代原来的 groundPlace */}
          <div class="grid-center min-h-screen py-lg">
            <div class="modern-card max-w-2xl text-center">
              <h1 class="text-2xl my-md">
                轻框 | LightFrame
              </h1>
              <p class="text-md my-md">
                使用现代 CSS Grid 和 Flexbox 构建的响应式布局
              </p>
              
              {/* 按钮容器 - 替代原来的 body-button-container */}
              <div class="responsive-flex flex-center gap-md">
                <button class="btn btn-primary btn-lg">
                  下载应用
                </button>
                <button class="btn btn-secondary btn-lg">
                  支持项目
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 展示如何在实际项目中使用 */}
      <section class="py-lg">
        <div class="fluid-container">
          <h2 class="text-2xl text-center my-md">实际项目应用指南</h2>
          
          <div class="grid-auto-fit gap-lg">
            <div class="modern-card">
              <h3 class="text-lg">1. 替换容器</h3>
              <pre class="text-xs bg-gray-100 p-sm rounded-sm my-sm">
{`<!-- 旧方式 -->
<div class="container" style="max-width: 1200px;">

<!-- 新方式 -->
<div class="fluid-container">`}
              </pre>
            </div>
            
            <div class="modern-card">
              <h3 class="text-lg">2. 使用流体间距</h3>
              <pre class="text-xs bg-gray-100 p-sm rounded-sm my-sm">
{`/* 旧方式 */
padding: 20px;
margin: 0 15px;

/* 新方式 */
padding: var(--spacing-md);
margin: 0 var(--spacing-sm);
/* 或使用工具类 */
class="p-md mx-sm"`}
              </pre>
            </div>
            
            <div class="modern-card">
              <h3 class="text-lg">3. 替换媒体查询</h3>
              <pre class="text-xs bg-gray-100 p-sm rounded-sm my-sm">
{`/* 旧方式 */
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
}

/* 新方式 - 容器查询 */
.grid-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}`}
              </pre>
            </div>
            
            <div class="modern-card">
              <h3 class="text-lg">4. 流体字体</h3>
              <pre class="text-xs bg-gray-100 p-sm rounded-sm my-sm">
{`/* 旧方式 */
font-size: 24px;
@media (max-width: 768px) { font-size: 18px; }

/* 新方式 */
font-size: clamp(18px, 4vw, 24px);
/* 或使用工具类 */
class="text-lg"`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});