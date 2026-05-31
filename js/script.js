/* ── Urbanova Realty Solutions — Enhanced Script ── */

const qs = (s, r = document) => r.querySelector(s);
const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
const WHATSAPP_NUMBER = '522219490999';

function formatMoney(v) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(v);
}
function toPositiveNumber(v) {
  const n = Number(String(v).replace(/[^\d.]/g, ''));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/* ── WhatsApp ── */

function openWhatsApp(msg) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

function setupWhatsAppLinks() {
  qsa('[data-whatsapp]').forEach(el => {
    const msg = el.getAttribute('data-message') || 'Hola, quiero recibir asesoria de Urbanova Realty Solutions.';
    el.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

/* ── Menu ── */

function setupMenu() {
  const btn = qs('.menu-toggle');
  const nav = qs('.site-nav');
  if (!btn || !nav) return;
  const close = () => { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
  nav.addEventListener('click', e => { if (e.target instanceof Element && e.target.matches('a')) close(); });
  document.addEventListener('click', e => {
    if (!(e.target instanceof Node) || !nav.classList.contains('open')) return;
    if (nav.contains(e.target) || btn.contains(e.target)) return;
    close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) close(); });
}

/* ── Property Filters ── */

function setupPropertyFilters() {
  const btns = qsa('[data-filter]');
  const cards = qsa('.property-item');
  if (!btns.length || !cards.length) return;
  btns.forEach(b => {
    b.addEventListener('click', () => {
      const f = b.dataset.filter || 'all';
      btns.forEach(i => i.classList.remove('active'));
      b.classList.add('active');
      cards.forEach(c => {
        const credits = (c.dataset.credit || '').split(/\s+/).filter(Boolean);
        c.classList.toggle('is-hidden', f !== 'all' && !credits.includes(f));
      });
    });
  });
}

/* ── Contact Form ── */

function buildContactMessage(form) {
  const name = qs('#contactName', form)?.value.trim() || 'No indicado';
  const whatsapp = qs('#contactWhatsapp', form)?.value.trim() || 'No indicado';
  const email = qs('#contactEmail', form)?.value.trim() || 'No indicado';
  const purpose = qs('#contactPurpose', form)?.value || 'No indicado';
  const purchaseType = qs('#contactPurchaseType', form)?.value || 'No indicado';
  const budget = qs('#contactBudget', form)?.value.trim() || 'No indicado';
  const zone = qs('#contactZone', form)?.value.trim() || 'No indicado';
  const message = qs('#contactMessage', form)?.value.trim() || 'Sin mensaje adicional';
  return [
    'Hola, quiero recibir asesoria de Urbanova Realty Solutions.',
    `Nombre: ${name}`,
    `WhatsApp: ${whatsapp}`,
    `Correo: ${email}`,
    `Estoy buscando: ${purpose}`,
    `Tipo de credito: ${purchaseType}`,
    `Presupuesto: ${budget}`,
    `Zona de interes: ${zone}`,
    `Mensaje: ${message}`,
    'Autorizo que Urbanova me contacte por WhatsApp, llamada o correo.',
  ].join('\n');
}

function setupContactForm() {
  const form = qs('#contactForm');
  if (!form) return;
  const errorBox = qs('#contactError');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = qs('#contactName', form)?.value.trim();
    const whatsapp = qs('#contactWhatsapp', form)?.value.trim();
    const purpose = qs('#contactPurpose', form)?.value.trim();
    const purchaseType = qs('#contactPurchaseType', form)?.value.trim();
    const budget = qs('#contactBudget', form)?.value.trim();
    const zone = qs('#contactZone', form)?.value.trim();
    if (!name || !whatsapp || !purpose || !purchaseType || !budget || !zone) {
      if (errorBox) errorBox.textContent = 'Completa todos los campos requeridos.';
      return;
    }
    if (!/^\+?[\d\s()-]{8,}$/.test(whatsapp)) {
      if (errorBox) errorBox.textContent = 'Ingresa un número de teléfono válido.';
      return;
    }
    if (errorBox) errorBox.textContent = '';
    openWhatsApp(buildContactMessage(form));
  });
}

/* ── Simulator ── */

function calculateFixedPayment(principal, monthlyRate, months) {
  if (months <= 0) return 0;
  if (monthlyRate <= 0) return principal / months;
  const growth = (1 + monthlyRate) ** months;
  const denom = growth - 1;
  return denom === 0 ? principal / months : principal * ((monthlyRate * growth) / denom);
}

function setupFinancingSimulator() {
  const form = qs('#financingSimulator');
  if (!form) return;
  const calcBtn = qs('#simCalculateButton', form);
  const resultBox = qs('#simResults');
  const errorBox = qs('#simError');
  const sendBtn = qs('#sendSimulationButton');
  const sendArea = qs('#simActions');
  let lastResult = null;

  const run = () => {
    const price = toPositiveNumber(qs('#simPrice', form)?.value);
    const down = toPositiveNumber(qs('#simDownPayment', form)?.value);
    const months = Math.trunc(toPositiveNumber(qs('#simTermMonths', form)?.value));
    const rate = toPositiveNumber(qs('#simRate', form)?.value);

    if (price <= 0 || months <= 0) {
      if (errorBox) errorBox.textContent = 'Ingresa precio y plazo válidos para calcular.';
      return false;
    }
    if (down > price) {
      if (errorBox) errorBox.textContent = 'El enganche no puede ser mayor que el precio.';
      return false;
    }
    if (errorBox) errorBox.textContent = '';

    const financed = price - down;
    const monthlyRate = rate > 0 ? rate / 100 / 12 : 0;
    const monthly = calculateFixedPayment(financed, monthlyRate, months);

    lastResult = { price, down, financed, months, monthly, rate };

    if (resultBox) {
      qs('#resultPrice', resultBox).textContent = formatMoney(price);
      qs('#resultDownPayment', resultBox).textContent = formatMoney(down);
      qs('#resultFinanced', resultBox).textContent = formatMoney(financed);
      qs('#resultTerm', resultBox).textContent = `${months} meses`;
      qs('#resultMonthly', resultBox).textContent = formatMoney(monthly);
      resultBox.hidden = false;
    }
    if (sendArea) { sendArea.style.display = 'flex'; } else if (sendBtn) { sendBtn.hidden = false; }
    return true;
  };

  calcBtn?.addEventListener('click', run);
  form.addEventListener('submit', e => { e.preventDefault(); run(); });

  sendBtn?.addEventListener('click', () => {
    if (!lastResult) return;
    const msg = [
      'Hola, hice una simulación con Urbanova Realty Solutions.',
      `Precio: ${formatMoney(lastResult.price)}`,
      `Enganche: ${formatMoney(lastResult.down)}`,
      `Monto a financiar: ${formatMoney(lastResult.financed)}`,
      `Plazo: ${lastResult.months} meses`,
      `Pago mensual estimado: ${formatMoney(lastResult.monthly)}`,
      'Quiero que un asesor revise mi caso.',
    ].join('\n');
    openWhatsApp(msg);
  });
}

/* ── Footer Year ── */

function setupFooterYear() {
  const y = String(new Date().getFullYear());
  qsa('#footer-year, .footer-year').forEach(n => { n.textContent = y; });
}

/* ── Scroll Reveal ── */

function setupScrollReveal() {
  const els = qsa('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ── Animated Counters ── */

function setupCounters() {
  const counters = qsa('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.getAttribute('data-count')) || 0;
      const duration = 1500;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) * (1 - progress) * (1 - progress);
        const current = Math.round(eased * target);
        el.textContent = current.toLocaleString('es-MX');
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target.toLocaleString('es-MX');
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ── Credit Accordion ── */

function setupCreditAccordion() {
  const accordion = document.querySelector('.credit-accordion');
  if (!accordion) return;
  const details = accordion.querySelectorAll('details');
  details.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        details.forEach(other => {
          if (other !== d) other.removeAttribute('open');
        });
      }
    });
  });
}

