# Activación del Dashboard Institucional ICFES - Manuel J. Betancur

Esta versión queda conectada al Google Sheets oficial compartido:

https://docs.google.com/spreadsheets/d/17FbkF9BulfEfAAoDFNkljdsXWjXQOH_cBB3r-Iizjxs/edit

## Problema corregido

El dashboard no cargaba porque el Apps Script estaba intentando abrir un ID de hoja incorrecto o una hoja diferente. El ID correcto es:

```text
17FbkF9BulfEfAAoDFNkljdsXWjXQOH_cBB3r-Iizjxs
```

En esta versión el ID quedó fijo dentro de `google-apps-script/Code.gs` mediante la constante:

```javascript
const SPREADSHEET_ID_OFICIAL = '17FbkF9BulfEfAAoDFNkljdsXWjXQOH_cBB3r-Iizjxs';
```

Además, el `dashboard.html` tiene lectura de respaldo directamente desde Google Sheets si Apps Script tarda o no responde.

## Pasos de actualización

1. Descomprime este ZIP.
2. Entra a Google Apps Script.
3. Abre `Code.gs`.
4. Borra todo el código anterior.
5. Copia y pega el contenido nuevo de `google-apps-script/Code.gs`.
6. Guarda.
7. Ejecuta en este orden:

```javascript
configurarConexionOficialMJB
inicializarSistema
probarConexionDashboardMJB
probarRegistroDashboard
```

8. Verifica que en el Google Sheets aparezcan o se conserven estas hojas:

- Resultados
- Respuestas_Detalladas
- Registro_Envios
- Analisis_Estudiantes
- Analisis_Grupos
- Analisis_Areas
- Informe_Institucional

9. Actualiza la implementación del Web App:

**Implementar → Administrar implementaciones → Editar → Nueva versión → Implementar**

10. Abre el simulador y el dashboard. En el navegador usa:

- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

para evitar caché vieja.

## Pruebas rápidas

Desde Apps Script, ejecuta:

```javascript
probarConexionDashboardMJB
```

Debe devolver el ID del Sheets oficial y el número de intentos registrados.

También puedes abrir el endpoint en el navegador con:

```text
/exec?accion=ping
```

Debe mostrar que el backend está conectado a Google Sheets.

## Nueva opción: borrar datos del Google Sheets

Esta versión agrega un botón en `dashboard.html` llamado:

```text
Borrar datos Sheets
```

El botón permite limpiar los registros del Google Sheets institucional sin borrar las hojas ni sus encabezados. También deja el dashboard listo para recibir nuevos resultados.

La acción limpia estas hojas:

- Resultados
- Respuestas_Detalladas
- Registro_Envios
- Analisis_Estudiantes
- Analisis_Grupos
- Analisis_Areas
- Informe_Institucional

No se eliminan los PDF guardados en Drive.

Para usar el botón se debe confirmar escribiendo:

```text
BORRAR DATOS
```

y luego escribir la clave institucional predeterminada:

```text
MJB-ICFES-2026
```

Si deseas cambiar esa clave, ejecuta desde Apps Script:

```javascript
configurarClaveBorradoDatos("NuevaClaveSegura2026")
```

También puedes borrar los datos directamente desde Apps Script ejecutando:

```javascript
borrarDatosDelSheets
```

## Corrección importante de registro en Sheets

Esta versión registra primero un resultado liviano en Google Sheets, antes de procesar el PDF. Esto permite que la hoja `Resultados` y el dashboard se actualicen aunque el envío del PDF tarde o falle.

Después de pegar el nuevo `Code.gs`, ejecuta estas funciones en Apps Script:

1. `configurarConexionOficialMJB`
2. `inicializarSistema`
3. `probarRegistroLivianoDesdeApp`
4. `probarConexionDashboardMJB`

Luego actualiza la implementación:

**Implementar → Administrar implementaciones → Editar → Nueva versión → Implementar**

La URL pública recomendada para la app es la versión sin `/a/macros/`:

```text
https://script.google.com/macros/s/AKfycbw46l-QqQYo7Ah_P9cA85D2a_4miFYf70FfUK304aEfRRrw-HU0ziPfBEpM_n3vWFta/exec
```

La versión con `/a/macros/iemanueljbetancur.edu.co/` queda como respaldo, pero puede exigir inicio de sesión del dominio y bloquear el envío desde algunos navegadores de estudiantes.

## Corrección v7: registro real en Google Sheets

Esta versión corrige el problema en el que el dashboard podía mostrar solo registros de prueba.

Cambios técnicos importantes:

1. El registro principal del simulacro ahora se envía por JSONP confirmado al endpoint de Apps Script.
2. El primer envío es liviano y estable: guarda nombre, grupo, correo, puntaje, áreas y resumen general.
3. El detalle por pregunta se envía después en lotes pequeños para evitar que el navegador bloquee el envío por tamaño.
4. El PDF y los correos se procesan después de registrar los datos, de modo que el dashboard no depende del peso del PDF.
5. El dashboard oculta automáticamente los registros de prueba generados por funciones como `probarRegistroDashboard` o `probarRegistroLivianoDesdeApp`.

