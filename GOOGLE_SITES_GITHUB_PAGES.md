# Publicación en GitHub Pages e inserción en Google Sites

Esta versión está preparada para publicarse como sitio estático en GitHub Pages y luego incrustarse en Google Sites.

## 1. Publicar en GitHub Pages

1. Sube todos los archivos de esta carpeta al repositorio de GitHub.
2. En GitHub, entra a **Settings → Pages**.
3. En **Build and deployment**, selecciona la rama principal y la carpeta raíz.
4. Guarda y espera la URL pública de GitHub Pages.

El archivo `.nojekyll` se incluye para que GitHub Pages publique todos los archivos sin procesarlos con Jekyll.

## 2. Incrustar en Google Sites

En Google Sites puedes usar **Insertar → Insertar código** y pegar este ejemplo, cambiando la URL por la URL real de GitHub Pages:

```html
<iframe
  src="https://TU_USUARIO.github.io/TU_REPOSITORIO/"
  width="100%"
  height="900"
  style="width:100%; min-height:900px; border:0; border-radius:16px;"
  allow="fullscreen; clipboard-read; clipboard-write"
  allowfullscreen
  loading="lazy">
</iframe>
```

## 3. Pantalla completa

La app detecta cuando está incrustada en Google Sites y muestra una opción para **activar pantalla completa**. Por seguridad del navegador, la pantalla completa debe activarse con una acción del estudiante, por ejemplo al dar clic en el botón de pantalla completa, al registrarse o al iniciar el simulacro.

Si Google Sites o el navegador no permiten activar pantalla completa dentro del iframe, la app mostrará la opción **Abrir en pestaña nueva**, que permite presentar el simulacro en pantalla completa directamente desde GitHub Pages.

## 4. Recomendación para Google Sites

Al insertar el iframe, ajusta el bloque de Google Sites a ancho completo y usa una altura grande, recomendada entre **900 y 1200 px**, para que la experiencia sea similar a una app de escritorio.
