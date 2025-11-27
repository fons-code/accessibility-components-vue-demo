<!--
  COMPONENTE: Modal con Focus Trap (Trampa de Foco)
  
  Los modales/diálogos son ventanas que requieren interacción del usuario.
  
  Características de Accesibilidad CRÍTICAS:
  - role="dialog" identifica el elemento como un diálogo
  - aria-modal="true" indica que el modal es modal (resto de página inerte)
  - aria-labelledby vincula con el título del modal
  - FOCUS TRAP: El foco queda atrapado dentro del modal
  - Tab cicla entre elementos dentro del modal (no puede escapar)
  - Escape cierra el modal
  - Al cerrar, el foco regresa al botón que lo abrió
  - aria-hidden="true" se aplica al contenido principal mientras está abierto
-->

<script setup>
import { ref, nextTick } from 'vue'

const isModalOpen = ref(false)
const modalTriggerButton = ref(null)
const modalElement = ref(null)
const modalCloseButton = ref(null)

// Lista de elementos enfocables dentro del modal
let focusableElements = []
let firstFocusableElement = null
let lastFocusableElement = null

// Emitir evento para ocultar el contenido principal
const emit = defineEmits(['modal-opened', 'modal-closed'])

// Abrir modal
async function openModal() {
  isModalOpen.value = true
  
  // Emitir evento para ocultar contenido principal de lectores de pantalla
  emit('modal-opened')
  
  // Esperar a que el DOM se actualice
  await nextTick()
  
  // Obtener todos los elementos enfocables dentro del modal
  const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  focusableElements = modalElement.value.querySelectorAll(focusableSelectors)
  firstFocusableElement = focusableElements[0]
  lastFocusableElement = focusableElements[focusableElements.length - 1]
  
  // Mover el foco al primer elemento (botón de cerrar)
  if (modalCloseButton.value) {
    modalCloseButton.value.focus()
  }
}

// Cerrar modal
function closeModal() {
  isModalOpen.value = false
  
  // Emitir evento para restaurar visibilidad del contenido principal
  emit('modal-closed')
  
  // Devolver el foco al botón que abrió el modal
  if (modalTriggerButton.value) {
    modalTriggerButton.value.focus()
  }
}

// Manejar la trampa de foco (Focus Trap)
function handleModalKeydown(event) {
  // Cerrar con Escape
  if (event.key === 'Escape') {
    closeModal()
    return
  }
  
  // Implementar el Focus Trap
  if (event.key === 'Tab') {
    // Si Shift+Tab en el primer elemento, ir al último
    if (event.shiftKey && document.activeElement === firstFocusableElement) {
      event.preventDefault()
      lastFocusableElement.focus()
    }
    // Si Tab en el último elemento, ir al primero
    else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
      event.preventDefault()
      firstFocusableElement.focus()
    }
  }
}
</script>

<template>
  <section class="section">
    <h2>4. Modal con Trampa de Foco (Focus Trap)</h2>
    <p class="section-description">
      Los modales deben capturar el foco para evitar que el usuario navegue
      fuera del diálogo. Se implementa <code>role="dialog"</code>,
      <code>aria-modal="true"</code>, y el foco debe ciclar dentro del modal.
      El modal se cierra con la tecla Escape.
    </p>
    
    <!--
      Botón que abre el modal:
      - Guardamos la referencia para devolver el foco al cerrar
    -->
    <button
      ref="modalTriggerButton"
      class="button-primary"
      @click="openModal"
    >
      Abrir Modal Accesible
    </button>
  </section>

  <!-- ============================================ -->
  <!-- MODAL (se renderiza en el nivel superior) -->
  <!-- ============================================ -->
  <!--
    El modal:
    - role="dialog" identifica este elemento como un diálogo
    - aria-modal="true" indica que es modal (el resto de la página está inerte)
    - aria-labelledby vincula con el título del modal
    - @keydown maneja el Focus Trap y la tecla Escape
    
    FOCUS TRAP:
    - Al abrir, el foco se mueve al primer elemento enfocable (botón cerrar)
    - Tab cicla entre elementos dentro del modal
    - No se puede salir del modal con Tab (el foco se mantiene atrapado)
    - Escape cierra el modal y devuelve el foco al botón que lo abrió
  -->
  <Teleport to="body">
    <div
      v-if="isModalOpen"
      class="modal-overlay"
      @click.self="closeModal"
    >
      <div
        ref="modalElement"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        class="modal"
        @keydown="handleModalKeydown"
      >
        <div class="modal-header">
          <h2 id="modal-title" class="modal-title">
            Diálogo Modal Accesible
          </h2>
          <button
            ref="modalCloseButton"
            class="modal-close"
            aria-label="Cerrar modal"
            @click="closeModal"
          >
            ✕
          </button>
        </div>
        
        <div class="modal-body">
          <p>
            Este es un modal completamente accesible que implementa un Focus Trap.
          </p>
          <p>
            <strong>Características:</strong>
          </p>
          <ul>
            <li>El foco está atrapado dentro del modal</li>
            <li>Presiona <kbd>Tab</kbd> para navegar entre elementos</li>
            <li>Presiona <kbd>Escape</kbd> para cerrar</li>
            <li>Al cerrar, el foco vuelve al botón que abrió el modal</li>
            <li>El contenido de fondo tiene <code>aria-hidden="true"</code></li>
          </ul>
          
          <div class="modal-demo-inputs">
            <label>
              Nombre:
              <input type="text" class="modal-input" placeholder="Escribe aquí">
            </label>
            <label>
              Email:
              <input type="email" class="modal-input" placeholder="tu@email.com">
            </label>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="button-secondary" @click="closeModal">
            Cancelar
          </button>
          <button class="button-primary" @click="closeModal">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
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

.section-description {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.05rem;
}

.section-description code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #d63384;
}

.button-primary {
  background: #3d4db8;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s;
  min-width: 44px;
  min-height: 44px;
}

.button-primary:hover {
  background: #2e3d8f;
}

.button-primary:focus {
  outline: 3px solid #1565c0;
  outline-offset: 2px;
}

/* ============================================ */
/* ESTILOS DEL MODAL */
/* ============================================ */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #ddd;
}

.modal-title {
  margin: 0;
  color: #3d4db8;
  font-size: 1.5rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.25rem 0.5rem;
  line-height: 1;
  border-radius: 4px;
  transition: background-color 0.2s;
  min-width: 44px;
  min-height: 44px;
}

.modal-close:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-close:focus {
  outline: 3px solid #1565c0;
  outline-offset: 2px;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin-bottom: 1rem;
}

.modal-body ul {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.modal-body li {
  margin-bottom: 0.5rem;
}

.modal-body kbd {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  border: 1px solid #ccc;
  font-family: monospace;
  font-size: 0.9em;
}

.modal-body code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #d63384;
}

.modal-demo-inputs {
  margin-top: 1.5rem;
}

.modal-demo-inputs label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
}

.modal-input {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.modal-input:focus {
  outline: none;
  border-color: #3d4db8;
  box-shadow: 0 0 0 3px rgba(61, 77, 184, 0.15);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #ddd;
}

.button-secondary {
  background: white;
  color: #3d4db8;
  border: 2px solid #3d4db8;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
  min-width: 44px;
  min-height: 44px;
}

.button-secondary:hover {
  background: #e8ebf7;
}

.button-secondary:focus {
  outline: 3px solid #1565c0;
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .section {
    padding: 1.5rem;
  }
  
  .section h2 {
    font-size: 1.5rem;
  }
  
  .modal {
    margin: 1rem;
  }
}
</style>

