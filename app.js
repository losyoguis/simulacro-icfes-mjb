const EXAM_STRUCTURE = [
  {
    id: 1,
    label: "Sección 1",
    title: "Primera sesión",
    durationMinutes: 270,
    totalQuestions: 120,
    description: "Primera sesión del simulacro, organizada en Matemáticas, Lectura Crítica, Sociales y Ciudadanas y Ciencias Naturales.",
    blocks: [
      { block: 1, from: 1, to: 25, area: "Matemáticas", scored: true },
      { block: 2, from: 26, to: 66, area: "Lectura Crítica", scored: true },
      { block: 3, from: 67, to: 91, area: "Sociales y Ciudadanas", scored: true },
      { block: 4, from: 92, to: 120, area: "Ciencias Naturales", scored: true }
    ]
  },
  {
    id: 2,
    label: "Sección 2",
    title: "Segunda sesión",
    durationMinutes: 270,
    totalQuestions: 134,
    description: "Segunda sesión del simulacro, organizada en Sociales y Ciudadanas, Matemáticas, Ciencias Naturales e Inglés.",
    blocks: [
      { block: 1, from: 1, to: 28, area: "Sociales y Ciudadanas", scored: true },
      { block: 2, from: 29, to: 50, area: "Matemáticas", scored: true },
      { block: 3, from: 51, to: 79, area: "Ciencias Naturales", scored: true },
      { block: 4, from: 80, to: 134, area: "Inglés", scored: true }
    ]
  }
];

const STORAGE_KEY = "simulador_icfes_saber11_estado_v2";
const HISTORY_KEY = "simulador_icfes_saber11_historial_v2";
const STUDENT_KEY = "simulador_icfes_saber11_estudiante_v2";
const SUBMISSION_KEY = "simulador_icfes_saber11_envio_actual_v2";
const REPORT_EMAIL_SENT_PREFIX = "simulador_icfes_saber11_correo_enviado_v2_";
const REPORT_EMAIL_LOCK_PREFIX = "simulador_icfes_saber11_correo_bloqueo_v2_";
const NOTEBOOK_RETURN_KEY = "simulador_icfes_saber11_notebook_return_v2";

// Envío automático de informes por correo y registro en Google Sheets.
// URL /exec oficial entregada por la Institución Educativa Manuel J. Betancur.
// Esta versión usa un solo endpoint público para evitar intentos hacia implementaciones antiguas.
const REPORT_EMAIL_ENDPOINT = "https://script.google.com/macros/s/AKfycbw46l-QqQYo7Ah_P9cA85D2a_4miFYf70FfUK304aEfRRrw-HU0ziPfBEpM_n3vWFta/exec";
const REPORT_EMAIL_ENDPOINT_DOMAIN = "";
const REPORT_EMAIL_ENDPOINTS = [REPORT_EMAIL_ENDPOINT].filter(Boolean);
const REPORT_REGISTRATION_ENDPOINTS = REPORT_EMAIL_ENDPOINTS;
const REPORT_INSTITUTION_EMAIL = "pruebas@iemanueljbetancur.edu.co";
const REPORT_MJB_FORM_URL = "https://docs.google.com/forms/d/1Q-jAP50dzVLYEmuhgEi3TO6eDNFHCoid3lLoo8tY91E/preview";
const INSTITUTION_NAME = "Institución Educativa Manuel J. Betancur";
const INSTITUTION_SHORT_NAME = "I.E. Manuel J. Betancur";
const REPORT_AUTOSEND_ON_FINISH = true;
const REPORT_APP_VERSION = "ICFES-DIGITAL-SABER-11-IA-v15-notebook-sheets";
const DASHBOARD_ACCESS_PASSWORD = "MJB-ICFES-2026";
const DASHBOARD_TEACHER_USER = "docente";
const DASHBOARD_TEACHER_PASSWORD = "MJB-DOCENTE-2026";
const DASHBOARD_ACCESS_KEY = "icfes_dashboard_institucional_autorizado_v1";
const DASHBOARD_ACCESS_DURATION_MS = 4 * 60 * 60 * 1000;
const GOOGLE_SITES_FULLSCREEN_NOTICE_KEY = "simulador_icfes_google_sites_fullscreen_notice_v1";
const SECURITY_FINAL_ALERT_SOUND_PREFIX = "simulador_icfes_saber11_alerta_seguridad_sonido_v1_";


