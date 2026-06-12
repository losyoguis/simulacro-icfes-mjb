# Corrección de contraste día/noche en preguntas

Se reforzó el contraste visual de los recursos, diagramas, gráficas, tablas y tarjetas claras dentro del simulacro.

## Ajustes

- Las tarjetas de rutas conservan fondo claro, pero ahora usan texto oscuro en modo día y noche.
- Las gráficas SVG de opciones usan tinta oscura sobre fondo claro, evitando texto blanco sobre fondo blanco.
- Las tablas pequeñas dentro de opciones mantienen fondo claro y texto oscuro.
- Se agregó refuerzo específico para `data-theme="dark"` sin afectar la lógica del simulador.

## Archivos modificados

- `styles.css`
