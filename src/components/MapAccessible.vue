<!--
  COMPONENTE: Mapa Accesible
  
  Espacio preparado para integrar un mapa mediante iframe.
-->

<script setup>
</script>

<template>
  <section class="section">
    <h2>6. Mapa Interactivo Accesible</h2>
    <p class="section-description">
      Los mapas embebidos deben tener títulos descriptivos y estar correctamente 
      etiquetados para tecnologías de asistencia.
    </p>
    
   <iframe role="region" aria-label="Mapa de Walt Disney World Resort" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.3933300082085!2d-81.57074!3d28.3771857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dd7ee634caa5f7%3A0xa71e391fd01cf1a0!2sWalt%20Disney%20World%20Resort!5e0!3m2!1ses!2sus!4v1763608255303!5m2!1ses!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> 
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

@media (max-width: 768px) {
  .section {
    padding: 1.5rem;
  }
  
  .section h2 {
    font-size: 1.5rem;
  }
}
</style>

