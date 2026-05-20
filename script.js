const WHATSAPP_NUMBER = "525646514956";

const propiedades = [
  {
    id: 1,
    titulo: "Departamento moderno con terraza y luz natural",
    precio: 4200000,
    tipo: "departamento",
    categoria: "Departamentos",
    ubicacion: "Lomas de Tecamachalco",
    recamaras: 2,
    banos: 2,
    area: 210,
    etiqueta: "Terraza privada",
    descripcion: "Ideal para quien busca amplitud, ubicación residencial y una propiedad lista para visitar.",
    imagen: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    titulo: "Casa funcional para vivir cómodo todos los días",
    precio: 3650000,
    tipo: "casa",
    categoria: "Casas",
    ubicacion: "Fuentes de Satélite",
    recamaras: 3,
    banos: 2,
    area: 158,
    etiqueta: "Calle tranquila",
    descripcion: "Una opción práctica por distribución, conexión con zonas clave y espacios familiares.",
    imagen: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    titulo: "Casa de una planta, abierta y lista para habitar",
    precio: 5190000,
    tipo: "casa",
    categoria: "Premium",
    ubicacion: "Las Alamedas",
    recamaras: 3,
    banos: 4,
    area: 240,
    etiqueta: "Remodelada",
    descripcion: "Frente a parque, en esquina y con una sensación más amplia desde la primera visita.",
    imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    titulo: "Departamento práctico cerca de vías principales",
    precio: 2850000,
    tipo: "departamento",
    categoria: "Departamentos",
    ubicacion: "Naucalpan Centro",
    recamaras: 2,
    banos: 2,
    area: 96,
    etiqueta: "Buena conexión",
    descripcion: "Excelente alternativa para primera compra o inversión por ubicación y mantenimiento.",
    imagen: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80"
  }
];

const formatCurrency = (value) =>
  value.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

function toggleMenu() {
  document.getElementById("navLinks")?.classList.toggle("open");
}

function propertyMessage(propiedad) {
  return encodeURIComponent(`Hola Urbanova, quiero información y visita para: ${propiedad.titulo} en ${propiedad.ubicacion}.`);
}

function crearTarjetaPropiedad(propiedad, index = 0) {
  const delayClass = `reveal-delay-${Math.min((index % 3) + 1, 3)}`;
  return `
    <article class="property-card reveal ${delayClass}">
      <div class="property-media">
        <img src="${propiedad.imagen}" alt="${propiedad.titulo}" loading="lazy">
        <span class="badge">${propiedad.etiqueta}</span>
      </div>
      <div class="property-info">
        <span class="property-location">${propiedad.ubicacion}</span>
        <h3>${propiedad.titulo}</h3>
        <p>${propiedad.descripcion}</p>
        <div class="property-meta">
          <span>${propiedad.area} m²</span>
          <span>${propiedad.recamaras} rec.</span>
          <span>${propiedad.banos} baños</span>
        </div>
        <div class="property-price">${formatCurrency(propiedad.precio)}</div>
        <div class="card-actions">
          <a class="btn btn-primary" href="https://wa.me/${WHATSAPP_NUMBER}?text=${propertyMessage(propiedad)}" target="_blank" rel="noopener">Agendar visita</a>
          <button class="btn btn-outline" type="button" onclick="verDetalles(${propiedad.id})">Detalles</button>
        </div>
      </div>
    </article>
  `;
}

function renderPropiedades(lista = propiedades, targetId = "propertiesContainer") {
  const target = document.getElementById(targetId);
  if (!target) return;

  target.innerHTML = lista.map((p, index) => crearTarjetaPropiedad(p, index)).join("");

  const resultCount = document.getElementById("resultCount");
  if (resultCount) resultCount.textContent = lista.length;

  const noResults = document.getElementById("noResults");
  if (noResults) noResults.style.display = lista.length ? "none" : "block";

  prepareRevealAnimations();
}

