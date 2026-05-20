# UrbanOva Realty 🏢

Bienvenido a **UrbanOva Realty**, una plataforma moderna de bienes raíces urbanos. Este proyecto es un sitio web completamente funcional para explorar y contactar sobre propiedades inmobiliarias.

## 🎯 Características

✅ **Página Principal Atractiva** - Hero section con propiedades destacadas
✅ **Catálogo de Propiedades** - 6 propiedades de demostración con detalles completos
✅ **Sistema de Búsqueda Avanzada** - Filtros por ubicación, tipo y presupuesto
✅ **Favoritos Persistentes** - Guarda tus propiedades favoritas en localStorage
✅ **Formulario de Contacto** - Ponte en contacto directamente con los agentes
✅ **Información de Agentes** - Conoce al equipo de profesionales
✅ **Mapa Interactivo** - Ubicación de la oficina principal
✅ **Diseño Responsivo** - Perfecto en móviles, tablets y desktops
✅ **Newsletter** - Suscríbete para recibir las mejores ofertas

## 📁 Estructura del Proyecto

```
urbanova-realty/
├── index.html           # Página de inicio
├── propiedades.html     # Catálogo de propiedades
├── contacto.html        # Página de contacto
├── style.css            # Estilos CSS
├── script.js            # Lógica JavaScript
└── README.md            # Este archivo
```

## 🚀 Cómo Usar

### 1. **Descargar el Proyecto**
```bash
git clone https://github.com/yosea04-tech/urbanova-realty.git
cd urbanova-realty
```

### 2. **Abrir Localmente**
- Abre `index.html` con tu navegador favorito
- O usa Live Server en VS Code para mejor experiencia

### 3. **Subir a Hostinger**

#### Opción A: Usar FileZilla (FTP)
1. Descarga [FileZilla](https://filezilla-project.org/)
2. Ve a tu panel de Hostinger → Hosting → Gestor de FTP
3. Copia: Host, Usuario, Contraseña
4. Abre FileZilla y conecta con esas credenciales
5. Navega a `/public_html`
6. Arrastra los archivos del proyecto

#### Opción B: Usar Administrador de Archivos
1. Panel Hostinger → Administrador de Archivos
2. Navega a `/public_html`
3. Crea una carpeta llamada `urbanova-realty`
4. Sube todos los archivos HTML, CSS y JS

#### Opción C: Usar Git (Avanzado)
```bash
# En tu servidor Hostinger vía SSH
git clone https://github.com/yosea04-tech/urbanova-realty.git
```

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `style.css`:
```css
:root {
    --primary: #00b4d8;      /* Color principal (azul) */
    --secondary: #0077b6;    /* Color secundario */
    --dark: #003d5c;         /* Texto oscuro */
}
```

### Agregar Propiedades
Edita el array `propiedades` en `script.js`:
```javascript
const propiedades = [
    {
        id: 1,
        titulo: "Tu propiedad",
        precio: 500000,
        tipo: "apartamento",
        ubicacion: "Centro",
        habitaciones: 3,
        baños: 2,
        area: 120,
        descripcion: "Descripción...",
        agente: "Nombre",
        foto: "🏢"
    },
    // Más propiedades...
];
```

### Cambiar Información de Contacto
Busca en los archivos HTML y actualiza:
- Email
- Teléfono
- Dirección
- Nombres de agentes

## 💻 Tecnologías Usadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsivos
- **JavaScript Vanilla** - Funcionalidades dinámicas sin dependencias
- **LocalStorage** - Para guardar favoritos

## 🔧 Funcionalidades JavaScript

### Búsqueda y Filtros
```javascript
buscarPropiedades()     // Busca propiedades por criterios
filtrarPropiedades()    // Filtra el catálogo completo
```

### Favoritos
```javascript
toggleFavorito(id)      // Agregar/quitar de favoritos
```

### Contacto
```javascript
enviarFormularioContacto()  // Procesa el formulario
contactar(id)               // Abre formulario con propiedad preseleccionada
```

## 📱 Características Responsivas

El sitio se adapta perfectamente a:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1200px+)

## 🌍 Despliegue Recomendado

| Proveedor | Precio | Recomendación |
|-----------|--------|---|
| **Hostinger** | $2.99/mes | ⭐⭐⭐⭐⭐ Mejor relación precio-rendimiento |
| **Namecheap** | $2.98/mes | ⭐⭐⭐⭐ Excelente soporte |
| **Bluehost** | $2.95/mes | ⭐⭐⭐⭐ Fácil de usar |
| **GitHub Pages** | Gratis | ⭐⭐⭐ Para solo HTML/CSS/JS estáticos |

## 🔐 Consideraciones de Seguridad

⚠️ **Nota**: El formulario de contacto en esta versión está configurado para demostración. Para producción:

1. Configura backend para procesar emails
2. Valida datos en servidor (no solo cliente)
3. Usa HTTPS (requerido en Hostinger)
4. Implementa protección CSRF
5. Sanitiza inputs del usuario

## 📧 Integraciones Sugeridas

- **SendGrid** - Para enviar emails
- **Stripe/PayPal** - Para pagos
- **Google Maps API** - Para mapas mejorados
- **Firebase** - Para base de datos en la nube

## 🐛 Solución de Problemas

### Los estilos no se cargan
- Verifica que `style.css` esté en el mismo directorio
- Abre la consola (F12) para ver errores

### Los favoritos no se guardan
- Asegúrate de que localStorage esté habilitado
- Limpia el caché del navegador

### El formulario no envía emails
- Necesitas un backend (PHP, Node, etc.)
- Implementa EmailJS o similar para envío directo

## 📄 Licencia

Este proyecto está disponible bajo la Licencia MIT. Siéntete libre de usarlo y modificarlo.

## 👨‍💼 Autor

**UrbanOva Realty** - Creado con ❤️ para profesionales de bienes raíces

---

¿Necesitas ayuda? Contacta con nuestro equipo:
- 📧 **Email**: info@urbanovarealty.com
- 📞 **Teléfono**: +1 (555) 123-4567
- 🌐 **Web**: www.urbanovarealty.com

**¡Gracias por usar UrbanOva Realty!** 🚀