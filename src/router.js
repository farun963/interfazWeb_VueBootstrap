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
  {
    path: '/dashboard',
    name: 'dashboard',
    // Lazy loading para el dashboard
    component: () => import('./components/Dashboard.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    // Lazy loading para el carrito
    component: () => import('./components/ShoppingCart.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  // Ejemplo básico de protección de rutas
  const isAuthenticated = localStorage.getItem('auth-token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;