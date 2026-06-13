/* ============================================================
   ANTEZANA — TRANSPORTE & TURISMO PREMIUM
   booking.js  |  Reservas · Rutas · Asientos · Formulario
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════
   DATOS — RUTAS Y HORARIOS DE ANTEZANA
══════════════════════════════════════════ */
const RUTAS = [
  // DESDE LIMA
  {
    id: 'LIM-AYA',
    origen:   'Lima',
    destino:  'Ayacucho',
    duracion: '8h 30min',
    distancia: '568 km',
    horarios: [
      { hora: '07:00', tipo: 'Dorado King',  precio: 75,  asientos: 28, disponibles: 12 },
      { hora: '14:00', tipo: 'Comercial',    precio: 50,  asientos: 40, disponibles: 25 },
      { hora: '21:00', tipo: 'Económico',    precio: 35,  asientos: 44, disponibles: 30 },
      { hora: '22:30', tipo: 'Dorado King',  precio: 80,  asientos: 28, disponibles: 8  },
    ],
  },
  {
    id: 'LIM-HTA',
    origen:   'Lima',
    destino:  'Huanta',
    duracion: '9h 00min',
    distancia: '590 km',
    horarios: [
      { hora: '07:00', tipo: 'Comercial',    precio: 55,  asientos: 40, disponibles: 18 },
      { hora: '21:30', tipo: 'Económico',    precio: 38,  asientos: 44, disponibles: 32 },
    ],
  },
  {
    id: 'LIM-HYO',
    origen:   'Lima',
    destino:  'Huancayo',
    duracion: '6h 30min',
    distancia: '298 km',
    horarios: [
      { hora: '06:00', tipo: 'Dorado King',  precio: 60,  asientos: 28, disponibles: 15 },
      { hora: '12:00', tipo: 'Comercial',    precio: 42,  asientos: 40, disponibles: 22 },
      { hora: '22:00', tipo: 'Económico',    precio: 30,  asientos: 44, disponibles: 35 },
    ],
  },
  {
    id: 'LIM-ICA',
    origen:   'Lima',
    destino:  'Ica',
    duracion: '4h 00min',
    distancia: '302 km',
    horarios: [
      { hora: '08:00', tipo: 'Comercial',    precio: 38,  asientos: 40, disponibles: 20 },
      { hora: '15:00', tipo: 'Económico',    precio: 28,  asientos: 44, disponibles: 38 },
    ],
  },
  {
    id: 'LIM-PMP',
    origen:   'Lima',
    destino:  'Pampas',
    duracion: '7h 00min',
    distancia: '390 km',
    horarios: [
      { hora: '20:00', tipo: 'Económico',    precio: 45,  asientos: 44, disponibles: 28 },
    ],
  },
  // DESDE AYACUCHO
  {
    id: 'AYA-LIM',
    origen:   'Ayacucho',
    destino:  'Lima',
    duracion: '8h 30min',
    distancia: '568 km',
    horarios: [
      { hora: '06:30', tipo: 'Dorado King',  precio: 75,  asientos: 28, disponibles: 10 },
      { hora: '13:00', tipo: 'Comercial',    precio: 50,  asientos: 40, disponibles: 20 },
      { hora: '20:00', tipo: 'Económico',    precio: 35,  asientos: 44, disponibles: 28 },
      { hora: '21:30', tipo: 'Dorado King',  precio: 80,  asientos: 28, disponibles: 6  },
    ],
  },
  {
    id: 'AYA-HTA',
    origen:   'Ayacucho',
    destino:  'Huanta',
    duracion: '1h 00min',
    distancia: '47 km',
    horarios: [
      { hora: '07:00', tipo: 'Económico',    precio: 8,   asientos: 44, disponibles: 30 },
      { hora: '10:00', tipo: 'Económico',    precio: 8,   asientos: 44, disponibles: 35 },
      { hora: '14:00', tipo: 'Económico',    precio: 8,   asientos: 44, disponibles: 40 },
      { hora: '17:30', tipo: 'Económico',    precio: 8,   asientos: 44, disponibles: 38 },
    ],
  },
  {
    id: 'AYA-HYO',
    origen:   'Ayacucho',
    destino:  'Huancayo',
    duracion: '5h 00min',
    distancia: '320 km',
    horarios: [
      { hora: '08:00', tipo: 'Comercial',    precio: 35,  asientos: 40, disponibles: 18 },
      { hora: '20:00', tipo: 'Económico',    precio: 25,  asientos: 44, disponibles: 30 },
    ],
  },
  // DESDE HUANTA
  {
    id: 'HTA-LIM',
    origen:   'Huanta',
    destino:  'Lima',
    duracion: '9h 00min',
    distancia: '590 km',
    horarios: [
      { hora: '06:00', tipo: 'Comercial',    precio: 55,  asientos: 40, disponibles: 15 },
      { hora: '20:30', tipo: 'Económico',    precio: 40,  asientos: 44, disponibles: 25 },
    ],
  },
  {
    id: 'HTA-AYA',
    origen:   'Huanta',
    destino:  'Ayacucho',
    duracion: '1h 00min',
    distancia: '47 km',
    horarios: [
      { hora: '06:00', tipo: 'Económico',    precio: 8,   asientos: 44, disponibles: 35 },
      { hora: '09:00', tipo: 'Económico',    precio: 8,   asientos: 44, disponibles: 40 },
      { hora: '13:00', tipo: 'Económico',    precio: 8,   asientos: 44, disponibles: 38 },
      { hora: '16:00', tipo: 'Económico',    precio: 8,   asientos: 44, disponibles: 42 },
    ],
  },
  // DESDE HUANCAYO
  {
    id: 'HYO-LIM',
    origen:   'Huancayo',
    destino:  'Lima',
    duracion: '6h 30min',
    distancia: '298 km',
    horarios: [
      { hora: '07:00', tipo: 'Dorado King',  precio: 60,  asientos: 28, disponibles: 14 },
      { hora: '14:00', tipo: 'Comercial',    precio: 42,  asientos: 40, disponibles: 20 },
      { hora: '22:00', tipo: 'Económico',    precio: 30,  asientos: 44, disponibles: 32 },
    ],
  },
  {
    id: 'HYO-AYA',
    origen:   'Huancayo',
    destino:  'Ayacucho',
    duracion: '5h 00min',
    distancia: '320 km',
    horarios: [
      { hora: '07:00', tipo: 'Comercial',    precio: 35,  asientos: 40, disponibles: 15 },
      { hora: '21:00', tipo: 'Económico',    precio: 25,  asientos: 44, disponibles: 28 },
    ],
  },
];

