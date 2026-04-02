<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { onMounted, watch, nextTick } from 'vue'

const { Layout } = DefaultTheme
const route = useRoute()
const { frontmatter } = useData()

const updateGiscus = () => {
  // 首页不加载评论
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
  script.setAttribute('data-theme', "preferred_color_scheme")
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

onMounted(() => updateGiscus())
watch(() => route.path, () => nextTick(() => updateGiscus()))
</script>

<template>
  <Layout>
    <template #doc-after>
      <div id="giscus-container" style="margin-top: 3rem;"></div>
    </template>
  </Layout>
</template>