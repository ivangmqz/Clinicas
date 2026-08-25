"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/admin/Modal";
import type { Database } from "@/types/database.types";

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];

const EMPTY: Omit<Testimonial, "id" | "created_at"> = {
  author_name: "",
  content: "",
  rating: 5,
  active: true,
  sort_order: 0
};

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | (typeof EMPTY & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => setItems(d.testimonials ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const isNew = !("id" in editing) || !editing.id;
    const url = isNew ? "/api/testimonials" : `/api/testimonials/${editing.id}`;
    const res = await fetch(url, {
      method: isNew ? "POST" : "PATCH",
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
    if (!confirm("¿Eliminar este testimonio?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-clinic-900">Testimonios</h1>
          <p className="mt-1 text-sm text-slate-500">Reseñas de pacientes que se muestran en el sitio.</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} className="btn-primary">
          + Nuevo testimonio
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-slate-500">Cargando...</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <div key={t.id} className="admin-card">
              <div className="text-blush-500">{"★".repeat(t.rating)}</div>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">&ldquo;{t.content}&rdquo;</p>
              <p className="mt-3 text-sm font-semibold text-clinic-800">{t.author_name}</p>
              {!t.active && <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">Inactivo</span>}
              <div className="mt-4 flex gap-2">
                <button onClick={() => setEditing(t)} className="text-sm font-medium text-clinic-700 hover:underline">
                  Editar
                </button>
                <button onClick={() => handleDelete(t.id)} className="text-sm font-medium text-red-500 hover:underline">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-slate-500">No hay testimonios todavía.</p>}
        </div>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-clinic-900">
              {"id" in editing && editing.id ? "Editar testimonio" : "Nuevo testimonio"}
            </h2>
            <div>
              <label className="label">Nombre del paciente</label>
              <input
                required
                className="input"
                value={editing.author_name}
                onChange={(e) => setEditing({ ...editing, author_name: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Testimonio</label>
              <textarea
                required
                className="textarea"
                rows={4}
                value={editing.content}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Calificación</label>
              <select
                className="input"
                value={editing.rating}
                onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} estrellas
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={editing.active}
                onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
              />
              Visible en el sitio
            </label>
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