const app = document.getElementById("app");
const homeBtn = document.getElementById("homeBtn");
const logoutBtn = document.getElementById("logoutBtn");
const themeBtn = document.getElementById("themeBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const tipsBtn = document.getElementById("tipsBtn");
const instructionsBtn = document.getElementById("instructionsBtn");
const dashboardBtn = document.getElementById("dashboardBtn");
const studentDashboardBtn = document.getElementById("studentDashboardBtn");
const teacherDashboardBtn = document.getElementById("teacherDashboardBtn");
const consultDataMenu = document.getElementById("consultDataMenu");
const consultDataBtn = document.getElementById("consultDataBtn");
const consultDataDropdown = document.getElementById("consultDataDropdown");

let timerInterval = null;
let state = {
  screen: "home",
  mode: "simulacro",
  sessionId: null,
  scope: null,
  navNumbers: [],
  availableNumbers: [],
  currentNumber: null,
  answers: {},
  marked: {},
  startedAt: null,
  finishedAt: null,
  student: null,
  remainingSeconds: 0,
  finished: false,
  secureExam: null,
  timerWarningsShown: {}
};

let reportEmailInProgress = false;
let lastZoomInteractionAt = 0;

const ACTIVE_WORK_MODE = "simulacro";
const ADMIN_MODE_CONFIG_KEY = "simulador_icfes_saber11_admin_modo_trabajo_v1";
const ADMIN_MODE_SIMULACRO_ONLY = "simulacro-only";
const ADMIN_MODE_TRAINING_AND_SIMULACRO = "training-and-simulacro";
const TRAINING_WORK_MODES = new Set(["practica", "ai-studio", "entrenamiento"]);
const WORK_MODE_LABELS = {
  practica: "Entrenamiento con Notebook",
  "ai-studio": "Entrenamiento con AI Studio",
  entrenamiento: "Práctica sin tiempo",
  simulacro: "Simulacro"
};
const SECURE_EXAM_MAX_WARNINGS = 3;
const SECURE_EXAM_COOLDOWN_MS = 1800;
const SECURE_EXAM_FULLSCREEN_RESTORE_DELAY_MS = 350;
const SECURE_EXAM_ZOOM_IGNORE_MS = 2500;
const TIMER_WARNING_SECONDS = new Set([30 * 60, 10 * 60, 5 * 60, 60]);

function getAdminWorkModeConfig() {
  return storageGet(ADMIN_MODE_CONFIG_KEY, ADMIN_MODE_SIMULACRO_ONLY) === ADMIN_MODE_TRAINING_AND_SIMULACRO
    ? ADMIN_MODE_TRAINING_AND_SIMULACRO
    : ADMIN_MODE_SIMULACRO_ONLY;
}

function isTrainingModeEnabled() {
  return getAdminWorkModeConfig() === ADMIN_MODE_TRAINING_AND_SIMULACRO;
}

function getAdminModeConfigLabel() {
  return isTrainingModeEnabled()
    ? "Entrenamiento + Simulacro"
    : "Solo Simulacro";
}

function normalizeWorkMode(mode = state.mode) {
  const value = String(mode || "").trim();
  if (value === ACTIVE_WORK_MODE) return ACTIVE_WORK_MODE;
  if (isTrainingModeEnabled() && TRAINING_WORK_MODES.has(value)) return value;
  return ACTIVE_WORK_MODE;
}

function enforceSimulacroMode() {
  state.mode = normalizeWorkMode(state.mode);
  return state.mode;
}

function setAdminWorkModeConfig(value) {
  const next = value === ADMIN_MODE_TRAINING_AND_SIMULACRO
    ? ADMIN_MODE_TRAINING_AND_SIMULACRO
    : ADMIN_MODE_SIMULACRO_ONLY;
  storageSet(ADMIN_MODE_CONFIG_KEY, next);
  state.mode = normalizeWorkMode(state.mode);
  if (!isTrainingModeEnabled()) state.mode = ACTIVE_WORK_MODE;
  updateModeSelectUi();
  updateAdminModeBadges();
}

function createSecureExamState() {
  return {
    enabled: true,
    warnings: 0,
    maxWarnings: SECURE_EXAM_MAX_WARNINGS,
    tabSwitches: 0,
    windowBlur: 0,
    fullscreenExits: 0,
    shortcutAttempts: 0,
    totalAwayMs: 0,
    awayStartedAt: null,
    lastRecordedAt: 0,
    fullscreenRequested: false,
    fullscreenAvailable: Boolean(document.fullscreenEnabled),
    fullscreenBlocked: false,
    autoFinished: false,
    autoFinishReason: "",
    status: "normal",
    actionApplied: "Sin novedades",
    events: []
  };
}

function ensureSecureExamState() {
  if (!state.secureExam || typeof state.secureExam !== "object") {
    state.secureExam = createSecureExamState();
  }
  state.secureExam.maxWarnings = SECURE_EXAM_MAX_WARNINGS;
  if (!Array.isArray(state.secureExam.events)) state.secureExam.events = [];
  if (typeof state.secureExam.totalAwayMs !== "number") state.secureExam.totalAwayMs = 0;
  if (typeof state.secureExam.tabSwitches !== "number") state.secureExam.tabSwitches = 0;
  if (typeof state.secureExam.windowBlur !== "number") state.secureExam.windowBlur = 0;
  if (typeof state.secureExam.fullscreenExits !== "number") state.secureExam.fullscreenExits = 0;
  if (typeof state.secureExam.shortcutAttempts !== "number") state.secureExam.shortcutAttempts = 0;
  updateSecureExamStatus(state.secureExam);
  return state.secureExam;
}

function shouldMonitorSecureExam() {
  return state.screen === "exam"
    && !state.finished
    && state.mode === ACTIVE_WORK_MODE
    && state.secureExam
    && state.secureExam.enabled !== false;
}

function updateSecureExamStatus(secure = ensureSecureExamState()) {
  const warnings = Number(secure.warnings) || 0;
  if (secure.autoFinished) {
    secure.status = "finalizado";
    secure.actionApplied = "Finalizado automáticamente";
  } else if (warnings >= SECURE_EXAM_MAX_WARNINGS) {
    secure.status = "sospechoso";
    secure.actionApplied = "Revisión docente obligatoria";
  } else if (warnings > 0) {
    secure.status = "advertencias";
    secure.actionApplied = "Advertencias registradas";
  } else {
    secure.status = "normal";
    secure.actionApplied = "Sin novedades";
  }
  return secure.status;
}

function getSecureExamStatusLabel(status) {
  return {
    normal: "Normal",
    advertencias: "Con advertencias",
    sospechoso: "Sospechoso",
    finalizado: "Finalizado automáticamente"
  }[status] || "Normal";
}

function getSecureExamEventLabel(type) {
  return {
    tab: "Cambio de pestaña o ventana",
    blur: "Pérdida de foco de la ventana",
    fullscreen: "Salida de pantalla completa",
    shortcut: "Atajo bloqueado",
    system: "Registro del sistema"
  }[type] || "Evento de seguridad";
}

function noteSecureZoomInteraction() {
  lastZoomInteractionAt = Date.now();
}

function isRecentSecureZoomInteraction(extraMs = SECURE_EXAM_ZOOM_IGNORE_MS) {
  return Date.now() - Number(lastZoomInteractionAt || 0) <= extraMs;
}

function isBrowserZoomShortcut(event) {
  if (!event || !(event.ctrlKey || event.metaKey)) return false;
  const key = String(event.key || "").toLowerCase();
  const code = String(event.code || "").toLowerCase();
  return ["+", "=", "-", "_", "0"].includes(key)
    || ["equal", "minus", "digit0", "numpadadd", "numpadsubtract", "numpad0"].includes(code);
}

function shouldIgnoreSecurityEventForZoom(type) {
  return ["tab", "blur", "fullscreen"].includes(type) && isRecentSecureZoomInteraction();
}

function handleSecureExamWheel(event) {
  if (!shouldMonitorSecureExam()) return;
  if (event && event.ctrlKey) noteSecureZoomInteraction();
}

function handleSecureExamGesture() {
  if (!shouldMonitorSecureExam()) return;
  noteSecureZoomInteraction();
}

function startSecureAwayTimer() {
  const secure = ensureSecureExamState();
  if (!secure.awayStartedAt) secure.awayStartedAt = Date.now();
}

function stopSecureAwayTimer() {
  if (!state.secureExam) return;
  const secure = ensureSecureExamState();
  if (secure.awayStartedAt) {
    secure.totalAwayMs += Math.max(0, Date.now() - secure.awayStartedAt);
    secure.awayStartedAt = null;
    saveState();
  }
}

function getSecureTotalAwayMs(secure = ensureSecureExamState()) {
  const activeAway = secure.awayStartedAt ? Math.max(0, Date.now() - secure.awayStartedAt) : 0;
  return Math.max(0, Number(secure.totalAwayMs || 0) + activeAway);
}

function requestSecureExamFullscreen() {
  const secure = ensureSecureExamState();
  const target = document.documentElement;
  if (isFullscreenActive()) {
    secure.fullscreenRequested = true;
    secure.fullscreenBlocked = false;
    updateFullscreenControls();
    return Promise.resolve(true);
  }
  if (!target || !isFullscreenEnabled()) {
    secure.fullscreenAvailable = false;
    secure.fullscreenBlocked = true;
    secure.events.push({
      at: new Date().toISOString(),
      type: "system",
      description: "El navegador o el contenedor no permitió activar pantalla completa. Si está incrustado en Google Sites, se debe usar un iframe con allowfullscreen o abrir en pestaña nueva."
    });
    saveState();
    updateSecureExamBadge();
    updateFullscreenControls();
    return Promise.resolve(false);
  }

  secure.fullscreenRequested = true;
  secure.fullscreenAvailable = true;
  return requestNativeFullscreen(target)
    .then(ok => {
      secure.fullscreenBlocked = !ok;
      if (!ok) {
        secure.events.push({
          at: new Date().toISOString(),
          type: "system",
          description: "El estudiante debe permitir pantalla completa para presentar en modo seguro."
        });
      }
      saveState();
      updateSecureExamBadge();
      updateFullscreenControls();
      return ok;
    });
}

function shouldRestoreSecureExamFullscreen() {
  return shouldMonitorSecureExam()
    && ensureSecureExamState().fullscreenRequested
    && !isFullscreenActive()
    && document.visibilityState !== "hidden";
}

function restoreSecureExamFullscreen() {
  if (!shouldRestoreSecureExamFullscreen()) return;
  requestSecureExamFullscreen();
}

function promptSecureFullscreenRestore() {
  if (!shouldRestoreSecureExamFullscreen()) return;
  if (document.querySelector(".dialog-overlay")) return;
  openActionDialog({
    title: "Volver a pantalla completa",
    message: "Para continuar el simulacro debes regresar al modo pantalla completa. Esta acción mantiene activa la seguridad de la prueba.",
    confirmText: "Volver a pantalla completa",
    cancelText: "Volver a pantalla completa",
    danger: true,
    onConfirm: restoreSecureExamFullscreen,
    onCancel: restoreSecureExamFullscreen
  });
}

function recordSecureExamEvent(type, description, options = {}) {
  if (!shouldMonitorSecureExam()) return;
  if (shouldIgnoreSecurityEventForZoom(type)) {
    const secure = ensureSecureExamState();
    secure.events.push({
      at: new Date().toISOString(),
      type: "system",
      description: "Zoom permitido: no se contabilizó como salida de la plataforma."
    });
    secure.events = secure.events.slice(-20);
    saveState();
    updateSecureExamBadge();
    return;
  }
  if (!options.force && document.querySelector(".dialog-overlay")) return;

  const secure = ensureSecureExamState();
  const now = Date.now();
  if (!options.force && now - Number(secure.lastRecordedAt || 0) < SECURE_EXAM_COOLDOWN_MS) return;
  secure.lastRecordedAt = now;

  if (type === "tab") secure.tabSwitches += 1;
  else if (type === "blur") secure.windowBlur += 1;
  else if (type === "fullscreen") secure.fullscreenExits += 1;
  else if (type === "shortcut") secure.shortcutAttempts += 1;

  if (type !== "shortcut" && type !== "system") {
    secure.warnings += 1;
  }

  secure.events.push({
    at: new Date().toISOString(),
    type,
    description: description || getSecureExamEventLabel(type)
  });
  secure.events = secure.events.slice(-20);
  updateSecureExamStatus(secure);
  saveState();
  updateSecureExamBadge();

  if (secure.warnings >= SECURE_EXAM_MAX_WARNINGS && !secure.autoFinished) {
    secure.autoFinished = true;
    secure.autoFinishReason = "El estudiante superó el límite de salidas o cambios de pantalla permitidos durante el simulacro.";
    updateSecureExamStatus(secure);
    saveState();
    window.setTimeout(() => {
      if (state.screen === "exam" && !state.finished) {
        clearTimer();
        completeAttempt();
      }
    }, 300);
    return;
  }

  showSecureExamWarning(secure);
}

function showSecureExamWarning(secure) {
  if (!shouldMonitorSecureExam()) return;
  const remaining = Math.max(SECURE_EXAM_MAX_WARNINGS - Number(secure.warnings || 0), 0);
  const restoreFullscreen = () => {
    if (shouldRestoreSecureExamFullscreen()) requestSecureExamFullscreen();
  };
  openActionDialog({
    title: "Advertencia de seguridad del simulacro",
    message: `Se detectó una salida del simulacro o cambio de pantalla. Advertencia ${secure.warnings} de ${SECURE_EXAM_MAX_WARNINGS}. ${remaining > 0 ? `Si ocurre ${remaining} vez/veces más, el intento será finalizado automáticamente.` : "El intento será revisado por el docente."} Para continuar debes volver a pantalla completa.`,
    confirmText: "Entendido y volver a pantalla completa",
    cancelText: "Volver a pantalla completa",
    danger: true,
    onConfirm: restoreFullscreen,
    onCancel: restoreFullscreen
  });
}

function updateSecureExamBadge() {
  const badge = document.getElementById("secureExamBadge");
  if (!badge || !state.secureExam) return;
  const secure = ensureSecureExamState();
  badge.dataset.status = secure.status;
  badge.innerHTML = `🔒 Modo seguro: <strong>${getSecureExamStatusLabel(secure.status)}</strong> · Advertencias: ${secure.warnings}/${SECURE_EXAM_MAX_WARNINGS}`;
}

function handleSecureExamVisibilityChange() {
  if (document.visibilityState === "hidden") {
    if (shouldMonitorSecureExam() && !isRecentSecureZoomInteraction()) {
      startSecureAwayTimer();
      recordSecureExamEvent("tab", "El estudiante cambió de pestaña, minimizó la ventana o salió de la vista del simulacro.");
    }
    saveState();
  } else {
    stopSecureAwayTimer();
    updateSecureExamBadge();
    window.setTimeout(
      isRecentSecureZoomInteraction() ? restoreSecureExamFullscreen : promptSecureFullscreenRestore,
      SECURE_EXAM_FULLSCREEN_RESTORE_DELAY_MS
    );
  }
}

function handleSecureExamBlur() {
  if (!shouldMonitorSecureExam()) return;
  if (document.querySelector(".dialog-overlay")) return;
  if (isRecentSecureZoomInteraction()) return;
  startSecureAwayTimer();
  recordSecureExamEvent("blur", "La ventana del simulacro perdió el foco durante la presentación.");
}

function handleSecureExamFocus() {
  stopSecureAwayTimer();
  updateSecureExamBadge();
  window.setTimeout(
    isRecentSecureZoomInteraction() ? restoreSecureExamFullscreen : promptSecureFullscreenRestore,
    SECURE_EXAM_FULLSCREEN_RESTORE_DELAY_MS
  );
}

function handleSecureExamFullscreenChange() {
  updateFullscreenControls();
  if (!shouldMonitorSecureExam()) return;
  const secure = ensureSecureExamState();
  if (isFullscreenActive()) {
    secure.fullscreenBlocked = false;
    updateSecureExamBadge();
    saveState();
    return;
  }
  if (secure.fullscreenRequested && !isFullscreenActive()) {
    if (isRecentSecureZoomInteraction()) {
      secure.events.push({
        at: new Date().toISOString(),
        type: "system",
        description: "Zoom permitido dentro de la prueba: no se registró como salida de pantalla completa."
      });
      secure.events = secure.events.slice(-20);
      saveState();
      updateSecureExamBadge();
      window.setTimeout(restoreSecureExamFullscreen, SECURE_EXAM_FULLSCREEN_RESTORE_DELAY_MS);
      return;
    }
    recordSecureExamEvent("fullscreen", "El estudiante salió de pantalla completa durante el simulacro.", { force: true });
    window.setTimeout(promptSecureFullscreenRestore, SECURE_EXAM_FULLSCREEN_RESTORE_DELAY_MS);
  }
}

function handleSecureExamKeydown(event) {
  if (!shouldMonitorSecureExam()) return;
  if (isBrowserZoomShortcut(event)) {
    noteSecureZoomInteraction();
    return;
  }
  const key = String(event.key || "").toLowerCase();
  const blocked = event.key === "F12"
    || (event.ctrlKey && ["c", "v", "x", "u", "s", "p", "n", "t", "w", "r"].includes(key))
    || (event.metaKey && ["c", "v", "x", "u", "s", "p", "n", "t", "w", "r"].includes(key));
  if (!blocked) return;
  event.preventDefault();
  event.stopPropagation();
  recordSecureExamEvent("shortcut", `Se bloqueó el atajo ${event.ctrlKey ? "Ctrl" : event.metaKey ? "Cmd" : ""}${event.ctrlKey || event.metaKey ? "+" : ""}${event.key}.`);
}

function handleSecureExamContextMenu(event) {
  if (!shouldMonitorSecureExam()) return;
  event.preventDefault();
}


function openExamInstructionsDialog(onConfirm) {
  closeActionDialog();
  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay exam-instructions-overlay";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card exam-instructions-card" role="dialog" aria-modal="true" aria-labelledby="examInstructionsTitle">
      <p class="eyebrow">Instrucciones oficiales</p>
      <h2 id="examInstructionsTitle">Instrucciones para presentar el Simulacro ICFES</h2>
      <div class="exam-instructions-content">
        <ol>
          <li>Ingresa con tu nombre completo y apellidos, correo institucional y grupo correspondiente.</li>
          <li>Cuando inicies la prueba, permanece siempre en la pantalla del simulacro.</li>
          <li>No cambies de pestaña, no abras otras ventanas y no salgas de pantalla completa.</li>
          <li>Si sales del simulacro, el sistema registrará la advertencia en tu informe final.</li>
          <li>Después de varias salidas, la prueba puede finalizarse automáticamente.</li>
          <li>Lee cada pregunta con calma antes de responder.</li>
          <li>Revisa que hayas marcado correctamente tus respuestas antes de enviar.</li>
          <li>Cuando termines toda la prueba, debes hacer clic en el botón <strong>FINALIZAR INTENTO</strong>. Este paso es obligatorio para que el sistema guarde tus respuestas y genere el informe.</li>
          <li>Después de finalizar el intento, espera a que el sistema genere y envíe tu informe.</li>
          <li>Realiza la prueba en silencio y de manera individual.</li>
          <li>Cualquier dificultad técnica debe ser informada al docente.</li>
          <li>A partir del viernes, esta plataforma se activará en <strong>Modo Entrenamiento</strong> para que puedas prepararte durante las vacaciones, aprovechando las herramientas de inteligencia artificial de <strong>Notebook</strong> e <strong>IA Studio</strong>.</li>
          <li>La I.E. Manuel J. Betancur te desea muchos éxitos en este proceso.</li>
          <li>No compitas con nadie: esta prueba es tu oportunidad de superarte a ti mismo.</li>
        </ol>
      </div>
      <div class="dialog-actions">
        <button class="primary-btn" type="button" data-instructions-confirm>Continuar</button>
      </div>
    </section>
  `;
  overlay.addEventListener("click", event => {
    if (event.target.closest("[data-instructions-confirm]")) {
      closeActionDialog();
      if (typeof onConfirm === "function") onConfirm();
    }
  });
  document.body.appendChild(overlay);
  const confirmBtn = overlay.querySelector("[data-instructions-confirm]");
  if (confirmBtn) confirmBtn.focus({ preventScroll: true });
}

function openSecureExamInfoDialog(onConfirm) {
  closeActionDialog();
  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay secure-info-overlay";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card secure-info-card" role="dialog" aria-modal="true" aria-labelledby="secureInfoTitle">
      <p class="eyebrow">Modo simulacro seguro</p>
      <h2 id="secureInfoTitle">Antes de iniciar, ten presente:</h2>
      <div class="secure-info-content">
        <p>Durante el simulacro la plataforma activará controles de seguridad para cuidar la seriedad de la prueba.</p>
        <ul>
          <li>Se solicitará pantalla completa al iniciar cada sesión.</li>
          <li>Si cambias de pestaña, ventana o sales de pantalla completa, quedará registrado.</li>
          <li>Cuando vuelvas al simulacro, la plataforma te pedirá regresar nuevamente a pantalla completa para continuar.</li>
          <li>Después de ${SECURE_EXAM_MAX_WARNINGS} advertencias, el intento se finalizará automáticamente.</li>
          <li>El informe final mostrará el estado del intento: normal, con advertencias o sospechoso.</li>
        </ul>
      </div>
      <div class="dialog-actions">
        <button class="primary-btn" type="button" data-secure-confirm>Entendido, continuar</button>
      </div>
    </section>
  `;
  overlay.addEventListener("click", event => {
    if (event.target.closest("[data-secure-confirm]")) {
      closeActionDialog();
      if (typeof onConfirm === "function") onConfirm();
    }
  });
  document.body.appendChild(overlay);
  const confirmBtn = overlay.querySelector("[data-secure-confirm]");
  if (confirmBtn) confirmBtn.focus({ preventScroll: true });
}

function renderSecureExamInlineStatus() {
  const secure = ensureSecureExamState();
  const away = formatSeconds(Math.round(getSecureTotalAwayMs(secure) / 1000));
  return `
    <div class="secure-exam-banner" id="secureExamBanner">
      <div id="secureExamBadge" class="secure-exam-badge" data-status="${escapeAttr(secure.status)}">🔒 Modo seguro: <strong>${escapeHtml(getSecureExamStatusLabel(secure.status))}</strong> · Advertencias: ${secure.warnings}/${SECURE_EXAM_MAX_WARNINGS}</div>
      <span>Salidas: ${secure.tabSwitches + secure.windowBlur + secure.fullscreenExits} · Tiempo fuera: ${away}</span>
    </div>
  `;
}

function buildSecurityReportData() {
  const secure = ensureSecureExamState();
  const totalAwaySeconds = Math.round(getSecureTotalAwayMs(secure) / 1000);
  const totalExits = Number(secure.tabSwitches || 0) + Number(secure.windowBlur || 0) + Number(secure.fullscreenExits || 0);
  updateSecureExamStatus(secure);
  return {
    enabled: secure.enabled !== false,
    status: secure.status,
    statusLabel: getSecureExamStatusLabel(secure.status),
    warnings: Number(secure.warnings || 0),
    maxWarnings: SECURE_EXAM_MAX_WARNINGS,
    tabSwitches: Number(secure.tabSwitches || 0),
    windowBlur: Number(secure.windowBlur || 0),
    fullscreenExits: Number(secure.fullscreenExits || 0),
    shortcutAttempts: Number(secure.shortcutAttempts || 0),
    totalExits,
    totalAwaySeconds,
    totalAwayLabel: formatSeconds(totalAwaySeconds),
    actionApplied: secure.actionApplied || "Sin novedades",
    autoFinished: Boolean(secure.autoFinished),
    autoFinishReason: secure.autoFinishReason || "",
    fullscreenBlocked: Boolean(secure.fullscreenBlocked),
    events: Array.isArray(secure.events) ? secure.events.slice(-8) : []
  };
}

function renderSecurityReport(result) {
  const security = result.security || buildSecurityReportData();
  const eventRows = (security.events || []).slice(-5).reverse().map(event => `
    <tr>
      <td>${escapeHtml(formatDateTime(event.at))}</td>
      <td>${escapeHtml(getSecureExamEventLabel(event.type))}</td>
      <td>${escapeHtml(event.description || "Registro de seguridad")}</td>
    </tr>
  `).join("");
  return `
    <section class="security-report-card" aria-label="Seguridad del simulacro">
      <div class="security-report-head">
        <div>
          <p class="eyebrow">Seguridad del simulacro</p>
          <h3>Estado del intento: ${escapeHtml(security.statusLabel)}</h3>
        </div>
        <span class="security-status-pill" data-status="${escapeAttr(security.status)}">${escapeHtml(security.statusLabel)}</span>
      </div>
      <div class="security-report-grid">
        <div><span>Advertencias</span><strong>${security.warnings}/${security.maxWarnings}</strong></div>
        <div><span>Cambios de pestaña o ventana</span><strong>${security.tabSwitches}</strong></div>
        <div><span>Pérdidas de foco</span><strong>${security.windowBlur}</strong></div>
        <div><span>Salidas de pantalla completa</span><strong>${security.fullscreenExits}</strong></div>
        <div><span>Tiempo fuera del simulacro</span><strong>${escapeHtml(security.totalAwayLabel)}</strong></div>
        <div><span>Acción aplicada</span><strong>${escapeHtml(security.actionApplied)}</strong></div>
      </div>
      ${security.autoFinishReason ? `<p class="security-warning-note">${escapeHtml(security.autoFinishReason)}</p>` : ""}
      <div class="table-wrap security-events-wrap">
        <table class="structure-table">
          <thead><tr><th>Fecha</th><th>Evento</th><th>Detalle</th></tr></thead>
          <tbody>${eventRows || `<tr><td colspan="3">No se registraron salidas ni cambios de pantalla durante el simulacro.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
  `;
}


function isSecurityFinalAlertNeeded(result) {
  const security = result && result.security ? result.security : null;
  if (!security) return false;
  return Boolean(
    security.autoFinished
    || security.status === "finalizado"
    || Number(security.warnings || 0) >= SECURE_EXAM_MAX_WARNINGS
  );
}

function getSecurityFinalAlertTitle() {
  return "Intento finalizado por seguridad";
}

function getSecurityFinalAlertMessage(result) {
  const security = result && result.security ? result.security : {};
  const warnings = Number(security.warnings || 0);
  const maxWarnings = Number(security.maxWarnings || SECURE_EXAM_MAX_WARNINGS);
  const exits = Number(security.totalExits || 0);
  return `Recuerda: no estaba permitido salir de la plataforma ni abandonar la pantalla completa durante el simulacro. El sistema registró ${warnings}/${maxWarnings} advertencias y ${exits} salida(s) o cambio(s) de pantalla. Este intento quedó marcado para revisión del docente.`;
}

function renderSecurityFinalAlert(result) {
  if (!isSecurityFinalAlertNeeded(result)) return "";
  const security = result.security || {};
  return `
    <section class="security-final-alert" role="alert" aria-live="assertive">
      <div class="security-final-alert-icon" aria-hidden="true">⚠️</div>
      <div class="security-final-alert-body">
        <p class="security-final-alert-kicker">Alerta de seguridad</p>
        <h3>${escapeHtml(getSecurityFinalAlertTitle())}</h3>
        <p>${escapeHtml(getSecurityFinalAlertMessage(result))}</p>
        <div class="security-final-alert-meta">
          <span>Advertencias: <strong>${Number(security.warnings || 0)}/${Number(security.maxWarnings || SECURE_EXAM_MAX_WARNINGS)}</strong></span>
          <span>Salidas registradas: <strong>${Number(security.totalExits || 0)}</strong></span>
          <span>Estado: <strong>${escapeHtml(security.statusLabel || "Finalizado automáticamente")}</strong></span>
        </div>
      </div>
      <button class="security-alert-action-btn" type="button" id="securityNewAttemptBtn">Nuevo Intento</button>
    </section>
  `;
}

function shouldShowDetailedAnswers(result) {
  return !isSecurityFinalAlertNeeded(result);
}

function renderDetailedReviewSection(result, review) {
  if (!shouldShowDetailedAnswers(result)) {
    return `
      <section class="review-locked-card" aria-label="Revisión bloqueada por seguridad">
        <div class="review-locked-icon" aria-hidden="true">🔒</div>
        <div>
          <p class="eyebrow">Revisión bloqueada</p>
          <h3>Las respuestas no se muestran en este intento</h3>
          <p>El intento fue finalizado automáticamente por superar el límite de advertencias de seguridad. Por esa razón, la revisión detallada, la respuesta correcta y la explicación de cada pregunta quedan reservadas para revisión del docente.</p>
        </div>
      </section>
    `;
  }
  return `
    <h3 style="margin-top:24px">Revisión detallada por pregunta</h3>
    <p class="footer-note">Esta sección se conserva en pantalla para revisión pedagógica. El PDF descargable contiene el resumen general y los gráficos, sin la revisión detallada por pregunta. El backend de Google Sheets consolida los resultados para el informe institucional de la I.E. Manuel J. Betancur.</p>
    <div class="review-list">${review}</div>
  `;
}

function playSecurityWarningTone() {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return;
  try {
    const audioCtx = new AudioContextCtor();
    const now = audioCtx.currentTime;
    const sequence = [0, 0.22, 0.44];
    sequence.forEach((offset, index) => {
      const oscillator = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(index === 1 ? 620 : 780, now + offset);
      gain.gain.setValueAtTime(0.001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.22, now + offset + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);
      oscillator.connect(gain);
      gain.connect(audioCtx.destination);
      oscillator.start(now + offset);
      oscillator.stop(now + offset + 0.2);
    });
    window.setTimeout(() => audioCtx.close().catch(() => {}), 1200);
  } catch (error) {
    console.warn("No fue posible reproducir el tono de alerta.", error);
  }
}

function speakSecurityFinalAlert(result) {
  if (!("speechSynthesis" in window)) return;
  try {
    const text = `${getSecurityFinalAlertTitle()}. ${getSecurityFinalAlertMessage(result)}`;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-CO";
    utterance.rate = 0.92;
    utterance.pitch = 0.95;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn("No fue posible reproducir la voz de alerta.", error);
  }
}

function playSecurityFinalAlertSound(result) {
  if (!isSecurityFinalAlertNeeded(result)) return;
  playSecurityWarningTone();
  window.setTimeout(() => speakSecurityFinalAlert(result), 420);
}

function playSecurityFinalAlertIfNeeded(result, force = false) {
  if (!isSecurityFinalAlertNeeded(result)) return;
  const key = `${SECURITY_FINAL_ALERT_SOUND_PREFIX}${result.submissionId || "actual"}`;
  if (!force && storageGet(key)) return;
  storageSet(key, "1");
  window.setTimeout(() => playSecurityFinalAlertSound(result), 650);
}


// Estado de recursos Notebook importados desde Google Sheets para marcar en el panel
// las preguntas que ya tienen multimedia completa: mapa mental, video, audio, presentación e infografía.
const NOTEBOOK_PANEL_CONFIG = {
  spreadsheetId: "1S1T77UJpP678_-gRLFhJNjeK4YcYIt5twt7X7okqiL8",
  enabled: true,
  resourceTypes: [
    { key: "mindmap", sheetLabel: "Mapa Mental", order: "1" },
    { key: "video", sheetLabel: "Video", order: "2" },
    { key: "audio", sheetLabel: "Audio", order: "3" },
    { key: "presentation", sheetLabel: "Presentación", order: "4" },
    { key: "infographic", sheetLabel: "Infografía", order: "5" }
  ],
  validAreas: {
    1: ["Matemáticas", "Lectura Crítica", "Sociales y Ciudadanas", "Ciencias Naturales"],
    2: ["Sociales y Ciudadanas", "Matemáticas", "Ciencias Naturales", "Inglés"]
  }
};

const NOTEBOOK_PANEL_CACHE = {
  loaded: false,
  loading: false,
  error: null,
  resources: {
    // Pregunta modelo ya integrada manualmente en Notebook.
    "1-1": { mindmap: true, video: true, audio: true, presentation: true, infographic: true }
  },
  lastLoadedAt: null,
  promise: null
};

function normalizeNotebookPanelText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getNotebookPanelCellValue(cell) {
  if (!cell) return "";
  const value = cell.f !== undefined && cell.f !== null ? cell.f : cell.v;
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function getNotebookPanelSessionFromPrefix(prefix) {
  const match = String(prefix || "").match(/Secci[oó]n\s*(\d+)/i);
  return match ? Number(match[1]) : null;
}

function getNotebookPanelAreaFromPrefix(prefix) {
  return String(prefix || "").replace(/Secci[oó]n\s*\d+\s*-\s*/i, "").trim();
}

function isNotebookPanelAreaAllowed(session, area) {
  const allowed = NOTEBOOK_PANEL_CONFIG.validAreas[Number(session)] || [];
  const normalizedArea = normalizeNotebookPanelText(area);
  return allowed.some(item => normalizeNotebookPanelText(item) === normalizedArea);
}

function loadNotebookPanelResources(force = false) {
  if (!NOTEBOOK_PANEL_CONFIG.enabled) return Promise.resolve(NOTEBOOK_PANEL_CACHE.resources);
  if (NOTEBOOK_PANEL_CACHE.loaded && !force) return Promise.resolve(NOTEBOOK_PANEL_CACHE.resources);
  if (NOTEBOOK_PANEL_CACHE.loading && NOTEBOOK_PANEL_CACHE.promise) return NOTEBOOK_PANEL_CACHE.promise;

  NOTEBOOK_PANEL_CACHE.loading = true;
  NOTEBOOK_PANEL_CACHE.error = null;

  NOTEBOOK_PANEL_CACHE.promise = new Promise((resolve, reject) => {
    const callbackName = `notebookPanelCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();
      NOTEBOOK_PANEL_CACHE.loading = false;
      NOTEBOOK_PANEL_CACHE.error = "No fue posible cargar el Google Sheets institucional para marcar Notebook completo.";
      reject(new Error(NOTEBOOK_PANEL_CACHE.error));
    }, 14000);

    function cleanup() {
      window.clearTimeout(timeout);
      try { delete window[callbackName]; } catch (error) { window[callbackName] = undefined; }
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = response => {
      try {
        const dynamicResources = buildNotebookPanelResourcesFromGviz(response);
        NOTEBOOK_PANEL_CACHE.resources = {
          ...NOTEBOOK_PANEL_CACHE.resources,
          ...dynamicResources
        };
        NOTEBOOK_PANEL_CACHE.loaded = true;
        NOTEBOOK_PANEL_CACHE.loading = false;
        NOTEBOOK_PANEL_CACHE.error = null;
        NOTEBOOK_PANEL_CACHE.lastLoadedAt = new Date().toISOString();
        cleanup();
        resolve(NOTEBOOK_PANEL_CACHE.resources);
      } catch (error) {
        cleanup();
        NOTEBOOK_PANEL_CACHE.loading = false;
        NOTEBOOK_PANEL_CACHE.error = "El Sheets cargó, pero no se pudo interpretar para el panel Notebook.";
        reject(error);
      }
    };

    script.onerror = () => {
      cleanup();
      NOTEBOOK_PANEL_CACHE.loading = false;
      NOTEBOOK_PANEL_CACHE.error = "No se pudo conectar con el Google Sheets institucional para el panel Notebook.";
      reject(new Error(NOTEBOOK_PANEL_CACHE.error));
    };

    const base = `https://docs.google.com/spreadsheets/d/${NOTEBOOK_PANEL_CONFIG.spreadsheetId}/gviz/tq`;
    const tqx = `out:json;responseHandler:${callbackName}`;
    script.src = `${base}?tqx=${encodeURIComponent(tqx)}&headers=1&cb=${Date.now()}`;
    document.head.appendChild(script);
  });

  return NOTEBOOK_PANEL_CACHE.promise;
}

function buildNotebookPanelResourcesFromGviz(response) {
  const table = response && response.table ? response.table : null;
  if (!table || !Array.isArray(table.cols) || !Array.isArray(table.rows)) return {};

  const labels = table.cols.map(col => String(col.label || col.id || "").trim());
  const normalizedLabels = labels.map(label => normalizeNotebookPanelText(label));
  const resources = {};
  const numberColumns = labels
    .map((label, index) => ({ label, index }))
    .filter(item => /\|\s*N[uú]mero de pregunta/i.test(item.label));

  table.rows.forEach(row => {
    const cells = row.c || [];

    numberColumns.forEach(numberColumn => {
      const prefix = numberColumn.label.split("|")[0].trim();
      const session = getNotebookPanelSessionFromPrefix(prefix);
      const area = getNotebookPanelAreaFromPrefix(prefix);
      const questionNumberRaw = getNotebookPanelCellValue(cells[numberColumn.index]);
      const questionNumber = Number(String(questionNumberRaw).replace(/[^0-9]/g, ""));

      if (!session || !questionNumber || !isNotebookPanelAreaAllowed(session, area)) return;

      const questionKey = `${session}-${questionNumber}`;
      if (!resources[questionKey]) resources[questionKey] = {};

      NOTEBOOK_PANEL_CONFIG.resourceTypes.forEach(resourceMeta => {
        const expectedLabel = normalizeNotebookPanelText(`${prefix} | ${resourceMeta.order}. ${resourceMeta.sheetLabel}`);
        let resourceIndex = normalizedLabels.indexOf(expectedLabel);
        if (resourceIndex < 0) {
          resourceIndex = labels.findIndex(label => {
            const normalized = normalizeNotebookPanelText(label);
            return normalized.startsWith(normalizeNotebookPanelText(`${prefix} |`))
              && normalized.includes(normalizeNotebookPanelText(resourceMeta.sheetLabel));
          });
        }
        if (resourceIndex < 0) return;

        const rawValue = getNotebookPanelCellValue(cells[resourceIndex]);
        if (!rawValue) return;
        resources[questionKey][resourceMeta.key] = true;
      });
    });
  });

  Object.keys(resources).forEach(key => {
    if (!Object.keys(resources[key]).length) delete resources[key];
  });

  return resources;
}

function ensureNotebookPanelResources() {
  if (state.mode !== "practica") return;
  loadNotebookPanelResources()
    .then(() => updateNotebookPanelGridStatus())
    .catch(error => {
      console.warn("Notebook panel Sheets:", error);
      updateNotebookPanelGridStatus();
    });
}

function getNotebookPanelResourceCount(sessionId, questionNumber) {
  const key = `${Number(sessionId)}-${Number(questionNumber)}`;
  const resources = NOTEBOOK_PANEL_CACHE.resources[key] || {};
  return NOTEBOOK_PANEL_CONFIG.resourceTypes.filter(item => Boolean(resources[item.key])).length;
}

function hasNotebookPanelComplete(sessionId, questionNumber) {
  return getNotebookPanelResourceCount(sessionId, questionNumber) >= NOTEBOOK_PANEL_CONFIG.resourceTypes.length;
}

function getNotebookPanelStatusLabel(sessionId, questionNumber) {
  const count = getNotebookPanelResourceCount(sessionId, questionNumber);
  if (count >= NOTEBOOK_PANEL_CONFIG.resourceTypes.length) return "Notebook completo: mapa mental, video, audio, presentación e infografía.";
  if (count > 0) return `Notebook parcial: ${count} de ${NOTEBOOK_PANEL_CONFIG.resourceTypes.length} recursos multimedia.`;
  if (NOTEBOOK_PANEL_CACHE.loading) return "Consultando recursos Notebook en el Sheets institucional.";
  return "Notebook pendiente de multimedia completa.";
}

function updateNotebookPanelGridStatus() {
  if (state.screen !== "exam" || state.mode !== "practica") return;
  const grid = document.getElementById("questionGrid");
  if (grid) {
    grid.querySelectorAll("button[data-number]").forEach(button => {
      const number = Number(button.dataset.number);
      const complete = hasNotebookPanelComplete(state.sessionId, number);
      const count = getNotebookPanelResourceCount(state.sessionId, number);
      button.classList.toggle("notebook-ready", complete);
      button.classList.toggle("notebook-partial", count > 0 && !complete);
      button.title = getNotebookPanelStatusLabel(state.sessionId, number);
      button.setAttribute("aria-label", `Pregunta ${number}. ${getNotebookPanelStatusLabel(state.sessionId, number)}`);
    });
  }
  updateNotebookMiniCardStatus();
}