/* ── Search Overlay ── */

const SEARCH_INDEX = [
  { title: 'Inicio', url: '/' },
  { title: 'Propiedades', url: '/propiedades' },
  { title: 'Créditos', url: '/creditos' },
  { title: 'Crédito INFONAVIT', url: '/creditos/infonavit' },
  { title: 'Crédito FOVISSSTE', url: '/creditos/fovissste' },
  { title: 'Crédito Bancario', url: '/creditos/bancario' },
  { title: 'Crédito CFE', url: '/creditos/cfe' },
  { title: 'Crédito Banjercito', url: '/creditos/banjercito' },
  { title: 'Compra de Contado', url: '/creditos/contado' },
  { title: 'Financiamiento personalizado', url: '/financiamiento' },
  { title: 'Simulador de financiamiento', url: '/financiamiento#simulador' },
  { title: 'Nosotros', url: '/nosotros' },
  { title: 'Contacto', url: '/contacto' },
  { title: 'Aviso de privacidad', url: '/aviso-de-privacidad' },
  { title: 'Términos y condiciones', url: '/terminos-y-condiciones' },
];

function setupSearchOverlay() {
  const toggle = qs('.search-toggle');
  if (!toggle) return;
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.innerHTML = `<button class="search-close" type="button" aria-label="Cerrar búsqueda">&times;</button><div class="search-panel"><input class="search-input" type="search" placeholder="Buscar páginas, créditos..." autocomplete="off" aria-label="Buscar"><div class="search-results"></div></div>`;
  document.body.appendChild(overlay);
  const input = qs('.search-input', overlay);
  const results = qs('.search-results', overlay);
  const close = qs('.search-close', overlay);

  const open = () => { overlay.classList.add('open'); setTimeout(() => input?.focus(), 100); };
  const closeSearch = () => { overlay.classList.remove('open'); input.value = ''; results.innerHTML = ''; };

  toggle.addEventListener('click', open);
  close.addEventListener('click', closeSearch);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); } });

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { results.innerHTML = ''; return; }
    const matches = SEARCH_INDEX.filter(item => item.title.toLowerCase().includes(q));
    results.innerHTML = matches.length ? matches.map(m => `<a class="search-result-item" href="${m.url}"><strong>${m.title}</strong></a>`).join('') : '<div class="search-result-item" style="cursor:default;">Sin resultados</div>';
  });
}

