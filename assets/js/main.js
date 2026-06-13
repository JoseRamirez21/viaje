/* ============================================================
   ANTEZANA — TRANSPORTE & TURISMO PREMIUM
   main.js  |  Core · Loader · Navbar · Partículas · Scroll
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════
   1. LOADER DE ENTRADA
══════════════════════════════════════════ */
const Loader = (() => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const MIN_TIME = 2400; // ms mínimo que se muestra
  const start    = performance.now();

  window.addEventListener('load', () => {
    const elapsed = performance.now() - start;
    const remaining = Math.max(0, MIN_TIME - elapsed);

    setTimeout(() => {
      loader.style.transition = 'opacity .55s ease, visibility .55s ease';
      loader.style.opacity    = '0';
      loader.style.visibility = 'hidden';

      setTimeout(() => {
        loader.remove();
        document.body.classList.add('loaded');
        ScrollReveal.init();
        Counters.init();
      }, 560);
    }, remaining);
  });
})();


/* ══════════════════════════════════════════
   2. NAVBAR — scroll + active link
══════════════════════════════════════════ */
const Navbar = (() => {
  const nav      = document.getElementById('navbar');
  const links    = document.querySelectorAll('.nav-links a, #nav-mobile a');
  const burger   = document.querySelector('.nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  let   lastY    = 0;
  let   ticking  = false;

  if (!nav) return;

  // Scroll → cambio de estilo
  const onScroll = () => {
    const y = window.scrollY;

    if (!ticking) {
      requestAnimationFrame(() => {
        // Scrolled state
        if (y > 60) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }

        // Hide on scroll down (> 300px), show on scroll up
        if (y > 300) {
          if (y > lastY + 8) {
            nav.style.transform = 'translateY(-110%)';
          } else if (y < lastY - 4) {
            nav.style.transform = 'translateY(0)';
          }
        } else {
          nav.style.transform = 'translateY(0)';
        }

        lastY   = y;
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Active link — resalta la sección actual
  const setActive = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === currentPath || (currentPath === 'index.html' && href === '#')) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  };

  setActive();

  // Hamburguesa — menú móvil
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Cerrar al hacer clic en un link
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Cerrar con ESC
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        burger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Transición suave entre páginas internas
  nav.style.transition = 'transform .35s ease, padding .3s ease, background .3s ease, box-shadow .3s ease, border-color .3s ease';

})();


/* ══════════════════════════════════════════
   3. BARRA DE PROGRESO DE SCROLL
══════════════════════════════════════════ */
const ScrollProgress = (() => {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width    = pct + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ══════════════════════════════════════════
   4. CANVAS DE PARTÍCULAS (fondo)
══════════════════════════════════════════ */
const Particles = (() => {
  const canvas = document.getElementById('canvas-bg');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  let   W, H, particles, raf;

  // Configuración
  const CFG = {
    count:       55,
    color:       '255,255,255',
    minR:        .6,
    maxR:        2.2,
    minSpeed:    .12,
    maxSpeed:    .4,
    lineColor:   '255,255,255',
    lineAlpha:   .045,
    lineDist:    140,
    respawn:     true,
  };

  class Particle {
    constructor() { this.reset(true); }

    reset(random = false) {
      this.x  = Math.random() * W;
      this.y  = random ? Math.random() * H : H + 10;
      this.r  = CFG.minR + Math.random() * (CFG.maxR - CFG.minR);
      this.vx = (Math.random() - .5) * .4;
      this.vy = -(CFG.minSpeed + Math.random() * (CFG.maxSpeed - CFG.minSpeed));
      this.alpha = .15 + Math.random() * .45;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10) this.reset();
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CFG.color},${this.alpha})`;
      ctx.fill();
    }
  }

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };

  const build = () => {
    particles = Array.from({ length: CFG.count }, () => new Particle());
  };

  const drawLines = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CFG.lineDist) {
          const alpha = CFG.lineAlpha * (1 - dist / CFG.lineDist);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${CFG.lineColor},${alpha})`;
          ctx.lineWidth   = .5;
          ctx.stroke();
        }
      }
    }
  };

  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    drawLines();
    particles.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  };

  // Pausa cuando la tab está oculta
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      loop();
    }
  });

  window.addEventListener('resize', () => {
    resize();
    build();
  }, { passive: true });

  resize();
  build();
  loop();
})();


