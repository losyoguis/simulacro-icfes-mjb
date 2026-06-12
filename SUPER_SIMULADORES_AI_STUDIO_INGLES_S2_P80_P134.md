# Súper simulador AI Studio · Inglés · Sección 2 · Preguntas 80 a 134

Esta versión integra un módulo dinámico e interactivo para el bloque de Inglés de la Sección 2, desde la pregunta 80 hasta la 134.

## Alcance

- Sección: 2
- Área: Inglés
- Rango: preguntas 80 a 134
- Total: 55 preguntas
- Archivo principal modificado: `ai-studio-practica.js`
- Acceso rápido agregado en: `app.js`
- Estilos agregados en: `styles.css`

## Tipos de preguntas cubiertas

1. **Vocabulary matching**
   - Preguntas 80 a 84: At a picnic
   - Preguntas 85 a 89: Travelling

2. **Notices and places**
   - Preguntas 90 a 94

3. **Conversation response**
   - Preguntas 95 a 99

4. **Cloze text**
   - Preguntas 100 a 107: Taj Mahal
   - Preguntas 125 a 134: Jamaica Kincaid

5. **Reading comprehension**
   - Preguntas 108 a 114
   - Preguntas 115 a 119: Lazy periods
   - Preguntas 120 a 124: Gymnastics and Personal Development

## Funcionalidades nuevas

- Laboratorio de comprensión con deslizadores interactivos.
- Gráfica animada de lectura y contexto.
- Context scanner para activar pistas del texto.
- Botones de entrenamiento: Vocabulary, Grammar, Purpose y Main idea.
- Línea de proceso: Read → Context → Grammar → Meaning → Answer.
- Option lab con retroalimentación inmediata.
- Perfiles automáticos según el tipo de pregunta.
- Diseño responsivo tipo app móvil.
- Compatible con modo día/noche.

## Funciones JavaScript agregadas

- `isS2EnglishSuperQuestion(q)`
- `englishQuestionProfile(q)`
- `englishTextTokens(q)`
- `simEnglishSuper(q)`
- `bindEnglishSuperEvents()`
- `updateEnglishSuper()`

## Validación técnica

Se validó que los archivos principales no presenten errores de sintaxis con `node --check`:

- `app.js`
- `ai-studio-practica.js`
- `dashboard.js`
- `notebook.js`
- `data/question-bank.js`
- `google-apps-script/Code.gs`

También se verificó que el banco contiene las 55 preguntas de Inglés correspondientes al rango 80-134.
