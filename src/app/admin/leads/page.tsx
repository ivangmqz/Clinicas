"use client";

import { useEffect, useState } from "react";
import type { LeadStatus } from "@/types/database.types";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  preferred_date: string | null;
  message: string;
  status: LeadStatus;
  created_at: string;
  services: { name: string } | null;
}

const STATUS_LABEL: Record<LeadStatus, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  agendado: "Agendado",
  cancelado: "Cancelado"
};

const STATUS_COLOR: Record<LeadStatus, string> = {
  nuevo: "bg-blush-500/10 text-blush-600",
  contactado: "bg-amber-100 text-amber-700",
  agendado: "bg-clinic-100 text-clinic-700",
  cancelado: "bg-slate-100 text-slate-500"
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => setLeads(d.leads ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function updateStatus(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta solicitud?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-clinic-900">Solicitudes de cita</h1>
      <p className="mt-1 text-sm text-slate-500">Leads enviados desde el formulario de contacto del sitio.</p>

      {loading ? (
        <p className="mt-6 text-slate-500">Cargando...</p>
      ) : (
        <div className="mt-6 space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="admin-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-clinic-900">{lead.name}</p>
                  <p className="text-sm text-slate-500">
                    {lead.phone}
                    {lead.email && ` · ${lead.email}`}
                  </p>
                  {lead.services && <p className="mt-1 text-sm text-clinic-600">Interés: {lead.services.name}</p>}
                  {lead.preferred_date && <p className="text-sm text-slate-500">Fecha preferida: {lead.preferred_date}</p>}
                  {lead.message && <p className="mt-2 text-sm text-slate-600">&ldquo;{lead.message}&rdquo;</p>}
                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(lead.created_at).toLocaleString("es-MX")}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                    className={`rounded-full border-0 px-3 py-1 text-xs font-semibold ${STATUS_COLOR[lead.status]}`}
                  >
                    {Object.entries(STATUS_LABEL).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-clinic-700 hover:underline"
                    >
                      WhatsApp
                    </a>
                    <button onClick={() => handleDelete(lead.id)} className="text-sm font-medium text-red-500 hover:underline">
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {leads.length === 0 && <p className="text-slate-500">No hay solicitudes todavía.</p>}
        </div>
      )}
    </div>
  );
}
