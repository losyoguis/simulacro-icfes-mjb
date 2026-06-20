const DASHBOARD_ENDPOINT = "https://script.google.com/macros/s/AKfycbw46l-QqQYo7Ah_P9cA85D2a_4miFYf70FfUK304aEfRRrw-HU0ziPfBEpM_n3vWFta/exec";
const DASHBOARD_ENDPOINT_DOMAIN = "";
const DASHBOARD_ENDPOINTS = Array.from(new Set([DASHBOARD_ENDPOINT_DOMAIN, DASHBOARD_ENDPOINT].filter(Boolean)));
const DASHBOARD_INSTITUTION = "Institución Educativa Manuel J. Betancur";
const DASHBOARD_SPREADSHEET_ID = "17FbkF9BulfEfAAoDFNkljdsXWjXQOH_cBB3r-Iizjxs";
const DASHBOARD_RESULTS_SHEET_NAME = "Resultados";
const DASHBOARD_DETAILS_SHEET_NAME = "Respuestas_Detalladas";
const DASHBOARD_RESULTS_SHEET_GID = "1281155333";
const DASHBOARD_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${DASHBOARD_SPREADSHEET_ID}/edit`;
const DASHBOARD_TRAINING_PLATFORM_URL = "https://sites.google.com/iemanueljbetancur.edu.co/icfes-digital-mjb/icfes-digital-mjb";
const DASHBOARD_ALLOWED_GROUPS = ["11-1", "11-2", "11-3"];
const DASHBOARD_ACCESS_PASSWORD = "MJB-ICFES-2026";
const DASHBOARD_TEACHER_USER = "docente";
const DASHBOARD_TEACHER_PASSWORD = "MJB-DOCENTE-2026";
const DASHBOARD_ACCESS_KEY = "icfes_dashboard_institucional_autorizado_v1";
const DASHBOARD_ACCESS_DURATION_MS = 4 * 60 * 60 * 1000;
const DASHBOARD_AUTO_REFRESH_MS = 60 * 1000;
let dashboardAutoRefreshTimer = null;
let dashboardLastLoadAt = 0;

const dashboardState = {
  data: null,
  filteredRecords: [],
  filteredDetails: []
};

const els = {
  app: document.getElementById("dashboardApp"),
  status: document.getElementById("dashboardStatus"),
  themeBtn: document.getElementById("themeBtn"),
  refreshBtn: document.getElementById("refreshDashboardBtn"),
  printBtn: document.getElementById("printDashboardBtn"),
  resendBtn: document.getElementById("resendResultsBtn"),
  deleteBtn: document.getElementById("deleteSheetDataBtn"),
  group: document.getElementById("filterGroup"),
  section: document.getElementById("filterSection"),
  areaFilter: document.getElementById("filterArea"),
  student: document.getElementById("filterStudent"),
  from: document.getElementById("filterFrom"),
  to: document.getElementById("filterTo"),
  clear: document.getElementById("clearFiltersBtn"),
  sheets: document.getElementById("openSheetsBtn"),
  kpi: document.getElementById("kpiGrid"),
  groupChart: document.getElementById("groupChart"),
  levelChart: document.getElementById("levelChart"),
  areaChart: document.getElementById("areaChart"),
  questionChart: document.getElementById("questionChart"),
  recommendations: document.getElementById("recommendationsList"),
  teacherReportPanel: document.getElementById("teacherReportPanel"),
  teacherReportContent: document.getElementById("teacherReportContent"),
  teacherReportPdfBtn: document.getElementById("teacherReportPdfBtn"),
  studentPersonalReportPanel: document.getElementById("studentPersonalReportPanel"),
  studentPersonalReportContent: document.getElementById("studentPersonalReportContent"),
  studentPersonalReportPdfBtn: document.getElementById("studentPersonalReportPdfBtn"),
  studentTable: document.getElementById("studentTableBody"),
  individualPanel: document.getElementById("individualPanel"),
  individualTitle: document.getElementById("individualTitle"),
  individualContent: document.getElementById("individualContent")
};

initDashboardAccessGate();

function initDashboardAccessGate() {
  const savedTheme = localStorage.getItem("simulador_icfes_theme") || "light";
  document.documentElement.dataset.theme = savedTheme;
  if (els.themeBtn) els.themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  if (hasDashboardAccess()) {
    document.body.classList.remove("dashboard-locked");
    initDashboard();
    return;
  }

  document.body.classList.add("dashboard-locked");
  showDashboardAccessGate();
}

function getDashboardAccessPayload() {
  try {
    const raw = sessionStorage.getItem(DASHBOARD_ACCESS_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.ok !== true || Number(data.expiresAt) < Date.now()) {
      sessionStorage.removeItem(DASHBOARD_ACCESS_KEY);
      return null;
    }
    return data;
  } catch (error) {
    return null;
  }
}

function getDashboardAccessRole() {
  const data = getDashboardAccessPayload();
  return data && data.role ? data.role : "";
}

function hasDashboardAccess() {
  return Boolean(getDashboardAccessPayload());
}

function isDashboardTeacherRole() {
  return getDashboardAccessRole() === "teacher";
}

function isDashboardStudentRole() {
  return getDashboardAccessRole() === "student";
}

function getDashboardAccessEmail() {
  const data = getDashboardAccessPayload();
  return data && data.email ? normalizeAccessEmail(data.email) : "";
}

function isDashboardAdminRole() {
  const role = getDashboardAccessRole();
  return !role || role === "admin";
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

function normalizeAccessEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function getRecordEmail(record) {
  return normalizeAccessEmail(record && record.email);
}

function getDashboardRoleFromCredentials(user, password) {
  const normalizedUser = String(user || "").trim().toLowerCase();
  const rawPassword = String(password || "").trim();
  const normalizedPassword = normalizeAccessEmail(password);
  if ((!normalizedUser || normalizedUser === "admin" || normalizedUser === "administrador") && rawPassword === DASHBOARD_ACCESS_PASSWORD) return { role: "admin" };
  if ([DASHBOARD_TEACHER_USER, "profesor", "docentes", "teacher"].includes(normalizedUser) && rawPassword === DASHBOARD_TEACHER_PASSWORD) return { role: "teacher" };
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedUser) && normalizedUser === normalizedPassword) return { role: "student", email: normalizedUser };
  return null;
}

function showDashboardAccessGate() {
  const existing = document.getElementById("dashboardAccessGate");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "dashboard-utility-overlay dashboard-access-overlay";
  overlay.id = "dashboardAccessGate";
  overlay.innerHTML = `
    <section class="dashboard-utility-card dashboard-access-card" role="dialog" aria-modal="true" aria-labelledby="dashboardAccessTitle" aria-describedby="dashboardAccessHelp">
      <p class="eyebrow">Acceso protegido</p>
      <h2 id="dashboardAccessTitle">Dashboard institucional</h2>
      <p id="dashboardAccessHelp">Ingresa como administrador, docente o estudiante. El estudiante usa su correo como usuario y clave, y solo verá sus propios resultados.</p>
      <label class="field">
        <span>Usuario</span>
        <input id="dashboardAccessUser" type="text" autocomplete="username" placeholder="admin, docente o correo" />
      </label>
      <label class="field">
        <span>Clave</span>
        <input id="dashboardAccessPassword" type="password" autocomplete="current-password" placeholder="Escribe la clave" />
      </label>
      <div class="dashboard-utility-status" id="dashboardAccessStatus" role="status"></div>
      <div class="dialog-actions">
        <a class="secondary-btn header-link" href="index.html">Volver al simulador</a>
        <button class="primary-btn" type="button" id="dashboardAccessConfirm">Ingresar</button>
      </div>
    </section>
  `;

  document.body.appendChild(overlay);
  const user = overlay.querySelector("#dashboardAccessUser");
  const password = overlay.querySelector("#dashboardAccessPassword");
  const status = overlay.querySelector("#dashboardAccessStatus");
  const confirmBtn = overlay.querySelector("#dashboardAccessConfirm");
  const submit = () => {
    const access = getDashboardRoleFromCredentials(user.value, password.value);
    if (!access) {
      status.textContent = "Usuario o clave incorrectos. Verifica las credenciales institucionales.";
      status.dataset.kind = "error";
      password.value = "";
      password.focus();
      return;
    }
    grantDashboardAccess(access.role, access.email ? { email: access.email } : {});
    overlay.remove();
    document.body.classList.remove("dashboard-locked");
    initDashboard();
  };

  confirmBtn.addEventListener("click", submit);
  overlay.addEventListener("keydown", event => {
    if (event.key === "Enter") submit();
  });
  password.focus();
}

function initDashboard() {
  const savedTheme = localStorage.getItem("simulador_icfes_theme") || "light";
  document.documentElement.dataset.theme = savedTheme;
  els.themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  setupCalendarDateFields();

  els.themeBtn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    els.themeBtn.textContent = next === "dark" ? "☀️" : "🌙";
    localStorage.setItem("simulador_icfes_theme", next);
  });

  els.refreshBtn.addEventListener("click", loadDashboardData);
  els.printBtn.addEventListener("click", exportDashboardPdf);
  applyDashboardRoleRestrictions();
  if (els.resendBtn) els.resendBtn.addEventListener("click", openResendResultsModal);
  if (els.deleteBtn) els.deleteBtn.addEventListener("click", deleteSheetData);
  if (els.teacherReportPdfBtn) els.teacherReportPdfBtn.addEventListener("click", exportTeacherReportPdf);
  if (els.teacherReportContent) els.teacherReportContent.addEventListener("click", handleTeacherSubjectReportClick);
  if (els.studentPersonalReportPdfBtn) els.studentPersonalReportPdfBtn.addEventListener("click", exportStudentPersonalReportPdf);
  if (els.studentPersonalReportContent) els.studentPersonalReportContent.addEventListener("click", handleStudentPersonalReportClick);
  if (els.studentTable) els.studentTable.addEventListener("click", handleStudentTablePdfClick);
  [els.group, els.section, els.areaFilter, els.student, els.from, els.to].filter(Boolean).forEach(input => input.addEventListener("change", renderDashboard));
  els.clear.addEventListener("click", () => {
    els.group.value = "";
    if (els.section) els.section.value = "";
    if (els.areaFilter) els.areaFilter.value = "";
    els.student.value = "";
    els.from.value = "";
    els.to.value = "";
    renderDashboard();
  });

  loadDashboardData();
}

function setupCalendarDateFields() {
  [els.from, els.to].filter(Boolean).forEach(input => {
    input.classList.add("calendar-date-input");
    input.setAttribute("inputmode", "none");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("title", "Selecciona la fecha desde el calendario");

    const openCalendar = () => {
      if (typeof input.showPicker === "function") {
        try {
          input.showPicker();
        } catch (error) {
          // Algunos navegadores solo permiten showPicker con interacción directa del usuario.
        }
      }
    };

    input.addEventListener("click", openCalendar);
    input.addEventListener("pointerdown", () => {
      window.setTimeout(openCalendar, 0);
    });
    input.addEventListener("keydown", event => {
      const allowedToClear = ["Backspace", "Delete"];
      const allowedNavigation = ["Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
      if (allowedToClear.includes(event.key)) return;
      if (allowedNavigation.includes(event.key)) {
        if (event.key === "Enter") {
          event.preventDefault();
          openCalendar();
        }
        return;
      }
      event.preventDefault();
      openCalendar();
    });
    input.addEventListener("paste", event => event.preventDefault());
    input.addEventListener("drop", event => event.preventDefault());
  });
}


function applyDashboardRoleRestrictions() {
  const readOnly = isDashboardTeacherRole() || isDashboardStudentRole();
  const student = isDashboardStudentRole();
  if (els.deleteBtn) els.deleteBtn.classList.toggle("hidden", readOnly);
  if (els.resendBtn) els.resendBtn.classList.toggle("hidden", readOnly);
  if (els.sheets) els.sheets.classList.toggle("hidden", readOnly);
  if (els.teacherReportPanel) els.teacherReportPanel.classList.toggle("hidden", student);
  if (els.studentPersonalReportPanel) els.studentPersonalReportPanel.classList.toggle("hidden", !student);
  if (els.group) els.group.disabled = student;
  if (els.student) els.student.disabled = student;
}

function setStatus(message, kind = "info") {
  els.status.textContent = message;
  els.status.dataset.kind = kind;
}

function exportDashboardPdf() {
  const records = (dashboardState.filteredRecords && dashboardState.filteredRecords.length)
    ? dashboardState.filteredRecords
    : ((dashboardState.data && dashboardState.data.records) ? dashboardState.data.records : []);
  const details = (dashboardState.filteredDetails && dashboardState.filteredDetails.length)
    ? dashboardState.filteredDetails
    : ((dashboardState.data && dashboardState.data.details) ? dashboardState.data.details : []);

  if (!records.length) {
    setStatus('No hay datos visibles para exportar. Actualiza el dashboard o cambia los filtros.', 'warning');
    return;
  }

  try {
    els.printBtn.disabled = true;
    els.printBtn.textContent = 'Creando PDF...';
    const summary = summarize(records);
    const pdf = createInstitutionalDashboardPdf(records, details, summary);
    const filename = `dashboard-institucional-icfes-digital-saber11-${compactDate(new Date())}.pdf`;
    downloadBlob(filename, new Blob([pdf], { type: 'application/pdf' }), { keepOpen: true });
    setStatus('PDF del dashboard generado. Si Google Sites bloquea la descarga automática, usa el botón Abrir PDF del aviso.', 'success');
  } catch (error) {
    console.error(error);
    setStatus(`No fue posible exportar el PDF del dashboard. Detalle: ${error.message || error}`, 'error');
  } finally {
    els.printBtn.disabled = false;
    els.printBtn.textContent = 'Exportar PDF';
  }
}

function createInstitutionalDashboardPdf(records, details, summary) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 42;
  const rightX = pageWidth - marginX;
  const colors = {
    primary: [0.13, 0.31, 0.73],
    accent: [0.02, 0.65, 0.47],
    danger: [0.85, 0.31, 0.31],
    warning: [0.96, 0.62, 0.04],
    text: [0.06, 0.13, 0.20],
    muted: [0.38, 0.45, 0.55],
    line: [0.86, 0.90, 0.95],
    panel: [0.97, 0.98, 0.99],
    softBlue: [0.95, 0.98, 1],
    white: [1, 1, 1]
  };

  const allStudents = latestStudents(records);
  const studentRowsPerPage = 18;
  const studentPageCount = Math.max(1, Math.ceil(allStudents.length / studentRowsPerPage));
  const totalPdfPages = 2 + studentPageCount; // resumen + paginas de estudiantes + lectura pedagogica
  const pages = [];

  const ops = [];
  pdfRect(ops, 0, 0, pageWidth, pageHeight, colors.white);
  pdfText(ops, 'DASHBOARD INSTITUCIONAL - ICFES DIGITAL SABER 11', marginX, 804, 14, true, colors.primary);
  pdfText(ops, DASHBOARD_INSTITUTION, marginX, 784, 10.5, true, colors.text);
  pdfText(ops, `Generado: ${formatDateTime(new Date().toISOString())}`, marginX, 767, 8.5, false, colors.muted);

  const studentText = els.student && els.student.value ? (els.student.options[els.student.selectedIndex] ? els.student.options[els.student.selectedIndex].text : 'Filtrado') : 'Todos';
  const sectionText = els.section && els.section.value ? `Seccion ${els.section.value}` : 'Todas';
  const areaText = els.areaFilter && els.areaFilter.value ? els.areaFilter.value : 'Todas';
  const filterText = `Filtros: Grupo ${els.group && els.group.value ? els.group.value : 'Todos'} | Seccion ${sectionText} | Asignatura ${areaText} | Estudiante ${studentText} | Desde ${els.from && els.from.value ? els.from.value : 'Inicio'} | Hasta ${els.to && els.to.value ? els.to.value : 'Hoy'}`;
  pdfText(ops, filterText, marginX, 750, 8.3, false, colors.muted, 112);

  const cards = [
    ['Intentos', String(summary.totalAttempts), colors.primary],
    ['Estudiantes', String(summary.uniqueStudents), colors.accent],
    ['Promedio', `${summary.avgScore}%`, colors.primary],
    ['Nivel', summary.mainLevel, colors.warning]
  ];
  const cardY = 690;
  const cardW = 118;
  const cardGap = 10;
  cards.forEach((card, index) => {
    const x = marginX + index * (cardW + cardGap);
    pdfRoundRect(ops, x, cardY, cardW, 56, 8, colors.panel, colors.line);
    pdfText(ops, card[0], x + 10, cardY + 36, 8, false, colors.muted, 18);
    pdfText(ops, card[1], x + 10, cardY + 15, 15.5, true, card[2], 16);
  });

  let y = 650;
  pdfText(ops, 'PROMEDIO POR GRUPO', marginX, y, 10.8, true, colors.text);
  y -= 23;
  const groupRows = Object.entries(groupBy(records, record => record.group || 'Sin grupo'))
    .map(([group, items]) => ({ label: group, pct: round(average(items.map(item => item.score)), 1), detail: `${unique(items.map(getStudentKey)).length} estudiante(s) | ${items.length} intento(s)` }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 6);
  if (!groupRows.length) {
    pdfText(ops, 'No hay datos por grupo.', marginX, y, 8.8, false, colors.muted);
    y -= 18;
  } else {
    groupRows.forEach(row => { pdfDashboardBar(ops, row.label, row.pct, row.detail, marginX, y, 250, colors.primary, colors); y -= 29; });
  }

  y -= 8;
  pdfText(ops, 'DESEMPENO POR AREA', marginX, y, 10.8, true, colors.text);
  y -= 23;
  const areaRows = Object.entries(summarizeAreas(records))
    .map(([area, stat]) => ({ label: area, pct: stat.total ? round((stat.correct / stat.total) * 100, 1) : 0, detail: `${stat.correct}/${stat.total} correctas` }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 7);
  if (!areaRows.length) {
    pdfText(ops, 'No hay desglose por area.', marginX, y, 8.8, false, colors.muted);
    y -= 18;
  } else {
    areaRows.forEach(row => { pdfDashboardBar(ops, row.label, row.pct, row.detail, marginX, y, 250, colors.accent, colors); y -= 29; });
  }

  y -= 8;
  pdfText(ops, 'PREGUNTAS CRITICAS', marginX, y, 10.8, true, colors.text);
  y -= 23;
  const criticalRows = questionStats(details)
    .filter(item => item.total >= 1)
    .sort((a, b) => a.percentCorrect - b.percentCorrect || b.total - a.total)
    .slice(0, 8)
    .map(item => ({ label: `P${item.number} ${item.area || ''}`, pct: Math.round(100 - item.percentCorrect), detail: `${item.incorrect + item.omitted}/${item.total} dificultades` }));
  if (!criticalRows.length) {
    pdfText(ops, 'Aun no hay detalle suficiente para identificar preguntas criticas.', marginX, y, 8.8, false, colors.muted, 110);
    y -= 18;
  } else {
    criticalRows.forEach(row => { if (y > 65) { pdfDashboardBar(ops, row.label, row.pct, row.detail, marginX, y, 250, colors.danger, colors); y -= 28; } });
  }

  pdfText(ops, `Pagina 1 de ${totalPdfPages}`, marginX, 30, 8, false, colors.muted);
  pages.push(ops.join('\n'));

  for (let pageIndex = 0; pageIndex < studentPageCount; pageIndex += 1) {
    const opsStudent = [];
    const pageNumber = 2 + pageIndex;
    const start = pageIndex * studentRowsPerPage;
    const chunk = allStudents.slice(start, start + studentRowsPerPage);
    pdfRect(opsStudent, 0, 0, pageWidth, pageHeight, colors.white);
    pdfText(opsStudent, 'SEGUIMIENTO INDIVIDUAL', marginX, 804, 13, true, colors.primary);
    pdfText(opsStudent, `Promedio general filtrado: ${summary.avgScore}% | Area fortaleza: ${summary.bestArea} | Area prioritaria: ${summary.weakArea}`, marginX, 782, 8.5, false, colors.muted, 110);
    pdfText(opsStudent, `Resultados individuales ${allStudents.length ? `${start + 1}-${Math.min(start + chunk.length, allStudents.length)} de ${allStudents.length}` : 'sin registros'}`, marginX, 762, 8.2, false, colors.muted, 110);

    let yRow = 730;
    pdfText(opsStudent, 'RANKING Y SEGUIMIENTO POR ESTUDIANTE', marginX, yRow, 10.5, true, colors.text);
    yRow -= 18;

    pdfRect(opsStudent, marginX, yRow - 13, rightX - marginX, 18, colors.softBlue);
    pdfText(opsStudent, '#', marginX + 6, yRow - 7, 7.5, true, colors.primary);
    pdfText(opsStudent, 'GRUPO', marginX + 26, yRow - 7, 7.5, true, colors.primary);
    pdfText(opsStudent, 'ESTUDIANTE', marginX + 72, yRow - 7, 7.5, true, colors.primary);
    pdfText(opsStudent, 'INT', marginX + 238, yRow - 7, 7.5, true, colors.primary);
    pdfText(opsStudent, 'ULT.', marginX + 275, yRow - 7, 7.5, true, colors.primary);
    pdfText(opsStudent, 'PROM.', marginX + 320, yRow - 7, 7.5, true, colors.primary);
    pdfText(opsStudent, 'NIVEL', marginX + 372, yRow - 7, 7.5, true, colors.primary);
    pdfText(opsStudent, 'AREAS POR REFORZAR', marginX + 452, yRow - 7, 7.5, true, colors.primary);
    yRow -= 27;

    if (!allStudents.length) {
      pdfText(opsStudent, 'No hay estudiantes registrados en el filtro actual.', marginX, yRow, 9, false, colors.muted, 110);
    } else {
      chunk.forEach((student, localIndex) => {
        const rowNumber = start + localIndex + 1;
        const latestScore = toNumber(student.latest.score);
        const avgScore = toNumber(student.avgScore);
        const level = levelForScore(avgScore).replace('Nivel ', 'N');
        const weak = weakAreasText(student.latest.byArea);
        const fill = localIndex % 2 === 0 ? [0.985, 0.99, 1] : colors.white;
        pdfRect(opsStudent, marginX, yRow - 22, rightX - marginX, 28, fill);
        pdfText(opsStudent, String(rowNumber), marginX + 6, yRow - 5, 7.4, true, colors.text, 4);
        pdfText(opsStudent, student.group || 'Sin grupo', marginX + 26, yRow - 5, 7.4, true, colors.text, 8);
        pdfText(opsStudent, student.studentName || 'Sin nombre', marginX + 72, yRow - 5, 7.4, true, colors.text, 28);
        pdfText(opsStudent, String(student.attempts), marginX + 242, yRow - 5, 7.4, false, colors.text, 5);
        pdfText(opsStudent, `${latestScore}%`, marginX + 275, yRow - 5, 7.6, true, colors.text, 6);
        pdfText(opsStudent, `${avgScore}%`, marginX + 322, yRow - 5, 7.6, true, colors.text, 8);
        pdfText(opsStudent, level, marginX + 372, yRow - 5, 7.2, false, colors.text, 15);
        pdfText(opsStudent, weak, marginX + 452, yRow - 5, 7.0, false, colors.muted, 24);
        const barWidth = rightX - marginX;
        pdfRect(opsStudent, marginX, yRow - 24, barWidth, 4.5, colors.line);
        pdfRect(opsStudent, marginX, yRow - 24, barWidth * Math.max(0, Math.min(latestScore, 100)) / 100, 4.5, colors.primary);
        yRow -= 32;
      });
    }

    pdfText(opsStudent, `Pagina ${pageNumber} de ${totalPdfPages}`, marginX, 30, 8, false, colors.muted);
    pages.push(opsStudent.join('\n'));
  }

  const opsLast = [];
  const lastPageNumber = totalPdfPages;
  pdfRect(opsLast, 0, 0, pageWidth, pageHeight, colors.white);
  pdfText(opsLast, 'LECTURA PEDAGOGICA Y RECOMENDACIONES', marginX, 804, 13, true, colors.primary);
  pdfText(opsLast, 'Resumen institucional para orientar planes de mejoramiento.', marginX, 782, 8.8, false, colors.muted, 112);

  const recommendationItems = [
    ['PROMEDIO GENERAL', `El promedio general filtrado es ${summary.avgScore}%, con nivel predominante ${summary.mainLevel}.`],
    ['AREA FORTALEZA', `El area fortaleza es ${summary.bestArea}. Conviene identificar estrategias que funcionan y replicarlas en las areas con menor desempeno.`],
    ['AREA PRIORITARIA', `El area prioritaria es ${summary.weakArea}. Se recomienda disenar refuerzos cortos por competencias, revisar distractores frecuentes y programar retroalimentacion.`],
    ['USO PEDAGOGICO', 'Usar estos datos como lectura pedagogica interna. No reemplaza el calculo oficial del ICFES, pero orienta planes de mejoramiento institucional.']
  ];

  let yLast = 730;
  recommendationItems.forEach(item => {
    pdfRoundRect(opsLast, marginX, yLast - 72, rightX - marginX, 58, 8, colors.panel, colors.line);
    pdfText(opsLast, item[0], marginX + 14, yLast - 32, 8.3, true, colors.primary, 38);
    pdfText(opsLast, item[1], marginX + 14, yLast - 50, 8.4, false, colors.text, 102);
    yLast -= 82;
  });

  pdfRoundRect(opsLast, marginX, 285, rightX - marginX, 88, 8, colors.softBlue, colors.line);
  pdfText(opsLast, 'RECOMENDACION DE ACCION', marginX + 14, 348, 8.5, true, colors.primary, 40);
  pdfText(opsLast, '1. Socializar resultados por grupo y area. 2. Priorizar competencias con mayor dificultad. 3. Programar ejercicios de entrenamiento con retroalimentacion. 4. Revisar nuevamente el avance en el proximo simulacro.', marginX + 14, 326, 8.2, false, colors.text, 96);

  pdfText(opsLast, 'Herramienta educativa independiente. No oficial ni afiliada al ICFES.', marginX, 56, 8.2, false, colors.muted, 110);
  pdfText(opsLast, `Pagina ${lastPageNumber} de ${totalPdfPages}`, marginX, 30, 8, false, colors.muted);
  pages.push(opsLast.join('\n'));

  return buildPdfFromStreams(pages, pageWidth, pageHeight);
}

function pdfDashboardBar(ops, label, pct, detail, x, y, width, color, colors) {
  const safePct = Math.max(0, Math.min(toNumber(pct), 100));
  pdfText(ops, label, x, y, 8.3, true, colors.text, 42);
  pdfText(ops, `${safePct}% · ${detail}`, x + width + 14, y, 8, false, colors.muted, 44);
  pdfRect(ops, x, y - 15, width, 9, colors.line);
  pdfRect(ops, x, y - 15, width * safePct / 100, 9, color);
}

function compactDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return 'fecha';
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
}

function openResendResultsModal() {
  closeDashboardUtilityModal();
  const overlay = document.createElement('div');
  overlay.className = 'dashboard-utility-overlay';
  overlay.id = 'dashboardUtilityModal';
  overlay.innerHTML = `
    <section class="dashboard-utility-card" role="dialog" aria-modal="true" aria-labelledby="resendResultsTitle">
      <button class="dialog-close" type="button" data-dashboard-modal-close aria-label="Cerrar">×</button>
      <p class="eyebrow">Comunicación institucional</p>
      <h2 id="resendResultsTitle">Reenviar resultados a estudiantes</h2>
      <p class="dashboard-utility-warning">Se enviará un correo a cada estudiante registrado en el dashboard con su resumen de resultados y una invitación para entrenarse durante vacaciones con los modos de IA.</p>
      <label class="field">
        <span>Confirmación obligatoria</span>
        <input id="resendConfirmPhrase" type="text" autocomplete="off" placeholder="Escribe: REENVIAR RESULTADOS" />
      </label>
      <label class="field">
        <span>Clave institucional</span>
        <input id="resendPassword" type="password" autocomplete="current-password" placeholder="Clave de administrador" />
      </label>
      <div class="dashboard-utility-status" id="resendModalStatus" role="status"></div>
      <div class="dialog-actions">
        <button class="secondary-btn" type="button" data-dashboard-modal-close>Cancelar</button>
        <button class="primary-btn" type="button" id="confirmResendResultsBtn">Enviar correos</button>
      </div>
    </section>
  `;
  document.body.appendChild(overlay);
  const phrase = overlay.querySelector('#resendConfirmPhrase');
  const password = overlay.querySelector('#resendPassword');
  const status = overlay.querySelector('#resendModalStatus');
  const confirmBtn = overlay.querySelector('#confirmResendResultsBtn');
  overlay.querySelectorAll('[data-dashboard-modal-close]').forEach(btn => btn.addEventListener('click', closeDashboardUtilityModal));
  overlay.addEventListener('click', event => { if (event.target === overlay) closeDashboardUtilityModal(); });
  overlay.addEventListener('keydown', event => { if (event.key === 'Escape') closeDashboardUtilityModal(); });
  phrase.focus();

  confirmBtn.addEventListener('click', () => {
    const phraseValue = (phrase.value || '').trim().toUpperCase();
    const passwordValue = (password.value || '').trim();
    if (phraseValue !== 'REENVIAR RESULTADOS') {
      status.textContent = 'Debes escribir exactamente REENVIAR RESULTADOS para continuar.';
      status.dataset.kind = 'warning';
      phrase.focus();
      return;
    }
    if (!passwordValue) {
      status.textContent = 'Ingresa la clave institucional.';
      status.dataset.kind = 'warning';
      password.focus();
      return;
    }

    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Enviando...';
    if (els.resendBtn) els.resendBtn.disabled = true;
    status.textContent = 'Conectando con Apps Script y reenviando resultados...';
    status.dataset.kind = 'warning';
    setStatus('Reenviando resultados a los estudiantes...', 'warning');

    const query = `?accion=reenviar-resultados-estudiantes&confirmacion=${encodeURIComponent('REENVIAR RESULTADOS')}&clave=${encodeURIComponent(passwordValue)}&url=${encodeURIComponent(DASHBOARD_TRAINING_PLATFORM_URL)}&ts=${Date.now()}`;
    fetchJsonpFromEndpoints(DASHBOARD_ENDPOINTS, query, 180000)
      .then(response => {
        if (!response || response.ok === false) throw new Error(response && response.message ? response.message : 'No fue posible reenviar los resultados.');
        const msg = `Correos enviados: ${response.sent || 0}. Estudiantes detectados: ${response.totalStudents || 0}. Errores: ${response.failed || 0}.`;
        status.textContent = msg;
        status.dataset.kind = response.failed ? 'warning' : 'success';
        setStatus(msg, response.failed ? 'warning' : 'success');
        setTimeout(() => { closeDashboardUtilityModal(); loadDashboardData(); }, 2200);
      })
      .catch(error => {
        console.error(error);
        status.textContent = `No fue posible reenviar resultados. Detalle: ${error.message || error}`;
        status.dataset.kind = 'error';
        setStatus(`No fue posible reenviar resultados. Detalle: ${error.message || error}`, 'error');
      })
      .finally(() => {
        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Enviar correos';
        if (els.resendBtn) els.resendBtn.disabled = false;
      });
  });
}

function deleteSheetData() {
  openDeleteSheetModal();
}

function openDeleteSheetModal() {
  closeDashboardUtilityModal();
  const overlay = document.createElement('div');
  overlay.className = 'dashboard-utility-overlay';
  overlay.id = 'dashboardUtilityModal';
  overlay.innerHTML = `
    <section class="dashboard-utility-card" role="dialog" aria-modal="true" aria-labelledby="deleteSheetsTitle">
      <button class="dialog-close" type="button" data-dashboard-modal-close aria-label="Cerrar">×</button>
      <p class="eyebrow">Acción institucional</p>
      <h2 id="deleteSheetsTitle">Borrar datos de Google Sheets</h2>
      <p class="dashboard-utility-warning">Esta acción limpiará los registros del dashboard y dejará las hojas listas con sus encabezados. No se borrarán carpetas ni PDF guardados en Drive.</p>
      <label class="field">
        <span>Confirmación obligatoria</span>
        <input id="deleteConfirmPhrase" type="text" autocomplete="off" placeholder="Escribe: BORRAR DATOS" />
      </label>
      <label class="field">
        <span>Clave institucional</span>
        <input id="deletePassword" type="password" autocomplete="current-password" placeholder="Clave de borrado" />
      </label>
      <div class="dashboard-utility-status" id="deleteModalStatus" role="status"></div>
      <div class="dialog-actions">
        <button class="secondary-btn" type="button" data-dashboard-modal-close>Cancelar</button>
        <button class="danger-btn" type="button" id="confirmDeleteSheetsBtn">Sí, borrar datos</button>
      </div>
    </section>
  `;
  document.body.appendChild(overlay);
  const phrase = overlay.querySelector('#deleteConfirmPhrase');
  const password = overlay.querySelector('#deletePassword');
  const status = overlay.querySelector('#deleteModalStatus');
  const confirmBtn = overlay.querySelector('#confirmDeleteSheetsBtn');
  overlay.querySelectorAll('[data-dashboard-modal-close]').forEach(btn => btn.addEventListener('click', closeDashboardUtilityModal));
  overlay.addEventListener('click', event => { if (event.target === overlay) closeDashboardUtilityModal(); });
  overlay.addEventListener('keydown', event => { if (event.key === 'Escape') closeDashboardUtilityModal(); });
  phrase.focus();

  confirmBtn.addEventListener('click', () => {
    const phraseValue = (phrase.value || '').trim().toUpperCase();
    const passwordValue = (password.value || '').trim();
    if (phraseValue !== 'BORRAR DATOS') {
      status.textContent = 'Debes escribir exactamente BORRAR DATOS para continuar.';
      status.dataset.kind = 'warning';
      phrase.focus();
      return;
    }
    if (!passwordValue) {
      status.textContent = 'Ingresa la clave institucional de borrado.';
      status.dataset.kind = 'warning';
      password.focus();
      return;
    }

    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Borrando...';
    els.deleteBtn.disabled = true;
    status.textContent = 'Conectando con Apps Script y borrando datos...';
    status.dataset.kind = 'warning';
    setStatus('Borrando datos de Google Sheets...', 'warning');

    const query = `?accion=borrar-datos&confirmacion=${encodeURIComponent('BORRAR DATOS')}&clave=${encodeURIComponent(passwordValue)}`;
    fetchJsonpFromEndpoints(DASHBOARD_ENDPOINTS, query, 90000)
      .then(response => {
        if (!response || response.ok === false) throw new Error(response && response.message ? response.message : 'No fue posible borrar los datos.');
        const cleared = (response.sheetsCleared || []).join(', ');
        status.textContent = `${response.message || 'Datos borrados correctamente.'}${cleared ? ' Hojas limpiadas: ' + cleared : ''}`;
        status.dataset.kind = 'success';
        setStatus(`${response.message || 'Datos borrados correctamente.'}${cleared ? ' Hojas limpiadas: ' + cleared : ''}`, 'success');
        dashboardState.data = { ok: true, records: [], details: [], updatedAt: new Date().toISOString(), institutionName: DASHBOARD_INSTITUTION };
        renderDashboard();
        setTimeout(() => { closeDashboardUtilityModal(); loadDashboardData(); }, 1600);
      })
      .catch(error => {
        console.error(error);
        status.textContent = `No fue posible borrar los datos. Detalle: ${error.message || error}`;
        status.dataset.kind = 'error';
        setStatus(`No fue posible borrar los datos. Detalle: ${error.message || error}`, 'error');
      })
      .finally(() => {
        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Sí, borrar datos';
        els.deleteBtn.disabled = false;
      });
  });
}

function closeDashboardUtilityModal() {
  const current = document.getElementById('dashboardUtilityModal');
  if (current && current.parentNode) current.parentNode.removeChild(current);
}

function loadDashboardData(options = {}) {
  if (!options.silent) setStatus("Actualizando datos en vivo desde Apps Script y Google Sheets...", "info");
  dashboardLastLoadAt = Date.now();
  els.refreshBtn.disabled = true;
  els.sheets.href = DASHBOARD_SPREADSHEET_URL;
  els.sheets.classList.remove("hidden");
  applyDashboardRoleRestrictions();

  // Primero consultamos Apps Script porque lee la hoja en vivo con SpreadsheetApp.
  // La lectura directa por GViz se deja como respaldo, porque Google puede entregar datos cacheados.
  loadDashboardDataFromAppsScript()
    .catch(error => {
      console.warn("Apps Script no respondió con datos actuales. Se intentará Google Sheets directo como respaldo.", error);
      if (!options.silent) setStatus("Apps Script no respondió. Intentando lectura directa de Google Sheets...", "warning");
      return loadDashboardDataFromGoogleSheets();
    })
    .then(data => {
      if (!isValidDashboardData(data)) throw new Error(data && data.message ? data.message : "No se recibieron registros válidos del dashboard.");
      dashboardState.data = normalizeDashboardData(data);
      populateFilterOptions();
      renderDashboard();
      const count = dashboardState.data.records.length;
      const detailsCount = dashboardState.data.details.length;
      const source = data.source ? ` Fuente: ${data.source}.` : "";
      setStatus(`Datos actualizados hasta este momento: ${count} intento(s) y ${detailsCount} respuesta(s) detallada(s). Última actualización: ${formatDateTime(data.updatedAt || new Date().toISOString())}.${source}`, "success");
      if (data.spreadsheetUrl) {
        els.sheets.href = data.spreadsheetUrl;
        els.sheets.classList.remove("hidden");
      }
      applyDashboardRoleRestrictions();
    })
    .catch(error => {
      console.error(error);
      setStatus(`No fue posible cargar el dashboard actualizado. Verifica que el Apps Script esté implementado y tenga permisos sobre el Google Sheets. Detalle: ${error.message}`, "error");
      renderEmptyState();
    })
    .finally(() => { els.refreshBtn.disabled = false; });
}

function isValidDashboardData(data) {
  return Boolean(data && data.ok !== false && Array.isArray(data.records) && Array.isArray(data.details));
}

function loadDashboardDataFromAppsScript() {
  const actions = ["dashboard-data", "dashboard-data-fresh", "dashboard", "obtener-dashboard", "listar-resultados"];
  let lastError = null;
  return actions.reduce((chain, action) => {
    return chain.catch(error => {
      lastError = error;
      const query = `?accion=${encodeURIComponent(action)}&fresh=1&nocache=1&cache=0&ts=${Date.now()}&r=${Math.random().toString(36).slice(2)}`;
      return fetchJsonpFromEndpoints(DASHBOARD_ENDPOINTS, query, 90000).then(data => {
        if (!isValidDashboardData(data)) throw new Error(`La acción ${action} no devolvió records/details actualizados.`);
        if (!data.records.length) throw new Error(`La acción ${action} respondió, pero no entregó registros. Se intentará lectura directa por gid.`);
        data.source = `Apps Script en vivo (${action})`;
        data.updatedAt = data.updatedAt || new Date().toISOString();
        return data;
      });
    });
  }, Promise.reject(new Error("inicio"))).catch(error => {
    throw error && error.message !== "inicio" ? error : (lastError || new Error("No se pudo consultar Apps Script."));
  });
}

function loadDashboardDataFromGoogleSheets() {
  // La hoja activa de resultados puede no llamarse exactamente “Resultados”.
  // Por eso se consulta primero por gid oficial y luego por nombre como respaldo.
  const resultPromise = fetchGvizRowsByGid(DASHBOARD_RESULTS_SHEET_GID)
    .then(table => {
      if (!table || !Array.isArray(table.rows) || !table.rows.length) {
        throw new Error(`La hoja gid ${DASHBOARD_RESULTS_SHEET_GID} no devolvió filas.`);
      }
      return table;
    })
    .catch(error => {
      console.warn(`No se pudo leer la hoja por gid ${DASHBOARD_RESULTS_SHEET_GID}. Intentando por nombre ${DASHBOARD_RESULTS_SHEET_NAME}.`, error);
      return fetchGvizRows(DASHBOARD_RESULTS_SHEET_NAME);
    });
  const detailPromise = fetchGvizRows(DASHBOARD_DETAILS_SHEET_NAME).catch(error => {
    console.warn(`No se pudo leer la hoja ${DASHBOARD_DETAILS_SHEET_NAME}. Se continuará sin detalle de respuestas.`, error);
    return { headers: [], rows: [] };
  });

  return Promise.all([resultPromise, detailPromise]).then(([resultTable, detailTable]) => {
    const records = recordsFromSheetRows(resultTable);
    const details = detailsFromSheetRows(detailTable);
    return {
      ok: true,
      source: "Google Sheets directo",
      institutionName: DASHBOARD_INSTITUTION,
      updatedAt: new Date().toISOString(),
      spreadsheetUrl: DASHBOARD_SPREADSHEET_URL,
      records,
      details,
      summary: {},
      notes: [
        "Datos leídos directamente desde Google Sheets con cache desactivada para mostrar registros recientes y futuros.",
        "El botón Actualizar datos vuelve a consultar la hoja en tiempo real."
      ]
    };
  });
}

function fetchJsonpFromEndpoints(endpoints, query, timeoutMs = 25000) {
  const ordered = Array.from(new Set((endpoints || []).filter(Boolean)));
  let lastError = null;
  return ordered.reduce((promise, endpoint) => {
    return promise.catch(error => {
      lastError = error;
      const url = endpoint + (query || '');
      return fetchJsonp(url, timeoutMs);
    });
  }, Promise.reject(new Error('inicio'))).catch(error => {
    throw error && error.message !== 'inicio' ? error : (lastError || new Error('No se pudo conectar con Apps Script.'));
  });
}

function fetchJsonp(url, timeoutMs = 25000) {
  return new Promise((resolve, reject) => {
    const callbackName = `dashboardCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const separator = url.includes("?") ? "&" : "?";
    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Tiempo de espera agotado al consultar Apps Script."));
    }, timeoutMs);

    function cleanup() {
      clearTimeout(timer);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = payload => {
      cleanup();
      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("No se pudo conectar con el endpoint del dashboard."));
    };
    script.src = `${url}${separator}callback=${encodeURIComponent(callbackName)}&t=${Date.now()}`;
    document.body.appendChild(script);
  });
}

