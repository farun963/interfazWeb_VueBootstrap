<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
          <div class="card-header bg-primary text-white text-center py-4">
            <div class="mb-3">
              <img src="/vite.svg" alt="Vite logo" height="30" class="me-2" />
              <img src="/src/assets/vue.svg" alt="Vue logo" height="30" />
            </div>
            <h3 class="mb-0">Iniciar Sesión</h3>
          </div>
          <div class="card-body p-4">
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
            <form @submit.prevent="handleSubmit">
              <div class="form-floating mb-3">
                <input 
                  type="text" 
                  class="form-control" 
                  id="username" 
                  v-model="username" 
                  placeholder="Usuario"
                  :class="{ 'is-invalid': submitted && !username }"
                  required
                />
                <label for="username">Usuario</label>
                <div v-if="submitted && !username" class="invalid-feedback">
                  Por favor ingresa tu nombre de usuario
                </div>
              </div>
              
              <div class="form-floating mb-3">
                <input 
                  type="password" 
                  class="form-control" 
                  id="password" 
                  v-model="password" 
                  placeholder="Contraseña"
                  :class="{ 'is-invalid': submitted && !password }"
                  required
                />
                <label for="password">Contraseña</label>
                <div v-if="submitted && !password" class="invalid-feedback">
                  Por favor ingresa tu contraseña
                </div>
              </div>
              
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" v-model="rememberMe" id="rememberMe" />
                <label class="form-check-label" for="rememberMe">
                  Recordar mis datos
                </label>
              </div>
              
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? 'Procesando...' : 'Iniciar Sesión' }}
                </button>
              </div>
            </form>
          </div>
          <div class="card-footer text-center py-3">
            <div class="small">
              <a href="#" @click.prevent="toggleForgotPassword">¿Olvidaste tu contraseña?</a>
            </div>
            <div class="small mt-2">
              <a href="#" @click.prevent="toggleRegister">¿No tienes una cuenta? Regístrate</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Variables reactivas
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);
const submitted = ref(false);
const errorMessage = ref('');

// Función para manejar el inicio de sesión
const handleSubmit = async () => {
  submitted.value = true;
  
  // Validación básica
  if (!username.value || !password.value) {
    return;
  }
  
  try {
    loading.value = true;
    
    // Simulación de llamada a API (reemplazar con tu propia lógica de autenticación)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Ejemplo de validación (reemplazar con tu propia lógica)
    if (username.value === 'admin' && password.value === 'password') {
      console.log('Inicio de sesión exitoso');
      
      // Guardar token y datos de usuario
      localStorage.setItem('auth-token', 'ejemplo-token-jwt');
      localStorage.setItem('username', username.value);
      
      if (rememberMe.value) {
        localStorage.setItem('remember-user', username.value);
      } else {
        localStorage.removeItem('remember-user');
      }
      
      // Redirigir al dashboard
      router.push('/dashboard');
    } else {
      errorMessage.value = 'Usuario o contraseña incorrectos';
    }
  } catch (error) {
    errorMessage.value = 'Error al iniciar sesión. Intenta nuevamente.';
    console.error('Error de inicio de sesión:', error);
  } finally {
    loading.value = false;
  }
};

// Funciones adicionales
const toggleForgotPassword = () => {
  alert('Funcionalidad de recuperación de contraseña');
  // Aquí puedes implementar la lógica para recuperar contraseña
};

const toggleRegister = () => {
  alert('Funcionalidad de registro');
  // Aquí puedes implementar la redirección a la página de registro
};
</script>

<style scoped>
.card {
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background-color: #41b883;
  border-color: #41b883;
}

.btn-primary:hover, .btn-primary:focus {
  background-color: #369e73;
  border-color: #369e73;
}

.card-header {
  background: linear-gradient(135deg, #41b883 0%, #34495e 100%);
}

a {
  color: #41b883;
  text-decoration: none;
}

a:hover {
  color: #369e73;
  text-decoration: underline;
}
</style>