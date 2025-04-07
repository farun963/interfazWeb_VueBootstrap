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
  
  
<script>
export default {
  name: 'ProductList',
  data() {
    return {
      products: [
        { 
          id: 1, 
          name: "Camiseta", 
          price: 250, 
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80" 
        },
        { 
          id: 2, 
          name: "Pantalón", 
          price: 400, 
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80" 
        },
        { 
          id: 3, 
          name: "Zapatos", 
          price: 600, 
          image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80" 
        },
        { 
          id: 4, 
          name: "Bolso", 
          price: 350, 
          image: "https://images.unsplash.com/photo-1554342872-034a06541bad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80" 
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Los estilos se mantienen igual que en la versión anterior */
.product-list-section {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
  color: #333;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-name {
  margin: 0 0 10px;
  font-size: 1.1rem;
  color: #333;
}

.product-price {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6b6b;
}

@media (max-width: 768px) {
  .products-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .products-container {
    grid-template-columns: 1fr;
  }
}
</style>