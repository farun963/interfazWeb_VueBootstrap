<script setup>
// No es necesario importar los componentes aquí ya que se manejan con el router
</script>

<template>
  <div class="app-container">
    <!-- El componente router-view renderizará el componente correspondiente a la ruta actual -->
    <router-view></router-view>
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
  min-height: 100vh;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}
</style>