<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { onMounted, watch, nextTick } from 'vue'

const { Layout } = DefaultTheme
const { route } = useData()

// 这里的函数用于动态插入 Giscus 脚本，确保切换页面时评论区能重新加载
const updateGiscus = () => {
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
  script.setAttribute('data-theme', "catppuccin_latte")
  script.setAttribute('data-lang', "zh-CN")
  script.setAttribute('data-loading', "lazy")
  script.setAttribute('crossorigin', "anonymous")
  script.async = true

  // 先清空旧的评论区，再插入新的
  const container = document.querySelector('#giscus-container')
  if (container) {
    container.innerHTML = ''
    container.appendChild(script)
  }
}

onMounted(() => {
  updateGiscus()
})

// 监听路由变化，切换文章时自动更新评论区
watch(
  () => route.path,
  () => nextTick(() => updateGiscus())
)
</script>

<template>
  <Layout>
    <template #doc-after>
      <div id="giscus-container" style="margin-top: 3rem;"></div>
    </template>
  </Layout>
</template>