function fetchGvizRows(sheetName) {
  return fetchGvizTable({ sheetName });
}

function fetchGvizRowsByGid(gid) {
  return fetchGvizTable({ gid });
}

function fetchGvizTable({ sheetName = "", gid = "" } = {}) {
  return new Promise((resolve, reject) => {
    const callbackName = `gvizCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const selector = gid ? `gid=${encodeURIComponent(gid)}` : `sheet=${encodeURIComponent(sheetName)}`;
    const tqx = `out:json;responseHandler:${callbackName}`;
    const url = `https://docs.google.com/spreadsheets/d/${DASHBOARD_SPREADSHEET_ID}/gviz/tq?${selector}&headers=1&tq=${encodeURIComponent('select *')}&tqx=${encodeURIComponent(tqx)}&fresh=1&nocache=1&cacheBust=${Date.now()}&r=${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`Tiempo de espera agotado leyendo ${sheetName || gid}.`));
    }, 30000);

    function cleanup() {
      clearTimeout(timer);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = response => {
      cleanup();
      try {
        const table = response && response.table ? response.table : { cols: [], rows: [] };
        const headers = table.cols.map(col => (col.label || col.id || "").trim());
        const rows = table.rows.map(row => (row.c || []).map(cell => cell ? (cell.f ?? cell.v ?? "") : ""));
        resolve({ headers, rows });
      } catch (error) {
        reject(error);
      }
    };

    script.onerror = () => {
      cleanup();
      reject(new Error(`No fue posible leer ${sheetName || gid} directamente.`));
    };

    script.src = url;
    document.body.appendChild(script);
  });
}

