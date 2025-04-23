<template>
    <div class="shopping-cart">
      <div class="card shadow">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">Carrito de Compras</h4>
        </div>
        <div class="card-body">
          <div v-if="cartItems.length === 0" class="text-center py-4">
            <i class="bi bi-cart3 display-1 text-muted"></i>
            <p class="mt-3">Tu carrito está vacío</p>
            <button class="btn btn-outline-primary" @click="goToProducts">Ver productos</button>
          </div>
          
          <div v-else>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartItems" :key="item.id">
                    <td>
                      <div class="d-flex align-items-center">
                        <img :src="item.image" :alt="item.name" class="product-thumbnail me-2">
                        <span>{{ item.name }}</span>
                      </div>
                    </td>
                    <td>${{ item.price.toFixed(2) }}</td>
                    <td>
                      <div class="quantity-control">
                        <button 
                          class="btn btn-sm btn-outline-secondary" 
                          @click="decreaseQuantity(item)"
                          :disabled="item.quantity <= 1"
                        >-</button>
                        <span class="mx-2">{{ item.quantity }}</span>
                        <button 
                          class="btn btn-sm btn-outline-secondary" 
                          @click="increaseQuantity(item)"
                        >+</button>
                      </div>
                    </td>
                    <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                    <td>
                      <button class="btn btn-sm btn-danger" @click="removeFromCart(item)">
                        <i class="bi bi-trash"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Cupón de descuento -->
            <div class="coupon-section mt-4 p-3 bg-light rounded">
              <h5>¿Tienes un cupón de descuento?</h5>
              <div class="input-group mb-2">
                <input 
                  type="text" 
                  class="form-control" 
                  v-model="couponCode"
                  placeholder="Ingresa tu código"
                >
                <button 
                  class="btn btn-outline-success" 
                  type="button" 
                  @click="applyCoupon"
                >Aplicar</button>
              </div>
              <small class="text-muted">Los códigos válidos deben tener al menos 8 caracteres y terminar con un número de 2 dígitos.</small>
              
              <div v-if="couponMessage" :class="`alert mt-2 ${couponValid ? 'alert-success' : 'alert-danger'}`">
                {{ couponMessage }}
              </div>
            </div>
            
            <!-- Resumen de compra -->
            <div class="cart-summary card mt-4">
              <div class="card-body">
                <h5 class="card-title">Resumen de compra</h5>
                <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${{ subtotal.toFixed(2) }}</span>
                </div>
                
                <div v-if="discount > 0" class="d-flex justify-content-between mb-2 text-success">
                  <span>Descuento ({{ discountPercentage }}%):</span>
                  <span>-${{ discount.toFixed(2) }}</span>
                </div>
                
                <div class="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${{ total.toFixed(2) }}</span>
                </div>
                
                <button class="btn btn-success w-100 mt-3">
                  Proceder al pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const cartItems = ref([]);
  const couponCode = ref('');
  const couponMessage = ref('');
  const couponValid = ref(false);
  const discountPercentage = ref(0);
  
  // Cargar carrito desde localStorage
  onMounted(() => {
    const savedCart = localStorage.getItem('cart-items');
    if (savedCart) {
      cartItems.value = JSON.parse(savedCart);
    }
    
    // Cargar cupón aplicado si existe
    const savedCoupon = localStorage.getItem('applied-coupon');
    if (savedCoupon) {
      const couponData = JSON.parse(savedCoupon);
      couponCode.value = couponData.code;
      discountPercentage.value = couponData.percentage;
      couponValid.value = true;
      couponMessage.value = `Cupón ${couponCode.value} aplicado correctamente.`;
    }
  });
  
  // Guardar carrito en localStorage cuando cambie
  watch(cartItems, (newValue) => {
    localStorage.setItem('cart-items', JSON.stringify(newValue));
  }, { deep: true });
  
  // Computed properties
  const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });
  
  const discount = computed(() => {
    return subtotal.value * (discountPercentage.value / 100);
  });
  
  const total = computed(() => {
    return subtotal.value - discount.value;
  });
  
  // Métodos
  const increaseQuantity = (item) => {
    item.quantity += 1;
  };
  
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
    }
  };
  
  const removeFromCart = (item) => {
    cartItems.value = cartItems.value.filter(cartItem => cartItem.id !== item.id);
  };
  
  const goToProducts = () => {
    router.push('/dashboard');
  };
  
  const applyCoupon = () => {
    // Validar el cupón
    const code = couponCode.value.trim();
    
    // Verificar longitud mínima
    if (code.length < 8) {
      couponMessage.value = 'El cupón debe tener al menos 8 caracteres.';
      couponValid.value = false;
      return;
    }
    
    // Verificar si los últimos dos caracteres son numéricos
    const lastTwoChars = code.slice(-2);
    if (!/^\d{2}$/.test(lastTwoChars)) {
      couponMessage.value = 'El cupón debe terminar con 2 dígitos numéricos.';
      couponValid.value = false;
      return;
    }
    
    // Extraer el porcentaje de descuento
    const percentage = parseInt(lastTwoChars);
    
    // Aplicar el descuento
    discountPercentage.value = percentage;
    couponValid.value = true;
    couponMessage.value = `Cupón aplicado correctamente. Descuento de ${percentage}%.`;
    
    // Guardar el cupón aplicado
    localStorage.setItem('applied-coupon', JSON.stringify({
      code: code,
      percentage: percentage
    }));
  };
  </script>
  
  <style scoped>
  .shopping-cart {
    padding: 30px 0;
  }
  
  .product-thumbnail {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  
  .coupon-section {
    border-left: 4px solid #41b883;
  }
  
  .cart-summary {
    border-top: 2px solid #eee;
    background-color: #f9f9f9;
  }
  </style>