/* ══════════════════════════════════════════
   CIUDADES DISPONIBLES
══════════════════════════════════════════ */
const CIUDADES = [
  'Lima', 'Ayacucho', 'Huanta', 'Huancayo',
  'Ica', 'Pampas', 'Acobamba', 'Andahuaylailla',
];

/* ══════════════════════════════════════════
   COLORES POR TIPO DE SERVICIO
══════════════════════════════════════════ */
const TIPO_CONFIG = {
  'Dorado King': { color: '#C4973A', bg: 'rgba(196,151,58,.15)', badge: 'badge-gold' },
  'Comercial':   { color: '#3A6BF0', bg: 'rgba(58,107,240,.12)', badge: 'badge-blue' },
  'Económico':   { color: '#4eda9b', bg: 'rgba(78,218,155,.12)', badge: 'badge-green' },
};

/* ══════════════════════════════════════════
   CLASE PRINCIPAL: BookingEngine
══════════════════════════════════════════ */
class BookingEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Estado
    this.step          = 1;   // 1=buscar, 2=resultados, 3=pasajero, 4=confirmación
    this.selectedRuta  = null;
    this.selectedHor   = null;
    this.pasajeros     = 1;
    this.form          = {};

    this._build();
    this._bindSearchForm();
    this._injectStyles();
  }

  /* ══ PASO 1: FORMULARIO DE BÚSQUEDA ══ */
  _build() {
    this.container.innerHTML = `
      <div class="bk-wrapper">

        <!-- Steps indicator -->
        <div class="bk-steps" id="bk-steps">
          ${this._buildStepsHTML()}
        </div>

        <!-- Contenido dinámico -->
        <div class="bk-body" id="bk-body">
          ${this._buildSearchHTML()}
        </div>

      </div>
    `;

    this.stepsEl = document.getElementById('bk-steps');
    this.bodyEl  = document.getElementById('bk-body');
  }

  _buildStepsHTML() {
    const steps = [
      { n: 1, label: 'Buscar' },
      { n: 2, label: 'Horarios' },
      { n: 3, label: 'Pasajero' },
      { n: 4, label: 'Confirmar' },
    ];

    return `<div class="bk-steps-inner">
      ${steps.map((s, i) => `
        <div class="bk-step ${this.step === s.n ? 'active' : ''} ${this.step > s.n ? 'done' : ''}" data-step="${s.n}">
          <div class="bk-step-circle">
            ${this.step > s.n
              ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>`
              : s.n
            }
          </div>
          <span class="bk-step-label">${s.label}</span>
        </div>
        ${i < steps.length - 1 ? '<div class="bk-step-line"></div>' : ''}
      `).join('')}
    </div>`;
  }

  _buildSearchHTML() {
    const today = new Date().toISOString().split('T')[0];

    return `
      <div class="bk-search rv">
        <div class="bk-search-head">
          <h2 class="bk-title">Encuentra tu viaje</h2>
          <p class="bk-sub">Selecciona tu ruta y fecha para ver los horarios disponibles</p>
        </div>

        <form class="bk-form" id="bk-search-form" data-validate>
          <div class="bk-form-grid">

            <!-- Origen -->
            <div class="form-field">
              <label class="form-label">📍 Ciudad de origen</label>
              <select class="form-select" id="bk-origen" required>
                <option value="">Selecciona origen...</option>
                ${CIUDADES.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>

            <!-- Swap -->
            <button type="button" class="bk-swap" id="bk-swap" title="Intercambiar ciudades">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                <path d="M7 16V4m0 0L3 8m4-4l4 4"/><path d="M17 8v12m0 0l4-4m-4 4l-4-4"/>
              </svg>
            </button>

            <!-- Destino -->
            <div class="form-field">
              <label class="form-label">🏁 Ciudad de destino</label>
              <select class="form-select" id="bk-destino" required>
                <option value="">Selecciona destino...</option>
                ${CIUDADES.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>

            <!-- Fecha -->
            <div class="form-field">
              <label class="form-label">📅 Fecha de viaje</label>
              <input type="date" class="form-input" id="bk-fecha" min="${today}" value="${today}" required />
            </div>

            <!-- Pasajeros -->
            <div class="form-field">
              <label class="form-label">👤 Pasajeros</label>
              <div class="bk-counter-input">
                <button type="button" class="bk-cnt-btn" id="bk-minus">−</button>
                <span class="bk-cnt-val" id="bk-cnt-val">1</span>
                <button type="button" class="bk-cnt-btn" id="bk-plus">+</button>
              </div>
            </div>

          </div>

          <div class="bk-form-footer">
            <button type="submit" class="btn-primary btn-lg magnetic ripple-wrap">
              Buscar horarios disponibles
              <span class="btn-arrow">→</span>
            </button>
          </div>
        </form>
      </div>
    `;
  }

  /* ══ PASO 2: RESULTADOS / HORARIOS ══ */
  _buildResultsHTML(ruta) {
    if (!ruta) {
      return `
        <div class="bk-no-results rv">
          <div class="bk-no-icon">🚌</div>
          <h3>No encontramos resultados</h3>
          <p>No hay viajes disponibles para esta ruta. Prueba con otras ciudades o fechas.</p>
          <button class="btn-outline" id="bk-back-search">← Volver a buscar</button>
        </div>
      `;
    }

    return `
      <div class="bk-results">
        <div class="bk-results-header rv">
          <button class="bk-back-btn" id="bk-back-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Volver
          </button>
          <div class="bk-route-info">
            <span class="bk-route-label">${ruta.origen}</span>
            <div class="bk-route-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              <span>${ruta.duracion} · ${ruta.distancia}</span>
            </div>
            <span class="bk-route-label">${ruta.destino}</span>
          </div>
          <span class="bk-results-count">${ruta.horarios.length} horarios</span>
        </div>

        <div class="bk-horarios stagger" id="bk-horarios">
          ${ruta.horarios.map((h, i) => this._buildHorarioCard(h, i)).join('')}
        </div>
      </div>
    `;
  }

  _buildHorarioCard(h, i) {
    const cfg        = TIPO_CONFIG[h.tipo] || TIPO_CONFIG['Económico'];
    const agotado    = h.disponibles === 0;
    const pocosLugares = h.disponibles <= 5 && h.disponibles > 0;
    const total      = h.precio * this.pasajeros;

    return `
      <div class="bk-horario-card ${agotado ? 'agotado' : ''}" data-index="${i}">
        <div class="bk-hor-left">
          <div class="bk-hor-hora">${h.hora}</div>
          <span class="badge ${cfg.badge}">${h.tipo}</span>
        </div>

        <div class="bk-hor-mid">
          <div class="bk-hor-features">
            ${h.tipo === 'Dorado King' ? '<span>🛋️ Asiento premium</span><span>📶 Wi-Fi</span><span>🍱 Snack</span>' : ''}
            ${h.tipo === 'Comercial'   ? '<span>💺 Asiento cómodo</span><span>❄️ A/C</span>' : ''}
            ${h.tipo === 'Económico'   ? '<span>✅ Puntual</span><span>🔒 Seguro</span>' : ''}
          </div>
          ${pocosLugares
            ? `<span class="bk-hor-urgencia">⚡ Solo ${h.disponibles} asientos libres</span>`
            : `<span class="bk-hor-disp">${h.disponibles} asientos disponibles</span>`
          }
        </div>

        <div class="bk-hor-right">
          <div class="bk-hor-precio">
            <span class="bk-hor-moneda">S/</span>
            <span class="bk-hor-monto">${h.precio}</span>
            <span class="bk-hor-ppax">por pasajero</span>
          </div>
          ${this.pasajeros > 1
            ? `<div class="bk-hor-total">Total: <b>S/ ${total}</b></div>`
            : ''
          }
          <button
            class="btn-primary bk-select-btn ripple-wrap"
            data-index="${i}"
            ${agotado ? 'disabled' : ''}
          >
            ${agotado ? 'Agotado' : 'Seleccionar'}
          </button>
        </div>
      </div>
    `;
  }

  /* ══ PASO 3: FORMULARIO DE PASAJERO ══ */
  _buildPassengerHTML() {
    const h   = this.selectedHor;
    const r   = this.selectedRuta;
    const cfg = TIPO_CONFIG[h.tipo] || TIPO_CONFIG['Económico'];

    return `
      <div class="bk-passenger">
        <button class="bk-back-btn" id="bk-back-results">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver a horarios
        </button>

        <!-- Resumen del viaje seleccionado -->
        <div class="bk-selected-summary rv">
          <div class="bk-ss-route">
            <strong>${r.origen}</strong>
            <span>→</span>
            <strong>${r.destino}</strong>
          </div>
          <div class="bk-ss-details">
            <span class="badge ${cfg.badge}">${h.tipo}</span>
            <span>🕐 ${h.hora}</span>
            <span>⏱ ${r.duracion}</span>
            <span>👤 ${this.pasajeros} pasajero${this.pasajeros > 1 ? 's' : ''}</span>
          </div>
          <div class="bk-ss-precio">
            S/ <strong>${h.precio * this.pasajeros}</strong>
          </div>
        </div>

        <!-- Formulario pasajero -->
        <form class="bk-passenger-form rv d2" id="bk-passenger-form" data-validate>
          <h3 class="bk-section-title">Datos del pasajero principal</h3>

          <div class="bk-pg-grid">
            <div class="form-field">
              <label class="form-label">Nombres *</label>
              <input type="text" class="form-input" id="pg-nombres" placeholder="Tus nombres" required />
            </div>
            <div class="form-field">
              <label class="form-label">Apellidos *</label>
              <input type="text" class="form-input" id="pg-apellidos" placeholder="Tus apellidos" required />
            </div>
            <div class="form-field">
              <label class="form-label">DNI / Pasaporte *</label>
              <input type="text" class="form-input" id="pg-doc" placeholder="Número de documento" maxlength="12" required />
            </div>
            <div class="form-field">
              <label class="form-label">Celular *</label>
              <input type="tel" class="form-input" id="pg-cel" placeholder="+51 999 999 999" required />
            </div>
            <div class="form-field bk-span2">
              <label class="form-label">Correo electrónico *</label>
              <input type="email" class="form-input" id="pg-email" placeholder="correo@ejemplo.com" required />
            </div>
          </div>

          ${this.pasajeros > 1 ? `
            <p class="bk-multi-note">
              ℹ️ Los datos de los pasajeros adicionales se completarán en el terminal al momento de abordar.
            </p>
          ` : ''}

          <h3 class="bk-section-title" style="margin-top:2rem">Equipaje</h3>
          <div class="bk-equip-info">
            <div class="bk-equip-item">✅ <span>20 kg de equipaje en bodega incluido</span></div>
            <div class="bk-equip-item">✅ <span>10 kg de equipaje de mano incluido</span></div>
            <div class="bk-equip-item">ℹ️ <span>Equipaje adicional: S/ 5 por kg extra</span></div>
          </div>

          <div class="bk-form-footer">
            <button type="submit" class="btn-primary btn-lg magnetic ripple-wrap">
              Continuar al pago
              <span class="btn-arrow">→</span>
            </button>
          </div>
        </form>
      </div>
    `;
  }

  /* ══ PASO 4: CONFIRMACIÓN ══ */
  _buildConfirmHTML() {
    const h   = this.selectedHor;
    const r   = this.selectedRuta;
    const f   = this.form;
    const cfg = TIPO_CONFIG[h.tipo] || TIPO_CONFIG['Económico'];
    const total = h.precio * this.pasajeros;
    const code  = 'ANT-' + Date.now().toString().slice(-6).toUpperCase();

    return `
      <div class="bk-confirm rv">
        <div class="bk-confirm-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="36" height="36">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>

        <h2 class="bk-confirm-title">¡Reserva casi lista!</h2>
        <p class="bk-confirm-sub">Revisa el resumen y confirma tu reserva. Te enviaremos los detalles a tu correo.</p>

        <div class="bk-ticket">
          <div class="bk-ticket-header">
            <span class="bk-ticket-logo">ANTEZANA</span>
            <span class="bk-ticket-code">${code}</span>
          </div>

          <div class="bk-ticket-route">
            <div class="bk-tk-city">
              <span class="bk-tk-city-name">${r.origen}</span>
              <span class="bk-tk-city-hora">${h.hora}</span>
            </div>
            <div class="bk-tk-line">
              <div class="bk-tk-dot"></div>
              <div class="bk-tk-bar"></div>
              <div class="bk-tk-dot"></div>
            </div>
            <div class="bk-tk-city">
              <span class="bk-tk-city-name">${r.destino}</span>
              <span class="bk-tk-city-hora">~${r.duracion}</span>
            </div>
          </div>

          <div class="bk-ticket-details">
            <div class="bk-tk-detail">
              <span class="bk-tk-dlabel">Pasajero</span>
              <span class="bk-tk-dvalue">${f.nombres || '—'} ${f.apellidos || ''}</span>
            </div>
            <div class="bk-tk-detail">
              <span class="bk-tk-dlabel">Documento</span>
              <span class="bk-tk-dvalue">${f.doc || '—'}</span>
            </div>
            <div class="bk-tk-detail">
              <span class="bk-tk-dlabel">Clase</span>
              <span class="bk-tk-dvalue"><span class="badge ${cfg.badge}">${h.tipo}</span></span>
            </div>
            <div class="bk-tk-detail">
              <span class="bk-tk-dlabel">Pasajeros</span>
              <span class="bk-tk-dvalue">${this.pasajeros}</span>
            </div>
            <div class="bk-tk-detail">
              <span class="bk-tk-dlabel">Distancia</span>
              <span class="bk-tk-dvalue">${r.distancia}</span>
            </div>
            <div class="bk-tk-detail">
              <span class="bk-tk-dlabel">Total a pagar</span>
              <span class="bk-tk-dvalue bk-tk-total">S/ ${total}</span>
            </div>
          </div>

          <div class="bk-ticket-footer">
            <span>⚠️ El pago se realiza en terminal</span>
            <span>📞 Llega 30 min antes</span>
          </div>
        </div>

        <div class="bk-confirm-actions">
          <button class="btn-primary btn-lg magnetic ripple-wrap" id="bk-confirmar">
            ✅ Confirmar reserva
          </button>
          <button class="btn-outline" id="bk-back-passenger">
            Editar datos
          </button>
        </div>
      </div>
    `;
  }

  /* ══ PASO FINAL: ÉXITO ══ */
  _buildSuccessHTML() {
    return `
      <div class="bk-success rv">
        <div class="bk-success-anim">🎉</div>
        <h2 class="bk-success-title">¡Reserva confirmada!</h2>
        <p class="bk-success-sub">
          Hemos registrado tu reserva. Preséntate en el terminal con tu DNI
          al menos <strong>30 minutos</strong> antes de la hora de salida.
        </p>
        <div class="bk-success-tips">
          <div class="bk-tip">📋 <span>Lleva tu DNI o documento de identidad</span></div>
          <div class="bk-tip">🧳 <span>Máximo 20 kg en bodega y 10 kg de mano</span></div>
          <div class="bk-tip">🚫 <span>No se permiten objetos peligrosos o ilegales</span></div>
          <div class="bk-tip">📞 <span>Consultas: WhatsApp o llamada al terminal</span></div>
        </div>
        <button class="btn-primary magnetic ripple-wrap" id="bk-nueva-reserva">
          Hacer otra reserva
        </button>
      </div>
    `;
  }

  /* ══ EVENTOS PRINCIPALES ══ */
  _bindSearchForm() {
    this.container.addEventListener('click', e => {

      // Swap origen/destino
      if (e.target.closest('#bk-swap')) this._swapCiudades();

      // Seleccionar horario
      const selBtn = e.target.closest('.bk-select-btn');
      if (selBtn && !selBtn.disabled) {
        const idx = parseInt(selBtn.dataset.index);
        this._selectHorario(idx);
      }

      // Volver a búsqueda
      if (e.target.closest('#bk-back-search')) this._goToSearch();

      // Volver a resultados
      if (e.target.closest('#bk-back-results')) this._goToResults();

      // Volver a pasajero
      if (e.target.closest('#bk-back-passenger')) this._goToPassenger();

      // Confirmar reserva
      if (e.target.closest('#bk-confirmar')) this._confirmarReserva();

      // Nueva reserva
      if (e.target.closest('#bk-nueva-reserva')) this._goToSearch();
    });

    // Counter de pasajeros
    this.container.addEventListener('click', e => {
      if (e.target.closest('#bk-minus')) {
        if (this.pasajeros > 1) {
          this.pasajeros--;
          const el = document.getElementById('bk-cnt-val');
          if (el) el.textContent = this.pasajeros;
        }
      }
      if (e.target.closest('#bk-plus')) {
        if (this.pasajeros < 8) {
          this.pasajeros++;
          const el = document.getElementById('bk-cnt-val');
          if (el) el.textContent = this.pasajeros;
        }
      }
    });

    // Submit búsqueda
    this.container.addEventListener('submit', e => {
      const form = e.target;

      if (form.id === 'bk-search-form') {
        e.preventDefault();
        this._buscarRuta();
      }

      if (form.id === 'bk-passenger-form') {
        e.preventDefault();
        this._guardarPasajero();
      }
    });
  }

  /* ══ LÓGICA DE NAVEGACIÓN ══ */
  _buscarRuta() {
    const origen  = document.getElementById('bk-origen')?.value;
    const destino = document.getElementById('bk-destino')?.value;

    if (!origen || !destino) {
      if (window.AntezanaToast) window.AntezanaToast.show('Campos requeridos', 'Selecciona origen y destino.');
      return;
    }

    if (origen === destino) {
      if (window.AntezanaToast) window.AntezanaToast.show('Ruta inválida', 'El origen y destino no pueden ser iguales.');
      return;
    }

    this.selectedRuta = RUTAS.find(r =>
      r.origen.toLowerCase()  === origen.toLowerCase() &&
      r.destino.toLowerCase() === destino.toLowerCase()
    ) || null;

    this.step = 2;
    this._render(this._buildResultsHTML(this.selectedRuta));
    this._updateSteps();
    this._animateIn();

    // Activar stagger
    setTimeout(() => {
      const hor = document.getElementById('bk-horarios');
      if (hor) hor.classList.add('on');
    }, 100);
  }

  _selectHorario(index) {
    this.selectedHor = this.selectedRuta.horarios[index];
    this.step = 3;
    this._render(this._buildPassengerHTML());
    this._updateSteps();
    this._animateIn();
  }

  _guardarPasajero() {
    this.form = {
      nombres:   document.getElementById('pg-nombres')?.value,
      apellidos: document.getElementById('pg-apellidos')?.value,
      doc:       document.getElementById('pg-doc')?.value,
      cel:       document.getElementById('pg-cel')?.value,
      email:     document.getElementById('pg-email')?.value,
    };

    this.step = 4;
    this._render(this._buildConfirmHTML());
    this._updateSteps();
    this._animateIn();
  }

  _confirmarReserva() {
    this.step = 5;
    this._render(this._buildSuccessHTML());
    this._updateSteps();
    this._animateIn();

    if (window.AntezanaToast) {
      window.AntezanaToast.show('¡Reserva exitosa!', 'Nos vemos en el terminal. ¡Buen viaje!');
    }
  }

  _goToSearch() {
    this.step = 1;
    this.selectedRuta = null;
    this.selectedHor  = null;
    this.form = {};
    this.pasajeros = 1;
    this._render(this._buildSearchHTML());
    this._updateSteps();
    this._animateIn();
  }

  _goToResults() {
    this.step = 2;
    this._render(this._buildResultsHTML(this.selectedRuta));
    this._updateSteps();
    this._animateIn();
    setTimeout(() => {
      const hor = document.getElementById('bk-horarios');
      if (hor) hor.classList.add('on');
    }, 100);
  }

  _goToPassenger() {
    this.step = 3;
    this._render(this._buildPassengerHTML());
    this._updateSteps();
    this._animateIn();
  }

  /* ══ HELPERS ══ */
  _swapCiudades() {
    const o = document.getElementById('bk-origen');
    const d = document.getElementById('bk-destino');
    if (o && d) {
      const tmp = o.value;
      o.value = d.value;
      d.value = tmp;

      const btn = document.getElementById('bk-swap');
      if (btn) {
        btn.style.transform = 'rotate(180deg)';
        setTimeout(() => { btn.style.transform = ''; }, 350);
      }
    }
  }

  _render(html) {
    this.bodyEl.style.opacity   = '0';
    this.bodyEl.style.transform = 'translateY(14px)';
    this.bodyEl.style.transition = 'opacity .2s ease, transform .2s ease';

    setTimeout(() => {
      this.bodyEl.innerHTML = html;
      this.bodyEl.style.transition = 'opacity .35s ease, transform .35s cubic-bezier(.16,1,.3,1)';
      this.bodyEl.style.opacity    = '1';
      this.bodyEl.style.transform  = 'none';
    }, 210);
  }

  _animateIn() {
    window.scrollTo({ top: this.container.offsetTop - 120, behavior: 'smooth' });
  }

  _updateSteps() {
    this.stepsEl.innerHTML = this._buildStepsHTML();
  }

  /* ══ ESTILOS ══ */
  _injectStyles() {
    if (document.getElementById('bk-styles')) return;

    const css = `
      .bk-wrapper { max-width: 820px; margin: 0 auto; }

      /* Steps */
      .bk-steps { margin-bottom: 2.8rem; }
      .bk-steps-inner { display: flex; align-items: center; justify-content: center; gap: 0; }

      .bk-step { display: flex; flex-direction: column; align-items: center; gap: .4rem; }
      .bk-step-circle {
        width: 36px; height: 36px; border-radius: 50%;
        background: var(--az-glass); border: 1.5px solid var(--az-glass-bd);
        display: flex; align-items: center; justify-content: center;
        font-family: var(--font-ui); font-weight: 700; font-size: .85rem;
        color: var(--az-white-dim);
        transition: all .3s ease;
      }
      .bk-step.active .bk-step-circle { background: var(--az-red); border-color: var(--az-red); color: #fff; box-shadow: var(--sh-red); }
      .bk-step.done   .bk-step-circle { background: rgba(78,218,155,.2); border-color: #4eda9b; color: #4eda9b; }
      .bk-step-label { font-family: var(--font-ui); font-size: .65rem; letter-spacing: .15em; text-transform: uppercase; color: var(--az-white-faint); }
      .bk-step.active .bk-step-label { color: var(--az-white-dim); }
      .bk-step-line { flex: 1; height: 1px; background: var(--az-border); min-width: 3rem; max-width: 6rem; margin: 0 .5rem; margin-bottom: 1.2rem; }

      /* Search */
      .bk-search-head { text-align: center; margin-bottom: 2rem; }
      .bk-title { font-family: var(--font-display); font-size: 2.4rem; letter-spacing: .04em; margin-bottom: .4rem; }
      .bk-sub { color: var(--az-white-dim); font-size: .9rem; font-weight: 300; }

      .bk-form-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: end; margin-bottom: 1rem; }
      .bk-swap {
        width: 40px; height: 40px; border-radius: 50%; background: var(--az-glass);
        border: 1px solid var(--az-glass-bd); color: var(--az-white-dim);
        display: flex; align-items: center; justify-content: center; cursor: pointer;
        transition: all .3s cubic-bezier(.16,1,.3,1); flex-shrink: 0; margin-bottom: 0;
      }
      .bk-swap:hover { background: var(--az-red); border-color: var(--az-red); color: #fff; transform: rotate(180deg); }

      .bk-counter-input {
        display: flex; align-items: center; gap: 1rem;
        background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1);
        border-radius: var(--r-sm); padding: .7rem 1rem;
      }
      .bk-cnt-btn {
        width: 26px; height: 26px; border-radius: 50%; background: var(--az-glass);
        border: 1px solid var(--az-glass-bd); color: white; font-size: 1.1rem;
        display: flex; align-items: center; justify-content: center; cursor: pointer;
        transition: background .2s ease;
      }
      .bk-cnt-btn:hover { background: var(--az-red); border-color: var(--az-red); }
      .bk-cnt-val { font-family: var(--font-display); font-size: 1.5rem; min-width: 24px; text-align: center; }

      .bk-form-footer { display: flex; justify-content: center; margin-top: 1.8rem; }
      .btn-lg { padding: 1rem 2.8rem; font-size: 1rem; }

      /* Results */
      .bk-results-header {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 1.8rem; flex-wrap: wrap; gap: 1rem;
      }
      .bk-back-btn {
        display: flex; align-items: center; gap: .4rem;
        font-family: var(--font-ui); font-weight: 600; font-size: .75rem;
        letter-spacing: .12em; text-transform: uppercase;
        color: var(--az-white-dim); background: var(--az-glass);
        border: 1px solid var(--az-glass-bd); padding: .5rem 1rem;
        border-radius: var(--r-sm); cursor: pointer;
        transition: all .2s ease;
      }
      .bk-back-btn:hover { background: rgba(255,255,255,.08); color: white; }

      .bk-route-info { display: flex; align-items: center; gap: 1rem; text-align: center; }
      .bk-route-label { font-family: var(--font-display); font-size: 1.6rem; }
      .bk-route-arrow { display: flex; flex-direction: column; align-items: center; gap: .2rem; color: var(--az-white-dim); font-size: .7rem; }
      .bk-results-count { font-family: var(--font-ui); font-size: .7rem; letter-spacing: .2em; text-transform: uppercase; color: var(--az-white-faint); }

      /* Horario card */
      .bk-horario-card {
        display: flex; align-items: center; gap: 1.5rem;
        background: var(--az-glass); border: 1px solid var(--az-glass-bd);
        border-radius: var(--r-lg); padding: 1.4rem 1.8rem;
        transition: all .3s ease; cursor: default;
        margin-bottom: .75rem;
      }
      .bk-horario-card:hover:not(.agotado) { border-color: rgba(200,32,31,.3); background: rgba(200,32,31,.04); transform: translateX(4px); }
      .bk-horario-card.agotado { opacity: .45; }

      .bk-hor-left { display: flex; flex-direction: column; align-items: center; gap: .5rem; min-width: 70px; }
      .bk-hor-hora { font-family: var(--font-display); font-size: 2rem; line-height: 1; }

      .bk-hor-mid { flex: 1; }
      .bk-hor-features { display: flex; flex-wrap: wrap; gap: .5rem .8rem; margin-bottom: .4rem; }
      .bk-hor-features span { font-size: .78rem; color: var(--az-white-dim); }
      .bk-hor-disp { font-size: .72rem; color: var(--az-white-faint); }
      .bk-hor-urgencia { font-size: .72rem; color: #ffb347; font-weight: 600; }

      .bk-hor-right { display: flex; flex-direction: column; align-items: flex-end; gap: .5rem; }
      .bk-hor-precio { display: flex; align-items: baseline; gap: .2rem; }
      .bk-hor-moneda { font-family: var(--font-ui); font-size: .8rem; color: var(--az-white-dim); }
      .bk-hor-monto { font-family: var(--font-display); font-size: 2rem; color: var(--az-gold-light); line-height: 1; }
      .bk-hor-ppax { font-size: .65rem; color: var(--az-white-faint); }
      .bk-hor-total { font-size: .78rem; color: var(--az-white-dim); }
      .bk-select-btn { padding: .6rem 1.4rem; font-size: .78rem; }

      /* No results */
      .bk-no-results { text-align: center; padding: 4rem 1rem; }
      .bk-no-icon { font-size: 3.5rem; margin-bottom: 1rem; }
      .bk-no-results h3 { font-family: var(--font-display); font-size: 2rem; margin-bottom: .5rem; }
      .bk-no-results p { color: var(--az-white-dim); margin-bottom: 1.5rem; }

      /* Passenger */
      .bk-selected-summary {
        background: rgba(200,32,31,.08); border: 1px solid rgba(200,32,31,.2);
        border-radius: var(--r-lg); padding: 1.2rem 1.6rem;
        display: flex; align-items: center; flex-wrap: wrap; gap: 1rem;
        margin-bottom: 2rem;
      }
      .bk-ss-route { display: flex; align-items: center; gap: .6rem; font-family: var(--font-display); font-size: 1.3rem; }
      .bk-ss-details { display: flex; align-items: center; flex-wrap: wrap; gap: .5rem .8rem; font-size: .82rem; color: var(--az-white-dim); }
      .bk-ss-precio { margin-left: auto; font-family: var(--font-display); font-size: 1.6rem; color: var(--az-gold-light); }

      .bk-section-title { font-family: var(--font-ui); font-weight: 700; font-size: .72rem; letter-spacing: .22em; text-transform: uppercase; color: var(--az-white-faint); margin-bottom: 1rem; padding-bottom: .6rem; border-bottom: 1px solid var(--az-border); }
      .bk-pg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
      .bk-span2 { grid-column: span 2; }
      .bk-multi-note { font-size: .8rem; color: var(--az-white-dim); background: var(--az-glass); border: 1px solid var(--az-glass-bd); border-radius: var(--r-sm); padding: .8rem 1rem; margin-top: .5rem; }
      .bk-equip-info { display: flex; flex-direction: column; gap: .4rem; }
      .bk-equip-item { display: flex; gap: .6rem; font-size: .85rem; color: var(--az-white-dim); align-items: flex-start; }

      /* Ticket */
      .bk-confirm { text-align: center; }
      .bk-confirm-icon { width: 72px; height: 72px; background: rgba(78,218,155,.15); border: 1px solid #4eda9b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.2rem; color: #4eda9b; }
      .bk-confirm-title { font-family: var(--font-display); font-size: 2.4rem; margin-bottom: .5rem; }
      .bk-confirm-sub { color: var(--az-white-dim); font-size: .9rem; margin-bottom: 2rem; }

      .bk-ticket {
        background: var(--az-navy2); border: 1px solid var(--az-glass-bd);
        border-radius: var(--r-xl); overflow: hidden;
        max-width: 520px; margin: 0 auto 2rem; text-align: left;
        box-shadow: var(--sh-lg);
      }
      .bk-ticket-header { background: var(--az-red); padding: 1rem 1.6rem; display: flex; justify-content: space-between; align-items: center; }
      .bk-ticket-logo { font-family: var(--font-display); font-size: 1.4rem; letter-spacing: .1em; color: #fff; }
      .bk-ticket-code { font-family: var(--font-ui); font-size: .72rem; letter-spacing: .2em; color: rgba(255,255,255,.7); }
      .bk-ticket-route { padding: 1.6rem; display: flex; align-items: center; gap: 1rem; border-bottom: 1px dashed var(--az-border); }
      .bk-tk-city { display: flex; flex-direction: column; gap: .2rem; flex: 1; }
      .bk-tk-city:last-child { text-align: right; }
      .bk-tk-city-name { font-family: var(--font-display); font-size: 1.8rem; line-height: 1; }
      .bk-tk-city-hora { font-family: var(--font-ui); font-size: .7rem; letter-spacing: .15em; color: var(--az-white-dim); }
      .bk-tk-line { flex: 1; display: flex; align-items: center; gap: .2rem; }
      .bk-tk-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--az-red); flex-shrink: 0; }
      .bk-tk-bar { flex: 1; height: 1px; background: repeating-linear-gradient(90deg, var(--az-border) 0, var(--az-border) 6px, transparent 6px, transparent 12px); }
      .bk-ticket-details { padding: 1rem 1.6rem; display: grid; grid-template-columns: 1fr 1fr; gap: .7rem; }
      .bk-tk-detail { display: flex; flex-direction: column; gap: .15rem; }
      .bk-tk-dlabel { font-family: var(--font-ui); font-size: .6rem; letter-spacing: .18em; text-transform: uppercase; color: var(--az-white-faint); }
      .bk-tk-dvalue { font-size: .88rem; color: var(--az-white); }
      .bk-tk-total { font-family: var(--font-display); font-size: 1.4rem; color: var(--az-gold-light); }
      .bk-ticket-footer { padding: .8rem 1.6rem; background: rgba(255,255,255,.03); border-top: 1px solid var(--az-border); display: flex; justify-content: space-between; font-size: .72rem; color: var(--az-white-faint); }

      .bk-confirm-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

      /* Success */
      .bk-success { text-align: center; padding: 2rem 0; }
      .bk-success-anim { font-size: 4rem; margin-bottom: 1rem; animation: floatY 3s ease-in-out infinite; }
      .bk-success-title { font-family: var(--font-display); font-size: 2.8rem; margin-bottom: .7rem; }
      .bk-success-sub { color: var(--az-white-dim); font-size: .95rem; max-width: 480px; margin: 0 auto 2rem; line-height: 1.7; }
      .bk-success-tips { display: flex; flex-direction: column; gap: .6rem; max-width: 400px; margin: 0 auto 2.4rem; text-align: left; }
      .bk-tip { display: flex; gap: .7rem; font-size: .85rem; color: var(--az-white-dim); align-items: flex-start; }

      /* Responsive booking */
      @media (max-width: 768px) {
        .bk-form-grid { grid-template-columns: 1fr; }
        .bk-swap { display: none; }
        .bk-horario-card { flex-wrap: wrap; gap: 1rem; }
        .bk-hor-right { width: 100%; flex-direction: row; align-items: center; justify-content: space-between; }
        .bk-pg-grid { grid-template-columns: 1fr; }
        .bk-span2 { grid-column: span 1; }
        .bk-results-header { flex-direction: column; align-items: flex-start; }
        .bk-ticket-details { grid-template-columns: 1fr; }
        .bk-step-line { min-width: 1.5rem; }
      }
    `;

    const style = document.createElement('style');
    style.id          = 'bk-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('booking-engine')) {
    window.antezanaBooking = new BookingEngine('booking-engine');
  }
});