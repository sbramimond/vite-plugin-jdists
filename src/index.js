import jdists from "jdists";
import { createFilter } from "@rollup/pluginutils";

/**
 * Vite 插件：使用 jdists 处理代码
 * @param {Object} options - 插件配置
 * @returns {Object} Vite 插件对象
 */
export default function viteJdistsPlugin(options = {}) {
    const {
        include = /\.(js|ts|jsx|tsx|vue|svelte|astro|md)$/,
        exclude = [],
        remove = ["debug", "test"],
        trigger = ["release"],
        config,
        ...otherOptions
    } = options;

    // 创建文件过滤器
    const filter = createFilter(include, exclude);

    // 处理 remove 和 trigger 参数，确保格式正确
    const normalizeArrayParam = (param) => {
        if (Array.isArray(param)) {
            return param.join(",");
        }
        return param;
    };

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
        transform(code, id) {
            // 检查文件是否需要处理
            if (!filter(id)) {
                return null;
            }

            try {
                // 构建 jdists 配置
                const jdistsConfig = {
                    fromString: true,
                    path: id,
                    ...otherOptions,
                };

                // 添加可选的配置项
                if (remove) {
                    jdistsConfig.remove = normalizeArrayParam(remove);
                }

                if (trigger) {
                    jdistsConfig.trigger = normalizeArrayParam(trigger);
                }

                if (config) {
                    jdistsConfig.config = config;
                }

                // console.log(`[vite-plugin-jdists] 处理文件: ${id}`, jdistsConfig);

                // 处理代码
                const result = jdists.build(code, jdistsConfig);

                // 返回转换结果
                return {
                    code: result,
                    map: null,
                };
            } catch (error) {
                // 错误处理
                // console.error(`[vite-plugin-jdists] 处理文件失败: ${id}`);
                // console.error('错误详情:', error.message);
                // console.error('当前配置:', options);

                // 返回原始代码，不中断构建
                return {
                    code,
                    map: null,
                };
            }
        },

        /**
         * 处理热更新
         * @param {Object} ctx - 热更新上下文
         */
        handleHotUpdate(ctx) {
            const { file, server, modules } = ctx;

            // 检查文件是否需要处理
            if (filter(file)) {
                console.log(`[vite-plugin-jdists] 热更新文件: ${file}`);
                // 返回所有模块以强制重新加载
                return modules;
            }
        },
    };
}
