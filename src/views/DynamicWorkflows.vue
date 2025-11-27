<!--
  VISTA: Componentes Dinámicos y Flujos de Desarrollo Accesible
  
  Esta página describe las prácticas y flujos de desarrollo para crear
  componentes dinámicos manteniendo la accesibilidad.
-->

<script setup>
import { ref } from 'vue'
import AutocompleteAccessible from '../components/AutocompleteAccessible.vue'
import AutocompleteInline from '../components/AutocompleteInline.vue'

const mainContent = ref(null)
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

    </main>
  </div>
</template>

<style scoped>
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
}

@media (max-width: 480px) {
  .page-header {
    padding: 1.5rem 1rem;
  }
  
  .page-header h1 {
    font-size: 1.5rem;
  }
}
</style>

