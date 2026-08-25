"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import Modal from "@/components/admin/Modal";
import { formatPrice } from "@/lib/utils";
import type { Database, ServiceCategory } from "@/types/database.types";

type Service = Database["public"]["Tables"]["services"]["Row"];

const EMPTY: Omit<Service, "id" | "created_at"> = {
  category: "dental",
  name: "",
  description: "",
  price: null,
  duration_minutes: null,
  image_url: null,
  active: true,
  sort_order: 0
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | (typeof EMPTY & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => setServices(d.services ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);

    const isNew = !("id" in editing) || !editing.id;
    const url = isNew ? "/api/services" : `/api/services/${editing.id}`;
    const method = isNew ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing)
    });

    setSaving(false);
    if (res.ok) {
      setEditing(null);
      load();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este servicio?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-clinic-900">Servicios</h1>
          <p className="mt-1 text-sm text-slate-500">Tratamientos dentales y estéticos que verán tus pacientes.</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} className="btn-primary">
          + Nuevo servicio
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-slate-500">Cargando...</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.id} className="admin-card">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="rounded-full bg-clinic-50 px-2 py-0.5 text-xs font-medium text-clinic-700">
                    {s.category === "dental" ? "Odontología" : "Estética"}
                  </span>
                  {!s.active && (
                    <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">Inactivo</span>
                  )}
                </div>
              </div>
              <h3 className="mt-2 font-semibold text-clinic-900">{s.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{s.description}</p>
              <p className="mt-2 text-sm font-semibold text-clinic-600">{formatPrice(s.price)}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setEditing(s)} className="text-sm font-medium text-clinic-700 hover:underline">
                  Editar
                </button>
                <button onClick={() => handleDelete(s.id)} className="text-sm font-medium text-red-500 hover:underline">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          {services.length === 0 && <p className="text-slate-500">No hay servicios todavía.</p>}
        </div>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-clinic-900">
              {"id" in editing && editing.id ? "Editar servicio" : "Nuevo servicio"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Categoría</label>
                <select
                  className="input"
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value as ServiceCategory })}
                >
                  <option value="dental">Odontología</option>
                  <option value="estetica">Estética</option>
                </select>
              </div>
              <div>
                <label className="label">Nombre</label>
                <input
                  required
                  className="input"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Descripción</label>
                <textarea
                  className="textarea"
                  rows={3}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Precio (MXN)</label>
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  value={editing.price ?? ""}
                  onChange={(e) => setEditing({ ...editing, price: e.target.value ? Number(e.target.value) : null })}
                />
              </div>
              <div>
                <label className="label">Duración (min)</label>
                <input
                  type="number"
                  className="input"
                  value={editing.duration_minutes ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, duration_minutes: e.target.value ? Number(e.target.value) : null })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <ImageUploader value={editing.image_url} onChange={(url) => setEditing({ ...editing, image_url: url })} />
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={editing.active}
                  onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                />
                Visible en el sitio
              </label>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? "Guardando..." : "Guardar"}
              </button>
              <button type="button" onClick={() => setEditing(null)} className="btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
