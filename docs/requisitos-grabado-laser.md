# Requisitos Técnicos — Sitio Web de Grabado Láser

> **Estado:** Documento de planificación. No desarrollar hasta sesión específica.
> **Cliente:** Mismo dueño de Serigrafics
> **Ubicación:** Ocoyoacac, Estado de México (mismo taller físico)

---

## 1. Información General del Negocio

| Campo | Valor |
|-------|-------|
| **Nombre de la empresa** | Por definir por el dueño |
| **Servicio principal** | Grabado láser industrial y personalizado |
| **Ubicación** | Ocoyoacac, Estado de México |
| **Teléfono** | +52 55 7719 6924 |
| **Correo** | serigraficsc@gmail.com |
| **Horario** | Por confirmar (posiblemente 3:00 PM – 9:00 PM) |

## 2. Servicios a Ofrecer

### Grabado láser sobre:
- **Botellas y termos metálicos** (acero inoxidable, aluminio)
- **Vidrio** (botellas, vasos, copas)
- **Madera** (placas, portarretratos, artesanías)
- **Acrílico** (señalización, displays, trofeos)
- **Cuero/Piel** (carteras, llaveros, portadocumentos)
- **Metal** (placas industriales, reconocimientos, joyería)

### Posibles servicios adicionales:
- Corte láser (madera, acrílico, MDF)
- Marcaje industrial (números de serie, códigos QR, logotipos)

## 3. Estructura del Sitio (Fase Informativa)

### Páginas requeridas:
| Página | Contenido |
|--------|-----------|
| **Home** | Hero con imágenes de trabajos reales, servicios destacados, CTA a cotización |
| **Servicios** | Detalle de cada material con galería de imágenes y aplicaciones |
| **Portafolio** | Grid de trabajos reales filtrable por material |
| **Nosotros** | Historia, misión, visión, ubicación (mismo lugar que Serigrafics) |
| **Contacto** | WhatsApp, formulario anti-spam, mapa Google Maps |

### Características técnicas:
- Next.js 16 + React 19 + Tailwind CSS v4
- Animaciones Framer Motion (scroll reveal, page transitions)
- Formulario con envío de correo vía Resend
- CSP configurado para iframes y fuentes externas
- Navbar transparente sobre hero
- Diseño premium: fondo blanco, acento por definir

## 4. Imágenes Necesarias

El dueño deberá proporcionar:
- 3-5 fotos de alta calidad de trabajos de grabado láser para el hero/slider
- 12-20 fotos para el portafolio (variedad de materiales y productos)
- 1 foto por cada material/servicio para la sección de servicios
- Logo de la empresa (cuando esté definido)

## 5. Fase Futura (Posterior)

- Calculadora de cotización con matriz de precios por material/volumen
- Sistema de rastreo de pedidos (número de guía)
- Panel de administración interno
- Catálogo de productos con precios

## 6. Preguntas para el Dueño

- [ ] ¿Nombre definitivo de la empresa de grabado láser?
- [ ] ¿Dominio web deseado? (ej: grabadoslaser.com, laser-ocoyoacac.com)
- [ ] ¿Correo electrónico de contacto?
- [ ] ¿Color acento para la marca? (Serigrafics usa beige #8b7355)
- [ ] ¿Tiene logo o necesita que se diseñe?
- [ ] ¿El horario es el mismo que Serigrafics (3-9 PM)?
- [ ] ¿Ofrecerá también corte láser o solo grabado?
- [ ] ¿Tiene fotos de trabajos de grabado láser para el portafolio?

## 7. Stack Técnico Propuesto

| Componente | Tecnología |
|-----------|-----------|
| Framework | Next.js 16 (App Router) |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| Formulario | Resend (email) |
| Hosting | Vercel (gratuito) |
| Dominio | Por comprar |
| SSL | Automático (Vercel) |
| Fuentes | Fraunces + Manrope + JetBrains Mono |