function recordsFromSheetRows(table) {
  const headers = table.headers || [];
  const rows = table.rows || [];
  const idx = name => headers.findIndex(header => normalizeHeader(header) === normalizeHeader(name));
  const at = (row, name) => {
    const i = idx(name);
    return i >= 0 ? row[i] : "";
  };

  return rows.filter(row => row.some(cell => String(cell || "").trim() !== "")).map(row => {
    const byAreaRaw = at(row, "Resultado por area JSON");
    return {
      timestamp: at(row, "Marca de tiempo"),
      timestampISO: parseDateToIso(at(row, "Marca de tiempo")) || parseDateToIso(at(row, "Fecha de finalizacion")),
      institution: at(row, "Institucion educativa") || DASHBOARD_INSTITUTION,
      studentName: at(row, "Nombre del estudiante"),
      group: normalizeGroupValue(at(row, "Grupo")),
      email: at(row, "Correo del estudiante"),
      sessionLabel: at(row, "Seccion"),
      sessionTitle: at(row, "Titulo de sesion"),
      scopeLabel: at(row, "Alcance"),
      modeLabel: at(row, "Modo"),
      finishedAtLabel: at(row, "Fecha de finalizacion"),
      elapsedLabel: at(row, "Tiempo empleado"),
      totalQuestions: toNumber(at(row, "Preguntas disponibles")),
      answered: toNumber(at(row, "Respondidas")),
      scored: toNumber(at(row, "Calificables")),
      correct: toNumber(at(row, "Correctas")),
      incorrect: toNumber(at(row, "Incorrectas")),
      omitted: toNumber(at(row, "Omitidas")),
      score: toNumber(at(row, "Porcentaje de acierto")),
      level: at(row, "Nivel de desempeno interno"),
      recommendation: at(row, "Recomendacion pedagogica"),
      pdfDriveUrl: at(row, "PDF en Drive"),
      pdfDriveId: at(row, "ID PDF en Drive"),
      securityStatus: at(row, "Estado seguridad") || at(row, "Seguridad estado") || at(row, "Estado del simulacro") || at(row, "securityStatus"),
      securityWarnings: toNumber(at(row, "Advertencias seguridad") || at(row, "securityWarnings")),
      securityTotalExits: toNumber(at(row, "Salidas seguridad") || at(row, "securityTotalExits")),
      securityAwayTime: at(row, "Tiempo fuera seguridad") || at(row, "securityAwayTime"),
      byArea: parseJsonArray(byAreaRaw),
      submissionId: at(row, "ID envio")
    };
  }).filter(record => !isSystemTestRecord(record));
}

function detailsFromSheetRows(table) {
  const headers = table.headers || [];
  const rows = table.rows || [];
  const idx = name => headers.findIndex(header => normalizeHeader(header) === normalizeHeader(name));
  const at = (row, name) => {
    const i = idx(name);
    return i >= 0 ? row[i] : "";
  };

  return rows.filter(row => row.some(cell => String(cell || "").trim() !== "")).map(row => ({
    timestamp: at(row, "Marca de tiempo"),
    timestampISO: parseDateToIso(at(row, "Marca de tiempo")) || parseDateToIso(at(row, "Fecha de finalizacion")),
    institution: at(row, "Institucion educativa") || DASHBOARD_INSTITUTION,
    studentName: at(row, "Nombre del estudiante"),
    group: normalizeGroupValue(at(row, "Grupo")),
    email: at(row, "Correo del estudiante"),
    sessionLabel: at(row, "Seccion"),
    scopeLabel: at(row, "Alcance"),
    number: toNumber(at(row, "Pregunta")),
    area: at(row, "Area"),
    competence: at(row, "Competencia"),
    component: at(row, "Componente"),
    difficulty: at(row, "Dificultad"),
    studentAnswer: at(row, "Respuesta del estudiante"),
    correctAnswer: at(row, "Respuesta correcta"),
    result: at(row, "Resultado"),
    submissionId: at(row, "ID envio")
  })).filter(record => !isSystemTestRecord(record));
}

function isSystemTestRecord(record) {
  const text = `${record.studentName || ""} ${record.scopeLabel || ""} ${record.sessionTitle || ""} ${record.email || ""}`.toLowerCase();
  return text.includes("prueba registro liviano") || text.includes("estudiante prueba dashboard") || (text.includes("prueba") && text.includes("dashboard institucional"));
}

function normalizeGroupValue(value) {
  if (value === null || value === undefined) return "";

  // Google Sheets puede interpretar grupos como "11-1" como fechas.
  // Por eso se normaliza cualquier fecha equivalente al grupo real.
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const day = value.getUTCDate ? value.getUTCDate() : value.getDate();
    const month = value.getUTCMonth ? value.getUTCMonth() : value.getMonth();
    if (month === 0 && day >= 11 && day <= 13) return `11-${day - 10}`;
  }

  const raw = String(value || "").trim();
  if (!raw) return "";

  const clean = raw
    .replace(/^'+/, "")
    .replace(/[\u00A0\u1680\u180E\u2000-\u200D\u2028\u2029\u202F\u205F\u3000\uFEFF]/g, "")
    .trim();

  const direct = clean.match(/^11\s*[-–—/]\s*([123])$/);
  if (direct) return `11-${direct[1]}`;

  const numeric = clean.match(/^11[.,]([123])$/);
  if (numeric) return `11-${numeric[1]}`;

  const dateConstructor = clean.match(/Date\(\s*\d{4}\s*,\s*0\s*,\s*(1[123])\s*(?:,|\))/i);
  if (dateConstructor) return `11-${Number(dateConstructor[1]) - 10}`;

  const isoDate = clean.match(/(?:^|\D)20\d{2}-01-(1[123])(?:T|\D|$)/);
  if (isoDate) return `11-${Number(isoDate[1]) - 10}`;

  const slashDate = clean.match(/(?:^|\D)(1[123])[\/-]0?1[\/-]20\d{2}(?:\D|$)/) || clean.match(/(?:^|\D)0?1[\/-](1[123])[\/-]20\d{2}(?:\D|$)/);
  if (slashDate) return `11-${Number(slashDate[1]) - 10}`;

  if (DASHBOARD_ALLOWED_GROUPS.includes(clean)) return clean;
  return "";
}

