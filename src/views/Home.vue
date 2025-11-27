<!--
  VISTA: Página Principal
  
  Contiene todos los componentes de demostración de accesibilidad.
-->

<script setup>
import { ref } from 'vue'
import AccordionAccessible from '../components/AccordionAccessible.vue'
import TooltipAccessible from '../components/TooltipAccessible.vue'
import PaginationAccessible from '../components/PaginationAccessible.vue'
import ModalAccessible from '../components/ModalAccessible.vue'
import FocusManagement from '../components/FocusManagement.vue'
import MapAccessible from '../components/MapAccessible.vue'

const mainContent = ref(null)
const appContainer = ref(null)

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
</script>

<template>
  <div ref="appContainer" class="view-container">
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
  </div>
</template>

<style scoped>
.view-container {
  width: 100%;
}

.main-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 1rem;
  min-height: 100%;
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

@media (max-width: 768px) {
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

