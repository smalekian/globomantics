import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'http://127.0.0.1:4000/graphql',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
