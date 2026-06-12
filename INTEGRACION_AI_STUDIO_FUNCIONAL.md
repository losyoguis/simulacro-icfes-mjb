# Integración funcional · Práctica con AI Studio

Esta versión integra un modo independiente llamado **Práctica con AI Studio** dentro del simulador ICFES de la Institución Educativa Manuel J. Betancur.

## Qué se corrigió

La integración ya no depende de abrir una aplicación React/Vite dentro de un iframe. Esa forma puede fallar al abrir el ZIP localmente o al publicarlo en algunas rutas de GitHub Pages.

Ahora el modo **Práctica con AI Studio** funciona con HTML, CSS y JavaScript puro, usando directamente el banco interno `data/question-bank.js`.

## Cómo usarlo

1. Ingresar al simulador con nombre, grupo y correo del estudiante.
2. En **Modo de trabajo**, elegir **Práctica con AI Studio**.
3. Seleccionar sesión completa o bloque por área.
4. Se abre la página `ai-studio-practica.html` con:
   - preguntas del bloque seleccionado,
   - escáner táctico AI Studio,
   - simulador didáctico paso a paso,
   - retroalimentación inmediata,
   - tarjetas de entrenamiento.

## Archivos agregados

- `ai-studio-practica.html`
- `ai-studio-practica.js`

## Archivos modificados

- `app.js`
- `styles.css`

El resto del sistema se conserva: Simulacro, Práctica con Notebook, entrenamiento sin tiempo, dashboard, PDF, Google Sheets, Drive y envío de correos.
