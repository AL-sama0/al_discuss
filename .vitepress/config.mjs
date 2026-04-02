import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "F.U.C.K. Forum",
  description: "不要只是幻想，去专注、理解、创造并坚持。从输入到输出的完整成长闭环社区。",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '论坛指南', link: '/guide/' },
      { text: '使用指南', link: '/usage-guide' },
      { text: 'FAQ', link: '/faq' },
      {
        text: '分区浏览',
        items: [
          { text: '🎯 Focus - 专注区', link: '/categories/focus/' },
          { text: '💡 Understand - 洞察区', link: '/categories/understand/' },
          { text: '🚀 Create - 创造区', link: '/categories/create/' },
          { text: '💪 Keep - 坚持区', link: '/categories/keep/' }
        ]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '论坛指南',
          items: [
            { text: '欢迎来到 F.U.C.K. Forum', link: '/guide/' }
          ]
        }
      ],
      '/categories/': [
        {
          text: '论坛分区',
          items: [
            { text: '🎯 Focus - 专注区', link: '/categories/focus/' },
            { text: '💡 Understand - 洞察区', link: '/categories/understand/' },
            { text: '🚀 Create - 创造区', link: '/categories/create/' },
            { text: '💪 Keep - 坚持区', link: '/categories/keep/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/AL-sama0/al_discuss' }
    ],
    footer: {
      message: "不要只是幻想，去专注、理解、创造并坚持。",
      copyright: "© 2024 F.U.C.K. Forum | Based on GitHub Discussions"
    }
  }
})