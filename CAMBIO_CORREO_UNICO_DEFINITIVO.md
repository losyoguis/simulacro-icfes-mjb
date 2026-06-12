# Cambio: correo único definitivo al estudiante

Se ajustó el envío del informe para que la app solicite únicamente el correo principal mostrado como:

**Simulador ICFES - M. · Informe Simulacro ICFES ... · PDF adjunto**

## Correos desactivados desde la app

La solicitud enviada al Apps Script ahora incluye banderas explícitas para NO enviar:

- `[COPIA INSTITUCIONAL]`.
- `[ENLACE PDF]`.
- Segundo correo de respaldo por `MailApp`.
- Notificación de Google Drive: `Elemento compartido contigo`.
- Copia, CC o BCC institucional por correo.

## Control anti-duplicado

También se agregó un bloqueo local por intento:

- Al iniciar el envío, el intento queda bloqueado en `localStorage`.
- Si el estudiante refresca, vuelve a hacer clic o se dispara el envío automático otra vez, la app no vuelve a enviar otra solicitud.
- Al completarse, el botón queda como `Informe enviado`.

## Nota de Apps Script

Para que el cambio sea efectivo en el backend ya desplegado, el Apps Script debe respetar estas banderas del payload:

- `emailPolicy: "student_pdf_attachment_only"`
- `sendInstitutionEmail: false`
- `sendPdfLinkEmail: false`
- `sendDriveLinkEmail: false`
- `sendBackupEmail: false`
- `useMailAppFallback: false`
- `shareDriveFileWithStudent: false`
- `savePdfToDrive: false`
- `oneEmailOnly: true`
- `maxEmails: 1`

Si el Code.gs anterior tenía envíos forzados por `GmailApp`, `MailApp`, enlace de Drive y copia institucional, se debe actualizar esa lógica para enviar solo el PDF adjunto al correo del estudiante.
