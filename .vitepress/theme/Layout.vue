<script setup lang="ts">
import Giscus from "@giscus/vue";

import escookTheme from "@escook/vitepress-theme";
import { watch } from "vue";
import { inBrowser, useData } from "vitepress";

const { isDark, page } = useData();

const { Layout } = escookTheme;

watch(isDark, (dark) => {
    if (!inBrowser) return;

    const iframe = document
        .querySelector("giscus-widget")
        ?.shadowRoot?.querySelector("iframe");

    iframe?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
        "https://giscus.app"
    );
});

</script>
<template>
    <Layout>
        <template #doc-footer-before> </template>
        <template #doc-after>
            <div style="margin-top: 24px">
                <Giscus id="comments" repo="用户名/仓库名" repoId="仓库Id" category="分类名称"
                    categoryId="分类Id" mapping="pathname" strict="0" reactions-enabled="1"
                    emit-metadata="0" input-position="bottom" lang="zh-CN" crossorigin="anonymous"
                    :theme="isDark ? 'dark' : 'light'" />
            </div>
        </template>
    </Layout>
</template>
<style scoped></style>
