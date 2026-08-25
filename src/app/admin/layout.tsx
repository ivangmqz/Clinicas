import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

const NAV = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/settings", label: "Sitio" },
  { href: "/admin/services", label: "Servicios" },
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/team", label: "Equipo" },
  { href: "/admin/testimonials", label: "Testimonios" },
  { href: "/admin/gallery", label: "Galería" },
  { href: "/admin/leads", label: "Solicitudes" }
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, active")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin" || !profile.active) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-display text-lg font-bold text-clinic-800">
              Clínica<span className="text-blush-500">Admin</span>
            </Link>
            <nav className="hidden flex-wrap gap-4 text-sm text-slate-600 lg:flex">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-clinic-700">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-500 sm:inline">{profile.full_name}</span>
            <Link href="/" className="hidden text-sm text-clinic-600 hover:underline sm:inline">
              Ver sitio
            </Link>
            <LogoutButton />
          </div>
        </div>
        <nav className="flex flex-wrap gap-4 border-t border-slate-100 px-5 py-2 text-sm text-slate-600 lg:hidden">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-clinic-700">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
