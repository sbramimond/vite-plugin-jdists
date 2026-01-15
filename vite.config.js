import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'vitePluginJdists',
      fileName: (format) => `index.${format}.js`,
      formats: ['cjs', 'es']
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
  plugins: []
});