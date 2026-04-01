import DefaultTheme from 'vitepress/theme'
import MyLayout from './Layout.vue'
import './custom.css' // 如果你以后想写自定义 CSS，可以先留着这一行

export default {
  extends: DefaultTheme,
  // 使用我们自定义的 Layout
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    // 你可以在这里注册全局组件
  }
}