# Demo de Componentes Accesibles en Vue.js

Este proyecto fue desarrollado como **material educativo para una capacitación de frontend** sobre accesibilidad web y mejores prácticas en Vue.js.

## 📚 Descripción

Este es un proyecto demostrativo que muestra cómo crear componentes web accesibles usando Vue 3. Incluye ejemplos prácticos de componentes interactivos que siguen las pautas WCAG (Web Content Accessibility Guidelines) y patrones ARIA.

El objetivo principal es enseñar a los desarrolladores frontend cómo implementar accesibilidad desde el inicio del desarrollo, no como una característica adicional.

## 🎯 Componentes Incluidos

El proyecto incluye los siguientes componentes accesibles:

### Componentes de Navegación
- **SkipLink**: Enlace para saltar al contenido principal (mejora la navegación por teclado)
- **Menú de navegación responsive**: Con soporte completo para teclado y lectores de pantalla

### Componentes Interactivos
- **Accordion (Acordeón)**: Expandible/colapsable con navegación por teclado
- **Modal (Diálogo)**: Ventana modal con gestión de foco y tecla ESC
- **Tooltip (Información emergente)**: Información contextual accesible
- **Autocomplete**: Búsqueda con sugerencias accesibles
- **Autocomplete Inline**: Variante de autocompletado con opciones embebidas
- **Pagination (Paginación)**: Navegación entre páginas con indicadores claros

### Componentes Especializados
- **Mapa Accesible**: Mapa interactivo con alternativas textuales
- **Gestión de Foco**: Ejemplos de manejo correcto del foco en flujos dinámicos

## 🚀 Tecnologías Utilizadas

- **Vue 3**: Framework JavaScript progresivo
- **Vite**: Herramienta de desarrollo rápida
- **Vue Router**: Enrutamiento del lado del cliente
- **ARIA**: Atributos para mejorar la accesibilidad

## 📦 Instalación

### Requisitos previos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. Clona o descarga este repositorio:
```bash
git clone [url-del-repositorio]
cd accessibility-components-vue-demo
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en la dirección que aparece en la terminal (generalmente `http://localhost:5173`)

## 🎮 Cómo Usar

Una vez que el proyecto esté corriendo:

1. **Navega por los diferentes componentes**: Cada sección muestra un componente diferente con su implementación
2. **Prueba con el teclado**: Intenta navegar usando solo la tecla Tab, Enter, Escape y las flechas
3. **Activa un lector de pantalla**: Prueba con NVDA (Windows), JAWS (Windows) o VoiceOver (Mac)
4. **Inspecciona el código**: Revisa cada componente en la carpeta `src/components/` para ver cómo está implementado

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── AccordionAccessible.vue
│   ├── AutocompleteAccessible.vue
│   ├── AutocompleteInline.vue
│   ├── FocusManagement.vue
│   ├── MapAccessible.vue
│   ├── ModalAccessible.vue
│   ├── PaginationAccessible.vue
│   ├── SkipLink.vue
│   └── TooltipAccessible.vue
├── views/               # Vistas/páginas
│   ├── Home.vue
│   └── DynamicWorkflows.vue
├── router/              # Configuración de rutas
│   └── index.js
├── App.vue              # Componente principal
└── main.js              # Punto de entrada
```

## 🔑 Características de Accesibilidad

Cada componente implementa:

✅ **Navegación por teclado completa**
- Tab, Shift+Tab, Enter, Escape, flechas direccionales

✅ **Atributos ARIA apropiados**
- Roles, estados y propiedades semánticas

✅ **Gestión inteligente del foco**
- El foco se mueve de forma lógica y predecible

✅ **Indicadores visuales claros**
- Contrastes de color adecuados (WCAG AA)
- Estados de foco visibles

✅ **Anuncios para lectores de pantalla**
- Regiones ARIA live para cambios dinámicos
- Etiquetas descriptivas

✅ **Diseño responsive**
- Funciona en dispositivos móviles y desktop

## 🛠️ Scripts Disponibles

```bash
# Modo desarrollo (con hot-reload)
npm run dev

# Compilar para producción
npm run build

# Vista previa del build de producción
npm run preview
```

## 📖 Recursos Adicionales

Para aprender más sobre accesibilidad web:

- [MDN Web Docs - Accessibility](https://developer.mozilla.org/es/docs/Web/Accessibility)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Vue.js Accessibility Guide](https://vuejs.org/guide/best-practices/accessibility.html)

## 📝 Notas

Este proyecto fue creado con fines educativos durante una capacitación de frontend. Cada componente está documentado con comentarios explicativos para facilitar el aprendizaje.

## 📄 Licencia

Este proyecto es de código abierto y está disponible con fines educativos.

---

