import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {  
    proxy: {
      // Ahora usamos /api/mobs para todo el recurso 
      '/api/mobs': {            
        target: 'https://687ef708efe65e520087fee2.mockapi.io/mobsearch', // URL del endpoint real
        changeOrigin: true,  // Cambia el origen de la petición
        secure: true, // Asegúrate de que el certificado es válido
        rewrite: path => path.replace(/^\/api\/mobs/, ''),  // Reescribe la URL para que coincida con el endpoint real
      },
    },
  },
});
