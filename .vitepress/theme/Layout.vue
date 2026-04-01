<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { onMounted, watch, nextTick } from 'vue'

const { Layout } = DefaultTheme
const { route, frontmatter } = useData()

// 这里的函数用于初始化和更新 Giscus 评论区
const updateGiscus = () => {
  // 如果是首页 (layout: home)，通常不显示评论区
  if (frontmatter.value.layout === 'home') return

  const script = document.createElement('script')
  script.src = "https://giscus.app/client.js"
  script.setAttribute('data-repo', "AL-sama0/al_discuss")
  script.setAttribute('data-repo-id', "R_kgDOR2vl7Q")
  script.setAttribute('data-category-id', "DIC_kwDOR2vl7c4C5wvU")
  script.setAttribute('data-mapping', "pathname")
  script.setAttribute('data-strict', "0")
  script.setAttribute('data-reactions-enabled', "1")
  script.setAttribute('data-emit-metadata', "0")
  script.setAttribute('data-input-position', "top")
  script.setAttribute('data-theme', "transparent_dark") // 你可以改成 light 或 dark
  script.setAttribute('data-lang', "zh-CN")
  script.setAttribute('data-loading', "lazy")
  script.setAttribute('crossorigin', "anonymous")
  script.async = true

  const container = document.querySelector('#giscus-container')
  if (container) {
    container.innerHTML = ''
    container.appendChild(script)
  }
}

onMounted(() => {
  updateGiscus()
})

// 路由变化时重新加载评论区
watch(
  () => route.path,
  () => nextTick(() => updateGiscus())
)
</script>

<template>
  <Layout>
    <template #doc-after>
      <div id="giscus-container" style="margin-top: 3rem; border-top: 1px solid var(--vp-c-divider); padding-top: 2rem;"></div>
    </template>
  </Layout>
</template>