<template>
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <div class="card shadow">
            <div class="card-header bg-primary text-white">
              <h4 class="mb-0">Dashboard</h4>
            </div>
            <div class="card-body">
              <h5>Bienvenido, {{ username }}</h5>
              <p>Has iniciado sesión correctamente.</p>
              <button @click="logout" class="btn btn-danger">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const username = ref('Usuario');
  
  onMounted(() => {
    // Aquí podrías obtener información del usuario desde localStorage o una API
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      username.value = storedUsername;
    }
  });
  
  const logout = () => {
    // Limpiar localStorage
    localStorage.removeItem('auth-token');
    localStorage.removeItem('username');
    
    // Redirigir al login
    router.push('/login');
  };
  </script>