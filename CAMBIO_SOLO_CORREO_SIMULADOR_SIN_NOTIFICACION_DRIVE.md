# Cambio: un solo correo al estudiante

Se ajustó el flujo de envío para que, al finalizar el simulacro, el frontend realice un único envío principal con la acción `enviarInforme`.

## Objetivo

Evitar que el estudiante reciba dos mensajes:

1. Correo principal desde **Simulador ICFES**.
2. Notificación automática de Google Drive: **Elemento compartido contigo**.

## Ajustes en la app

- Se eliminaron los envíos previos livianos/detallados antes del correo final.
- El PDF se envía en una sola solicitud al Apps Script.
- Se agregaron banderas en el payload para solicitar al backend:
  - No compartir directamente el PDF con el estudiante por Drive.
  - No enviar notificación de Drive.
  - Usar únicamente el correo directo de Simulador ICFES.

## Nota para Apps Script

Si la implementación actual de Apps Script sigue enviando la notificación de Drive, se debe actualizar `Code.gs` para no ejecutar `addViewer(studentEmail)` ni crear permisos directos de Drive con notificación al estudiante. En ese caso, debe quedar solo el correo enviado por GmailApp/MailApp desde el sistema.
