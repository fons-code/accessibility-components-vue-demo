<!--
  COMPONENTE: Autocompletado Accesible
  
  Demuestra cómo implementar un campo de autocompletado siguiendo las pautas ARIA.
  
  Características de Accesibilidad:
  - aria-autocomplete="list": Indica que muestra una lista de sugerencias
  - aria-controls: Vincula el input con la lista de resultados
  - aria-haspopup="listbox": Indica que aparecerá un listbox
  - aria-expanded: Indica si la lista está visible o no
  - aria-describedby: Proporciona instrucciones de uso
  - aria-live="assertive": Anuncia cambios importantes (cantidad de resultados)
  - role="listbox" y role="option": Define semánticamente la lista
  - Navegación con teclado: Flechas arriba/abajo, Enter, Escape
  - aria-activedescendant: Indica qué opción está seleccionada
-->

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const inputRef = ref(null)
const resultsRef = ref(null)
const searchTerm = ref('')
const selectedIndex = ref(-1)
const isExpanded = ref(false)

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

// Filtrar opciones basándose en el término de búsqueda
const filteredOptions = computed(() => {
  if (!searchTerm.value) {
    return []
  }
  return poultryOptions.filter(option =>
    option.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

// Contar resultados para aria-live
const resultsCount = computed(() => {
  if (!searchTerm.value) {
    return ''
  }
  const count = filteredOptions.value.length
  if (count === 0) {
    return 'No results found'
  } else if (count === 1) {
    return '1 result available'
  } else {
    return `${count} results available`
  }
})

// Manejar cambios en el input
function handleInput(event) {
  searchTerm.value = event.target.value
  selectedIndex.value = -1
  
  if (searchTerm.value && filteredOptions.value.length > 0) {
    isExpanded.value = true
  } else {
    isExpanded.value = false
  }
}

// Manejar navegación con teclado
function handleKeydown(event) {
  const optionsCount = filteredOptions.value.length
  
  if (!optionsCount) return
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (!isExpanded.value) {
        isExpanded.value = true
      }
      selectedIndex.value = selectedIndex.value < optionsCount - 1 
        ? selectedIndex.value + 1 
        : 0
      break
      
    case 'ArrowUp':
      event.preventDefault()
      if (!isExpanded.value) {
        isExpanded.value = true
      }
      selectedIndex.value = selectedIndex.value > 0 
        ? selectedIndex.value - 1 
        : optionsCount - 1
      break
      
    case 'Enter':
      event.preventDefault()
      if (selectedIndex.value >= 0 && isExpanded.value) {
        selectOption(filteredOptions.value[selectedIndex.value])
      }
      break
      
    case 'Escape':
      event.preventDefault()
      isExpanded.value = false
      selectedIndex.value = -1
      break
      
    case 'Tab':
      // Permitir Tab para salir del componente
      isExpanded.value = false
      selectedIndex.value = -1
      break
  }
}

// Seleccionar una opción
function selectOption(option) {
  searchTerm.value = option
  isExpanded.value = false
  selectedIndex.value = -1
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

// Manejar clic en una opción
function handleOptionClick(option, index) {
  selectOption(option)
}

// Manejar hover en opciones
function handleOptionHover(index) {
  selectedIndex.value = index
}

// Cerrar la lista al hacer clic fuera
function handleClickOutside(event) {
  if (resultsRef.value && !resultsRef.value.contains(event.target) && 
      inputRef.value && !inputRef.value.contains(event.target)) {
    isExpanded.value = false
    selectedIndex.value = -1
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <section class="section">
    <h2>Autocompletado Accesible</h2>
    <p class="section-description">
      Un campo de autocompletado implementado con las pautas ARIA para máxima accesibilidad.
      Navega con las flechas del teclado, selecciona con Enter y cierra con Escape.
    </p>

    <div class="autocomplete-container">
      <label for="input" id="label" class="autocomplete-label">Pick your poultry</label>

      <div class="autocomplete">
        <input 
          ref="inputRef"
          type="text" 
          id="input" 
          class="autocomplete-input"
          :value="searchTerm"
          @input="handleInput"
          @keydown="handleKeydown"
          aria-autocomplete="list" 
          aria-controls="results"
          aria-haspopup="listbox" 
          :aria-expanded="isExpanded.toString()"
          aria-describedby="instructions"
          :aria-activedescendant="selectedIndex >= 0 ? `option-${selectedIndex}` : ''"
          autocomplete="off"
          placeholder="Start typing..."
        >

        <div id="instructions" class="sr-only">
          Begin typing to search, use arrow keys to navigate, Enter to select
        </div>
        <div class="results-count sr-only" aria-live="assertive" aria-atomic="true">
          {{ resultsCount }}
        </div>
        
        <ul
          v-show="isExpanded && filteredOptions.length > 0"
          ref="resultsRef"
          id="results"
          class="results"
          role="listbox"
          aria-labelledby="label"
        >
          <li
            v-for="(option, index) in filteredOptions"
            :key="option"
            :id="`option-${index}`"
            role="option"
            :aria-selected="index === selectedIndex"
            :class="{ 'option-selected': index === selectedIndex }"
            @click="handleOptionClick(option, index)"
            @mouseenter="handleOptionHover(index)"
          >
            {{ option }}
          </li>
        </ul>
      </div>

      <!-- Mostrar la selección actual -->
      <div v-if="searchTerm && !isExpanded" class="selected-value">
        <strong>Selected:</strong> {{ searchTerm }}
      </div>
    </div>

    <!-- Explicación de características de accesibilidad -->
    <div class="info-box">
      <h3>🎯 Características de Accesibilidad:</h3>
      <ul>
        <li><strong>Navegación con teclado:</strong> Usa ↑ y ↓ para navegar, Enter para seleccionar, Escape para cerrar.</li>
        <li><strong>aria-autocomplete="list":</strong> Indica a los lectores de pantalla el tipo de autocompletado.</li>
        <li><strong>aria-expanded:</strong> Informa si la lista está visible o colapsada.</li>
        <li><strong>aria-activedescendant:</strong> Comunica qué opción está actualmente enfocada.</li>
        <li><strong>aria-live region:</strong> Anuncia la cantidad de resultados disponibles en tiempo real.</li>
        <li><strong>role="listbox" y role="option":</strong> Define semánticamente la lista y sus elementos.</li>
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

.results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0.25rem 0 0 0;
  padding: 0;
  list-style: none;
  background: white;
  border: 2px solid #3d4db8;
  border-radius: 4px;
  max-height: 250px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.results li {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.15s;
  color: #1a1a1a;
}

.results li:hover,
.results li.option-selected {
  background-color: #e8ebf7;
}

.results li[aria-selected="true"] {
  background-color: #3d4db8;
  color: white;
  font-weight: 600;
}

.results li:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
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

