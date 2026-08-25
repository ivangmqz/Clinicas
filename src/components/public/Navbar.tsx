"use client";

import { useState } from "react";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#productos", label: "Productos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#equipo", label: "Equipo" },
  { href: "#galeria", label: "Galería" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" }
];

export default function Navbar({ clinicName }: { clinicName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#" className="font-display text-xl font-bold text-clinic-800">
          {clinicName}
        </a>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-clinic-700">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contacto" className="btn-primary hidden md:inline-flex">
          Agendar cita
        </a>
        <button
          className="text-2xl text-clinic-800 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white px-5 py-3 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              {link.label}
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
            Agendar cita
          </a>
        </nav>
      )}
    </header>
  );
}
