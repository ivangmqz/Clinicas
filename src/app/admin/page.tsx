import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: servicesCount },
    { count: leadsCount },
    { count: newLeadsCount },
    { count: testimonialsCount },
    { data: products }
  ] = await Promise.all([
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("appointment_requests").select("*", { count: "exact", head: true }),
    supabase.from("appointment_requests").select("*", { count: "exact", head: true }).eq("status", "nuevo"),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("products").select("stock, low_stock_threshold, active")
  ]);

  const lowStockCount = (products ?? []).filter((p) => p.active && p.stock <= p.low_stock_threshold).length;

  const cards = [
    { label: "Servicios publicados", value: servicesCount ?? 0, href: "/admin/services" },
    { label: "Solicitudes nuevas", value: newLeadsCount ?? 0, href: "/admin/leads", highlight: true },
    { label: "Solicitudes totales", value: leadsCount ?? 0, href: "/admin/leads" },
    { label: "Productos con stock bajo", value: lowStockCount, href: "/admin/products", highlight: true },
    { label: "Testimonios", value: testimonialsCount ?? 0, href: "/admin/testimonials" }
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-clinic-900">Panel de administración</h1>
      <p className="mt-1 text-sm text-slate-500">Gestiona el contenido de la página de la clínica.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`admin-card transition hover:shadow-md ${c.highlight && c.value > 0 ? "border-blush-400" : ""}`}
          >
            <p className="text-sm text-slate-500">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-clinic-900">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/admin/settings", label: "Editar información del sitio", desc: "Nombre, contacto, horarios, hero." },
          { href: "/admin/services", label: "Gestionar servicios", desc: "Tratamientos dentales y estéticos." },
          { href: "/admin/products", label: "Gestionar productos y stock", desc: "Catálogo, precios e inventario." },
          { href: "/admin/team", label: "Gestionar equipo", desc: "Doctores y especialistas." },
          { href: "/admin/testimonials", label: "Gestionar testimonios", desc: "Reseñas de pacientes." },
          { href: "/admin/gallery", label: "Gestionar galería", desc: "Fotos del consultorio y resultados." },
          { href: "/admin/leads", label: "Ver solicitudes de cita", desc: "Leads enviados desde el sitio." }
        ].map((item) => (
          <Link key={item.href} href={item.href} className="admin-card block hover:shadow-md">
            <p className="font-semibold text-clinic-800">{item.label}</p>
            <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
