"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import Modal from "@/components/admin/Modal";
import type { Database } from "@/types/database.types";

type Member = Database["public"]["Tables"]["team_members"]["Row"];

const EMPTY: Omit<Member, "id" | "created_at"> = {
  name: "",
  role_title: "",
  bio: "",
  photo_url: null,
  active: true,
  sort_order: 0
};

export default function TeamPage() {
  const [team, setTeam] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Member | (typeof EMPTY & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    fetch("/api/team")
      .then((r) => r.json())
      .then((d) => setTeam(d.team ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const isNew = !("id" in editing) || !editing.id;
    const url = isNew ? "/api/team" : `/api/team/${editing.id}`;
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
    if (!confirm("¿Eliminar este integrante?")) return;
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-clinic-900">Equipo</h1>
          <p className="mt-1 text-sm text-slate-500">Doctores y especialistas de la clínica.</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} className="btn-primary">
          + Nuevo integrante
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-slate-500">Cargando...</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div key={m.id} className="admin-card">
              {m.photo_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photo_url} alt="" className="h-20 w-20 rounded-full object-cover" />
              )}
              <h3 className="mt-3 font-semibold text-clinic-900">{m.name}</h3>
              <p className="text-sm text-clinic-600">{m.role_title}</p>
              {!m.active && <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">Inactivo</span>}
              <div className="mt-4 flex gap-2">
                <button onClick={() => setEditing(m)} className="text-sm font-medium text-clinic-700 hover:underline">
                  Editar
                </button>
                <button onClick={() => handleDelete(m.id)} className="text-sm font-medium text-red-500 hover:underline">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          {team.length === 0 && <p className="text-slate-500">No hay integrantes todavía.</p>}
        </div>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <form onSubmit={handleSave} className="space-y-4">
            <h2 className="font-display text-lg font-semibold text-clinic-900">
              {"id" in editing && editing.id ? "Editar integrante" : "Nuevo integrante"}
            </h2>
            <div>
              <label className="label">Nombre</label>
              <input
                required
                className="input"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Puesto / especialidad</label>
              <input
                className="input"
                value={editing.role_title}
                onChange={(e) => setEditing({ ...editing, role_title: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Biografía breve</label>
              <textarea
                className="textarea"
                rows={3}
                value={editing.bio}
                onChange={(e) => setEditing({ ...editing, bio: e.target.value })}
              />
            </div>
            <ImageUploader label="Foto" value={editing.photo_url} onChange={(url) => setEditing({ ...editing, photo_url: url })} />
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
