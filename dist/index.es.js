import g from "jdists";
import { createFilter as m } from "@rollup/pluginutils";
function j(f = {}) {
  const {
    include: c = /\.(js|ts|jsx|tsx|vue|svelte|astro|md)$/,
    exclude: a = [],
    remove: i = ["debug", "test"],
    trigger: n = ["release"],
    config: s,
    ...d
  } = f, o = m(c, a), l = (r) => Array.isArray(r) ? r.join(",") : r;
  return {
    name: "vite-plugin-jdists",
    // 强制插件在 transform 阶段运行
    enforce: "pre",
    /**
     * 转换代码
     * @param {string} code - 源代码
     * @param {string} id - 文件路径
     * @returns {string} 处理后的代码
     */
    transform(r, t) {
      if (!o(t))
        return null;
      try {
        const e = {
          fromString: !0,
          path: t,
          ...d
        };
        return i && (e.remove = l(i)), n && (e.trigger = l(n)), s && (e.config = s), {
          code: g.build(r, e),
          map: null
        };
      } catch {
        return {
          code: r,
          map: null
        };
      }
    },
    /**
     * 处理热更新
     * @param {Object} ctx - 热更新上下文
     */
    handleHotUpdate(r) {
      const { file: t, server: e, modules: u } = r;
      if (o(t))
        return console.log(`[vite-plugin-jdists] 热更新文件: ${t}`), u;
    }
  };
}
export {
  j as default
};
