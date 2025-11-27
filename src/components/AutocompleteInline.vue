<!--
  COMPONENTE: Autocompletado Inline Accesible
  
  Demuestra cómo implementar un campo de autocompletado tipo inline siguiendo las pautas ARIA.
  
  Características de Accesibilidad:
  - aria-autocomplete="inline": Indica que el texto se completa automáticamente en el campo
  - aria-describedby: Proporciona instrucciones de uso
  - Autocompletado automático mientras escribes
  - El texto completado se selecciona automáticamente para seguir escribiendo
  - Navegación natural con teclado
-->

<script setup>
import { ref, watch, nextTick } from 'vue'

const inputRef = ref(null)
const inputValue = ref('')
const lastUserInput = ref('')

// Lista de opciones de aves de corral
const poultryOptions = [
  'Chicken',
  'Turkey',
  'Duck',
  'Goose',
  'Quail',
  'Pheasant',
  'Guinea Fowl',
  'Partridge',
  'Peafowl',
  'Swan'
]

// Encontrar la primera coincidencia
function findMatch(value) {
  if (!value) return null
  
  const lowerValue = value.toLowerCase()
  return poultryOptions.find(option => 
    option.toLowerCase().startsWith(lowerValue)
  )
}

// Manejar el input del usuario
async function handleInput(event) {
  const value = event.target.value
  const cursorPosition = event.target.selectionStart
  
  // Si el usuario está borrando o el cursor no está al final, solo actualizar el valor
  if (value.length < lastUserInput.value.length || cursorPosition < value.length) {
    inputValue.value = value
    lastUserInput.value = value
    return
  }
  
  lastUserInput.value = value
  
  // Buscar coincidencia
  const match = findMatch(value)
  
  if (match && value.length > 0) {
    // Completar el texto
    inputValue.value = match
    
    // Esperar al siguiente tick para que Vue actualice el DOM
    await nextTick()
    
    // Seleccionar la parte autocompletada
    if (inputRef.value) {
      inputRef.value.setSelectionRange(value.length, match.length)
    }
  } else {
    inputValue.value = value
  }
}

// Manejar teclas especiales
function handleKeydown(event) {
  // Si presiona Tab y hay autocompletado, aceptarlo
  if (event.key === 'Tab' && inputValue.value !== lastUserInput.value) {
    event.preventDefault()
    lastUserInput.value = inputValue.value
    if (inputRef.value) {
      inputRef.value.setSelectionRange(inputValue.value.length, inputValue.value.length)
    }
  }
  
  // Si presiona Escape, limpiar
  if (event.key === 'Escape') {
    inputValue.value = ''
    lastUserInput.value = ''
  }
}

// Manejar cuando el input pierde el foco
function handleBlur() {
  // Mantener el valor completo si había autocompletado
  if (inputValue.value) {
    lastUserInput.value = inputValue.value
  }
}
</script>

<template>
  <section class="section">
    <h2>Autocompletado Inline Accesible</h2>
    <p class="section-description">
      Un campo de autocompletado tipo <strong>inline</strong> que completa automáticamente 
      el texto mientras escribes. El texto sugerido aparece seleccionado en el mismo campo.
    </p>

    <div class="autocomplete-container">
      <label for="input-inline" class="autocomplete-label">Pick your poultry</label>

      <div class="autocomplete">
        <input 
          ref="inputRef"
          type="text" 
          id="input-inline"
          class="autocomplete-input"
          :value="inputValue"
          @input="handleInput"
          @keydown="handleKeydown"
          @blur="handleBlur"
          aria-autocomplete="inline" 
          aria-describedby="instructions-inline"
          autocomplete="off"
          placeholder="Start typing..."
        >

        <div id="instructions-inline" class="sr-only">
          Begin typing to search, the field will be completed as you type
        </div>
      </div>

      <!-- Mostrar la selección actual -->
      <div v-if="inputValue && inputValue === lastUserInput" class="selected-value">
        <strong>Selected:</strong> {{ inputValue }}
      </div>
    </div>

    <!-- Explicación de características de accesibilidad -->
    <div class="info-box">
      <h3>🎯 Características de Accesibilidad:</h3>
      <ul>
        <li><strong>aria-autocomplete="inline":</strong> Indica que el texto se completa directamente en el campo.</li>
        <li><strong>Autocompletado automático:</strong> El texto se completa mientras escribes y aparece seleccionado.</li>
        <li><strong>Tab para aceptar:</strong> Presiona Tab para aceptar la sugerencia completa.</li>
        <li><strong>Escape para limpiar:</strong> Presiona Escape para borrar el campo.</li>
        <li><strong>Continuar escribiendo:</strong> El texto autocompletado se selecciona, así puedes seguir escribiendo para refinarlo.</li>
        <li><strong>Sin distracciones visuales:</strong> No hay listas emergentes, la experiencia es más simple y directa.</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.section {
  background: white;
  padding: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
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

.autocomplete-container {
  max-width: 500px;
  margin: 2rem 0;
}

.autocomplete-label {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.autocomplete {
  position: relative;
  width: 100%;
}

.autocomplete-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #d0d0d0;
  border-radius: 4px;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: white;
  color: #1a1a1a;
  font-family: inherit;
}

.autocomplete-input:hover {
  border-color: #3d4db8;
}

.autocomplete-input:focus {
  outline: none;
  border-color: #3d4db8;
  box-shadow: 0 0 0 3px rgba(61, 77, 184, 0.1);
}

/* Estilo para el texto seleccionado (autocompletado) */
.autocomplete-input::selection {
  background-color: #bbdefb;
  color: #1a1a1a;
}

.autocomplete-input::-moz-selection {
  background-color: #bbdefb;
  color: #1a1a1a;
}

/* Clase para ocultar visualmente pero mantener accesible para lectores de pantalla */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.selected-value {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: #e8f5e9;
  border-left: 4px solid #4CAF50;
  border-radius: 4px;
  color: #1b5e20;
}

.info-box {
  background: #f8f9fa;
  border-left: 4px solid #3d4db8;
  padding: 1.5rem;
  margin-top: 2rem;
  border-radius: 4px;
}

.info-box h3 {
  color: #3d4db8;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
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

.info-box code {
  background: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #d63384;
}

@media (max-width: 768px) {
  .section {
    padding: 1.5rem;
  }
  
  .section h2 {
    font-size: 1.5rem;
  }
  
  .autocomplete-container {
    max-width: 100%;
  }
}
</style>

