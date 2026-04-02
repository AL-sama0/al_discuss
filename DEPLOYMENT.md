# 部署指南

本文档介绍如何将 F.U.C.K. Forum 部署到生产环境。

## 前置条件

1. 已安装 Node.js >= 14
2. 论坛代码已上传到 GitHub
3. GitHub 仓库已启用 Discussions 功能

## 🌐 Vercel 部署（推荐）

Vercel 是部署 VitePress 的最佳选择，完全免费，自动 CI/CD。

### 步骤 1：连接 GitHub

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你的 `al_discuss` 仓库

### 步骤 2：配置项目

Vercel 会自动检测到这是一个 VitePress 项目，预设配置应该是：
- **Framework Preset**: Vue.js (VitePress)
- **Build Command**: `npm run build`
- **Output Directory**: `.vitepress/dist`

直接点击 "Deploy" 即可。

### 步骤 3：部署完成

部署完成后，你会获得一个 `*.vercel.app` 的域名。可以在 Vercel 项目设置中配置自定义域名。

### 自定义域名（可选）

1. 在 Vercel 项目 Settings 中找到 "Domains"
2. 点击 "Add" 输入你的域名
3. 按照说明配置 DNS（通常是 CNAME 记录）
4. 等待 DNS 生效（通常 5-10 分钟）

## 📦 GitHub Pages 部署

如果你想使用 GitHub Pages，需要额外配置。

### 步骤 1：更新配置

编辑 `.vitepress/config.mjs`，添加 base 路径（如果用子目录）：

```javascript
export default defineConfig({
  base: '/',  // 如果用自定义域名
  // 或
  base: '/al_discuss/',  // 如果在 username.github.io/al_discuss
  // ...
})
```

### 步骤 2：创建工作流文件

在 `.github/workflows/deploy.yml` 创建文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # 根据你的分支名更改

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build site
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./.vitepress/dist
```

### 步骤 3：启用 GitHub Pages

1. 进入仓库的 Settings
2. 找到 "Pages" 部分
3. 将 "Source" 设置为 "Deploy from a branch"
4. 选择 "gh-pages" 分支
5. 保存

之后每次推送到 main 分支都会自动部署。

## ☁️ Netlify 部署

Netlify 也是不错的选择，有很好的持续部署支持。

### 步骤 1：连接 GitHub

1. 访问 [netlify.com](https://netlify.com)
2. 使用 GitHub 登录
3. 点击 "Add new site" > "Import an existing project"
4. 选择你的 `al_discuss` 仓库

### 步骤 2：配置构建

- **Build command**: `npm run build`
- **Publish directory**: `.vitepress/dist`

### 步骤 3：部署

点击 "Deploy site"，等待部署完成。

## 🔒 自有服务器部署

如果想自己托管论坛。

### 本地构建

```bash
npm install
npm run build
```

这会在 `.vitepress/dist` 目录生成静态文件。

### 上传到服务器

```bash
# 使用 SCP
scp -r .vitepress/dist/* user@your-server.com:/var/www/forum/

# 或使用 SFTP
sftp user@your-server.com
put -r .vitepress/dist /* /var/www/forum/
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name forum.example.com;
    
    root /var/www/forum;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 缓存设置
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### HTTPS 配置（使用 Let's Encrypt）

```bash
# 使用 Certbot
sudo certbot --nginx -d forum.example.com
```

## 🔄 持续集成/部署 (CI/CD)

### GitHub Actions（免费）

创建 `.github/workflows/build-and-deploy.yml`：

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: forum
          path: .vitepress/dist/
      
      - name: Deploy to Vercel
        uses: BetaHuhn/deploy-to-vercel-action@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

## ✅ 部署检查清单

部署前确保完成以下事项：

- [ ] 最新代码已提交到 GitHub
- [ ] `.vitepress/config.mjs` 配置正确
- [ ] GitHub Discussions 分类已创建
- [ ] Giscus 参数已更新（repoId, categoryIds）
- [ ] README 已更新（包含部署后的 URL）
- [ ] 自定义域名配置完成（如适用）
- [ ] DNS 已生效
- [ ] HTTPS 已启用（如自有服务器）

## 🔧 部署后配置

### 1. 配置 GitHub Discussions

1. 进入仓库的 "Discussions" 标签
2. 创建四个分类：
   - Focus - 专注区
   - Understand - 洞察区
   - Create - 创造区
   - Keep - 坚持区
3. 记录每个分类的 ID
4. 更新 `.vitepress/theme/Layout.vue` 中的配置

### 2. 测试评论功能

在任何分区页面下方测试 Giscus 评论是否正常工作。

### 3. 配置域名邮件（可选）

如果你有自定义域名，可以配置邮件通知。

## 📊 监控和维护

### 监控网站性能

- 使用 [Vercel Analytics](https://vercel.com/analytics) 监控性能
- 使用 [Google Analytics](https://analytics.google.com) 跟踪流量

### 定期备份

虽然 GitHub 仓库本就是备份，但建议定期备份讨论内容：

```bash
# 导出 GitHub Discussions（需要使用 GitHub CLI）
gh api graphql -f query='query{repository(owner:"USERNAME", name:"REPO"){discussions(first:100){nodes{id title body}}}}'
```

## 🆘 常见部署问题

### Q：部署后页面显示 404
**A：** 检查 `base` 配置是否正确，特别是在使用子目录时。

### Q：Giscus 评论不显示
**A：** 确认已创建 Discussion 分类，且参数配置正确。

### Q：构建失败
**A：** 查看构建日志，通常是依赖问题。尝试：
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Q：域名 DNS 不生效
**A：** DNS 传播需要时间（通常 24 小时）。可使用 [whatsmydns.net](https://whatsmydns.net) 检查。

## 📞 获取帮助

- Vercel 文档：https://vercel.com/docs
- VitePress 文档：https://vitepress.dev/
- GitHub Discussions：https://docs.github.com/en/discussions

---

部署遇到问题？在 GitHub Issues 中报告或在论坛的 Keep 区讨论！