function renderDestacadas() {
  const target = document.getElementById("featuredProperties");
  if (!target) return;
  target.innerHTML = propiedades.slice(0, 3).map((p, index) => crearTarjetaPropiedad(p, index)).join("");
  prepareRevealAnimations();
}

function aplicarFiltros() {
  const tipo = document.getElementById("filterType")?.value || "";
  const presupuesto = Number(document.getElementById("filterBudget")?.value) || Infinity;
  const zona = (document.getElementById("filterLocation")?.value || "").toLowerCase();

  const filtradas = propiedades.filter((p) => {
    const matchTipo = !tipo || p.tipo === tipo || p.categoria === tipo;
    const matchPresupuesto = p.precio <= presupuesto;
    const matchZona = !zona || p.ubicacion.toLowerCase().includes(zona);
    return matchTipo && matchPresupuesto && matchZona;
  });

  renderPropiedades(filtradas);
}

function limpiarFiltros() {
  ["filterType", "filterBudget", "filterLocation"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  renderPropiedades(propiedades);
}

function verDetalles(id) {
  const p = propiedades.find((item) => item.id === id);
  if (!p) return;
  alert(`${p.titulo}\n\nUbicación: ${p.ubicacion}\nPrecio: ${formatCurrency(p.precio)}\nÁrea: ${p.area} m²\nRecámaras: ${p.recamaras}\nBaños: ${p.banos}\n\n${p.descripcion}`);
}

function animateMoney(element, finalValue) {
  if (!element || !Number.isFinite(finalValue)) return;
  const startValue = Number(element.dataset.value || 0);
  const duration = 520;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startValue + (finalValue - startValue) * eased;
    element.textContent = formatCurrency(current);
    if (progress < 1) requestAnimationFrame(tick);
    else element.dataset.value = String(finalValue);
  }

  requestAnimationFrame(tick);
}

function calcularPago() {
  const price = Number(document.getElementById("propertyPrice")?.value) || 0;
  const down = Number(document.getElementById("downPayment")?.value) || 0;
  const years = Number(document.getElementById("loanYears")?.value) || 15;
  const annualRate = 0.109;
  const monthlyRate = annualRate / 12;
  const months = years * 12;
  const principal = price * (1 - down / 100);
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  const target = document.getElementById("estimatedPayment");
  animateMoney(target, payment);
}

function enviarFormularioContacto(event) {
  event.preventDefault();
  const form = event.target;
  const nombre = form.nombre.value.trim();
  const telefono = form.telefono.value.trim();
  const presupuesto = form.presupuesto.value.trim();
  const mensaje = form.mensaje.value.trim();

  const texto = encodeURIComponent(`Hola Urbanova, soy ${nombre}. Mi teléfono es ${telefono}. Presupuesto: ${presupuesto || "por definir"}. ${mensaje}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, "_blank", "noopener");
  form.reset();

  const alertBox = document.getElementById("formAlert");
  if (alertBox) textBounce(alertBox, "Se abrió WhatsApp con tu mensaje listo para enviar.");
}

let revealObserver;
function prepareRevealAnimations() {
  const elements = document.querySelectorAll(".section, .page-hero, .step-card, .simulator-card, .cta-card, .contact-panel, .filters-panel, .property-card");
  elements.forEach((el, index) => {
    el.classList.add("reveal");
    if (!el.classList.contains("property-card") && !el.classList.contains("step-card")) {
      el.classList.add(`reveal-delay-${Math.min((index % 3) + 1, 3)}`);
    }
  });

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -70px 0px" });
  }

  document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => revealObserver.observe(el));
}

function textBounce(element, text) {
  element.textContent = text;
  element.animate(
    [
      { transform: "translateY(8px)", opacity: 0 },
      { transform: "translateY(-2px)", opacity: 1 },
      { transform: "translateY(0)", opacity: 1 }
    ],
    { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderDestacadas();
  renderPropiedades();
  calcularPago();
  prepareRevealAnimations();
});
