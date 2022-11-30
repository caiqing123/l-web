import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    laravel({
      input: ['resources/web/src/main.js'],
      refresh: true,
    }),
  ],
  server: {
    watch: {
      ignored: ['**/app/**', '**/config/**', '**/routes/**'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './resources/web/src'),
      '@modules': resolve(__dirname, './node_modules'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
});
