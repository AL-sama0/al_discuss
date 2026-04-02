# 🚀 快速启动指南

欢迎使用 **F.U.C.K. Forum**！本指南将帮助你快速启动和配置论坛。

## 📋 前置要求

- Node.js >= 14
- npm 或 yarn
- GitHub 账号（用于 Discussions）
- Git（可选，但推荐）

## 🎯 快速开始

### 第 1 步：克隆或下载项目

```bash
# 使用 Git 克隆
git clone https://github.com/AL-sama0/al_discuss.git
cd al_discuss

# 或直接下载 ZIP 文件并解压
```

### 第 2 步：安装依赖

```bash
npm install
```

### 第 3 步：启动开发服务器

```bash
npm run dev
```

然后在浏览器中打开 `http://localhost:5173` 查看论坛。

### 第 4 步：做出你的第一个更改

编辑根目录的 `index.md` 来自定义首页内容。保存后，浏览器会自动刷新！

## 🔧 主要命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（热重载） |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |

## 📁 项目结构

```
.
├── index.md              # 首页内容
├── guide/                # 论坛指南
│   └── index.md
├── categories/           # 四个分区
│   ├── focus/
│   ├── understand/
│   ├── create/
│   └── keep/
├── usage-guide.md        # 使用指南
├── faq.md                # 常见问题
├── .vitepress/
│   ├── config.mjs        # VitePress 配置 👈 关键配置文件
│   └── theme/            # 主题文件
├── package.json
└── README.md
```

## ⚙️ 关键配置

### 1. 配置论坛信息

编辑 `.vitepress/config.mjs`：

```javascript
export default defineConfig({
  title: "F.U.C.K. Forum",                    // 论坛标题
  description: "...",                         // 论坛描述
  themeConfig: {
    nav: [ /* 导航菜单 */ ],
    socialLinks: [
      { icon: 'github', link: '...' }        // GitHub 链接
    ]
  }
})
```

### 2. 配置 GitHub Discussions

论坛使用 Giscus 集成 GitHub Discussions。需要配置的参数在 `.vitepress/theme/Layout.vue` 中：

```javascript
script.setAttribute('data-repo', "YOUR_USERNAME/YOUR_REPO")
script.setAttribute('data-repo-id', "YOUR_REPO_ID")
script.setAttribute('data-category-id', "YOUR_CATEGORY_ID")
```

**如何获取这些 ID？**

1. 访问 [Giscus 配置页面](https://giscus.app/)
2. 输入你的 GitHub 用户名和仓库名
3. 复制生成的配置参数
4. 粘贴到 `Layout.vue` 中

## 🌐 部署

### 部署到 Vercel（推荐）

最简单的方式是使用 Vercel：

1. Push 你的代码到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"，选择你的 GitHub 仓库
4. Vercel 会自动检测到这是 VitePress 项目
5. 点击 "Deploy"，完成！

### 部署到其他平台

VitePress 生成静态文件，可以部署到任何静态托管服务：
- GitHub Pages
- Netlify
- AWS S3
- 自有服务器

构建命令：
```bash
npm run build
# 生成的静态文件在 .vitepress/dist/ 目录
```

## 📝 自定义论坛

### 更换论坛名称

1. 编辑 `index.md` - 更改首页的 `hero.name`
2. 编辑 `.vitepress/config.mjs` - 更改 `title` 字段
3. 编辑 `README.md` - 更新项目说明

### 修改分区

每个分区对应一个 Markdown 文件：
- `categories/focus/index.md`
- `categories/understand/index.md`
- `categories/create/index.md`
- `categories/keep/index.md`

编辑这些文件来自定义分区内容。

### 添加新页面

1. 创建新的 `.md` 文件，例如 `blog.md`
2. 在 `config.mjs` 的 `nav` 中添加链接
3. VitePress 会自动生成路由

## 🎨 主题定制

VitePress 默认使用自带的 Light/Dark 主题。如果想要更深层的自定义：

1. 编辑 `.vitepress/theme/Layout.vue` 的 `<style>` 部分
2. 或在 `config.mjs` 中的 `themeConfig` 中调整颜色

### 修改主题色

在 `config.mjs` 中添加：

```javascript
themeConfig: {
  // ... 其他配置
  outline: 'deep',                           // 目录深度
  search: {
    provider: 'local'                         // 本地搜索
  }
}
```

## 🐛 常见问题

### Q：本地开发时刷新页面出现 404？
**A：** 确保 `.vitepress/config.mjs` 中的路由配置正确。检查文件名是否与链接匹配。

### Q：为什么 GitHub Discussions 评论不显示？
**A：** 检查 `Layout.vue` 中的 `data-repo`, `data-repo-id`, `data-category-id` 是否正确。

### Q：如何添加自定义样式？
**A：** 编辑 `.vitepress/theme/Layout.vue` 的 `<style>` 部分，或创建全局 CSS 文件。

### Q：如何添加搜索功能？
**A：** VitePress 内置了搜索功能。要启用本地搜索，在 `config.mjs` 中配置：
```javascript
search: { provider: 'local' }
```

## 🚀 接下来做什么？

1. ✅ 在本地启动开发服务器
2. ✅ 尝试编辑 `index.md` 查看效果
3. ✅ 配置 GitHub Discussions 参数
4. ✅ 自定义论坛名称和内容
5. ✅ 部署到 Vercel
6. ✅ 邀请第一批用户加入讨论

## 📚 深入学习

- [VitePress 官方文档](https://vitepress.dev/)
- [Giscus 文档](https://giscus.app/#configuration)
- [GitHub Discussions 指南](https://docs.github.com/en/discussions)

## 💬 获取帮助

- 报告 Bug：[GitHub Issues](https://github.com/AL-sama0/al_discuss/issues)
- 提出建议：在论坛的 Keep 区发起讨论
- 贡献代码：欢迎 Pull Requests

---

**准备好了吗？运行 `npm run dev` 开始吧！** 🎉

