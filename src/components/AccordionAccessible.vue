<!--
  COMPONENTE: Acordeón Accesible
  
  Los acordeones permiten mostrar/ocultar contenido de forma organizada.
  
  Características de Accesibilidad:
  - Cada encabezado de panel es un <button> para accesibilidad por teclado
  - aria-expanded indica si el panel está abierto (true) o cerrado (false)
  - aria-controls vincula el botón con el id del contenido que controla
  - role="region" identifica cada panel como una región de contenido
  - aria-labelledby vincula el panel con el botón que lo controla
  - Completamente operable con teclado (Tab, Enter, Space)
-->

<script setup>
import { ref } from 'vue'

// Array de paneles del acordeón
const accordionItems = ref([
  { 
    id: 'accordion-1', 
    title: 'Panel 1: Introducción a ARIA', 
    content: 'ARIA (Accessible Rich Internet Applications) es un conjunto de atributos que definen formas de hacer que el contenido web y las aplicaciones sean más accesibles para personas con discapacidades.',
    isOpen: false 
  },
  { 
    id: 'accordion-2', 
    title: 'Panel 2: Navegación por Teclado', 
    content: 'La navegación por teclado es fundamental para la accesibilidad. Los usuarios deben poder interactuar con todos los elementos interactivos usando Tab, Enter, Space, y las teclas de flecha.',
    isOpen: false 
  },
  { 
    id: 'accordion-3', 
    title: 'Panel 3: Lectores de Pantalla', 
    content: 'Los lectores de pantalla son tecnologías de asistencia que convierten el contenido digital en audio o braille. Es crucial probar nuestras aplicaciones con NVDA, JAWS, o VoiceOver.',
    isOpen: false 
  }
])

// Función para alternar el estado de un panel del acordeón
function toggleAccordion(index) {
  accordionItems.value[index].isOpen = !accordionItems.value[index].isOpen
}
</script>

<template>
  <section class="section">
    <h2>1. Acordeones Accesibles</h2>
    <p class="section-description">
      Los acordeones permiten mostrar/ocultar contenido. Cada botón debe usar
      <code>aria-expanded</code> para indicar su estado y <code>aria-controls</code>
      para enlazar con el panel que controla.
    </p>
    
    <div class="accordion">
      <!--
        Para cada panel del acordeón:
        - Usamos <button> para que sea accesible por teclado
        - aria-expanded indica si el panel está abierto (true) o cerrado (false)
        - aria-controls vincula el botón con el id del contenido que controla
        - El botón es completamente operable con Enter y Space
      -->
      <div 
        v-for="(item, index) in accordionItems" 
        :key="item.id"
        class="accordion-item"
      >
        <h3 class="accordion-header">
          <button
            :id="`accordion-button-${item.id}`"
            :aria-expanded="item.isOpen"
            :aria-controls="`accordion-panel-${item.id}`"
            class="accordion-button"
            @click="toggleAccordion(index)"
          >
            <span class="accordion-title">{{ item.title }}</span>
            <span class="accordion-icon" aria-hidden="true">
              {{ item.isOpen ? '−' : '+' }}
            </span>
          </button>
        </h3>
        
        <!--
          Panel de contenido:
          - El id corresponde al aria-controls del botón
          - role="region" indica que es una región de contenido
          - aria-labelledby vincula con el botón que lo controla
          - Se muestra/oculta con v-show para mantenerlo en el DOM
        -->
        <div
          v-show="item.isOpen"
          :id="`accordion-panel-${item.id}`"
          role="region"
          :aria-labelledby="`accordion-button-${item.id}`"
          class="accordion-panel"
        >
          <div class="accordion-content">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </section>
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

.accordion {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid #ddd;
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  margin: 0;
}

.accordion-button {
  width: 100%;
  background: #e8e9eb;
  border: none;
  padding: 1rem 1.5rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  transition: background-color 0.2s;
}

.accordion-button:hover {
  background: #e9ecef;
}

/* Indicador visual de foco */
.accordion-button:focus {
  outline: 3px solid #1565c0;
  outline-offset: -3px;
  background: #d0d2d6;
}

.accordion-button[aria-expanded="true"] {
  background: #3d4db8;
  color: white;
}

.accordion-icon {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
}

.accordion-panel {
  overflow: hidden;
}

.accordion-content {
  padding: 1.5rem;
  background: white;
  color: #1a1a1a;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .section {
    padding: 1.5rem;
  }
  
  .section h2 {
    font-size: 1.5rem;
  }
}
</style>

