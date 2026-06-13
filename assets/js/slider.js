/* ============================================================
   ANTEZANA — TRANSPORTE & TURISMO PREMIUM
   slider.js  |  Hero Slider · Autoplay · Touch · Indicadores
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════
   CONFIGURACIÓN GLOBAL DEL SLIDER
══════════════════════════════════════════ */
const SLIDER_CFG = {
  autoplay:     true,
  interval:     5800,       // ms entre slides
  duration:     900,        // ms transición
  pauseOnHover: true,
  loop:         true,
  swipeThresh:  50,         // px mínimos para swipe
};

/* ══════════════════════════════════════════
   SLIDES DEL HERO — datos de Antezana
   (las imágenes se reemplazan por fotos reales)
══════════════════════════════════════════ */
const SLIDES = [
  {
    id:       1,
    img:      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80',
    eyebrow:  'Ruta principal',
    title1:   'Lima',
    title2:   'Ayacucho',
    subtitle: 'Viaja con comodidad por la sierra peruana. Salidas diarias mañana y noche.',
    badge:    'Salidas diarias',
    badgeType:'red',
    cta1:     'Reservar pasaje',
    cta2:     'Ver horarios',
    overlay:  'rgba(5,15,44,.72)',
  },
  {
    id:       2,
    img:      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    eyebrow:  'Destino recomendado',
    title1:   'Huanta,',
    title2:   'Tierra de Flores',
    subtitle: 'Descubre la capital de la provincia de Huanta. Múltiples horarios disponibles.',
    badge:    'Múltiples horarios',
    badgeType:'gold',
    cta1:     'Reservar pasaje',
    cta2:     'Conocer Huanta',
    overlay:  'rgba(5,15,44,.68)',
  },
  {
    id:       3,
    img:      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
    eyebrow:  'Servicio premium',
    title1:   'Clase',
    title2:   'Dorado King',
    subtitle: 'El máximo confort en cada kilómetro. Asientos reclinables, Wi-Fi y servicio a bordo.',
    badge:    'Servicio Premium',
    badgeType:'gold',
    cta1:     'Ver clase Dorado',
    cta2:     'Comparar servicios',
    overlay:  'rgba(10,5,44,.75)',
  },
  {
    id:       4,
    img:      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    eyebrow:  'Encomiendas',
    title1:   'Antezana',
    title2:   'Cargo',
    subtitle: 'Envía tus paquetes con total seguridad a todos nuestros destinos. Rápido y confiable.',
    badge:    'Entrega garantizada',
    badgeType:'blue',
    cta1:     'Enviar encomienda',
    cta2:     'Ver tarifas',
    overlay:  'rgba(5,15,44,.70)',
  },
];

/* ══════════════════════════════════════════
   CLASE PRINCIPAL: HeroSlider
══════════════════════════════════════════ */
class HeroSlider {
  constructor(containerId) {
    this.container  = document.getElementById(containerId);
    if (!this.container) return;

    this.current    = 0;
    this.previous   = -1;
    this.total      = SLIDES.length;
    this.isAnimating = false;
    this.timer      = null;
    this.touchStartX = 0;
    this.touchStartY = 0;

    this._build();
    this._bindEvents();
    this._showSlide(0, 'next');
    if (SLIDER_CFG.autoplay) this._startTimer();
  }

  /* ── CONSTRUCCIÓN DEL DOM ── */
  _build() {
    this.container.classList.add('hero-slider');
    this.container.innerHTML = '';

    // Track de slides
    this.track = this._el('div', 'hs-track');
    this.slides = SLIDES.map((data, i) => this._buildSlide(data, i));
    this.slides.forEach(s => this.track.appendChild(s));
    this.container.appendChild(this.track);

    // Overlay oscuro
    this.overlay = this._el('div', 'hs-overlay');
    this.container.appendChild(this.overlay);

    // Flechas de navegación
    this.btnPrev = this._buildArrow('prev');
    this.btnNext = this._buildArrow('next');
    this.container.appendChild(this.btnPrev);
    this.container.appendChild(this.btnNext);

    // Indicadores (dots)
    this.dotsWrap = this._el('div', 'hs-dots');
    this.dots = SLIDES.map((_, i) => {
      const dot = this._el('button', 'hs-dot');
      dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
      dot.dataset.index = i;
      this.dotsWrap.appendChild(dot);
      return dot;
    });
    this.container.appendChild(this.dotsWrap);

    // Barra de progreso autoplay
    this.progressBar = this._el('div', 'hs-progress');
    this.progressFill = this._el('div', 'hs-progress-fill');
    this.progressBar.appendChild(this.progressFill);
    this.container.appendChild(this.progressBar);

    // Contador numérico (01 / 04)
    this.counter = this._el('div', 'hs-counter');
    this.container.appendChild(this.counter);

    // Inyectar estilos inline del slider
    this._injectStyles();
  }

