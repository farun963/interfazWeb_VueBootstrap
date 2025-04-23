<template>
  <section class="product-list-section">
    <div class="container">
      <h2 class="section-title">Productos Destacados</h2>

      <div class="products-container">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="product-image">
            <img :src="product.image" :alt="product.name" loading="lazy">
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">${{ product.price.toFixed(2) }}</p>
            <button @click="addToCart(product)" class="btn btn-primary btn-sm w-100">
              <i class="bi bi-cart-plus"></i> Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast de confirmación -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="cartToast" class="toast align-items-center text-white bg-success" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <i class="bi bi-check-circle me-2"></i>
            {{ toastMessage }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Toast } from 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Productos
const products = ref([
  {
    id: 1, name: "Camiseta", price: 250, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
  },
  {
    id: 2, name: "Pantalón", price: 400, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
  },
  {
    id: 3, name: "Zapatos", price: 600, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
  },
  {
    id: 4, name: "Bolso", price: 350, image: "https://images.unsplash.com/photo-1554342872-034a06541bad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
  },
  {
    id: 5, name: "Campera", price: 500, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
  },
  {
    id: 6, name: "Cinturón", price: 100, image: "https://images.unsplash.com/photo-1553143820-6bb68bc34679?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
  }
]);

// Toast para mostrar mensajes
let toastInstance;
const toastMessage = ref('Producto añadido al carrito');

onMounted(() => {
  const toastEl = document.getElementById('cartToast');
  toastInstance = new Toast(toastEl);
});

// Método para añadir producto al carrito
const addToCart = (product) => {
  // Obtener el carrito actual
  let cart = [];
  const savedCart = localStorage.getItem('cart-items');

  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  // Verificar si el producto ya está en el carrito
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex >= 0) {
    // Incrementar cantidad si ya existe
    cart[existingProductIndex].quantity += 1;
    toastMessage.value = `Cantidad de ${product.name} actualizada`;
  } else {
    // Agregar como nuevo producto
    cart.push({
      ...product,
      quantity: 1
    });
    toastMessage.value = `${product.name} añadido al carrito`;
  }

  // Guardar en localStorage
  localStorage.setItem('cart-items', JSON.stringify(cart));

  // Mostrar toast
  toastInstance.show();
};
</script>

<style scoped>
/* ProductList.vue styles */
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
  margin: 0 0 10px;
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