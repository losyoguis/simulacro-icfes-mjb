# Corrección: fondo de imágenes y diagramas de preguntas

Se ajustó únicamente la visualización de los recursos gráficos de las preguntas.

## Problema corregido
En modo noche, algunos SVG internos usaban `currentColor`, por lo que los trazos y textos se volvían blancos y se perdían sobre fondos claros de los diagramas.

## Solución aplicada
Se agregó un bloque CSS final en `styles.css` que fuerza los recursos visuales de las preguntas a comportarse como una hoja clara con tinta oscura:

- imágenes (`img`);
- diagramas SVG;
- gráficas internas;
- figuras de Matemáticas, Ciencias, Sociales y Lectura;
- textos, medidas, flechas y etiquetas de los SVG.

## Alcance
La corrección aplica en modo día y modo noche, sin modificar el banco de preguntas ni la lógica de respuestas.
