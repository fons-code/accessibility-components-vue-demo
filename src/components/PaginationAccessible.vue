<!--
  COMPONENTE: Paginación Accesible
  
  La paginación permite navegar entre diferentes páginas de contenido.
  
  Características de Accesibilidad:
  - Envuelto en <nav> con aria-label para identificar el propósito
  - Cada página es un <button> para accesibilidad por teclado
  - aria-current="page" marca la página activa/actual
  - aria-label descriptivo para cada botón
  - aria-live="polite" anuncia cambios de página a lectores de pantalla
  - aria-atomic="true" asegura que se anuncie todo el mensaje
-->

<script setup>
import { ref } from 'vue'

const currentPage = ref(3)
const totalPages = 5

// Cambiar de página
function changePage(pageNumber) {
  currentPage.value = pageNumber
}
</script>

<template>
  <section class="section">
    <h2>3. Paginación Accesible</h2>
    <p class="section-description">
      La paginación debe indicar claramente cuál es la página actual usando
      <code>aria-current="page"</code>. Esto permite a los lectores de pantalla
      anunciar la página activa.
    </p>
    
    <!--
      Navegación de paginación:
      - Usamos <nav> con aria-label para identificar el propósito
      - Cada página es un <button> para asegurar accesibilidad por teclado
      - aria-current="page" marca la página actual
      - aria-label descriptivo para cada botón (ej: "Ir a página 1")
    -->
    <nav aria-label="Paginación de resultados" class="pagination">
      <a
        href="#"
        v-for="page in totalPages"
        :key="page"
        :aria-current="page === currentPage ? 'page' : undefined"
        :aria-label="`${page === currentPage ? 'Página actual, página' : 'Ir a página'} ${page}`"
        :class="['pagination-button', { 'pagination-button-active': page === currentPage }]"
        @click="changePage(page)"
      >
        {{ page }}
      </a>
    </nav>
    
    <!--
      Región de anuncio en vivo:
      - aria-live="polite" anuncia cambios sin interrumpir al usuario
      - aria-atomic="true" hace que se lea todo el mensaje completo
    -->
    <p class="pagination-status" aria-live="polite" aria-atomic="true">
      Página actual: {{ currentPage }} de {{ totalPages }}
    </p>
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

.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1.5rem 0;
}

.pagination-button {
  background: white;
  border: 2px solid #3d4db8;
  color: #3d4db8;
  padding: 0.5rem 1rem;
  min-width: 44px;
  min-height: 44px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
}

.pagination-button:hover {
  background: #e8ebf7;
}

.pagination-button:focus {
  outline: 3px solid #1565c0;
  outline-offset: 2px;
}

.pagination-button-active {
  background: #3d4db8;
  color: white;
  cursor: default;
}

.pagination-button-active:hover {
  background: #3d4db8;
}

.pagination-status {
  text-align: center;
  font-weight: 600;
  color: #3d4db8;
  margin-top: 1rem;
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

