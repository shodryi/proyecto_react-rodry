// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // todo lo que vaya a /api/mob/* se redirige a mcdata.nalo.dev/mob/*
      '/api/mob': {
        target: 'https://mcdata.nalo.dev',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/mob/, '/mob'),
      },
    },
  },
});
