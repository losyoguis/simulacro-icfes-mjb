# Actualización v13 - Corrección envío de e-mail al estudiante

Esta versión corrige el envío del informe al correo del estudiante registrado al inicio del simulador.

## Cambios principales

1. El correo del estudiante se envía ahora desde el registro liviano confirmado en Apps Script, no depende del envío pesado del PDF desde el navegador.
2. El estudiante recibe un correo directo, independiente, sin CC ni BCC, con enlace al PDF guardado en Drive.
3. Si el envío directo con GmailApp falla, el script intenta enviar por MailApp.
4. La copia institucional se envía por separado a pruebas@iemanueljbetancur.edu.co.
5. El sistema evita correos duplicados usando el ID de envío del intento.
6. El estado técnico queda registrado en la hoja Registro_Envios.

## Pasos obligatorios

1. Reemplazar el archivo `Code.gs` en Google Apps Script.
2. Guardar el proyecto.
3. Ejecutar `configurarConexionOficialMJB`.
4. Ejecutar `inicializarSistema`.
5. Implementar > Administrar implementaciones > Editar > Nueva versión > Implementar.
6. Subir a GitHub Pages los archivos actualizados del ZIP.
7. Limpiar caché del navegador con Cmd + Shift + R o Ctrl + Shift + R.
8. Hacer una prueba con un correo de estudiante real, diferente a pruebas@iemanueljbetancur.edu.co.

## Verificación

Después de finalizar un intento, revisar:

- Hoja `Resultados`: debe aparecer el intento del estudiante.
- Hoja `Registro_Envios`: debe aparecer el estado de envío al estudiante.
- Correo del estudiante: debe recibir el informe con enlace al PDF.
- Correo institucional: debe recibir copia separada.
