# Activar envío automático y análisis institucional

La app está preparada para enviar automáticamente el informe PDF al estudiante y a:

`pruebas@iemanueljbetancur.edu.co`

Además, el backend genera una base de resultados en Google Sheets, guarda una copia institucional del PDF en Drive y crea un informe general tipo ICFES para la **Institución Educativa Manuel J. Betancur**.

## Paso a paso

1. Entra a https://script.google.com/
2. Crea un proyecto nuevo.
3. Copia el contenido del archivo:

   `google-apps-script/Code.gs`

4. Pégalo en el archivo `Code.gs` del proyecto de Apps Script.
5. Haz clic en **Implementar > Nueva implementación**.
6. Selecciona el tipo **Aplicación web**.
7. Configura:
   - **Ejecutar como:** Tú.
   - **Quién tiene acceso:** Cualquier usuario.
8. Autoriza los permisos solicitados.
9. Copia la URL que termina en `/exec`.
10. En esta versión el archivo `app.js` ya quedó configurado con la URL `/exec` suministrada:

```js
const REPORT_EMAIL_ENDPOINT = "https://script.google.com/macros/s/AKfycbw46l-QqQYo7Ah_P9cA85D2a_4miFYf70FfUK304aEfRRrw-HU0ziPfBEpM_n3vWFta/exec";
```

11. Guarda los cambios y vuelve a subir la app a GitHub Pages.

## Funcionamiento automático

Al finalizar el intento, el sistema:

- Genera el PDF individual con gráficos.
- Envía el PDF al correo del estudiante.
- Envía copia automática a `pruebas@iemanueljbetancur.edu.co`.
- Guarda una copia del PDF en Drive en la ruta `Simulador ICFES Saber 11 - Manuel J. Betancur / Informes PDF / grupo`.
- Guarda el resultado en Google Sheets, incluyendo el enlace del PDF en Drive.
- Actualiza las hojas de análisis:
  - `Resultados`
  - `Respuestas_Detalladas`
  - `Analisis_Estudiantes`
  - `Analisis_Grupos`
  - `Analisis_Areas`
  - `Informe_Institucional`

## Guardado automático del PDF en Drive

Cada vez que un estudiante envía el informe, el backend crea una copia institucional del PDF en Drive. La estructura queda así:

```txt
Simulador ICFES Saber 11 - Manuel J. Betancur
└── Informes PDF
    ├── 11-1
    ├── 11-2
    └── 11-3
```

El nombre del archivo incluye la fecha, el grupo y el nombre del estudiante. Además, en la hoja `Resultados` quedan las columnas `PDF en Drive` e `ID PDF en Drive` para consultar el archivo posteriormente.

## Informe general institucional

Para actualizarlo manualmente desde Apps Script, ejecuta la función:

```js
generarInformeInstitucional()
```

También puedes abrir la URL `/exec` del Web App en el navegador. Allí aparecerá un enlace para actualizar y ver el análisis institucional.

El informe institucional incluye:

- Promedio general institucional.
- Distribución por niveles internos.
- Comparativo por grupo: 11-1, 11-2 y 11-3.
- Resultado por área evaluada.
- Áreas fortaleza.
- Áreas prioritarias de mejoramiento.
- Recomendaciones pedagógicas para la institución.

> Nota: Este análisis es una escala interna de seguimiento pedagógico. No reemplaza el reporte oficial del ICFES.

## Corrección incluida en esta versión

Esta versión corrige el error:

```txt
TypeError: sheet.clearCharts is not a function
```

La limpieza de gráficos ahora se hace con `getCharts()` y `removeChart()`, que son compatibles con Google Apps Script.

Si ya tenías el backend desplegado, copia de nuevo todo el contenido de `google-apps-script/Code.gs`, pégalo en tu proyecto de Apps Script y crea una nueva implementación o actualiza la implementación existente.


## Corrección incluida en esta versión: envío de correo

Esta versión corrige el problema en el que la página mostraba que la solicitud de envío se había realizado, pero el correo no llegaba.

Cambios realizados:

- La app ahora envía el informe al Web App como `application/x-www-form-urlencoded` usando el campo `payload`, que Google Apps Script recibe de forma más estable.
- El backend también acepta JSON directo y formulario codificado como respaldo.
- Si ejecutas manualmente `doPost` desde Apps Script, ya no aparecerá el error `No se recibieron datos del informe`; esa función solo recibe datos reales cuando la llama la app.
- Se agregó la función `probarEnvioConDatosDePrueba()` para autorizar permisos y verificar el envío real de correo y el guardado del PDF en Drive.

## Prueba recomendada después de pegar el nuevo Code.gs

1. En Apps Script, pega de nuevo todo el contenido de `google-apps-script/Code.gs`.
2. Guarda el proyecto.
3. En el selector de funciones, elige:

```js
probarEnvioConDatosDePrueba
```

4. Haz clic en **Ejecutar**.
5. Autoriza los permisos solicitados.
6. Verifica que llegue un correo de prueba a `pruebas@iemanueljbetancur.edu.co` y que se cree la carpeta de Drive con el PDF de prueba.
7. Luego ve a **Implementar > Administrar implementaciones > Editar > Nueva versión > Implementar**.
8. Prueba nuevamente desde la app del simulador.

