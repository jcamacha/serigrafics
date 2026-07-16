# Rediseño con Animaciones — Plan de Implementación

> **For Hermes:** Delegar a AGY (2 agentes en paralelo). NO codificar manualmente.

**Goal:** Implementar sistema de animaciones premium (tipo Mount Street Printers) usando Framer Motion en Next.js 16.

**Architecture:** Framer Motion para transiciones de página + scroll-reveal + layout animations en portafolio. AnimatePresence en layout raíz. Microinteracciones en calculadora con number transitions.

**Tech Stack:** framer-motion, Next.js 16, Tailwind CSS v4, React 19

---

## Agente 1: Infraestructura + Page Transitions + Scroll Reveal

### Instalar dependencia
```bash
npm install framer-motion
```

### Archivos a modificar:

#### 1. `src/app/layout.tsx` — Envolver con AnimatePresence
- Importar `AnimatePresence` de framer-motion
- Envolver `{children}` en `<AnimatePresence mode="wait">`
- Añadir key basado en pathname para que las transiciones funcionen al navegar
- Crear un componente `PageTransition` que haga fade-in + slide-up suave

#### 2. `src/components/SectionReveal.tsx` — NUEVO componente wrapper
- Componente que envuelve cualquier sección y le aplica scroll-reveal
- Usa `motion.div` con `initial={{ opacity: 0, y: 40 }}` y `whileInView={{ opacity: 1, y: 0 }}`
- Props: children, delay opcional
- viewport: once=true, margin="-100px"

#### 3. `src/app/page.tsx` — Envolver secciones con SectionReveal
- Envolver cada `<section>` con `<SectionReveal>`
- NO envolver la primera sección (header) — debe aparecer inmediata
- Servicios, Portafolio, FAQ, Garantía, CTA: todas con scroll-reveal

#### 4. `src/app/globals.css` — Eliminar animación CSS nativa
- La animación dropdown actual usa CSS @keyframes. Reemplazar con Framer Motion `AnimatePresence` en el dropdown del Header

### Verificación
```bash
npm run build
# Debe compilar sin errores
```

---

## Agente 2: Portafolio Animado + Microinteracciones Calculadora

### Archivos a modificar:

#### 1. `src/app/page.tsx` — Portafolio con filtro animado
- Añadir botones de filtro arriba del grid: "Todos", "Serigrafía", "Sublimación", "Grabado láser", "Lonas"
- Estado `filtroActivo` con useState
- Usar `motion.div` con `layout` prop en cada tarjeta del portafolio para animar el reordenamiento
- AnimatePresence para las tarjetas que aparecen/desaparecen al filtrar

#### 2. `src/components/futuro/QuoteCalculator.tsx` — Number transitions
- Usar `motion.span` con `animate={{ opacity: 1 }}` para el precio total
- Key basado en el valor del total para que framer-motion detecte el cambio
- Transición suave tipo "count up" con `useSpring` o valores animados de Framer Motion
- Los botones de selección ya tienen transiciones Tailwind — mantenerlas

### Verificación
```bash
npm run build
# Debe compilar sin errores
```

---

## Tareas secuenciales post-agentes (Hermes directo)

### Task: Build final + commit
- Correr `npm run build`
- Si falla, corregir imports o tipos de framer-motion
- `git add -A && git commit -m "feat: animaciones Framer Motion — page transitions + scroll reveal + portfolio filter"`
