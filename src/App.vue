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
import AccordionAccessible from './components/AccordionAccessible.vue'
import TooltipAccessible from './components/TooltipAccessible.vue'
import PaginationAccessible from './components/PaginationAccessible.vue'
import ModalAccessible from './components/ModalAccessible.vue'
import FocusManagement from './components/FocusManagement.vue'
import MapAccessible from './components/MapAccessible.vue'
import DynamicWorkflows from './components/DynamicWorkflows.vue'

const mainContent = ref(null)
const appContainer = ref(null)
const isMobileMenuOpen = ref(false)

// Manejar el estado de aria-hidden cuando el modal se abre/cierra
function handleModalOpened() {
  if (appContainer.value) {
    appContainer.value.setAttribute('aria-hidden', 'true')
  }
}

function handleModalClosed() {
  if (appContainer.value) {
    appContainer.value.removeAttribute('aria-hidden')
  }
}

// Alternar el menú móvil
function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div>
    <!-- Skip Link: Primer elemento enfocable de toda la página -->
    <SkipLink target-id="main-content" />

    <!-- Contenedor principal de la aplicación -->
    <div ref="appContainer">
      
      <!-- Barra de navegación -->
      <header class="header">
        <nav class="navbar" aria-label="Navegación principal">
          <div class="navbar-brand">
            <a href="#" class="logo">AccessibleVue</a>
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
            <li><a href="#" @click="isMobileMenuOpen = false">Inicio</a></li>
            <li><a href="#" @click="isMobileMenuOpen = false">Componentes</a></li>
            <li><a href="#dynamic-workflows" @click="isMobileMenuOpen = false">Flujos Accesibles</a></li>
            <li><a href="#" @click="isMobileMenuOpen = false">Documentación</a></li>
            <li><a href="#" @click="isMobileMenuOpen = false">Ejemplos</a></li>
            <li><a href="#" @click="isMobileMenuOpen = false">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <!-- Contenido principal con id para el skip link -->
      <main id="main-content" ref="mainContent" tabindex="-1" class="main-content">
        
        <!-- Título principal de la página -->
        <div class="page-header">
          <h1>Componentes Interactivos Accesibles en Vue.js</h1>
          <p class="page-subtitle">Demo educativa de mejores prácticas de accesibilidad web</p>
        </div>
        
        <!-- Componente 1: Acordeones -->
        <AccordionAccessible />

        <!-- Componente 2: Tooltip -->
        <TooltipAccessible />

        <!-- Componente 3: Paginación -->
        <PaginationAccessible />

        <!-- Componente 4: Modal con Focus Trap -->
        <ModalAccessible 
          @modal-opened="handleModalOpened"
          @modal-closed="handleModalClosed"
        />

        <!-- Componente 5: Gestión de Foco -->
        <FocusManagement />

        <!-- Componente 6: Mapa -->
        <MapAccessible />

        <!-- Componente 7: Componentes Dinámicos y Flujos -->
        <div id="dynamic-workflows">
          <DynamicWorkflows />
        </div>

        <!-- Nota educativa final -->
        <section class="section section-note">
          <h2>Notas Importantes sobre Accesibilidad</h2>
          <ul class="notes-list">
            <li>
              <strong>Prueba con teclado:</strong> Navega usando solo Tab, Enter, Space y Escape.
              Todos los componentes deben ser completamente operables.
            </li>
            <li>
              <strong>Prueba con lectores de pantalla:</strong> Usa NVDA (Windows), JAWS (Windows),
              o VoiceOver (Mac) para verificar que toda la información se anuncia correctamente.
            </li>
            <li>
              <strong>Contraste de colores:</strong> Asegúrate de que el contraste entre texto y
              fondo cumpla con las pautas WCAG (mínimo 4.5:1 para texto normal).
            </li>
            <li>
              <strong>Orden del foco:</strong> El orden de tabulación debe seguir un flujo lógico
              y predecible, siguiendo el orden natural del DOM.
            </li>
            <li>
              <strong>Estados visuales:</strong> Todos los elementos interactivos deben tener
              indicadores visuales claros para :focus, :hover, y :active.
            </li>
            <li>
              <strong>Componentes reutilizables:</strong> Cada componente de esta demo está aislado
              en su propio archivo y puede ser reutilizado en otros proyectos.
            </li>
          </ul>
        </section>

      </main>

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

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  background-color: #f0f0f0;
}

/* ============================================ */
/* ESTRUCTURA PRINCIPAL */
/* ============================================ */
.header {
  background: #4a5fd5;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
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

.main-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

/* Quitamos el outline del main cuando recibe foco programático */
.main-content:focus {
  outline: none;
}

.page-header {
  text-align: center;
  padding: 3rem 2rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #3d4db8 0%, #5a3278 100%);
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.95;
  margin: 0;
}

.footer {
  background: #1a1a1a;
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: 4rem;
}

/* ============================================ */
/* SECCIONES */
/* ============================================ */
.section {
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section h2 {
  color: #3d4db8;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  border-bottom: 3px solid #3d4db8;
  padding-bottom: 0.5rem;
}

.section-note {
  background: #fff8dc;
  border-left: 5px solid #d39e00;
}

.notes-list {
  list-style: none;
  padding: 0;
}

.notes-list li {
  padding: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.notes-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #d39e00;
  font-weight: bold;
}

.notes-list code {
  background: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
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
  
  .page-header {
    padding: 2rem 1rem;
  }
  
  .page-header h1 {
    font-size: 1.8rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .section {
    padding: 1.5rem;
  }
  
  .section h2 {
    font-size: 1.5rem;
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
  
  .page-header {
    padding: 1.5rem 1rem;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
  
  .page-subtitle {
    font-size: 0.9rem;
  }
}
</style>