function normalizeHeader(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function parseJsonArray(value) {
  if (Array.isArray(value)) return value;
  const text = String(value || "").trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function parseDateToIso(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const nativeDate = new Date(text);
  if (!Number.isNaN(nativeDate.getTime())) return nativeDate.toISOString();
  const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (match) {
    const [, d, m, y, hh = "0", mm = "0", ss = "0"] = match;
    const date = new Date(Number(y), Number(m) - 1, Number(d), Number(hh), Number(mm), Number(ss));
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  return "";
}

function normalizeDashboardData(data) {
  return {
    ...data,
    records: Array.isArray(data.records) ? data.records.map(record => ({
      ...record,
      score: toNumber(record.score),
      totalQuestions: toNumber(record.totalQuestions),
      answered: toNumber(record.answered),
      correct: toNumber(record.correct),
      incorrect: toNumber(record.incorrect),
      omitted: toNumber(record.omitted),
      group: normalizeGroupValue(record.group),
      byArea: Array.isArray(record.byArea) ? record.byArea : []
    })).filter(record => !isSystemTestRecord(record) && DASHBOARD_ALLOWED_GROUPS.includes(record.group)) : [],
    details: Array.isArray(data.details) ? data.details.map(item => ({
      ...item,
      number: toNumber(item.number),
      group: normalizeGroupValue(item.group)
    })).filter(record => !isSystemTestRecord(record) && DASHBOARD_ALLOWED_GROUPS.includes(record.group)) : []
  };
}

function populateFilterOptions() {
  const selectedGroup = normalizeGroupValue(els.group.value);
  const groups = DASHBOARD_ALLOWED_GROUPS.slice();
  els.group.innerHTML = `<option value="">Todos los grupos</option>` + groups.map(group => `<option value="${escapeAttr(group)}">${escapeHtml(group)}</option>`).join("");
  if (groups.includes(selectedGroup)) {
    els.group.value = selectedGroup;
  } else {
    els.group.value = "";
  }
  populateAreaOptions();
  populateStudentOptions();
}


function populateAreaOptions() {
  if (!els.areaFilter) return;
  const data = dashboardState.data || { records: [], details: [] };
  const selectedArea = els.areaFilter.value;
  const areas = unique([
    ...(data.records || []).flatMap(record => (record.byArea || []).map(area => area.area)),
    ...(data.details || []).map(item => item.area)
  ]).sort((a, b) => a.localeCompare(b));
  els.areaFilter.innerHTML = `<option value="">Todas las asignaturas</option>` + areas.map(area => `<option value="${escapeAttr(area)}">${escapeHtml(area)}</option>`).join("");
  if (areas.some(area => normalizeHeader(area) === normalizeHeader(selectedArea))) {
    const match = areas.find(area => normalizeHeader(area) === normalizeHeader(selectedArea));
    els.areaFilter.value = match;
  } else {
    els.areaFilter.value = "";
  }
}

function populateStudentOptions() {
  const data = dashboardState.data || { records: [] };
  const group = els.group.value;
  const section = els.section ? els.section.value : '';
  const selectedArea = els.areaFilter ? els.areaFilter.value : '';
  const forcedEmail = isDashboardStudentRole() ? getDashboardAccessEmail() : '';
  const selectedStudent = els.student.value;
  const students = latestStudents(data.records.filter(record => (!forcedEmail || getRecordEmail(record) === forcedEmail) && (!group || record.group === group) && (!section || getSectionKey(record) === section) && (!selectedArea || Boolean(getRecordAreaStat(record, selectedArea)))));
  const defaultLabel = forcedEmail ? 'Mis resultados' : 'Todos los estudiantes';
  els.student.innerHTML = `<option value="">${defaultLabel}</option>` + students.map(student => `<option value="${escapeAttr(student.key)}">${escapeHtml(student.studentName)} · ${escapeHtml(student.group)}</option>`).join("");
  if (forcedEmail && students.length) {
    els.student.value = students[0].key;
  } else if (students.some(student => student.key === selectedStudent)) {
    els.student.value = selectedStudent;
  }
}

function renderDashboard() {
  if (!dashboardState.data) {
    renderEmptyState();
    return;
  }

  populateStudentOptions();
  const { records, details } = applyFilters(dashboardState.data.records, dashboardState.data.details);
  dashboardState.filteredRecords = records;
  dashboardState.filteredDetails = details;

  if (!records.length) {
    renderNoFilteredData();
    return;
  }

  const summary = summarize(records);
  renderKpis(summary);
  renderGroupChart(records);
  renderLevelChart(records);
  renderAreaChart(records);
  renderQuestionChart(details);
  renderRecommendations(summary, records, details);
  renderTeacherReport(records, details);
  renderStudentPersonalReport();
  renderStudentTable(records);
  renderIndividualPanel(records);
}

function applyFilters(records, details) {
  const group = els.group.value;
  const section = els.section ? els.section.value : '';
  const selectedArea = els.areaFilter ? els.areaFilter.value : '';
  const forcedEmail = isDashboardStudentRole() ? getDashboardAccessEmail() : '';
  const studentKey = forcedEmail ? '' : els.student.value;
  const from = els.from.value ? new Date(`${els.from.value}T00:00:00`) : null;
  const to = els.to.value ? new Date(`${els.to.value}T23:59:59`) : null;

  const baseRecords = records.filter(record => {
    if (forcedEmail && getRecordEmail(record) !== forcedEmail) return false;
    if (group && record.group !== group) return false;
    if (section && getSectionKey(record) !== section) return false;
    if (studentKey && getStudentKey(record) !== studentKey) return false;
    if (selectedArea && !getRecordAreaStat(record, selectedArea)) return false;
    const date = getRecordDate(record);
    if (from && date && date < from) return false;
    if (to && date && date > to) return false;
    return true;
  });

  const filteredRecords = selectedArea
    ? baseRecords.map(record => projectRecordToArea(record, selectedArea)).filter(Boolean)
    : baseRecords;

  const allowed = new Set(baseRecords.map(getRecordAttemptKey));
  const filteredDetails = details.filter(item => {
    if (allowed.has(getDetailAttemptKey(item))) {
      return !selectedArea || areaNameMatches(item.area, selectedArea);
    }
    if (forcedEmail && getRecordEmail(item) !== forcedEmail) return false;
    if (group && item.group !== group) return false;
    if (section && getSectionKey(item) !== section) return false;
    if (studentKey && getStudentKey(item) !== studentKey) return false;
    if (selectedArea && !areaNameMatches(item.area, selectedArea)) return false;
    return !from && !to;
  });

  return { records: filteredRecords, details: filteredDetails };
}

function areaNameMatches(value, areaName) {
  return normalizeHeader(value) === normalizeHeader(areaName);
}

function getRecordAreaStat(record, areaName) {
  return (record.byArea || []).find(area => areaNameMatches(area.area, areaName)) || null;
}

function projectRecordToArea(record, areaName) {
  const area = getRecordAreaStat(record, areaName);
  if (!area) return null;
  const score = toNumber(area.percent);
  return {
    ...record,
    score,
    totalQuestions: toNumber(area.total),
    answered: toNumber(area.answered),
    scored: toNumber(area.total),
    correct: toNumber(area.correct),
    incorrect: toNumber(area.incorrect),
    omitted: toNumber(area.omitted),
    level: levelForScore(score),
    recommendation: teacherAreaRecommendation(area.area || areaName, score, [], []),
    byArea: [{ ...area, percent: score }],
    sessionTitle: `${record.sessionTitle || ''} ${area.area || areaName}`.trim(),
    areaFilterLabel: area.area || areaName
  };
}

function renderKpis(summary) {
  els.kpi.innerHTML = [
    kpiCard("Intentos registrados", summary.totalAttempts, "Pruebas enviadas al sistema"),
    kpiCard("Estudiantes únicos", summary.uniqueStudents, "Seguimiento individual"),
    kpiCard("Promedio general", `${summary.avgScore}%`, "Porcentaje de acierto"),
    kpiCard("Nivel predominante", summary.mainLevel, "Según escala interna"),
    kpiCard("Área fortaleza", summary.bestArea, "Mayor porcentaje de acierto"),
    kpiCard("Área prioritaria", summary.weakArea, "Menor porcentaje de acierto")
  ].join("");
}

function kpiCard(label, value, hint) {
  return `<article class="dashboard-kpi"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><p>${escapeHtml(hint)}</p></article>`;
}

function renderGroupChart(records) {
  const groups = Object.entries(groupBy(records, record => record.group || "Sin grupo"))
    .map(([group, items]) => ({
      group,
      avg: round(average(items.map(item => item.score)), 1),
      attempts: items.length,
      unique: unique(items.map(getStudentKey)).length
    }))
    .sort((a, b) => b.avg - a.avg);

  els.groupChart.innerHTML = groups.length ? groups.map(item => horizontalBar(item.group, item.avg, `${item.avg}% · ${item.unique} estudiante(s) · ${item.attempts} intento(s)`)).join("") : emptyBlock("Sin datos por grupo.");
}

function renderLevelChart(records) {
  const levels = levelDistribution(records);
  const total = Math.max(records.length, 1);
  els.levelChart.innerHTML = Object.entries(levels).map(([level, count]) => {
    const percent = Math.round((count / total) * 100);
    return horizontalBar(level, percent, `${count} intento(s) · ${percent}%`, levelClass(level));
  }).join("");
}

function renderAreaChart(records) {
  const stats = summarizeAreas(records);
  const rows = Object.entries(stats).map(([area, stat]) => ({
    area,
    percent: stat.total ? round((stat.correct / stat.total) * 100, 1) : 0,
    total: stat.total,
    correct: stat.correct
  })).sort((a, b) => b.percent - a.percent);

  els.areaChart.innerHTML = rows.length ? rows.map(row => horizontalBar(row.area, row.percent, `${row.percent}% · ${row.correct}/${row.total} correctas`)).join("") : emptyBlock("Sin resultados por área.");
}

function renderQuestionChart(details) {
  const stats = questionStats(details)
    .filter(item => item.total >= 1)
    .sort((a, b) => a.percentCorrect - b.percentCorrect || b.total - a.total)
    .slice(0, 12);

  if (!stats.length) {
    els.questionChart.innerHTML = emptyBlock("Aún no hay detalle de preguntas suficiente para generar este análisis.");
    return;
  }

  els.questionChart.innerHTML = stats.map(item => {
    const errorPercent = Math.round(100 - item.percentCorrect);
    const label = `Pregunta ${item.number} · ${item.area}`;
    const detail = `${errorPercent}% error · ${item.incorrect + item.omitted}/${item.total} dificultades`;
    return horizontalBar(label, errorPercent, detail, "risk");
  }).join("");
}

function renderRecommendations(summary, records, details) {
  const questions = questionStats(details).sort((a, b) => a.percentCorrect - b.percentCorrect || b.total - a.total).slice(0, 5);
  const groupRisk = Object.entries(groupBy(records, record => record.group || "Sin grupo"))
    .map(([group, items]) => ({ group, avg: average(items.map(item => item.score)) }))
    .sort((a, b) => a.avg - b.avg)[0];

  const recommendations = [
    `El promedio general filtrado es ${summary.avgScore}%, con nivel predominante ${summary.mainLevel}.`,
    `El área prioritaria es ${summary.weakArea}. Se recomienda diseñar refuerzos cortos por competencias y revisar los distractores más frecuentes.`,
    groupRisk ? `El grupo que requiere mayor acompañamiento en este filtro es ${groupRisk.group}, con promedio de ${round(groupRisk.avg, 1)}%.` : "No hay datos suficientes para priorizar un grupo.",
    questions.length ? `Preguntas críticas sugeridas para socialización: ${questions.map(q => `P${q.number}`).join(", ")}.` : "Cuando existan más registros, el sistema identificará automáticamente las preguntas con mayor error.",
    "Usar estos datos como lectura pedagógica interna. No reemplaza el cálculo oficial del ICFES, pero permite orientar planes de mejoramiento institucional."
  ];

  els.recommendations.innerHTML = recommendations.map(text => `<div class="recommendation-item">${escapeHtml(text)}</div>`).join("");
}



function buildTeacherReportData(records, details) {
  const areaStats = Object.entries(summarizeAreas(records))
    .map(([area, stat]) => ({
      area,
      total: stat.total,
      correct: stat.correct,
      percent: stat.total ? round((stat.correct / stat.total) * 100, 1) : 0
    }))
    .sort((a, b) => a.percent - b.percent || a.area.localeCompare(b.area));

  const groups = DASHBOARD_ALLOWED_GROUPS.filter(group => records.some(record => record.group === group));
  const topicStats = buildTopicStats(details);

  return areaStats.map(areaRow => {
    const groupRows = groups.map(group => {
      const stats = summarizeAreas(records.filter(record => record.group === group))[areaRow.area] || { total: 0, correct: 0 };
      const percent = stats.total ? round((stats.correct / stats.total) * 100, 1) : 0;
      return { group, total: stats.total || 0, correct: stats.correct || 0, percent };
    }).sort((a, b) => a.percent - b.percent || a.group.localeCompare(b.group));

    const topics = topicStats
      .filter(topic => normalizeHeader(topic.area) === normalizeHeader(areaRow.area))
      .slice(0, 5);

    return {
      ...areaRow,
      priority: teacherPriorityLabel(areaRow.percent),
      groupRows,
      topics,
      recommendation: teacherAreaRecommendation(areaRow.area, areaRow.percent, groupRows, topics)
    };
  });
}

function buildTopicStats(details) {
  const grouped = groupBy(details || [], item => `${item.area || 'Area sin nombre'}|${item.component || item.competence || 'Competencia general'}`);
  return Object.entries(grouped).map(([key, items]) => {
    const [area, topic] = key.split('|');
    const total = items.length;
    const correct = items.filter(item => /correcta/i.test(item.result || '')).length;
    const omitted = items.filter(item => /omitida|sin responder/i.test(item.result || '') || /sin responder/i.test(item.studentAnswer || '')).length;
    const incorrect = Math.max(total - correct - omitted, 0);
    const difficulty = incorrect + omitted;
    const percentError = total ? round((difficulty / total) * 100, 1) : 0;
    const questions = unique(items.map(item => item.number).filter(Boolean)).slice(0, 8);
    return { area, topic, total, correct, difficulty, percentError, questions };
  }).sort((a, b) => b.percentError - a.percentError || b.difficulty - a.difficulty || a.topic.localeCompare(b.topic));
}

function teacherPriorityLabel(percent) {
  if (percent < 40) return 'Prioridad alta';
  if (percent < 60) return 'Prioridad media';
  if (percent < 75) return 'Seguimiento';
  return 'Fortaleza';
}

function teacherAreaRecommendation(area, percent, groupRows, topics) {
  const weakestGroup = groupRows.find(row => row.total > 0) || null;
  const mainTopic = topics[0];
  const parts = [];
  if (percent < 60) {
    parts.push(`Profundizar en ${area} con actividades cortas de diagnóstico, explicación guiada y práctica por competencias.`);
  } else {
    parts.push(`Mantener el trabajo en ${area} con retos de profundización y análisis de preguntas tipo Saber 11.`);
  }
  if (weakestGroup) parts.push(`Grupo que requiere mayor acompañamiento: ${weakestGroup.group} (${weakestGroup.percent}%).`);
  if (mainTopic) parts.push(`Tema crítico sugerido: ${mainTopic.topic} (${mainTopic.percentError}% de dificultad).`);
  return parts.join(' ');
}

function renderTeacherReport(records, details) {
  if (!els.teacherReportContent) return;
  const report = buildTeacherReportData(records, details);
  if (!report.length) {
    els.teacherReportContent.innerHTML = emptyBlock('Aún no hay datos por materia suficientes para orientar el trabajo docente.');
    return;
  }

  els.teacherReportContent.innerHTML = report.map(area => {
    const groupHtml = area.groupRows.length
      ? area.groupRows.map(row => `<span class="teacher-group-pill"><strong>${escapeHtml(row.group)}</strong> ${row.total ? `${row.percent}%` : 'Sin datos'}</span>`).join('')
      : '<span class="muted-inline">Sin grupos disponibles</span>';
    const topicsHtml = area.topics.length
      ? area.topics.slice(0, 3).map(topic => `<li><strong>${escapeHtml(topic.topic)}</strong>: ${topic.percentError}% dificultad${topic.questions.length ? ` | Preguntas: ${topic.questions.map(q => `P${q}`).join(', ')}` : ''}</li>`).join('')
      : '<li>No hay detalle de temas críticos para esta materia.</li>';
    return `
      <article class="teacher-area-card">
        <div class="teacher-area-head">
          <div>
            <h4>${escapeHtml(area.area)}</h4>
            <p>${escapeHtml(area.priority)} | ${area.correct}/${area.total} correctas</p>
          </div>
          <strong>${area.percent}%</strong>
        </div>
        <div class="teacher-group-list">${groupHtml}</div>
        <ul class="teacher-topic-list">${topicsHtml}</ul>
        <p class="teacher-recommendation">${escapeHtml(area.recommendation)}</p>
        <button class="secondary-btn teacher-subject-pdf-btn" type="button" data-teacher-subject-pdf="${escapeAttr(area.area)}">Descargar PDF de esta asignatura</button>
      </article>
    `;
  }).join('');
}


function getStudentReportBaseData() {
  const data = dashboardState.data || { records: [], details: [] };
  const email = getDashboardAccessEmail();
  const section = els.section ? els.section.value : '';
  const from = els.from && els.from.value ? new Date(`${els.from.value}T00:00:00`) : null;
  const to = els.to && els.to.value ? new Date(`${els.to.value}T23:59:59`) : null;

  const records = (data.records || []).filter(record => {
    if (email && getRecordEmail(record) !== email) return false;
    if (section && getSectionKey(record) !== section) return false;
    const date = getRecordDate(record);
    if (from && date && date < from) return false;
    if (to && date && date > to) return false;
    return true;
  });

  const allowed = new Set(records.map(getRecordAttemptKey));
  const details = (data.details || []).filter(item => {
    if (allowed.has(getDetailAttemptKey(item))) return true;
    if (email && getRecordEmail(item) !== email) return false;
    if (section && getSectionKey(item) !== section) return false;
    return !from && !to;
  });

  return { records, details };
}

function getStudentPersonalAreaRows(records, details) {
  const stats = summarizeAreas(records);
  return Object.entries(stats).map(([area, stat]) => {
    const percent = stat.total ? round((stat.correct / stat.total) * 100, 1) : 0;
    const topics = buildTopicStats(details).filter(topic => areaNameMatches(topic.area, area)).slice(0, 4);
    const questions = buildSubjectQuestionStats(details, area).slice(0, 5);
    return {
      area,
      total: stat.total,
      correct: stat.correct,
      percent,
      priority: teacherPriorityLabel(percent),
      topics,
      questions,
      recommendation: studentAreaRecommendation(area, percent, topics, questions)
    };
  }).sort((a, b) => a.percent - b.percent || a.area.localeCompare(b.area));
}

function studentAreaRecommendation(area, percent, topics, questions) {
  const mainTopic = topics && topics.length ? topics[0] : null;
  const mainQuestion = questions && questions.length ? questions[0] : null;
  const parts = [];
  if (percent < 40) parts.push(`Prioriza ${area}: repasa conceptos base, resuelve ejercicios guiados y revisa cuidadosamente los distractores.`);
  else if (percent < 60) parts.push(`Refuerza ${area}: practica preguntas tipo Saber 11 y explica por escrito el porqué de cada respuesta.`);
  else if (percent < 75) parts.push(`Mantén seguimiento en ${area}: identifica errores recurrentes y realiza prácticas cortas cronometradas.`);
  else parts.push(`Fortaleza en ${area}: continúa con retos de profundización y preguntas de mayor complejidad.`);
  if (mainTopic) parts.push(`Tema sugerido: ${mainTopic.topic}.`);
  if (mainQuestion) parts.push(`Pregunta para revisar: P${mainQuestion.number} (${mainQuestion.percentError}% dificultad).`);
  return parts.join(' ');
}

function renderStudentPersonalReport() {
  if (!els.studentPersonalReportPanel || !els.studentPersonalReportContent) return;
  if (!isDashboardStudentRole()) {
    els.studentPersonalReportPanel.classList.add('hidden');
    return;
  }
  els.studentPersonalReportPanel.classList.remove('hidden');

  const { records, details } = getStudentReportBaseData();
  if (!records.length) {
    els.studentPersonalReportContent.innerHTML = emptyBlock('Aún no tienes resultados registrados con los filtros actuales. Presenta el simulacro o cambia los filtros.');
    if (els.studentPersonalReportPdfBtn) els.studentPersonalReportPdfBtn.disabled = true;
    return;
  }
  if (els.studentPersonalReportPdfBtn) els.studentPersonalReportPdfBtn.disabled = false;

  const students = latestStudents(records);
  const student = students[0];
  const latest = records.slice().sort((a, b) => dateValue(b.timestampISO || b.timestamp || b.finishedAtLabel) - dateValue(a.timestampISO || a.timestamp || a.finishedAtLabel))[0];
  const avgScore = round(average(records.map(record => record.score)), 1);
  const sections = unique(records.map(sectionLabelForRecord)).join(' · ') || 'Sección no registrada';
  const areaRows = getStudentPersonalAreaRows(records, details);
  const critical = questionStats(details).sort((a, b) => a.percentCorrect - b.percentCorrect || b.total - a.total).slice(0, 8);
  const areaCards = areaRows.length ? areaRows.map(area => {
    const topicsHtml = area.topics.length
      ? area.topics.slice(0, 3).map(topic => `<li><strong>${escapeHtml(topic.topic)}</strong>: ${topic.percentError}% dificultad${topic.questions.length ? ` | Preguntas: ${topic.questions.map(q => `P${q}`).join(', ')}` : ''}</li>`).join('')
      : '<li>No hay temas críticos registrados para esta asignatura.</li>';
    const questionsHtml = area.questions.length
      ? area.questions.slice(0, 4).map(q => `P${q.number} (${q.percentError}% dificultad)`).join(', ')
      : 'Sin preguntas críticas registradas';
    return `
      <article class="teacher-area-card student-subject-card">
        <div class="teacher-area-head">
          <div>
            <h4>${escapeHtml(area.area)}</h4>
            <p>${escapeHtml(area.priority)} | ${area.correct}/${area.total} correctas</p>
          </div>
          <strong>${area.percent}%</strong>
        </div>
        <ul class="teacher-topic-list">${topicsHtml}</ul>
        <p class="teacher-recommendation"><strong>Preguntas para revisar:</strong> ${escapeHtml(questionsHtml)}</p>
        <p class="teacher-recommendation">${escapeHtml(area.recommendation)}</p>
        <button class="secondary-btn teacher-subject-pdf-btn" type="button" data-student-subject-pdf="${escapeAttr(area.area)}">Descargar mi PDF de esta asignatura</button>
      </article>
    `;
  }).join('') : emptyBlock('Sin datos por asignatura para este estudiante.');

  const criticalHtml = critical.length
    ? critical.map(q => `<li><strong>P${q.number} · ${escapeHtml(q.area)}</strong>: ${Math.round(100 - q.percentCorrect)}% dificultad personal.</li>`).join('')
    : '<li>No hay preguntas críticas registradas para tu usuario.</li>';

  els.studentPersonalReportContent.innerHTML = `
    <div class="individual-summary-grid student-personal-summary">
      ${kpiCard('Estudiante', student ? student.studentName : latest.studentName, latest.group || 'Grupo no registrado')}
      ${kpiCard('Promedio personal', `${avgScore}%`, levelForScore(avgScore))}
      ${kpiCard('Intentos revisados', String(records.length), sections)}
      ${kpiCard('Área prioritaria', areaRows.length ? `${areaRows[0].area} (${areaRows[0].percent}%)` : 'Sin datos', 'Para reforzar primero')}
    </div>
    <div class="student-personal-guidance recommendation-item">
      <strong>Lectura general:</strong> ${escapeHtml(recommendationForScore(avgScore))}
    </div>
    <div class="student-critical-box">
      <h4>Preguntas que debes revisar</h4>
      <ul class="teacher-topic-list">${criticalHtml}</ul>
    </div>
    <div class="student-personal-report-grid">${areaCards}</div>
  `;
}

function handleStudentPersonalReportClick(event) {
  const btn = event.target.closest('[data-student-subject-pdf]');
  if (!btn) return;
  exportStudentSubjectReportPdf(btn.getAttribute('data-student-subject-pdf') || '');
}

function exportStudentPersonalReportPdf() {
  if (!isDashboardStudentRole()) {
    setStatus('Este informe personalizado solo está disponible con acceso de estudiante.', 'warning');
    return;
  }
  const { records, details } = getStudentReportBaseData();
  if (!records.length) {
    setStatus('No hay resultados personales para generar el informe.', 'warning');
    return;
  }
  try {
    if (els.studentPersonalReportPdfBtn) {
      els.studentPersonalReportPdfBtn.disabled = true;
      els.studentPersonalReportPdfBtn.textContent = 'Creando informe...';
    }
    const pdf = createStudentPersonalReportPdf(records, details);
    const latest = records.slice().sort((a, b) => dateValue(b.timestampISO || b.timestamp || b.finishedAtLabel) - dateValue(a.timestampISO || a.timestamp || a.finishedAtLabel))[0];
    const filename = `mi-informe-icfes-${slugifyPdf(latest.studentName)}-${compactDate(new Date())}.pdf`;
    downloadBlob(filename, new Blob([pdf], { type: 'application/pdf' }), { keepOpen: true });
    setStatus('Informe personalizado del estudiante generado correctamente.', 'success');
  } catch (error) {
    console.error(error);
    setStatus(`No fue posible generar el informe personalizado. Detalle: ${error.message || error}`, 'error');
  } finally {
    if (els.studentPersonalReportPdfBtn) {
      els.studentPersonalReportPdfBtn.disabled = false;
      els.studentPersonalReportPdfBtn.textContent = 'Descargar mi informe PDF';
    }
  }
}

function exportStudentSubjectReportPdf(areaName) {
  const { records, details } = getStudentReportBaseData();
  const area = String(areaName || '').trim();
  if (!area || !records.length) {
    setStatus('No hay datos personales para generar el informe por asignatura.', 'warning');
    return;
  }
  try {
    const pdf = createStudentSubjectReportPdf(area, records, details);
    const latest = records.slice().sort((a, b) => dateValue(b.timestampISO || b.timestamp || b.finishedAtLabel) - dateValue(a.timestampISO || a.timestamp || a.finishedAtLabel))[0];
    const filename = `mi-informe-${slugifyPdf(area)}-${slugifyPdf(latest.studentName)}-${compactDate(new Date())}.pdf`;
    downloadBlob(filename, new Blob([pdf], { type: 'application/pdf' }), { keepOpen: true });
    setStatus(`Informe personalizado de ${area} generado correctamente.`, 'success');
  } catch (error) {
    console.error(error);
    setStatus(`No fue posible generar el informe de ${area}. Detalle: ${error.message || error}`, 'error');
  }
}

function createStudentPersonalReportPdf(records, details) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 42;
  const rightX = pageWidth - marginX;
  const colors = {
    primary: [0.13, 0.31, 0.73],
    accent: [0.02, 0.65, 0.47],
    danger: [0.85, 0.31, 0.31],
    warning: [0.96, 0.62, 0.04],
    text: [0.06, 0.13, 0.20],
    muted: [0.38, 0.45, 0.55],
    line: [0.86, 0.90, 0.95],
    panel: [0.97, 0.98, 0.99],
    softBlue: [0.95, 0.98, 1],
    white: [1, 1, 1]
  };
  const latest = records.slice().sort((a, b) => dateValue(b.timestampISO || b.timestamp || b.finishedAtLabel) - dateValue(a.timestampISO || a.timestamp || a.finishedAtLabel))[0];
  const avgScore = round(average(records.map(record => record.score)), 1);
  const areaRows = getStudentPersonalAreaRows(records, details);
  const critical = questionStats(details).sort((a, b) => a.percentCorrect - b.percentCorrect || b.total - a.total).slice(0, 10);
  const pages = [];
  const totalPages = Math.max(2, 1 + areaRows.length);

  const cover = [];
  pdfRect(cover, 0, 0, pageWidth, pageHeight, colors.white);
  pdfText(cover, 'INFORME PERSONALIZADO DEL ESTUDIANTE', marginX, 804, 14, true, colors.primary);
  pdfText(cover, DASHBOARD_INSTITUTION, marginX, 784, 10.5, true, colors.text);
  pdfText(cover, `${latest.studentName || 'Estudiante'} | ${latest.group || 'Grupo no registrado'} | ${latest.email || ''}`, marginX, 764, 9, false, colors.muted, 110);
  pdfText(cover, `Generado: ${formatDateTime(new Date().toISOString())}`, marginX, 748, 8.5, false, colors.muted);

  const cards = [
    ['Promedio personal', `${avgScore}%`, colors.primary],
    ['Nivel', levelForScore(avgScore), colors.accent],
    ['Intentos', String(records.length), colors.primary],
    ['Area prioritaria', areaRows.length ? areaRows[0].area : 'Sin datos', colors.danger]
  ];
  cards.forEach((card, index) => {
    const x = marginX + (index % 2) * 250;
    const y = 690 - Math.floor(index / 2) * 74;
    pdfRoundRect(cover, x, y, 232, 56, 8, colors.panel, colors.line);
    pdfText(cover, card[0], x + 12, y + 36, 8, false, colors.muted, 30);
    pdfText(cover, card[1], x + 12, y + 15, 12.2, true, card[2], 34);
  });

  let y = 520;
  pdfText(cover, 'RESUMEN GENERAL POR ASIGNATURA', marginX, y, 11, true, colors.text);
  y -= 24;
  areaRows.forEach(area => {
    if (y < 190) return;
    pdfDashboardBar(cover, area.area, area.percent, `${area.priority} | ${area.correct}/${area.total} correctas`, marginX, y, 330, area.percent < 60 ? colors.danger : colors.accent, colors);
    y -= 32;
  });
  y -= 8;
  pdfText(cover, 'PREGUNTAS QUE DEBES REVISAR', marginX, y, 10.5, true, colors.text);
  y -= 22;
  if (critical.length) {
    critical.slice(0, 6).forEach(q => {
      if (y < 68) return;
      pdfText(cover, `P${q.number} - ${q.area}: ${Math.round(100 - q.percentCorrect)}% dificultad personal`, marginX, y, 8.4, false, colors.text, 105);
      y -= 16;
    });
  } else {
    pdfText(cover, 'No hay preguntas críticas registradas para tu usuario.', marginX, y, 8.4, false, colors.muted, 105);
  }
  pdfText(cover, `Pagina 1 de ${totalPages}`, marginX, 30, 8, false, colors.muted);
  pages.push(cover.join('\n'));

  areaRows.forEach((area, index) => {
    const ops = [];
    pdfRect(ops, 0, 0, pageWidth, pageHeight, colors.white);
    pdfText(ops, `ASIGNATURA: ${area.area.toUpperCase()}`, marginX, 804, 13, true, colors.primary);
    pdfText(ops, `${area.priority} | Resultado personal: ${area.percent}% | ${area.correct}/${area.total} correctas`, marginX, 782, 8.8, false, colors.muted, 110);
    let yy = 740;
    pdfDashboardBar(ops, area.area, area.percent, `${area.correct}/${area.total} correctas`, marginX, yy, 360, area.percent < 60 ? colors.danger : colors.accent, colors);
    yy -= 58;
    pdfText(ops, 'TEMAS PARA TRABAJAR', marginX, yy, 10.8, true, colors.text);
    yy -= 24;
    if (area.topics.length) {
      area.topics.slice(0, 6).forEach((topic, topicIndex) => {
        if (yy < 248) return;
        pdfRoundRect(ops, marginX, yy - 38, rightX - marginX, 42, 6, colors.panel, colors.line);
        pdfText(ops, `${topicIndex + 1}. ${topic.topic}`, marginX + 12, yy - 8, 8.5, true, colors.text, 82);
        const qText = topic.questions.length ? ` | Preguntas: ${topic.questions.map(q => `P${q}`).join(', ')}` : '';
        pdfText(ops, `${topic.percentError}% dificultad personal${qText}`, marginX + 12, yy - 26, 7.8, false, colors.muted, 100);
        yy -= 50;
      });
    } else {
      pdfText(ops, 'No hay temas críticos registrados en esta asignatura.', marginX, yy, 8.5, false, colors.muted, 100);
      yy -= 24;
    }
    yy -= 8;
    pdfText(ops, 'PREGUNTAS ESPECIFICAS PARA REVISAR', marginX, yy, 10.8, true, colors.text);
    yy -= 24;
    if (area.questions.length) {
      area.questions.slice(0, 8).forEach(q => {
        if (yy < 132) return;
        pdfText(ops, `P${q.number}: ${q.percentError}% dificultad | Correctas ${q.correct}/${q.total} | ${q.component}`, marginX, yy, 8.1, false, colors.text, 108);
        yy -= 16;
      });
    } else {
      pdfText(ops, 'Sin preguntas críticas registradas para esta asignatura.', marginX, yy, 8.5, false, colors.muted, 105);
    }
    pdfRoundRect(ops, marginX, 54, rightX - marginX, 52, 8, colors.softBlue, colors.line);
    pdfText(ops, 'ORIENTACION PERSONAL', marginX + 14, 88, 8.4, true, colors.primary);
    pdfText(ops, area.recommendation, marginX + 14, 72, 7.4, false, colors.text, 112);
    pdfText(ops, `Pagina ${index + 2} de ${totalPages}`, marginX, 30, 8, false, colors.muted);
    pages.push(ops.join('\n'));
  });

  if (!areaRows.length) {
    const ops = [];
    pdfRect(ops, 0, 0, pageWidth, pageHeight, colors.white);
    pdfText(ops, 'SIN DATOS POR ASIGNATURA', marginX, 804, 13, true, colors.primary);
    pdfText(ops, 'Aun no hay suficiente informacion para construir recomendaciones por asignatura.', marginX, 782, 9, false, colors.muted, 110);
    pdfText(ops, 'Pagina 2 de 2', marginX, 30, 8, false, colors.muted);
    pages.push(ops.join('\n'));
  }
  return buildPdfFromStreams(pages, pageWidth, pageHeight);
}

function createStudentSubjectReportPdf(areaName, records, details) {
  const subjectRecords = records.map(record => projectRecordToArea(record, areaName)).filter(Boolean);
  const subjectDetails = details.filter(item => areaNameMatches(item.area, areaName));
  if (!subjectRecords.length) throw new Error('No hay registros personales para esta asignatura.');
  return createStudentPersonalReportPdf(subjectRecords, subjectDetails);
}

function exportTeacherReportPdf() {
  const records = (dashboardState.filteredRecords && dashboardState.filteredRecords.length)
    ? dashboardState.filteredRecords
    : ((dashboardState.data && dashboardState.data.records) ? dashboardState.data.records : []);
  const details = (dashboardState.filteredDetails && dashboardState.filteredDetails.length)
    ? dashboardState.filteredDetails
    : ((dashboardState.data && dashboardState.data.details) ? dashboardState.data.details : []);
  if (!records.length) {
    setStatus('No hay datos visibles para generar el informe docente.', 'warning');
    return;
  }
  try {
    if (els.teacherReportPdfBtn) {
      els.teacherReportPdfBtn.disabled = true;
      els.teacherReportPdfBtn.textContent = 'Creando informe...';
    }
    const pdf = createTeacherReportPdf(records, details);
    const filename = `informe-docentes-materias-grupos-${compactDate(new Date())}.pdf`;
    downloadBlob(filename, new Blob([pdf], { type: 'application/pdf' }), { keepOpen: true });
    setStatus('Informe docente por materias generado correctamente.', 'success');
  } catch (error) {
    console.error(error);
    setStatus(`No fue posible generar el informe docente. Detalle: ${error.message || error}`, 'error');
  } finally {
    if (els.teacherReportPdfBtn) {
      els.teacherReportPdfBtn.disabled = false;
      els.teacherReportPdfBtn.textContent = 'Descargar informe docente PDF';
    }
  }
}

function createTeacherReportPdf(records, details) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 42;
  const rightX = pageWidth - marginX;
  const colors = {
    primary: [0.13, 0.31, 0.73],
    accent: [0.02, 0.65, 0.47],
    danger: [0.85, 0.31, 0.31],
    warning: [0.96, 0.62, 0.04],
    text: [0.06, 0.13, 0.20],
    muted: [0.38, 0.45, 0.55],
    line: [0.86, 0.90, 0.95],
    panel: [0.97, 0.98, 0.99],
    softBlue: [0.95, 0.98, 1],
    white: [1, 1, 1]
  };
  const report = buildTeacherReportData(records, details);
  const summary = summarize(records);
  const pages = [];
  const totalPages = Math.max(1, report.length + 1);

  const cover = [];
  pdfRect(cover, 0, 0, pageWidth, pageHeight, colors.white);
  pdfText(cover, 'INFORME DOCENTE POR MATERIAS Y GRUPOS', marginX, 804, 14, true, colors.primary);
  pdfText(cover, DASHBOARD_INSTITUTION, marginX, 784, 10.5, true, colors.text);
  pdfText(cover, `Generado: ${formatDateTime(new Date().toISOString())}`, marginX, 767, 8.5, false, colors.muted);
  const sectionText = els.section && els.section.value ? `Seccion ${els.section.value}` : 'Todas las secciones';
  const areaFilterText = els.areaFilter && els.areaFilter.value ? ` | Asignatura ${els.areaFilter.value}` : '';
  pdfText(cover, `Filtros: Grupo ${els.group && els.group.value ? els.group.value : 'Todos'} | ${sectionText}${areaFilterText}`, marginX, 750, 8.5, false, colors.muted, 110);

  const cards = [
    ['Intentos', String(summary.totalAttempts), colors.primary],
    ['Estudiantes', String(summary.uniqueStudents), colors.accent],
    ['Promedio', `${summary.avgScore}%`, colors.primary],
    ['Area prioritaria', summary.weakArea, colors.danger]
  ];
  cards.forEach((card, index) => {
    const x = marginX + (index % 2) * 250;
    const y = 690 - Math.floor(index / 2) * 74;
    pdfRoundRect(cover, x, y, 232, 56, 8, colors.panel, colors.line);
    pdfText(cover, card[0], x + 12, y + 36, 8, false, colors.muted, 30);
    pdfText(cover, card[1], x + 12, y + 15, 13.5, true, card[2], 30);
  });

  let y = 520;
  pdfText(cover, 'RESUMEN GENERAL POR MATERIA', marginX, y, 11, true, colors.text);
  y -= 24;
  report.forEach(area => {
    if (y < 90) return;
    pdfDashboardBar(cover, area.area, area.percent, `${area.priority} | ${area.correct}/${area.total} correctas`, marginX, y, 330, area.percent < 60 ? colors.danger : colors.accent, colors);
    y -= 32;
  });
  pdfText(cover, `Pagina 1 de ${totalPages}`, marginX, 30, 8, false, colors.muted);
  pages.push(cover.join('\n'));

  report.forEach((area, index) => {
    const ops = [];
    pdfRect(ops, 0, 0, pageWidth, pageHeight, colors.white);
    pdfText(ops, `MATERIA: ${area.area.toUpperCase()}`, marginX, 804, 13, true, colors.primary);
    pdfText(ops, `${area.priority} | Promedio general filtrado: ${area.percent}% | ${area.correct}/${area.total} correctas`, marginX, 782, 8.8, false, colors.muted, 110);

    let yy = 744;
    pdfText(ops, 'DESEMPENO POR GRUPO', marginX, yy, 10.8, true, colors.text);
    yy -= 24;
    area.groupRows.forEach(row => {
      const detail = row.total ? `${row.correct}/${row.total} correctas` : 'Sin datos';
      pdfDashboardBar(ops, row.group, row.percent, detail, marginX, yy, 330, row.percent < 60 ? colors.danger : colors.accent, colors);
      yy -= 32;
    });

    yy -= 10;
    pdfText(ops, 'TEMAS O COMPONENTES PARA PROFUNDIZAR EN CLASE', marginX, yy, 10.8, true, colors.text);
    yy -= 24;
    if (!area.topics.length) {
      pdfText(ops, 'No hay detalle de temas críticos para esta materia.', marginX, yy, 8.8, false, colors.muted, 110);
      yy -= 22;
    } else {
      area.topics.slice(0, 8).forEach((topic, topicIndex) => {
        if (yy < 132) return;
        pdfRoundRect(ops, marginX, yy - 34, rightX - marginX, 40, 6, colors.panel, colors.line);
        pdfText(ops, `${topicIndex + 1}. ${topic.topic}`, marginX + 12, yy - 8, 8.7, true, colors.text, 80);
        const qText = topic.questions.length ? ` | Preguntas: ${topic.questions.map(q => `P${q}`).join(', ')}` : '';
        pdfText(ops, `${topic.percentError}% dificultad | ${topic.difficulty}/${topic.total} dificultades${qText}`, marginX + 12, yy - 25, 7.8, false, colors.muted, 100);
        yy -= 48;
      });
    }

    pdfRoundRect(ops, marginX, 54, rightX - marginX, 52, 8, colors.softBlue, colors.line);
    pdfText(ops, 'ORIENTACION PEDAGOGICA', marginX + 14, 88, 8.4, true, colors.primary);
    pdfText(ops, area.recommendation, marginX + 14, 72, 7.4, false, colors.text, 112);
    pdfText(ops, `Pagina ${index + 2} de ${totalPages}`, marginX, 30, 8, false, colors.muted);
    pages.push(ops.join('\n'));
  });

  return buildPdfFromStreams(pages, pageWidth, pageHeight);
}


function handleTeacherSubjectReportClick(event) {
  const btn = event.target.closest('[data-teacher-subject-pdf]');
  if (!btn) return;
  exportTeacherSubjectReportPdf(btn.getAttribute('data-teacher-subject-pdf') || '');
}

function exportTeacherSubjectReportPdf(areaName) {
  const records = (dashboardState.filteredRecords && dashboardState.filteredRecords.length)
    ? dashboardState.filteredRecords
    : ((dashboardState.data && dashboardState.data.records) ? dashboardState.data.records : []);
  const details = (dashboardState.filteredDetails && dashboardState.filteredDetails.length)
    ? dashboardState.filteredDetails
    : ((dashboardState.data && dashboardState.data.details) ? dashboardState.data.details : []);
  const area = String(areaName || '').trim();
  if (!area || !records.length) {
    setStatus('No hay datos visibles para generar el informe por asignatura.', 'warning');
    return;
  }
  try {
    const pdf = createTeacherSubjectReportPdf(area, records, details);
    const filename = `informe-docente-${slugifyPdf(area)}-${compactDate(new Date())}.pdf`;
    downloadBlob(filename, new Blob([pdf], { type: 'application/pdf' }), { keepOpen: true });
    setStatus(`Informe docente de ${area} generado correctamente.`, 'success');
  } catch (error) {
    console.error(error);
    setStatus(`No fue posible generar el informe de ${area}. Detalle: ${error.message || error}`, 'error');
  }
}

function buildSubjectQuestionStats(details, areaName) {
  const areaKey = normalizeHeader(areaName);
  const filtered = (details || []).filter(item => normalizeHeader(item.area) === areaKey);
  const grouped = groupBy(filtered, item => String(item.number || 'Sin numero'));
  return Object.entries(grouped).map(([number, items]) => {
    const total = items.length;
    const correct = items.filter(item => /correcta/i.test(item.result || '')).length;
    const omitted = items.filter(item => /omitida|sin responder/i.test(item.result || '') || /sin responder/i.test(item.studentAnswer || '')).length;
    const incorrect = Math.max(total - correct - omitted, 0);
    const difficulty = incorrect + omitted;
    const percentError = total ? round((difficulty / total) * 100, 1) : 0;
    const sample = items[0] || {};
    const groups = unique(items.map(item => item.group).filter(Boolean));
    return {
      number,
      area: sample.area || areaName,
      competence: sample.competence || 'Competencia no registrada',
      component: sample.component || sample.competence || 'Tema no registrado',
      difficultyLabel: sample.difficulty || 'Dificultad no registrada',
      total,
      correct,
      incorrect,
      omitted,
      difficulty,
      percentError,
      groups
    };
  }).filter(item => item.total > 0).sort((a, b) => b.percentError - a.percentError || b.difficulty - a.difficulty || Number(a.number) - Number(b.number));
}

function createTeacherSubjectReportPdf(areaName, records, details) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 42;
  const rightX = pageWidth - marginX;
  const colors = {
    primary: [0.13, 0.31, 0.73],
    accent: [0.02, 0.65, 0.47],
    danger: [0.85, 0.31, 0.31],
    warning: [0.96, 0.62, 0.04],
    text: [0.06, 0.13, 0.20],
    muted: [0.38, 0.45, 0.55],
    line: [0.86, 0.90, 0.95],
    panel: [0.97, 0.98, 0.99],
    softBlue: [0.95, 0.98, 1],
    white: [1, 1, 1]
  };
  const report = buildTeacherReportData(records, details);
  const area = report.find(item => normalizeHeader(item.area) === normalizeHeader(areaName));
  if (!area) throw new Error('No se encontró la asignatura en los datos filtrados.');
  const questions = buildSubjectQuestionStats(details, area.area);
  const questionPages = Math.max(1, Math.ceil(questions.length / 8));
  const totalPages = 1 + questionPages;
  const pages = [];

  const cover = [];
  pdfRect(cover, 0, 0, pageWidth, pageHeight, colors.white);
  pdfText(cover, `INFORME DOCENTE DE ${area.area.toUpperCase()}`, marginX, 804, 14, true, colors.primary);
  pdfText(cover, DASHBOARD_INSTITUTION, marginX, 784, 10.5, true, colors.text);
  pdfText(cover, `Generado: ${formatDateTime(new Date().toISOString())}`, marginX, 767, 8.5, false, colors.muted);
  pdfText(cover, `${area.priority} | Promedio: ${area.percent}% | ${area.correct}/${area.total} correctas`, marginX, 744, 9, true, area.percent < 60 ? colors.danger : colors.accent, 110);

  let y = 704;
  pdfText(cover, '1. LECTURA GENERAL DE LA ASIGNATURA', marginX, y, 11, true, colors.text);
  y -= 26;
  pdfDashboardBar(cover, area.area, area.percent, `${area.correct}/${area.total} correctas`, marginX, y, 360, area.percent < 60 ? colors.danger : colors.accent, colors);
  y -= 52;

  pdfText(cover, '2. DESEMPENO POR GRUPO', marginX, y, 11, true, colors.text);
  y -= 24;
  area.groupRows.forEach(row => {
    const detail = row.total ? `${row.correct}/${row.total} correctas` : 'Sin datos';
    pdfDashboardBar(cover, row.group, row.percent, detail, marginX, y, 360, row.percent < 60 ? colors.danger : colors.accent, colors);
    y -= 32;
  });

  y -= 12;
  pdfText(cover, '3. TEMAS PRINCIPALES PARA PROFUNDIZAR', marginX, y, 11, true, colors.text);
  y -= 24;
  if (!area.topics.length) {
    pdfText(cover, 'No hay detalle de temas críticos para esta asignatura.', marginX, y, 8.8, false, colors.muted, 110);
    y -= 22;
  } else {
    area.topics.slice(0, 5).forEach((topic, index) => {
      if (y < 150) return;
      pdfRoundRect(cover, marginX, y - 34, rightX - marginX, 40, 6, colors.panel, colors.line);
      pdfText(cover, `${index + 1}. ${topic.topic}`, marginX + 12, y - 8, 8.5, true, colors.text, 85);
      const questionText = topic.questions.length ? `Preguntas: ${topic.questions.map(q => `P${q}`).join(', ')}` : 'Preguntas no identificadas';
      pdfText(cover, `${topic.percentError}% dificultad | ${topic.difficulty}/${topic.total} dificultades | ${questionText}`, marginX + 12, y - 25, 7.8, false, colors.muted, 105);
      y -= 48;
    });
  }

  pdfRoundRect(cover, marginX, 54, rightX - marginX, 58, 8, colors.softBlue, colors.line);
  pdfText(cover, 'ORIENTACION PARA CLASE', marginX + 14, 92, 8.6, true, colors.primary);
  pdfText(cover, area.recommendation, marginX + 14, 75, 7.5, false, colors.text, 112);
  pdfText(cover, `Pagina 1 de ${totalPages}`, marginX, 30, 8, false, colors.muted);
  pages.push(cover.join('\n'));

  for (let pageIndex = 0; pageIndex < questionPages; pageIndex += 1) {
    const ops = [];
    const pageNumber = pageIndex + 2;
    const start = pageIndex * 8;
    const chunk = questions.slice(start, start + 8);
    pdfRect(ops, 0, 0, pageWidth, pageHeight, colors.white);
    pdfText(ops, `PREGUNTAS A MEJORAR - ${area.area.toUpperCase()}`, marginX, 804, 13, true, colors.primary);
    pdfText(ops, `Listado ${questions.length ? `${start + 1}-${Math.min(start + chunk.length, questions.length)} de ${questions.length}` : 'sin preguntas críticas'}`, marginX, 782, 8.5, false, colors.muted, 110);
    let yy = 744;
    if (!chunk.length) {
      pdfText(ops, 'No hay detalle de preguntas para esta asignatura. Verifica que la hoja Respuestas_Detalladas esté actualizada.', marginX, yy, 8.8, false, colors.muted, 110);
    } else {
      chunk.forEach(question => {
        pdfRoundRect(ops, marginX, yy - 58, rightX - marginX, 62, 6, colors.panel, colors.line);
        const title = `P${question.number} | ${question.percentError}% dificultad | ${question.difficulty}/${question.total} dificultades`;
        pdfText(ops, title, marginX + 12, yy - 10, 8.8, true, question.percentError >= 60 ? colors.danger : colors.warning, 90);
        pdfText(ops, `Tema/componente: ${question.component}`, marginX + 12, yy - 27, 7.8, false, colors.text, 100);
        pdfText(ops, `Competencia: ${question.competence}`, marginX + 12, yy - 42, 7.5, false, colors.muted, 100);
        const action = question.percentError >= 60 ? 'Accion: explicar nuevamente, modelar resolucion y practicar una pregunta similar.' : 'Accion: socializar distractores y reforzar estrategia de lectura.';
        pdfText(ops, action, marginX + 12, yy - 56, 7.3, false, colors.muted, 104);
        yy -= 76;
      });
    }
    pdfText(ops, `Pagina ${pageNumber} de ${totalPages}`, marginX, 30, 8, false, colors.muted);
    pages.push(ops.join('\n'));
  }

  return buildPdfFromStreams(pages, pageWidth, pageHeight);
}

