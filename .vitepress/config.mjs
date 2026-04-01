import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "AL Discuss",
  description: "前端技术论坛",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '讨论区', link: 'https://github.com/AL-sama0/al_discuss/discussions' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AL-sama0/al_discuss' }
    ]
  }
})