/* ══════════════════════════════════════════
   5. SCROLL REVEAL — entradas animadas
══════════════════════════════════════════ */
const ScrollReveal = (() => {
  const selectors = '.rv, .rl, .rr, .rs, .stagger';
  let   observer;

  const init = () => {
    const elements = document.querySelectorAll(selectors);
    if (!elements.length) return;

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    elements.forEach(el => observer.observe(el));
  };

  return { init };
})();


/* ══════════════════════════════════════════
   6. CONTADORES ANIMADOS (stats)
══════════════════════════════════════════ */
const Counters = (() => {
  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  const animateCount = (el, target, duration = 1800, suffix = '') => {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    const step = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(progress);
      const value    = isDecimal
        ? (eased * target).toFixed(1)
        : Math.round(eased * target);

      el.textContent = value + suffix;

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const init = () => {
    const items = document.querySelectorAll('[data-count]');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          animateCount(el, target, 1800, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    items.forEach(el => observer.observe(el));
  };

  return { init };
})();


/* ══════════════════════════════════════════
   7. RIPPLE EN BOTONES
══════════════════════════════════════════ */
const Ripple = (() => {
  const init = () => {
    document.querySelectorAll('.btn-primary, .btn-outline, .btn-gold, .ripple-wrap')
      .forEach(btn => {
        btn.classList.add('ripple-wrap');
        btn.addEventListener('click', createRipple);
      });
  };

  const createRipple = (e) => {
    const btn    = e.currentTarget;
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${x}px;
      top:    ${y}px;
    `;

    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  };

  document.addEventListener('DOMContentLoaded', init);
})();


/* ══════════════════════════════════════════
   8. TICKER — pausa en hover
══════════════════════════════════════════ */
const Ticker = (() => {
  const ticker = document.getElementById('ticker');
  if (!ticker) return;

  const track = ticker.querySelector('.tk-track');
  if (!track) return;

  // Duplicar contenido para loop infinito
  track.innerHTML += track.innerHTML;

  ticker.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  ticker.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
})();


/* ══════════════════════════════════════════
   9. BOTÓN WHATSAPP FLOTANTE
══════════════════════════════════════════ */
const WAF = (() => {
  const btn = document.getElementById('waf');
  if (!btn) return;

  // Número de Antezana (actualizar con número real)
  const PHONE   = '51999999999'; // +51 XXX XXX XXX
  const MESSAGE = encodeURIComponent('Hola, quisiera información sobre sus servicios y rutas. ¿Me pueden ayudar?');

  btn.setAttribute('href', `https://wa.me/${PHONE}?text=${MESSAGE}`);
  btn.setAttribute('target', '_blank');
  btn.setAttribute('rel', 'noopener noreferrer');
  btn.setAttribute('aria-label', 'Contactar por WhatsApp');

  // Aparecer con delay al cargar
  btn.style.opacity    = '0';
  btn.style.transform  = 'scale(.7) translateY(20px)';
  btn.style.transition = 'opacity .45s ease, transform .45s cubic-bezier(.16,1,.3,1)';

  setTimeout(() => {
    btn.style.opacity   = '1';
    btn.style.transform = 'scale(1) translateY(0)';
  }, 3600);
})();


/* ══════════════════════════════════════════
   10. PARALLAX — imagen hero en scroll
══════════════════════════════════════════ */
const Parallax = (() => {
  const bg = document.querySelector('.parallax-bg');
  if (!bg || window.matchMedia('(max-width: 768px)').matches) return;

  const update = () => {
    const y = window.scrollY;
    bg.style.transform = `translateY(${y * .38}px)`;
  };

  window.addEventListener('scroll', update, { passive: true });
})();


/* ══════════════════════════════════════════
   11. TRANSICIÓN ENTRE PÁGINAS
══════════════════════════════════════════ */
const PageTransition = (() => {
  const curtain = document.getElementById('page-curtain');
  if (!curtain) return;

  // Entrada — quitar cortina al cargar
  curtain.classList.add('out');
  curtain.addEventListener('animationend', () => {
    curtain.classList.remove('out');
    curtain.style.display = 'none';
  }, { once: true });

  // Salida — agregar cortina al navegar
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');

    // Solo links internos .html
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      curtain.style.display = 'block';
      curtain.classList.add('in');

      curtain.addEventListener('animationend', () => {
        window.location.href = href;
      }, { once: true });
    });
  });
})();


