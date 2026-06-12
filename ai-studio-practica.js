(function () {
  "use strict";

  const STUDENT_KEY = "simulador_icfes_saber11_estudiante_v2";
  const AI_STATE_KEY = "simulador_icfes_ai_studio_estado_v3";
  const THEME_KEY = "simulador_icfes_ai_studio_theme";
  const INSTITUTION = "Institución Educativa Manuel J. Betancur";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const params = new URLSearchParams(window.location.search);
  const hasExplicitScope = params.has("session") || params.has("from") || params.has("to") || params.has("area");
  const scope = {
    session: Number(params.get("session") || 1),
    from: Number(params.get("from") || 1),
    to: Number(params.get("to") || 134),
    label: params.get("label") || "Sesión completa",
    area: params.get("area") || "",
    available: Number(params.get("available") || 0)
  };

  const state = {
    questions: [],
    currentIndex: 0,
    answers: {},
    showExplanation: {},
    activeTab: "simulator",
    studyMode: "tutor",
    activeTool: "scanner",
    confidence: {},
    notes: {},
    checklist: {},
    savedAt: null
  };

  function safeJson(value, fallback) {
    try { return JSON.parse(value); } catch (error) { return fallback; }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function stripHtml(value) {
    const div = document.createElement("div");
    div.innerHTML = String(value || "");
    return (div.textContent || div.innerText || "").replace(/\s+/g, " ").trim();
  }

  function getStudent() {
    const raw = localStorage.getItem(STUDENT_KEY);
    const student = raw ? safeJson(raw, {}) : {};
    const fullName = String(student.fullName || `${student.firstName || ""} ${student.lastName || ""}` || "Estudiante").trim() || "Estudiante";
    const group = String(student.group || student.gradeGroup || student.course || "Grupo sin definir").trim();
    const email = String(student.email || student.studentEmail || "").trim();
    return { fullName, group, email };
  }

  function normalizeQuestion(q) {
    return {
      ...q,
      id: `${q.session}-${q.number}`,
      competence: q.competencia || q.competence || "Competencia no especificada",
      component: q.componente || q.component || "Componente no especificado",
      difficulty: q.dificultad || q.difficulty || "Dificultad media",
      explanation: q.explanation || q.feedback || "La explicación se construye a partir del enunciado, las opciones y la competencia evaluada."
    };
  }

  function scopeKey() {
    return `${scope.session}-${scope.from}-${scope.to}-${scope.area || "all"}`;
  }

  function currentQuestion() {
    return state.questions[state.currentIndex] || null;
  }

  function loadQuestions() {
    const rawBank = (typeof QUESTION_BANK !== "undefined") ? QUESTION_BANK : window.QUESTION_BANK;
    const bank = Array.isArray(rawBank) ? rawBank : [];
    state.questions = bank
      .map(normalizeQuestion)
      .filter(q => Number(q.session) === scope.session)
      .filter(q => Number(q.number) >= scope.from && Number(q.number) <= scope.to)
      .filter(q => !scope.area || String(q.area || "").toLowerCase() === scope.area.toLowerCase())
      .sort((a, b) => Number(a.number) - Number(b.number));

    const saved = safeJson(localStorage.getItem(AI_STATE_KEY), null);
    if (saved && saved.scopeKey === scopeKey()) {
      state.answers = saved.answers || {};
      state.showExplanation = saved.showExplanation || {};
      state.studyMode = saved.studyMode || "tutor";
      state.activeTab = saved.activeTab || "simulator";
      state.activeTool = saved.activeTool || "scanner";
      state.confidence = saved.confidence || {};
      state.notes = saved.notes || {};
      state.checklist = saved.checklist || {};
      const idx = state.questions.findIndex(q => String(q.number) === String(saved.currentNumber));
      state.currentIndex = idx >= 0 ? idx : 0;
    }
  }

  function saveAiState() {
    const q = currentQuestion();
    localStorage.setItem(AI_STATE_KEY, JSON.stringify({
      scopeKey: scopeKey(),
      currentNumber: q ? q.number : null,
      answers: state.answers,
      showExplanation: state.showExplanation,
      studyMode: state.studyMode,
      activeTab: state.activeTab,
      activeTool: state.activeTool,
      confidence: state.confidence,
      notes: state.notes,
      checklist: state.checklist,
      savedAt: new Date().toISOString()
    }));
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || localStorage.getItem("simulador_icfes_theme_react") || "light";
    applyTheme(saved === "dark" ? "dark" : "light");
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-ai-theme", theme);
    document.body.classList.toggle("ai-night", theme === "dark");
    document.body.classList.toggle("ai-day", theme !== "dark");
    localStorage.setItem(THEME_KEY, theme);
    const btn = $("#aiThemeToggle");
    if (btn) btn.innerHTML = theme === "dark" ? "☀️ Día" : "🌙 Noche";
  }

  function getTheme() {
    return document.documentElement.getAttribute("data-ai-theme") || "light";
  }

  function getProgress() {
    const total = state.questions.length;
    const answered = Object.keys(state.answers).filter(key => state.answers[key]).length;
    const correct = state.questions.reduce((sum, q) => sum + (state.answers[q.id] === q.correctAnswer ? 1 : 0), 0);
    return { total, answered, correct, percent: total ? Math.round((correct / total) * 100) : 0 };
  }


  const AI_SUPER_SIMULATORS = [
    {
      title: "Súper simulador de Matemáticas",
      eyebrow: "Sección 2 · Matemáticas",
      range: "Preguntas 29 a 50",
      description: "Gráficas, animaciones, detector de pistas, estrategia, micro-reto y retroalimentación inmediata.",
      href: "ai-studio-practica.html?session=2&from=29&to=50&label=Secci%C3%B3n%202%20%C2%B7%20Matem%C3%A1ticas%20%C2%B7%20Preguntas%2029%20a%2050&area=Matem%C3%A1ticas&scopeType=block&available=22"
    },
    {
      title: "Súper simulador de Ciencias Naturales",
      eyebrow: "Sección 2 · Ciencias Naturales",
      range: "Preguntas 51 a 79",
      description: "Laboratorio científico con variables, gráficas animadas, método científico, simulación de fenómenos y evidencia.",
      href: "ai-studio-practica.html?session=2&from=51&to=79&label=Secci%C3%B3n%202%20%C2%B7%20Ciencias%20Naturales%20%C2%B7%20Preguntas%2051%20a%2079&area=Ciencias%20Naturales&scopeType=block&available=29"
    },
    {
      title: "Súper simulador de Inglés",
      eyebrow: "Sección 2 · Inglés",
      range: "Preguntas 80 a 134",
      description: "Context scanner, gráfica de comprensión, vocabulario, gramática, avisos, diálogos, cloze text y lectura crítica en inglés.",
      href: "ai-studio-practica.html?session=2&from=80&to=134&label=Secci%C3%B3n%202%20%C2%B7%20Ingl%C3%A9s%20%C2%B7%20Preguntas%2080%20a%20134&area=Ingl%C3%A9s&scopeType=block&available=55",
      featured: true
    }
  ];

  function isEnglishSuperScope() {
    return Number(scope.session) === 2 && Number(scope.from) === 80 && Number(scope.to) === 134 && String(scope.area || "").toLowerCase().includes("ingl");
  }

  function isMathSuperScope() {
    return Number(scope.session) === 2 && Number(scope.from) === 29 && Number(scope.to) === 50 && String(scope.area || "").toLowerCase().includes("matem");
  }

  function isNaturalScienceSuperScope() {
    return Number(scope.session) === 2 && Number(scope.from) === 51 && Number(scope.to) === 79 && String(scope.area || "").toLowerCase().includes("ciencias");
  }

  function scopeDisplayTitle() {
    if (isEnglishSuperScope()) return "Súper simulador de Inglés";
    if (isMathSuperScope()) return "Súper simulador de Matemáticas";
    if (isNaturalScienceSuperScope()) return "Súper simulador de Ciencias Naturales";
    return "Entrenamiento con AI Studio";
  }

  function scopeDisplayIntro() {
    if (isEnglishSuperScope()) return "Módulo integrado en Entrenamiento con AI Studio para resolver las preguntas 80 a 134 con lectura contextual, gramática, vocabulario, propósito comunicativo, gráficas y retroalimentación inmediata.";
    if (isMathSuperScope()) return "Módulo integrado en Entrenamiento con AI Studio para resolver las preguntas 29 a 50 con gráficas, animaciones, pistas, estrategia y micro-retos.";
    if (isNaturalScienceSuperScope()) return "Módulo integrado en Entrenamiento con AI Studio para resolver las preguntas 51 a 79 con laboratorio científico, variables, evidencias y simulaciones.";
    return "Simuladores dinámicos en HTML, CSS y JavaScript puro, con gráficas, animaciones, modo día/noche y entrenamiento paso a paso tipo Saber 11.";
  }

  function renderAiStudioLanding() {
    const app = $("#aiStudioApp");
    if (!app) return;
    const student = getStudent();
    app.innerHTML = `
      <section class="ai-hero-panel ai-animated-hero">
        <div>
          <p class="eyebrow">${escapeHtml(INSTITUTION)}</p>
          <h2>Entrenamiento con AI Studio</h2>
          <p>Selecciona un súper simulador dentro de AI Studio. Este espacio concentra los módulos dinámicos e interactivos del simulador, sin separarlos del inicio general.</p>
        </div>
        <div class="ai-hero-stats"><span class="pill">${escapeHtml(student.fullName)} · ${escapeHtml(student.group)}</span><span class="pill success">Súper simuladores</span><span class="pill muted">HTML · CSS · JS</span></div>
      </section>

      <section class="ai-studio-catalog" aria-label="Catálogo de súper simuladores en AI Studio">
        ${AI_SUPER_SIMULATORS.map(item => `
          <article class="super-launch-card ${item.featured ? "featured" : ""}">
            <div>
              <p class="eyebrow">${escapeHtml(item.eyebrow)}</p>
              <h3>${escapeHtml(item.title)} · ${escapeHtml(item.range)}</h3>
              <p>${escapeHtml(item.description)}</p>
            </div>
            <a class="primary-btn" href="${item.href}">Abrir en AI Studio</a>
          </article>
        `).join("")}
      </section>

      <section class="ai-route-help">
        <h3>Ruta desde el simulador principal</h3>
        <p>También puedes entrar desde <strong>Inicio → Modo de trabajo: Entrenamiento con AI Studio → Sección 2 → Inglés 80 a 134</strong>.</p>
        <a class="secondary-btn" href="index.html">Volver al inicio</a>
      </section>`;
  }

  function areaType(q) {
    const area = String(q.area || "").toLowerCase();
    const text = `${q.stem || ""} ${q.prompt || ""} ${q.component || ""} ${q.competence || ""}`.toLowerCase();
    if (area.includes("matem")) return "razonamiento cuantitativo";
    if (area.includes("lectura")) return "lectura crítica";
    if (area.includes("ingl")) return "comprensión en inglés";
    if (area.includes("social")) return "análisis social y ciudadano";
    if (area.includes("ciencias")) return "pensamiento científico";
    if (/gr[aá]fica|tabla|diagrama|figura|datos/.test(text)) return "interpretación de representaciones";
    return "análisis tipo Saber 11";
  }

  function aiStrategy(q) {
    const type = areaType(q);
    const strategies = {
      "razonamiento cuantitativo": [
        "Identifica cantidades, unidades y relaciones antes de operar.",
        "Representa el problema con una fórmula, tabla o gráfico.",
        "Verifica si la pregunta pide calcular, comparar, justificar o detectar un error."
      ],
      "lectura crítica": [
        "Ubica la tesis, intención comunicativa y palabras clave del texto.",
        "Diferencia información literal, inferencial y valoración crítica.",
        "Descarta opciones que contradicen el texto, exageran o no responden la pregunta."
      ],
      "comprensión en inglés": [
        "Reconoce palabras transparentes, conectores y pistas del contexto.",
        "Decide si la pregunta evalúa vocabulario, función comunicativa, detalle o idea global.",
        "Evita traducir palabra por palabra; resuelve por sentido y contexto."
      ],
      "análisis social y ciudadano": [
        "Reconoce actores, intereses, derechos, normas y consecuencias.",
        "Distingue evidencia del caso, opinión personal y principio democrático.",
        "Elige la opción que responde al conflicto respetando derechos y participación."
      ],
      "pensamiento científico": [
        "Identifica variable, hipótesis, evidencia y conclusión.",
        "Relaciona los datos con el concepto científico evaluado.",
        "Descarta opciones que no se puedan comprobar con la información dada."
      ]
    };
    return { type, steps: strategies[type] || ["Lee la pregunta final.", "Extrae evidencia.", "Contrasta cada opción."] };
  }

  function extractKeywords(text, q) {
    const special = [q.area, q.component, q.competence].filter(Boolean).map(x => String(x).split(/\s+/).slice(0, 3).join(" "));
    const words = text
      .toLowerCase()
      .replace(/[.,;:¿?¡!()\[\]{}]/g, " ")
      .split(/\s+/)
      .filter(w => w.length > 5 && !["siguiente", "pregunta", "respuesta", "opción", "información", "correcta", "partir", "seleccione"].includes(w));
    const unique = [];
    [...special, ...words].forEach(word => {
      const normalized = String(word || "").trim();
      if (normalized && !unique.includes(normalized)) unique.push(normalized);
    });
    return unique.slice(0, 9);
  }

  function renderResource(resource, idx) {
    if (!resource) return "";
    if (resource.type === "table") {
      const headers = Array.isArray(resource.headers) ? resource.headers : [];
      const rows = Array.isArray(resource.rows) ? resource.rows : [];
      return `
        <div class="ai-resource-card">
          ${resource.caption ? `<h4>${escapeHtml(resource.caption)}</h4>` : `<h4>Tabla de datos ${idx + 1}</h4>`}
          <div class="table-wrap"><table class="structure-table mini-table">
            <thead><tr>${headers.map(h => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>
            <tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
          </table></div>
        </div>`;
    }
    if (resource.type === "html") return `<div class="ai-resource-card">${resource.html || ""}</div>`;
    if (resource.type === "image" || resource.url) return `<div class="ai-resource-card"><img src="${escapeHtml(resource.url || resource.src)}" alt="Recurso de la pregunta" loading="lazy"></div>`;
    return `<div class="ai-resource-card"><pre>${escapeHtml(JSON.stringify(resource, null, 2))}</pre></div>`;
  }

  function renderOptions(q) {
    const selected = state.answers[q.id];
    const show = Boolean(state.showExplanation[q.id]);
    return (q.options || []).map(opt => {
      const letter = opt.letter || opt.value || "";
      const isSelected = selected === letter;
      const isCorrect = letter === q.correctAnswer;
      const statusClass = show && isCorrect ? "correct" : show && isSelected && !isCorrect ? "incorrect" : "";
      return `
        <button class="ai-option ${isSelected ? "selected" : ""} ${statusClass}" type="button" data-answer="${escapeHtml(letter)}" aria-pressed="${isSelected ? "true" : "false"}">
          <span class="option-letter">${escapeHtml(letter)}</span>
          <span>${opt.text || opt.label || ""}</span>
        </button>`;
    }).join("");
  }

  function paintAnswerState(q, selected) {
    if (!q || !selected) return;
    const correct = q.correctAnswer || "";
    const selectors = [
      [".ai-option[data-answer]", "answer", "incorrect"],
      ["[data-english-option]", "englishOption", "incorrect"],
      ["[data-natural-option]", "naturalOption", "incorrect"],
      ["[data-social-option]", "socialOption", "incorrect"],
      ["[data-crit-option]", "critOption", "incorrect"],
      ["[data-s2math-final]", "s2mathFinal", "wrong"]
    ];
    selectors.forEach(([selector, key, wrongClass]) => {
      $$(selector).forEach(btn => {
        const letter = btn.dataset[key] || btn.dataset.answer || "";
        btn.classList.remove("selected", "correct", "incorrect", "wrong");
        btn.setAttribute("aria-pressed", letter === selected ? "true" : "false");
        if (letter === selected) btn.classList.add("selected", letter === correct ? "correct" : wrongClass);
        if (letter === correct && state.showExplanation[q.id]) btn.classList.add("correct");
      });
    });
    $$(".ai-nav-dot").forEach(btn => {
      const idx = Number(btn.dataset.jump || -1);
      const item = state.questions[idx];
      const savedAnswer = item ? state.answers[item.id] : "";
      btn.classList.toggle("answered", Boolean(savedAnswer));
      btn.classList.toggle("answered-correct", Boolean(savedAnswer && savedAnswer === item.correctAnswer));
      btn.classList.toggle("answered-wrong", Boolean(savedAnswer && savedAnswer !== item.correctAnswer));
      if (item) {
        const statusLabel = savedAnswer ? `respondida con ${savedAnswer}` : "sin responder";
        btn.title = `Pregunta ${item.number}: ${statusLabel}`;
        btn.setAttribute("aria-label", `Pregunta ${item.number}: ${statusLabel}`);
      }
    });
    const progress = getProgress();
    const answeredPill = $(".ai-hero-stats .pill.muted");
    if (answeredPill) answeredPill.textContent = `${progress.answered}/${progress.total} respondidas`;
    const progressText = $(".progress-top span");
    if (progressText) progressText.textContent = `${progress.percent}% de acierto acumulado`;
    const progressBar = $(".progress-bar span");
    if (progressBar) progressBar.style.width = `${Math.max(0, Math.min(progress.percent, 100))}%`;
  }

  function selectCurrentAnswer(letter, options = {}) {
    const q = currentQuestion();
    if (!q || !letter) return false;
    state.answers[q.id] = letter;
    state.showExplanation[q.id] = true;
    saveAiState();
    if (options.render) {
      renderQuestion();
    } else {
      paintAnswerState(q, letter);
    }
    return letter === q.correctAnswer;
  }

  function renderAiScanner(q) {
    const strategy = aiStrategy(q);
    const cleanStem = stripHtml(`${q.stem || ""} ${q.prompt || ""}`);
    const keywords = extractKeywords(cleanStem, q);
    const selected = state.answers[q.id];
    const confidence = state.confidence[q.id] || "neutral";
    const checks = state.checklist[q.id] || {};
    return `
      <section class="ai-panel ai-scanner-panel">
        <div class="ai-panel-head">
          <div><p class="eyebrow">Tutor AI Studio</p><h3>Escáner táctico</h3></div>
          <span class="pill success">${escapeHtml(strategy.type)}</span>
        </div>
        <div class="ai-tool-tabs" role="tablist">
          ${[["scanner","Escáner"],["tools","Herramientas"],["confidence","Confianza"],["notes","Bloc"]].map(([id,label]) => `<button type="button" class="ai-tool-tab ${state.activeTool === id ? "active" : ""}" data-tool="${id}">${label}</button>`).join("")}
        </div>
        ${state.activeTool === "scanner" ? `
          <div class="scanner-grid">
            <article><h4>1. ¿Qué evalúa?</h4><p>${escapeHtml(q.area || "Área")} · ${escapeHtml(q.competence)} · ${escapeHtml(q.component)}</p></article>
            <article><h4>2. Pistas clave</h4><div class="keyword-list">${keywords.map(k => `<button class="keyword-chip" type="button">${escapeHtml(k)}</button>`).join("")}</div></article>
            <article><h4>3. Estrategia</h4><ol>${strategy.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol></article>
          </div>` : ""}
        ${state.activeTool === "tools" ? renderTacticalGraph(q) : ""}
        ${state.activeTool === "confidence" ? `
          <div class="confidence-grid">
            ${[["low","Necesito repasar"],["neutral","Estoy pensando"],["high","Estoy seguro"]].map(([id,label]) => `<button type="button" data-confidence="${id}" class="confidence-btn ${confidence === id ? "active" : ""}">${label}</button>`).join("")}
          </div>
          <p class="ai-small-note">Respuesta actual: <strong>${selected || "sin seleccionar"}</strong>. Usa esta autoevaluación para decidir si necesitas revisar la guía antes de avanzar.</p>` : ""}
        ${state.activeTool === "notes" ? `
          <textarea id="aiNotepad" class="ai-notepad" rows="6" placeholder="Escribe aquí datos, fórmula, pista textual o hipótesis...">${escapeHtml(state.notes[q.id] || "")}</textarea>
          <div class="ai-checklist">
            ${[["read","Leí la pregunta final"],["evidence","Encontré evidencia"],["discard","Descarté distractores"],["verify","Verifiqué mi respuesta"]].map(([id,label]) => `<label><input type="checkbox" data-check="${id}" ${checks[id] ? "checked" : ""}> ${label}</label>`).join("")}
          </div>` : ""}
      </section>`;
  }

  function renderTacticalGraph(q) {
    const s = aiStrategy(q);
    const values = {
      "razonamiento cuantitativo": [92, 78, 66, 84],
      "lectura crítica": [82, 90, 72, 76],
      "comprensión en inglés": [74, 88, 68, 78],
      "análisis social y ciudadano": [80, 84, 86, 70],
      "pensamiento científico": [84, 76, 92, 72]
    }[s.type] || [78, 76, 80, 74];
    const labels = ["Datos", "Evidencia", "Descarte", "Verificación"];
    return `
      <div class="mini-graph-panel">
        <h4>Radar de habilidades para esta pregunta</h4>
        <div class="ai-bars">${values.map((v, i) => `<div class="ai-bar-row"><span>${labels[i]}</span><div class="ai-bar-track"><b style="width:${v}%"></b></div><em>${v}%</em></div>`).join("")}</div>
        <p class="ai-small-note">Este radar no da la respuesta: muestra qué habilidad conviene activar para resolver la pregunta como en Saber 11.</p>
      </div>`;
  }

  function renderMicroSimulator(q) {
    const specific = renderSpecificSimulator(q);
    if (specific) return specific;
    return renderGenericSimulator(q);
  }

  function renderSpecificSimulator(q) {
    if (isS2MathSuperQuestion(q)) return renderS2MathSuper(q);
    if (isS2NaturalScienceSuperQuestion(q)) return simNaturalScienceSuper(q);
    if (isS2EnglishSuperQuestion(q)) return simEnglishSuper(q);
    if (/^s1-lect-0(2[6-9]|[3-5]\d|6[0-6])$/.test(String(q.uid || ""))) return simCriticalReadingSuper(q);
    if (/^s1-soc-0(6[7-9]|[78]\d|9[01])$/.test(String(q.uid || ""))) return simSocialCitizenshipSuper(q);
    if (/^s2-soc-0*(?:[1-9]|1\d|2[0-8])$/.test(String(q.uid || ""))) return simSocialCitizenshipSuper(q);
    if (/^s1-cn(?:at)?-(0?9[2-9]|1[01]\d|120)$/.test(String(q.uid || ""))) return simNaturalScienceSuper(q);
    switch (q.uid) {
      case "s1-mat-001": return simAverageAges();
      case "s1-mat-002": return simTickets();
      case "s1-mat-003": return simVenn();
      case "s1-mat-004": return simCombinations();
      case "s1-mat-005": return simPrizeAmounts();
      case "s1-mat-006": return simFamilySavings();
      case "s1-mat-007": return simPercentSavings();
      case "s1-mat-008": return simTableGraphMismatch();
      case "s1-mat-009": return simPotatoHistogram();
      case "s1-mat-010": return simSamplingBias();
      case "s1-mat-011": return simCakeArea();
      case "s1-mat-012": return simUnitConversion();
      case "s1-mat-013": return simCanvasRegions();
      case "s1-mat-014": return simPieChartVotes();
      case "s1-mat-015": return simSavingsTrend();
      case "s1-mat-016": return simPartsAverage();
      case "s1-mat-017": return simBikeVenn();
      case "s1-mat-018": return simTransistorGrowth();
      case "s1-mat-019": return simGardenRedundancy();
      case "s1-mat-020": return simTunnelFactorization();
      case "s1-mat-021": return simDownloadTime();
      case "s1-mat-022": return simRampSimilarity();
      case "s1-mat-023": return simPolar();
      case "s1-mat-024": return simRoute();
      case "s1-mat-025": return simDecimalOrder();
      case "s1-cn-092": return simGreasePollution();
      case "s1-cn-093": return simPhotosynthesis();
      case "s1-cn-112": return simGasLaw();
      case "s1-cn-120": return simIronPhase();
      case "s2-ing-080": return simEnglishVocabulary();
      default: return "";
    }
  }

  function simWrapper(title, subtitle, body, footer = "") {
    return `
      <section class="ai-panel ai-simulator-panel">
        <div class="ai-panel-head"><div><p class="eyebrow">Simulador dinámico AI Studio</p><h3>${title}</h3></div><span class="sim-live-dot">● En vivo</span></div>
        ${subtitle ? `<p class="sim-subtitle">${subtitle}</p>` : ""}
        ${body}
        ${footer ? `<div class="ai-explanation-box">${footer}</div>` : ""}
      </section>`;
  }

  function simAverageAges() {
    const ages = [21, 26, 20, 21, 22, 28, 30];
    return simWrapper(
      "Promedio de edades",
      "Mueve las edades para ver cómo cambia la media aritmética. Con los valores originales debe aparecer 24.",
      `<div class="age-simulator" id="ageSimulator">${ages.map((age, i) => `
          <label class="slider-card">Madre ${i + 1}<strong data-age-value="${i}">${age}</strong><input type="range" min="15" max="45" value="${age}" data-age="${i}"></label>`).join("")}</div>
       <div class="live-formula-card"><span>Suma</span><strong id="ageSum">168</strong><span>÷ 7 =</span><strong id="ageAvg">24.00</strong></div>
       <div class="animated-bars" id="ageBars">${ages.map((age, i) => `<i style="height:${age * 2}px"><span>${age}</span></i>`).join("")}</div>`,
      "<strong>Clave ICFES:</strong> no basta sumar; hay que dividir entre la cantidad de datos. Aquí son siete madres."
    );
  }

  function simTickets() {
    return simWrapper(
      "Calculadora de tiquetes e impuesto variable",
      "Cambia cantidades e impuesto. Observa por qué sin conocer la temporada no hay un único total posible.",
      `<div class="sim-grid-3">
        <label class="slider-card">Jueves ($80.000)<strong id="thuVal">5</strong><input type="range" min="0" max="10" value="5" id="thuTickets"></label>
        <label class="slider-card">Sábado ($150.000)<strong id="satVal">2</strong><input type="range" min="0" max="10" value="2" id="satTickets"></label>
        <div class="slider-card"><span>Impuesto</span><div class="choice-row"><button type="button" data-tax="12" class="tax-btn active">12%</button><button type="button" data-tax="19" class="tax-btn">19%</button></div></div>
       </div>
       <div class="live-formula-card tickets"><span>Subtotal</span><strong id="ticketSubtotal">$700.000</strong><span>Total</span><strong id="ticketTotal">$784.000</strong></div>
       <div class="animated-bars two"><i id="barTax12" style="height:112px"><span>12%</span></i><i id="barTax19" style="height:119px"><span>19%</span></i></div>`,
      "<strong>Aprendizaje:</strong> cuando una variable no está definida, el procedimiento puede estar bien, pero el resultado no es único."
    );
  }

  function simVenn() {
    return simWrapper(
      "Diagrama de Venn interactivo",
      "Activa cada síntoma y observa qué regiones se suman para obtener los totales.",
      `<div class="choice-row wrap">
        <label><input type="checkbox" data-venn="head" checked> Dolor de cabeza</label>
        <label><input type="checkbox" data-venn="nausea" checked> Náuseas</label>
        <label><input type="checkbox" data-venn="dizzy" checked> Mareo</label>
       </div>
       <svg class="venn-svg" viewBox="0 0 560 360" aria-label="Diagrama de Venn">
        <rect x="15" y="15" width="530" height="330" rx="18" class="venn-box"/>
        <circle cx="235" cy="145" r="82" class="venn-circle head"/>
        <circle cx="345" cy="145" r="82" class="venn-circle dizzy"/>
        <circle cx="290" cy="230" r="82" class="venn-circle nausea"/>
        ${[[193,142,10,'head'],[290,126,8,'head dizzy'],[385,142,5,'dizzy'],[245,205,6,'head nausea'],[335,205,1,'dizzy nausea'],[282,268,15,'nausea']].map(p=>`<text x="${p[0]}" y="${p[1]}" class="venn-num ${p[3]}">${p[2]}</text>`).join("")}
       </svg>
       <div class="sim-grid-3 venn-totals"><article><span>Dolor</span><strong>24</strong></article><article><span>Náuseas</span><strong>22</strong></article><article><span>Mareo</span><strong>14</strong></article></div>`
    );
  }

  function simCombinations() {
    return simWrapper(
      "Conteo de grupos posibles",
      "Elige una regla y mira cuántos grupos de 3 cumplen la condición.",
      `<div class="choice-grid combo-grid">
        ${[["any","Cualquier grupo",20],["3men","Tres hombres",0],["1w2m","Una mujer y dos hombres",4],["2w1m","Dos mujeres y un hombre",12],["3w","Tres mujeres",4]].map(([id,label,count])=>`<button type="button" data-combo="${id}" class="combo-btn ${id==='any'?'active':''}"><span>${label}</span><strong>${count}</strong></button>`).join("")}
       </div>
       <div class="combo-result"><span>Combinaciones posibles</span><strong id="comboCount">20</strong></div>
       <div class="animated-bars combo-bars" id="comboBars"></div>`,
      "<strong>Pista:</strong> si solo hay 2 hombres, la opción de formar un grupo de 3 hombres es imposible."
    );
  }


  function simPrizeAmounts() {
    return simWrapper(
      "Premios del banco: multiplicar cantidad por valor",
      "Explora cómo se construye la tabla correcta: total = cantidad de premios × valor de cada premio.",
      `<div class="sim-grid-3">
        <label class="slider-card">Premios oro<strong id="goldAwardsV">5</strong><input id="goldAwards" type="range" min="0" max="12" value="5"></label>
        <label class="slider-card">Premios plata<strong id="silverAwardsV">25</strong><input id="silverAwards" type="range" min="0" max="40" value="25"></label>
        <label class="slider-card">Premios bronce<strong id="bronzeAwardsV">100</strong><input id="bronzeAwards" type="range" min="0" max="150" value="100"></label>
       </div>
       <div class="prize-board">
        <article><span>Oro</span><strong id="goldTotal">$50.000.000</strong><small>× $10.000.000</small></article>
        <article><span>Plata</span><strong id="silverTotal">$125.000.000</strong><small>× $5.000.000</small></article>
        <article><span>Bronce</span><strong id="bronzeTotal">$100.000.000</strong><small>× $1.000.000</small></article>
       </div>
       <div class="animated-bars prize-bars" id="prizeBars"><i style="height:55px"><span>Oro</span></i><i style="height:135px"><span>Plata</span></i><i style="height:110px"><span>Bronce</span></i></div>`,
      "<strong>Clave ICFES:</strong> traduce cada fila de la tabla en una multiplicación y compara los tres resultados con las opciones."
    );
  }

  function simFamilySavings() {
    return simWrapper(
      "Ahorro duplicado mes a mes",
      "Mueve el mes y observa el crecimiento geométrico: cada mes se duplica el ahorro del mes anterior.",
      `<label class="slider-card wide">Mes alcanzado<strong id="familyMonthV">4 meses</strong><input id="familyMonth" type="range" min="1" max="6" value="4"></label>
       <div class="family-savings-stage" id="familySavingsStage"></div>
       <div class="live-formula-card"><span>Acumulado</span><strong id="familyAccumulated">$750.000</strong><span>Meta</span><strong>$750.000</strong></div>`,
      "<strong>Patrón:</strong> 50.000, 100.000, 200.000, 400.000. El acumulado llega a 750.000 en 4 meses."
    );
  }

  function simPercentSavings() {
    return simWrapper(
      "Porcentaje de ahorro acumulado",
      "Cambia salario, porcentaje y número de meses para visualizar porcentaje × cantidad de meses.",
      `<div class="sim-grid-3">
        <label class="slider-card">Salario mensual<strong id="salaryV">$900.000</strong><input id="salary" type="range" min="500000" max="1500000" value="900000" step="50000"></label>
        <label class="slider-card">Porcentaje<strong id="percentV">3%</strong><input id="percent" type="range" min="1" max="10" value="3"></label>
        <label class="slider-card">Meses<strong id="monthsV">10</strong><input id="months" type="range" min="1" max="18" value="10"></label>
       </div>
       <div class="percent-meter"><span id="percentFill"></span><strong id="monthlySaving">$27.000/mes</strong></div>
       <div class="live-formula-card"><span>Total ahorrado</span><strong id="totalSaving">$270.000</strong></div>`,
      "<strong>Regla:</strong> 3 % significa 3 de cada 100. Para 900.000, el ahorro mensual es 27.000."
    );
  }

  function simTableGraphMismatch() {
    return simWrapper(
      "Detector de inconsistencias tabla vs gráfica",
      "Selecciona el año y compara los datos de la tabla con los datos de la gráfica. Si no coinciden, la representación no es equivalente.",
      `<div class="choice-row wrap year-controls">
        ${[2011,2012,2013,2014,2015].map(y=>`<button type="button" data-ipm-year="${y}" class="route-btn ${y===2012?'active':''}">${y}</button>`).join("")}
       </div>
       <div class="sim-grid-2 mismatch-cards"><article><span>Antioquia · tabla</span><strong id="antTable">21,7</strong><small>Gráfica: <b id="antGraph">20,5</b></small></article><article><span>Bogotá D. C. · tabla</span><strong id="bogTable">5,4</strong><small>Gráfica: <b id="bogGraph">5,4</b></small></article></div>
       <svg class="mismatch-svg" viewBox="0 0 420 180"><line x1="40" y1="150" x2="390" y2="150"/><line x1="40" y1="150" x2="40" y2="20"/><rect id="antTableBar" x="85" y="65" width="42" height="85"/><rect id="antGraphBar" x="130" y="72" width="42" height="78"/><rect id="bogTableBar" x="250" y="129" width="42" height="21"/><rect id="bogGraphBar" x="295" y="129" width="42" height="21"/><text x="85" y="170">Ant</text><text x="250" y="170">Bog</text></svg>
       <div id="mismatchFeedback" class="word-feedback">Compara tabla y gráfica para decidir si representan la misma información.</div>`,
      "<strong>Evaluación:</strong> no te dejes llevar por la apariencia; compara valores exactos."
    );
  }

  function simPotatoHistogram() {
    return simWrapper(
      "Histograma de pesos de papas",
      "La gráfica correcta debe poner los intervalos de peso en el eje horizontal y la cantidad de papas en el eje vertical.",
      `<div class="potato-histogram" id="potatoHistogram"></div>
       <div class="sim-grid-3"><article><span>15 ≤ p &lt; 20</span><strong>700</strong></article><article><span>20 ≤ p &lt; 25</span><strong>500</strong></article><article><span>25 ≤ p &lt; 30</span><strong>800</strong></article></div>
       <div class="choice-row wrap"><button type="button" data-potato-mode="correct" class="route-btn active">Gráfica correcta</button><button type="button" data-potato-mode="swapped" class="route-btn">Ejes invertidos</button><button type="button" data-potato-mode="line" class="route-btn">Línea engañosa</button></div>`,
      "<strong>Pista:</strong> la tabla ya trae frecuencias por intervalo; por eso se representa con barras."
    );
  }

  function simSamplingBias() {
    return simWrapper(
      "Simulador de representatividad de una encuesta",
      "Aumenta o disminuye la diversidad de municipios consultados. Una muestra grande puede fallar si no representa a la población.",
      `<div class="sim-grid-2"><label class="slider-card">Personas encuestadas<strong id="sampleSizeV">1.000</strong><input id="sampleSize" type="range" min="100" max="3000" value="1000" step="100"></label><label class="slider-card">Municipios cubiertos<strong id="sampleMunicipalitiesV">1</strong><input id="sampleMunicipalities" type="range" min="1" max="30" value="1"></label></div>
       <div class="sample-map" id="sampleMap"></div>
       <div class="live-formula-card"><span>Riesgo de sesgo</span><strong id="biasRisk">Alto</strong></div>`,
      "<strong>Clave:</strong> el error no es llamar a 1.000 personas; el error es llamar solo a un municipio para representar todo el departamento."
    );
  }

  function simUnitConversion() {
    return simWrapper(
      "Conversor de toneladas y kilogramos",
      "Antes de sumar pesos, convierte todas las cantidades a la misma unidad.",
      `<div class="unit-converter-grid"><article><span>Pedido A</span><strong>2 t</strong><small id="orderAkg">2.000 kg</small></article><article><span>Pedido B</span><strong>800 kg</strong><small>800 kg</small></article><article><span>Pedido C</span><strong>1,5 t</strong><small id="orderCkg">1.500 kg</small></article></div>
       <div class="choice-row wrap"><button type="button" data-unit-method="wrong" class="route-btn">Sumar directo</button><button type="button" data-unit-method="right" class="route-btn active">Convertir primero</button></div>
       <div class="live-formula-card"><span>Método elegido</span><strong id="unitMethodResult">Correcto</strong><span>Total</span><strong id="unitTotal">4.300 kg</strong></div>`,
      "<strong>Aprendizaje:</strong> toneladas y kilogramos no se suman directamente. 1 t = 1.000 kg."
    );
  }

  function simCanvasRegions() {
    return simWrapper(
      "Área de regiones: triángulo y cuarto de círculo",
      "Cambia base, altura y radio. Observa por qué el área del triángulo debe dividirse entre 2.",
      `<div class="sim-grid-3"><label class="slider-card">Base triángulo<strong id="triBaseV">4 m</strong><input id="triBase" type="range" min="1" max="10" value="4"></label><label class="slider-card">Altura triángulo<strong id="triHeightV">3 m</strong><input id="triHeight" type="range" min="1" max="10" value="3"></label><label class="slider-card">Radio círculo<strong id="quarterRadiusV">4 m</strong><input id="quarterRadius" type="range" min="1" max="8" value="4"></label></div>
       <div class="canvas-area-stage"><div class="triangle-shape"></div><div class="quarter-circle-shape"></div></div>
       <div class="sim-grid-2"><article><span>Triángulo correcto</span><strong id="triangleArea">6 m²</strong></article><article><span>Error común</span><strong id="triangleWrong">12 m²</strong></article></div>`,
      "<strong>Error detectado:</strong> usar base × altura para un triángulo duplica su área real."
    );
  }

  function simPieChartVotes() {
    return simWrapper(
      "Tabla exacta vs gráfica circular",
      "Ajusta los votos y observa que la gráfica ayuda a comparar proporciones, pero no siempre permite leer valores exactos.",
      `<div class="sim-grid-3"><label class="slider-card">Candidato A<strong id="candidateAV">40%</strong><input id="candidateA" type="range" min="0" max="100" value="40"></label><label class="slider-card">Candidato B<strong id="candidateBV">35%</strong><input id="candidateB" type="range" min="0" max="100" value="35"></label><label class="slider-card">Otros<strong id="candidateOV">25%</strong><input id="candidateO" type="range" min="0" max="100" value="25" disabled></label></div>
       <div class="pie-lab"><div id="votePie" class="vote-pie"></div><div class="pie-legend"><span>A</span><span>B</span><span>Otros</span></div></div>
       <div class="word-feedback">La gráfica circular permite ver cuál sector es mayor, pero para datos exactos se necesita la tabla.</div>`,
      "<strong>Clave:</strong> diferencia representación visual de precisión numérica."
    );
  }

  function simSavingsTrend() {
    return simWrapper(
      "Tendencia de ahorro mensual",
      "Observa cómo aumenta el ahorro total al finalizar cada mes: es un patrón lineal con diferencia constante.",
      `<label class="slider-card wide">Mes observado<strong id="trendMonthV">4</strong><input id="trendMonth" type="range" min="1" max="8" value="4"></label>
       <svg class="trend-svg" viewBox="0 0 420 210"><line x1="40" y1="170" x2="390" y2="170"/><line x1="40" y1="170" x2="40" y2="20"/><polyline id="trendLine" points="70,145 130,120 190,95 250,70"/><circle id="trendDot" cx="250" cy="70" r="8"/></svg>
       <div class="live-formula-card"><span>Ahorro acumulado</span><strong id="trendValue">$220.000</strong><span>Aumento mensual</span><strong>$30.000</strong></div>`,
      "<strong>Patrón:</strong> cuando cada mes aumenta la misma cantidad, la tendencia es creciente lineal."
    );
  }

  function simPartsAverage() {
    return simWrapper(
      "Promedio de piezas reemplazadas",
      "Mueve los valores de los tres vehículos y mira cómo cambia la media.",
      `<div class="sim-grid-3"><label class="slider-card">Vehículo 1<strong id="part1V">6</strong><input id="part1" type="range" min="0" max="20" value="6"></label><label class="slider-card">Vehículo 2<strong id="part2V">5</strong><input id="part2" type="range" min="0" max="20" value="5"></label><label class="slider-card">Vehículo 3<strong id="part3V">10</strong><input id="part3" type="range" min="0" max="20" value="10"></label></div>
       <div class="animated-bars" id="partsBars"><i style="height:78px"><span>6</span></i><i style="height:65px"><span>5</span></i><i style="height:130px"><span>10</span></i></div>
       <div class="live-formula-card"><span>Suma</span><strong id="partsSum">21</strong><span>÷ 3 =</span><strong id="partsAvg">7</strong></div>`,
      "<strong>Regla:</strong> promedio = suma de los datos ÷ número de datos."
    );
  }

  function simBikeVenn() {
    return simWrapper(
      "Círculo de bicicleta: sumar regiones internas",
      "Activa o desactiva regiones del círculo de bicicleta. Para el total, se suman todas las zonas que pertenecen a bicicleta.",
      `<svg class="venn-svg bike-venn" viewBox="0 0 560 360"><rect x="15" y="15" width="530" height="330" rx="18" class="venn-box"/><circle cx="220" cy="170" r="95" class="venn-circle bike"/><circle cx="340" cy="170" r="95" class="venn-circle car"/><circle cx="280" cy="245" r="95" class="venn-circle public"/><text x="170" y="160" class="venn-num">50</text><text x="280" y="150" class="venn-num">20</text><text x="240" y="238" class="venn-num">25</text><text x="280" y="202" class="venn-num">5</text></svg>
       <div class="choice-row wrap"><label><input type="checkbox" data-bike-region="solo" checked> Solo bici 50</label><label><input type="checkbox" data-bike-region="car" checked> Bici + carro 20</label><label><input type="checkbox" data-bike-region="public" checked> Bici + público 25</label><label><input type="checkbox" data-bike-region="all" checked> Tres medios 5</label></div>
       <div class="live-formula-card"><span>Total bicicleta</span><strong id="bikeTotal">100</strong></div>`,
      "<strong>Pista:</strong> no se suma solo “bicicleta exclusiva”; se suman todas las zonas dentro del círculo de bicicleta."
    );
  }

  function simTransistorGrowth() {
    return simWrapper(
      "Crecimiento exponencial de transistores",
      "Cada dos años se duplica. Mueve el año y observa las duplicaciones acumuladas.",
      `<label class="slider-card wide">Año<strong id="transYearV">2016</strong><input id="transYear" type="range" min="2010" max="2020" value="2016" step="2"></label>
       <div class="transistor-chip"><div id="transistorGrid"></div></div>
       <div class="live-formula-card"><span>Duplicaciones</span><strong id="doublings">3</strong><span>Transistores</span><strong id="transistors">80.000</strong></div>`,
      "<strong>Modelo:</strong> 10.000 × 2³ = 80.000 en 2016."
    );
  }

  function simGardenRedundancy() {
    return simWrapper(
      "Procedimientos equivalentes en áreas",
      "Compara sumar cuatro partes iguales con multiplicar una parte por cuatro. Ambas acciones hacen lo mismo.",
      `<div class="sim-grid-2"><label class="slider-card">x<strong id="gardenXV">4</strong><input id="gardenX" type="range" min="1" max="10" value="4"></label><label class="slider-card">y<strong id="gardenYV">3</strong><input id="gardenY" type="range" min="1" max="10" value="3"></label></div>
       <div class="garden-square"><div class="inner-square"></div><span>4 regiones iguales</span></div>
       <div class="sim-grid-2"><article><span>4 × área de una parte</span><strong id="gardenMult">48</strong></article><article><span>Parte + parte + parte + parte</span><strong id="gardenSum">48</strong></article></div>`,
      "<strong>Redundancia:</strong> si ya multiplicaste por 4, no necesitas volver a sumar cuatro veces el mismo valor."
    );
  }

  function simTunnelFactorization() {
    return simWrapper(
      "Factorización de la fórmula de movimiento",
      "Explora la expresión d = vt + 1/2 at². Al factorizar t, queda un t dentro del segundo término.",
      `<div class="sim-grid-3"><label class="slider-card">Velocidad v<strong id="velV">10 m/s</strong><input id="vel" type="range" min="1" max="30" value="10"></label><label class="slider-card">Aceleración a<strong id="accV">3 m/s²</strong><input id="acc" type="range" min="1" max="10" value="3"></label><label class="slider-card">Tiempo t<strong id="timeTunnelV">15 s</strong><input id="timeTunnel" type="range" min="1" max="30" value="15"></label></div>
       <div class="formula-compare"><article><span>Forma original</span><strong id="tunnelOriginal">375 m</strong></article><article><span>Factorización correcta</span><strong id="tunnelFactored">375 m</strong></article><article class="danger-card"><span>Error común</span><strong id="tunnelWrong">172,5 m</strong></article></div>
       <div class="tunnel-animation"><span id="carTunnel">🚗</span></div>`,
      "<strong>Clave algebraica:</strong> al sacar factor común t, la potencia t² pierde un t, pero conserva otro t."
    );
  }

  function simDownloadTime() {
    return simWrapper(
      "Descarga de archivos: tamaño ÷ velocidad",
      "Convierte megabytes a kilobytes y divide por la velocidad de descarga.",
      `<div class="sim-grid-2"><label class="slider-card">Tamaño del archivo<strong id="fileSizeV">12,6 MB</strong><input id="fileSize" type="range" min="1" max="50" value="12.6" step="0.1"></label><label class="slider-card">Velocidad<strong id="downloadSpeedV">300 KB/s</strong><input id="downloadSpeed" type="range" min="50" max="1000" value="300" step="50"></label></div>
       <div class="download-track"><span id="downloadFill"></span><b>⬇️</b></div>
       <div class="sim-grid-2"><article><span>Procedimiento correcto</span><strong id="downloadTime">43,0 s</strong></article><article class="danger-card"><span>Procedimiento que NO sirve</span><strong>1024 × 300 ÷ 12,6</strong></article></div>`,
      "<strong>Regla:</strong> tiempo = tamaño ÷ velocidad. Primero: 12,6 MB × 1.024 = 12.902,4 KB."
    );
  }

  function simRampSimilarity() {
    return simWrapper(
      "Rampa y triángulos semejantes",
      "Mueve la base, la altura del muro y la posición de la columna para ver la altura proporcional h.",
      `<div class="sim-grid-3"><label class="slider-card">Base total<strong id="rampBaseV">4 m</strong><input id="rampBase" type="range" min="2" max="10" value="4" step="0.5"></label><label class="slider-card">Altura muro<strong id="rampHeightV">3 m</strong><input id="rampHeight" type="range" min="1" max="6" value="3" step="0.5"></label><label class="slider-card">Distancia columna<strong id="rampColumnV">2 m</strong><input id="rampColumn" type="range" min="0.5" max="8" value="2" step="0.5"></label></div>
       <svg class="ramp-svg" viewBox="0 0 420 230"><polygon points="40,190 360,190 360,45" class="ramp-triangle"/><line id="rampColLine" x1="200" y1="190" x2="200" y2="118"/><text id="rampHText" x="210" y="140">h=1,5</text><text x="360" y="35">3 m</text><text x="190" y="212">2 m</text></svg>
       <div class="live-formula-card"><span>Altura de columna</span><strong id="rampColumnHeight">1,5 m</strong></div>`,
      "<strong>Semejanza:</strong> si la columna está a mitad de la base, su altura es la mitad de la altura del muro."
    );
  }

  function simCakeArea() {
    return simWrapper(
      "Área del trozo rectangular",
      "Ajusta la base, altura total y corte superior para comprender cómo se obtiene el área del trozo.",
      `<div class="sim-grid-3">
        <label class="slider-card">Base total<strong id="cakeBaseV">60 cm</strong><input id="cakeBase" type="range" min="30" max="80" value="60"></label>
        <label class="slider-card">Altura total<strong id="cakeHeightV">20 cm</strong><input id="cakeHeight" type="range" min="10" max="40" value="20"></label>
        <label class="slider-card">Corte inferior<strong id="cakeCutV">5 cm</strong><input id="cakeCut" type="range" min="0" max="15" value="5"></label>
       </div>
       <div class="cake-stage"><div id="cakePiece" class="cake-piece"><span id="cakeArea">225 cm²</span></div></div>`,
      "<strong>Clave:</strong> identifica qué figura queda y usa base × altura solo cuando es rectángulo."
    );
  }

  function simPolar() {
    return simWrapper(
      "Radar de coordenadas polares",
      "El radio r indica distancia a la torre. El avión más cercano tiene menor r.",
      `<div class="sim-grid-2"><label class="slider-card">Radio r<strong id="polarRV">40 km</strong><input id="polarR" type="range" min="10" max="80" value="40"></label><label class="slider-card">Ángulo θ<strong id="polarAV">60°</strong><input id="polarA" type="range" min="0" max="360" value="60"></label></div>
       <svg class="polar-svg" viewBox="0 0 320 320"><circle cx="160" cy="160" r="130"/><circle cx="160" cy="160" r="90"/><circle cx="160" cy="160" r="50"/><line x1="160" y1="160" x2="160" y2="30"/><line id="polarNeedle" x1="160" y1="160" x2="225" y2="48"/><circle id="polarDot" cx="225" cy="48" r="9"/><text x="166" y="155">Torre</text></svg>`
    );
  }

  function simRoute() {
    const steps = [["Inicio",0],["+3",3],["+6",9],["+3",12],["−10",2],["+1",3]];
    return simWrapper(
      "Ruta en la recta numérica",
      "Avanza paso a paso y observa la operación completa.",
      `<div class="route-line">${Array.from({length:13},(_,i)=>`<span>${i}</span>`).join("")}<b id="routeRunner">🚲</b></div>
       <div class="choice-row wrap route-controls">${steps.map((s,i)=>`<button type="button" data-route-step="${i}" class="route-btn ${i===0?'active':''}">${s[0]}</button>`).join("")}</div>
       <div class="live-formula-card"><span>Posición</span><strong id="routePosition">0 cuadras</strong><span>Operación</span><strong>3 + 6 + 3 − 10 + 1</strong></div>`
    );
  }

  function simDecimalOrder() {
    const vals = { Santiago:-7.60, Ximena:-7.09, Mariana:-7.62, Orlando:-7.53 };
    return simWrapper(
      "Orden de números negativos",
      "En negativos, el menor está más a la izquierda. Observa la ubicación en la recta.",
      `<div class="numberline" id="pressureLine">${Object.entries(vals).map(([name,val])=>`<button type="button" class="pressure-dot" style="left:${((val + 7.7) / 0.8) * 100}%"><span>${name}</span><strong>${val}</strong></button>`).join("")}</div>
       <div class="order-card"><span>Orden menor a mayor</span><strong>Mariana → Santiago → Orlando → Ximena</strong></div>`
    );
  }

  function simGreasePollution() {
    return simWrapper(
      "Contaminación del agua por grasas",
      "Aumenta la grasa y observa cómo disminuye la entrada de oxígeno y luz al ecosistema.",
      `<label class="slider-card wide">Aceite contaminante<strong id="greaseVal">50%</strong><input id="greaseRate" type="range" min="0" max="100" value="50"></label>
       <div class="water-tank"><div id="greaseLayer" class="grease-layer"></div><div class="fish fish-a">🐟</div><div class="fish fish-b">🐠</div><div class="plant">🌿</div></div>
       <div class="sim-grid-2"><article><span>Oxígeno disponible</span><strong id="oxygenVal">50%</strong></article><article><span>Riesgo ecológico</span><strong id="riskVal">Medio</strong></article></div>`
    );
  }

  function simPhotosynthesis() {
    return simWrapper(
      "Laboratorio de fotosíntesis",
      "Modifica CO₂, agua y luz para ver la producción de glucosa.",
      `<div class="sim-grid-3"><label class="slider-card">CO₂<strong id="co2Val">6</strong><input id="co2" type="range" min="0" max="12" value="6"></label><label class="slider-card">H₂O<strong id="h2oVal">6</strong><input id="h2o" type="range" min="0" max="12" value="6"></label><button type="button" id="sunToggle" class="sun-toggle active">☀️ Luz activa</button></div>
       <div class="plant-lab"><div class="sun-rays"></div><div class="big-plant">🌱</div><div class="glucose-meter"><span>Glucosa</span><strong id="glucoseVal">100%</strong></div></div>`
    );
  }

  function simGasLaw() {
    return simWrapper(
      "Gas ideal a presión constante",
      "Al aumentar temperatura, aumenta volumen si la presión se mantiene constante.",
      `<div class="sim-grid-2"><label class="slider-card">Temperatura<strong id="gasTempV">293 K</strong><input id="gasTemp" type="range" min="250" max="520" value="293"></label><label class="slider-card">Moles relativos<strong id="gasMolesV">1.0</strong><input id="gasMoles" type="range" min="5" max="20" value="10"></label></div>
       <div class="gas-cylinder"><div id="gasPiston" class="gas-piston"></div><div class="gas-bubbles"><i></i><i></i><i></i><i></i><i></i></div></div><div class="live-formula-card"><span>Volumen estimado</span><strong id="gasVolV">4.0 L</strong><span>Relación</span><strong>V ∝ T</strong></div>`
    );
  }

  function simIronPhase() {
    return simWrapper(
      "Curva de calentamiento del hierro",
      "Mueve la temperatura para identificar sólido, fusión, líquido, vaporización y gas.",
      `<label class="slider-card wide">Temperatura<strong id="ironTempV">0 °C</strong><input id="ironTemp" type="range" min="0" max="3000" value="0" step="5"></label>
       <div class="heating-chart"><div class="phase-zone solid">Sólido</div><div class="phase-zone fusion">Fusión 1535°C</div><div class="phase-zone liquid">Líquido</div><div class="phase-zone vapor">Vaporización 2750°C</div><i id="heatMarker"></i></div><div class="phase-output" id="ironPhase">SÓLIDO</div>`
    );
  }

  function simEnglishVocabulary() {
    return simWrapper(
      "Context clues · English trainer",
      "Elige la palabra que mejor encaja con la descripción y revisa la pista semántica.",
      `<div class="english-trainer"><p class="english-sentence">This is something people can sit on during a picnic.</p><div class="choice-grid">${["blanket","bottle","sandwich","ticket"].map(w=>`<button type="button" data-word="${w}" class="word-btn">${w}</button>`).join("")}</div><div id="wordFeedback" class="word-feedback">Selecciona una palabra.</div></div>`
    );
  }


  function readingQuestionProfile(q) {
    const component = String(q.component || q.componente || "").toLowerCase();
    const prompt = stripHtml(q.prompt || q.stem || "").toLowerCase();
    const n = Number(q.number || 0);
    let profile = {
      kind: "Lectura crítica integral",
      icon: "🧠",
      focus: "Detectar evidencia textual, descartar distractores y justificar la opción elegida.",
      stages: ["Pregunta final", "Evidencia", "Inferencia", "Descarte"],
      weights: [82, 76, 70, 86],
      tools: ["Subrayar palabras clave", "Reconocer el propósito", "Comparar opciones", "Verificar con el texto"],
      challenge: "Elige la opción que mejor responde a la pregunta sin agregar información externa."
    };
    if (/par[aá]frasis|sentido local|equivalente|reescritura/.test(component + prompt)) {
      profile = { kind: "Paráfrasis y sentido local", icon: "🔁", focus: "Conservar la idea del texto usando otras palabras, sin cambiar el sentido.", stages: ["Idea original", "Sinónimos", "Mismo sentido", "Sin distorsión"], weights: [88, 78, 92, 80], tools: ["Detecta la idea central", "Evita exageraciones", "Respeta el alcance", "Compara palabra por palabra"], challenge: "La mejor paráfrasis cambia la forma, pero mantiene la misma intención." };
    } else if (/relaci[oó]n|conector|enunciados|coherencia|cohesi[oó]n/.test(component + prompt)) {
      profile = { kind: "Relación entre enunciados", icon: "🔗", focus: "Identificar si una frase explica, ejemplifica, contradice, concluye o causa la otra.", stages: ["Enunciado 1", "Conector", "Enunciado 2", "Relación"], weights: [80, 90, 78, 88], tools: ["Busca conectores", "Prueba causalidad", "Prueba oposición", "Evalúa explicación"], challenge: "No mires solo frases aisladas: busca la función de una respecto a la otra." };
    } else if (/argument|tesis|raz[oó]n|justificaci[oó]n|premisa/.test(component + prompt)) {
      profile = { kind: "Argumentación", icon: "⚖️", focus: "Diferenciar tesis, argumento, ejemplo y conclusión dentro del texto.", stages: ["Tesis", "Razón", "Evidencia", "Conclusión"], weights: [86, 84, 76, 82], tools: ["Ubica la postura", "Pregunta: ¿por qué?", "Separa opinión de soporte", "Comprueba la conclusión"], challenge: "Una opción argumentativa debe sostener la idea, no solo repetir palabras del texto." };
    } else if (/infer|perspectiva|impl[ií]cito|deduce|concluye/.test(component + prompt)) {
      profile = { kind: "Inferencia y perspectiva", icon: "🔎", focus: "Construir una conclusión razonable a partir de pistas explícitas del texto.", stages: ["Dato textual", "Pista", "Inferencia", "Límite"], weights: [78, 84, 88, 72], tools: ["No inventes", "Une pistas", "Evita saltos lógicos", "Verifica el tono"], challenge: "La inferencia correcta está apoyada por el texto, aunque no esté escrita literalmente." };
    } else if (/intenci[oó]n|prop[oó]sito|funci[oó]n|autor|pregunta ret[oó]rica/.test(component + prompt)) {
      profile = { kind: "Intención comunicativa", icon: "🎯", focus: "Reconocer para qué se incluye una frase, pregunta, ejemplo o recurso en el texto.", stages: ["Recurso", "Contexto", "Propósito", "Efecto"], weights: [76, 82, 90, 78], tools: ["Pregunta: ¿para qué?", "Mira el párrafo", "Analiza el tono", "Relaciona con la tesis"], challenge: "La intención no es lo que dice el fragmento, sino la función que cumple." };
    } else if (/vocabulario|palabra|expresi[oó]n|contexto|significa/.test(component + prompt)) {
      profile = { kind: "Vocabulario en contexto", icon: "📘", focus: "Determinar el significado de una palabra según el contexto, no por memoria aislada.", stages: ["Palabra", "Contexto", "Sentido", "Sustitución"], weights: [74, 90, 84, 76], tools: ["Lee antes y después", "Prueba reemplazos", "Evita sentido literal forzado", "Comprueba coherencia"], challenge: "Una palabra puede cambiar de sentido según el texto." };
    } else if (/gr[aá]fic|imagen|viñeta|tabla|infograf|multimodal/.test(component + prompt)) {
      profile = { kind: "Texto gráfico y multimodal", icon: "📊", focus: "Relacionar información verbal y visual para interpretar intención, datos o crítica.", stages: ["Elementos", "Relación", "Contraste", "Conclusión"], weights: [86, 72, 84, 80], tools: ["Lee títulos", "Observa símbolos", "Conecta texto e imagen", "Busca contradicciones"], challenge: "En textos gráficos, la respuesta suele estar en la relación entre imagen y palabras." };
    } else if (/narrador|voz|personaje|tono|actitud/.test(component + prompt)) {
      profile = { kind: "Voz, tono y narración", icon: "🎭", focus: "Identificar quién habla, desde dónde habla y con qué actitud se construye el sentido.", stages: ["Voz", "Tono", "Contexto", "Efecto"], weights: [82, 86, 74, 80], tools: ["Identifica hablante", "Marca adjetivos", "Reconoce ironía", "Relaciona con el tema"], challenge: "La voz narrativa orienta la interpretación de los hechos." };
    }
    profile.seed = n % 7;
    return profile;
  }



  /* ==========================================================
     Super simuladores AI Studio · Sección 2 Matemáticas
     Preguntas 29 a 50
     ========================================================== */
  const S2_MATH_SUPER_CONFIGS = {
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

  function getS2MathSuperConfig(number) {
    return S2_MATH_SUPER_CONFIGS[Number(number)] || null;
  }

  function isS2MathSuperQuestion(q) {
    return Number(q?.session) === 2 &&
      Number(q?.number) >= 29 && Number(q?.number) <= 50 &&
      String(q?.area || "").toLowerCase().includes("matem");
  }

  function isS2NaturalScienceSuperQuestion(q) {
    return Number(q?.session) === 2 &&
      Number(q?.number) >= 51 && Number(q?.number) <= 79 &&
      String(q?.area || "").toLowerCase().includes("ciencias");
  }

  function plainOptionText(option) {
    return stripHtml(option?.text || option?.label || "").replace(/\s+/g, " ").trim();
  }

  function mathSuperMetrics(q, config) {
    const source = `${q?.stem || ""} ${q?.prompt || ""} ${config?.keyIdea || ""}`.toLowerCase();
    if (/probabilidad|casos|combinatoria|placas|elecciones|posibles/.test(source)) return [90, 92, 78, 86];
    if (/área|rectángulo|figura|geométrica|polígono|lados|cajas|cuartil/.test(source)) return [86, 82, 94, 88];
    if (/promedio|media|porcentaje|impuesto|precio|tabla|mínimo|mayor cantidad/.test(source)) return [94, 86, 78, 90];
    if (/proporcionalidad|escala|trayectoria|velocidad|distancia|mapa/.test(source)) return [88, 94, 84, 80];
    if (/algoritmo|expresión|algebraica|operaciones|verificación/.test(source)) return [84, 88, 90, 82];
    return [86, 84, 82, 88];
  }

  function renderS2MathDataTable(config) {
    if (!config?.dataTable) return "";
    const headers = Array.isArray(config.dataTable.headers) ? config.dataTable.headers : [];
    const rows = Array.isArray(config.dataTable.rows) ? config.dataTable.rows : [];
    return `
      <div class="math-super-table" role="table" aria-label="Datos clave del simulador matemático">
        <div role="row" class="math-super-table-head">${headers.map(h => `<strong>${escapeHtml(h)}</strong>`).join("")}</div>
        ${rows.map(row => `<div role="row">${row.map(cell => `<span>${escapeHtml(cell)}</span>`).join("")}</div>`).join("")}
      </div>`;
  }

  function renderS2MathSuper(q) {
    const config = getS2MathSuperConfig(Number(q.number));
    if (!config) return "";
    const metrics = mathSuperMetrics(q, config);
    const labels = ["Datos", "Operación", "Modelo", "Verificación"];
    const chips = (config.chips || []).map((chip, index) => `
      <button class="math-super-chip" type="button" data-s2math-chip data-correct="${chip.correct ? "1" : "0"}" data-index="${index}">${escapeHtml(chip.text)}</button>`).join("");
    const strategies = (config.strategyChoices || []).map((choice, index) => `
      <button class="math-super-choice" type="button" data-s2math-choice="strategy" data-correct="${choice.correct ? "1" : "0"}" data-index="${index}">${escapeHtml(choice.text)}</button>`).join("");
    const miniChoices = (config.miniChoices || []).map((choice, index) => `
      <button class="math-super-choice" type="button" data-s2math-choice="mini" data-correct="${choice.correct ? "1" : "0"}" data-index="${index}">${escapeHtml(choice.text)}</button>`).join("");
    const options = (q.options || []).map(option => {
      const letter = option.letter || option.value || "";
      const content = option.isHtml ? (option.text || option.label || "") : escapeHtml(option.text || option.label || "");
      return `<button class="math-super-final" type="button" data-s2math-final="${escapeHtml(letter)}"><b>${escapeHtml(letter)}</b><span>${content}</span></button>`;
    }).join("");
    const dataTable = renderS2MathDataTable(config);
    return simWrapper(
      `🧮 Super simulador matemático · Pregunta ${escapeHtml(q.number)}`,
      `Entrenamiento interactivo para Matemáticas, Sección 2, preguntas 29 a 50. Lee, modela, calcula, verifica y elige con retroalimentación inmediata.`,
      `<div class="math-super-sim" data-math-correct="${escapeHtml(q.correctAnswer || "")}">
        <div class="math-super-hero">
          <div>
            <span class="math-super-badge">AI Studio · Saber 11</span>
            <h4>${escapeHtml(config.title || `Pregunta ${q.number}`)}</h4>
            <p>${escapeHtml(config.challenge || q.prompt || "Practica la ruta matemática de la pregunta.")}</p>
          </div>
          <div class="math-super-orbit" aria-hidden="true">
            <span>Leer</span><span>Modelar</span><span>Calcular</span><span>Verificar</span><b>∑</b>
          </div>
        </div>

        <div class="math-super-workbench">
          <article class="math-super-card math-super-focus">
            <h4>Reto ICFES</h4>
            <p>${escapeHtml(q.prompt || "Selecciona la respuesta correcta.")}</p>
            ${dataTable}
          </article>
          <article class="math-super-card">
            <h4>Idea matemática clave</h4>
            <p>${escapeHtml(config.keyIdea || "Identifica datos, operación, representación y condición antes de elegir una opción.")}</p>
            <div class="math-super-bars" id="mathSuperBars">
              ${metrics.map((v, i) => `<div class="math-super-bar-row"><span>${labels[i]}</span><div><i style="width:${v}%"></i></div><em>${v}%</em></div>`).join("")}
            </div>
          </article>
        </div>

        <div class="math-super-panel">
          <div class="math-super-panel-head"><strong>1. Detector de pistas útiles</strong><button class="secondary-btn compact" type="button" id="checkS2MathChips">Verificar pistas</button></div>
          <p>Selecciona solo las pistas que realmente ayudan a resolver la pregunta.</p>
          <div class="math-super-chip-grid">${chips}</div>
          <div class="math-super-feedback" id="mathSuperChipFeedback" aria-live="polite">Toca las pistas y luego verifica.</div>
        </div>

        <div class="math-super-grid-2">
          <section class="math-super-panel">
            <strong>2. Estrategia de resolución</strong>
            <p>${escapeHtml(config.strategyQuestion || "¿Qué procedimiento conviene aplicar?")}</p>
            <div class="math-super-choice-grid">${strategies}</div>
            <div class="math-super-feedback" id="mathSuperStrategyFeedback" aria-live="polite">Elige la ruta matemática más segura.</div>
          </section>
          <section class="math-super-panel">
            <strong>3. Micro-reto de entrenamiento</strong>
            <p>${escapeHtml(config.miniQuestion || "Resuelve este micro-reto antes de contestar.")}</p>
            <div class="math-super-choice-grid">${miniChoices}</div>
            <div class="math-super-feedback" id="mathSuperMiniFeedback" aria-live="polite">Entrena el procedimiento con un caso corto.</div>
          </section>
        </div>

        <div class="math-super-panel math-super-lab">
          <strong>4. Laboratorio de respuesta final</strong>
          <p>Elige una opción. El simulador te dirá si coincide con la ruta matemática trabajada.</p>
          <div class="math-super-final-grid">${options}</div>
          <div class="math-super-feedback" id="mathSuperFinalFeedback" aria-live="polite">Aún no has elegido respuesta en el laboratorio.</div>
        </div>

        <div class="math-super-panel math-super-controls">
          <strong>Panel de animación matemática</strong>
          <p>Ajusta los controles para visualizar cómo cambia el peso de cada habilidad al resolver la pregunta.</p>
          ${labels.map((label, i) => `<label>${label}<strong id="mathSuperRangeV${i}">${metrics[i]}%</strong><input type="range" min="20" max="100" value="${metrics[i]}" data-s2math-range="${i}"></label>`).join("")}
          <div class="math-super-particles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        </div>
      </div>`,
      `<strong>Nota didáctica:</strong> ${escapeHtml(config.teacherNote || q.explanation || "Verifica que la opción elegida responda exactamente lo que pide el enunciado.")}`
    );
  }

  function bindS2MathSuperEvents() {
    const sim = $(".math-super-sim");
    if (!sim) return;
    $$("[data-s2math-chip]", sim).forEach(btn => btn.addEventListener("click", () => {
      btn.classList.toggle("selected");
      const fb = $("#mathSuperChipFeedback");
      if (fb) {
        fb.className = "math-super-feedback warn";
        fb.textContent = "Pistas seleccionadas. Verifica si todas son necesarias para resolver la pregunta.";
      }
    }));
    const check = $("#checkS2MathChips", sim);
    if (check) check.addEventListener("click", () => {
      const buttons = $$("[data-s2math-chip]", sim);
      const wrongSelected = buttons.some(button => button.classList.contains("selected") && button.dataset.correct !== "1");
      const missingCorrect = buttons.some(button => !button.classList.contains("selected") && button.dataset.correct === "1");
      buttons.forEach(button => {
        button.classList.remove("correct", "wrong");
        if (button.classList.contains("selected") && button.dataset.correct === "1") button.classList.add("correct");
        if (button.classList.contains("selected") && button.dataset.correct !== "1") button.classList.add("wrong");
      });
      const fb = $("#mathSuperChipFeedback");
      if (!fb) return;
      if (!wrongSelected && !missingCorrect) {
        fb.className = "math-super-feedback ok";
        fb.innerHTML = "✅ <strong>Excelente.</strong> Separaste datos útiles de distractores, una habilidad clave en Matemáticas Saber 11.";
      } else if (wrongSelected) {
        fb.className = "math-super-feedback error";
        fb.innerHTML = "💡 <strong>Revisa.</strong> Hay una pista distractora seleccionada. Quita lo que no aporta al procedimiento.";
      } else {
        fb.className = "math-super-feedback warn";
        fb.innerHTML = "🧭 <strong>Vas bien.</strong> Todavía falta una pista necesaria para justificar la solución.";
      }
    });
    $$("[data-s2math-choice]", sim).forEach(btn => btn.addEventListener("click", () => {
      const group = btn.dataset.s2mathChoice || "strategy";
      const selector = `[data-s2math-choice="${group}"]`;
      $$(selector, sim).forEach(item => item.classList.remove("selected", "correct", "wrong"));
      btn.classList.add("selected", btn.dataset.correct === "1" ? "correct" : "wrong");
      const fb = group === "strategy" ? $("#mathSuperStrategyFeedback") : $("#mathSuperMiniFeedback");
      if (!fb) return;
      if (btn.dataset.correct === "1") {
        fb.className = "math-super-feedback ok";
        fb.innerHTML = group === "strategy" ? "✅ <strong>Correcto.</strong> Esta estrategia responde al tipo de razonamiento de la pregunta." : "✅ <strong>Correcto.</strong> El micro-reto confirma el procedimiento que debes aplicar.";
      } else {
        fb.className = "math-super-feedback error";
        fb.innerHTML = "💡 <strong>Revisa.</strong> La opción no usa la relación matemática central del enunciado.";
      }
    }));
    $$("[data-s2math-final]", sim).forEach(btn => btn.addEventListener("click", () => {
      const q = currentQuestion();
      const chosen = btn.dataset.s2mathFinal || "";
      $$("[data-s2math-final]", sim).forEach(item => item.classList.remove("selected", "correct", "wrong"));
      const ok = selectCurrentAnswer(chosen, { render: false });
      btn.classList.add("selected", ok ? "correct" : "wrong");
      const fb = $("#mathSuperFinalFeedback");
      if (!fb) return;
      if (ok) {
        fb.className = "math-super-feedback ok";
        fb.innerHTML = `✅ <strong>Correcto.</strong> La opción ${escapeHtml(chosen)} coincide con la ruta matemática. ${escapeHtml(q.explanation || "")}`;
      } else {
        fb.className = "math-super-feedback error";
        fb.innerHTML = `💡 <strong>Revisa la opción ${escapeHtml(chosen)}.</strong> Antes de responder, vuelve a pistas, estrategia y micro-reto.`;
      }
    }));
    $$("[data-s2math-range]", sim).forEach(input => input.addEventListener("input", updateS2MathSuper));
  }

  function updateS2MathSuper() {
    const sim = $(".math-super-sim");
    if (!sim) return;
    $$("[data-s2math-range]", sim).forEach((input, index) => {
      const value = Math.max(20, Math.min(100, Number(input.value || 0)));
      setText(`#mathSuperRangeV${index}`, `${value}%`);
      const bar = $$(".math-super-bar-row i", sim)[index];
      const em = $$(".math-super-bar-row em", sim)[index];
      if (bar) bar.style.width = `${value}%`;
      if (em) em.textContent = `${value}%`;
    });
  }


  function simCriticalReadingSuper(q) {
    const profile = readingQuestionProfile(q);
    const text = stripHtml(`${q.stem || ""} ${q.prompt || ""}`) || "Pregunta de lectura crítica tipo Saber 11.";
    const tokens = text.split(/\s+/).filter(Boolean).slice(0, 30);
    const opts = (q.options || []).map(o => ({ letter: o.letter || o.value || "", text: stripHtml(o.text || o.label || "") }));
    const bars = profile.weights.map((v, i) => ({ label: profile.stages[i], value: Math.max(18, Math.min(96, v - (profile.seed * 2) + (i * 3))) }));
    const optionBars = opts.map((o, i) => ({ letter: o.letter, value: o.letter === q.correctAnswer ? 92 : Math.max(22, 68 - (i * 9) + profile.seed) }));
    return simWrapper(
      `${profile.icon} Super simulador de lectura crítica · Pregunta ${q.number}`,
      `Entrenamiento interactivo para ${profile.kind}. El objetivo es aprender el método, no memorizar la respuesta.`,
      `<div class="critical-super-sim" data-reading-correct="${escapeHtml(q.correctAnswer || "")}">
        <div class="critical-hero">
          <div>
            <span class="critical-badge">${escapeHtml(q.area || "Lectura Crítica")}</span>
            <h4>${escapeHtml(profile.kind)}</h4>
            <p>${escapeHtml(profile.focus)}</p>
          </div>
          <div class="critical-orbit" aria-label="Habilidades de lectura crítica">
            <span>Literal</span><span>Inferencial</span><span>Crítica</span><b>${profile.icon}</b>
          </div>
        </div>

        <div class="critical-workbench">
          <article class="critical-card">
            <h4>1. Lupa textual animada</h4>
            <p>Selecciona palabras o fragmentos relevantes. Luego decide si funcionan como dato, pista o intención.</p>
            <div class="critical-token-box">
              ${tokens.map((w, i) => `<button type="button" data-crit-token="${i}">${escapeHtml(w)}</button>`).join(" ")}
            </div>
            <div id="criticalTokenFeedback" class="critical-feedback">Toca un fragmento para activar la lectura guiada.</div>
          </article>

          <article class="critical-card">
            <h4>2. Medidor de habilidades</h4>
            <div class="critical-bars">
              ${bars.map((b, i) => `<div class="critical-bar-row"><span>${escapeHtml(b.label)}</span><div><i style="width:${b.value}%"></i></div><strong>${b.value}%</strong></div>`).join("")}
            </div>
            <label class="critical-slider">Nivel de evidencia usada
              <strong id="critEvidenceV">70%</strong>
              <input id="critEvidence" type="range" min="0" max="100" value="70">
            </label>
          </article>
        </div>

        <div class="critical-method-grid">
          ${profile.tools.map((tool, i) => `<button type="button" data-crit-step="${i}" class="critical-method ${i === 0 ? "active" : ""}"><span>${i + 1}</span>${escapeHtml(tool)}</button>`).join("")}
        </div>
        <div id="criticalStepFeedback" class="critical-feedback strong">Paso activo: ${escapeHtml(profile.tools[0])}. ${escapeHtml(profile.challenge)}</div>

        <div class="critical-option-lab">
          <div>
            <h4>3. Laboratorio de distractores</h4>
            <p>Elige una opción y mira si responde exactamente la pregunta, si exagera, si contradice el texto o si solo repite palabras sueltas.</p>
            <div class="choice-grid critical-option-grid">
              ${opts.map(o => `<button type="button" data-crit-option="${escapeHtml(o.letter)}"><b>${escapeHtml(o.letter)}</b><span>${escapeHtml(o.text).slice(0, 120)}${o.text.length > 120 ? "…" : ""}</span></button>`).join("")}
            </div>
          </div>
          <div class="critical-option-meter">
            <h4>Índice de pertinencia</h4>
            ${optionBars.map(b => `<div class="critical-mini-row"><span>${escapeHtml(b.letter)}</span><div><i style="width:${b.value}%"></i></div></div>`).join("")}
            <div id="criticalOptionFeedback" class="critical-feedback">Selecciona una opción para recibir retroalimentación inmediata.</div>
          </div>
        </div>

        <div class="critical-flow">
          <span>Pregunta final</span><i></i><span>Evidencia</span><i></i><span>Descarte</span><i></i><span>Respuesta</span>
        </div>
      </div>`,
      `<strong>Método Saber 11:</strong> ${escapeHtml(profile.challenge)} Respuesta correcta configurada en el banco: <strong>${escapeHtml(q.correctAnswer || "")}</strong>.`
    );
  }



  function socialQuestionProfile(q) {
    const number = Number(q.number || 0);
    const component = stripHtml(`${q.component || ""} ${q.competence || ""}`).toLowerCase();
    const prompt = stripHtml(`${q.stem || ""} ${q.prompt || ""}`).toLowerCase();
    let profile = {
      kind: "Análisis social y ciudadano",
      icon: "🏛️",
      focus: "Reconocer actores, intereses, derechos, contexto y consecuencias antes de elegir una opción.",
      lens: ["Actores", "Normas", "Derechos", "Consecuencias"],
      weights: [82, 76, 84, 78],
      tools: ["Identifica actores", "Ubica el conflicto", "Aplica principio democrático", "Descarta salidas sesgadas"],
      challenge: "La opción correcta debe respetar el contexto del caso y sostenerse en derechos, evidencia o norma, no en una opinión personal."
    };

    if (/cambio clim[aá]tico|desarrollo sostenible|parlamento brit[aá]nico|recursos naturales|derechos colectivos/.test(component + prompt)) {
      profile = { kind: "Desarrollo sostenible y acción climática", icon: "🌎", focus: "Relacionar evidencia ambiental, justicia intergeneracional y decisiones públicas sostenibles.", lens: ["Ambiente", "Equidad", "Evidencia", "Futuro"], weights: [92, 84, 88, 90], tools: ["Ubica el problema", "Identifica impacto", "Cruza ambiente y sociedad", "Elige acción sostenible"], challenge: "La respuesta sólida equilibra ambiente, bienestar social y responsabilidad con generaciones futuras." };
    } else if (/constituci[oó]n.*1991|diversidad [eé]tnica|civilizaci[oó]n|comunidad ind[ií]gena|afrocolombiana|pluricultural/.test(component + prompt)) {
      profile = { kind: "Constitución, diversidad y pluralismo", icon: "🛖", focus: "Comparar normas antiguas con el reconocimiento constitucional de la diversidad cultural y étnica.", lens: ["Norma", "Diversidad", "Dignidad", "Pluralismo"], weights: [86, 94, 90, 88], tools: ["Reconoce la época", "Detecta prejuicio legal", "Aplica pluralismo", "Protege dignidad"], challenge: "No basta citar una norma: debes reconocer si protege o vulnera la diversidad cultural." };
    } else if (/prejuicio|roles de g[eé]nero|socializaci[oó]n familiar|diversidad sexual|discapacidad|inclusi[oó]n laboral|migraci[oó]n|brecha digital|equidad/.test(component + prompt)) {
      profile = { kind: "Inclusión, igualdad y no discriminación", icon: "🤝", focus: "Distinguir estereotipos, barreras de acceso y acciones que garantizan igualdad real.", lens: ["Igualdad", "Barreras", "Derechos", "Acción"], weights: [92, 86, 90, 82], tools: ["Detecta el prejuicio", "Identifica barrera", "Aplica igualdad", "Evalúa inclusión"], challenge: "La opción correcta no normaliza la exclusión: propone reconocer derechos y remover barreras." };
    } else if (/conflictos socioambientales|pesca industrial|economía local|agua potable|servicios p[uú]blicos|manejo del agua|territorio/.test(component + prompt)) {
      profile = { kind: "Conflicto socioambiental y territorio", icon: "💧", focus: "Analizar actores, recursos, economía local y derechos colectivos en decisiones territoriales.", lens: ["Recurso", "Comunidad", "Economía", "Estado"], weights: [90, 88, 80, 84], tools: ["Ubica recurso", "Mapea actores", "Mide efectos", "Busca solución viable"], challenge: "La respuesta debe reconocer el conflicto entre intereses y proponer una salida con evidencia y derechos." };
    } else if (/participaci[oó]n pol[ií]tica|partidos|democracia representativa|pol[ií]tica p[uú]blica|estado|ciudadanos/.test(component + prompt)) {
      profile = { kind: "Participación, democracia y política pública", icon: "🗳️", focus: "Relacionar ciudadanía, instituciones, mecanismos democráticos y decisiones públicas.", lens: ["Ciudadanía", "Institución", "Mecanismo", "Efecto"], weights: [86, 84, 90, 78], tools: ["Identifica mecanismo", "Ubica institución", "Evalúa alcance", "Verifica consecuencia"], challenge: "No elijas la opción más emotiva: elige la que corresponde al mecanismo y función institucional." };
    } else if (/centralista|federal|independencia|historia política|nariño/.test(component + prompt)) {
      profile = { kind: "Cambio de postura histórica", icon: "🕰️", focus: "Comparar dos momentos históricos y explicar por qué cambia una posición política según el contexto.", lens: ["1811", "1823", "Guerra", "Libertad"], weights: [88, 82, 78, 86], tools: ["Compara fechas", "Lee el contexto", "Busca causa del cambio", "Relaciona modelo y momento"], challenge: "No basta ver que cambió de opinión: debes explicar qué condición histórica justifica el cambio." };
    } else if (/indígena|cabildo|cosmovisión|jurisdicción|jaguar/.test(component + prompt)) {
      profile = { kind: "Jurisdicción especial y cultura", icon: "🛖", focus: "Distinguir el conflicto entre autoridad territorial, identidad cultural y personas externas a la comunidad.", lens: ["Territorio", "Cultura", "Jurisdicción", "Sanción"], weights: [82, 90, 86, 74], tools: ["Ubica el territorio", "Reconoce cosmovisión", "Identifica autoridad", "Evalúa pertenencia"], challenge: "La pregunta suele pedir dimensiones en conflicto, no quién tiene la razón moralmente." };
    } else if (/prensa|periodista|fuentes|libertad de prensa|verific/.test(component + prompt)) {
      profile = { kind: "Libertad de prensa responsable", icon: "📰", focus: "Diferenciar libertad de expresión de responsabilidad por veracidad, verificación y buen nombre.", lens: ["Libertad", "Fuentes", "Veracidad", "Buen nombre"], weights: [86, 88, 90, 72], tools: ["Ubica el derecho", "Busca el límite", "Comprueba la fuente", "Evalúa daño"], challenge: "Un derecho fundamental no elimina la responsabilidad de verificar información que puede afectar a otros." };
    } else if (/democracia|participación|referendo|ciudadan/.test(component + prompt)) {
      profile = { kind: "Participación ciudadana", icon: "🗳️", focus: "Reconocer mecanismos democráticos y cuándo la ciudadanía puede intervenir directamente.", lens: ["Ciudadanía", "Mecanismo", "Norma", "Decisión"], weights: [84, 92, 80, 76], tools: ["Identifica mecanismo", "Diferencia opinión y norma", "Revisa quién participa", "Evalúa alcance"], challenge: "El mecanismo correcto debe corresponder a lo que la ciudadanía puede hacer según la Constitución." };
    } else if (/desarrollo sostenible|ambiente|ambiental|ecosistema|pez león|sostenible|recursos/.test(component + prompt)) {
      profile = { kind: "Ambiente y sostenibilidad", icon: "🌿", focus: "Equilibrar dimensión ambiental, social y económica usando evidencia del caso.", lens: ["Ambiente", "Economía", "Sociedad", "Evidencia"], weights: [90, 76, 82, 86], tools: ["Ubica impacto", "Relaciona actores", "No absolutices", "Busca equilibrio"], challenge: "Sostenibilidad no significa prohibir todo ni explotar sin límite: exige equilibrio entre necesidades presentes y futuras." };
    } else if (/mercado|adam smith|división del trabajo|productividad|intercambio/.test(component + prompt)) {
      profile = { kind: "Economía y mercado", icon: "⚙️", focus: "Comprender cómo especialización, productividad e intercambio explican un concepto económico.", lens: ["Trabajo", "Productividad", "Intercambio", "Mercado"], weights: [80, 88, 84, 76], tools: ["Define concepto", "Relaciona causa-efecto", "Evita juicios externos", "Vuelve al texto"], challenge: "Responde con la lógica del autor citado, no con una opinión general sobre la economía." };
    } else if (/derechos|igualdad|discriminación|prejuicio|inclusión|diversidad/.test(component + prompt)) {
      profile = { kind: "Derechos e inclusión", icon: "🤝", focus: "Analizar si una decisión protege igualdad, diversidad y no discriminación.", lens: ["Derecho", "Igualdad", "Dignidad", "Inclusión"], weights: [88, 84, 90, 78], tools: ["Ubica vulneración", "Identifica grupo afectado", "Aplica igualdad", "Revisa consecuencia"], challenge: "La opción correcta debe resolver el problema sin reproducir prejuicios ni excluir a la población afectada." };
    } else if (/conflicto|política pública|estado|instituciones|control/.test(component + prompt)) {
      profile = { kind: "Instituciones y política pública", icon: "🏢", focus: "Reconocer funciones del Estado, entidades, políticas públicas y efectos de una decisión.", lens: ["Problema", "Entidad", "Función", "Efecto"], weights: [82, 86, 80, 84], tools: ["Identifica institución", "Relaciona competencia", "Evalúa viabilidad", "Mide consecuencias"], challenge: "No elijas la acción más popular, sino la que corresponde a la función institucional del caso." };
    }
    profile.seed = number % 6;
    return profile;
  }

  function simSocialCitizenshipSuper(q) {
    const profile = socialQuestionProfile(q);
    const text = stripHtml(`${q.stem || ""} ${q.prompt || ""}`) || "Pregunta de Sociales y Ciudadanas tipo Saber 11.";
    const tokens = text.split(/\s+/).filter(Boolean).slice(0, 34);
    const opts = (q.options || []).map(o => ({ letter: o.letter || o.value || "", text: stripHtml(o.text || o.label || "") }));
    const bars = profile.lens.map((label, i) => ({ label, value: Math.max(24, Math.min(96, profile.weights[i] - profile.seed + i * 2)) }));
    const optionBars = opts.map((o, i) => ({ letter: o.letter, value: o.letter === q.correctAnswer ? 94 : Math.max(24, 70 - (i * 8) + profile.seed) }));
    const stakeholders = getSocialStakeholders(q, profile);
    return simWrapper(
      `${profile.icon} Super simulador ciudadano · Pregunta ${q.number}`,
      `Entrenamiento interactivo para ${profile.kind}. Aprende a resolver el caso como en Saber 11: evidencia, actores, norma y consecuencia.`,
      `<div class="social-super-sim" data-social-correct="${escapeHtml(q.correctAnswer || "")}">
        <div class="social-hero">
          <div>
            <span class="social-badge">${escapeHtml(q.area || "Sociales y Ciudadanas")}</span>
            <h4>${escapeHtml(profile.kind)}</h4>
            <p>${escapeHtml(profile.focus)}</p>
          </div>
          <div class="social-compass" aria-label="Brújula ciudadana">
            <span>Derechos</span><span>Actores</span><span>Contexto</span><span>Consecuencias</span><b>${profile.icon}</b>
          </div>
        </div>

        <div class="social-workbench">
          <article class="social-card">
            <h4>1. Mapa del caso</h4>
            <p>Activa los actores y observa cómo cambian los focos de análisis. En Sociales, la respuesta correcta casi siempre equilibra actores, normas y evidencia.</p>
            <div class="social-stakeholder-map" id="socialStakeholderMap">
              ${stakeholders.map((st, i) => `<button type="button" data-social-actor="${i}" class="${i === 0 ? "active" : ""}"><span>${escapeHtml(st.icon)}</span><strong>${escapeHtml(st.name)}</strong><small>${escapeHtml(st.role)}</small></button>`).join("")}
            </div>
            <div id="socialActorFeedback" class="social-feedback">Actor activo: <strong>${escapeHtml(stakeholders[0]?.name || "Caso")}</strong>. ${escapeHtml(stakeholders[0]?.role || "Analiza su papel en el problema.")}</div>
          </article>

          <article class="social-card">
            <h4>2. Radar ciudadano</h4>
            <div class="social-bars">
              ${bars.map(b => `<div class="social-bar-row"><span>${escapeHtml(b.label)}</span><div><i style="width:${b.value}%"></i></div><strong>${b.value}%</strong></div>`).join("")}
            </div>
            <label class="social-slider">Peso de la evidencia del caso
              <strong id="socialEvidenceV">72%</strong>
              <input id="socialEvidence" type="range" min="0" max="100" value="72">
            </label>
            <div class="social-balance" id="socialBalance"><i></i><span>Opinión</span><span>Evidencia</span></div>
          </article>
        </div>

        <div class="social-timeline">
          ${profile.tools.map((tool, i) => `<button type="button" data-social-step="${i}" class="social-step ${i === 0 ? "active" : ""}"><span>${i + 1}</span>${escapeHtml(tool)}</button>`).join("")}
        </div>
        <div id="socialStepFeedback" class="social-feedback strong">Paso activo: ${escapeHtml(profile.tools[0])}. ${escapeHtml(profile.challenge)}</div>

        <div class="social-evidence-lab">
          <article class="social-card">
            <h4>3. Lupa de evidencia</h4>
            <p>Toca palabras del enunciado. Clasifica mentalmente si muestran actor, norma, conflicto, causa o consecuencia.</p>
            <div class="social-token-box">
              ${tokens.map((w, i) => `<button type="button" data-social-token="${i}">${escapeHtml(w)}</button>`).join(" ")}
            </div>
            <div id="socialTokenFeedback" class="social-feedback">Selecciona un fragmento para activar la lectura ciudadana.</div>
          </article>

          <article class="social-card social-option-meter">
            <h4>4. Laboratorio de opciones</h4>
            <p>Elige una opción y detecta si responde el conflicto o si se queda en una opinión parcial.</p>
            <div class="choice-grid social-option-grid">
              ${opts.map(o => `<button type="button" data-social-option="${escapeHtml(o.letter)}"><b>${escapeHtml(o.letter)}</b><span>${escapeHtml(o.text).slice(0, 132)}${o.text.length > 132 ? "…" : ""}</span></button>`).join("")}
            </div>
            <div class="social-mini-bars">
              ${optionBars.map(b => `<div class="social-mini-row"><span>${escapeHtml(b.letter)}</span><div><i style="width:${b.value}%"></i></div></div>`).join("")}
            </div>
            <div id="socialOptionFeedback" class="social-feedback">Selecciona una opción para recibir retroalimentación inmediata.</div>
          </article>
        </div>

        <div class="social-flow">
          <span>Caso</span><i></i><span>Actores</span><i></i><span>Norma/Principio</span><i></i><span>Consecuencia</span><i></i><span>Respuesta</span>
        </div>
      </div>`,
      `<strong>Método Saber 11:</strong> ${escapeHtml(profile.challenge)} Respuesta correcta configurada en el banco: <strong>${escapeHtml(q.correctAnswer || "")}</strong>.`
    );
  }

  function getSocialStakeholders(q, profile) {
    const text = stripHtml(`${q.stem || ""} ${q.prompt || ""}`).toLowerCase();
    const base = [
      { icon: "🏛️", name: "Estado", role: "Instituciones, normas y políticas públicas." },
      { icon: "👥", name: "Ciudadanía", role: "Derechos, participación y control democrático." },
      { icon: "⚖️", name: "Norma", role: "Principio constitucional, legal o institucional." },
      { icon: "🌎", name: "Contexto", role: "Condiciones históricas, sociales, económicas o ambientales." }
    ];
    if (/cambio clim[aá]tico|desarrollo sostenible|recursos naturales|derechos colectivos/.test(text)) return [
      { icon: "🌎", name: "Planeta", role: "Ecosistemas, clima y recursos para generaciones presentes y futuras." },
      { icon: "👧", name: "Juventud", role: "Voz ciudadana que exige responsabilidad intergeneracional." },
      { icon: "🏛️", name: "Instituciones", role: "Deciden políticas públicas y regulaciones ambientales." },
      { icon: "📊", name: "Evidencia", role: "Datos y argumentos que sostienen la decisión." }
    ];
    if (/diversidad [eé]tnica|civilizaci[oó]n|constituci[oó]n|pluricultural/.test(text)) return [
      { icon: "📜", name: "Norma histórica", role: "Puede revelar prejuicios de la época." },
      { icon: "🛖", name: "Pueblos étnicos", role: "Sujetos de derechos y reconocimiento cultural." },
      { icon: "⚖️", name: "Constitución", role: "Marco de pluralismo, igualdad y dignidad." },
      { icon: "👥", name: "Sociedad", role: "Debe reconocer la diversidad sin asimilación forzada." }
    ];
    if (/prejuicio|g[eé]nero|diversidad sexual|discapacidad|migraci[oó]n|brecha digital|inclusi[oó]n|equidad/.test(text)) return [
      { icon: "🤝", name: "Grupo afectado", role: "Persona o comunidad que enfrenta barreras o discriminación." },
      { icon: "🏢", name: "Institución", role: "Debe remover barreras y garantizar igualdad." },
      { icon: "⚖️", name: "Derechos", role: "Igualdad, dignidad, inclusión y no discriminación." },
      { icon: "🧭", name: "Acción correcta", role: "Medida que transforma la barrera sin reproducir prejuicios." }
    ];
    if (/pesca industrial|agua potable|servicios p[uú]blicos|conflicto socioambiental|territorio|manejo del agua/.test(text)) return [
      { icon: "💧", name: "Recurso natural", role: "Bien común o servicio esencial en disputa." },
      { icon: "🎣", name: "Comunidad local", role: "Afectada en economía, salud o territorio." },
      { icon: "🏭", name: "Actor económico", role: "Actividad productiva con impacto social o ambiental." },
      { icon: "🏛️", name: "Estado", role: "Debe regular, proteger derechos y mediar conflictos." }
    ];
    if (/partidos|democracia representativa|participaci[oó]n|pol[ií]tica p[uú]blica/.test(text)) return [
      { icon: "🗳️", name: "Ciudadanía", role: "Participa, elige, controla y propone." },
      { icon: "🏛️", name: "Instituciones", role: "Canalizan decisiones públicas." },
      { icon: "📜", name: "Regla democrática", role: "Define procedimientos y límites." },
      { icon: "📈", name: "Efecto público", role: "Resultado social de la decisión." }
    ];
    if (/indígena|cabildo|jaguar/.test(text)) return [
      { icon: "🛖", name: "Cabildo indígena", role: "Autoridad cultural y territorial." },
      { icon: "🐆", name: "Jaguar", role: "Valor espiritual y equilibrio ecológico." },
      { icon: "👨‍🌾", name: "Pedro", role: "Actor externo con interés económico." },
      { icon: "⚖️", name: "Jurisdicción", role: "Facultad de sancionar en el territorio." }
    ];
    if (/periodista|prensa|alcaldesa/.test(text)) return [
      { icon: "📰", name: "Periodista", role: "Libertad de prensa con deber de verificar." },
      { icon: "🏢", name: "Alcaldía", role: "Funcionaria afectada por señalamientos." },
      { icon: "👥", name: "Opinión pública", role: "Derecho a información responsable." },
      { icon: "⚖️", name: "Derechos", role: "Libertad, veracidad y buen nombre." }
    ];
    if (/pez león|sostenible|ambiental|ecosistema/.test(text)) return [
      { icon: "🌿", name: "Ambiente", role: "Ecosistemas, especies y recursos." },
      { icon: "🏛️", name: "Gobierno", role: "Investigación y política pública." },
      { icon: "🎣", name: "Comunidades", role: "Actividad económica y alimentación." },
      { icon: "📊", name: "Evidencia", role: "Datos para decidir una acción." }
    ];
    if (/referendo|corrupción|jóvenes/.test(text)) return [
      { icon: "🧑‍🎓", name: "Jóvenes", role: "Iniciativa ciudadana frente a un problema público." },
      { icon: "🗳️", name: "Referendo", role: "Mecanismo de participación democrática." },
      { icon: "🏛️", name: "Instituciones", role: "Control, Congreso y entidades públicas." },
      { icon: "⚖️", name: "Constitución", role: "Marco que habilita la participación." }
    ];
    if (/nariño|federal|centralista/.test(text)) return [
      { icon: "🕰️", name: "1811", role: "Guerra e independencia inicial: necesidad de unidad." },
      { icon: "🕊️", name: "1823", role: "Independencia más consolidada: posibilidad federal." },
      { icon: "🏛️", name: "Centralismo", role: "Unidad de acción frente al riesgo." },
      { icon: "🗺️", name: "Federalismo", role: "Autonomía y contrapesos en libertad." }
    ];
    if (/adam smith|mercado|división/.test(text)) return [
      { icon: "⚙️", name: "Especialización", role: "Cada quien produce aquello en lo que es más eficiente." },
      { icon: "📈", name: "Productividad", role: "Aumento de bienes producidos." },
      { icon: "🔄", name: "Intercambio", role: "Mercado como mecanismo de distribución." },
      { icon: "🏠", name: "Autosuministro", role: "Alternativa menos eficiente en el texto." }
    ];
    return base;
  }



  function naturalScienceQuestionProfile(q) {
    const number = Number(q.number || 0);
    const component = stripHtml(`${q.component || ""} ${q.competence || ""}`).toLowerCase();
    const prompt = stripHtml(`${q.stem || ""} ${q.prompt || ""}`).toLowerCase();
    let profile = {
      kind: "Pensamiento científico",
      icon: "🔬",
      focus: "Leer datos, reconocer variables, relacionar evidencia con concepto científico y justificar la respuesta.",
      lens: ["Variable", "Evidencia", "Modelo", "Conclusión"],
      weights: [82, 84, 78, 80],
      tools: ["Identifica fenómeno", "Separa variables", "Lee datos o gráfica", "Concluye con evidencia"],
      challenge: "La opción correcta debe estar respaldada por la información del problema, no por una idea general memorizada.",
      model: "experimental"
    };

    const specificNaturalS1Profiles = {
      92: { kind: "Contaminación del agua", icon: "💧", focus: "Analizar cómo un contaminante modifica oxígeno, luz, temperatura o supervivencia en un ecosistema acuático.", lens: ["Contaminante", "Efecto", "Evidencia", "Ecosistema"], weights: [92, 88, 84, 80], tools: ["Ubica el contaminante", "Relaciona causa-efecto", "Lee el impacto", "Concluye"], challenge: "La respuesta correcta explica el efecto directo del contaminante sobre las condiciones de vida del ecosistema.", model: "water" },
      93: { kind: "Fotosíntesis", icon: "🌱", focus: "Reconocer entradas, proceso y productos de la fotosíntesis para explicar crecimiento vegetal.", lens: ["Luz", "CO₂", "Agua", "Glucosa"], weights: [92, 84, 82, 90], tools: ["Identifica entradas", "Reconoce productos", "Conecta con crecimiento", "Descarta respiración"], challenge: "La planta produce materia orgánica usando luz, agua y dióxido de carbono; no obtiene alimento directamente del suelo.", model: "plant" },
      94: { kind: "Biodiversidad y gráficas", icon: "🦋", focus: "Comparar datos de especies, abundancia o riqueza biológica usando evidencia gráfica.", lens: ["Dato", "Comparación", "Tendencia", "Conclusión"], weights: [86, 94, 84, 80], tools: ["Lee ejes", "Compara valores", "Ubica tendencia", "Concluye"], challenge: "No infieras más de lo que permite la gráfica: la respuesta debe salir de los datos visibles.", model: "biodiversity" },
      95: { kind: "Ondas electromagnéticas", icon: "📡", focus: "Relacionar frecuencia, longitud de onda y energía para interpretar el espectro electromagnético.", lens: ["Frecuencia", "Longitud", "Energía", "Espectro"], weights: [88, 82, 92, 78], tools: ["Identifica magnitud", "Compara ondas", "Aplica relación", "Verifica"], challenge: "Mayor frecuencia implica mayor energía y, generalmente, menor longitud de onda.", model: "wave" },
      96: { kind: "Hipótesis y experimento", icon: "🧪", focus: "Distinguir hipótesis, variable independiente, dependiente, control y evidencia experimental.", lens: ["Hipótesis", "Variable", "Control", "Resultado"], weights: [92, 90, 86, 84], tools: ["Formula hipótesis", "Separa variables", "Busca control", "Lee resultado"], challenge: "Una conclusión científica necesita comparar condiciones y usar resultados observables.", model: "experiment" },
      97: { kind: "Evolución y aislamiento", icon: "🧬", focus: "Comprender cómo aislamiento, variación y ambiente pueden conducir a cambios en poblaciones.", lens: ["Variación", "Ambiente", "Aislamiento", "Población"], weights: [86, 88, 92, 82], tools: ["Detecta variación", "Analiza ambiente", "Ubica aislamiento", "Concluye cambio"], challenge: "La evolución ocurre en poblaciones a través de generaciones, no por decisión individual.", model: "evolution" },
      98: { kind: "Fuerza y movimiento", icon: "🚗", focus: "Usar fuerza neta, masa y aceleración para explicar cambios de movimiento.", lens: ["Fuerza", "Masa", "Aceleración", "Movimiento"], weights: [90, 80, 92, 84], tools: ["Dibuja fuerzas", "Ubica masa", "Relaciona cambio", "Verifica dirección"], challenge: "Si la velocidad cambia, hay aceleración; si hay aceleración, existe fuerza neta.", model: "motion" },
      99: { kind: "Propiedades de materiales", icon: "🧱", focus: "Clasificar sustancias o materiales con base en propiedades observables y medibles.", lens: ["Propiedad", "Comparación", "Sustancia", "Uso"], weights: [86, 84, 80, 88], tools: ["Identifica propiedad", "Compara datos", "Relaciona uso", "Descarta"], challenge: "La opción correcta usa una propiedad pertinente, no una apariencia superficial.", model: "materials" },
      100: { kind: "Mitosis y división celular", icon: "🧫", focus: "Ordenar eventos de la división celular y reconocer su función en crecimiento y reparación.", lens: ["ADN", "Cromosomas", "Células hijas", "Función"], weights: [88, 92, 86, 80], tools: ["Ordena etapas", "Ubica cromosomas", "Reconoce resultado", "Concluye"], challenge: "La mitosis produce células hijas con la misma información genética.", model: "cell" },
      101: { kind: "Relaciones ecológicas", icon: "🕸️", focus: "Diferenciar parasitismo, mutualismo, competencia y depredación según beneficios y perjuicios.", lens: ["Especie A", "Especie B", "Beneficio", "Daño"], weights: [86, 86, 92, 88], tools: ["Identifica organismos", "Analiza beneficio", "Analiza perjuicio", "Clasifica relación"], challenge: "En parasitismo una especie se beneficia y la otra se perjudica, usualmente sin morir de inmediato.", model: "ecology" },
      102: { kind: "Isótopos y estructura atómica", icon: "⚛️", focus: "Relacionar protones, neutrones y número de masa para reconocer isótopos.", lens: ["Protones", "Neutrones", "Masa", "Elemento"], weights: [90, 86, 88, 82], tools: ["Cuenta protones", "Cuenta neutrones", "Calcula masa", "Compara"], challenge: "Los isótopos tienen igual número de protones y diferente número de neutrones.", model: "atom" },
      103: { kind: "Concentración de disoluciones", icon: "🧪", focus: "Interpretar la relación entre soluto, solvente, volumen y concentración.", lens: ["Soluto", "Volumen", "Concentración", "Comparación"], weights: [88, 84, 92, 80], tools: ["Ubica soluto", "Ubica volumen", "Calcula razón", "Compara"], challenge: "Más soluto por la misma cantidad de solución implica mayor concentración.", model: "solution" },
      104: { kind: "Magnetismo", icon: "🧲", focus: "Analizar polos, campo magnético, materiales y fuerza de atracción o repulsión.", lens: ["Campo", "Polo", "Material", "Fuerza"], weights: [86, 90, 78, 88], tools: ["Ubica polos", "Dibuja campo", "Reconoce material", "Predice fuerza"], challenge: "Polos iguales se repelen y opuestos se atraen; el campo explica la interacción.", model: "magnet" },
      105: { kind: "Nutrición y energía", icon: "🍎", focus: "Relacionar nutrientes, energía y funciones biológicas en organismos.", lens: ["Nutriente", "Energía", "Función", "Organismo"], weights: [82, 90, 86, 78], tools: ["Identifica nutriente", "Sigue energía", "Relaciona función", "Concluye"], challenge: "La nutrición debe analizarse según la función del nutriente: energía, estructura o regulación.", model: "nutrition" },
      106: { kind: "Velocidad de reacción", icon: "🔥", focus: "Explicar cómo temperatura, concentración, superficie o catalizadores alteran una reacción.", lens: ["Temperatura", "Choques", "Catalizador", "Rapidez"], weights: [92, 88, 84, 82], tools: ["Identifica factor", "Relaciona choques", "Compara rapidez", "Concluye"], challenge: "Una reacción más rápida se explica por más choques efectivos entre partículas.", model: "reaction" },
      107: { kind: "Energía térmica", icon: "🌡️", focus: "Diferenciar calor, temperatura y transferencia de energía en un sistema.", lens: ["Calor", "Temperatura", "Sistema", "Transferencia"], weights: [88, 90, 82, 86], tools: ["Ubica sistema", "Sigue energía", "Compara temperatura", "Concluye"], challenge: "El calor es energía en tránsito; la temperatura mide agitación promedio de partículas.", model: "gas" },
      108: { kind: "Gases ideales", icon: "🎈", focus: "Relacionar presión, volumen y temperatura para explicar cambios en gases.", lens: ["Presión", "Volumen", "Temperatura", "Partículas"], weights: [88, 92, 86, 80], tools: ["Ubica variables", "Relaciona cambios", "Usa proporción", "Verifica"], challenge: "Si una variable cambia, las demás pueden cambiar según la condición mantenida constante.", model: "gas" },
      109: { kind: "Metamorfosis", icon: "🦋", focus: "Ordenar etapas de desarrollo y reconocer cambios estructurales durante el ciclo de vida.", lens: ["Etapa", "Cambio", "Organismo", "Función"], weights: [84, 86, 92, 80], tools: ["Ordena etapas", "Compara formas", "Reconoce cambio", "Concluye"], challenge: "La metamorfosis implica transformaciones corporales marcadas en el ciclo de vida.", model: "metamorphosis" },
      110: { kind: "Rangos de tolerancia", icon: "📈", focus: "Interpretar límites mínimo, óptimo y máximo para supervivencia o reproducción.", lens: ["Mínimo", "Óptimo", "Máximo", "Supervivencia"], weights: [86, 94, 82, 84], tools: ["Lee ejes", "Ubica óptimo", "Compara rangos", "Concluye"], challenge: "Sobrevivir no es lo mismo que estar en condición óptima; el óptimo suele ser un rango más estrecho.", model: "tolerance" },
      111: { kind: "Solubilidad", icon: "🧂", focus: "Relacionar temperatura, cantidad de soluto y formación de una disolución.", lens: ["Soluto", "Temperatura", "Saturación", "Disolución"], weights: [88, 86, 90, 82], tools: ["Lee condición", "Compara soluto", "Ubica saturación", "Concluye"], challenge: "La solubilidad indica cuánto soluto puede disolverse bajo condiciones específicas.", model: "solution" },
      112: { kind: "Leyes de los gases", icon: "🎈", focus: "Usar relaciones entre presión, volumen, temperatura y cantidad de gas.", lens: ["P", "V", "T", "n"], weights: [90, 88, 86, 82], tools: ["Identifica variables", "Reconoce constante", "Aplica relación", "Verifica"], challenge: "Compara qué variable aumenta o disminuye y cuál permanece constante.", model: "gas" },
      113: { kind: "Genética", icon: "🧬", focus: "Relacionar alelos, genotipo, fenotipo y probabilidad de herencia.", lens: ["Alelo", "Genotipo", "Fenotipo", "Probabilidad"], weights: [88, 84, 86, 92], tools: ["Identifica alelos", "Arma cruce", "Cuenta resultados", "Concluye"], challenge: "El fenotipo observable depende del genotipo y de la relación entre alelos.", model: "genetics" },
      114: { kind: "Propiedades de sustancias", icon: "⚗️", focus: "Comparar propiedades físicas o químicas para identificar o diferenciar sustancias.", lens: ["Propiedad", "Sustancia", "Comparación", "Conclusión"], weights: [88, 86, 82, 90], tools: ["Identifica propiedad", "Compara datos", "Clasifica", "Concluye"], challenge: "La propiedad usada debe permitir diferenciar sustancias de forma consistente.", model: "materials" },
      115: { kind: "Cambios de estado", icon: "🧊", focus: "Leer curvas o situaciones de fusión, ebullición, condensación o solidificación.", lens: ["Temperatura", "Estado", "Energía", "Meseta"], weights: [92, 88, 86, 80], tools: ["Lee curva", "Ubica estado", "Reconoce meseta", "Concluye"], challenge: "Durante un cambio de estado, la temperatura puede mantenerse constante mientras entra o sale energía.", model: "phase" },
      116: { kind: "Separación y clasificación de sustancias", icon: "🧫", focus: "Elegir un método o criterio según propiedades como solubilidad, densidad o magnetismo.", lens: ["Mezcla", "Propiedad", "Método", "Resultado"], weights: [84, 90, 86, 80], tools: ["Identifica mezcla", "Elige propiedad", "Escoge método", "Verifica"], challenge: "El método de separación debe corresponder a una diferencia real entre componentes.", model: "materials" },
      117: { kind: "Energía y equilibrio", icon: "⚡", focus: "Relacionar transferencia de energía, conservación y cambios observables en el sistema.", lens: ["Sistema", "Energía", "Cambio", "Equilibrio"], weights: [86, 90, 82, 84], tools: ["Define sistema", "Sigue energía", "Compara cambios", "Concluye"], challenge: "La energía se transforma o transfiere; no desaparece en el análisis del fenómeno.", model: "experiment" },
      118: { kind: "Evidencia experimental", icon: "🔎", focus: "Evaluar si una conclusión está respaldada por los datos y condiciones del experimento.", lens: ["Dato", "Variable", "Condición", "Conclusión"], weights: [90, 88, 84, 86], tools: ["Lee datos", "Identifica variable", "Revisa control", "Concluye"], challenge: "La conclusión no puede ir más allá de los datos reportados en la situación.", model: "experiment" },
      119: { kind: "Modelo científico", icon: "🧩", focus: "Usar un modelo para explicar un fenómeno y predecir una consecuencia observable.", lens: ["Modelo", "Fenómeno", "Predicción", "Evidencia"], weights: [86, 84, 90, 82], tools: ["Identifica modelo", "Relaciona fenómeno", "Predice", "Contrasta"], challenge: "Un modelo útil explica datos conocidos y permite anticipar resultados coherentes.", model: "experiment" },
      120: { kind: "Hierro y cambios de estado", icon: "🧲", focus: "Analizar propiedades del hierro, temperatura y cambios físicos de estado.", lens: ["Hierro", "Temperatura", "Estado", "Energía"], weights: [88, 86, 90, 84], tools: ["Reconoce sustancia", "Ubica temperatura", "Identifica estado", "Concluye"], challenge: "El cambio de estado depende de la temperatura y de propiedades características de la sustancia.", model: "phase" }
    };
    if (specificNaturalS1Profiles[number]) {
      profile = specificNaturalS1Profiles[number];
      profile.seed = number % 7;
      return profile;
    }

    const specificNaturalS2Profiles = {
      51: { kind: "Polinización y equilibrio ecosistémico", icon: "🌺", focus: "Comprender cómo la desaparición de un polinizador afecta plantas, redes tróficas y equilibrio del ecosistema.", lens: ["Polinizador", "Planta", "Interacción", "Equilibrio"], weights: [90, 86, 88, 82], tools: ["Identifica especie clave", "Relaciona polinización", "Predice efecto", "Concluye"], challenge: "La extinción de un organismo puede romper interacciones ecológicas que sostienen la reproducción de plantas y el alimento de otras especies.", model: "ecology" },
      52: { kind: "Fuerzas en movimiento", icon: "🏎️", focus: "Reconocer qué fuerzas cambian y cuál permanece constante durante un movimiento descrito.", lens: ["Fuerza", "Movimiento", "Constante", "Dirección"], weights: [86, 82, 90, 80], tools: ["Dibuja fuerzas", "Compara momentos", "Ubica constante", "Verifica dirección"], challenge: "No todas las fuerzas varían con el movimiento; identifica cuál depende de una condición permanente del sistema.", model: "motion" },
      53: { kind: "Escala de pH", icon: "🍋", focus: "Clasificar sustancias como ácidas, neutras o básicas a partir del valor de pH.", lens: ["pH", "Ácido", "Base", "Comparación"], weights: [88, 84, 86, 78], tools: ["Lee pH", "Clasifica rango", "Compara sustancias", "Concluye"], challenge: "Un pH menor que 7 indica acidez; mayor que 7 indica basicidad; 7 es neutro.", model: "solution" },
      54: { kind: "Presión y volumen en gases", icon: "🫁", focus: "Relacionar disminución de volumen con cambios de presión en un sistema gaseoso.", lens: ["Volumen", "Presión", "Gas", "Relación"], weights: [88, 92, 84, 82], tools: ["Identifica variables", "Reconoce relación", "Aplica modelo", "Verifica"], challenge: "Cuando el volumen disponible para un gas cambia, la presión puede modificarse según la relación entre las variables.", model: "gas" },
      55: { kind: "Interpretación de gráficas científicas", icon: "📉", focus: "Elegir la gráfica que representa correctamente una relación entre variables.", lens: ["Eje X", "Eje Y", "Tendencia", "Datos"], weights: [86, 94, 82, 80], tools: ["Lee ejes", "Ubica tendencia", "Compara opciones", "Concluye"], challenge: "La gráfica correcta conserva la relación entre variables y no inventa tendencias que no aparecen en los datos.", model: "experiment" },
      56: { kind: "Vacunas y prevención", icon: "💉", focus: "Explicar cómo las vacunas preparan el sistema inmune para responder ante una enfermedad.", lens: ["Antígeno", "Defensa", "Memoria", "Prevención"], weights: [90, 82, 86, 84], tools: ["Reconoce estímulo", "Relaciona defensa", "Ubica memoria", "Concluye"], challenge: "Las vacunas no curan de inmediato: entrenan la respuesta inmune para reducir el riesgo o gravedad de la enfermedad.", model: "cell" },
      57: { kind: "Transporte celular", icon: "🧫", focus: "Diferenciar transporte pasivo, activo, difusión, ósmosis o transporte por membrana.", lens: ["Membrana", "Gradiente", "Energía", "Sustancia"], weights: [88, 86, 90, 80], tools: ["Ubica gradiente", "Identifica energía", "Reconoce sustancia", "Clasifica"], challenge: "El transporte activo requiere energía para mover sustancias contra el gradiente; el pasivo ocurre a favor del gradiente.", model: "cell" },
      58: { kind: "Evolución, mutaciones y selección", icon: "🧬", focus: "Analizar evidencia que diferencia explicaciones evolutivas como Lamarck y selección natural.", lens: ["Mutación", "Ambiente", "Selección", "Teoría"], weights: [88, 90, 86, 84], tools: ["Identifica variación", "Compara teorías", "Lee evidencia", "Concluye"], challenge: "Una teoría científica se reevalúa cuando la evidencia experimental no coincide con sus predicciones.", model: "evolution" },
      59: { kind: "Hipótesis ambiental", icon: "🪸", focus: "Evaluar si una hipótesis explica el aumento de corales albinos usando variables ambientales.", lens: ["Hipótesis", "Variable", "Dato", "Conclusión"], weights: [92, 88, 86, 84], tools: ["Lee hipótesis", "Ubica variable", "Contrasta datos", "Concluye"], challenge: "Una hipótesis es válida solo si los datos nuevos son coherentes con la relación causa-efecto planteada.", model: "experiment" },
      60: { kind: "Camuflaje y selección natural", icon: "🦎", focus: "Predecir qué característica se vuelve más común cuando mejora la supervivencia y reproducción.", lens: ["Variación", "Camuflaje", "Ambiente", "Frecuencia"], weights: [86, 90, 88, 82], tools: ["Detecta variación", "Analiza ambiente", "Relaciona supervivencia", "Predice"], challenge: "Una característica aumenta en la población si quienes la poseen sobreviven y se reproducen más.", model: "evolution" },
      61: { kind: "Combustibles fósiles y materia orgánica", icon: "⛽", focus: "Relacionar origen biológico, transformación geológica y energía almacenada en combustibles fósiles.", lens: ["Materia orgánica", "Tiempo", "Presión", "Energía"], weights: [86, 84, 88, 80], tools: ["Ubica origen", "Reconoce proceso", "Compara sustancias", "Concluye"], challenge: "Los combustibles fósiles se relacionan con materia orgánica transformada durante largos periodos bajo condiciones geológicas.", model: "materials" },
      62: { kind: "Ondas, sonido e indagación", icon: "🔊", focus: "Usar resultados experimentales para aceptar, rechazar o ajustar una hipótesis sobre sonido.", lens: ["Onda", "Variable", "Resultado", "Hipótesis"], weights: [88, 90, 86, 82], tools: ["Lee resultados", "Compara hipótesis", "Identifica variable", "Concluye"], challenge: "La conclusión debe responder si los resultados apoyan la hipótesis y bajo qué condiciones.", model: "wave" },
      63: { kind: "Neutralización ácido-base", icon: "⚗️", focus: "Reconocer una reacción ácido-base que produce sal y agua o reduce acidez/basicidad.", lens: ["Ácido", "Base", "Producto", "Neutralización"], weights: [90, 84, 88, 82], tools: ["Identifica reactivos", "Busca productos", "Clasifica reacción", "Concluye"], challenge: "Una neutralización ocurre cuando ácido y base reaccionan para disminuir sus propiedades extremas.", model: "reaction" },
      64: { kind: "Separación de mezclas", icon: "🧪", focus: "Seleccionar el método de separación adecuado según tamaño de partícula, solubilidad, densidad o punto de ebullición.", lens: ["Mezcla", "Propiedad", "Método", "Resultado"], weights: [86, 88, 90, 80], tools: ["Clasifica mezcla", "Reconoce propiedad", "Elige método", "Verifica"], challenge: "Cada método de separación aprovecha una propiedad específica de los componentes de la mezcla.", model: "materials" },
      65: { kind: "Concentración y equilibrio", icon: "🧴", focus: "Comparar concentraciones evitando conclusiones basadas solo en el volumen o en la cantidad aislada.", lens: ["Soluto", "Solvente", "Razón", "Equilibrio"], weights: [88, 86, 92, 82], tools: ["Ubica soluto", "Ubica volumen", "Compara razón", "Concluye"], challenge: "La concentración depende de la relación entre cantidad de soluto y volumen, no de mirar una sola variable.", model: "solution" },
      66: { kind: "Masa, peso y gravedad", icon: "🌕", focus: "Diferenciar masa y peso para resolver situaciones con gravedad distinta.", lens: ["Masa", "Peso", "Gravedad", "Relación"], weights: [90, 84, 88, 82], tools: ["Distingue magnitudes", "Aplica peso", "Revisa unidades", "Concluye"], challenge: "La masa permanece constante; el peso cambia si cambia la gravedad.", model: "motion" },
      67: { kind: "Emisiones e interpretación de datos", icon: "🏭", focus: "Leer gráficas de emisiones y formular conclusiones ambientales sustentadas en datos.", lens: ["Emisión", "Gráfica", "Tendencia", "Conclusión"], weights: [86, 94, 84, 82], tools: ["Lee ejes", "Compara periodos", "Detecta tendencia", "Concluye"], challenge: "Una conclusión ambiental válida debe corresponder exactamente con los datos reportados.", model: "biodiversity" },
      68: { kind: "Clasificación de mezclas", icon: "🧫", focus: "Distinguir mezclas homogéneas y heterogéneas a partir de sus fases visibles o composición.", lens: ["Fase", "Composición", "Residuo", "Clasificación"], weights: [84, 86, 88, 80], tools: ["Observa fases", "Reconoce componentes", "Clasifica", "Justifica"], challenge: "Una mezcla heterogénea presenta composición no uniforme o fases distinguibles.", model: "materials" },
      69: { kind: "Biodigestores y seguridad ambiental", icon: "♻️", focus: "Relacionar producción de biogás, presión y manejo seguro para evitar acumulaciones peligrosas.", lens: ["Biogás", "Presión", "Válvula", "Seguridad"], weights: [88, 86, 84, 90], tools: ["Identifica gas", "Reconoce riesgo", "Aplica manejo", "Concluye"], challenge: "Un biodigestor debe manejar gases y presión de forma controlada para evitar riesgos.", model: "gas" },
      70: { kind: "Biología molecular y datos", icon: "🧬", focus: "Representar correctamente información biológica en tablas o gráficas comparando datos moleculares.", lens: ["Dato", "Molécula", "Gráfica", "Comparación"], weights: [84, 92, 86, 80], tools: ["Lee datos", "Asocia variable", "Compara opciones", "Concluye"], challenge: "La representación correcta respeta todos los valores y categorías entregados en la información.", model: "genetics" },
      71: { kind: "Transporte de sustancias en plantas", icon: "🌿", focus: "Explicar el movimiento de savia y su importancia para nutrición, crecimiento y funcionamiento vegetal.", lens: ["Savia", "Xilema", "Floema", "Nutrientes"], weights: [86, 84, 88, 82], tools: ["Ubica sustancia", "Reconoce tejido", "Relaciona función", "Concluye"], challenge: "El transporte vegetal distribuye agua, minerales y sustancias producidas por la planta para sostener sus funciones.", model: "plant" },
      72: { kind: "Instrumentos meteorológicos y viento", icon: "🌬️", focus: "Identificar el instrumento adecuado para medir viento, temperatura, humedad, lluvia o presión atmosférica.", lens: ["Magnitud", "Instrumento", "Medición", "Energía"], weights: [86, 88, 82, 80], tools: ["Identifica magnitud", "Relaciona instrumento", "Verifica unidad", "Concluye"], challenge: "El instrumento se elige según la magnitud física que se necesita medir.", model: "weather" },
      73: { kind: "Interacciones y equilibrio de ecosistemas", icon: "🕸️", focus: "Comprender cómo relaciones entre organismos sostienen el equilibrio de un ecosistema.", lens: ["Especies", "Interacción", "Flujo", "Equilibrio"], weights: [88, 86, 90, 82], tools: ["Identifica organismos", "Analiza interacción", "Predice efecto", "Concluye"], challenge: "El equilibrio ecológico depende de interacciones como competencia, mutualismo, depredación o polinización.", model: "ecology" },
      74: { kind: "Datos nutricionales", icon: "🥗", focus: "Evaluar una conclusión sobre alimentos usando datos de composición o nutrición.", lens: ["Dato", "Nutriente", "Comparación", "Conclusión"], weights: [84, 92, 86, 80], tools: ["Lee tabla", "Compara nutrientes", "Evalúa conclusión", "Justifica"], challenge: "Una conclusión nutricional debe corresponder a los datos comparados y no a una percepción general del alimento.", model: "nutrition" },
      75: { kind: "Cantidad de movimiento y choques", icon: "🚙", focus: "Relacionar masa, velocidad y conservación de cantidad de movimiento en choques.", lens: ["Masa", "Velocidad", "Choque", "Conservación"], weights: [90, 84, 88, 82], tools: ["Identifica sistema", "Compara masas", "Aplica conservación", "Concluye"], challenge: "En un choque, la velocidad final depende de la cantidad de movimiento total y de cómo interactúan los cuerpos.", model: "motion" },
      76: { kind: "Propiedades de materiales", icon: "🏗️", focus: "Seleccionar materiales según propiedades como densidad, resistencia, conductividad o punto de fusión.", lens: ["Propiedad", "Metal", "Uso", "Comparación"], weights: [86, 90, 84, 82], tools: ["Lee propiedades", "Compara metales", "Relaciona necesidad", "Concluye"], challenge: "El material adecuado se elige por las propiedades exigidas por el uso, no por una característica irrelevante.", model: "materials" },
      77: { kind: "Temperatura, presión y cambios de estado", icon: "🌡️", focus: "Interpretar curvas de temperatura y cambios de estado bajo condiciones de presión.", lens: ["Temperatura", "Presión", "Estado", "Tiempo"], weights: [90, 86, 88, 82], tools: ["Lee curva", "Ubica meseta", "Relaciona presión", "Concluye"], challenge: "Durante cambios de estado, la energía puede cambiar sin que la temperatura aumente de manera continua.", model: "phase" },
      78: { kind: "Ondas y sonido", icon: "🎧", focus: "Explicar cómo cambia el sonido al propagarse en medios diferentes.", lens: ["Medio", "Velocidad", "Frecuencia", "Longitud"], weights: [88, 84, 90, 82], tools: ["Identifica medio", "Compara velocidad", "Revisa frecuencia", "Concluye"], challenge: "Al cambiar de medio puede variar la velocidad de propagación y la longitud de onda, pero la frecuencia suele depender de la fuente.", model: "wave" },
      79: { kind: "Sublimación del CO₂", icon: "❄️", focus: "Distinguir propiedades que cambian y permanecen durante un cambio físico de estado.", lens: ["Estado", "Temperatura", "CO₂", "Propiedad"], weights: [88, 86, 90, 82], tools: ["Identifica cambio", "Diferencia propiedad", "Compara estado", "Concluye"], challenge: "En un cambio físico cambia el estado de la materia, pero la sustancia conserva su identidad química.", model: "phase" }
    };
    if (specificNaturalS2Profiles[number] && isS2NaturalScienceSuperQuestion(q)) {
      profile = specificNaturalS2Profiles[number];
      profile.seed = number % 7;
      return profile;
    }

    const src = component + " " + prompt;
    if (/contaminaci[oó]n|agua|aceite|ecosistema acu[aá]tico|desag[uü]e/.test(src)) {
      profile = { kind: "Contaminación del agua", icon: "💧", focus: "Relacionar una sustancia contaminante con el efecto que produce sobre el oxígeno, la luz, la vida acuática o la calidad del agua.", lens: ["Fuente", "Contaminante", "Efecto", "Ecosistema"], weights: [88, 92, 84, 80], tools: ["Ubica la fuente", "Identifica el contaminante", "Conecta causa-efecto", "Evalúa impacto"], challenge: "Busca una causa directa que explique el cambio observado en el ecosistema acuático.", model: "water" };
    } else if (/fotos[ií]ntesis|planta|luz|carbohidratos|clorofila|nutrici[oó]n vegetal/.test(src)) {
      profile = { kind: "Fotosíntesis", icon: "🌱", focus: "Comprender cómo la planta transforma agua, dióxido de carbono y luz en sustancias orgánicas útiles para crecer.", lens: ["Luz", "CO₂", "Agua", "Glucosa"], weights: [92, 82, 78, 88], tools: ["Identifica entradas", "Reconoce producto", "Relaciona crecimiento", "Descarta confusiones"], challenge: "No confundas respiración con fotosíntesis: la pregunta suele pedir producción de alimento o energía química.", model: "plant" };
    } else if (/biodiversidad|riqueza de especies|especies|gr[aá]fica|representaci[oó]n de datos/.test(src)) {
      profile = { kind: "Biodiversidad y datos", icon: "🦋", focus: "Interpretar gráficas o tablas de riqueza de especies y comparar tendencias con evidencia numérica.", lens: ["Especies", "Dato", "Comparación", "Tendencia"], weights: [84, 92, 86, 78], tools: ["Lee ejes", "Compara valores", "Detecta tendencia", "Concluye"], challenge: "La respuesta debe salir de los datos representados, no de una suposición sobre el ecosistema.", model: "biodiversity" };
    } else if (/onda|electromagn[eé]tica|frecuencia|longitud|radiaci[oó]n/.test(src)) {
      profile = { kind: "Ondas electromagnéticas", icon: "📡", focus: "Relacionar frecuencia, longitud de onda y energía para interpretar una situación física.", lens: ["Frecuencia", "Longitud", "Energía", "Espectro"], weights: [86, 82, 90, 74], tools: ["Identifica la onda", "Compara magnitudes", "Aplica relación", "Verifica unidades"], challenge: "En ondas electromagnéticas, mayor frecuencia suele implicar mayor energía y menor longitud de onda.", model: "wave" };
    } else if (/hip[oó]tesis|experimento|variable|indagaci[oó]n|control/.test(src)) {
      profile = { kind: "Hipótesis y experimento", icon: "🧪", focus: "Distinguir variable independiente, variable dependiente, grupo control y evidencia para validar una hipótesis.", lens: ["Hipótesis", "Variable", "Control", "Resultado"], weights: [90, 88, 86, 82], tools: ["Formula hipótesis", "Identifica variables", "Busca control", "Lee resultado"], challenge: "Una conclusión científica requiere comparar condiciones y usar evidencia observable.", model: "experiment" };
    } else if (/evoluci[oó]n|aislamiento|selecci[oó]n natural|adaptaci[oó]n|reproductivo/.test(src)) {
      profile = { kind: "Evolución y selección", icon: "🧬", focus: "Relacionar variación, ambiente, adaptación, supervivencia y reproducción diferencial.", lens: ["Variación", "Ambiente", "Selección", "Población"], weights: [86, 90, 88, 78], tools: ["Detecta variación", "Analiza ambiente", "Identifica presión", "Concluye cambio"], challenge: "La selección natural actúa sobre variaciones heredables; no ocurre porque el individuo decida cambiar.", model: "evolution" };
    } else if (/fuerza|movimiento|velocidad|aceleraci[oó]n|newton/.test(src)) {
      profile = { kind: "Fuerza y movimiento", icon: "🚗", focus: "Relacionar fuerzas, masa, aceleración, velocidad o cambios de movimiento con la situación planteada.", lens: ["Fuerza", "Masa", "Aceleración", "Movimiento"], weights: [88, 78, 90, 82], tools: ["Dibuja fuerzas", "Ubica masa", "Relaciona cambio", "Verifica dirección"], challenge: "Si cambia la velocidad, hay aceleración; si hay aceleración, debe existir fuerza neta.", model: "motion" };
    } else if (/material|propiedades|densidad|conduct|sustancia|solubilidad|mezcla/.test(src)) {
      profile = { kind: "Propiedades de materiales", icon: "🧱", focus: "Usar propiedades físicas o químicas para comparar, clasificar o separar sustancias.", lens: ["Propiedad", "Comparación", "Sustancia", "Uso"], weights: [82, 86, 90, 76], tools: ["Reconoce propiedad", "Compara datos", "Clasifica", "Justifica"], challenge: "Elige la propiedad que realmente diferencia las sustancias del caso.", model: "materials" };
    } else if (/mitosis|c[eé]lula|cromosoma|divisi[oó]n celular/.test(src)) {
      profile = { kind: "Mitosis y células", icon: "🧫", focus: "Comprender cómo una célula se divide conservando información genética en células hijas.", lens: ["ADN", "Cromosomas", "División", "Células hijas"], weights: [84, 88, 82, 90], tools: ["Ubica fase", "Sigue cromosomas", "Compara células", "Concluye"], challenge: "En mitosis, las células hijas conservan la información genética de la célula original.", model: "cell" };
    } else if (/parasitismo|relaci[oó]n ecol[oó]gica|hu[eé]sped|par[aá]sito/.test(src)) {
      profile = { kind: "Relaciones ecológicas", icon: "🪱", focus: "Identificar si una relación beneficia, perjudica o no afecta a cada organismo involucrado.", lens: ["Organismo A", "Organismo B", "Beneficio", "Daño"], weights: [86, 84, 88, 80], tools: ["Identifica organismos", "Analiza beneficio", "Analiza daño", "Clasifica relación"], challenge: "En parasitismo, un organismo se beneficia y el otro resulta perjudicado.", model: "ecology" };
    } else if (/is[oó]topo|masa at[oó]mica|protones|neutrones/.test(src)) {
      profile = { kind: "Isótopos", icon: "⚛️", focus: "Diferenciar número atómico, número de masa, protones y neutrones para reconocer isótopos.", lens: ["Protones", "Neutrones", "Masa", "Elemento"], weights: [88, 90, 82, 78], tools: ["Ubica protones", "Calcula neutrones", "Compara masa", "Identifica isótopo"], challenge: "Los isótopos tienen igual número de protones y diferente número de neutrones.", model: "atom" };
    } else if (/concentraci[oó]n|disoluci[oó]n|soluto|solvente|molaridad/.test(src)) {
      profile = { kind: "Concentración de disoluciones", icon: "🧴", focus: "Relacionar cantidad de soluto y volumen de solvente para comparar concentraciones.", lens: ["Soluto", "Solvente", "Volumen", "Concentración"], weights: [86, 82, 90, 78], tools: ["Identifica soluto", "Identifica volumen", "Compara razón", "Concluye"], challenge: "Más soluto o menos solvente aumenta la concentración; no basta mirar solo una cantidad.", model: "solution" };
    } else if (/magnetismo|im[aá]n|campo magn[eé]tico|polo/.test(src)) {
      profile = { kind: "Magnetismo", icon: "🧲", focus: "Relacionar polos, campos magnéticos, materiales y atracción o repulsión.", lens: ["Campo", "Polo", "Material", "Fuerza"], weights: [84, 88, 78, 86], tools: ["Ubica polos", "Dibuja campo", "Identifica material", "Predice fuerza"], challenge: "Polos opuestos se atraen y polos iguales se repelen; el campo explica la interacción.", model: "magnet" };
    } else if (/nutrici[oó]n|alimento|energ[ií]a|organismo|digest/.test(src)) {
      profile = { kind: "Nutrición y energía", icon: "🍎", focus: "Relacionar nutrientes, energía y función biológica según el organismo o sistema evaluado.", lens: ["Nutriente", "Energía", "Función", "Organismo"], weights: [82, 88, 84, 78], tools: ["Identifica nutriente", "Relaciona función", "Sigue energía", "Concluye"], challenge: "La nutrición se analiza por función: construir tejidos, obtener energía o regular procesos.", model: "nutrition" };
    } else if (/velocidad de reacci[oó]n|temperatura|catalizador|reacci[oó]n/.test(src)) {
      profile = { kind: "Velocidad de reacción", icon: "🔥", focus: "Relacionar temperatura, concentración, superficie o catalizadores con rapidez de reacción.", lens: ["Temperatura", "Choques", "Catalizador", "Rapidez"], weights: [90, 86, 84, 80], tools: ["Identifica factor", "Relaciona choques", "Compara rapidez", "Concluye"], challenge: "Una reacción más rápida se explica por más choques efectivos entre partículas.", model: "reaction" };
    } else if (/energ[ií]a t[eé]rmica|calor|temperatura|enfriamiento|termodin[aá]mica|gas ideal|presi[oó]n|volumen/.test(src)) {
      profile = { kind: "Energía térmica y gases", icon: "🌡️", focus: "Relacionar transferencia de calor, temperatura, presión, volumen y comportamiento de gases.", lens: ["Calor", "Temperatura", "Presión", "Volumen"], weights: [88, 86, 82, 90], tools: ["Ubica sistema", "Sigue energía", "Relaciona variables", "Concluye"], challenge: "En gases, las variables se relacionan: cambiar temperatura, presión o volumen afecta el estado del sistema.", model: "gas" };
    } else if (/metamorfosis|ciclo de vida|larva|adulto/.test(src)) {
      profile = { kind: "Metamorfosis", icon: "🦋", focus: "Ordenar etapas del ciclo de vida y reconocer cambios estructurales durante el desarrollo.", lens: ["Etapa", "Cambio", "Organismo", "Función"], weights: [84, 82, 90, 78], tools: ["Ordena etapas", "Compara formas", "Reconoce cambio", "Concluye"], challenge: "La metamorfosis implica cambios corporales marcados durante el ciclo de vida.", model: "metamorphosis" };
    } else if (/tolerancia|rango|temperatura|supervivencia/.test(src)) {
      profile = { kind: "Rangos de tolerancia", icon: "📈", focus: "Interpretar el rango ambiental en el que una especie puede vivir, crecer o reproducirse mejor.", lens: ["Mínimo", "Óptimo", "Máximo", "Supervivencia"], weights: [86, 90, 82, 80], tools: ["Lee eje", "Ubica óptimo", "Compara rangos", "Concluye"], challenge: "No confundas sobrevivir con estar en condición óptima; el rango óptimo es más estrecho.", model: "tolerance" };
    } else if (/gen[eé]tica|herencia|alelo|fenotipo|genotipo/.test(src)) {
      profile = { kind: "Genética", icon: "🧬", focus: "Relacionar alelos, genotipos, fenotipos y probabilidad de herencia.", lens: ["Alelo", "Genotipo", "Fenotipo", "Probabilidad"], weights: [88, 82, 86, 90], tools: ["Identifica alelos", "Arma cruce", "Cuenta resultados", "Concluye"], challenge: "El fenotipo observable depende del genotipo y de la relación entre alelos.", model: "genetics" };
    } else if (/cambio de estado|curva de calentamiento|punto de ebullici[oó]n|fusi[oó]n/.test(src)) {
      profile = { kind: "Cambios de estado", icon: "🧊", focus: "Leer curvas de calentamiento y reconocer mesetas de cambio de estado o propiedades de sustancias.", lens: ["Temperatura", "Meseta", "Estado", "Energía"], weights: [90, 86, 88, 80], tools: ["Lee curva", "Ubica meseta", "Identifica estado", "Concluye"], challenge: "Durante un cambio de estado, la temperatura puede mantenerse constante mientras se transfiere energía.", model: "phase" };
    }
    profile.seed = number % 7;
    return profile;
  }

  function simNaturalScienceSuper(q) {
    const profile = naturalScienceQuestionProfile(q);
    const text = stripHtml(`${q.stem || ""} ${q.prompt || ""}`) || "Pregunta de Ciencias Naturales tipo Saber 11.";
    const tokens = text.split(/\s+/).filter(Boolean).slice(0, 38);
    const opts = (q.options || []).map(o => ({ letter: o.letter || o.value || "", text: stripHtml(o.text || o.label || "") }));
    const bars = profile.lens.map((label, i) => ({ label, value: Math.max(22, Math.min(97, profile.weights[i] - profile.seed + i * 3)) }));
    const optionBars = opts.map((o, i) => ({ letter: o.letter, value: o.letter === q.correctAnswer ? 95 : Math.max(20, 66 - (i * 7) + profile.seed) }));
    const variables = getNaturalVariables(profile);
    return simWrapper(
      `${profile.icon} Super simulador científico · Pregunta ${q.number}`,
      `Entrenamiento interactivo para ${profile.kind}. Aprende a resolver con método científico: fenómeno, variables, evidencia, modelo y conclusión.`,
      `<div class="natural-super-sim" data-natural-correct="${escapeHtml(q.correctAnswer || "")}" data-natural-model="${escapeHtml(profile.model)}">
        <div class="natural-hero">
          <div>
            <span class="natural-badge">${escapeHtml(q.area || "Ciencias Naturales")}</span>
            <h4>${escapeHtml(profile.kind)}</h4>
            <p>${escapeHtml(profile.focus)}</p>
          </div>
          <div class="natural-orbit" aria-label="Órbita del método científico">
            <span>Fenómeno</span><span>Variables</span><span>Evidencia</span><span>Conclusión</span><b>${profile.icon}</b>
          </div>
        </div>

        <div class="natural-workbench">
          <article class="natural-card">
            <h4>1. Laboratorio de variables</h4>
            <p>Manipula las variables y observa cómo cambia el resultado del modelo. Esto ayuda a no responder solo por memoria.</p>
            <div class="natural-variable-grid">
              ${variables.map((v, i) => `<label class="natural-slider">${escapeHtml(v.name)} <strong id="naturalVar${i}V">${v.value}${v.unit}</strong><input type="range" min="${v.min}" max="${v.max}" value="${v.value}" data-natural-var="${i}" data-unit="${escapeHtml(v.unit)}"></label>`).join("")}
            </div>
            <div class="natural-result-card">
              <span>Indicador científico</span>
              <strong id="naturalIndicator">72%</strong>
              <small id="naturalIndicatorText">Ajusta variables para visualizar la relación causa-efecto.</small>
            </div>
          </article>

          <article class="natural-card">
            <h4>2. Gráfica animada de evidencia</h4>
            <svg class="natural-plot" viewBox="0 0 420 230" role="img" aria-label="Gráfica científica animada">
              <defs><linearGradient id="naturalGradient" x1="0" x2="1"><stop offset="0" stop-color="#22c55e"/><stop offset="1" stop-color="#38bdf8"/></linearGradient></defs>
              <line x1="44" y1="190" x2="386" y2="190" class="natural-axis"/>
              <line x1="44" y1="190" x2="44" y2="28" class="natural-axis"/>
              <polyline id="naturalLine" class="natural-line" points="44,170 112,145 180,120 248,92 316,70 386,48"/>
              <circle id="naturalDot" class="natural-dot" cx="248" cy="92" r="9"/>
              <text x="54" y="35" class="natural-label">respuesta</text>
              <text x="310" y="214" class="natural-label">variable</text>
            </svg>
            <div class="natural-bars">
              ${bars.map(b => `<div class="natural-bar-row"><span>${escapeHtml(b.label)}</span><div><i style="width:${b.value}%"></i></div><strong>${b.value}%</strong></div>`).join("")}
            </div>
          </article>
        </div>

        <div class="natural-timeline">
          ${profile.tools.map((tool, i) => `<button type="button" data-natural-step="${i}" class="natural-step ${i === 0 ? "active" : ""}"><span>${i + 1}</span>${escapeHtml(tool)}</button>`).join("")}
        </div>
        <div id="naturalStepFeedback" class="natural-feedback strong">Paso activo: ${escapeHtml(profile.tools[0])}. ${escapeHtml(profile.challenge)}</div>

        <div class="natural-evidence-lab">
          <article class="natural-card">
            <h4>3. Lupa de evidencia científica</h4>
            <p>Toca fragmentos del enunciado para decidir si son variable, dato, condición, resultado o conclusión.</p>
            <div class="natural-token-box">
              ${tokens.map((w, i) => `<button type="button" data-natural-token="${i}">${escapeHtml(w)}</button>`).join(" ")}
            </div>
            <div id="naturalTokenFeedback" class="natural-feedback">Selecciona un fragmento para activar la lectura científica.</div>
          </article>

          <article class="natural-card natural-option-meter">
            <h4>4. Laboratorio de opciones</h4>
            <p>Elige una opción. El simulador te ayuda a detectar si está sustentada en evidencia o si es un distractor.</p>
            <div class="choice-grid natural-option-grid">
              ${opts.map(o => `<button type="button" data-natural-option="${escapeHtml(o.letter)}"><b>${escapeHtml(o.letter)}</b><span>${escapeHtml(o.text).slice(0, 132)}${o.text.length > 132 ? "…" : ""}</span></button>`).join("")}
            </div>
            <div class="natural-mini-bars">
              ${optionBars.map(b => `<div class="natural-mini-row"><span>${escapeHtml(b.letter)}</span><div><i style="width:${b.value}%"></i></div></div>`).join("")}
            </div>
            <div id="naturalOptionFeedback" class="natural-feedback">Selecciona una opción para recibir retroalimentación inmediata.</div>
          </article>
        </div>

        <div class="natural-flow">
          <span>Fenómeno</span><i></i><span>Variables</span><i></i><span>Evidencia</span><i></i><span>Modelo</span><i></i><span>Respuesta</span>
        </div>
      </div>`,
      `<strong>Método Saber 11:</strong> ${escapeHtml(profile.challenge)} Respuesta correcta configurada en el banco: <strong>${escapeHtml(q.correctAnswer || "")}</strong>.`
    );
  }


  /*
     Super simuladores AI Studio · Sección 2 Inglés
     Preguntas 80 a 134: vocabulario, avisos, conversaciones, cloze text y comprensión lectora.
  */

  function isS2EnglishSuperQuestion(q) {
    const area = String(q?.area || "").toLowerCase();
    return Number(q?.session) === 2 && area.includes("ingl") && Number(q?.number) >= 80 && Number(q?.number) <= 134;
  }

  function englishQuestionProfile(q) {
    const number = Number(q.number || 0);
    const interaction = String(q.interaction || "").toLowerCase();
    const group = String(q.readingGroup || q.matchingGroup || "").toLowerCase();
    const component = String(q.component || q.componente || "").toLowerCase();
    const prompt = stripHtml(`${q.stem || ""} ${q.prompt || ""}`).toLowerCase();
    let profile = {
      kind: "English comprehension",
      icon: "🇬🇧",
      focus: "Resolver por sentido, contexto y evidencia textual, sin traducir palabra por palabra.",
      lens: ["Contexto", "Vocabulario", "Gramática", "Descarte"],
      weights: [82, 78, 74, 84],
      tools: ["Lee la consigna", "Ubica pistas", "Prueba opciones", "Verifica sentido"],
      challenge: "La respuesta correcta debe sonar natural y cumplir exactamente la función comunicativa del texto.",
      model: "reading"
    };

    if (interaction === "matching" || /vocabulario/.test(component)) {
      const picnic = group.includes("picnic") || number <= 84;
      profile = {
        kind: picnic ? "Vocabulary matching · At a picnic" : "Vocabulary matching · Travelling",
        icon: picnic ? "🧺" : "✈️",
        focus: picnic ? "Asociar descripciones sencillas con objetos o palabras de un picnic." : "Asociar descripciones de viaje con lugares, objetos o medios de transporte.",
        lens: ["Description", "Key noun", "Context", "Extra words"],
        weights: [90, 84, 78, 72],
        tools: ["Lee la descripción", "Busca la palabra núcleo", "Relaciona con la situación", "Descarta palabras extra"],
        challenge: "En matching hay palabras extra: no elijas por familiaridad, elige por definición exacta.",
        model: "matching"
      };
    } else if (interaction === "notice-location" || /avisos|señales|contexto comunicativo/.test(component)) {
      profile = {
        kind: "Notices and places",
        icon: "📍",
        focus: "Inferir en qué lugar aparece un aviso según las palabras, el producto, la acción o el público.",
        lens: ["Notice", "Place", "Audience", "Purpose"],
        weights: [88, 86, 80, 76],
        tools: ["Lee el aviso", "Pregunta dónde aparece", "Identifica público", "Confirma función"],
        challenge: "El lugar correcto es donde ese aviso tendría una función real, no solo donde aparece una palabra parecida.",
        model: "notice"
      };
    } else if (interaction === "conversation-completion" || /conversaciones|respuesta adecuada/.test(component)) {
      profile = {
        kind: "Conversation response",
        icon: "💬",
        focus: "Completar diálogos cortos con una respuesta natural, cortés y coherente con la situación.",
        lens: ["Speaker A", "Situation", "Tone", "Reply"],
        weights: [84, 88, 82, 90],
        tools: ["Identifica quién habla", "Reconoce la intención", "Elige tono adecuado", "Prueba la respuesta"],
        challenge: "Una respuesta correcta no solo traduce: continúa la conversación de forma natural.",
        model: "conversation"
      };
    } else if (interaction === "cloze-text" || /completar|preposiciones|conectores|lexical|verbal|pasiva|pasado perfecto|adjetivos/.test(component)) {
      const longCloze = group.includes("jamaica") || number >= 125;
      profile = {
        kind: longCloze ? "Long cloze · Jamaica Kincaid" : "Cloze text · Taj Mahal",
        icon: longCloze ? "📚" : "🕌",
        focus: longCloze ? "Completar un texto biográfico/literario con gramática, léxico y coherencia global." : "Completar un texto informativo con preposiciones, conectores, pronombres y formas verbales básicas.",
        lens: ["Before", "Blank", "After", "Grammar"],
        weights: longCloze ? [82, 88, 84, 90] : [86, 84, 78, 88],
        tools: ["Lee antes del espacio", "Lee después del espacio", "Detecta categoría gramatical", "Comprueba coherencia"],
        challenge: "En cloze text, la palabra correcta debe encajar antes y después del espacio, no solo sonar conocida.",
        model: longCloze ? "clozeLong" : "cloze"
      };
    } else if (interaction === "reading-comprehension" || /comprensión de lectura|propósito|inferencia|información explícita|título|postura/.test(component + prompt)) {
      let topic = "Reading comprehension";
      let icon = "📖";
      let focus = "Responder con evidencia textual, identificando información explícita, inferencias y propósito comunicativo.";
      if (group.includes("lazy") || (number >= 115 && number <= 119)) {
        topic = "Reading comprehension · Lazy periods";
        icon = "📵";
        focus = "Inferir propósito, postura y consejo del autor a partir de una experiencia cotidiana.";
      } else if (group.includes("gymnastics") || (number >= 120 && number <= 124)) {
        topic = "Reading comprehension · Gymnastics";
        icon = "🤸";
        focus = "Reconocer aprendizajes, beneficios personales y sugerencias coherentes con un texto reflexivo.";
      }
      profile = {
        kind: topic,
        icon,
        focus,
        lens: ["Main idea", "Detail", "Inference", "Purpose"],
        weights: [88, 82, 86, 80],
        tools: ["Lee la pregunta", "Subraya evidencia", "Distingue dato e inferencia", "Descarta extremos"],
        challenge: "La opción correcta se sostiene en el texto; no debe agregar una idea que el texto no permite concluir.",
        model: "reading"
      };
    }

    profile.seed = number % 9;
    return profile;
  }

  function englishTextTokens(q) {
    const text = stripHtml(`${q.stem || ""} ${q.prompt || ""} ${(q.resources || []).map(r => r?.html ? stripHtml(r.html) : "").join(" ")}`)
      .replace(/\s+/g, " ")
      .trim();
    const raw = text || "Read the text carefully and choose the best answer according to the context.";
    const words = raw.split(/\s+/).filter(Boolean);
    const focus = words.filter(w => /[A-Za-z]{4,}/.test(w)).slice(0, 42);
    return focus.length ? focus : words.slice(0, 42);
  }

  function simEnglishSuper(q) {
    const profile = englishQuestionProfile(q);
    const opts = (q.options || []).map(o => ({ letter: o.letter || o.value || "", text: stripHtml(o.text || o.label || "") }));
    const tokens = englishTextTokens(q);
    const bars = profile.lens.map((label, i) => ({ label, value: Math.max(20, Math.min(96, profile.weights[i] - profile.seed + i * 3)) }));
    const optionBars = opts.map((o, i) => ({ letter: o.letter, value: o.letter === q.correctAnswer ? 94 : Math.max(24, 68 - i * 8 + profile.seed) }));
    const selectedAnswer = state.answers[q.id] || "";
    const showAnswer = Boolean(state.showExplanation[q.id]);
    const optionFeedback = selectedAnswer
      ? (selectedAnswer === q.correctAnswer
        ? `✅ <strong>${escapeHtml(selectedAnswer)}</strong> encaja con el contexto, la gramática y la intención comunicativa.`
        : `💡 <strong>${escapeHtml(selectedAnswer)}</strong> puede ser distractor. Revisa si traduce literalmente, contradice el contexto o no completa bien la función.`)
      : "Selecciona una opción para recibir retroalimentación inmediata.";
    const activityLabels = {
      matching: ["Definition", "Object", "Context", "Extra word"],
      notice: ["Notice", "Place", "Reader", "Action"],
      conversation: ["Question", "Reply", "Tone", "Meaning"],
      cloze: ["Before", "Blank", "After", "Grammar"],
      clozeLong: ["Coherence", "Grammar", "Lexis", "Reference"],
      reading: ["Main idea", "Evidence", "Inference", "Purpose"]
    }[profile.model] || profile.lens;

    return simWrapper(
      `${profile.icon} Super simulador de Inglés · Pregunta ${q.number}`,
      `Entrenamiento interactivo para ${profile.kind}. Practica lectura contextual, vocabulario, gramática, función comunicativa y descarte de distractores.`,
      `<div class="english-super-sim" data-english-correct="${escapeHtml(q.correctAnswer || "")}" data-english-model="${escapeHtml(profile.model)}">
        <div class="english-hero">
          <div>
            <span class="english-badge">${escapeHtml(q.area || "Inglés")} · Saber 11</span>
            <h4>${escapeHtml(profile.kind)}</h4>
            <p>${escapeHtml(profile.focus)}</p>
          </div>
          <div class="english-soundboard" aria-hidden="true">
            <span>Read</span><span>Think</span><span>Choose</span><span>Check</span><b>${profile.icon}</b>
          </div>
        </div>

        <div class="english-workbench">
          <article class="english-card">
            <h4>1. Laboratorio de comprensión</h4>
            <p>Modifica el nivel de atención a cada habilidad. Observa cómo cambia el indicador de seguridad.</p>
            <div class="english-slider-grid">
              ${activityLabels.map((label, i) => `<label class="english-slider">${escapeHtml(label)} <strong id="englishSkill${i}V">${bars[i]?.value || 70}%</strong><input type="range" min="10" max="100" value="${bars[i]?.value || 70}" data-english-range="${i}"></label>`).join("")}
            </div>
            <div class="english-result-card">
              <span>Confidence score</span>
              <strong id="englishIndicator">78%</strong>
              <small id="englishIndicatorText">Ajusta las habilidades para entrenar la respuesta con evidencia.</small>
            </div>
          </article>

          <article class="english-card">
            <h4>2. Gráfica animada de lectura</h4>
            <svg class="english-plot" viewBox="0 0 420 230" role="img" aria-label="Gráfica de comprensión en inglés">
              <line x1="44" y1="190" x2="386" y2="190" class="english-axis"/>
              <line x1="44" y1="190" x2="44" y2="28" class="english-axis"/>
              <polyline id="englishLine" class="english-line" points="44,160 112,138 180,112 248,96 316,74 386,56"/>
              <circle id="englishDot" class="english-dot" cx="286" cy="78" r="9"/>
              <text x="54" y="35" class="english-label">meaning</text>
              <text x="306" y="214" class="english-label">context</text>
            </svg>
            <div class="english-bars">
              ${bars.map(b => `<div class="english-bar-row"><span>${escapeHtml(b.label)}</span><div><i style="width:${b.value}%"></i></div><strong>${b.value}%</strong></div>`).join("")}
            </div>
          </article>
        </div>

        <div class="english-timeline">
          ${profile.tools.map((tool, i) => `<button type="button" data-english-step="${i}" class="english-step ${i === 0 ? "active" : ""}"><span>${i + 1}</span>${escapeHtml(tool)}</button>`).join("")}
        </div>
        <div id="englishStepFeedback" class="english-feedback strong">Paso activo: ${escapeHtml(profile.tools[0])}. ${escapeHtml(profile.challenge)}</div>

        <div class="english-lab-grid">
          <article class="english-card">
            <h4>3. Context scanner</h4>
            <p>Toca palabras o fragmentos. Clasifícalos mentalmente como vocabulary clue, grammar clue, purpose clue o evidence.</p>
            <div class="english-token-box">
              ${tokens.map((w, i) => `<button type="button" data-english-token="${i}">${escapeHtml(w)}</button>`).join(" ")}
            </div>
            <div class="english-clue-buttons">
              <button type="button" data-eng-super-clue="vocabulary">Vocabulary</button>
              <button type="button" data-eng-super-clue="grammar">Grammar</button>
              <button type="button" data-eng-super-clue="purpose">Purpose</button>
              <button type="button" data-eng-super-clue="main">Main idea</button>
            </div>
            <div id="englishTokenFeedback" class="english-feedback">Selecciona una pista del texto para activar el análisis contextual.</div>
          </article>

          <article class="english-card english-option-meter">
            <h4>4. Option lab</h4>
            <p>Elige una opción y verifica si conserva el sentido, la gramática y la función comunicativa.</p>
            <div class="choice-grid english-option-grid">
              ${opts.map(o => {
                const isSelected = selectedAnswer === o.letter;
                const isCorrect = o.letter === q.correctAnswer;
                const cls = `${isSelected ? "selected " : ""}${showAnswer && isCorrect ? "correct" : showAnswer && isSelected && !isCorrect ? "incorrect" : ""}`.trim();
                return `<button type="button" data-english-option="${escapeHtml(o.letter)}" class="${cls}" aria-pressed="${isSelected ? "true" : "false"}"><b>${escapeHtml(o.letter)}</b><span>${escapeHtml(o.text).slice(0, 140)}${o.text.length > 140 ? "…" : ""}</span></button>`;
              }).join("")}
            </div>
            <div class="english-mini-bars">
              ${optionBars.map(b => `<div class="english-mini-row"><span>${escapeHtml(b.letter)}</span><div><i style="width:${b.value}%"></i></div></div>`).join("")}
            </div>
            <div id="englishOptionFeedback" class="english-feedback">${optionFeedback}</div>
          </article>
        </div>

        <div class="english-flow">
          <span>Read</span><i></i><span>Context</span><i></i><span>Grammar</span><i></i><span>Meaning</span><i></i><span>Answer</span>
        </div>
      </div>`,
      `<strong>English strategy:</strong> ${escapeHtml(profile.challenge)} Respuesta correcta configurada en el banco: <strong>${escapeHtml(q.correctAnswer || "")}</strong>.`
    );
  }

  function bindEnglishSuperEvents() {
    const sim = $('.english-super-sim');
    if (!sim) return;
    $$('[data-english-range]', sim).forEach(input => input.addEventListener('input', updateEnglishSuper));
    $$('[data-english-step]', sim).forEach(btn => btn.addEventListener('click', () => {
      $$('[data-english-step]', sim).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const q = currentQuestion();
      const profile = q ? englishQuestionProfile(q) : null;
      const idx = Number(btn.dataset.englishStep || 0);
      const fb = $('#englishStepFeedback');
      if (fb && profile) fb.innerHTML = `<strong>Step ${idx + 1}:</strong> ${escapeHtml(profile.tools[idx] || 'Read carefully')}. ${escapeHtml(profile.challenge)}`;
    }));
    $$('[data-english-token]', sim).forEach(btn => btn.addEventListener('click', () => {
      $$('[data-english-token]', sim).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const q = currentQuestion();
      const profile = q ? englishQuestionProfile(q) : null;
      const fb = $('#englishTokenFeedback');
      if (fb) fb.innerHTML = `Pista activada: <strong>“${escapeHtml(btn.textContent)}”</strong>. Relaciónala con ${escapeHtml(profile?.kind || 'el contexto')} antes de elegir.`;
    }));
    $$('[data-eng-super-clue]', sim).forEach(btn => btn.addEventListener('click', () => {
      $$('[data-eng-super-clue]', sim).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const fb = $('#englishTokenFeedback');
      const messages = {
        vocabulary: 'Vocabulary clue: busca significado por contexto, no por traducción literal.',
        grammar: 'Grammar clue: revisa preposición, conector, tiempo verbal, pronombre o categoría gramatical.',
        purpose: 'Purpose clue: pregunta para qué se dice el aviso, diálogo o fragmento.',
        main: 'Main idea clue: identifica la idea que organiza el texto completo.'
      };
      if (fb) fb.textContent = messages[btn.dataset.engSuperClue] || 'Pista activada.';
    }));
    $$('[data-english-option]', sim).forEach(btn => btn.addEventListener('click', () => {
      $$('[data-english-option]', sim).forEach(b => b.classList.remove('selected', 'correct', 'incorrect'));
      const q = currentQuestion();
      const chosen = btn.dataset.englishOption || '';
      const ok = selectCurrentAnswer(chosen, { render: false });
      btn.classList.add('selected', ok ? 'correct' : 'incorrect');
      const fb = $('#englishOptionFeedback');
      if (fb) fb.innerHTML = ok
        ? `✅ <strong>${escapeHtml(chosen)}</strong> encaja con el contexto, la gramática y la intención comunicativa.`
        : `💡 <strong>${escapeHtml(chosen)}</strong> puede ser distractor: revisa si traduce literalmente, contradice el contexto o no completa bien la función.`;
    }));
  }

  function updateEnglishSuper() {
    const sim = $('.english-super-sim');
    if (!sim) return;
    const vals = $$('[data-english-range]', sim).map((input, i) => {
      const value = Number(input.value || 0);
      setText(`#englishSkill${i}V`, `${value}%`);
      return value;
    });
    if (!vals.length) return;
    const model = sim.dataset.englishModel || 'reading';
    let indicator = Math.round(vals.reduce((a,b)=>a+b,0) / vals.length);
    if (model === 'matching') indicator = Math.round(vals[0] * .36 + vals[1] * .30 + vals[2] * .20 + vals[3] * .14);
    if (model === 'notice') indicator = Math.round(vals[0] * .30 + vals[1] * .34 + vals[2] * .18 + vals[3] * .18);
    if (model === 'conversation') indicator = Math.round(vals[0] * .23 + vals[1] * .28 + vals[2] * .22 + vals[3] * .27);
    if (model === 'cloze' || model === 'clozeLong') indicator = Math.round(vals[0] * .22 + vals[1] * .28 + vals[2] * .24 + vals[3] * .26);
    if (model === 'reading') indicator = Math.round(vals[0] * .28 + vals[1] * .25 + vals[2] * .27 + vals[3] * .20);
    indicator = Math.max(0, Math.min(100, indicator));
    setText('#englishIndicator', `${indicator}%`);
    const text = $('#englishIndicatorText');
    if (text) {
      text.textContent = indicator >= 80 ? 'Alta seguridad: la opción debe estar sustentada por contexto y evidencia textual.' : indicator >= 55 ? 'Seguridad media: vuelve a comparar la opción con las palabras antes y después.' : 'Seguridad baja: evita responder por traducción literal; vuelve al contexto.';
    }
    $$('.english-bar-row', sim).forEach((row, i) => {
      const width = Math.max(16, Math.min(98, vals[i] || indicator));
      const bar = row.querySelector('i');
      const strong = row.querySelector('strong');
      if (bar) bar.style.width = `${width}%`;
      if (strong) strong.textContent = `${width}%`;
    });
    const line = $('#englishLine');
    const dot = $('#englishDot');
    if (line) {
      const points = vals.map((v, i) => `${44 + i * 90},${190 - Math.max(10, v) * 1.45}`).join(' ');
      line.setAttribute('points', points + ` 386,${190 - indicator * 1.45}`);
    }
    if (dot) {
      dot.setAttribute('cx', String(44 + indicator * 3.35));
      dot.setAttribute('cy', String(190 - indicator * 1.45));
    }
    const flow = $('.english-flow');
    if (flow) flow.style.setProperty('--english-progress', `${indicator}%`);
  }

  function getNaturalVariables(profile) {
    const map = {
      water: [
        { name: "Aceite vertido", min: 0, max: 100, value: 62, unit: "%" },
        { name: "Oxígeno disuelto", min: 0, max: 100, value: 38, unit: "%" },
        { name: "Luz que penetra", min: 0, max: 100, value: 45, unit: "%" }
      ],
      plant: [
        { name: "Luz disponible", min: 0, max: 100, value: 74, unit: "%" },
        { name: "CO₂", min: 0, max: 100, value: 58, unit: "%" },
        { name: "Producción de glucosa", min: 0, max: 100, value: 66, unit: "%" }
      ],
      biodiversity: [
        { name: "Sitios muestreados", min: 1, max: 20, value: 8, unit: "" },
        { name: "Especies registradas", min: 0, max: 100, value: 54, unit: "" },
        { name: "Comparación", min: 0, max: 100, value: 70, unit: "%" }
      ],
      wave: [
        { name: "Frecuencia", min: 0, max: 100, value: 68, unit: "%" },
        { name: "Longitud de onda", min: 0, max: 100, value: 32, unit: "%" },
        { name: "Energía", min: 0, max: 100, value: 76, unit: "%" }
      ],
      experiment: [
        { name: "Variable manipulada", min: 0, max: 100, value: 60, unit: "%" },
        { name: "Control experimental", min: 0, max: 100, value: 55, unit: "%" },
        { name: "Evidencia obtenida", min: 0, max: 100, value: 72, unit: "%" }
      ],
      evolution: [
        { name: "Variación heredable", min: 0, max: 100, value: 63, unit: "%" },
        { name: "Presión ambiental", min: 0, max: 100, value: 78, unit: "%" },
        { name: "Reproducción diferencial", min: 0, max: 100, value: 58, unit: "%" }
      ],
      motion: [
        { name: "Fuerza neta", min: 0, max: 100, value: 70, unit: " N" },
        { name: "Masa", min: 1, max: 100, value: 42, unit: " kg" },
        { name: "Aceleración", min: 0, max: 100, value: 62, unit: "%" }
      ],
      materials: [
        { name: "Solubilidad", min: 0, max: 100, value: 64, unit: "%" },
        { name: "Conductividad", min: 0, max: 100, value: 36, unit: "%" },
        { name: "Densidad", min: 0, max: 100, value: 54, unit: "%" }
      ],
      cell: [
        { name: "ADN duplicado", min: 0, max: 100, value: 80, unit: "%" },
        { name: "Cromosomas ordenados", min: 0, max: 100, value: 62, unit: "%" },
        { name: "Células hijas", min: 0, max: 100, value: 50, unit: "%" }
      ],
      ecology: [
        { name: "Beneficio parásito", min: 0, max: 100, value: 80, unit: "%" },
        { name: "Daño huésped", min: 0, max: 100, value: 70, unit: "%" },
        { name: "Equilibrio ecosistema", min: 0, max: 100, value: 46, unit: "%" }
      ],
      atom: [
        { name: "Protones", min: 1, max: 40, value: 12, unit: "" },
        { name: "Neutrones", min: 1, max: 50, value: 14, unit: "" },
        { name: "Número de masa", min: 1, max: 90, value: 26, unit: "" }
      ],
      solution: [
        { name: "Soluto", min: 0, max: 100, value: 48, unit: " g" },
        { name: "Volumen", min: 1, max: 100, value: 60, unit: " mL" },
        { name: "Concentración", min: 0, max: 100, value: 68, unit: "%" }
      ],
      magnet: [
        { name: "Intensidad del campo", min: 0, max: 100, value: 72, unit: "%" },
        { name: "Distancia", min: 1, max: 100, value: 40, unit: " cm" },
        { name: "Fuerza magnética", min: 0, max: 100, value: 60, unit: "%" }
      ],
      nutrition: [
        { name: "Nutrientes", min: 0, max: 100, value: 66, unit: "%" },
        { name: "Energía disponible", min: 0, max: 100, value: 58, unit: "%" },
        { name: "Función biológica", min: 0, max: 100, value: 72, unit: "%" }
      ],
      reaction: [
        { name: "Temperatura", min: 0, max: 100, value: 62, unit: " °C" },
        { name: "Choques efectivos", min: 0, max: 100, value: 70, unit: "%" },
        { name: "Rapidez", min: 0, max: 100, value: 68, unit: "%" }
      ],
      gas: [
        { name: "Temperatura", min: 0, max: 100, value: 60, unit: "%" },
        { name: "Presión", min: 0, max: 100, value: 55, unit: "%" },
        { name: "Volumen", min: 0, max: 100, value: 70, unit: "%" }
      ],
      metamorphosis: [
        { name: "Etapa larval", min: 0, max: 100, value: 40, unit: "%" },
        { name: "Transformación", min: 0, max: 100, value: 80, unit: "%" },
        { name: "Adulto", min: 0, max: 100, value: 65, unit: "%" }
      ],
      tolerance: [
        { name: "Temperatura ambiental", min: 0, max: 100, value: 52, unit: "%" },
        { name: "Rango óptimo", min: 0, max: 100, value: 76, unit: "%" },
        { name: "Supervivencia", min: 0, max: 100, value: 68, unit: "%" }
      ],
      genetics: [
        { name: "Alelo dominante", min: 0, max: 100, value: 50, unit: "%" },
        { name: "Alelo recesivo", min: 0, max: 100, value: 50, unit: "%" },
        { name: "Fenotipo esperado", min: 0, max: 100, value: 75, unit: "%" }
      ],
      phase: [
        { name: "Temperatura", min: -40, max: 140, value: 60, unit: " °C" },
        { name: "Energía transferida", min: 0, max: 100, value: 68, unit: "%" },
        { name: "Cambio de estado", min: 0, max: 100, value: 50, unit: "%" }
      ]
    };
    return map[profile.model] || map.experimental || map.experiment;
  }

  function renderGenericSimulator(q) {
    const type = areaType(q);
    if (type === "lectura crítica") return genericReading(q);
    if (type === "análisis social y ciudadano") return genericSocial(q);
    if (type === "pensamiento científico") return genericScience(q);
    if (type === "comprensión en inglés") return genericEnglish(q);
    return genericMath(q);
  }

  function genericMath(q) {
    return simWrapper(
      "Laboratorio cuantitativo",
      "Entrena la lectura de datos, la elección de operación y la verificación de la respuesta.",
      `<div class="sim-grid-3"><label class="slider-card">Datos útiles<strong id="mDataV">3</strong><input id="mData" type="range" min="1" max="8" value="3"></label><label class="slider-card">Operaciones<strong id="mOpsV">2</strong><input id="mOps" type="range" min="1" max="6" value="2"></label><label class="slider-card">Verificación<strong id="mCheckV">70%</strong><input id="mCheck" type="range" min="0" max="100" value="70"></label></div><div class="animated-bars" id="genericMathBars"><i style="height:80px"><span>Datos</span></i><i style="height:55px"><span>Modelo</span></i><i style="height:110px"><span>Verifica</span></i></div>`,
      `<strong>Competencia:</strong> ${escapeHtml(q.competence)} · ${escapeHtml(q.component)}.`
    );
  }

  function genericReading(q) {
    const clean = stripHtml(`${q.stem || ""} ${q.prompt || ""}`);
    const words = clean.split(/\s+/).slice(0, 44);
    return simWrapper(
      "Lupa de lectura crítica",
      "Haz clic en fragmentos para activar lectura literal, inferencial o crítica.",
      `<div class="reading-lens">${words.map((w,i)=>`<button type="button" data-read-token="${i}">${escapeHtml(w)}</button>`).join(" ")}</div><div class="sim-grid-3"><article><span>Literal</span><strong>¿Qué dice?</strong></article><article><span>Inferencial</span><strong>¿Qué implica?</strong></article><article><span>Crítica</span><strong>¿Para qué lo dice?</strong></article></div><div id="readingFeedback" class="word-feedback">Selecciona una palabra o expresión importante del texto.</div>`
    );
  }

  function genericSocial(q) {
    return simWrapper(
      "Mapa de actores y decisiones",
      "Mueve la prioridad de derechos, evidencia y consecuencias para elegir una opción democrática.",
      `<div class="sim-grid-3"><label class="slider-card">Derechos<strong id="socRightsV">80%</strong><input id="socRights" type="range" min="0" max="100" value="80"></label><label class="slider-card">Intereses<strong id="socInterestsV">55%</strong><input id="socInterests" type="range" min="0" max="100" value="55"></label><label class="slider-card">Consecuencias<strong id="socConsequencesV">70%</strong><input id="socConsequences" type="range" min="0" max="100" value="70"></label></div><div class="actor-orbit"><span>Estado</span><span>Ciudadanía</span><span>Comunidad</span><span>Normas</span><b>Problema</b></div>`
    );
  }

  function genericScience(q) {
    return simWrapper(
      "Laboratorio de variables",
      "Entrena el reconocimiento de variable independiente, dependiente y evidencia experimental.",
      `<div class="sim-grid-3"><label class="slider-card">Variable A<strong id="sciAV">50</strong><input id="sciA" type="range" min="0" max="100" value="50"></label><label class="slider-card">Variable B<strong id="sciBV">50</strong><input id="sciB" type="range" min="0" max="100" value="50"></label><label class="slider-card">Evidencia<strong id="sciEV">50%</strong><input id="sciE" type="range" min="0" max="100" value="50"></label></div><svg class="sci-plot" viewBox="0 0 320 180"><line x1="35" y1="145" x2="300" y2="145"/><line x1="35" y1="145" x2="35" y2="20"/><polyline id="sciLine" points="35,145 100,110 170,80 250,45"/><circle id="sciDot" cx="170" cy="80" r="8"/></svg>`
    );
  }

  function genericEnglish(q) {
    return simWrapper(
      "Context clues trainer",
      "Activa pistas de vocabulario, gramática y propósito para resolver sin traducir palabra por palabra.",
      `<div class="choice-grid"><button type="button" data-eng-clue="vocabulary" class="clue-btn">Vocabulary</button><button type="button" data-eng-clue="grammar" class="clue-btn">Grammar</button><button type="button" data-eng-clue="purpose" class="clue-btn">Purpose</button><button type="button" data-eng-clue="main" class="clue-btn">Main idea</button></div><div id="englishClueBox" class="word-feedback">Choose a clue to train your reading strategy.</div><div class="animated-bars english-bars"><i style="height:90px"><span>Context</span></i><i style="height:120px"><span>Meaning</span></i><i style="height:70px"><span>Grammar</span></i></div>`
    );
  }

  function renderPasoAPaso(q) {
    const strategy = aiStrategy(q);
    return `
      <section class="ai-panel ai-step-panel">
        <div class="ai-panel-head"><div><p class="eyebrow">Paso a paso</p><h3>Método de resolución recomendado</h3></div></div>
        <div class="stepper-cards">
          <div class="stepper-card active"><span>1</span><strong>Identifica lo pedido</strong><p>Lee primero la pregunta final y determina la acción: calcular, inferir, comparar, justificar o concluir.</p></div>
          <div class="stepper-card"><span>2</span><strong>Extrae evidencia</strong><p>${escapeHtml(strategy.steps[0])}</p></div>
          <div class="stepper-card"><span>3</span><strong>Aplica la estrategia</strong><p>${escapeHtml(strategy.steps[1])}</p></div>
          <div class="stepper-card"><span>4</span><strong>Verifica y descarta</strong><p>${escapeHtml(strategy.steps[2])}</p></div>
        </div>
        <div class="ai-explanation-box"><h4>Explicación de la respuesta ${escapeHtml(q.correctAnswer)}</h4><p>${q.explanation}</p></div>
      </section>`;
  }

  function renderFlashcards(q) {
    const strategy = aiStrategy(q);
    const cards = [
      ["Concepto clave", q.component || q.area || "Competencia evaluada"],
      ["Estrategia", strategy.steps[1] || "Relaciona evidencia con opción."],
      ["Error común", "Elegir una opción que suena familiar pero no responde exactamente la pregunta."],
      ["Consejo Saber 11", "Primero entiende qué se pregunta; después revisa opciones."],
      ["Modo desafío", state.studyMode === "desafio" ? "Resuelve antes de revelar la explicación." : "Aprende paso a paso con apoyo visual."]
    ];
    return `
      <section class="ai-panel">
        <div class="ai-panel-head"><div><p class="eyebrow">Memoria activa</p><h3>Tarjetas de entrenamiento</h3></div></div>
        <div class="flashcard-grid">${cards.map(card => `<article class="ai-flashcard"><span>${escapeHtml(card[0])}</span><strong>${escapeHtml(card[1])}</strong></article>`).join("")}</div>
      </section>`;
  }

  function renderQuestion() {
    const app = $("#aiStudioApp");
    const student = getStudent();
    const progress = getProgress();
    const q = currentQuestion();

    if (!q) {
      app.innerHTML = `<section class="empty-state ai-empty"><p class="eyebrow">Entrenamiento con AI Studio</p><h2>No se encontraron preguntas para este bloque</h2><p>Vuelve a ICFES Digital y selecciona un bloque con preguntas disponibles.</p><a class="primary-btn" href="index.html">Volver a ICFES Digital</a></section>`;
      return;
    }

    app.innerHTML = `
      <section class="ai-hero-panel ai-animated-hero">
        <div><p class="eyebrow">${escapeHtml(INSTITUTION)}</p><h2>${escapeHtml(scopeDisplayTitle())}</h2><p>${escapeHtml(scopeDisplayIntro())}</p></div>
        <div class="ai-hero-stats"><span class="pill">${escapeHtml(student.fullName)} · ${escapeHtml(student.group)}</span><span class="pill success">${escapeHtml(scope.label)}</span><span class="pill muted">${progress.answered}/${progress.total} respondidas</span></div>
      </section>

      <section class="ai-progress-card"><div class="progress-top"><strong>Avance del bloque</strong><span>${progress.percent}% de acierto acumulado</span></div><div class="progress-bar"><span style="width:${Math.max(0, Math.min(progress.percent, 100))}%"></span></div></section>

      <nav class="ai-question-nav" aria-label="Navegación de preguntas">${state.questions.map((item, idx) => {
        const userAnswer = state.answers[item.id] || "";
        const answeredClass = userAnswer ? "answered" : "";
        const resultClass = userAnswer ? (userAnswer === item.correctAnswer ? "answered-correct" : "answered-wrong") : "";
        const statusLabel = userAnswer ? `respondida con ${userAnswer}` : "sin responder";
        return `<button type="button" class="ai-nav-dot ${idx === state.currentIndex ? "active" : ""} ${answeredClass} ${resultClass}" data-jump="${idx}" title="Pregunta ${item.number}: ${statusLabel}" aria-label="Pregunta ${item.number}: ${statusLabel}">${item.number}</button>`;
      }).join("")}</nav>

      <section class="ai-question-layout">
        <article class="ai-question-card">
          <div class="ai-question-head"><div><p class="eyebrow">Sección ${q.session} · ${escapeHtml(q.area || "Área")}</p><h3>Pregunta ${q.number}</h3></div><span class="pill">${escapeHtml(q.difficulty)}</span></div>
          <div class="question-copy"><p>${q.stem || ""}</p>${(q.resources || []).map(renderResource).join("")}<p class="question-prompt"><strong>${q.prompt || "Selecciona la respuesta correcta."}</strong></p></div>
          <div class="ai-options" id="aiOptions">${renderOptions(q)}</div>
          <div class="question-actions sticky-actions"><button class="secondary-btn" type="button" id="prevQuestion" ${state.currentIndex === 0 ? "disabled" : ""}>Anterior</button><button class="primary-btn" type="button" id="nextQuestion" ${state.currentIndex >= state.questions.length - 1 ? "disabled" : ""}>Siguiente</button></div>
        </article>

        <aside class="ai-tools-stack">
          <section class="ai-panel simulator-shell ${state.studyMode === "desafio" ? "challenge" : ""}">
            <div class="ai-panel-head"><div><p class="eyebrow">Enfoque del simulador</p><h3>${state.studyMode === "desafio" ? "Desafío ICFES" : "Tutor pedagógico"}</h3></div><div class="ai-mode-toggle"><button type="button" data-study="tutor" class="${state.studyMode === "tutor" ? "active" : ""}">📘 Pedagógico</button><button type="button" data-study="desafio" class="${state.studyMode === "desafio" ? "active" : ""}">🔥 Desafío</button></div></div>
            <div class="ai-sim-tabs"><button type="button" data-tab="simulator" class="${state.activeTab === "simulator" ? "active" : ""}">▶ Simulador</button><button type="button" data-tab="steps" class="${state.activeTab === "steps" ? "active" : ""}">🧭 Paso a paso</button><button type="button" data-tab="cards" class="${state.activeTab === "cards" ? "active" : ""}">🃏 Flashcards</button></div>
          </section>
          ${state.activeTab === "simulator" ? renderMicroSimulator(q) : ""}
          ${state.activeTab === "steps" ? renderPasoAPaso(q) : ""}
          ${state.activeTab === "cards" ? renderFlashcards(q) : ""}
          ${renderAiScanner(q)}
        </aside>
      </section>`;

    bindEvents();
    updateSimulators();
  }

  function bindEvents() {
    $$('[data-jump]').forEach(btn => btn.addEventListener('click', () => {
      state.currentIndex = Number(btn.dataset.jump || 0);
      state.showExplanation = {};
      saveAiState();
      renderQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }));

    $$('[data-answer]').forEach(btn => btn.addEventListener('click', () => {
      selectCurrentAnswer(btn.dataset.answer || '', { render: true });
    }));

    $$('[data-tab]').forEach(btn => btn.addEventListener('click', () => { state.activeTab = btn.dataset.tab || 'simulator'; saveAiState(); renderQuestion(); }));
    $$('[data-study]').forEach(btn => btn.addEventListener('click', () => { state.studyMode = btn.dataset.study || 'tutor'; if (state.studyMode === 'desafio') state.activeTab = 'simulator'; saveAiState(); renderQuestion(); }));
    $$('[data-tool]').forEach(btn => btn.addEventListener('click', () => { state.activeTool = btn.dataset.tool || 'scanner'; saveAiState(); renderQuestion(); }));
    $$('[data-confidence]').forEach(btn => btn.addEventListener('click', () => { const q=currentQuestion(); if(!q)return; state.confidence[q.id]=btn.dataset.confidence; saveAiState(); renderQuestion(); }));
    const notes = $('#aiNotepad'); if (notes) notes.addEventListener('input', () => { const q=currentQuestion(); if(!q)return; state.notes[q.id]=notes.value; saveAiState(); });
    $$('[data-check]').forEach(box => box.addEventListener('change', () => { const q=currentQuestion(); if(!q)return; state.checklist[q.id]=state.checklist[q.id]||{}; state.checklist[q.id][box.dataset.check]=box.checked; saveAiState(); }));

    const prev = $('#prevQuestion');
    const next = $('#nextQuestion');
    if (prev) prev.addEventListener('click', () => { if (state.currentIndex > 0) { state.currentIndex--; state.showExplanation = {}; saveAiState(); renderQuestion(); window.scrollTo({top:0,behavior:'smooth'}); } });
    if (next) next.addEventListener('click', () => { if (state.currentIndex < state.questions.length - 1) { state.currentIndex++; state.showExplanation = {}; saveAiState(); renderQuestion(); window.scrollTo({top:0,behavior:'smooth'}); } });

    bindDynamicSimulatorEvents();
    bindS2MathSuperEvents();
    bindEnglishSuperEvents();
  }

  function bindDynamicSimulatorEvents() {
    $$('input[type="range"]').forEach(input => input.addEventListener('input', updateSimulators));
    $$('[data-tax]').forEach(btn => btn.addEventListener('click', () => { $$('[data-tax]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); updateSimulators(); }));
    $$('[data-combo]').forEach(btn => btn.addEventListener('click', () => { $$('[data-combo]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const out=$('#comboCount'); if(out) out.textContent=btn.querySelector('strong')?.textContent||'0'; renderComboBars(Number(out?.textContent||0)); }));
    $$('[data-route-step]').forEach(btn => btn.addEventListener('click', () => { $$('[data-route-step]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); moveRoute(Number(btn.dataset.routeStep||0)); }));
    $$('[data-ipm-year]').forEach(btn => btn.addEventListener('click', () => { $$('[data-ipm-year]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); updateTableGraphMismatch(); }));
    $$('[data-potato-mode]').forEach(btn => btn.addEventListener('click', () => { $$('[data-potato-mode]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); updatePotatoHistogram(); }));
    $$('[data-unit-method]').forEach(btn => btn.addEventListener('click', () => { $$('[data-unit-method]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); updateUnitConversion(); }));
    $$('[data-venn]').forEach(box => box.addEventListener('change', updateVenn));
    $$('[data-bike-region]').forEach(box => box.addEventListener('change', updateBikeVenn));
    const sun = $('#sunToggle'); if (sun) sun.addEventListener('click', () => { sun.classList.toggle('active'); sun.textContent = sun.classList.contains('active') ? '☀️ Luz activa' : '🌑 Sin luz'; updateSimulators(); });
    $$('[data-word]').forEach(btn => btn.addEventListener('click', () => { $$('[data-word]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const fb=$('#wordFeedback'); if(fb) fb.innerHTML = btn.dataset.word === 'blanket' ? '✅ Correcto: una <strong>blanket</strong> sirve para sentarse en un picnic.' : '💡 Revisa el contexto: se busca un objeto para sentarse durante un picnic.'; }));
    $$('[data-read-token]').forEach(btn => btn.addEventListener('click', () => { $$('[data-read-token]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const fb=$('#readingFeedback'); if(fb) fb.textContent = `Fragmento seleccionado: “${btn.textContent}”. Ahora decide si es dato literal, pista de inferencia o intención del autor.`; }));
    $$('[data-crit-token]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-crit-token]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const fb = $('#criticalTokenFeedback');
      const q = currentQuestion();
      const profile = q ? readingQuestionProfile(q) : null;
      if (fb) fb.innerHTML = `Fragmento activado: <strong>“${escapeHtml(btn.textContent)}”</strong>. Relaciónalo con: ${escapeHtml(profile?.kind || 'lectura crítica')}.`;
    }));
    $$('[data-crit-step]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-crit-step]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const q = currentQuestion();
      const profile = q ? readingQuestionProfile(q) : null;
      const idx = Number(btn.dataset.critStep || 0);
      const fb = $('#criticalStepFeedback');
      if (fb && profile) fb.innerHTML = `<strong>Paso ${idx + 1}:</strong> ${escapeHtml(profile.tools[idx] || 'Estrategia de lectura')}. ${escapeHtml(profile.challenge)}`;
    }));
    $$('[data-crit-option]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-crit-option]').forEach(b => b.classList.remove('selected', 'correct', 'incorrect'));
      const q = currentQuestion();
      const chosen = btn.dataset.critOption || '';
      const ok = selectCurrentAnswer(chosen, { render: false });
      btn.classList.add('selected', ok ? 'correct' : 'incorrect');
      const fb = $('#criticalOptionFeedback');
      if (fb) fb.innerHTML = ok
        ? `✅ <strong>${escapeHtml(chosen)}</strong> responde exactamente la pregunta y se sostiene con evidencia textual.`
        : `💡 <strong>${escapeHtml(chosen)}</strong> puede ser distractor. Revisa si exagera, contradice o no responde la pregunta final.`;
    }));
    $$('[data-social-actor]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-social-actor]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const q = currentQuestion();
      const profile = q ? socialQuestionProfile(q) : null;
      const actors = q && profile ? getSocialStakeholders(q, profile) : [];
      const actor = actors[Number(btn.dataset.socialActor || 0)] || null;
      const fb = $('#socialActorFeedback');
      if (fb && actor) fb.innerHTML = `Actor activo: <strong>${escapeHtml(actor.name)}</strong>. ${escapeHtml(actor.role)}`;
    }));
    $$('[data-social-step]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-social-step]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const q = currentQuestion();
      const profile = q ? socialQuestionProfile(q) : null;
      const idx = Number(btn.dataset.socialStep || 0);
      const fb = $('#socialStepFeedback');
      if (fb && profile) fb.innerHTML = `<strong>Paso ${idx + 1}:</strong> ${escapeHtml(profile.tools[idx] || 'Analiza el caso')}. ${escapeHtml(profile.challenge)}`;
    }));
    $$('[data-social-token]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-social-token]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const q = currentQuestion();
      const profile = q ? socialQuestionProfile(q) : null;
      const fb = $('#socialTokenFeedback');
      if (fb) fb.innerHTML = `Fragmento activado: <strong>“${escapeHtml(btn.textContent)}”</strong>. Úsalo para analizar: ${escapeHtml(profile?.kind || 'caso ciudadano')}.`;
    }));
    $$('[data-social-option]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-social-option]').forEach(b => b.classList.remove('selected', 'correct', 'incorrect'));
      const q = currentQuestion();
      const chosen = btn.dataset.socialOption || '';
      const ok = selectCurrentAnswer(chosen, { render: false });
      btn.classList.add('selected', ok ? 'correct' : 'incorrect');
      const fb = $('#socialOptionFeedback');
      if (fb) fb.innerHTML = ok
        ? `✅ <strong>${escapeHtml(chosen)}</strong> es coherente con los actores, la evidencia y el principio ciudadano del caso.`
        : `💡 <strong>${escapeHtml(chosen)}</strong> puede ser distractor: revisa si ignora un actor, exagera la norma o no responde exactamente el conflicto.`;
    }));
    $$('[data-natural-step]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-natural-step]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const q = currentQuestion();
      const profile = q ? naturalScienceQuestionProfile(q) : null;
      const idx = Number(btn.dataset.naturalStep || 0);
      const fb = $('#naturalStepFeedback');
      if (fb && profile) fb.innerHTML = `<strong>Paso ${idx + 1}:</strong> ${escapeHtml(profile.tools[idx] || 'Analiza el fenómeno')}. ${escapeHtml(profile.challenge)}`;
    }));
    $$('[data-natural-token]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-natural-token]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const q = currentQuestion();
      const profile = q ? naturalScienceQuestionProfile(q) : null;
      const fb = $('#naturalTokenFeedback');
      if (fb) fb.innerHTML = `Fragmento activado: <strong>“${escapeHtml(btn.textContent)}”</strong>. Pregúntate si funciona como variable, dato, condición o conclusión en ${escapeHtml(profile?.kind || 'el fenómeno científico')}.`;
    }));
    $$('[data-natural-option]').forEach(btn => btn.addEventListener('click', () => {
      $$('[data-natural-option]').forEach(b => b.classList.remove('selected', 'correct', 'incorrect'));
      const q = currentQuestion();
      const chosen = btn.dataset.naturalOption || '';
      const ok = selectCurrentAnswer(chosen, { render: false });
      btn.classList.add('selected', ok ? 'correct' : 'incorrect');
      const fb = $('#naturalOptionFeedback');
      if (fb) fb.innerHTML = ok
        ? `✅ <strong>${escapeHtml(chosen)}</strong> se sostiene con la evidencia, el modelo científico y la relación causa-efecto.`
        : `💡 <strong>${escapeHtml(chosen)}</strong> puede ser distractor: revisa si ignora datos, confunde variables o concluye más de lo que permite la evidencia.`;
    }));
    $$('[data-eng-clue]').forEach(btn => btn.addEventListener('click', () => { $$('[data-eng-clue]').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); const fb=$('#englishClueBox'); if(fb) fb.textContent = ({vocabulary:'Busca significado por contexto, no traducción literal.', grammar:'Observa tiempo verbal, conectores y categoría gramatical.', purpose:'Pregunta: ¿para qué se dice esto?', main:'Identifica la idea que organiza todo el texto.'})[btn.dataset.engClue] || 'Pista activada.'; }));
  }

  function updateSimulators() {
    updateAges(); updateTickets(); updateCake(); updatePolar(); updateGenericMath(); updateS2MathSuper(); updateCriticalReading(); updateSocialSuper(); updateNaturalScienceSuper(); updateEnglishSuper(); updatePollution(); updatePhotosynthesis(); updateGas(); updateIron(); updateSocial(); updateSciencePlot(); updateVenn();
    updatePrizeAmounts(); updateFamilySavings(); updatePercentSavings(); updateTableGraphMismatch(); updatePotatoHistogram(); updateSamplingBias(); updateUnitConversion(); updateCanvasRegions(); updatePieChartVotes(); updateSavingsTrend(); updatePartsAverage(); updateBikeVenn(); updateTransistorGrowth(); updateGardenRedundancy(); updateTunnelFactorization(); updateDownloadTime(); updateRampSimilarity();
    renderComboBars(Number($('#comboCount')?.textContent || 20));
  }

  function setText(id, text) { const el = $(id); if (el) el.textContent = text; }
  function money(n) { return '$' + Math.round(n).toLocaleString('es-CO'); }


  function updateNaturalScienceSuper() {
    const sim = $('.natural-super-sim');
    if (!sim) return;
    const vals = $$('[data-natural-var]').map((input, i) => {
      const value = Number(input.value || 0);
      const unit = input.dataset.unit || '';
      setText(`#naturalVar${i}V`, `${value}${unit}`);
      return value;
    });
    if (!vals.length) return;
    const model = sim.dataset.naturalModel || 'experiment';
    let indicator = Math.round(vals.reduce((a,b)=>a+b,0) / vals.length);
    if (model === 'water') indicator = Math.max(0, Math.min(100, Math.round((vals[1] + vals[2]) / 2 - vals[0] * .15)));
    if (model === 'plant') indicator = Math.round((vals[0] * .42) + (vals[1] * .25) + (vals[2] * .33));
    if (model === 'wave') indicator = Math.round((vals[0] * .55) + (vals[2] * .45) - vals[1] * .22);
    if (model === 'motion') indicator = Math.round(Math.min(100, Math.max(0, (vals[0] / Math.max(vals[1],1)) * 35 + vals[2] * .45)));
    if (model === 'solution') indicator = Math.round(Math.min(100, Math.max(0, (vals[0] / Math.max(vals[1],1)) * 90 + vals[2] * .25)));
    if (model === 'magnet') indicator = Math.round(Math.min(100, Math.max(0, vals[0] - vals[1] * .35 + vals[2] * .55)));
    if (model === 'phase') indicator = Math.round(Math.min(100, Math.max(0, (vals[0] + 40) / 1.8 * .55 + vals[1] * .28 + vals[2] * .2)));
    indicator = Math.max(0, Math.min(100, indicator));
    setText('#naturalIndicator', `${indicator}%`);
    const text = $('#naturalIndicatorText');
    if (text) {
      text.textContent = indicator >= 75 ? 'Relación fuerte: la evidencia permite sostener una conclusión clara.' : indicator >= 45 ? 'Relación intermedia: compara mejor variables y datos antes de responder.' : 'Relación débil: revisa si estás confundiendo causa, efecto o variable controlada.';
    }
    const line = $('#naturalLine');
    const dot = $('#naturalDot');
    if (line) {
      const y1 = 190 - indicator * .72;
      const y2 = 178 - vals[0] * .62;
      const y3 = 162 - vals[1] * .58;
      const y4 = 150 - vals[2] * .54;
      const points = `44,${Math.max(35,y2)} 112,${Math.max(32,(y2+y3)/2)} 180,${Math.max(30,y3)} 248,${Math.max(28,(y3+y4)/2)} 316,${Math.max(26,y4)} 386,${Math.max(24,y1)}`;
      line.setAttribute('points', points);
    }
    if (dot) {
      dot.setAttribute('cx', String(44 + indicator * 3.35));
      dot.setAttribute('cy', String(190 - indicator * 1.45));
    }
    const balance = $('.natural-flow');
    if (balance) balance.style.setProperty('--natural-progress', `${indicator}%`);
  }

  function updateAges() {
    const inputs = $$('[data-age]'); if (!inputs.length) return;
    const ages = inputs.map(i => Number(i.value));
    ages.forEach((v,i)=>setText(`[data-age-value="${i}"]`, v));
    const sum = ages.reduce((a,b)=>a+b,0), avg = sum / ages.length;
    setText('#ageSum', sum); setText('#ageAvg', avg.toFixed(2));
    const bars = $$('#ageBars i'); bars.forEach((bar,i)=>{ bar.style.height = `${ages[i]*2}px`; const s=bar.querySelector('span'); if(s)s.textContent=ages[i]; });
  }

  function updateTickets() {
    const thu = $('#thuTickets'), sat = $('#satTickets'); if (!thu || !sat) return;
    const t = Number(thu.value), s = Number(sat.value), tax = Number($('.tax-btn.active')?.dataset.tax || 12);
    const subtotal = t*80000 + s*150000, total = subtotal*(1+tax/100);
    setText('#thuVal', t); setText('#satVal', s); setText('#ticketSubtotal', money(subtotal)); setText('#ticketTotal', money(total));
    const bar12 = $('#barTax12'), bar19 = $('#barTax19');
    if (bar12) bar12.style.height = `${Math.max(24,(subtotal*1.12)/7000)}px`;
    if (bar19) bar19.style.height = `${Math.max(24,(subtotal*1.19)/7000)}px`;
  }

  function updateVenn() {
    const status = {}; $$('[data-venn]').forEach(b => status[b.dataset.venn] = b.checked);
    ['head','nausea','dizzy'].forEach(cls => document.body.style.setProperty(`--venn-${cls}`, status[cls] ? '1' : '.18'));
  }

  function renderComboBars(count) {
    const wrap = $('#comboBars'); if (!wrap) return;
    wrap.innerHTML = Array.from({length: Math.min(count, 20)}, (_,i)=>`<i style="height:${28 + (i%6)*12}px"><span>${i+1}</span></i>`).join('') || '<p class="ai-small-note">No hay combinaciones posibles.</p>';
  }


  function updatePrizeAmounts() {
    const g=$('#goldAwards'), s=$('#silverAwards'), b=$('#bronzeAwards'); if(!g||!s||!b)return;
    const gv=Number(g.value), sv=Number(s.value), bv=Number(b.value);
    setText('#goldAwardsV', gv); setText('#silverAwardsV', sv); setText('#bronzeAwardsV', bv);
    const totals=[gv*10000000, sv*5000000, bv*1000000];
    setText('#goldTotal', money(totals[0])); setText('#silverTotal', money(totals[1])); setText('#bronzeTotal', money(totals[2]));
    const max=Math.max(...totals,1); const bars=$$('#prizeBars i'); bars.forEach((bar,i)=>{ bar.style.height=`${Math.max(30, totals[i]/max*150)}px`; });
  }

  function updateFamilySavings() {
    const m=$('#familyMonth'); if(!m)return; const months=Number(m.value); setText('#familyMonthV', months+' mes'+(months===1?'':'es'));
    const stage=$('#familySavingsStage'); if(!stage)return;
    let acc=0; const html=[];
    for(let i=1;i<=months;i++){ const save=50000*Math.pow(2,i-1); acc+=save; html.push(`<article class="coin-month ${acc>=750000?'goal':''}"><span>Mes ${i}</span><strong>${money(save)}</strong><small>Acum. ${money(acc)}</small></article>`); }
    stage.innerHTML=html.join(''); setText('#familyAccumulated', money(acc));
  }

  function updatePercentSavings() {
    const salary=$('#salary'), pct=$('#percent'), months=$('#months'); if(!salary||!pct||!months)return;
    const s=Number(salary.value), p=Number(pct.value), m=Number(months.value), monthly=s*p/100, total=monthly*m;
    setText('#salaryV', money(s)); setText('#percentV', p+'%'); setText('#monthsV', m); setText('#monthlySaving', money(monthly)+'/mes'); setText('#totalSaving', money(total));
    const fill=$('#percentFill'); if(fill) fill.style.width=`${Math.min(100,p*10)}%`;
  }

  function updateTableGraphMismatch() {
    if(!$('#antTable'))return;
    const y=Number($('.year-controls .route-btn.active')?.dataset.ipmYear || 2012);
    const data={
      2011:{antT:22.8,antG:22.8,bogT:5.7,bogG:5.7},
      2012:{antT:21.7,antG:20.5,bogT:5.4,bogG:5.4},
      2013:{antT:22.4,antG:18.3,bogT:5.2,bogG:5.2},
      2014:{antT:19.5,antG:19.5,bogT:5.1,bogG:5.1},
      2015:{antT:18.7,antG:18.7,bogT:4.7,bogG:7.6}
    }[y];
    setText('#antTable', String(data.antT).replace('.',',')); setText('#antGraph', String(data.antG).replace('.',',')); setText('#bogTable', String(data.bogT).replace('.',',')); setText('#bogGraph', String(data.bogG).replace('.',','));
    const max=25; [['#antTableBar',data.antT],['#antGraphBar',data.antG],['#bogTableBar',data.bogT],['#bogGraphBar',data.bogG]].forEach(([id,val])=>{const el=$(id); if(el){const h=val/max*120; el.setAttribute('y',150-h); el.setAttribute('height',h);}});
    const ok=data.antT===data.antG && data.bogT===data.bogG; const fb=$('#mismatchFeedback'); if(fb) fb.textContent= ok ? `En ${y} los datos comparados coinciden.` : `En ${y} hay por lo menos una diferencia: la gráfica no reproduce exactamente la tabla.`;
  }

  function updatePotatoHistogram() {
    const wrap=$('#potatoHistogram'); if(!wrap)return; const mode=$('[data-potato-mode].active')?.dataset.potatoMode || 'correct';
    const values = mode==='correct' ? [700,500,800] : mode==='swapped' ? [15,20,25] : [700,650,800];
    const labels = mode==='swapped' ? ['700','500','800'] : ['15-20','20-25','25-30'];
    const max=Math.max(...values,1);
    wrap.innerHTML=values.map((v,i)=>`<article><i style="height:${Math.max(22,v/max*150)}px"></i><strong>${v}</strong><span>${labels[i]}</span></article>`).join('');
  }

  function updateSamplingBias() {
    const size=$('#sampleSize'), muni=$('#sampleMunicipalities'); if(!size||!muni)return;
    const s=Number(size.value), m=Number(muni.value); setText('#sampleSizeV', s.toLocaleString('es-CO')); setText('#sampleMunicipalitiesV', m);
    setText('#biasRisk', m<4?'Alto':m<12?'Medio':'Bajo'); const map=$('#sampleMap'); if(map){map.innerHTML=Array.from({length:30},(_,i)=>`<span class="${i<m?'active':''}">${i+1}</span>`).join('');}
  }

  function updateUnitConversion() {
    if(!$('#unitMethodResult'))return; const method=$('[data-unit-method].active')?.dataset.unitMethod || 'right';
    if(method==='right'){ setText('#unitMethodResult','Correcto'); setText('#unitTotal','4.300 kg'); }
    else { setText('#unitMethodResult','Incorrecto'); setText('#unitTotal','2 + 800 + 1,5 no es válido'); }
  }

  function updateCanvasRegions() {
    const b=$('#triBase'), h=$('#triHeight'), r=$('#quarterRadius'); if(!b||!h||!r)return;
    const bv=Number(b.value), hv=Number(h.value), rv=Number(r.value); setText('#triBaseV',bv+' m'); setText('#triHeightV',hv+' m'); setText('#quarterRadiusV',rv+' m');
    setText('#triangleArea', (bv*hv/2).toFixed(1).replace('.0','')+' m²'); setText('#triangleWrong', (bv*hv).toFixed(1).replace('.0','')+' m²');
  }

  function updatePieChartVotes() {
    const a=$('#candidateA'), b=$('#candidateB'), o=$('#candidateO'); if(!a||!b||!o)return;
    let av=Number(a.value), bv=Number(b.value); if(av+bv>100){ bv=100-av; b.value=bv; } const ov=100-av-bv; o.value=ov;
    setText('#candidateAV',av+'%'); setText('#candidateBV',bv+'%'); setText('#candidateOV',ov+'%'); const pie=$('#votePie'); if(pie) pie.style.background=`conic-gradient(var(--ai-primary) 0 ${av}%, var(--ai-secondary) ${av}% ${av+bv}%, var(--ai-accent) ${av+bv}% 100%)`;
  }

  function updateSavingsTrend() {
    const m=$('#trendMonth'); if(!m)return; const month=Number(m.value); const val=100000+month*30000; setText('#trendMonthV', month); setText('#trendValue', money(val));
    const pts=[]; for(let i=1;i<=month;i++){ const x=70+(i-1)*45; const y=170-((100000+i*30000)-100000)/300000*135; pts.push(`${x},${y}`); }
    const line=$('#trendLine'), dot=$('#trendDot'); if(line) line.setAttribute('points', pts.join(' ')); if(dot&&pts.length){ const [x,y]=pts[pts.length-1].split(','); dot.setAttribute('cx',x); dot.setAttribute('cy',y); }
  }

  function updatePartsAverage() {
    const a=$('#part1'), b=$('#part2'), c=$('#part3'); if(!a||!b||!c)return; const vals=[Number(a.value),Number(b.value),Number(c.value)];
    vals.forEach((v,i)=>setText(`#part${i+1}V`,v)); const sum=vals.reduce((x,y)=>x+y,0), avg=sum/3; setText('#partsSum',sum); setText('#partsAvg',avg.toFixed(1).replace('.0',''));
    $$('#partsBars i').forEach((bar,i)=>{bar.style.height=`${Math.max(20,vals[i]*13)}px`; const sp=bar.querySelector('span'); if(sp)sp.textContent=vals[i];});
  }

  function updateBikeVenn() {
    if(!$('#bikeTotal'))return; const weights={solo:50,car:20,public:25,all:5}; let total=0;
    $$('[data-bike-region]').forEach(box=>{ if(box.checked) total+=weights[box.dataset.bikeRegion]||0; }); setText('#bikeTotal', total);
  }

  function updateTransistorGrowth() {
    const y=$('#transYear'); if(!y)return; const year=Number(y.value), doublings=Math.max(0,(year-2010)/2), count=10000*Math.pow(2,doublings); setText('#transYearV', year); setText('#doublings', doublings); setText('#transistors', count.toLocaleString('es-CO'));
    const grid=$('#transistorGrid'); if(grid){ const cells=Math.min(64,Math.max(4,Math.round(count/10000)*4)); grid.innerHTML=Array.from({length:cells},()=>'<i></i>').join(''); }
  }

  function updateGardenRedundancy() {
    const x=$('#gardenX'), y=$('#gardenY'); if(!x||!y)return; const xv=Number(x.value), yv=Number(y.value), piece=xv*yv, total=piece*4; setText('#gardenXV',xv); setText('#gardenYV',yv); setText('#gardenMult',total); setText('#gardenSum',total);
  }

  function updateTunnelFactorization() {
    const v=$('#vel'), a=$('#acc'), t=$('#timeTunnel'); if(!v||!a||!t)return; const vv=Number(v.value), av=Number(a.value), tv=Number(t.value); setText('#velV',vv+' m/s'); setText('#accV',av+' m/s²'); setText('#timeTunnelV',tv+' s');
    const original=vv*tv+0.5*av*tv*tv, factored=tv*(vv+0.5*av*tv), wrong=tv*(vv+0.5*av); setText('#tunnelOriginal',original.toFixed(1).replace('.0','')+' m'); setText('#tunnelFactored',factored.toFixed(1).replace('.0','')+' m'); setText('#tunnelWrong',wrong.toFixed(1).replace('.0','')+' m');
    const car=$('#carTunnel'); if(car) car.style.left=`${Math.min(92, (tv/30)*100)}%`;
  }

  function updateDownloadTime() {
    const fs=$('#fileSize'), sp=$('#downloadSpeed'); if(!fs||!sp)return; const f=Number(fs.value), speed=Number(sp.value), kb=f*1024, secs=kb/speed; setText('#fileSizeV',f.toFixed(1).replace('.0','')+' MB'); setText('#downloadSpeedV',speed+' KB/s'); setText('#downloadTime',secs.toFixed(1).replace('.0','')+' s'); const fill=$('#downloadFill'); if(fill) fill.style.width=`${Math.min(100,100/secs*40)}%`;
  }

  function updateRampSimilarity() {
    const b=$('#rampBase'), h=$('#rampHeight'), c=$('#rampColumn'); if(!b||!h||!c)return; const bv=Number(b.value), hv=Number(h.value), cv=Math.min(Number(c.value),bv); if(cv!==Number(c.value)) c.value=cv;
    const ch=hv*(cv/bv); setText('#rampBaseV',bv+' m'); setText('#rampHeightV',hv+' m'); setText('#rampColumnV',cv+' m'); setText('#rampColumnHeight',ch.toFixed(2).replace(/\.00$/,'')+' m');
    const x=40+(cv/bv)*320, y=190-(ch/hv)*145; const line=$('#rampColLine'), txt=$('#rampHText'); if(line){line.setAttribute('x1',x);line.setAttribute('x2',x);line.setAttribute('y2',y);} if(txt){txt.setAttribute('x',x+10);txt.setAttribute('y',y+22);txt.textContent='h='+ch.toFixed(2).replace(/\.00$/,'');}
  }

  function updateCake() {
    const b=$('#cakeBase'), h=$('#cakeHeight'), c=$('#cakeCut'); if(!b||!h||!c)return;
    const base = Number(b.value), height=Number(h.value), cut=Number(c.value), pieceH=Math.max(1,height-cut), area=15*pieceH;
    setText('#cakeBaseV', base+' cm'); setText('#cakeHeightV', height+' cm'); setText('#cakeCutV', cut+' cm'); setText('#cakeArea', area+' cm²');
    const piece=$('#cakePiece'); if(piece){ piece.style.width = `${Math.min(90, 30 + base)}%`; piece.style.height = `${Math.max(45, pieceH*6)}px`; }
  }

  function updatePolar() {
    const r=$('#polarR'), a=$('#polarA'); if(!r||!a)return;
    const rv=Number(r.value), av=Number(a.value); setText('#polarRV', rv+' km'); setText('#polarAV', av+'°');
    const rad=(av-90)*Math.PI/180, scale=1.55; const x=160+Math.cos(rad)*rv*scale, y=160+Math.sin(rad)*rv*scale;
    const dot=$('#polarDot'), needle=$('#polarNeedle'); if(dot){dot.setAttribute('cx',x); dot.setAttribute('cy',y);} if(needle){needle.setAttribute('x2',x); needle.setAttribute('y2',y);}
  }

  function moveRoute(step) {
    const positions=[0,3,9,12,2,3]; const pos=positions[step]||0; setText('#routePosition', pos+' cuadras'); const runner=$('#routeRunner'); if(runner) runner.style.left = `${(pos/12)*100}%`;
  }

  function updateGenericMath() {
    const d=$('#mData'), o=$('#mOps'), c=$('#mCheck'); if(!d||!o||!c)return;
    setText('#mDataV', d.value); setText('#mOpsV', o.value); setText('#mCheckV', c.value+'%');
    const bars=$$('#genericMathBars i'); if(bars[0])bars[0].style.height=`${Number(d.value)*18}px`; if(bars[1])bars[1].style.height=`${Number(o.value)*22}px`; if(bars[2])bars[2].style.height=`${Number(c.value)*1.4}px`;
  }

  function updateCriticalReading() {
    const evidence = $('#critEvidence');
    if (!evidence) return;
    const v = Number(evidence.value || 70);
    const out = $('#critEvidenceV');
    if (out) out.textContent = `${v}%`;
    const rows = $$('.critical-bar-row i');
    rows.forEach((bar, idx) => {
      const base = [58, 66, 74, 82][idx] || 70;
      const width = Math.max(18, Math.min(96, Math.round((base + v) / 2 + idx * 2)));
      bar.style.width = `${width}%`;
      const strong = bar.closest('.critical-bar-row')?.querySelector('strong');
      if (strong) strong.textContent = `${width}%`;
    });
    const flow = $('.critical-flow');
    if (flow) flow.style.setProperty('--crit-progress', `${Math.max(20, v)}%`);
  }

  function updatePollution() {
    const g=$('#greaseRate'); if(!g)return; const v=Number(g.value); setText('#greaseVal', v+'%'); setText('#oxygenVal', (100-v)+'%'); setText('#riskVal', v>70?'Alto':v>35?'Medio':'Bajo'); const layer=$('#greaseLayer'); if(layer) layer.style.height = `${Math.max(4,v*0.75)}%`;
  }

  function updatePhotosynthesis() {
    const co=$('#co2'), hw=$('#h2o'), sun=$('#sunToggle'); if(!co||!hw||!sun)return;
    const cv=Number(co.value), hv=Number(hw.value), active=sun.classList.contains('active'), glucose=Math.round(Math.min(cv/6,hv/6,1.5)*100*(active?1:0));
    setText('#co2Val', cv); setText('#h2oVal', hv); setText('#glucoseVal', glucose+'%');
  }

  function updateGas() {
    const t=$('#gasTemp'), m=$('#gasMoles'); if(!t||!m)return; const tv=Number(t.value), mv=Number(m.value)/10, vol=(tv/293)*4*mv;
    setText('#gasTempV', tv+' K'); setText('#gasMolesV', mv.toFixed(1)); setText('#gasVolV', vol.toFixed(1)+' L'); const piston=$('#gasPiston'); if(piston) piston.style.transform = `translateY(${-Math.min(90,vol*9)}px)`;
  }

  function updateIron() {
    const t=$('#ironTemp'); if(!t)return; const v=Number(t.value); setText('#ironTempV', v+' °C'); const marker=$('#heatMarker'); if(marker) marker.style.left = `${(v/3000)*100}%`;
    const phase = v < 1535 ? 'SÓLIDO' : v < 1600 ? 'FUSIÓN' : v < 2750 ? 'LÍQUIDO' : v < 2820 ? 'VAPORIZACIÓN' : 'GASEOSO'; setText('#ironPhase', phase);
  }


  function updateSocialSuper() {
    const ev = $('#socialEvidence');
    if (!ev) return;
    const value = Number(ev.value || 72);
    setText('#socialEvidenceV', value + '%');
    const balance = $('#socialBalance i');
    if (balance) balance.style.left = `${Math.max(4, Math.min(96, value))}%`;
    $$('.social-bar-row i').forEach((bar, idx) => {
      const base = [68, 76, 84, 72][idx] || 72;
      const width = Math.max(20, Math.min(96, Math.round((base + value) / 2 + idx * 3)));
      bar.style.width = `${width}%`;
      const strong = bar.closest('.social-bar-row')?.querySelector('strong');
      if (strong) strong.textContent = `${width}%`;
    });
    const flow = $('.social-flow');
    if (flow) flow.style.setProperty('--social-progress', `${Math.max(24, value)}%`);
  }

  function updateSocial() {
    ['socRights','socInterests','socConsequences'].forEach(id => { const el=$('#'+id); if(el) setText('#'+id+'V', el.value+'%'); });
  }

  function updateSciencePlot() {
    const a=$('#sciA'), b=$('#sciB'), e=$('#sciE'); if(!a||!b||!e)return;
    setText('#sciAV', a.value); setText('#sciBV', b.value); setText('#sciEV', e.value+'%'); const dot=$('#sciDot'), line=$('#sciLine'); const x=35+Number(a.value)*2.65, y=145-Number(b.value)*1.25; if(dot){dot.setAttribute('cx',x); dot.setAttribute('cy',y);} if(line){line.setAttribute('points',`35,145 100,${145-Number(e.value)} ${x},${y} 285,35`);}
  }

  function init() {
    initTheme();
    const themeBtn = $('#aiThemeToggle');
    if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(getTheme() === 'dark' ? 'light' : 'dark'));
    if (!hasExplicitScope) {
      renderAiStudioLanding();
      return;
    }
    loadQuestions();
    renderQuestion();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
