<!--
  COMPONENTE: Gestión de Foco y tabindex
  
  Demuestra cómo controlar el foco programáticamente y el uso correcto de tabindex.
  
  Características de Accesibilidad:
  - tabindex="-1": Hace elementos enfocables programáticamente (no por Tab)
  - tabindex="0": Hace elementos no interactivos enfocables en orden natural
  - tabindex > 0: ¡NUNCA USAR! Rompe el orden natural del DOM
  - .focus() permite mover el foco programáticamente
  - Es importante devolver el foco al origen después de interacciones
  
  NOTA EDUCATIVA IMPORTANTE:
  - tabindex > 0 destruye el orden natural de navegación y crea confusión
  - Preferir siempre elementos semánticos (<button>, <a>) que son enfocables naturalmente
  - Solo usar tabindex cuando sea absolutamente necesario
-->

<script setup>
import { ref, nextTick } from 'vue'

const buttonA = ref(null)
const focusTarget = ref(null)
const showFocusMessage = ref(false)

// Mover el foco al div informativo cuando se hace clic en Botón A
async function moveFocusToTarget() {
  showFocusMessage.value = true
  await nextTick()
  if (focusTarget.value) {
    focusTarget.value.focus()
  }
}

// Devolver el foco al Botón A
function returnFocusToButtonA() {
  showFocusMessage.value = false
  if (buttonA.value) {
    buttonA.value.focus()
  }
}
</script>

<template>
  <section class="section">
    <h2>5. Gestión de Foco y tabindex</h2>
    <p class="section-description">
      Podemos controlar el foco programáticamente para mejorar la experiencia
      del usuario. <code>tabindex="-1"</code> hace que un elemento sea
      enfocable programáticamente pero no por tabulación.
    </p>
    
    <!--
      IMPORTANTE: Notas sobre tabindex
      
      - tabindex="0": Hace que un elemento no interactivo sea enfocable
        y lo coloca en el orden natural del DOM. Solo usar cuando sea
        absolutamente necesario (mejor convertir a <button> o <a>).
      
      - tabindex="-1": Hace que un elemento sea enfocable programáticamente
        (con JavaScript) pero NO mediante la tecla Tab. Útil para gestión
        de foco dinámico.
      
      - tabindex > 0: ¡NUNCA USAR! Rompe el orden natural de navegación
        del DOM y crea una experiencia confusa e impredecible para usuarios
        de teclado y lectores de pantalla. Es una mala práctica.
    -->
    
    <div class="focus-demo">
      <div class="focus-buttons">
        <button
          ref="buttonA"
          class="button-secondary"
          @click="moveFocusToTarget"
        >
          Botón A: Mover Foco
        </button>
        
      </div>
      
      <!--
        Elemento enfocable programáticamente:
        - tabindex="-1" permite que reciba foco mediante JavaScript
        - NO es accesible mediante Tab (solo programáticamente)
        - Cuando recibe el foco, los lectores de pantalla anunciarán su contenido
      -->
      <div
        v-show="showFocusMessage"
        ref="focusTarget"
        tabindex="-1"
        class="focus-target"
      >
        <p>
          <strong>¡Elemento enfocado!</strong><br>
          Este elemento tiene <code>tabindex="-1"</code>, por lo que solo puede
          recibir foco programáticamente, no mediante la tecla Tab.
        </p>
        <button
          class="button-secondary"
          @click="returnFocusToButtonA"
        >
          Botón B: Devolver Foco al Botón A
        </button>
      </div>
    </div>

    <!-- Explicación adicional sobre mejores prácticas -->
    <div class="info-box">
      <h3>💡 Mejores Prácticas de tabindex:</h3>
      <ul>
        <li><strong>Evitar tabindex en elementos interactivos:</strong> Los elementos como <code>&lt;button&gt;</code> y <code>&lt;a&gt;</code> ya son enfocables naturalmente.</li>
        <li><strong>Usar tabindex="-1" para gestión dinámica:</strong> Útil para mover el foco a encabezados, mensajes de error, o contenido dinámico.</li>
        <li><strong>Nunca usar tabindex > 0:</strong> Crea un orden de tabulación impredecible que confunde a los usuarios.</li>
        <li><strong>Mantener el orden lógico:</strong> El orden de tabulación debe seguir el orden visual y el flujo de lectura natural.</li>
      </ul>
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

.focus-demo {
  padding: 1rem;
  border: 2px dashed #ddd;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.focus-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
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

.focus-target {
  background: #e3f2fd;
  border: 2px solid #2196F3;
  border-radius: 4px;
  padding: 1.5rem;
  margin-top: 1rem;
}

/* Indicador visual cuando el focus-target recibe el foco */
.focus-target:focus {
  outline: 3px solid #1565c0;
  outline-offset: 2px;
  background: #bbdefb;
}

.focus-target p {
  margin-bottom: 1rem;
}

.focus-target code {
  background: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #d63384;
}

.info-box {
  background: #f8f9fa;
  border-left: 4px solid #3d4db8;
  padding: 1.5rem;
  margin-top: 1.5rem;
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
  
  .focus-buttons {
    flex-direction: column;
  }
}
</style>

