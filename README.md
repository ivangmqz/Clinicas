# Clínica Dental Web — Landing + Panel de Administración

Plataforma full-stack (landing pública + panel Administrador) para una clínica
dental, organizada por especialidad (Odontología general, Estética dental,
Ortodoncia, Rehabilitación oral, etc. — tú defines las categorías).
Construida con **Next.js 16 (App Router) + TypeScript + Tailwind CSS** en el
frontend y **Supabase** (Postgres + Auth + Storage) en el backend.

---

## 1. Qué incluye

**Sitio público (`/`):**
- Hero con imagen, badges de confianza y CTA de WhatsApp / agendar cita.
- Franja "Por qué elegirnos" con iconos.
- Servicios agrupados por especialidad dental (categorías libres: Odontología general, Estética dental, Ortodoncia, Rehabilitación oral, etc.) con precio.
- Productos destacados (línea de retail, solo los que tienen stock activo).
- Sección "Sobre nosotros".
- Equipo de especialistas.
- Galería de fotos.
- Testimonios de pacientes (con promedio de calificación mostrado en el hero).
- Formulario de contacto/solicitud de cita (queda guardado en la base de datos).
- Botón flotante de WhatsApp y footer con navegación, contacto y redes sociales.

**Panel de administración (`/admin`, requiere login):**
- Editar la información general del sitio (nombre, textos, contacto, horario, mapa, imagen del hero).
- CRUD de servicios (categoría, nombre, descripción, precio, duración, imagen, activo/inactivo).
- **Productos e inventario**: catálogo con categoría, SKU, precio e imagen, más control de **stock** (ajuste rápido +/-, umbral de stock bajo con aviso visual y etiquetas de "Agotado" / "Stock bajo" / "Disponible").
- CRUD de equipo (nombre, puesto, bio, foto).
- CRUD de testimonios (autor, texto, calificación).
- Galería (subir/eliminar fotos).
- Bandeja de solicitudes de cita, con cambio de estado (nuevo / contactado / agendado / cancelado) y acceso directo a WhatsApp del paciente.

Todas las imágenes se suben directo desde el panel a un bucket público de
Supabase Storage (`clinic-images`) — no hace falta ningún servicio externo.

---

## 2. Estructura de carpetas

```
clinica/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing pública
│   │   ├── login/page.tsx           # Login del admin
│   │   ├── admin/                   # Rutas protegidas (rol admin)
│   │   │   ├── layout.tsx           # Guard de sesión + rol + navegación
│   │   │   ├── page.tsx             # Dashboard
│   │   │   ├── settings/page.tsx    # Info general del sitio
│   │   │   ├── services/page.tsx    # CRUD servicios
│   │   │   ├── team/page.tsx        # CRUD equipo
│   │   │   ├── testimonials/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   └── leads/page.tsx       # Solicitudes de cita
│   │   └── api/                     # Route handlers (CRUD respaldado por RLS)
│   ├── components/
│   │   ├── public/                  # Navbar, ContactForm, WhatsAppButton
│   │   └── admin/                   # ImageUploader, Modal
│   ├── lib/supabase/{client,server,admin}.ts
│   └── types/database.types.ts
├── supabase/schema.sql              # Esquema + RLS + bucket de imágenes
└── .env.local.example
```

**Seguridad:** todo el contenido público es de solo lectura para cualquier
visitante; solo un usuario con `role = 'admin'` en la tabla `profiles` puede
crear, editar o borrar contenido — esto se aplica a nivel de base de datos con
Row Level Security (RLS), no solo en el frontend.

---

## 3. Instalación

### Requisitos previos
- [Node.js 22+](https://nodejs.org/)
- Una cuenta gratuita en [Supabase](https://supabase.com)
- (Para producción) una cuenta en [Vercel](https://vercel.com) o similar

### Paso 1 — Crear el proyecto en Supabase
1. Crea un nuevo proyecto en Supabase.
2. Ve a **SQL Editor** → pega el contenido de [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
   Esto crea las tablas, las políticas de RLS y el bucket público `clinic-images`.
3. (Opcional, recomendado) En el mismo **SQL Editor**, pega el contenido de [`supabase/seed.sql`](supabase/seed.sql) → **Run**.
   Esto carga contenido de ejemplo (servicios, productos, equipo, testimonios y galería) con imágenes de relleno, para que el sitio no se vea vacío mientras cargas tus datos reales. Todo se edita o reemplaza después desde `/admin` — no hace falta tocar la base de datos de nuevo.
4. Ve a **Project Settings → API** y copia: `Project URL`, `anon public key`, `service_role key`.

### Paso 2 — Variables de entorno
```bash
cp .env.local.example .env.local
```
Completa `.env.local` con las claves de Supabase y tu número de WhatsApp
(`NEXT_PUBLIC_WHATSAPP_NUMBER`, formato internacional sin `+`).

### Paso 3 — Instalar y correr en local
```bash
npm install
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) para el sitio público.

### Paso 4 — Crear el primer administrador
1. En Supabase Dashboard → **Authentication → Add user**, crea el usuario del dueño/administrador (correo + contraseña).
2. Copia su UUID y en **SQL Editor** ejecuta:
   ```sql
   insert into public.profiles (id, full_name, role, active)
   values ('UUID-DEL-USUARIO', 'Nombre del administrador', 'admin', true);
   ```
3. Entra a [http://localhost:3000/login](http://localhost:3000/login) con ese correo — accederás al panel `/admin`.
4. Desde `/admin` ya puedes editar toda la información del sitio: settings, servicios, equipo, testimonios y galería.
   (Los administradores adicionales se crean vía `/api/admin/create-admin`, protegido para que solo otro admin logueado lo pueda invocar.)

### Paso 5 — Desplegar en Vercel
1. Sube el proyecto a un repositorio Git e impórtalo en Vercel.
2. Agrega las mismas variables de entorno en **Project Settings → Environment Variables**.
3. Actualiza `NEXT_PUBLIC_SITE_URL` con tu dominio final.

---

## 4. Notas
- El formulario de contacto público inserta directamente en `appointment_requests`; la política de RLS permite `insert` a cualquiera pero **no** `select`, así que un visitante no puede leer las solicitudes de otros.
- Si cambias el nombre del bucket de imágenes, actualízalo también en `src/components/admin/ImageUploader.tsx`.