function renderPdfActions(student) {
  const key = escapeAttr(student.key);
  const drive = student.latest.pdfDriveUrl
    ? `<a class="dashboard-pdf-link" href="${escapeAttr(student.latest.pdfDriveUrl)}" target="_blank" rel="noopener noreferrer">Abrir Drive</a>`
    : `<span class="muted-inline">Sin Drive</span>`;
  return `
    <div class="dashboard-pdf-actions">
      ${drive}
      <button class="dashboard-inline-btn" type="button" data-pdf-action="download-individual" data-key="${key}">Descargar PDF</button>
    </div>
  `;
}

function handleStudentTablePdfClick(event) {
  const btn = event.target.closest('[data-pdf-action="download-individual"]');
  if (!btn) return;
  const key = btn.getAttribute('data-key') || '';
  downloadStudentDashboardPdf(key, btn);
}

function downloadStudentDashboardPdf(studentKey, sourceButton) {
  const allRecords = (dashboardState.data && dashboardState.data.records) ? dashboardState.data.records : [];
  const visibleRecords = (dashboardState.filteredRecords && dashboardState.filteredRecords.length) ? dashboardState.filteredRecords : allRecords;
  const sectionFilter = els.section ? els.section.value : '';
  const sourceRecords = sectionFilter ? visibleRecords : allRecords.filter(record => {
    if (els.group && els.group.value && record.group !== els.group.value) return false;
    if (els.from && els.from.value) {
      const from = new Date(`${els.from.value}T00:00:00`);
      const date = getRecordDate(record);
      if (date && date < from) return false;
    }
    if (els.to && els.to.value) {
      const to = new Date(`${els.to.value}T23:59:59`);
      const date = getRecordDate(record);
      if (date && date > to) return false;
    }
    return true;
  });

  const studentRecords = sourceRecords
    .filter(record => getStudentKey(record) === studentKey)
    .sort(compareRecordsForPdf);

  if (!studentRecords.length) {
    setStatus('No fue posible crear el PDF: no se encontró el registro del estudiante.', 'error');
    return;
  }

  const pdfRecords = selectStudentPdfRecords(studentRecords);
  const latest = pdfRecords[0] || studentRecords[0];

  try {
    if (sourceButton) {
      sourceButton.disabled = true;
      sourceButton.textContent = 'Creando PDF...';
    }
    const pdf = createDashboardStudentCombinedPdf(pdfRecords, sourceRecords);
    const suffix = pdfRecords.length > 1 ? 'secciones' : slugifyPdf(latest.sessionLabel || 'seccion');
    const filename = `informe-dashboard-icfes-mjb-${slugifyPdf(latest.studentName)}-${slugifyPdf(latest.group)}-${suffix}.pdf`;
    downloadBlob(filename, new Blob([pdf], { type: 'application/pdf' }));
    setStatus(`PDF individual generado para ${latest.studentName}${pdfRecords.length > 1 ? ' con las secciones presentadas' : ''}.`, 'success');
  } catch (error) {
    console.error(error);
    setStatus(`No fue posible crear el PDF individual. Detalle: ${error.message}`, 'error');
  } finally {
    if (sourceButton) {
      sourceButton.disabled = false;
      sourceButton.textContent = 'Descargar PDF';
    }
  }
}

