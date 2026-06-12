# Actualización: PDF individual desde el dashboard

Esta versión agrega la descarga de PDF individual directamente en el Dashboard Institucional.

## Cambios

- En la tabla **Ranking y seguimiento**, la columna **PDF** ahora muestra siempre el botón **Descargar PDF**.
- Si el registro ya tiene PDF guardado en Drive, también aparece **Abrir Drive**.
- Si el registro todavía no tiene enlace de Drive, el dashboard genera un PDF local con los datos disponibles del estudiante.
- El backend `Code.gs` también genera automáticamente un PDF simple en Drive cuando recibe el resultado liviano del simulacro, incluso antes de que llegue el PDF completo desde el navegador.

## Después de actualizar

1. Reemplaza el `Code.gs` en Apps Script.
2. Ejecuta `configurarConexionOficialMJB`.
3. Ejecuta `inicializarSistema`.
4. Implementa como **Nueva versión**.
5. Sube los archivos nuevos a GitHub Pages.
6. Limpia caché con `Cmd + Shift + R` o `Ctrl + Shift + R`.

