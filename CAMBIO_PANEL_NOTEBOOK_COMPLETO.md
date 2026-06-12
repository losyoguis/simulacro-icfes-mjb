# Cambio: Panel de preguntas con estado Notebook completo

Fecha: 2026-05-30

## Alcance
Se trabajó únicamente en la sección **Entrenamiento con Notebook**.

## Qué se implementó

El panel lateral de preguntas ahora consulta el Google Sheets institucional y marca con un color diferente las preguntas que ya tienen multimedia completa para Notebook:

1. Mapa mental
2. Video
3. Audio
4. Presentación
5. Infografía

## Secciones y áreas cubiertas

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

## Funcionamiento técnico

En `app.js` se agregó un lector dinámico del Sheets institucional mediante `gviz/tq` y JSONP. Esto permite que, cuando el Sheets se actualice, el panel pueda volver a leer los recursos sin modificar manualmente la app.

La pregunta queda marcada como **Notebook completo** solo cuando existen los cinco recursos solicitados.

## Archivos modificados

- `app.js`
- `styles.css`

## Punto de continuidad

Para próximas actualizaciones del Sheets, mantener el mismo ID:

`1S1T77UJpP678_-gRLFhJNjeK4YcYIt5twt7X7okqiL8`

El sistema seguirá leyendo automáticamente las columnas con esta estructura:

`Sección X - Área | Número de pregunta`

`Sección X - Área | 1. Mapa Mental`

`Sección X - Área | 2. Video`

`Sección X - Área | 3. Audio`

`Sección X - Área | 4. Presentación`

`Sección X - Área | 5. Infografía`
