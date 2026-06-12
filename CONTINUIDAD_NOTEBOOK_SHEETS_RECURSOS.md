# Continuidad · Entrenamiento con Notebook desde Google Sheets

Fecha de integración: 2026-06-01

## Alcance trabajado

Solo se intervino la sección **Entrenamiento con Notebook** de la app ICFES Digital Saber 11.

La app consulta el Google Sheets institucional:

`1S1T77UJpP678_-gRLFhJNjeK4YcYIt5twt7X7okqiL8`

La lectura se realiza por:

1. Sección 1 o Sección 2.
2. Área/asignatura.
3. Número oficial de pregunta.
4. Recursos 1 a 5:
   - Mapa Mental
   - Video
   - Audio
   - Presentación
   - Infografía

## Áreas reconocidas

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

## Criterio de Notebook completo

Una pregunta se marca como **Notebook completo** cuando tiene los cinco recursos principales en el Sheets:

- Mapa Mental
- Video
- Audio
- Presentación
- Infografía

No se exige Código página web Gemini ni Cuaderno digital - Sites para marcarla como completa.

## Punto exacto para continuar mañana

Cuando el Sheets se actualice, no es necesario editar manualmente pregunta por pregunta. La app vuelve a consultar el Sheets al abrir el Notebook y al usar el botón **Actualizar desde Sheets**.

Archivos principales relacionados:

- `notebook.js`: carga y muestra recursos multimedia individuales.
- `app.js`: marca en el panel las preguntas con Notebook completo o parcial.
- `styles.css`: colores y estados visuales del panel y recursos.

## Ejemplo base conservado

La pregunta modelo sigue siendo:

**Sección 1 · Matemáticas · Pregunta 1**

Esta pregunta se conserva como respaldo estático y también puede actualizarse desde el Sheets.