function updateNotebookMiniCardStatus() {
  const question = getQuestion(state.sessionId, state.currentNumber);
  if (!question || state.mode !== "practica") return;
  const resources = NOTEBOOK_PANEL_CACHE.resources[`${Number(question.session)}-${Number(question.number)}`] || {};
  document.querySelectorAll(".notebook-mini-card[data-resource]").forEach(card => {
    const key = card.dataset.resource;
    if (key === "simulator") return;
    const ready = Boolean(resources[key]);
    card.classList.toggle("resource-ready", ready);
    card.classList.toggle("resource-pending", !ready && NOTEBOOK_PANEL_CACHE.loaded);
    const status = card.querySelector(".notebook-mini-status");
    if (status) {
      if (ready) status.textContent = "Disponible desde Sheets";
      else if (NOTEBOOK_PANEL_CACHE.loading) status.textContent = "Consultando Sheets";
      else status.textContent = "Pendiente en Sheets";
    }
  });
  const summary = document.getElementById("notebookInlineStatus");
  if (summary) {
    const count = getNotebookPanelResourceCount(question.session, question.number);
    summary.textContent = count >= NOTEBOOK_PANEL_CONFIG.resourceTypes.length
      ? "Notebook completo: 5 recursos multimedia listos."
      : NOTEBOOK_PANEL_CACHE.loading
        ? "Consultando recursos multimedia en el Sheets institucional…"
        : `Notebook parcial: ${count} de ${NOTEBOOK_PANEL_CONFIG.resourceTypes.length} recursos multimedia.`;
    summary.classList.toggle("complete", count >= NOTEBOOK_PANEL_CONFIG.resourceTypes.length);
  }
}

function storageGet(key, fallback = null) {
  try {
    const value = window.localStorage.getItem(key);
    if (value !== null) return value;
  } catch (error) {
    // En algunos navegadores, al estar incrustado en Google Sites, localStorage puede estar restringido.
  }
  try {
    const value = window.sessionStorage.getItem(key);
    if (value !== null) return value;
  } catch (error) {
    // sessionStorage queda como respaldo para navegación interna en iframe.
  }
  return fallback;
}

function storageSet(key, value) {
  let saved = false;
  try {
    window.localStorage.setItem(key, value);
    saved = true;
  } catch (error) {
    // Se intenta respaldo con sessionStorage.
  }
  try {
    window.sessionStorage.setItem(key, value);
    saved = true;
  } catch (error) {
    // Si ambos almacenamientos fallan, se continúa sin romper la app.
  }
  return saved;
}

function storageRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    // En algunos navegadores, al estar incrustado en Google Sites, el almacenamiento puede estar limitado.
  }
  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    // Respaldo silencioso.
  }
}

function storageJson(key, fallback) {
  try {
    return JSON.parse(storageGet(key, JSON.stringify(fallback)));
  } catch (error) {
    return fallback;
  }
}

function isEmbeddedInFrame() {
  try {
    return window.self !== window.top;
  } catch (error) {
    return true;
  }
}

function isFullscreenActive() {
  return Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

function isFullscreenEnabled() {
  return Boolean(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled);
}

function requestNativeFullscreen(target = document.documentElement) {
  if (isFullscreenActive()) return Promise.resolve(true);
  if (!target) return Promise.resolve(false);
  const request = target.requestFullscreen || target.webkitRequestFullscreen || target.msRequestFullscreen;
  if (typeof request !== "function" || !isFullscreenEnabled()) return Promise.resolve(false);
  try {
    const value = request.call(target);
    if (value && typeof value.then === "function") {
      return value.then(() => true).catch(() => false);
    }
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
}

function getCleanAppUrl() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete("volverPregunta");
    return url.toString();
  } catch (error) {
    return window.location.href;
  }
}

function openAppInNewTab() {
  window.open(getCleanAppUrl(), "_blank", "noopener,noreferrer");
}

function updateFullscreenControls() {
  const embedded = isEmbeddedInFrame();
  document.documentElement.classList.toggle("embedded-google-sites", embedded);
  document.documentElement.classList.toggle("fullscreen-active", isFullscreenActive());
  if (fullscreenBtn) {
    const showButton = hasValidStudent() && !isFullscreenActive();
    fullscreenBtn.classList.toggle("hidden", !showButton);
    fullscreenBtn.textContent = embedded ? "Pantalla completa" : "Ver en pantalla completa";
    fullscreenBtn.title = embedded
      ? "Solicitar pantalla completa para la app incrustada en Google Sites"
      : "Ampliar la app a pantalla completa";
  }
}

function requestGoogleSitesFullscreen({ showFallback = false } = {}) {
  document.documentElement.classList.add("google-sites-fullscreen-requested");
  return requestNativeFullscreen(document.documentElement).then(ok => {
    updateFullscreenControls();
    if (!ok && showFallback) openGoogleSitesFullscreenFallback();
    return ok;
  });
}

function openGoogleSitesFullscreenFallback() {
  // Aviso retirado por solicitud institucional.
  // En Google Sites, si el iframe no permite pantalla completa, la app continúa normalmente.
  return false;
}

function renderGoogleSitesFullscreenNotice() {
  // Aviso visual de Google Sites retirado por solicitud institucional.
  // La app conserva el modo seguro y la solicitud de pantalla completa al iniciar el simulacro.
  return "";
}


function scrollEmbeddedFrameTop() {
  window.requestAnimationFrame(() => {
    try {
      const shell = document.querySelector('.app-shell');
      if (shell && typeof shell.scrollIntoView === 'function') {
        shell.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'auto' });
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      if (app && typeof app.focus === 'function') app.focus({ preventScroll: true });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  });
}

function installEmbeddedTopBehavior() {
  if (!app || !window.MutationObserver) return;
  let pending = false;
  const observer = new MutationObserver(() => {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(() => {
      pending = false;
      scrollEmbeddedFrameTop();
    });
  });
  observer.observe(app, { childList: true });
}

function updateThemeToggleButton(theme) {
  if (!themeBtn) return;
  const current = theme === "dark" ? "dark" : "light";
  const nextLabel = current === "dark" ? "Día" : "Noche";
  themeBtn.dataset.theme = current;
  themeBtn.setAttribute("aria-label", `Cambiar a modo ${nextLabel.toLowerCase()}`);
  themeBtn.setAttribute("title", `Cambiar a modo ${nextLabel}`);
  const label = themeBtn.querySelector(".theme-toggle-label");
  if (label) label.textContent = nextLabel;
}

function init() {
  enforceSimulacroMode();
  const savedTheme = storageGet("simulador_icfes_theme", "light");
  document.documentElement.dataset.theme = savedTheme;
  updateThemeToggleButton(savedTheme);
  updateFullscreenControls();
  bindGlobalEvents();
  installEmbeddedTopBehavior();
  const savedStudent = loadSavedStudent();
  if (savedStudent) {
    state.student = savedStudent;
    updateHeaderSessionButtons();
    if (handleNotebookReturnRequest()) return;
    renderHome();
  } else {
    updateHeaderSessionButtons();
    renderAccess();
  }
}

function handleNotebookReturnRequest() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("volverPregunta") !== "1") return false;

  const raw = storageGet(STORAGE_KEY) || storageGet(NOTEBOOK_RETURN_KEY);
  const requestedSession = Number(params.get("session") || state.sessionId || 2);
  const requestedQuestion = Number(params.get("question") || 1);

  try {
    const notebookPayload = raw ? JSON.parse(raw) : null;
    const saved = notebookPayload && notebookPayload.state ? notebookPayload.state : notebookPayload;
    if (!saved || Number(saved.sessionId) !== requestedSession) {
      enforceSimulacroMode();
      const savedStudent = loadSavedStudent();
      if (savedStudent) state.student = savedStudent;
      renderHome();
      setTimeout(() => {
        alert("No hay un intento guardado para volver directamente a esa pregunta. En esta versión solo está activo el modo SIMULACRO.");
      }, 120);
      return true;
    }

    state = {
      ...state,
      ...saved,
      mode: normalizeWorkMode(saved.mode || params.get("mode") || ACTIVE_WORK_MODE),
      currentNumber: requestedQuestion || saved.currentNumber,
      finished: false
    };
    if (saved.student) state.student = saved.student;
    if (!hasValidStudent()) {
      state.student = loadSavedStudent();
    }
    state.mode = normalizeWorkMode(state.mode);
    if (!Number(state.remainingSeconds)) {
      const session = getSession(state.sessionId);
      state.remainingSeconds = session ? session.durationMinutes * 60 : 0;
    }
    homeBtn.classList.remove("hidden");
    window.history.replaceState({}, "", window.location.pathname);
    storageRemove(NOTEBOOK_RETURN_KEY);
    ensureSecureExamState();
    saveState();
    renderExam({ scrollToTimer: false });
    requestSecureExamFullscreen();
    scrollToPageTop();
    if (state.mode !== "entrenamiento") startTimer();
    return true;
  } catch (error) {
    renderHome();
    return true;
  }
}

function bindGlobalEvents() {
  homeBtn.addEventListener("click", handleHomeNavigation);
  if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
  if (tipsBtn) tipsBtn.addEventListener("click", openTipsModal);
  if (instructionsBtn) instructionsBtn.addEventListener("click", openInstructionsModal);
  if (dashboardBtn) dashboardBtn.addEventListener("click", openDashboardAccessDialog);
  if (studentDashboardBtn) studentDashboardBtn.addEventListener("click", openStudentDashboardAccessDialog);
  if (teacherDashboardBtn) teacherDashboardBtn.addEventListener("click", openTeacherDashboardAccessDialog);
  if (consultDataBtn) consultDataBtn.addEventListener("click", event => {
    event.stopPropagation();
    toggleConsultDataMenu();
  });
  if (consultDataDropdown) consultDataDropdown.addEventListener("click", event => {
    const btn = event.target.closest("[data-consult-role]");
    if (!btn) return;
    event.preventDefault();
    closeConsultDataMenu();
    const role = btn.getAttribute("data-consult-role");
    if (role === "student") openStudentDashboardAccessDialog();
    else if (role === "teacher") openTeacherDashboardAccessDialog();
    else openDashboardAccessDialog();
  });
  document.addEventListener("click", event => {
    if (consultDataMenu && !consultDataMenu.contains(event.target)) closeConsultDataMenu();
  });
  if (fullscreenBtn) fullscreenBtn.addEventListener("click", () => requestGoogleSitesFullscreen());

  document.addEventListener("click", event => {
    if (event.target.closest("[data-google-sites-fullscreen]")) {
      event.preventDefault();
      requestGoogleSitesFullscreen();
      return;
    }
    if (event.target.closest("[data-google-sites-open-tab]")) {
      event.preventDefault();
      openAppInNewTab();
    }
  });

  themeBtn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    updateThemeToggleButton(next);
    storageSet("simulador_icfes_theme", next);
  });

  window.addEventListener("beforeunload", () => {
    saveState();
  });

  document.addEventListener("visibilitychange", handleSecureExamVisibilityChange);
  window.addEventListener("blur", handleSecureExamBlur);
  window.addEventListener("focus", handleSecureExamFocus);
  document.addEventListener("fullscreenchange", handleSecureExamFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleSecureExamFullscreenChange);
  document.addEventListener("keydown", handleSecureExamKeydown, true);
  document.addEventListener("wheel", handleSecureExamWheel, { capture: true, passive: true });
  document.addEventListener("gesturestart", handleSecureExamGesture, { capture: true, passive: true });
  document.addEventListener("gesturechange", handleSecureExamGesture, { capture: true, passive: true });
  document.addEventListener("contextmenu", handleSecureExamContextMenu, true);
}

function toggleConsultDataMenu(force) {
  if (!consultDataBtn || !consultDataDropdown) return;
  const isOpen = !consultDataDropdown.classList.contains("hidden");
  const next = typeof force === "boolean" ? force : !isOpen;
  consultDataDropdown.classList.toggle("hidden", !next);
  consultDataBtn.setAttribute("aria-expanded", next ? "true" : "false");
}

function closeConsultDataMenu() {
  toggleConsultDataMenu(false);
}

function handleHomeNavigation() {
  if (state.screen === "exam" && !state.finished) {
    openActionDialog({
      title: "Volver al inicio",
      message: "El intento actual se guardará en este navegador. Podrás retomarlo con el botón ‘Continuar intento guardado’. ¿Deseas volver al inicio?",
      confirmText: "Sí, ir al inicio",
      cancelText: "Continuar intento",
      onConfirm: () => {
        saveState();
        clearTimer();
        renderHome();
        focusApp();
      }
    });
    return;
  }

  clearTimer();
  renderHome();
  focusApp();
}

function handleLogout() {
  const hasActiveAttempt = state.screen === "exam" && !state.finished;
  openActionDialog({
    title: "Cerrar sesión",
    message: hasActiveAttempt
      ? "Se cerrará la sesión del estudiante actual y se eliminará el intento guardado en este navegador. Luego podrás ingresar con otro nombre, grupo y correo. ¿Deseas continuar?"
      : "Se cerrará la sesión del estudiante actual. Luego podrás ingresar con otro nombre, grupo y correo. ¿Deseas continuar?",
    confirmText: "Sí, cerrar sesión",
    cancelText: "Cancelar",
    danger: true,
    onConfirm: performLogout
  });
}

function performLogout() {
  clearTimer();
  storageRemove(STUDENT_KEY);
  storageRemove(STORAGE_KEY);
  storageRemove(SUBMISSION_KEY);
  state = {
    screen: "access",
    mode: "",
    sessionId: null,
    scope: null,
    navNumbers: [],
    availableNumbers: [],
    currentNumber: null,
    answers: {},
    marked: {},
    startedAt: null,
    finishedAt: null,
    student: null,
    remainingSeconds: 0,
    finished: false,
    secureExam: createSecureExamState(),
    timerWarningsShown: {}
  };
  updateHeaderSessionButtons();
  renderAccess();
  scrollToPageTop();
}

function updateHeaderSessionButtons() {
  const loggedIn = hasValidStudent();
  if (logoutBtn) logoutBtn.classList.toggle("hidden", !loggedIn);
  if (studentDashboardBtn) studentDashboardBtn.classList.add("hidden");
  if (teacherDashboardBtn) teacherDashboardBtn.classList.add("hidden");
  if (dashboardBtn) dashboardBtn.classList.add("hidden");
  closeConsultDataMenu();
  if (consultDataMenu) consultDataMenu.classList.remove("hidden");
  updateFullscreenControls();
}


function grantDashboardAccess(role = "admin", extra = {}) {
  try {
    sessionStorage.setItem(DASHBOARD_ACCESS_KEY, JSON.stringify({
      ok: true,
      role,
      ...extra,
      createdAt: Date.now(),
      expiresAt: Date.now() + DASHBOARD_ACCESS_DURATION_MS
    }));
  } catch (error) {
    console.warn("No fue posible guardar la autorización temporal del dashboard.", error);
  }
}

function isDashboardPasswordValid(value) {
  return String(value || "").trim() === DASHBOARD_ACCESS_PASSWORD;
}

function isTeacherCredentialValid(user, password) {
  const normalizedUser = String(user || "").trim().toLowerCase();
  return [DASHBOARD_TEACHER_USER, "profesor", "docentes", "teacher"].includes(normalizedUser) && String(password || "").trim() === DASHBOARD_TEACHER_PASSWORD;
}

function normalizeAccessEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function isStudentCredentialValid(user, password) {
  const email = normalizeAccessEmail(user);
  const pass = normalizeAccessEmail(password);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email === pass ? email : "";
}

function getDashboardAccessPayload() {
  try {
    const payload = JSON.parse(sessionStorage.getItem(DASHBOARD_ACCESS_KEY) || "null");
    if (!payload || !payload.ok || Number(payload.expiresAt) <= Date.now()) return null;
    return payload;
  } catch (error) {
    return null;
  }
}

function getDashboardAccessRole() {
  const payload = getDashboardAccessPayload();
  return payload && payload.role ? payload.role : "";
}

function hasDashboardAccess() {
  return Boolean(getDashboardAccessPayload());
}



function openStudentDashboardAccessDialog() {
  const existing = document.getElementById("studentDashboardAccessDialog");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay dashboard-access-dialog";
  overlay.id = "studentDashboardAccessDialog";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card dashboard-access-card" role="dialog" aria-modal="true" aria-labelledby="studentDashboardAccessTitle" aria-describedby="studentDashboardAccessHelp">
      <button class="dialog-close" type="button" aria-label="Cerrar">×</button>
      <p class="eyebrow">Acceso estudiante</p>
      <h2 id="studentDashboardAccessTitle">Mis resultados</h2>
      <p id="studentDashboardAccessHelp">Ingresa tu correo institucional como usuario y como clave para consultar únicamente tus resultados.</p>
      <label class="field">
        <span>Usuario / correo</span>
        <input id="studentDashboardUser" type="email" autocomplete="username" placeholder="tu.correo@iemanueljbetancur.edu.co" />
      </label>
      <label class="field">
        <span>Clave / correo</span>
        <input id="studentDashboardPassword" type="password" autocomplete="current-password" placeholder="Repite tu correo" />
      </label>
      <div class="form-error" id="studentDashboardAccessError" aria-live="polite"></div>
      <div class="dialog-actions">
        <button class="secondary-btn" type="button" data-student-dashboard-cancel>Cancelar</button>
        <button class="primary-btn" type="button" id="studentDashboardAccessConfirm">Ver mis resultados</button>
      </div>
    </section>
  `;

  document.body.appendChild(overlay);
  const user = overlay.querySelector("#studentDashboardUser");
  const password = overlay.querySelector("#studentDashboardPassword");
  const error = overlay.querySelector("#studentDashboardAccessError");
  const close = () => overlay.remove();
  const submit = () => {
    const email = isStudentCredentialValid(user.value, password.value);
    if (!email) {
      error.textContent = "Debes escribir el mismo correo institucional en usuario y clave.";
      password.value = "";
      password.focus();
      return;
    }
    grantDashboardAccess("student", { email });
    window.location.href = "dashboard.html";
  };

  overlay.querySelector(".dialog-close").addEventListener("click", close);
  overlay.querySelector("[data-student-dashboard-cancel]").addEventListener("click", close);
  overlay.addEventListener("click", event => { if (event.target === overlay) close(); });
  overlay.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
    if (event.key === "Enter") submit();
  });
  overlay.querySelector("#studentDashboardAccessConfirm").addEventListener("click", submit);
  setTimeout(() => user.focus(), 50);
}

function openTeacherDashboardAccessDialog() {
  const existing = document.getElementById("teacherDashboardAccessDialog");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay dashboard-access-dialog";
  overlay.id = "teacherDashboardAccessDialog";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card dashboard-access-card" role="dialog" aria-modal="true" aria-labelledby="teacherDashboardAccessTitle" aria-describedby="teacherDashboardAccessHelp">
      <button class="dialog-close" type="button" aria-label="Cerrar">×</button>
      <p class="eyebrow">Acceso docente</p>
      <h2 id="teacherDashboardAccessTitle">Dashboard para docentes</h2>
      <p id="teacherDashboardAccessHelp">Ingresa el usuario docente para observar el dashboard institucional en modo solo lectura.</p>
      <label class="field">
        <span>Usuario</span>
        <input id="teacherDashboardUser" type="text" autocomplete="username" placeholder="docente" />
      </label>
      <label class="field">
        <span>Clave</span>
        <input id="teacherDashboardPassword" type="password" autocomplete="current-password" placeholder="Escribe la clave docente" />
      </label>
      <div class="form-error" id="teacherDashboardAccessError" aria-live="polite"></div>
      <div class="dialog-actions">
        <button class="secondary-btn" type="button" data-teacher-dashboard-cancel>Cancelar</button>
        <button class="primary-btn" type="button" id="teacherDashboardAccessConfirm">Ingresar al dashboard</button>
      </div>
    </section>
  `;

  document.body.appendChild(overlay);
  const user = overlay.querySelector("#teacherDashboardUser");
  const password = overlay.querySelector("#teacherDashboardPassword");
  const error = overlay.querySelector("#teacherDashboardAccessError");
  const close = () => overlay.remove();
  const submit = () => {
    if (!isTeacherCredentialValid(user.value, password.value)) {
      error.textContent = "Usuario o clave docente incorrectos.";
      password.value = "";
      password.focus();
      return;
    }
    grantDashboardAccess("teacher");
    window.location.href = "dashboard.html";
  };

  overlay.querySelector(".dialog-close").addEventListener("click", close);
  overlay.querySelector("[data-teacher-dashboard-cancel]").addEventListener("click", close);
  overlay.addEventListener("click", event => { if (event.target === overlay) close(); });
  overlay.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
    if (event.key === "Enter") submit();
  });
  overlay.querySelector("#teacherDashboardAccessConfirm").addEventListener("click", submit);
  setTimeout(() => user.focus(), 50);
}

