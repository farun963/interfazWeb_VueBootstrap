<template>
    <header class="bg-light py-3 shadow-sm">
      <div class="container d-flex justify-content-between align-items-center">
        <h3 class="mb-0">Mi Tienda</h3>
  
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
  
        <button class="btn btn-outline-primary">
          🛒 Carrito
        </button>
      </div>
    </header>
  </template>
  
  <script setup>
  const navItems = ['Inicio', 'Nosotros', 'Tienda', 'Ayuda'];
  </script>