# Integración Notebook + Google Sheets institucional

## Estado de esta versión

Esta versión conecta el módulo **Entrenamiento con Notebook** con el Google Sheets institucional:

`1S1T77UJpP678_-gRLFhJNjeK4YcYIt5twt7X7okqiL8`

La integración se realiza de forma dinámica desde `notebook.js`, usando Google Visualization API. Esto permite que, si el Sheets se actualiza cada día, el Notebook intente leer los recursos más recientes cuando el estudiante abre una pregunta.

## Alcance implementado

Solo se modificó la parte de **Entrenamiento con Notebook**.

Se toman recursos para:

### Sección 1
- Matemáticas
- Lectura Crítica
- Sociales y Ciudadanas
- Ciencias Naturales

### Sección 2
- Sociales y Ciudadanas
- Matemáticas
- Ciencias Naturales
- Inglés

## Recursos leídos desde el Sheets

Para cada sección, área y número de pregunta se leen estas columnas:

1. Mapa Mental
2. Video
3. Audio
4. Presentación
5. Infografía

No se sobrescribe el simulador interactivo interno de la app.

## Criterio de lectura

El sistema busca columnas con esta estructura:

`Sección X - Área | Número de pregunta`

Luego busca en la misma fila:

`Sección X - Área | 1. Mapa Mental`
`Sección X - Área | 2. Video`
`Sección X - Área | 3. Audio`
`Sección X - Área | 4. Presentación`
`Sección X - Área | 5. Infografía`

Si hay varias filas para una misma pregunta y recurso, el sistema conserva la última coincidencia no vacía encontrada en el Sheets.

## Tipos de contenido aceptados

El sistema acepta:

- Código `<iframe ...></iframe>` de Google Drive, Docs, Slides u otros recursos embebibles.
- URL directa de Google Drive.
- URL de Google Presentaciones.
- URL de Google Docs.
- URL de Google Sheets.

Cuando encuentra un enlace de Drive, lo convierte automáticamente a vista `preview`.

## Punto de continuidad

Para repetir este procedimiento con el Sheets actualizado, se debe revisar principalmente el archivo:

`notebook.js`

Bloques importantes:

- `NOTEBOOK_SHEETS_CONFIG`
- `loadNotebookSheetsResources()`
- `buildNotebookResourcesFromGviz()`
- `getCustomNotebookResource()`

Último punto trabajado: integración dinámica del Sheets institucional en **Entrenamiento con Notebook**, para mostrar mapa mental, video, audio, presentación e infografía por sección, área y número de pregunta.
