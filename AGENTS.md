# Serigrafics — Sitio Web

## Stack
- Frontend: Next.js 16 (App Router), React 19, TypeScript
- Estilos: Tailwind CSS v4, CSS custom properties
- Fuentes: Fraunces (headings), Manrope (body), JetBrains Mono (mono)
- DB (Fase 2): PostgreSQL + PostgREST

## Commands
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Convenciones
- Componentes reutilizables en `src/components/`
- `"use client"` solo cuando es necesario (hooks, interactividad)
- Diseño premium dark (#09090b) con Bento Grid
- Sin placeholders en código de producción (salvo datos de contacto pendientes)
- Commits convencionales: `feat:`, `fix:`, `refactor:`

## Estructura
```
src/
  app/
    layout.tsx          → Root layout (Header + Footer globales)
    page.tsx            → Home
    globals.css         → Estilos globales + custom properties
    nosotros/
      page.tsx          → Sobre el taller
    servicios/
      page.tsx          → Servicios con anclas (#serigrafia, #grabado-laser, etc.)
    contacto/
      page.tsx          → Formulario + datos de contacto
  components/
    Header.tsx          → Nav sticky con dropdown hover
    Footer.tsx          → Footer con links
```

## Constraints
- Fase 1: Solo informativo. Sin DB, sin tracking de pedidos.
- Fase 2 (futuro): Rastreo de guías + admin panel. No integrar hasta indicación.
- Datos de contacto (teléfono, dirección, horario) pendientes de proporcionar.
- El formulario de contacto no envía datos aún (esperando backend).
