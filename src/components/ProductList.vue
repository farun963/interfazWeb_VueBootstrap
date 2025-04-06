<template>
    <!-- ProductList.vue -->
     <!--Sección contenedora con clases de Bootstrap -->
    <section class="container my-5">
      <h2 class="mb-4 text-center">Productos Destacados</h2>
      <div class="row"> <!-- Fila de productos --> 
        <!-- col-md-3 indica que en pantallas medianas ocuapra el 3/12 del ancho -->
        <!-- v-for itera sobre la lista de productos y genera una tarjeta por cada uno -->
        <div class="col-md-3" v-for="product in products" :key="product.id">
          <div class="card h-100 text-center shadow-sm">
            <img :src="product.image" class="card-img-top" :alt="product.name" />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">${{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const products = [
    { id: 1, name: "Camiseta", price: 250, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Pantalón", price: 400, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Zapatos", price: 600, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Bolso", price: 350, image: "https://via.placeholder.com/150" }
  ];
  </script>