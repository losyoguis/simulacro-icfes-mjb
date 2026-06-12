# Corrección de botones del Dashboard en Google Sites

Se corrigió el comportamiento de los botones **Exportar PDF** y **Borrar datos Sheets** cuando la app se usa embebida dentro de Google Sites.

## Cambios aplicados

- El botón **Exportar PDF** ya no depende de `window.print()`, porque esta función suele fallar o imprimir el contenedor completo de Google Sites cuando está dentro de un iframe.
- Ahora se genera un PDF institucional directamente desde JavaScript con los datos filtrados del dashboard.
- Se agregó una ventana interna con opciones manuales: **Descargar PDF**, **Abrir PDF** y **Abrir aquí**, para casos en los que Google Sites bloquee la descarga automática.
- El botón **Borrar datos Sheets** ya no usa `confirm()` ni `prompt()`, porque los navegadores pueden bloquear estos diálogos dentro de iframes externos.
- Ahora se usa un modal interno compatible con Google Sites, donde se escribe la confirmación y la clave institucional.
- Se reforzó el diseño responsive y el contraste del modal en modo día y modo noche.

## Archivos modificados

- `dashboard.js`
- `styles.css`