function createDashboardStudentPageStream(record, summary, pageNumber = 1, totalPages = 1) {
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const marginX = 40;
  const rightX = pageWidth - marginX;
  const colors = {
    primary: [0.13, 0.31, 0.73],
    primaryDark: [0.07, 0.18, 0.38],
    accent: [0.02, 0.65, 0.47],
    danger: [0.85, 0.18, 0.18],
    warning: [0.96, 0.62, 0.04],
    text: [0.06, 0.13, 0.20],
    muted: [0.38, 0.45, 0.55],
    line: [0.86, 0.90, 0.95],
    panel: [0.97, 0.98, 0.99],
    softBlue: [0.91, 0.95, 1],
    white: [1, 1, 1]
  };

  const ops = [];
  const studentName = record.studentName || 'Sin nombre';
  const group = record.group || 'Sin grupo';
  const email = record.email || 'Sin correo';
  const elapsed = formatDurationForDashboardPdf(record.elapsedLabel);
  const finished = record.finishedAtLabel || formatDateTime(record.timestampISO || record.timestamp);
  const score = toNumber(record.score);
  const securityStatus = record.securityStatus || 'Normal';
  const securityWarnings = toNumber(record.securityWarnings);
  const securityExits = toNumber(record.securityTotalExits);
  const securityAway = formatDurationForDashboardPdf(record.securityAwayTime || '00:00:00');
  const securityColor = /normal/i.test(securityStatus) && securityWarnings === 0 && securityExits === 0 ? colors.accent : colors.danger;

  pdfRect(ops, 0, 0, pageWidth, pageHeight, colors.white);

  // Encabezado institucional
  pdfRect(ops, 0, 766, pageWidth, 76, colors.primaryDark);
  pdfText(ops, 'INFORME INDIVIDUAL', marginX, 816, 15.5, true, colors.white);
  pdfText(ops, 'Dashboard ICFES Saber 11', marginX, 794, 11, false, colors.white);
  pdfText(ops, DASHBOARD_INSTITUTION, rightX - 210, 816, 9.8, true, colors.white, 38);
  pdfText(ops, `Generado: ${formatDateTime(new Date().toISOString())}`, rightX - 210, 798, 8.4, false, colors.white, 42);

  // Bloque de datos del estudiante
  pdfRoundRect(ops, marginX, 646, 330, 100, 10, colors.panel, colors.line);
  pdfText(ops, 'DATOS DEL ESTUDIANTE', marginX + 14, 724, 8.4, true, colors.primary);
  pdfText(ops, studentName, marginX + 14, 704, 13.2, true, colors.text, 42);
  pdfText(ops, `Grupo: ${group}`, marginX + 14, 682, 9.2, true, colors.text, 30);
  pdfText(ops, `Correo: ${email}`, marginX + 14, 665, 8.4, false, colors.muted, 60);

  // Bloque del intento
  pdfRoundRect(ops, marginX + 346, 646, rightX - (marginX + 346), 100, 10, colors.panel, colors.line);
  pdfText(ops, 'DATOS DEL INTENTO', marginX + 360, 724, 8.4, true, colors.primary);
  pdfText(ops, `${sectionLabelForRecord(record)} | ${record.scopeLabel || 'Intento'}`, marginX + 360, 704, 9.3, true, colors.text, 35);
  pdfText(ops, `${record.modeLabel || 'Modo no registrado'}`, marginX + 360, 687, 8.4, false, colors.muted, 35);
  pdfText(ops, `Fecha: ${finished}`, marginX + 360, 670, 8.2, false, colors.muted, 40);
  pdfText(ops, `Tiempo: ${elapsed}`, marginX + 360, 654, 8.2, false, colors.muted, 40);

  // Seguridad del simulacro
  pdfRoundRect(ops, marginX, 585, rightX - marginX, 47, 8, colors.softBlue, colors.line);
  pdfText(ops, 'SEGURIDAD DEL SIMULACRO', marginX + 14, 616, 8.3, true, colors.primary);
  pdfText(ops, `Estado: ${securityStatus}`, marginX + 190, 616, 8.4, true, securityColor, 45);
  pdfText(ops, `Advertencias: ${securityWarnings} | Salidas: ${securityExits} | Tiempo fuera: ${securityAway}`, marginX + 14, 598, 8.2, true, securityColor);
  pdfText(ops, 'Registro de cambios de pestana, perdida de foco o salida de pantalla completa.', marginX + 250, 598, 7.4, false, colors.muted, 58);

  // Tarjetas de indicadores
  const cards = [
    ['Ultimo resultado', `${score}%`, colors.primary],
    ['Promedio estudiante', `${round(summary.studentAvg, 1)}%`, colors.accent],
    ['Promedio grupo', `${round(summary.groupAvg, 1)}%`, colors.warning],
    ['Promedio institucion', `${round(summary.institutionAvg, 1)}%`, colors.primary]
  ];
  const cardY = 516;
  const cardW = 121;
  const cardGap = 8;
  cards.forEach((card, index) => {
    const x = marginX + index * (cardW + cardGap);
    pdfRoundRect(ops, x, cardY, cardW, 58, 8, colors.panel, colors.line);
    pdfText(ops, card[0], x + 10, cardY + 39, 7.8, false, colors.muted, 20);
    pdfText(ops, card[1], x + 10, cardY + 15, 18, true, card[2]);
  });

  // Resumen del intento
  pdfText(ops, 'RESUMEN DEL INTENTO', marginX, 480, 11.5, true, colors.text);
  pdfRoundRect(ops, marginX, 386, rightX - marginX, 78, 8, colors.panel, colors.line);
  const stats = [
    ['Preguntas disponibles', toNumber(record.totalQuestions)],
    ['Respondidas', toNumber(record.answered)],
    ['Calificables', toNumber(record.scored)],
    ['Correctas', toNumber(record.correct)],
    ['Incorrectas', toNumber(record.incorrect)],
    ['Omitidas', toNumber(record.omitted)]
  ];
  stats.forEach((item, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = marginX + 16 + col * 164;
    const y = 439 - row * 33;
    pdfText(ops, item[0], x, y, 7.8, false, colors.muted, 24);
    pdfText(ops, String(item[1]), x, y - 18, 13, true, colors.text);
  });
  pdfText(ops, `Nivel interno: ${record.level || levelForScore(score)}`, marginX, 374, 8.6, true, colors.primary, 80);

  // Grafico general
  pdfText(ops, 'GRAFICO GENERAL DE DESEMPENO', marginX, 342, 11.5, true, colors.text);
  pdfText(ops, `Porcentaje de acierto: ${score}%`, marginX, 321, 8.8, true, colors.text);
  const barW = rightX - marginX;
  pdfRect(ops, marginX, 298, barW, 15, colors.line);
  pdfRect(ops, marginX, 298, barW * Math.max(0, Math.min(score, 100)) / 100, 15, colors.primary);
  pdfText(ops, '0%', marginX, 282, 7.4, false, colors.muted);
  pdfText(ops, '100%', rightX - 22, 282, 7.4, false, colors.muted);

  // Resultado por area
  pdfText(ops, 'RESULTADO POR AREA', marginX, 254, 11.5, true, colors.text);
  const areas = Array.isArray(record.byArea) ? record.byArea : [];
  let y = 230;
  if (!areas.length) {
    pdfText(ops, 'No hay desglose por area registrado para este intento.', marginX, y, 9, false, colors.muted);
    y -= 22;
  } else {
    areas.slice(0, 5).forEach(area => {
      const pct = toNumber(area.percent);
      const totalArea = toNumber(area.total);
      const correctArea = toNumber(area.correct);
      pdfText(ops, area.area || 'Area sin nombre', marginX, y, 8.8, true, colors.text, 38);
      pdfText(ops, `${correctArea}/${totalArea} correctas | ${pct}%`, rightX - 140, y, 8.4, false, colors.text);
      pdfRect(ops, marginX, y - 15, barW, 10, colors.line);
      pdfRect(ops, marginX, y - 15, barW * Math.max(0, Math.min(pct, 100)) / 100, 10, colors.accent);
      y -= 36;
    });
  }

  // Recomendacion final
  const recY = Math.max(78, Math.min(y - 6, 92));
  pdfRoundRect(ops, marginX, 54, rightX - marginX, 44, 8, colors.panel, colors.line);
  pdfText(ops, 'RECOMENDACION PEDAGOGICA', marginX + 14, 82, 8.6, true, colors.primary);
  pdfText(ops, record.recommendation || recommendationForScore(score), marginX + 14, 67, 7.5, false, colors.muted, 105);

  pdfText(ops, 'Informe generado desde el Dashboard Institucional ICFES Saber 11.', marginX, 30, 7.6, false, colors.muted);
  pdfText(ops, `Pagina ${pageNumber} de ${totalPages}`, rightX - 58, 30, 7.6, false, colors.muted);
  return ops.join('\n');
}

