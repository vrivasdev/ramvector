import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  worker: {
    format: 'es'
  },
  server: {
    port: 3000,
    host: true
  },
  // @ts-ignore
  test: {
    globals: true,
    environment: 'happy-dom'
  }
});
