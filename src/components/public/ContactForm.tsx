"use client";

import { useState } from "react";
import type { Database } from "@/types/database.types";

type Service = Database["public"]["Tables"]["services"]["Row"];

export default function ContactForm({ services }: { services: Service[] }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service_id: "",
    preferred_date: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service_id: form.service_id || null })
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", phone: "", email: "", service_id: "", preferred_date: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-clinic-50 p-8 text-center">
        <p className="text-lg font-semibold text-clinic-800">¡Gracias! Recibimos tu solicitud.</p>
        <p className="mt-1 text-sm text-clinic-700">Te contactaremos muy pronto para confirmar tu cita.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Nombre *</label>
          <input
            required
            className="input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Teléfono *</label>
          <input
            required
            className="input"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Correo</label>
          <input
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Servicio de interés</label>
          <select
            className="input"
            value={form.service_id}
            onChange={(e) => setForm({ ...form, service_id: e.target.value })}
          >
            <option value="">Selecciona (opcional)</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label">Fecha preferida</label>
          <input
            className="input"
            placeholder="Ej. próxima semana por la tarde"
            value={form.preferred_date}
            onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Mensaje</label>
          <textarea
            className="textarea"
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
      </div>

      {status === "error" && <p className="text-sm text-red-500">Ocurrió un error. Intenta de nuevo.</p>}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
        {status === "loading" ? "Enviando..." : "Solicitar cita"}
      </button>
    </form>
  );
}
