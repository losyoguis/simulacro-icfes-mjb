const NOTEBOOK_APP = document.getElementById("notebookApp");
const NOTEBOOK_INSTITUTION = "Institución Educativa Manuel J. Betancur";
const NOTEBOOK_RESOURCE_TYPES = [
  { key: "mindmap", label: "Mapa mental", icon: "🧠" },
  { key: "video", label: "Video", icon: "🎬" },
  { key: "audio", label: "Audio", icon: "🎧" },
  { key: "presentation", label: "Presentación", icon: "📊" },
  { key: "infographic", label: "Infografía", icon: "🖼️" },
  { key: "simulator", label: "Simulador", icon: "🧩" }
];


function notebookStorageGet(key, fallback = null) {
  try {
    const value = window.localStorage.getItem(key);
    if (value !== null) return value;
  } catch (error) {}
  try {
    const value = window.sessionStorage.getItem(key);
    if (value !== null) return value;
  } catch (error) {}
  return fallback;
}

function notebookStorageSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch (error) {}
  try { window.sessionStorage.setItem(key, value); } catch (error) {}
}

const NOTEBOOK_CUSTOM_RESOURCES = {
  "1-1": {
    mindmap: {
      title: "Mapa mental · Sección 1 - Matemáticas - Pregunta 1",
      description: "Mapa mental individual para organizar los datos de la tabla y preparar la comprensión de la pregunta 1.",
      embedHtml: `<iframe src="https://drive.google.com/file/d/1unEMah3-QKQ4ft7U3aLLU418dTfVjYql/preview" width="640" height="480" allow="autoplay" allowfullscreen></iframe>`
    },
    video: {
      title: "Video de preparación · Sección 1 - Matemáticas - Pregunta 1",
      description: "Video individual de preparación para la Sección 1 · Matemáticas · Pregunta 1.",
      embedHtml: `<iframe src="https://drive.google.com/file/d/1WjJl5tmp1XrmCs1cPgbNR7ZvytTjtSTZ/preview" width="640" height="480" allow="autoplay" allowfullscreen></iframe>`
    },
    audio: {
      title: "Audio de preparación · Sección 1 - Matemáticas - Pregunta 1",
      description: "Audio individual de orientación para comprender la pregunta 1 de Matemáticas antes de responder.",
      embedHtml: `<iframe src="https://drive.google.com/file/d/1zOmudVfmN--MEAL-sqSEqRSZO-_v80oY/preview" width="640" height="480" allow="autoplay" allowfullscreen></iframe>`
    },
    presentation: {
      title: "Presentación de estudio · Sección 1 - Matemáticas - Pregunta 1",
      description: "Presentación individual de apoyo para preparar la pregunta 1 de Matemáticas.",
      embedHtml: `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQtCZB-sV6wIeQgnRHzcZoO7K4PR45ZpZ4E-6q_GXPJtiixGzv6Ql6XKwh8q0_Kiw/pubembed?start=false&loop=false&delayms=3000" frameborder="0" width="1707" height="989" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`
    },
    infographic: {
      title: "Infografía · Sección 1 - Matemáticas - Pregunta 1",
      description: "Infografía individual para sintetizar visualmente la información de la pregunta 1.",
      embedHtml: `<iframe src="https://drive.google.com/file/d/1crO89zIz6JyP3gvLHhi0g2m77fMedXpp/preview" width="640" height="480" allow="autoplay" allowfullscreen></iframe>`
    },
    simulator: {
      title: "Simulador interactivo · Promedio de edades",
      description: "Actividad dinámica para comprender cómo se resuelve la pregunta 1 de Matemáticas paso a paso."
    }
  }
};

const NOTEBOOK_SHEETS_CONFIG = {
  spreadsheetId: "1S1T77UJpP678_-gRLFhJNjeK4YcYIt5twt7X7okqiL8",
  enabled: true,
  resourceTypes: [
    { key: "mindmap", sheetLabel: "Mapa Mental", order: "1", label: "Mapa mental", icon: "🧠" },
    { key: "video", sheetLabel: "Video", order: "2", label: "Video", icon: "🎬" },
    { key: "audio", sheetLabel: "Audio", order: "3", label: "Audio", icon: "🎧" },
    { key: "presentation", sheetLabel: "Presentación", order: "4", label: "Presentación", icon: "📊" },
    { key: "infographic", sheetLabel: "Infografía", order: "5", label: "Infografía", icon: "🖼️" }
  ],
  validAreas: {
    1: ["Matemáticas", "Lectura Crítica", "Sociales y Ciudadanas", "Ciencias Naturales"],
    2: ["Sociales y Ciudadanas", "Matemáticas", "Ciencias Naturales", "Inglés"]
  },
  // Punto de continuidad: este módulo consulta el Sheets institucional cada vez que se abre Notebook.
  // Si mañana el Sheets cambia, no hay que reescribir las preguntas: se vuelve a cargar por sección, área y número.
  currentFocus: "Sección 1 y 2 · recursos 1 a 5: mapa mental, video, audio, presentación e infografía"
};

const NOTEBOOK_SHEETS_CACHE = {
  loaded: false,
  loading: false,
  error: null,
  resources: {},
  lastLoadedAt: null,
  promise: null
};

function normalizeNotebookText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getNotebookCellValue(cell) {
  if (!cell) return "";
  const value = cell.f !== undefined && cell.f !== null ? cell.f : cell.v;
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function isNotebookAreaAllowed(session, area) {
  const allowed = NOTEBOOK_SHEETS_CONFIG.validAreas[Number(session)] || [];
  const normalizedArea = normalizeNotebookText(area);
  return allowed.some(item => normalizeNotebookText(item) === normalizedArea);
}

function getNotebookAreaFromPrefix(prefix) {
  return String(prefix || "").replace(/Secci[oó]n\s*\d+\s*-\s*/i, "").trim();
}

function getNotebookSessionFromPrefix(prefix) {
  const match = String(prefix || "").match(/Secci[oó]n\s*(\d+)/i);
  return match ? Number(match[1]) : null;
}

function extractNotebookIframeSrc(value) {
  const text = String(value || "").replace(/&amp;/g, "&");
  const match = text.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  return match ? match[1].trim() : "";
}

function extractNotebookFirstUrl(value) {
  const text = String(value || "").replace(/&amp;/g, "&");
  const match = text.match(/https?:\/\/[^\s"'<>]+/i);
  return match ? match[0].replace(/[),.;]+$/g, "") : "";
}

function toNotebookPreviewUrl(rawUrl) {
  const url = String(rawUrl || "").trim().replace(/&amp;/g, "&");
  if (!url) return "";

  const driveFile = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (driveFile) return `https://drive.google.com/file/d/${driveFile[1]}/preview`;

  const publishedSlides = url.match(/docs\.google\.com\/presentation\/d\/e\/([^/]+)/i);
  if (publishedSlides) {
    if (/pubembed/i.test(url)) return url;
    return `https://docs.google.com/presentation/d/e/${publishedSlides[1]}/pubembed?start=false&loop=false&delayms=3000`;
  }

  const slides = url.match(/docs\.google\.com\/presentation\/d\/([^/]+)/i);
  if (slides) return `https://docs.google.com/presentation/d/${slides[1]}/embed?start=false&loop=false&delayms=3000`;

  const publishedDoc = url.match(/docs\.google\.com\/document\/d\/e\/([^/]+)/i);
  if (publishedDoc) return url.includes("embedded=true") ? url : `${url}${url.includes("?") ? "&" : "?"}embedded=true`;

  const doc = url.match(/docs\.google\.com\/document\/d\/([^/]+)/i);
  if (doc) return `https://docs.google.com/document/d/${doc[1]}/preview`;

  const sheet = url.match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/i);
  if (sheet) return `https://docs.google.com/spreadsheets/d/${sheet[1]}/preview`;

  return url;
}

function buildNotebookEmbedHtml(rawValue) {
  const src = toNotebookPreviewUrl(extractNotebookIframeSrc(rawValue) || extractNotebookFirstUrl(rawValue));
  if (!src) return "";
  return `<iframe src="${escapeHtml(src)}" loading="lazy" allow="autoplay; fullscreen" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`;
}

function getNotebookResourceSourceUrl(rawValue) {
  return extractNotebookIframeSrc(rawValue) || extractNotebookFirstUrl(rawValue) || "";
}

function buildNotebookSheetResource(session, area, questionNumber, resourceMeta, rawValue, rowInfo = {}) {
  const embedHtml = buildNotebookEmbedHtml(rawValue);
  const url = getNotebookResourceSourceUrl(rawValue);
  return {
    title: `${resourceMeta.label} · Sección ${session} - ${area} - Pregunta ${questionNumber}`,
    description: `Recurso importado automáticamente desde el Google Sheets institucional para preparar la pregunta ${questionNumber} de ${area}.`,
    embedHtml,
    url,
    source: "Google Sheets institucional",
    rawValue,
    sourceRow: rowInfo.rowNumber || null,
    updatedAt: rowInfo.timestamp || ""
  };
}

function loadNotebookSheetsResources(force = false) {
  if (!NOTEBOOK_SHEETS_CONFIG.enabled) return Promise.resolve(NOTEBOOK_SHEETS_CACHE.resources);
  if (NOTEBOOK_SHEETS_CACHE.loaded && !force) return Promise.resolve(NOTEBOOK_SHEETS_CACHE.resources);
  if (NOTEBOOK_SHEETS_CACHE.loading && NOTEBOOK_SHEETS_CACHE.promise) return NOTEBOOK_SHEETS_CACHE.promise;

  NOTEBOOK_SHEETS_CACHE.loading = true;
  NOTEBOOK_SHEETS_CACHE.error = null;

  NOTEBOOK_SHEETS_CACHE.promise = new Promise((resolve, reject) => {
    const callbackName = `notebookSheetsCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();
      NOTEBOOK_SHEETS_CACHE.loading = false;
      NOTEBOOK_SHEETS_CACHE.error = "No fue posible cargar el Google Sheets institucional. Revisa permisos de visualización o conexión.";
      updateNotebookSheetStatus();
      reject(new Error(NOTEBOOK_SHEETS_CACHE.error));
    }, 14000);

    function cleanup() {
      window.clearTimeout(timeout);
      try { delete window[callbackName]; } catch (error) { window[callbackName] = undefined; }
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = response => {
      try {
        const resources = buildNotebookResourcesFromGviz(response);
        NOTEBOOK_SHEETS_CACHE.resources = resources;
        NOTEBOOK_SHEETS_CACHE.loaded = true;
        NOTEBOOK_SHEETS_CACHE.loading = false;
        NOTEBOOK_SHEETS_CACHE.error = null;
        NOTEBOOK_SHEETS_CACHE.lastLoadedAt = new Date().toISOString();
        cleanup();
        updateNotebookSheetStatus();
        resolve(resources);
      } catch (error) {
        cleanup();
        NOTEBOOK_SHEETS_CACHE.loading = false;
        NOTEBOOK_SHEETS_CACHE.error = "El Google Sheets se cargó, pero no se pudo interpretar su estructura.";
        reject(error);
      }
    };

    script.onerror = () => {
      cleanup();
      NOTEBOOK_SHEETS_CACHE.loading = false;
      NOTEBOOK_SHEETS_CACHE.error = "No se pudo conectar con el Google Sheets institucional.";
      reject(new Error(NOTEBOOK_SHEETS_CACHE.error));
    };

    const base = `https://docs.google.com/spreadsheets/d/${NOTEBOOK_SHEETS_CONFIG.spreadsheetId}/gviz/tq`;
    const tqx = `out:json;responseHandler:${callbackName}`;
    script.src = `${base}?tqx=${encodeURIComponent(tqx)}&headers=1&cb=${Date.now()}`;
    document.head.appendChild(script);
  });

  return NOTEBOOK_SHEETS_CACHE.promise;
}

function buildNotebookResourcesFromGviz(response) {
  const table = response && response.table ? response.table : null;
  if (!table || !Array.isArray(table.cols) || !Array.isArray(table.rows)) return {};

  const labels = table.cols.map(col => String(col.label || col.id || "").trim());
  const normalizedLabels = labels.map(label => normalizeNotebookText(label));
  const resources = {};
  const numberColumns = labels
    .map((label, index) => ({ label, index }))
    .filter(item => /\|\s*N[uú]mero de pregunta/i.test(item.label));

  table.rows.forEach((row, rowIndex) => {
    const cells = row.c || [];
    const timestamp = getNotebookCellValue(cells[1]) || getNotebookCellValue(cells[0]);

    numberColumns.forEach(numberColumn => {
      const prefix = numberColumn.label.split("|")[0].trim();
      const session = getNotebookSessionFromPrefix(prefix);
      const area = getNotebookAreaFromPrefix(prefix);
      const questionNumberRaw = getNotebookCellValue(cells[numberColumn.index]);
      const questionNumber = Number(String(questionNumberRaw).replace(/[^0-9]/g, ""));

      if (!session || !questionNumber || !isNotebookAreaAllowed(session, area)) return;

      const questionKey = `${session}-${questionNumber}`;
      if (!resources[questionKey]) resources[questionKey] = {};

      NOTEBOOK_SHEETS_CONFIG.resourceTypes.forEach(resourceMeta => {
        const expectedLabel = normalizeNotebookText(`${prefix} | ${resourceMeta.order}. ${resourceMeta.sheetLabel}`);
        let resourceIndex = normalizedLabels.indexOf(expectedLabel);
        if (resourceIndex < 0) {
          resourceIndex = labels.findIndex(label => {
            const normalized = normalizeNotebookText(label);
            return normalized.startsWith(normalizeNotebookText(`${prefix} |`))
              && normalized.includes(normalizeNotebookText(resourceMeta.sheetLabel));
          });
        }
        if (resourceIndex < 0) return;

        const rawValue = getNotebookCellValue(cells[resourceIndex]);
        if (!rawValue) return;

        resources[questionKey][resourceMeta.key] = buildNotebookSheetResource(session, area, questionNumber, resourceMeta, rawValue, {
          rowNumber: rowIndex + 2,
          timestamp
        });
      });
    });
  });

  Object.keys(resources).forEach(key => {
    if (!Object.keys(resources[key]).length) delete resources[key];
  });

  return resources;
}

function renderNotebookSheetsLoadingResource(question, resourceKey) {
  const resourceMeta = NOTEBOOK_RESOURCE_TYPES.find(item => item.key === resourceKey) || { label: "Recurso", icon: "📌" };
  return `
    <article class="notebook-card large notebook-loading-resource">
      <p class="eyebrow">${escapeHtml(resourceMeta.icon)} ${escapeHtml(resourceMeta.label)} · Google Sheets institucional</p>
      <h3>Cargando recurso de la pregunta ${escapeHtml(question.number)}</h3>
      <p>Estamos buscando automáticamente el código embebido en el Sheets institucional. Esto permite que el Notebook se actualice cuando el archivo se actualice.</p>
      <div class="notebook-loading-bar" aria-hidden="true"><span></span></div>
    </article>
  `;
}

function renderNotebookSheetsMissingResource(question, resourceKey) {
  const resourceMeta = NOTEBOOK_RESOURCE_TYPES.find(item => item.key === resourceKey) || { label: "Recurso", icon: "📌" };
  const error = NOTEBOOK_SHEETS_CACHE.error ? `<p class="footer-note">Detalle técnico: ${escapeHtml(NOTEBOOK_SHEETS_CACHE.error)}</p>` : "";
  return `
    <article class="notebook-card large notebook-missing-resource">
      <p class="eyebrow">${escapeHtml(resourceMeta.icon)} ${escapeHtml(resourceMeta.label)} · Pendiente</p>
      <h3>Aún no hay ${escapeHtml(resourceMeta.label.toLowerCase())} cargado para la pregunta ${escapeHtml(question.number)}</h3>
      <p>Cuando el Google Sheets institucional tenga el código embed o enlace correspondiente, este espacio lo mostrará automáticamente en el Notebook.</p>
      ${error}
    </article>
  `;
}


let notebookState = {
  question: null,
  activeResource: "mindmap",
  session: 2,
  questionNumber: 1,
  returnUrl: "index.html"
};

// La inicialización se ejecuta al final del archivo para que todos los simuladores agregados estén disponibles.

function initNotebook() {
  initNotebookTheme();
  const params = new URLSearchParams(window.location.search);
  const session = Number(params.get("session") || 2);
  const questionNumber = Number(params.get("question") || 1);
  const resource = params.get("resource") || "mindmap";
  const returnParam = params.get("return") || "";
  const question = findNotebookQuestion(session, questionNumber);
  notebookState.session = session;
  notebookState.questionNumber = questionNumber;
  notebookState.returnUrl = buildReturnToQuestionUrl(session, questionNumber, returnParam);
  notebookState.question = question;
  notebookState.activeResource = NOTEBOOK_RESOURCE_TYPES.some(item => item.key === resource) ? resource : "mindmap";
  configureReturnButtons();
  renderNotebook();
  loadNotebookSheetsResources()
    .then(() => {
      renderNotebookResource();
    })
    .catch(error => {
      console.warn("Notebook Sheets:", error);
      renderNotebookResource();
    });
}

function configureReturnButtons() {
  const returnBtn = document.getElementById("returnQuestionHeaderBtn");
  if (!returnBtn) return;
  returnBtn.href = notebookState.returnUrl || "index.html";
  returnBtn.addEventListener("click", event => {
    event.preventDefault();
    const fallbackUrl = notebookState.returnUrl || returnBtn.href || "index.html";
    const cameFromSimulator = /index\.html|simulador|icfes/i.test(document.referrer || "");
    if (cameFromSimulator && window.history.length > 1) {
      window.history.back();
      window.setTimeout(() => {
        if (!document.hidden) window.location.href = fallbackUrl;
      }, 700);
      return;
    }
    window.location.href = fallbackUrl;
  }, { once: true });
}

function initNotebookTheme() {
  const storedTheme = notebookStorageGet("simulador_icfes_theme", notebookStorageGet("simulador_icfes_tema", "dark"));
  document.body.dataset.theme = storedTheme;
  const themeBtn = document.getElementById("themeBtn");
  if (!themeBtn) return;
  themeBtn.textContent = storedTheme === "light" ? "🌙" : "☀️";
  themeBtn.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
    document.body.dataset.theme = nextTheme;
    notebookStorageSet("simulador_icfes_theme", nextTheme);
    notebookStorageSet("simulador_icfes_tema", nextTheme);
    themeBtn.textContent = nextTheme === "light" ? "🌙" : "☀️";
  });
}

function buildReturnToQuestionUrl(session, questionNumber, returnParam) {
  if (returnParam) {
    try {
      const decoded = decodeURIComponent(returnParam);
      if (decoded && !/^https?:\/\//i.test(decoded)) return decoded;
    } catch (error) {
      // Si el parámetro llega mal codificado, se usa el retorno seguro al simulador.
    }
  }
  const params = new URLSearchParams();
  params.set("volverPregunta", "1");
  params.set("session", String(session || 2));
  params.set("question", String(questionNumber || 1));
  params.set("mode", "practica");
  return `index.html?${params.toString()}`;
}

function getNotebookQuestionBank() {
  if (Array.isArray(window.QUESTION_BANK)) return window.QUESTION_BANK;
  try {
    if (typeof QUESTION_BANK !== "undefined" && Array.isArray(QUESTION_BANK)) return QUESTION_BANK;
  } catch (error) {
    // En algunos navegadores, el banco puede no estar disponible como propiedad de window
    // porque fue declarado con const en question-bank.js. Este fallback evita que
    // Notebook muestre "No se encontró la pregunta" cuando el banco sí está cargado.
  }
  return [];
}

function findNotebookQuestion(session, number) {
  const bank = getNotebookQuestionBank();
  return bank.find(item => Number(item.session) === Number(session) && Number(item.number) === Number(number)) || null;
}

function renderNotebook() {
  const question = notebookState.question;
  if (!question) {
    const returnUrl = escapeHtml(notebookState.returnUrl || "index.html");
    NOTEBOOK_APP.innerHTML = `
      <section class="empty-state notebook-empty-state">
        <p class="eyebrow">Notebook</p>
        <h2>No se encontró la pregunta solicitada</h2>
        <p>Regresa directamente a la pregunta desde la que abriste el Notebook.</p>
        <div class="notebook-empty-actions">
          <a class="primary-btn header-link" href="${returnUrl}">Volver a la pregunta</a>
        </div>
      </section>
    `;
    return;
  }

  const resourceTabs = NOTEBOOK_RESOURCE_TYPES.map(item => `
    <button class="notebook-tab ${item.key === notebookState.activeResource ? "active" : ""}" type="button" data-resource="${item.key}">
      <span>${item.icon}</span>${item.label}
    </button>
  `).join("");

  NOTEBOOK_APP.innerHTML = `
    <section class="notebook-hero">
      <div>
        <p class="eyebrow">${NOTEBOOK_INSTITUTION}</p>
        <h2>Preparación guiada para la pregunta ${question.number}</h2>
        <p>Este espacio acompaña el modo <strong>Entrenamiento con Notebook</strong>. Cada pregunta tiene su propio conjunto de recursos: mapa mental, video, audio, presentación e infografía.</p>
      </div>
      <div class="notebook-badge">
        <span>Área</span>
        <strong>${escapeHtml(question.area || "Por definir")}</strong>
      </div>
    </section>

    <section class="notebook-question-summary">
      <div>
        <p class="eyebrow">Referencia de la pregunta</p>
        <h3>${escapeHtml(question.sourceLabel || `Pregunta ${question.number}`)}</h3>
        <p class="notebook-stem">${question.stem || ""}</p>
        <p class="prompt">${question.prompt || ""}</p>
      </div>
      <div class="notebook-metadata-grid">
        <span><strong>Competencia</strong>${escapeHtml(question.competencia || "Por definir")}</span>
        <span><strong>Componente</strong>${escapeHtml(question.componente || "Por definir")}</span>
        <span><strong>Dificultad</strong>${escapeHtml(question.dificultad || "Por definir")}</span>
      </div>
    </section>

    <section class="notebook-tabs" aria-label="Recursos Notebook individuales de la pregunta">
      ${resourceTabs}
    </section>

    <section id="notebookSheetStatus" class="notebook-sheet-status" aria-live="polite"></section>

    <section id="notebookResource" class="notebook-resource-panel"></section>
  `;

  NOTEBOOK_APP.querySelectorAll(".notebook-tab").forEach(button => {
    button.addEventListener("click", () => {
      notebookState.activeResource = button.dataset.resource;
      const params = new URLSearchParams(window.location.search);
      params.set("resource", notebookState.activeResource);
      window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
      renderNotebookResource();
      NOTEBOOK_APP.querySelectorAll(".notebook-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.resource === notebookState.activeResource));
    });
  });

  renderNotebookResource();
  updateNotebookSheetStatus();
  const refreshBtn = document.getElementById("refreshNotebookSheetsBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      NOTEBOOK_SHEETS_CACHE.loaded = false;
      NOTEBOOK_SHEETS_CACHE.promise = null;
      renderNotebookResource();
      updateNotebookSheetStatus();
      loadNotebookSheetsResources(true)
        .then(() => {
          renderNotebookResource();
          updateNotebookSheetStatus();
        })
        .catch(() => {
          renderNotebookResource();
          updateNotebookSheetStatus();
        });
    });
  }
  NOTEBOOK_APP.focus();
}

function getNotebookResourceCountForQuestion(question) {
  if (!question) return 0;
  const key = `${Number(question.session)}-${Number(question.number)}`;
  const resources = NOTEBOOK_SHEETS_CACHE.resources[key] || NOTEBOOK_CUSTOM_RESOURCES[key] || {};
  return NOTEBOOK_SHEETS_CONFIG.resourceTypes.filter(item => Boolean(resources[item.key])).length;
}

function updateNotebookSheetStatus() {
  const status = document.getElementById("notebookSheetStatus");
  if (!status || !notebookState.question) return;
  const count = getNotebookResourceCountForQuestion(notebookState.question);
  const total = NOTEBOOK_SHEETS_CONFIG.resourceTypes.length;
  const loadedText = NOTEBOOK_SHEETS_CACHE.loading
    ? "Consultando Google Sheets institucional…"
    : NOTEBOOK_SHEETS_CACHE.error
      ? NOTEBOOK_SHEETS_CACHE.error
      : count >= total
        ? "Notebook completo importado desde Sheets."
        : `Notebook parcial: ${count} de ${total} recursos multimedia.`;
  const timeText = NOTEBOOK_SHEETS_CACHE.lastLoadedAt
    ? `Última lectura: ${new Date(NOTEBOOK_SHEETS_CACHE.lastLoadedAt).toLocaleString("es-CO")}`
    : "Lectura automática al abrir este Notebook.";
  status.innerHTML = `
    <div>
      <strong>${escapeHtml(loadedText)}</strong>
      <span>${escapeHtml(timeText)}</span>
    </div>
    <button class="secondary-btn small-btn" type="button" id="refreshNotebookSheetsBtn">Actualizar desde Sheets</button>
  `;
  status.classList.toggle("complete", count >= total);
  status.classList.toggle("loading", NOTEBOOK_SHEETS_CACHE.loading);
  status.classList.toggle("error", Boolean(NOTEBOOK_SHEETS_CACHE.error));
}

function renderNotebookResource() {
  const panel = document.getElementById("notebookResource");
  if (!panel || !notebookState.question) return;
  const question = notebookState.question;
  const resource = notebookState.activeResource;
  const customResource = getCustomNotebookResource(question, resource);
  let content = "";
  if (resource === "simulator") {
    content = renderNotebookSimulator(question, customResource);
  } else if (customResource) {
    content = renderCustomNotebookResource(question, resource, customResource);
  } else if (NOTEBOOK_SHEETS_CONFIG.resourceTypes.some(item => item.key === resource)) {
    content = (NOTEBOOK_SHEETS_CACHE.loaded || NOTEBOOK_SHEETS_CACHE.error)
      ? renderNotebookSheetsMissingResource(question, resource)
      : renderNotebookSheetsLoadingResource(question, resource);
  } else {
    content = ({
      mindmap: renderMindMap(question),
      video: renderVideoLesson(question),
      audio: renderAudioGuide(question),
      presentation: renderPresentation(question),
      infographic: renderInfographic(question)
    }[resource] || renderMindMap(question));
  }
  panel.innerHTML = content;
  const playBtn = document.getElementById("playAudioGuideBtn");
  if (playBtn) {
    playBtn.addEventListener("click", () => playAudioGuide(buildAudioGuide(question)));
  }
  if (resource === "simulator") {
    initNotebookSimulator(question);
  }
}

function getCustomNotebookResource(question, resourceKey) {
  const key = `${Number(question.session)}-${Number(question.number)}`;
  const dynamicResources = NOTEBOOK_SHEETS_CACHE.resources[key];
  if (dynamicResources && dynamicResources[resourceKey]) return dynamicResources[resourceKey];
  const questionResources = NOTEBOOK_CUSTOM_RESOURCES[key];
  return questionResources ? questionResources[resourceKey] : null;
}

function renderCustomNotebookResource(question, resourceKey, resource) {
  const resourceMeta = NOTEBOOK_RESOURCE_TYPES.find(item => item.key === resourceKey) || { label: "Recurso", icon: "📌" };
  const embed = resource.embedHtml ? `
    <div class="notebook-embed-wrap" aria-label="${escapeHtml(resource.title || resourceMeta.label)}">
      ${resource.embedHtml}
    </div>
  ` : "";
  const link = resource.url ? `
    <a class="secondary-btn" href="${escapeHtml(resource.url)}" target="_blank" rel="noopener">Abrir recurso en una pestaña nueva</a>
  ` : "";
  const sheetMeta = resource.sourceRow || resource.updatedAt ? `
    <p class="footer-note notebook-source-note">Fuente: ${escapeHtml(resource.source || "Google Sheets institucional")}${resource.sourceRow ? ` · Fila ${escapeHtml(resource.sourceRow)}` : ""}${resource.updatedAt ? ` · Registro ${escapeHtml(resource.updatedAt)}` : ""}</p>
  ` : "";
  return `
    <article class="notebook-card large notebook-custom-resource">
      <p class="eyebrow">${escapeHtml(resourceMeta.icon)} ${escapeHtml(resourceMeta.label)} · Recurso individual</p>
      <h3>${escapeHtml(resource.title || `${resourceMeta.label} de preparación · Pregunta ${question.number}`)}</h3>
      <p>${escapeHtml(resource.description || "Material multimedia cargado específicamente para esta pregunta.")}</p>
      ${embed}
      ${link}
      ${sheetMeta || `<p class="footer-note">Este recurso pertenece únicamente a la Sección ${escapeHtml(question.session)} · Pregunta ${escapeHtml(question.number)}.</p>`}
    </article>
  `;
}

function renderMindMap(question) {
  const topic = getTopicLabel(question);
  const nodes = [
    { title: "Área", value: question.area || "Por definir" },
    { title: "Competencia", value: question.competencia || "Comprensión y análisis" },
    { title: "Componente", value: question.componente || "Conceptos clave" },
    { title: "Acción mental", value: getActionVerb(question) },
    { title: "Estrategia", value: getStrategy(question) }
  ];
  return `
    <article class="notebook-card large">
      <p class="eyebrow">Recurso 1</p>
      <h3>Mapa mental de preparación</h3>
      <p>Identifica qué debes leer, relacionar y decidir antes de elegir una opción.</p>
      <div class="mindmap">
        <div class="mindmap-center">
          <span>Pregunta ${question.number}</span>
          <strong>${escapeHtml(topic)}</strong>
        </div>
        ${nodes.map(node => `
          <div class="mindmap-node">
            <small>${escapeHtml(node.title)}</small>
            <strong>${escapeHtml(node.value)}</strong>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function renderVideoLesson(question) {
  return `
    <article class="notebook-card large">
      <p class="eyebrow">Recurso 2</p>
      <h3>Video guía para preparar la pregunta</h3>
      <div class="video-placeholder" role="img" aria-label="Espacio de video pedagógico">
        <div class="play-circle">▶</div>
        <div>
          <strong>Video de preparación · Pregunta ${question.number}</strong>
          <span>Espacio listo para alojar o enlazar un video institucional.</span>
        </div>
      </div>
      <div class="lesson-script">
        <h4>Guion sugerido del video</h4>
        <ol>
          <li>Lee el enunciado y ubica la intención de la pregunta.</li>
          <li>Reconoce el área: <strong>${escapeHtml(question.area || "Por definir")}</strong>.</li>
          <li>Identifica palabras clave del componente: <strong>${escapeHtml(question.componente || "Por definir")}</strong>.</li>
          <li>Descarta opciones que no respondan directamente al enunciado.</li>
          <li>Selecciona la alternativa que mejor se sostenga con la información dada.</li>
        </ol>
      </div>
    </article>
  `;
}

function renderAudioGuide(question) {
  const guide = buildAudioGuide(question);
  return `
    <article class="notebook-card large">
      <p class="eyebrow">Recurso 3</p>
      <h3>Audio de orientación</h3>
      <p>Usa esta guía breve para preparar la lectura de la pregunta sin revelar la respuesta correcta.</p>
      <button class="primary-btn" type="button" id="playAudioGuideBtn">Reproducir audio guía</button>
      <blockquote class="audio-script">${escapeHtml(guide)}</blockquote>
    </article>
  `;
}

function renderPresentation(question) {
  const slides = [
    { title: "1. Comprende", text: "Lee el enunciado completo y reconoce qué te están preguntando." },
    { title: "2. Clasifica", text: `Área: ${question.area || "Por definir"}. Competencia: ${question.competencia || "Por definir"}.` },
    { title: "3. Relaciona", text: `Conecta el enunciado con el componente: ${question.componente || "Por definir"}.` },
    { title: "4. Decide", text: "Compara las opciones y elige la que responda con mayor precisión." }
  ];
  return `
    <article class="notebook-card large">
      <p class="eyebrow">Recurso 4</p>
      <h3>Presentación de estudio</h3>
      <div class="slide-grid">
        ${slides.map(slide => `
          <section class="mini-slide">
            <h4>${escapeHtml(slide.title)}</h4>
            <p>${escapeHtml(slide.text)}</p>
          </section>
        `).join("")}
      </div>
    </article>
  `;
}

function renderInfographic(question) {
  return `
    <article class="notebook-card large">
      <p class="eyebrow">Recurso 5</p>
      <h3>Infografía de preparación</h3>
      <div class="infographic-grid">
        <div><strong>1</strong><span>Lee</span><small>Comprende el contexto antes de mirar opciones.</small></div>
        <div><strong>2</strong><span>Subraya</span><small>Ubica datos, verbos, conectores y palabras clave.</small></div>
        <div><strong>3</strong><span>Compara</span><small>Contrasta cada opción con el enunciado.</small></div>
        <div><strong>4</strong><span>Verifica</span><small>Confirma que tu respuesta resuelva exactamente lo pedido.</small></div>
      </div>
      <p class="footer-note">Dificultad estimada: ${escapeHtml(question.dificultad || "Por definir")} · Recurso diseñado para práctica formativa.</p>
    </article>
  `;
}


function renderNotebookSimulator(question, customResource) {
  if (Number(question.session) === 1 && Number(question.number) === 1) {
    return renderS1P1AverageSimulator(question, customResource);
  }
  return renderGenericNotebookSimulator(question);
}

function renderS1P1AverageSimulator(question, customResource) {
  const ages = [21, 26, 20, 21, 22, 28, 30];
  const options = (question.options || []).map(option => `
    <button class="sim-answer" type="button" data-answer="${escapeHtml(option.letter)}">
      <strong>${escapeHtml(option.letter)}</strong><span>${escapeHtml(option.text)}</span>
    </button>
  `).join("");
  return `
    <article class="notebook-card large notebook-simulator-card">
      <p class="eyebrow">🧩 Simulador · Recurso interactivo individual</p>
      <h3>${escapeHtml((customResource && customResource.title) || "Simulador interactivo · Pregunta 1")}</h3>
      <p>${escapeHtml((customResource && customResource.description) || "Explora la pregunta paso a paso antes de responder en el simulador.")}</p>

      <div class="sim-intro-grid">
        <section class="sim-mini-board">
          <h4>Reto</h4>
          <p>Calcula el promedio de las edades en las que siete madres tuvieron su primer hijo.</p>
          <div class="sim-data-table" role="table" aria-label="Edades de la pregunta 1">
            <div role="row"><strong>Madre</strong><strong>Edad</strong></div>
            ${ages.map((age, index) => `<div role="row"><span>${index + 1}</span><span>${age}</span></div>`).join("")}
          </div>
        </section>
        <section class="sim-mini-board sim-concept">
          <h4>Idea clave</h4>
          <div class="average-formula">
            <span>Promedio</span>
            <strong>=</strong>
            <span>Suma de datos ÷ cantidad de datos</span>
          </div>
          <p>No basta con mirar el dato más repetido o el dato del centro: para el promedio se suman todos los datos y luego se divide por el número total de datos.</p>
        </section>
      </div>

      <div class="sim-steps" aria-label="Pasos del simulador de promedio">
        <section class="sim-step active" data-step="1">
          <div class="sim-step-head">
            <span>Paso 1</span>
            <h4>Selecciona las siete edades y observa la suma</h4>
          </div>
          <p>Haz clic en cada edad para agregarla a la suma. El simulador irá construyendo la operación.</p>
          <div class="age-chip-grid" id="ageChipGrid">
            ${ages.map((age, index) => `<button class="age-chip" type="button" data-index="${index}" data-age="${age}">${age}</button>`).join("")}
          </div>
          <div class="sim-equation" id="sumEquation">Suma: <strong>0</strong></div>
          <div class="sim-progress-wrap"><span id="sumProgressText">0 de 7 edades seleccionadas</span><div><span id="sumProgressBar"></span></div></div>
        </section>

        <section class="sim-step" data-step="2">
          <div class="sim-step-head">
            <span>Paso 2</span>
            <h4>Divide entre la cantidad de datos</h4>
          </div>
          <p>Como hay siete madres entrevistadas, la suma total debe dividirse entre 7.</p>
          <label class="sim-input-label" for="dividerInput">¿Entre cuántos datos se divide?</label>
          <div class="sim-inline-action">
            <input id="dividerInput" type="number" min="1" max="20" placeholder="Escribe el número" />
            <button class="secondary-btn" type="button" id="checkDividerBtn">Verificar</button>
          </div>
          <p id="dividerFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step" data-step="3">
          <div class="sim-step-head">
            <span>Paso 3</span>
            <h4>Construye el promedio</h4>
          </div>
          <p>Cuando tengas la suma y el divisor correctos, calcula el promedio.</p>
          <div class="average-machine">
            <div><span>Suma</span><strong id="machineSum">—</strong></div>
            <div><span>÷</span><strong id="machineDivider">—</strong></div>
            <div><span>Promedio</span><strong id="machineAverage">—</strong></div>
          </div>
          <button class="primary-btn" type="button" id="calculateAverageBtn">Calcular promedio</button>
          <p id="averageFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step" data-step="4">
          <div class="sim-step-head">
            <span>Paso 4</span>
            <h4>Relaciona el resultado con las opciones ICFES</h4>
          </div>
          <p>Elige la opción que coincide con el promedio obtenido. Esta práctica te ayuda a justificar la respuesta antes de volver a la pregunta.</p>
          <div class="sim-answer-grid" id="simAnswerGrid">${options}</div>
          <div id="simFinalFeedback" class="sim-final-feedback" aria-live="polite"></div>
        </section>
      </div>

      <div class="sim-teacher-note">
        <strong>Lectura didáctica:</strong> esta pregunta evalúa interpretación de una tabla y uso del promedio aritmético. El error frecuente es escoger una edad visible en la tabla sin aplicar la operación completa.
      </div>
    </article>
  `;
}

function renderGenericNotebookSimulator(question) {
  return `
    <article class="notebook-card large notebook-simulator-card">
      <p class="eyebrow">🧩 Simulador · Recurso interactivo individual</p>
      <h3>Simulador didáctico de la pregunta ${escapeHtml(question.number)}</h3>
      <p>Este espacio permite preparar una solución guiada para esta pregunta. Cuando se cargue un simulador específico, aparecerán actividades interactivas relacionadas con sus datos, recursos multimedia y tipo de competencia.</p>
      <div class="generic-simulator-grid">
        <div><strong>1. Comprende</strong><span>Identifica qué pide la pregunta.</span></div>
        <div><strong>2. Extrae datos</strong><span>Separa información útil de información contextual.</span></div>
        <div><strong>3. Aplica estrategia</strong><span>Usa el procedimiento adecuado para el área.</span></div>
        <div><strong>4. Verifica</strong><span>Compara tu resultado con las opciones.</span></div>
      </div>
    </article>
  `;
}

function initNotebookSimulator(question) {
  if (Number(question.session) === 1 && Number(question.number) === 1) {
    initS1P1AverageSimulator(question);
  }
}

function initS1P1AverageSimulator(question) {
  const ages = [21, 26, 20, 21, 22, 28, 30];
  const selected = new Set();
  let divisorOk = false;
  let averageOk = false;
  const total = ages.reduce((acc, value) => acc + value, 0);
  const divisor = ages.length;
  const average = total / divisor;

  const chips = Array.from(document.querySelectorAll(".age-chip"));
  const sumEquation = document.getElementById("sumEquation");
  const sumProgressText = document.getElementById("sumProgressText");
  const sumProgressBar = document.getElementById("sumProgressBar");
  const dividerInput = document.getElementById("dividerInput");
  const checkDividerBtn = document.getElementById("checkDividerBtn");
  const dividerFeedback = document.getElementById("dividerFeedback");
  const machineSum = document.getElementById("machineSum");
  const machineDivider = document.getElementById("machineDivider");
  const machineAverage = document.getElementById("machineAverage");
  const calculateAverageBtn = document.getElementById("calculateAverageBtn");
  const averageFeedback = document.getElementById("averageFeedback");
  const answerGrid = document.getElementById("simAnswerGrid");
  const finalFeedback = document.getElementById("simFinalFeedback");

  function currentSum() {
    return Array.from(selected).reduce((acc, index) => acc + ages[index], 0);
  }

  function markStep(number, enabled) {
    const step = document.querySelector(`.sim-step[data-step="${number}"]`);
    if (step) step.classList.toggle("active", Boolean(enabled));
  }

  function updateSumUI() {
    const picked = Array.from(selected).sort((a, b) => a - b).map(index => ages[index]);
    const sum = currentSum();
    sumEquation.innerHTML = picked.length
      ? `Suma: <strong>${picked.join(" + ")} = ${sum}</strong>`
      : `Suma: <strong>0</strong>`;
    sumProgressText.textContent = `${picked.length} de ${ages.length} edades seleccionadas`;
    sumProgressBar.style.width = `${Math.round((picked.length / ages.length) * 100)}%`;
    machineSum.textContent = picked.length === ages.length ? String(total) : "—";
    if (picked.length === ages.length) {
      markStep(2, true);
      dividerFeedback.textContent = "Muy bien. Ya tienes la suma completa: 168.";
      dividerFeedback.className = "sim-feedback ok";
    } else {
      markStep(2, false);
      markStep(3, false);
      markStep(4, false);
      divisorOk = false;
      averageOk = false;
      machineDivider.textContent = "—";
      machineAverage.textContent = "—";
    }
  }

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const index = Number(chip.dataset.index);
      if (selected.has(index)) selected.delete(index);
      else selected.add(index);
      chip.classList.toggle("selected", selected.has(index));
      updateSumUI();
    });
  });

  if (checkDividerBtn) {
    checkDividerBtn.addEventListener("click", () => {
      if (selected.size !== ages.length) {
        dividerFeedback.textContent = "Primero selecciona las siete edades para construir la suma total.";
        dividerFeedback.className = "sim-feedback warn";
        return;
      }
      const value = Number(dividerInput.value);
      if (value === divisor) {
        divisorOk = true;
        machineDivider.textContent = String(divisor);
        dividerFeedback.textContent = "Correcto. Se divide entre 7 porque hay siete datos en la tabla.";
        dividerFeedback.className = "sim-feedback ok";
        markStep(3, true);
      } else {
        divisorOk = false;
        machineDivider.textContent = "—";
        dividerFeedback.textContent = "Revisa la tabla: el divisor debe ser la cantidad total de madres entrevistadas.";
        dividerFeedback.className = "sim-feedback error";
        markStep(3, false);
        markStep(4, false);
      }
    });
  }

  if (calculateAverageBtn) {
    calculateAverageBtn.addEventListener("click", () => {
      if (!divisorOk) {
        averageFeedback.textContent = "Antes de calcular, verifica correctamente el divisor.";
        averageFeedback.className = "sim-feedback warn";
        return;
      }
      averageOk = true;
      machineAverage.textContent = String(average);
      averageFeedback.innerHTML = `Excelente: <strong>${total} ÷ ${divisor} = ${average}</strong>. Ahora busca esa cantidad en las opciones.`;
      averageFeedback.className = "sim-feedback ok";
      markStep(4, true);
    });
  }

  if (answerGrid) {
    answerGrid.addEventListener("click", event => {
      const button = event.target.closest(".sim-answer");
      if (!button) return;
      if (!averageOk) {
        finalFeedback.textContent = "Calcula primero el promedio en el paso 3 antes de elegir la opción.";
        finalFeedback.className = "sim-final-feedback warn";
        return;
      }
      answerGrid.querySelectorAll(".sim-answer").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      const answer = button.dataset.answer;
      if (answer === question.correctAnswer) {
        button.classList.add("correct");
        finalFeedback.innerHTML = `<strong>Correcto.</strong> La respuesta es ${escapeHtml(question.correctAnswer)} porque el promedio de las edades es ${average}. Regresa a la pregunta y marca la opción con seguridad.`;
        finalFeedback.className = "sim-final-feedback ok";
      } else {
        button.classList.add("wrong");
        finalFeedback.innerHTML = `<strong>Revisa.</strong> La opción elegida no coincide con el promedio calculado. Recuerda: ${total} ÷ ${divisor} = ${average}.`;
        finalFeedback.className = "sim-final-feedback error";
      }
    });
  }

  updateSumUI();
}

function buildAudioGuide(question) {
  return `Pregunta ${question.number}. Antes de responder, identifica el área ${question.area || "por definir"}, revisa el componente ${question.componente || "por definir"} y determina qué información del enunciado permite justificar la opción. No elijas por descarte rápido: compara cada alternativa con la intención de la pregunta.`;
}

function playAudioGuide(text) {
  if (!("speechSynthesis" in window)) {
    alert("Este navegador no permite reproducir audio por síntesis de voz. Puedes leer el guion en pantalla.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-CO";
  utterance.rate = 0.94;
  window.speechSynthesis.speak(utterance);
}

function getTopicLabel(question) {
  const area = question.area || "ICFES";
  const component = question.componente || question.competencia || "habilidad evaluada";
  return `${area}: ${component}`;
}

function getActionVerb(question) {
  const text = `${question.prompt || ""} ${question.stem || ""}`.toLowerCase();
  if (text.includes("purpose") || text.includes("propósito")) return "Identificar propósito";
  if (text.includes("according") || text.includes("de acuerdo")) return "Localizar evidencia";
  if (text.includes("infer") || text.includes("inferir")) return "Inferir";
  if (text.includes("title") || text.includes("título")) return "Sintetizar idea central";
  if (text.includes("mean") || text.includes("significa")) return "Interpretar significado";
  return "Analizar y justificar";
}

function getStrategy(question) {
  const area = String(question.area || "").toLowerCase();
  if (area.includes("inglés")) return "Lee conectores, intención y contexto antes de traducir palabra por palabra.";
  if (area.includes("matem")) return "Identifica datos, relación matemática y operación necesaria.";
  if (area.includes("lectura")) return "Ubica tesis, intención comunicativa e información explícita e implícita.";
  if (area.includes("sociales")) return "Relaciona situación, actor social, norma o contexto histórico.";
  if (area.includes("ciencias")) return "Reconoce fenómeno, variable y explicación científica.";
  return "Vuelve al enunciado y justifica la respuesta con evidencia.";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* ==========================================================
   Simuladores dinámicos por pregunta · Sección 1 Matemáticas
   Preguntas 2 a 25
   ========================================================== */

function renderNotebookSimulator(question, customResource) {
  if (Number(question.session) === 1 && Number(question.number) === 1) {
    return renderS1P1AverageSimulator(question, customResource);
  }
  if (Number(question.session) === 1 && String(question.area || "").toLowerCase().includes("matem") && Number(question.number) >= 2 && Number(question.number) <= 25) {
    const config = getS1MathSimulatorConfig(Number(question.number));
    if (config) return renderS1MathGuidedSimulator(question, config);
  }
  return renderGenericNotebookSimulator(question);
}

function initNotebookSimulator(question) {
  if (Number(question.session) === 1 && Number(question.number) === 1) {
    initS1P1AverageSimulator(question);
    return;
  }
  if (Number(question.session) === 1 && String(question.area || "").toLowerCase().includes("matem") && Number(question.number) >= 2 && Number(question.number) <= 25) {
    initS1MathGuidedSimulator(question);
  }
}

function getS1MathSimulatorConfig(number) {
  const configs = {
    2: {
      title: "Simulador interactivo · Porcentajes con dato faltante",
      challenge: "Determina si se puede calcular un valor total cuando el impuesto depende de una temporada no informada.",
      keyIdea: "En modelación matemática no basta con tener una fórmula: todas las variables necesarias deben estar definidas.",
      dataTable: { headers: ["Dato", "Valor"], rows: [["5 tiquetes jueves", "$80.000 cada uno"], ["2 tiquetes sábado", "$150.000 cada uno"], ["Impuesto y", "12 % o 19 % según temporada"], ["Temporada", "No informada"]] },
      chips: [{ text: "Valor base de tiquetes", correct: true }, { text: "Impuesto y", correct: true }, { text: "Temporada del viaje", correct: true }, { text: "Color del avión", correct: false }],
      strategyQuestion: "¿Qué impide hallar un único total?",
      strategyChoices: [{ text: "No conocer la temporada que define si el impuesto es 12 % o 19 %.", correct: true }, { text: "No saber multiplicar 5 por 80.000.", correct: false }, { text: "No conocer el día de viaje.", correct: false }],
      miniQuestion: "El valor base es 5×80.000 + 2×150.000 = 700.000. ¿Qué falta para convertirlo en total final?",
      miniChoices: [{ text: "El porcentaje de impuesto exacto.", correct: true }, { text: "El número de tiquetes del jueves.", correct: false }, { text: "El número de tiquetes del sábado.", correct: false }],
      teacherNote: "Esta pregunta evalúa lectura de variables: cuando una variable no está determinada, la respuesta correcta puede ser que no es posible calcular un único resultado."
    },
    3: {
      title: "Simulador interactivo · Diagrama de Venn y tabla",
      challenge: "Comprueba si la tabla resume correctamente las regiones del diagrama de Venn.",
      keyIdea: "En un diagrama de Venn, cada total por categoría se obtiene sumando todas las regiones que pertenecen a ese conjunto.",
      dataTable: { headers: ["Síntoma", "Suma correcta"], rows: [["Dolor de cabeza", "10 + 8 + 6 = 24"], ["Náuseas", "6 + 15 + 1 = 22"], ["Mareo", "8 + 5 + 1 = 14"]] },
      chips: [{ text: "Sumar solo las regiones dentro de cada círculo", correct: true }, { text: "Comparar con la tabla del médico", correct: true }, { text: "Sumar toda la población de 60 para cada síntoma", correct: false }, { text: "Revisar intersecciones", correct: true }],
      strategyQuestion: "¿Cómo se valida la tabla?",
      strategyChoices: [{ text: "Se calcula cada síntoma sumando sus regiones del diagrama y se compara con la tabla.", correct: true }, { text: "Se escoge el número más grande del diagrama.", correct: false }, { text: "Se suman todos los números y se asignan a cada síntoma.", correct: false }],
      miniQuestion: "Para dolor de cabeza, ¿qué suma corresponde?",
      miniChoices: [{ text: "10 + 8 + 6 = 24", correct: true }, { text: "10 + 8 + 5 = 23", correct: false }, { text: "6 + 15 + 1 = 22", correct: false }],
      teacherNote: "El error frecuente es olvidar las intersecciones. En Venn, quienes están en dos síntomas cuentan para ambos síntomas."
    },
    4: {
      title: "Simulador interactivo · Conteo con condición 'al menos uno'",
      challenge: "Decide qué casos se necesitan para contar grupos de 3 con al menos un hombre.",
      keyIdea: "'Al menos un hombre' significa uno o más hombres. Se excluyen los grupos sin hombres y también los imposibles.",
      dataTable: { headers: ["Caso", "¿Sirve?"], rows: [["X: tres hombres", "No es posible: solo hay 2 hombres"], ["Y: una mujer y dos hombres", "Sí sirve"], ["Z: dos mujeres y un hombre", "Sí sirve"], ["W: tres mujeres", "No sirve"]] },
      chips: [{ text: "Y: una mujer y dos hombres", correct: true }, { text: "Z: dos mujeres y un hombre", correct: true }, { text: "W: tres mujeres", correct: false }, { text: "X: tres hombres", correct: false }],
      strategyQuestion: "¿Qué valores se deben conocer?",
      strategyChoices: [{ text: "Y y Z, porque ambos casos tienen al menos un hombre y son posibles.", correct: true }, { text: "Solo W, porque es el grupo más numeroso.", correct: false }, { text: "X y W, porque son los extremos.", correct: false }],
      miniQuestion: "Si hay 2 hombres en la clase, ¿se puede formar un grupo de tres hombres?",
      miniChoices: [{ text: "No, porque faltaría un hombre.", correct: true }, { text: "Sí, porque el grupo es de tres estudiantes.", correct: false }, { text: "Sí, porque hay seis estudiantes en total.", correct: false }],
      teacherNote: "Para condiciones de conteo, primero clasifica casos posibles e imposibles; luego revisa cuáles cumplen la condición."
    },
    5: {
      title: "Simulador interactivo · Multiplicación cantidad × valor",
      challenge: "Calcula cuánto dinero entregó el banco por cada tipo de premio.",
      keyIdea: "El total por categoría se obtiene multiplicando cantidad de premios por monto de cada premio.",
      dataTable: { headers: ["Premio", "Operación"], rows: [["Oro", "5 × 10.000.000 = 50.000.000"], ["Plata", "25 × 5.000.000 = 125.000.000"], ["Bronce", "100 × 1.000.000 = 100.000.000"]] },
      chips: [{ text: "Cantidad de premios", correct: true }, { text: "Monto de cada premio", correct: true }, { text: "Multiplicación por categoría", correct: true }, { text: "Suma de todos antes de clasificar", correct: false }],
      strategyQuestion: "¿Cuál es la operación central?",
      strategyChoices: [{ text: "Multiplicar cantidad de premios por valor unitario en cada fila.", correct: true }, { text: "Dividir el monto entre la cantidad de premios.", correct: false }, { text: "Elegir la fila con mayor valor unitario solamente.", correct: false }],
      miniQuestion: "¿Cuánto dinero se entregó en premios de Plata?",
      miniChoices: [{ text: "$125.000.000", correct: true }, { text: "$100.000.000", correct: false }, { text: "$50.000.000", correct: false }],
      teacherNote: "Esta es una pregunta de proporcionalidad directa: si hay más premios, el total de dinero aumenta proporcionalmente."
    },
    6: {
      title: "Simulador interactivo · Ahorro duplicado cada mes",
      challenge: "Comprende una progresión geométrica acumulada para alcanzar $750.000.",
      keyIdea: "Duplicar cada mes genera una sucesión: 50.000, 100.000, 200.000, 400.000... El total acumulado es la suma de esos ahorros.",
      dataTable: { headers: ["Mes", "Ahorro del mes"], rows: [["1", "$50.000"], ["2", "$100.000"], ["3", "$200.000"], ["4", "$400.000"], ["Total 4 meses", "$750.000"]] },
      chips: [{ text: "Se duplica el ahorro mensual", correct: true }, { text: "Se necesita acumular $750.000", correct: true }, { text: "Se suma el ahorro de cada mes", correct: true }, { text: "Se multiplica 50.000 por 15 meses", correct: false }],
      strategyQuestion: "¿Cómo se halla el número de meses?",
      strategyChoices: [{ text: "Construyendo la suma acumulada de valores que se duplican.", correct: true }, { text: "Dividiendo 750.000 entre 50.000 y tomando ese resultado como meses.", correct: false }, { text: "Restando 50.000 cada mes.", correct: false }],
      miniQuestion: "¿Qué suma de factores completa 15 veces el ahorro inicial?",
      miniChoices: [{ text: "1 + 2 + 4 + 8 = 15", correct: true }, { text: "1 + 2 + 3 + 4 = 10", correct: false }, { text: "2 + 4 + 6 + 8 = 20", correct: false }],
      teacherNote: "La clave es distinguir entre ahorro del mes y ahorro acumulado. ICFES suele evaluar esa lectura."
    },
    7: {
      title: "Simulador interactivo · Porcentaje mensual y acumulado",
      challenge: "Calcula cuánto ahorra una persona cuando guarda un porcentaje fijo durante varios meses.",
      keyIdea: "Primero se calcula el porcentaje de un sueldo; después se multiplica por la cantidad de meses.",
      dataTable: { headers: ["Dato", "Valor"], rows: [["Sueldo de Estefanía", "$900.000"], ["Porcentaje de ahorro", "3 %"], ["Ahorro mensual", "$27.000"], ["10 meses", "$270.000"]] },
      chips: [{ text: "3 % de $900.000", correct: true }, { text: "10 meses consecutivos", correct: true }, { text: "Multiplicar ahorro mensual por 10", correct: true }, { text: "Usar el sueldo de Alberto sin revisar el dato de Estefanía", correct: false }],
      strategyQuestion: "¿Cuál es el orden correcto?",
      strategyChoices: [{ text: "Calcular el ahorro mensual y luego multiplicarlo por 10.", correct: true }, { text: "Sumar 3 y 10 al sueldo.", correct: false }, { text: "Dividir el sueldo entre 10 y luego restar 3.", correct: false }],
      miniQuestion: "¿Cuánto es el 3 % de $900.000?",
      miniChoices: [{ text: "$27.000", correct: true }, { text: "$24.000", correct: false }, { text: "$297.000", correct: false }],
      teacherNote: "En porcentajes, 3 % significa 3/100. Luego se interpreta si el resultado es mensual o total."
    },
    8: {
      title: "Simulador interactivo · Comparar tabla y gráfica",
      challenge: "Detecta si una gráfica reproduce exactamente los datos de una tabla.",
      keyIdea: "Para validar una gráfica, no basta con que se parezca: hay que comparar valores puntuales por región y año.",
      dataTable: { headers: ["Dato revisado", "Diferencia detectada"], rows: [["Antioquia 2012", "Tabla: 21,7 · Gráfica: 20,5"], ["Antioquia 2013", "Tabla: 22,4 · Gráfica: 18,3"], ["Bogotá 2015", "Tabla: 4,7 · Gráfica: 7,6"]] },
      chips: [{ text: "Comparar año por año", correct: true }, { text: "Revisar si Antioquia coincide", correct: true }, { text: "Revisar Bogotá 2015", correct: true }, { text: "Concluir solo por el color de la gráfica", correct: false }],
      strategyQuestion: "¿Qué hace falsa la equivalencia tabla-gráfica?",
      strategyChoices: [{ text: "Algunos valores específicos de la gráfica no coinciden con la tabla.", correct: true }, { text: "La gráfica siempre es menos confiable que la tabla.", correct: false }, { text: "La tabla no tiene años.", correct: false }],
      miniQuestion: "¿Cuál par muestra una diferencia mencionada?",
      miniChoices: [{ text: "Bogotá 2015: 4,7 frente a 7,6", correct: true }, { text: "Antioquia 2015: 4,7 frente a 7,6", correct: false }, { text: "Central 2011: 0 frente a 0", correct: false }],
      teacherNote: "Una pregunta de interpretación gráfica exige contraste preciso de datos, no solo una lectura general visual."
    },
    9: {
      title: "Simulador interactivo · Tabla de frecuencias y gráfica correcta",
      challenge: "Elige la gráfica que representa cantidades por intervalo de peso.",
      keyIdea: "Si la tabla da frecuencias absolutas, la gráfica debe ubicar intervalos en el eje horizontal y cantidades en el eje vertical.",
      dataTable: { headers: ["Intervalo de peso", "Cantidad de papas"], rows: [["15 ≤ p < 20", "700"], ["20 ≤ p < 25", "500"], ["25 ≤ p < 30", "800"]] },
      chips: [{ text: "Intervalos de peso en el eje horizontal", correct: true }, { text: "Cantidad de papas en el eje vertical", correct: true }, { text: "Frecuencias 700, 500 y 800", correct: true }, { text: "Usar porcentajes iguales", correct: false }],
      strategyQuestion: "¿Qué debe respetar la gráfica?",
      strategyChoices: [{ text: "Las cantidades exactas por intervalo de peso.", correct: true }, { text: "Tres porcentajes iguales de 33,3 %.", correct: false }, { text: "Solo el número total de papas sin intervalos.", correct: false }],
      miniQuestion: "¿Qué barra debería ser la más alta?",
      miniChoices: [{ text: "25 ≤ p < 30, porque tiene 800 papas.", correct: true }, { text: "20 ≤ p < 25, porque tiene 500 papas.", correct: false }, { text: "15 ≤ p < 20, porque tiene 700 papas.", correct: false }],
      teacherNote: "La representación debe conservar la unidad: cantidad de papas, no porcentaje si la tabla no lo exige."
    },
    10: {
      title: "Simulador interactivo · Muestra y representatividad",
      challenge: "Analiza por qué una encuesta de un solo municipio puede no representar a todo un departamento.",
      keyIdea: "Una muestra debe representar a la población objetivo. Si se toma de un solo municipio, puede sesgar la estimación departamental.",
      dataTable: { headers: ["Elemento", "Lectura"], rows: [["Población objetivo", "Todo el departamento"], ["Muestra usada", "1.000 personas de un municipio"], ["Riesgo", "Sesgo de cobertura"]] },
      chips: [{ text: "Población: departamento completo", correct: true }, { text: "Muestra: un solo municipio", correct: true }, { text: "Riesgo de no representar diversidad", correct: true }, { text: "La muestra es mala porque tiene demasiadas personas", correct: false }],
      strategyQuestion: "¿Cuál es la falla metodológica?",
      strategyChoices: [{ text: "La muestra solo cubre un municipio y no todo el departamento.", correct: true }, { text: "Toda encuesta debe preguntarle a absolutamente todos.", correct: false }, { text: "1.000 llamadas siempre son suficientes sin importar de dónde salgan.", correct: false }],
      miniQuestion: "¿Qué debería mejorar la firma encuestadora?",
      miniChoices: [{ text: "Seleccionar una muestra distribuida en varios municipios.", correct: true }, { text: "Llamar únicamente al municipio más grande.", correct: false }, { text: "Eliminar preguntas de preferencia electoral.", correct: false }],
      teacherNote: "ICFES suele preguntar por la relación entre muestra, población e inferencia. La palabra clave aquí es representatividad."
    },
    11: {
      title: "Simulador interactivo · Área de un rectángulo dentro de una figura",
      challenge: "Identifica dimensiones faltantes y calcula el área de un trozo rectangular.",
      keyIdea: "El área de un rectángulo es base × altura. Si una medida no aparece directa, se obtiene por resta.",
      dataTable: { headers: ["Medida", "Valor"], rows: [["Altura total", "20 cm"], ["Parte descontada", "5 cm"], ["Altura del trozo 1", "20 - 5 = 15 cm"], ["Base del trozo 1", "15 cm"], ["Área", "15 × 15 = 225 cm²"]] },
      chips: [{ text: "Base del trozo 1: 15 cm", correct: true }, { text: "Altura del trozo 1: 15 cm", correct: true }, { text: "Área = base × altura", correct: true }, { text: "Multiplicar por las 8 personas", correct: false }],
      strategyQuestion: "¿Qué procedimiento resuelve el área?",
      strategyChoices: [{ text: "Restar para obtener la altura y multiplicar base por altura.", correct: true }, { text: "Dividir toda la torta en 8 partes iguales.", correct: false }, { text: "Sumar 60 y 20 sin mirar el trozo.", correct: false }],
      miniQuestion: "¿Cuál es la altura del trozo 1?",
      miniChoices: [{ text: "15 cm", correct: true }, { text: "20 cm", correct: false }, { text: "5 cm", correct: false }],
      teacherNote: "Antes de aplicar fórmulas, localiza exactamente la región preguntada. No siempre se pide el área total."
    },
    12: {
      title: "Simulador interactivo · Unidades antes de sumar",
      challenge: "Evalúa si una solución que suma pesos en unidades diferentes es válida.",
      keyIdea: "Las magnitudes solo se suman directamente cuando están en la misma unidad.",
      dataTable: { headers: ["Situación", "Cuidado matemático"], rows: [["Pesos en kg y toneladas", "No se suman directamente"], ["Antes de operar", "Convertir todo a kg o todo a toneladas"], ["Error frecuente", "Mezclar unidades"]] },
      chips: [{ text: "Revisar unidades", correct: true }, { text: "Convertir antes de sumar", correct: true }, { text: "Kilogramos y toneladas son unidades diferentes", correct: true }, { text: "Sumar directamente porque todos son pesos", correct: false }],
      strategyQuestion: "¿Por qué la solución es incorrecta?",
      strategyChoices: [{ text: "Porque mezcla unidades diferentes sin convertirlas.", correct: true }, { text: "Porque siempre se debe responder en toneladas.", correct: false }, { text: "Porque no se pueden sumar pesos en ningún caso.", correct: false }],
      miniQuestion: "¿Qué debes hacer antes de sumar 1 tonelada y 500 kg?",
      miniChoices: [{ text: "Convertir 1 tonelada a 1.000 kg o 500 kg a 0,5 t.", correct: true }, { text: "Sumar 1 + 500 directamente.", correct: false }, { text: "Restar las unidades.", correct: false }],
      teacherNote: "Las pruebas Saber evalúan coherencia de unidades: una operación numérica puede verse bien y aun así ser inválida."
    },
    13: {
      title: "Simulador interactivo · Área triangular y cuarto de círculo",
      challenge: "Detecta en qué paso de una solución se usó mal una fórmula de área.",
      keyIdea: "El área de un triángulo es base × altura ÷ 2; el área de un cuarto de círculo es πr² ÷ 4.",
      dataTable: { headers: ["Región", "Fórmula correcta"], rows: [["Triángulo", "4 × 3 ÷ 2 = 6 m²"], ["Cuarto de círculo", "π × 4² ÷ 4"], ["Error", "Omitir dividir entre 2 en el triángulo"]] },
      chips: [{ text: "Triángulo requiere dividir entre 2", correct: true }, { text: "Revisar el paso 2", correct: true }, { text: "Cuarto de círculo usa radio al cuadrado", correct: true }, { text: "Multiplicar 3 × 4 × 5", correct: false }],
      strategyQuestion: "¿Dónde está el error?",
      strategyChoices: [{ text: "En el paso 2: calcularon un triángulo como rectángulo.", correct: true }, { text: "En el paso 3: se debe usar perímetro, no área.", correct: false }, { text: "En el paso 1: no se puede calcular un rectángulo.", correct: false }],
      miniQuestion: "¿Cuál es el área correcta del triángulo de base 4 m y altura 3 m?",
      miniChoices: [{ text: "6 m²", correct: true }, { text: "12 m²", correct: false }, { text: "60 m²", correct: false }],
      teacherNote: "Cuando una pregunta pide corregir un procedimiento, revisa fórmula por fórmula y no solo el resultado final."
    },
    14: {
      title: "Simulador interactivo · Tabla, gráfica y precisión",
      challenge: "Determina qué afirmación es falsa sobre la información en tabla y gráfica.",
      keyIdea: "Una gráfica circular permite comparar proporciones, pero no siempre permite recuperar datos exactos de una tabla.",
      dataTable: { headers: ["Fuente", "Qué permite"], rows: [["Tabla", "Ver datos exactos"], ["Gráfica", "Comparar proporciones visualmente"], ["Cuidado", "La gráfica no siempre permite reconstruir la tabla exacta"]] },
      chips: [{ text: "La tabla da valores exactos", correct: true }, { text: "La gráfica permite comparar candidatos", correct: true }, { text: "De la gráfica no siempre salen datos exactos", correct: true }, { text: "La gráfica siempre reemplaza la tabla", correct: false }],
      strategyQuestion: "¿Qué afirmación debe rechazarse?",
      strategyChoices: [{ text: "Que con la gráfica se obtienen exactamente los datos de la tabla.", correct: true }, { text: "Que la gráfica permite reconocer el candidato con mayor intención.", correct: false }, { text: "Que la tabla puede alimentar la gráfica.", correct: false }],
      miniQuestion: "¿Cuál fuente es más adecuada para leer números exactos?",
      miniChoices: [{ text: "La tabla.", correct: true }, { text: "El color de la gráfica.", correct: false }, { text: "El título únicamente.", correct: false }],
      teacherNote: "Distinguir lectura exacta y lectura visual es clave en preguntas de representación de datos."
    },
    15: {
      title: "Simulador interactivo · Tendencia en una secuencia",
      challenge: "Identifica cómo cambia el ahorro al finalizar cada mes.",
      keyIdea: "La tendencia se analiza comparando diferencias consecutivas: si la diferencia es constante, hay patrón lineal.",
      dataTable: { headers: ["Mes", "Ahorro final"], rows: [["Enero", "$130.000"], ["Febrero", "$160.000"], ["Marzo", "$190.000"], ["Abril", "$220.000"], ["Cambio", "+$30.000 cada mes"]] },
      chips: [{ text: "Comparar meses consecutivos", correct: true }, { text: "160.000 - 130.000", correct: true }, { text: "Aumento constante", correct: true }, { text: "Mirar solo el primer valor", correct: false }],
      strategyQuestion: "¿Qué muestra la tendencia?",
      strategyChoices: [{ text: "Aumenta $30.000 cada mes.", correct: true }, { text: "Disminuye $30.000 cada mes.", correct: false }, { text: "Aumenta $100.000 cada mes.", correct: false }],
      miniQuestion: "¿Cuál es la diferencia entre $190.000 y $160.000?",
      miniChoices: [{ text: "$30.000", correct: true }, { text: "$100.000", correct: false }, { text: "$60.000", correct: false }],
      teacherNote: "Para tendencias, calcula diferencias entre datos consecutivos, no entre el primer y último valor únicamente."
    },
    16: {
      title: "Simulador interactivo · Promedio de piezas reemplazadas",
      challenge: "Calcula el promedio del número de piezas reemplazadas en tres vehículos.",
      keyIdea: "Promedio = suma de los datos ÷ cantidad de datos.",
      dataTable: { headers: ["Vehículo", "Piezas"], rows: [["1", "6"], ["2", "5"], ["3", "10"], ["Suma", "21"], ["Promedio", "21 ÷ 3 = 7"]] },
      chips: [{ text: "Sumar 6 + 5 + 10", correct: true }, { text: "Dividir entre 3 vehículos", correct: true }, { text: "Promedio aritmético", correct: true }, { text: "Elegir el valor mayor", correct: false }],
      strategyQuestion: "¿Cómo se calcula el promedio?",
      strategyChoices: [{ text: "Sumando los tres valores y dividiendo entre tres.", correct: true }, { text: "Tomando el número máximo de piezas.", correct: false }, { text: "Restando el menor del mayor.", correct: false }],
      miniQuestion: "¿Cuánto es 21 ÷ 3?",
      miniChoices: [{ text: "7", correct: true }, { text: "6", correct: false }, { text: "10", correct: false }],
      teacherNote: "Aunque el contexto cambie, el promedio siempre mantiene la misma estructura: sumar y dividir por cantidad de datos."
    },
    17: {
      title: "Simulador interactivo · Sumar regiones de un conjunto",
      challenge: "Encuentra todas las regiones que pertenecen al conjunto bicicleta.",
      keyIdea: "En diagramas de conjuntos, el total de un medio se obtiene sumando todas las regiones dentro de su círculo, incluidas intersecciones.",
      dataTable: { headers: ["Región con bicicleta", "Valor"], rows: [["Solo bicicleta", "50"], ["Carro y bicicleta", "20"], ["Bicicleta y transporte público", "25"], ["Los tres medios", "5"]] },
      chips: [{ text: "50: solo bicicleta", correct: true }, { text: "20: carro y bicicleta", correct: true }, { text: "25: bicicleta y transporte público", correct: true }, { text: "5: los tres medios", correct: true }, { text: "35: solo carro", correct: false }],
      strategyQuestion: "¿Qué datos se suman?",
      strategyChoices: [{ text: "Todos los valores ubicados dentro del círculo de bicicleta.", correct: true }, { text: "Solo quienes usan únicamente bicicleta.", correct: false }, { text: "Todos los valores del diagrama completo.", correct: false }],
      miniQuestion: "¿El valor de la intersección de los tres medios se suma al total de bicicleta?",
      miniChoices: [{ text: "Sí, porque también usan bicicleta.", correct: true }, { text: "No, porque usan más de un medio.", correct: false }, { text: "No, porque está en el centro.", correct: false }],
      teacherNote: "Toda intersección que toca el conjunto preguntado debe contarse en ese total."
    },
    18: {
      title: "Simulador interactivo · Crecimiento por duplicación",
      challenge: "Calcula cuántas duplicaciones ocurren entre 2010 y 2016.",
      keyIdea: "Si algo se duplica cada 2 años, en 6 años ocurren 3 duplicaciones.",
      dataTable: { headers: ["Año", "Transistores"], rows: [["2010", "10.000"], ["2012", "20.000"], ["2014", "40.000"], ["2016", "80.000"]] },
      chips: [{ text: "Del 2010 al 2016 hay 6 años", correct: true }, { text: "Se duplica cada 2 años", correct: true }, { text: "Hay 3 duplicaciones", correct: true }, { text: "Se suma 10.000 cada año", correct: false }],
      strategyQuestion: "¿Cuál es la estructura de crecimiento?",
      strategyChoices: [{ text: "Multiplicar por 2 tres veces.", correct: true }, { text: "Sumar 2 tres veces al dato inicial.", correct: false }, { text: "Dividir entre 2 cada año.", correct: false }],
      miniQuestion: "Después de 3 duplicaciones, ¿cuál es el factor total?",
      miniChoices: [{ text: "2 × 2 × 2 = 8", correct: true }, { text: "2 + 2 + 2 = 6", correct: false }, { text: "3 × 2 = 6", correct: false }],
      teacherNote: "La palabra 'duplicar' indica multiplicación, no suma. Reconocer eso cambia completamente el modelo."
    },
    19: {
      title: "Simulador interactivo · Procedimientos equivalentes y redundancia",
      challenge: "Identifica qué paso repite una operación ya realizada de otra forma.",
      keyIdea: "Un paso es redundante si no aporta información nueva porque equivale a un cálculo anterior.",
      dataTable: { headers: ["Relación", "Lectura"], rows: [["Paso 2", "Área de un triángulo"], ["Paso 3", "Multiplica por 4 el paso 2"], ["Paso 4", "Suma cuatro veces el paso 2"], ["Conclusión", "Paso 4 repite el paso 3"]] },
      chips: [{ text: "Multiplicar por 4", correct: true }, { text: "Sumar cuatro veces", correct: true }, { text: "Procedimientos equivalentes", correct: true }, { text: "Cambiar la figura completa", correct: false }],
      strategyQuestion: "¿Qué paso sobra?",
      strategyChoices: [{ text: "El paso 4, porque repite lo obtenido al multiplicar por 4.", correct: true }, { text: "El paso 1, porque todo procedimiento de área sobra.", correct: false }, { text: "El paso 2, porque nunca se usan triángulos.", correct: false }],
      miniQuestion: "¿Qué es equivalente a sumar A + A + A + A?",
      miniChoices: [{ text: "4A", correct: true }, { text: "A/4", correct: false }, { text: "A²", correct: false }],
      teacherNote: "ICFES no solo pregunta por resultados; también evalúa si reconoces procedimientos innecesarios o equivalentes."
    },
    20: {
      title: "Simulador interactivo · Factorización con término cuadrático",
      challenge: "Revisa si una factorización conservó correctamente el tiempo al cuadrado.",
      keyIdea: "Cuando t² se factoriza por t, todavía queda otro factor t: t² = t · t.",
      dataTable: { headers: ["Expresión", "Cuidado"], rows: [["10(15)", "Tiene un factor 15"], ["1/2 · 3 · 15²", "Al factorizar 15, queda otro 15"], ["Error", "Omitir el segundo 15"]] },
      chips: [{ text: "El tiempo está al cuadrado", correct: true }, { text: "Al factorizar 15 queda otro 15", correct: true }, { text: "La afirmación omite un factor", correct: true }, { text: "El exponente se cancela solo", correct: false }],
      strategyQuestion: "¿Por qué la afirmación es falsa?",
      strategyChoices: [{ text: "Porque al factorizar se perdió un factor 15 del término cuadrático.", correct: true }, { text: "Porque no se puede usar aceleración en ningún problema.", correct: false }, { text: "Porque se debe eliminar el 1/2.", correct: false }],
      miniQuestion: "Si factorizas t en t², ¿qué queda?",
      miniChoices: [{ text: "t", correct: true }, { text: "1", correct: false }, { text: "0", correct: false }],
      teacherNote: "En álgebra aplicada, verifica que la transformación sea equivalente término a término."
    },
    21: {
      title: "Simulador interactivo · Conversión de unidades y velocidad",
      challenge: "Detecta cuál procedimiento NO calcula el tiempo de descarga.",
      keyIdea: "Tiempo = tamaño del archivo ÷ velocidad. Antes se debe convertir MB a KB.",
      dataTable: { headers: ["Dato", "Uso"], rows: [["12,6 MB", "Tamaño"], ["1 MB = 1.024 KB", "Conversión"], ["300 KB/s", "Velocidad"], ["Tiempo", "(12,6 × 1.024) ÷ 300"]] },
      chips: [{ text: "Convertir MB a KB", correct: true }, { text: "Dividir tamaño entre velocidad", correct: true }, { text: "Velocidad: 300 KB/s", correct: true }, { text: "Multiplicar velocidad por 1.024 y dividir entre tamaño", correct: false }],
      strategyQuestion: "¿Qué forma tiene el procedimiento correcto?",
      strategyChoices: [{ text: "(12,6 × 1.024) ÷ 300", correct: true }, { text: "(1.024 × 300) ÷ 12,6", correct: false }, { text: "300 ÷ (12,6 × 1.024)", correct: false }],
      miniQuestion: "¿Qué representa el numerador en tiempo = tamaño ÷ velocidad?",
      miniChoices: [{ text: "El tamaño del archivo convertido a KB.", correct: true }, { text: "La velocidad multiplicada por la conversión.", correct: false }, { text: "La cantidad de segundos ya conocida.", correct: false }],
      teacherNote: "Una forma rápida de detectar el error es preguntar: ¿estoy dividiendo tamaño entre velocidad o velocidad entre tamaño?"
    },
    22: {
      title: "Simulador interactivo · Semejanza de triángulos en una rampa",
      challenge: "Usa proporcionalidad para calcular la altura de una columna de refuerzo.",
      keyIdea: "Si los triángulos son semejantes, las razones entre bases y alturas correspondientes se conservan.",
      dataTable: { headers: ["Medida", "Valor"], rows: [["Base total", "4 m"], ["Base pequeña", "2 m"], ["Altura total", "3 m"], ["Razón", "4 ÷ 2 = 2"], ["Altura columna", "3 ÷ 2 = 1,5 m"]] },
      chips: [{ text: "Triángulos semejantes", correct: true }, { text: "Comparar 4 m con 2 m", correct: true }, { text: "Dividir 3 m entre 2", correct: true }, { text: "Multiplicar 3 por 4 y sumar 2", correct: false }],
      strategyQuestion: "¿Qué procedimiento permite hallar h?",
      strategyChoices: [{ text: "Calcular la razón 4 ÷ 2 y dividir 3 entre esa razón.", correct: true }, { text: "Dividir 2 entre 4 y luego dividir 3 entre 0,5.", correct: false }, { text: "Multiplicar 3 por 2 sin razón de semejanza.", correct: false }],
      miniQuestion: "Si la base pequeña es la mitad de la base total, ¿qué pasa con la altura correspondiente?",
      miniChoices: [{ text: "También es la mitad de la altura total.", correct: true }, { text: "Es el doble de la altura total.", correct: false }, { text: "No se relaciona con la altura.", correct: false }],
      teacherNote: "En semejanza, observa qué magnitudes corresponden. No todas las divisiones posibles representan una razón útil."
    },
    23: {
      title: "Simulador interactivo · Coordenadas polares y distancia",
      challenge: "Ordena aviones de acuerdo con su distancia a la torre de control.",
      keyIdea: "En coordenadas polares (r, θ), el valor r indica distancia al polo; θ solo indica dirección.",
      dataTable: { headers: ["Avión", "Distancia r"], rows: [["W", "20 km"], ["V", "30 km"], ["Y", "40 km"], ["X", "60 km"]] },
      chips: [{ text: "Leer el valor r", correct: true }, { text: "Ordenar r de menor a mayor", correct: true }, { text: "Ignorar θ para distancia", correct: true }, { text: "Ordenar por el ángulo θ", correct: false }],
      strategyQuestion: "¿Qué determina cercanía a la torre?",
      strategyChoices: [{ text: "El radio r.", correct: true }, { text: "El ángulo θ únicamente.", correct: false }, { text: "El nombre del avión.", correct: false }],
      miniQuestion: "¿Cuál avión está más cerca si W tiene r=20 y X tiene r=60?",
      miniChoices: [{ text: "W", correct: true }, { text: "X", correct: false }, { text: "Depende del ángulo únicamente", correct: false }],
      teacherNote: "La notación polar separa distancia y dirección: para cercanía, mira r."
    },
    24: {
      title: "Simulador interactivo · Construcción de una operación con desplazamientos",
      challenge: "Traduce una ruta verbal a una expresión con sumas y restas.",
      keyIdea: "Avanzar suma distancia; regresar resta distancia. Las palabras 'doble' y 'mitad' transforman el valor anterior.",
      dataTable: { headers: ["Tramo", "Operación"], rows: [["Primer pedido", "+3"], ["Segundo: doble", "+6"], ["Tercero: mitad de 6", "+3"], ["Regreso", "-10"], ["Hasta la casa", "+1"], ["Expresión", "3 + 6 + 3 - 10 + 1"]] },
      chips: [{ text: "+3 primer avance", correct: true }, { text: "+6 doble de 3", correct: true }, { text: "+3 mitad de 6", correct: true }, { text: "-10 regreso", correct: true }, { text: "+1 hasta la casa", correct: true }, { text: "Sumar 10 porque se regresó", correct: false }],
      strategyQuestion: "¿Cómo se representa regresar 10 cuadras?",
      strategyChoices: [{ text: "Con -10, porque reduce el avance neto hacia la casa.", correct: true }, { text: "Con +10, porque también caminó 10 cuadras.", correct: false }, { text: "No se incluye en la operación.", correct: false }],
      miniQuestion: "Si el segundo tramo fue 6, ¿cuánto es la mitad para el tercer tramo?",
      miniChoices: [{ text: "3", correct: true }, { text: "6", correct: false }, { text: "10", correct: false }],
      teacherNote: "La clave es traducir el contexto a signos: avanzar y retroceder no tienen el mismo efecto en la distancia final."
    },
    25: {
      title: "Simulador interactivo · Orden de números decimales negativos",
      challenge: "Ordena presiones negativas de menor a mayor.",
      keyIdea: "Con números negativos, el menor es el que está más a la izquierda en la recta numérica; por eso -7,62 es menor que -7,6.",
      dataTable: { headers: ["Paciente", "Presión"], rows: [["Mariana", "-7,62"], ["Santiago", "-7,60"], ["Orlando", "-7,53"], ["Ximena", "-7,09"], ["Orden", "Mariana, Santiago, Orlando, Ximena"]] },
      chips: [{ text: "Todos son negativos", correct: true }, { text: "Menor = más a la izquierda", correct: true }, { text: "Comparar cifras decimales", correct: true }, { text: "El número con menor valor absoluto siempre es menor", correct: false }],
      strategyQuestion: "¿Cuál presión es la menor?",
      strategyChoices: [{ text: "-7,62", correct: true }, { text: "-7,09", correct: false }, { text: "-7,53", correct: false }],
      miniQuestion: "¿Cuál está más a la izquierda en la recta numérica?",
      miniChoices: [{ text: "-7,62", correct: true }, { text: "-7,6 equivale a 7,6 positivo", correct: false }, { text: "-7,09", correct: false }],
      teacherNote: "En decimales negativos, no basta mirar cuál parece 'más pequeño' en valor absoluto: hay que pensar en la recta numérica."
    }
  };
  return configs[number] || null;
}

function renderS1MathGuidedSimulator(question, config) {
  const dataTable = config.dataTable ? `
    <div class="sim-data-table guided-data-table" role="table" aria-label="Datos clave del simulador">
      <div role="row">${config.dataTable.headers.map(header => `<strong>${escapeHtml(header)}</strong>`).join("")}</div>
      ${config.dataTable.rows.map(row => `<div role="row">${row.map(cell => `<span>${escapeHtml(cell)}</span>`).join("")}</div>`).join("")}
    </div>
  ` : "";
  const chips = (config.chips || []).map((chip, index) => `
    <button class="guided-chip" type="button" data-index="${index}" data-correct="${chip.correct ? "1" : "0"}">${escapeHtml(chip.text)}</button>
  `).join("");
  const strategies = (config.strategyChoices || []).map((choice, index) => `
    <button class="guided-choice" type="button" data-group="strategy" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");
  const miniChoices = (config.miniChoices || []).map((choice, index) => `
    <button class="guided-choice" type="button" data-group="mini" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");
  const options = (question.options || []).map(option => `
    <button class="sim-answer guided-final-answer" type="button" data-answer="${escapeHtml(option.letter)}">
      <strong>${escapeHtml(option.letter)}</strong><span>${escapeHtml(option.text)}</span>
    </button>
  `).join("");
  return `
    <article class="notebook-card large notebook-simulator-card guided-s1-math-sim" data-question="${Number(question.number)}">
      <p class="eyebrow">🧩 Simulador · Matemáticas Saber 11</p>
      <h3>${escapeHtml(config.title || `Simulador interactivo · Pregunta ${question.number}`)}</h3>
      <p>${escapeHtml(config.challenge || "Practica el razonamiento necesario para resolver la pregunta.")}</p>

      <div class="sim-intro-grid">
        <section class="sim-mini-board">
          <h4>Reto ICFES</h4>
          <p>${escapeHtml(question.prompt || config.challenge || "Analiza la situación y justifica una opción.")}</p>
          ${dataTable}
        </section>
        <section class="sim-mini-board sim-concept">
          <h4>Idea matemática clave</h4>
          <div class="average-formula guided-concept-box">${escapeHtml(config.keyIdea || "Identifica datos, operación, representación y condición del enunciado.")}</div>
          <p>Trabaja los pasos antes de elegir la opción final. El objetivo es aprender el método, no memorizar la respuesta.</p>
        </section>
      </div>

      <div class="sim-steps" aria-label="Simulador guiado de la pregunta ${escapeHtml(question.number)}">
        <section class="sim-step active" data-guided-step="1">
          <div class="sim-step-head"><span>Paso 1</span><h4>Detecta las pistas útiles</h4></div>
          <p>Selecciona solo las pistas que realmente ayudan a resolver la pregunta.</p>
          <div class="guided-chip-grid" id="guidedChipGrid">${chips}</div>
          <button class="secondary-btn" type="button" id="checkGuidedChipsBtn">Verificar pistas</button>
          <p id="guidedChipsFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-guided-step="2">
          <div class="sim-step-head"><span>Paso 2</span><h4>Elige la estrategia</h4></div>
          <p>${escapeHtml(config.strategyQuestion || "¿Qué procedimiento conviene aplicar?")}</p>
          <div class="guided-choice-grid" id="guidedStrategyGrid">${strategies}</div>
          <p id="guidedStrategyFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-guided-step="3">
          <div class="sim-step-head"><span>Paso 3</span><h4>Entrenamiento breve</h4></div>
          <p>${escapeHtml(config.miniQuestion || "Resuelve este micro-reto antes de elegir la opción.")}</p>
          <div class="guided-choice-grid" id="guidedMiniGrid">${miniChoices}</div>
          <p id="guidedMiniFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-guided-step="4">
          <div class="sim-step-head"><span>Paso 4</span><h4>Decide como en la prueba</h4></div>
          <p>Ahora selecciona la opción que mejor responde la pregunta. Si te equivocas, el simulador te muestra qué debes revisar.</p>
          <div class="sim-answer-grid guided-answer-grid" id="guidedFinalAnswerGrid">${options}</div>
          <div id="guidedFinalFeedback" class="sim-final-feedback" aria-live="polite"></div>
        </section>
      </div>

      <div class="sim-teacher-note"><strong>Nota didáctica:</strong> ${escapeHtml(config.teacherNote || question.explanation || "Usa los datos del enunciado y verifica la coherencia de la opción elegida.")}</div>
    </article>
  `;
}

function initS1MathGuidedSimulator(question) {
  const config = getS1MathSimulatorConfig(Number(question.number));
  if (!config) return;

  const chipGrid = document.getElementById("guidedChipGrid");
  const checkChipsBtn = document.getElementById("checkGuidedChipsBtn");
  const chipsFeedback = document.getElementById("guidedChipsFeedback");
  const strategyGrid = document.getElementById("guidedStrategyGrid");
  const strategyFeedback = document.getElementById("guidedStrategyFeedback");
  const miniGrid = document.getElementById("guidedMiniGrid");
  const miniFeedback = document.getElementById("guidedMiniFeedback");
  const finalGrid = document.getElementById("guidedFinalAnswerGrid");
  const finalFeedback = document.getElementById("guidedFinalFeedback");

  if (chipGrid) {
    chipGrid.addEventListener("click", event => {
      const button = event.target.closest(".guided-chip");
      if (!button) return;
      button.classList.toggle("selected");
      if (chipsFeedback) {
        chipsFeedback.textContent = "Pistas seleccionadas. Ahora verifica si todas son relevantes.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  if (checkChipsBtn) {
    checkChipsBtn.addEventListener("click", () => {
      const buttons = Array.from(document.querySelectorAll(".guided-chip"));
      const wrongSelected = buttons.some(button => button.classList.contains("selected") && button.dataset.correct !== "1");
      const missingCorrect = buttons.some(button => !button.classList.contains("selected") && button.dataset.correct === "1");
      buttons.forEach(button => {
        button.classList.remove("correct", "wrong");
        if (button.classList.contains("selected") && button.dataset.correct === "1") button.classList.add("correct");
        if (button.classList.contains("selected") && button.dataset.correct !== "1") button.classList.add("wrong");
      });
      if (!wrongSelected && !missingCorrect) {
        chipsFeedback.innerHTML = "<strong>Muy bien.</strong> Identificaste las pistas necesarias para modelar la pregunta.";
        chipsFeedback.className = "sim-feedback ok";
      } else if (wrongSelected) {
        chipsFeedback.innerHTML = "<strong>Revisa.</strong> Seleccionaste una pista que no ayuda a resolver la pregunta. En Saber 11 debes separar datos útiles de distractores.";
        chipsFeedback.className = "sim-feedback error";
      } else {
        chipsFeedback.innerHTML = "<strong>Vas bien.</strong> Falta seleccionar una pista relevante del enunciado.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  function bindChoiceGrid(grid, feedback, correctMessage, errorMessage) {
    if (!grid) return;
    grid.addEventListener("click", event => {
      const button = event.target.closest(".guided-choice");
      if (!button) return;
      grid.querySelectorAll(".guided-choice").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.correct === "1") {
        button.classList.add("correct");
        if (feedback) {
          feedback.innerHTML = `<strong>Correcto.</strong> ${escapeHtml(correctMessage)}`;
          feedback.className = "sim-feedback ok";
        }
      } else {
        button.classList.add("wrong");
        if (feedback) {
          feedback.innerHTML = `<strong>Revisa.</strong> ${escapeHtml(errorMessage)}`;
          feedback.className = "sim-feedback error";
        }
      }
    });
  }

  bindChoiceGrid(strategyGrid, strategyFeedback, "La estrategia elegida se conecta con la información clave de la pregunta.", "La estrategia no responde directamente a lo que pregunta el enunciado.");
  bindChoiceGrid(miniGrid, miniFeedback, "El micro-reto confirma el procedimiento que debes aplicar.", "Vuelve a la idea matemática clave y revisa los datos antes de continuar.");

  if (finalGrid) {
    finalGrid.addEventListener("click", event => {
      const button = event.target.closest(".guided-final-answer");
      if (!button) return;
      finalGrid.querySelectorAll(".guided-final-answer").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.answer === question.correctAnswer) {
        button.classList.add("correct");
        finalFeedback.innerHTML = `<strong>Correcto.</strong> La opción ${escapeHtml(question.correctAnswer)} es la adecuada. ${escapeHtml(question.explanation || "La elección coincide con el procedimiento trabajado en el simulador.")}`;
        finalFeedback.className = "sim-final-feedback ok";
      } else {
        button.classList.add("wrong");
        finalFeedback.innerHTML = `<strong>Revisa tu elección.</strong> La opción marcada no coincide con el razonamiento. Relee el paso 2 y el entrenamiento breve antes de volver a intentarlo.`;
        finalFeedback.className = "sim-final-feedback error";
      }
    });
  }
}


/* ==========================================================
   Simuladores dinámicos por pregunta · Sección 2 Matemáticas
   Preguntas 29 a 50
   ========================================================== */

const S2_MATH_SIMULATOR_CONFIGS = {
  "29": {
    "title": "Simulador interactivo · Clasificación de polígonos por número de lados",
    "challenge": "Entrena cómo identificar el grupo de polígonos con más lados y, dentro de ese grupo, escoger el de menor número de lados.",
    "keyIdea": "Cuando una pregunta pide comparar figuras, primero cuenta lados, luego forma el grupo indicado y solo después compara dentro de ese grupo.",
    "dataTable": {
      "headers": [
        "Paso",
        "Acción"
      ],
      "rows": [
        [
          "1",
          "Contar lados de cada polígono"
        ],
        [
          "2",
          "Ordenar de mayor a menor número de lados"
        ],
        [
          "3",
          "Tomar los tres de mayor número de lados"
        ],
        [
          "4",
          "Elegir el menor dentro de ese grupo"
        ]
      ]
    },
    "chips": [
      {
        "text": "Contar lados de todos los polígonos",
        "correct": true
      },
      {
        "text": "Formar el grupo X con los tres de mayor número de lados",
        "correct": true
      },
      {
        "text": "Comparar solo los polígonos del grupo X",
        "correct": true
      },
      {
        "text": "Elegir el polígono más bonito",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Cuál es la estrategia correcta?",
    "strategyChoices": [
      {
        "text": "Contar lados, formar el grupo X y elegir el de menos lados dentro de ese grupo.",
        "correct": true
      },
      {
        "text": "Elegir directamente el polígono con menos lados de toda la figura.",
        "correct": false
      },
      {
        "text": "Ordenar las figuras por tamaño visual, no por lados.",
        "correct": false
      }
    ],
    "miniQuestion": "Si el grupo X tiene polígonos de 9, 8 y 7 lados, ¿cuál tiene menor número de lados dentro de X?",
    "miniChoices": [
      {
        "text": "El de 7 lados",
        "correct": true
      },
      {
        "text": "El de 9 lados",
        "correct": false
      },
      {
        "text": "El de mayor tamaño",
        "correct": false
      }
    ],
    "teacherNote": "En Saber 11 suele haber una doble condición: primero clasificar y luego comparar. No respondas antes de formar el grupo solicitado."
  },
  "30": {
    "title": "Simulador interactivo · Lectura de tablas y mínimo valor",
    "challenge": "Aprende a localizar el precio menor en una tabla y asociarlo con la marca correspondiente.",
    "keyIdea": "Para responder preguntas de tablas, no basta mirar nombres: ubica la columna relevante, compara los valores y devuelve el dato asociado.",
    "dataTable": {
      "headers": [
        "Acción",
        "Qué revisar"
      ],
      "rows": [
        [
          "Columna clave",
          "Precio"
        ],
        [
          "Comparación",
          "Buscar el menor valor"
        ],
        [
          "Respuesta",
          "Marca asociada al menor precio"
        ],
        [
          "Menor precio",
          "$1.200.000 → SoiBeep"
        ]
      ]
    },
    "chips": [
      {
        "text": "Comparar todos los precios",
        "correct": true
      },
      {
        "text": "Identificar el menor valor",
        "correct": true
      },
      {
        "text": "Relacionar precio con marca",
        "correct": true
      },
      {
        "text": "Escoger la marca más conocida",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Qué dato decide la respuesta?",
    "strategyChoices": [
      {
        "text": "El menor precio de la tabla y la marca que aparece en esa fila.",
        "correct": true
      },
      {
        "text": "El primer teléfono que aparece en la tabla.",
        "correct": false
      },
      {
        "text": "La marca con nombre más corto.",
        "correct": false
      }
    ],
    "miniQuestion": "Si en una tabla los precios son 1.500.000, 1.200.000 y 1.800.000, ¿cuál es el menor?",
    "miniChoices": [
      {
        "text": "1.200.000",
        "correct": true
      },
      {
        "text": "1.800.000",
        "correct": false
      },
      {
        "text": "1.500.000",
        "correct": false
      }
    ],
    "teacherNote": "La habilidad evaluada es interpretación de información: localizar el valor extremo y asociarlo correctamente."
  },
  "31": {
    "title": "Simulador interactivo · Placas y principio multiplicativo",
    "challenge": "Construye la expresión que cuenta placas de dos tipos diferentes.",
    "keyIdea": "Si las posiciones se llenan de forma independiente y se permite repetir, se multiplican las opciones de cada posición. Si hay dos tipos de placas, se suman los totales de cada tipo.",
    "dataTable": {
      "headers": [
        "Tipo de placa",
        "Conteo"
      ],
      "rows": [
        [
          "Tipo 1",
          "26³ × 10³"
        ],
        [
          "Tipo 2",
          "1 × 10⁴ porque la T es fija"
        ],
        [
          "Total",
          "26³ × 10³ + 1 × 10⁴"
        ]
      ]
    },
    "chips": [
      {
        "text": "Tres letras con 26 opciones cada una",
        "correct": true
      },
      {
        "text": "Tres dígitos con 10 opciones cada uno",
        "correct": true
      },
      {
        "text": "En tipo 2 la letra T es fija",
        "correct": true
      },
      {
        "text": "La T puede ser cualquiera de las 26 letras",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Qué expresión cuenta correctamente los dos tipos?",
    "strategyChoices": [
      {
        "text": "26³ × 10³ + 1 × 10⁴",
        "correct": true
      },
      {
        "text": "26³ × 10³ + 26 × 10⁴",
        "correct": false
      },
      {
        "text": "(26³ + 1) × (10³ + 10⁴)",
        "correct": false
      }
    ],
    "miniQuestion": "Si una placa tiene 2 letras y 2 dígitos, con repetición, ¿cómo se cuenta?",
    "miniChoices": [
      {
        "text": "26² × 10²",
        "correct": true
      },
      {
        "text": "26 + 10",
        "correct": false
      },
      {
        "text": "2 × 2",
        "correct": false
      }
    ],
    "teacherNote": "Diferencia muy bien entre posición variable y posición fija. Una letra fija no aporta 26 posibilidades, aporta 1."
  },
  "32": {
    "title": "Simulador interactivo · Promociones y división entera",
    "challenge": "Compara dos supermercados para decidir dónde se compran más paquetes con $5.000.",
    "keyIdea": "En compras reales se cuentan paquetes completos. Además, las promociones pueden agregar unidades extra después de pagar cierta cantidad.",
    "dataTable": {
      "headers": [
        "Supermercado",
        "Resultado"
      ],
      "rows": [
        [
          "1",
          "Paga 5 de $1.000 y recibe 1 extra por la promoción → 6"
        ],
        [
          "2",
          "$5.000 ÷ $850 = 5 paquetes completos"
        ],
        [
          "Comparación",
          "6 > 5, gana supermercado 1"
        ]
      ]
    },
    "chips": [
      {
        "text": "En el supermercado 1 se pagan 5 paquetes",
        "correct": true
      },
      {
        "text": "La promoción da 1 paquete adicional",
        "correct": true
      },
      {
        "text": "En el supermercado 2 solo cuentan paquetes completos",
        "correct": true
      },
      {
        "text": "5.000 ÷ 850 permite comprar 6 completos",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Qué comparación es correcta?",
    "strategyChoices": [
      {
        "text": "Supermercado 1: 6 paquetes; supermercado 2: 5 paquetes.",
        "correct": true
      },
      {
        "text": "Supermercado 1: 5 paquetes; supermercado 2: 6 paquetes.",
        "correct": false
      },
      {
        "text": "Ambos supermercados dan exactamente 6 paquetes.",
        "correct": false
      }
    ],
    "miniQuestion": "Si pagas 4 paquetes y la promoción dice lleve 5 por precio de 4, ¿cuántos recibes?",
    "miniChoices": [
      {
        "text": "5",
        "correct": true
      },
      {
        "text": "4",
        "correct": false
      },
      {
        "text": "6",
        "correct": false
      }
    ],
    "teacherNote": "Las promociones se aplican después de verificar cuántos productos se pueden pagar. En divisiones de dinero, usa parte entera si no alcanza para otro paquete."
  },
  "33": {
    "title": "Simulador interactivo · Proporcionalidad directa en movimiento",
    "challenge": "Determina la distancia en el minuto 4 y el tipo de proporcionalidad entre tiempo y distancia.",
    "keyIdea": "Si por cada minuto la distancia aumenta la misma cantidad, la relación tiempo-distancia es directa.",
    "dataTable": {
      "headers": [
        "Minuto",
        "Distancia"
      ],
      "rows": [
        [
          "1",
          "3 km"
        ],
        [
          "2",
          "6 km"
        ],
        [
          "3",
          "9 km"
        ],
        [
          "4",
          "12 km"
        ],
        [
          "Relación",
          "Proporcionalidad directa"
        ]
      ]
    },
    "chips": [
      {
        "text": "La distancia aumenta 3 km por minuto",
        "correct": true
      },
      {
        "text": "En 4 minutos: 4 × 3",
        "correct": true
      },
      {
        "text": "Al aumentar el tiempo aumenta la distancia",
        "correct": true
      },
      {
        "text": "La proporcionalidad es inversa",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Qué modelo describe la situación?",
    "strategyChoices": [
      {
        "text": "d = 3t, por tanto en t=4 la distancia es 12.",
        "correct": true
      },
      {
        "text": "d = 3/t, por tanto es proporcionalidad inversa.",
        "correct": false
      },
      {
        "text": "d = t + 12, porque se suma 12 siempre.",
        "correct": false
      }
    ],
    "miniQuestion": "Si se recorren 3 km por minuto, ¿cuánto se recorre en 4 minutos?",
    "miniChoices": [
      {
        "text": "12 km",
        "correct": true
      },
      {
        "text": "16 km",
        "correct": false
      },
      {
        "text": "7 km",
        "correct": false
      }
    ],
    "teacherNote": "La proporcionalidad directa conserva una razón constante: distancia ÷ tiempo = rapidez."
  },
  "34": {
    "title": "Simulador interactivo · Verificación de expresiones algebraicas",
    "challenge": "Comprueba si una expresión representa todos los datos de una tabla.",
    "keyIdea": "Para validar una fórmula, reemplaza valores de entrada de la tabla y compara los resultados con los datos reales.",
    "dataTable": {
      "headers": [
        "Prueba",
        "Resultado"
      ],
      "rows": [
        [
          "Edad = 1",
          "67 − 6 = 61"
        ],
        [
          "Tabla",
          "Para 1 mes aparece 73 cm"
        ],
        [
          "Conclusión",
          "La expresión no representa la tabla"
        ]
      ]
    },
    "chips": [
      {
        "text": "Reemplazar edad = 1 en la expresión",
        "correct": true
      },
      {
        "text": "Comparar con la estatura de la tabla",
        "correct": true
      },
      {
        "text": "Un solo contraejemplo basta para rechazar la expresión",
        "correct": true
      },
      {
        "text": "Aceptar la expresión porque tiene una variable",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Cómo se decide si la expresión sirve?",
    "strategyChoices": [
      {
        "text": "Sustituyendo valores de la tabla y revisando si coinciden.",
        "correct": true
      },
      {
        "text": "Mirando únicamente si la expresión tiene una resta.",
        "correct": false
      },
      {
        "text": "Aceptándola porque fue propuesta por Sofía.",
        "correct": false
      }
    ],
    "miniQuestion": "Si para x=1 una fórmula da 61 pero la tabla dice 73, ¿qué concluyes?",
    "miniChoices": [
      {
        "text": "La fórmula no representa esa tabla.",
        "correct": true
      },
      {
        "text": "La fórmula es correcta siempre.",
        "correct": false
      },
      {
        "text": "No se puede comparar fórmula y tabla.",
        "correct": false
      }
    ],
    "teacherNote": "Una fórmula que modela una tabla debe coincidir con todos los pares de datos, no solo parecer razonable."
  },
  "35": {
    "title": "Simulador interactivo · Probabilidad y casos posibles",
    "challenge": "Identifica qué cantidad hace falta para calcular la probabilidad de ganar.",
    "keyIdea": "Probabilidad = casos favorables ÷ casos posibles. Si se extraen 3 bolas de 9, los casos posibles son formas de escoger 3 entre 9.",
    "dataTable": {
      "headers": [
        "Elemento",
        "Interpretación"
      ],
      "rows": [
        [
          "Experimento",
          "Sacar 3 bolas"
        ],
        [
          "Total disponible",
          "9 bolas"
        ],
        [
          "Casos posibles",
          "Escoger 3 de 9"
        ],
        [
          "Casos favorables",
          "Al menos 2 azules"
        ]
      ]
    },
    "chips": [
      {
        "text": "Se sacan 3 bolas",
        "correct": true
      },
      {
        "text": "Hay 9 bolas en total",
        "correct": true
      },
      {
        "text": "Se necesitan casos posibles",
        "correct": true
      },
      {
        "text": "Se deben escoger 6 bolas",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Qué número se debe calcular también?",
    "strategyChoices": [
      {
        "text": "Las formas de escoger 3 bolas de un conjunto de 9.",
        "correct": true
      },
      {
        "text": "Las formas de escoger 6 bolas de un conjunto de 9.",
        "correct": false
      },
      {
        "text": "Las formas de escoger 3 bolas de un conjunto de 6.",
        "correct": false
      }
    ],
    "miniQuestion": "Si un experimento consiste en escoger 2 objetos de 8, ¿qué representa los casos posibles?",
    "miniChoices": [
      {
        "text": "Formas de escoger 2 entre 8",
        "correct": true
      },
      {
        "text": "Formas de escoger 8 entre 2",
        "correct": false
      },
      {
        "text": "Solo los casos ganadores",
        "correct": false
      }
    ],
    "teacherNote": "Antes de calcular favoritos, identifica el universo de resultados posibles del experimento."
  },
  "36": {
    "title": "Simulador interactivo · Promedio con dato faltante",
    "challenge": "Calcula cuántos libros debe leer un quinto estudiante para alcanzar un promedio deseado.",
    "keyIdea": "Si conoces el promedio deseado y la cantidad de datos, primero calcula el total necesario: total = promedio × cantidad.",
    "dataTable": {
      "headers": [
        "Paso",
        "Cálculo"
      ],
      "rows": [
        [
          "Total necesario",
          "5 × 6 = 30"
        ],
        [
          "Suma de los cuatro",
          "3 + 5 + 4 + 8 = 20"
        ],
        [
          "Dato faltante",
          "30 − 20 = 10"
        ]
      ]
    },
    "chips": [
      {
        "text": "Multiplicar 5 estudiantes por promedio 6",
        "correct": true
      },
      {
        "text": "Sumar los cuatro datos conocidos",
        "correct": true
      },
      {
        "text": "Restar al total necesario",
        "correct": true
      },
      {
        "text": "Promediar solo los cuatro primeros",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Qué procedimiento resuelve el dato faltante?",
    "strategyChoices": [
      {
        "text": "Total requerido − suma conocida.",
        "correct": true
      },
      {
        "text": "Promedio requerido + número de estudiantes.",
        "correct": false
      },
      {
        "text": "Mayor dato conocido − menor dato conocido.",
        "correct": false
      }
    ],
    "miniQuestion": "Si 5 estudiantes deben promediar 6, ¿cuál es el total requerido?",
    "miniChoices": [
      {
        "text": "30",
        "correct": true
      },
      {
        "text": "11",
        "correct": false
      },
      {
        "text": "6",
        "correct": false
      }
    ],
    "teacherNote": "Para promedio con dato desconocido, transforma primero el promedio en suma total requerida."
  },
  "37": {
    "title": "Simulador interactivo · Área compuesta por resta",
    "challenge": "Calcula el área de césped restando el área de la plazoleta al rectángulo total.",
    "keyIdea": "Cuando una zona se excluye, se calcula área total menos área que no pertenece a la región pedida.",
    "dataTable": {
      "headers": [
        "Región",
        "Área"
      ],
      "rows": [
        [
          "Rectángulo",
          "12 × 8 = 96 m²"
        ],
        [
          "Cuadrado central",
          "4 × 4 = 16 m²"
        ],
        [
          "Césped",
          "96 − 16 = 80 m²"
        ]
      ]
    },
    "chips": [
      {
        "text": "Área del rectángulo = base × altura",
        "correct": true
      },
      {
        "text": "Área del cuadrado = lado × lado",
        "correct": true
      },
      {
        "text": "Restar la plazoleta",
        "correct": true
      },
      {
        "text": "Sumar rectángulo y cuadrado",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Qué operación final se debe hacer?",
    "strategyChoices": [
      {
        "text": "Área del rectángulo menos área del cuadrado central.",
        "correct": true
      },
      {
        "text": "Área del rectángulo más área del cuadrado central.",
        "correct": false
      },
      {
        "text": "Perímetro del rectángulo menos perímetro del cuadrado.",
        "correct": false
      }
    ],
    "miniQuestion": "¿Cuánto es 96 − 16?",
    "miniChoices": [
      {
        "text": "80",
        "correct": true
      },
      {
        "text": "112",
        "correct": false
      },
      {
        "text": "48",
        "correct": false
      }
    ],
    "teacherNote": "Distingue área de perímetro y revisa si la pregunta pide región completa o región restante."
  },
  "38": {
    "title": "Simulador interactivo · Escala de mapas",
    "challenge": "Usa la escala 1 cm → 5 km para convertir 7 cm del mapa a distancia real.",
    "keyIdea": "En una escala directa, multiplicas la medida del mapa por el valor real que representa cada unidad.",
    "dataTable": {
      "headers": [
        "Dato",
        "Uso"
      ],
      "rows": [
        [
          "1 cm",
          "5 km"
        ],
        [
          "7 cm",
          "7 × 5 km"
        ],
        [
          "Distancia real",
          "35 km"
        ]
      ]
    },
    "chips": [
      {
        "text": "Cada centímetro representa 5 km",
        "correct": true
      },
      {
        "text": "La distancia del mapa es 7 cm",
        "correct": true
      },
      {
        "text": "Multiplicar 7 × 5",
        "correct": true
      },
      {
        "text": "Sumar 7 + 5 únicamente",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Cómo se calcula la distancia real?",
    "strategyChoices": [
      {
        "text": "7 × 5 = 35 km.",
        "correct": true
      },
      {
        "text": "7 + 5 = 12 km.",
        "correct": false
      },
      {
        "text": "7 ÷ 5 = 1,4 km.",
        "correct": false
      }
    ],
    "miniQuestion": "Si 1 cm representa 5 km, ¿qué representan 3 cm?",
    "miniChoices": [
      {
        "text": "15 km",
        "correct": true
      },
      {
        "text": "8 km",
        "correct": false
      },
      {
        "text": "2 km",
        "correct": false
      }
    ],
    "teacherNote": "La escala funciona como una razón constante entre dibujo y realidad."
  },
  "39": {
    "title": "Simulador interactivo · Porcentaje en una tabla",
    "challenge": "Verifica si 24 estudiantes de 80 representan el 40 % o no.",
    "keyIdea": "Para convertir una parte en porcentaje, divide parte entre total y multiplica por 100.",
    "dataTable": {
      "headers": [
        "Cálculo",
        "Resultado"
      ],
      "rows": [
        [
          "Voleibol",
          "24 estudiantes"
        ],
        [
          "Total",
          "80 estudiantes"
        ],
        [
          "24 ÷ 80",
          "0,30"
        ],
        [
          "Porcentaje",
          "30 %"
        ]
      ]
    },
    "chips": [
      {
        "text": "Parte = 24",
        "correct": true
      },
      {
        "text": "Total = 80",
        "correct": true
      },
      {
        "text": "24 ÷ 80 = 0,30",
        "correct": true
      },
      {
        "text": "24 de 80 equivale a 40 %",
        "correct": false
      }
    ],
    "strategyQuestion": "¿La afirmación del estudiante es correcta?",
    "strategyChoices": [
      {
        "text": "No, porque 24 de 80 equivale a 30 %, no a 40 %.",
        "correct": true
      },
      {
        "text": "Sí, porque 24 siempre equivale a 40 %.",
        "correct": false
      },
      {
        "text": "Sí, porque voleibol y baloncesto tienen el mismo dato.",
        "correct": false
      }
    ],
    "miniQuestion": "¿Cuál es el 40 % de 80?",
    "miniChoices": [
      {
        "text": "32",
        "correct": true
      },
      {
        "text": "24",
        "correct": false
      },
      {
        "text": "30",
        "correct": false
      }
    ],
    "teacherNote": "Compara dos rutas: porcentaje real de 24/80 y cantidad que correspondería al 40 %. Ambas muestran que la afirmación es falsa."
  },
  "40": {
    "title": "Simulador interactivo · Seguir un algoritmo de operaciones",
    "challenge": "Aplica paso a paso la calculadora mal configurada para los números -1 y 5.",
    "keyIdea": "No hagas la multiplicación usual. Sigue el procedimiento indicado: sumar, elevar al cuadrado y sumar 1.",
    "dataTable": {
      "headers": [
        "Paso",
        "Cálculo"
      ],
      "rows": [
        [
          "1. Sumar",
          "-1 + 5 = 4"
        ],
        [
          "2. Cuadrado",
          "4² = 16"
        ],
        [
          "3. Sumar 1",
          "16 + 1 = 17"
        ]
      ]
    },
    "chips": [
      {
        "text": "Primero sumar -1 y 5",
        "correct": true
      },
      {
        "text": "Elevar el resultado al cuadrado",
        "correct": true
      },
      {
        "text": "Sumar 1 al final",
        "correct": true
      },
      {
        "text": "Multiplicar directamente -1 × 5",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Qué procedimiento debe seguirse?",
    "strategyChoices": [
      {
        "text": "(-1 + 5)² + 1",
        "correct": true
      },
      {
        "text": "(-1 × 5)² + 1",
        "correct": false
      },
      {
        "text": "-1 × 5",
        "correct": false
      }
    ],
    "miniQuestion": "¿Cuánto es (-1 + 5)² + 1?",
    "miniChoices": [
      {
        "text": "17",
        "correct": true
      },
      {
        "text": "-5",
        "correct": false
      },
      {
        "text": "26",
        "correct": false
      }
    ],
    "teacherNote": "En preguntas de procedimientos, la clave es obedecer el algoritmo dado, incluso si la palabra del contexto parece sugerir otra operación."
  },
  "41": {
    "title": "Simulador interactivo · Comparación de trayectorias",
    "challenge": "Ordena tres trayectorias comparando sus longitudes en términos de d.",
    "keyIdea": "Expresa todas las longitudes con la misma referencia d para poder compararlas.",
    "dataTable": {
      "headers": [
        "Trayectoria",
        "Longitud"
      ],
      "rows": [
        [
          "1",
          "d"
        ],
        [
          "3",
          "πd/2 ≈ 1,57d"
        ],
        [
          "2",
          "2d"
        ],
        [
          "Orden",
          "1 < 3 < 2"
        ]
      ]
    },
    "chips": [
      {
        "text": "Trayectoria 1 mide d",
        "correct": true
      },
      {
        "text": "Semicírculo mide πd/2",
        "correct": true
      },
      {
        "text": "Triángulo equilátero: dos lados suman 2d",
        "correct": true
      },
      {
        "text": "πd/2 es mayor que 2d",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Cuál es el orden de menor a mayor?",
    "strategyChoices": [
      {
        "text": "Trayectoria 1, Trayectoria 3, Trayectoria 2.",
        "correct": true
      },
      {
        "text": "Trayectoria 1, Trayectoria 2, Trayectoria 3.",
        "correct": false
      },
      {
        "text": "Trayectoria 3, Trayectoria 2, Trayectoria 1.",
        "correct": false
      }
    ],
    "miniQuestion": "Aproximadamente, ¿cuánto vale π/2?",
    "miniChoices": [
      {
        "text": "1,57",
        "correct": true
      },
      {
        "text": "3,14",
        "correct": false
      },
      {
        "text": "2,00",
        "correct": false
      }
    ],
    "teacherNote": "Para comparar caminos, no basta ver la figura: convierte cada trayectoria en una expresión comparable."
  },
  "42": {
    "title": "Simulador interactivo · Elegir el procedimiento de promedio",
    "challenge": "Reconoce qué pasos permiten verificar si la edad promedio cumple una condición.",
    "keyIdea": "Si la condición habla de promedio, el procedimiento debe ser sumar todos los datos y dividir entre la cantidad de datos.",
    "dataTable": {
      "headers": [
        "Medida",
        "Procedimiento"
      ],
      "rows": [
        [
          "Promedio",
          "Sumar edades ÷ número de integrantes"
        ],
        [
          "Mediana",
          "Ordenar y tomar dato central"
        ],
        [
          "Moda",
          "Dato que más se repite"
        ]
      ]
    },
    "chips": [
      {
        "text": "La norma habla de edad promedio",
        "correct": true
      },
      {
        "text": "Hay que sumar todas las edades",
        "correct": true
      },
      {
        "text": "Se divide entre el número de integrantes",
        "correct": true
      },
      {
        "text": "Basta con buscar la edad que más se repite",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Qué procedimiento corresponde al promedio?",
    "strategyChoices": [
      {
        "text": "Sumar todas las edades y dividir entre el número de integrantes.",
        "correct": true
      },
      {
        "text": "Ordenar y tomar solo el dato central.",
        "correct": false
      },
      {
        "text": "Contar la edad que aparece más veces.",
        "correct": false
      }
    ],
    "miniQuestion": "Si tres edades son 10, 12 y 14, ¿cuál es su promedio?",
    "miniChoices": [
      {
        "text": "12",
        "correct": true
      },
      {
        "text": "14",
        "correct": false
      },
      {
        "text": "10",
        "correct": false
      }
    ],
    "teacherNote": "ICFES evalúa si reconoces la medida estadística adecuada, no solo si haces operaciones."
  },
  "43": {
    "title": "Simulador interactivo · Área por descomposición geométrica",
    "challenge": "Calcula el área del jardín restando las zonas triangulares externas del rectángulo total.",
    "keyIdea": "Una figura compleja puede resolverse por descomposición: área total menos áreas que quedan por fuera.",
    "dataTable": {
      "headers": [
        "Región",
        "Área"
      ],
      "rows": [
        [
          "Rectángulo total",
          "60 × 40 = 2.400 m²"
        ],
        [
          "Triángulos externos",
          "100 + 100 + 500 + 500 = 1.200 m²"
        ],
        [
          "Jardín",
          "2.400 − 1.200 = 1.200 m²"
        ]
      ]
    },
    "chips": [
      {
        "text": "Área del rectángulo total",
        "correct": true
      },
      {
        "text": "Área de cuatro triángulos externos",
        "correct": true
      },
      {
        "text": "Restar lo externo al total",
        "correct": true
      },
      {
        "text": "Usar solo perímetros",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Cómo se obtiene el área del jardín?",
    "strategyChoices": [
      {
        "text": "Área total del terreno menos áreas triangulares externas.",
        "correct": true
      },
      {
        "text": "Sumando solo las bases de los triángulos.",
        "correct": false
      },
      {
        "text": "Tomando 60 + 40 como área total.",
        "correct": false
      }
    ],
    "miniQuestion": "¿Cuánto es 2.400 − 1.200?",
    "miniChoices": [
      {
        "text": "1.200",
        "correct": true
      },
      {
        "text": "2.400",
        "correct": false
      },
      {
        "text": "100",
        "correct": false
      }
    ],
    "teacherNote": "Dibuja mentalmente qué región piden. Muchas preguntas se resuelven restando lo que no pertenece a la región objetivo."
  },
  "44": {
    "title": "Simulador interactivo · Interpretación de correlación de Pearson",
    "challenge": "Comprende por qué un coeficiente 0,92 indica una relación lineal fuerte y positiva.",
    "keyIdea": "El coeficiente de correlación va de -1 a 1: cerca de 1 indica relación directa fuerte; cerca de -1, inversa fuerte; cerca de 0, débil.",
    "dataTable": {
      "headers": [
        "Coeficiente",
        "Interpretación"
      ],
      "rows": [
        [
          "0,92",
          "Positivo"
        ],
        [
          "Cercano a 1",
          "Relación lineal fuerte"
        ],
        [
          "Conclusión",
          "Si una nota sube, la otra tiende a subir"
        ]
      ]
    },
    "chips": [
      {
        "text": "0,92 es positivo",
        "correct": true
      },
      {
        "text": "0,92 está cercano a 1",
        "correct": true
      },
      {
        "text": "Indica relación lineal fuerte y directa",
        "correct": true
      },
      {
        "text": "0,92 significa multiplicar una nota por la otra",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Por qué la afirmación del consejero es verdadera?",
    "strategyChoices": [
      {
        "text": "Porque 0,92 es positivo y cercano a 1.",
        "correct": true
      },
      {
        "text": "Porque 0,92 es menor que 1 y por eso no hay relación.",
        "correct": false
      },
      {
        "text": "Porque una nota se obtiene multiplicando la otra por 0,92.",
        "correct": false
      }
    ],
    "miniQuestion": "¿Qué indica una correlación positiva cercana a 1?",
    "miniChoices": [
      {
        "text": "Relación directa fuerte",
        "correct": true
      },
      {
        "text": "Relación inexistente",
        "correct": false
      },
      {
        "text": "Relación inversa fuerte",
        "correct": false
      }
    ],
    "teacherNote": "No confundas correlación con fórmula exacta. Correlación habla de tendencia conjunta, no de cálculo directo de una variable."
  },
  "45": {
    "title": "Simulador interactivo · Principio multiplicativo en elecciones",
    "challenge": "Cuenta las formas de escoger un equipo y un uniforme en un videojuego.",
    "keyIdea": "Si una elección tiene dos etapas independientes, se multiplican las opciones de cada etapa.",
    "dataTable": {
      "headers": [
        "Etapa",
        "Opciones"
      ],
      "rows": [
        [
          "Equipo",
          "10"
        ],
        [
          "Uniforme por equipo",
          "3"
        ],
        [
          "Total",
          "10 × 3 = 30"
        ]
      ]
    },
    "chips": [
      {
        "text": "Primero se elige equipo",
        "correct": true
      },
      {
        "text": "Luego se elige uniforme",
        "correct": true
      },
      {
        "text": "Se multiplican 10 × 3",
        "correct": true
      },
      {
        "text": "Se suman 10 + 3 para obtener las formas",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Es correcta la afirmación de Esteban?",
    "strategyChoices": [
      {
        "text": "Sí, porque 10 × 3 cuenta equipo y uniforme.",
        "correct": true
      },
      {
        "text": "No, porque se debe usar 10 + 3.",
        "correct": false
      },
      {
        "text": "No, porque solo hay 10 opciones posibles.",
        "correct": false
      }
    ],
    "miniQuestion": "Si hay 4 camisas y 2 pantalones, ¿cuántos conjuntos se pueden formar?",
    "miniChoices": [
      {
        "text": "8",
        "correct": true
      },
      {
        "text": "6",
        "correct": false
      },
      {
        "text": "4",
        "correct": false
      }
    ],
    "teacherNote": "Cuando aparecen decisiones encadenadas, identifica etapas y multiplica posibilidades."
  },
  "46": {
    "title": "Simulador interactivo · Verificación de promedio diario",
    "challenge": "Comprueba si una producción total de 350 litros en 5 días corresponde a promedio 70.",
    "keyIdea": "Promedio = total ÷ cantidad de datos. También puedes verificar que promedio × días = total.",
    "dataTable": {
      "headers": [
        "Dato",
        "Cálculo"
      ],
      "rows": [
        [
          "Total",
          "350 litros"
        ],
        [
          "Días",
          "5"
        ],
        [
          "Promedio",
          "350 ÷ 5 = 70"
        ],
        [
          "Verificación",
          "70 × 5 = 350"
        ]
      ]
    },
    "chips": [
      {
        "text": "Calcular producción total",
        "correct": true
      },
      {
        "text": "Dividir entre 5 días",
        "correct": true
      },
      {
        "text": "Verificar 70 × 5 = 350",
        "correct": true
      },
      {
        "text": "Decidir por el dato de un solo día",
        "correct": false
      }
    ],
    "strategyQuestion": "¿La afirmación es verdadera?",
    "strategyChoices": [
      {
        "text": "Sí, porque el total equivale a 70 × 5.",
        "correct": true
      },
      {
        "text": "No, porque 70 aparece solo un día.",
        "correct": false
      },
      {
        "text": "No, porque hay días menores que 70.",
        "correct": false
      }
    ],
    "miniQuestion": "¿Cuánto es 350 ÷ 5?",
    "miniChoices": [
      {
        "text": "70",
        "correct": true
      },
      {
        "text": "75",
        "correct": false
      },
      {
        "text": "65",
        "correct": false
      }
    ],
    "teacherNote": "Un promedio puede ser verdadero aunque algunos datos estén por encima y otros por debajo del valor promedio."
  },
  "47": {
    "title": "Simulador interactivo · Impuesto con condiciones lógicas",
    "challenge": "Decide qué ciudadanos pagan impuesto aplicando dos condiciones unidas por 'o'.",
    "keyIdea": "Cuando una norma dice condición A o condición B, basta con cumplir una de las dos para que aplique.",
    "dataTable": {
      "headers": [
        "Condición",
        "Criterio"
      ],
      "rows": [
        [
          "Patrimonio",
          "> 350.000 dólares"
        ],
        [
          "Ingresos",
          "40 % de ingresos > 20.000"
        ],
        [
          "Conector",
          "O: basta una condición"
        ],
        [
          "Resultado",
          "Luisa y Ernesta"
        ]
      ]
    },
    "chips": [
      {
        "text": "Patrimonio mayor que 350.000 activa el impuesto",
        "correct": true
      },
      {
        "text": "40 % de ingresos mayor que 20.000 activa el impuesto",
        "correct": true
      },
      {
        "text": "La palabra 'o' significa al menos una condición",
        "correct": true
      },
      {
        "text": "Se deben cumplir ambas condiciones siempre",
        "correct": false
      }
    ],
    "strategyQuestion": "¿A quién se cobra el impuesto?",
    "strategyChoices": [
      {
        "text": "A quienes cumplen al menos una de las condiciones: Luisa y Ernesta.",
        "correct": true
      },
      {
        "text": "Solo a quien cumple las dos condiciones al tiempo.",
        "correct": false
      },
      {
        "text": "A nadie, porque el 40 % no se calcula.",
        "correct": false
      }
    ],
    "miniQuestion": "Si una regla dice A o B, ¿qué se necesita para cumplirla?",
    "miniChoices": [
      {
        "text": "Cumplir A, o B, o ambas",
        "correct": true
      },
      {
        "text": "Cumplir obligatoriamente A y B",
        "correct": false
      },
      {
        "text": "No cumplir ninguna",
        "correct": false
      }
    ],
    "teacherNote": "En contextos tributarios o normativos, analiza conectores lógicos: 'y' no significa lo mismo que 'o'."
  },
  "48": {
    "title": "Simulador interactivo · Ordenar polígonos por lados",
    "challenge": "Ordena tres manteles de menor a mayor número de lados.",
    "keyIdea": "La clasificación de polígonos depende del número de lados: triángulo 3, cuadrilátero 4, hexágono 6.",
    "dataTable": {
      "headers": [
        "Mantel",
        "Lados"
      ],
      "rows": [
        [
          "Mantel 2",
          "3 lados"
        ],
        [
          "Mantel 1",
          "4 lados"
        ],
        [
          "Mantel 3",
          "6 lados"
        ],
        [
          "Orden",
          "2 - 1 - 3"
        ]
      ]
    },
    "chips": [
      {
        "text": "Triángulo tiene 3 lados",
        "correct": true
      },
      {
        "text": "Cuadrado tiene 4 lados",
        "correct": true
      },
      {
        "text": "Hexágono tiene 6 lados",
        "correct": true
      },
      {
        "text": "El orden depende del área del mantel",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Cuál es el orden correcto de menor a mayor?",
    "strategyChoices": [
      {
        "text": "Mantel 2 - Mantel 1 - Mantel 3",
        "correct": true
      },
      {
        "text": "Mantel 1 - Mantel 3 - Mantel 2",
        "correct": false
      },
      {
        "text": "Mantel 3 - Mantel 1 - Mantel 2",
        "correct": false
      }
    ],
    "miniQuestion": "¿Cuántos lados tiene un hexágono?",
    "miniChoices": [
      {
        "text": "6",
        "correct": true
      },
      {
        "text": "4",
        "correct": false
      },
      {
        "text": "3",
        "correct": false
      }
    ],
    "teacherNote": "En clasificación geométrica básica, cuenta lados antes de usar nombres o apariencia visual."
  },
  "49": {
    "title": "Simulador interactivo · Información necesaria para combinaciones",
    "challenge": "Identifica qué datos se requieren para calcular cuántos grupos diferentes se pueden formar.",
    "keyIdea": "Para contar grupos por combinación se necesita conocer el total de elementos disponibles y el tamaño de cada grupo.",
    "dataTable": {
      "headers": [
        "Dato necesario",
        "Por qué"
      ],
      "rows": [
        [
          "Total de estudiantes",
          "Conjunto disponible"
        ],
        [
          "Tamaño del grupo",
          "Cantidad seleccionada"
        ],
        [
          "No basta",
          "Saber cuántos grupos quiere organizar"
        ]
      ]
    },
    "chips": [
      {
        "text": "Número de estudiantes del colegio",
        "correct": true
      },
      {
        "text": "Cantidad de estudiantes que tendrá el grupo",
        "correct": true
      },
      {
        "text": "Se trata de seleccionar subconjuntos",
        "correct": true
      },
      {
        "text": "Solo se necesita la cantidad de grupos",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Qué información se necesita?",
    "strategyChoices": [
      {
        "text": "Total de estudiantes y cantidad de estudiantes por grupo.",
        "correct": true
      },
      {
        "text": "Solo la cantidad de grupos que va a organizar.",
        "correct": false
      },
      {
        "text": "Solo el tamaño de cada grupo, sin total disponible.",
        "correct": false
      }
    ],
    "miniQuestion": "Para calcular formas de escoger 3 estudiantes de un curso, ¿qué falta conocer?",
    "miniChoices": [
      {
        "text": "Cuántos estudiantes hay en total",
        "correct": true
      },
      {
        "text": "El color del uniforme",
        "correct": false
      },
      {
        "text": "La hora de clase",
        "correct": false
      }
    ],
    "teacherNote": "En combinatoria, pregúntate: ¿de cuántos elijo y cuántos elijo? Esos dos datos son esenciales."
  },
  "50": {
    "title": "Simulador interactivo · Gráfica de cajas y cinco números",
    "challenge": "Asocia una tabla ordenada con la gráfica de cajas correcta usando mínimo, Q1, mediana, Q3 y máximo.",
    "keyIdea": "Una gráfica de cajas resume cinco valores: mínimo, Q1, Q2 o mediana, Q3 y máximo.",
    "dataTable": {
      "headers": [
        "Valor",
        "Posición"
      ],
      "rows": [
        [
          "Mínimo",
          "155"
        ],
        [
          "Q1",
          "162"
        ],
        [
          "Q2 / Mediana",
          "165"
        ],
        [
          "Q3",
          "170"
        ],
        [
          "Máximo",
          "172"
        ]
      ]
    },
    "chips": [
      {
        "text": "Identificar mínimo y máximo",
        "correct": true
      },
      {
        "text": "Ubicar Q1, Q2 y Q3",
        "correct": true
      },
      {
        "text": "Comparar esos cinco valores con cada gráfica",
        "correct": true
      },
      {
        "text": "Elegir la caja más grande sin mirar valores",
        "correct": false
      }
    ],
    "strategyQuestion": "¿Qué debe coincidir en la gráfica correcta?",
    "strategyChoices": [
      {
        "text": "Mínimo 155, Q1 162, mediana 165, Q3 170 y máximo 172.",
        "correct": true
      },
      {
        "text": "Solo el valor máximo",
        "correct": false
      },
      {
        "text": "Solo el promedio de las estaturas",
        "correct": false
      }
    ],
    "miniQuestion": "En una gráfica de cajas, ¿qué representa la línea dentro de la caja?",
    "miniChoices": [
      {
        "text": "La mediana o Q2",
        "correct": true
      },
      {
        "text": "El máximo",
        "correct": false
      },
      {
        "text": "El mínimo",
        "correct": false
      }
    ],
    "teacherNote": "No confundas gráfica de cajas con barras. La caja muestra cuartiles y los extremos muestran mínimo y máximo."
  }
};


function getS2MathSimulatorConfig(number) {
  return S2_MATH_SIMULATOR_CONFIGS[Number(number)] || null;
}

function isS2MathSimulatorQuestion(question) {
  return Number(question.session) === 2 &&
    String(question.area || "").toLowerCase().includes("matem") &&
    Number(question.number) >= 29 && Number(question.number) <= 50;
}

const NOTEBOOK_RENDER_SIMULATOR_BASE_S2 = renderNotebookSimulator;
const NOTEBOOK_INIT_SIMULATOR_BASE_S2 = initNotebookSimulator;

renderNotebookSimulator = function(question, customResource) {
  if (isS2MathSimulatorQuestion(question)) {
    const config = getS2MathSimulatorConfig(Number(question.number));
    if (config) return renderS1MathGuidedSimulator(question, config);
  }
  return NOTEBOOK_RENDER_SIMULATOR_BASE_S2(question, customResource);
};

initNotebookSimulator = function(question) {
  if (isS2MathSimulatorQuestion(question)) {
    initS2MathGuidedSimulator(question);
    return;
  }
  NOTEBOOK_INIT_SIMULATOR_BASE_S2(question);
};

function initS2MathGuidedSimulator(question) {
  const config = getS2MathSimulatorConfig(Number(question.number));
  if (!config) return;

  const chipGrid = document.getElementById("guidedChipGrid");
  const checkChipsBtn = document.getElementById("checkGuidedChipsBtn");
  const chipsFeedback = document.getElementById("guidedChipsFeedback");
  const strategyGrid = document.getElementById("guidedStrategyGrid");
  const strategyFeedback = document.getElementById("guidedStrategyFeedback");
  const miniGrid = document.getElementById("guidedMiniGrid");
  const miniFeedback = document.getElementById("guidedMiniFeedback");
  const finalGrid = document.getElementById("guidedFinalAnswerGrid");
  const finalFeedback = document.getElementById("guidedFinalFeedback");

  if (chipGrid) {
    chipGrid.addEventListener("click", event => {
      const button = event.target.closest(".guided-chip");
      if (!button) return;
      button.classList.toggle("selected");
      if (chipsFeedback) {
        chipsFeedback.textContent = "Pistas seleccionadas. Ahora verifica si todas son relevantes para resolver esta pregunta.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  if (checkChipsBtn) {
    checkChipsBtn.addEventListener("click", () => {
      const buttons = Array.from(document.querySelectorAll(".guided-chip"));
      const wrongSelected = buttons.some(button => button.classList.contains("selected") && button.dataset.correct !== "1");
      const missingCorrect = buttons.some(button => !button.classList.contains("selected") && button.dataset.correct === "1");
      buttons.forEach(button => {
        button.classList.remove("correct", "wrong");
        if (button.classList.contains("selected") && button.dataset.correct === "1") button.classList.add("correct");
        if (button.classList.contains("selected") && button.dataset.correct !== "1") button.classList.add("wrong");
      });
      if (!wrongSelected && !missingCorrect) {
        chipsFeedback.innerHTML = "<strong>Excelente.</strong> Elegiste las pistas útiles. Esa es la primera habilidad matemática que evalúa Saber 11: leer con criterio.";
        chipsFeedback.className = "sim-feedback ok";
      } else if (wrongSelected) {
        chipsFeedback.innerHTML = "<strong>Revisa.</strong> Hay una pista distractora seleccionada. En ICFES, separar datos útiles de distractores evita errores de procedimiento.";
        chipsFeedback.className = "sim-feedback error";
      } else {
        chipsFeedback.innerHTML = "<strong>Vas bien.</strong> Todavía falta una pista necesaria para justificar la solución completa.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  function bindChoiceGrid(grid, feedback, correctMessage, errorMessage) {
    if (!grid) return;
    grid.addEventListener("click", event => {
      const button = event.target.closest(".guided-choice");
      if (!button) return;
      grid.querySelectorAll(".guided-choice").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.correct === "1") {
        button.classList.add("correct");
        if (feedback) {
          feedback.innerHTML = `<strong>Correcto.</strong> ${escapeHtml(correctMessage)}`;
          feedback.className = "sim-feedback ok";
        }
      } else {
        button.classList.add("wrong");
        if (feedback) {
          feedback.innerHTML = `<strong>Revisa.</strong> ${escapeHtml(errorMessage)}`;
          feedback.className = "sim-feedback error";
        }
      }
    });
  }

  bindChoiceGrid(strategyGrid, strategyFeedback, "La estrategia elegida responde directamente al tipo de razonamiento matemático de la pregunta.", "La estrategia no usa la relación matemática central del enunciado.");
  bindChoiceGrid(miniGrid, miniFeedback, "El micro-reto confirma el procedimiento que debes usar para resolver la pregunta original.", "Vuelve a la idea matemática clave y revisa el dato o la operación que se está evaluando.");

  if (finalGrid) {
    finalGrid.addEventListener("click", event => {
      const button = event.target.closest(".guided-final-answer");
      if (!button) return;
      finalGrid.querySelectorAll(".guided-final-answer").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.answer === question.correctAnswer) {
        button.classList.add("correct");
        finalFeedback.innerHTML = `<strong>Correcto.</strong> La opción ${escapeHtml(question.correctAnswer)} es la adecuada. ${escapeHtml(question.explanation || "La elección coincide con el procedimiento trabajado en el simulador.")}`;
        finalFeedback.className = "sim-final-feedback ok";
      } else {
        button.classList.add("wrong");
        finalFeedback.innerHTML = `<strong>Revisa tu elección.</strong> Esta opción no coincide con la ruta matemática del simulador. Antes de volver a la pregunta, repasa las pistas, la estrategia y el micro-reto.`;
        finalFeedback.className = "sim-final-feedback error";
      }
    });
  }
}

/* ==========================================================
   Simuladores dinámicos por pregunta · Sección 1 Lectura Crítica
   Preguntas 26 a 66
   ========================================================== */

function isS1ReadingSimulatorQuestion(question) {
  return Number(question.session) === 1 &&
    String(question.area || "").toLowerCase().includes("lectura") &&
    Number(question.number) >= 26 && Number(question.number) <= 66;
}

function getS1ReadingSimulatorConfig(question) {
  const component = String(question.componente || "").toLowerCase();
  const prompt = String(question.prompt || "").toLowerCase();
  const competence = String(question.competencia || "").toLowerCase();
  const text = `${component} ${prompt} ${competence}`;

  const profiles = {
    paraphrase: {
      skill: "Paráfrasis y sentido local",
      icon: "🔁",
      keyIdea: "Una paráfrasis correcta conserva la idea del texto con otras palabras, sin agregar información, sin omitir una parte clave y sin contradecir el sentido original.",
      strategy: "Localiza el fragmento exacto, separa sus ideas principales y compara cada opción con esas ideas.",
      correctStrategy: "Conservar todas las ideas esenciales del fragmento sin cambiar su sentido.",
      wrongStrategyA: "Elegir la opción que use palabras parecidas aunque cambie el sentido.",
      wrongStrategyB: "Escoger la opción más extensa sin verificar si mantiene la idea original.",
      miniQuestion: "Una paráfrasis válida se reconoce porque:",
      miniCorrect: "mantiene el sentido del texto con otras palabras.",
      miniWrongA: "agrega información que no aparece en el texto.",
      miniWrongB: "contradice una idea central del fragmento."
    },
    relation: {
      skill: "Relación entre enunciados",
      icon: "🔗",
      keyIdea: "Para resolver relaciones entre enunciados, identifica si el segundo amplía, explica, ejemplifica, justifica, contrasta o concluye lo dicho en el primero.",
      strategy: "Lee cada enunciado por separado, nombra su función y luego determina el vínculo lógico entre ambos.",
      correctStrategy: "Reconocer la función lógica que cumple un enunciado frente al otro.",
      wrongStrategyA: "Suponer que dos enunciados se contradicen solo porque tienen información distinta.",
      wrongStrategyB: "Elegir una relación sin verificar conectores, causa, ampliación o ejemplo.",
      miniQuestion: "Si un segundo enunciado explica con más detalle una idea del primero, la relación más probable es:",
      miniCorrect: "ampliación o explicación.",
      miniWrongA: "contradicción absoluta.",
      miniWrongB: "información sin relación."
    },
    argument: {
      skill: "Argumentación y tesis",
      icon: "⚖️",
      keyIdea: "En Lectura Crítica debes distinguir tesis, razones, ejemplos, evidencias y conclusiones. Una opción correcta debe explicar cómo una parte del texto sostiene la idea central.",
      strategy: "Pregunta: ¿qué quiere defender el autor y con qué razón o ejemplo intenta convencer al lector?",
      correctStrategy: "Identificar tesis y reconocer qué elemento funciona como argumento, evidencia o estrategia persuasiva.",
      wrongStrategyA: "Confundir un ejemplo con la tesis principal del texto.",
      wrongStrategyB: "Escoger una opción que suena crítica pero no se apoya en el texto.",
      miniQuestion: "Un argumento sirve principalmente para:",
      miniCorrect: "apoyar o justificar una tesis.",
      miniWrongA: "decorar el texto sin aportar razones.",
      miniWrongB: "repetir una palabra sin explicar nada."
    },
    inference: {
      skill: "Inferencia e interpretación",
      icon: "🧭",
      keyIdea: "Inferir no es inventar: es deducir una idea que no está dicha literalmente, pero que se sostiene con pistas del texto.",
      strategy: "Ubica datos explícitos, relaciónalos y descarta opciones que dependan de opiniones externas.",
      correctStrategy: "Deducir una conclusión respaldada por evidencias del texto.",
      wrongStrategyA: "Responder con conocimiento personal aunque el texto no lo apoye.",
      wrongStrategyB: "Tomar una palabra aislada y convertirla en conclusión general.",
      miniQuestion: "Una inferencia aceptable debe estar:",
      miniCorrect: "respaldada por información textual.",
      miniWrongA: "basada solo en una opinión personal.",
      miniWrongB: "desconectada del enunciado."
    },
    lexicon: {
      skill: "Vocabulario en contexto",
      icon: "📚",
      keyIdea: "El significado de una palabra se determina por el contexto: revisa la oración, el tono y las palabras cercanas antes de reemplazarla.",
      strategy: "Sustituye mentalmente la palabra por cada opción y verifica cuál conserva el sentido de la oración completa.",
      correctStrategy: "Probar cada reemplazo dentro de la oración y elegir el que no cambia el sentido.",
      wrongStrategyA: "Escoger el significado más común de la palabra sin revisar el contexto.",
      wrongStrategyB: "Elegir una palabra parecida en sonido, pero no en significado.",
      miniQuestion: "Para resolver vocabulario en contexto conviene:",
      miniCorrect: "reemplazar la palabra en la oración y comprobar si mantiene el sentido.",
      miniWrongA: "elegir el primer sinónimo que recuerdes.",
      miniWrongB: "ignorar el fragmento donde aparece."
    },
    functionText: {
      skill: "Función de fragmentos y partes del texto",
      icon: "🧩",
      keyIdea: "Una parte del texto cumple una función: introducir, explicar, ejemplificar, cerrar, contrastar, definir o reforzar una idea.",
      strategy: "Mira qué ocurre antes y después del fragmento para determinar para qué lo usa el autor.",
      correctStrategy: "Reconocer para qué sirve el fragmento dentro de la organización del texto.",
      wrongStrategyA: "Analizar el fragmento aislado sin revisar el resto del texto.",
      wrongStrategyB: "Confundir tema del fragmento con función del fragmento.",
      miniQuestion: "La función de un fragmento se determina mejor al observar:",
      miniCorrect: "su relación con las ideas anteriores y posteriores.",
      miniWrongA: "solo la cantidad de palabras del fragmento.",
      miniWrongB: "únicamente si aparece al inicio o al final."
    },
    explicit: {
      skill: "Información explícita y localización",
      icon: "🔎",
      keyIdea: "Cuando la pregunta pide información explícita, la respuesta debe poder señalarse directamente en el texto o en el recurso gráfico.",
      strategy: "Busca palabras clave del enunciado en el texto y verifica que la opción coincida literalmente o de forma equivalente.",
      correctStrategy: "Localizar la evidencia exacta y compararla con las opciones.",
      wrongStrategyA: "Responder con una inferencia cuando la pregunta pide un dato literal.",
      wrongStrategyB: "Elegir una opción parcialmente cierta pero incompleta.",
      miniQuestion: "Si la pregunta dice 'de acuerdo con el texto', lo primero es:",
      miniCorrect: "buscar la evidencia explícita en el texto.",
      miniWrongA: "responder con lo que uno cree del tema.",
      miniWrongB: "mirar solo la opción más larga."
    },
    graphic: {
      skill: "Relación entre texto verbal y elementos gráficos",
      icon: "🖼️",
      keyIdea: "En cómics, infografías o textos con imágenes, la respuesta surge de relacionar palabras, recuadros, flechas, globos, títulos y secuencia visual.",
      strategy: "Lee primero la imagen completa, luego el texto verbal, y finalmente identifica cómo ambos se complementan.",
      correctStrategy: "Relacionar texto, imagen y ubicación del elemento dentro del recurso gráfico.",
      wrongStrategyA: "Leer solo el globo o solo la imagen sin integrarlos.",
      wrongStrategyB: "Ignorar flechas, recuadros, cursivas o paratextos.",
      miniQuestion: "En una infografía o cómic, una flecha normalmente sirve para:",
      miniCorrect: "conectar un texto con un elemento visual específico.",
      miniWrongA: "decorar la página sin función comunicativa.",
      miniWrongB: "anular el significado del globo."
    },
    voice: {
      skill: "Voces narrativas y caracterización",
      icon: "🎭",
      keyIdea: "Para identificar voces, narradores o personajes, observa pronombres, marcas de primera persona, acciones, emociones y quién enuncia cada fragmento.",
      strategy: "Determina quién habla, desde qué punto de vista y qué rasgos se pueden inferir de sus palabras o acciones.",
      correctStrategy: "Usar marcas textuales para reconocer voz, punto de vista o caracterización.",
      wrongStrategyA: "Atribuir la voz al personaje más visible sin revisar los pronombres.",
      wrongStrategyB: "Confundir narrador, autor y personaje.",
      miniQuestion: "Una pista fuerte para reconocer una voz en primera persona es:",
      miniCorrect: "el uso de 'yo', 'me', 'mi' o referencias a experiencias propias.",
      miniWrongA: "que el texto tenga muchas palabras.",
      miniWrongB: "que aparezca una fecha en el texto."
    },
    global: {
      skill: "Idea global e intención comunicativa",
      icon: "🎯",
      keyIdea: "La idea global o intención no se toma de una frase aislada: se construye con el tema, el propósito y la dirección completa del texto.",
      strategy: "Pregunta: ¿para qué fue escrito el texto y cuál es la idea que organiza todos sus párrafos?",
      correctStrategy: "Identificar el propósito o la idea central que integra el texto completo.",
      wrongStrategyA: "Elegir un detalle secundario como si fuera la idea central.",
      wrongStrategyB: "Escoger una opción muy general que no dice lo que el texto defiende.",
      miniQuestion: "La idea global de un texto debe:",
      miniCorrect: "integrar la mayoría de sus partes y propósito.",
      miniWrongA: "mencionar solo un detalle aislado.",
      miniWrongB: "contradecir el cierre del texto."
    }
  };

  let key = "global";
  if (/paráfrasis|parafras|mismo significado|expresa el mismo/.test(text)) key = "paraphrase";
  else if (/relación entre enunciados|conectores|palabra “o”|palabra \"o\"|lo que|relación lógica|relaciones semánticas/.test(text)) key = "relation";
  else if (/argument|tesis|defiende|evidencia|estrategia argumentativa|persuasi|convencer|posición/.test(text)) key = "argument";
  else if (/infer|supuesto|deduc|perspectiva|intención del narrador|caracterización|posible describir/.test(text)) key = "inference";
  else if (/léxico|vocabulario|reemplazar|palabra|significa|contexto|inmune|disonantes|deslumbrar/.test(text)) key = "lexicon";
  else if (/función cumple|función de|fragmento dentro|partes del texto|último cuadro/.test(text)) key = "functionText";
  else if (/información explícita|localización|ubicación|de acuerdo con el texto|responde la pregunta|era|se da en/.test(text)) key = "explicit";
  else if (/gráfico|recuadro|globo|flecha|infografía|cómic|paratextual|texto verbal/.test(text)) key = "graphic";
  else if (/voces narrativas|voz de|personajes|narrador|punto de vista/.test(text)) key = "voice";
  else if (/idea global|pregunta principal|intención comunicativa|propósito|idea que defiende/.test(text)) key = "global";

  const profile = profiles[key] || profiles.global;
  return {
    ...profile,
    typeKey: key,
    title: `Simulador interactivo · Lectura Crítica · Pregunta ${question.number}`,
    challenge: question.prompt || "Analiza el texto y decide cuál opción se justifica mejor con la información dada.",
    chips: [
      { text: `Identificar que la pregunta evalúa: ${profile.skill}`, correct: true },
      { text: "Volver al texto, fragmento, infografía o cómic para buscar evidencia", correct: true },
      { text: "Comparar cada opción con el enunciado antes de responder", correct: true },
      { text: "Responder por intuición sin revisar el texto", correct: false }
    ],
    strategyChoices: [
      { text: profile.correctStrategy, correct: true },
      { text: profile.wrongStrategyA, correct: false },
      { text: profile.wrongStrategyB, correct: false }
    ],
    miniChoices: [
      { text: profile.miniCorrect, correct: true },
      { text: profile.miniWrongA, correct: false },
      { text: profile.miniWrongB, correct: false }
    ],
    teacherNote: buildReadingTeacherNote(question, profile)
  };
}

function buildReadingTeacherNote(question, profile) {
  const explanation = String(question.explanation || "").trim();
  const cleanExplanation = stripHtml(explanation).slice(0, 320);
  if (cleanExplanation) {
    return `Esta pregunta trabaja ${profile.skill}. La clave es justificar la respuesta con evidencia del texto. Pista pedagógica: ${cleanExplanation}${cleanExplanation.length >= 320 ? "..." : ""}`;
  }
  return `Esta pregunta trabaja ${profile.skill}. El estudiante debe leer con propósito, ubicar evidencia, descartar distractores y elegir la opción que mejor se sostenga en el texto.`;
}

function renderS1ReadingGuidedSimulator(question, config) {
  const options = (question.options || []).map(option => `
    <button class="sim-answer reading-final-answer" type="button" data-answer="${escapeHtml(option.letter)}">
      <strong>${escapeHtml(option.letter)}</strong><span>${escapeHtml(option.text)}</span>
    </button>
  `).join("");
  const chips = (config.chips || []).map((chip, index) => `
    <button class="guided-chip reading-chip" type="button" data-index="${index}" data-correct="${chip.correct ? "1" : "0"}">${escapeHtml(chip.text)}</button>
  `).join("");
  const strategies = (config.strategyChoices || []).map((choice, index) => `
    <button class="guided-choice reading-choice" type="button" data-group="strategy" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");
  const miniChoices = (config.miniChoices || []).map((choice, index) => `
    <button class="guided-choice reading-choice" type="button" data-group="mini" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");

  return `
    <article class="notebook-card large notebook-simulator-card reading-simulator-card" data-question="${Number(question.number)}">
      <p class="eyebrow">${escapeHtml(config.icon)} Simulador · Lectura Crítica Saber 11</p>
      <h3>${escapeHtml(config.title)}</h3>
      <p>${escapeHtml(config.challenge)}</p>

      <div class="sim-intro-grid reading-intro-grid">
        <section class="sim-mini-board">
          <h4>Reto lector</h4>
          <p><strong>Competencia:</strong> ${escapeHtml(question.competencia || "Comprensión lectora")}</p>
          <p><strong>Componente:</strong> ${escapeHtml(question.componente || config.skill)}</p>
          <p><strong>Dificultad:</strong> ${escapeHtml(question.dificultad || "Por definir")}</p>
          <div class="reading-route-box">
            <strong>Ruta de solución</strong>
            <ol>
              <li>Lee la pregunta antes de volver al texto.</li>
              <li>Define qué habilidad evalúa: paráfrasis, inferencia, función, léxico, argumento o relación.</li>
              <li>Ubica evidencia en el texto o en el recurso gráfico.</li>
              <li>Descarta opciones que exageran, contradicen o no responden exactamente.</li>
            </ol>
          </div>
        </section>
        <section class="sim-mini-board sim-concept">
          <h4>Idea clave</h4>
          <div class="average-formula guided-concept-box reading-concept-box">${escapeHtml(config.keyIdea)}</div>
          <p>${escapeHtml(config.strategy)}</p>
        </section>
      </div>

      <div class="sim-steps" aria-label="Simulador guiado de Lectura Crítica pregunta ${escapeHtml(question.number)}">
        <section class="sim-step active" data-reading-step="1">
          <div class="sim-step-head"><span>Paso 1</span><h4>Reconoce qué pide la pregunta</h4></div>
          <p>Selecciona las acciones que sí ayudan a resolver esta pregunta de Lectura Crítica.</p>
          <div class="guided-chip-grid" id="readingChipGrid">${chips}</div>
          <button class="secondary-btn" type="button" id="checkReadingChipsBtn">Verificar acciones lectoras</button>
          <p id="readingChipsFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-reading-step="2">
          <div class="sim-step-head"><span>Paso 2</span><h4>Elige la estrategia de lectura</h4></div>
          <p>¿Cuál estrategia se ajusta mejor al componente evaluado?</p>
          <div class="guided-choice-grid" id="readingStrategyGrid">${strategies}</div>
          <p id="readingStrategyFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-reading-step="3">
          <div class="sim-step-head"><span>Paso 3</span><h4>Microentrenamiento</h4></div>
          <p>${escapeHtml(config.miniQuestion)}</p>
          <div class="guided-choice-grid" id="readingMiniGrid">${miniChoices}</div>
          <p id="readingMiniFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-reading-step="4">
          <div class="sim-step-head"><span>Paso 4</span><h4>Responde como en Saber 11</h4></div>
          <p>Ahora elige la opción. El objetivo es justificarla con el texto, no adivinar.</p>
          <div class="sim-answer-grid guided-answer-grid reading-answer-grid" id="readingFinalAnswerGrid">${options}</div>
          <div id="readingFinalFeedback" class="sim-final-feedback" aria-live="polite"></div>
        </section>
      </div>

      <div class="sim-teacher-note"><strong>Nota didáctica:</strong> ${escapeHtml(config.teacherNote)}</div>
    </article>
  `;
}

function initS1ReadingGuidedSimulator(question) {
  const config = getS1ReadingSimulatorConfig(question);
  if (!config) return;

  const chipGrid = document.getElementById("readingChipGrid");
  const checkChipsBtn = document.getElementById("checkReadingChipsBtn");
  const chipsFeedback = document.getElementById("readingChipsFeedback");
  const strategyGrid = document.getElementById("readingStrategyGrid");
  const strategyFeedback = document.getElementById("readingStrategyFeedback");
  const miniGrid = document.getElementById("readingMiniGrid");
  const miniFeedback = document.getElementById("readingMiniFeedback");
  const finalGrid = document.getElementById("readingFinalAnswerGrid");
  const finalFeedback = document.getElementById("readingFinalFeedback");

  if (chipGrid) {
    chipGrid.addEventListener("click", event => {
      const button = event.target.closest(".reading-chip");
      if (!button) return;
      button.classList.toggle("selected");
      if (chipsFeedback) {
        chipsFeedback.textContent = "Acciones seleccionadas. Verifica si corresponden a una lectura estratégica y no a una respuesta por intuición.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  if (checkChipsBtn) {
    checkChipsBtn.addEventListener("click", () => {
      const buttons = Array.from(document.querySelectorAll(".reading-chip"));
      const wrongSelected = buttons.some(button => button.classList.contains("selected") && button.dataset.correct !== "1");
      const missingCorrect = buttons.some(button => !button.classList.contains("selected") && button.dataset.correct === "1");
      buttons.forEach(button => {
        button.classList.remove("correct", "wrong");
        if (button.classList.contains("selected") && button.dataset.correct === "1") button.classList.add("correct");
        if (button.classList.contains("selected") && button.dataset.correct !== "1") button.classList.add("wrong");
      });
      if (!wrongSelected && !missingCorrect) {
        chipsFeedback.innerHTML = "<strong>Muy bien.</strong> Estás leyendo como exige Saber 11: pregunta, texto, evidencia y opciones.";
        chipsFeedback.className = "sim-feedback ok";
      } else if (wrongSelected) {
        chipsFeedback.innerHTML = "<strong>Revisa.</strong> Seleccionaste una acción distractora. En Lectura Crítica no conviene responder por intuición.";
        chipsFeedback.className = "sim-feedback error";
      } else {
        chipsFeedback.innerHTML = "<strong>Vas bien.</strong> Falta una acción clave: volver al texto y contrastar las opciones con evidencia.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  function bindReadingChoiceGrid(grid, feedback, correctMessage, errorMessage) {
    if (!grid) return;
    grid.addEventListener("click", event => {
      const button = event.target.closest(".reading-choice");
      if (!button) return;
      grid.querySelectorAll(".reading-choice").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.correct === "1") {
        button.classList.add("correct");
        if (feedback) {
          feedback.innerHTML = `<strong>Correcto.</strong> ${escapeHtml(correctMessage)}`;
          feedback.className = "sim-feedback ok";
        }
      } else {
        button.classList.add("wrong");
        if (feedback) {
          feedback.innerHTML = `<strong>Revisa.</strong> ${escapeHtml(errorMessage)}`;
          feedback.className = "sim-feedback error";
        }
      }
    });
  }

  bindReadingChoiceGrid(strategyGrid, strategyFeedback, "La estrategia elegida corresponde al componente de esta pregunta.", "La estrategia elegida no resuelve exactamente lo que pregunta el enunciado.");
  bindReadingChoiceGrid(miniGrid, miniFeedback, "El microentrenamiento confirma la habilidad lectora que debes aplicar.", "Vuelve a la idea clave y revisa qué debe conservar, inferir o relacionar la respuesta.");

  if (finalGrid) {
    finalGrid.addEventListener("click", event => {
      const button = event.target.closest(".reading-final-answer");
      if (!button) return;
      finalGrid.querySelectorAll(".reading-final-answer").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.answer === question.correctAnswer) {
        button.classList.add("correct");
        finalFeedback.innerHTML = `<strong>Correcto.</strong> La opción ${escapeHtml(question.correctAnswer)} es la adecuada. ${escapeHtml(stripHtml(question.explanation || "La elección se sostiene en la evidencia del texto y responde exactamente al enunciado."))}`;
        finalFeedback.className = "sim-final-feedback ok";
      } else {
        button.classList.add("wrong");
        finalFeedback.innerHTML = `<strong>Revisa tu elección.</strong> Esta opción no se sostiene completamente con el texto o no responde exactamente la tarea lectora. Revisa la estrategia: ${escapeHtml(config.correctStrategy)}`;
        finalFeedback.className = "sim-final-feedback error";
      }
    });
  }
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<br\s*\/?\>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const NOTEBOOK_RENDER_SIMULATOR_BASE_READING = renderNotebookSimulator;
const NOTEBOOK_INIT_SIMULATOR_BASE_READING = initNotebookSimulator;

renderNotebookSimulator = function(question, customResource) {
  if (isS1ReadingSimulatorQuestion(question)) {
    const config = getS1ReadingSimulatorConfig(question);
    return renderS1ReadingGuidedSimulator(question, config);
  }
  return NOTEBOOK_RENDER_SIMULATOR_BASE_READING(question, customResource);
};

initNotebookSimulator = function(question) {
  if (isS1ReadingSimulatorQuestion(question)) {
    initS1ReadingGuidedSimulator(question);
    return;
  }
  NOTEBOOK_INIT_SIMULATOR_BASE_READING(question);
};

/* ==========================================================
   Simuladores dinámicos por pregunta · Sección 2 Inglés
   Preguntas 80 a 134
   Objetivo: enseñar estrategias tipo Saber 11 para vocabulario,
   avisos, conversaciones, cloze y comprensión lectora en inglés.
   ========================================================== */

function isS2EnglishSimulatorQuestion(question) {
  const area = String(question.area || "").toLowerCase();
  return Number(question.session) === 2 &&
    area.includes("inglés") &&
    Number(question.number) >= 80 && Number(question.number) <= 134;
}

function getS2EnglishPart(number) {
  number = Number(number);
  if (number >= 80 && number <= 89) return "matching";
  if (number >= 90 && number <= 94) return "notices";
  if (number >= 95 && number <= 99) return "conversation";
  if (number >= 100 && number <= 107) return "clozeBasic";
  if (number >= 108 && number <= 114) return "readingShort";
  if (number >= 115 && number <= 124) return "readingLong";
  if (number >= 125 && number <= 134) return "clozeAdvanced";
  return "general";
}

function getS2EnglishPartLabel(part) {
  return {
    matching: "Part 1 · Relación definición-palabra",
    notices: "Part 2 · Avisos y lugares",
    conversation: "Part 3 · Conversaciones cortas",
    clozeBasic: "Part 4 · Texto con espacios",
    readingShort: "Part 5 · Comprensión de lectura",
    readingLong: "Part 6 · Comprensión global e inferencial",
    clozeAdvanced: "Part 7 · Uso del lenguaje en contexto",
    general: "Inglés Saber 11"
  }[part] || "Inglés Saber 11";
}

function getS2EnglishProfile(question) {
  const part = getS2EnglishPart(question.number);
  const component = String(question.componente || "").toLowerCase();
  const competence = String(question.competencia || "").toLowerCase();
  const text = `${component} ${competence}`;

  const profiles = {
    matching: {
      icon: "🧩",
      skill: "Vocabulary matching",
      spanishSkill: "Vocabulario por definición",
      keyIdea: "En esta parte no se traduce palabra por palabra: se identifican palabras clave de la descripción y se relacionan con el objeto, lugar o elemento correcto.",
      route: ["Subraya el sustantivo principal de la descripción.", "Busca pistas de lugar, uso o función.", "Descarta palabras que pertenecen al tema pero no cumplen la definición.", "Elige la palabra que responde exactamente a la descripción."],
      correctStrategy: "Relacionar la descripción con la función real del objeto o lugar.",
      wrongStrategyA: "Escoger una palabra solo porque pertenece al mismo tema.",
      wrongStrategyB: "Traducir una palabra aislada sin revisar toda la frase.",
      miniQuestion: "Si una descripción dice: 'You use this to take photos', la pista clave es:",
      miniCorrect: "la función: tomar fotos.",
      miniWrongA: "que sea una palabra larga.",
      miniWrongB: "que aparezca en una lista de turismo."
    },
    notices: {
      icon: "📍",
      skill: "Notices and context",
      spanishSkill: "Avisos y contexto comunicativo",
      keyIdea: "Para ubicar un aviso, piensa dónde tendría sentido verlo. La respuesta no depende solo de una palabra, sino del propósito del mensaje y del lugar donde ese mensaje sería útil.",
      route: ["Lee el aviso como si estuviera pegado en una pared o vitrina.", "Pregunta: ¿qué ofrece, prohíbe o informa?", "Asocia el mensaje con un lugar real.", "Descarta lugares donde el aviso no tendría utilidad."],
      correctStrategy: "Inferir el lugar según el propósito comunicativo del aviso.",
      wrongStrategyA: "Escoger el lugar por una sola palabra suelta.",
      wrongStrategyB: "Elegir el sitio más conocido aunque el aviso no encaje allí.",
      miniQuestion: "Un aviso que vende 'apple pies for birthdays' probablemente aparece en:",
      miniCorrect: "una tienda de pasteles o repostería.",
      miniWrongA: "una biblioteca.",
      miniWrongB: "un taller mecánico."
    },
    conversation: {
      icon: "💬",
      skill: "Short conversations",
      spanishSkill: "Respuesta adecuada en diálogo",
      keyIdea: "En conversaciones cortas debes mantener la lógica del diálogo: la respuesta correcta contesta exactamente la pregunta anterior y conserva el tiempo verbal, la intención y el tono.",
      route: ["Identifica si la primera frase pregunta por razón, lugar, tiempo, opinión o invitación.", "Revisa el tiempo verbal y la intención comunicativa.", "Elige la opción que realmente responde la pregunta.", "Descarta respuestas gramaticales pero incoherentes."],
      correctStrategy: "Responder a la intención comunicativa del hablante anterior.",
      wrongStrategyA: "Elegir una frase correcta en inglés pero que no responde el diálogo.",
      wrongStrategyB: "Ignorar palabras como why, where, when, how o would you like.",
      miniQuestion: "Si la pregunta empieza con 'Why...?', la respuesta debe expresar principalmente:",
      miniCorrect: "una razón o causa.",
      miniWrongA: "un lugar.",
      miniWrongB: "un color."
    },
    clozeBasic: {
      icon: "✍️",
      skill: "Cloze grammar and connectors",
      spanishSkill: "Completar espacios con gramática básica",
      keyIdea: "En textos con espacios, la opción correcta debe encajar gramaticalmente y conservar el sentido global. No basta con que suene familiar: debe funcionar antes y después del espacio.",
      route: ["Lee la oración completa antes del espacio y después del espacio.", "Identifica si falta una preposición, conector, verbo, pronombre o cuantificador.", "Prueba cada opción dentro de la frase.", "Elige la que mantiene gramática y coherencia."],
      correctStrategy: "Probar cada opción en el espacio y verificar gramática + sentido.",
      wrongStrategyA: "Escoger la palabra que más se parece al español.",
      wrongStrategyB: "Mirar solo la palabra anterior y no la oración completa.",
      miniQuestion: "En una frase pasiva como 'was built ____ an emperor', normalmente se usa:",
      miniCorrect: "by, porque indica quién realizó la acción.",
      miniWrongA: "off, porque aparece en muchos phrasal verbs.",
      miniWrongB: "as, porque siempre significa 'como'."
    },
    readingShort: {
      icon: "📖",
      skill: "Reading comprehension",
      spanishSkill: "Comprensión de lectura literal e inferencial",
      keyIdea: "En lectura, primero ubica la evidencia. La respuesta correcta no es la que parece razonable por fuera del texto, sino la que el texto permite comprobar o inferir.",
      route: ["Lee la pregunta y determina si pide dato literal o inferencia.", "Vuelve al párrafo donde aparece la información relacionada.", "Subraya palabras equivalentes, no solo palabras idénticas.", "Descarta opciones que exageran o contradicen el texto."],
      correctStrategy: "Justificar la opción con evidencia del texto.",
      wrongStrategyA: "Responder con opinión personal o conocimiento externo.",
      wrongStrategyB: "Elegir una opción mencionada en el texto pero que no responde la pregunta.",
      miniQuestion: "Una inferencia válida en inglés debe estar apoyada por:",
      miniCorrect: "pistas del texto.",
      miniWrongA: "lo que yo creo del tema.",
      miniWrongB: "una palabra aislada sin contexto."
    },
    readingLong: {
      icon: "🧭",
      skill: "Purpose, main idea and inference",
      spanishSkill: "Propósito, idea principal e inferencia",
      keyIdea: "En textos largos debes reconocer el propósito del autor, la idea global y las inferencias. Las opciones correctas suelen resumir la intención general, no un detalle pequeño.",
      route: ["Lee título y primer párrafo para captar tema y tono.", "Identifica qué postura o propósito sostiene el autor.", "Distingue detalle, idea principal, consejo e inferencia.", "Escoge la opción que representa mejor todo el texto."],
      correctStrategy: "Relacionar pregunta, idea global y evidencia de varios fragmentos.",
      wrongStrategyA: "Elegir un detalle verdadero pero secundario.",
      wrongStrategyB: "Escoger una opción extrema que el autor no afirma.",
      miniQuestion: "Cuando preguntan 'What is the writer trying to do?', debes buscar:",
      miniCorrect: "el propósito comunicativo del texto completo.",
      miniWrongA: "una palabra difícil del último párrafo.",
      miniWrongB: "la fecha en que ocurrió la historia."
    },
    clozeAdvanced: {
      icon: "🧠",
      skill: "Lexical and grammatical cloze",
      spanishSkill: "Uso léxico y gramatical en contexto",
      keyIdea: "En Part 7 cada espacio exige revisar colocaciones, phrasal verbs, conectores, tiempos verbales y sentido textual. La opción correcta debe sonar natural y cumplir una función gramatical precisa.",
      route: ["Lee la oración completa y la oración anterior.", "Identifica si el espacio exige verbo, adjetivo, conector, participio o sustantivo.", "Reconoce expresiones fijas como phrasal verbs o collocations.", "Elige la opción que mantiene naturalidad y coherencia."],
      correctStrategy: "Usar contexto + gramática + expresión natural del inglés.",
      wrongStrategyA: "Traducir literalmente desde el español.",
      wrongStrategyB: "Escoger la palabra que pertenece al campo semántico pero no encaja en la estructura.",
      miniQuestion: "La expresión 'was brought up' significa principalmente:",
      miniCorrect: "fue criada o creció en cierto contexto.",
      miniWrongA: "fue dividida en dos partes.",
      miniWrongB: "fue llenada con objetos."
    },
    general: {
      icon: "🇬🇧",
      skill: "English strategy",
      spanishSkill: "Estrategia general de inglés",
      keyIdea: "La clave es leer con propósito, identificar la función de la pregunta y contrastar las opciones con evidencia lingüística o textual.",
      route: ["Lee el enunciado.", "Identifica la habilidad evaluada.", "Compara opciones.", "Justifica la respuesta."],
      correctStrategy: "Resolver según evidencia y uso del inglés.",
      wrongStrategyA: "Responder por intuición.",
      wrongStrategyB: "Ignorar el contexto.",
      miniQuestion: "Una buena respuesta en inglés debe:",
      miniCorrect: "encajar con el contexto y la gramática.",
      miniWrongA: "sonar parecida al español.",
      miniWrongB: "ser siempre la opción más larga."
    }
  };

  const profile = profiles[part] || profiles.general;
  const customFocus = getS2EnglishCustomFocus(question, part, text);
  return Object.assign({}, profile, customFocus, {
    part,
    partLabel: getS2EnglishPartLabel(part),
    title: `Simulador interactivo · Inglés · Pregunta ${question.number}`,
    challenge: `Entrenamiento guiado para resolver la pregunta ${question.number} de Inglés como en Saber 11: comprender el enunciado, reconocer la habilidad evaluada y justificar la respuesta.`,
    chips: getS2EnglishChips(profile, part),
    strategyChoices: getS2EnglishStrategyChoices(profile),
    miniChoices: [
      { text: profile.miniCorrect, correct: true },
      { text: profile.miniWrongA, correct: false },
      { text: profile.miniWrongB, correct: false }
    ],
    teacherNote: buildS2EnglishTeacherNote(question, profile, part)
  });
}

function getS2EnglishCustomFocus(question, part, text) {
  const n = Number(question.number);
  const comp = String(question.componente || "").toLowerCase();
  if (part === "clozeBasic" || part === "clozeAdvanced") {
    if (comp.includes("voz pasiva") || comp.includes("pasiva")) {
      return {
        miniQuestion: "Si la oración está en voz pasiva, debes preguntar:",
        miniCorrect: "¿quién o qué realiza la acción y qué preposición lo introduce?",
        miniWrongA: "¿cuál palabra se ve más corta?",
        miniWrongB: "¿qué opción aparece primero alfabéticamente?",
        focus: "Voz pasiva y agente de la acción"
      };
    }
    if (comp.includes("prepos")) {
      return {
        miniQuestion: "Para elegir una preposición, lo más importante es revisar:",
        miniCorrect: "la expresión completa y las palabras antes/después del espacio.",
        miniWrongA: "la traducción literal al español siempre.",
        miniWrongB: "solo si la palabra tiene muchas letras.",
        focus: "Preposiciones y expresiones fijas"
      };
    }
    if (comp.includes("conector") || comp.includes("contraste")) {
      return {
        miniQuestion: "Un conector de contraste se usa cuando las ideas:",
        miniCorrect: "oponen o limitan la información anterior.",
        miniWrongA: "repiten exactamente lo mismo.",
        miniWrongB: "no tienen ninguna relación.",
        focus: "Conectores de contraste y coherencia textual"
      };
    }
    if (comp.includes("pronombres relativos")) {
      return {
        miniQuestion: "Un pronombre relativo debe conectar:",
        miniCorrect: "un antecedente con información que lo describe o especifica.",
        miniWrongA: "dos palabras sin relación.",
        miniWrongB: "solo una lista de adjetivos.",
        focus: "Pronombres relativos"
      };
    }
    if (comp.includes("phrasal") || comp.includes("lexical") || comp.includes("léxic")) {
      return {
        miniQuestion: "Para resolver vocabulario en contexto o phrasal verbs conviene:",
        miniCorrect: "probar la expresión completa dentro de la oración.",
        miniWrongA: "traducir cada palabra por separado.",
        miniWrongB: "escoger la palabra más conocida aunque no encaje.",
        focus: "Léxico contextual y expresiones naturales"
      };
    }
  }
  if (part === "readingLong") {
    if (n === 115 || n === 120) return { focus: "Propósito del autor" };
    if (n === 118) return { focus: "Título e idea principal" };
    if (n === 119 || n === 124) return { focus: "Consejo o postura inferida" };
    if (n === 123 || n === 117) return { focus: "Sentido de una expresión en contexto" };
    return { focus: "Comprensión global e inferencias" };
  }
  if (part === "conversation") return { focus: "Coherencia del diálogo" };
  if (part === "notices") return { focus: "Lugar probable del aviso" };
  if (part === "matching") return { focus: "Palabra que corresponde a la descripción" };
  if (part === "readingShort") return { focus: "Evidencia literal e inferencia básica" };
  return { focus: "Uso del inglés en contexto" };
}

function getS2EnglishChips(profile, part) {
  const common = [
    { text: "Leer el enunciado antes de mirar las opciones", correct: true },
    { text: "Buscar evidencia en el texto o en la frase", correct: true },
    { text: "Responder solo porque una opción suena conocida", correct: false },
    { text: "Descartar opciones que no responden exactamente", correct: true }
  ];
  if (part === "matching") {
    return [
      { text: "Identificar la función del objeto o lugar descrito", correct: true },
      { text: "Relacionar palabras clave con la lista de opciones", correct: true },
      { text: "Escoger una palabra solo porque pertenece al mismo tema", correct: false },
      { text: "Comprobar que toda la descripción encaje", correct: true }
    ];
  }
  if (part === "conversation") {
    return [
      { text: "Determinar si la pregunta pide razón, lugar, tiempo u opinión", correct: true },
      { text: "Elegir una respuesta coherente con la intervención anterior", correct: true },
      { text: "Escoger una frase correcta pero sin relación con el diálogo", correct: false },
      { text: "Revisar el tiempo verbal y la intención comunicativa", correct: true }
    ];
  }
  if (part === "clozeBasic" || part === "clozeAdvanced") {
    return [
      { text: "Leer antes y después del espacio", correct: true },
      { text: "Identificar la categoría gramatical que falta", correct: true },
      { text: "Traducir literalmente desde el español", correct: false },
      { text: "Probar cada opción en la oración completa", correct: true }
    ];
  }
  return common;
}

function getS2EnglishStrategyChoices(profile) {
  return [
    { text: profile.correctStrategy, correct: true },
    { text: profile.wrongStrategyA, correct: false },
    { text: profile.wrongStrategyB, correct: false }
  ];
}

function getS2EnglishContextSnippet(question) {
  const resourceText = (question.resources || []).map(resource => {
    if (resource.html) return stripHtml(resource.html);
    if (resource.text) return stripHtml(resource.text);
    if (resource.caption) return stripHtml(resource.caption);
    return "";
  }).join(" ");
  const combined = stripHtml(`${question.stem || ""} ${resourceText}`);
  if (!combined) return "Revisa el texto, aviso, conversación o tabla de opciones que acompaña la pregunta.";
  return combined.length > 520 ? `${combined.slice(0, 520)}...` : combined;
}

function buildS2EnglishTeacherNote(question, profile, part) {
  const cleanExplanation = stripHtml(question.explanation || "");
  const base = `Esta pregunta trabaja ${profile.spanishSkill}. La ruta recomendada es: identificar la tarea, ubicar pistas lingüísticas, comparar opciones y justificar con contexto.`;
  if (cleanExplanation) {
    return `${base} Después de responder, contrasta con la explicación: ${cleanExplanation}${cleanExplanation.length >= 280 ? "..." : ""}`;
  }
  return base;
}

function renderS2EnglishGuidedSimulator(question, config) {
  const options = (question.options || []).map(option => `
    <button class="sim-answer english-final-answer" type="button" data-answer="${escapeHtml(option.letter)}">
      <strong>${escapeHtml(option.letter)}</strong><span>${escapeHtml(option.text)}</span>
    </button>
  `).join("");
  const chips = (config.chips || []).map((chip, index) => `
    <button class="guided-chip english-chip" type="button" data-index="${index}" data-correct="${chip.correct ? "1" : "0"}">${escapeHtml(chip.text)}</button>
  `).join("");
  const strategies = (config.strategyChoices || []).map((choice, index) => `
    <button class="guided-choice english-choice" type="button" data-group="strategy" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");
  const miniChoices = (config.miniChoices || []).map((choice, index) => `
    <button class="guided-choice english-choice" type="button" data-group="mini" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");
  const routeItems = (config.route || []).map(item => `<li>${escapeHtml(item)}</li>`).join("");
  const contextSnippet = getS2EnglishContextSnippet(question);

  return `
    <article class="notebook-card large notebook-simulator-card english-simulator-card" data-question="${Number(question.number)}">
      <p class="eyebrow">${escapeHtml(config.icon)} Simulador · Inglés Saber 11</p>
      <h3>${escapeHtml(config.title)}</h3>
      <p>${escapeHtml(config.challenge)}</p>

      <div class="sim-intro-grid english-intro-grid">
        <section class="sim-mini-board">
          <h4>Tipo de pregunta</h4>
          <p><strong>${escapeHtml(config.partLabel)}</strong></p>
          <p><strong>Foco:</strong> ${escapeHtml(config.focus || config.spanishSkill)}</p>
          <p><strong>Competencia:</strong> ${escapeHtml(question.competencia || "Comprensión en inglés")}</p>
          <p><strong>Componente:</strong> ${escapeHtml(question.componente || config.spanishSkill)}</p>
          <div class="reading-route-box english-route-box">
            <strong>Ruta paso a paso</strong>
            <ol>${routeItems}</ol>
          </div>
        </section>
        <section class="sim-mini-board sim-concept">
          <h4>Contexto de la pregunta</h4>
          <div class="average-formula guided-concept-box english-concept-box">${escapeHtml(config.keyIdea)}</div>
          <p class="sim-context-snippet">${escapeHtml(contextSnippet)}</p>
        </section>
      </div>

      <div class="sim-steps" aria-label="Simulador guiado de Inglés pregunta ${escapeHtml(question.number)}">
        <section class="sim-step active" data-english-step="1">
          <div class="sim-step-head"><span>Paso 1</span><h4>Activa la estrategia correcta</h4></div>
          <p>Selecciona las acciones que sí ayudan a resolver esta pregunta de Inglés.</p>
          <div class="guided-chip-grid" id="englishChipGrid">${chips}</div>
          <button class="secondary-btn" type="button" id="checkEnglishChipsBtn">Verificar estrategia</button>
          <p id="englishChipsFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-english-step="2">
          <div class="sim-step-head"><span>Paso 2</span><h4>Elige cómo resolverla</h4></div>
          <p>¿Cuál de estas rutas se ajusta mejor al tipo de pregunta?</p>
          <div class="guided-choice-grid" id="englishStrategyGrid">${strategies}</div>
          <p id="englishStrategyFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-english-step="3">
          <div class="sim-step-head"><span>Paso 3</span><h4>Microentrenamiento</h4></div>
          <p>${escapeHtml(config.miniQuestion)}</p>
          <div class="guided-choice-grid" id="englishMiniGrid">${miniChoices}</div>
          <p id="englishMiniFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-english-step="4">
          <div class="sim-step-head"><span>Paso 4</span><h4>Responde como en Saber 11</h4></div>
          <p>Elige la opción y revisa la retroalimentación. La meta es justificar, no adivinar.</p>
          <div class="sim-answer-grid guided-answer-grid english-answer-grid" id="englishFinalAnswerGrid">${options}</div>
          <div id="englishFinalFeedback" class="sim-final-feedback" aria-live="polite"></div>
        </section>
      </div>

      <div class="sim-teacher-note"><strong>Nota didáctica:</strong> ${escapeHtml(config.teacherNote)}</div>
    </article>
  `;
}

function initS2EnglishGuidedSimulator(question) {
  const config = getS2EnglishProfile(question);
  if (!config) return;

  const chipGrid = document.getElementById("englishChipGrid");
  const checkChipsBtn = document.getElementById("checkEnglishChipsBtn");
  const chipsFeedback = document.getElementById("englishChipsFeedback");
  const strategyGrid = document.getElementById("englishStrategyGrid");
  const strategyFeedback = document.getElementById("englishStrategyFeedback");
  const miniGrid = document.getElementById("englishMiniGrid");
  const miniFeedback = document.getElementById("englishMiniFeedback");
  const finalGrid = document.getElementById("englishFinalAnswerGrid");
  const finalFeedback = document.getElementById("englishFinalFeedback");

  if (chipGrid) {
    chipGrid.addEventListener("click", event => {
      const button = event.target.closest(".english-chip");
      if (!button) return;
      button.classList.toggle("selected");
      if (chipsFeedback) {
        chipsFeedback.textContent = "Estrategias seleccionadas. Ahora verifica si realmente ayudan a responder con evidencia y contexto.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  if (checkChipsBtn) {
    checkChipsBtn.addEventListener("click", () => {
      const buttons = Array.from(document.querySelectorAll(".english-chip"));
      const wrongSelected = buttons.some(button => button.classList.contains("selected") && button.dataset.correct !== "1");
      const missingCorrect = buttons.some(button => !button.classList.contains("selected") && button.dataset.correct === "1");
      buttons.forEach(button => {
        button.classList.remove("correct", "wrong");
        if (button.classList.contains("selected") && button.dataset.correct === "1") button.classList.add("correct");
        if (button.classList.contains("selected") && button.dataset.correct !== "1") button.classList.add("wrong");
      });
      if (!wrongSelected && !missingCorrect) {
        chipsFeedback.innerHTML = "<strong>Excelente.</strong> Estás usando una estrategia adecuada para Inglés Saber 11: leer, ubicar pistas, comparar y justificar.";
        chipsFeedback.className = "sim-feedback ok";
      } else if (wrongSelected) {
        chipsFeedback.innerHTML = "<strong>Revisa.</strong> Seleccionaste una acción distractora. En Inglés no conviene responder solo por intuición o por palabras sueltas.";
        chipsFeedback.className = "sim-feedback error";
      } else {
        chipsFeedback.innerHTML = "<strong>Vas bien.</strong> Falta una acción clave: comprobar la opción con el contexto completo.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  function bindEnglishChoiceGrid(grid, feedback, correctMessage, errorMessage) {
    if (!grid) return;
    grid.addEventListener("click", event => {
      const button = event.target.closest(".english-choice");
      if (!button) return;
      grid.querySelectorAll(".english-choice").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.correct === "1") {
        button.classList.add("correct");
        if (feedback) {
          feedback.innerHTML = `<strong>Correcto.</strong> ${escapeHtml(correctMessage)}`;
          feedback.className = "sim-feedback ok";
        }
      } else {
        button.classList.add("wrong");
        if (feedback) {
          feedback.innerHTML = `<strong>Revisa.</strong> ${escapeHtml(errorMessage)}`;
          feedback.className = "sim-feedback error";
        }
      }
    });
  }

  bindEnglishChoiceGrid(strategyGrid, strategyFeedback, "La estrategia elegida corresponde al tipo de pregunta de Inglés.", "Esa ruta puede sonar útil, pero no resuelve exactamente la habilidad evaluada por esta pregunta.");
  bindEnglishChoiceGrid(miniGrid, miniFeedback, "El microentrenamiento confirma la habilidad que necesitas aplicar.", "Vuelve a la idea clave y revisa cómo el contexto cambia la respuesta correcta.");

  if (finalGrid) {
    finalGrid.addEventListener("click", event => {
      const button = event.target.closest(".english-final-answer");
      if (!button) return;
      finalGrid.querySelectorAll(".english-final-answer").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.answer === question.correctAnswer) {
        button.classList.add("correct");
        finalFeedback.innerHTML = `<strong>Correcto.</strong> La opción ${escapeHtml(question.correctAnswer)} es adecuada. ${escapeHtml(stripHtml(question.explanation || "La elección coincide con el contexto y la habilidad trabajada en el simulador."))}`;
        finalFeedback.className = "sim-final-feedback ok";
      } else {
        button.classList.add("wrong");
        finalFeedback.innerHTML = `<strong>Revisa tu elección.</strong> Antes de volver a la pregunta, aplica esta ruta: ${escapeHtml(config.correctStrategy)}. Luego compara tu opción con el contexto completo y con la función gramatical o comunicativa evaluada.`;
        finalFeedback.className = "sim-final-feedback error";
      }
    });
  }
}

const NOTEBOOK_RENDER_SIMULATOR_BASE_ENGLISH = renderNotebookSimulator;
const NOTEBOOK_INIT_SIMULATOR_BASE_ENGLISH = initNotebookSimulator;

renderNotebookSimulator = function(question, customResource) {
  if (isS2EnglishSimulatorQuestion(question)) {
    const config = getS2EnglishProfile(question);
    return renderS2EnglishGuidedSimulator(question, config);
  }
  return NOTEBOOK_RENDER_SIMULATOR_BASE_ENGLISH(question, customResource);
};

initNotebookSimulator = function(question) {
  if (isS2EnglishSimulatorQuestion(question)) {
    initS2EnglishGuidedSimulator(question);
    return;
  }
  NOTEBOOK_INIT_SIMULATOR_BASE_ENGLISH(question);
};

/* ==========================================================
   Simuladores dinámicos por pregunta · Sección 1 Sociales y Ciudadanas
   Preguntas 67 a 91
   ========================================================== */

function isS1SocialSimulatorQuestion(question) {
  return Number(question.session) === 1 &&
    String(question.area || "").toLowerCase().includes("sociales") &&
    Number(question.number) >= 67 && Number(question.number) <= 91;
}

function getS1SocialQuestionType(question) {
  const raw = `${question.sourceLabel || ""} ${question.competencia || ""} ${question.componente || ""} ${question.stem || ""} ${question.prompt || ""}`.toLowerCase();
  if (raw.includes("constitución") || raw.includes("constitucional") || raw.includes("derecho") || raw.includes("ley") || raw.includes("norma") || raw.includes("acción de tutela") || raw.includes("participación")) return "norma";
  if (raw.includes("conflicto") || raw.includes("desplaz") || raw.includes("violencia") || raw.includes("acuerdo") || raw.includes("paz") || raw.includes("actor armado") || raw.includes("víctima")) return "conflicto";
  if (raw.includes("mapa") || raw.includes("gráfic") || raw.includes("tabla") || raw.includes("porcentaje") || raw.includes("encuesta") || raw.includes("fuente") || raw.includes("imagen")) return "fuente";
  if (raw.includes("causa") || raw.includes("consecuencia") || raw.includes("proceso") || raw.includes("históric") || raw.includes("siglo") || raw.includes("periodo") || raw.includes("revolución")) return "historico";
  if (raw.includes("punto de vista") || raw.includes("perspectiva") || raw.includes("postura") || raw.includes("opinión") || raw.includes("interés") || raw.includes("argumento")) return "perspectiva";
  return "ciudadania";
}

function getS1SocialProfile(question) {
  const type = getS1SocialQuestionType(question);
  const profiles = {
    norma: {
      icon: "⚖️",
      skill: "Derechos, Constitución y participación ciudadana",
      focus: "Reconocer la norma, el derecho o el mecanismo democrático que mejor protege la situación planteada.",
      keyIdea: "En Sociales y Ciudadanas, las preguntas normativas se resuelven identificando el derecho afectado, el actor responsable y el mecanismo institucional adecuado, no por intuición moral.",
      route: ["Identifica quién actúa o quién es afectado.", "Nombra el derecho, deber o principio democrático involucrado.", "Relaciona la situación con el mecanismo institucional más pertinente.", "Descarta opciones que suenen justas pero no respondan jurídicamente al caso."],
      correctStrategy: "Relacionar situación concreta + derecho/principio + mecanismo institucional.",
      miniQuestion: "Si una persona considera que se vulnera un derecho fundamental, el primer análisis ciudadano debe centrarse en:",
      miniCorrect: "identificar el derecho afectado y el mecanismo que puede protegerlo.",
      miniWrongA: "elegir la opción que parezca más severa, aunque no corresponda al derecho.",
      miniWrongB: "ignorar al actor responsable y responder solo por opinión personal."
    },
    conflicto: {
      icon: "🕊️",
      skill: "Conflicto, actores sociales y construcción de paz",
      focus: "Analizar actores, intereses, efectos sociales y posibles salidas institucionales o democráticas.",
      keyIdea: "Una pregunta sobre conflicto social exige distinguir actores, causas, intereses, población afectada y consecuencias. La respuesta correcta suele equilibrar derechos, diálogo, institucionalidad y contexto.",
      route: ["Ubica el conflicto o problema social.", "Distingue actores e intereses.", "Identifica población afectada y consecuencias.", "Elige la opción que resuelve o interpreta el conflicto sin simplificarlo."],
      correctStrategy: "Analizar actores, intereses, impactos y vías democráticas de solución.",
      miniQuestion: "Ante un conflicto entre grupos sociales, una lectura ciudadana adecuada busca primero:",
      miniCorrect: "identificar actores, intereses y efectos sobre la comunidad.",
      miniWrongA: "culpar de inmediato a un solo actor sin evidencia del enunciado.",
      miniWrongB: "ignorar las consecuencias sociales y mirar solo fechas o nombres."
    },
    fuente: {
      icon: "📊",
      skill: "Lectura crítica de fuentes, tablas, mapas y gráficos",
      focus: "Extraer información verificable de una fuente y relacionarla con el enunciado.",
      keyIdea: "Cuando la pregunta incluye una fuente, no se debe responder desde memoria: se lee el título, las variables, la escala, los datos y la tendencia que la fuente permite justificar.",
      route: ["Lee título, unidades y variables de la fuente.", "Ubica el dato o tendencia que pide la pregunta.", "Compara la fuente con cada opción.", "Descarta opciones que agregan información no demostrada."],
      correctStrategy: "Usar evidencia directa de la fuente antes de interpretar.",
      miniQuestion: "Si una gráfica muestra una tendencia, la mejor respuesta debe:",
      miniCorrect: "describir la tendencia apoyándose en los datos visibles.",
      miniWrongA: "inventar una causa que la gráfica no muestra.",
      miniWrongB: "elegir la opción más larga aunque no coincida con los datos."
    },
    historico: {
      icon: "🏛️",
      skill: "Procesos históricos, causalidad y consecuencias",
      focus: "Comprender relaciones de causa, cambio, continuidad, consecuencia y contexto histórico.",
      keyIdea: "Las preguntas históricas no se resuelven memorizando fechas aisladas. Debes ubicar el proceso, sus causas, sus actores y las consecuencias que se desprenden del contexto.",
      route: ["Identifica el proceso histórico mencionado.", "Diferencia causa, consecuencia, cambio y continuidad.", "Conecta actores con contexto.", "Escoge la opción que mantenga coherencia temporal y causal."],
      correctStrategy: "Relacionar proceso histórico, contexto, actores y consecuencia.",
      miniQuestion: "Una consecuencia histórica se reconoce porque:",
      miniCorrect: "ocurre como resultado de un proceso o hecho anterior.",
      miniWrongA: "aparece antes del hecho que se analiza.",
      miniWrongB: "no guarda relación con el contexto."
    },
    perspectiva: {
      icon: "👥",
      skill: "Perspectivas, intereses y argumentos",
      focus: "Identificar posturas, intereses, tensiones y argumentos de los actores sociales.",
      keyIdea: "Cuando aparecen posturas o actores, se debe preguntar qué interés defiende cada uno, qué evidencia usa y qué relación tiene con la pregunta. No todas las opiniones tienen la misma función en el problema.",
      route: ["Reconoce quién habla o quién actúa.", "Identifica su interés o postura.", "Diferencia hecho, opinión y argumento.", "Elige la opción que represente con precisión esa perspectiva."],
      correctStrategy: "Reconocer actor + interés + argumento o postura.",
      miniQuestion: "Para identificar la postura de un actor social, conviene revisar:",
      miniCorrect: "qué defiende, qué critica y qué razones presenta.",
      miniWrongA: "solo el nombre del actor, sin leer su argumento.",
      miniWrongB: "la opción que coincide con mi opinión personal."
    },
    ciudadania: {
      icon: "🌎",
      skill: "Pensamiento social y competencias ciudadanas",
      focus: "Comprender situaciones sociales, democráticas, económicas, culturales o ambientales desde evidencia y criterio ciudadano.",
      keyIdea: "Una pregunta ciudadana pide analizar el problema, los actores, las reglas, los derechos o las consecuencias. La respuesta correcta es la que se sostiene con el enunciado y no con una opinión rápida.",
      route: ["Define el problema central.", "Identifica actores, contexto y consecuencias.", "Relaciona el caso con principios ciudadanos o sociales.", "Compara cada opción con la información dada."],
      correctStrategy: "Leer el caso, reconocer actores y justificar con evidencia del enunciado.",
      miniQuestion: "En una situación ciudadana, responder bien implica:",
      miniCorrect: "usar la información del caso para justificar la decisión.",
      miniWrongA: "escoger la opción que suene más bonita sin evidencia.",
      miniWrongB: "ignorar actores y consecuencias."
    }
  };
  const profile = profiles[type] || profiles.ciudadania;
  return {
    type,
    icon: profile.icon,
    title: `Simulador interactivo · Sociales y Ciudadanas · Pregunta ${question.number}`,
    challenge: `Entrena paso a paso cómo resolver esta pregunta de ${profile.skill.toLowerCase()} al estilo Saber 11.` ,
    skill: profile.skill,
    focus: profile.focus,
    keyIdea: profile.keyIdea,
    route: profile.route,
    correctStrategy: profile.correctStrategy,
    miniQuestion: profile.miniQuestion,
    miniChoices: [
      { text: profile.miniCorrect, correct: true },
      { text: profile.miniWrongA, correct: false },
      { text: profile.miniWrongB, correct: false }
    ],
    chips: buildS1SocialChips(question, type),
    strategyChoices: buildS1SocialStrategyChoices(profile, type),
    teacherNote: buildS1SocialTeacherNote(question, profile)
  };
}

function buildS1SocialChips(question, type) {
  const base = [
    { text: "Leer la situación completa antes de mirar las opciones", correct: true },
    { text: "Identificar actores, contexto y problema central", correct: true },
    { text: "Justificar la opción con evidencia del enunciado", correct: true }
  ];
  const extras = {
    norma: { text: "Relacionar el caso con derechos, deberes o mecanismos constitucionales", correct: true },
    conflicto: { text: "Reconocer intereses y consecuencias para la comunidad", correct: true },
    fuente: { text: "Revisar título, variables, datos y tendencia de la fuente", correct: true },
    historico: { text: "Ubicar causa, consecuencia, cambio o continuidad histórica", correct: true },
    perspectiva: { text: "Distinguir postura, interés y argumento de cada actor", correct: true },
    ciudadania: { text: "Relacionar el caso con participación, convivencia o decisión pública", correct: true }
  };
  const distractors = [
    { text: "Responder solo por opinión personal", correct: false },
    { text: "Elegir la opción más larga sin verificarla", correct: false },
    { text: "Ignorar los actores y quedarse con una palabra suelta", correct: false }
  ];
  return [base[0], base[1], extras[type] || extras.ciudadania, base[2], distractors[Number(question.number) % distractors.length]];
}

function buildS1SocialStrategyChoices(profile, type) {
  const wrongByType = {
    norma: "Responder por castigo o simpatía, sin relacionar el caso con el derecho o mecanismo adecuado.",
    conflicto: "Reducir el conflicto a un solo culpable sin revisar intereses, causas y afectados.",
    fuente: "Interpretar la fuente sin mirar unidades, variables o datos visibles.",
    historico: "Memorizar una fecha aislada y no revisar la relación causal del proceso.",
    perspectiva: "Confundir la postura del actor con mi opinión personal.",
    ciudadania: "Elegir una respuesta moralmente agradable pero sin soporte en el caso."
  };
  return [
    { text: profile.correctStrategy, correct: true },
    { text: wrongByType[type] || wrongByType.ciudadania, correct: false },
    { text: "Descartar opciones al azar sin volver al enunciado.", correct: false }
  ];
}

function buildS1SocialTeacherNote(question, profile) {
  const component = question.componente || "competencias ciudadanas";
  return `Esta pregunta fortalece ${profile.skill}. En Saber 11 conviene leer el caso como evidencia, reconocer el componente ${component} y elegir la opción que mejor explique la situación, no la que parezca correcta por intuición.`;
}

function getS1SocialContextSnippet(question) {
  const text = stripHtml(`${question.stem || ""} ${question.prompt || ""}`);
  if (!text) return "Lee el caso y ubica los actores, el problema y la acción ciudadana o social que se evalúa.";
  return text.length > 340 ? `${text.slice(0, 340)}...` : text;
}

function renderS1SocialGuidedSimulator(question, config) {
  const options = (question.options || []).map(option => `
    <button class="sim-answer guided-final-answer social-final-answer" type="button" data-answer="${escapeHtml(option.letter)}">
      <strong>${escapeHtml(option.letter)}</strong><span>${escapeHtml(stripHtml(option.text))}</span>
    </button>
  `).join("");
  const chips = (config.chips || []).map((chip, index) => `
    <button class="guided-chip social-chip" type="button" data-index="${index}" data-correct="${chip.correct ? "1" : "0"}">${escapeHtml(chip.text)}</button>
  `).join("");
  const strategies = (config.strategyChoices || []).map((choice, index) => `
    <button class="guided-choice social-choice" type="button" data-group="strategy" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");
  const miniChoices = (config.miniChoices || []).map((choice, index) => `
    <button class="guided-choice social-choice" type="button" data-group="mini" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");
  const routeItems = (config.route || []).map(item => `<li>${escapeHtml(item)}</li>`).join("");
  const contextSnippet = getS1SocialContextSnippet(question);

  return `
    <article class="notebook-card large notebook-simulator-card social-simulator-card" data-question="${Number(question.number)}">
      <p class="eyebrow">${escapeHtml(config.icon)} Simulador · Sociales y Ciudadanas Saber 11</p>
      <h3>${escapeHtml(config.title)}</h3>
      <p>${escapeHtml(config.challenge)}</p>

      <div class="sim-intro-grid social-intro-grid">
        <section class="sim-mini-board">
          <h4>Tipo de razonamiento</h4>
          <p><strong>${escapeHtml(config.skill)}</strong></p>
          <p><strong>Foco:</strong> ${escapeHtml(config.focus)}</p>
          <p><strong>Competencia:</strong> ${escapeHtml(question.competencia || "Pensamiento social")}</p>
          <p><strong>Componente:</strong> ${escapeHtml(question.componente || "Contexto social y ciudadano")}</p>
          <div class="reading-route-box social-route-box">
            <strong>Ruta paso a paso</strong>
            <ol>${routeItems}</ol>
          </div>
        </section>
        <section class="sim-mini-board sim-concept">
          <h4>Contexto de la pregunta</h4>
          <div class="average-formula guided-concept-box social-concept-box">${escapeHtml(config.keyIdea)}</div>
          <p class="sim-context-snippet">${escapeHtml(contextSnippet)}</p>
        </section>
      </div>

      <div class="sim-steps" aria-label="Simulador guiado de Sociales y Ciudadanas pregunta ${escapeHtml(question.number)}">
        <section class="sim-step active" data-social-step="1">
          <div class="sim-step-head"><span>Paso 1</span><h4>Detecta las claves ciudadanas</h4></div>
          <p>Selecciona las acciones que sí ayudan a resolver esta pregunta. Evita responder solo por intuición.</p>
          <div class="guided-chip-grid" id="socialChipGrid">${chips}</div>
          <button class="secondary-btn" type="button" id="checkSocialChipsBtn">Verificar claves</button>
          <p id="socialChipsFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-social-step="2">
          <div class="sim-step-head"><span>Paso 2</span><h4>Elige la estrategia de análisis</h4></div>
          <p>¿Cuál ruta se ajusta mejor al tipo de pregunta?</p>
          <div class="guided-choice-grid" id="socialStrategyGrid">${strategies}</div>
          <p id="socialStrategyFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-social-step="3">
          <div class="sim-step-head"><span>Paso 3</span><h4>Microentrenamiento ciudadano</h4></div>
          <p>${escapeHtml(config.miniQuestion)}</p>
          <div class="guided-choice-grid" id="socialMiniGrid">${miniChoices}</div>
          <p id="socialMiniFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-social-step="4">
          <div class="sim-step-head"><span>Paso 4</span><h4>Responde como en Saber 11</h4></div>
          <p>Elige una opción y revisa la retroalimentación. La meta es justificar con el caso, la fuente o el concepto ciudadano.</p>
          <div class="sim-answer-grid guided-answer-grid social-answer-grid" id="socialFinalAnswerGrid">${options}</div>
          <div id="socialFinalFeedback" class="sim-final-feedback" aria-live="polite"></div>
        </section>
      </div>

      <div class="sim-teacher-note"><strong>Nota didáctica:</strong> ${escapeHtml(config.teacherNote)}</div>
    </article>
  `;
}

function initS1SocialGuidedSimulator(question) {
  const config = getS1SocialProfile(question);
  if (!config) return;

  const chipGrid = document.getElementById("socialChipGrid");
  const checkChipsBtn = document.getElementById("checkSocialChipsBtn");
  const chipsFeedback = document.getElementById("socialChipsFeedback");
  const strategyGrid = document.getElementById("socialStrategyGrid");
  const strategyFeedback = document.getElementById("socialStrategyFeedback");
  const miniGrid = document.getElementById("socialMiniGrid");
  const miniFeedback = document.getElementById("socialMiniFeedback");
  const finalGrid = document.getElementById("socialFinalAnswerGrid");
  const finalFeedback = document.getElementById("socialFinalFeedback");

  if (chipGrid) {
    chipGrid.addEventListener("click", event => {
      const button = event.target.closest(".social-chip");
      if (!button) return;
      button.classList.toggle("selected");
      if (chipsFeedback) {
        chipsFeedback.textContent = "Claves seleccionadas. Ahora verifica si realmente ayudan a analizar el caso social o ciudadano.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  if (checkChipsBtn) {
    checkChipsBtn.addEventListener("click", () => {
      const buttons = Array.from(document.querySelectorAll(".social-chip"));
      const wrongSelected = buttons.some(button => button.classList.contains("selected") && button.dataset.correct !== "1");
      const missingCorrect = buttons.some(button => !button.classList.contains("selected") && button.dataset.correct === "1");
      buttons.forEach(button => {
        button.classList.remove("correct", "wrong");
        if (button.classList.contains("selected") && button.dataset.correct === "1") button.classList.add("correct");
        if (button.classList.contains("selected") && button.dataset.correct !== "1") button.classList.add("wrong");
      });
      if (!wrongSelected && !missingCorrect) {
        chipsFeedback.innerHTML = "<strong>Excelente.</strong> Identificaste las claves necesarias: caso, actores, contexto y evidencia. Esa es la base de Sociales y Ciudadanas en Saber 11.";
        chipsFeedback.className = "sim-feedback ok";
      } else if (wrongSelected) {
        chipsFeedback.innerHTML = "<strong>Revisa.</strong> Seleccionaste una acción distractora. En Sociales y Ciudadanas no se responde solo por opinión, sino con evidencia del caso.";
        chipsFeedback.className = "sim-feedback error";
      } else {
        chipsFeedback.innerHTML = "<strong>Vas bien.</strong> Falta seleccionar una clave importante para justificar la respuesta.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  function bindSocialChoiceGrid(grid, feedback, correctMessage, errorMessage) {
    if (!grid) return;
    grid.addEventListener("click", event => {
      const button = event.target.closest(".social-choice");
      if (!button) return;
      grid.querySelectorAll(".social-choice").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.correct === "1") {
        button.classList.add("correct");
        if (feedback) {
          feedback.innerHTML = `<strong>Correcto.</strong> ${escapeHtml(correctMessage)}`;
          feedback.className = "sim-feedback ok";
        }
      } else {
        button.classList.add("wrong");
        if (feedback) {
          feedback.innerHTML = `<strong>Revisa.</strong> ${escapeHtml(errorMessage)}`;
          feedback.className = "sim-feedback error";
        }
      }
    });
  }

  bindSocialChoiceGrid(strategyGrid, strategyFeedback, "La estrategia corresponde al tipo de análisis ciudadano que exige la pregunta.", "Esa ruta no responde exactamente al caso. Vuelve a identificar actores, contexto, fuente o principio ciudadano.");
  bindSocialChoiceGrid(miniGrid, miniFeedback, "El microentrenamiento confirma la habilidad que debes aplicar antes de elegir la opción final.", "Revisa la idea clave y evita responder por intuición o por palabras aisladas.");

  if (finalGrid) {
    finalGrid.addEventListener("click", event => {
      const button = event.target.closest(".social-final-answer");
      if (!button) return;
      finalGrid.querySelectorAll(".social-final-answer").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.answer === question.correctAnswer) {
        button.classList.add("correct");
        finalFeedback.innerHTML = `<strong>Correcto.</strong> La opción ${escapeHtml(question.correctAnswer)} es adecuada. ${escapeHtml(stripHtml(question.explanation || "La elección coincide con el caso y la habilidad ciudadana trabajada en el simulador."))}`;
        finalFeedback.className = "sim-final-feedback ok";
      } else {
        button.classList.add("wrong");
        finalFeedback.innerHTML = `<strong>Revisa tu elección.</strong> Antes de volver a la pregunta, aplica esta ruta: ${escapeHtml(config.correctStrategy)} Después compara tu opción con el caso, la fuente y los actores involucrados.`;
        finalFeedback.className = "sim-final-feedback error";
      }
    });
  }
}

const NOTEBOOK_RENDER_SIMULATOR_BASE_SOCIAL = renderNotebookSimulator;
const NOTEBOOK_INIT_SIMULATOR_BASE_SOCIAL = initNotebookSimulator;

renderNotebookSimulator = function(question, customResource) {
  if (isS1SocialSimulatorQuestion(question)) {
    const config = getS1SocialProfile(question);
    return renderS1SocialGuidedSimulator(question, config);
  }
  return NOTEBOOK_RENDER_SIMULATOR_BASE_SOCIAL(question, customResource);
};

initNotebookSimulator = function(question) {
  if (isS1SocialSimulatorQuestion(question)) {
    initS1SocialGuidedSimulator(question);
    return;
  }
  NOTEBOOK_INIT_SIMULATOR_BASE_SOCIAL(question);
};

/* ==========================================================
   Simuladores dinámicos por pregunta · Sección 2 Sociales y Ciudadanas
   Preguntas 1 a 28
   ========================================================== */

function isS2SocialSimulatorQuestion(question) {
  return Number(question.session) === 2 &&
    String(question.area || "").toLowerCase().includes("sociales") &&
    Number(question.number) >= 1 && Number(question.number) <= 28;
}

function getS2SocialProfile(question) {
  const number = Number(question.number);
  const base = getS2SocialBaseProfile(question);
  const custom = getS2SocialQuestionProfiles()[number] || {};
  const merged = { ...base, ...custom };
  return {
    type: merged.type || base.type,
    icon: merged.icon || base.icon,
    title: merged.title || `Simulador interactivo · Sección 2 · Sociales y Ciudadanas · Pregunta ${question.number}`,
    challenge: merged.challenge || `Entrena paso a paso cómo resolver esta pregunta de ${String(merged.skill || "pensamiento social").toLowerCase()} al estilo Saber 11.`,
    skill: merged.skill || base.skill,
    focus: merged.focus || base.focus,
    keyIdea: merged.keyIdea || base.keyIdea,
    route: merged.route || base.route,
    correctStrategy: merged.correctStrategy || base.correctStrategy,
    miniQuestion: merged.miniQuestion || base.miniQuestion,
    miniChoices: merged.miniChoices || base.miniChoices,
    chips: merged.chips || buildS2SocialChips(question, merged),
    strategyChoices: merged.strategyChoices || buildS2SocialStrategyChoices(merged),
    teacherNote: merged.teacherNote || buildS2SocialTeacherNote(question, merged)
  };
}

function getS2SocialBaseProfile(question) {
  const raw = `${question.competencia || ""} ${question.componente || ""} ${question.stem || ""} ${question.prompt || ""}`.toLowerCase();
  let type = "ciudadania";
  if (raw.includes("constitución") || raw.includes("derecho") || raw.includes("ley") || raw.includes("reforma constitucional") || raw.includes("servicios públicos") || raw.includes("manual")) type = "norma";
  if (raw.includes("prejuicio") || raw.includes("discriminación") || raw.includes("homofobia") || raw.includes("xenofobia") || raw.includes("misoginia") || raw.includes("diversidad") || raw.includes("migrantes")) type = "discriminacion";
  if (raw.includes("ambient") || raw.includes("cambio climático") || raw.includes("desarrollo sostenible") || raw.includes("páramo") || raw.includes("biodiversidad") || raw.includes("pez león") || raw.includes("pesca")) type = "ambiental";
  if (raw.includes("postura") || raw.includes("argumento") || raw.includes("intención") || raw.includes("perspectiva") || raw.includes("contradiciendo") || raw.includes("posición política")) type = "perspectiva";
  if (raw.includes("historia") || raw.includes("estado de sitio") || raw.includes("gaitán") || raw.includes("segunda guerra") || raw.includes("maya") || raw.includes("guetos")) type = "historico";
  if (raw.includes("política pública") || raw.includes("programa") || raw.includes("equidad") || raw.includes("brecha digital") || raw.includes("educación superior")) type = "politica";
  if (raw.includes("fuente") || raw.includes("noticia") || raw.includes("fragmento") || raw.includes("discurso")) type = type === "ciudadania" ? "fuente" : type;

  const profiles = {
    ambiental: {
      icon: "🌱",
      skill: "desarrollo sostenible, ambiente y derechos colectivos",
      focus: "distinguir la evidencia ambiental, los actores afectados y el equilibrio entre economía, derechos y conservación.",
      keyIdea: "En preguntas socioambientales la respuesta correcta se sostiene con el impacto sobre comunidades, recursos y ecosistemas. No basta con escoger la opción que prometa crecimiento económico: hay que evaluar efectos y sostenibilidad.",
      route: ["Ubica el recurso o ecosistema afectado.", "Reconoce actores beneficiados y afectados.", "Distingue efecto deseado y efecto no deseado.", "Elige la opción compatible con sostenibilidad y derechos colectivos."],
      correctStrategy: "Relacionar evidencia ambiental + actores afectados + efecto social o ecológico.",
      miniQuestion: "Cuando una pregunta menciona desarrollo sostenible, la opción más sólida debe equilibrar:",
      miniChoices: [
        { text: "bienestar social, actividad económica y protección de recursos naturales.", correct: true },
        { text: "crecimiento económico inmediato, aunque se agoten los recursos.", correct: false },
        { text: "prohibición de toda actividad humana sin mirar el contexto social.", correct: false }
      ]
    },
    norma: {
      icon: "⚖️",
      skill: "Constitución, derechos y mecanismos democráticos",
      focus: "identificar el derecho, principio constitucional o institución que corresponde al caso.",
      keyIdea: "Las preguntas constitucionales exigen conectar el caso con derechos, deberes, competencias institucionales y principios democráticos. La opción correcta debe estar justificada por la norma y no por una intuición personal.",
      route: ["Identifica el derecho o principio involucrado.", "Reconoce qué actor o institución tiene competencia.", "Contrasta cada opción con la Constitución o el caso.", "Descarta opciones populares pero jurídicamente incorrectas."],
      correctStrategy: "Relacionar caso concreto + derecho o principio + competencia institucional.",
      miniQuestion: "Si una propuesta requiere reformar la Constitución, primero se debe revisar:",
      miniChoices: [
        { text: "qué órgano tiene la competencia para tramitar reformas constitucionales.", correct: true },
        { text: "si la propuesta es popular en redes sociales.", correct: false },
        { text: "si el presidente puede cambiar la Constitución por voluntad propia.", correct: false }
      ]
    },
    discriminacion: {
      icon: "🤝",
      skill: "diversidad, prejuicios e inclusión",
      focus: "reconocer estereotipos, prejuicios, exclusiones y formas de discriminación en situaciones cotidianas.",
      keyIdea: "Para resolver preguntas de discriminación se debe identificar qué grupo es afectado, qué prejuicio aparece y qué derecho o principio de igualdad se compromete. La respuesta correcta nombra la exclusión con precisión.",
      route: ["Identifica el grupo o persona afectada.", "Ubica la frase o acción discriminatoria.", "Distingue prejuicio, estereotipo y derecho vulnerado.", "Elige la opción que define o cuestiona mejor la exclusión."],
      correctStrategy: "Reconocer grupo afectado + prejuicio específico + principio de igualdad o diversidad.",
      miniQuestion: "Un prejuicio se reconoce cuando una afirmación:",
      miniChoices: [
        { text: "atribuye características o responsabilidades a un grupo sin evidencia individual.", correct: true },
        { text: "describe una situación usando información verificable del caso.", correct: false },
        { text: "propone escuchar a todas las partes antes de decidir.", correct: false }
      ]
    },
    perspectiva: {
      icon: "👥",
      skill: "interpretación de perspectivas, intereses y argumentos",
      focus: "identificar la postura de un actor, sus razones, sus intereses y las tensiones con otros actores.",
      keyIdea: "Cuando la pregunta compara posiciones, se debe revisar quién habla, desde qué lugar político o social lo hace, qué defiende y qué razones usa. No se responde con opinión propia, sino con la perspectiva del actor.",
      route: ["Reconoce el actor que habla o actúa.", "Identifica su postura e interés.", "Diferencia hecho, opinión y argumento.", "Elige la opción que explica mejor la diferencia o intención."],
      correctStrategy: "Analizar actor + posición + interés + argumento usado.",
      miniQuestion: "Para explicar un cambio de postura política, conviene comparar:",
      miniChoices: [
        { text: "el cargo, el contexto y los intereses del actor en cada momento.", correct: true },
        { text: "solo el nombre del político y su popularidad.", correct: false },
        { text: "la opción que coincida con mi preferencia política.", correct: false }
      ]
    },
    historico: {
      icon: "🏛️",
      skill: "procesos históricos, causalidad y contexto",
      focus: "relacionar hechos, discursos, instituciones y consecuencias dentro de su contexto histórico.",
      keyIdea: "Las preguntas históricas se resuelven ubicando tiempo, actores, causas y consecuencias. La respuesta debe ser coherente con el contexto y no mezclar periodos o procesos distintos.",
      route: ["Ubica el periodo o proceso histórico.", "Reconoce actores e instituciones.", "Distingue causa, intención, consecuencia o evidencia.", "Descarta opciones anacrónicas o fuera de contexto."],
      correctStrategy: "Relacionar hecho histórico + contexto + intención o consecuencia.",
      miniQuestion: "Una opción anacrónica se descarta porque:",
      miniChoices: [
        { text: "mezcla hechos o instituciones que pertenecen a otro momento histórico.", correct: true },
        { text: "usa palabras complejas relacionadas con política.", correct: false },
        { text: "menciona un actor social importante.", correct: false }
      ]
    },
    politica: {
      icon: "📌",
      skill: "política pública, equidad y análisis de programas",
      focus: "evaluar si una medida pública reconoce las condiciones reales de la población a la que busca beneficiar.",
      keyIdea: "Una política pública puede tener una intención positiva y aun así fallar si ignora barreras de acceso, desigualdades territoriales, brechas educativas o condiciones socioeconómicas.",
      route: ["Identifica el objetivo del programa.", "Reconoce quiénes deberían beneficiarse.", "Detecta barreras de acceso o factores omitidos.", "Elige la opción que muestra la desigualdad pasada por alto."],
      correctStrategy: "Comparar objetivo del programa + condiciones reales de la población beneficiaria.",
      miniQuestion: "Un programa de equidad debe revisar especialmente:",
      miniChoices: [
        { text: "si todos los beneficiarios tienen condiciones reales para acceder al beneficio.", correct: true },
        { text: "si exige más requisitos para excluir a quienes tienen menos recursos.", correct: false },
        { text: "si solo favorece a quienes ya tienen mejores oportunidades.", correct: false }
      ]
    },
    fuente: {
      icon: "📰",
      skill: "lectura de fuentes, noticias y discursos",
      focus: "extraer evidencia del texto, noticia, discurso o fragmento antes de escoger una opción.",
      keyIdea: "Cuando la pregunta usa una fuente, la respuesta se justifica con información explícita o inferible de esa fuente. No se deben agregar datos externos que el texto no permite sostener.",
      route: ["Lee la fuente y ubica su idea central.", "Subraya la evidencia relevante.", "Compara la evidencia con cada opción.", "Descarta opciones que no se puedan probar con la fuente."],
      correctStrategy: "Usar evidencia textual o visual de la fuente para justificar la respuesta.",
      miniQuestion: "Una buena lectura de fuente consiste en:",
      miniChoices: [
        { text: "apoyar la respuesta en la información que la fuente realmente muestra.", correct: true },
        { text: "inventar causas que la fuente no menciona.", correct: false },
        { text: "escoger la opción más extensa sin contrastarla.", correct: false }
      ]
    },
    ciudadania: {
      icon: "🌎",
      skill: "pensamiento social y competencias ciudadanas",
      focus: "comprender situaciones sociales con evidencia, actores, consecuencias y principios democráticos.",
      keyIdea: "En Sociales y Ciudadanas la respuesta correcta se construye conectando el caso con actores, contextos, derechos, intereses y consecuencias. La intuición no reemplaza la evidencia del enunciado.",
      route: ["Define el problema central.", "Identifica actores y consecuencias.", "Relaciona el caso con un principio social o ciudadano.", "Compara opciones con la evidencia del enunciado."],
      correctStrategy: "Leer el caso, identificar actores y justificar con evidencia.",
      miniQuestion: "Para resolver una situación ciudadana se debe priorizar:",
      miniChoices: [
        { text: "la información del caso y su relación con derechos, actores o consecuencias.", correct: true },
        { text: "la respuesta que suene más fuerte aunque no tenga evidencia.", correct: false },
        { text: "una palabra aislada del enunciado sin leer el contexto.", correct: false }
      ]
    }
  };
  return { type, ...(profiles[type] || profiles.ciudadania) };
}

function getS2SocialQuestionProfiles() {
  return {
    1: {
      icon: "🌍",
      skill: "cambio climático y evidencia para sustentar reclamos públicos",
      focus: "buscar el hecho que se relaciona directamente con reducción de emisiones y políticas climáticas concretas.",
      keyIdea: "La pregunta no pide una noticia positiva cualquiera; pide un hecho que sustente el reclamo por políticas contra el cambio climático. Por eso se debe elegir evidencia directamente conectada con emisiones, carbón o transición energética.",
      route: ["Lee qué reclama la joven: políticas climáticas concretas.", "Busca opciones relacionadas con emisiones y energía.", "Descarta pobreza, comercio o tecnología sin conexión directa suficiente.", "Elige el hecho que prueba que las políticas pueden reducir CO₂."],
      correctStrategy: "Relacionar reclamo climático + evidencia directa de reducción de emisiones.",
      miniQuestion: "¿Qué tipo de hecho sustenta mejor una exigencia de políticas contra el cambio climático?",
      miniChoices: [
        { text: "un dato que muestre reducción de CO₂ por cierre de plantas de carbón o política energética.", correct: true },
        { text: "un aumento de ventas que no prueba reducción efectiva de emisiones.", correct: false },
        { text: "un dato de pobreza que pertenece a otro problema social.", correct: false }
      ]
    },
    2: {
      icon: "⚖️",
      skill: "Constitución de 1991 y diversidad étnica",
      focus: "contrastar el lenguaje de una ley antigua con el reconocimiento constitucional de la diversidad étnica y cultural.",
      keyIdea: "La Constitución de 1991 reconoce la diversidad étnica y cultural. Por eso expresiones como 'reducción' o 'civilización' de pueblos indígenas evidencian una visión anterior y contraria a ese principio.",
      route: ["Identifica el lenguaje usado por la ley.", "Recuerda el principio de diversidad étnica de 1991.", "Compara si la ley reconoce o desvaloriza a los pueblos indígenas.", "Elige la opción que explique la contradicción con la Constitución."],
      correctStrategy: "Contrastar lenguaje de la norma antigua con reconocimiento constitucional de diversidad étnica.",
      miniQuestion: "Una ley anterior a 1991 puede reconocerse si trata a los pueblos indígenas como:",
      miniChoices: [
        { text: "poblaciones que deben ser 'civilizadas', en lugar de culturas con derechos y autonomía.", correct: true },
        { text: "sujetos de especial protección y diversidad cultural.", correct: false },
        { text: "comunidades que participan mediante consulta previa reconocida constitucionalmente.", correct: false }
      ]
    },
    3: {
      icon: "👩‍👦",
      skill: "prejuicios y roles de género",
      focus: "detectar si una afirmación asigna de manera exclusiva a las madres la formación moral de los hijos.",
      keyIdea: "Un prejuicio aparece cuando se atribuye a un grupo una responsabilidad fija y exclusiva. En este caso, asociar la formación de los hijos únicamente con las madres reproduce un rol de género estereotipado.",
      route: ["Ubica quién es responsabilizado en la afirmación.", "Pregunta si la responsabilidad se asigna de forma exclusiva.", "Identifica el estereotipo de género.", "Escoge la opción que nombre el prejuicio."],
      correctStrategy: "Reconocer estereotipo de género + responsabilidad asignada sin evidencia.",
      miniQuestion: "¿Por qué una frase puede contener prejuicio de género?",
      miniChoices: [
        { text: "porque atribuye a las madres una responsabilidad exclusiva por la formación de los hijos.", correct: true },
        { text: "porque menciona a la familia como espacio de socialización.", correct: false },
        { text: "porque reconoce que los niños aprenden desde edades tempranas.", correct: false }
      ]
    },
    4: {
      icon: "🏳️‍🌈",
      skill: "movimientos sociales y transformación cultural",
      focus: "inferir la postura de una persona que participa en una manifestación por diversidad sexual.",
      keyIdea: "Si una persona se manifiesta para cambiar condiciones culturales arraigadas, probablemente cree que la acción colectiva puede transformar normas sociales y prejuicios.",
      route: ["Identifica el motivo de la manifestación.", "Reconoce qué cambio social se busca.", "Distingue una postura transformadora de una postura tradicionalista.", "Elige la opción que exprese agencia social."],
      correctStrategy: "Inferir postura a partir de motivo de protesta + objetivo de transformación social.",
      miniQuestion: "Una postura coherente con un movimiento social transformador afirma que:",
      miniChoices: [
        { text: "las personas pueden cambiar condiciones sociales arraigadas mediante acción colectiva.", correct: true },
        { text: "las tradiciones siempre deben mantenerse sin discusión.", correct: false },
        { text: "las manifestaciones son innecesarias porque la sociedad ya no tiene prejuicios.", correct: false }
      ]
    },
    5: {
      icon: "♿",
      skill: "inclusión laboral, discapacidad y prejuicios",
      focus: "identificar una visión que culpa a la persona con discapacidad en lugar de reconocer barreras sociales o de infraestructura.",
      keyIdea: "Un prejuicio sobre discapacidad aparece cuando se reduce la exclusión a actitudes personales, ignorando barreras físicas, sociales e institucionales que limitan la participación laboral.",
      route: ["Lee qué solicita la población afectada: ajustes razonables.", "Distingue barrera estructural y juicio personal.", "Ubica la frase que culpa a la persona por su situación.", "Elige el enunciado prejuicioso."],
      correctStrategy: "Diferenciar barreras de inclusión de afirmaciones que culpan a la persona con discapacidad.",
      miniQuestion: "Una mirada inclusiva de la discapacidad reconoce principalmente:",
      miniChoices: [
        { text: "barreras sociales, laborales y de infraestructura que deben ser ajustadas.", correct: true },
        { text: "que la discapacidad se supera solo con actitud individual.", correct: false },
        { text: "que la empresa nunca debe adaptar sus espacios.", correct: false }
      ]
    },
    6: {
      icon: "🎣",
      skill: "conflictos socioambientales y efectos de una solución",
      focus: "detectar qué circunstancia contradice o debilita el acuerdo entre pesca industrial y comunidad local.",
      keyIdea: "Una solución puede fracasar si los actores aprovechan el acuerdo para intensificar la presión sobre el ecosistema. La clave es evaluar consecuencias reales, no solo la existencia del acuerdo.",
      route: ["Identifica el objetivo del acuerdo.", "Ubica qué acción aumenta la presión sobre el recurso.", "Distingue apoyo al acuerdo de obstáculo al acuerdo.", "Elige la circunstancia que dificulta el éxito."],
      correctStrategy: "Evaluar si una circunstancia fortalece o contradice el objetivo de la solución acordada.",
      miniQuestion: "Un acuerdo ambiental puede fallar cuando:",
      miniChoices: [
        { text: "una parte usa los tiempos permitidos para aumentar al máximo la explotación.", correct: true },
        { text: "se involucran organizaciones científicas para verificar impactos.", correct: false },
        { text: "se ofrecen alternativas económicas a la comunidad afectada.", correct: false }
      ]
    },
    7: {
      icon: "🗳️",
      skill: "partidos políticos y democracia representativa",
      focus: "comprender por qué la Constitución protege la creación y afiliación a partidos políticos.",
      keyIdea: "Los partidos permiten organizar intereses, representar ciudadanos y participar en decisiones públicas. No son órganos judiciales ni instrumentos de censura de la oposición.",
      route: ["Identifica el derecho constitucional mencionado.", "Relaciona partidos con representación y participación.", "Descarta opciones autoritarias o clientelistas.", "Elige la función democrática."],
      correctStrategy: "Relacionar partidos políticos con participación ciudadana y representación democrática.",
      miniQuestion: "La función democrática central de los partidos políticos es:",
      miniChoices: [
        { text: "canalizar la participación de los ciudadanos en decisiones públicas.", correct: true },
        { text: "administrar justicia entre ciudadanos.", correct: false },
        { text: "censurar las iniciativas de la oposición.", correct: false }
      ]
    },
    8: {
      icon: "💧",
      skill: "derechos y acceso al agua potable",
      focus: "identificar el derecho vulnerado cuando una comunidad no tiene acceso universal y adecuado al agua potable.",
      keyIdea: "Aunque el caso menciona recursos naturales y vegetación, la afectación central descrita es que la población no cuenta con agua potable suficiente y adecuada.",
      route: ["Ubica la necesidad básica afectada.", "Diferencia ambiente sano de acceso al servicio de agua potable.", "Relaciona el caso con el derecho específico.", "Elige la vulneración central."],
      correctStrategy: "Identificar la necesidad afectada de forma directa: acceso al agua potable.",
      miniQuestion: "Si el problema central es que la población no recibe agua potable, el derecho más directamente vulnerado es:",
      miniChoices: [
        { text: "el acceso al agua potable.", correct: true },
        { text: "el enriquecimiento por recursos naturales.", correct: false },
        { text: "la afiliación a partidos políticos.", correct: false }
      ]
    },
    9: {
      icon: "🚨",
      skill: "orden público y estado de sitio",
      focus: "interpretar la intención institucional de una medida excepcional en contexto de violencia y alzamientos armados.",
      keyIdea: "El estado de sitio se entiende dentro del contexto de alteración del orden público. Si el enunciado menciona violencia y formación de grupos armados, la intención apunta a evitar alzamientos o controlar el orden público.",
      route: ["Ubica el contexto: elecciones controvertidas y violencia.", "Identifica la medida: estado de sitio.", "Relaciona la medida con orden público.", "Descarta fines no sustentados por el enunciado."],
      correctStrategy: "Conectar medida excepcional + contexto de violencia + objetivo de control del orden público.",
      miniQuestion: "En un contexto de aumento de violencia, declarar estado de sitio suele buscar:",
      miniChoices: [
        { text: "evitar alzamientos armados y controlar el orden público.", correct: true },
        { text: "realizar automáticamente nuevas elecciones.", correct: false },
        { text: "probar judicialmente el fraude electoral.", correct: false }
      ]
    },
    10: {
      icon: "🏛️",
      skill: "posturas políticas y reforma tributaria",
      focus: "explicar por qué un actor cambia su posición según su rol político y el enfoque de la reforma.",
      keyIdea: "La diferencia entre posiciones puede explicarse por el lugar político que ocupa el actor en cada momento y por el contenido de la propuesta. No toda diferencia se explica por popularidad o obligación legal.",
      route: ["Compara las dos declaraciones del congresista.", "Identifica su rol político en cada momento.", "Revisa el enfoque de la reforma propuesta.", "Elige la explicación que conecte posición política y contenido."],
      correctStrategy: "Comparar cargo, contexto político y enfoque de la reforma tributaria.",
      miniQuestion: "Para explicar un cambio de postura sobre una reforma, es clave revisar:",
      miniChoices: [
        { text: "el lugar político del actor y el enfoque de la propuesta en cada momento.", correct: true },
        { text: "si el actor se volvió más conocido, sin mirar sus argumentos.", correct: false },
        { text: "si todos los congresistas están obligados a cambiar de opinión.", correct: false }
      ]
    },
    11: {
      icon: "🎓",
      skill: "equidad educativa y política pública",
      focus: "detectar que un programa basado en mérito puede omitir desigualdades previas en la calidad de la educación básica y media.",
      keyIdea: "Un crédito-beca puede buscar equidad, pero si selecciona solo por rendimiento, puede ignorar que no todos recibieron la misma calidad educativa antes de competir por el beneficio.",
      route: ["Identifica el objetivo del programa.", "Revisa el criterio de selección.", "Pregunta qué desigualdad previa no se considera.", "Elige el factor omitido."],
      correctStrategy: "Evaluar si el criterio de selección considera desigualdades educativas previas.",
      miniQuestion: "Un programa de acceso a educación superior puede ser desigual si ignora:",
      miniChoices: [
        { text: "la calidad desigual de la educación primaria y secundaria recibida por los aspirantes.", correct: true },
        { text: "la necesidad de estudiar en una universidad.", correct: false },
        { text: "el buen desempeño académico como único dato suficiente.", correct: false }
      ]
    },
    12: {
      icon: "🕯️",
      skill: "segregación, exclusión y genocidio",
      focus: "relacionar un proceso de separación social forzada con conceptos de exclusión y violencia sistemática.",
      keyIdea: "Los guetos y la separación forzada muestran exclusión y segregación previas a un genocidio. La pregunta exige reconocer el concepto social, no justificar la violencia.",
      route: ["Lee el proceso descrito: separación, confinamiento y eliminación.", "Distingue segregación de integración o inclusión.", "Relaciona exclusión con genocidio.", "Escoge el concepto que mejor sintetice la situación."],
      correctStrategy: "Relacionar confinamiento forzado + exclusión social + violencia sistemática.",
      miniQuestion: "La segregación se caracteriza por:",
      miniChoices: [
        { text: "separar y excluir a un grupo de la vida social común.", correct: true },
        { text: "garantizar igualdad de participación para todos los grupos.", correct: false },
        { text: "promover el diálogo intercultural sin jerarquías.", correct: false }
      ]
    },
    13: {
      icon: "🛠️",
      skill: "tecnología apropiada, cultura y solución de problemas sociales",
      focus: "analizar cuándo una solución técnica puede fracasar por no adaptarse al contexto cultural o local.",
      keyIdea: "Una tecnología no es adecuada solo por ser moderna. Debe ser comprensible, sostenible, útil y compatible con las prácticas de la comunidad que la usará.",
      route: ["Identifica la solución propuesta.", "Reconoce las prácticas y condiciones de la comunidad.", "Busca la barrera cultural o de implementación.", "Elige la condición que obstaculiza la solución."],
      correctStrategy: "Evaluar compatibilidad entre tecnología, cultura local y condiciones reales de uso.",
      miniQuestion: "Una tecnología apropiada debe:",
      miniChoices: [
        { text: "adaptarse a las necesidades, saberes y condiciones de la comunidad.", correct: true },
        { text: "imponerse igual en todos los territorios.", correct: false },
        { text: "funcionar aunque la comunidad no pueda mantenerla.", correct: false }
      ]
    },
    14: {
      icon: "🏦",
      skill: "modelos económicos e intervención del Estado",
      focus: "identificar acciones en las que el Estado participa activamente en la economía.",
      keyIdea: "La intervención estatal se evidencia cuando el Estado regula, subsidia, controla, financia o presta servicios para orientar la economía y proteger ciertos sectores o derechos.",
      route: ["Reconoce qué actor realiza la acción.", "Distingue mercado libre de regulación estatal.", "Identifica subsidio, control, inversión o prestación pública.", "Elige la acción que muestre intervención."],
      correctStrategy: "Identificar regulación, financiación o acción directa del Estado en la economía.",
      miniQuestion: "Un ejemplo claro de intervención estatal es:",
      miniChoices: [
        { text: "regular, subsidiar o financiar una actividad para cumplir un objetivo público.", correct: true },
        { text: "dejar todas las decisiones únicamente al mercado.", correct: false },
        { text: "eliminar toda norma sobre producción y consumo.", correct: false }
      ]
    },
    15: {
      icon: "🎮",
      skill: "censura, medios y evaluación de argumentos causales",
      focus: "cuestionar una decisión que atribuye efectos sociales a videojuegos sin evidencia suficiente.",
      keyIdea: "Para cuestionar una censura se debe revisar si la relación causa-efecto está demostrada. Una política pública no debe basarse en supuestos no probados o generalizaciones apresuradas.",
      route: ["Identifica la medida de censura.", "Reconoce la causa que se atribuye al videojuego.", "Pregunta si hay evidencia suficiente.", "Elige la razón que cuestione la relación causal."],
      correctStrategy: "Evaluar si la evidencia sustenta la relación entre medio y conducta social.",
      miniQuestion: "Una relación causal débil se cuestiona porque:",
      miniChoices: [
        { text: "afirma que un fenómeno causa otro sin evidencia suficiente.", correct: true },
        { text: "usa una palabra técnica en el argumento.", correct: false },
        { text: "habla de jóvenes y medios de comunicación.", correct: false }
      ]
    },
    16: {
      icon: "🏳️‍🌈",
      skill: "discriminación laboral y análisis de contradicciones",
      focus: "verificar si dos posturas institucionales se contradicen o si se refieren a dimensiones distintas del mismo problema.",
      keyIdea: "Antes de afirmar contradicción, compara exactamente qué dice cada actor. Puede que ambos reconozcan discriminación, pero uno enfatice condiciones laborales y otro cambios culturales o institucionales.",
      route: ["Lee cada postura por separado.", "Subraya qué afirma y qué no afirma.", "Compara si se niegan mutuamente.", "Elige la opción que explique la relación lógica entre ellas."],
      correctStrategy: "Comparar afirmaciones y determinar si se contradicen o se complementan.",
      miniQuestion: "Dos declaraciones no se contradicen si:",
      miniChoices: [
        { text: "pueden ser verdaderas al mismo tiempo porque analizan aspectos distintos del problema.", correct: true },
        { text: "usan palabras diferentes aunque digan lo opuesto.", correct: false },
        { text: "provienen de instituciones distintas y por eso una debe ser falsa.", correct: false }
      ]
    },
    17: {
      icon: "🕊️",
      skill: "libertad de creencias y normas institucionales",
      focus: "inferir la intención de una estudiante que afirma sufrir discriminación por sus creencias.",
      keyIdea: "La intención de una persona que denuncia discriminación suele ser mostrar que una norma o práctica institucional afecta su libertad de conciencia, creencias o igualdad de trato.",
      route: ["Identifica qué práctica o norma cuestiona la estudiante.", "Relaciona el caso con libertad de creencias.", "Distingue intención de queja de simple desacuerdo.", "Elige la opción que explique su reclamo."],
      correctStrategy: "Relacionar reclamo personal + derecho a libertad de creencias + trato igualitario.",
      miniQuestion: "Cuando alguien afirma ser discriminado por sus creencias, busca principalmente:",
      miniChoices: [
        { text: "mostrar que una regla o práctica afecta su libertad de conciencia o igualdad.", correct: true },
        { text: "imponer sus creencias a todas las demás personas.", correct: false },
        { text: "eliminar toda norma de convivencia institucional.", correct: false }
      ]
    },
    18: {
      icon: "🏫",
      skill: "manual de convivencia y libre desarrollo de la personalidad",
      focus: "identificar una medida escolar que respete derechos y evite exclusiones injustificadas.",
      keyIdea: "Un manual de convivencia debe promover derechos, permanencia educativa y no discriminación. La opción adecuada refleja una acción concreta que evita excluir a estudiantes por su condición personal.",
      route: ["Identifica el derecho que se quiere proteger.", "Busca una medida concreta de inclusión escolar.", "Descarta opciones que no se relacionen con libre desarrollo o igualdad.", "Elige el ejemplo de respeto a derechos."],
      correctStrategy: "Elegir la medida que promueve inclusión y permanencia sin discriminación.",
      miniQuestion: "Un ajuste respetuoso de derechos en el manual de convivencia debe:",
      miniChoices: [
        { text: "permitir la permanencia e inclusión de estudiantes en situaciones protegidas por derechos.", correct: true },
        { text: "excluir a estudiantes para evitar debates institucionales.", correct: false },
        { text: "imponer un único culto o forma de vida.", correct: false }
      ]
    },
    19: {
      icon: "🌿",
      skill: "pueblos indígenas, biodiversidad y responsabilidad ambiental",
      focus: "identificar efectos no deseados de asignar la conservación solo a un grupo social.",
      keyIdea: "Reconocer el liderazgo indígena es importante, pero una política puede tener un efecto no deseado si termina descargando la responsabilidad ambiental en un solo grupo y reduce el compromiso de los demás actores.",
      route: ["Identifica la propuesta y su intención positiva.", "Pregunta qué consecuencia negativa podría aparecer.", "Distingue reconocimiento de traslado exclusivo de responsabilidad.", "Elige el efecto no deseado."],
      correctStrategy: "Evaluar efecto no deseado: liderazgo indígena sin descargar responsabilidad en otros grupos.",
      miniQuestion: "Un efecto no deseado de una política ambiental sería:",
      miniChoices: [
        { text: "hacer creer que solo un grupo debe cuidar el ambiente y los demás no tienen responsabilidad.", correct: true },
        { text: "reconocer saberes indígenas en la política pública.", correct: false },
        { text: "articular prácticas comunitarias con programas gubernamentales.", correct: false }
      ]
    },
    20: {
      icon: "🐟",
      skill: "compatibilidad de propuestas socioambientales",
      focus: "evaluar si dos soluciones pueden articularse o si se contradicen en sus objetivos.",
      keyIdea: "La caza del pez león y su consumo pueden ser compatibles si el consumo aprovecha los ejemplares cazados para controlar la especie invasora y generar ingresos, sin promover su cultivo o expansión.",
      route: ["Identifica el objetivo de cada propuesta.", "Pregunta si una puede apoyar a la otra.", "Descarta opciones que inventan cultivo o contradicción no mencionada.", "Elige la compatibilidad real."],
      correctStrategy: "Comparar objetivos de las propuestas y verificar si pueden funcionar juntas.",
      miniQuestion: "Dos propuestas son compatibles cuando:",
      miniChoices: [
        { text: "una ayuda a cumplir el objetivo de la otra sin generar una contradicción.", correct: true },
        { text: "tienen palabras parecidas aunque busquen fines opuestos.", correct: false },
        { text: "una exige cultivar más la especie invasora que se quiere controlar.", correct: false }
      ]
    },
    21: {
      icon: "🏛️",
      skill: "reformas constitucionales y competencias institucionales",
      focus: "identificar que el presidente no reforma por sí solo la Constitución y que el Congreso tiene competencia central en ese trámite.",
      keyIdea: "Una propuesta presidencial puede tener apoyo social, pero una reforma constitucional exige procedimientos y órganos competentes. La voluntad del presidente no reemplaza al Congreso ni al trámite constitucional.",
      route: ["Identifica qué quiere hacer el candidato.", "Reconoce que se trata de una reforma constitucional.", "Pregunta qué órgano tiene competencia.", "Descarta opciones basadas solo en popularidad o voluntad presidencial."],
      correctStrategy: "Relacionar reforma constitucional con competencia del Congreso y trámite formal.",
      miniQuestion: "Según la lógica constitucional, una reforma no depende únicamente de:",
      miniChoices: [
        { text: "la voluntad del presidente o del rechazo social a un delito.", correct: true },
        { text: "los órganos y procedimientos previstos por la Constitución.", correct: false },
        { text: "la discusión institucional en el Congreso.", correct: false }
      ]
    },
    22: {
      icon: "🗣️",
      skill: "discurso político e historia colombiana",
      focus: "identificar rasgos del discurso gaitanista: crítica a élites y políticos tradicionales para movilizar apoyo popular.",
      keyIdea: "Para reconocer un discurso histórico no basta con el año; se analizan sus ideas, destinatarios y críticas. En Gaitán es clave la crítica a políticos tradicionales y la apelación al pueblo.",
      route: ["Lee el tono y los actores criticados.", "Ubica si hay crítica a élites políticas tradicionales.", "Compara con rasgos de liderazgo popular.", "Descarta anacronismos como el Frente Nacional si no corresponde."],
      correctStrategy: "Usar evidencia del discurso: crítica a políticos tradicionales y posicionamiento electoral popular.",
      miniQuestion: "Una evidencia discursiva para reconocer un liderazgo popular es:",
      miniChoices: [
        { text: "la crítica a élites o políticos tradicionales para movilizar apoyo ciudadano.", correct: true },
        { text: "la mención de un proceso posterior al discurso.", correct: false },
        { text: "la ausencia de toda crítica política.", correct: false }
      ]
    },
    23: {
      icon: "🏳️‍🌈",
      skill: "conceptos de discriminación y diversidad sexual",
      focus: "diferenciar homofobia, transfobia, xenofobia y misoginia según el grupo afectado.",
      keyIdea: "La clave es identificar a quién se dirige la discriminación. Si la noticia se refiere a rechazo o violencia por orientación sexual homosexual, el concepto adecuado es homofobia.",
      route: ["Identifica el grupo afectado en la noticia.", "Distingue orientación sexual, identidad de género, origen nacional y género.", "Relaciona el concepto correcto con el caso.", "Descarta conceptos de otras formas de discriminación."],
      correctStrategy: "Definir la discriminación según el grupo o característica atacada.",
      miniQuestion: "La homofobia se refiere al rechazo o discriminación hacia:",
      miniChoices: [
        { text: "personas homosexuales o por su orientación sexual.", correct: true },
        { text: "personas extranjeras por su nacionalidad.", correct: false },
        { text: "mujeres por su género en general.", correct: false }
      ]
    },
    24: {
      icon: "🗺️",
      skill: "geografía histórica y adaptación al territorio",
      focus: "relacionar características físicas de Yucatán con sistemas mayas de recolección y almacenamiento de agua.",
      keyIdea: "Si una sociedad desarrolla sistemas complejos para captar y almacenar agua, la explicación geográfica debe estar conectada con la disponibilidad de fuentes hídricas superficiales y la adaptación al territorio.",
      route: ["Identifica la tecnología maya mencionada.", "Pregunta qué condición geográfica la hizo necesaria.", "Descarta explicaciones comerciales o militares no relacionadas con agua.", "Elige el factor físico del territorio."],
      correctStrategy: "Conectar sistema de agua + ausencia de ríos o fuentes superficiales + adaptación territorial.",
      miniQuestion: "Un factor geográfico que explica sistemas de almacenamiento de agua es:",
      miniChoices: [
        { text: "la ausencia o escasez de fuentes hídricas superficiales disponibles.", correct: true },
        { text: "el intercambio comercial con islas lejanas.", correct: false },
        { text: "guerras permanentes con civilizaciones no relacionadas con Yucatán.", correct: false }
      ]
    },
    25: {
      icon: "♻️",
      skill: "desarrollo sostenible y protección de recursos",
      focus: "identificar la afirmación que combina crecimiento económico con preservación de los recursos naturales.",
      keyIdea: "Desarrollo sostenible no significa explotar sin límites ni congelar toda actividad económica; implica satisfacer necesidades presentes sin destruir los recursos que necesitarán futuras generaciones.",
      route: ["Lee qué entiende el texto por desarrollo sostenible.", "Busca equilibrio entre economía y preservación.", "Descarta explotación ilimitada.", "Elige la opción que conserve recursos naturales."],
      correctStrategy: "Relacionar crecimiento económico con preservación ambiental y futuro colectivo.",
      miniQuestion: "Una afirmación compatible con desarrollo sostenible plantea:",
      miniChoices: [
        { text: "crecimiento económico con preservación de los recursos naturales.", correct: true },
        { text: "explotación ilimitada de recursos para beneficiar el presente.", correct: false },
        { text: "protección ambiental sin considerar necesidades sociales.", correct: false }
      ]
    },
    26: {
      icon: "🏔️",
      skill: "páramos, derechos colectivos y ambiente sano",
      focus: "defender la protección de un ecosistema estratégico por su relación con agua y equilibrio ambiental.",
      keyIdea: "Los páramos son ecosistemas estratégicos para el agua. En un conflicto entre infraestructura y conservación, la opción más sólida protege el derecho colectivo y el abastecimiento de comunidades.",
      route: ["Identifica el ecosistema afectado: páramo.", "Reconoce el beneficio colectivo: agua y equilibrio ambiental.", "Distingue interés económico de derecho colectivo.", "Elige el argumento que protege a las comunidades y al ecosistema."],
      correctStrategy: "Priorizar derecho colectivo al agua y protección del páramo frente a beneficios económicos parciales.",
      miniQuestion: "La protección de un páramo se defiende mejor porque:",
      miniChoices: [
        { text: "de él depende el acceso al agua y el equilibrio ambiental de varias comunidades.", correct: true },
        { text: "el crecimiento económico siempre debe estar por encima del ambiente.", correct: false },
        { text: "solo los comerciantes deben decidir sobre el ecosistema.", correct: false }
      ]
    },
    27: {
      icon: "🌐",
      skill: "inclusión, migración y diversidad cultural",
      focus: "cuestionar una postura asimilacionista que exige a estudiantes migrantes renunciar a su identidad.",
      keyIdea: "La convivencia escolar democrática reconoce la diversidad cultural. Integrar no significa obligar a abandonar acentos, costumbres o identidades, sino promover respeto e inclusión.",
      route: ["Identifica la postura de los padres.", "Reconoce el problema: burlas y exclusión.", "Distingue integración de asimilación forzada.", "Elige la afirmación que defienda diversidad e inclusión."],
      correctStrategy: "Defender convivencia escolar desde respeto a la diversidad cultural y no renuncia identitaria.",
      miniQuestion: "Una respuesta inclusiva frente a estudiantes migrantes debe:",
      miniChoices: [
        { text: "reconocer sus costumbres y promover respeto sin exigir renuncia a la identidad.", correct: true },
        { text: "obligarlos a abandonar su cultura para evitar burlas.", correct: false },
        { text: "dar trato preferencial a la cultura mayoritaria.", correct: false }
      ]
    },
    28: {
      icon: "💻",
      skill: "brecha digital, equidad y diseño de política pública",
      focus: "detectar que un programa por internet puede excluir a mujeres rurales sin conectividad ni equipos.",
      keyIdea: "Una política pública puede buscar apoyar a una población vulnerable, pero si exige acceso digital sin considerar brechas territoriales, reproduce desigualdades y limita el acceso al beneficio.",
      route: ["Identifica el objetivo del programa.", "Ubica el requisito de inscripción digital.", "Reconoce quiénes quedan excluidas por falta de internet o equipos.", "Elige la barrera pasada por alto."],
      correctStrategy: "Relacionar requisito digital + desigualdad territorial + exclusión del beneficio.",
      miniQuestion: "Un programa digital puede ser inequitativo si no considera:",
      miniChoices: [
        { text: "la desigualdad de acceso a internet y herramientas tecnológicas entre zonas urbanas y rurales.", correct: true },
        { text: "la necesidad de exigir más requisitos digitales para filtrar participantes.", correct: false },
        { text: "la conveniencia de excluir a quienes viven lejos de las ciudades.", correct: false }
      ]
    }
  };
}

function buildS2SocialChips(question, profile) {
  const standard = [
    { text: "Leer el caso completo y no responder por intuición", correct: true },
    { text: "Identificar actores, derecho, conflicto o problema central", correct: true },
    { text: "Comparar cada opción con evidencia del enunciado", correct: true }
  ];
  const byType = {
    ambiental: { text: "Revisar impactos ambientales, sociales y económicos de la decisión", correct: true },
    norma: { text: "Relacionar el caso con la Constitución, derecho o institución competente", correct: true },
    discriminacion: { text: "Ubicar el prejuicio o grupo afectado con precisión", correct: true },
    perspectiva: { text: "Distinguir postura, interés y argumento del actor", correct: true },
    historico: { text: "Ubicar contexto, causa, consecuencia o evidencia histórica", correct: true },
    politica: { text: "Detectar barreras de acceso y desigualdades que el programa omite", correct: true },
    fuente: { text: "Usar solo información que la fuente permite sustentar", correct: true },
    ciudadania: { text: "Relacionar la situación con convivencia, participación o derechos", correct: true }
  };
  const distractors = [
    { text: "Elegir la opción que suene más bonita aunque no responda al caso", correct: false },
    { text: "Usar una opinión personal sin evidencia", correct: false },
    { text: "Quedarse con una palabra aislada y no leer el contexto", correct: false },
    { text: "Descartar el enunciado y responder por memoria", correct: false }
  ];
  return [standard[0], standard[1], byType[profile.type] || byType.ciudadania, standard[2], distractors[Number(question.number) % distractors.length]];
}

function buildS2SocialStrategyChoices(profile) {
  return [
    { text: profile.correctStrategy, correct: true },
    { text: "Responder por preferencia personal sin verificar actores, contexto ni evidencia.", correct: false },
    { text: "Elegir la opción más extensa o más emotiva sin comprobar si corresponde al caso.", correct: false }
  ];
}

function buildS2SocialTeacherNote(question, profile) {
  return `Esta pregunta de Sección 2 fortalece ${profile.skill}. Para resolverla tipo Saber 11, el estudiante debe justificar su elección con el caso, reconocer el componente "${question.componente || "Sociales y Ciudadanas"}" y evitar respuestas basadas únicamente en opinión o memoria aislada.`;
}

function initS2SocialGuidedSimulator(question) {
  const config = getS2SocialProfile(question);
  if (!config) return;

  const chipGrid = document.getElementById("socialChipGrid");
  const checkChipsBtn = document.getElementById("checkSocialChipsBtn");
  const chipsFeedback = document.getElementById("socialChipsFeedback");
  const strategyGrid = document.getElementById("socialStrategyGrid");
  const strategyFeedback = document.getElementById("socialStrategyFeedback");
  const miniGrid = document.getElementById("socialMiniGrid");
  const miniFeedback = document.getElementById("socialMiniFeedback");
  const finalGrid = document.getElementById("socialFinalAnswerGrid");
  const finalFeedback = document.getElementById("socialFinalFeedback");

  if (chipGrid) {
    chipGrid.addEventListener("click", event => {
      const button = event.target.closest(".social-chip");
      if (!button) return;
      button.classList.toggle("selected");
      if (chipsFeedback) {
        chipsFeedback.textContent = "Claves seleccionadas. Verifica si cada una ayuda realmente a comprender esta pregunta de Sociales y Ciudadanas.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  if (checkChipsBtn) {
    checkChipsBtn.addEventListener("click", () => {
      const buttons = Array.from(document.querySelectorAll(".social-chip"));
      const wrongSelected = buttons.some(button => button.classList.contains("selected") && button.dataset.correct !== "1");
      const missingCorrect = buttons.some(button => !button.classList.contains("selected") && button.dataset.correct === "1");
      buttons.forEach(button => {
        button.classList.remove("correct", "wrong");
        if (button.classList.contains("selected") && button.dataset.correct === "1") button.classList.add("correct");
        if (button.classList.contains("selected") && button.dataset.correct !== "1") button.classList.add("wrong");
      });
      if (!wrongSelected && !missingCorrect) {
        chipsFeedback.innerHTML = "<strong>Excelente.</strong> Seleccionaste las claves necesarias para resolver esta pregunta con evidencia, no por intuición.";
        chipsFeedback.className = "sim-feedback ok";
      } else if (wrongSelected) {
        chipsFeedback.innerHTML = "<strong>Revisa.</strong> Hay una clave distractora. En Saber 11 debes justificar con el caso, la fuente o el principio ciudadano.";
        chipsFeedback.className = "sim-feedback error";
      } else {
        chipsFeedback.innerHTML = "<strong>Vas bien.</strong> Falta una clave importante para sostener la respuesta.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  function bindS2SocialChoiceGrid(grid, feedback, correctMessage, errorMessage) {
    if (!grid) return;
    grid.addEventListener("click", event => {
      const button = event.target.closest(".social-choice");
      if (!button) return;
      grid.querySelectorAll(".social-choice").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.correct === "1") {
        button.classList.add("correct");
        if (feedback) {
          feedback.innerHTML = `<strong>Correcto.</strong> ${escapeHtml(correctMessage)}`;
          feedback.className = "sim-feedback ok";
        }
      } else {
        button.classList.add("wrong");
        if (feedback) {
          feedback.innerHTML = `<strong>Revisa.</strong> ${escapeHtml(errorMessage)}`;
          feedback.className = "sim-feedback error";
        }
      }
    });
  }

  bindS2SocialChoiceGrid(strategyGrid, strategyFeedback, "Esa es la ruta adecuada: conecta el tipo de pregunta con evidencia del enunciado.", "Esa estrategia deja por fuera el caso o el principio social que se evalúa.");
  bindS2SocialChoiceGrid(miniGrid, miniFeedback, "El microentrenamiento confirma la habilidad que necesitas aplicar antes de responder.", "Vuelve a la idea clave y revisa qué exige exactamente la pregunta.");

  if (finalGrid) {
    finalGrid.addEventListener("click", event => {
      const button = event.target.closest(".social-final-answer");
      if (!button) return;
      finalGrid.querySelectorAll(".social-final-answer").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.answer === question.correctAnswer) {
        button.classList.add("correct");
        finalFeedback.innerHTML = `<strong>Correcto.</strong> La opción ${escapeHtml(question.correctAnswer)} corresponde al caso. ${escapeHtml(stripHtml(question.explanation || "La respuesta coincide con la estrategia trabajada en el simulador."))}`;
        finalFeedback.className = "sim-final-feedback ok";
      } else {
        button.classList.add("wrong");
        finalFeedback.innerHTML = `<strong>Revisa tu elección.</strong> Antes de volver a la pregunta, aplica esta ruta: ${escapeHtml(config.correctStrategy)} Después compara tu opción con actores, evidencia, derechos, efectos o contexto histórico.`;
        finalFeedback.className = "sim-final-feedback error";
      }
    });
  }
}

const NOTEBOOK_RENDER_SIMULATOR_BASE_SOCIAL_S2 = renderNotebookSimulator;
const NOTEBOOK_INIT_SIMULATOR_BASE_SOCIAL_S2 = initNotebookSimulator;

renderNotebookSimulator = function(question, customResource) {
  if (isS2SocialSimulatorQuestion(question)) {
    const config = getS2SocialProfile(question);
    return renderS1SocialGuidedSimulator(question, config);
  }
  return NOTEBOOK_RENDER_SIMULATOR_BASE_SOCIAL_S2(question, customResource);
};

initNotebookSimulator = function(question) {
  if (isS2SocialSimulatorQuestion(question)) {
    initS2SocialGuidedSimulator(question);
    return;
  }
  NOTEBOOK_INIT_SIMULATOR_BASE_SOCIAL_S2(question);
};

/* ==========================================================
   Simuladores dinámicos por pregunta · Sección 1 Ciencias Naturales
   Preguntas 92 a 120
   ========================================================== */

function isS1ScienceSimulatorQuestion(question) {
  return Number(question.session) === 1 &&
    String(question.area || "").toLowerCase().includes("ciencias") &&
    Number(question.number) >= 92 && Number(question.number) <= 120;
}

function getS1ScienceProfile(question) {
  const number = Number(question.number);
  const profiles = {
    92: {
      icon: "💧",
      title: "Simulador interactivo · Recuperación de ecosistemas acuáticos",
      skill: "contaminación del agua, fuente del problema y acción de mitigación",
      focus: "identificar la actividad que causa la contaminación y elegir una acción que ataque la causa, no solo los efectos visibles.",
      keyIdea: "En Ciencias Naturales, recuperar un ecosistema contaminado exige reconocer causa, agente contaminante, efecto sobre organismos y acción de control. Si no se elimina o reduce la fuente de contaminación, el problema continúa.",
      route: ["Ubica el ecosistema afectado: agua, peces y plantas.", "Identifica qué actividad del barrio causa la contaminación.", "Distingue limpiar el daño de controlar la causa.", "Elige la acción que evita que el contaminante siga llegando al agua."],
      correctStrategy: "Relacionar actividad contaminante + alteración del agua + protección de peces y plantas.",
      miniQuestion: "Para recuperar un ecosistema acuático contaminado, la primera decisión científica debe orientarse a:",
      miniChoices: [
        { text: "controlar la fuente de contaminación que llega al agua.", correct: true },
        { text: "cambiar los peces de lugar sin revisar la causa del daño.", correct: false },
        { text: "observar el ecosistema sin modificar la actividad contaminante.", correct: false }
      ]
    },
    93: {
      icon: "🌿",
      title: "Simulador interactivo · Fotosíntesis y crecimiento vegetal",
      skill: "fotosíntesis, intercambio de gases y nutrición vegetal",
      focus: "explicar por qué una planta no crece si el contaminante impide que sus órganos realicen fotosíntesis adecuadamente.",
      keyIdea: "La fotosíntesis permite producir sustancias nutritivas a partir de luz, agua y dióxido de carbono. Si hojas u órganos se cubren con aceite, se afecta el intercambio y la captación necesaria para producir alimento.",
      route: ["Reconoce qué órgano o proceso se afecta.", "Relaciona fotosíntesis con producción de alimento.", "Explica cómo el aceite bloquea funciones de la planta.", "Elige la opción que conecte proceso alterado y falta de crecimiento."],
      correctStrategy: "Conectar fotosíntesis incompleta + menor producción de alimento + menor crecimiento.",
      miniQuestion: "Si una planta no realiza fotosíntesis de forma correcta, se afecta principalmente porque:",
      miniChoices: [
        { text: "produce menos sustancias que necesita para crecer.", correct: true },
        { text: "aumenta inmediatamente su producción de alimento.", correct: false },
        { text: "deja de ser un ser vivo aunque conserve sus células.", correct: false }
      ]
    },
    94: {
      icon: "📈",
      title: "Simulador interactivo · Biodiversidad y representación de datos",
      skill: "indagación, lectura de registros y elección de gráfica adecuada",
      focus: "elegir el gráfico que representa de manera fiel la variación de especies acuáticas registrada en diferentes momentos o categorías.",
      keyIdea: "Cuando una pregunta pide representar datos, no basta con elegir una gráfica bonita: debes revisar variables, ejes, cantidades, tendencia y correspondencia exacta con la tabla o registros.",
      route: ["Identifica qué variable va en cada eje.", "Compara cada dato con las barras o puntos del gráfico.", "Revisa que la tendencia no se invierta.", "Descarta gráficos que cambian valores o categorías."],
      correctStrategy: "Verificar correspondencia dato por dato entre registros y representación gráfica.",
      miniQuestion: "Una gráfica representa correctamente unos registros cuando:",
      miniChoices: [
        { text: "conserva las categorías, valores y tendencia de los datos originales.", correct: true },
        { text: "usa colores llamativos aunque cambie los datos.", correct: false },
        { text: "muestra una tendencia contraria a la tabla para simplificarla.", correct: false }
      ]
    },
    95: {
      icon: "📡",
      title: "Simulador interactivo · Fibra óptica y transmisión de información",
      skill: "ondas electromagnéticas y comunicación tecnológica",
      focus: "argumentar por qué el cable de fibra óptica es necesario dentro de un sistema de conexión comunitaria a internet.",
      keyIdea: "La transmisión de información requiere un medio que transporte señales de forma eficiente. La fibra óptica permite llevar información mediante luz a grandes distancias con alta velocidad y baja pérdida.",
      route: ["Ubica la ruta de comunicación del esquema.", "Diferencia antenas, zonas wifi y fibra óptica.", "Reconoce qué elemento transporta la información principal.", "Elige la razón física o tecnológica más coherente."],
      correctStrategy: "Relacionar fibra óptica con transporte eficiente de información mediante señales luminosas.",
      miniQuestion: "En una red de internet, la fibra óptica se justifica porque:",
      miniChoices: [
        { text: "permite transportar información de manera rápida y eficiente mediante señales de luz.", correct: true },
        { text: "evita que existan antenas o dispositivos de conexión.", correct: false },
        { text: "convierte todos los computadores en servidores sin señal.", correct: false }
      ]
    },
    96: {
      icon: "〰️",
      title: "Simulador interactivo · Frecuencia y forma de las ondas",
      skill: "frecuencia, longitud de onda y comparación de ondas electromagnéticas",
      focus: "reconocer cómo cambia la representación de una onda cuando su frecuencia aumenta aproximadamente al doble.",
      keyIdea: "Si la frecuencia aumenta, en el mismo intervalo aparecen más ciclos. Cuando la velocidad de propagación se mantiene, mayor frecuencia implica menor longitud de onda.",
      route: ["Identifica qué grupo tiene mayor frecuencia.", "Recuerda que frecuencia es número de oscilaciones por tiempo.", "Compara cuántos ciclos caben en el mismo espacio.", "Elige el modelo con más oscilaciones para la frecuencia mayor."],
      correctStrategy: "Asociar mayor frecuencia con más ciclos y menor longitud de onda en la representación.",
      miniQuestion: "Si una onda tiene el doble de frecuencia que otra, en el mismo intervalo se observa:",
      miniChoices: [
        { text: "aproximadamente el doble de oscilaciones.", correct: true },
        { text: "la mitad de oscilaciones necesariamente más separadas.", correct: false },
        { text: "una línea sin vibración porque la frecuencia aumenta.", correct: false }
      ]
    },
    97: {
      icon: "🛰️",
      title: "Simulador interactivo · Comunicación de modelos tecnológicos",
      skill: "indagación y comunicación de esquemas científicos o tecnológicos",
      focus: "explicar por qué mostrar conexiones entre antenas fortalece la comprensión de una propuesta tecnológica.",
      keyIdea: "Un esquema científico o tecnológico comunica mejor cuando muestra relaciones entre componentes. Dibujar conexiones permite entender flujo de información, función de cada parte y continuidad del sistema.",
      route: ["Reconoce qué elementos aparecen en el esquema.", "Pregunta qué relación no sería clara sin conexiones.", "Relaciona dibujo con comprensión del funcionamiento.", "Elige la opción que mejora la comunicación del modelo."],
      correctStrategy: "Explicar que las conexiones muestran cómo viaja la información entre componentes.",
      miniQuestion: "En un modelo tecnológico, dibujar conexiones es útil porque:",
      miniChoices: [
        { text: "muestra relaciones y flujo entre las partes del sistema.", correct: true },
        { text: "decora el esquema aunque no aporte información.", correct: false },
        { text: "elimina la necesidad de interpretar los componentes.", correct: false }
      ]
    },
    98: {
      icon: "🍎",
      title: "Simulador interactivo · Descomposición y velocidad de reacción",
      skill: "hipótesis, cambios químicos y factores que afectan la velocidad de descomposición",
      focus: "evaluar si una hipótesis es compatible con una observación y con información científica de apoyo.",
      keyIdea: "Una hipótesis científica debe poder contrastarse con lo observado. La descomposición depende de condiciones como microorganismos, temperatura, oxígeno, humedad y protección externa del material.",
      route: ["Lee qué observó Pedro.", "Identifica la hipótesis propuesta.", "Compara con la información del libro.", "Decide si la hipótesis explica o contradice el fenómeno."],
      correctStrategy: "Contrastar observación + hipótesis + información científica antes de concluir.",
      miniQuestion: "Una hipótesis es compatible con un fenómeno cuando:",
      miniChoices: [
        { text: "explica lo observado usando información científica coherente.", correct: true },
        { text: "contradice los datos pero parece posible.", correct: false },
        { text: "no se puede relacionar con ninguna observación.", correct: false }
      ]
    },
    99: {
      icon: "🐒",
      title: "Simulador interactivo · Aislamiento reproductivo y especiación",
      skill: "evolución, separación de poblaciones y formación de especies",
      focus: "identificar el modelo que representa poblaciones separadas por una barrera natural durante mucho tiempo.",
      keyIdea: "Cuando una barrera geográfica separa poblaciones por generaciones, disminuye el flujo genético. Con el tiempo pueden acumular diferencias hasta producir aislamiento reproductivo.",
      route: ["Identifica la barrera: río grande.", "Reconoce que separa dos poblaciones.", "Relaciona separación prolongada con cambios genéticos.", "Elige el modelo de especiación por aislamiento geográfico."],
      correctStrategy: "Conectar barrera geográfica + ausencia de cruces + diferenciación evolutiva.",
      miniQuestion: "El aislamiento geográfico puede favorecer la especiación porque:",
      miniChoices: [
        { text: "reduce el intercambio genético entre poblaciones separadas.", correct: true },
        { text: "obliga a todos los individuos a ser idénticos.", correct: false },
        { text: "elimina cualquier cambio hereditario en las poblaciones.", correct: false }
      ]
    },
    100: {
      icon: "➡️",
      title: "Simulador interactivo · Fuerza y movimiento en una trayectoria",
      skill: "física, fuerza aplicada y representación gráfica",
      focus: "relacionar las fuerzas ejercidas en diferentes tramos con una gráfica de fuerza contra posición.",
      keyIdea: "Una gráfica fuerza-posición debe reflejar cómo cambia la fuerza según el tramo recorrido. Si se empuja, se deja de empujar o cambia la intensidad, la gráfica debe mostrar esos intervalos.",
      route: ["Divide la situación en tramos.", "Identifica en qué posiciones hay fuerza aplicada.", "Determina si la fuerza aumenta, disminuye o permanece constante.", "Elige la gráfica que respeta esos intervalos."],
      correctStrategy: "Traducir cada tramo físico a un segmento de la gráfica fuerza-posición.",
      miniQuestion: "Para elegir una gráfica de fuerza como función de posición, primero se debe:",
      miniChoices: [
        { text: "identificar qué fuerza actúa en cada tramo del recorrido.", correct: true },
        { text: "escoger la curva más alta sin leer la situación.", correct: false },
        { text: "ignorar la posición porque solo importa el tiempo.", correct: false }
      ]
    },
    101: {
      icon: "🪨",
      title: "Simulador interactivo · Propiedades de minerales",
      skill: "clasificación de materiales a partir de características observables",
      focus: "comparar minerales y reconocer cuáles comparten las mismas propiedades de una tabla.",
      keyIdea: "En clasificación de materiales se comparan criterios definidos: color, dureza, brillo, raya, densidad u otras propiedades. Dos materiales coinciden si todas las características solicitadas son iguales.",
      route: ["Lee cada propiedad de la tabla.", "Compara mineral por mineral.", "Marca coincidencias completas, no parciales.", "Elige la pareja que cumple todas las características."],
      correctStrategy: "Comparar las propiedades una por una y aceptar solo coincidencias completas.",
      miniQuestion: "Dos minerales tienen las mismas características cuando:",
      miniChoices: [
        { text: "coinciden en todos los criterios de comparación de la tabla.", correct: true },
        { text: "comparten solo una propiedad visible.", correct: false },
        { text: "tienen nombres parecidos aunque sus propiedades cambien.", correct: false }
      ]
    },
    102: {
      icon: "🧬",
      title: "Simulador interactivo · Mitosis y crecimiento del pelo",
      skill: "división celular, crecimiento y renovación de tejidos",
      focus: "explicar el papel específico de la mitosis en células capilares.",
      keyIdea: "La mitosis produce células hijas genéticamente iguales. En tejidos como el cuero cabelludo, permite renovar células y aumentar el número celular asociado al crecimiento del pelo.",
      route: ["Reconoce que el pelo depende de células vivas en el folículo.", "Relaciona mitosis con producción de nuevas células.", "Distingue crecimiento celular de herencia sexual.", "Elige la función específica de la mitosis."],
      correctStrategy: "Asociar mitosis con generación de células nuevas para crecimiento y renovación.",
      miniQuestion: "La mitosis contribuye al crecimiento porque:",
      miniChoices: [
        { text: "forma nuevas células con la misma información genética.", correct: true },
        { text: "mezcla gametos para producir variabilidad sexual.", correct: false },
        { text: "elimina todas las células del tejido capilar.", correct: false }
      ]
    },
    103: {
      icon: "🦟",
      title: "Simulador interactivo · Parasitismo en malaria aviar",
      skill: "interacciones ecológicas entre parásito, ave y vector",
      focus: "clasificar la relación del parásito con el ave y con el zancudo según el ciclo mostrado.",
      keyIdea: "En el parasitismo, un organismo se beneficia y otro resulta afectado. Un vector puede transportar el parásito y participar en su ciclo de vida o transmisión.",
      route: ["Identifica quién es el parásito.", "Reconoce qué organismo resulta afectado por la enfermedad.", "Distingue huésped y vector.", "Elige la interacción ecológica indicada por el diagrama."],
      correctStrategy: "Ubicar beneficio del parásito, daño al ave y papel del zancudo en la transmisión.",
      miniQuestion: "Una relación parásito-huésped se caracteriza porque:",
      miniChoices: [
        { text: "el parásito se beneficia y el huésped puede resultar perjudicado.", correct: true },
        { text: "ambos organismos siempre se benefician por igual.", correct: false },
        { text: "ningún organismo cambia ni participa en transmisión.", correct: false }
      ]
    },
    104: {
      icon: "⚛️",
      title: "Simulador interactivo · Isótopos y estructura atómica",
      skill: "protones, neutrones e identificación de isótopos",
      focus: "reconocer parejas de átomos del mismo elemento con diferente número de neutrones.",
      keyIdea: "Los isótopos tienen igual número de protones porque pertenecen al mismo elemento, pero diferente número de neutrones, lo que cambia su masa.",
      route: ["Compara el número de protones.", "Si es igual, pertenecen al mismo elemento.", "Compara el número de neutrones.", "Elige la pareja con mismos protones y diferentes neutrones."],
      correctStrategy: "Mismos protones + diferentes neutrones = isótopos.",
      miniQuestion: "Dos átomos son isótopos cuando tienen:",
      miniChoices: [
        { text: "igual número de protones y distinto número de neutrones.", correct: true },
        { text: "distinto número de protones y la misma carga siempre.", correct: false },
        { text: "diferente elemento químico y masa idéntica necesariamente.", correct: false }
      ]
    },
    105: {
      icon: "🧪",
      title: "Simulador interactivo · Concentración de disoluciones",
      skill: "masa de soluto, volumen de solución y concentración",
      focus: "determinar qué disolución tiene mayor masa de soluto cuando se comparan volúmenes iguales.",
      keyIdea: "La concentración expresa cuánto soluto hay en cierta cantidad de solución. Si se comparan volúmenes iguales, la disolución con mayor concentración contiene mayor masa de soluto.",
      route: ["Identifica que los volúmenes son iguales.", "Compara la concentración de cada disolución.", "Relaciona concentración con masa de soluto.", "Elige la mayor concentración si el volumen es el mismo."],
      correctStrategy: "Con igual volumen, mayor concentración implica mayor cantidad de soluto.",
      miniQuestion: "Si dos soluciones tienen igual volumen, tendrá más soluto la que tenga:",
      miniChoices: [
        { text: "mayor concentración.", correct: true },
        { text: "menor concentración necesariamente.", correct: false },
        { text: "el recipiente más ancho aunque la concentración sea menor.", correct: false }
      ]
    },
    106: {
      icon: "🧲",
      title: "Simulador interactivo · Magnetismo y control experimental",
      skill: "indagación, variables y diseño experimental con imanes",
      focus: "identificar qué se debe modificar o controlar para apoyar correctamente una conclusión experimental.",
      keyIdea: "En un experimento válido se manipula una variable y se controlan las demás. Para apoyar una conclusión, el cambio realizado debe estar directamente relacionado con la variable que se quiere evaluar.",
      route: ["Identifica la conclusión de Camila.", "Reconoce la variable que desea evaluar.", "Distingue variable independiente, dependiente y controladas.", "Elige la modificación que prueba la conclusión."],
      correctStrategy: "Modificar la variable relevante y mantener las demás condiciones controladas.",
      miniQuestion: "Para probar una conclusión experimental, se debe cambiar:",
      miniChoices: [
        { text: "la variable que se quiere evaluar, controlando las demás.", correct: true },
        { text: "muchas variables al mismo tiempo sin registro.", correct: false },
        { text: "solo el resultado esperado, sin tocar el montaje.", correct: false }
      ]
    },
    107: {
      icon: "🥦",
      title: "Simulador interactivo · Nutrición y estreñimiento",
      skill: "función digestiva, fibra y selección de alimentos",
      focus: "usar una tabla de compuestos de alimentos para elegir los que ayudan a solucionar el estreñimiento.",
      keyIdea: "La fibra dietaria favorece el tránsito intestinal. Para resolver la pregunta, se debe leer la tabla y seleccionar alimentos ricos en el compuesto asociado con mejorar el estreñimiento.",
      route: ["Identifica el problema: estreñimiento.", "Relaciona el problema con la fibra.", "Consulta en la tabla qué alimentos tienen ese compuesto.", "Elige el grupo de alimentos adecuado."],
      correctStrategy: "Conectar fibra dietaria + tránsito intestinal + alimentos que la contienen.",
      miniQuestion: "Para mejorar el estreñimiento, suele recomendarse aumentar el consumo de:",
      miniChoices: [
        { text: "alimentos ricos en fibra.", correct: true },
        { text: "solo alimentos sin ningún residuo vegetal.", correct: false },
        { text: "sustancias que reduzcan completamente el movimiento intestinal.", correct: false }
      ]
    },
    108: {
      icon: "🥔",
      title: "Simulador interactivo · Tamaño de muestra y velocidad de reacción",
      skill: "indagación, variables y representación gráfica de un experimento",
      focus: "representar la relación entre tamaño del trozo de papa y tiempo de reacción con agua oxigenada.",
      keyIdea: "Si la hipótesis indica que al aumentar el tamaño del trozo aumenta el tiempo de reacción, la gráfica debe mostrar una relación creciente entre variable independiente y dependiente.",
      route: ["Identifica la variable independiente: tamaño del trozo.", "Identifica la dependiente: tiempo de reacción.", "Lee la dirección de la hipótesis.", "Elige la gráfica con tendencia creciente."],
      correctStrategy: "Tamaño mayor en el eje x asociado con tiempo mayor en el eje y.",
      miniQuestion: "Si una hipótesis dice 'a mayor tamaño, mayor tiempo', la gráfica esperada es:",
      miniChoices: [
        { text: "creciente: los valores de tiempo aumentan cuando aumenta el tamaño.", correct: true },
        { text: "decreciente: el tiempo baja cuando aumenta el tamaño.", correct: false },
        { text: "sin ejes porque no hay variables.", correct: false }
      ]
    },
    109: {
      icon: "❄️",
      title: "Simulador interactivo · Trituración criogénica y propiedades del caucho",
      skill: "transferencia de energía y cambio de propiedades de materiales",
      focus: "explicar qué ocurre si el caucho no se enfría antes de triturarlo.",
      keyIdea: "Al enfriar intensamente el caucho, disminuye su energía interna y cambia su comportamiento mecánico: se vuelve más rígido o quebradizo, facilitando la trituración en granos pequeños.",
      route: ["Reconoce el papel del túnel de enfriamiento.", "Relaciona temperatura baja con energía interna menor.", "Conecta enfriamiento con fragilidad del caucho.", "Elige la consecuencia de no enfriar."],
      correctStrategy: "Sin enfriamiento, el caucho conserva propiedades elásticas y la trituración fina se dificulta.",
      miniQuestion: "La trituración criogénica funciona porque el enfriamiento hace que el caucho:",
      miniChoices: [
        { text: "se vuelva más rígido o quebradizo y sea más fácil de fragmentar.", correct: true },
        { text: "se derrita antes de entrar al molino.", correct: false },
        { text: "aumente su elasticidad hasta impedir cualquier cambio.", correct: false }
      ]
    },
    110: {
      icon: "⚙️",
      title: "Simulador interactivo · Beneficios de un proceso industrial",
      skill: "propiedades de materiales y comparación de procesos",
      focus: "comparar trituración criogénica y trituración simple para identificar el beneficio del enfriamiento.",
      keyIdea: "Un proceso industrial se evalúa comparando resultados, eficiencia y propiedades del material. Si el enfriamiento permite obtener granos pequeños con menos esfuerzo, ese es el beneficio frente a la trituración simple.",
      route: ["Compara qué hace cada proceso.", "Identifica qué resultado se desea obtener.", "Relaciona enfriamiento con facilidad de trituración.", "Elige el beneficio más directo y verificable."],
      correctStrategy: "La trituración criogénica facilita obtener partículas pequeñas al volver el caucho más quebradizo.",
      miniQuestion: "Una ventaja de enfriar el caucho antes de molerlo es que:",
      miniChoices: [
        { text: "facilita fragmentarlo en partículas más pequeñas.", correct: true },
        { text: "elimina la necesidad de molinos o equipos.", correct: false },
        { text: "hace que el caucho no pueda cambiar de forma nunca.", correct: false }
      ]
    },
    111: {
      icon: "🌡️",
      title: "Simulador interactivo · Energía interna y enfriamiento",
      skill: "termodinámica y transferencia de energía térmica",
      focus: "explicar qué ocurre con la energía interna del caucho al entrar en contacto con nitrógeno líquido muy frío.",
      keyIdea: "Cuando un material caliente o a mayor temperatura entra en contacto con una sustancia mucho más fría, transfiere energía térmica hacia ella. Por eso disminuye su temperatura y su energía interna.",
      route: ["Compara temperaturas: caucho vs nitrógeno líquido.", "Determina dirección de transferencia de calor.", "Relaciona pérdida de energía con menor temperatura.", "Elige qué pasa con la energía interna del caucho."],
      correctStrategy: "El caucho transfiere energía al nitrógeno y su energía interna disminuye.",
      miniQuestion: "Al enfriarse, la energía interna de un material generalmente:",
      miniChoices: [
        { text: "disminuye porque pierde energía térmica.", correct: true },
        { text: "aumenta sin recibir energía externa.", correct: false },
        { text: "permanece igual aunque cambie la temperatura.", correct: false }
      ]
    },
    112: {
      icon: "🎈",
      title: "Simulador interactivo · Gas ideal a presión constante",
      skill: "ley de Charles, temperatura y volumen de un gas",
      focus: "predecir qué ocurre con el volumen de un gas ideal si aumenta la temperatura a presión constante.",
      keyIdea: "A presión constante, el volumen de un gas ideal aumenta cuando aumenta la temperatura absoluta. Es una relación directa entre temperatura y volumen.",
      route: ["Identifica que la presión es constante.", "Reconoce la relación T-V del gas ideal.", "Predice el cambio de volumen cuando sube la temperatura.", "Elige la opción que muestre aumento proporcional."],
      correctStrategy: "A mayor temperatura, mayor volumen si la presión permanece constante.",
      miniQuestion: "Si un gas ideal se calienta a presión constante, su volumen tiende a:",
      miniChoices: [
        { text: "aumentar.", correct: true },
        { text: "disminuir siempre hasta cero.", correct: false },
        { text: "mantenerse fijo sin importar la temperatura.", correct: false }
      ]
    },
    113: {
      icon: "🦋",
      title: "Simulador interactivo · Metamorfosis de insectos",
      skill: "ciclo de vida, metamorfosis completa e incompleta",
      focus: "identificar el modelo de metamorfosis de las mariposas a partir de etapas del ciclo de vida.",
      keyIdea: "Las mariposas presentan metamorfosis completa: huevo, larva u oruga, pupa o crisálida y adulto. La presencia de una etapa de pupa es clave para reconocerla.",
      route: ["Identifica las etapas del ciclo.", "Busca si hay larva y pupa.", "Compara con los modelos de metamorfosis.", "Elige el modelo de metamorfosis completa."],
      correctStrategy: "Reconocer huevo + larva + pupa + adulto como metamorfosis completa.",
      miniQuestion: "Una mariposa tiene metamorfosis completa porque incluye:",
      miniChoices: [
        { text: "etapa de larva y pupa antes del adulto.", correct: true },
        { text: "solo crecimiento directo sin cambios corporales.", correct: false },
        { text: "división celular sin ciclo de vida observable.", correct: false }
      ]
    },
    114: {
      icon: "🐟",
      title: "Simulador interactivo · Rango de tolerancia ambiental",
      skill: "ecología, condiciones ambientales y supervivencia de organismos",
      focus: "predecir qué ocurre con peces cuando las condiciones del acuario salen de su rango adecuado.",
      keyIdea: "Los organismos tienen rangos de tolerancia para variables como temperatura, pH u oxígeno. Si el ambiente sale de esos rangos, disminuye su supervivencia o se afecta su funcionamiento.",
      route: ["Identifica las condiciones que necesita el tetra cardenal.", "Compara con las nuevas condiciones.", "Determina si están dentro o fuera del rango.", "Elige la consecuencia biológica esperada."],
      correctStrategy: "Fuera del rango de tolerancia, los peces se estresan, enferman o mueren.",
      miniQuestion: "Cuando una condición ambiental sale del rango de tolerancia de una especie, esta puede:",
      miniChoices: [
        { text: "presentar estrés, menor supervivencia o muerte.", correct: true },
        { text: "mejorar siempre sin importar la magnitud del cambio.", correct: false },
        { text: "dejar de necesitar condiciones ambientales.", correct: false }
      ]
    },
    115: {
      icon: "🚿",
      title: "Simulador interactivo · Intensidad y distancia",
      skill: "propagación, dispersión e intensidad con la distancia",
      focus: "predecir cómo cambia la intensidad de gotas cuando aumenta la distancia al rociador.",
      keyIdea: "Cuando un flujo se dispersa en un área mayor, la intensidad que llega a un punto disminuye con la distancia. La pregunta exige reconocer tendencia decreciente.",
      route: ["Lee cómo cambia la intensidad al aumentar distancia.", "Identifica los datos dados como referencia.", "Extiende la tendencia hasta 5 m.", "Elige la opción con menor intensidad coherente."],
      correctStrategy: "A mayor distancia del rociador, menor intensidad de gotas recibidas.",
      miniQuestion: "Si la intensidad disminuye al aumentar la distancia, a 5 m debe ser:",
      miniChoices: [
        { text: "menor que a distancias más cercanas.", correct: true },
        { text: "mayor que junto al rociador.", correct: false },
        { text: "igual siempre, aunque las gotas se dispersen.", correct: false }
      ]
    },
    116: {
      icon: "🧫",
      title: "Simulador interactivo · Mezclas, solubilidad e hipótesis",
      skill: "indagación química y miscibilidad de sustancias",
      focus: "evaluar si alcohol y aceite se mezclan a partir de resultados experimentales y una hipótesis.",
      keyIdea: "Para validar una hipótesis se comparan predicción y resultado. Si el alcohol y el aceite forman fases separadas, no son miscibles bajo esas condiciones.",
      route: ["Lee la hipótesis del estudiante.", "Observa el resultado de la mezcla.", "Compara si se mezclan o forman fases.", "Concluye si la hipótesis es válida."],
      correctStrategy: "Contrastar hipótesis con evidencia experimental sobre miscibilidad.",
      miniQuestion: "Si dos líquidos forman dos capas después de mezclarlos, se concluye que:",
      miniChoices: [
        { text: "no son miscibles en esas condiciones.", correct: true },
        { text: "se mezclaron completamente a nivel visible.", correct: false },
        { text: "desapareció una de las sustancias.", correct: false }
      ]
    },
    117: {
      icon: "🦠",
      title: "Simulador interactivo · Crecimiento bacteriano y datos",
      skill: "representación de datos de crecimiento biológico",
      focus: "elegir el formato que representa correctamente el crecimiento bacteriano durante 14 horas.",
      keyIdea: "Un crecimiento bacteriano se representa comparando tiempo y cantidad de bacterias. El formato correcto conserva el orden temporal y los valores o tendencia indicados por los datos.",
      route: ["Identifica la variable tiempo.", "Identifica la variable cantidad de bacterias.", "Revisa cómo evoluciona durante 14 horas.", "Elige el formato que respeta los datos."],
      correctStrategy: "Representar cantidad de bacterias en función del tiempo sin alterar la tendencia.",
      miniQuestion: "Para representar crecimiento bacteriano en el tiempo, conviene usar un formato que muestre:",
      miniChoices: [
        { text: "tiempo y cantidad de bacterias en orden cronológico.", correct: true },
        { text: "solo nombres de bacterias sin datos temporales.", correct: false },
        { text: "valores desordenados que cambian la tendencia.", correct: false }
      ]
    },
    118: {
      icon: "🧬",
      title: "Simulador interactivo · Alelos y genotipo",
      skill: "genética, homocigoto y heterocigoto",
      focus: "determinar si el individuo resultante tiene alelos iguales o diferentes para un gen.",
      keyIdea: "Un individuo es homocigoto si posee dos alelos iguales para un gen y heterocigoto si posee alelos diferentes. La respuesta depende de leer el cruce y comparar los alelos recibidos.",
      route: ["Identifica los alelos de cada progenitor.", "Determina qué alelos recibe el individuo.", "Compara si son iguales o diferentes.", "Elige homocigoto o heterocigoto según el caso."],
      correctStrategy: "Alelos iguales = homocigoto; alelos diferentes = heterocigoto.",
      miniQuestion: "Un organismo heterocigoto para un gen tiene:",
      miniChoices: [
        { text: "dos alelos diferentes para ese gen.", correct: true },
        { text: "dos alelos iguales para ese gen.", correct: false },
        { text: "ningún alelo para el gen analizado.", correct: false }
      ]
    },
    119: {
      icon: "⚗️",
      title: "Simulador interactivo · Selección de sustancias por propiedades",
      skill: "propiedades físicas, solubilidad y conductividad",
      focus: "elegir una sustancia que cumpla simultáneamente punto de ebullición, solubilidad y no conductividad.",
      keyIdea: "Cuando hay varios criterios, la sustancia correcta debe cumplir todos al mismo tiempo. No basta con cumplir solo una propiedad.",
      route: ["Lista los tres criterios pedidos.", "Revisa punto de ebullición menor que 130 °C.", "Verifica solubilidad en agua.", "Confirma que no conduzca electricidad."],
      correctStrategy: "Filtrar la tabla criterio por criterio hasta quedar con la sustancia que cumple todo.",
      miniQuestion: "Si una pregunta pide cumplir tres propiedades, la opción correcta debe:",
      miniChoices: [
        { text: "satisfacer simultáneamente las tres condiciones.", correct: true },
        { text: "cumplir solo la primera condición y omitir las demás.", correct: false },
        { text: "elegirse por nombre aunque contradiga la tabla.", correct: false }
      ]
    },
    120: {
      icon: "🔥",
      title: "Simulador interactivo · Cambios de estado y curva de calentamiento",
      skill: "temperatura, tiempo y cambio de estado del hierro",
      focus: "elegir la gráfica donde la temperatura permanece constante durante el cambio de estado aunque se siga suministrando calor.",
      keyIdea: "Durante un cambio de estado, la energía suministrada se usa para modificar la organización de las partículas, por eso la temperatura puede permanecer constante durante un intervalo.",
      route: ["Identifica que se calienta el hierro.", "Reconoce el tramo en que cambia de estado.", "Recuerda que la temperatura no cambia durante ese tramo.", "Elige la gráfica con meseta durante el cambio de estado."],
      correctStrategy: "La curva sube, luego muestra temperatura constante durante el cambio de estado y después puede subir otra vez.",
      miniQuestion: "En una curva de calentamiento, una meseta indica que:",
      miniChoices: [
        { text: "ocurre un cambio de estado a temperatura constante.", correct: true },
        { text: "el material dejó de recibir energía para siempre.", correct: false },
        { text: "la temperatura siempre baja durante el calentamiento.", correct: false }
      ]
    }
  };
  const fallback = {
    icon: "🔬",
    title: `Simulador interactivo · Ciencias Naturales · Pregunta ${question.number}`,
    skill: "razonamiento científico tipo Saber 11",
    focus: "identificar fenómeno, variables, evidencia y explicación científica.",
    keyIdea: "En Ciencias Naturales se responde conectando evidencia con conceptos científicos. Se deben reconocer variables, procesos, relaciones causa-efecto y conclusiones sustentadas.",
    route: ["Lee el fenómeno o experimento.", "Identifica variables y datos clave.", "Relaciona con el concepto científico.", "Elige la opción que se sostiene con evidencia."],
    correctStrategy: "Usar evidencia del enunciado y concepto científico para justificar la opción.",
    miniQuestion: "Una buena respuesta científica debe:",
    miniChoices: [
      { text: "basarse en evidencia y en el concepto del fenómeno.", correct: true },
      { text: "elegirse por intuición sin revisar datos.", correct: false },
      { text: "ignorar variables y condiciones del experimento.", correct: false }
    ]
  };
  const profile = profiles[number] || fallback;
  return {
    ...profile,
    chips: buildS1ScienceChips(question, profile),
    strategyChoices: buildS1ScienceStrategyChoices(profile),
    teacherNote: buildS1ScienceTeacherNote(question, profile)
  };
}

function buildS1ScienceChips(question, profile) {
  const base = [
    { text: "Identificar el fenómeno o problema científico del enunciado", correct: true },
    { text: "Reconocer variables, datos, condiciones o evidencia disponible", correct: true },
    { text: "Relacionar la situación con el concepto científico evaluado", correct: true },
    { text: "Comparar cada opción con la evidencia del problema", correct: true }
  ];
  const extraByKeyword = String(`${question.componente || ""} ${profile.skill || ""}`).toLowerCase();
  let extra = { text: "Formular una explicación coherente con causa, efecto y evidencia", correct: true };
  if (extraByKeyword.includes("indagación") || extraByKeyword.includes("hipótesis") || extraByKeyword.includes("experimento")) {
    extra = { text: "Diferenciar hipótesis, variable independiente, variable dependiente y conclusión", correct: true };
  } else if (extraByKeyword.includes("gráfica") || extraByKeyword.includes("representación") || extraByKeyword.includes("datos")) {
    extra = { text: "Verificar ejes, unidades, tendencia y correspondencia con los datos", correct: true };
  } else if (extraByKeyword.includes("termodinámica") || extraByKeyword.includes("energía")) {
    extra = { text: "Determinar dirección de transferencia de energía y cambio de temperatura", correct: true };
  } else if (extraByKeyword.includes("biología") || extraByKeyword.includes("ecología") || extraByKeyword.includes("genética")) {
    extra = { text: "Relacionar estructura, función, organismo y ambiente", correct: true };
  }
  const distractors = [
    { text: "Elegir la opción más larga sin analizar el fenómeno", correct: false },
    { text: "Responder solo por memoria sin usar los datos del enunciado", correct: false },
    { text: "Cambiar varias variables al tiempo y concluir sin control", correct: false },
    { text: "Ignorar las condiciones iniciales del problema", correct: false }
  ];
  return [base[0], base[1], extra, base[2], base[3], distractors[Number(question.number) % distractors.length]];
}

function buildS1ScienceStrategyChoices(profile) {
  return [
    { text: profile.correctStrategy, correct: true },
    { text: "Seleccionar una respuesta por intuición, aunque no conecte datos y concepto científico.", correct: false },
    { text: "Escoger la opción que mencione una palabra del enunciado, sin revisar si explica el fenómeno.", correct: false }
  ];
}

function buildS1ScienceTeacherNote(question, profile) {
  return `Esta pregunta de Ciencias Naturales fortalece ${profile.skill}. Para resolverla al estilo Saber 11, el estudiante debe pasar de leer datos a explicar relaciones: fenómeno, variable, evidencia, concepto y conclusión. Componente trabajado: ${question.componente || "Ciencias Naturales"}.`;
}

function getS1ScienceContextSnippet(question) {
  const stem = stripHtml(question.stem || "").replace(/\s+/g, " ").trim();
  const prompt = stripHtml(question.prompt || "").replace(/\s+/g, " ").trim();
  const combined = `${stem} ${prompt}`.trim();
  return combined.length > 460 ? `${combined.slice(0, 460)}…` : combined;
}

function renderS1ScienceGuidedSimulator(question, config) {
  const chips = (config.chips || []).map((chip, index) => `
    <button class="guided-chip science-chip" type="button" data-index="${index}" data-correct="${chip.correct ? "1" : "0"}">${escapeHtml(chip.text)}</button>
  `).join("");
  const strategies = (config.strategyChoices || []).map((choice, index) => `
    <button class="guided-choice science-choice" type="button" data-group="strategy" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");
  const miniChoices = (config.miniChoices || []).map((choice, index) => `
    <button class="guided-choice science-choice" type="button" data-group="mini" data-index="${index}" data-correct="${choice.correct ? "1" : "0"}">${escapeHtml(choice.text)}</button>
  `).join("");
  const options = (question.options || []).map(option => `
    <button class="sim-answer science-final-answer" type="button" data-answer="${escapeHtml(option.letter)}">
      <strong>${escapeHtml(option.letter)}</strong><span>${escapeHtml(option.text)}</span>
    </button>
  `).join("");
  const routeItems = (config.route || []).map(item => `<li>${escapeHtml(item)}</li>`).join("");
  const contextSnippet = getS1ScienceContextSnippet(question);

  return `
    <article class="notebook-card large notebook-simulator-card science-simulator-card" data-question="${Number(question.number)}">
      <p class="eyebrow">${escapeHtml(config.icon)} Simulador · Ciencias Naturales Saber 11</p>
      <h3>${escapeHtml(config.title)}</h3>
      <p>${escapeHtml(config.focus)}</p>

      <div class="sim-intro-grid science-intro-grid">
        <section class="sim-mini-board">
          <h4>Reto científico</h4>
          <p><strong>${escapeHtml(config.skill)}</strong></p>
          <p><strong>Competencia:</strong> ${escapeHtml(question.competencia || "Uso comprensivo del conocimiento científico")}</p>
          <p><strong>Componente:</strong> ${escapeHtml(question.componente || "Fenómenos naturales")}</p>
          <div class="reading-route-box science-route-box">
            <strong>Ruta paso a paso</strong>
            <ol>${routeItems}</ol>
          </div>
        </section>
        <section class="sim-mini-board sim-concept">
          <h4>Idea científica clave</h4>
          <div class="average-formula guided-concept-box science-concept-box">${escapeHtml(config.keyIdea)}</div>
          <p class="sim-context-snippet">${escapeHtml(contextSnippet)}</p>
        </section>
      </div>

      <div class="sim-steps" aria-label="Simulador guiado de Ciencias Naturales pregunta ${escapeHtml(question.number)}">
        <section class="sim-step active" data-science-step="1">
          <div class="sim-step-head"><span>Paso 1</span><h4>Detecta datos, variables y evidencias</h4></div>
          <p>Selecciona las acciones que sí ayudan a resolver esta pregunta como lo haría un estudiante entrenado para Saber 11.</p>
          <div class="guided-chip-grid" id="scienceChipGrid">${chips}</div>
          <button class="secondary-btn" type="button" id="checkScienceChipsBtn">Verificar claves científicas</button>
          <p id="scienceChipsFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-science-step="2">
          <div class="sim-step-head"><span>Paso 2</span><h4>Elige la estrategia de solución</h4></div>
          <p>La pregunta se resuelve conectando evidencia con concepto científico. Escoge la mejor ruta.</p>
          <div class="guided-choice-grid" id="scienceStrategyGrid">${strategies}</div>
          <p id="scienceStrategyFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-science-step="3">
          <div class="sim-step-head"><span>Paso 3</span><h4>Microentrenamiento científico</h4></div>
          <p>${escapeHtml(config.miniQuestion)}</p>
          <div class="guided-choice-grid" id="scienceMiniGrid">${miniChoices}</div>
          <p id="scienceMiniFeedback" class="sim-feedback" aria-live="polite"></p>
        </section>

        <section class="sim-step active" data-science-step="4">
          <div class="sim-step-head"><span>Paso 4</span><h4>Responde como en Saber 11</h4></div>
          <p>Elige una alternativa y revisa la retroalimentación. La meta es justificar con evidencia, no adivinar.</p>
          <div class="sim-answer-grid guided-answer-grid science-answer-grid" id="scienceFinalAnswerGrid">${options}</div>
          <div id="scienceFinalFeedback" class="sim-final-feedback" aria-live="polite"></div>
        </section>
      </div>

      <div class="sim-teacher-note"><strong>Nota didáctica:</strong> ${escapeHtml(config.teacherNote)}</div>
    </article>
  `;
}

function initS1ScienceGuidedSimulator(question) {
  const config = getS1ScienceProfile(question);
  if (!config) return;

  const chipGrid = document.getElementById("scienceChipGrid");
  const checkChipsBtn = document.getElementById("checkScienceChipsBtn");
  const chipsFeedback = document.getElementById("scienceChipsFeedback");
  const strategyGrid = document.getElementById("scienceStrategyGrid");
  const strategyFeedback = document.getElementById("scienceStrategyFeedback");
  const miniGrid = document.getElementById("scienceMiniGrid");
  const miniFeedback = document.getElementById("scienceMiniFeedback");
  const finalGrid = document.getElementById("scienceFinalAnswerGrid");
  const finalFeedback = document.getElementById("scienceFinalFeedback");

  if (chipGrid) {
    chipGrid.addEventListener("click", event => {
      const button = event.target.closest(".science-chip");
      if (!button) return;
      button.classList.toggle("selected");
      if (chipsFeedback) {
        chipsFeedback.textContent = "Claves seleccionadas. Ahora verifica si realmente ayudan a resolver el fenómeno, experimento o gráfico.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  if (checkChipsBtn) {
    checkChipsBtn.addEventListener("click", () => {
      const buttons = Array.from(document.querySelectorAll(".science-chip"));
      const wrongSelected = buttons.some(button => button.classList.contains("selected") && button.dataset.correct !== "1");
      const missingCorrect = buttons.some(button => !button.classList.contains("selected") && button.dataset.correct === "1");
      buttons.forEach(button => {
        button.classList.remove("correct", "wrong");
        if (button.classList.contains("selected") && button.dataset.correct === "1") button.classList.add("correct");
        if (button.classList.contains("selected") && button.dataset.correct !== "1") button.classList.add("wrong");
      });
      if (!wrongSelected && !missingCorrect) {
        chipsFeedback.innerHTML = "<strong>Excelente.</strong> Identificaste las claves científicas necesarias: fenómeno, evidencia, variables y concepto.";
        chipsFeedback.className = "sim-feedback ok";
      } else if (wrongSelected) {
        chipsFeedback.innerHTML = "<strong>Revisa.</strong> Hay una clave distractora. En Ciencias Naturales no se responde solo por intuición: se usan datos, variables y explicación.";
        chipsFeedback.className = "sim-feedback error";
      } else {
        chipsFeedback.innerHTML = "<strong>Vas bien.</strong> Falta una clave importante para sostener la respuesta científicamente.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  function bindScienceChoiceGrid(grid, feedback, correctMessage, errorMessage) {
    if (!grid) return;
    grid.addEventListener("click", event => {
      const button = event.target.closest(".science-choice");
      if (!button) return;
      grid.querySelectorAll(".science-choice").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.correct === "1") {
        button.classList.add("correct");
        if (feedback) {
          feedback.innerHTML = `<strong>Correcto.</strong> ${escapeHtml(correctMessage)}`;
          feedback.className = "sim-feedback ok";
        }
      } else {
        button.classList.add("wrong");
        if (feedback) {
          feedback.innerHTML = `<strong>Revisa.</strong> ${escapeHtml(errorMessage)}`;
          feedback.className = "sim-feedback error";
        }
      }
    });
  }

  bindScienceChoiceGrid(strategyGrid, strategyFeedback, "Esa ruta conecta evidencia, variable y concepto científico.", "Esa estrategia no justifica científicamente la respuesta. Vuelve al fenómeno y a los datos del enunciado.");
  bindScienceChoiceGrid(miniGrid, miniFeedback, "El microentrenamiento confirma el concepto que necesitas antes de responder.", "Vuelve a la idea clave y revisa qué relación científica se está evaluando.");

  if (finalGrid) {
    finalGrid.addEventListener("click", event => {
      const button = event.target.closest(".science-final-answer");
      if (!button) return;
      finalGrid.querySelectorAll(".science-final-answer").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.answer === question.correctAnswer) {
        button.classList.add("correct");
        finalFeedback.innerHTML = `<strong>Correcto.</strong> La opción ${escapeHtml(question.correctAnswer)} es adecuada. ${escapeHtml(stripHtml(question.explanation || "La elección coincide con el fenómeno, los datos y el concepto científico trabajado."))}`;
        finalFeedback.className = "sim-final-feedback ok";
      } else {
        button.classList.add("wrong");
        finalFeedback.innerHTML = `<strong>Revisa tu elección.</strong> Antes de volver a la pregunta, aplica esta ruta: ${escapeHtml(config.correctStrategy)} Después compara tu opción con la evidencia y el concepto científico.`;
        finalFeedback.className = "sim-final-feedback error";
      }
    });
  }
}

const NOTEBOOK_RENDER_SIMULATOR_BASE_SCIENCE_S1 = renderNotebookSimulator;
const NOTEBOOK_INIT_SIMULATOR_BASE_SCIENCE_S1 = initNotebookSimulator;

renderNotebookSimulator = function(question, customResource) {
  if (isS1ScienceSimulatorQuestion(question)) {
    const config = getS1ScienceProfile(question);
    return renderS1ScienceGuidedSimulator(question, config);
  }
  return NOTEBOOK_RENDER_SIMULATOR_BASE_SCIENCE_S1(question, customResource);
};

initNotebookSimulator = function(question) {
  if (isS1ScienceSimulatorQuestion(question)) {
    initS1ScienceGuidedSimulator(question);
    return;
  }
  NOTEBOOK_INIT_SIMULATOR_BASE_SCIENCE_S1(question);
};



/* ==========================================================
   Simuladores dinámicos por pregunta · Sección 2 Ciencias Naturales
   Preguntas 51 a 79
   ========================================================== */

function isS2ScienceSimulatorQuestion(question) {
  return Number(question.session) === 2 &&
    String(question.area || "").toLowerCase().includes("ciencias") &&
    Number(question.number) >= 51 && Number(question.number) <= 79;
}

function getS2ScienceProfile(question) {
  const number = Number(question.number);
  const profiles = {
    51: {
      icon: "🐦",
      title: "Simulador interactivo · Colibríes, polinización y equilibrio ecosistémico",
      skill: "relacionar una especie con su función ecológica en el ecosistema",
      focus: "comprender por qué la desaparición de un polinizador afecta la reproducción de plantas y, en cadena, la estabilidad del ecosistema.",
      keyIdea: "En un ecosistema las especies cumplen funciones. Si desaparece un polinizador, se reduce la reproducción de ciertas plantas y se afecta la disponibilidad de alimento, refugio y relaciones entre organismos.",
      route: ["Reconoce el organismo clave: colibrí rutilante.", "Identifica su función: transportar polen entre flores.", "Piensa en la consecuencia: menos reproducción vegetal.", "Elige la opción que explique una afectación ecosistémica, no una característica aislada."],
      correctStrategy: "Conectar especie polinizadora + reproducción de plantas + equilibrio del ecosistema.",
      miniQuestion: "Si una especie polinizadora desaparece, una consecuencia directa esperada es:",
      miniChoices: [{ text: "disminución en la reproducción de algunas plantas.", correct: true }, { text: "aumento automático de todas las plantas.", correct: false }, { text: "eliminación de todos los insectos depredadores.", correct: false }]
    },
    52: {
      icon: "🏊",
      title: "Simulador interactivo · Fuerzas durante un clavado",
      skill: "identificar fuerzas que actúan durante el movimiento",
      focus: "distinguir qué fuerza permanece constante mientras el clavadista está en el aire.",
      keyIdea: "Cerca de la superficie terrestre, la fuerza gravitacional actúa hacia abajo durante todo el recorrido. La fuerza normal solo aparece con superficies de contacto, y la flotación aparece cuando el cuerpo está en el agua.",
      route: ["Ubica el recorrido del clavadista.", "Distingue fases: borde, aire y agua.", "Pregunta qué fuerza permanece durante todo el trayecto.", "Descarta fuerzas que requieren contacto con superficie o fluido."],
      correctStrategy: "Analizar las condiciones para cada fuerza y escoger la que actúa de manera permanente.",
      miniQuestion: "Durante la caída en el aire, la fuerza que sigue actuando sobre el cuerpo es:",
      miniChoices: [{ text: "la fuerza gravitacional.", correct: true }, { text: "la fuerza normal del borde.", correct: false }, { text: "la fuerza de flotación del agua antes de tocarla.", correct: false }]
    },
    53: {
      icon: "🧪",
      title: "Simulador interactivo · Escala de pH y sustancias ácidas",
      skill: "clasificar sustancias según su pH",
      focus: "identificar la característica común entre sustancias cuyo pH se encuentra en la zona ácida.",
      keyIdea: "En la escala de pH, las sustancias ácidas tienen pH menor que 7 y liberan iones H⁺. Dos sustancias pueden ser ácidas aunque no tengan exactamente el mismo pH.",
      route: ["Lee la regla: ácido, básico o neutro.", "Ubica el pH del limón y del tomate.", "Compara su clasificación, no solo su valor exacto.", "Elige la característica que ambas comparten."],
      correctStrategy: "Usar la escala de pH para clasificar ambas sustancias como ácidas.",
      miniQuestion: "Si dos sustancias tienen pH menor que 7, entonces ambas son:",
      miniChoices: [{ text: "ácidas.", correct: true }, { text: "básicas.", correct: false }, { text: "neutras necesariamente.", correct: false }]
    },
    54: {
      icon: "🫁",
      title: "Simulador interactivo · Presión y volumen en alvéolos",
      skill: "explicar una relación inversa entre presión y volumen en gases",
      focus: "interpretar cómo una reducción del volumen alveolar puede aumentar la presión del gas disponible.",
      keyIdea: "Cuando la cantidad de gas y la temperatura se consideran constantes, presión y volumen se relacionan de forma inversa: si el volumen disminuye, la presión aumenta.",
      route: ["Reconoce el sistema: alvéolos y aire.", "Identifica el cambio: reducción del volumen.", "Aplica la relación inversa presión-volumen.", "Elige la opción que explique aumento de presión por menor volumen."],
      correctStrategy: "Aplicar proporcionalidad inversa entre presión y volumen.",
      miniQuestion: "Si el volumen de un gas disminuye y las demás condiciones se mantienen, su presión tiende a:",
      miniChoices: [{ text: "aumentar.", correct: true }, { text: "disminuir siempre.", correct: false }, { text: "desaparecer.", correct: false }]
    },
    55: {
      icon: "📊",
      title: "Simulador interactivo · Gráficas de vacunas y cepas",
      skill: "representar datos científicos en una gráfica",
      focus: "seleccionar la gráfica que respeta los valores reportados para PPSV23 y PCV13.",
      keyIdea: "Una gráfica correcta debe conservar los datos del enunciado. Si la vacuna PPSV23 cubre 23 cepas y PCV13 cubre 13, las barras deben reflejar esos valores sin cambiar el orden ni la magnitud.",
      route: ["Extrae los valores exactos del texto.", "Asocia cada valor con su vacuna.", "Compara altura de barras o etiquetas.", "Descarta gráficas que cambian números, orden o proporción."],
      correctStrategy: "Verificar que la representación gráfica coincida con los datos originales.",
      miniQuestion: "Si una gráfica dice PPSV23 = 23 y PCV13 = 13, entonces debe mostrar:",
      miniChoices: [{ text: "una barra de PPSV23 mayor que la de PCV13.", correct: true }, { text: "ambas barras iguales.", correct: false }, { text: "PCV13 mayor que PPSV23.", correct: false }]
    },
    56: {
      icon: "💉",
      title: "Simulador interactivo · Vacunas y prevención de hospitalización",
      skill: "explicar el efecto preventivo de las vacunas",
      focus: "relacionar vacunación con disminución del contagio o enfermedad causada por cepas bacterianas.",
      keyIdea: "Las vacunas preparan el sistema inmune y reducen la posibilidad de enfermar gravemente o contagiarse por ciertas cepas, lo que puede disminuir hospitalizaciones.",
      route: ["Identifica qué buscan controlar las vacunas.", "Relaciona cepas bacterianas con neumonía.", "Piensa en prevención antes que tratamiento.", "Elige la opción que explique reducción del riesgo."],
      correctStrategy: "Relacionar vacunación con disminución del contagio o enfermedad por cepas bacterianas.",
      miniQuestion: "Una vacuna se usa principalmente para:",
      miniChoices: [{ text: "prevenir o reducir el riesgo de enfermedad.", correct: true }, { text: "aumentar el contagio.", correct: false }, { text: "cambiar directamente el volumen de los alvéolos.", correct: false }]
    },
    57: {
      icon: "🧬",
      title: "Simulador interactivo · Transporte de glucosa por membrana",
      skill: "diferenciar difusión simple, facilitada y transporte activo",
      focus: "identificar el tipo de transporte cuando una molécula entra a favor del gradiente con ayuda de proteínas transportadoras.",
      keyIdea: "La glucosa es polar y no atraviesa libremente la bicapa lipídica. Cuando entra a favor del gradiente mediante transportadores, el proceso es difusión facilitada mediada por transportadores.",
      route: ["Reconoce la molécula: glucosa.", "Pregunta si usa energía o no.", "Observa si requiere proteína de membrana.", "Distingue transportador de canal."],
      correctStrategy: "Identificar transporte pasivo con proteína transportadora: difusión facilitada.",
      miniQuestion: "Si una molécula entra sin gasto de ATP pero con ayuda de una proteína transportadora, el proceso es:",
      miniChoices: [{ text: "difusión facilitada.", correct: true }, { text: "transporte activo.", correct: false }, { text: "ósmosis exclusivamente.", correct: false }]
    },
    58: {
      icon: "🪲",
      title: "Simulador interactivo · Mutaciones, selección natural y Lamarck",
      skill: "explicar por qué la selección natural reevaluó ideas lamarckistas",
      focus: "comprender que las mutaciones aparecen en individuos y el ambiente favorece algunas variantes, no que el organismo cambie por necesidad durante su vida.",
      keyIdea: "La selección natural actúa sobre variaciones heredables ya existentes o surgidas por mutación. El ambiente no produce directamente el cambio útil en cada individuo; favorece a quienes ya poseen rasgos ventajosos.",
      route: ["Identifica la teoría comparada.", "Distingue necesidad individual de variación heredable.", "Relaciona mutación con ventaja en el ambiente.", "Elige la explicación basada en selección natural."],
      correctStrategy: "Explicar que las mutaciones aptas son favorecidas por el ambiente.",
      miniQuestion: "Según selección natural, un rasgo ventajoso aumenta en una población porque:",
      miniChoices: [{ text: "los individuos con ese rasgo sobreviven y se reproducen más.", correct: true }, { text: "todos los individuos lo adquieren por desearlo.", correct: false }, { text: "el ambiente cambia el ADN de todos por igual inmediatamente.", correct: false }]
    },
    59: {
      icon: "🪸",
      title: "Simulador interactivo · Hipótesis sobre corales albinos",
      skill: "evaluar hipótesis usando nueva evidencia",
      focus: "decidir si una hipótesis es suficiente cuando aparecen variables adicionales que también podrían explicar el fenómeno.",
      keyIdea: "Una hipótesis científica debe ser coherente con toda la evidencia disponible. Si hay otros factores como contaminación que también afectan a los corales, atribuir todo solo a temperatura puede ser insuficiente.",
      route: ["Identifica la hipótesis inicial.", "Revisa la nueva información.", "Pregunta si existe otra variable explicativa.", "Elige si la hipótesis queda confirmada o limitada."],
      correctStrategy: "Evaluar si la hipótesis explica todos los datos o si hay factores adicionales.",
      miniQuestion: "Cuando aparece una variable nueva que también puede afectar el resultado, la hipótesis inicial:",
      miniChoices: [{ text: "puede ser insuficiente y debe revisarse.", correct: true }, { text: "queda probada automáticamente.", correct: false }, { text: "ya no necesita evidencia.", correct: false }]
    },
    60: {
      icon: "🦋",
      title: "Simulador interactivo · Polillas, camuflaje y ambiente",
      skill: "predecir rasgos favorecidos por selección natural",
      focus: "relacionar color de polillas con camuflaje según el color del ambiente actual.",
      keyIdea: "El rasgo más común depende de cuál permite mayor supervivencia. Si los troncos vuelven a ser claros, las polillas claras se camuflan mejor y tienden a sobrevivir más.",
      route: ["Identifica los tonos disponibles.", "Reconoce el ambiente actual.", "Relaciona camuflaje con depredación.", "Elige el tono con mayor ventaja actual."],
      correctStrategy: "Conectar color del ambiente + camuflaje + mayor supervivencia.",
      miniQuestion: "Si el fondo del ambiente es claro, el rasgo de color que más favorece el camuflaje es:",
      miniChoices: [{ text: "tono claro.", correct: true }, { text: "tono oscuro siempre.", correct: false }, { text: "cualquier tono por igual sin importar el ambiente.", correct: false }]
    },
    61: {
      icon: "⛽",
      title: "Simulador interactivo · Combustibles fósiles y materia orgánica",
      skill: "identificar similitudes en el origen de carbón y petróleo",
      focus: "reconocer que ambos combustibles se formaron a partir de restos orgánicos sometidos a procesos geológicos durante millones de años.",
      keyIdea: "Carbón y petróleo son combustibles fósiles porque provienen de materia orgánica antigua transformada por presión, temperatura y tiempo geológico.",
      route: ["Lee el origen de cada combustible.", "Busca la característica común.", "Distingue composición actual de proceso de formación.", "Elige la similitud que aplique a ambos."],
      correctStrategy: "Comparar los procesos de formación y reconocer materia orgánica como origen común.",
      miniQuestion: "Una similitud clave entre carbón y petróleo es que ambos:",
      miniChoices: [{ text: "provienen de materia orgánica antigua.", correct: true }, { text: "se forman en pocos días.", correct: false }, { text: "son materia inorgánica pura desde su origen.", correct: false }]
    },
    62: {
      icon: "🔊",
      title: "Simulador interactivo · Sonido y grosor de la cuerda",
      skill: "interpretar resultados experimentales para aceptar o rechazar hipótesis",
      focus: "analizar cómo cambia la calidad del sonido cuando cambia el grosor de la cuerda en un teléfono de juguete.",
      keyIdea: "En indagación científica, una hipótesis se evalúa comparando predicción y resultados. Si el resultado muestra una relación contraria o distinta, la hipótesis se rechaza o se ajusta.",
      route: ["Identifica la hipótesis del estudiante.", "Lee la variable manipulada: grosor de la cuerda.", "Observa la tendencia en los resultados.", "Concluye si la hipótesis se sostiene o no."],
      correctStrategy: "Comparar hipótesis con tendencia experimental observada.",
      miniQuestion: "Si los datos muestran que al aumentar el grosor mejora el sonido, pero la hipótesis decía lo contrario, se concluye que la hipótesis es:",
      miniChoices: [{ text: "falsa o debe modificarse.", correct: true }, { text: "verdadera sin revisar datos.", correct: false }, { text: "irrelevante para el experimento.", correct: false }]
    },
    63: {
      icon: "⚗️",
      title: "Simulador interactivo · Neutralización ácido-base",
      skill: "reconocer una reacción de neutralización",
      focus: "identificar la reacción en la que un ácido reacciona con una base para formar sal y agua.",
      keyIdea: "Una neutralización típica ocurre entre ácido y base. El patrón general es: ácido + base → sal + agua. Por ejemplo, HCl + NaOH → NaCl + H₂O.",
      route: ["Busca un ácido en los reactivos.", "Busca una base en los reactivos.", "Verifica productos: sal y agua.", "Descarta reacciones con metales o solo formación de base."],
      correctStrategy: "Aplicar el patrón ácido + base → sal + agua.",
      miniQuestion: "La reacción que representa neutralización debe producir principalmente:",
      miniChoices: [{ text: "sal y agua.", correct: true }, { text: "solo un metal.", correct: false }, { text: "únicamente un gas sin sal.", correct: false }]
    },
    64: {
      icon: "🌸",
      title: "Simulador interactivo · Destilación en producción de perfumes",
      skill: "seleccionar métodos de separación de mezclas",
      focus: "identificar el método que permite separar esencias volátiles de una mezcla líquida en la producción de perfumes.",
      keyIdea: "La destilación separa componentes de una mezcla aprovechando diferencias en volatilidad o punto de ebullición. En perfumes, permite extraer y concentrar esencias.",
      route: ["Identifica el producto buscado: esencias.", "Pregunta si se separan líquidos o compuestos volátiles.", "Relaciona calor, vapor y condensación.", "Elige destilación, no decantación ni cristalización."],
      correctStrategy: "Usar propiedades físicas de volatilidad para escoger destilación.",
      miniQuestion: "Cuando se separan sustancias volátiles mediante evaporación y condensación, se usa:",
      miniChoices: [{ text: "destilación.", correct: true }, { text: "tamizado.", correct: false }, { text: "filtración de sólidos grandes.", correct: false }]
    },
    65: {
      icon: "📈",
      title: "Simulador interactivo · Concentración y lectura de gráfica",
      skill: "interpretar cambios de concentración en una reacción",
      focus: "corregir una conclusión errónea comparando concentraciones iniciales y tendencias durante el proceso.",
      keyIdea: "En una reacción, las concentraciones de reactivos suelen disminuir y las de productos aumentar hasta alcanzar equilibrio. La conclusión debe apoyarse en la gráfica y no en una lectura visual apresurada.",
      route: ["Distingue sustancias iniciales y productos.", "Compara valores en tiempo 0.", "Observa si suben o bajan durante el proceso.", "Elige la explicación que contradice la conclusión errónea."],
      correctStrategy: "Usar la tendencia de la gráfica para diferenciar concentraciones de M, L, N y Q.",
      miniQuestion: "Si M y L disminuyen mientras N y Q aumentan, lo más probable es que:",
      miniChoices: [{ text: "M y L actúen como reactivos y N y Q como productos.", correct: true }, { text: "todas tengan siempre la misma concentración.", correct: false }, { text: "ninguna concentración cambie con el tiempo.", correct: false }]
    },
    66: {
      icon: "🌕",
      title: "Simulador interactivo · Masa, peso y gravedad lunar",
      skill: "diferenciar masa y peso en distintos campos gravitacionales",
      focus: "calcular la masa de un objeto a partir de su peso en la Luna, usando que el peso depende de la gravedad.",
      keyIdea: "La masa no cambia por estar en otro planeta o satélite; el peso sí cambia porque depende de la gravedad. En la Luna, P = m·g_lunar.",
      route: ["Reconoce la fórmula P = m·g.", "Identifica que el peso dado es 50 N en la Luna.", "Usa la gravedad lunar indicada en el enunciado.", "Despeja masa: m = P / g."],
      correctStrategy: "Diferenciar masa de peso y aplicar P = m·g con la gravedad lunar.",
      miniQuestion: "Si P = m·g, entonces la masa se calcula como:",
      miniChoices: [{ text: "m = P ÷ g.", correct: true }, { text: "m = P × g.", correct: false }, { text: "m = g ÷ P.", correct: false }]
    },
    67: {
      icon: "🌾",
      title: "Simulador interactivo · Emisiones de metano y conclusiones de gráfica",
      skill: "interpretar tendencias en gráficas ambientales",
      focus: "seleccionar la conclusión que realmente se deduce del comportamiento de las emisiones de metano.",
      keyIdea: "Una conclusión científica sobre una gráfica debe respetar los datos: si una variable aumenta a más del doble, no se debe afirmar que fue constante ni triplicada si los valores no lo muestran.",
      route: ["Identifica la variable: emisiones de metano.", "Compara año inicial y año final.", "Calcula o estima razón de aumento.", "Escoge una conclusión proporcional a los datos."],
      correctStrategy: "Comparar valores iniciales y finales para justificar la tendencia.",
      miniQuestion: "Si una cantidad pasa de 10 a más de 20, una conclusión válida es que:",
      miniChoices: [{ text: "aumentó a más del doble.", correct: true }, { text: "se mantuvo constante.", correct: false }, { text: "disminuyó a la mitad.", correct: false }]
    },
    68: {
      icon: "♻️",
      title: "Simulador interactivo · Mezclas en biodigestores",
      skill: "clasificar mezclas homogéneas y heterogéneas",
      focus: "identificar que la mezcla inicial de residuos orgánicos tiene componentes distinguibles y no uniformes.",
      keyIdea: "Una mezcla heterogénea presenta composición no uniforme y componentes que pueden diferenciarse. En un biodigestor inicial, estiércol, residuos y agua no forman una sola fase uniforme inmediata.",
      route: ["Identifica los componentes agregados.", "Pregunta si se ven o distinguen fases.", "Diferencia mezcla inicial de productos finales.", "Elige heterogénea si la composición no es uniforme."],
      correctStrategy: "Clasificar según uniformidad y componentes visibles de la mezcla inicial.",
      miniQuestion: "Una mezcla con estiércol, residuos vegetales y otros componentes distinguibles se clasifica como:",
      miniChoices: [{ text: "heterogénea.", correct: true }, { text: "homogénea de una sola sustancia pura.", correct: false }, { text: "elemento químico puro.", correct: false }]
    },
    69: {
      icon: "🛡️",
      title: "Simulador interactivo · Seguridad en biodigestores",
      skill: "relacionar acumulación de gases con control de presión",
      focus: "elegir una acción segura para evitar acumulación de gases y aumento de presión.",
      keyIdea: "En sistemas cerrados donde se generan gases, una válvula de seguridad controla la presión. Revisarla evita acumulaciones peligrosas y permite liberar exceso de gas de forma controlada.",
      route: ["Reconoce el riesgo: acumulación de gases.", "Relaciona gas acumulado con aumento de presión.", "Identifica el dispositivo de seguridad.", "Elige mantenimiento o revisión, no eliminación del dispositivo."],
      correctStrategy: "Mantener y revisar la válvula de seguridad para controlar presión.",
      miniQuestion: "Para evitar aumento peligroso de presión en un biodigestor, se debe:",
      miniChoices: [{ text: "revisar la válvula de seguridad.", correct: true }, { text: "retirar la válvula para acelerar el proceso.", correct: false }, { text: "tapar todas las salidas de gas.", correct: false }]
    },
    70: {
      icon: "🧬",
      title: "Simulador interactivo · Bases nitrogenadas y gráfica correcta",
      skill: "representar datos biológicos en gráficas",
      focus: "seleccionar la gráfica que conserva los valores tabulados de bases nitrogenadas en ADN mitocondrial.",
      keyIdea: "Al graficar datos, cada barra o punto debe coincidir con la magnitud de la tabla. No se debe cambiar cuál base es mayor o menor ni invertir valores entre bases.",
      route: ["Lee la tabla de bases nitrogenadas.", "Reconoce el valor aproximado de A, T, C y G.", "Compara cada opción gráfica con la tabla.", "Descarta gráficas que cambian el orden de abundancia."],
      correctStrategy: "Verificar correspondencia entre tabla y gráfica para cada base nitrogenada.",
      miniQuestion: "Una gráfica científica correcta debe:",
      miniChoices: [{ text: "representar los valores de la tabla sin alterarlos.", correct: true }, { text: "mostrar la barra más alta al azar.", correct: false }, { text: "eliminar las categorías con menor valor.", correct: false }]
    },
    71: {
      icon: "🌳",
      title: "Simulador interactivo · Savia y transporte en plantas",
      skill: "explicar el movimiento de sustancias en plantas",
      focus: "comprender por qué el transporte de agua y nutrientes desde raíces hacia otras estructuras permite el funcionamiento de la planta.",
      keyIdea: "La savia transporta agua y nutrientes. En plantas altas, este movimiento es crucial para que hojas, tallos y otras partes reciban materiales necesarios para crecer y realizar funciones vitales.",
      route: ["Identifica qué transporta la savia.", "Reconoce desde dónde y hacia dónde se mueve.", "Relaciona transporte con nutrición y crecimiento.", "Descarta funciones no relacionadas como repeler insectos."],
      correctStrategy: "Conectar savia con transporte de agua y nutrientes desde raíces.",
      miniQuestion: "La función principal de la savia en plantas es:",
      miniChoices: [{ text: "transportar agua y nutrientes.", correct: true }, { text: "dar color a las flores únicamente.", correct: false }, { text: "eliminar todos los herbívoros.", correct: false }]
    },
    72: {
      icon: "🌬️",
      title: "Simulador interactivo · Instrumentos meteorológicos y viento",
      skill: "asociar instrumentos con magnitudes físicas",
      focus: "identificar el instrumento que mide velocidad del viento en un parque eólico.",
      keyIdea: "El anemómetro mide la velocidad del viento. En energía eólica, esta magnitud es esencial para verificar si el viento es suficiente para producir electricidad.",
      route: ["Identifica la magnitud requerida: velocidad del viento.", "Relaciona cada instrumento con lo que mide.", "Descarta barómetro, termómetro e higrómetro.", "Escoge anemómetro."],
      correctStrategy: "Asociar velocidad del viento con anemómetro.",
      miniQuestion: "El instrumento usado para medir velocidad del viento es:",
      miniChoices: [{ text: "anemómetro.", correct: true }, { text: "barómetro.", correct: false }, { text: "termómetro.", correct: false }]
    },
    73: {
      icon: "🌿",
      title: "Simulador interactivo · Musgo, humedad e interacciones ecológicas",
      skill: "explicar interacciones que mantienen el equilibrio del bosque",
      focus: "relacionar el musgo con humedad, retención de agua y presencia de otras especies.",
      keyIdea: "El musgo ayuda a retener humedad y crea microhábitats. Al sostener condiciones de humedad, favorece la presencia de organismos y contribuye al equilibrio del bosque.",
      route: ["Identifica las interacciones del musgo.", "Relaciona musgo con agua y humedad.", "Piensa en efectos sobre otras especies.", "Elige la opción que explique equilibrio ecológico."],
      correctStrategy: "Conectar musgo + humedad + especies asociadas + equilibrio del bosque.",
      miniQuestion: "Una función ecológica importante del musgo es:",
      miniChoices: [{ text: "contribuir a la humedad y a microhábitats.", correct: true }, { text: "eliminar toda el agua del bosque.", correct: false }, { text: "servir solo como decoración humana.", correct: false }]
    },
    74: {
      icon: "🍎",
      title: "Simulador interactivo · Datos nutricionales y conclusión investigativa",
      skill: "evaluar conclusiones con variables medidas y no medidas",
      focus: "determinar si una conclusión es válida cuando no se evaluó la variable que pretende explicar el resultado.",
      keyIdea: "Una conclusión científica debe basarse en variables medidas. Si no se evaluó el tamaño del fruto, no es válido concluir cómo el tamaño se relaciona con concentración de nutrientes.",
      route: ["Identifica qué variable se midió.", "Identifica qué variable aparece en la conclusión.", "Pregunta si esa variable fue evaluada.", "Decide si la conclusión está sustentada."],
      correctStrategy: "Verificar correspondencia entre datos recolectados y conclusión propuesta.",
      miniQuestion: "Si un estudio no midió el tamaño del fruto, entonces una conclusión sobre tamaño y nutrientes es:",
      miniChoices: [{ text: "no sustentada por esos datos.", correct: true }, { text: "automáticamente verdadera.", correct: false }, { text: "más fuerte que los datos medidos.", correct: false }]
    },
    75: {
      icon: "🚗",
      title: "Simulador interactivo · Cantidad de movimiento en choques",
      skill: "aplicar conservación de cantidad de movimiento",
      focus: "comprender por qué la velocidad final disminuye cuando el movimiento inicial se distribuye entre tres carros de igual masa.",
      keyIdea: "Si no hay fuerzas externas relevantes, la cantidad de movimiento se conserva. Al unirse tres carros de la misma masa, la velocidad final se reparte entre una masa total tres veces mayor.",
      route: ["Identifica masa inicial en movimiento.", "Reconoce que después se mueven tres carros juntos.", "Aplica conservación del momento.", "Concluye que la velocidad final es un tercio de la inicial."],
      correctStrategy: "Conservar cantidad de movimiento y considerar masa total final triple.",
      miniQuestion: "Si una masa m con velocidad v termina moviendo 3m, la velocidad final ideal es:",
      miniChoices: [{ text: "v/3.", correct: true }, { text: "3v.", correct: false }, { text: "v sin cambio necesariamente.", correct: false }]
    },
    76: {
      icon: "🔩",
      title: "Simulador interactivo · Propiedades de metales para automóviles",
      skill: "seleccionar materiales con base en propiedades reportadas",
      focus: "elegir dos metales que cumplan simultáneamente las condiciones de no corrosión y propiedades solicitadas.",
      keyIdea: "La selección de materiales exige revisar todas las condiciones de la tabla. Una opción es correcta solo si ambos metales cumplen los requisitos al mismo tiempo.",
      route: ["Lista las propiedades requeridas.", "Revisa metal por metal en la tabla.", "Descarta los que se corroen o no cumplen.", "Escoge la pareja que satisface todas las condiciones."],
      correctStrategy: "Cruzar propiedades de la tabla y elegir solo metales que cumplan todos los criterios.",
      miniQuestion: "Para seleccionar materiales, el procedimiento correcto es:",
      miniChoices: [{ text: "verificar cada propiedad requerida en la tabla.", correct: true }, { text: "escoger el metal más conocido.", correct: false }, { text: "ignorar la corrosión si tiene baja densidad.", correct: false }]
    },
    77: {
      icon: "🌡️",
      title: "Simulador interactivo · Temperatura de ebullición y presión atmosférica",
      skill: "interpretar gráficas de calentamiento en distintas ciudades",
      focus: "relacionar altitud, presión atmosférica y temperatura a la que hierve el agua.",
      keyIdea: "La temperatura de ebullición depende de la presión atmosférica. A menor presión, el agua hierve a menor temperatura. La gráfica correcta debe mostrar calentamiento hasta una meseta en la temperatura adecuada.",
      route: ["Compara condiciones de las ciudades.", "Relaciona presión atmosférica con punto de ebullición.", "Observa la forma de la gráfica: sube y luego se estabiliza.", "Elige la gráfica que represente el menor punto de ebullición cuando corresponde."],
      correctStrategy: "Conectar presión atmosférica, punto de ebullición y meseta en gráfica temperatura-tiempo.",
      miniQuestion: "A menor presión atmosférica, el agua hierve a:",
      miniChoices: [{ text: "menor temperatura.", correct: true }, { text: "temperatura siempre mayor.", correct: false }, { text: "una temperatura imposible de graficar.", correct: false }]
    },
    78: {
      icon: "🎺",
      title: "Simulador interactivo · Sonido en aire y agua",
      skill: "identificar propiedades de una onda que cambian al pasar de medio",
      focus: "comprender que la velocidad del sonido cambia cuando la onda se propaga en medios distintos.",
      keyIdea: "La velocidad del sonido depende del medio de propagación. Al pasar del aire al agua, cambian las condiciones del medio y, por tanto, la velocidad de propagación de la onda sonora.",
      route: ["Identifica la onda: sonido.", "Reconoce los medios: aire y agua.", "Pregunta qué propiedad depende del medio.", "Descarta fuente y profundidad como propiedad directa del sonido."],
      correctStrategy: "Relacionar cambio de medio con cambio en velocidad de propagación.",
      miniQuestion: "Al cambiar el medio por el que viaja el sonido, cambia principalmente su:",
      miniChoices: [{ text: "velocidad.", correct: true }, { text: "fuente original.", correct: false }, { text: "nombre musical.", correct: false }]
    },
    79: {
      icon: "🧊",
      title: "Simulador interactivo · Sublimación del hielo seco",
      skill: "explicar cambios de estado y propiedades macroscópicas",
      focus: "identificar qué propiedad cambia cuando el CO₂ pasa de sólido a gas sin cambiar la identidad de sus moléculas.",
      keyIdea: "Durante un cambio de estado, las moléculas siguen siendo la misma sustancia. En la sublimación del CO₂, cambia la forma en que ocupan el espacio: el volumen ocupado aumenta mucho en estado gaseoso.",
      route: ["Reconoce el cambio: sólido a gas.", "Distingue moléculas de propiedades macroscópicas.", "Pregunta qué cambia al separarse las moléculas.", "Descarta cambios de masa o tamaño molecular."],
      correctStrategy: "Diferenciar cambio de estado de cambio químico y elegir volumen como propiedad que cambia.",
      miniQuestion: "En la sublimación, las moléculas de la sustancia:",
      miniChoices: [{ text: "ocupan más volumen al pasar a gas, sin cambiar su identidad.", correct: true }, { text: "pierden toda su masa molecular.", correct: false }, { text: "se convierten en átomos de otra sustancia.", correct: false }]
    }
  };
  const profile = profiles[number];
  if (!profile) return null;
  return {
    ...profile,
    teacherNote: buildS2ScienceTeacherNote(question, profile),
    chips: buildS2ScienceChips(profile),
    strategyChoices: buildS2ScienceStrategyChoices(profile)
  };
}

function buildS2ScienceChips(profile) {
  return [
    { text: "Identificar fenómeno, sistema o proceso científico del enunciado", correct: true },
    { text: "Reconocer datos, variables, condiciones o evidencia disponible", correct: true },
    { text: profile.correctStrategy, correct: true },
    { text: "Elegir por memoria o por la opción que suene más técnica", correct: false },
    { text: "Ignorar gráficas, tablas o condiciones del experimento", correct: false }
  ];
}

function buildS2ScienceStrategyChoices(profile) {
  return [
    { text: profile.correctStrategy, correct: true },
    { text: "Responder por intuición sin usar evidencia ni conceptos científicos.", correct: false },
    { text: "Escoger la alternativa más larga sin comprobar si explica el fenómeno.", correct: false }
  ];
}

function buildS2ScienceTeacherNote(question, profile) {
  return `Esta pregunta de Ciencias Naturales fortalece ${profile.skill}. Para resolverla tipo Saber 11, el estudiante debe reconocer el fenómeno, extraer evidencia útil, aplicar el concepto científico y verificar que la opción elegida responda exactamente el enunciado. Componente trabajado: ${question.componente || "Ciencias Naturales"}.`;
}

function initS2ScienceGuidedSimulator(question) {
  const config = getS2ScienceProfile(question);
  if (!config) return;

  const chipGrid = document.getElementById("scienceChipGrid");
  const checkChipsBtn = document.getElementById("checkScienceChipsBtn");
  const chipsFeedback = document.getElementById("scienceChipsFeedback");
  const strategyGrid = document.getElementById("scienceStrategyGrid");
  const strategyFeedback = document.getElementById("scienceStrategyFeedback");
  const miniGrid = document.getElementById("scienceMiniGrid");
  const miniFeedback = document.getElementById("scienceMiniFeedback");
  const finalGrid = document.getElementById("scienceFinalAnswerGrid");
  const finalFeedback = document.getElementById("scienceFinalFeedback");

  if (chipGrid) {
    chipGrid.addEventListener("click", event => {
      const button = event.target.closest(".science-chip");
      if (!button) return;
      button.classList.toggle("selected");
      if (chipsFeedback) {
        chipsFeedback.textContent = "Claves seleccionadas. Ahora verifica si realmente ayudan a resolver el fenómeno, experimento, gráfica o modelo.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  if (checkChipsBtn) {
    checkChipsBtn.addEventListener("click", () => {
      const buttons = Array.from(document.querySelectorAll(".science-chip"));
      const wrongSelected = buttons.some(button => button.classList.contains("selected") && button.dataset.correct !== "1");
      const missingCorrect = buttons.some(button => !button.classList.contains("selected") && button.dataset.correct === "1");
      buttons.forEach(button => {
        button.classList.remove("correct", "wrong");
        if (button.classList.contains("selected") && button.dataset.correct === "1") button.classList.add("correct");
        if (button.classList.contains("selected") && button.dataset.correct !== "1") button.classList.add("wrong");
      });
      if (!wrongSelected && !missingCorrect) {
        chipsFeedback.innerHTML = "<strong>Excelente.</strong> Seleccionaste las claves necesarias: fenómeno, evidencia, variables y concepto.";
        chipsFeedback.className = "sim-feedback ok";
      } else if (wrongSelected) {
        chipsFeedback.innerHTML = "<strong>Revisa.</strong> Hay una clave distractora. En Ciencias Naturales no se responde por apariencia: se usan datos, condiciones y explicación científica.";
        chipsFeedback.className = "sim-feedback error";
      } else {
        chipsFeedback.innerHTML = "<strong>Vas bien.</strong> Falta una clave importante para sostener la respuesta científicamente.";
        chipsFeedback.className = "sim-feedback warn";
      }
    });
  }

  function bindScienceChoiceGrid(grid, feedback, correctMessage, errorMessage) {
    if (!grid) return;
    grid.addEventListener("click", event => {
      const button = event.target.closest(".science-choice");
      if (!button) return;
      grid.querySelectorAll(".science-choice").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.correct === "1") {
        button.classList.add("correct");
        if (feedback) {
          feedback.innerHTML = `<strong>Correcto.</strong> ${escapeHtml(correctMessage)}`;
          feedback.className = "sim-feedback ok";
        }
      } else {
        button.classList.add("wrong");
        if (feedback) {
          feedback.innerHTML = `<strong>Revisa.</strong> ${escapeHtml(errorMessage)}`;
          feedback.className = "sim-feedback error";
        }
      }
    });
  }

  bindScienceChoiceGrid(strategyGrid, strategyFeedback, "Esa ruta conecta evidencia, variable y concepto científico.", "Esa estrategia no justifica científicamente la respuesta. Vuelve al fenómeno y a los datos del enunciado.");
  bindScienceChoiceGrid(miniGrid, miniFeedback, "El microentrenamiento confirma el concepto que necesitas antes de responder.", "Vuelve a la idea clave y revisa qué relación científica se está evaluando.");

  if (finalGrid) {
    finalGrid.addEventListener("click", event => {
      const button = event.target.closest(".science-final-answer");
      if (!button) return;
      finalGrid.querySelectorAll(".science-final-answer").forEach(item => item.classList.remove("selected", "correct", "wrong"));
      button.classList.add("selected");
      if (button.dataset.answer === question.correctAnswer) {
        button.classList.add("correct");
        finalFeedback.innerHTML = `<strong>Correcto.</strong> La opción ${escapeHtml(question.correctAnswer)} es adecuada. ${escapeHtml(stripHtml(question.explanation || "La elección coincide con el fenómeno, los datos y el concepto científico trabajado."))}`;
        finalFeedback.className = "sim-final-feedback ok";
      } else {
        button.classList.add("wrong");
        finalFeedback.innerHTML = `<strong>Revisa tu elección.</strong> Antes de volver a la pregunta, aplica esta ruta: ${escapeHtml(config.correctStrategy)} Después compara tu opción con la evidencia y el concepto científico.`;
        finalFeedback.className = "sim-final-feedback error";
      }
    });
  }
}

const NOTEBOOK_RENDER_SIMULATOR_BASE_SCIENCE_S2 = renderNotebookSimulator;
const NOTEBOOK_INIT_SIMULATOR_BASE_SCIENCE_S2 = initNotebookSimulator;

renderNotebookSimulator = function(question, customResource) {
  if (isS2ScienceSimulatorQuestion(question)) {
    const config = getS2ScienceProfile(question);
    return renderS1ScienceGuidedSimulator(question, config);
  }
  return NOTEBOOK_RENDER_SIMULATOR_BASE_SCIENCE_S2(question, customResource);
};

initNotebookSimulator = function(question) {
  if (isS2ScienceSimulatorQuestion(question)) {
    initS2ScienceGuidedSimulator(question);
    return;
  }
  NOTEBOOK_INIT_SIMULATOR_BASE_SCIENCE_S2(question);
};

// Inicialización final del Notebook después de cargar todos los simuladores por área.
initNotebook();
