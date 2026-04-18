/* ============================================================
   DIGITAL GRUNGE — script.js
   ============================================================ */

/* ── DOM Ready ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initGlitchReveal();
  initHamburger();
  initFAQ();
  initActiveNav();
  initStampRipple();
  initTickerDupe();
  initScrollProgress();
  initStatCounters();
  initFormValidation();
  initCursorGlitch();
});

/* ── Glitch Reveal on Scroll ──────────────────────────────── */
function initGlitchReveal() {
  const targets = document.querySelectorAll('.glitch-reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
    observer.observe(el);
  });
}

/* ── Hamburger / Mobile Nav ───────────────────────────────── */
function initHamburger() {
  const btn  = document.querySelector('.hamburger');
  const nav  = document.querySelector('.mobile-nav');
  const close = document.querySelector('.mobile-nav-close');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeNav = () => {
    nav.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (close) close.addEventListener('click', closeNav);

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });
}

/* ── FAQ Accordion ────────────────────────────────────────── */
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = q.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-question.open').forEach(openQ => {
        openQ.classList.remove('open');
        openQ.nextElementSibling.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        q.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
}

/* ── Active Nav Highlight ─────────────────────────────────── */
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

/* ── Stamp Button Tactile Effect ──────────────────────────── */
function initStampRipple() {
  document.querySelectorAll('.btn-stamp').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.style.filter = 'brightness(0.9)';
    });
    btn.addEventListener('mouseup', () => {
      btn.style.filter = '';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.filter = '';
    });
  });
}

/* ── Ticker: Duplicate Content for Seamless Loop ─────────── */
function initTickerDupe() {
  document.querySelectorAll('.ticker-track').forEach(track => {
    const original = track.innerHTML;
    track.innerHTML = original + original; // seamless loop
  });
}

/* ── Scroll Progress Bar ──────────────────────────────────── */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  Object.assign(bar.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '3px',
    background: 'var(--crimson)',
    width: '0%',
    zIndex: '10001',
    transition: 'width 0.1s linear',
    boxShadow: '0 0 8px var(--crimson)',
  });
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${(scrolled / total) * 100}%`;
  });
}

/* ── Stat Counter Animation ───────────────────────────────── */
function initStatCounters() {
  const stats = document.querySelectorAll('[data-count]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 1200;
        const startTime = performance.now();
        const isDecimal = target % 1 !== 0;

        const tick = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = eased * target;
          el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

/* ── Form Validation (Contact page) ─────────────────────── */
function initFormValidation() {
  const form = document.querySelector('.contact-form-el');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = 'var(--crimson)';
        field.style.boxShadow = '4px 4px 0 var(--crimson)';
        valid = false;
      }
    });

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '✓ SENT!';
      btn.style.background = 'var(--green)';
      btn.style.borderColor = 'var(--charcoal)';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.borderColor = '';
        form.reset();
      }, 2500);
    }
  });
}

/* ── Cursor Glitch Effect (desktop) ──────────────────────── */
function initCursorGlitch() {
  if (window.matchMedia('(hover: none)').matches) return;

  let dots = [];
  const MAX = 8;
  const COLORS = ['var(--crimson)', 'var(--green)', 'var(--charcoal)'];

  for (let i = 0; i < MAX; i++) {
    const dot = document.createElement('div');
    Object.assign(dot.style, {
      position: 'fixed',
      width: '6px', height: '6px',
      borderRadius: '0',
      pointerEvents: 'none',
      zIndex: '99999',
      opacity: '0',
      transition: `opacity 0.3s ease`,
    });
    document.body.appendChild(dot);
    dots.push({ el: dot, x: 0, y: 0 });
  }

  let mx = 0, my = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;

    dots.forEach((dot, i) => {
      setTimeout(() => {
        const offset = (i - MAX / 2) * 2;
        dot.el.style.left = `${mx + offset}px`;
        dot.el.style.top  = `${my + offset}px`;
        dot.el.style.background = COLORS[i % COLORS.length];
        dot.el.style.opacity = `${0.6 - i * 0.07}`;
        dot.el.style.width  = `${4 + i}px`;
        dot.el.style.height = `${4 + i}px`;
      }, i * 12);
    });
  });

  document.addEventListener('mouseleave', () => {
    dots.forEach(d => d.el.style.opacity = '0');
  });
}

/* ── Typing Effect for Hero Headline ─────────────────────── */
function typeEffect(el, text, speed = 60, cb) {
  if (!el) return;
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (cb) cb();
    }
  }, speed);
}

/* ── Glitch Text Hover ────────────────────────────────────── */
document.querySelectorAll('[data-glitch]').forEach(el => {
  const original = el.textContent;
  const chars = '!@#$%^&*0123456789';
  let glitchTimeout;

  el.addEventListener('mouseenter', () => {
    let iterations = 0;
    clearInterval(glitchTimeout);
    glitchTimeout = setInterval(() => {
      el.textContent = original.split('').map((c, idx) => {
        if (idx < iterations) return original[idx];
        if (c === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      iterations += 1;
      if (iterations > original.length) {
        clearInterval(glitchTimeout);
        el.textContent = original;
      }
    }, 40);
  });

  el.addEventListener('mouseleave', () => {
    clearInterval(glitchTimeout);
    el.textContent = original;
  });
});

/* ── Noise Canvas Overlay (extra punch) ──────────────────── */
(function() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed; inset: 0;
    pointer-events: none; z-index: 9997;
    opacity: 0.03; mix-blend-mode: overlay;
  `;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function drawNoise() {
    const w = canvas.width, h = canvas.height;
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = data[i+1] = data[i+2] = v;
      data[i+3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(drawNoise);
  }
  drawNoise();
})();
