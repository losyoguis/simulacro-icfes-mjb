# Cambio: modo de trabajo obligatorio en desplegable

## Objetivo
Convertir el selector de modo de trabajo en un desplegable llamativo y obligatorio antes de iniciar cualquier sesión o bloque.

## Cambios aplicados

- Se reemplazaron los botones tipo radio por un `<select>` obligatorio.
- Se agregó una opción inicial deshabilitada: “Elige un modo de trabajo antes de iniciar”.
- Se bloquean los botones de inicio de sesión/bloque hasta que exista un modo seleccionado.
- Si el usuario intenta avanzar sin elegir modo, se muestra un modal interno compatible con Google Sites.
- Se agregó una tarjeta de previsualización que explica el modo seleccionado.
- Se mantuvo el orden pedagógico:
  1. Entrenamiento con Notebook
  2. Entrenamiento con AI Studio
  3. Práctica sin tiempo
  4. SIMULACRO
- El modo SIMULACRO conserva una presentación visual destacada dentro del desplegable y la descripción.
- Se reforzó el diseño responsive para Google Sites, tablet y celular.
- Se ajustó contraste para modo día y modo noche.

## Archivos modificados

- `app.js`
- `styles.css`

## Validación

Se validaron los archivos JavaScript principales con `node --check` sin errores de sintaxis.
