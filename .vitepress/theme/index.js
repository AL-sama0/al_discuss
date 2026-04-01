import { h } from "vue";
import type { Theme } from "vitepress";

import "@escook/vitepress-theme/style.css";
import "./style.css";
import myLayout from "./components/myLayout.vue";

import dataShow from "./components/dataShow.vue";

export default {
	Layout: () => {
		return h(myLayout, null, {});
	},
	enhanceApp({ app, router, siteData }) {
		app.component("dataShow", dataShow);
	},
} satisfies Theme;
