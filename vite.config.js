import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'vitePluginJdists',
      fileName: (format) => `index.${format}.js`,
      formats: ['es','cjs']
    },
    rollupOptions: {
      external: [
        'vite',
        'fs',
        'path',
        'jdists',
        '@rollup/pluginutils'
      ],
      output: {
        globals: {
          vite: 'vite',
          jdists: 'jdists',
          '@rollup/pluginutils': 'pluginutils'
        }
      }
    }
  },
  plugins: [
    {
      name: 'copy-types',
      closeBundle() {
        const srcPath = path.resolve(__dirname, 'src/index.d.ts');
        const distPath = path.resolve(__dirname, 'dist/index.d.ts');

        // 确保 dist 目录存在
        fs.mkdirSync(path.dirname(distPath), { recursive: true });

        // 复制类型文件
        fs.copyFileSync(srcPath, distPath);
        console.log('✅ index.d.ts 已复制到 dist 目录');
      }
    }
  ]
});
