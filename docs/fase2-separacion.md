# Mapa de separación — Fase 2

Si en algún momento quieres quitar la Fase 2 (tracking + admin), estos son
**todos** los archivos que debes eliminar y las líneas que debes revertir.
Todo está autocontenido. No hay dependencias cruzadas con Fase 1.

## Archivos a eliminar (8 archivos + 2 carpetas)

```
src/lib/db/
  client.ts          ← Cliente PostgreSQL
  queries.ts         ← Queries de negocio
  schema.sql         ← Esquema de tablas

src/app/api/
  rastreo/route.ts   ← GET /api/rastreo?guia=XXX
  admin/route.ts     ← CRUD /api/admin

src/app/rastreo/
  page.tsx           ← Página pública de rastreo

src/app/admin/
  page.tsx           ← Panel de administración

.env.example         ← Variables de entorno
.env                 ← (si existe, borrar solo las vars de Fase 2)
```

## Archivos a revertir (2 archivos, cambios mínimos)

### `src/components/Header.tsx`
- Eliminar las líneas 8-9: `const PHASE2 = ...`
- Eliminar las líneas 35-38: `phase2Items` y el splice

### `src/components/Footer.tsx`
- Eliminar línea 3: `const PHASE2 = ...`
- Revertir `empresaLinks` a solo Nosotros y Contacto

## Dependencias npm a desinstalar

```bash
npm uninstall pg @types/pg
```

## Variables de entorno a quitar

- `NEXT_PUBLIC_PHASE2`
- `DATABASE_URL`
- `ADMIN_PASSWORD`

---

## Cómo activar la Fase 2

1. Configurar PostgreSQL y correr `src/lib/db/schema.sql`
2. En `.env`:
   ```
   NEXT_PUBLIC_PHASE2=true
   DATABASE_URL=postgresql://usuario:password@host:5432/dbname
   ADMIN_PASSWORD=tu-contraseña-segura
   ```
3. `npm run dev`
4. El item "Rastreo" aparece automáticamente en Header y Footer
5. Panel admin en `/admin`