/* ══════════════════════════════════════════
   12. TOAST — sistema de notificaciones
══════════════════════════════════════════ */
const Toast = (() => {
  let current = null;

  const show = (title, msg, duration = 3800) => {
    if (current) {
      current.classList.add('hide');
      setTimeout(() => current?.remove(), 350);
    }

    const toast = document.createElement('div');
    toast.className  = 'toast';
    toast.innerHTML  = `
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    `;

    document.body.appendChild(toast);
    current = toast;

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => {
        toast.remove();
        if (current === toast) current = null;
      }, 350);
    }, duration);
  };

  // Exponer globalmente para uso en otras páginas
  window.AntezanaToast = { show };

  return { show };
})();


/* ══════════════════════════════════════════
   13. EFECTO MAGNÉTICO EN BOTONES CTA
══════════════════════════════════════════ */
const Magnetic = (() => {
  const btns = document.querySelectorAll('.magnetic');
  if (!btns.length || window.matchMedia('(max-width: 768px)').matches) return;

  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) * .32;
      const dy     = (e.clientY - cy) * .32;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
      btn.style.transform  = 'translate(0, 0)';
      setTimeout(() => btn.style.transition = '', 500);
    });
  });
})();


/* ══════════════════════════════════════════
   14. SMOOTH SCROLL — anchors internos
══════════════════════════════════════════ */
const SmoothScroll = (() => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const offset = 100; // altura navbar + ticker
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ══════════════════════════════════════════
   15. LAZY LOAD — imágenes
══════════════════════════════════════════ */
const LazyLoad = (() => {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src   = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px' });

  images.forEach(img => {
    img.style.transition = 'opacity .4s ease';
    img.style.opacity    = '0';
    img.addEventListener('load', () => { img.style.opacity = '1'; });
    observer.observe(img);
  });
})();


/* ══════════════════════════════════════════
   16. GLITCH — activar en hover sobre título
══════════════════════════════════════════ */
const GlitchEffect = (() => {
  const titles = document.querySelectorAll('.glitch');
  if (!titles.length) return;

  titles.forEach(el => {
    // Sincronizar data-text con textContent
    if (!el.dataset.text) {
      el.dataset.text = el.textContent;
    }
  });
})();


/* ══════════════════════════════════════════
   17. FORMULARIO — validación básica
══════════════════════════════════════════ */
const FormValidation = (() => {
  const forms = document.querySelectorAll('form[data-validate]');
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'var(--az-red)';
          field.addEventListener('input', () => {
            field.style.borderColor = '';
          }, { once: true });
        }
      });

      if (valid) {
        Toast.show('¡Mensaje enviado!', 'Nos comunicaremos contigo pronto.');
        form.reset();
      } else {
        Toast.show('Campos incompletos', 'Por favor, completa todos los campos requeridos.');
      }
    });
  });
})();


/* ══════════════════════════════════════════
   18. INIT GLOBAL — cuando el DOM carga
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Forzar scroll reveal si no hay loader
  if (!document.getElementById('loader')) {
    ScrollReveal.init();
    Counters.init();
  }

  // Clases utilitarias dinámicas
  document.body.classList.add('js-ready');

  // Año dinámico en footer
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  console.log('%c ANTEZANA ', 'background:#C8201F;color:#fff;font-size:14px;font-weight:bold;padding:4px 8px;border-radius:4px;', '— Transporte & Turismo Premium');
});