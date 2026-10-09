(() => {
  'use strict';

  const appMain = document.querySelector('#app-main');
  const stepButtons = [...document.querySelectorAll('.demo-step')];
  const experimentModal = document.querySelector('#experimentModal');
  const toastRegion = document.querySelector('#toastRegion');

  const icons = {
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16v11H4zM9 8V5h6v3M4 12h16"/></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.17.35.37.68.6 1 .28.29.66.44 1.06.4H21v4h-.09A1.7 1.7 0 0 0 19.4 15z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.63a2 2 0 0 1-.45 2.11L9 10.76a16 16 0 0 0 4.24 4.24l1.3-1.3a2 2 0 0 1 2.11-.45c.85.31 1.73.53 2.63.65A2 2 0 0 1 22 16.9z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7M10 14 21 3M21 14v7H3V3h7"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    upload: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M5 20h14"/></svg>',
    alert: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 3.6 2.6 17a2 2 0 0 0 1.73 3h15.34a2 2 0 0 0 1.73-3L13.7 3.6a2 2 0 0 0-3.4 0z"/></svg>'
  };

  const STATUS_OPTIONS = [
    'Alta completada',
    'Expediente listo para enviar',
    'Falta información',
    'Requiere revisión',
    'Bloqueado'
  ];

  const defaultState = () => ({
    route: 'request',
    formStep: 1,
    client: {
      firstName: 'Ana',
      lastName: 'García',
      dni: '',
      nationality: '',
      naf: '',
      role: '',
      startDate: '',
      worktime: '',
      salary: '',
      contractType: '',
      documents: { dni: '', contract: '' }
    },
    linkSent: false,
    clientSubmitted: false,
    confirmations: new Set(),
    caseConfirmations: {},
    statusOverrides: {},
    selectedCaseId: 'ana',
    filters: 'Todos',
    query: '',
    success: false
  });

  let state = defaultState();

  const technicalFields = [
    { id: 'contract', label: 'Tipo de contrato', badge: 'Sugerido', badgeClass: '', hint: 'Ejemplo ilustrativo. El técnico mantiene el criterio final.', options: ['100 — Indefinido (demo)', '200 — Temporal (demo)'] },
    { id: 'group', label: 'Grupo de cotización', badge: 'Sugerido', badgeClass: '', hint: 'Ejemplo ilustrativo según el puesto informado.', options: ['07 — Aux. administrativos (demo)', '05 — Oficiales administrativos (demo)'] },
    { id: 'agreement', label: 'Convenio colectivo', badge: 'Preseleccionado', badgeClass: 'tag--blue', hint: 'Ejemplo ilustrativo según el sector del cliente.', options: ['Oficinas y despachos (demo)', 'Hostelería (demo)'] },
    { id: 'category', label: 'Categoría / nivel', badge: 'Sugerido', badgeClass: '', hint: 'Ejemplo ilustrativo según el puesto.', options: ['Auxiliar administrativa (demo)', 'Administrativa (demo)'] },
    { id: 'ccc', label: 'Cuenta de cotización (CCC)', badge: 'Sugerido', badgeClass: '', hint: 'Ejemplo ilustrativo según el centro de trabajo.', options: ['Madrid Centro — CCC demo', 'Madrid Norte — CCC demo'] }
  ];

  const mockCases = [
    { id:'ana', name:'Ana García', initials:'AG', client:'Restaurante Norte', start:'mañana', pending:'', action:'Ver' },
    { id:'pedro', name:'Pedro Ruiz', initials:'PR', client:'ACME', start:'hoy', fixedStatus:'Requiere revisión', pending:'Jornada / horas', action:'Revisar' },
    { id:'laura', name:'Laura Martín', initials:'LM', client:'Hotel Central', start:'14 oct', fixedStatus:'Expediente listo para enviar', pending:'—', action:'Continuar' },
    { id:'miguel', name:'Miguel López', initials:'ML', client:'Retail Sur', start:'15 oct', fixedStatus:'Bloqueado', pending:'Inconsistencia contractual', action:'Resolver' },
    { id:'sofia', name:'Sofía Ramos', initials:'SR', client:'Clínica Norte', start:'16 oct', fixedStatus:'Falta información', pending:'NAF · contrato', action:'Ver' },
    { id:'david', name:'David Ortega', initials:'DO', client:'Marea Studio', start:'17 oct', fixedStatus:'Falta información', pending:'Salario · fecha', action:'Ver' },
    { id:'elena', name:'Elena Torres', initials:'ET', client:'Café Central', start:'12 oct', fixedStatus:'Alta completada', pending:'—', action:'Ver' },
    { id:'marcos', name:'Marcos Vidal', initials:'MV', client:'Bruma SL', start:'18 oct', fixedStatus:'Falta información', pending:'DNI/NIE', action:'Ver' },
    { id:'nuria', name:'Nuria Costa', initials:'NC', client:'Atelier Sur', start:'18 oct', fixedStatus:'Expediente listo para enviar', pending:'—', action:'Continuar' },
    { id:'carlos', name:'Carlos Vega', initials:'CV', client:'Taller 24', start:'19 oct', fixedStatus:'Requiere revisión', pending:'Tipo de contrato', action:'Revisar' },
    { id:'irene', name:'Irene Gil', initials:'IG', client:'Nexo Retail', start:'10 oct', fixedStatus:'Alta completada', pending:'—', action:'Ver' },
    { id:'pablo', name:'Pablo Sanz', initials:'PS', client:'Estudio Uno', start:'20 oct', fixedStatus:'Falta información', pending:'Nacionalidad · NAF', action:'Ver' }
  ];

  function html(strings, ...values) {
    return strings.reduce((out, str, i) => out + str + (values[i] ?? ''), '');
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char]));
  }

  function toast(message) {
    const node = document.createElement('div');
    node.className = 'toast';
    node.textContent = message;
    toastRegion.append(node);
    window.setTimeout(() => node.remove(), 2600);
  }

  function routeTo(route, { focus = true } = {}) {
    const allowed = ['request', 'completion', 'cases', 'prepare', 'success'];
    if (!allowed.includes(route)) return;
    state.route = route;
    render();
    if (focus) requestAnimationFrame(() => appMain.focus({ preventScroll: true }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateSteps() {
    const order = ['request', 'completion', 'cases', 'prepare', 'success'];
    const currentIndex = order.indexOf(state.route);
    stepButtons.forEach((button, index) => {
      button.classList.toggle('is-active', index === currentIndex);
      button.classList.toggle('is-done', index < currentIndex);
      if (index === currentIndex) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
  }

  function render() {
    updateSteps();
    if (state.route === 'request') appMain.innerHTML = requestView();
    if (state.route === 'completion') appMain.innerHTML = completionView();
    if (state.route === 'cases') appMain.innerHTML = casesView();
    if (state.route === 'prepare') appMain.innerHTML = prepareView();
    if (state.route === 'success') appMain.innerHTML = successView();
    bindViewEvents();
  }

  function requestView() {
    return html`
      <section class="page-shell page-shell--narrow">
        <div class="page-head">
          <div>
            <span class="page-kicker">Paso 1 · Solicitud inicial</span>
            <h1 class="page-title">El cliente empieza donde ya trabaja.</h1>
            <p class="page-subtitle">En el experimento no automatizamos el email. El técnico identifica la solicitud y comparte un enlace para estructurar la información de la nueva incorporación.</p>
          </div>
        </div>
        <div class="channel-grid">
          <article class="card card--flat problem-card">
            <span class="eyebrow">Objetivo del MVP</span>
            <h2>Reducir el trabajo de reconstrucción.</h2>
            <p>El formulario captura los datos de la incorporación de forma consistente. Solo nombre y apellido son obligatorios para el cliente; el resto puede completarse después.</p>
            <div class="problem-list">
              <div class="problem-list__item"><span class="problem-list__icon">1</span><div><strong>Capturar</strong><br><span class="card__meta">Información de forma estructurada.</span></div></div>
              <div class="problem-list__item"><span class="problem-list__icon">2</span><div><strong>Detectar faltantes</strong><br><span class="card__meta">Yoda muestra lo que falta al técnico.</span></div></div>
              <div class="problem-list__item"><span class="problem-list__icon">3</span><div><strong>Preparar</strong><br><span class="card__meta">El técnico confirma únicamente lo necesario para tramitar.</span></div></div>
            </div>
            <div class="assumption"><strong>Assumption técnico del MVP:</strong> no dependemos de una API email → Yoda. El enlace y el traslado al prototipo se simulan para aislar la hipótesis de valor.</div>
          </article>

          <article class="card mail-window">
            <div class="mail-toolbar"><span>Inbox · solicitudes@cliente.es</span><span>Hoy, 10:24</span></div>
            <div class="mail-content">
              <div class="mail-subject">Alta Ana García — incorporación lunes</div>
              <div class="mail-sender"><span class="avatar">CN</span><div class="mail-sender__meta"><strong>Restaurante Norte</strong><span>cliente@restaurantenorte.es</span></div><span class="card__meta">10:24</span></div>
              <div class="mail-message">Hola, queremos dar de alta a <strong>Ana García</strong> para el lunes. Adjunto su DNI. Cualquier cosa me dices.</div>
              <div class="attachment">${icons.doc}<div><strong>DNI_AnaGarcia.pdf</strong><br><span class="card__meta">1,2 MB</span></div></div>
              <div class="prototype-divider"></div>
              <div class="manual-action">
                <div><strong>Acción simulada del experimento</strong><p>El técnico comparte un enlace para completar la nueva incorporación.</p></div>
                <button class="button button--primary" type="button" id="sendCompletionLink">${state.linkSent ? 'Abrir formulario' : 'Enviar formulario'}</button>
              </div>
            </div>
          </article>
        </div>
      </section>`;
  }

  function completionView() {
    return html`
      <section class="client-shell">
        <div class="client-visual">
          <div class="client-visual__brand">ZINCO</div>
          <div>
            <span class="eyebrow" style="color:#a9cdb0">Nueva incorporación</span>
            <h1>Completar un alta debería ser simple.</h1>
            <p>El cliente puede aportar la información en tres pasos. Solo nombre y apellido son obligatorios; Yoda indicará después qué falta para poder continuar.</p>
          </div>
          <div class="client-proof"><span>✓ 3 pasos sencillos</span><span>✓ Guardamos lo que ya has enviado</span><span>✓ El técnico ve inmediatamente los faltantes</span></div>
        </div>
        <div class="client-form-wrap">${clientFormCard()}</div>
      </section>`;
  }

  function clientFormCard() {
    if (state.formStep === 4) {
      const missing = getMissingClientFields();
      return html`
        <div class="client-form-card client-complete">
          <div class="complete-icon">✓</div>
          <span class="eyebrow">Formulario completado</span>
          <h2>Gracias, hemos recibido la información.</h2>
          <p>${missing.length ? `El técnico podrá ver el expediente y los ${missing.length} datos/documentos que todavía faltan.` : 'El expediente tiene toda la información del cliente y pasa a revisión técnica.'}</p>
          <div class="completion-summary">
            <div><span>Trabajador</span><strong>${escapeHTML(state.client.firstName)} ${escapeHTML(state.client.lastName)}</strong></div>
            <div><span>Estado inicial</span><strong>${missing.length ? 'Falta información' : 'Requiere revisión'}</strong></div>
          </div>
          <button class="button button--primary button--block" type="button" id="goToYoda">Ver en Yoda ${icons.arrow}</button>
          <div class="client-footer">Prototipo conceptual · los datos solo viven en esta sesión.</div>
        </div>`;
    }

    return html`
      <form class="client-form-card" id="multiStepForm" novalidate>
        <div class="client-form-head">
          <span class="eyebrow">Restaurante Norte</span>
          <h2>Nueva incorporación</h2>
          <p>${formStepSubtitle()}</p>
          <div class="form-stepper" aria-label="Pasos del formulario">
            ${[1,2,3].map(n => `<span class="form-step ${n === state.formStep ? 'is-active' : ''} ${n < state.formStep ? 'is-done' : ''}">${n}</span>`).join('')}
          </div>
          <div class="progress-track"><span style="width:${state.formStep * 33.333}%"></span></div>
        </div>
        ${formStepContent()}
        <div class="form-error" id="formError" role="alert" hidden></div>
        <div class="form-navigation">
          ${state.formStep > 1 ? '<button class="button button--ghost" type="button" id="prevStep">Atrás</button>' : '<span></span>'}
          <button class="button button--primary" type="submit">${state.formStep === 3 ? 'Enviar formulario' : 'Continuar'} ${icons.arrow}</button>
        </div>
        <div class="client-footer">Solo nombre y apellido son obligatorios. Puedes dejar el resto vacío si aún no lo tienes.</div>
      </form>`;
  }

  function formStepSubtitle() {
    if (state.formStep === 1) return 'Paso 1 de 3 · Datos del trabajador';
    if (state.formStep === 2) return 'Paso 2 de 3 · Condiciones de incorporación';
    return 'Paso 3 de 3 · Documentación';
  }

  function formStepContent() {
    const c = state.client;
    if (state.formStep === 1) {
      return html`
        <div class="form-grid form-grid--2">
          <div class="field-group"><label class="field-label" for="firstName">Nombre *</label><input class="field" id="firstName" name="firstName" value="${escapeHTML(c.firstName)}" autocomplete="given-name"></div>
          <div class="field-group"><label class="field-label" for="lastName">Apellido *</label><input class="field" id="lastName" name="lastName" value="${escapeHTML(c.lastName)}" autocomplete="family-name"></div>
        </div>
        <div class="field-group"><label class="field-label" for="dni">DNI / NIE</label><input class="field" id="dni" name="dni" value="${escapeHTML(c.dni)}" placeholder="Ej. 12345678A"></div>
        <div class="field-group"><label class="field-label" for="nationality">Nacionalidad</label><input class="field" id="nationality" name="nationality" value="${escapeHTML(c.nationality)}" placeholder="Ej. Española"></div>
        <div class="field-group"><label class="field-label" for="naf">Número de Seguridad Social / NAF</label><input class="field" id="naf" name="naf" value="${escapeHTML(c.naf)}" placeholder="Ej. 28/12345678/90"></div>`;
    }
    if (state.formStep === 2) {
      return html`
        <div class="field-group"><label class="field-label" for="role">Cargo</label><input class="field" id="role" name="role" value="${escapeHTML(c.role)}" placeholder="Ej. Administrativa"></div>
        <div class="field-group"><label class="field-label" for="startDate">Fecha de incorporación</label><input class="field" id="startDate" name="startDate" type="date" value="${escapeHTML(c.startDate)}"></div>
        <div class="field-group"><span class="field-label">Tipo de jornada</span><div class="segmented"><label><input type="radio" name="worktime" value="Completa" ${c.worktime === 'Completa' ? 'checked' : ''}><span>○ Completa</span></label><label><input type="radio" name="worktime" value="Parcial" ${c.worktime === 'Parcial' ? 'checked' : ''}><span>○ Parcial</span></label></div></div>
        <div class="field-group"><label class="field-label" for="salary">Salario bruto anual</label><input class="field" id="salary" name="salary" inputmode="decimal" value="${escapeHTML(c.salary)}" placeholder="Ej. 20.000 €"></div>
        <div class="field-group"><label class="field-label" for="contractType">Tipo de contrato</label><select class="field" id="contractType" name="contractType"><option value="">Seleccionar</option><option ${c.contractType === 'Indefinido' ? 'selected' : ''}>Indefinido</option><option ${c.contractType === 'Temporal' ? 'selected' : ''}>Temporal</option><option ${c.contractType === 'No lo sé' ? 'selected' : ''}>No lo sé</option></select></div>`;
    }
    return html`
      <div class="upload-grid">
        ${uploadBox('dniDocument','DNI / NIE','Sube una copia del documento de identidad.',c.documents.dni)}
        ${uploadBox('contractDocument','Contrato','Sube el contrato o documentación laboral disponible.',c.documents.contract)}
      </div>
      <div class="form-note">${icons.shield}<span><strong>Los documentos son opcionales en este prototipo.</strong><br>Si faltan, el técnico los verá como pendientes en Yoda.</span></div>`;
  }

  function uploadBox(name, title, copy, fileName) {
    return `<label class="upload-box"><span class="upload-box__icon">${icons.upload}</span><strong>${title}</strong><span>${copy}</span><input type="file" name="${name}" accept=".pdf,.png,.jpg,.jpeg"><em>${fileName ? `✓ ${escapeHTML(fileName)}` : 'Seleccionar archivo'}</em></label>`;
  }

  function persistFormStep(form) {
    const data = new FormData(form);
    if (state.formStep === 1) {
      state.client.firstName = String(data.get('firstName') || '').trim();
      state.client.lastName = String(data.get('lastName') || '').trim();
      state.client.dni = String(data.get('dni') || '').trim();
      state.client.nationality = String(data.get('nationality') || '').trim();
      state.client.naf = String(data.get('naf') || '').trim();
    } else if (state.formStep === 2) {
      state.client.role = String(data.get('role') || '').trim();
      state.client.startDate = String(data.get('startDate') || '').trim();
      state.client.worktime = String(data.get('worktime') || '').trim();
      state.client.salary = String(data.get('salary') || '').trim();
      state.client.contractType = String(data.get('contractType') || '').trim();
    } else if (state.formStep === 3) {
      const dniFile = form.querySelector('[name="dniDocument"]').files[0];
      const contractFile = form.querySelector('[name="contractDocument"]').files[0];
      if (dniFile) state.client.documents.dni = dniFile.name;
      if (contractFile) state.client.documents.contract = contractFile.name;
    }
  }

  function getMissingClientFields() {
    const c = state.client;
    const fields = [
      ['DNI / NIE', c.dni],
      ['Nacionalidad', c.nationality],
      ['NAF', c.naf],
      ['Cargo', c.role],
      ['Fecha de incorporación', c.startDate],
      ['Tipo de jornada', c.worktime],
      ['Salario', c.salary],
      ['Tipo de contrato', c.contractType],
      ['Documento DNI / NIE', c.documents.dni],
      ['Contrato / documentación laboral', c.documents.contract]
    ];
    return fields.filter(([,value]) => !value).map(([label]) => label);
  }

  function anaComputedStatus() {
    if (state.statusOverrides.ana) return state.statusOverrides.ana;
    if (state.success) return 'Alta completada';
    if (!state.clientSubmitted || getMissingClientFields().length) return 'Falta información';
    if (state.confirmations.size === technicalFields.length) return 'Expediente listo para enviar';
    return 'Requiere revisión';
  }

  function getCaseStatus(c) {
    if (state.statusOverrides[c.id]) return state.statusOverrides[c.id];
    if (c.id === 'ana') return anaComputedStatus();
    return c.fixedStatus;
  }

  function getCasePending(c) {
    if (c.id !== 'ana') return c.pending;
    const missing = getMissingClientFields();
    const status = getCaseStatus(c);
    if (status === 'Alta completada' || status === 'Expediente listo para enviar') return '—';
    if (status === 'Falta información') return missing.length ? missing.slice(0,3).join(' · ') : 'Datos del cliente';
    if (status === 'Requiere revisión') return 'Configuración técnica';
    if (status === 'Bloqueado') return 'Revisión manual';
    return '—';
  }

  function casesView() {
    const counts = STATUS_OPTIONS.reduce((acc,s) => ({...acc,[s]:0}), {});
    mockCases.forEach(c => counts[getCaseStatus(c)]++);
    return yodaShell(html`
      <div class="breadcrumb">Yoda / Trámites / Altas</div>
      <div class="yoda-title-row"><div><h1 class="yoda-title">Altas</h1><p class="yoda-title__subtitle">Identifica qué expedientes pueden enviarse y cuáles necesitan intervención.</p></div><button class="button button--primary button--small" type="button" id="newRequest">+ Nueva solicitud</button></div>
      <div class="metric-grid metric-grid--5">
        ${metric('Alta completada',counts['Alta completada'])}
        ${metric('Expediente listo para enviar',counts['Expediente listo para enviar'])}
        ${metric('Falta información',counts['Falta información'])}
        ${metric('Requiere revisión',counts['Requiere revisión'])}
        ${metric('Bloqueado',counts['Bloqueado'])}
      </div>
      <div class="toolbar">
        <div class="filter-row">${['Todos',...STATUS_OPTIONS].map(f => `<button type="button" class="filter-pill ${state.filters === f ? 'is-active' : ''}" data-filter="${escapeHTML(f)}">${escapeHTML(f)}</button>`).join('')}</div>
        <label class="search">${icons.search}<input id="caseSearch" value="${escapeHTML(state.query)}" placeholder="Buscar trabajador o cliente"></label>
      </div>
      <div class="table-wrap"><table class="case-table"><thead><tr><th>Trabajador</th><th>Cliente</th><th>Inicio</th><th>Estado</th><th>Pendiente</th><th>Acción</th></tr></thead><tbody id="casesBody">${renderCaseRows()}</tbody></table></div>
    `, 'cases');
  }

  function metric(label,value) { return `<div class="metric"><div class="metric__label">${escapeHTML(label)}</div><div class="metric__value">${value}</div></div>`; }

  function renderCaseRows() {
    const q = state.query.trim().toLowerCase();
    return mockCases.filter(c => {
      const status = getCaseStatus(c);
      const passesFilter = state.filters === 'Todos' || status === state.filters;
      const passesQuery = !q || `${c.name} ${c.client}`.toLowerCase().includes(q);
      return passesFilter && passesQuery;
    }).map(c => {
      const status = getCaseStatus(c);
      return `<tr class="case-row" tabindex="0" data-open-case="${c.id}"><td><div class="case-name"><span class="avatar">${c.initials}</span>${c.name}</div></td><td>${c.client}</td><td>${c.start}</td><td>${statusPill(status)}</td><td>${escapeHTML(getCasePending(c))}</td><td><button class="button button--ghost button--small" type="button" data-open-case="${c.id}">${c.action}</button></td></tr>`;
    }).join('') || '<tr><td colspan="6" style="padding:28px;text-align:center;color:#667178">No hay casos con este filtro.</td></tr>';
  }

  function prepareView() {
    const c = mockCases.find(item => item.id === state.selectedCaseId) || mockCases[0];
    if (c.id !== 'ana') return genericCaseDetail(c);

    const missing = getMissingClientFields();
    const status = getCaseStatus(c);
    const readyForTech = state.clientSubmitted && missing.length === 0;
    const readyToSend = status === 'Expediente listo para enviar' || state.confirmations.size === technicalFields.length;

    return yodaShell(html`
      <div class="breadcrumb">Yoda / Trámites / Altas / Ana García</div>
      <div class="yoda-title-row">
        <div><div class="title-with-status"><h1 class="yoda-title">Preparación del alta</h1>${statusPill(status)}</div><p class="yoda-title__subtitle">${missing.length ? `Faltan ${missing.length} elementos antes de poder preparar el envío.` : readyForTech ? 'La información del cliente está completa. Confirma la configuración técnica.' : 'La información del cliente todavía no se ha completado.'}</p></div>
        <div class="page-actions"><button class="button button--ghost button--small" type="button" id="saveDraft">Guardar borrador</button><button class="button button--primary button--small" type="button" data-continue ${readyToSend ? '' : 'disabled'}>Continuar con tramitación ${icons.arrow}</button></div>
      </div>

      <div class="case-header">
        <div class="case-header__item"><span class="case-avatar">AG</span><div><strong>${escapeHTML(state.client.firstName || 'Ana')} ${escapeHTML(state.client.lastName || 'García')}</strong><span>Trabajadora</span></div></div>
        <div class="case-header__item">${icons.briefcase}<div><strong>Restaurante Norte</strong><span>Cliente</span></div></div>
        <div class="case-header__item">${icons.calendar}<div><strong>${formatDate(state.client.startDate) || 'Sin fecha'}</strong><span>Fecha de incorporación</span></div></div>
      </div>

      <div class="status-control card card--flat">
        <div><span class="eyebrow">Control manual</span><strong>Cambiar estado del expediente</strong><p>El técnico puede corregir o forzar el estado cuando el contexto lo requiera.</p></div>
        <div class="status-select-wrap"><select class="field" id="manualStatus">${STATUS_OPTIONS.map(s => `<option ${status === s ? 'selected' : ''}>${escapeHTML(s)}</option>`).join('')}</select><button class="button button--ghost button--small" type="button" id="clearStatusOverride">Usar estado automático</button></div>
      </div>

      <div class="readiness-bar">
        ${readinessStep('Información del cliente', missing.length ? `${missing.length} pendientes` : 'Completa', icons.users, missing.length ? 'pending' : 'done')}
        ${readinessStep('Documentación', state.client.documents.dni && state.client.documents.contract ? 'Completa' : 'Incompleta', icons.doc, state.client.documents.dni && state.client.documents.contract ? 'done' : 'pending')}
        ${readinessStep('Validaciones', missing.length ? 'Pendientes' : 'Sin incidencias', icons.shield, missing.length ? 'pending' : 'done')}
        ${readinessStep('Configuración técnica', readyToSend ? 'Confirmada' : 'Pendiente', icons.gear, readyToSend ? 'done' : 'pending')}
      </div>

      <div class="prepare-grid">
        <div class="stack">
          <article class="card card--flat"><div class="card__head"><div><h2 class="card__title">Resumen del expediente</h2><p class="card__meta">Información aportada por el cliente.</p></div></div><div class="card__body"><dl class="summary-list">
            ${summaryRowMaybe('Nombre y apellidos',`${state.client.firstName} ${state.client.lastName}`,true)}
            ${summaryRowMaybe('DNI / NIE',state.client.dni)}
            ${summaryRowMaybe('Nacionalidad',state.client.nationality)}
            ${summaryRowMaybe('NAF',state.client.naf)}
            ${summaryRowMaybe('Cargo',state.client.role)}
            ${summaryRowMaybe('Fecha incorporación',formatDate(state.client.startDate))}
            ${summaryRowMaybe('Jornada',state.client.worktime)}
            ${summaryRowMaybe('Salario',state.client.salary)}
            ${summaryRowMaybe('Tipo de contrato',state.client.contractType)}
          </dl></div></article>
          <article class="card card--flat"><div class="card__head"><div><h2 class="card__title">Documentos</h2></div></div><div class="card__body"><div class="document-row"><span>DNI / NIE</span>${fileStatus(state.client.documents.dni)}</div><div class="document-row"><span>Contrato / documentación laboral</span>${fileStatus(state.client.documents.contract)}</div></div></article>
          <article class="card card--flat"><div class="card__body"><strong>Origen</strong><div class="origin-chips"><span class="chip">${icons.mail} Email</span><span class="chip">${icons.doc} Documento</span><span class="chip">${icons.users} Cliente</span></div></div></article>
        </div>
        ${missing.length ? `<div class="right-stack">${missingInfoPanel(missing)}${technicalPreviewPanel()}</div>` : technicalPanel('ana')}
      </div>

      <div class="action-bar">
        <div class="action-bar__status"><div class="action-bar__done"><span class="check">${missing.length ? '!' : '✓'}</span><span>${missing.length ? `${missing.length} elementos pendientes del cliente.` : 'Todo lo necesario del cliente ya está completo.'}</span></div><span style="color:#667178">${missing.length ? 'Siguiente paso: completar información.' : `Pendiente: ${technicalFields.length-state.confirmations.size} confirmaciones técnicas`}</span></div>
        <div class="action-bar__actions"><button class="link-button" type="button" id="viewOriginal">Ver información original ${icons.external}</button><button class="button button--primary button--small" type="button" data-continue ${readyToSend ? '' : 'disabled'}>Continuar con tramitación ${icons.arrow}</button></div>
      </div>
    `, 'prepare');
  }

  function genericCaseDetail(c) {
    const status = getCaseStatus(c);
    const needsTechnicalReview = status === 'Requiere revisión';
    return yodaShell(html`
      <div class="breadcrumb">Yoda / Trámites / Altas / ${escapeHTML(c.name)}</div>
      <div class="yoda-title-row"><div><div class="title-with-status"><h1 class="yoda-title">${escapeHTML(c.name)}</h1>${statusPill(status)}</div><p class="yoda-title__subtitle">${needsTechnicalReview ? 'La información del cliente está completa. Solo queda confirmar la configuración técnica.' : 'Caso mock para visualizar diferentes estados operativos.'}</p></div><button class="button button--ghost button--small" type="button" id="backToCases">Volver a Altas</button></div>
      <div class="status-control card card--flat"><div><span class="eyebrow">Control manual</span><strong>Cambiar estado del expediente</strong><p>El técnico puede corregir el estado según el contexto real del caso.</p></div><div class="status-select-wrap"><select class="field" id="manualStatus">${STATUS_OPTIONS.map(s => `<option ${status === s ? 'selected' : ''}>${escapeHTML(s)}</option>`).join('')}</select><button class="button button--ghost button--small" type="button" id="clearStatusOverride">Usar estado original</button></div></div>
      ${needsTechnicalReview ? `
        <div class="case-header">
          <div class="case-header__item"><span class="case-avatar">${escapeHTML(c.initials)}</span><div><strong>${escapeHTML(c.name)}</strong><span>Trabajador</span></div></div>
          <div class="case-header__item">${icons.briefcase}<div><strong>${escapeHTML(c.client)}</strong><span>Cliente</span></div></div>
          <div class="case-header__item">${icons.calendar}<div><strong>${escapeHTML(c.start)}</strong><span>Fecha de incorporación</span></div></div>
        </div>
        <div class="readiness-bar">
          ${readinessStep('Información del cliente','Completa',icons.users,'done')}
          ${readinessStep('Documentación','Completa',icons.doc,'done')}
          ${readinessStep('Validaciones','Sin incidencias',icons.shield,'done')}
          ${readinessStep('Configuración técnica','Pendiente',icons.gear,'pending')}
        </div>
        <div class="prepare-grid">
          <div class="stack">
            <article class="card card--flat"><div class="card__head"><div><h2 class="card__title">Resumen del expediente</h2><p class="card__meta">Datos preparados para revisión técnica.</p></div></div><div class="card__body"><dl class="summary-list">
              ${summaryRowMaybe('Trabajador',c.name,true)}
              ${summaryRowMaybe('Cliente',c.client,true)}
              ${summaryRowMaybe('Fecha de incorporación',c.start,true)}
              ${summaryRowMaybe('Información cliente','Completa',true)}
              ${summaryRowMaybe('Documentación','Completa',true)}
            </dl></div></article>
            <article class="card card--flat"><div class="card__body"><strong>Objetivo</strong><p class="card__meta" style="margin-top:6px">Confirmar solo los códigos laborales necesarios antes de enviar el expediente.</p></div></article>
          </div>
          ${technicalPanel(c.id)}
        </div>` : `
        <div class="prepare-grid prepare-grid--single">
          <article class="card card--flat"><div class="card__head"><div><h2 class="card__title">Estado del expediente</h2><p class="card__meta">${escapeHTML(getCasePending(c) || 'Sin pendientes')}</p></div></div><div class="card__body"><div class="mock-detail-grid"><div><span>Cliente</span><strong>${escapeHTML(c.client)}</strong></div><div><span>Inicio</span><strong>${escapeHTML(c.start)}</strong></div><div><span>Estado</span>${statusPill(status)}</div><div><span>Pendiente</span><strong>${escapeHTML(getCasePending(c))}</strong></div></div></div></article>
        </div>`}
    `,'prepare');
  }

  function missingInfoPanel(missing) {
    return `<article class="card card--flat missing-panel"><div class="tech-panel__head"><div><h2>Información pendiente</h2><p>El expediente no está listo para revisión técnica. Faltan datos o documentos del cliente.</p></div>${statusPill('Falta información')}</div><div class="missing-list">${missing.map(item => `<div class="missing-item"><span class="missing-item__icon">${icons.alert}</span><div><strong>${escapeHTML(item)}</strong><span>Necesario para preparar el expediente.</span></div></div>`).join('')}</div><div class="missing-actions"><button class="button button--primary" type="button" id="requestMissing">Solicitar información al cliente</button><button class="button button--ghost" type="button" id="returnToForm">Completar manualmente</button></div></article>`;
  }

  function technicalPanel(caseId = 'ana') {
    const confirmationSet = caseId === 'ana'
      ? state.confirmations
      : (state.caseConfirmations[caseId] ||= new Set());
    const ready = confirmationSet.size === technicalFields.length;
    return `<article class="card card--flat tech-panel"><div class="tech-panel__head"><div><span class="eyebrow">Último paso</span><h2>Solo te queda confirmar</h2><p>La información del cliente ya está preparada. Hemos preseleccionado opciones ilustrativas para reducir clicks; el técnico mantiene el criterio final.</p></div><span class="status ${ready ? 'status--ready' : 'status--review'} confirm-count">${confirmationSet.size} / ${technicalFields.length} confirmadas</span></div><div class="tech-fields">${technicalFields.map(field => techField(field, caseId, confirmationSet)).join('')}</div><div class="tech-note"><strong>Prototipo:</strong> los códigos y valores mostrados son ejemplos de UX y no constituyen recomendaciones normativas reales.</div></article>`;
  }

  function technicalPreviewPanel() {
    return `<article class="card card--flat tech-preview"><div class="tech-panel__head"><div><span class="eyebrow">Siguiente paso</span><h2>Solo te queda confirmar</h2><p>Cuando el cliente complete los datos pendientes, el técnico verá únicamente estas confirmaciones técnicas.</p></div><span class="status status--neutral">Bloqueado por faltantes</span></div><div class="tech-preview__items">${technicalFields.map(field => `<div><span>${escapeHTML(field.label)}</span><strong>${escapeHTML(field.options[0].replace(' (demo)',''))}</strong></div>`).join('')}</div></article>`;
  }

  function techField(field, caseId = 'ana', confirmationSet = state.confirmations) {
    const confirmed = confirmationSet.has(field.id);
    return `<div class="tech-field ${confirmed ? 'is-confirmed' : ''}" data-tech-field="${field.id}"><div class="tech-label"><div class="tech-label__line">${field.label}<span class="tag ${field.badgeClass}">${field.badge}</span></div></div><div class="tech-control"><select aria-label="${field.label}">${field.options.map(opt => `<option>${opt}</option>`).join('')}</select><small>${field.hint}</small></div><button class="button button--ghost button--small confirm-button" type="button" data-confirm="${field.id}" data-confirm-case="${caseId}">${confirmed ? '✓ Confirmado' : 'Confirmar'}</button></div>`;
  }

  function summaryRowMaybe(label,value,always=false) {
    const present = Boolean(value);
    return `<div class="summary-row ${present ? '' : 'summary-row--missing'}"><dt>${escapeHTML(label)}</dt><dd>${present ? escapeHTML(value) : 'Falta información'}</dd><span class="${present || always ? 'check' : 'missing-dot'}">${present || always ? '✓' : '!'}</span></div>`;
  }

  function fileStatus(file) { return file ? `<span class="document-ok">✓ ${escapeHTML(file)}</span>` : '<span class="document-missing">Falta documento</span>'; }

  function readinessStep(title, subtitle, icon, mode) { return `<div class="readiness-step is-${mode}"><div class="readiness-step__icon">${icon}</div><div class="readiness-step__copy"><b>${title}</b><span>${mode === 'done' ? '✓ ' : '● '}${subtitle}</span></div></div>`; }


  function statusPill(status, display) {
    const map = {
      'Alta completada':'status--completed',
      'Expediente listo para enviar':'status--ready',
      'Falta información':'status--input',
      'Requiere revisión':'status--review',
      'Bloqueado':'status--blocked'
    };
    return `<span class="status ${map[status] || 'status--neutral'}">${escapeHTML(display || status)}</span>`;
  }

  function formatDate(value) {
    if (!value) return '';
    const [y,m,d] = value.split('-');
    if (!y || !m || !d) return value;
    return `${d}/${m}/${y}`;
  }

  function yodaShell(content, active) {
    return html`<section class="yoda-layout"><aside class="yoda-sidebar" aria-label="Navegación de Yoda"><div class="yoda-logo">Y</div><nav class="yoda-nav"><button type="button" aria-label="Calendario">${icons.calendar}</button><button class="${active === 'cases' || active === 'prepare' ? 'is-active' : ''}" type="button" aria-label="Trámites">${icons.doc}</button><button type="button" aria-label="Empresas">${icons.briefcase}</button><button type="button" aria-label="Mensajes">${icons.chat}</button><button type="button" aria-label="Personas">${icons.users}</button></nav></aside><div class="yoda-main"><header class="yoda-topbar"><div class="yoda-topbar__left"><button class="icon-button" type="button" aria-label="Abrir menú">${icons.menu}</button><button class="icon-button" type="button" aria-label="Buscar">${icons.search}</button></div><div class="yoda-user"><button class="icon-button" type="button" aria-label="Teléfono">${icons.phone}</button><span class="avatar">JV</span><span>Juan Valencia</span></div></header><div class="yoda-content">${content}</div></div></section>`;
  }

  function successView() {
    return html`<section class="success-page"><article class="card success-card"><div class="success-icon">✓</div><span class="eyebrow" style="margin-top:18px">Alta completada</span><h1>Alta completada</h1><p>El expediente ha pasado por la preparación del cliente y la revisión técnica. En esta demo damos por completado el paso final de tramitación.</p><div class="success-checks"><div class="success-check"><span class="check">✓</span>Información cliente</div><div class="success-check"><span class="check">✓</span>Documentación</div><div class="success-check"><span class="check">✓</span>Validaciones</div><div class="success-check"><span class="check">✓</span>Configuración técnica</div></div><div class="success-note"><strong>Scope boundary:</strong> seguimos sin implementar TGSS / SEPE reales. “Alta completada” es un estado simulado para visualizar el lifecycle completo en Yoda.</div><div class="success-actions"><button class="button button--ghost" type="button" id="backToCasesSuccess">Volver a Altas</button><button class="button button--primary" type="button" id="restartFromSuccess">Reiniciar demo</button></div></article></section>`;
  }

  function bindViewEvents() {
    document.querySelector('#sendCompletionLink')?.addEventListener('click', () => { state.linkSent = true; state.formStep = 1; toast('Formulario enviado (simulado).'); window.setTimeout(() => routeTo('completion'), 250); });

    document.querySelector('#multiStepForm')?.addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      persistFormStep(form);
      const error = document.querySelector('#formError');
      if (state.formStep === 1 && (!state.client.firstName || !state.client.lastName)) {
        error.hidden = false;
        error.textContent = 'Nombre y apellido son obligatorios para continuar.';
        return;
      }
      error.hidden = true;
      if (state.formStep < 3) state.formStep += 1;
      else { state.clientSubmitted = true; state.formStep = 4; }
      render();
    });

    document.querySelector('#prevStep')?.addEventListener('click', () => { const form = document.querySelector('#multiStepForm'); if (form) persistFormStep(form); state.formStep = Math.max(1,state.formStep-1); render(); });
    document.querySelector('#goToYoda')?.addEventListener('click', () => routeTo('cases'));

    document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { state.filters = button.dataset.filter; render(); }));
    document.querySelector('#caseSearch')?.addEventListener('input', event => { state.query = event.target.value; document.querySelector('#casesBody').innerHTML = renderCaseRows(); bindCaseRows(); });
    bindCaseRows();

    document.querySelector('#newRequest')?.addEventListener('click', () => { state.formStep = 1; routeTo('completion'); });

    document.querySelectorAll('[data-confirm]').forEach(button => button.addEventListener('click', () => {
      const id = button.dataset.confirm;
      const caseId = button.dataset.confirmCase || 'ana';
      const confirmationSet = caseId === 'ana'
        ? state.confirmations
        : (state.caseConfirmations[caseId] ||= new Set());
      if (confirmationSet.has(id)) confirmationSet.delete(id); else confirmationSet.add(id);
      delete state.statusOverrides[caseId];
      render();
      toast(state.confirmations.has(id) ? 'Campo confirmado.' : 'Confirmación retirada.');
    }));

    document.querySelector('#manualStatus')?.addEventListener('change', event => {
      state.statusOverrides[state.selectedCaseId] = event.target.value;
      toast(`Estado cambiado a “${event.target.value}”.`);
      render();
    });
    document.querySelector('#clearStatusOverride')?.addEventListener('click', () => { delete state.statusOverrides[state.selectedCaseId]; toast('Se vuelve a usar el estado automático/original.'); render(); });

    document.querySelector('#requestMissing')?.addEventListener('click', () => toast('Solicitud de información enviada al cliente (simulada).'));
    document.querySelector('#returnToForm')?.addEventListener('click', () => { state.formStep = 1; routeTo('completion'); });

    document.querySelectorAll('[data-continue]').forEach(button => button.addEventListener('click', () => {
      if (state.selectedCaseId === 'ana' && state.confirmations.size !== technicalFields.length) return;
      state.success = true;
      state.statusOverrides.ana = 'Alta completada';
      routeTo('success');
    }));

    document.querySelector('#saveDraft')?.addEventListener('click', () => toast('Borrador guardado en la demo.'));
    document.querySelector('#viewOriginal')?.addEventListener('click', () => toast('Origen: email del cliente + formulario + documentos.'));
    document.querySelector('#backToCases')?.addEventListener('click', () => routeTo('cases'));
    document.querySelector('#backToCasesSuccess')?.addEventListener('click', () => routeTo('cases'));
    document.querySelector('#restartFromSuccess')?.addEventListener('click', resetDemo);
  }

  function bindCaseRows() {
    document.querySelectorAll('[data-open-case]').forEach(element => {
      const open = () => { state.selectedCaseId = element.dataset.openCase; routeTo('prepare'); };
      element.addEventListener('click', e => { e.stopPropagation(); open(); });
      if (element.tagName === 'TR') element.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  function resetDemo() {
    state = defaultState();
    toast('Demo reiniciada.');
    routeTo('request');
  }

  document.querySelector('#openExperiment').addEventListener('click', () => experimentModal.showModal());
  document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', () => experimentModal.close()));
  experimentModal.addEventListener('click', event => { if (event.target === experimentModal) experimentModal.close(); });
  document.querySelector('#resetDemo').addEventListener('click', resetDemo);

  stepButtons.forEach(button => button.addEventListener('click', () => {
    const target = button.dataset.route;
    if (target === 'success' && !state.success) { toast('Primero completa la preparación del alta.'); return; }
    routeTo(target);
  }));

  render();
})();
