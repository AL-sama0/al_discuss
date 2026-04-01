import DefaultTheme from 'vitepress/theme'
import MyLayout from './Layout.vue'

export default {
  extends: DefaultTheme,
  // 使用我们自定义的 Layout
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    // 你可以在这里注册全局组件
  }
}
