<template>
     <section class="product-list-section">
    <div class="container">
      <h2 class="section-title">Featured Products</h2>
      
      <div class="products-container">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-image">
            <img :src="product.image" :alt="product.name" loading="lazy">
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">${{ product.price.toFixed(2) }}</p>
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