Importante: no pruebes el envío ejecutando manualmente `doPost`, porque `doPost` necesita recibir datos desde la app. Para pruebas manuales usa `probarEnvioConDatosDePrueba()`.

## Corrección incluida en esta versión: carpetas y correo del estudiante

Esta versión corrige dos comportamientos reportados:

1. **Solo se creaba la carpeta 11-1.**  
   Ahora el backend crea automáticamente las tres carpetas institucionales desde la prueba o desde la primera ejecución:

```txt
Simulador ICFES Saber 11 - Manuel J. Betancur
└── Informes PDF
    ├── 11-1
    ├── 11-2
    └── 11-3
```

2. **Llegaba el correo a pruebas, pero no al estudiante.**  
   Antes se enviaba un solo correo al estudiante con copia a `pruebas@iemanueljbetancur.edu.co`. Ahora el backend envía **dos correos separados**:

- Un correo directo al estudiante.
- Un correo institucional directo a `pruebas@iemanueljbetancur.edu.co`.

Además, la copia institucional incluye el correo exacto digitado por el estudiante para poder verificar errores de escritura. Si el correo del estudiante no aparece en la bandeja de entrada, revisar también **Spam**, **Promociones**, **Todos** o **Correo no deseado**.

Después de pegar este nuevo `Code.gs`, ejecuta otra vez:

```js
probarEnvioConDatosDePrueba()
```

Luego actualiza la implementación del Web App con **Nueva versión**.


## Actualización v4: correo del estudiante

Esta versión cambia la estrategia de entrega al estudiante para mejorar la llegada del correo:

- Al estudiante se le envía el informe por varias rutas: correo directo con PDF adjunto, correo de respaldo, enlace de Drive y copia BCC desde el correo institucional.
- A `pruebas@iemanueljbetancur.edu.co` se le envía la copia institucional con el PDF adjunto.
- Se creó la hoja `Registro_Envios` para revisar el estado técnico del envío al estudiante y de la copia institucional.
- El PDF se comparte como `Cualquier persona con el enlace puede ver`, siempre que la política del dominio lo permita; además se intenta dar permiso directo al correo digitado por el estudiante.

Después de pegar este nuevo `Code.gs`, debes crear una **Nueva versión** de la implementación y volver a probar desde la app.

Si el estudiante no ve el correo, revisar: bandeja de entrada, Spam, Promociones, Notificaciones y que el correo digitado en la app sea correcto. En Google Sheets revisa la pestaña `Registro_Envios`.

## Actualización v5: prueba de correo estudiantil y doble motor de envío

Esta versión corrige el error mostrado al ejecutar `probarEnvioAEstudianteReal()`:

```txt
Error: Edita primero la constante CORREO_ESTUDIANTE_PRUEBA...
```

Ahora esa función **ya no se detiene con error**. Si no configuras un correo de prueba, usa temporalmente el correo institucional para validar el flujo. Para probar un correo real de estudiante, ejecuta primero esta función desde Apps Script:

```js
configurarCorreoEstudiantePrueba("correo.real.del.estudiante@dominio.com")
```

Después ejecuta:

```js
probarEnvioAEstudianteReal()
```

También se mejoró el envío al estudiante:

- El correo del estudiante se intenta enviar primero con `GmailApp`.
- Si `GmailApp` falla, el sistema intenta enviarlo con `MailApp`.
- El PDF se guarda en Drive y también se intenta compartir directamente con el correo del estudiante mediante permiso de lector.
- En la hoja `Registro_Envios` se agregó el método usado para el envío y el cupo diario restante de correo.

Si el correo institucional llega, pero el estudiante no lo ve, revisa la hoja `Registro_Envios`. Si aparece como **Aceptado por GmailApp** o **Aceptado por MailApp**, Google aceptó el envío; en ese caso el bloqueo suele estar en filtros del buzón del estudiante, Spam, Promociones, correo mal escrito o políticas del dominio receptor.

## Corrección v5: prueba de correo del estudiante sin parámetros

El error:

`Debes escribir un correo válido. Ejemplo: configurarCorreoEstudiantePrueba("estudiante@correo.com")`

aparecía porque el botón **Ejecutar** de Google Apps Script no permite pasar argumentos a una función. En esta versión se corrigió así:

- `configurarCorreoEstudiantePrueba()` ya puede ejecutarse sin parámetros y no genera error.
- `probarEnvioAEstudianteReal()` también funciona sin parámetros.
- Se agregó la constante `CORREO_ESTUDIANTE_PRUEBA_PREDETERMINADO` dentro de `Code.gs`.
- El correo al estudiante ahora usa envío reforzado: `GmailApp` con HTML y `MailApp` en texto plano de respaldo.
- En la hoja `Registro_Envios` queda escrito exactamente qué método fue aceptado por Google.

Para probar un correo específico de estudiante, abre `Code.gs`, busca esta línea y reemplaza el correo por uno real:

```javascript
const CORREO_ESTUDIANTE_PRUEBA_PREDETERMINADO = 'pruebas@iemanueljbetancur.edu.co';
```

Después ejecuta:

```javascript
configurarCorreoEstudiantePrueba()
```

y luego:

```javascript
probarEnvioAEstudianteReal()
```

Si en `Registro_Envios` aparece **Aceptado** pero el estudiante no ve el mensaje, revisar Spam, Promociones, Todos, correo mal escrito o restricciones del dominio receptor.