function createDashboardStudentPdf(record, summary) {
  return buildPdfFromStreams([createDashboardStudentPageStream(record, summary, 1, 1)], 595.28, 841.89);
}

function createDashboardStudentCombinedPdf(studentRecords, referenceRecords) {
  const selected = Array.isArray(studentRecords) && studentRecords.length ? studentRecords : [];
  if (!selected.length) throw new Error('No hay registros del estudiante para generar el PDF.');
  const allRecords = Array.isArray(referenceRecords) && referenceRecords.length ? referenceRecords : selected;
  const studentKey = getStudentKey(selected[0]);
  const allStudentRecords = allRecords.filter(record => getStudentKey(record) === studentKey);
  const studentAvg = round(average((allStudentRecords.length ? allStudentRecords : selected).map(record => record.score)), 1);
  const institutionAvg = round(average(allRecords.map(record => record.score)), 1);
  const totalPages = selected.length;
  const streams = selected.map((record, index) => {
    const groupRecords = allRecords.filter(item => item.group === record.group);
    const summary = {
      attempts: allStudentRecords.length || selected.length,
      studentAvg,
      groupAvg: round(average(groupRecords.map(item => item.score)), 1),
      institutionAvg
    };
    return createDashboardStudentPageStream(record, summary, index + 1, totalPages);
  });
  return buildPdfFromStreams(streams, 595.28, 841.89);
}

function formatDurationForDashboardPdf(value) {
  const raw = String(value || '').trim();
  if (!raw) return 'No registrado';
  if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(raw)) return raw.length === 5 ? `00:${raw}` : raw;
  if (/^\d+(\.\d+)?$/.test(raw)) {
    const numeric = Number(raw);
    if (Number.isFinite(numeric) && numeric >= 0 && numeric < 10) {
      return secondsToDashboardDuration(Math.round(numeric * 24 * 60 * 60));
    }
  }
  const date = new Date(raw);
  if (!Number.isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}T/.test(raw)) {
    return secondsToDashboardDuration(date.getUTCHours() * 3600 + date.getUTCMinutes() * 60 + date.getUTCSeconds());
  }
  return raw;
}

function secondsToDashboardDuration(totalSeconds) {
  const safe = Math.max(0, Number(totalSeconds) || 0);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = Math.floor(safe % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}


function downloadBlob(filename, blob, options = {}) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  a.style.position = 'fixed';
  a.style.left = '-9999px';
  document.body.appendChild(a);
  try {
    a.click();
  } catch (error) {
    console.warn('Descarga automática no disponible en este contenedor.', error);
  }
  setTimeout(() => { if (a.parentNode) a.parentNode.removeChild(a); }, 250);

  // Google Sites puede bloquear descargas automáticas dentro de iframes.
  // Por eso siempre dejamos un enlace manual y una opción de abrir el PDF dentro del iframe.
  showDownloadFallbackDialog(filename, url);
  const revokeDelay = options.keepOpen ? 10 * 60 * 1000 : 3 * 60 * 1000;
  setTimeout(() => {
    const active = document.getElementById('dashboardDownloadModal');
    if (!active || active.dataset.url !== url) URL.revokeObjectURL(url);
  }, revokeDelay);
}

function showDownloadFallbackDialog(filename, url) {
  const existing = document.getElementById('dashboardDownloadModal');
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
  const overlay = document.createElement('div');
  overlay.className = 'dashboard-utility-overlay';
  overlay.id = 'dashboardDownloadModal';
  overlay.dataset.url = url;
  overlay.innerHTML = `
    <section class="dashboard-utility-card dashboard-download-card" role="dialog" aria-modal="true" aria-labelledby="downloadPdfTitle">
      <button class="dialog-close" type="button" data-dashboard-download-close aria-label="Cerrar">×</button>
      <p class="eyebrow">PDF generado</p>
      <h2 id="downloadPdfTitle">Exportación lista</h2>
      <p>Si Google Sites bloqueó la descarga automática, usa una de estas opciones manuales.</p>
      <p class="dashboard-file-name">${escapeHtml(filename)}</p>
      <div class="dialog-actions dashboard-download-actions">
        <a class="primary-btn header-link" href="${url}" download="${escapeAttr(filename)}">Descargar PDF</a>
        <a class="secondary-btn header-link" href="${url}" target="_blank" rel="noopener noreferrer">Abrir PDF</a>
        <button class="ghost-btn" type="button" id="openPdfHereBtn">Abrir aquí</button>
      </div>
    </section>
  `;
  document.body.appendChild(overlay);
  overlay.querySelectorAll('[data-dashboard-download-close]').forEach(btn => btn.addEventListener('click', () => closeDownloadFallbackDialog(url)));
  overlay.addEventListener('click', event => { if (event.target === overlay) closeDownloadFallbackDialog(url); });
  const openHere = overlay.querySelector('#openPdfHereBtn');
  if (openHere) openHere.addEventListener('click', () => { window.location.href = url; });
}

