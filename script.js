// Base de datos de propiedades
const propiedades = [
    {
        id: 1,
        titulo: "Apartamento Moderno en Centro",
        precio: 350000,
        tipo: "apartamento",
        ubicacion: "Centro",
        habitaciones: 3,
        baños: 2,
        area: 120,
        descripcion: "Hermoso apartamento con vista al parque, cocina integrada y balcón privado.",
        agente: "Carlos Mendez",
        telefono: "+1-5551234567",
        imagen: "🏢"
    },
    {
        id: 2,
        titulo: "Casa Familiar en Zona Residencial",
        precio: 550000,
        tipo: "casa",
        ubicacion: "Zona Residencial",
        habitaciones: 4,
        baños: 3,
        area: 250,
        descripcion: "Casa de dos plantas con jardín, garaje y piscina. Perfecta para familias.",
        agente: "Ana García",
        telefono: "+1-5552345678",
        imagen: "🏠"
    },
    {
        id: 3,
        titulo: "Oficina Premium Empresarial",
        precio: 450000,
        tipo: "oficina",
        ubicacion: "Zona Empresarial",
        habitaciones: 5,
        baños: 2,
        area: 200,
        descripcion: "Oficina moderna con servicios completos, estacionamiento y área de espera.",
        agente: "Luis Rivera",
        telefono: "+1-5553456789",
        imagen: "🏢"
    },
    {
        id: 4,
        titulo: "Local Comercial en Avenida Principal",
        precio: 280000,
        tipo: "local",
        ubicacion: "Avenida Principal",
        habitaciones: 2,
        baños: 1,
        area: 85,
        descripcion: "Local comercial con alta afluencia, vitrina al frente y depósito posterior.",
        agente: "María López",
        telefono: "+1-5554567890",
        imagen: "🏪"
    },
    {
        id: 5,
        titulo: "Penthouse Lujoso con Terraza",
        precio: 850000,
        tipo: "apartamento",
        ubicacion: "Centro",
        habitaciones: 3,
        baños: 3,
        area: 300,
        descripcion: "Penthouse de lujo con terraza panorámica, piscina privada y gimnasio.",
        agente: "Carlos Mendez",
        telefono: "+1-5551234567",
        imagen: "🏰"
    },
    {
        id: 6,
        titulo: "Casa de Campo con Piscina",
        precio: 650000,
        tipo: "casa",
        ubicacion: "Zona Rural",
        habitaciones: 5,
        baños: 4,
        area: 400,
        descripcion: "Casa campestre con 2 hectáreas, piscina olímpica y cancha de tenis.",
        agente: "Ana García",
        telefono: "+1-5552345678",
        imagen: "🏡"
    }
];

// Función para crear tarjeta de propiedad
function crearTarjetaPropiedad(propiedad) {
    const isFavorite = isFavorite(propiedad.id);
    
    return `
        <div class="property-card">
            <div class="property-image">
                <span>${propiedad.imagen}</span>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorito(${propiedad.id})">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
                <div class="property-type">${propiedad.tipo.charAt(0).toUpperCase() + propiedad.tipo.slice(1)}</div>
            </div>
            <div class="property-info">
                <div class="property-price">$${propiedad.precio.toLocaleString()}</div>
                <h3 style="margin-bottom: 10px; font-size: 1.1rem;">${propiedad.titulo}</h3>
                <div class="property-details">
                    <span>🛏️ ${propiedad.habitaciones} hab.</span>
                    <span>🚿 ${propiedad.baños} baños</span>
                    <span>📐 ${propiedad.area} m²</span>
                </div>
                <div class="property-address">📍 ${propiedad.ubicacion}</div>
                <div class="property-description">${propiedad.descripcion}</div>
                <div style="font-size: 0.85rem; color: #666; margin-bottom: 15px;">
                    Agente: <strong>${propiedad.agente}</strong>
                </div>
                <div class="property-footer">
                    <button class="btn btn-details" onclick="verDetalles(${propiedad.id})">Ver Detalles</button>
                    <button class="btn btn-contact" onclick="contactarAgente(${propiedad.id})">Contactar</button>
                </div>
            </div>
        </div>
    `;
}

