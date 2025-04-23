<template>
  <div>
    <Header />

    <Main />

    <div class="container mt-4">
      <div class="alert alert-success text-center" role="alert">
        Bienvenido, {{ username }}. Has iniciado sesión correctamente en Vueno Tienda.
      </div>
      <div class="text-center mb-4">
        <button @click="logout" class="btn btn-danger">Cerrar sesión</button>
      </div>
    </div>

    <ProductList />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import Header from './Header.vue';
import Main from './Main.vue';
import ProductList from './ProductList.vue';

const router = useRouter();
const username = ref('Usuario');

onMounted(() => {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    username.value = storedUsername;
  }
});

const logout = () => {
  localStorage.removeItem('auth-token');
  localStorage.removeItem('username');
  router.push('/login');
};
</script>