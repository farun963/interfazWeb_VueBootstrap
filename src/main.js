import { createApp } from 'vue'; // Importar
import App from './App.vue';
import router from './router';

// Importar Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Crear la aplicación Vue
const app = createApp(App);

// Usar el router
app.use(router);

// Montar la aplicación
app.mount('#app');

// 