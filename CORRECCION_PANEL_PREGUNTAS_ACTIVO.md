# Corrección panel de preguntas activo

Se corrigió la navegación del panel lateral de preguntas para que, al seleccionar una pregunta, el panel se ubique automáticamente sobre el número seleccionado y no regrese visualmente al inicio del listado.

## Archivo modificado

- `app.js`

## Ajuste aplicado

Se agregó la función `keepActiveQuestionVisibleInPanel()`, llamada al final de `renderQuestionGrid()`, para centrar dentro del panel la pregunta activa después de cada renderizado.
