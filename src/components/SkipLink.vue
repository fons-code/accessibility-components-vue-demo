<!--
  COMPONENTE: Skip Link (Enlace para Saltar al Contenido Principal)
  
  Propósito: Permite a los usuarios de teclado y lectores de pantalla
  saltar directamente al contenido principal sin tener que navegar
  por toda la navegación repetitiva.
  
  Características de Accesibilidad:
  - Es el primer elemento enfocable de la página
  - Solo visible cuando recibe el foco (:focus)
  - Enlaza con el elemento main mediante targetId
-->

<script setup>
defineProps({
  targetId: {
    type: String,
    default: 'main-content'
  }
})
</script>

<template>
  <a :href="`#${targetId}`" class="skip-link">
    Saltar al contenido principal
  </a>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #1a1a1a;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: bold;
  z-index: 1000;
  border-radius: 0 0 4px 0;
  /* Ocultar completamente cuando no tiene foco */
  opacity: 0;
  pointer-events: none;
  transition: top 0.2s ease, opacity 0.2s ease;
}

/* El skip link SOLO es visible cuando recibe el foco */
.skip-link:focus {
  top: 0;
  opacity: 1;
  pointer-events: auto;
  outline: 3px solid #ffeb3b;
  outline-offset: 2px;
}
</style>

