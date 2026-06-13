/* ============================================================
   ANTEZANA — TRANSPORTE & TURISMO PREMIUM
   gallery.js  |  Galería · Lightbox · Filtros · Grid
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════
   DATOS DE GALERÍA — destinos y servicios
══════════════════════════════════════════ */
const GALLERY_ITEMS = [
  // AYACUCHO
  {
    id: 1, cat: 'ayacucho',
    src:   'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=75',
    title: 'Huamanga — Centro Histórico',
    desc:  'La ciudad de Ayacucho, declarada Patrimonio Cultural de la Nación, con sus 33 iglesias coloniales.',
    tag:   'Patrimonio',
  },
  {
    id: 2, cat: 'ayacucho',
    src:   'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600&q=75',
    title: 'Semana Santa de Ayacucho',
    desc:  'La celebración más importante del Perú. Miles de visitantes cada año para vivir esta tradición única.',
    tag:   'Tradición',
  },
  {
    id: 3, cat: 'ayacucho',
    src:   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75',
    title: 'Paisajes andinos de Ayacucho',
    desc:  'La región de Ayacucho ofrece paisajes únicos de la sierra sur peruana a más de 2,700 m.s.n.m.',
    tag:   'Naturaleza',
  },
  // HUANTA
  {
    id: 4, cat: 'huanta',
    src:   'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=75',
    title: 'Huanta — Tierra de Flores',
    desc:  'Capital de la provincia de Huanta, conocida por su clima privilegiado y producción agrícola.',
    tag:   'Ciudad',
  },
  {
    id: 5, cat: 'huanta',
    src:   'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=75',
    title: 'Valle de Huanta',
    desc:  'Rodeado de montañas y ríos, el valle huantino ofrece una de las vistas más bellas de la región.',
    tag:   'Naturaleza',
  },
  // LIMA
  {
    id: 6, cat: 'lima',
    src:   'https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=600&q=75',
    title: 'Lima — La Ciudad de los Reyes',
    desc:  'Capital del Perú, punto de conexión de nuestras rutas. Terminal principal en el distrito de La Victoria.',
    tag:   'Capital',
  },
  {
    id: 7, cat: 'lima',
    src:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
    title: 'Miraflores — Costa Verde',
    desc:  'El malecón de Miraflores con vista al Pacífico, uno de los destinos imperdibles en Lima.',
    tag:   'Turismo',
  },
  // SERVICIOS
  {
    id: 8, cat: 'servicios',
    src:   'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=75',
    title: 'Flota Antezana — Bus Premium',
    desc:  'Nuestra flota moderna con buses de última generación, mantenimiento constante y revisiones técnicas periódicas.',
    tag:   'Flota',
  },
  {
    id: 9, cat: 'servicios',
    src:   'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=75',
    title: 'Clase Dorado King — Interior',
    desc:  'Asientos premium totalmente reclinables, TV individual, Wi-Fi y servicio de snacks a bordo.',
    tag:   'Premium',
  },
  {
    id: 10, cat: 'servicios',
    src:   'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=75',
    title: 'Antezana Cargo — Encomiendas',
    desc:  'Servicio de envío de paquetes y encomiendas a todos nuestros destinos con seguimiento en tiempo real.',
    tag:   'Cargo',
  },
  // HUANCAYO
  {
    id: 11, cat: 'huancayo',
    src:   'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=75',
    title: 'Huancayo — Ciudad Incontrastable',
    desc:  'Capital de la región Junín, famosa por su Feria Dominical y sus paisajes de la sierra central.',
    tag:   'Ciudad',
  },
  {
    id: 12, cat: 'huancayo',
    src:   'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=75',
    title: 'Torre Torre — Huancayo',
    desc:  'Las formaciones rocosas de Torre Torre son el símbolo de Huancayo. Un espectáculo natural único.',
    tag:   'Naturaleza',
  },
];