function openDashboardAccessDialog() {
  if (hasDashboardAccess() && getDashboardAccessRole() === "admin") {
    openAdminPanelDialog();
    return;
  }

  const existing = document.getElementById("dashboardAccessDialog");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay dashboard-access-dialog";
  overlay.id = "dashboardAccessDialog";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card dashboard-access-card" role="dialog" aria-modal="true" aria-labelledby="dashboardAccessTitle" aria-describedby="dashboardAccessHelp">
      <button class="dialog-close" type="button" aria-label="Cerrar">×</button>
      <p class="eyebrow">Acceso institucional</p>
      <h2 id="dashboardAccessTitle">Panel administrador</h2>
      <p id="dashboardAccessHelp">Ingresa la clave institucional para abrir el dashboard y configurar los modos disponibles de la plataforma.</p>
      <label class="field">
        <span>Clave institucional</span>
        <input id="dashboardAccessPassword" type="password" autocomplete="current-password" placeholder="Escribe la clave" />
      </label>
      <div class="form-error" id="dashboardAccessError" aria-live="polite"></div>
      <div class="dialog-actions">
        <button class="secondary-btn" type="button" data-dashboard-access-cancel>Cancelar</button>
        <button class="primary-btn" type="button" id="dashboardAccessConfirm">Ingresar como administrador</button>
      </div>
    </section>
  `;

  document.body.appendChild(overlay);
  const password = overlay.querySelector("#dashboardAccessPassword");
  const error = overlay.querySelector("#dashboardAccessError");
  const confirmBtn = overlay.querySelector("#dashboardAccessConfirm");
  const close = () => overlay.remove();
  const submit = () => {
    if (!isDashboardPasswordValid(password.value)) {
      error.textContent = "Clave incorrecta. Verifica la clave institucional.";
      password.value = "";
      password.focus();
      return;
    }
    grantDashboardAccess();
    close();
    openAdminPanelDialog();
  };

  overlay.querySelector(".dialog-close").addEventListener("click", close);
  overlay.querySelector("[data-dashboard-access-cancel]").addEventListener("click", close);
  overlay.addEventListener("click", event => { if (event.target === overlay) close(); });
  overlay.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
    if (event.key === "Enter") submit();
  });
  confirmBtn.addEventListener("click", submit);
  password.focus();
}

function openAdminPanelDialog() {
  const existing = document.getElementById("adminPanelDialog");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay admin-panel-dialog";
  overlay.id = "adminPanelDialog";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card admin-panel-card" role="dialog" aria-modal="true" aria-labelledby="adminPanelTitle">
      <button class="dialog-close" type="button" aria-label="Cerrar">×</button>
      <p class="eyebrow">Solo administrador</p>
      <h2 id="adminPanelTitle">Panel administrador</h2>
      <p class="admin-panel-intro">Desde esta sección puedes ingresar al dashboard institucional y decidir qué modos estarán disponibles en esta plataforma.</p>

      <div class="admin-mode-current" id="adminModeCurrent">
        <span>Modo actual</span>
        <strong>${getAdminModeConfigLabel()}</strong>
      </div>

      <div class="admin-panel-actions">
        <button class="primary-btn" type="button" data-admin-dashboard>Ingresar al dashboard institucional</button>
      </div>

      <div class="admin-mode-grid" aria-label="Configuración de modos disponibles">
        <button class="admin-mode-option" type="button" data-admin-mode="${ADMIN_MODE_TRAINING_AND_SIMULACRO}">
          <span>1</span>
          <strong>Activar entrenamiento y simulacro</strong>
          <small>Habilita Notebook, AI Studio, práctica sin tiempo y simulacro.</small>
        </button>
        <button class="admin-mode-option" type="button" data-admin-mode="${ADMIN_MODE_SIMULACRO_ONLY}">
          <span>2</span>
          <strong>Solo simulacro</strong>
          <small>Deja activa únicamente la primera y segunda sesión de simulacro.</small>
        </button>
      </div>

      <p class="footer-note admin-note">La configuración queda guardada en este navegador. Para dejarla fija en GitHub Pages, publica el ZIP con el modo deseado.</p>
    </section>
  `;

  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.querySelector(".dialog-close").addEventListener("click", close);
  overlay.addEventListener("click", event => { if (event.target === overlay) close(); });
  overlay.addEventListener("keydown", event => { if (event.key === "Escape") close(); });
  overlay.querySelector("[data-admin-dashboard]").addEventListener("click", () => {
    grantDashboardAccess();
    window.location.href = "dashboard.html";
  });
  overlay.querySelectorAll("[data-admin-mode]").forEach(button => {
    button.addEventListener("click", () => {
      setAdminWorkModeConfig(button.dataset.adminMode);
      updateAdminModeBadges();
      if (state.screen === "home") renderHome();
    });
  });
  updateAdminModeBadges();
}

