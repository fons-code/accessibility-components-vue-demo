<!--
  COMPONENTE: Tooltip Accesible
  
  Los tooltips proporcionan información adicional sobre un elemento.
  
  Este componente demuestra dos tipos de tooltips:
  1. Tooltip Automático - Se muestra con hover/focus (aria-describedby)
  2. Tooltip Manual - Se muestra con click (aria-expanded + aria-controls)
  
  Características de Accesibilidad:
  - role="tooltip" identifica semánticamente el elemento
  - aria-describedby vincula el tooltip automático con el botón
  - aria-expanded indica el estado del tooltip manual (abierto/cerrado)
  - aria-controls vincula el botón con el tooltip que controla
  - Funciona tanto con ratón como con teclado
  - Los lectores de pantalla anuncian el contenido del tooltip
-->

<script setup>
import { ref } from 'vue'

// Estado para tooltip automático (hover/focus)
const showTooltipAuto = ref(false)

// Estado para tooltip manual (click)
const showTooltipManual = ref(false)

// Mostrar tooltip automático al hacer hover o focus
function handleTooltipAutoShow() {
  showTooltipAuto.value = true
}

// Ocultar tooltip automático al hacer mouseleave o blur
function handleTooltipAutoHide() {
  showTooltipAuto.value = false
}

// Alternar tooltip manual con click
function toggleTooltipManual() {
  showTooltipManual.value = !showTooltipManual.value
}
</script>

<template>
  <section class="section">
    <h2>2. Tooltips Accesibles</h2>
    <p class="section-description">
      Los tooltips deben ser accesibles tanto con el ratón como con el teclado.
      Existen dos patrones principales para implementar tooltips accesibles.
    </p>
    
    <!-- TOOLTIP AUTOMÁTICO (Hover/Focus) -->
    <div class="tooltip-demo">
      <h3 class="tooltip-subtitle">2.1. Tooltip Automático (Hover/Focus)</h3>
      <p class="tooltip-description">
        Se muestra automáticamente al pasar el ratón o enfocar con el teclado.
        Usa <code>aria-describedby</code> para vincular el botón con el tooltip.
      </p>
      
      <div class="tooltip-container">
        <!--
          Tooltip Automático:
          - aria-describedby vincula el botón con el id del tooltip
          - Los eventos @mouseenter/@mouseleave manejan la interacción con el ratón
          - Los eventos @focus/@blur manejan la interacción con el teclado
          - @focusin/@focusout capturan el foco incluso en elementos hijos
          - Esto asegura que el tooltip sea accesible para lectores de pantalla
        -->
        <div
          tabindex="0"
          class="tooltip-trigger"
          @mouseenter="handleTooltipAutoShow"
          @mouseleave="handleTooltipAutoHide"
          @focusin="handleTooltipAutoShow"
          @focusout="handleTooltipAutoHide"
        >
          Información (Auto)
        </div>
        
        <!--
          Contenido del tooltip automático:
          - role="tooltip" identifica semánticamente este elemento
          - id="tooltip-auto" corresponde al aria-describedby del botón
          - Se muestra/oculta según el estado
        -->
        <div
          v-show="showTooltipAuto"
          id="tooltip-auto"
          role="tooltip"
          class="tooltip"
        >
          Este tooltip se muestra automáticamente con hover o focus. 
          Se oculta al salir o perder el foco.
        </div>
      </div>
    </div>

    <!-- TOOLTIP MANUAL (Click) -->
    <div class="tooltip-demo">
      <h3 class="tooltip-subtitle">2.2. Tooltip Manual (Click)</h3>
      <p class="tooltip-description">
        Se muestra/oculta al hacer click en el botón. 
        Usa <code>aria-expanded</code> y <code>aria-controls</code> para indicar el estado.
      </p>
      
      <div class="tooltip-container">
        <!--
          Tooltip Manual (Click):
          - aria-expanded indica si el tooltip está visible (true) u oculto (false)
          - aria-controls vincula el botón con el id del contenido que controla
          - Se activa únicamente con click (@click)
          - Más control para el usuario sobre cuándo mostrar/ocultar
        -->
        <button
          :aria-expanded="showTooltipManual"
          aria-controls="tooltip-manual"
          class="tooltip-trigger tooltip-trigger-manual"
          @click="toggleTooltipManual"
        >
          Información (Manual)
          <span aria-hidden="true">{{ showTooltipManual ? '▼' : '▶' }}</span>
        </button>
        
        <!--
          Contenido del tooltip manual:
          - id="tooltip-manual" corresponde al aria-controls del botón
          - role="tooltip" identifica semánticamente este elemento
          - Se muestra/oculta solo al hacer click en el botón
        -->
        <div
          v-show="showTooltipManual"
          id="tooltip-manual"
          role="tooltip"
          class="tooltip tooltip-manual"
        >
          Este tooltip se muestra/oculta con click. 
          El usuario tiene control total sobre su visibilidad.
          <button 
            class="tooltip-close" 
            aria-label="Cerrar tooltip"
            @click="showTooltipManual = false"
          >
            ✕
          </button>
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

.tooltip-demo {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #667eea;
}

.tooltip-demo:last-of-type {
  margin-bottom: 1.5rem;
}

.tooltip-subtitle {
  color: #3d4db8;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.tooltip-description {
  color: #333;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.tooltip-description code {
  background: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #d63384;
}

.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-trigger {
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

.tooltip-trigger:hover {
  background: #2e3d8f;
}

.tooltip-trigger:focus {
  outline: 3px solid #1565c0;
  outline-offset: 2px;
}

.tooltip-trigger-manual {
  background: #5a3278;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tooltip-trigger-manual:hover {
  background: #4a2862;
}

.tooltip-trigger-manual span {
  font-size: 0.8em;
  transition: transform 0.2s;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  background: #1a1a1a;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  max-width: 300px;
  white-space: normal;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

/* Flecha del tooltip */
.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #1a1a1a;
}

.tooltip-manual {
  min-width: 280px;
  padding-right: 2.5rem;
}

.tooltip-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  line-height: 1;
  transition: background-color 0.2s;
}

.tooltip-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.tooltip-close:focus {
  outline: 2px solid #ffeb3b;
  outline-offset: 1px;
}

.info-box {
  background: #e3f2fd;
  border-left: 4px solid #2196F3;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  margin-top: 1.5rem;
}

.info-box h4 {
  color: #2196F3;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-box li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.info-box li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4CAF50;
  font-weight: bold;
}

@media (max-width: 768px) {
  .section {
    padding: 1.5rem;
  }
  
  .section h2 {
    font-size: 1.5rem;
  }
  
  .tooltip {
    position: fixed;
    left: 50%;
    bottom: auto;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 90vw;
  }
}
</style>

