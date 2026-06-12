# Corrección: Entrenamiento con Notebook y regreso a la pregunta

Se ajustó el flujo del modo **Entrenamiento con Notebook** para uso embebido en Google Sites.

## Cambios

- El Notebook ya no se abre como pestaña nueva desde la práctica: ahora navega dentro del mismo iframe/pantalla.
- Antes de abrir Notebook, se guarda el intento actual, el estudiante, la sesión y la pregunta activa.
- El botón **Volver a la pregunta** intenta regresar con el historial del navegador y, si no es posible, usa una URL segura de retorno.
- Se agregó respaldo en `sessionStorage` además de `localStorage`, útil cuando Google Sites o el navegador limitan almacenamiento de terceros.
- Se agregó guardado automático antes de salir de la página y cuando la pestaña queda oculta.

## Resultado esperado

Al abrir Notebook y presionar **Volver a la pregunta**, el estudiante debe regresar a la misma pregunta sin sentir que cerró sesión.
