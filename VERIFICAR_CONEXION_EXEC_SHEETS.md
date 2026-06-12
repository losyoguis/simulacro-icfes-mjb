# Verificación rápida de conexión Apps Script + Google Sheets

Esta versión está configurada con el Web App `/exec`:

https://script.google.com/macros/s/AKfycbw46l-QqQYo7Ah_P9cA85D2a_4miFYf70FfUK304aEfRRrw-HU0ziPfBEpM_n3vWFta/exec

Y con el Google Sheets oficial:

https://docs.google.com/spreadsheets/d/17FbkF9BulfEfAAoDFNkljdsXWjXQOH_cBB3r-Iizjxs/edit

## Pasos obligatorios

1. Copia el archivo `google-apps-script/Code.gs` completo.
2. Pégalo en el proyecto de Google Apps Script del simulador.
3. Guarda el proyecto.
4. Ejecuta `configurarConexionOficialMJB`.
5. Ejecuta `inicializarSistema`.
6. Ejecuta `probarRegistroLivianoDesdeApp` o `probarRegistroDashboard`.
7. Verifica que aparezca un registro de prueba en la hoja `Resultados`.
8. Ve a `Implementar > Administrar implementaciones > Editar`.
9. Selecciona `Nueva versión`.
10. Clic en `Implementar`.
11. Confirma que la URL `/exec` sea la misma configurada arriba.
12. Sube a GitHub Pages los archivos `index.html`, `app.js`, `dashboard.html`, `dashboard.js`, `styles.css` y la carpeta `data`.
13. Abre el simulador y limpia caché con `Cmd + Shift + R` en Mac o `Ctrl + Shift + R` en Windows.

## Prueba desde el navegador

Abre esta URL después de actualizar la implementación:

https://script.google.com/macros/s/AKfycbw46l-QqQYo7Ah_P9cA85D2a_4miFYf70FfUK304aEfRRrw-HU0ziPfBEpM_n3vWFta/exec?accion=ping

Debe mostrar un mensaje de backend activo o una respuesta JSON/JSONP.

## Si no llegan datos

Revisa en Apps Script:

- `Ejecuciones`
- Que el Web App esté como `Ejecutar como: Yo`
- Que el acceso esté como `Cualquier usuario`
- Que la cuenta ejecutora tenga permisos de edición sobre el Sheets oficial.

