# ICFES Digital Saber 11 - Prepárate para el ICFES con inteligencia artificial

Versión actualizada con banco de preguntas incorporado hasta **Inglés 134** y sistema de informes institucionales.

## Actualización realizada

- Se integró el nombre institucional **Institución Educativa Manuel J. Betancur** en la app, en la página de resultados y en el PDF.
- Se conserva el ingreso con **nombre y apellido completo**, **grupo** y **correo electrónico del estudiante**.
- Se conserva la descarga del **informe PDF individual** con gráficos.
- Se conserva el envío automático del informe al estudiante y a `pruebas@iemanueljbetancur.edu.co` mediante Google Apps Script.
- El backend de Google Apps Script ahora guarda los datos en Google Sheets y genera análisis automático:
  - **Resultados** generales.
  - **Respuestas_Detalladas** por pregunta.
  - **Analisis_Estudiantes**.
  - **Analisis_Grupos**.
  - **Analisis_Areas**.
  - **Informe_Institucional** tipo ICFES interno con gráficos y recomendaciones pedagógicas.
- Al finalizar cada intento, Google Sheets se actualiza automáticamente.
- Se mantiene el botón **Tips** y el botón **Instrucciones**.
- Se mantiene el botón **Descargar informe PDF** y el botón **Enviar informe PDF**.
- Al seleccionar una respuesta, la pantalla permanece en la misma zona; no avanza automáticamente.
- La navegación entre preguntas se realiza únicamente con **Anterior**, **Siguiente** o el panel numérico.

## Uso en GitHub Pages

1. Sube todos los archivos a un repositorio.
2. Activa GitHub Pages desde la rama principal.
3. Abre `index.html`.

Incluye `.nojekyll` para publicación directa e incrustación en Google Sites.

## Envío y análisis institucional con Google Sheets

La carpeta `google-apps-script/` contiene el backend necesario para:

- Enviar el informe PDF individual.
- Guardar los resultados en Google Sheets.
- Analizar resultados por estudiante.
- Analizar resultados por grupo.
- Analizar resultados por área.
- Generar un informe general institucional tipo ICFES para la **Institución Educativa Manuel J. Betancur**.

Consulta `ACTIVAR_ENVIO_AUTOMATICO.md`. En esta versión la URL `/exec` ya quedó configurada en `app.js`.


### Mejora de entrega al estudiante

El estudiante recibe un correo liviano con enlace al PDF guardado en Drive. La copia institucional llega a `pruebas@iemanueljbetancur.edu.co` con el PDF adjunto. El estado técnico se registra en la hoja `Registro_Envios`.

### Corrección v5 de correo al estudiante

Se corrigió la prueba manual de Apps Script para que no requiera parámetros. Además, el envío al estudiante ahora se realiza con una estrategia reforzada: mensaje principal por `GmailApp` y mensaje de respaldo en texto plano por `MailApp`. El estado técnico queda registrado en la hoja `Registro_Envios`.


## Dashboard institucional

Esta versión incluye `dashboard.html`, una página para analizar resultados globales, por grupo e individuales de la Institución Educativa Manuel J. Betancur.

Para activarlo, actualiza el archivo `google-apps-script/Code.gs`, crea una nueva versión de la implementación de Apps Script y abre el botón **Dashboard institucional** desde la app principal.

Consulta el archivo `ACTIVAR_DASHBOARD_INSTITUCIONAL.md` para el paso a paso.

## Nota de corrección del dashboard institucional

Si el Google Sheets aparece vacío con solo `Hoja 1`, pega el nuevo `Code.gs` y ejecuta estas funciones en Apps Script:

1. `usarEstaHojaComoBaseDeDatos`
2. `inicializarSistema`

Después crea una nueva versión de la implementación Web App.

## Corrección dashboard institucional

Esta versión conecta el Apps Script directamente con el Google Sheets oficial del dashboard institucional de la I.E. Manuel J. Betancur y cambia el envío de resultados a un formulario oculto compatible con GitHub Pages y ejecución local.

Para activar correctamente, consulta `ACTIVAR_DASHBOARD_INSTITUCIONAL.md`.

## Corrección de conexión con Google Sheets

Esta versión usa como base oficial el archivo `ICFES` compartido por la Institución Educativa Manuel J. Betancur:

`17FbkF9BulfEfAAoDFNkljdsXWjXQOH_cBB3r-Iizjxs`

El dashboard tiene doble vía de lectura:

1. Apps Script Web App.
2. Lectura directa de respaldo desde Google Sheets, si Apps Script no responde.


## Actualización v7

Se reforzó el envío real de resultados a Google Sheets y al dashboard institucional. El sistema registra primero un resumen liviano confirmado y luego envía el detalle por pregunta en lotes pequeños.


## Actualización: Notebook en Entrenamiento con Notebook

Esta versión agrega una sección formativa visible únicamente cuando el estudiante trabaja en el modo **Entrenamiento con Notebook**. En cada pregunta aparece el bloque **Notebook**, con acceso a cinco recursos de preparación:

1. Mapa mental.
2. Video guía.
3. Audio de orientación.
4. Presentación de estudio.
5. Infografía.

Cada recurso se abre en `notebook.html` y se genera de forma contextual según la pregunta, el área, la competencia, el componente y la dificultad. El objetivo es preparar al estudiante sin revelar directamente la respuesta correcta.


## Actualización responsive tipo app móvil

Esta versión incorpora un rediseño responsive tipo app móvil para el simulador, el dashboard y el Notebook. Incluye cabecera fija con efecto app, botones táctiles, tarjetas adaptativas, tablas convertidas en tarjetas en celular, navegación inferior fija en preguntas, compatibilidad con áreas seguras de iOS/Android y manifest web para experiencia instalable desde el navegador.


## Actualización: Super simuladores AI Studio · Matemáticas S2 P29-P50

Se agregó un súper simulador dinámico e interactivo en `ai-studio-practica.html` para la Sección 2 de Matemáticas, preguntas 29 a 50. Para usarlo: seleccionar `Entrenamiento con AI Studio` en la pantalla inicial y luego elegir el bloque de Matemáticas 29 a 50 de la Sesión 2.

## Actualización AI Studio · Inglés Sección 2

Se agregó el **Súper Simulador de Inglés** para la Sección 2, preguntas 80 a 134. El módulo incluye entrenamiento interactivo para vocabulario, avisos, conversaciones, cloze text y comprensión lectora, con gráficas animadas, context scanner, laboratorio de opciones y retroalimentación inmediata.