### Para limpiar registros de prueba ya creados

En Apps Script puedes ejecutar manualmente:

```javascript
borrarDatosDePruebaSistema
```

O, si deseas iniciar totalmente limpio desde la página del dashboard, usa el botón:

**Borrar datos Sheets**

Clave predeterminada:

```text
MJB-ICFES-2026
```

### Pasos obligatorios después de reemplazar Code.gs

1. Pega el nuevo `Code.gs` completo.
2. Guarda el proyecto.
3. Ejecuta `configurarConexionOficialMJB`.
4. Ejecuta `inicializarSistema`.
5. Actualiza la implementación: **Implementar → Administrar implementaciones → Editar → Nueva versión → Implementar**.
6. En GitHub Pages, sube también los nuevos `app.js` y `dashboard.js`.
7. Abre la app y presiona `Cmd + Shift + R` en Mac o `Ctrl + Shift + R` en Windows para limpiar caché.


## Corrección v8: envío robusto real desde GitHub Pages hacia Google Sheets

Esta versión corrige el caso en el que el dashboard cargaba, pero los resultados reales del simulacro no llegaban al Google Sheets y solo aparecían datos de prueba.

Cambios técnicos principales:

1. El resultado principal ya no depende únicamente de JSONP.
2. La app envía el registro por tres vías compatibles con Apps Script:
   - `navigator.sendBeacon`,
   - `fetch` con `no-cors`,
   - formulario oculto dirigido al Web App.
3. El registro liviano se envía a la URL pública y a la URL del dominio institucional.
4. El `ID envio` evita duplicados si ambos endpoints reciben el mismo intento.
5. El PDF y los correos se procesan después; el dashboard no depende del PDF.
6. Al terminar un simulacro real, abre el dashboard y presiona **Actualizar datos**.

### Recomendación para probar datos reales

1. Borra los datos de prueba con el botón **Borrar datos Sheets** o ejecuta `borrarDatosDePruebaSistema`.
2. Presenta un simulacro real desde `index.html` con un nombre diferente a “Prueba”.
3. Finaliza el intento.
4. Espera entre 5 y 15 segundos.
5. Abre el Google Sheets y revisa la hoja `Resultados`.
6. Abre el dashboard y presiona **Actualizar datos**.

Si después de actualizar todavía no aparece el resultado, revisa en Apps Script la sección **Ejecuciones**. Debe aparecer una ejecución `doPost` asociada al intento real.

## Corrección v9: registro confirmado por JSONP

Esta versión cambia el flujo del registro real del simulacro:

1. El resultado principal se registra primero por **JSONP confirmado** usando `doGet`.
2. La app espera la respuesta real de Apps Script. Si Apps Script no confirma, la página muestra el error en la sección de resultados.
3. El detalle por pregunta también se envía por JSONP en lotes pequeños de 8 preguntas.
4. Se agregó el botón **Sincronizar con Sheets** en la página de resultados para reenviar manualmente el resultado si la red falló en el primer intento.
5. Se agregó la hoja **Registro_Tecnico**, donde Apps Script deja evidencia de cada registro recibido desde el simulador.

Después de actualizar, en el Google Sheets deben existir estas hojas:

- Resultados
- Respuestas_Detalladas
- Registro_Envios
- Registro_Tecnico
- Analisis_Estudiantes
- Analisis_Grupos
- Analisis_Areas
- Informe_Institucional

### Prueba recomendada

1. Reemplaza todo el `Code.gs` en Apps Script.
2. Guarda el proyecto.
3. Ejecuta `configurarConexionOficialMJB`.
4. Ejecuta `inicializarSistema`.
5. Actualiza la implementación como **Nueva versión**.
6. Sube a GitHub Pages los archivos nuevos, especialmente `app.js`, `dashboard.js` y `dashboard.html`.
7. Limpia caché con `Cmd + Shift + R` en Mac o `Ctrl + Shift + R` en Windows.
8. Presenta un simulacro real.
9. Al finalizar, espera el mensaje: **Registro confirmado en Google Sheets**.
10. Revisa en Google Sheets las hojas `Resultados`, `Respuestas_Detalladas` y `Registro_Tecnico`.

Si el resultado no aparece, revisa primero la hoja `Registro_Tecnico`. Si está vacía, el navegador no está usando el nuevo `app.js` o el Web App no fue actualizado como nueva versión.


## Nota sobre Notebook

La página `notebook.html` no requiere configuración adicional en Apps Script. Funciona de manera local dentro de GitHub Pages y toma la información desde `data/question-bank.js`.

El bloque de acceso a Notebook aparece únicamente en el modo **Práctica con Notebook**; no se muestra en Simulacro ni en Entrenamiento sin tiempo.