// Mostrar todas las propiedades
function mostrarTodasLasPropiedades() {
    const container = document.getElementById('propertiesContainer');
    const resultsInfo = document.getElementById('resultsInfo');
    const noResults = document.getElementById('noResults');
    
    container.innerHTML = propiedades.map(p => crearTarjetaPropiedad(p)).join('');
    
    resultsInfo.style.display = 'block';
    document.getElementById('resultCount').textContent = propiedades.length;
    noResults.style.display = 'none';
    
    // Mostrar también en featured de index
    if (document.getElementById('featuredProperties')) {
        document.getElementById('featuredProperties').innerHTML = propiedades
            .slice(0, 3)
            .map(p => crearTarjetaPropiedad(p))
            .join('');
    }
}

// Función para aplicar filtros
function aplicarFiltros() {
    const location = document.getElementById('filterLocation')?.value.toLowerCase() || '';
    const type = document.getElementById('filterType')?.value || '';
    const minPrice = parseInt(document.getElementById('filterMinPrice')?.value) || 0;
    const maxPrice = parseInt(document.getElementById('filterMaxPrice')?.value) || Infinity;
    const bedrooms = document.getElementById('filterBedrooms')?.value || '';

    const filtered = propiedades.filter(p => {
        const matchLocation = location === '' || p.ubicacion.toLowerCase().includes(location);
        const matchType = type === '' || p.tipo === type;
        const matchPrice = p.precio >= minPrice && p.precio <= maxPrice;
        const matchBedrooms = bedrooms === '' || p.habitaciones == bedrooms;
        
        return matchLocation && matchType && matchPrice && matchBedrooms;
    });

    mostrarResultados(filtered);
}

// Mostrar resultados filtrados
function mostrarResultados(results) {
    const container = document.getElementById('propertiesContainer');
    const resultsInfo = document.getElementById('resultsInfo');
    const noResults = document.getElementById('noResults');

    if (results.length === 0) {
        container.innerHTML = '';
        resultsInfo.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        container.innerHTML = results.map(p => crearTarjetaPropiedad(p)).join('');
        resultsInfo.style.display = 'block';
        document.getElementById('resultCount').textContent = results.length;
        noResults.style.display = 'none';
    }
}

// Buscar propiedades desde la página principal
function buscarPropiedades() {
    const location = document.getElementById('searchLocation')?.value.toLowerCase() || '';
    const type = document.getElementById('searchType')?.value || '';
    const budget = parseInt(document.getElementById('searchBudget')?.value) || Infinity;

    const results = propiedades.filter(p => {
        const matchLocation = location === '' || p.ubicacion.toLowerCase().includes(location);
        const matchType = type === '' || p.tipo === type;
        const matchBudget = p.precio <= budget;
        
        return matchLocation && matchType && matchBudget;
    });

    // Mostrar en propiedades.html si estamos ahí
    if (window.location.pathname.includes('propiedades.html') || window.location.href.includes('propiedades.html')) {
        mostrarResultados(results);
    } else {
        // Ir a propiedades.html con los resultados
        window.location.href = 'propiedades.html';
    }
}

// Limpiar filtros
function limpiarFiltros() {
    if (document.getElementById('filterLocation')) {
        document.getElementById('filterLocation').value = '';
        document.getElementById('filterType').value = '';
        document.getElementById('filterMinPrice').value = '';
        document.getElementById('filterMaxPrice').value = '';
        document.getElementById('filterBedrooms').value = '';
    }
    
    if (document.getElementById('searchLocation')) {
        document.getElementById('searchLocation').value = '';
        document.getElementById('searchType').value = '';
        document.getElementById('searchBudget').value = '';
    }
    
    mostrarTodasLasPropiedades();
}

