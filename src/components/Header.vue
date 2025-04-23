<template>
  <header class="bg-light py-3 shadow-sm">
    <div class="container d-flex justify-content-between align-items-center">
      <h3 class="mb-0">Vueno Tienda</h3>

      <form class="d-flex" role="search" @submit.prevent>
        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar">
        <button class="btn btn-outline-success" type="submit">Buscar</button>
      </form>

      <nav>
        <ul class="nav">
          <li class="nav-item" v-for="(item, index) in navItems" :key="index">
            <a class="nav-link text-dark" href="#">{{ item }}</a>
          </li>
        </ul>
      </nav>

      <button class="btn btn-outline-primary position-relative" @click="goToCart">
        <i class="bi bi-cart3"></i> Carrito
        <span v-if="cartItemCount > 0"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {{ cartItemCount }}
        </span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const navItems = ['Inicio', 'Nosotros', 'Tienda', 'Ayuda'];
const cartItemCount = ref(0);

// Método para ir al carrito
const goToCart = () => {
  router.push('/cart');
};

// Cargar cantidad de items en el carrito
const updateCartCount = () => {
  const savedCart = localStorage.getItem('cart-items');
  if (savedCart) {
    const cartItems = JSON.parse(savedCart);
    cartItemCount.value = cartItems.reduce((total, item) => total + item.quantity, 0);
  } else {
    cartItemCount.value = 0;
  }
};

// Actualizar contador cuando se monta el componente
onMounted(() => {
  updateCartCount();

  // Establecer un intervalo para verificar cambios en localStorage
  const checkCartInterval = setInterval(updateCartCount, 1000);

  // Limpiar intervalo cuando el componente se desmonta
  return () => clearInterval(checkCartInterval);
});
</script>