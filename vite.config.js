import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',  // Permite el acceso desde fuera del contenedor
    port: 5173,        // Puerto por defecto de Vite
  },
});
