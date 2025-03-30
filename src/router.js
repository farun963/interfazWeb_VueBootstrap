import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // Aquí puedes agregar más rutas cuando las necesites
  {
    path: '/dashboard',
    name: 'dashboard',
    // Lazy loading para el dashboard
    component: () => import('./components/Dashboard.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protección de rutas (opcional)
router.beforeEach((to, from, next) => {
  // Ejemplo básico de protección de rutas
  const isAuthenticated = localStorage.getItem('auth-token');
  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;