/* ── Image Gallery ── */

function setupImageGallery() {
  const cards = qsa('.property-card');
  if (!cards.length) return;

  const modal = document.createElement('div');
  modal.className = 'gallery-modal';
  modal.innerHTML = `<button class="gallery-close" type="button" aria-label="Cerrar">&times;</button><button class="gallery-prev" type="button" aria-label="Anterior">&#8249;</button><img src="" alt="Galería"><button class="gallery-next" type="button" aria-label="Siguiente">&#8250;</button>`;
  document.body.appendChild(modal);

  const img = qs('img', modal);
  const close = qs('.gallery-close', modal);
  const prev = qs('.gallery-prev', modal);
  const next = qs('.gallery-next', modal);

  let currentImages = [];
  let currentIndex = 0;

  const show = (idx) => {
    currentIndex = idx;
    img.src = currentImages[idx];
  };

  cards.forEach(card => {
    const media = qs('.property-card-media', card);
    if (!media) return;
    const cardImg = qs('img', media);
    media.addEventListener('click', () => {
      const allImgs = qsa('img', card);
      currentImages = allImgs.length ? allImgs.map(i => i.src) : [cardImg?.src || ''];
      currentIndex = 0;
      show(0);
      modal.classList.add('open');
    });
  });

  prev.addEventListener('click', () => { const idx = (currentIndex - 1 + currentImages.length) % currentImages.length; show(idx); });
  next.addEventListener('click', () => { const idx = (currentIndex + 1) % currentImages.length; show(idx); });
  close.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') modal.classList.remove('open');
    if (e.key === 'ArrowLeft') { prev.click(); }
    if (e.key === 'ArrowRight') { next.click(); }
  });
}

/* ── Toast ── */

function showToast(msg, duration = 3000) {
  let container = qs('.toast-container');
  if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(() => t.remove(), 300); }, duration);
}

/* ── Mobile bottom nav active ── */

function setupMobileNav() {
  const path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '';
  qsa('.mobile-bottom-nav a').forEach(a => {
    const href = a.getAttribute('href').replace(/\.html$/, '').replace(/\/$/, '') || '';
    if (href === path || (path.startsWith(href) && href !== '')) a.classList.add('active');
  });
}

/* ── Init ── */

function init() {
  setupMenu();
  setupWhatsAppLinks();
  setupCreditAccordion();
  setupPropertyFilters();
  setupContactForm();
  setupFinancingSimulator();
  setupFooterYear();
  setupScrollReveal();
  setupCounters();
  setupSearchOverlay();
  setupImageGallery();
  setupMobileNav();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