function updateAdminModeBadges() {
  document.querySelectorAll("[data-admin-mode]").forEach(button => {
    const active = button.dataset.adminMode === getAdminWorkModeConfig();
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  document.querySelectorAll("#adminModeCurrent strong, #adminModeCurrentInline").forEach(element => {
    element.textContent = getAdminModeConfigLabel();
  });
}

function openActionDialog({ title, message, confirmText = "Aceptar", cancelText = "Cancelar", danger = false, onConfirm, onCancel }) {
  closeActionDialog();

  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="dialogTitle" aria-describedby="dialogMessage">
      <button class="dialog-close" type="button" aria-label="Cerrar">×</button>
      <p class="eyebrow">ICFES Digital Saber 11</p>
      <h2 id="dialogTitle">${title}</h2>
      <p id="dialogMessage">${message}</p>
      <div class="dialog-actions">
        <button class="secondary-btn" type="button" data-dialog-cancel>${cancelText}</button>
        <button class="${danger ? "danger-btn" : "primary-btn"}" type="button" data-dialog-confirm>${confirmText}</button>
      </div>
    </section>
  `;

  overlay.addEventListener("click", event => {
    if (event.target === overlay || event.target.closest("[data-dialog-cancel]") || event.target.closest(".dialog-close")) {
      closeActionDialog();
      if (typeof onCancel === "function") onCancel();
      return;
    }

    if (event.target.closest("[data-dialog-confirm]")) {
      closeActionDialog();
      if (typeof onConfirm === "function") onConfirm();
    }
  });

  document.body.appendChild(overlay);
  const confirmBtn = overlay.querySelector("[data-dialog-confirm]");
  if (confirmBtn) confirmBtn.focus({ preventScroll: true });
}

function closeActionDialog() {
  const current = document.querySelector(".dialog-overlay");
  if (current) current.remove();
}

function openTipsModal(onClose, options = {}) {
  closeActionDialog();

  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay tips-modal-overlay";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card tips-dialog-card" role="dialog" aria-modal="true" aria-labelledby="tipsDialogTitle">
      <button class="dialog-close" type="button" aria-label="Cerrar">×</button>
      <p class="eyebrow">Guía rápida del simulador</p>
      <h2 id="tipsDialogTitle">Tips</h2>
      <div class="tips-modal-content">
        <article class="tip-card">
          <h3>1. Estructura general del material</h3>
          <h4>Sección 1: Primera sesión</h4>
                    <ul>
            <li>Matemáticas</li>
            <li>Lectura Crítica</li>
            <li>Sociales y Ciudadanas</li>
            <li>Ciencias Naturales</li>
          </ul>
          <p><strong>Duración:</strong> 4 horas y 30 minutos.</p>
                    <div class="tips-table-scroll">
            <table class="tips-table">
              <thead><tr><th>Bloque</th><th>Preguntas</th><th>Área</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>1 a 25</td><td>Matemáticas</td></tr>
                <tr><td>2</td><td>26 a 66</td><td>Lectura Crítica</td></tr>
                <tr><td>3</td><td>67 a 91</td><td>Sociales y Ciudadanas</td></tr>
                <tr><td>4</td><td>92 a 120</td><td>Ciencias Naturales</td></tr>
              </tbody>
            </table>
          </div>

          <h4>Sección 2: Segunda sesión</h4>
                    <ul>
            <li>Sociales y Ciudadanas</li>
            <li>Matemáticas</li>
            <li>Ciencias Naturales</li>
            <li>Inglés</li>
          </ul>
          <p>También aparece una duración de <strong>4 horas y 30 minutos</strong>. En esta versión del simulador se trabajan las preguntas académicas visibles: <strong>1 a 134</strong>.</p>
                    <div class="tips-table-scroll">
            <table class="tips-table">
              <thead><tr><th>Bloque</th><th>Preguntas</th><th>Área</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>1 a 28</td><td>Sociales y Ciudadanas</td></tr>
                <tr><td>2</td><td>29 a 50</td><td>Matemáticas</td></tr>
                <tr><td>3</td><td>51 a 79</td><td>Ciencias Naturales</td></tr>
                <tr><td>4</td><td>80 a 134</td><td>Inglés</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        <article class="tip-card">
          <h3>2. Tipos de preguntas identificadas</h3>
          <p>El material no se limita a preguntas memorísticas. La mayoría son preguntas contextualizadas, con situaciones reales, tablas, gráficos, textos, imágenes o casos.</p>

          <div class="tips-area-grid">
            <section>
              <h4>Matemáticas</h4>
              <p>Predominan preguntas sobre:</p>
              <ul>
                <li>Promedios y análisis de tablas.</li>
                <li>Porcentajes, impuestos, descuentos e intereses.</li>
                <li>Probabilidad y conteo.</li>
                <li>Geometría: áreas, figuras, regiones sombreadas.</li>
                <li>Conversión de unidades.</li>
                <li>Lectura de gráficos de barras, circulares, cajas y líneas.</li>
                <li>Proporcionalidad directa e inversa.</li>
                <li>Interpretación de fórmulas y procedimientos.</li>
              </ul>
              <p class="tip-note">Esto indica que el simulador debe permitir preguntas con tablas, gráficos, imágenes y fórmulas.</p>
            </section>

            <section>
              <h4>Lectura Crítica</h4>
              <p>Se observan textos filosóficos, literarios, argumentativos, infografías e historietas. Las preguntas evalúan:</p>
              <ul>
                <li>Idea principal.</li>
                <li>Intención del autor.</li>
                <li>Relación entre enunciados.</li>
                <li>Parafraseo.</li>
                <li>Inferencias.</li>
                <li>Estrategias argumentativas.</li>
                <li>Función de conectores.</li>
                <li>Interpretación de textos continuos y discontinuos.</li>
              </ul>
              <p class="tip-note">Para el simulador, esta área necesita una pantalla cómoda para leer textos largos, con opción de ampliar el texto o dividir pantalla entre texto y preguntas.</p>
            </section>

            <section>
              <h4>Sociales y Ciudadanas</h4>
              <p>Las preguntas trabajan situaciones sobre:</p>
              <ul>
                <li>Constitución Política de Colombia.</li>
                <li>Participación ciudadana.</li>
                <li>Derechos fundamentales.</li>
                <li>Conflictos sociales y ambientales.</li>
                <li>Desarrollo sostenible.</li>
                <li>Democracia.</li>
                <li>Inclusión social.</li>
                <li>Discriminación.</li>
                <li>Economía, Estado y sociedad.</li>
              </ul>
              <p class="tip-note">Son preguntas basadas en casos, por lo que el simulador debe clasificar cada ítem por competencia ciudadana, tema y nivel de dificultad.</p>
            </section>

            <section>
              <h4>Ciencias Naturales</h4>
              <p>Aparecen preguntas sobre:</p>
              <ul>
                <li>Ecosistemas.</li>
                <li>Contaminación.</li>
                <li>Fotosíntesis.</li>
                <li>Fuerzas.</li>
                <li>pH.</li>
                <li>Vacunas y enfermedades.</li>
                <li>Transporte celular.</li>
                <li>Evolución.</li>
                <li>Reacciones químicas.</li>
                <li>Mezclas.</li>
                <li>Energía.</li>
                <li>Interpretación de experimentos.</li>
                <li>Gráficas científicas.</li>
              </ul>
              <p class="tip-note">Esta área requiere soporte para imágenes, diagramas científicos, tablas de datos y preguntas experimentales.</p>
            </section>

            <section>
              <h4>Inglés</h4>
              <p>La sección de inglés está organizada por partes. Se observan ejercicios de:</p>
              <ul>
                <li>Relación de palabras con definiciones.</li>
                <li>Comprensión de avisos.</li>
                <li>Conversaciones cortas.</li>
                <li>Completar textos con palabras.</li>
                <li>Comprensión de lectura.</li>
                <li>Selección de vocabulario y estructuras gramaticales.</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
      <div class="dialog-actions tips-modal-actions">
        <button class="primary-btn" type="button" data-dialog-cancel>${escapeHtml(options.confirmText || "Cerrar tips")}</button>
      </div>
    </section>
  `;

  overlay.addEventListener("click", event => {
    if (event.target === overlay || event.target.closest("[data-dialog-cancel]") || event.target.closest(".dialog-close")) {
      closeActionDialog();
      if (typeof onClose === "function") onClose();
    }
  });

  document.body.appendChild(overlay);
  const closeBtn = overlay.querySelector(".dialog-close");
  if (closeBtn) closeBtn.focus({ preventScroll: true });
}


function openInstructionsModal() {
  closeActionDialog();

  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay tips-modal-overlay";
  overlay.setAttribute("role", "presentation");
  overlay.innerHTML = `
    <section class="dialog-card tips-dialog-card instructions-dialog-card" role="dialog" aria-modal="true" aria-labelledby="instructionsDialogTitle">
      <button class="dialog-close" type="button" aria-label="Cerrar">×</button>
      <p class="eyebrow">Modelo pedagógico de la plataforma</p>
      <h2 id="instructionsDialogTitle">Inteligencia Híbrida</h2>
      <div class="tips-modal-content instructions-content hybrid-intelligence-content">
        <article class="tip-card hybrid-intelligence-card">
          <p><strong>ICFES Digital Saber 11 – Prepárate para el ICFES con inteligencia artificial</strong> es una plataforma educativa que promueve el uso de la <strong>Inteligencia Híbrida</strong>, entendida como la integración entre la inteligencia humana del estudiante, la orientación pedagógica del docente y el apoyo analítico de la inteligencia artificial.</p>
          <p>Esta propuesta no busca reemplazar al maestro ni automatizar el aprendizaje, sino fortalecerlo. La Inteligencia Híbrida permite que el estudiante piense, analice, se equivoque, corrija y mejore, mientras la tecnología le ofrece rutas de entrenamiento, retroalimentación inmediata, simuladores interactivos y recursos visuales que favorecen la comprensión.</p>
          <p>Una de sus principales ventajas es que convierte la preparación para la Prueba Saber 11 en una experiencia más dinámica, personalizada y significativa. En esta versión, el estudiante trabaja directamente en el modo SIMULACRO cronometrado, con una experiencia enfocada en medir desempeño, administrar el tiempo y revisar resultados detallados.</p>
          <p>La Inteligencia Híbrida también beneficia al docente, porque le permite acompañar mejor los procesos de preparación, identificar fortalezas y dificultades, orientar refuerzos académicos y transformar los resultados en oportunidades reales de mejora. De esta manera, la tecnología se convierte en una aliada pedagógica y no en un sustituto del criterio humano.</p>
          <p>Con esta plataforma, la preparación para el ICFES deja de ser únicamente una práctica repetitiva de preguntas y se convierte en un proceso inteligente de entrenamiento, análisis y crecimiento académico. La combinación entre estudiante, docente e inteligencia artificial permite fortalecer la autonomía, la comprensión lectora, el razonamiento, la toma de decisiones y la confianza frente a la prueba.</p>
          <p><strong>ICFES Digital Saber 11</strong> representa una apuesta por una educación más innovadora, interactiva e inclusiva, donde la Inteligencia Híbrida potencia las capacidades humanas y abre nuevas posibilidades para aprender mejor, prepararse mejor y alcanzar mejores resultados.</p>
        </article>
      </div>
      <div class="dialog-actions tips-modal-actions">
        <button class="primary-btn" type="button" data-dialog-cancel>Cerrar</button>
      </div>
    </section>
  `;

  overlay.addEventListener("click", event => {
    if (event.target === overlay || event.target.closest("[data-dialog-cancel]") || event.target.closest(".dialog-close")) {
      closeActionDialog();
      if (typeof onClose === "function") onClose();
    }
  });

  document.body.appendChild(overlay);
  const closeBtn = overlay.querySelector(".dialog-close");
  if (closeBtn) closeBtn.focus({ preventScroll: true });
}

function focusApp() {
  if (app && typeof app.focus === "function") {
    requestAnimationFrame(() => app.focus({ preventScroll: true }));
  }
}

function scrollToPageTop() {
  requestAnimationFrame(() => {
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    if (app && typeof app.focus === "function") {
      app.focus({ preventScroll: true });
    }
  });
}

function scrollToTimerBox() {
  requestAnimationFrame(() => {
    const target = document.querySelector(".exam-layout") || app;
    const header = document.querySelector(".app-header");
    if (target && typeof window.scrollTo === "function") {
      const headerHeight = header ? header.offsetHeight : 0;
      const top = Math.max(target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10, 0);
      window.scrollTo({ top, behavior: "smooth" });
    } else if (target && typeof target.scrollIntoView === "function") {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (app && typeof app.focus === "function") {
      app.focus({ preventScroll: true });
    }
  });
}

function renderAccess(pendingScope = null) {
  clearTimer();
  state.screen = "access";
  homeBtn.classList.add("hidden");
  if (logoutBtn) logoutBtn.classList.add("hidden");
  if (dashboardBtn) dashboardBtn.classList.add("hidden");
  closeConsultDataMenu();
  const current = state.student || loadSavedStudent() || { fullName: "", group: "", email: "" };
  const currentFullName = normalizeNameInput(current.fullName || `${current.firstName || ""} ${current.lastName || ""}`);
  const currentGroup = normalizeGroupInput(current.group || current.gradeGroup || current.course || "");
  const currentEmail = normalizeEmailInput(current.email || current.studentEmail || "");

  app.innerHTML = `
    ${renderGoogleSitesFullscreenNotice()}
    <section class="access-panel" aria-labelledby="accessTitle">
      <div class="access-card">
        <p class="eyebrow">${escapeHtml(INSTITUTION_NAME)}</p>
        <h2 id="accessTitle" class="access-brand-title">ICFES Digital Saber 11</h2>
        <p class="access-tagline">Prepárate para el ICFES con inteligencia artificial</p>
        <h3 class="access-register-title">Antes de iniciar, registra tus datos</h3>
        <form id="studentForm" class="student-form">
          <div class="form-grid student-form-grid">
            <label class="field field-wide">
              <span>Nombre y apellido completo</span>
              <input id="studentFullName" type="text" autocomplete="name" required maxlength="120" placeholder="Ejemplo: Juan Carlos Blandón Vargas" value="${escapeAttr(currentFullName)}" />
            </label>
            <label class="field">
              <span>Grupo</span>
              <select id="studentGroup" required>
                <option value="">Selecciona el grupo</option>
                <option value="11-1" ${currentGroup === "11-1" ? "selected" : ""}>11-1</option>
                <option value="11-2" ${currentGroup === "11-2" ? "selected" : ""}>11-2</option>
                <option value="11-3" ${currentGroup === "11-3" ? "selected" : ""}>11-3</option>
                <option value="Docente" ${currentGroup === "Docente" ? "selected" : ""}>Docente</option>
                <option value="Invitado" ${currentGroup === "Invitado" ? "selected" : ""}>Invitado</option>
              </select>
            </label>
            <label class="field field-wide">
              <span>Correo electrónico</span>
              <input id="studentEmail" type="email" autocomplete="email" required maxlength="140" placeholder="Ejemplo: estudiante@iemanueljbetancur.edu.co" value="${escapeAttr(currentEmail)}" />
            </label>
            <label class="field field-wide">
              <span>Confirmar correo electrónico</span>
              <input id="studentEmailConfirm" type="email" autocomplete="email" required maxlength="140" placeholder="Confirma el correo @iemanueljbetancur.edu.co" value="${escapeAttr(currentEmail)}" />
            </label>
          </div>
          <div class="form-error" id="studentFormError" aria-live="polite"></div>
          <div class="session-actions">
            <button class="primary-btn" type="submit">Ingresar al simulador</button>
          </div>
        </form>
      </div>
    </section>
  `;

  document.getElementById("studentForm").addEventListener("submit", event => {
    event.preventDefault();
    const fullName = normalizeNameInput(document.getElementById("studentFullName").value);
    const group = normalizeGroupInput(document.getElementById("studentGroup").value);
    const email = normalizeEmailInput(document.getElementById("studentEmail").value);
    const emailConfirm = normalizeEmailInput(document.getElementById("studentEmailConfirm").value);
    const error = document.getElementById("studentFormError");

    if (!fullName) {
      error.textContent = "Por favor, escribe el nombre y apellido completo del estudiante.";
      return;
    }

    if (!group) {
      error.textContent = "Por favor, selecciona una opción válida: 11-1, 11-2, 11-3, Docente o Invitado.";
      return;
    }

    if (!isValidEmail(email)) {
      error.textContent = "Por favor, escribe un correo electrónico válido para enviar el informe.";
      return;
    }

    if (email !== emailConfirm) {
      error.textContent = "Los correos electrónicos no coinciden. Verifica el correo del estudiante antes de continuar.";
      return;
    }

    state.student = { fullName, group, email };
    storageSet(STUDENT_KEY, JSON.stringify(state.student));
    updateHeaderSessionButtons();
    openTipsModal(() => {
      openExamInstructionsDialog(() => {
        requestGoogleSitesFullscreen({ showFallback: false });
        openSecureExamInfoDialog(() => {
          if (pendingScope) startScope(pendingScope);
          else renderHome();
        });
      });
    }, { confirmText: "Continuar" });
  });

  const firstInput = document.getElementById("studentFullName");
  if (firstInput) firstInput.focus({ preventScroll: true });
}

function normalizeNameInput(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeGroupInput(value) {
  const raw = String(value || "").replace(/\s+/g, "").trim();
  const normalized = raw.toLowerCase();
  const labels = {
    "11-1": "11-1",
    "11-2": "11-2",
    "11-3": "11-3",
    docente: "Docente",
    profesor: "Docente",
    invitado: "Invitado",
    invitada: "Invitado"
  };
  return labels[normalized] || "";
}

function normalizeEmailInput(value) {
  return String(value || "").replace(/\s+/g, "").trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmailInput(value));
}

function loadSavedStudent() {
  const student = storageJson(STUDENT_KEY, null);
  if (!student) return null;
  const fullName = normalizeNameInput(student.fullName || `${student.firstName || ""} ${student.lastName || ""}`);
  const group = normalizeGroupInput(student.group || student.gradeGroup || student.course || "");
  const email = normalizeEmailInput(student.email || student.studentEmail || "");
  if (!fullName || !group || !isValidEmail(email)) return null;
  return { fullName, group, email };
}

function hasValidStudent() {
  if (!state.student) return false;
  const fullName = normalizeNameInput(state.student.fullName || `${state.student.firstName || ""} ${state.student.lastName || ""}`);
  const group = normalizeGroupInput(state.student.group || state.student.gradeGroup || state.student.course || "");
  const email = normalizeEmailInput(state.student.email || state.student.studentEmail || "");
  return Boolean(fullName && group && isValidEmail(email));
}

function getStudentFullName() {
  if (!hasValidStudent()) return "Estudiante sin registrar";
  return normalizeNameInput(state.student.fullName || `${state.student.firstName || ""} ${state.student.lastName || ""}`);
}

function getStudentGroup() {
  if (!hasValidStudent()) return "Sin grupo";
  return normalizeGroupInput(state.student.group || state.student.gradeGroup || state.student.course || "") || "Sin grupo";
}

function getStudentEmail() {
  if (!hasValidStudent()) return "Sin correo";
  return normalizeEmailInput(state.student.email || state.student.studentEmail || "") || "Sin correo";
}

function renderHome() {
  enforceSimulacroMode();
  if (!hasValidStudent()) {
    renderAccess();
    return;
  }
  clearTimer();
  state.screen = "home";
  homeBtn.classList.add("hidden");
  updateHeaderSessionButtons();
  app.innerHTML = `
    ${renderGoogleSitesFullscreenNotice()}
    <section class="hero">
      <p class="eyebrow">${escapeHtml(INSTITUTION_NAME)}</p>
      <h2>ICFES Digital Saber 11</h2>
      <p>
        ${isTrainingModeEnabled()
          ? "Prepárate para el ICFES con inteligencia artificial. El administrador activó los modos de entrenamiento y el simulacro cronometrado."
          : "Prepárate para el ICFES con inteligencia artificial. En esta versión solo está activo el modo SIMULACRO cronometrado para medir el desempeño en condiciones similares a la prueba."}
      </p>
      <div class="hero-grid">
        <div class="stat"><strong>2</strong><span>sesiones configuradas</span></div>
        <div class="stat"><strong>270 min</strong><span>por sesión completa</span></div>
        <div class="stat"><strong>${EXAM_STRUCTURE.reduce((sum, session) => sum + session.totalQuestions, 0)}</strong><span>preguntas estructuradas</span></div>
        <div class="stat"><strong>${QUESTION_BANK.length}</strong><span>preguntas disponibles</span></div>
      </div>
    </section>

    <section class="student-strip" aria-label="Datos del estudiante">
      <div>
        <p class="eyebrow">Estudiante registrado · ${escapeHtml(INSTITUTION_SHORT_NAME)}</p>
        <strong>${getStudentFullName()}</strong>
        <span class="student-group-label">Grupo: ${getStudentGroup()} · Correo: ${getStudentEmail()}</span>
      </div>
      <div class="student-actions">
        <button class="secondary-btn" id="changeStudentBtn" type="button">Cambiar estudiante</button>
        <button class="danger-btn" id="logoutStudentBtn" type="button">Cerrar sesión</button>
      </div>
    </section>

    <section class="config-bar mode-select-bar" aria-label="Configuración del simulador">
      <div class="mode-select-panel ${state.mode ? "has-mode" : "needs-mode"}">
        <div class="mode-select-head">
          <div>
            <p class="eyebrow">Modo de trabajo disponible</p>
            <h3>${isTrainingModeEnabled() ? "Entrenamiento y SIMULACRO activos" : "Solo SIMULACRO activo"}</h3>
          </div>
          <span class="required-badge">${isTrainingModeEnabled() ? "Admin activo" : "Simulacro"}</span>
        </div>
        <label class="mode-select-wrap" for="modeSelect">
          <span class="mode-select-icon">🚀</span>
          <select id="modeSelect" name="mode" required aria-label="Selecciona el modo de trabajo">
            <option value="practica" ${!isTrainingModeEnabled() ? "disabled" : ""}>1. Entrenamiento con Notebook${!isTrainingModeEnabled() ? " — desactivado" : ""}</option>
            <option value="ai-studio" ${!isTrainingModeEnabled() ? "disabled" : ""}>2. Entrenamiento con AI Studio${!isTrainingModeEnabled() ? " — desactivado" : ""}</option>
            <option value="entrenamiento" ${!isTrainingModeEnabled() ? "disabled" : ""}>3. Práctica sin tiempo${!isTrainingModeEnabled() ? " — desactivado" : ""}</option>
            <option value="simulacro">4. SIMULACRO — activo para medir desempeño</option>
          </select>
        </label>
        <div class="mode-select-preview" id="modeSelectPreview">
          ${renderModeSelectPreview(state.mode)}
        </div>
      </div>
      <button class="secondary-btn" id="resumeBtn" type="button">Continuar intento guardado</button>
    </section>


    <section class="session-grid" id="sessionGrid"></section>
  `;

  const modeSelect = document.getElementById("modeSelect");
  if (modeSelect) {
    modeSelect.addEventListener("change", event => {
      state.mode = normalizeWorkMode(event.target.value);
      event.target.value = state.mode;
      updateModeSelectUi();
    });
  }
  updateModeSelectUi();

  document.getElementById("changeStudentBtn").addEventListener("click", () => {
    openActionDialog({
      title: "Cambiar estudiante",
      message: "Al cambiar los datos del estudiante, los nuevos intentos e informes quedarán asociados al nuevo nombre y grupo. El intento guardado actual, si existe, se conservará en este navegador.",
      confirmText: "Cambiar",
      cancelText: "Cancelar",
      onConfirm: () => renderAccess()
    });
  });
  const logoutStudentBtn = document.getElementById("logoutStudentBtn");
  if (logoutStudentBtn) logoutStudentBtn.addEventListener("click", handleLogout);
  document.getElementById("resumeBtn").addEventListener("click", resumeSavedAttempt);
  renderSessionCards();
  app.focus();
}

function renderAdminAccessSection() {
  return `
    <section class="admin-access-section" aria-label="Sección exclusiva para administrador">
      <div>
        <p class="eyebrow">Solo administrador</p>
        <h3>Configuración institucional</h3>
        <p>Accede con clave para abrir el dashboard y cambiar los modos disponibles de la plataforma.</p>
      </div>
      <div class="admin-access-actions">
        <span>Modo actual: <strong id="adminModeCurrentInline">${getAdminModeConfigLabel()}</strong></span>
        <button class="secondary-btn" id="openAdminSectionBtn" type="button">Abrir panel administrador</button>
      </div>
    </section>
  `;
}

function renderModeSelectPreview(mode) {
  mode = normalizeWorkMode(mode);
  const data = {
    "practica": {
      icon: "📒",
      title: "Entrenamiento con Notebook",
      text: "Explora recursos multimedia, mapa mental, video, audio, presentación e infografía antes de responder."
    },
    "ai-studio": {
      icon: "🤖",
      title: "Entrenamiento con AI Studio",
      text: "Practica con simuladores dinámicos, pistas, laboratorios y retroalimentación interactiva."
    },
    "entrenamiento": {
      icon: "🧭",
      title: "Práctica sin tiempo",
      text: "Resuelve preguntas con calma, sin cronómetro, para fortalecer comprensión y estrategia."
    },
    "simulacro": {
      icon: "🏁",
      title: "SIMULACRO",
      text: "Modo recomendado para medir desempeño con tiempo y condiciones más cercanas a la prueba."
    }
  }[mode];

  if (!data) {
    return `
      <div class="mode-preview-empty">
        <strong>Modo SIMULACRO activo.</strong>
        <span>Ya puedes iniciar la primera o la segunda sesión completa.</span>
      </div>
    `;
  }

  return `
    <div class="mode-preview-card ${mode === "simulacro" ? "mode-preview-simulacro" : ""}">
      <span class="mode-preview-icon">${data.icon}</span>
      <div>
        <strong>${data.title}</strong>
        <span>${data.text}</span>
      </div>
    </div>
  `;
}

function updateModeSelectUi() {
  enforceSimulacroMode();
  const panel = document.querySelector(".mode-select-panel");
  const preview = document.getElementById("modeSelectPreview");
  const modeSelect = document.getElementById("modeSelect");
  const hasMode = Boolean(state.mode);

  if (panel) {
    panel.classList.toggle("has-mode", hasMode);
    panel.classList.toggle("needs-mode", !hasMode);
  }
  if (preview) preview.innerHTML = renderModeSelectPreview(state.mode);
  if (modeSelect) {
    modeSelect.querySelectorAll("option").forEach(option => {
      if (TRAINING_WORK_MODES.has(option.value)) option.disabled = !isTrainingModeEnabled();
    });
    modeSelect.value = normalizeWorkMode(state.mode);
    modeSelect.classList.toggle("mode-select-missing", !hasMode);
  }
  document.querySelectorAll('[data-action="session"], [data-action="area"]').forEach(button => {
    button.disabled = !hasMode;
    button.classList.toggle("disabled-until-mode", !hasMode);
    button.title = hasMode ? "" : "Selecciona primero un modo de trabajo";
  });
}

function ensureModeSelected() {
  enforceSimulacroMode();
  updateModeSelectUi();
  return true;
}

function renderSessionCards() {
  const grid = document.getElementById("sessionGrid");
  const template = document.getElementById("session-card-template");
  grid.innerHTML = "";

  EXAM_STRUCTURE.forEach(session => {
    const node = template.content.cloneNode(true);
    node.querySelector(".session-label").textContent = session.label;
    node.querySelector(".session-title").textContent = session.title;
    node.querySelector(".session-duration").textContent = `${formatMinutes(session.durationMinutes)} · ${session.totalQuestions} preguntas`;
    node.querySelector(".session-description").textContent = session.description;

    const loadedTotal = getLoadedQuestionsForSession(session.id).length;
    node.querySelector(".session-stats").innerHTML = `
      <span class="pill">Total: ${session.totalQuestions}</span>
      <span class="pill success">Disponibles: ${loadedTotal}</span>
      <span class="pill muted">Pendientes: ${session.totalQuestions - loadedTotal}</span>
    `;

    const tbody = node.querySelector("tbody");
    session.blocks.forEach(block => {
      const loaded = getLoadedQuestionsInRange(session.id, block.from, block.to).length;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${block.block}</strong></td>
        <td>${block.from} a ${block.to}</td>
        <td>${block.area}${block.note ? `<br><small class="footer-note">${block.note}</small>` : ""}</td>
        <td><span class="pill ${loaded ? "success" : "muted"}">${loaded}/${block.to - block.from + 1}</span></td>
      `;
      tbody.appendChild(tr);
    });

    node.querySelector(".session-actions").innerHTML = `
      <button class="primary-btn" type="button" data-action="session" data-session="${session.id}">Iniciar ${session.title}</button>
    `;

    grid.appendChild(node);
  });

  grid.querySelectorAll('button[data-action="session"]').forEach(button => {
    button.addEventListener("click", event => {
      const sessionId = Number(event.currentTarget.dataset.session);
      if (!ensureModeSelected()) return;
      startScope({ sessionId, type: "session" });
    });
  });
  updateModeSelectUi();
}

function showStructure(sessionId) {
  const session = getSession(sessionId);
  const rows = session.blocks.map(block => {
    const loaded = getLoadedQuestionsInRange(session.id, block.from, block.to).length;
    return `
      <tr>
        <td><strong>${block.block}</strong></td>
        <td>${block.from} a ${block.to}</td>
        <td>${block.area}</td>
        <td>${block.scored ? "Sí" : "No"}</td>
        <td>${loaded}</td>
      </tr>
    `;
  }).join("");

  app.innerHTML = `
    <section class="panel session-card">
      <div class="session-card__head">
        <div>
          <p class="eyebrow">${session.label}</p>
          <h2>${session.title}</h2>
        </div>
        <span class="pill">${formatMinutes(session.durationMinutes)} · ${session.totalQuestions} preguntas</span>
      </div>
      <p class="session-description">${session.description}</p>
      <div class="table-wrap">
        <table class="structure-table">
          <thead>
            <tr><th>Bloque</th><th>Preguntas</th><th>Área</th><th>Calificable</th><th>Disponibles</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="session-actions">
        <button class="primary-btn" type="button" id="startFromStructure">Iniciar ${session.title}</button>
        <button class="secondary-btn" type="button" id="backHome">Volver</button>
      </div>
    </section>
  `;

  document.getElementById("startFromStructure").addEventListener("click", () => { if (ensureModeSelected()) startScope({ sessionId, type: "session" }); });
  document.getElementById("backHome").addEventListener("click", renderHome);
  homeBtn.classList.remove("hidden");
  updateHeaderSessionButtons();
}

function startScope(scope) {
  enforceSimulacroMode();
  if (!ensureModeSelected()) return;
  if (!hasValidStudent()) {
    renderAccess(scope);
    return;
  }
  const session = getSession(scope.sessionId);
  const range = getScopeRange(session, scope);
  const navNumbers = createNumberRange(range.from, range.to);
  const availableNumbers = navNumbers.filter(number => getQuestion(session.id, number));

  if (state.mode === "ai-studio") {
    openAiStudioPractice(session, scope, range, availableNumbers);
    return;
  }

  storageRemove(SUBMISSION_KEY);

  state = {
    ...state,
    screen: "exam",
    sessionId: session.id,
    scope: { ...scope, from: range.from, to: range.to, label: range.label },
    navNumbers,
    availableNumbers,
    currentNumber: availableNumbers[0] || range.from,
    answers: {},
    marked: {},
    startedAt: new Date().toISOString(),
    finishedAt: null,
    student: { ...state.student },
    remainingSeconds: state.mode === "entrenamiento" ? 0 : session.durationMinutes * 60,
    finished: false,
    secureExam: createSecureExamState(),
    timerWarningsShown: {}
  };

  homeBtn.classList.remove("hidden");
  updateHeaderSessionButtons();
  saveState();
  renderExam({ scrollToTimer: true });
  requestSecureExamFullscreen();
  if (state.mode !== "entrenamiento") startTimer();
}

function openAiStudioPractice(session, scope, range, availableNumbers = []) {
  const params = new URLSearchParams({
    session: String(session.id),
    from: String(range.from),
    to: String(range.to),
    label: range.label || "Sesión completa",
    area: scope.area || "",
    scopeType: scope.type || "session",
    available: String(availableNumbers.length || 0)
  });
  if (state.student) {
    storageSet(STUDENT_KEY, JSON.stringify(state.student));
  }
  window.location.href = `ai-studio-practica.html?${params.toString()}`;
}

function renderExam({ scrollToTimer = false } = {}) {
  updateHeaderSessionButtons();
  const session = getSession(state.sessionId);
  const loaded = state.availableNumbers.length;

  if (!loaded) {
    clearTimer();
    app.innerHTML = `
      <section class="empty-state">
        <p class="eyebrow">${session.label} · ${state.scope.label}</p>
        <h2>Este bloque todavía no tiene preguntas disponibles</h2>
        <p>La estructura ya está preparada para este rango de preguntas (${state.scope.from} a ${state.scope.to}). Cuando envíes las preguntas, se irán incorporando al banco interno del simulador.</p>
        <button class="primary-btn" type="button" id="backHomeEmpty">Volver al inicio</button>
      </section>
    `;
    document.getElementById("backHomeEmpty").addEventListener("click", renderHome);
    return;
  }

  const question = getQuestion(state.sessionId, state.currentNumber) || getQuestion(state.sessionId, state.availableNumbers[0]);
  if (!question) return;
  state.currentNumber = question.number;
  const answeredCount = state.availableNumbers.filter(number => state.answers[getAnswerKey(number)]).length;
  const progress = loaded ? Math.round((answeredCount / loaded) * 100) : 0;

  app.innerHTML = `
    ${renderGoogleSitesFullscreenNotice()}
    <section class="exam-layout">
      <article class="exam-main">
        <div class="exam-top">
          <div>
            <p class="eyebrow">${session.label} · ${session.title}</p>
            <h2 class="exam-title">${state.scope.label}</h2>
            <div class="exam-meta">
              <span class="pill">Modo: ${getModeLabel(state.mode)}</span>
              <span class="pill success">Disponibles: ${loaded}</span>
              <span class="pill muted">Rango: ${state.scope.from}-${state.scope.to}</span>
            </div>
          </div>
          <div class="timer-box" id="timerBox" tabindex="-1">
            <div class="timer" id="timerText">${state.mode === "entrenamiento" ? "Sin tiempo" : formatSeconds(state.remainingSeconds)}</div>
            <span class="timer-label">${state.mode === "entrenamiento" ? "Entrenamiento" : "Tiempo restante"}</span>
          </div>
        </div>
        <div class="progress-wrap">
          <div class="progress-text"><span id="answeredCounter">Respondidas: ${answeredCount}/${loaded}</span><span id="progressPercent">${progress}%</span></div>
          <div class="progress-bar"><span id="progressBar" style="width:${progress}%"></span></div>
        </div>
        ${renderSecureExamInlineStatus()}
        <div class="question-card" id="questionCard"></div>
      </article>

      <aside class="exam-side" aria-label="Navegación de preguntas">
        <h3 class="side-title">Panel de preguntas</h3>
        <div class="legend">
          ${state.mode === "practica" ? `<span class="notebook-ready"><i></i>Notebook completo</span>` : ""}
          <span class="answered"><i></i>Respondida</span>
          <span class="marked"><i></i>Marcada para revisar</span>
        </div>
        <div class="question-grid" id="questionGrid"></div>
      </aside>
    </section>
  `;

  updateSecureExamBadge();
  renderQuestion(question);
  renderQuestionGrid();
  if (state.mode === "practica") ensureNotebookPanelResources();
  if (scrollToTimer) scrollToTimerBox();
  else app.focus();
}

function renderQuestion(question) {
  const key = getAnswerKey(question.number);
  const selected = state.answers[key] || "";
  const showFeedback = state.mode === "practica" && selected;
  const card = document.getElementById("questionCard");
  const resources = renderResources([...(question.resources || []), ...(question.context || [])]);
  const options = question.options.map(option => {
    const isSelected = selected === option.letter;
    const isCorrect = showFeedback && option.letter === question.correctAnswer;
    const isIncorrect = showFeedback && isSelected && option.letter !== question.correctAnswer;
    return `
      <button class="option ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isIncorrect ? "incorrect" : ""}" type="button" data-answer="${option.letter}">
        <span class="option-letter">${option.letter}</span>
        ${option.isHtml ? `<div class="option-rich">${option.text}</div>` : `<span>${option.text}</span>`}
      </button>
    `;
  }).join("");

  card.innerHTML = `
    <div class="question-head">
      <div>
        <p class="eyebrow">${question.sourceLabel || `Pregunta ${question.number}`}</p>
        <h3 class="question-title">Pregunta ${question.number} · ${question.area}</h3>
      </div>
      <span class="pill ${question.scored ? "success" : "muted"}">${question.scored ? "Calificable" : "No calificable"}</span>
    </div>
    <p class="question-text">${question.stem}</p>
    ${resources}
    ${state.mode === "practica" ? renderPracticeNotebookSection(question) : ""}
    <p class="prompt">${question.prompt}</p>
    <div class="options">${options}</div>
    ${showFeedback ? renderFeedback(question, selected) : ""}
    <div class="question-actions">
      <button class="secondary-btn" type="button" id="markBtn">${state.marked[key] ? "Quitar marca" : "Marcar para revisar"}</button>
      <div class="nav-group">
        <button class="nav-btn secondary-btn" type="button" id="prevBtn">Anterior</button>
        <button class="nav-btn secondary-btn" type="button" id="nextBtn">Siguiente</button>
      </div>
    </div>
    <div class="bottom-actions" style="margin-top:18px">
      <p class="footer-note">Competencia: ${question.competencia || "Por definir"} · Componente: ${question.componente || "Por definir"} · Dificultad: ${question.dificultad || "Por definir"}</p>
      <button class="danger-btn" type="button" id="finishBtn">Finalizar intento</button>
    </div>
  `;

  card.querySelectorAll(".option").forEach(button => {
    button.addEventListener("click", () => {
      state.answers[key] = button.dataset.answer;
      saveState();

      // Al seleccionar una respuesta, el simulador permanece en la misma zona de lectura.
      // La navegación solo cambia de pregunta con Anterior, Siguiente o el panel numérico.
      renderQuestion(question);
      renderQuestionGrid();
      updateProgressUI();
    });
  });

  card.querySelectorAll("[data-notebook-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      prepareNotebookNavigation(question);
      window.location.href = link.href;
    });
  });

  document.getElementById("markBtn").addEventListener("click", () => {
    state.marked[key] = !state.marked[key];
    saveState();
    renderQuestion(question);
    renderQuestionGrid();
  });

  document.getElementById("prevBtn").addEventListener("click", () => moveLoadedQuestion(-1));
  document.getElementById("nextBtn").addEventListener("click", () => moveLoadedQuestion(1));
  document.getElementById("finishBtn").addEventListener("click", finishAttempt);
}

function renderResources(resources) {
  if (!resources.length) return "";
  return resources.map(resource => {
    if (resource.type === "table") {
      const head = resource.headers.map(header => `<th>${header}</th>`).join("");
      const rows = resource.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("");
      return `
        <div class="question-resource">
          <div class="table-wrap" style="max-width:520px;margin:auto">
            <table class="data-table" aria-label="${resource.caption || "Tabla"}">
              <thead><tr>${head}</tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      `;
    }
    if (resource.type === "image") {
      return `
        <figure class="question-resource">
          <img src="${resource.src}" alt="${resource.alt || "Imagen de la pregunta"}" style="max-width:100%;border-radius:18px;border:1px solid var(--line)">
          ${resource.caption ? `<figcaption class="footer-note">${resource.caption}</figcaption>` : ""}
        </figure>
      `;
    }
    if (resource.type === "html") return `<div class="question-resource">${resource.html || resource.content || ""}</div>`;
    return "";
  }).join("");
}


function prepareNotebookNavigation(question) {
  if (!question) return;
  state.currentNumber = Number(question.number) || state.currentNumber;
  saveState();
  storageSet(NOTEBOOK_RETURN_KEY, JSON.stringify({
    savedAt: new Date().toISOString(),
    source: "notebook",
    sessionId: state.sessionId,
    questionNumber: state.currentNumber,
    mode: state.mode,
    student: state.student,
    state
  }));
}

function renderPracticeNotebookSection(question) {
  const sessionParam = encodeURIComponent(String(question.session));
  const questionParam = encodeURIComponent(String(question.number));
  const returnUrl = encodeURIComponent(`index.html?volverPregunta=1&session=${sessionParam}&question=${questionParam}&mode=practica`);
  const baseUrl = `notebook.html?session=${sessionParam}&question=${questionParam}&return=${returnUrl}`;
  const tools = [
    { key: "mindmap", icon: "🧠", label: "Mapa mental", text: "Organiza conceptos clave de la pregunta." },
    { key: "video", icon: "🎬", label: "Video", text: "Guía audiovisual para comprender el reto." },
    { key: "audio", icon: "🎧", label: "Audio", text: "Escucha una orientación breve de estudio." },
    { key: "presentation", icon: "📊", label: "Presentación", text: "Revisa pasos y estrategias de solución." },
    { key: "infographic", icon: "🖼️", label: "Infografía", text: "Sintetiza la información en lectura visual." },
    { key: "simulator", icon: "🧩", label: "Simulador", text: "Practica la solución con una experiencia interactiva." }
  ];

  return `
    <section class="practice-notebook" aria-label="Notebook de preparación individual para esta pregunta">
      <div class="practice-notebook__head">
        <div>
          <p class="eyebrow">Solo en Entrenamiento con Notebook</p>
          <h4>Notebook de la pregunta ${question.number}</h4>
          <p>Recursos individuales para esta pregunta: mapa mental, video, audio, presentación, infografía y simulador interactivo. Preparan la comprensión sin revelar la respuesta.</p>
        </div>
        <a class="secondary-btn notebook-main-link" href="${baseUrl}" data-notebook-link="true">Abrir notebook completo</a>
      </div>
      <p id="notebookInlineStatus" class="notebook-inline-status">${getNotebookPanelStatusLabel(question.session, question.number)}</p>
      <div class="notebook-resource-grid">
        ${tools.map(tool => {
          const resources = NOTEBOOK_PANEL_CACHE.resources[`${Number(question.session)}-${Number(question.number)}`] || {};
          const ready = tool.key === "simulator" || Boolean(resources[tool.key]);
          const statusText = tool.key === "simulator"
            ? "Interactivo interno"
            : ready
              ? "Disponible desde Sheets"
              : NOTEBOOK_PANEL_CACHE.loading
                ? "Consultando Sheets"
                : "Pendiente en Sheets";
          return `
            <a class="notebook-mini-card ${ready ? "resource-ready" : "resource-pending"}" href="${baseUrl}&resource=${encodeURIComponent(tool.key)}" data-notebook-link="true" data-resource="${tool.key}">
              <span class="notebook-mini-card__icon">${tool.icon}</span>
              <strong>${tool.label}</strong>
              <small>${tool.text}</small>
              <em class="notebook-mini-status">${statusText}</em>
            </a>
          `;
        }).join("")}
      </div>
    </section>
  `;
}


function updateProgressUI() {
  const loaded = state.availableNumbers.length;
  const answeredCount = state.availableNumbers.filter(number => state.answers[getAnswerKey(number)]).length;
  const progress = loaded ? Math.round((answeredCount / loaded) * 100) : 0;

  const answeredCounter = document.getElementById("answeredCounter");
  const progressPercent = document.getElementById("progressPercent");
  const progressBar = document.getElementById("progressBar");

  if (answeredCounter) answeredCounter.textContent = `Respondidas: ${answeredCount}/${loaded}`;
  if (progressPercent) progressPercent.textContent = `${progress}%`;
  if (progressBar) progressBar.style.width = `${progress}%`;
}

function renderFeedback(question, selected) {
  const ok = selected === question.correctAnswer;
  return `
    <div class="feedback">
      <strong>${ok ? "Respuesta correcta." : `Respuesta incorrecta. La correcta es ${question.correctAnswer}.`}</strong><br>
      ${question.explanation || "Aún no se ha registrado retroalimentación para esta pregunta."}
    </div>
  `;
}

function renderQuestionGrid() {
  const grid = document.getElementById("questionGrid");
  grid.innerHTML = state.navNumbers.map(number => {
    const question = getQuestion(state.sessionId, number);
    const key = getAnswerKey(number);
    const classes = ["q-dot"];
    if (!question) classes.push("missing");
    if (question && state.mode === "practica" && hasNotebookPanelComplete(state.sessionId, number)) classes.push("notebook-ready");
    if (number === state.currentNumber) classes.push("active");
    if (state.answers[key]) classes.push("answered");
    if (state.marked[key]) classes.push("marked");
    const notebookStatus = question && state.mode === "practica" ? getNotebookPanelStatusLabel(state.sessionId, number) : "";
    const ariaLabel = question ? `Pregunta ${number}${notebookStatus ? `. ${notebookStatus}` : ""}` : `Pregunta ${number}. No disponible todavía`;
    return `<button class="${classes.join(" ")}" type="button" data-number="${number}" title="${escapeAttr(notebookStatus || ariaLabel)}" aria-label="${escapeAttr(ariaLabel)}" ${question ? "" : "disabled"}>${number}</button>`;
  }).join("");

  grid.querySelectorAll("button:not(:disabled)").forEach(button => {
    button.addEventListener("click", () => {
      state.currentNumber = Number(button.dataset.number);
      saveState();
      renderExam({ scrollToTimer: true });
    });
  });

  keepActiveQuestionVisibleInPanel();
}

function keepActiveQuestionVisibleInPanel() {
  const grid = document.getElementById("questionGrid");
  if (!grid) return;

  requestAnimationFrame(() => {
    const activeButton = grid.querySelector(`.q-dot[data-number="${state.currentNumber}"]`);
    if (!activeButton) return;

    const targetTop = activeButton.offsetTop - (grid.clientHeight / 2) + (activeButton.offsetHeight / 2);
    const maxTop = Math.max(grid.scrollHeight - grid.clientHeight, 0);
    const nextTop = Math.min(Math.max(targetTop, 0), maxTop);

    if (typeof grid.scrollTo === "function") {
      grid.scrollTo({ top: nextTop, behavior: "auto" });
    } else {
      grid.scrollTop = nextTop;
    }
  });
}

function moveLoadedQuestion(direction) {
  const index = state.availableNumbers.indexOf(state.currentNumber);
  if (index < 0) return;
  let nextIndex = index + direction;
  if (nextIndex < 0) nextIndex = state.availableNumbers.length - 1;
  if (nextIndex >= state.availableNumbers.length) nextIndex = 0;
  state.currentNumber = state.availableNumbers[nextIndex];
  saveState();
  renderExam({ scrollToTimer: true });
}

function finishAttempt() {
  if (state.screen !== "exam") return;
  const loaded = state.availableNumbers.length;
  const answered = state.availableNumbers.filter(number => state.answers[getAnswerKey(number)]).length;
  const pending = Math.max(loaded - answered, 0);
  const message = pending > 0
    ? `Has respondido ${answered} de ${loaded} preguntas disponibles. Quedan ${pending} sin responder. ¿Deseas finalizar el intento y ver los resultados?`
    : "Has respondido todas las preguntas disponibles. ¿Deseas finalizar el intento y ver los resultados?";

  openActionDialog({
    title: "Finalizar intento",
    message,
    confirmText: "Sí, finalizar",
    cancelText: "Seguir respondiendo",
    danger: true,
    onConfirm: completeAttempt
  });
}

function completeAttempt() {
  stopSecureAwayTimer();
  clearTimer();
  state.finished = true;
  state.finishedAt = new Date().toISOString();
  saveAttemptToHistory();
  storageRemove(STORAGE_KEY);
  renderResults();
  scrollToPageTop();
  if (REPORT_AUTOSEND_ON_FINISH) {
    sendReportEmail({ automatic: true });
  }
}

function renderResults() {
  updateHeaderSessionButtons();
  const result = buildResultData();

  const areaRows = result.byArea.map(row => `
    <tr>
      <td>${escapeHtml(row.area)}</td>
      <td>${row.total}</td>
      <td>${row.answered}</td>
      <td>${row.correct}</td>
      <td>${row.incorrect}</td>
      <td>${row.omitted}</td>
      <td><strong>${row.percent}%</strong></td>
      <td>${escapeHtml(row.level || getInternalPerformanceLevel(row.percent))}</td>
    </tr>
  `).join("");

  const review = result.details.map(item => `
    <div class="review-item">
      <strong>Pregunta ${item.number} · ${escapeHtml(item.area)}</strong>
      <p><strong>Respuesta del estudiante:</strong> ${escapeHtml(item.studentAnswer)} · <strong>Respuesta correcta:</strong> ${escapeHtml(item.correctAnswer)} · <strong>Resultado:</strong> ${escapeHtml(item.result)}</p>
      <p><strong>Competencia:</strong> ${escapeHtml(item.competence)} · <strong>Componente:</strong> ${escapeHtml(item.component)} · <strong>Dificultad:</strong> ${escapeHtml(item.difficulty)}</p>
      <p>${escapeHtml(item.explanation)}</p>
    </div>
  `).join("");

  app.innerHTML = `
    <section class="results-panel">
      <div class="result-top">
        <div>
          <p class="eyebrow">${escapeHtml(result.institutionName)}</p>
          <h2>Informe detallado de resultados · ${escapeHtml(result.sessionLabel)} · ${escapeHtml(result.scopeLabel)}</h2>
          <p class="student-result-name">Estudiante: <strong>${escapeHtml(result.studentName)}</strong> · Grupo: <strong>${escapeHtml(result.studentGroup)}</strong> · Correo: <strong>${escapeHtml(result.studentEmail)}</strong></p>
        </div>
        <span class="pill success">Puntaje interno: ${result.score}%</span>
      </div>

      ${renderSecurityFinalAlert(result)}

      <div class="report-meta-grid">
        <div><span>Institución educativa</span><strong>${escapeHtml(result.institutionName)}</strong></div>
        <div><span>Fecha de finalización</span><strong>${escapeHtml(result.finishedAtLabel)}</strong></div>
        <div><span>Grupo</span><strong>${escapeHtml(result.studentGroup)}</strong></div>
        <div><span>Correo del estudiante</span><strong>${escapeHtml(result.studentEmail)}</strong></div>
        <div><span>Modo</span><strong>${escapeHtml(result.modeLabel)}</strong></div>
        <div><span>Preguntas disponibles</span><strong>${result.totalQuestions}</strong></div>
        <div><span>Tiempo empleado</span><strong>${escapeHtml(result.elapsedLabel)}</strong></div>
        <div><span>Nivel interno</span><strong>${escapeHtml(result.performanceLevel)}</strong></div>
      </div>

      ${renderSecurityReport(result)}

      <div class="result-grid">
        <div class="result-card"><strong>${result.score}%</strong><span>Porcentaje de acierto</span></div>
        <div class="result-card"><strong>${result.correct}</strong><span>Correctas</span></div>
        <div class="result-card"><strong>${result.incorrect}</strong><span>Incorrectas</span></div>
        <div class="result-card"><strong>${result.omitted}</strong><span>Omitidas</span></div>
        <div class="result-card level-card"><strong>${escapeHtml(result.performanceLevel)}</strong><span>Nivel interno</span></div>
      </div>

      <div class="results-chart-grid" aria-label="Gráficos de resultados">
        ${renderStatusChart(result)}
        ${renderAreaChart(result)}
      </div>

      <h3>Resultado por área</h3>
      <div class="table-wrap">
        <table class="structure-table">
          <thead><tr><th>Área</th><th>Preguntas</th><th>Respondidas</th><th>Correctas</th><th>Incorrectas</th><th>Omitidas</th><th>Resultado</th><th>Nivel interno</th></tr></thead>
          <tbody>${areaRows || `<tr><td colspan="8">No hay preguntas calificables disponibles.</td></tr>`}</tbody>
        </table>
      </div>

      <div class="session-actions report-actions">
        <button class="primary-btn" type="button" id="newAttemptBtn">Nuevo intento</button>
        <button class="secondary-btn" type="button" id="downloadPdfBtn">Descargar informe PDF</button>
        <button class="secondary-btn send-report-btn" type="button" id="sendPdfBtn">Enviar informe PDF</button>
      </div>
      <div id="emailReportStatus" class="email-report-status" role="status" aria-live="polite"></div>

      ${renderDetailedReviewSection(result, review)}
    </section>
  `;

  document.getElementById("newAttemptBtn").addEventListener("click", renderHome);
  document.getElementById("downloadPdfBtn").addEventListener("click", downloadPdfReport);
  document.getElementById("sendPdfBtn").addEventListener("click", () => sendReportEmail({ automatic: false }));
  const securityNewAttemptBtn = document.getElementById("securityNewAttemptBtn");
  if (securityNewAttemptBtn) {
    securityNewAttemptBtn.addEventListener("click", renderHome);
  }
  playSecurityFinalAlertIfNeeded(result);
  if (isReportEmailAlreadySent(result)) {
    updateReportEmailStatus("El informe de este intento ya fue enviado una sola vez.", "success");
    updateSendReportButtonSentState();
  } else {
    updateReportEmailStatus(getReportEmailInitialMessage(), REPORT_EMAIL_ENDPOINT ? "info" : "warning");
  }
}

function renderStatusChart(result) {
  const total = Math.max(result.scored, 1);
  const parts = [
    { label: "Correctas", value: result.correct, className: "correct" },
    { label: "Incorrectas", value: result.incorrect, className: "incorrect" },
    { label: "Omitidas", value: result.omitted, className: "omitted" }
  ].map(part => ({ ...part, percent: Math.round((part.value / total) * 100) }));

  const stackedSegments = parts.map(part => `
    <span class="stacked-segment ${part.className}" style="width:${part.percent}%" title="${part.label}: ${part.value}"></span>
  `).join("");

  const rows = parts.map(part => `
    <div class="status-chart-row">
      <div class="status-chart-label"><i class="${part.className}"></i><span>${part.label}</span></div>
      <strong>${part.value}</strong>
      <span>${part.percent}%</span>
    </div>
  `).join("");

  return `
    <article class="result-chart-card">
      <div class="chart-heading">
        <div>
          <p class="eyebrow">Gráfico general</p>
          <h3>Distribución de respuestas</h3>
        </div>
        <span class="chart-score">${result.score}%</span>
      </div>
      <div class="score-ring" style="--score:${result.score}">
        <div><strong>${result.score}%</strong><span>Acierto</span></div>
      </div>
      <div class="stacked-bar" aria-hidden="true">${stackedSegments}</div>
      <div class="status-chart-table">${rows}</div>
    </article>
  `;
}

function renderAreaChart(result) {
  if (!result.byArea.length) {
    return `
      <article class="result-chart-card">
        <p class="eyebrow">Gráfico por área</p>
        <h3>Desempeño por área</h3>
        <p class="footer-note">No hay preguntas calificables disponibles para generar el gráfico.</p>
      </article>
    `;
  }

  const rows = result.byArea.map(row => `
    <div class="area-chart-row">
      <div class="area-chart-label">
        <strong>${escapeHtml(row.area)}</strong>
        <span>${row.correct}/${row.total} correctas · ${row.answered} respondidas · ${escapeHtml(row.level || getInternalPerformanceLevel(row.percent))}</span>
      </div>
      <div class="area-chart-track"><span style="width:${row.percent}%"></span></div>
      <strong class="area-chart-percent">${row.percent}%</strong>
    </div>
  `).join("");

  return `
    <article class="result-chart-card area-chart-card">
      <p class="eyebrow">Gráfico por área</p>
      <h3>Desempeño por área</h3>
      <div class="area-chart-list">${rows}</div>
    </article>
  `;
}

function getTimerWarningTitle(seconds) {
  if (seconds <= 0) return "Tiempo finalizado";
  if (seconds >= 60) {
    const minutes = Math.round(seconds / 60);
    return `Quedan ${minutes} minutos`;
  }
  return `Quedan ${seconds} segundos`;
}

function getTimerWarningMessage(seconds) {
  if (seconds <= 0) {
    return "El tiempo de esta sección terminó. El sistema mostrará el informe del intento.";
  }
  if (seconds === 30 * 60) {
    return "Organiza tu tiempo: revisa las preguntas pendientes y prioriza las que puedas responder con seguridad.";
  }
  if (seconds === 10 * 60) {
    return "Últimos 10 minutos: verifica tus respuestas y evita dejar preguntas sin marcar.";
  }
  if (seconds === 5 * 60) {
    return "Quedan 5 minutos: revisa rápidamente las preguntas marcadas o pendientes.";
  }
  if (seconds === 60) {
    return "Último minuto: asegúrate de finalizar correctamente el intento.";
  }
  return "Continúa la prueba sin salir de la plataforma.";
}

function showTimerWarningModal(seconds, options = {}) {
  const previous = document.getElementById("timerWarningModal");
  if (previous) previous.remove();

  const modal = document.createElement("aside");
  modal.id = "timerWarningModal";
  modal.className = `timer-warning-modal ${options.final ? "timer-warning-final" : ""}`;
  modal.setAttribute("role", "status");
  modal.setAttribute("aria-live", "polite");
  modal.innerHTML = `
    <div class="timer-warning-icon">⏰</div>
    <div class="timer-warning-body">
      <strong>${getTimerWarningTitle(seconds)}</strong>
      <span>${getTimerWarningMessage(seconds)}</span>
    </div>
    <button class="timer-warning-close" type="button" aria-label="Cerrar aviso de tiempo">×</button>
  `;

  document.body.appendChild(modal);
  const close = () => modal.remove();
  const closeBtn = modal.querySelector(".timer-warning-close");
  if (closeBtn) closeBtn.addEventListener("click", close);
  window.setTimeout(() => {
    if (document.body.contains(modal)) close();
  }, options.final ? 9000 : 12000);
}

function maybeShowTimerWarning(seconds) {
  if (!TIMER_WARNING_SECONDS.has(seconds)) return;
  if (!state.timerWarningsShown || typeof state.timerWarningsShown !== "object") state.timerWarningsShown = {};
  const key = `s${seconds}`;
  if (state.timerWarningsShown[key]) return;
  state.timerWarningsShown[key] = new Date().toISOString();
  showTimerWarningModal(seconds);
}

function startTimer() {
  clearTimer();
  if (!state.timerWarningsShown || typeof state.timerWarningsShown !== "object") state.timerWarningsShown = {};
  timerInterval = setInterval(() => {
    state.remainingSeconds = Math.max(0, state.remainingSeconds - 1);
    const timerText = document.getElementById("timerText");
    if (timerText) timerText.textContent = formatSeconds(state.remainingSeconds);
    maybeShowTimerWarning(state.remainingSeconds);
    if (state.remainingSeconds <= 0) {
      stopSecureAwayTimer();
      clearTimer();
      state.finished = true;
      state.finishedAt = new Date().toISOString();
      saveAttemptToHistory();
      storageRemove(STORAGE_KEY);
      renderResults();
      scrollToPageTop();
      showTimerWarningModal(0, { final: true });
    } else {
      saveState();
    }
  }, 1000);
}

function clearTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

function getScopeRange(session, scope) {
  if (scope.type === "block") {
    return { from: scope.from, to: scope.to, label: scope.area };
  }
  return { from: 1, to: session.totalQuestions, label: session.title };
}

function getSession(sessionId) {
  return EXAM_STRUCTURE.find(session => session.id === Number(sessionId));
}

function getQuestion(sessionId, number) {
  return QUESTION_BANK.find(q => q.session === Number(sessionId) && q.number === Number(number));
}

function getLoadedQuestionsForSession(sessionId) {
  return QUESTION_BANK.filter(q => q.session === Number(sessionId));
}

function getLoadedQuestionsInRange(sessionId, from, to) {
  return QUESTION_BANK.filter(q => q.session === Number(sessionId) && q.number >= from && q.number <= to);
}

function getAnswerKey(number) {
  return `s${state.sessionId}-q${number}`;
}

function createNumberRange(from, to) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

function formatMinutes(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h} h ${m} min`;
}

function formatSeconds(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map(value => String(value).padStart(2, "0")).join(":");
}

function getModeLabel(mode) {
  if (!mode) return "Modo no seleccionado";
  return WORK_MODE_LABELS[mode] || mode;
}

function getInternalPerformanceLevel(score) {
  const value = Number(score) || 0;
  if (value >= 76) return "Nivel 4 - Avanzado";
  if (value >= 61) return "Nivel 3 - Satisfactorio";
  if (value >= 41) return "Nivel 2 - Básico";
  return "Nivel 1 - Bajo";
}

function getInternalPerformanceRecommendation(score) {
  const value = Number(score) || 0;
  if (value >= 76) return "Mantener desempeño alto con simulacros cronometrados y preguntas de mayor complejidad.";
  if (value >= 61) return "Fortalecer áreas específicas con error recurrente y mejorar velocidad de respuesta.";
  if (value >= 41) return "Implementar refuerzo por competencias, revisión de conceptos base y práctica guiada.";
  return "Priorizar acompañamiento intensivo, lectura de enunciados y recuperación de aprendizajes fundamentales.";
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function groupBy(items, callback) {
  return items.reduce((acc, item) => {
    const key = callback(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

function saveState() {
  enforceSimulacroMode();
  if (state.screen === "exam" && !state.finished) {
    storageSet(STORAGE_KEY, JSON.stringify(state));
  }
}

function resumeSavedAttempt() {
  const raw = storageGet(STORAGE_KEY);
  if (!raw) {
    alert("No hay un intento guardado en este navegador.");
    return;
  }
  try {
    const saved = JSON.parse(raw);
    const session = getSession(saved.sessionId);
    if (!session) throw new Error("Sesión no encontrada");
    const savedMode = normalizeWorkMode(saved.mode || ACTIVE_WORK_MODE);
    state = { ...state, ...saved, mode: savedMode, finished: false };
    if (saved.mode !== state.mode || !Number(state.remainingSeconds)) {
      state.remainingSeconds = state.mode === "entrenamiento" ? 0 : session.durationMinutes * 60;
    }
    if (saved.student) state.student = saved.student;
    if (!hasValidStudent()) {
      const savedStudent = loadSavedStudent();
      if (savedStudent) state.student = savedStudent;
    }
    if (!hasValidStudent()) {
      renderAccess();
      return;
    }
    if (!state.timerWarningsShown || typeof state.timerWarningsShown !== "object") state.timerWarningsShown = {};
    ensureSecureExamState();
    homeBtn.classList.remove("hidden");
    renderExam({ scrollToTimer: true });
    requestSecureExamFullscreen();
    if (state.mode !== "entrenamiento") startTimer();
  } catch (error) {
    alert("No fue posible recuperar el intento guardado.");
    storageRemove(STORAGE_KEY);
  }
}

function saveAttemptToHistory() {
  const history = storageJson(HISTORY_KEY, []);
  history.unshift({
    date: new Date().toISOString(),
    sessionId: state.sessionId,
    scope: state.scope,
    answers: state.answers,
    marked: state.marked,
    mode: state.mode,
    student: state.student,
    secureExam: state.secureExam,
    startedAt: state.startedAt,
    finishedAt: state.finishedAt || new Date().toISOString()
  });
  storageSet(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

function getCurrentSubmissionId() {
  let id = storageGet(SUBMISSION_KEY, "");
  if (!id) {
    const base = [
      getStudentEmail(),
      getStudentGroup(),
      state.sessionId || "sesion",
      state.startedAt || new Date().toISOString(),
      Math.random().toString(36).slice(2)
    ].join("|");
    id = `MJB-${Date.now()}-${Math.abs(hashString(base))}`;
    storageSet(SUBMISSION_KEY, id);
  }
  return id;
}

function hashString(value) {
  let hash = 0;
  const text = String(value || "");
  for (let i = 0; i < text.length; i += 1) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function buildResultData() {
  const session = getSession(state.sessionId) || { label: "Sección", title: "Sesión" };
  const loadedQuestions = state.availableNumbers.map(number => getQuestion(state.sessionId, number)).filter(Boolean);
  const scored = loadedQuestions.filter(q => q.scored !== false);
  const answeredQuestions = loadedQuestions.filter(q => state.answers[getAnswerKey(q.number)]);
  const correct = scored.filter(q => state.answers[getAnswerKey(q.number)] === q.correctAnswer).length;
  const incorrect = scored.filter(q => state.answers[getAnswerKey(q.number)] && state.answers[getAnswerKey(q.number)] !== q.correctAnswer).length;
  const omitted = scored.length - correct - incorrect;
  const score = scored.length ? Math.round((correct / scored.length) * 100) : 0;
  const byArea = Object.entries(groupBy(scored, q => q.area)).map(([area, questions]) => {
    const areaAnswered = questions.filter(q => state.answers[getAnswerKey(q.number)]).length;
    const areaCorrect = questions.filter(q => state.answers[getAnswerKey(q.number)] === q.correctAnswer).length;
    const areaIncorrect = questions.filter(q => state.answers[getAnswerKey(q.number)] && state.answers[getAnswerKey(q.number)] !== q.correctAnswer).length;
    const areaOmitted = questions.length - areaCorrect - areaIncorrect;
    const percent = questions.length ? Math.round((areaCorrect / questions.length) * 100) : 0;
    return {
      area,
      total: questions.length,
      answered: areaAnswered,
      correct: areaCorrect,
      incorrect: areaIncorrect,
      omitted: areaOmitted,
      percent,
      level: getInternalPerformanceLevel(percent)
    };
  });

  const details = loadedQuestions.map(q => {
    const ans = state.answers[getAnswerKey(q.number)] || "Sin responder";
    const result = getQuestionResultLabel(q, ans);
    return {
      number: q.number,
      area: q.area,
      studentAnswer: ans,
      correctAnswer: q.correctAnswer || "No aplica",
      result,
      competence: q.competencia || "Por definir",
      component: q.componente || "Por definir",
      difficulty: q.dificultad || "Por definir",
      explanation: q.explanation || "Sin explicación registrada."
    };
  });

  const performanceLevel = getInternalPerformanceLevel(score);
  const performanceRecommendation = getInternalPerformanceRecommendation(score);
  const security = buildSecurityReportData();

  return {
    submissionId: getCurrentSubmissionId(),
    institutionName: INSTITUTION_NAME,
    studentName: getStudentFullName(),
    studentGroup: getStudentGroup(),
    studentEmail: getStudentEmail(),
    sessionLabel: session.label || `Sección ${state.sessionId}`,
    sessionTitle: session.title || "Sesión",
    scopeLabel: state.scope ? state.scope.label : "Intento",
    modeLabel: getModeLabel(state.mode),
    startedAt: state.startedAt,
    finishedAt: state.finishedAt || new Date().toISOString(),
    finishedAtLabel: formatDateTime(state.finishedAt || new Date().toISOString()),
    elapsedLabel: formatElapsedTime(state.startedAt, state.finishedAt || new Date().toISOString()),
    totalQuestions: loadedQuestions.length,
    answered: answeredQuestions.length,
    scored: scored.length,
    correct,
    incorrect,
    omitted,
    score,
    performanceLevel,
    performanceRecommendation,
    security,
    byArea,
    details
  };
}

function getQuestionResultLabel(question, answer) {
  if (question.scored === false) return "No calificable";
  if (!answer || answer === "Sin responder") return "Omitida";
  return answer === question.correctAnswer ? "Correcta" : "Incorrecta";
}

function formatDateTime(value) {
  if (!value) return "No registrado";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No registrado";
  return date.toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });
}

function formatElapsedTime(startValue, endValue) {
  if (!startValue || !endValue) return "No registrado";
  const start = new Date(startValue).getTime();
  const end = new Date(endValue).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return "No registrado";
  return formatSeconds(Math.round((end - start) / 1000));
}

function downloadPdfReport() {
  const result = buildResultData();
  const pdf = createChartPdf(result);
  const filename = getReportFileName(result);
  downloadBlob(filename, new Blob([pdf], { type: "application/pdf" }));
}

function getReportEmailInitialMessage() {
  if (!REPORT_EMAIL_ENDPOINT) {
    return `Envío automático pendiente de activar: pega la URL /exec de Google Apps Script en la constante REPORT_EMAIL_ENDPOINT. El informe se enviará al estudiante y a ${REPORT_INSTITUTION_EMAIL}, y quedará registrado para el análisis institucional de la ${INSTITUTION_NAME}.`;
  }
  return `Al finalizar, se envía un único correo al estudiante desde Simulador ICFES con el PDF adjunto. No se envía copia institucional por correo, no se envía enlace PDF adicional y no se genera notificación de Google Drive. El resultado se conserva para el dashboard institucional.`;
}

function updateReportEmailStatus(message, kind = "info") {
  const status = document.getElementById("emailReportStatus");
  if (!status) return;
  status.textContent = message || "";
  status.dataset.kind = kind;
}

function getReportEmailSentKey(result) {
  const id = result && result.submissionId ? result.submissionId : getCurrentSubmissionId();
  return `${REPORT_EMAIL_SENT_PREFIX}${id}`;
}

function isReportEmailAlreadySent(result) {
  return storageGet(getReportEmailSentKey(result), "") === "sent";
}

function markReportEmailAsSent(result) {
  storageSet(getReportEmailSentKey(result), "sent");
  storageRemove(getReportEmailLockKey(result));
}

function getReportEmailLockKey(result) {
  const id = result && result.submissionId ? result.submissionId : getCurrentSubmissionId();
  return `${REPORT_EMAIL_LOCK_PREFIX}${id}`;
}

function isReportEmailLocked(result) {
  const raw = storageGet(getReportEmailLockKey(result), "");
  if (!raw) return false;
  const started = Number(raw) || 0;
  const maxLockMs = 10 * 60 * 1000;
  if (Date.now() - started > maxLockMs) {
    storageRemove(getReportEmailLockKey(result));
    return false;
  }
  return true;
}

function lockReportEmailSending(result) {
  storageSet(getReportEmailLockKey(result), String(Date.now()));
}

function unlockReportEmailSending(result) {
  storageRemove(getReportEmailLockKey(result));
}

function updateSendReportButtonSentState() {
  const sendBtn = document.getElementById("sendPdfBtn");
  if (!sendBtn) return;
  sendBtn.disabled = true;
  sendBtn.textContent = "Informe enviado";
  sendBtn.title = "El informe ya fue enviado una sola vez para este intento.";
}

function getReportFileName(result) {
  return `informe-icfes-manuel-j-betancur-${slugify(result.studentName)}-${slugify(result.studentGroup)}.pdf`;
}

function buildReportEmailPayload(result, pdf) {
  return {
    action: "enviarInforme",
    version: REPORT_APP_VERSION,
    submissionId: result.submissionId,
    institutionName: result.institutionName,
    institutionEmail: REPORT_INSTITUTION_EMAIL,
    studentName: result.studentName,
    studentGroup: result.studentGroup,
    studentEmail: result.studentEmail,
    studentEmailRaw: result.studentEmail,
    // Modo correo único: solo un mensaje al estudiante con PDF adjunto.
    // No se envían copia institucional, enlace PDF independiente, respaldo MailApp ni notificación de Drive.
    emailPolicy: "student_pdf_attachment_only",
    senderName: "Simulador ICFES - M.",
    recipients: [result.studentEmail],
    sendStudentEmail: true,
    sendInstitutionEmail: false,
    sendInstitutionalCopy: false,
    sendCopyToInstitution: false,
    sendTeacherCopy: false,
    sendAdminCopy: false,
    ccInstitution: false,
    bccInstitution: false,
    institutionEmailCc: "",
    institutionEmailBcc: "",
    savePdfToDrive: false,
    createDriveFile: false,
    createDriveLink: false,
    includeDriveLink: false,
    sendPdfLinkEmail: false,
    sendDriveLinkEmail: false,
    sendBackupEmail: false,
    useMailAppFallback: false,
    disableMailAppFallback: true,
    shareDriveFileWithStudent: false,
    notifyDriveShare: false,
    suppressDriveShareEmail: true,
    studentDrivePermission: false,
    driveShareMode: "none",
    onlyDirectEmail: true,
    directEmailOnly: true,
    oneEmailOnly: true,
    singleEmailOnly: true,
    maxEmails: 1,
    disableDriveNotification: true,
    sessionLabel: result.sessionLabel,
    sessionTitle: result.sessionTitle,
    scopeLabel: result.scopeLabel,
    modeLabel: result.modeLabel,
    startedAt: result.startedAt,
    finishedAt: result.finishedAt,
    finishedAtLabel: result.finishedAtLabel,
    elapsedLabel: result.elapsedLabel,
    totalQuestions: result.totalQuestions,
    answered: result.answered,
    scored: result.scored,
    correct: result.correct,
    incorrect: result.incorrect,
    omitted: result.omitted,
    score: result.score,
    performanceLevel: result.performanceLevel,
    performanceRecommendation: result.performanceRecommendation,
    security: result.security,
    securityStatus: result.security ? result.security.statusLabel : "Normal",
    securityWarnings: result.security ? result.security.warnings : 0,
    securityTotalExits: result.security ? result.security.totalExits : 0,
    securityAwayTime: result.security ? result.security.totalAwayLabel : "00:00:00",
    byArea: result.byArea,
    details: result.details,
    pdfFileName: getReportFileName(result),
    pdfBase64: btoa(pdf)
  };
}

async function sendReportEmail({ automatic = false } = {}) {
  const result = buildResultData();
  const sendBtn = document.getElementById("sendPdfBtn");

  if (reportEmailInProgress) {
    updateReportEmailStatus("El informe ya se está enviando. Espera a que termine el proceso.", "info");
    return false;
  }

  if (isReportEmailAlreadySent(result)) {
    updateReportEmailStatus("El informe de este intento ya fue enviado. Para evitar correos duplicados, no se volverá a enviar.", "success");
    updateSendReportButtonSentState();
    return true;
  }

  if (isReportEmailLocked(result)) {
    updateReportEmailStatus("El informe ya fue solicitado para este intento. Para evitar correos duplicados, no se enviará otra solicitud.", "info");
    updateSendReportButtonSentState();
    return true;
  }

  if (!REPORT_EMAIL_ENDPOINT) {
    const message = `No se pudo enviar todavía porque falta configurar la URL /exec de Google Apps Script. El informe debe enviarse al estudiante (${result.studentEmail}) y a ${REPORT_INSTITUTION_EMAIL}.`;
    updateReportEmailStatus(message, "warning");
    if (!automatic) {
      openActionDialog({
        title: "Activar envío automático",
        message: "La app ya está preparada para enviar el PDF por correo. Para activarlo, despliega el archivo google-apps-script/Code.gs como aplicación web y pega la URL /exec en REPORT_EMAIL_ENDPOINT dentro de app.js.",
        confirmText: "Entendido",
        cancelText: "Cerrar"
      });
    }
    return false;
  }

  reportEmailInProgress = true;
  lockReportEmailSending(result);

  try {
    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.textContent = automatic ? "Registrando..." : "Enviando...";
    }
    updateReportEmailStatus("Enviando un solo correo desde Simulador ICFES con PDF adjunto...", "info");

    const pdf = createChartPdf(result);
    const payload = buildReportEmailPayload(result, pdf);

    // Envío único: solo se ejecuta la acción final `enviarInforme`.
    // Se eliminan envíos previos livianos/detallados porque podían generar notificaciones
    // adicionales de Google Drive como "Elemento compartido contigo" desde la cuenta propietaria.
    await submitReportPayloadToAppsScript(payload);
    markReportEmailAsSent(result);

    updateReportEmailStatus(`Informe enviado: un solo correo desde Simulador ICFES para ${result.studentName}.`, "success");
    updateSendReportButtonSentState();
    return true;
  } catch (error) {
    console.error("Error enviando informe:", error);
    updateReportEmailStatus(`No fue posible completar el envío automático: ${error.message || "verifica la conexión o la URL de Apps Script"}.`, "error");
    unlockReportEmailSending(result);
    if (sendBtn && !isReportEmailAlreadySent(result)) {
      sendBtn.disabled = false;
      sendBtn.textContent = "Enviar informe PDF";
    }
    return false;
  } finally {
    reportEmailInProgress = false;
  }
}

function buildResultOnlyPayload(result) {
  return {
    action: "registrarResultadoLiviano",
    version: REPORT_APP_VERSION,
    submissionId: result.submissionId,
    institutionName: result.institutionName,
    institutionEmail: REPORT_INSTITUTION_EMAIL,
    studentName: result.studentName,
    studentGroup: result.studentGroup,
    studentEmail: result.studentEmail,
    sessionLabel: result.sessionLabel,
    sessionTitle: result.sessionTitle,
    scopeLabel: result.scopeLabel,
    modeLabel: result.modeLabel,
    startedAt: result.startedAt,
    finishedAt: result.finishedAt,
    finishedAtLabel: result.finishedAtLabel,
    elapsedLabel: result.elapsedLabel,
    totalQuestions: result.totalQuestions,
    answered: result.answered,
    scored: result.scored,
    correct: result.correct,
    incorrect: result.incorrect,
    omitted: result.omitted,
    score: result.score,
    performanceLevel: result.performanceLevel,
    performanceRecommendation: result.performanceRecommendation,
    security: result.security,
    securityStatus: result.security ? result.security.statusLabel : "Normal",
    securityWarnings: result.security ? result.security.warnings : 0,
    securityTotalExits: result.security ? result.security.totalExits : 0,
    securityAwayTime: result.security ? result.security.totalAwayLabel : "00:00:00",
    byArea: compactAreaRowsForBackend(result.byArea)
  };
}

function compactAreaRowsForBackend(rows) {
  return (rows || []).map(row => ({
    area: row.area,
    total: row.total,
    answered: row.answered,
    correct: row.correct,
    incorrect: row.incorrect,
    omitted: row.omitted,
    percent: row.percent,
    level: row.level
  }));
}

function compactDetailsForBackend(details) {
  return (details || []).map(item => ({
    number: item.number,
    area: item.area,
    competence: item.competence,
    component: item.component,
    difficulty: item.difficulty,
    studentAnswer: item.studentAnswer,
    correctAnswer: item.correctAnswer,
    result: item.result
  }));
}

function buildDetailsChunkPayload(result, details, chunkIndex, chunkTotal) {
  return {
    action: "registrarDetallePreguntas",
    version: REPORT_APP_VERSION,
    submissionId: result.submissionId,
    institutionName: result.institutionName,
    institutionEmail: REPORT_INSTITUTION_EMAIL,
    studentName: result.studentName,
    studentGroup: result.studentGroup,
    studentEmail: result.studentEmail,
    sessionLabel: result.sessionLabel,
    sessionTitle: result.sessionTitle,
    scopeLabel: result.scopeLabel,
    modeLabel: result.modeLabel,
    startedAt: result.startedAt,
    finishedAt: result.finishedAt,
    finishedAtLabel: result.finishedAtLabel,
    elapsedLabel: result.elapsedLabel,
    score: result.score,
    chunkIndex,
    chunkTotal,
    details
  };
}


async function submitResultOnlyToAppsScript(result) {
  const payload = buildResultOnlyPayload(result);
  const directParams = buildResultOnlyDirectParams(payload);

  try {
    return await submitParamsViaJsonpToEndpoints(directParams, REPORT_REGISTRATION_ENDPOINTS, 45000);
  } catch (firstError) {
    console.warn("No se confirmó el registro por JSONP directo. Se intentará un único POST de respaldo.", firstError);
    await submitPayloadViaSingleHiddenPost(payload, "registrar-resultado-liviano", {
      endpoints: REPORT_REGISTRATION_ENDPOINTS,
      waitMs: 1800
    });
    return { ok: true, mode: "post-unico-respaldo", message: "Resultado enviado por POST único de respaldo." };
  }
}

async function submitDetailChunksToAppsScript(result) {
  const compact = compactDetailsForBackend(result.details);
  if (!compact.length) return true;

  const chunkSize = 4;
  const chunks = [];
  for (let i = 0; i < compact.length; i += chunkSize) chunks.push(compact.slice(i, i + chunkSize));

  for (let i = 0; i < chunks.length; i += 1) {
    const payload = buildDetailsChunkPayload(result, chunks[i], i + 1, chunks.length);
    const params = buildDetailChunkDirectParams(payload);
    try {
      await submitParamsViaJsonpToEndpoints(params, REPORT_REGISTRATION_ENDPOINTS, 30000);
    } catch (error) {
      console.warn(`No se confirmó el lote de detalle ${i + 1}/${chunks.length} por JSONP directo. Se intentará por POST.`, error);
      await submitPayloadViaSingleHiddenPost(payload, "registrar-detalle-preguntas", {
        endpoints: REPORT_REGISTRATION_ENDPOINTS,
        waitMs: 500
      });
    }
  }
  return true;
}

function buildResultOnlyDirectParams(payload) {
  return {
    accion: "registrar-resultado-liviano",
    action: payload.action || "registrarResultadoLiviano",
    version: payload.version || REPORT_APP_VERSION,
    submissionId: payload.submissionId || "",
    institutionName: payload.institutionName || INSTITUTION_NAME,
    institutionEmail: payload.institutionEmail || REPORT_INSTITUTION_EMAIL,
    studentName: payload.studentName || "",
    studentGroup: payload.studentGroup || "",
    studentEmail: payload.studentEmail || "",
    sessionLabel: payload.sessionLabel || "",
    sessionTitle: payload.sessionTitle || "",
    scopeLabel: payload.scopeLabel || "",
    modeLabel: payload.modeLabel || "",
    startedAt: payload.startedAt || "",
    finishedAt: payload.finishedAt || "",
    finishedAtLabel: payload.finishedAtLabel || "",
    elapsedLabel: payload.elapsedLabel || "",
    totalQuestions: payload.totalQuestions || 0,
    answered: payload.answered || 0,
    scored: payload.scored || 0,
    correct: payload.correct || 0,
    incorrect: payload.incorrect || 0,
    omitted: payload.omitted || 0,
    score: payload.score || 0,
    performanceLevel: payload.performanceLevel || "",
    performanceRecommendation: payload.performanceRecommendation || "",
    securityStatus: payload.securityStatus || (payload.security && payload.security.statusLabel) || "Normal",
    securityWarnings: payload.securityWarnings || (payload.security && payload.security.warnings) || 0,
    securityTotalExits: payload.securityTotalExits || (payload.security && payload.security.totalExits) || 0,
    securityAwayTime: payload.securityAwayTime || (payload.security && payload.security.totalAwayLabel) || "00:00:00",
    security: JSON.stringify(payload.security || {}),
    byArea: JSON.stringify(payload.byArea || [])
  };
}

function buildDetailChunkDirectParams(payload) {
  return {
    accion: "registrar-detalle-preguntas",
    action: payload.action || "registrarDetallePreguntas",
    version: payload.version || REPORT_APP_VERSION,
    submissionId: payload.submissionId || "",
    institutionName: payload.institutionName || INSTITUTION_NAME,
    institutionEmail: payload.institutionEmail || REPORT_INSTITUTION_EMAIL,
    studentName: payload.studentName || "",
    studentGroup: payload.studentGroup || "",
    studentEmail: payload.studentEmail || "",
    sessionLabel: payload.sessionLabel || "",
    sessionTitle: payload.sessionTitle || "",
    scopeLabel: payload.scopeLabel || "",
    modeLabel: payload.modeLabel || "",
    startedAt: payload.startedAt || "",
    finishedAt: payload.finishedAt || "",
    finishedAtLabel: payload.finishedAtLabel || "",
    elapsedLabel: payload.elapsedLabel || "",
    score: payload.score || 0,
    chunkIndex: payload.chunkIndex || 1,
    chunkTotal: payload.chunkTotal || 1,
    details: JSON.stringify(payload.details || [])
  };
}

function submitReportPayloadToAppsScript(payload) {
  // El PDF/correo se envía una sola vez al endpoint principal para evitar correos duplicados.
  return submitPayloadViaSingleHiddenPost(payload, "enviarInforme", {
    endpoints: [REPORT_EMAIL_ENDPOINT].filter(Boolean),
    waitMs: 2500
  });
}

function submitPayloadViaJsonp(payload, accion, timeoutMs = 30000) {
  return submitPayloadViaJsonpToEndpoints(payload, accion, [REPORT_EMAIL_ENDPOINT].filter(Boolean), timeoutMs);
}

async function submitPayloadViaJsonpToEndpoints(payload, accion, endpoints, timeoutMs = 30000) {
  const params = {
    accion: accion || payload.action || "registrar-resultado-liviano",
    payload: JSON.stringify(payload)
  };
  return submitParamsViaJsonpToEndpoints(params, endpoints, timeoutMs);
}

function fireAndForgetDirectGetToEndpoints(params, endpoints) {
  const ordered = Array.from(new Set((endpoints || []).filter(Boolean)));
  ordered.forEach(endpoint => {
    try {
      const url = new URL(endpoint);
      Object.entries(params || {}).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        url.searchParams.set(key, String(value));
      });
      url.searchParams.set("t", Date.now().toString());
      url.searchParams.set("origen", "github-pages-get-directo");

      // Imagen invisible: permite enviar GET sin depender de CORS ni de leer la respuesta.
      const img = new Image();
      img.style.display = "none";
      img.width = 1;
      img.height = 1;
      img.alt = "";
      img.onload = img.onerror = () => {
        window.setTimeout(() => {
          if (img.parentNode) img.parentNode.removeChild(img);
        }, 1000);
      };
      img.src = url.toString();
      document.body.appendChild(img);
    } catch (error) {
      console.warn("No fue posible disparar GET directo a Apps Script", error);
    }
  });
}

async function submitParamsViaJsonpToEndpoints(params, endpoints, timeoutMs = 30000) {
  const ordered = Array.from(new Set((endpoints || []).filter(Boolean)));
  if (!ordered.length) throw new Error("No hay URL de Apps Script configurada.");

  let lastError = null;
  for (const endpoint of ordered) {
    try {
      return await submitParamsViaJsonp(endpoint, params, timeoutMs);
    } catch (error) {
      lastError = error;
      console.warn(`Fallo JSONP con endpoint ${endpoint}`, error);
    }
  }
  throw lastError || new Error("No fue posible conectar con Apps Script.");
}

function submitParamsViaJsonp(endpoint, params, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    if (!endpoint) return reject(new Error("No hay URL de Apps Script configurada."));

    const callbackName = `gasJsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Tiempo de espera agotado registrando datos en Google Sheets."));
    }, timeoutMs);

    function cleanup() {
      clearTimeout(timer);
      try { delete window[callbackName]; } catch (_) { window[callbackName] = undefined; }
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = response => {
      cleanup();
      if (!response || response.ok === false) {
        reject(new Error((response && response.message) || "Apps Script no confirmó el registro."));
        return;
      }
      resolve(response);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("No fue posible conectar con Apps Script."));
    };

    const url = new URL(endpoint);
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
    url.searchParams.set("callback", callbackName);
    url.searchParams.set("t", Date.now().toString());
    script.src = url.toString();
    document.body.appendChild(script);
  });
}

async function submitPayloadViaSingleHiddenPost(payload, action, options = {}) {
  const endpoints = Array.from(new Set((options.endpoints || REPORT_EMAIL_ENDPOINTS || []).filter(Boolean)));
  if (!endpoints.length) throw new Error("No hay endpoints de Apps Script configurados.");

  const endpoint = endpoints[0];
  const payloadText = JSON.stringify(payload);
  const sent = tryPostHiddenFormToEndpoint(endpoint, payloadText, action);
  if (!sent) throw new Error("No fue posible enviar el formulario oculto a Apps Script.");

  await delay(options.waitMs || 1200);
  return { ok: true, mode: "single-hidden-post" };
}

async function submitPayloadToAppsScriptEverywhere(payload, { lightweight = false, endpoints = null } = {}) {
  return submitPayloadViaReliablePost(payload, payload.action || "payload", {
    endpoints: endpoints || REPORT_EMAIL_ENDPOINTS,
    includeHiddenForm: false,
    waitMs: lightweight ? 500 : 1200
  });
}

async function submitPayloadViaReliablePost(payload, action, options = {}) {
  const endpoints = Array.from(new Set((options.endpoints || REPORT_EMAIL_ENDPOINTS || []).filter(Boolean)));
  if (!endpoints.length) throw new Error("No hay endpoints de Apps Script configurados.");

  const payloadText = JSON.stringify(payload);
  endpoints.forEach(endpoint => {
    trySendBeaconToEndpoint(endpoint, payloadText, action);
    tryFetchNoCorsToEndpoint(endpoint, payloadText, action);
    if (options.includeHiddenForm) {
      tryPostHiddenFormToEndpoint(endpoint, payloadText, action);
    }
  });

  await delay(options.waitMs || 800);
  return true;
}

function trySendBeaconToEndpoint(endpoint, payloadText, action) {
  try {
    if (!navigator.sendBeacon) return false;
    const body = new URLSearchParams();
    body.set("payload", payloadText);
    body.set("action", action || "payload");
    body.set("source", "simulador-icfes-mjb-sendbeacon");
    return navigator.sendBeacon(endpoint, body);
  } catch (error) {
    console.warn("sendBeacon no disponible para Apps Script", error);
    return false;
  }
}

function tryFetchNoCorsToEndpoint(endpoint, payloadText, action) {
  try {
    const body = new URLSearchParams();
    body.set("payload", payloadText);
    body.set("action", action || "payload");
    body.set("source", "simulador-icfes-mjb-fetch");
    fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      cache: "no-store",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body,
      keepalive: payloadText.length < 60000
    }).catch(error => console.warn("fetch no-cors no confirmó Apps Script", error));
    return true;
  } catch (error) {
    console.warn("No fue posible enviar por fetch no-cors", error);
    return false;
  }
}

function tryPostHiddenFormToEndpoint(endpoint, payloadText, action) {
  try {
    const iframeName = `gas_post_iframe_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.style.position = "absolute";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.setAttribute("aria-hidden", "true");

    const form = document.createElement("form");
    form.method = "POST";
    form.action = endpoint;
    form.target = iframeName;
    form.style.display = "none";

    let parsedPayload = {};
    try { parsedPayload = JSON.parse(payloadText || "{}"); } catch (_) { parsedPayload = {}; }

    const fields = {
      payload: payloadText,
      action: action || parsedPayload.action || "enviarInforme",
      accion: action || parsedPayload.action || "enviarInforme",
      source: "simulador-icfes-mjb-form-un-correo",
      emailPolicy: "student_pdf_attachment_only",
      senderName: "Simulador ICFES - M.",
      studentEmail: parsedPayload.studentEmail || "",
      studentEmailRaw: parsedPayload.studentEmailRaw || parsedPayload.studentEmail || "",
      institutionEmail: parsedPayload.institutionEmail || REPORT_INSTITUTION_EMAIL,
      sendStudentEmail: "true",
      sendInstitutionEmail: "false",
      sendInstitutionalCopy: "false",
      sendCopyToInstitution: "false",
      sendTeacherCopy: "false",
      sendAdminCopy: "false",
      ccInstitution: "false",
      bccInstitution: "false",
      savePdfToDrive: "false",
      createDriveFile: "false",
      createDriveLink: "false",
      includeDriveLink: "false",
      sendPdfLinkEmail: "false",
      sendDriveLinkEmail: "false",
      sendBackupEmail: "false",
      useMailAppFallback: "false",
      disableMailAppFallback: "true",
      shareDriveFileWithStudent: "false",
      notifyDriveShare: "false",
      suppressDriveShareEmail: "true",
      studentDrivePermission: "false",
      driveShareMode: "none",
      onlyDirectEmail: "true",
      directEmailOnly: "true",
      oneEmailOnly: "true",
      singleEmailOnly: "true",
      maxEmails: "1",
      disableDriveNotification: "true"
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("textarea");
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(iframe);
    document.body.appendChild(form);
    form.submit();
    window.setTimeout(() => {
      if (form.parentNode) form.parentNode.removeChild(form);
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    }, 30000);
    return true;
  } catch (error) {
    console.warn("No fue posible enviar por formulario oculto", error);
    return false;
  }
}

function delay(ms) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}


function buildPdfReportLines(result) {
  const lines = [
    "REPORTE DETALLADO - ICFES DIGITAL SABER 11",
    `${result.institutionName}`,
    "",
    `Estudiante: ${result.studentName}`,
    `Grupo: ${result.studentGroup}`,
    `Correo: ${result.studentEmail}`,
    `Fecha de finalizacion: ${result.finishedAtLabel}`,
    `Seccion: ${result.sessionLabel} - ${result.sessionTitle}`,
    `Bloque o alcance: ${result.scopeLabel}`,
    `Modo: ${result.modeLabel}`,
    `Tiempo empleado: ${result.elapsedLabel}`,
    "",
    "RESUMEN GENERAL",
    `Preguntas disponibles: ${result.totalQuestions}`,
    `Preguntas calificables: ${result.scored}`,
    `Preguntas respondidas: ${result.answered}`,
    `Correctas: ${result.correct}`,
    `Incorrectas: ${result.incorrect}`,
    `Omitidas: ${result.omitted}`,
    `Porcentaje de acierto: ${result.score}%`,
    `Nivel de desempeno interno: ${result.performanceLevel}`,
    `Recomendacion: ${result.performanceRecommendation}`,
    "",
    "SEGURIDAD DEL SIMULACRO",
    `Estado del intento: ${result.security ? result.security.statusLabel : "Normal"}`,
    `Advertencias: ${result.security ? `${result.security.warnings}/${result.security.maxWarnings}` : "0/3"}`,
    `Cambios de pestana o ventana: ${result.security ? result.security.tabSwitches : 0}`,
    `Perdidas de foco: ${result.security ? result.security.windowBlur : 0}`,
    `Salidas de pantalla completa: ${result.security ? result.security.fullscreenExits : 0}`,
    `Tiempo fuera del simulacro: ${result.security ? result.security.totalAwayLabel : "00:00:00"}`,
    `Accion aplicada: ${result.security ? result.security.actionApplied : "Sin novedades"}`,
    ...(isSecurityFinalAlertNeeded(result) ? [
      "ALERTA DE SEGURIDAD: INTENTO FINALIZADO AUTOMATICAMENTE",
      "Recuerda que no estaba permitido salir de la plataforma ni abandonar pantalla completa durante el simulacro. Este intento queda para revision docente."
    ] : []),
    "",
    "RESULTADO POR AREA"
  ];

  if (!result.byArea.length) {
    lines.push("No hay preguntas calificables disponibles.");
  } else {
    result.byArea.forEach(row => {
      lines.push(`${row.area}: ${row.correct}/${row.total} correctas | Respondidas: ${row.answered} | Incorrectas: ${row.incorrect} | Omitidas: ${row.omitted} | Resultado: ${row.percent}%`);
    });
  }

  return lines;
}

function createChartPdf(result) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 44;
  const rightX = pageWidth - marginX;
  const colors = {
    primary: [0.14, 0.33, 0.76],
    accent: [0.02, 0.65, 0.47],
    danger: [0.85, 0.31, 0.31],
    warning: [0.96, 0.62, 0.04],
    text: [0.06, 0.13, 0.20],
    muted: [0.38, 0.45, 0.55],
    line: [0.86, 0.90, 0.95],
    panel: [0.97, 0.98, 0.99],
    white: [1, 1, 1]
  };

  const ops = [];
  pdfRect(ops, 0, 0, pageWidth, pageHeight, colors.white);
  pdfText(ops, "INFORME DE RESULTADOS - ICFES DIGITAL SABER 11", marginX, 804, 14.5, true, colors.primary);
  pdfText(ops, result.institutionName || INSTITUTION_NAME, marginX, 784, 11, true, colors.text);
  pdfText(ops, `Estudiante: ${result.studentName}`, marginX, 764, 11.5, true, colors.text);
  pdfText(ops, `Grupo: ${result.studentGroup} | Correo: ${result.studentEmail}`, marginX, 747, 9.5, false, colors.text, 92);
  pdfText(ops, `${result.sessionLabel} - ${result.sessionTitle} | ${result.scopeLabel}`, marginX, 731, 9.5, false, colors.muted);
  pdfText(ops, `Fecha: ${result.finishedAtLabel} | Modo: ${result.modeLabel} | Tiempo empleado: ${result.elapsedLabel}`, marginX, 716, 9.2, false, colors.muted, 92);
  pdfText(ops, `Nivel interno: ${result.performanceLevel}`, marginX, 701, 9.2, true, colors.primary);
  const security = result.security || { statusLabel: "Normal", warnings: 0, maxWarnings: SECURE_EXAM_MAX_WARNINGS, totalExits: 0, totalAwayLabel: "00:00:00", actionApplied: "Sin novedades" };
  pdfText(ops, `Seguridad: ${security.statusLabel} | Advertencias: ${security.warnings}/${security.maxWarnings} | Salidas: ${security.totalExits} | Tiempo fuera: ${security.totalAwayLabel}`, marginX, 686, 8.7, false, colors.danger, 100);
  const hasFinalSecurityAlert = isSecurityFinalAlertNeeded(result);
  const alertShift = hasFinalSecurityAlert ? 48 : 0;
  if (hasFinalSecurityAlert) {
    pdfRoundRect(ops, marginX, 638, rightX - marginX, 34, 7, colors.danger, null);
    pdfText(ops, "ALERTA: INTENTO FINALIZADO POR SEGURIDAD", marginX + 12, 657, 9.4, true, colors.white);
    pdfText(ops, "No estaba permitido salir de la plataforma o abandonar pantalla completa. Revision docente obligatoria.", marginX + 12, 644, 7.6, false, colors.white, 108);
  }

  const cardY = 612 - alertShift;
  const cardW = 116;
  const cardGap = 10;
  const cards = [
    ["Acierto", `${result.score}%`, colors.primary],
    ["Correctas", String(result.correct), colors.accent],
    ["Incorrectas", String(result.incorrect), colors.danger],
    ["Omitidas", String(result.omitted), colors.warning]
  ];
  cards.forEach((card, index) => {
    const x = marginX + index * (cardW + cardGap);
    pdfRoundRect(ops, x, cardY, cardW, 58, 8, colors.panel, colors.line);
    pdfText(ops, card[0], x + 12, cardY + 37, 8.5, false, colors.muted);
    pdfText(ops, card[1], x + 12, cardY + 16, 20, true, card[2]);
  });

  // Bloque grafico general: se separan titulos, metadatos y barras para evitar superposiciones en el PDF.
  const summaryTitleY = 578 - alertShift;
  pdfText(ops, "RESUMEN GRAFICO GENERAL", marginX, summaryTitleY, 11.5, true, colors.text);
  pdfText(ops, `Preguntas calificables: ${result.scored} | Respondidas: ${result.answered} | Disponibles: ${result.totalQuestions}`, marginX, summaryTitleY - 24, 9.2, false, colors.muted);

  const scoreX = marginX;
  const scoreY = 508 - alertShift;
  const scoreW = rightX - marginX;
  pdfText(ops, `Porcentaje de acierto: ${result.score}%`, scoreX, scoreY + 31, 9.5, true, colors.text);
  pdfText(ops, `Recomendacion: ${result.performanceRecommendation}`, scoreX, scoreY - 15, 8.2, false, colors.muted, 112);
  pdfRect(ops, scoreX, scoreY, scoreW, 16, colors.line);
  pdfRect(ops, scoreX, scoreY, scoreW * Math.max(0, Math.min(result.score, 100)) / 100, 16, colors.primary);

  pdfText(ops, "Distribucion de respuestas", marginX, 472 - alertShift, 9.5, true, colors.text);
  const total = Math.max(result.scored, 1);
  let cursorX = marginX;
  const stackedY = 446 - alertShift;
  const stackedW = rightX - marginX;
  const segments = [
    ["Correctas", result.correct, colors.accent],
    ["Incorrectas", result.incorrect, colors.danger],
    ["Omitidas", result.omitted, colors.warning]
  ];
  pdfRect(ops, marginX, stackedY, stackedW, 18, colors.line);
  segments.forEach(segment => {
    const width = stackedW * segment[1] / total;
    if (width > 0) pdfRect(ops, cursorX, stackedY, width, 18, segment[2]);
    cursorX += width;
  });
  let labelY = 422 - alertShift;
  segments.forEach(segment => {
    const pct = Math.round((segment[1] / total) * 100);
    pdfRect(ops, marginX, labelY - 4, 8, 8, segment[2]);
    pdfText(ops, `${segment[0]}: ${segment[1]} (${pct}%)`, marginX + 14, labelY - 2, 9, false, colors.text);
    labelY -= 16;
  });

  let y = 360 - alertShift;
  pdfText(ops, "RESULTADO POR AREA", marginX, y, 11.5, true, colors.text);
  y -= 22;

  if (!result.byArea.length) {
    pdfText(ops, "No hay preguntas calificables disponibles para graficar.", marginX, y, 9.5, false, colors.muted);
  } else {
    result.byArea.forEach(row => {
      if (y < 90) return;
      pdfText(ops, `${row.area}`, marginX, y, 9.2, true, colors.text);
      pdfText(ops, `${row.correct}/${row.total} correctas | ${row.percent}% | ${row.level || getInternalPerformanceLevel(row.percent)}`, rightX - 186, y, 8.8, false, colors.text);
      const barY = y - 17;
      pdfRect(ops, marginX, barY, 400, 12, colors.line);
      pdfRect(ops, marginX, barY, 400 * Math.max(0, Math.min(row.percent, 100)) / 100, 12, colors.accent);
      y -= 42;
    });
  }

  y -= 8;
  pdfText(ops, "Nota: Este PDF resume el desempeno individual de la Institucion Educativa Manuel J. Betancur. Google Sheets consolida el informe general por estudiante, grupo y area. La revision detallada por pregunta se conserva en la pagina de resultados.", marginX, Math.max(y, 70), 8.5, false, colors.muted, 92);
  pdfText(ops, "Pagina 1 de 1", marginX, 30, 8, false, colors.muted);

  return buildPdfFromStreams([ops.join("\n")], pageWidth, pageHeight);
}

function buildPdfFromStreams(streams, pageWidth = 595.28, pageHeight = 841.89) {
  const objects = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

  const kids = [];
  streams.forEach((stream, index) => {
    const pageObj = 5 + index * 2;
    const contentObj = pageObj + 1;
    kids.push(`${pageObj} 0 R`);
    objects[pageObj] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObj} 0 R >>`;
    objects[contentObj] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });

  objects[2] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${streams.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 1; i < objects.length; i += 1) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function pdfText(ops, text, x, y, size = 9.5, bold = false, color = [0, 0, 0], maxChars = 0) {
  const safe = pdfSafeText(text);
  const lines = maxChars ? wrapPdfLine(safe, maxChars) : [safe];
  lines.forEach((line, index) => {
    const yy = y - index * (size + 3);
    ops.push(`${color.map(formatPdfNumber).join(" ")} rg`);
    ops.push("BT");
    ops.push(`/${bold ? "F2" : "F1"} ${formatPdfNumber(size)} Tf`);
    ops.push(`1 0 0 1 ${formatPdfNumber(x)} ${formatPdfNumber(yy)} Tm (${escapePdfText(line)}) Tj`);
    ops.push("ET");
  });
}

function pdfRect(ops, x, y, width, height, fill = [0, 0, 0], stroke = null) {
  ops.push(`${fill.map(formatPdfNumber).join(" ")} rg`);
  if (stroke) ops.push(`${stroke.map(formatPdfNumber).join(" ")} RG`);
  ops.push(`${formatPdfNumber(x)} ${formatPdfNumber(y)} ${formatPdfNumber(width)} ${formatPdfNumber(height)} re ${stroke ? "B" : "f"}`);
}

function pdfRoundRect(ops, x, y, width, height, radius, fill, stroke = null) {
  // Rectangulo simple con esquinas visualmente limpias para mantener compatibilidad PDF basica.
  pdfRect(ops, x, y, width, height, fill, stroke);
}

function formatPdfNumber(value) {
  return Number(value).toFixed(3).replace(/\.000$/, "");
}


function createSimplePdf(lines) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 44;
  const topY = 800;
  const lineHeight = 13;
  const maxChars = 92;
  const maxLinesPerPage = 55;
  const normalizedLines = [];

  lines.forEach(line => {
    const wrapped = wrapPdfLine(pdfSafeText(line), maxChars);
    if (!wrapped.length) normalizedLines.push("");
    else normalizedLines.push(...wrapped);
  });

  const pages = [];
  for (let i = 0; i < normalizedLines.length; i += maxLinesPerPage) {
    pages.push(normalizedLines.slice(i, i + maxLinesPerPage));
  }
  if (!pages.length) pages.push(["Reporte sin datos"]);

  const objects = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

  const kids = [];
  pages.forEach((pageLines, index) => {
    const pageObj = 5 + index * 2;
    const contentObj = pageObj + 1;
    kids.push(`${pageObj} 0 R`);
    const stream = buildPdfPageStream(pageLines, index + 1, pages.length, marginX, topY, lineHeight);
    objects[pageObj] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObj} 0 R >>`;
    objects[contentObj] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });

  objects[2] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${pages.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 1; i < objects.length; i += 1) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function buildPdfPageStream(lines, pageNumber, totalPages, marginX, topY, lineHeight) {
  const ops = ["BT"];
  lines.forEach((line, index) => {
    const y = topY - index * lineHeight;
    const isTitle = pageNumber === 1 && index === 0;
    const isSection = /^[A-Z0-9 ]{5,}$/.test(line) && line.length < 48 && index !== 0;
    ops.push(`${isTitle || isSection ? "/F2" : "/F1"} ${isTitle ? 15 : isSection ? 11 : 9.5} Tf`);
    ops.push(`1 0 0 1 ${marginX} ${y} Tm (${escapePdfText(line)}) Tj`);
  });
  ops.push(`/F1 8 Tf`);
  ops.push(`1 0 0 1 ${marginX} 30 Tm (Pagina ${pageNumber} de ${totalPages}) Tj`);
  ops.push("ET");
  return ops.join("\n");
}

function wrapPdfLine(text, maxChars) {
  const clean = String(text || "");
  if (!clean) return [""];
  const words = clean.split(/\s+/);
  const lines = [];
  let current = "";
  words.forEach(word => {
    if (!current) {
      current = word;
    } else if ((current + " " + word).length <= maxChars) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function pdfSafeText(value) {
  return String(value ?? "")
    .replace(/–|—/g, "-")
    .replace(/“|”/g, '"')
    .replace(/‘|’/g, "'")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, " ");
}

function escapePdfText(text) {
  return String(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function slugify(value) {
  const slug = pdfSafeText(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "estudiante";
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

init();
