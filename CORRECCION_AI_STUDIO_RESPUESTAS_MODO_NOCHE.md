# Corrección AI Studio · selección de respuestas y modo noche

Versión corregida para Práctica con AI Studio.

## Ajustes aplicados

- Se corrigió la selección de respuestas dentro de los laboratorios interactivos de AI Studio.
- Las opciones del `Option lab` de Inglés ahora guardan la respuesta real de la pregunta.
- Se sincronizó la selección entre el laboratorio interactivo, los botones oficiales de respuesta, el avance del bloque y la navegación superior.
- Se reforzó la interacción de botones con `pointer-events` para evitar que elementos internos bloqueen el clic.
- Se revisó y mejoró el fondo del modo noche con un esquema más oscuro, consistente y legible.
- Se reforzó el contraste de tarjetas, tablas, opciones, textos, barras y botones en modo noche.

## Archivos modificados

- `ai-studio-practica.js`
- `styles.css`

## Validación técnica

Se validaron sin errores de sintaxis:

- `app.js`
- `dashboard.js`
- `notebook.js`
- `ai-studio-practica.js`
- `data/question-bank.js`