  _buildSlide(data, i) {
    const slide = this._el('div', 'hs-slide');
    slide.dataset.index = i;

    slide.innerHTML = `
      <div class="hs-slide-bg" style="background-image:url('${data.img}')"></div>
      <div class="hs-slide-content">
        <span class="badge badge-${data.badgeType} rv d1">${data.badge}</span>
        <p class="hs-eyebrow rv d2">${data.eyebrow}</p>
        <h1 class="hs-title">
          <span class="hs-t1">${data.title1}</span>
          <span class="hs-t2">${data.title2}</span>
        </h1>
        <p class="hs-subtitle rv d4">${data.subtitle}</p>
        <div class="hs-btns rv d5">
          <a href="views/reservas.html" class="btn-primary magnetic">
            ${data.cta1} <span class="btn-arrow">→</span>
          </a>
          <a href="#destinos" class="btn-outline">
            ${data.cta2}
          </a>
        </div>
      </div>
    `;
    return slide;
  }

  _buildArrow(dir) {
    const btn = this._el('button', `hs-arrow hs-arrow-${dir}`);
    btn.setAttribute('aria-label', dir === 'prev' ? 'Slide anterior' : 'Slide siguiente');
    btn.innerHTML = dir === 'prev'
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
           <polyline points="15 18 9 12 15 6"></polyline>
         </svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
           <polyline points="9 18 15 12 9 6"></polyline>
         </svg>`;
    return btn;
  }

  /* ── SHOW SLIDE ── */
  _showSlide(index, direction = 'next') {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const prev = this.current;
    this.previous = prev;
    this.current  = (index + this.total) % this.total;

    const prevSlide = this.slides[prev];
    const nextSlide = this.slides[this.current];
    const data      = SLIDES[this.current];

    // Overlay color
    this.overlay.style.background = data.overlay;

    // Clases de entrada / salida
    const enterClass = direction === 'next' ? 'hs-enter-right' : 'hs-enter-left';
    const exitClass  = direction === 'next' ? 'hs-exit-left'  : 'hs-exit-right';

    nextSlide.classList.add('hs-active', enterClass);
    if (prev !== this.current) {
      prevSlide.classList.add(exitClass);
    }

    // Animar contenido interno
    this._animateContent(nextSlide);

    // Dots
    this._updateDots();

    // Contador
    this._updateCounter();

    // Limpiar después de la transición
    setTimeout(() => {
      nextSlide.classList.remove(enterClass);
      if (prev !== this.current) {
        prevSlide.classList.remove('hs-active', exitClass);
      }
      this.isAnimating = false;
    }, SLIDER_CFG.duration);
  }

  _animateContent(slide) {
    const els = slide.querySelectorAll('.hs-eyebrow, .hs-title .hs-t1, .hs-title .hs-t2, .hs-subtitle, .hs-btns, .badge');
    els.forEach((el, i) => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'none';

      setTimeout(() => {
        el.style.transition = `opacity .65s cubic-bezier(.16,1,.3,1) ${i * 90}ms,
                               transform .65s cubic-bezier(.16,1,.3,1) ${i * 90}ms`;
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      }, 60);
    });
  }

  _updateDots() {
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('hs-dot-active', i === this.current);
    });
  }

  _updateCounter() {
    const pad = n => String(n + 1).padStart(2, '0');
    this.counter.innerHTML = `
      <span class="hs-cnt-current">${pad(this.current)}</span>
      <span class="hs-cnt-sep"></span>
      <span class="hs-cnt-total">${pad(this.total - 1)}</span>
    `;
  }

  /* ── AUTOPLAY ── */
  _startTimer() {
    this._stopTimer();
    this._resetProgress();

    this.timer = setInterval(() => {
      this.next();
    }, SLIDER_CFG.interval);
  }

  _stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
    this._pauseProgress();
  }

  _resetProgress() {
    this.progressFill.style.transition = 'none';
    this.progressFill.style.width      = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.progressFill.style.transition = `width ${SLIDER_CFG.interval}ms linear`;
        this.progressFill.style.width      = '100%';
      });
    });
  }

  _pauseProgress() {
    const computed = getComputedStyle(this.progressFill).width;
    this.progressFill.style.transition = 'none';
    this.progressFill.style.width      = computed;
  }

  /* ── NAVEGACIÓN ── */
  prev() { this._showSlide(this.current - 1, 'prev'); this._startTimer(); }
  next() { this._showSlide(this.current + 1, 'next'); this._startTimer(); }
  goTo(i) {
    const dir = i > this.current ? 'next' : 'prev';
    this._showSlide(i, dir);
    this._startTimer();
  }

  /* ── EVENTOS ── */
  _bindEvents() {
    // Flechas
    this.btnPrev.addEventListener('click', () => this.prev());
    this.btnNext.addEventListener('click', () => this.next());

    // Dots
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.goTo(i));
    });

    // Pause on hover
    if (SLIDER_CFG.pauseOnHover) {
      this.container.addEventListener('mouseenter', () => this._stopTimer());
      this.container.addEventListener('mouseleave', () => {
        if (SLIDER_CFG.autoplay) this._startTimer();
      });
    }

    // Touch / swipe
    this.container.addEventListener('touchstart', e => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this._stopTimer();
    }, { passive: true });

    this.container.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - this.touchStartX;
      const dy = e.changedTouches[0].clientY - this.touchStartY;

      // Solo swipe horizontal
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SLIDER_CFG.swipeThresh) {
        dx < 0 ? this.next() : this.prev();
      } else {
        if (SLIDER_CFG.autoplay) this._startTimer();
      }
    }, { passive: true });

    // Teclado
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Pausa si tab oculta
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this._stopTimer();
      } else if (SLIDER_CFG.autoplay) {
        this._startTimer();
      }
    });
  }

  /* ── UTILIDAD ── */
  _el(tag, classes = '') {
    const el = document.createElement(tag);
    if (classes) el.className = classes;
    return el;
  }

  /* ── ESTILOS CSS DEL SLIDER ── */
  _injectStyles() {
    if (document.getElementById('hs-styles')) return;

    const css = `
      /* ── HERO SLIDER CONTAINER ── */
      .hero-slider {
        position: relative;
        width: 100%;
        height: 100svh;
        min-height: 600px;
        overflow: hidden;
        background: var(--az-navy);
      }

      /* Track */
      .hs-track {
        position: absolute;
        inset: 0;
      }

      /* Slide base */
      .hs-slide {
        position: absolute;
        inset: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity ${SLIDER_CFG.duration}ms cubic-bezier(.76,0,.24,1);
      }

      .hs-slide.hs-active {
        opacity: 1;
        pointer-events: all;
        z-index: 2;
      }

      /* Fondo del slide */
      .hs-slide-bg {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        transform: scale(1.06);
        transition: transform ${SLIDER_CFG.duration * 1.8}ms cubic-bezier(.16,1,.3,1);
        will-change: transform;
      }

      .hs-slide.hs-active .hs-slide-bg {
        transform: scale(1);
      }

      /* Transiciones de entrada/salida */
      .hs-enter-right { animation: hsEnterRight ${SLIDER_CFG.duration}ms cubic-bezier(.76,0,.24,1) forwards; }
      .hs-enter-left  { animation: hsEnterLeft  ${SLIDER_CFG.duration}ms cubic-bezier(.76,0,.24,1) forwards; }
      .hs-exit-left   { animation: hsExitLeft   ${SLIDER_CFG.duration}ms cubic-bezier(.76,0,.24,1) forwards; z-index: 1; }
      .hs-exit-right  { animation: hsExitRight  ${SLIDER_CFG.duration}ms cubic-bezier(.76,0,.24,1) forwards; z-index: 1; }

      @keyframes hsEnterRight { from { opacity:0; transform:translateX(5%); } to { opacity:1; transform:none; } }
      @keyframes hsEnterLeft  { from { opacity:0; transform:translateX(-5%); } to { opacity:1; transform:none; } }
      @keyframes hsExitLeft   { from { opacity:1; transform:none; } to { opacity:0; transform:translateX(-4%); } }
      @keyframes hsExitRight  { from { opacity:1; transform:none; } to { opacity:0; transform:translateX(4%); } }

      /* Overlay de color */
      .hs-overlay {
        position: absolute;
        inset: 0;
        z-index: 3;
        pointer-events: none;
        transition: background .8s ease;
      }

      /* Contenido del slide */
      .hs-slide-content {
        position: absolute;
        inset: 0;
        z-index: 4;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 0 0 9rem 7rem;
        max-width: 780px;
      }

      .hs-eyebrow {
        font-family: var(--font-ui);
        font-weight: 700;
        font-size: .75rem;
        letter-spacing: .35em;
        text-transform: uppercase;
        color: var(--az-white-dim);
        margin: .7rem 0 .5rem;
        display: flex;
        align-items: center;
        gap: .7rem;
      }

      .hs-eyebrow::before {
        content: '';
        display: block;
        width: 28px;
        height: 1.5px;
        background: var(--az-red);
        flex-shrink: 0;
      }

      .hs-title {
        font-family: var(--font-display);
        font-size: clamp(4.5rem, 9vw, 9rem);
        line-height: .92;
        letter-spacing: .02em;
        color: var(--az-white);
        margin-bottom: 1.2rem;
      }

      .hs-title .hs-t1 { display: block; }
      .hs-title .hs-t2 { display: block; color: var(--az-gold-light); }

      .hs-subtitle {
        font-size: 1rem;
        font-weight: 300;
        color: var(--az-white-dim);
        max-width: 480px;
        line-height: 1.7;
        margin-bottom: 2rem;
      }

      .hs-btns {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      /* Flechas */
      .hs-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 5;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: rgba(255,255,255,.08);
        border: 1px solid rgba(255,255,255,.12);
        color: var(--az-white);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background .2s ease, transform .3s cubic-bezier(.16,1,.3,1), border-color .2s ease;
        backdrop-filter: blur(8px);
      }

      .hs-arrow svg { width: 20px; height: 20px; }
      .hs-arrow-prev { left: 2rem; }
      .hs-arrow-next { right: 2rem; }

      .hs-arrow:hover {
        background: var(--az-red);
        border-color: var(--az-red);
        transform: translateY(-50%) scale(1.08);
      }

      /* Dots */
      .hs-dots {
        position: absolute;
        bottom: 3.2rem;
        left: 7rem;
        z-index: 5;
        display: flex;
        gap: .55rem;
        align-items: center;
      }

      .hs-dot {
        width: 24px;
        height: 3px;
        border-radius: 2px;
        background: rgba(255,255,255,.25);
        cursor: pointer;
        border: none;
        transition: width .35s cubic-bezier(.16,1,.3,1),
                    background .25s ease;
        padding: 0;
      }

      .hs-dot.hs-dot-active {
        width: 44px;
        background: var(--az-red);
      }

      /* Barra de progreso */
      .hs-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: rgba(255,255,255,.07);
        z-index: 5;
      }

