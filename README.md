# LightFrame

> 以轻量的方式定义自己喜欢的桌面 | Define your favorite desktop in a lightweight way

## 🚀 快速开始

本项目推荐使用 [Bun](https://bun.sh/) 进行开发与构建。

### 安装依赖

```bash
bun install
```

### 本地开发

```bash
# 启动开发服务器 (SSR 模式)
bun dev
```

### 构建与预览

```bash
# 构建生产环境
bun run build

# 预览构建结果
bun run preview
```

## 📁 项目结构

```text
src/
├── components/          # 🎨 UI 组件 (通用组件 common/ 与 业务组件 lightframe/)
├── constants/           # 🔧 配置与静态常量
├── data/                # 📊 业务数据 (如更新日志)
├── hooks/               # 🪝 逻辑复用自定义 Hook
├── services/            # 🔌 API 调用与业务逻辑层
├── routes/              # 🛣️ 页面路由与布局
└── global.css           # 🎨 全局样式系统
```

## 🛠️ 常用指令

- `bun run fmt`: 代码自动格式化 (Prettier)
- `bun run lint`: 代码风格校验 (ESLint)
- `bun run build.types`: 执行 TypeScript 类型检查

---

© 2026 [Vilinko Studio](https://www.vilinko.com)

## Static Site Generator (Node.js)

Be sure to configure your server to serve very long cache headers for the `build/**/*.js` files.

Typically you'd set the `Cache-Control` header for those files to `public, max-age=31536000, immutable`.

```shell
bun build.server
```