// Gestión de favoritos (usando localStorage)
function toggleFavorito(id) {
    let favoritos = JSON.parse(localStorage.getItem('urbanova_favoritos')) || [];
    
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(fav => fav !== id);
    } else {
        favoritos.push(id);
    }
    
    localStorage.setItem('urbanova_favoritos', JSON.stringify(favoritos));
    
    // Actualizar UI
    actualizarBotonesFavoritos();
}

function isFavorite(id) {
    const favoritos = JSON.parse(localStorage.getItem('urbanova_favoritos')) || [];
    return favoritos.includes(id);
}

function actualizarBotonesFavoritos() {
    const botones = document.querySelectorAll('.favorite-btn');
    botones.forEach(btn => {
        const card = btn.closest('.property-card');
        if (card) {
            const id = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
            const isFav = isFavorite(id);
            btn.textContent = isFav ? '❤️' : '🤍';
            btn.classList.toggle('active', isFav);
        }
    });
}

// Ver detalles de propiedad
function verDetalles(id) {
    const propiedad = propiedades.find(p => p.id === id);
    if (propiedad) {
        alert(`
${propiedad.titulo}

Precio: $${propiedad.precio.toLocaleString()}
Ubicación: ${propiedad.ubicacion}
Habitaciones: ${propiedad.habitaciones}
Baños: ${propiedad.baños}
Área: ${propiedad.area} m²

${propiedad.descripcion}

Agente: ${propiedad.agente}
Teléfono: ${propiedad.telefono}
        `);
    }
}

// Contactar agente
function contactarAgente(id) {
    const propiedad = propiedades.find(p => p.id === id);
    if (propiedad) {
        const mensaje = `Estoy interesado en la propiedad: ${propiedad.titulo} (ID: ${propiedad.id})`;
        // Llenar el formulario de contacto si existe
        const form = document.getElementById('contactForm');
        if (form) {
            document.getElementById('contactProperty').value = id;
            form.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Si no hay formulario, ir a contacto.html
            window.location.href = 'contacto.html?property=' + id;
        }
    }
}

// Enviar formulario de contacto
function enviarFormularioContacto(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('#contactName')?.value || '';
    const email = form.querySelector('#contactEmail')?.value || '';
    const phone = form.querySelector('#contactPhone')?.value || '';
    const propertyId = form.querySelector('#contactProperty')?.value || 'N/A';
    const message = form.querySelector('#contactMessage')?.value || '';
    
    // Validar
    if (!name || !email || !phone || !message) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    // Mostrar confirmación
    alert(`¡Gracias ${name}! Tu mensaje ha sido enviado exitosamente.

Nos contactaremos a ${email} o ${phone} en breve.

Propiedad de interés: ${propertyId !== 'N/A' ? propiedades.find(p => p.id == propertyId)?.titulo || 'General' : 'Consulta General'}`);
    
    // Limpiar formulario
    form.reset();
    
    // En producción, aquí enviarías los datos a un servidor
    console.log({
        nombre: name,
        email: email,
        telefono: phone,
        propiedad: propertyId,
        mensaje: message,
        fecha: new Date().toLocaleString()
    });
}

// Suscribirse al newsletter
function suscribirse(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        alert('Por favor ingresa tu email');
        return;
    }
    
    alert(`¡Gracias por suscribirte! Recibirás las mejores ofertas en ${email}`);
    event.target.reset();
    
    // En producción, aquí guardarías el email en una base de datos
    console.log('Newsletter subscription:', { email, fecha: new Date().toLocaleString() });
}

// Inicializar cuando el documento carga
document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en la página de propiedades, cargar todas
    if (window.location.pathname.includes('propiedades.html') || window.location.href.includes('propiedades.html')) {
        mostrarTodasLasPropiedades();
    }
    
    // Si estamos en index.html, mostrar featured
    if (document.getElementById('featuredProperties')) {
        mostrarTodasLasPropiedades();
    }
    
    // Actualizar UI de favoritos
    actualizarBotonesFavoritos();
});