      .hs-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--az-red), var(--az-blue-mid));
        width: 0;
        box-shadow: 0 0 6px rgba(200,32,31,.5);
      }

      /* Contador */
      .hs-counter {
        position: absolute;
        bottom: 2.9rem;
        right: 4rem;
        z-index: 5;
        display: flex;
        align-items: center;
        gap: .6rem;
      }

      .hs-cnt-current {
        font-family: var(--font-display);
        font-size: 2.2rem;
        color: var(--az-white);
        line-height: 1;
      }

      .hs-cnt-sep {
        width: 28px;
        height: 1px;
        background: rgba(255,255,255,.3);
        transform: rotate(-55deg);
        flex-shrink: 0;
      }

      .hs-cnt-total {
        font-family: var(--font-ui);
        font-size: .82rem;
        color: var(--az-white-faint);
        font-weight: 600;
      }

      /* Responsive slider */
      @media (max-width: 768px) {
        .hs-slide-content {
          padding: 0 1.4rem 7rem;
          max-width: 100%;
        }

        .hs-title { font-size: clamp(3.2rem, 12vw, 5.5rem); }
        .hs-subtitle { font-size: .88rem; max-width: 100%; }
        .hs-dots { left: 1.4rem; bottom: 2.4rem; }
        .hs-counter { right: 1.4rem; bottom: 2.2rem; }

        .hs-arrow-prev { left: 1rem; }
        .hs-arrow-next { right: 1rem; }
        .hs-arrow { width: 42px; height: 42px; }
        .hs-arrow svg { width: 16px; height: 16px; }

        .hs-btns { flex-direction: column; align-items: flex-start; }
      }

      @media (max-width: 480px) {
        .hs-arrow { display: none; }
        .hs-title { font-size: clamp(2.8rem, 14vw, 4.5rem); }
      }
    `;

    const style = document.createElement('style');
    style.id        = 'hs-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }
}

/* ══════════════════════════════════════════
   INIT — lanzar al cargar el DOM
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Solo en index.html (si existe el contenedor)
  if (document.getElementById('hero-slider')) {
    window.heroSlider = new HeroSlider('hero-slider');
  }
});