/* ══════════════════════════════════════════
   CATEGORÍAS / FILTROS
══════════════════════════════════════════ */
const GALLERY_CATS = [
  { key: 'all',       label: 'Todos' },
  { key: 'ayacucho',  label: 'Ayacucho' },
  { key: 'huanta',    label: 'Huanta' },
  { key: 'lima',      label: 'Lima' },
  { key: 'huancayo',  label: 'Huancayo' },
  { key: 'servicios', label: 'Servicios' },
];

/* ══════════════════════════════════════════
   CLASE PRINCIPAL: Gallery
══════════════════════════════════════════ */
class Gallery {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.activeFilter = 'all';
    this.currentIndex = 0;
    this.filtered     = [...GALLERY_ITEMS];

    this._build();
    this._bindEvents();
    this._filter('all');
    this._injectStyles();
  }

  /* ── CONSTRUCCIÓN ── */
  _build() {
    this.container.innerHTML = `
      <div class="gal-filters stagger" id="gal-filters"></div>
      <div class="gal-grid" id="gal-grid"></div>
      <div class="gal-load-wrap">
        <button class="btn-outline gal-load-btn" id="gal-load-more">
          Ver más fotos <span class="btn-arrow">→</span>
        </button>
      </div>
    `;

    this.filtersEl  = document.getElementById('gal-filters');
    this.gridEl     = document.getElementById('gal-grid');
    this.loadMoreEl = document.getElementById('gal-load-more');

    this._buildFilters();
  }

  _buildFilters() {
    this.filtersEl.innerHTML = GALLERY_CATS.map(cat => `
      <button
        class="gal-filter-btn ${cat.key === 'all' ? 'active' : ''}"
        data-cat="${cat.key}"
      >${cat.label}</button>
    `).join('');
  }

  _buildGrid(items) {
    this.gridEl.innerHTML = '';

    items.forEach((item, i) => {
      const card = document.createElement('div');
      card.className    = 'gal-card rs';
      card.dataset.id   = item.id;
      card.dataset.index = i;
      card.style.transitionDelay = `${(i % 6) * 65}ms`;

      card.innerHTML = `
        <div class="gal-card-img img-overlay">
          <img
            data-src="${item.thumb}"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
            alt="${item.title}"
            loading="lazy"
          />
        </div>
        <div class="gal-card-info">
          <span class="badge badge-red">${item.tag}</span>
          <h3 class="gal-card-title">${item.title}</h3>
          <div class="gal-card-zoom">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="20" height="20">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>
        </div>
      `;

      this.gridEl.appendChild(card);

      // Lazy load
      requestAnimationFrame(() => {
        const img = card.querySelector('img[data-src]');
        if (img) {
          const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
              if (e.isIntersecting) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.style.transition = 'opacity .4s ease';
                img.style.opacity = '0';
                img.onload = () => { img.style.opacity = '1'; };
                obs.unobserve(img);
              }
            });
          }, { rootMargin: '200px' });
          obs.observe(img);
        }

        // Scroll reveal
        setTimeout(() => {
          const revObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
              if (e.isIntersecting) {
                e.target.classList.add('on');
                revObs.unobserve(e.target);
              }
            });
          }, { threshold: 0.1 });
          revObs.observe(card);
        }, 50);
      });
    });
  }

  /* ── FILTROS ── */
  _filter(cat) {
    this.activeFilter = cat;
    this.filtered = cat === 'all'
      ? [...GALLERY_ITEMS]
      : GALLERY_ITEMS.filter(i => i.cat === cat);

    // Animar salida del grid
    this.gridEl.style.opacity   = '0';
    this.gridEl.style.transform = 'translateY(12px)';
    this.gridEl.style.transition = 'opacity .25s ease, transform .25s ease';

    setTimeout(() => {
      this._buildGrid(this.filtered);
      this.gridEl.style.opacity   = '1';
      this.gridEl.style.transform = 'none';

      // Ocultar "Ver más" si hay pocos items
      if (this.loadMoreEl) {
        this.loadMoreEl.parentElement.style.display =
          this.filtered.length > 6 ? 'flex' : 'none';
      }
    }, 260);

    // Update botones filtro
    this.filtersEl.querySelectorAll('.gal-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });
  }

  /* ── LIGHTBOX ── */
  _openLightbox(index) {
    this.currentIndex = index;
    const item = this.filtered[index];
    if (!item) return;

    if (!this.lightbox) this._buildLightbox();

    this._updateLightbox(item);
    this.lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Precargar siguiente y anterior
    this._preload(this.filtered[(index + 1) % this.filtered.length]?.src);
    this._preload(this.filtered[(index - 1 + this.filtered.length) % this.filtered.length]?.src);
  }

  _buildLightbox() {
    this.lightbox = document.createElement('div');
    this.lightbox.id        = 'gal-lightbox';
    this.lightbox.className = 'gal-lightbox';

    this.lightbox.innerHTML = `
      <div class="gal-lb-backdrop"></div>
      <button class="gal-lb-close" aria-label="Cerrar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="24" height="24">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <button class="gal-lb-arrow gal-lb-prev" aria-label="Anterior">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="22" height="22">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button class="gal-lb-arrow gal-lb-next" aria-label="Siguiente">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="22" height="22">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
      <div class="gal-lb-content">
        <div class="gal-lb-img-wrap">
          <img class="gal-lb-img" src="" alt="" />
          <div class="gal-lb-spinner"></div>
        </div>
        <div class="gal-lb-info">
          <div class="gal-lb-meta">
            <span class="gal-lb-counter"></span>
            <span class="badge badge-red gal-lb-tag"></span>
          </div>
          <h3 class="gal-lb-title"></h3>
          <p class="gal-lb-desc"></p>
        </div>
      </div>
    `;

    document.body.appendChild(this.lightbox);

    // Eventos del lightbox
    this.lightbox.querySelector('.gal-lb-backdrop').addEventListener('click', () => this._closeLightbox());
    this.lightbox.querySelector('.gal-lb-close').addEventListener('click',    () => this._closeLightbox());
    this.lightbox.querySelector('.gal-lb-prev').addEventListener('click',     () => this._lbNavigate(-1));
    this.lightbox.querySelector('.gal-lb-next').addEventListener('click',     () => this._lbNavigate(1));

    // Touch swipe en lightbox
    let txStart = 0;
    this.lightbox.addEventListener('touchstart', e => { txStart = e.touches[0].clientX; }, { passive: true });
    this.lightbox.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - txStart;
      if (Math.abs(dx) > 50) dx < 0 ? this._lbNavigate(1) : this._lbNavigate(-1);
    }, { passive: true });

    // Teclado
    document.addEventListener('keydown', e => {
      if (!this.lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')     this._closeLightbox();
      if (e.key === 'ArrowLeft')  this._lbNavigate(-1);
      if (e.key === 'ArrowRight') this._lbNavigate(1);
    });
  }

  _updateLightbox(item) {
    const img     = this.lightbox.querySelector('.gal-lb-img');
    const spinner = this.lightbox.querySelector('.gal-lb-spinner');

    img.style.opacity = '0';
    spinner.style.display = 'block';

    img.onload = () => {
      img.style.transition = 'opacity .35s ease';
      img.style.opacity    = '1';
      spinner.style.display = 'none';
    };

    img.src  = item.src;
    img.alt  = item.title;

    this.lightbox.querySelector('.gal-lb-title').textContent  = item.title;
    this.lightbox.querySelector('.gal-lb-desc').textContent   = item.desc;
    this.lightbox.querySelector('.gal-lb-tag').textContent    = item.tag;
    this.lightbox.querySelector('.gal-lb-counter').textContent =
      `${this.currentIndex + 1} / ${this.filtered.length}`;
  }

  _lbNavigate(dir) {
    this.currentIndex = (this.currentIndex + dir + this.filtered.length) % this.filtered.length;
    const lb  = this.lightbox.querySelector('.gal-lb-img-wrap');
    lb.style.transform = `translateX(${dir < 0 ? '18px' : '-18px'})`;
    lb.style.opacity   = '0';
    lb.style.transition = 'opacity .2s ease, transform .2s ease';

    setTimeout(() => {
      this._updateLightbox(this.filtered[this.currentIndex]);
      lb.style.transition = 'opacity .3s ease, transform .3s cubic-bezier(.16,1,.3,1)';
      lb.style.opacity    = '1';
      lb.style.transform  = 'none';
    }, 200);
  }

  _closeLightbox() {
    this.lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  _preload(src) {
    if (!src) return;
    const img = new Image();
    img.src = src;
  }

  /* ── EVENTOS ── */
  _bindEvents() {
    // Filtros
    this.filtersEl.addEventListener('click', e => {
      const btn = e.target.closest('.gal-filter-btn');
      if (btn) this._filter(btn.dataset.cat);
    });

    // Click en cards → lightbox
    this.gridEl.addEventListener('click', e => {
      const card = e.target.closest('.gal-card');
      if (card) this._openLightbox(parseInt(card.dataset.index));
    });

    // Load more (simulado — muestra toast)
    if (this.loadMoreEl) {
      this.loadMoreEl.addEventListener('click', () => {
        if (window.AntezanaToast) {
          window.AntezanaToast.show('Más fotos próximamente', 'Estamos actualizando nuestra galería.');
        }
      });
    }
  }

  /* ── ESTILOS ── */
  _injectStyles() {
    if (document.getElementById('gal-styles')) return;

    const css = `
      /* ── FILTROS ── */
      .gal-filters {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        justify-content: center;
        margin-bottom: 2.8rem;
      }

      .gal-filter-btn {
        font-family: var(--font-ui);
        font-weight: 700;
        font-size: .72rem;
        letter-spacing: .18em;
        text-transform: uppercase;
        color: var(--az-white-dim);
        background: var(--az-glass);
        border: 1px solid var(--az-glass-bd);
        padding: .55rem 1.2rem;
        border-radius: 99px;
        cursor: pointer;
        transition: background .2s ease, color .2s ease,
                    border-color .2s ease, transform .2s cubic-bezier(.16,1,.3,1);
      }

      .gal-filter-btn:hover {
        color: var(--az-white);
        border-color: rgba(255,255,255,.2);
        transform: translateY(-2px);
      }

      .gal-filter-btn.active {
        background: var(--az-red);
        border-color: var(--az-red);
        color: #fff;
        box-shadow: var(--sh-red);
      }

      /* ── GRID ── */
      .gal-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.1rem;
        transition: opacity .25s ease, transform .25s ease;
      }

      /* ── CARD ── */
      .gal-card {
        position: relative;
        border-radius: var(--r-lg);
        overflow: hidden;
        cursor: pointer;
        aspect-ratio: 4/3;
        background: var(--az-navy2);
      }

      .gal-card:nth-child(7n+1) { aspect-ratio: 16/10; grid-column: span 2; }
      .gal-card:nth-child(7n+5) { aspect-ratio: 16/10; grid-column: span 2; }

      .gal-card-img {
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
      }

      .gal-card-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform .6s cubic-bezier(.16,1,.3,1), filter .5s ease;
      }

      .gal-card:hover .gal-card-img img {
        transform: scale(1.08);
        filter: brightness(.55);
      }

      .gal-card-info {
        position: absolute;
        inset: 0;
        z-index: 3;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.4rem;
        opacity: 0;
        transition: opacity .35s ease;
      }

      .gal-card:hover .gal-card-info { opacity: 1; }

      .gal-card-title {
        font-family: var(--font-ui);
        font-weight: 700;
        font-size: 1rem;
        color: var(--az-white);
        margin-top: .4rem;
        letter-spacing: .04em;
        transform: translateY(8px);
        transition: transform .35s cubic-bezier(.16,1,.3,1);
      }

      .gal-card:hover .gal-card-title { transform: none; }

      .gal-card-zoom {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 36px;
        height: 36px;
        background: rgba(255,255,255,.12);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        backdrop-filter: blur(8px);
        transform: scale(0);
        transition: transform .3s cubic-bezier(.16,1,.3,1);
      }

      .gal-card:hover .gal-card-zoom { transform: scale(1); }

      /* ── LOAD MORE ── */
      .gal-load-wrap {
        display: flex;
        justify-content: center;
        margin-top: 2.5rem;
      }

      /* ── LIGHTBOX ── */
      .gal-lightbox {
        position: fixed;
        inset: 0;
        z-index: 9000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity .3s ease;
      }

      .gal-lightbox.open {
        opacity: 1;
        pointer-events: all;
      }

      .gal-lb-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(5,15,44,.96);
        backdrop-filter: blur(20px);
      }

      .gal-lb-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        z-index: 10;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(255,255,255,.08);
        border: 1px solid rgba(255,255,255,.12);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background .2s ease, transform .2s cubic-bezier(.16,1,.3,1);
      }

      .gal-lb-close:hover {
        background: var(--az-red);
        transform: rotate(90deg);
      }

      .gal-lb-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(255,255,255,.07);
        border: 1px solid rgba(255,255,255,.1);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background .2s ease, transform .25s cubic-bezier(.16,1,.3,1);
      }

      .gal-lb-prev { left: 1.5rem; }
      .gal-lb-next { right: 1.5rem; }

      .gal-lb-arrow:hover {
        background: var(--az-red);
        border-color: var(--az-red);
        transform: translateY(-50%) scale(1.08);
      }

      .gal-lb-content {
        position: relative;
        z-index: 5;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.4rem;
        max-width: 900px;
        width: calc(100% - 10rem);
        max-height: 90vh;
      }

      .gal-lb-img-wrap {
        position: relative;
        max-height: 70vh;
        border-radius: var(--r-lg);
        overflow: hidden;
        box-shadow: var(--sh-lg);
      }

      .gal-lb-img {
        max-height: 70vh;
        width: auto;
        max-width: 100%;
        display: block;
        border-radius: var(--r-lg);
      }

      .gal-lb-spinner {
        position: absolute;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
        background: var(--az-navy2);
      }

      .gal-lb-spinner::after {
        content: '';
        width: 36px;
        height: 36px;
        border: 2px solid rgba(255,255,255,.1);
        border-top-color: var(--az-red);
        border-radius: 50%;
        animation: spin .7s linear infinite;
      }

      @keyframes spin { to { transform: rotate(360deg); } }

      .gal-lb-info {
        text-align: center;
        max-width: 600px;
      }

      .gal-lb-meta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .8rem;
        margin-bottom: .6rem;
      }

      .gal-lb-counter {
        font-family: var(--font-ui);
        font-size: .7rem;
        letter-spacing: .2em;
        color: var(--az-white-faint);
        text-transform: uppercase;
      }

      .gal-lb-title {
        font-family: var(--font-display);
        font-size: 1.8rem;
        letter-spacing: .05em;
        color: var(--az-white);
        margin-bottom: .5rem;
      }

      .gal-lb-desc {
        font-size: .85rem;
        font-weight: 300;
        color: var(--az-white-dim);
        line-height: 1.7;
      }

      /* Responsive galería */
      @media (max-width: 1024px) {
        .gal-grid { grid-template-columns: repeat(2, 1fr); }
        .gal-card:nth-child(7n+1),
        .gal-card:nth-child(7n+5) { grid-column: span 2; }
      }

      @media (max-width: 640px) {
        .gal-grid { grid-template-columns: 1fr; }
        .gal-card:nth-child(n) { grid-column: span 1; aspect-ratio: 4/3; }
        .gal-lb-content { width: calc(100% - 1rem); }
        .gal-lb-arrow { display: none; }
        .gal-lb-img { max-height: 55vh; }
      }
    `;

    const style = document.createElement('style');
    style.id          = 'gal-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('gallery')) {
    window.antezanaGallery = new Gallery('gallery');
  }
});