function closeDownloadFallbackDialog(url) {
  const modal = document.getElementById('dashboardDownloadModal');
  if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
  if (url) setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function buildPdfFromStreams(streams, pageWidth = 595.28, pageHeight = 841.89) {
  const objects = [];
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';
  const kids = [];
  streams.forEach((stream, index) => {
    const pageObj = 5 + index * 2;
    const contentObj = pageObj + 1;
    kids.push(`${pageObj} 0 R`);
    objects[pageObj] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObj} 0 R >>`;
    objects[contentObj] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });
  objects[2] = `<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${streams.length} >>`;
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (let i = 1; i < objects.length; i += 1) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function pdfText(ops, text, x, y, size = 10, bold = false, color = [0, 0, 0], maxChars = 0) {
  const lines = wrapPdfText(String(text || ''), maxChars || 0);
  lines.forEach((line, index) => {
    const yy = y - index * (size + 3);
    ops.push(`${color[0]} ${color[1]} ${color[2]} rg`);
    ops.push('BT');
    ops.push(`/${bold ? 'F2' : 'F1'} ${size} Tf`);
    ops.push(`${x} ${yy} Td`);
    ops.push(`(${escapePdfString(line)}) Tj`);
    ops.push('ET');
  });
}

function pdfRect(ops, x, y, w, h, color) {
  ops.push(`${color[0]} ${color[1]} ${color[2]} rg`);
  ops.push(`${x} ${y} ${w} ${h} re f`);
}

function pdfRoundRect(ops, x, y, w, h, radius, fill, stroke) {
  pdfRect(ops, x, y, w, h, fill);
  if (stroke) {
    ops.push(`${stroke[0]} ${stroke[1]} ${stroke[2]} RG`);
    ops.push(`0.8 w ${x} ${y} ${w} ${h} re S`);
  }
}

function wrapPdfText(text, maxChars) {
  const cleaned = String(text || '').replace(/\s+/g, ' ').trim();
  if (!maxChars || cleaned.length <= maxChars) return [cleaned];
  const words = cleaned.split(' ');
  const lines = [];
  let current = '';
  words.forEach(word => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function escapePdfString(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[()\\]/g, match => `\\${match}`)
    .replace(/[\r\n]+/g, ' ');
}

function slugifyPdf(value) {
  return String(value || 'estudiante')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'estudiante';
}

function renderStudentTable(records) {
  const students = latestStudents(records);
  els.studentTable.innerHTML = students.map(student => {
    const pdf = renderPdfActions(student);
    return `
      <tr>
        <td>${escapeHtml(student.group)}</td>
        <td>${escapeHtml(student.studentName)}<br><small>${escapeHtml(student.email)}</small></td>
        <td>${student.attempts}</td>
        <td><strong>${student.latest.score}%</strong></td>
        <td>${student.avgScore}%</td>
        <td>${escapeHtml(levelForScore(student.avgScore))}</td>
        <td>${escapeHtml(weakAreasText(student.latest.byArea))}</td>
        <td>${pdf}</td>
      </tr>
    `;
  }).join("");
}

function renderIndividualPanel(records) {
  const key = els.student.value;
  if (!key) {
    els.individualPanel.classList.add("hidden");
    return;
  }

  const studentRecords = records.filter(record => getStudentKey(record) === key).sort((a, b) => dateValue(b.timestampISO || b.timestamp) - dateValue(a.timestampISO || a.timestamp));
  if (!studentRecords.length) {
    els.individualPanel.classList.add("hidden");
    return;
  }

  const latest = studentRecords[0];
  const groupRecords = (dashboardState.data.records || []).filter(record => record.group === latest.group);
  const groupAvg = round(average(groupRecords.map(record => record.score)), 1);
  const instAvg = round(average((dashboardState.data.records || []).map(record => record.score)), 1);
  const studentAvg = round(average(studentRecords.map(record => record.score)), 1);

  els.individualTitle.textContent = `${latest.studentName} · ${latest.group}`;
  els.individualContent.innerHTML = `
    <div class="individual-summary-grid">
      ${kpiCard("Último resultado", `${latest.score}%`, latest.finishedAtLabel || "Último intento")}
      ${kpiCard("Promedio estudiante", `${studentAvg}%`, `${studentRecords.length} intento(s)`) }
      ${kpiCard("Promedio grupo", `${groupAvg}%`, latest.group)}
      ${kpiCard("Promedio institución", `${instAvg}%`, DASHBOARD_INSTITUTION)}
    </div>
    <div class="dashboard-chart individual-area-chart">
      ${(latest.byArea || []).map(area => horizontalBar(area.area, toNumber(area.percent), `${toNumber(area.percent)}% · ${area.correct}/${area.total} correctas`)).join("") || emptyBlock("Sin datos por área para este estudiante.")}
    </div>
    <div class="recommendations-list">
      <div class="recommendation-item"><strong>Recomendación:</strong> ${escapeHtml(recommendationForScore(studentAvg))}</div>
      <div class="recommendation-item"><strong>Seguridad del simulacro:</strong> ${escapeHtml(latest.securityStatus || "No registrada")} ${latest.securityWarnings ? `· Advertencias: ${latest.securityWarnings}` : ""} ${latest.securityTotalExits ? `· Salidas: ${latest.securityTotalExits}` : ""} ${latest.securityAwayTime ? `· Tiempo fuera: ${latest.securityAwayTime}` : ""}</div>
      <div class="recommendation-item dashboard-pdf-actions">
        ${latest.pdfDriveUrl ? `<a href="${escapeAttr(latest.pdfDriveUrl)}" target="_blank" rel="noopener noreferrer">Abrir PDF individual guardado en Drive</a>` : `<span class="muted-inline">Aún no hay PDF en Drive para este intento.</span>`}
        <button class="dashboard-inline-btn" type="button" data-pdf-action="download-individual" data-key="${escapeAttr(getStudentKey(latest))}">Descargar PDF individual</button>
      </div>
    </div>
  `;
  els.individualPanel.classList.remove("hidden");
}

function renderNoFilteredData() {
  els.kpi.innerHTML = kpiCard("Sin datos", "0", "No hay registros con los filtros seleccionados.");
  els.groupChart.innerHTML = emptyBlock("Ajusta los filtros para ver resultados.");
  els.levelChart.innerHTML = emptyBlock("Sin datos.");
  els.areaChart.innerHTML = emptyBlock("Sin datos.");
  els.questionChart.innerHTML = emptyBlock("Sin datos.");
  els.recommendations.innerHTML = `<div class="recommendation-item">No se encontraron registros con los filtros seleccionados.</div>`;
  if (els.teacherReportContent) els.teacherReportContent.innerHTML = emptyBlock("No hay información suficiente para generar el informe docente con los filtros actuales.");
  if (els.studentPersonalReportContent) els.studentPersonalReportContent.innerHTML = emptyBlock("No hay resultados personales con los filtros actuales.");
  els.studentTable.innerHTML = `<tr><td colspan="8">Sin registros para mostrar.</td></tr>`;
  els.individualPanel.classList.add("hidden");
}

function renderEmptyState() {
  els.kpi.innerHTML = kpiCard("Dashboard", "Sin conexión", "No se recibió respuesta del Web App. Revisa la implementación de Apps Script.");
  els.groupChart.innerHTML = emptyBlock("Si este mensaje permanece, ejecuta inicializarSistema() y prueba ?accion=ping en el Web App.");
  els.levelChart.innerHTML = emptyBlock("Sin datos.");
  els.areaChart.innerHTML = emptyBlock("Sin datos.");
  els.questionChart.innerHTML = emptyBlock("Sin datos.");
  els.recommendations.innerHTML = `<div class="recommendation-item">Cuando los estudiantes finalicen el simulacro y envíen el informe, los datos aparecerán aquí automáticamente.</div>`;
  if (els.studentPersonalReportContent) els.studentPersonalReportContent.innerHTML = emptyBlock("Aún no hay resultados personales para mostrar.");
  els.studentTable.innerHTML = `<tr><td colspan="8">Sin registros para mostrar.</td></tr>`;
  els.individualPanel.classList.add("hidden");
}

function horizontalBar(label, percent, detail, className = "") {
  const value = Math.max(0, Math.min(100, Number(percent) || 0));
  return `
    <div class="dashboard-bar-row ${escapeAttr(className)}">
      <div class="dashboard-bar-label"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(detail)}</span></div>
      <div class="dashboard-bar-track"><span style="width:${value}%"></span></div>
    </div>
  `;
}

function emptyBlock(text) {
  return `<div class="dashboard-empty">${escapeHtml(text)}</div>`;
}

function summarize(records) {
  const totalAttempts = records.length;
  const uniqueStudents = unique(records.map(getStudentKey)).length;
  const avgScore = round(average(records.map(record => record.score)), 1);
  const levels = levelDistribution(records);
  const mainLevel = Object.entries(levels).sort((a, b) => b[1] - a[1])[0]?.[0] || levelForScore(avgScore);
  const areaRows = Object.entries(summarizeAreas(records)).map(([area, stat]) => ({ area, percent: stat.total ? (stat.correct / stat.total) * 100 : 0 }));
  areaRows.sort((a, b) => b.percent - a.percent);
  return {
    totalAttempts,
    uniqueStudents,
    avgScore,
    mainLevel,
    bestArea: areaRows.length ? `${areaRows[0].area} (${round(areaRows[0].percent, 1)}%)` : "Sin datos",
    weakArea: areaRows.length ? `${areaRows[areaRows.length - 1].area} (${round(areaRows[areaRows.length - 1].percent, 1)}%)` : "Sin datos"
  };
}


function getSectionKey(record) {
  const raw = normalizeHeader(`${record && record.sessionLabel ? record.sessionLabel : ''} ${record && record.sessionTitle ? record.sessionTitle : ''} ${record && record.scopeLabel ? record.scopeLabel : ''}`);
  if (!raw) return '';
  if (raw.includes('seccion2') || raw.includes('sesion2') || raw.includes('segunda') || raw.includes('section2')) return '2';
  if (raw.includes('seccion1') || raw.includes('sesion1') || raw.includes('primera') || raw.includes('section1')) return '1';
  const digit = raw.match(/(?:^|[^0-9])([12])(?:$|[^0-9])/);
  return digit ? digit[1] : '';
}

function sectionLabelForRecord(record) {
  const key = getSectionKey(record);
  if (key === '1') return 'Seccion 1';
  if (key === '2') return 'Seccion 2';
  return record && record.sessionLabel ? record.sessionLabel : 'Seccion no registrada';
}

function compareRecordsForPdf(a, b) {
  const sectionA = getSectionKey(a) || '9';
  const sectionB = getSectionKey(b) || '9';
  if (sectionA !== sectionB) return sectionA.localeCompare(sectionB);
  return dateValue(b.timestampISO || b.timestamp || b.finishedAtLabel) - dateValue(a.timestampISO || a.timestamp || a.finishedAtLabel);
}

function selectStudentPdfRecords(records) {
  const grouped = groupBy(records || [], record => getSectionKey(record) || `sin-seccion-${getRecordAttemptKey(record)}`);
  return Object.entries(grouped)
    .map(([, items]) => items.slice().sort((a, b) => dateValue(b.timestampISO || b.timestamp || b.finishedAtLabel) - dateValue(a.timestampISO || a.timestamp || a.finishedAtLabel))[0])
    .filter(Boolean)
    .sort(compareRecordsForPdf);
}

function latestStudents(records) {
  const grouped = groupBy(records, getStudentKey);
  return Object.entries(grouped).map(([key, items]) => {
    const ordered = items.slice().sort((a, b) => dateValue(b.timestampISO || b.timestamp) - dateValue(a.timestampISO || a.timestamp));
    const latest = ordered[0];
    return {
      key,
      studentName: latest.studentName || "Sin nombre",
      group: latest.group || "Sin grupo",
      email: latest.email || "Sin correo",
      attempts: items.length,
      latest,
      avgScore: round(average(items.map(item => item.score)), 1)
    };
  }).sort((a, b) => b.avgScore - a.avgScore || a.studentName.localeCompare(b.studentName));
}

function summarizeAreas(records) {
  const stats = {};
  records.forEach(record => {
    (record.byArea || []).forEach(area => {
      const name = area.area || "Área sin nombre";
      if (!stats[name]) stats[name] = { total: 0, answered: 0, correct: 0, incorrect: 0, omitted: 0 };
      stats[name].total += toNumber(area.total);
      stats[name].answered += toNumber(area.answered);
      stats[name].correct += toNumber(area.correct);
      stats[name].incorrect += toNumber(area.incorrect);
      stats[name].omitted += toNumber(area.omitted);
    });
  });
  return stats;
}

function questionStats(details) {
  const grouped = groupBy(details, item => `${item.number}|${item.area || ""}`);
  return Object.entries(grouped).map(([key, items]) => {
    const [number, area] = key.split("|");
    const correct = items.filter(item => /correcta/i.test(item.result || "")).length;
    const omitted = items.filter(item => /omitida|sin responder/i.test(item.result || "") || /sin responder/i.test(item.studentAnswer || "")).length;
    const incorrect = Math.max(items.length - correct - omitted, 0);
    return {
      number: Number(number),
      area,
      total: items.length,
      correct,
      incorrect,
      omitted,
      percentCorrect: items.length ? round((correct / items.length) * 100, 1) : 0
    };
  });
}

function levelDistribution(records) {
  const levels = {
    "Nivel 1 - Bajo": 0,
    "Nivel 2 - Básico": 0,
    "Nivel 3 - Satisfactorio": 0,
    "Nivel 4 - Avanzado": 0
  };
  records.forEach(record => { levels[levelForScore(record.score)] += 1; });
  return levels;
}

function levelForScore(score) {
  const value = toNumber(score);
  if (value >= 76) return "Nivel 4 - Avanzado";
  if (value >= 61) return "Nivel 3 - Satisfactorio";
  if (value >= 41) return "Nivel 2 - Básico";
  return "Nivel 1 - Bajo";
}

function levelClass(level) {
  if (/avanzado/i.test(level)) return "advanced";
  if (/satisfactorio/i.test(level)) return "satisfactory";
  if (/básico|basico/i.test(level)) return "basic";
  return "low";
}

function weakAreasText(areas) {
  const weak = (areas || []).filter(area => toNumber(area.percent) < 60).sort((a, b) => toNumber(a.percent) - toNumber(b.percent));
  return weak.length ? weak.map(area => `${area.area} (${toNumber(area.percent)}%)`).join(", ") : "Sin áreas críticas";
}

function recommendationForScore(score) {
  const value = toNumber(score);
  if (value >= 76) return "Mantener desempeño alto con retos de profundización, simulacros cronometrados y análisis de preguntas de alta complejidad.";
  if (value >= 61) return "Fortalecer áreas específicas con errores recurrentes y trabajar lectura crítica de enunciados y opciones.";
  if (value >= 41) return "Implementar refuerzo por competencias, recuperación de conceptos base y práctica guiada con retroalimentación.";
  return "Priorizar acompañamiento intensivo, comprensión lectora de preguntas, manejo del tiempo y recuperación de aprendizajes esenciales.";
}

function groupBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item) || "Sin dato";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

function unique(items) {
  return Array.from(new Set(items.map(item => String(item || "").trim()).filter(Boolean)));
}

function average(values) {
  const nums = values.map(toNumber).filter(value => Number.isFinite(value));
  return nums.length ? nums.reduce((sum, value) => sum + value, 0) / nums.length : 0;
}

function round(value, decimals = 0) {
  const factor = Math.pow(10, decimals);
  return Math.round((Number(value) || 0) * factor) / factor;
}

function toNumber(value) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? number : 0;
}

function getStudentKey(record) {
  return `${record.email || ""}|${record.studentName || ""}|${record.group || ""}`;
}

function getRecordAttemptKey(record) {
  return `${record.timestampISO || record.timestamp || ""}|${record.email || ""}|${record.studentName || ""}|${record.group || ""}`;
}

function getDetailAttemptKey(item) {
  return `${item.timestampISO || item.timestamp || ""}|${item.email || ""}|${item.studentName || ""}|${item.group || ""}`;
}

function getRecordDate(record) {
  const value = record.timestampISO || record.timestamp || record.finishedAtLabel;
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function dateValue(value) {
  const date = new Date(value || 0);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function formatDateTime(value) {
  if (!value) return "Sin registrar";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}
