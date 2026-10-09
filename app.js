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
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
  };

  const defaultState = () => ({
    route: 'request',
    client: {
      worktime: '',
      weeklyHours: '',
      naf: ''
    },
    linkSent: false,
    clientSubmitted: false,
    confirmations: new Set(),
    filters: 'Todos',
    query: '',
    success: false
  });

  let state = defaultState();

  const technicalFields = [
    {
      id: 'contract',
      label: 'Tipo de contrato',
      badge: 'Sugerido',
      badgeClass: '',
      hint: 'Sugerencia ilustrativa basada en la información del expediente.',
      options: ['100 — Indefinido (demo)', '200 — Temporal (demo)']
    },
    {
      id: 'group',
      label: 'Grupo de cotización',
      badge: 'Sugerido',
      badgeClass: '',
      hint: 'Sugerencia ilustrativa según el puesto informado.',
      options: ['07 — Aux. administrativos (demo)', '05 — Oficiales administrativos (demo)']
    },
    {
      id: 'agreement',
      label: 'Convenio colectivo',
      badge: 'Preseleccionado',
      badgeClass: 'tag--blue',
      hint: 'Preselección ilustrativa según el sector del cliente.',
      options: ['Oficinas y despachos (demo)', 'Hostelería (demo)']
    },
    {
      id: 'category',
      label: 'Categoría / nivel',
      badge: 'Sugerido',
      badgeClass: '',
      hint: 'Sugerencia ilustrativa según el puesto.',
      options: ['Auxiliar administrativa (demo)', 'Administrativa (demo)']
    },
    {
      id: 'ccc',
      label: 'Cuenta de cotización (CCC)',
      badge: 'Sugerido',
      badgeClass: '',
      hint: 'Sugerencia ilustrativa según el centro de trabajo.',
      options: ['Madrid Centro — CCC demo', 'Madrid Norte — CCC demo']
    }
  ];

  function html(strings, ...values) {
    return strings.reduce((out, str, i) => out + str + (values[i] ?? ''), '');
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

  function routeTo(route, { focus = true } = {}) {
    const allowed = ['request', 'completion', 'cases', 'prepare', 'success'];
    if (!allowed.includes(route)) return;
    state.route = route;
    render();
    if (focus) requestAnimationFrame(() => appMain.focus({ preventScroll: true }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toast(message) {
    const node = document.createElement('div');
    node.className = 'toast';
    node.textContent = message;
    toastRegion.append(node);
    window.setTimeout(() => node.remove(), 2600);
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
            <p class="page-subtitle">En el experimento no automatizamos el email. Simulamos el proceso actual y usamos un enlace de completitud para estructurar únicamente lo que falta.</p>
          </div>
        </div>

        <div class="channel-grid">
          <article class="card card--flat problem-card">
            <span class="eyebrow">Contexto validado</span>
            <h2>El input llega desestructurado.</h2>
            <p>Los técnicos convierten emails, llamadas y documentos en información utilizable antes de poder operar el trámite.</p>
            <div class="problem-list">
              <div class="problem-list__item"><span class="problem-list__icon">1</span><div><strong>Interpretar</strong><br><span class="card__meta">Qué necesita realmente el cliente.</span></div></div>
              <div class="problem-list__item"><span class="problem-list__icon">2</span><div><strong>Detectar faltantes</strong><br><span class="card__meta">Qué impide preparar el Alta.</span></div></div>
              <div class="problem-list__item"><span class="problem-list__icon">3</span><div><strong>Pedir y revalidar</strong><br><span class="card__meta">Idas y vueltas hasta completar el caso.</span></div></div>
            </div>
            <div class="assumption"><strong>Assumption técnico del MVP:</strong> no dependemos de una API de email → Yoda. El enlace y el traslado al prototipo se simulan para aislar la hipótesis de valor.</div>
          </article>

          <article class="card mail-window">
            <div class="mail-toolbar"><span>Inbox · solicitudes@cliente.es</span><span>Hoy, 10:24</span></div>
            <div class="mail-content">
              <div class="mail-subject">Alta Ana García — incorporación lunes</div>
              <div class="mail-sender">
                <span class="avatar">CN</span>
                <div class="mail-sender__meta"><strong>Restaurante Norte</strong><span>cliente@restaurantenorte.es</span></div>
                <span class="card__meta">10:24</span>
              </div>
              <div class="mail-message">Hola, queremos dar de alta a <strong>Ana García</strong> para el lunes. Será administrativa. Adjunto su DNI. Cualquier cosa me dices.</div>
              <div class="attachment">${icons.doc}<div><strong>DNI_AnaGarcia.pdf</strong><br><span class="card__meta">1,2 MB</span></div></div>

              <div class="prototype-divider"></div>
              <div class="manual-action">
                <div><strong>Acción simulada del experimento</strong><p>El técnico identifica el Alta y envía un enlace para completar solo los datos pendientes.</p></div>
                <button class="button button--primary" type="button" id="sendCompletionLink">${state.linkSent ? 'Abrir enlace enviado' : 'Enviar enlace'}</button>
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
            <span class="eyebrow" style="color:#a9cdb0">Alta de trabajador</span>
            <h1>Solo necesitamos lo que falta.</h1>
            <p>No repetimos preguntas que ya tienen respuesta. El cliente completa tres datos y el técnico recibe un expediente mucho más preparado.</p>
          </div>
          <div class="client-proof">
            <span>✓ Datos existentes preservados</span>
            <span>✓ Solo faltantes</span>
            <span>✓ Menos ida y vuelta</span>
          </div>
        </div>

        <div class="client-form-wrap">
          <form class="client-form-card" id="completionForm" novalidate>
            <div class="client-form-head">
              <span class="eyebrow">Restaurante Norte</span>
              <h2>Completar información de Ana García</h2>
              <p>Nos faltan 3 datos para preparar el alta.</p>
              <div class="progress-track" aria-label="Progreso del formulario"><span></span></div>
            </div>

            <div class="field-group">
              <span class="field-label">Jornada *</span>
              <div class="segmented" role="radiogroup" aria-label="Jornada">
                <label><input type="radio" name="worktime" value="Completa" ${state.client.worktime === 'Completa' ? 'checked' : ''}><span>○ Completa</span></label>
                <label><input type="radio" name="worktime" value="Parcial" ${state.client.worktime === 'Parcial' ? 'checked' : ''}><span>○ Parcial</span></label>
              </div>
            </div>

            <div class="field-group">
              <label class="field-label" for="weeklyHours">Horas semanales *</label>
              <input class="field" id="weeklyHours" name="weeklyHours" type="number" min="1" max="60" inputmode="decimal" placeholder="Ej. 40" value="${escapeHTML(state.client.weeklyHours)}">
              <span class="field-help">Introduce las horas acordadas para la jornada.</span>
            </div>

            <div class="field-group">
              <label class="field-label" for="naf">Número de Seguridad Social / NAF *</label>
              <input class="field" id="naf" name="naf" autocomplete="off" placeholder="Ej. 28/12345678/90" value="${escapeHTML(state.client.naf)}">
              <span class="field-help">Si no lo tienes, contacta con tu asesor habitual.</span>
            </div>

            <div class="form-note">${icons.shield}<span><strong>Solo te pedimos información pendiente.</strong><br>El resto del expediente ya está asociado a esta solicitud.</span></div>
            <div class="form-error" id="formError" role="alert" hidden></div>
            <button class="button button--primary button--block" type="submit">Enviar información ${icons.arrow}</button>
            <div class="client-footer">Prototipo conceptual · los datos introducidos solo viven en esta sesión.</div>
          </form>
        </div>
      </section>`;
  }

  const cases = [
    { name: 'Ana García', initials: 'AG', client: 'Restaurante Norte', start: 'mañana', status: () => state.clientSubmitted ? 'Requiere revisión' : 'Falta información', pending: () => state.clientSubmitted ? 'Configuración técnica' : 'NAF · jornada · horas', action: 'Ver' },
    { name: 'Pedro Ruiz', initials: 'PR', client: 'ACME', start: 'hoy', status: () => 'Requiere revisión', pending: () => 'Jornada / horas', action: 'Revisar' },
    { name: 'Laura Martín', initials: 'LM', client: 'Hotel Central', start: '14 oct', status: () => 'Listo', pending: () => '—', action: 'Continuar' },
    { name: 'Miguel López', initials: 'ML', client: 'Retail Sur', start: '15 oct', status: () => 'Bloqueado', pending: () => 'Inconsistencia contractual', action: 'Resolver' }
  ];

  function casesView() {
    const counts = state.clientSubmitted ? { ready: 18, input: 5, review: 4, blocked: 2 } : { ready: 18, input: 6, review: 3, blocked: 2 };
    return yodaShell(html`
      <div class="breadcrumb">Yoda / Trámites / Altas</div>
      <div class="yoda-title-row">
        <div><h1 class="yoda-title">Altas</h1><p class="yoda-title__subtitle">Qué está listo, qué depende del cliente y qué requiere criterio del técnico.</p></div>
        <button class="button button--primary button--small" type="button" disabled>+ Nueva solicitud</button>
      </div>

      <div class="metric-grid">
        <article class="metric"><span class="metric__label">Listos</span><div class="metric__value">${counts.ready}</div></article>
        <article class="metric"><span class="metric__label">Falta información</span><div class="metric__value">${counts.input}</div></article>
        <article class="metric"><span class="metric__label">Requiere revisión</span><div class="metric__value">${counts.review}</div></article>
        <article class="metric"><span class="metric__label">Bloqueados</span><div class="metric__value">${counts.blocked}</div></article>
      </div>

      <div class="toolbar">
        <div class="filter-row" aria-label="Filtrar por estado">
          ${['Todos','Listo','Falta información','Requiere revisión','Bloqueado'].map(filter => `<button class="filter-pill ${state.filters === filter ? 'is-active' : ''}" type="button" data-filter="${filter}">${filter}</button>`).join('')}
        </div>
        <label class="search">${icons.search}<span class="sr-only"></span><input id="caseSearch" aria-label="Buscar trabajador o cliente" placeholder="Buscar trabajador, cliente…" value="${escapeHTML(state.query)}"></label>
      </div>

      <div class="table-wrap">
        <table class="case-table">
          <thead><tr><th>Trabajador</th><th>Cliente</th><th>Inicio</th><th>Estado</th><th>Pendiente</th><th>Acción</th></tr></thead>
          <tbody id="casesBody">${renderCaseRows()}</tbody>
        </table>
      </div>
    `, 'cases');
  }

  function renderCaseRows() {
    const q = state.query.toLowerCase().trim();
    const filtered = cases.filter(c => {
      const status = c.status();
      const passesFilter = state.filters === 'Todos' || status === state.filters;
      const passesQuery = !q || `${c.name} ${c.client}`.toLowerCase().includes(q);
      return passesFilter && passesQuery;
    });
    if (!filtered.length) return '<tr><td colspan="6" style="text-align:center;color:#667178;padding:32px">No hay casos con estos filtros.</td></tr>';
    return filtered.map((c, idx) => {
      const status = c.status();
      const isAna = c.name === 'Ana García';
      return `<tr class="case-row" ${isAna ? 'data-open-ana="true" tabindex="0"' : ''}>
        <td><div class="case-name"><span class="avatar">${c.initials}</span>${c.name}</div></td>
        <td>${c.client}</td><td>${c.start}</td><td>${statusPill(status)}</td><td>${c.pending()}</td>
        <td><button class="button button--ghost button--small" type="button" ${isAna ? 'data-open-ana="true"' : 'disabled'}>${c.action}</button></td>
      </tr>`;
    }).join('');
  }

  function prepareView() {
    if (!state.clientSubmitted) {
      state.client.worktime = state.client.worktime || 'Completa';
      state.client.weeklyHours = state.client.weeklyHours || '40';
      state.client.naf = state.client.naf || '28/XXXXXXX/XX';
      state.clientSubmitted = true;
    }
    const confirmed = state.confirmations.size;
    const ready = confirmed === technicalFields.length;
    return yodaShell(html`
      <div class="breadcrumb">Yoda / Trámites / Altas / Ana García</div>
      <div class="yoda-title-row">
        <div>
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><h1 class="yoda-title">Preparación del alta</h1>${statusPill(ready ? 'Listo' : 'Requiere revisión', ready ? 'Listo para tramitar' : undefined)}</div>
          <p class="yoda-title__subtitle">Ya tenemos toda la información del cliente. ${ready ? 'La configuración técnica está confirmada.' : 'Solo falta confirmar la configuración técnica para continuar.'}</p>
        </div>
        <div class="page-actions"><button class="button button--ghost button--small" type="button" id="saveDraft">Guardar borrador</button><button class="button button--primary button--small" type="button" data-continue ${ready ? '' : 'disabled'}>Continuar con tramitación ${icons.arrow}</button></div>
      </div>

      <div class="case-header">
        <div class="case-header__item"><div class="case-avatar">AG</div><div><strong>Ana García López</strong><span>Trabajadora</span></div></div>
        <div class="case-header__item"><div class="readiness-step__icon">${icons.briefcase}</div><div><strong>Restaurante Norte</strong><span>Cliente</span></div></div>
        <div class="case-header__item"><div class="readiness-step__icon">${icons.calendar}</div><div><span>Fecha de incorporación</span><strong>14 oct 2026</strong></div></div>
      </div>

      <div class="readiness-bar" aria-label="Estado de preparación">
        ${readinessStep('Información del cliente','Completa',icons.doc,'done')}
        ${readinessStep('Documentación','Completa',icons.doc,'done')}
        ${readinessStep('Validaciones','Sin incidencias',icons.shield,'done')}
        ${readinessStep('Configuración técnica',ready ? 'Confirmada' : 'Pendiente de confirmar',icons.gear,ready ? 'done' : 'pending')}
      </div>

      <div class="prepare-grid">
        <div class="stack">
          <article class="card card--flat">
            <div class="card__head"><div><h2 class="card__title">Resumen del expediente</h2><p class="card__meta">Todo lo aportado por el cliente ya está preparado.</p></div>${statusPill('Listo','Cliente completo')}</div>
            <div class="card__body" style="padding-top:12px">
              <dl class="summary-list">
                ${summaryRow('Nombre y apellidos','Ana García López')}
                ${summaryRow('DNI / NIE','12345678A')}
                ${summaryRow('NAF',state.client.naf)}
                ${summaryRow('Puesto','Administrativa')}
                ${summaryRow('Jornada',state.client.worktime)}
                ${summaryRow('Horas semanales',`${state.client.weeklyHours} h`)}
                ${summaryRow('Salario bruto anual','20.000 €')}
              </dl>
            </div>
          </article>

          <article class="card card--flat">
            <div class="card__head"><div><h2 class="card__title">Documentos</h2></div></div>
            <div class="card__body" style="padding-top:12px">
              <dl class="summary-list">${summaryRow('DNI / NIE','Recibido')}${summaryRow('Contrato / documentación laboral','Recibida')}</dl>
            </div>
          </article>

          <article class="card card--flat">
            <div class="card__body"><strong style="font-size:12px">Origen</strong><div class="origin-chips"><span class="chip">${icons.mail} Email</span><span class="chip">${icons.doc} Documento</span><span class="chip">${icons.users} Cliente</span></div></div>
          </article>
        </div>

        <article class="card card--flat tech-panel">
          <div class="tech-panel__head"><div><h2>Solo te queda confirmar</h2><p>Hemos preseleccionado opciones ilustrativas para reducir clicks. El técnico mantiene el criterio final.</p></div><span class="status ${ready ? 'status--ready' : 'status--review'} confirm-count">${confirmed} / ${technicalFields.length} confirmadas</span></div>
          <div class="tech-fields">
            ${technicalFields.map(field => techField(field)).join('')}
          </div>
          <div class="tech-note"><strong>Prototipo:</strong> los códigos y valores mostrados son ejemplos de UX y no constituyen recomendaciones normativas reales.</div>
        </article>
      </div>

      <div class="action-bar">
        <div class="action-bar__status"><div class="action-bar__done"><span class="check">✓</span><span>Todo lo necesario del cliente ya está completo.</span></div><span style="color:#667178">Pendiente: <strong>${technicalFields.length-confirmed}</strong> confirmaciones técnicas</span></div>
        <div class="action-bar__actions"><button class="link-button" type="button" id="viewOriginal">Ver información original ${icons.external}</button><button class="button button--primary button--small" type="button" data-continue ${ready ? '' : 'disabled'}>Continuar con tramitación ${icons.arrow}</button></div>
      </div>
    `, 'prepare');
  }

  function successView() {
    return html`
      <section class="success-page">
        <article class="card success-card">
          <div class="success-icon">✓</div>
          <span class="eyebrow" style="margin-top:18px">Fin del experimento</span>
          <h1>Alta preparada</h1>
          <p>El expediente contiene toda la información del cliente y la configuración técnica mínima confirmada para continuar con el proceso.</p>
          <div class="success-checks">
            <div class="success-check"><span class="check">✓</span>Información cliente</div>
            <div class="success-check"><span class="check">✓</span>Documentación</div>
            <div class="success-check"><span class="check">✓</span>Validaciones</div>
            <div class="success-check"><span class="check">✓</span>Configuración técnica</div>
          </div>
          <div class="success-note"><strong>Scope boundary:</strong> la demo termina antes de TGSS / SEPE. Estamos validando preparación y reducción de fricción, no la integración con organismos públicos.</div>
          <div class="success-actions"><button class="button button--ghost" type="button" data-route-action="cases">Volver a Altas</button><button class="button button--primary" type="button" id="restartFromSuccess">Reiniciar demo</button></div>
        </article>
      </section>`;
  }

  function yodaShell(content, active) {
    return html`
      <section class="yoda-layout">
        <aside class="yoda-sidebar" aria-label="Navegación de Yoda"><div class="yoda-logo">Y</div><nav class="yoda-nav"><button type="button" aria-label="Calendario">${icons.calendar}</button><button class="${active === 'cases' || active === 'prepare' ? 'is-active' : ''}" type="button" aria-label="Trámites">${icons.doc}</button><button type="button" aria-label="Empresas">${icons.briefcase}</button><button type="button" aria-label="Mensajes">${icons.chat}</button><button type="button" aria-label="Personas">${icons.users}</button></nav></aside>
        <div class="yoda-main">
          <header class="yoda-topbar"><div class="yoda-topbar__left"><button class="icon-button" type="button" aria-label="Abrir menú">${icons.menu}</button><button class="icon-button" type="button" aria-label="Buscar">${icons.search}</button></div><div class="yoda-user"><button class="icon-button" type="button" aria-label="Teléfono">${icons.phone}</button><span class="avatar">FM</span><span>Federico Muches</span></div></header>
          <div class="yoda-content">${content}</div>
        </div>
      </section>`;
  }

  function readinessStep(title, subtitle, icon, mode) {
    return `<div class="readiness-step is-${mode}"><div class="readiness-step__icon">${icon}</div><div class="readiness-step__copy"><b>${title}</b><span>${mode === 'done' ? '✓ ' : '● '}${subtitle}</span></div></div>`;
  }

  function summaryRow(label, value) {
    return `<div class="summary-row"><dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd><span class="check">✓</span></div>`;
  }

  function techField(field) {
    const confirmed = state.confirmations.has(field.id);
    return `<div class="tech-field ${confirmed ? 'is-confirmed' : ''}" data-tech-field="${field.id}">
      <div class="tech-label"><div class="tech-label__line">${field.label}<span class="tag ${field.badgeClass}">${field.badge}</span></div></div>
      <div class="tech-control"><select aria-label="${field.label}">${field.options.map(opt => `<option>${opt}</option>`).join('')}</select><small>${field.hint}</small></div>
      <button class="button button--ghost button--small confirm-button" type="button" data-confirm="${field.id}">${confirmed ? '✓ Confirmado' : 'Confirmar'}</button>
    </div>`;
  }

  function statusPill(status, display) {
    const map = { 'Listo':'status--ready','Falta información':'status--input','Requiere revisión':'status--review','Bloqueado':'status--blocked' };
    return `<span class="status ${map[status] || 'status--neutral'}">${escapeHTML(display || status)}</span>`;
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char]));
  }

  function bindViewEvents() {
    document.querySelector('#sendCompletionLink')?.addEventListener('click', () => {
      state.linkSent = true;
      toast('Enlace enviado (simulado).');
      window.setTimeout(() => routeTo('completion'), 300);
    });

    document.querySelector('#completionForm')?.addEventListener('submit', event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const worktime = form.get('worktime');
      const weeklyHours = String(form.get('weeklyHours') || '').trim();
      const naf = String(form.get('naf') || '').trim();
      const error = document.querySelector('#formError');
      const hoursNum = Number(weeklyHours);

      let message = '';
      if (!worktime) message = 'Selecciona el tipo de jornada.';
      else if (!weeklyHours || !Number.isFinite(hoursNum) || hoursNum < 1 || hoursNum > 60) message = 'Introduce unas horas semanales válidas entre 1 y 60.';
      else if (naf.length < 6) message = 'Introduce un NAF válido para la demo.';

      if (message) {
        error.hidden = false;
        error.textContent = message;
        return;
      }
      error.hidden = true;
      state.client.worktime = worktime;
      state.client.weeklyHours = weeklyHours;
      state.client.naf = naf;
      state.clientSubmitted = true;
      toast('Información recibida. El trámite se actualiza en el prototipo.');
      window.setTimeout(() => routeTo('cases'), 450);
    });

    document.querySelectorAll('[data-filter]').forEach(button => {
      button.addEventListener('click', () => {
        state.filters = button.dataset.filter;
        render();
      });
    });

    document.querySelector('#caseSearch')?.addEventListener('input', event => {
      state.query = event.target.value;
      document.querySelector('#casesBody').innerHTML = renderCaseRows();
      bindAnaRows();
    });
    bindAnaRows();

    document.querySelectorAll('[data-confirm]').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.confirm;
        if (state.confirmations.has(id)) state.confirmations.delete(id);
        else state.confirmations.add(id);
        render();
        toast(state.confirmations.has(id) ? 'Campo confirmado.' : 'Confirmación retirada.');
      });
    });

    document.querySelectorAll('[data-continue]').forEach(button => button.addEventListener('click', () => {
      if (state.confirmations.size !== technicalFields.length) return;
      state.success = true;
      routeTo('success');
    }));

    document.querySelector('#saveDraft')?.addEventListener('click', () => toast('Borrador guardado en la demo.'));
    document.querySelector('#viewOriginal')?.addEventListener('click', () => toast('Origen: email del cliente + DNI adjunto + completion link.'));
    document.querySelector('#restartFromSuccess')?.addEventListener('click', resetDemo);
    document.querySelectorAll('[data-route-action]').forEach(btn => btn.addEventListener('click', () => routeTo(btn.dataset.routeAction)));
  }

  function bindAnaRows() {
    document.querySelectorAll('[data-open-ana="true"]').forEach(element => {
      const open = () => routeTo('prepare');
      element.addEventListener('click', open);
      element.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
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
    if (target === 'success' && state.confirmations.size !== technicalFields.length) {
      toast('Completa las 5 confirmaciones técnicas para llegar al estado final.');
      return;
    }
    routeTo(target);
  }));

  render();
})();
