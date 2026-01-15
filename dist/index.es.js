import jdists from "jdists";
import { createFilter } from "@rollup/pluginutils";
function viteJdistsPlugin(n = {}) {
	let { include: r = /\.(js|ts|jsx|tsx|vue|svelte|astro|md)$/, exclude: i = [], remove: a = ["debug", "test"], trigger: o = ["release"], config: s, ...c } = n, l = createFilter(r, i), u = (e) => Array.isArray(e) ? e.join(",") : e;
	return {
		name: "vite-plugin-jdists",
		enforce: "pre",
		transform(t, n) {
			if (!l(n)) return null;
			try {
				let r = {
					fromString: !0,
					path: n,
					...c
				};
				return a && (r.remove = u(a)), o && (r.trigger = u(o)), s && (r.config = s), {
					code: jdists.build(t, r),
					map: null
				};
			} catch {
				return {
					code: t,
					map: null
				};
			}
		},
		handleHotUpdate(e) {
			let { file: t, server: n, modules: r } = e;
			if (l(t)) return console.log(`[vite-plugin-jdists] 热更新文件: ${t}`), r;
		}
	};
}
export { viteJdistsPlugin as default };
