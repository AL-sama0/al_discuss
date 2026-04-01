import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "前端技术论坛",
  description: "基于 VitePress + Giscus 的纯前端论坛",
  // 如果部署在 github.io/repo-name/ 下，记得加 base
  // base: '/al_discuss/', 
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '技术探讨', link: '/guide/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AL-sama0/al_discuss' }
    ]
  }
})
