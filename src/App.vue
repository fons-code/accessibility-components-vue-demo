<!--
  APLICACIÓN PRINCIPAL: Demo de Componentes Accesibles en Vue.js
  
  Esta aplicación es un material educativo que demuestra las mejores prácticas
  de accesibilidad web implementadas en componentes Vue.js reutilizables.
  
  Cada componente está aislado en su propio archivo con toda su lógica,
  siguiendo el principio de separación de responsabilidades.
-->

<script setup>
import { ref } from 'vue'
import SkipLink from './components/SkipLink.vue'

const isMobileMenuOpen = ref(false)

// Alternar el menú móvil
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Cerrar el menú móvil al navegar
function closeMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="app-wrapper">
    <!-- Skip Link: Primer elemento enfocable de toda la página -->
    <SkipLink target-id="main-content" />

    <!-- Contenedor principal de la aplicación -->
    <div class="app-container">
      
      <!-- Barra de navegación -->
      <header class="header">
        <nav class="navbar" aria-label="Navegación principal">
          <div class="navbar-brand">
            <router-link to="/" class="logo">AccessibleVue</router-link>
          </div>
          
          <!-- Botón hamburguesa para móvil -->
          <button 
            class="navbar-toggle"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="navbar-menu"
            aria-label="Menú de navegación"
            @click="toggleMobileMenu"
          >
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
          
          <!-- Menú de navegación -->
          <ul 
            id="navbar-menu"
            class="navbar-menu"
            :class="{ 'navbar-menu-open': isMobileMenuOpen }"
          >
            <li>
              <router-link to="/" @click="closeMenu">Inicio</router-link>
            </li>
            <li>
              <router-link to="/flujos-accesibles" @click="closeMenu">Flujos Accesibles</router-link>
            </li>
          </ul>
        </nav>
      </header>

      <!-- Vista dinámica basada en la ruta -->
      <router-view class="content-wrapper" />

      <!-- Pie de página -->
      <footer class="footer">
        <p>
          Demo de Accesibilidad Web en Vue.js &copy; 2025 | 
          Creado con fines educativos
        </p>
      </footer>

    </div>
  </div>
</template>

<style>
/* ============================================ */
/* ESTILOS GLOBALES Y RESET */
/* ============================================ */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  background-color: #f0f0f0;
}

/* ============================================ */
/* LAYOUT PRINCIPAL CON FOOTER PEGADO AL FONDO */
/* ============================================ */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex: 1;
  padding-top: 0;
}

/* ============================================ */
/* ESTRUCTURA PRINCIPAL */
/* ============================================ */
.header {
  background: #4a5fd5;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 100%;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.navbar-brand .logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: opacity 0.2s;
}

.navbar-brand .logo:hover {
  opacity: 0.9;
}

.navbar-brand .logo:focus {
  outline: 3px solid #ffeb3b;
  outline-offset: 2px;
  border-radius: 4px;
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.navbar-menu li {
  margin: 0;
}

.navbar-menu a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  display: block;
}

.navbar-menu a:hover {
  background: rgba(255, 255, 255, 0.25);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.navbar-menu a:focus {
  outline: 3px solid #ffeb3b;
  outline-offset: 2px;
  background: rgba(255, 255, 255, 0.3);
}

/* Estilo para el enlace activo del router */
.navbar-menu a.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: 700;
}

/* Botón hamburguesa - oculto por defecto en desktop */
.navbar-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.navbar-toggle:hover {
  background: rgba(255, 255, 255, 0.25);
}

.navbar-toggle:focus {
  outline: 3px solid #ffeb3b;
  outline-offset: 2px;
}

.hamburger-line {
  display: block;
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.footer {
  background: #1a1a1a;
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: auto;
}

/* ============================================ */
/* MEJORAS DE ACCESIBILIDAD VISUAL */
/* ============================================ */

/* Asegurar que todos los elementos interactivos tengan un tamaño mínimo de 44x44px */
button, a {
  min-width: 44px;
  min-height: 44px;
}

/* Indicador de foco visible para todos los elementos interactivos */
a:focus,
button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 3px solid #1565c0;
  outline-offset: 2px;
}

/* Mejorar el contraste en modo de alto contraste */
@media (prefers-contrast: high) {
  button {
    border: 2px solid currentColor;
  }
}

/* Respetar las preferencias de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ============================================ */
/* RESPONSIVE DESIGN */
/* ============================================ */
@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    padding: 1rem;
  }
  
  /* Mostrar botón hamburguesa en móvil */
  .navbar-toggle {
    display: flex;
    order: 2;
  }
  
  .navbar-brand {
    order: 1;
  }
  
  /* Menú colapsado por defecto en móvil */
  .navbar-menu {
    display: none;
    flex-direction: column;
    gap: 0;
    width: 100%;
    order: 3;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-top: 1rem;
    overflow: hidden;
  }
  
  /* Mostrar menú cuando está abierto */
  .navbar-menu-open {
    display: flex;
  }
  
  .navbar-menu li {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .navbar-menu li:last-child {
    border-bottom: none;
  }
  
  .navbar-menu a {
    width: 100%;
    padding: 1rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0.75rem;
  }
  
  .navbar-brand .logo {
    font-size: 1.25rem;
  }
  
  .navbar-menu {
    gap: 0.25rem;
  }
}
</style>
