<!--
  VISTA: Componentes Dinámicos y Flujos de Desarrollo Accesible
  
  Esta página describe las prácticas y flujos de desarrollo para crear
  componentes dinámicos manteniendo la accesibilidad.
-->

<script setup>
import { ref, computed, watch } from 'vue'
import AutocompleteAccessible from '../components/AutocompleteAccessible.vue'
import AutocompleteInline from '../components/AutocompleteInline.vue'

const mainContent = ref(null)

// Estado del filtro en vivo
const filterText = ref('')
const resultsCountEl = ref(null)

// Lista de productos
const productos = [
  { id: 1, nombre: 'Producto A', categoria: 'Electrónica' },
  { id: 2, nombre: 'Producto B', categoria: 'Hogar' },
  { id: 3, nombre: 'Producto C', categoria: 'Deportes' },
  { id: 4, nombre: 'Tablet Premium', categoria: 'Electrónica' },
  { id: 5, nombre: 'Lámpara LED', categoria: 'Hogar' },
  { id: 6, nombre: 'Balón de Fútbol', categoria: 'Deportes' },
  { id: 7, nombre: 'Auriculares Bluetooth', categoria: 'Electrónica' },
  { id: 8, nombre: 'Cojines Decorativos', categoria: 'Hogar' }
]

// Productos filtrados
const productosFiltrados = computed(() => {
  if (!filterText.value.trim()) {
    return productos
  }
  
  const busqueda = filterText.value.toLowerCase()
  return productos.filter(producto => 
    producto.nombre.toLowerCase().includes(busqueda) ||
    producto.categoria.toLowerCase().includes(busqueda)
  )
})

// Observar cambios en el filtro para anunciar resultados
watch(productosFiltrados, (nuevosResultados) => {
  if (resultsCountEl.value) {
    const count = nuevosResultados.length
    resultsCountEl.value.textContent = 
      count === 1 
        ? `${count} resultado encontrado` 
        : `${count} resultados encontrados`
  }
}, { immediate: true })
</script>

<template>
  <div class="view-container">
    <!-- Contenido principal con id para el skip link -->
    <main id="main-content" ref="mainContent" tabindex="-1" class="main-content">
      
      <!-- Título principal de la página -->
      <div class="page-header">
        <h1>Componentes dinámicos y flujos de desarrollo accesible</h1>
      </div>
      <div class="autocomplete-container">
      <!-- Componente de Autocompletado List -->
      <AutocompleteAccessible />

      <!-- Componente de Autocompletado Inline -->
      <AutocompleteInline />

      </div>

      <!-- Sección de Filtro en Vivo -->
      <section aria-label="product filter" class="live-filter-section">
        <div class="sr-only">
          El siguiente campo de texto filtra los resultados que siguen mientras escribe.
          Use Tab para acceder a los resultados.
        </div>

        <div class="filter-header">
          <h2>Filtro de Productos en Tiempo Real</h2>
          <p>Busca productos por nombre o categoría. Los resultados se actualizan automáticamente.</p>
        </div>

        <div class="filter-control">
          <label for="filter">Buscar producto</label>
          <input 
            id="filter" 
            type="text" 
            v-model="filterText"
            placeholder="Escribe para filtrar..."
            aria-describedby="filter-instructions"
          >
        </div>

        <div 
          ref="resultsCountEl"
          class="results-count sr-only" 
          aria-live="assertive"
          aria-atomic="true"
        ></div>

        <div class="results-container">
          <ul class="products-list" role="list">
            <li 
              v-for="producto in productosFiltrados" 
              :key="producto.id"
              class="product-item"
            >
              <span class="product-name">{{ producto.nombre }}</span>
              <span class="product-category">{{ producto.categoria }}</span>
            </li>
          </ul>

          <div v-if="productosFiltrados.length === 0" class="no-results">
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
/* Clase para contenido solo visible para lectores de pantalla */
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

.autocomplete-container {
  margin: 0 auto;
  display: grid;
  place-items: center;
}

.view-container {
  width: 100%;
  min-height: 100%;
  margin-top: 600px;
}

.main-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 1rem;
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

/* Estilos para la sección de filtro en vivo */
.live-filter-section {
  margin-top: 4rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.filter-header {
  text-align: center;
  margin-bottom: 2rem;
}

.filter-header h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.filter-header p {
  color: #666;
  font-size: 1rem;
}

.filter-control {
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.filter-control label {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.filter-control input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.filter-control input:focus {
  outline: none;
  border-color: #3d4db8;
  box-shadow: 0 0 0 3px rgba(61, 77, 184, 0.1);
}

.results-container {
  margin-top: 2rem;
}

.products-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.product-item {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.product-item:hover {
  border-color: #3d4db8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(61, 77, 184, 0.15);
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.product-category {
  font-size: 0.9rem;
  color: #666;
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
}

.no-results {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem;
  }
  
  .page-header h1 {
    font-size: 1.8rem;
  }
  
  .main-content {
    padding: 1rem;
  }

  .live-filter-section {
    padding: 1.5rem;
  }

  .filter-header h2 {
    font-size: 1.6rem;
  }

  .products-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 1.5rem 1rem;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }

  .live-filter-section {
    padding: 1rem;
  }

  .filter-header h2 {
    font-size: 1.4rem;
  }

  .filter-control input {
    font-size: 0.95rem;
  }
}
</style>

